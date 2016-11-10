
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[mobile].[AP_S_BranchBalanceReportData]') AND type in (N'P', N'PC'))
DROP PROCEDURE [mobile].[AP_S_BranchBalanceReportData]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER OFF
GO

-- Create Procedure -----------------------------------------------
CREATE PROCEDURE [mobile].[AP_S_BranchBalanceReportData]
		@BranchID								INT,
		@YearNo									INT,
		@WeekNo									INT
AS
    BEGIN
    --***************************************************************************
    --* Project			:	Branch Balacing	
    --* Description		:	Insert record in Mobile.AP_S_BranchBalanceReportData Table
    --*
    --* Configuration Record
    --* Review              Ver  Author        Date      
    --* SPRINT 2			1.0  Abhay		   19/07/2016

    --* Review              Ver  Author        Date        CR              Comments 
    --* E.g. 
	--*
    --***************************************************************************
	DECLARE @AmountTypeDeclared			CHAR(1),
			@AmountTypeActual			CHAR(1),
			@LoanBalancTypeID			CHAR(1),
			@OthersRACBalancTypeID		CHAR(1),
			@FloatBalancTypeID			CHAR(1),
			@CashBankedBalancTypeID		CHAR(1),
			@SOBalancTypeID				CHAR(1),
			@CollectionsBalancTypeID	CHAR(1),

			@ActualFloatBalancTypeID			CHAR(1),
			@ActualCashBankedBalancTypeID		CHAR(1),

			@tranCash					TINYINT,
			@tranSettelment				TINYINT,

			@PaymentTypeCostID			TINYINT,
			@TransactionTypeCostRev		TINYINT,
			@TransactionTypeCashRev		TINYINT


	-- Loans – L ;Others/RAC – O; Float – F;Cash Banked – B;Shorts and Overs – S;Collections – C
	-- ATM Withdrawals – W;A&L Deposits – D


	SELECT	@AmountTypeDeclared				= 'D', 
			@AmountTypeActual				= 'A',
			@LoanBalancTypeID				= 'L',
			@OthersRACBalancTypeID			= 'O', 
			@FloatBalancTypeID				= 'F',
			@CashBankedBalancTypeID			= 'B',
			@SOBalancTypeID					= 'S',
			@CollectionsBalancTypeID		= 'C',
			@ActualFloatBalancTypeID		= 'W',
			@ActualCashBankedBalancTypeID	= 'D',
			@tranCash						= 1,
			@tranSettelment					= 5,

			@PaymentTypeCostID				= 2,
			@TransactionTypeCostRev			= 55,
			@TransactionTypeCashRev			= 53

    -- Procedure Body -------------------------------------------------
    SET NOCOUNT ON
		BEGIN TRY

		-- CREATE #temp Table to hold Balance Type Summary data for each Jrny Actual and Declared.
	

		CREATE TABLE #TempBalanceTypeSummary (
							TempID                          INT				Identity(1,1),
							BranchID						INT				NOT NULL,
							JourneyID						INT				NOT NULL,
							WeekNo							INT				NOT NULL,
							YearNo							INT				NOT NULL,
							BalanceType						VARCHAR(50)		NULL,
							Amount				            MONEY			NULL
					)

		
		CREATE CLUSTERED INDEX [C_I_JourneyIDBalanceTypetemp] ON #TempBalanceTypeSummary
					(
						JourneyID,BalanceType ASC
					)

		-- CREATE #temp Table to hold Jrny Summary data for Actual and Declared.
		CREATE TABLE #TempBranchJourney (
							BranchID						INT				NOT NULL,
							JourneyID						INT				NOT NULL,
							JourneyDesc						VARCHAR(50)		NULL,
							PrimaryAgent					INT				NULL,
							FirstName						VARCHAR(100)	NULL,
							LastName						VARCHAR(100)	NULL,
							ContactNumber					VARCHAR(40)		NULL
							)
		
		CREATE CLUSTERED INDEX [C_I_JourneyIDPrimaryAgentetemp] ON #TempBranchJourney
				(
					JourneyID,PrimaryAgent ASC
				)
		-- INSERT LIST OF Journeys for Input Branch ID
			INSERT INTO #TempBranchJourney(
							BranchID,
							JourneyID,
							JourneyDesc,
							PrimaryAgent,
							FirstName,
							LastName,
							ContactNumber
							)
					SELECT 
							BranchID,
							JourneyID,
							JourneyDesc,
							UserID,
							FirstName,
							LastName,
							CASE WHEN JS.MobileNumber IS NULL OR JS.MobileNumber = '' THEN
								JS.HomePhone
							ELSE 
								JS.MobileNumber
							END  
					FROM mobile.vwJourneySelection JS
					INNER JOIN [dbo].[vwWeekEnding] wk ON CAST(JS.JourneyAgentStartDate AS DATE)   <= wk.EndDate  
														AND (CAST(JS.JourneyAgentEndDate AS DATE)  >= wk.StartDate OR JS.JourneyAgentEndDate IS NULL) 
														AND CAST(JS.JourneySectionStartDate AS DATE) <= wk.EndDate  
														AND (CAST(JS.JourneySectionEndDate AS DATE) >= wk.StartDate OR JS.JourneySectionEndDate IS NULL)
					WHERE JS.BranchID = @BranchID		 
					AND wk.YearNo = @YearNo 
					AND wk.WeekNo = @WeekNo
					 

		-- INSERT ACTUAL & DECLARED AMOUNT FOR EACH BALANCE TRANSACTION FOR ALL THE JOURNEY OF INPUT BRANCH 
						
		--  ACTUAL & DECLARED INSERT : START
			INSERT INTO #TempBalanceTypeSummary
					(
							BranchID,
							JourneyID,
							YearNo,
							WeekNo,
							BalanceType,
							Amount
					)
			SELECT BranchID,JourneyID,YearNo,WeekNo,BalanceType,SUM(AMOUNT) FROM 
			(

				--@AmountTypeDeclared	--[D-C-Cash],[D-C-Card],[D-C-Central],[D-B-Cash Banked],[D-F-Float],[D-L-Loans],[D-O-Others/RAC],[D-S-Shorts and Overs], 
				--@AmountTypeActual		--[A-C-Cash],[A-C-Card],[A-C-Central],[A-D-Cash Banked],[A-W-Float],[A-L-Loans],[A-O-Others/RAC],[A-S-Shorts and Overs]

				Select
					 J.BranchID					AS [BranchID]
					,DA.JourneyID				AS [JourneyID]
					,WE.YearNo					AS [YearNo]
					,WE.WeekNo					AS [WeekNo]
					,CASE 
						WHEN DA.BalanceTypeID = 'C' THEN @AmountTypeDeclared + '-C-Cash'
						WHEN DA.BalanceTypeID = 'B' THEN @AmountTypeDeclared + '-B-Cash Banked'			--DA.BalanceTypeID + '-' + DA.BalanceTypeDesc
						WHEN DA.BalanceTypeID = 'F' THEN @AmountTypeDeclared + '-F-Float'				--DA.BalanceTypeID + '-' + DA.BalanceTypeDesc
						WHEN DA.BalanceTypeID = 'L' THEN @AmountTypeDeclared + '-L-Loans'				--DA.BalanceTypeID + '-' + DA.BalanceTypeDesc
						WHEN DA.BalanceTypeID = 'O' THEN @AmountTypeDeclared + '-O-Others/RAC'			--DA.BalanceTypeID + '-' + DA.BalanceTypeDesc
						WHEN DA.BalanceTypeID = 'S' THEN @AmountTypeDeclared + '-S-Shorts and Overs'	--DA.BalanceTypeID + '-' + DA.BalanceTypeDesc
						WHEN DA.BalanceTypeID = 'D' THEN @AmountTypeActual	 + '-B-Cash Banked'			--DA.BalanceTypeID + '-' + DA.BalanceTypeDesc
						WHEN DA.BalanceTypeID = 'W' THEN @AmountTypeActual   + '-F-Float'				--DA.BalanceTypeID + '-' + DA.BalanceTypeDesc
						ELSE DA.BalanceTypeID + '-' + DA.BalanceTypeDesc	
					 END AS [BalanceType]
					,DA.Amount					AS [Amount]
				FROM [mobile].[vwDashboardAmount] DA
				INNER JOIN [dbo].[vwWeekEnding] WE ON CAST(DA.BalanceDate AS DATE) BETWEEN WE.StartDate AND WE.EndDate
				INNER JOIN #TempBranchJourney J ON J.JourneyID = DA.JourneyID --AND J.PrimaryAgent = DA.CreatedBy
				WHERE We.WeekNo	= @WeekNo AND WE.YearNo = @YearNo
				AND DA.BalanceTypeID IN (@LoanBalancTypeID,		@OthersRACBalancTypeID,		@FloatBalancTypeID,			@CashBankedBalancTypeID,
										 @SOBalancTypeID,		@CollectionsBalancTypeID,   @ActualFloatBalancTypeID,	@ActualCashBankedBalancTypeID)
				
				UNION ALL 
	
				SELECT 
					 J.BranchID					AS [BranchID]
					,DDA.JourneyID				AS [JourneyID]
					,WE.YearNo					AS [YearNo]
					,WE.WeekNo					AS [WeekNo]
					,CASE 
						WHEN DDA.BalanceTypeID = 'C' THEN @AmountTypeDeclared + '-C-Cash'
						WHEN DDA.BalanceTypeID = 'B' THEN @AmountTypeDeclared + '-B-Cash Banked'		--DA.BalanceTypeID + '-' + DA.BalanceTypeDesc
						WHEN DDA.BalanceTypeID = 'F' THEN @AmountTypeDeclared + '-F-Float'				--DA.BalanceTypeID + '-' + DA.BalanceTypeDesc
						WHEN DDA.BalanceTypeID = 'L' THEN @AmountTypeDeclared + '-L-Loans'				--DA.BalanceTypeID + '-' + DA.BalanceTypeDesc
						WHEN DDA.BalanceTypeID = 'O' THEN @AmountTypeDeclared + '-O-Others/RAC'			--DA.BalanceTypeID + '-' + DA.BalanceTypeDesc
						WHEN DDA.BalanceTypeID = 'S' THEN @AmountTypeDeclared + '-S-Shorts and Overs'	--DA.BalanceTypeID + '-' + DA.BalanceTypeDesc
						WHEN DDA.BalanceTypeID = 'D' THEN @AmountTypeActual	  + '-D-Cash Banked'		--DA.BalanceTypeID + '-' + DA.BalanceTypeDesc
						WHEN DDA.BalanceTypeID = 'W' THEN @AmountTypeActual   + '-W-Float'				--DA.BalanceTypeID + '-' + DA.BalanceTypeDesc
						ELSE DDA.BalanceTypeID + '-' + DDA.BalanceTypeDesc	
					 END AS [BalanceType]
					,DDA.Amount					AS [Amount]
				FROM [mobile].[vwDelegatedDashboardAmount] DDA
				INNER JOIN #TempBranchJourney J ON J.JourneyID = DDA.JourneyID 
				INNER JOIN [dbo].[vwWeekEnding] WE ON CAST(DDA.BalanceDate AS DATE) BETWEEN WE.StartDate AND WE.EndDate
				WHERE We.WeekNo	= @WeekNo AND WE.YearNo = @YearNo
				AND DDA.BalanceTypeID IN (@LoanBalancTypeID,		@OthersRACBalancTypeID,		@FloatBalancTypeID,			@CashBankedBalancTypeID,
										  @SOBalancTypeID,		   @CollectionsBalancTypeID,    @ActualFloatBalancTypeID,	@ActualCashBankedBalancTypeID)

				UNION ALL
				--TypeCentralPayment; T.CreatedBy = J.PrimaryAgent; ResponseStatusID

				SELECT [BranchID],[JourneyID],[YearNo],[WeekNo],[BalanceType],[Amount] FROM
				(
					SELECT
						 J.BranchID					AS [BranchID]
						,J.JourneyID				AS [JourneyID]
						,WE.YearNo					AS [YearNo]
						,WE.WeekNo					AS [WeekNo]
						--,CASE 
						--	WHEN T.PaymentTypeID in (@tranCash,@tranSettelment) 
						--		AND T.ResponseStatusID is NULL
						--		AND T.CreatedBy = J.PrimaryAgent
						--	THEN [Amount]
						--	ELSE NULL	
						-- END AS 'D-C-Cash' -- CONVERT(VARCHAR(2),T.PaymentTypeID) + '-' + PT.PaymentTypeDescription
						,CASE 
							WHEN T.PaymentTypeID in (@tranCash,@tranSettelment) 
								AND T.ResponseStatusID is NULL
								AND TA.TransactionTypeID <> @TransactionTypeCashRev		-- 53 – Cash Reversal
							THEN [Amount]
							ELSE NULL	
						 END AS 'A-C-Cash' -- CONVERT(VARCHAR(2),T.PaymentTypeID) + '-' + PT.PaymentTypeDescription
						,CASE 
							WHEN T.PaymentTypeID in (@tranCash,@tranSettelment) 
								AND T.ResponseStatusID is NOT NULL
							THEN [Amount]
							ELSE NULL	
						 END AS 'A-C-Card' -- CONVERT(VARCHAR(2),T.PaymentTypeID) + '-' + PT.PaymentTypeDescription
						 ,CASE 
							WHEN T.PaymentTypeID in (@tranCash,@tranSettelment) 
								AND TA.TypeCentralPayment = 1		-- TransactionType With TypeCentralPayment = 1
							THEN [Amount]
							ELSE NULL	
						 END AS 'A-C-Central' -- CONVERT(VARCHAR(2),T.PaymentTypeID) + '-' + PT.PaymentTypeDescription
						 ,CASE 
							WHEN T.PaymentTypeID = @PaymentTypeCostID
								AND TA.TransactionTypeID <> @TransactionTypeCostRev		-- Cost Reversal - 55
							THEN [Amount]	* -1										-- In table amount is -ve value
							ELSE NULL	
						 END AS 'A-L-Loans' -- CONVERT(VARCHAR(2),T.PaymentTypeID) + '-' + PT.PaymentTypeDescription
					FROM [dbo].[vwJourneyCustomer] JC
					INNER JOIN #TempBranchJourney J						ON J.JourneyID = JC.JourneyID
					INNER JOIN [dbo].[vwTransaction] T					ON T.CustomerID = JC.CustomerID
					INNER JOIN [dbo].[vwTransactionAllocation] TA		ON TA.TransactionID = T.TransactionID
					INNER JOIN [dbo].[vwWeekEnding] WE					ON CAST(T.PaidDate AS DATE)  BETWEEN WE.StartDate AND WE.EndDate
					WHERE 
							We.WeekNo	= @WeekNo 
						AND WE.YearNo = @YearNo
						AND  CAST(JC.StartDate AS DATE) <= WE.EndDate  
						AND (CAST(JC.EndDate AS DATE)   >= WE.StartDate OR JC.EndDate IS NULL)
						AND T.PaymentTypeID IN (@tranCash,@tranSettelment,@PaymentTypeCostID)				-- Cash-1 + Settelment Cash-5 + Rebate-4 (Excluded Rebate) 
				) AS PVT
				UNPIVOT(Amount
				FOR BalanceType IN ([A-C-Cash],[A-C-Card],[A-C-Central],[A-L-Loans])) AS UNPVTTable
				--FOR BalanceType IN ([D-C-Cash],[A-C-Cash],[A-C-Card],[A-C-Central])) AS UNPVTTable
				--AND ResponseStatusID IS NULL				-- Exclude Card Payment.
				
				-- Adding Actual-Loan Records
				-- UNION ALL
			/*
				--@PaymentTypeCostID				= 2,
				--@TransactionTypeCostRev			= 55,
				--@TransactionTypeCashRev			= 53
				

				SELECT 
					 J.BranchID					AS BranchID
					,J.JourneyID				AS JourneyID
					,WE.YearNo					AS YearNo
					,WE.WeekNo					AS WeekNo
					,'A-L-Loans'				AS BalanceType
					,A.Principal				AS Amount
				FROM [dbo].[vwJourneyCustomer] JC
				INNER JOIN #TempBranchJourney J ON J.JourneyID = JC.JourneyID
				INNER JOIN [dbo].[vwAgreement] A ON A.CustomerID = JC.CustomerID
				INNER JOIN [dbo].[vwWeekEnding] WE ON	CAST(A.AgreementStartDate AS DATE)  BETWEEN WE.StartDate AND WE.EndDate
				WHERE 
				We.WeekNo	= @WeekNo AND WE.YearNo = @YearNo
				AND  CAST(JC.StartDate AS DATE)   <= WE.EndDate  
				AND (CAST(JC.EndDate AS DATE)  >= WE.StartDate OR JC.EndDate IS NULL)
			*/

			) BalanceTypeTransactions
			GROUP BY BranchID,JourneyID,YearNo,WeekNo,BalanceType

			
		
		-- ACTUAL & DECLARED INSERT : END
		
			--SELECT * FROM #TempBalanceTypeSummary

			--Loans – L ;Others/RAC – O; Float – F;Cash Banked – B;Shorts and Overs – S;Collections – C
			
			-- Final Select for Branch Balance Report Data


			--SELECT	PVT.BranchID AS BranchID,PVT.JourneyID AS JourneyID,J.JourneyDesc AS JourneyDesc,
			SELECT	J.BranchID AS BranchID,J.JourneyID AS JourneyID,J.JourneyDesc AS JourneyDesc,
					J.PrimaryAgent AS PrimaryAgent,J.FirstName AS FirstName,J.LastName As LastName,PVT.YearNo AS YearNo,PVT.WeekNo AS WeekNo,
					 [D-C-Cash]
					,[D-B-Cash Banked]
					,[D-F-Float]
					,[D-L-Loans]
					,[D-O-Others/RAC]
					,[D-S-Shorts and Overs] 
					,[A-C-Cash]
					,[A-C-Card]
					,[A-C-Central]
					,[A-B-Cash Banked]
					,[A-F-Float]
					,[A-L-Loans]
					,(ISNULL([A-C-Cash],0) - ISNULL([A-L-Loans],0) - ISNULL([D-O-Others/RAC],0) + ISNULL([A-F-Float],0) - ISNULL([A-B-Cash Banked],0))
					 AS [A-S-Shorts and Overs]
					,J.ContactNumber AS ContactNumber
					--,[A-C-Cash] AS [J-C-Cash]
					--,[A-C-Card] AS [J-C-Card]
					--,[A-C-Central] AS [J-C-Central]
					--,[A-L-Loans] AS [J-L-Loans]
					--,[D-O-Others/RAC] AS [J-O-Others/RAC]
					--,[A-F-Float] AS [J-F-Float]
					--,[D-B-Cash Banked] AS [J-B-Cash Banked]
					--,(ISNULL([A-C-Cash],0) - ISNULL([A-L-Loans],0) - ISNULL([D-O-Others/RAC],0) + ISNULL([A-F-Float],0) - ISNULL([D-B-Cash Banked],0)) AS [J-S-Shorts and Overs]
					--,(ISNULL([A-C-Cash],0) - ISNULL([D-C-Cash],0))   AS [SO-C-Cash]
					--,(ISNULL([D-L-Loans],0) - ISNULL([A-L-Loans],0)) AS [SO-L-Loans]
					--,(ISNULL([A-F-Float],0) - ISNULL([D-F-Float],0)) AS [SO-F-Float]
					--,(ISNULL([D-B-Cash Banked],0) - ISNULL([A-B-Cash Banked],0)) AS [SO-B-Cash Banked]
					--,(	(ISNULL([A-C-Cash],0)  - ISNULL([D-C-Cash],0)) 
					--	+	(ISNULL([D-L-Loans],0) - ISNULL([A-L-Loans],0)) 
					--	+	(ISNULL([A-F-Float],0) - ISNULL([D-F-Float],0)) 
					--	+	(ISNULL([D-B-Cash Banked],0) - ISNULL([A-B-Cash Banked],0))
					-- ) AS [SO-S-Shorts and Overs]

			FROM #TempBranchJourney J
			LEFT JOIN
			(
				SELECT BranchID,JourneyID,YearNo,WeekNo,BalanceType AS BalanceType,SUM(Amount) AS Amount from #TempBalanceTypeSummary
				GROUP BY BranchID,JourneyID,YearNo,WeekNo,BalanceType) temp
				PIVOT (SUM(Amount)
				FOR BalanceType in ([D-C-Cash],[D-C-Card],[D-C-Central],[D-B-Cash Banked],[D-F-Float],[D-L-Loans],[D-O-Others/RAC],[D-S-Shorts and Overs],
									[A-C-Cash],[A-C-Card],[A-C-Central],[A-B-Cash Banked],[A-F-Float],[A-L-Loans],[A-O-Others/RAC])
			) AS PVT
			 ON J.JourneyID = PVT.JourneyID
			ORDER BY  J.JourneyDesc

        END TRY
		BEGIN CATCH
		        
			SELECT   'ERR-154' AS ErrorCode,CONVERT(VARCHAR(5),ERROR_NUMBER()) + ' : ' + Convert(VARCHAR(20),ERROR_LINE()) + ' : ' + Convert(VARCHAR(3500),ERROR_MESSAGE()) AS ErrorMessage;

		END CATCH
    SET NOCOUNT OFF
   
    RETURN
END
GO

sp_recompile '[mobile].[AP_S_BranchBalanceReportData]'
go


