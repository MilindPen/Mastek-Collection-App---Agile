/*--
27	2016	27	2016-06-30	2016-07-06	
28	2016	28	2016-07-07	2016-07-13	
29	2016	29	2016-07-14	2016-07-20	

Branch 23-S&U Peterborough,28-S&U Exeter week - 27

EXEC [mobile].[AP_S_JourneyBalanceReportDetailsData] 1757,2016,27
GO

245 : 149 : Conversion failed when converting the varchar value '*' to data type int.

*/

IF  EXISTS (SELECT * FROM SYS.OBJECTS WHERE object_id = OBJECT_ID(N'[mobile].[AP_S_JourneyBalanceReportDetailsData]') AND TYPE in (N'P', N'PC'))
DROP PROCEDURE [mobile].[AP_S_JourneyBalanceReportDetailsData]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER OFF
GO

-- Create Procedure -----------------------------------------------
CREATE PROCEDURE [mobile].[AP_S_JourneyBalanceReportDetailsData]
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

		CREATE TABLE #TempBalanceTypeSummary 
					(
							TempID                          INT				IDENTITY(1,1),
							RowID							BIGINT			NULL,
							AgentID							INT				NULL,
							isPrimary						BIT				NULL,
							JourneyID						INT				NULL,
							WeekNo							INT				NULL,
							YearNo							INT				NULL,
							BalanceType						VARCHAR(50)		NULL,
							Reference						VARCHAR(250)	NULL,
							Cheque_Ind						BIT				NULL,
							PaidDate						DATE			NULL,
							Amount				            MONEY			NULL,
							SortOrder						TINYINT			NULL							
					)

		
		CREATE CLUSTERED INDEX [C_I_JourneyIDBalanceTypetemp] ON #TempBalanceTypeSummary
					(
						JourneyID,BalanceType ASC
					)

		CREATE TABLE #TempBalanceTypeSummarySorted 
						(
							ID								INT				IDENTITY(1,1),
							SortOrder						TINYINT			NULL,
							FirstName						VARCHAR(100)	NULL,	
							LastName						VARCHAR(100)	NULL,	
							AgentID							INT				NULL,
							isPrimary						BIT				NULL,
							JourneyID						INT				NULL,
							WeekNo							INT				NULL,
							YearNo							INT				NULL,
							BalanceType						VARCHAR(50)		NULL,
							Reference						VARCHAR(250)	NULL,
							Cheque_Ind						BIT				NULL,
							PaidDate						DATE			NULL,
							Amount							MONEY			NULL
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
							RowID,							
							AgentID,
							isPrimary,
							JourneyID,
							YearNo,
							WeekNo,
							BalanceType,
							Reference,
							Cheque_Ind,
							PaidDate,
							Amount,
							SortOrder
					)
			SELECT RowID,AgentID,isPrimary,JourneyID,YearNo,WeekNo,BalanceType,Reference,Cheque_Ind,PaidDate,SUM(AMOUNT),SortOrder FROM 
			(

				--@AmountTypeDeclared	--[D-C-Cash],[D-C-Card],[D-C-Central],[D-B-Cash Banked],[D-F-Float],[D-L-Loans],[D-O-Others/RAC],[D-S-Shorts and Overs], 
				--@AmountTypeActual		--[A-C-Cash],[A-C-Card],[A-C-Central],[A-D-Cash Banked],[A-W-Float],[A-L-Loans],[A-O-Others/RAC],[A-S-Shorts and Overs]

				Select
					ID							AS [RowID]	
					,J.PrimaryAgent				AS [AgentID]
					,1							AS [isPrimary]
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
					,DA.Reference				AS [Reference]
					,DA.Cheque_Ind				AS [Cheque_Ind]
					,DA.BalanceDate				AS [PaidDate]
					,DA.Amount					AS [Amount]
					,CASE 
						WHEN DA.BalanceTypeID = 'C' THEN 1 --@AmountTypeDeclared + '-C-Cash'
						WHEN DA.BalanceTypeID = 'B' THEN 7 --@AmountTypeDeclared + '-B-Cash Banked'			--DA.BalanceTypeID + '-' + DA.BalanceTypeDesc
						WHEN DA.BalanceTypeID = 'F' THEN 3 --@AmountTypeDeclared + '-F-Float'				--DA.BalanceTypeID + '-' + DA.BalanceTypeDesc
						WHEN DA.BalanceTypeID = 'L' THEN 5 --@AmountTypeDeclared + '-L-Loans'				--DA.BalanceTypeID + '-' + DA.BalanceTypeDesc
						WHEN DA.BalanceTypeID = 'O' THEN 9 --@AmountTypeDeclared + '-O-Others/RAC'			--DA.BalanceTypeID + '-' + DA.BalanceTypeDesc
						--WHEN DA.BalanceTypeID = 'S' THEN @AmountTypeDeclared + '-S-Shorts and Overs'	--DA.BalanceTypeID + '-' + DA.BalanceTypeDesc
						WHEN DA.BalanceTypeID = 'D' THEN 8 --@AmountTypeActual	 + '-B-Cash Banked'			--DA.BalanceTypeID + '-' + DA.BalanceTypeDesc
						WHEN DA.BalanceTypeID = 'W' THEN 4 --@AmountTypeActual   + '-F-Float'				--DA.BalanceTypeID + '-' + DA.BalanceTypeDesc
					 END AS SortOrder				 
					
				FROM [mobile].[vwDashboardAmount] DA
				INNER JOIN [dbo].[vwWeekEnding] WE ON CAST(DA.BalanceDate AS DATE) BETWEEN WE.StartDate AND WE.EndDate
				INNER JOIN #TempBranchDetails J ON J.JourneyID = DA.JourneyID --AND J.PrimaryAgent = DA.CreatedBy
				WHERE We.WeekNo	= @WeekNo AND WE.YearNo = @YearNo
				AND DA.BalanceTypeID IN (	@LoanBalancTypeID,		
											@OthersRACBalancTypeID,		
											@FloatBalancTypeID,			
											@CashBankedBalancTypeID,
											--@SOBalancTypeID,		
											@CollectionsBalancTypeID,   
											@ActualFloatBalancTypeID,	
											@ActualCashBankedBalancTypeID
										)
				
				UNION ALL 
	
				SELECT
					 ID							AS [RowID]	
					,DDA.DelegatedtoUserID		AS [AgentID]
					,0							AS [isPrimary]
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
					,DDA.Reference				AS [Reference]
					,DDA.Cheque_Ind				AS [Cheque_Ind]
					,DDA.BalanceDate			AS [PaidDate]
					,DDA.Amount					AS [Amount]
					,CASE 
						WHEN DDA.BalanceTypeID = 'C' THEN 1	--@AmountTypeDeclared + '-C-Cash'
						WHEN DDA.BalanceTypeID = 'B' THEN 7 --@AmountTypeDeclared + '-B-Cash Banked'		--DA.BalanceTypeID + '-' + DA.BalanceTypeDesc
						WHEN DDA.BalanceTypeID = 'F' THEN 3 --@AmountTypeDeclared + '-F-Float'				--DA.BalanceTypeID + '-' + DA.BalanceTypeDesc
						WHEN DDA.BalanceTypeID = 'L' THEN 5 --@AmountTypeDeclared + '-L-Loans'				--DA.BalanceTypeID + '-' + DA.BalanceTypeDesc
						WHEN DDA.BalanceTypeID = 'O' THEN 9 --@AmountTypeDeclared + '-O-Others/RAC'			--DA.BalanceTypeID + '-' + DA.BalanceTypeDesc
						--WHEN DDA.BalanceTypeID = 'S' THEN @AmountTypeActual	  + '-S-Shorts and Overs'	--DA.BalanceTypeID + '-' + DA.BalanceTypeDesc
						WHEN DDA.BalanceTypeID = 'D' THEN 8 --@AmountTypeActual	  + '-B-Cash Banked'		--DA.BalanceTypeID + '-' + DA.BalanceTypeDesc
						WHEN DDA.BalanceTypeID = 'W' THEN 4 --@AmountTypeActual   + '-F-Float'				--DA.BalanceTypeID + '-' + DA.BalanceTypeDesc
					 END AS SortOrder
					 
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
				--[D-C-Cash],[A-C-Cash],[A-C-Card],[A-C-Central]
				SELECT [RowID],[AgentID],isPrimary,[JourneyID],[YearNo],[WeekNo],[BalanceType],[Reference],Cheque_Ind,PaidDate,[Amount] 
						,CASE 
						WHEN UNPVTTable.[BalanceType] = 'D-C-Cash' THEN 1	
						WHEN UNPVTTable.[BalanceType] = 'A-C-Cash' THEN 2 
						WHEN UNPVTTable.[BalanceType] = 'A-L-Loans' THEN 6 
						ELSE NULL 
					 END AS SortOrder
				
				FROM
				(
					SELECT
						   --T.TransactionID			AS [RowID]
						   NULL							AS [RowID]
						  ,CASE 
							WHEN T.PaymentTypeID in (@tranCash,@tranSettelment) 
								AND T.ResponseStatusID is NULL AND T.CreatedBy <> J.PrimaryAgent
							THEN NULL
							ELSE T.CreatedBy	
						  END AS [AgentID]
						 ,CASE 
							WHEN T.CreatedBy = J.PrimaryAgent
							THEN 1
							ELSE 0
							END
						 AS isPrimary
						,J.JourneyID				AS [JourneyID]
						,WE.YearNo					AS [YearNo]
						,WE.WeekNo					AS [WeekNo]
						,CASE 
							WHEN T.PaymentTypeID = @PaymentTypeCostID
								AND TA.TransactionTypeID <> @TransactionTypeCostRev		-- Cost Reversal - 55
							THEN C.CustomerNumber
							ELSE NULL	
						 END AS [Reference]
						,NULL						AS [Cheque_Ind]
						--,CAST(T.PaidDate AS DATE)	AS [PaidDate]
						,CASE 
							WHEN T.PaymentTypeID = @PaymentTypeCostID
								AND TA.TransactionTypeID <> @TransactionTypeCostRev		-- Cost Reversal - 55
							THEN CAST(T.PaidDate AS DATE)
							ELSE CAST(WE.StartDate AS DATE)
						 END AS [PaidDate]
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
					INNER JOIN [dbo].[vwCustomer]	C					ON C.CustomerID = T.CustomerID
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
				--UNION ALL

				--SELECT 
				--	 A.AgreementID				AS [RowID]	
				--	,J.PrimaryAgent				AS AgentID
				--	,1							AS isPrimary
				--	,J.JourneyID				AS JourneyID
				--	,WE.YearNo					AS YearNo
				--	,WE.WeekNo					AS WeekNo
				--	,'A-L-Loans'				AS BalanceType
				--	,C.CustomerNumber   		AS [Reference]
				--	,NULL						AS [Cheque_Ind]
				--	,CAST(A.AgreementStartDate AS DATE)	AS [PaidDate]
				--	,A.Principal				AS Amount
				--	,6							AS SortOrder
				--FROM [dbo].[vwJourneyCustomer] JC
				--INNER JOIN #TempBranchDetails J ON J.JourneyID = JC.JourneyID
				--INNER JOIN [dbo].[vwAgreement] A ON A.CustomerID = JC.CustomerID
				--INNER JOIN  dbo.vwCustomer C	ON C.CustomerID = A.CustomerID
				--INNER JOIN [dbo].[vwWeekEnding] WE ON	CAST(A.AgreementStartDate AS DATE)  BETWEEN WE.StartDate AND WE.EndDate
				--WHERE 
				--We.WeekNo	= @WeekNo AND WE.YearNo = @YearNo
				--AND  CAST(JC.StartDate AS DATE)   <= WE.EndDate  
				--AND (CAST(JC.EndDate AS DATE)  >= WE.StartDate OR JC.EndDate IS NULL)

			) BalanceTypeTransactions
			GROUP BY AgentID,isPrimary,JourneyID,YearNo,WeekNo,SortOrder,BalanceType,Reference,Cheque_Ind,PaidDate,RowID 
		
		-- ACTUAL & DECLARED INSERT : END

		-- Sorting Records as per Requirment

			INSERT INTO #TempBalanceTypeSummarySorted
				(
					SortOrder,
					FirstName,
					LastName,
					AgentID,
					isPrimary,
					JourneyID,
					WeekNo,
					YearNo,
					BalanceType,
					Reference,
					Cheque_Ind,
					PaidDate,
					Amount
				)		
			SELECT	T.SortOrder			AS SortOrder,
					U.FirstName			AS FirstName,
					U.LastName			AS LastName,
					T.AgentID			AS AgentID,
					T.isPrimary			AS isPrimary,
					T.JourneyID			AS JourneyID,
					T.WeekNo			AS WeekNo,
					T.YearNo			AS YearNo,
					T.BalanceType		AS BalanceType,
					T.Reference			AS Reference,
					T.Cheque_Ind		AS Cheque_Ind,
					T.PaidDate			AS PaidDate,
					T.Amount			AS Amount
			FROM #TempBalanceTypeSummary  T
			LEFT JOIN  dbo.vwUser U ON U.UserID = T.AgentID
			WHERE T.BalanceType NOT IN ('A-L-Loans','D-L-Loans','A-C-Card','A-C-Central','D-S-Shorts and Overs','A-S-Shorts and Overs')  -- Details for these Transactions are not desplayed.
			ORDER by T.SortOrder,BalanceType,IsPrimary Desc,U.FirstName,U.LastName,PaidDate,Amount
			
			
			INSERT INTO #TempBalanceTypeSummarySorted
				(
					SortOrder,
					FirstName,
					LastName,
					AgentID,
					isPrimary,
					JourneyID,
					WeekNo,
					YearNo,
					BalanceType,
					Reference,
					Cheque_Ind,
					PaidDate,
					Amount
				)		
			SELECT	T.SortOrder			AS SortOrder,
					U.FirstName			AS FirstName,
					U.LastName			AS LastName,
					T.AgentID			AS AgentID,
					T.isPrimary			AS isPrimary,
					T.JourneyID			AS JourneyID,
					T.WeekNo			AS WeekNo,
					T.YearNo			AS YearNo,
					T.BalanceType		AS BalanceType,
					T.Reference			AS Reference,
					T.Cheque_Ind		AS Cheque_Ind,
					T.PaidDate			AS PaidDate,
					T.Amount			AS Amount
			FROM #TempBalanceTypeSummary  T
			LEFT JOIN  dbo.vwUser U ON U.UserID = T.AgentID
			WHERE T.BalanceType IN ('A-L-Loans','D-L-Loans')
			ORDER by T.SortOrder,BalanceType,T.Reference,Amount
			

			-- Final Select of All the Balance Transaction of Selected Journey

			SELECT 
					FirstName,
					LastName,
					AgentID,
					isPrimary,
					JourneyID,
					WeekNo,
					YearNo,
					BalanceType,
					Reference,
					Cheque_Ind,
					PaidDate,
					Amount 
			FROM #TempBalanceTypeSummarySorted 
			ORDER BY SortOrder,ID


        END TRY
		BEGIN CATCH

			SELECT   'ERR-156' AS ErrorCode,CONVERT(VARCHAR(5),ERROR_NUMBER()) + ' : ' + Convert(VARCHAR(20),ERROR_LINE()) + ' : ' + Convert(VARCHAR(3500),ERROR_MESSAGE()) AS ErrorMessage;

		END CATCH
    SET NOCOUNT OFF
   
    RETURN
END
GO

sp_recompile '[mobile].[AP_S_JourneyBalanceReportDetailsData]'
GO


