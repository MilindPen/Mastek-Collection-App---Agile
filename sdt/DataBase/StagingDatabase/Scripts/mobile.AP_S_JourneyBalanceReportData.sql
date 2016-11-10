/*--
27	2016	27	2016-06-30	2016-07-06	
28	2016	28	2016-07-07	2016-07-13	
29	2016	29	2016-07-14	2016-07-20	

Branch 23-S&U Peterborough,28-S&U Exeter week - 27

EXEC [mobile].[AP_S_JourneyBalanceReportData] 1757,2016,27
GO

EXEC [mobile].[AP_S_JourneyBalanceReportData] 1757,2016,41
GO

*/

IF  EXISTS (SELECT * FROM SYS.OBJECTS WHERE object_id = OBJECT_ID(N'[mobile].[AP_S_JourneyBalanceReportData]') AND TYPE in (N'P', N'PC'))
DROP PROCEDURE [mobile].[AP_S_JourneyBalanceReportData]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER OFF
GO

-- Create Procedure -----------------------------------------------
CREATE PROCEDURE [mobile].[AP_S_JourneyBalanceReportData]
		@JourneyID								INT,
		@YearNo									INT,
		@WeekNo									INT
AS
    BEGIN
    --***************************************************************************
    --* Project			:	Branch Balacing	
    --* Description		:	Insert record in Mobile.AP_S_JourneyBalanceReportData Table
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
			@isPrimaryTrue					BIT,
			@isPrimaryFalse					BIT,

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
			@isPrimaryTrue					= 1,
			@isPrimaryFalse					= 0,

			@PaymentTypeCostID				= 2,
			@TransactionTypeCostRev			= 55,
			@TransactionTypeCashRev			= 53

    -- Procedure Body -------------------------------------------------
    SET NOCOUNT ON
		BEGIN TRY

		-- CREATE #temp Table to hold Balance Type Summary data for each Jrny Actual and Declared.

		CREATE TABLE #TempBalanceTypeSummary 
					(
							TempID                          INT				Identity(1,1),
							AgentID							INT				NULL,
							isPrimary						BIT				NULL,
							JourneyID						INT				NULL,
							WeekNo							INT				NULL,
							YearNo							INT				NULL,
							BalanceType						VARCHAR(50)		NULL,
							Amount				            MONEY			NULL,
							AmountType						CHAR(1)			NULL,
					)

		
		CREATE CLUSTERED INDEX [C_I_JourneyIDBalanceTypetemp] ON #TempBalanceTypeSummary
					(
						JourneyID,BalanceType ASC
					)

		-- CREATE #temp Table to hold Jrny Summary data for Actual and Declared.
		CREATE TABLE #TempBranchDetails (
							BranchID						INT				NOT NULL,
							JourneyID						INT				NOT NULL,
							JourneyDesc						VARCHAR(50)		NULL,
							PrimaryAgent					INT				NULL,
							FirstName						VARCHAR(100)	NULL,
							LastName						VARCHAR(100)	NULL
							)
				
		-- INSERT Journeys Details for Input Journey
			INSERT INTO #TempBranchDetails(
							BranchID,
							JourneyID,
							JourneyDesc,
							PrimaryAgent,
							FirstName,
							LastName
							)
					SELECT 
							BranchID,
							JourneyID,
							JourneyDesc,
							UserID,
							FirstName,
							LastName
					FROM mobile.vwJourneySelection JS
					INNER JOIN [dbo].[vwWeekEnding] wk ON CAST(JS.JourneyAgentStartDate AS DATE)   <= wk.EndDate  
														AND (CAST(JS.JourneyAgentEndDate AS DATE)  >= wk.StartDate OR JS.JourneyAgentEndDate IS NULL) 
														AND CAST(JS.JourneySectionStartDate AS DATE) <= wk.EndDate  
														AND (CAST(JS.JourneySectionEndDate AS DATE) >= wk.StartDate OR JS.JourneySectionEndDate IS NULL)
					WHERE JS.JourneyID = @JourneyID		 
					AND wk.YearNo = @YearNo 
					AND wk.WeekNo = @WeekNo


					--WHERE JS.JourneyID = @JourneyID

		-- INSERT ACTUAL & DECLARED AMOUNT FOR EACH BALANCE TRANSACTION FOR ALL THE JOURNEY OF INPUT BRANCH 
						
		--  ACTUAL & DECLARED INSERT : START
			INSERT INTO #TempBalanceTypeSummary
					(
							AgentID,
							isPrimary,
							JourneyID,
							YearNo,
							WeekNo,
							BalanceType,
							Amount
					)
			SELECT AgentID,isPrimary,JourneyID,YearNo,WeekNo,BalanceType,SUM(AMOUNT) FROM 
			(

				--@AmountTypeDeclared	--[D-C-Cash],[D-C-Card],[D-C-Central],[D-B-Cash Banked],[D-F-Float],[D-L-Loans],[D-O-Others/RAC],[D-S-Shorts and Overs], 
				--@AmountTypeActual		--[A-C-Cash],[A-C-Card],[A-C-Central],[A-D-Cash Banked],[A-W-Float],[A-L-Loans],[A-O-Others/RAC],[A-S-Shorts and Overs]

				Select
					 J.PrimaryAgent				AS [AgentID]
					,@isPrimaryTrue				AS [isPrimary]
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
					 END AS [BalanceType]
					,DA.Amount					AS [Amount]
				FROM [mobile].[vwDashboardAmount] DA
				INNER JOIN [dbo].[vwWeekEnding] WE ON CAST(DA.BalanceDate AS DATE) BETWEEN WE.StartDate AND WE.EndDate
				INNER JOIN #TempBranchDetails J ON J.JourneyID = DA.JourneyID --AND J.PrimaryAgent = DA.CreatedBy
				WHERE We.WeekNo	= @WeekNo AND WE.YearNo = @YearNo
				AND DA.BalanceTypeID IN (	@LoanBalancTypeID,		
											@OthersRACBalancTypeID,		
											@FloatBalancTypeID,			
											@CashBankedBalancTypeID,
											@SOBalancTypeID,		
											@CollectionsBalancTypeID,   
											@ActualFloatBalancTypeID,	
											@ActualCashBankedBalancTypeID
										)
				
				UNION ALL 
	
				SELECT 
					 DDA.DelegatedtoUserID		AS [AgentID]
					,@isPrimaryFalse			AS [isPrimary]
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
						WHEN DDA.BalanceTypeID = 'D' THEN @AmountTypeActual	  + '-B-Cash Banked'		--DA.BalanceTypeID + '-' + DA.BalanceTypeDesc
						WHEN DDA.BalanceTypeID = 'W' THEN @AmountTypeActual   + '-F-Float'				--DA.BalanceTypeID + '-' + DA.BalanceTypeDesc
					 END AS [BalanceType]
					,DDA.Amount					AS [Amount]
				FROM [mobile].[vwDelegatedDashboardAmount] DDA
				INNER JOIN #TempBranchDetails J ON J.JourneyID = DDA.JourneyID 
				INNER JOIN [dbo].[vwWeekEnding] WE ON CAST(DDA.BalanceDate AS DATE) BETWEEN WE.StartDate AND WE.EndDate
				WHERE We.WeekNo	= @WeekNo AND WE.YearNo = @YearNo
				AND DDA.BalanceTypeID IN (	@LoanBalancTypeID,		
											@OthersRACBalancTypeID,		
											@FloatBalancTypeID,			
											@CashBankedBalancTypeID,
											@SOBalancTypeID,		   
											@CollectionsBalancTypeID,    
											@ActualFloatBalancTypeID,	
											@ActualCashBankedBalancTypeID
										)

				UNION ALL
				--TypeCentralPayment; T.CreatedBy = J.PrimaryAgent; ResponseStatusID

				SELECT [AgentID],isPrimary,[JourneyID],[YearNo],[WeekNo],[BalanceType],[Amount] FROM
				(
					SELECT
						 CASE 
							WHEN T.PaymentTypeID in (@tranCash,@tranSettelment) 
								AND T.ResponseStatusID is NULL AND T.CreatedBy <> J.PrimaryAgent 
								THEN 0
							WHEN  T.ResponseStatusID is NOT NULL				
								THEN J.PrimaryAgent
							ELSE T.CreatedBy	
						 END AS [AgentID]
						 ,CASE 
							WHEN T.CreatedBy = J.PrimaryAgent OR ( T.ResponseStatusID is NOT NULL)
							THEN @isPrimaryTrue
							ELSE @isPrimaryFalse
							END
						 AS isPrimary
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
								AND T.ResponseStatusID is NULL --AND T.CreatedBy <> J.PrimaryAgent
								AND TA.TransactionTypeID <> @TransactionTypeCashRev
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
							THEN [Amount] * -1											-- In table amount is -ve value
							ELSE NULL	
						 END AS 'A-L-Loans' -- CONVERT(VARCHAR(2),T.PaymentTypeID) + '-' + PT.PaymentTypeDescription
					FROM [dbo].[vwJourneyCustomer] JC
					INNER JOIN #TempBranchDetails J						ON J.JourneyID = JC.JourneyID
					INNER JOIN [dbo].[vwTransaction] T					ON T.CustomerID = JC.CustomerID
					INNER JOIN [dbo].[vwTransactionAllocation] TA		ON TA.TransactionID = T.TransactionID
					INNER JOIN [dbo].[vwWeekEnding] WE					ON CAST(T.PaidDate AS DATE)  BETWEEN WE.StartDate AND WE.EndDate
					WHERE 
							We.WeekNo	= @WeekNo 
						AND WE.YearNo = @YearNo
						AND  CAST(JC.StartDate AS DATE) <= WE.EndDate  
						AND (CAST(JC.EndDate AS DATE)   >= WE.StartDate OR JC.EndDate IS NULL)
						AND T.PaymentTypeID IN (@tranCash,@tranSettelment,@PaymentTypeCostID)				 
				) AS PVT
				UNPIVOT(Amount
				FOR BalanceType IN ([A-C-Cash],[A-C-Card],[A-C-Central],[A-L-Loans])) AS UNPVTTable
				--FOR BalanceType IN ([D-C-Cash],[A-C-Cash],[A-C-Card],[A-C-Central])) AS UNPVTTable
				--AND ResponseStatusID IS NULL				-- Exclude Card Payment.
				
				-- Adding Actual-Loan Records

				----UNION ALL

				----SELECT 
				----	 J.PrimaryAgent				AS AgentID
				----	,@isPrimaryTrue				AS isPrimary
				----	,J.JourneyID				AS JourneyID
				----	,WE.YearNo					AS YearNo
				----	,WE.WeekNo					AS WeekNo
				----	,'A-L-Loans'				AS BalanceType
				----	,A.Principal				AS Amount
				----FROM [dbo].[vwJourneyCustomer] JC
				----INNER JOIN #TempBranchDetails J ON J.JourneyID = JC.JourneyID
				----INNER JOIN [dbo].[vwAgreement] A ON A.CustomerID = JC.CustomerID
				----INNER JOIN [dbo].[vwWeekEnding] WE ON	CAST(A.AgreementStartDate AS DATE)  BETWEEN WE.StartDate AND WE.EndDate
				----WHERE 
				----We.WeekNo	= @WeekNo AND WE.YearNo = @YearNo
				----AND  CAST(JC.StartDate AS DATE)   <= WE.EndDate  
				----AND (CAST(JC.EndDate AS DATE)  >= WE.StartDate OR JC.EndDate IS NULL)

			) BalanceTypeTransactions
			GROUP BY AgentID,isPrimary,JourneyID,YearNo,WeekNo,BalanceType
		
		-- ACTUAL & DECLARED INSERT : END

			-- SELECT * FROM #TempBalanceTypeSummary order by BalanceType

			IF @@ROWCOUNT = 0 
			BEGIN

				SELECT		PrimaryAgent	AS AgentID
							,@isPrimaryTrue	AS isPrimary
							,JourneyID		AS JourneyID		
							,JourneyDesc	AS JourneyDesc
							,FirstName		AS FirstName
							,LastName		AS LastName
							,@YearNo		AS YearNo
							,@WeekNo		AS WeekNo
							,NULL			AS [D-C-Cash]	
							,NULL			AS [D-B-Cash Banked]
							,NULL			AS [D-F-Float]
							,NULL			AS [D-L-Loans]
							,NULL			AS [D-O-Others/RAC]
							,NULL			AS [D-S-Shorts and Overs] 
							,NULL			AS [A-C-Cash]
							,NULL			AS [A-C-Card]
							,NULL			AS [A-C-Central]
							,NULL			AS [A-B-Cash Banked]
							,NULL			AS [A-F-Float]
							,NULL			AS [A-L-Loans]
							,NULL			AS [A-S-Shorts and Overs]
				FROM #TempBranchDetails

			END
			ELSE
			BEGIN
				SELECT	PVT.AgentID			AS AgentID, 
						PVT.isPrimary		AS isPrimary,
						JS.JourneyID		AS JourneyID,
						JS.JourneyDesc		AS JourneyDesc
						--J.PrimaryAgent AS PrimaryAgent
						,U.FirstName		AS FirstName
						,U.LastName			AS LastName
						,PVT.YearNo			AS YearNo
						,PVT.WeekNo			AS WeekNo
						,[D-C-Cash]	
						,[D-B-Cash Banked]
						,[D-F-Float]
						,[D-L-Loans]
						,[D-O-Others/RAC]
						,[D-S-Shorts and Overs] 
						,[A-C-Cash]
						,[A-C-Card]
						,[A-C-Central]
						,CASE WHEN [A-B-Cash Banked] IS NULL AND isPrimary = 0 THEN
							0
						 ELSE 
							[A-B-Cash Banked]
						 END AS [A-B-Cash Banked]
						,CASE WHEN [A-F-Float] IS NULL AND isPrimary = 0 THEN
							0
						 ELSE 
							[A-F-Float]
						 END AS [A-F-Float]
						,[A-L-Loans]
						,CASE WHEN isPrimary = 1 THEN
						(ISNULL([A-C-Cash],0) - ISNULL([A-L-Loans],0) - ISNULL([D-O-Others/RAC],0) + ISNULL([A-F-Float],0) - ISNULL([A-B-Cash Banked],0))
						ELSE NULL END
						 AS [A-S-Shorts and Overs]
				FROM #TempBranchDetails J
				INNER JOIN
				(
					SELECT AgentID,isPrimary,JourneyID,YearNo,WeekNo,BalanceType AS BalanceType,SUM(Amount) AS Amount from #TempBalanceTypeSummary
					GROUP BY AgentID,isPrimary,JourneyID,YearNo,WeekNo,BalanceType) temp
					PIVOT (SUM(Amount)
					FOR BalanceType in ([D-C-Cash],[D-C-Card],[D-C-Central],[D-B-Cash Banked],[D-F-Float],[D-L-Loans],[D-O-Others/RAC],[D-S-Shorts and Overs],
										[A-C-Cash],[A-C-Card],[A-C-Central],[A-B-Cash Banked],[A-F-Float],[A-L-Loans],[A-O-Others/RAC])
				) AS PVT
				 ON J.JourneyID = PVT.JourneyID
				 LEFT JOIN dbo.vwUser U ON U.UserID = COALESCE(PVT.AgentID, J.PrimaryAgent)
				 LEFT JOIN mobile.vwJourneySelection JS ON JS.UserID = PVT.AgentID
				ORDER BY  PVT.isPrimary DESC,U.FirstName,U.LastName
			END
			

        END TRY
		BEGIN CATCH

			SELECT   'ERR-155' AS ErrorCode,CONVERT(VARCHAR(5),ERROR_NUMBER()) + ' : ' + Convert(VARCHAR(20),ERROR_LINE()) + ' : ' + Convert(VARCHAR(3500),ERROR_MESSAGE()) AS ErrorMessage;

		END CATCH
    SET NOCOUNT OFF
   
    RETURN
END
GO

sp_recompile '[mobile].[AP_S_JourneyBalanceReportData]'
GO


