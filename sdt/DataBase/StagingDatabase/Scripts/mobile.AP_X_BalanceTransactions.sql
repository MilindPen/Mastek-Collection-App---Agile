--DelegatedToUserID

IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[mobile].[AP_X_BalanceTransactions]') AND type in (N'P', N'PC'))
DROP PROCEDURE [mobile].[AP_X_BalanceTransactions]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO
-- Create Procedure -----------------------------------------------
CREATE PROCEDURE [mobile].[AP_X_BalanceTransactions]
        @UserID								 INT,
        @BalanceTransactionsXML				 XML,
		@IsSyncDone							 TINYINT OUTPUT,
		@ErrorCode							 VARCHAR(10) OUTPUT,
		@ErrorMessage						 VARCHAR(4000) OUTPUT
AS
    BEGIN
    --***************************************************************************
     --*
    --* Description    :  To Sync Balance Transactions Details from Mobile Offline database with Staging Database.
    --*					@IsSyncDone =  0 - Fail, 1-Success
	--*					ERR-152 -- FOR SQL Related Error
	--*					ERR-252 -- NO RECORD ERROR
	--*					Following Tables will be Affected
	--*					1.	SELECT * from [mobile].[tblDashboardAmount]
    --* Configuration Record
    --* Review              Ver  Author        Date      
    --* SPRINT 4			1.0  Abhay		   11/05/2016
	--
    --* Usage : E.g. 
	--			DECLARE @IsSyncDone INT,@ErrorCode varchar(10),@ErrorMessage varchar(4000)
	--			EXec [mobile].[AP_X_BalanceTransactions] 1,<xml Cust Deatails Data>, @IsSyncDone OUTPUT, @ErrorCode OUTPUT, @ErrorMessage OUTPUT 
	--			SELECT  @IsSyncDone , @ErrorCode , @ErrorMessage 
    --***************************************************************************
	    
    DECLARE @intBrTraCount						INT,
			@intRowsAffected					INT,
			@UserBlanceID						BIGINT,
			@UserBlanceIDMin					BIGINT,
			@UserBlanceIDMax					BIGINT,
			@BlanceIDMax						BIGINT
					
		

    SELECT @intBrTraCount = 0,
		   @intRowsAffected = 0,
		   @IsSyncDone = 0,
		   @ErrorCode='',
		   @ErrorMessage='',
		   @UserBlanceID=0,
		   @UserBlanceIDMin = 0,
		   @UserBlanceIDMax = 0,
		   @BlanceIDMax = 0


    -- Procedure Body -------------------------------------------------

    SET NOCOUNT ON
	SET XACT_ABORT ON

	BEGIN TRY

		BEGIN TRANSACTION
						
				-- Create #temp Table to insert records from XML
					CREATE TABLE #TempBalanceTransactionsXmlData (
									TempID              INT			Identity(1,1),
									balanceId           BIGINT		 NOT NULL,
									journeyId			INT			 NULL,
									journeyUserId		INT			 NULL,
									Reference			VARCHAR(250) NULL,
									balanceTypeId		CHAR(1)		 NULL,
									periodIndicator		CHAR(1)		 NULL,
									chequeIndicator		BIT			 NULL,
									amount				MONEY		 NULL,
									isDeleted			TINYINT		 NULL,
									balanceDate			DATE		 NULL,
									UpdatedDate			DATETIME	 NULL,
									reason				VARCHAR(255) NULL,
									isPrimaryJourney	CHAR(1)		 NULL,
									UserBalanceID		BIGINT		 NULL,
								)
					
		-- 'Insert all row records from XML to #TempTransactionXmlData'
		--'<balanceTransactions><reference>007J0491</reference><amount>400.00</amount><balanceDate>2016-03-23</balanceDate>
		--<isDeleted>0</isDeleted><journeyId>1578</journeyId><balanceTypeId>B</balanceTypeId><periodIndicator>D</periodIndicator>
		--<chequeIndicator>0</chequeIndicator><balanceId>1609000035033</balanceId></balanceTransactions>
		--<access><userType>Agent</userType><userId>1</userId></access>'

					INSERT INTO #TempBalanceTransactionsXmlData(
									balanceId,
									journeyId,
									journeyUserId,
									reference,	
									balanceTypeId,
									periodIndicator,
									chequeIndicator,
									amount,
									isDeleted,
									balanceDate,
									UpdatedDate,
									reason,
									isPrimaryJourney,
									UserBalanceID
									)
							SELECT  
									balanceTransactions.value('balanceId[1]','BIGINT') AS balanceId,
									balanceTransactions.value('journeyId[1]','INT') AS journeyId,
									balanceTransactions.value('journeyUserId[1]','INT') AS journeyUserId,
									balanceTransactions.value('reference[1]','VARCHAR(250)') AS reference,
									balanceTransactions.value('balanceTypeId[1]','CHAR(1)') AS balanceTypeId,
									balanceTransactions.value('periodIndicator[1]','CHAR(1)') AS periodIndicator,
									balanceTransactions.value('chequeIndicator[1]','BIT') AS chequeIndicator,
									balanceTransactions.value('amount[1]','MONEY') AS amount,
									balanceTransactions.value('isDeleted[1]','TINYINT') AS isDeleted,
									balanceTransactions.value('balanceDate[1]','DATE') AS balanceDate,
									balanceTransactions.value('balanceDate[1]','DATETIME') AS updatedDate,
									balanceTransactions.value('reason[1]','VARCHAR(255)') AS reason,
									balanceTransactions.value('isPrimaryJourney[1]','CHAR(1)') AS isPrimaryJourney,
									balanceTransactions.value('userBalanceId[1]','BIGINT') AS UserBalanceID
							FROM @BalanceTransactionsXML.nodes('balanceTransactions')Catalog(balanceTransactions)
						
			SET @intRowsAffected = @@ROWCOUNT  
			SET @intBrTraCount    = IDENT_CURRENT('#TempBalanceTransactionsXmlData') --SCOPE_IDENTITY() 
							
		
		--Select * FROM #TempBalanceTransactionsXmlData					
						
		If @intBrTraCount > 0 
		BEGIN

				SELECT Top 1 @UserBlanceID  = userBalanceId FROM #TempBalanceTransactionsXmlData

				SELECT @UserBlanceIDMin = CONVERT(BIGINT,CONVERT(VARCHAR(12),@UserBlanceID) + '000')
					  ,@UserBlanceIDMax = CONVERT(BIGINT,CONVERT(VARCHAR(12),@UserBlanceID) + '999')
		
				IF EXISTS(SELECT 1 FROM #TempBalanceTransactionsXmlData WHERE isPrimaryJourney = 'N')
				BEGIN


				--SELECT @UserBlanceID,@UserBlanceIDMin,@UserBlanceIDMax,'i am here'

				-- GENERATE BALANCE ID FOR NEW RECORD ADDED THROUGH WEB APP.
				-- START

					SELECT @BlanceIDMax = ISNULL(MAX(ID),@UserBlanceIDMin)
					FROM mobile.[tblDelegatedDashboardAmount] 
					Where ID BETWEEN @UserBlanceIDMin AND @UserBlanceIDMax

				--SELECT @BlanceIDMax,@UserBlanceID,@UserBlanceIDMin,@UserBlanceIDMax,'i am here'

					UPDATE #TempBalanceTransactionsXmlData 
					SET    @BlanceIDMax = BalanceID = @BlanceIDMax + 1 
					WHERE  BalanceID = '' OR BalanceID IS NULL  
					AND isPrimaryJourney = 0; 
				-- END


				--SELECT * from #TempBalanceTransactionsXmlData 

					--- TRANSACTION Related to [mobile].[tblDelegatedDashboardAmount]
					--  Select top 10 * from [mobile].[tblDelegatedDashboardAmount]

					-- SOFT DELETE IMPLEMENTATION :  START

					-- UPDATE EXISTING RECORDS

						UPDATE DDA
							SET	
									 DDA.BalanceDate			= temp.balanceDate
									,DDA.PeriodIndicator		= temp.periodIndicator
									,DDA.Amount					= temp.amount
									,DDA.Reference				= temp.reference
									,DDA.UpdatedDate			= GETDATE()				
									,DDA.UpdatedBy				= @UserID
									,DDA.BalanceTypeID			= temp.balanceTypeId
									,DDA.Cheque_ind				= temp.chequeIndicator
									,DDA.reason					= temp.reason
						FROM [mobile].[tblDelegatedDashboardAmount]		AS DDA
						INNER JOIN #TempBalanceTransactionsXmlData		AS temp
						ON (DDA.ID = temp.balanceId) AND temp.isPrimaryJourney = 'N' AND temp.isDeleted = 0 

						-- SOFT DELETE : UPDATE isDeleted Records 

						UPDATE DDA
							SET	
									 DDA.IsDeleted				= temp.isDeleted
									,DDA.UpdatedDate			= GETDATE()				
									,DDA.UpdatedBy				= @UserID
						FROM [mobile].[tblDelegatedDashboardAmount]		AS DDA
						INNER JOIN #TempBalanceTransactionsXmlData		AS temp
						ON (DDA.ID = temp.balanceId) AND temp.isPrimaryJourney = 'N' AND temp.isDeleted = 1 


						--INSERT NEW RECORDS
																

						INSERT [mobile].[tblDelegatedDashboardAmount](	 ID								
									,JourneyID
									,BalanceDate
									,PeriodIndicator
									,Amount
									,Reference
									,CreatedDate
									,CreatedBy
									,DelegatedToUserID
									,BalanceTypeID
									,Cheque_ind
									,reason
									) 
						SELECT
									 temp.balanceId
									,temp.journeyId
									,temp.balanceDate
									,temp.periodIndicator
									,temp.amount
									,temp.reference	
									,GETDATE()							
									,@UserID
									,temp.journeyUserId
									,temp.balanceTypeId
									,temp.chequeIndicator
									,temp.reason
						FROM #TempBalanceTransactionsXmlData					AS temp
						LEFT JOIN [mobile].[tblDelegatedDashboardAmount]		AS DDA
						ON (DDA.ID = temp.balanceId) AND temp.isPrimaryJourney = 'N'
						WHERE DDA.ID IS NULL
						AND temp.isPrimaryJourney = 'N'
					-- SOFT DELETE IMPLEMENTATION :  END

					
				END

				IF EXISTS(SELECT 1 FROM #TempBalanceTransactionsXmlData WHERE ISNULL(isPrimaryJourney,'') <> 'N')
				BEGIN
					--- TRANSACTION Related to [mobile].[tblDashboardAmount]

					-- GENERATE BALANCE ID FOR NEW RECORD ADDED THROUGH WEB APP.
					-- START
					
					--SELECT @UserBlanceID,@UserBlanceIDMin,@UserBlanceIDMax,'i am here'
										
						SELECT @BlanceIDMax = ISNULL(MAX(ID),@UserBlanceIDMin)
						FROM mobile.tblDashboardAmount 
						Where ID BETWEEN @UserBlanceIDMin AND @UserBlanceIDMax

						UPDATE #TempBalanceTransactionsXmlData 
						SET    @BlanceIDMax = BalanceID = @BlanceIDMax + 1 
						WHERE  BalanceID = '' OR BalanceID IS NULL  
						AND ISNULL(isPrimaryJourney,'') <> 'N'; 
					-- END

					-- SOFT DELETE IMPLEMENTATION :  START
										

						UPDATE DA
							SET	
									 DA.BalanceDate				= temp.balanceDate
									,DA.PeriodIndicator			= temp.periodIndicator
									,DA.Amount					= temp.amount
									,DA.Reference				= temp.reference
									,DA.UpdatedDate			= GETDATE()				
									,DA.UpdatedBy				= @UserID
									,DA.BalanceTypeID			= temp.balanceTypeId
									,DA.Cheque_ind				= temp.chequeIndicator
									,DA.reason					= temp.reason
						FROM [mobile].[tblDashboardAmount]		AS DA
						INNER JOIN #TempBalanceTransactionsXmlData		AS temp
						ON (DA.ID = temp.balanceId) AND ISNULL(temp.isPrimaryJourney,'') <> 'N' AND temp.isDeleted = 0 

						-- SOFT DELETE : UPDATE isDeleted Records 

						UPDATE DA
							SET	
									 DA.IsDeleted				= temp.isDeleted
									,DA.UpdatedDate			= GETDATE()				
									,DA.UpdatedBy				= @UserID
						FROM [mobile].[tblDashboardAmount]		AS DA
						INNER JOIN #TempBalanceTransactionsXmlData		AS temp
						ON (DA.ID = temp.balanceId) AND ISNULL(temp.isPrimaryJourney,'') <> 'N' AND temp.isDeleted = 1 

																								
												

						INSERT [mobile].[tblDashboardAmount](	 
								 ID								
								,JourneyID
								,BalanceDate
								,PeriodIndicator
								,Amount
								,Reference
								,CreatedDate
								,CreatedBy
								--,UpdatedDate
								--,UpdatedBy
								,BalanceTypeID
								,Cheque_ind
								,reason
								) 
						SELECT
								 temp.balanceId
								,temp.journeyId
								,temp.balanceDate
								,temp.periodIndicator
								,temp.amount
								,temp.reference	
								,GETDATE()						
								,ISNULL(temp.journeyUserId,@UserID)
								,temp.balanceTypeId
								,temp.chequeIndicator
								,temp.reason
						FROM #TempBalanceTransactionsXmlData				AS temp
						LEFT JOIN [mobile].[tblDashboardAmount]				AS DA
						ON (DA.ID = temp.balanceId) AND ISNULL(temp.isPrimaryJourney,'') <> 'N'
						WHERE DA.ID IS NULL
						AND ISNULL(temp.isPrimaryJourney,'') <> 'N'
					-- SOFT DELETE IMPLEMENTATION :  END

					
				END

				SET @IsSyncDone = 1									-- SYNC Completed
		END
		ELSE
		BEGIN
				SET @IsSyncDone = 0		 
				SET @ErrorCode='ERR-252'							-- NO RECORD FOUND
				SET @ErrorMessage= 'No Record Found'
		END

		COMMIT TRANSACTION;

		--ROLLBACK TRANSACTION;
	

	END TRY
	BEGIN CATCH
		
		SET @IsSyncDone = 0

		IF (XACT_STATE()) = -1  
			ROLLBACK TRANSACTION;  
		ELSE
			ROLLBACK TRANSACTION;  
      	
		SET @ErrorCode='ERR-152'
		SET @ErrorMessage= CONVERT(VARCHAR(5),ERROR_NUMBER()) + ' : ' + Convert(VARCHAR(20),ERROR_LINE()) + ' : ' + Convert(VARCHAR(3500),ERROR_MESSAGE())			
        
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


SP_RECOMPILE '[mobile].[AP_X_BalanceTransactions]'