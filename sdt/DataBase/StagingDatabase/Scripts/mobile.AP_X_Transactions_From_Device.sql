
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[mobile].[AP_X_Transactions_From_Device]') AND type in (N'P', N'PC'))
DROP PROCEDURE [mobile].[AP_X_Transactions_From_Device]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO
-- Create Procedure -----------------------------------------------
CREATE PROCEDURE [mobile].[AP_X_Transactions_From_Device]
        @UserID								 INT,
        @TransactionXML						 XML,
		@IsSyncDone							 TINYINT OUTPUT,
		@ErrorCode							 VARCHAR(10) OUTPUT,
		@ErrorMessage						 VARCHAR(4000) OUTPUT
AS
     BEGIN
    --***************************************************************************
     --*
    --* Description    :  To Sync Transaction from Mobile Offline database with Staging Database.
    --*					@IsSyncDone =  0 - Fail, 1-Success, 2-No Records
    --* Configuration Record
    --* Review              Ver  Author        Date      
    --* S--PRINT 3			1.0  Abhay		   27/04/2016
    --* Review              Ver  Author         Date        CR              Comments 
	--* Defect				1.1  Abhay M.		05-05-2016  Defect-1051		: Fixed. Column visitResultID not updated.
	--* Sprint-4 Changes
	--* Defect				1.2  Abhay M.		18-05-2016  Defect-1334		: Fixed. Unique ResultID Condition Missing while populatinh History for the VisitID. 
	--* Hardning-Sprint4	
	--* Defect				1.3  Abhay M.		17-05-2016	Defect-1488		: Defined Constant for Transaction Type and Payment Type 
    --* Usage : E.g. 
	--			DECLARE @IsSyncDone INT,@ErrorCode varchar(10),@ErrorMessage varchar(4000)
	--			EXec [mobile].[AP_X_Transactions_From_Device] 1,<xml Data>, @IsSyncDone OUTPUT, @ErrorCode OUTPUT, @ErrorMessage OUTPUT 
	--			SELECT  @IsSyncDone , @ErrorCode , @ErrorMessage 
    --***************************************************************************
	    
    DECLARE @intTranCount						INT,
			@intVisitCount						INT,
			@intTempID							INT,
			@intID								INT,
			@intTempVID							INT,
			@intRowsAffected					INT,
			@intResultIDTrCount					INT,

			@intCurrTransactionIDForCash		INT,
			@intCurrTransactionIDForRebate		INT,
			@intCurrTransactionIDForSettleCash	INT,

			@intTransactionType					INT,
			@intAdjTranType						INT,
			@intPaymentType						INT,
			@intMaxResultID						INT,

			@mnySumCashPaid						MONEY,
			@mnySumSettlementCash				MONEY,
			@mnySumRebateCash					MONEY,
			@mnySumRefund						MONEY,

			@mnyHistTermAmount					MONEY,
			@mnyHistRebateAmount				MONEY,
			@mnyHistSettlementAmount			MONEY,
			@mnyHistRefundAmount				MONEY,

			@mnyHistCashAdjustmentAmount		MONEY,
			@mnyHistRebateAdjustmentAmount		MONEY,
			@mnyHistSettlementAdjustmentAmount	MONEY,
			@mnyHistRefundAdjustmentAmount		MONEY,

			--Payment Type
			@tyiPaymentTypeCash					TINYINT,
			@tyiPaymentTypeRebate				TINYINT,
			@tyiPaymentTypeReloanCash			TINYINT,
			@tyiPaymentTypeNotDue				TINYINT,
			@tyiPaymentTypeZero					TINYINT,
			--Transaction Type
			@tyiTransactionTypeCash				TINYINT,
			@tyiTransactionTypeRebate			TINYINT,
			@tyiTransactionTypeSettelment		TINYINT,
			@tyiTransactionTypeNotDue			TINYINT,
			@tyiTransactionTypeAdjustment		TINYINT,
			@tyiVRStatusCalledNotSeenPending	TINYINT,
			
			@tyiTransactionTypeRefund			TINYINT,
			@tyiTransactionTypeRefundAdjustment TINYINT  
			
	-- Setting Veriable
    SELECT	@intTranCount = 0,
			@intRowsAffected = 0,
			@IsSyncDone = 0,
			@ErrorCode='',
			@ErrorMessage='',
			-- Payment Type
			@tyiPaymentTypeCash					= 1,		--Cash - 1
			@tyiPaymentTypeRebate				= 4,		--Rebate - 4
			@tyiPaymentTypeReloanCash			= 5,		--Reloan Cash - 5
			-- Transaction Type
			@tyiTransactionTypeCash				= 1,		--Cash - 1
			@tyiTransactionTypeRebate			= 4,		--Rebate - 4
			@tyiTransactionTypeSettelment		= 50,		--Settlement Cash - 50
			@tyiTransactionTypeNotDue			= 51,		--Cash - Not Due - 51
			@tyiTransactionTypeAdjustment		= 99,		--Adjustment - 99
			@tyiVRStatusCalledNotSeenPending	= 3,		--Called not seen – Pending -- 3
			@tyiTransactionTypeRefund			= 52,		--Refund
			@tyiTransactionTypeRefundAdjustment	= 98		--Refun Adjustment - 99
    -- Procedure Body -------------------------------------------------

    SET NOCOUNT ON
	SET XACT_ABORT ON
	
	--PRINT Convert(VARCHAR(24),getdate(),109) + ' : START'

	BEGIN TRY

		BEGIN TRANSACTION

		--SELECT 1/0
		-- Create #temp Table to insert records from XML
					CREATE TABLE #TempTransactionXmlData (
							TempID                          INT				Identity(1,1),
							ROWNUM							INT				NOT NULL,
							visitID							INT				NOT NULL,
							customerID                      INT				NOT NULL,
							ResultID						VARCHAR(50)		NULL,
							resultStatusID					TINYINT			NULL,
							ResultDate						DATETIME		NULL,
							visitStatusID					TINYINT			NULL,
							agreementID						INT				NULL,
							agreementAmountPaid             MONEY			NULL,
							agreementMode					VARCHAR(2)		NULL,
							TransactionDate					DATETIME		NULL,
					)

					CREATE CLUSTERED INDEX [C_I_vistIDtemp] ON #TempTransactionXmlData
					(
						ResultID ASC
					)

					CREATE NONCLUSTERED INDEX [C_I_agreementIDtemp] ON #TempTransactionXmlData
					(
						agreementID ASC
					)

					CREATE NONCLUSTERED INDEX [C_I_ROWNUMIDtemp] ON #TempTransactionXmlData
					(
						ROWNUM ASC
					)

					-- This will hold the Data for each resultID
					CREATE TABLE #TempVisits (
							tempID							INT				IDENTITY(1,1),
							ResultID						VARCHAR(50)		NOT NULL,
							visitID							INT				NOT NULL,
							customerID						INT				NOT NULL,
							VisitAmount			            MONEY			NULL,
							ResultDate						DATETIME		NULL,
							resultStatusID					TINYINT			NULL,
							visitStatusID					TINYINT			NULL,
					)

					CREATE CLUSTERED INDEX [C_I_tempIDtemp] ON #TempVisits
					(
						tempID ASC
					)
					
					CREATE NONCLUSTERED INDEX [NC_I_ResultIDtemp] ON #TempVisits
					(
						ResultID ASC
					)
					CREATE NONCLUSTERED INDEX [NC_I_visitIDtemp] ON #TempVisits
					(
						visitID ASC
					)
										
					CREATE TABLE #tempResultIDTrsansactions (
							ID								INT				IDENTITY(1,1),
							customerID						INT				NULL,
							AgreementID						INT				NULL,
							AgreementMode					VARCHAR(2)		NULL,
							AgrBalance						MONEY			NULL,
							ResultDate						DATETIME		NULL,
							AgreementAmountPaid				MONEY			NULL,
							CashPaid						MONEY			NULL,
							SettlementCash					MONEY			NULL,
							RebateCash						MONEY			NULL,
							OldTerm							MONEY			NULL,
							OldRebate						MONEY			NULL,
							OldSettlement					MONEY			NULL,
							OldCashNotDue					MONEY			NULL,
							OldCashAdjustment				MONEY			NULL,
							OldRebateAdjustment				MONEY			NULL,
							OldSettlementAdjustment			MONEY			NULL,
							Refund							MONEY			NULL,
							OldRefund						MONEY			NULL,
							OldRefundAdjustment				MONEY			NULL
					)

					CREATE CLUSTERED INDEX [C_I_IDtemp] ON #tempResultIDTrsansactions
					(
						ID ASC
					)

					CREATE NONCLUSTERED INDEX [NC_I_AgreementIDtempResultIDTrsansactions] ON #tempResultIDTrsansactions
					(
						AgreementID ASC
					)

					CREATE TABLE #VisitAgreementHistory(
							AgreementID						INT		NULL,
							Term							MONEY	NULL,
							Rebate							MONEY	NULL,			
							Settlement						MONEY	NULL,
							CashNotDue						MONEY	NULL,
							CashAdjustment					MONEY	NULL,
							RebateAdjustment				MONEY	NULL,
							SettlementAdjustment			MONEY	NULL,
							Refund							MONEY	NULL,
							RefundAdjustment				MONEY	NULL
							)
					CREATE CLUSTERED INDEX [NC_I_AgreementIDVisitAgreementHistory] ON #VisitAgreementHistory
					(
						AgreementID ASC
					)

		-- 'Insert all row records from XML to #TempTransactionXmlData'
		--'<transactionDetails><visitID>53</visitID><resultID>1631822451398155</resultID><resultStatusID>2</resultStatusID>
		--<agreementAmountPaid>20</agreementAmountPaid><customerID>1398155</customerID><agreementID>1981056</agreementID>
		--<resultDate>2016-05-03 18:22:45</resultDate><visitStatusID>2</visitStatusID>
		--<agreementMode>T</agreementMode></transactionDetails><access><userType>Agent</userType><userId>1</userId></access>'

			--PRINT Convert(VARCHAR(24),getdate(),109) + ' : XML INSERT START'
			--Dump records from XML into #temp Table without ordering
			SELECT  
					transactionDetails.value('visitID[1]','INT')					AS VisitID,
					transactionDetails.value('customerID[1]','INT')					AS CustomerID,
					transactionDetails.value('resultID[1]','VARCHAR(50)')			AS ResultID,
					transactionDetails.value('resultStatusID[1]','INT')				AS resultStatusID,
					transactionDetails.value('resultDate[1]','DATETIME')			AS ResultDate,
					transactionDetails.value('visitStatusID[1]','INT')				AS VisitStatusID,
					transactionDetails.value('agreementID[1]','INT')				AS AgreementID,
					transactionDetails.value('agreementAmountPaid[1]','MONEY')		AS AgreementAmountPaid,
					transactionDetails.value('agreementMode[1]','VARCHAR(2)')		AS AgreementMode,
					transactionDetails.value('resultDate[1]','DATETIME')			AS TransactionDate
			INTO
			#Temp1
			FROM @TransactionXML.nodes('transactionDetails')Catalog(transactionDetails)
			--Add Records Sorted with resultDate
			INSERT INTO #TempTransactionXmlData(
					ROWNUM,
					visitID,
					customerID,
					ResultID,
					resultStatusID,
					ResultDate,
					visitStatusID,
					agreementID,
					agreementAmountPaid,
					agreementMode,
					TransactionDate)
			SELECT  ROW_NUMBER() OVER(PARTITION BY resultID,agreementID ORDER BY resultDate DESC) AS ROWNUM,
					visitID,
					customerID,
					resultID,
					resultStatusID,
					resultDate,
					visitStatusID,
					agreementID,
					agreementAmountPaid,
					agreementMode,
					TransactionDate
			FROM #Temp1
			ORDER BY resultDate
			
						
			SET @intRowsAffected = @@ROWCOUNT  

			SET @intTranCount    = IDENT_CURRENT('#TempTransactionXmlData') --SCOPE_IDENTITY() 

			--PRINT Convert(VARCHAR(24),getdate(),109) + ' : XML INSERT END'

			--Select * from #TempTransactionXmlData
			--DELETE FROM #TempTransactionXmlData WHERE ROWNUM > 1   -- Deleting Duplicate Records

		If @intTranCount > 0 
		BEGIN
			-- Transaction Creation Start here
			-- Following Tables will be affected by single transaction
			-- [dbo].[tblVisit]						-- UPDATE
			-- [dbo].[tblVisitResult]				-- INSERT
			-- [dbo].[tblTransaction]				-- INSERT
			-- [dbo].[tblTransactionAllocation]		-- INSERT

			-- Selecting individual visits Based on ResultID (YYMMDDHHMMSS<CustID>)
			INSERT INTO #TempVisits(
						ResultID,
						VisitID, 
						customerID,
						resultStatusID,
						visitStatusID,
						VisitAmount,
						ResultDate
						)
			SELECT	ResultID,
					VisitID,
					customerID, 
					resultStatusID	as resultStatusID,	-- This will same for every  record for same ResultID (YYMMDDHHMMSS<CustID>)
					visitStatusID AS visitStatusID,		-- This will same for every  record for same ResultID (YYMMDDHHMMSS<CustID>)
					SUM(AgreementAmountPaid) AS Amount, -- This New Amount Submitted by Agent
					MAX(ResultDate) AS ResultDate
			FROM	#TempTransactionXmlData
			WHERE ROWNUM = 1							--- Latest value from that visit
			GROUP BY ResultID,VisitID,customerID,resultStatusID,visitStatusID
			ORDER BY ResultDate							--	DEFETCT-1393


			SET @intVisitCount = IDENT_CURRENT('#TempVisits')  --SCOPE_IDENTITY()			-- Total number of Agents Visits (Distinct ResultID (YYMMDDHHMMSS<CustID>))

			--SELECT * from #TempVisits

			SET @intTempVID = 1;

				-- LOOP for every individual Visit made to Customers (for each ResultID)
		
				WHILE @intTempVID <= @intVisitCount
				BEGIN
					
					TRUNCATE TABLE #tempResultIDTrsansactions		-- Delete all records of previous ResultID.
					TRUNCATE TABLE #VisitAgreementHistory			-- Delete all Agr History records of previous ResultID.
					-- Populating Transactions data for every individual visit(ResultID)

					--SELECT 'SELECT Visit' , * from #TempVisits Where tempID = @intTempVID

					SET @intResultIDTrCount = 0
					/*	BELOW TABLE IS USED TO DERIVE AGREEMENT HISTORIC PAYMENT 
						PaymentTypeID-TransactionTypeID  = PaymentType - Transaction Type
								[1-1]					 =	Cash-Cash
								[4-4]					 =	Rebate-Rebate
								[5-50]					 =	Reloan Cash-Settlement Cash
								[1-51]					 =	Cash-Cash - Not Due
								[1-99]					 =	Cash-Adjustment
								[4-99]					 =	Rebate-Adjustment
								[5-99]					 =	Reloan Cash-Adjustment
								[1-52]					 =	Cash-Refund
								[1-98]					 =	Cash-Refund Adjustment
					*/

					--PRINT Convert(VARCHAR(24),getdate(),109) + ' : #VisitAgreementHistory INSERT START'

					INSERT INTO #VisitAgreementHistory(
							AgreementID,
							Term,
							Rebate,
							Settlement,
							CashNotDue,
							CashAdjustment,
							RebateAdjustment,
							SettlementAdjustment,
							Refund,
							RefundAdjustment
							)
					Select AgreementID,[1-1] AS 'Term',[4-4] AS 'Rebate',[5-50] AS 'Settlement',[1-51] AS 'CashNotDue',[1-99] AS 'CashAdjustment',[4-99] AS 'RebateAdjustment',[5-99] AS 'SettlementAdjustment',[1-52] AS 'Refund',[1-98] AS 'RefundAdjustment'
					FROM (SELECT TA.AgreementID,Convert(varchar(4), T.PaymentTypeID) + '-' + Convert(varchar(4),TA.TransactionTypeID) AS PaymentTranType,SUM(TA.Amount) AS AmountPaid 
						  FROM #TempTransactionXmlData tXD 
					INNER JOIN dbo.tblTransactionAllocation TA	ON tXD.AgreementID	= TA.AgreementID
					INNER JOIN dbo.tblTransaction T				ON TA.TransactionID = T.TransactionID
					INNER JOIN dbo.tblVisitResult VR			ON VR.ResultID		= T.VisitResultID
					INNER JOIN #TempVisits tV 					ON tV.VisitID 		= VR.VisitID  AND tV.ResultID = tXD.ResultID  -- Fixed Defect - 1334
					WHERE   tXD.ROWNUM = 1
							AND tV.tempID = @intTempVID
					GROUP by TA.AgreementID,Convert(VARCHAR(4), T.PaymentTypeID) + '-' + Convert(VARCHAR(4),TA.TransactionTypeID)) temp
					PIVOT (
						SUM(AmountPaid) 
						FOR PaymentTranType in ([1-1],[4-4],[5-50],[1-51],[1-99],[4-99],[5-99],[1-52],[1-98])) AS pvt
					ORDER BY pvt.AgreementID
					
					--Cash-Cash	Cash-Adjustment	Rebate-Rebate	Rebate-Adjustment	Reloan Cash-Settlement Cash	Reloan Cash-Adjustment	Cash-Cash - Not Due

					--PRINT Convert(VARCHAR(24),getdate(),109) + ' : #VisitAgreementHistory INSERT END'

					--SELECT * FROM #VisitAgreementHistory

					-- Populating Amount Paid Details for Current Agreement
					INSERT INTO #tempResultIDTrsansactions(
							customerID,
							AgreementID,
							AgreementMode,
							AgrBalance,
							ResultDate,
							AgreementAmountPaid,
							CashPaid,
							SettlementCash,
							RebateCash,
							Refund	
						) 
					SELECT	tXD.customerID,
							A.AgreementID, 
							tXD.agreementMode,
							A.Balance,
							tv.ResultDate,
							tXD.AgreementAmountPaid,
							CASE WHEN tXD.agreementMode = 'S' 
								 THEN A.Terms 
								 ELSE 
									ISNULL(tXD.AgreementAmountPaid,0) 
								 END AS CashPaid,
							CASE WHEN tXD.agreementMode = 'S'
								 THEN (ISNULL(A.Balance,0)) - ISNUll(A.SettlementRebate,0) - A.Terms
								 ELSE
									0
								 END AS SettlementCash,
							CASE WHEN tXD.agreementMode = 'S'
								 THEN ISNULL(A.SettlementRebate,0)
								 ELSE
									0
								 END AS RebateCash,
							CASE WHEN tXD.agreementMode = 'R'
								 THEN (ISNULL(A.Balance,0) - ISNUll(A.SettlementRebate,0))
								 ELSE
									0
								 END AS Refund  
					FROM	#TempTransactionXmlData tXD
					INNER JOIN #TempVisits tV 				ON tV.ResultID 		= tXD.ResultID
					INNER JOIN dbo.vwVisit	V				ON tV.VisitID 		= V.VisitID
					INNER JOIN dbo.tblAgreement A 			ON tXD.AgreementID 	= A.AgreementID
																AND A.CustomerID	= V.CustomerID
					--INNER JOIN #VisitAgreementHistory AH	ON tXD.AgreementID 	= AH.AgreementID
					WHERE tV.tempID = @intTempVID
					 AND tXD.ROWNUM = 1 
						 --AND V.StatusID = 1 -- Just to Check Pending Visits.

					SET @intResultIDTrCount = IDENT_CURRENT('#tempResultIDTrsansactions') --SCOPE_IDENTITY() -- Total records inserted per ResultID (Per Agreement one record)

					-- UPDATE #tempResultIDTrsansactions WITH OLD VALUE
					UPDATE tXD
							SET	 tXD.OldTerm					= AH.Term
								,tXD.Oldrebate					= AH.Rebate
								,tXD.OldSettlement				= AH.Settlement
								,tXD.OldCashNotDue				= AH.CashNotDue
								,tXD.OldCashAdjustment			= AH.CashAdjustment	
								,tXD.OldRebateAdjustment		= AH.RebateAdjustment	
								,tXD.OldSettlementAdjustment	= AH.SettlementAdjustment	
								,tXD.OldRefund					= AH.Refund
								,tXD.OldRefundAdjustment		= AH.RefundAdjustment
					FROM	#tempResultIDTrsansactions tXD
					LEFT JOIN #VisitAgreementHistory AH ON tXD.AgreementID = AH.AgreementID
				
					--SELECT '#tempResultIDTrsansactions', IDENT_CURRENT('#tempResultIDTrsansactions')

					-- To Check invalid Agreements in input XML

					IF NOT EXISTS(SELECT 1 FROM #tempResultIDTrsansactions)  -- OR ident_current(name)
					BEGIN

						--PRINT 'To Check invalid Agreements in input XML'
					
						SET @IsSyncDone = 0;
						SET @ErrorCode='ERR-250'
						SET @ErrorMessage= 'No Records Found'			
        
						ROLLBACK TRANSACTION;
						RETURN;
						
					END
						
						-- Temp Code to generate ResultID, This can be removed once ResultID column controverted into IDENTITY Column.

					-- UPDATING [dbo].[tblVisit]  Table
					UPDATE V SET	
									StatusID		= tV.visitStatusID
									,UpdatedDate	= GETDATE()
									,UpdatedBy		= @UserID
					FROM [dbo].[tblVisit] V
					INNER JOIN #TempVisits tV ON tV.VisitID = V.visitID
					WHERE tV.tempID = @intTempVID	

					--PRINT 'Inserts records in [tblVisitResult] Table'
					DECLARE @intVisitResultID					INT = 0							-- Fixed Defect - 1051 -  
					DECLARE @mnyHistAmount						MONEY = 0
					DECLARE @mnyHistRefund						MONEY = 0

					--SELECT @intMaxResultID = 0
						
					--SELECT @intMaxResultID = MAX(ResultID)  from [dbo].[tblVisitResult]
					-- SET Historical Cash Transaction to NULL after REFUND.

					UPDATE #VisitAgreementHistory
					SET		
								Term = NULL,
								Rebate = NULL,
								Settlement = NULL,
								CashNotDue = NULL, 
								CashAdjustment = NULL,
								RebateAdjustment = NULL,
								SettlementAdjustment = NULL
					WHERE 
						REFUND IS NOT NULL
						OR AgreementID IN (SELECT AgreementID FROM #tempResultIDTrsansactions WHERE AgreementMode = 'R')

					SELECT @mnyHistAmount =  (ISNULL(SUM(Term),0) 
											--+ ISNULL(SUM(Rebate),0) 
											+ ISNULL(SUM(Settlement),0) 
											+ ISNULL(SUM(CashNotDue),0) 
											+ ISNULL(SUM(CashAdjustment),0) 
											--+ ISNULL(SUM(RebateAdjustment),0) 
											+ ISNULL(SUM(SettlementAdjustment),0) 
											+ ISNULL(SUM(Refund),0)
											+ ISNULL(SUM(RefundAdjustment),0)),
						   @mnyHistRefund = ISNULL(SUM(Refund),0) + ISNULL(SUM(RefundAdjustment),0)
					FROM #VisitAgreementHistory
					


					--SELECT * from #tempVisits

					--SELECT * from #VisitAgreementHistory

					-- Raise Error
					--Select 1/0



					--SELECT @intVisitResultID = ISNULL(@intMaxResultID,0) + 1

						INSERT INTO [dbo].[tblVisitResult](
									VisitID,
									StatusID,
									AmountPaid,
									ResultDate,
									CreatedDate,
									CreatedBy
									)
						SELECT 		 visitID
									,resultStatusID
									,VisitAmount - @mnyHistAmount 
									,ResultDate
									,GetDate()
									,@UserID
 						FROM #TempVisits tV Where tempID = @intTempVID 

						SET @intVisitResultID  = IDENT_CURRENT('tblVisitResult')

						SET @IsSyncDone = 1

					IF NOT EXISTS(SELECT 1 FROM #TempVisits x
								  WHERE  tempID = @intTempVID
								  AND x.resultStatusID = @tyiVRStatusCalledNotSeenPending		-- Called Not Seen Pending
								  
								  AND @mnyHistAmount = 0)										--	Check if Adjustmnet is created for "Called Not Seen Pending"			
					BEGIN	
						-- Create Transaction in [dbo].[tblTransaction]
					    -- Calculate SUM of CASH for Payment Time.

						--PRINT 'I AM HERE'
						SET @IsSyncDone = 0

						SELECT	@mnySumCashPaid						= 0,
								@mnySumSettlementCash				= 0,
								@mnySumRebateCash					= 0,
								@mnySumRefund						= 0,

								@mnyHistTermAmount					= 0,
								@mnyHistRebateAmount				= 0,
								@mnyHistSettlementAmount			= 0,
								@mnyHistRefundAmount				= 0,
								
								@mnyHistCashAdjustmentAmount		= 0,
								@mnyHistRebateAdjustmentAmount		= 0,
								@mnyHistSettlementAdjustmentAmount	= 0,
								@mnyHistRefundAdjustmentAmount		= 0


						SELECT	@mnySumCashPaid			= SUM(T.CashPaid),
								@mnySumSettlementCash	= SUM(T.SettlementCash),
								@mnySumRebateCash		= SUM(T.RebateCash),
								@mnySumRefund			= SUM(T.Refund)						
						FROM	#tempResultIDTrsansactions T
						
						SELECT	@mnyHistTermAmount			= ISNULL(SUM(Term),0),
								@mnyHistRebateAmount		= ISNULL(SUM(Rebate),0),  
								@mnyHistSettlementAmount	= ISNULL(SUM(Settlement),0),
								@mnyHistRefundAmount		= ISNULL(SUM(Refund),0),
								--@mnyHistTermAmount = ISNULL(SUM(Cash-NotDue),0),
								@mnyHistCashAdjustmentAmount		= ISNULL(SUM(CashAdjustment),0),  
								@mnyHistRebateAdjustmentAmount		= ISNULL(SUM(RebateAdjustment),0), 
								@mnyHistSettlementAdjustmentAmount	= ISNULL(SUM(SettlementAdjustment),0),  
								@mnyHistRefundAdjustmentAmount		= ISNULL(SUM(RefundAdjustment),0)
						FROM #VisitAgreementHistory											
						
						--Select * from #tempResultIDTrsansactions
						--SELECT * from #VisitAgreementHistory


						IF (@mnySumCashPaid >= 0 OR 1 = 1 ) --AND (@mnySumCashPaid <> @mnyHistTermAmount))
						BEGIN
							--Cash,Cost,Charge,Rebate,Reloan Cash,Settlement Cash

							--PRINT 'Inserts records in Transaction and TransactionAllocation Table'

							--Select @intPaymentType = TypeID from [dbo].[tblPaymentType] WHERE PaymentTypeDescription = 'Cash'
							--Select PaymentTypeDescription, TypeID from [dbo].[tblPaymentType] WHERE PaymentTypeDescription = 'Cash'

							INSERT INTO [dbo].[tblTransaction](
										--TransactionID,			-- Generated by System
										CustomerID,
										PaymentTypeID,
										AmountPaid,
										PaidDate,
										VisitResultID,
										CreatedDate,
										CreatedBy
										--OldTransID					-- Need Clarification
										)
							SELECT	CustomerID,
									@tyiPaymentTypeCash,
									@mnySumCashPaid - (@mnyHistTermAmount + @mnyHistCashAdjustmentAmount + @mnyHistRefundAmount + @mnyHistRefundAdjustmentAmount ),
									ResultDate,
									@intVisitResultID,					-- Fixed Defect-1051
									GETDATE(),
									@USerID
									--GETDATE(),
									--@USERID
							FROM #TempVisits
							Where tempID = @intTempVID
							--AND (@mnySumCashPaid - (@mnyHistTermAmount + @mnyHistCashAdjustmentAmount ) > 0

							SET @intCurrTransactionIDForCash = IDENT_CURRENT('[dbo].[tblTransaction]') --SCOPE_IDENTITY()
							--SELECT IDENT_CURRENT('dbo.tblTransaction')
							--PRINT 'TransactionID  -- Cash'
							--SELECT '@intCurrTransactionIDForCash', @intCurrTransactionIDForCash
						END

						IF (
							((@mnyHistSettlementAmount + @mnyHistSettlementAdjustmentAmount) > 0)	OR
							(SELECT COUNT(0) FROM #tempResultIDTrsansactions WHERE AgreementMode in ('S')) > 0
							)
							--AND 
							--(SELECT COUNT(0) FROM #tempResultIDTrsansactions WHERE AgreementMode = 'R') = 0
						-- If There are some Settlement Transactions
						BEGIN
							
							--PRINT 'Insert Transaction for  -- Reloan Cash'
							--Cash,Cost,Charge,Rebate,Reloan Cash,Settlement Cash
							--Select @intPaymentType = TypeID from [dbo].[tblPaymentType] WHERE PaymentTypeDescription = 'Reloan Cash'
							--Select PaymentTypeDescription, TypeID from [dbo].[tblPaymentType] WHERE PaymentTypeDescription = 'Reloan Cash'

							INSERT INTO [dbo].[tblTransaction](
										--TransactionID,			-- Generated by System
										CustomerID,
										PaymentTypeID,
										AmountPaid,
										PaidDate,
										VisitResultID,
										CreatedDate,
										CreatedBy
										)
							SELECT 
										CustomerID,
										@tyiPaymentTypeReloanCash,
										@mnySumSettlementCash - (@mnyHistSettlementAmount + @mnyHistSettlementAdjustmentAmount),
										ResultDate,
										@intVisitResultID,			-- Fixed Defect-1051
										GETDATE(),
										@USerID
							FROM #TempVisits
							Where tempID = @intTempVID
							--@mnyHistRebateAmount,@mnyHistSettlementAmount,@mnyHistTermAmount,@mnyHistAdjustmentAmount
							SET @intCurrTransactionIDForSettleCash = IDENT_CURRENT('[dbo].[tblTransaction]') --SCOPE_IDENTITY() 
							--PRINT 'TransactionID  -- Reloan Cash'
							--SELECT '@intCurrTransactionIDForSettleCash',@intCurrTransactionIDForSettleCash
						END

						IF (((@mnyHistRebateAmount + @mnyHistRebateAdjustmentAmount) > 0)	OR 
							(SELECT COUNT(0) FROM #tempResultIDTrsansactions WHERE AgreementMode in ('S')) > 0)
							--AND 
							--(SELECT COUNT(0) FROM #tempResultIDTrsansactions WHERE AgreementMode = 'R') = 0
							-- If Rebate for There are some Settlement Transactions
						BEGIN
							--Cash,Cost,Charge,Rebate,Reloan Cash,Settlement Cash
							--Select @intPaymentType = TypeID from [dbo].[tblPaymentType] WHERE PaymentTypeDescription = 'Rebate'
							--Select PaymentTypeDescription,TypeID from [dbo].[tblPaymentType] WHERE PaymentTypeDescription = 'Rebate'

							INSERT INTO [dbo].[tblTransaction](
										--TransactionID,			-- Generated by System
										CustomerID,
										PaymentTypeID,
										AmountPaid,
										PaidDate,
										VisitResultID,
										CreatedDate,
										CreatedBy
										)
							SELECT	CustomerID,
									@tyiPaymentTypeRebate,
									@mnySumRebateCash - (@mnyHistRebateAmount + @mnyHistRebateAdjustmentAmount),
									ResultDate,
									@intVisitResultID,					-- Fixed Defect-1051
									GETDATE(),
									@USerID
							FROM #TempVisits
							Where tempID = @intTempVID

							SET @intCurrTransactionIDForRebate = IDENT_CURRENT('[dbo].[tblTransaction]') --SCOPE_IDENTITY() 

							--PRINT 'TransactionID  -- Rebate'
							--SELECT '@intCurrTransactionIDForRebate', @intCurrTransactionIDForRebate
						END
						
						-- Create Transaction in [dbo].[tblTransactionAllocation]


						--NEXT VALUE FOR [mobile].[SequenceTransactionAllocation]
						--Select @intAdjTranType = TypeID from [dbo].[tblTransactionType] WHERE TypeDescription = 'Adjustment'
						--Select TypeDescription, TypeID from [dbo].[tblTransactionType] WHERE TypeDescription = 'Adjustment'
						
						
						--SELECT * from #VisitAgreementHistory

												
						SET @intID = 1
						WHILE @intID <= @intResultIDTrCount 
						BEGIN

								--PRINT 'creat TA'
								
								--Select @mnyHistRefund AS HistRefund, * FROM #tempResultIDTrsansactions

								IF EXISTS (SELECT 1 FROM #tempResultIDTrsansactions
											 WHERE ID = @intID AND AgreementMode in ('T','S','Z'))
								BEGIN

									--Select @intTransactionType = TypeID from [dbo].[tblTransactionType] WHERE TypeDescription = 'Cash'
									--Select TypeDescription, TypeID from [dbo].[tblTransactionType] WHERE TypeDescription = 'Cash'
									
									INSERT INTO [dbo].[tblTransactionAllocation](
												AllocationID,
												TransactionID,
												AgreementID,
												Amount,
												TransactionTypeID,
												CreatedDate,
												CreatedBy
												)
									SELECT		(NEXT VALUE FOR [mobile].[SequenceTransactionAllocation]), -- This Allocation ID generated by SEQUENCE Object
												@intCurrTransactionIDForCash,
												Tx.AgreementID, 
												tx.CashPaid - (ISNULL(AH.Term,0) + ISNULL(AH.CashAdjustment,0)),
												CASE WHEN AH.AgreementID IS NOT NULL AND ((tx.CashPaid - (ISNULL(AH.Term,0) + ISNULL(AH.CashAdjustment,0))) >= 0 ) 
													 THEN @tyiTransactionTypeCash
													 WHEN AH.AgreementID IS NOT NULL AND ((tx.CashPaid - (ISNULL(AH.Term,0) + ISNULL(AH.CashAdjustment,0))) <  0 ) 
													 THEN @tyiTransactionTypeAdjustment
													 ELSE @tyiTransactionTypeCash
												END
												,
												GETDATE(),
												@USERID
									FROM #tempResultIDTrsansactions Tx
									LEFT JOIN #VisitAgreementHistory AH ON Tx.AgreementID = AH.AgreementID
									WHERE	ID = @intID
											AND Tx.AgreementMode in ('T','S','Z')			-- T - Term, S - Settlement, Z - Zero Payment
											AND (AH.Term IS NULL OR ( Tx.CashPaid <> (ISNULL(AH.Term,0) + ISNULL(AH.CashAdjustment,0))))
									
									INSERT INTO [dbo].[tblTransactionAllocation](
												AllocationID,
												TransactionID,
												AgreementID,
												Amount,
												TransactionTypeID,
												CreatedDate,
												CreatedBy
												) 
									SELECT		(NEXT VALUE FOR [mobile].[SequenceTransactionAllocation]), -- This Allocation ID generated by SEQUENCE Object
												@intCurrTransactionIDForSettleCash,
												Tx.AgreementID, 
												--tx.CashPaid - (ISNULL(AH.Settlement,0) + ISNULL(AH.SettlementAdjustment,0)),
												(ISNULL(AH.Settlement,0) + ISNULL(AH.SettlementAdjustment,0)) * -1 ,
												@tyiTransactionTypeAdjustment,
												GETDATE(),
												@USERID
									FROM #tempResultIDTrsansactions Tx
									INNER JOIN #VisitAgreementHistory AH ON Tx.AgreementID = AH.AgreementID
									WHERE	ID = @intID
											AND Tx.AgreementMode in ('T','S','Z')							-- T - Term, S - Settlement, Z - Zero Payment
											AND (AH.Settlement IS NOT NULL AND (AH.Settlement + ISNULL(AH.SettlementAdjustment,0)) > 0)
									
									INSERT INTO [dbo].[tblTransactionAllocation](
												AllocationID,
												TransactionID,
												AgreementID,
												Amount,
												TransactionTypeID,
												CreatedDate,
												CreatedBy
												)
									SELECT		(NEXT VALUE FOR [mobile].[SequenceTransactionAllocation]), -- This Allocation ID generated by SEQUENCE Object
												@intCurrTransactionIDForRebate,
												Tx.AgreementID, 
												--tx.CashPaid - (ISNULL(AH.Rebate,0) + ISNULL(AH.RebateAdjustment,0)),
												(ISNULL(AH.Rebate,0) + ISNULL(AH.RebateAdjustment,0)) * -1 ,
												@tyiTransactionTypeAdjustment,
												GETDATE(),
												@USERID
									FROM #tempResultIDTrsansactions Tx
									INNER JOIN #VisitAgreementHistory AH ON Tx.AgreementID = AH.AgreementID
									WHERE	ID = @intID
											AND Tx.AgreementMode in ('T','S','Z')		-- T - Term, S - Settlement, Z - Zero Payment
											AND (AH.Rebate IS NOT NULL AND (AH.Rebate + ISNULL(AH.RebateAdjustment,0)) > 0)

								END

								IF EXISTS (SELECT 1 FROM #tempResultIDTrsansactions WHERE ID = @intID AND AgreementMode in ('N'))
								BEGIN
									
									--Select @intTransactionType = TypeID from [dbo].[tblTransactionType] WHERE TypeDescription = 'Cash - Not Due'
									--Select TypeDescription,TypeID from [dbo].[tblTransactionType] WHERE TypeDescription = 'Cash - Not Due'

									INSERT INTO [dbo].[tblTransactionAllocation](
												AllocationID,
												TransactionID,
												AgreementID,
												Amount,
												TransactionTypeID,
												CreatedDate,
												CreatedBy
												)
									SELECT		(NEXT VALUE FOR [mobile].[SequenceTransactionAllocation]), -- This Allocation ID generated by SEQUENCE Object
												@intCurrTransactionIDForCash,
												AgreementID, 
												CashPaid,
												@tyiTransactionTypeNotDue,
												GETDATE(),
												@USERID
									FROM #tempResultIDTrsansactions 
									WHERE	ID = @intID AND AgreementMode in ('N')	-- N - Non Weekly
											--AND CashPaid <> OldCashNotDue
									
									INSERT INTO [dbo].[tblTransactionAllocation](
												AllocationID,
												TransactionID,
												AgreementID,
												Amount,
												TransactionTypeID,
												CreatedDate,
												CreatedBy
												) 
									SELECT		(NEXT VALUE FOR [mobile].[SequenceTransactionAllocation]), -- This Allocation ID generated by SEQUENCE Object
												@intCurrTransactionIDForCash,
												AgreementID, 
												--CashPaid - OldTerm,
												CashPaid - (OldTerm + ISNULL(OldCashAdjustment,0)),
												@tyiTransactionTypeAdjustment,
												GETDATE(),
												@USERID
									FROM #tempResultIDTrsansactions 
									WHERE	ID = @intID AND AgreementMode in ('N')	-- N - Non Weekly
											AND (OldTerm IS NOT NULL AND CashPaid <> (OldTerm + ISNULL(OldCashAdjustment,0)))
									
									INSERT INTO [dbo].[tblTransactionAllocation](
												AllocationID,
												TransactionID,
												AgreementID,
												Amount,
												TransactionTypeID,
												CreatedDate,
												CreatedBy
												) 
									SELECT		(NEXT VALUE FOR [mobile].[SequenceTransactionAllocation]), -- This Allocation ID generated by SEQUENCE Object
												@intCurrTransactionIDForSettleCash,
												AgreementID, 
												--CashPaid - OldSettlement,
												(ISNULL(OldSettlement,0) + ISNULL(OldSettlementAdjustment,0) ) * -1, 
												@tyiTransactionTypeAdjustment,
												GETDATE(),
												@USERID
									FROM #tempResultIDTrsansactions 
									WHERE	ID = @intID AND AgreementMode in ('N')	-- N - Non Weekly
											AND (OldSettlement IS NOT NULL AND ((OldSettlement + ISNULL(OldSettlementAdjustment,0) ) > 0))
									
									INSERT INTO [dbo].[tblTransactionAllocation](
												AllocationID,
												TransactionID,
												AgreementID,
												Amount,
												TransactionTypeID,
												CreatedDate,
												CreatedBy
												) 
									SELECT		(NEXT VALUE FOR [mobile].[SequenceTransactionAllocation]), -- This Allocation ID generated by SEQUENCE Object
												@intCurrTransactionIDForRebate,
												AgreementID, 
												--CashPaid - OldRebate,
												(ISNULL(OldRebate,0) + ISNULL(OldRebateAdjustment,0)) * -1,
												@tyiTransactionTypeAdjustment,
												GETDATE(),
												@USERID
									FROM #tempResultIDTrsansactions 
									WHERE	ID = @intID AND AgreementMode in ('N')	-- N - Non Weekly
											AND (OldRebate IS NOT NULL AND ( OldRebate + ISNULL(OldRebateAdjustment,0)) > 0)
								END

								IF EXISTS (SELECT 1 FROM #tempResultIDTrsansactions WHERE ID = @intID AND AgreementMode in ('S'))
								BEGIN
									
									--SELECT '@intCurrTransactionIDForSettleCash',@intCurrTransactionIDForSettleCash

									--Select @intTransactionType = TypeID from [dbo].[tblTransactionType] WHERE TypeDescription = 'Settlement Cash'
									--Select TypeDescription, TypeID from [dbo].[tblTransactionType] WHERE TypeDescription = 'Settlement Cash'

									INSERT INTO [dbo].[tblTransactionAllocation](
												AllocationID,
												TransactionID,
												AgreementID,
												Amount,
												TransactionTypeID,
												CreatedDate,
												CreatedBy
												)
									SELECT		(NEXT VALUE FOR [mobile].[SequenceTransactionAllocation]), -- This Allocation ID generated by SEQUENCE Object
												@intCurrTransactionIDForSettleCash,
												AgreementID, 
												SettlementCash,
												@tyiTransactionTypeSettelment,
												GETDATE(),
												@USERID
									FROM #tempResultIDTrsansactions 
									WHERE ID = @intID AND ISNULL(SettlementCash,0) > 0 AND AgreementMode in ('S')
									
									--SELECT @intTransactionType = TypeID from [dbo].[tblTransactionType] WHERE TypeDescription = 'Rebate'
									--SELECT TypeDescription,TypeID from [dbo].[tblTransactionType] WHERE TypeDescription = 'Rebate'

									-- Records for RebateCash
									INSERT INTO [dbo].[tblTransactionAllocation](
												AllocationID,
												TransactionID,
												AgreementID,
												Amount,
												TransactionTypeID,
												CreatedDate,
												CreatedBy
												)
									SELECT		(NEXT VALUE FOR [mobile].[SequenceTransactionAllocation]), -- This Allocation ID generated by SEQUENCE Object
												@intCurrTransactionIDForRebate,
												AgreementID, 
												RebateCash,
												@tyiTransactionTypeRebate,
												GETDATE(),
												@USERID
									FROM #tempResultIDTrsansactions 
									WHERE ID = @intID AND ISNULL(RebateCash,0) >= 0 AND AgreementMode in ('S')
								END

								-- CREATE TRANSACTION FOR REFUND
								IF EXISTS (SELECT 1 FROM #tempResultIDTrsansactions WHERE ID = @intID AND AgreementMode in ('R'))
								BEGIN
									
									--PRINT 'REFUND : I am here..'

									INSERT INTO [dbo].[tblTransactionAllocation](
												AllocationID,
												TransactionID,
												AgreementID,
												Amount,
												TransactionTypeID,
												CreatedDate,
												CreatedBy
												)
									SELECT		(NEXT VALUE FOR [mobile].[SequenceTransactionAllocation]), -- This Allocation ID generated by SEQUENCE Object
												@intCurrTransactionIDForCash,
												AgreementID, 

												CASE WHEN OldRefund < 0 THEN 
														(ISNULL(@mnyHistRefundAmount,0) + ISNULL(@mnyHistRefundAdjustmentAmount,0) - ISNULL(AgreementAmountPaid,0)) * -1
												ELSE 
														ISNULL(AgreementAmountPaid,0) 
												END,

												CASE WHEN OldRefund < 0 THEN 
														@tyiTransactionTypeRefundAdjustment
												ELSE 
														@tyiTransactionTypeRefund 
												END,
												GETDATE(),
												@USERID
									FROM #tempResultIDTrsansactions 
									WHERE ID = @intID AND AgreementMode in ('R')
																
								END


							SET @intID = @intID + 1
						END

								
					END
					SET @intTempVID =  @intTempVID + 1

				END
			
				SET @IsSyncDone = 1				-- SYNC Completed
		END
		ELSE
		BEGIN
				SET @IsSyncDone = 0		 
				SET @ErrorCode='ERR-250'				-- NO RECORD FOUND
				SET @ErrorMessage= 'No Record Found'
		END
		
	--EndOfProc:

		COMMIT TRANSACTION;

		--ROLLBACK TRANSACTION;
	--PRINT Convert(VARCHAR(24),getdate(),109) + ' : END'

	END TRY
	BEGIN CATCH
		
		SET @IsSyncDone = 0

		IF (XACT_STATE()) = -1  
			ROLLBACK TRANSACTION;  
		ELSE
			ROLLBACK TRANSACTION;  
      	
		SET @ErrorCode ='ERR-150'
		SET @ErrorMessage = CONVERT(VARCHAR(5),ERROR_NUMBER()) + ' : ' + Convert(VARCHAR(20),ERROR_LINE()) + ' : ' + Convert(VARCHAR(3500),ERROR_MESSAGE())			
        
		--ROLLBACK TRANSACTION;

		--SET @IsSyncDone = 0
		
		--SELECT ERROR_NUMBER() AS ErrorNumber
		--		,ERROR_SEVERITY() AS ErrorSeverity
		--		,ERROR_STATE() AS ErrorState
		--		,ERROR_PROCEDURE() AS ErrorProcedure
		--		,ERROR_LINE() AS ErrorLine
		--		,ERROR_MESSAGE() AS ErrorMessage;
				
	END CATCH
	       
    SET NOCOUNT OFF
	
    
END


GO


SP_RECOMPILE '[mobile].[AP_X_Transactions_From_Device]'