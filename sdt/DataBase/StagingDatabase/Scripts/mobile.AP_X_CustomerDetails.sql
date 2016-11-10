
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[mobile].[AP_X_CustomerDetails]') AND type in (N'P', N'PC'))
DROP PROCEDURE [mobile].[AP_X_CustomerDetails]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO
-- Create Procedure -----------------------------------------------
CREATE PROCEDURE [mobile].[AP_X_CustomerDetails]
        @UserID								 INT,
        @CustomerDetailsXML					 XML,
		@IsSyncDone							 TINYINT OUTPUT,
		@ErrorCode							 VARCHAR(10) OUTPUT,
		@ErrorMessage						 VARCHAR(4000) OUTPUT
AS
    BEGIN
    --***************************************************************************
     --*
    --* Description    :  To Sync Customer Details from Mobile Offline database with Staging Database.
    --*					@IsSyncDone =  0 - Fail, 1-Success, 2-No Records
	--*					Following Tables will be Affected
	--*					1.	dbo.tblCustomer
	--*					2.	dbo.tblCustomerAddress
	--*					3.	dbo.tblJourneyCustomer
    --* Configuration Record
    --* Review              Ver  Author        Date      
    --* SPRINT 4			1.0  Abhay		   11/05/2016
	--
    --* Usage : E.g. 
	--			DECLARE @IsSyncDone INT,@ErrorCode varchar(10),@ErrorMessage varchar(4000)
	--			EXec [mobile].[AP_X_CustomerDetails] 1,<xml Cust Deatails Data>, @IsSyncDone OUTPUT, @ErrorCode OUTPUT, @ErrorMessage OUTPUT 
	--			SELECT  @IsSyncDone , @ErrorCode , @ErrorMessage 
    --***************************************************************************
	    
    DECLARE @intCustCount						INT,
			@intTempID							INT,
			@intID								INT,
			@intTempVID							INT,
			@intRowsAffected					INT,
			@MAXCustJnyID					 AS INT = 0,
			@CurrCustJnyOrdID				 AS INT = 0,						
			@NewCustJnyOrdID				 AS INT = 0,
			@NewCustJnyOrdDay				 AS INT = 0,	
			@dtWeekEndDate					 AS DATETIME,	
			@dtWeekStartDate				 AS DATETIME,
			@tyiAddressTypeCurrent			 AS TINYINT,
			@tyiAddressTypePrevious			 AS TINYINT,
			@intAddressID					 AS INT
			

    SELECT @intCustCount = 0,
		   @intRowsAffected = 0,
		   @IsSyncDone = 0,
		   @ErrorCode='',
		   @ErrorMessage='',
		   @tyiAddressTypeCurrent = 1,			-- Current Address ID
		   @tyiAddressTypePrevious = 2,			-- Previous Address ID
		   @intAddressID = NULL
    -- Procedure Body -------------------------------------------------

    SET NOCOUNT ON
	SET XACT_ABORT ON

	BEGIN TRY

		BEGIN TRANSACTION

						
						--1.	dbo.tblCustomer 2.	dbo.tblCustomerAddress 3.Select top 10 * from dbo.tblJourneyCustomer
				-- Create #temp Table to insert records from XML
					CREATE TABLE #TempCustomerDetailsXmlData (
									TempID                          INT				Identity(1,1),
									customerID                      INT				NOT NULL,
									mobileNumber					VARCHAR(50)		NULL,
									phoneNumber						VARCHAR(50)		NULL,
									emailId							VARCHAR(50)		NULL,
									addressLine1					VARCHAR(50)		NULL,
									addressLine2					VARCHAR(50)		NULL,
									addressLine3					VARCHAR(50)		NULL,
									addressLine4					VARCHAR(50)		NULL,
									city							VARCHAR(50)		NULL,
									postCode						VARCHAR(50)		NULL,
									journeyId						INT				NULL,
									journeyOrder					INT				NULL,
									collectionDay					INT				NULL,
									updatedDate						DATETIME		NULL
								)
					-- This temp table will hold all the affected order id
					CREATE TABLE #TempJourneyCustomerReOrder (
									TempID                          INT				Identity(1,1),
									customerID                      INT				NOT NULL,
									JourneyID						INT				NOT NULL,
									StartDate						DATETIME		NULL,
									EndDate							DATETIME		NULL,
									[Day]							INT				NULL,
									JourneyOrderBy					INT				NULL,
									NewJourneyOrderBy				INT				NULL
								)
		-- 'Insert all row records from XML to #TempTransactionXmlData'
		--<access><userType>Agent</userType><userId>1</userId></access>
		--<customerDetails>
		--<mobileNumber>9997177315</mobileNumber><phoneNumber>01656738397</phoneNumber><emailId>Maldwyn.Evans@dummy.com</emailId>
		--<addressLine1>2 Ael Y Bryn</addressLine1><addressLine2>North Cornelly</addressLine2><addressLine3/><addressLine4/><city>Maesteg</city><postCode>CF34 0DX</postCode>
		--<journeyId>2522</journeyId><customerId>942397</customerId><journeyOrder>196</journeyOrder><collectionDay>34</collectionDay>
		--</customerDetails>

				

			INSERT INTO #TempCustomerDetailsXmlData(
									customerID,
									mobileNumber,
									phoneNumber,	
									emailId,
									addressLine1,
									addressLine2,
									addressLine3,
									addressLine4,
									city,
									postCode,
									journeyId,
									journeyOrder,
									collectionDay,
									updatedDate
									)
							SELECT  
									customerDetails.value('customerId[1]','INT') AS customerID,
									customerDetails.value('mobileNumber[1]','VARCHAR(50)') AS mobileNumber,
									customerDetails.value('phoneNumber[1]','VARCHAR(50)') AS phoneNumber,
									customerDetails.value('email[1]','VARCHAR(50)') AS emailId,
									customerDetails.value('addressLine1[1]','VARCHAR(50)') AS addressLine1,
									customerDetails.value('addressLine2[1]','VARCHAR(50)') AS addressLine2,
									customerDetails.value('addressLine3[1]','VARCHAR(50)') AS addressLine3,
									customerDetails.value('addressLine4[1]','VARCHAR(50)') AS addressLine4,
									customerDetails.value('city[1]','VARCHAR(50)') AS city,
									customerDetails.value('postCode[1]','VARCHAR(50)') AS postCode,
									customerDetails.value('journeyId[1]','INT') AS journeyId,
									customerDetails.value('journeyOrder[1]','INT') AS journeyOrder,
									customerDetails.value('collectionDay[1]','INT') AS collectionDay,
									customerDetails.value('updatedDate[1]','DATETIME') AS updatedDate
							FROM @CustomerDetailsXML.nodes('customerDetails')Catalog(customerDetails)
			--ORDER BY transactionDetails.value('resultDate[1]','DATETIME')
						
			SET @intRowsAffected = @@ROWCOUNT  
			SET @intCustCount    = IDENT_CURRENT('#TempCustomerDetailsXmlData') --SCOPE_IDENTITY() 

			--SELECT * from #TempCustomerDetailsXmlData order by TempID
			--ROLLBACK TRANSACTION;
			--RETURN;

			--SELECT * INTO TempCustomerDetails from #TempCustomerDetailsXmlData

		If @intCustCount > 0 
		BEGIN
					SET @intTempID = 1
					WHILE @intTempID <= @intCustCount
					BEGIN
						-- UPDATE dbo.tblCustomer 

						UPDATE Cust
							SET  Cust.MobileNumber	= temp.MobileNumber
								,Cust.phoneNumber	= temp.phoneNumber
								,Cust.email			= temp.emailId
								,Cust.UpdatedDate	= GETDATE()
								,Cust.UpDatedBy		= @UserID
						FROM dbo.tblCustomer Cust
						INNER JOIN #TempCustomerDetailsXmlData temp ON temp.CustomerID = Cust.CustomerID
						WHERE 
							temp.TempID = @intTempID
						AND (
									ISNULL(Cust.MobileNumber,'')	<> ISNULL(temp.MobileNumber,'')
								OR	ISNULL(Cust.phoneNumber,'')		<> ISNULL(temp.phoneNumber,'')
								OR	ISNULL(Cust.email,'')			<> ISNULL(temp.emailId,'')
						)

						
						-- UPDATE dbo.tblCustomerAddress 						

						

						-- User Story - 1669 : Previous and Current Address Type : Changes Starts
						-- UPDATE Existing Address as Previuos AddressTypeID = 1

						UPDATE Cust
							SET  Cust.AddressTypeID	= @tyiAddressTypePrevious
								,Cust.UpdatedDate	= GETDATE()						
								,Cust.UpDatedBy		= @UserID
								,@intAddressID		= Cust.AddressID
						FROM dbo.tblCustomerAddress Cust
						INNER JOIN #TempCustomerDetailsXmlData temp ON temp.CustomerID = Cust.CustomerID
						WHERE 
							temp.TempID = @intTempID
							AND Cust.AddressTypeID	= @tyiAddressTypeCurrent
							AND (	   ISNULL(Cust.addressLine1,'')	<> ISNULL(temp.addressLine1,'')
									OR ISNULL(Cust.addressLine2,'')	<> ISNULL(temp.addressLine2,'')
									OR ISNULL(Cust.addressLine3,'')	<> ISNULL(temp.addressLine3,'')
									OR ISNULL(Cust.addressLine4,'')	<> ISNULL(temp.addressLine4,'')
									OR ISNULL(Cust.city,'')			<> ISNULL(temp.city,'')
									OR ISNULL(Cust.postCode,'')		<> ISNULL(temp.postCode,'')
								 )
						-- INSERT NEW RECORD WITH AddressTypeID = 1 AS A Current Address.

						-- Temp Code to add Address ID 
						--DECLARE @MaxAddrID INT
						--SELECT @MaxAddrID = MAX(AddressID) + 1 FROM dbo.tblCustomerAddress
						

						IF @intAddressID is NOT NULL
						BEGIN
							INSERT INTO dbo.tblCustomerAddress ( 
										-- AddressID
										 CustomerID
										,AddressTypeID
										,AddressLine1
										,AddressLine2
										,AddressLine3
										,AddressLine4
										,City
										,County
										,PostCode
										,CreatedDate
										,CreatedBy
										)
							SELECT		--@MaxAddrID								-- Temp Code to add Address ID 
										 Cust.CustomerID
										,@tyiAddressTypeCurrent					-- Current Address type ID
										,temp.addressLine1
										,temp.addressLine2
										,temp.addressLine3
										,temp.addressLine4
										,temp.city
										,Cust.County
										,temp.postCode
										,GETDATE()
										,@UserID
							FROM dbo.tblCustomerAddress Cust
							INNER JOIN #TempCustomerDetailsXmlData temp ON temp.CustomerID = Cust.CustomerID
							WHERE 
								temp.TempID = @intTempID
								AND Cust.AddressID	= @intAddressID
								AND (	   ISNULL(Cust.addressLine1,'')	<> ISNULL(temp.addressLine1,'')
										OR ISNULL(Cust.addressLine2,'')	<> ISNULL(temp.addressLine2,'')
										OR ISNULL(Cust.addressLine3,'')	<> ISNULL(temp.addressLine3,'')
										OR ISNULL(Cust.addressLine4,'')	<> ISNULL(temp.addressLine4,'')
										OR ISNULL(Cust.city,'')			<> ISNULL(temp.city,'')
										OR ISNULL(Cust.postCode,'')		<> ISNULL(temp.postCode,'')
									 )
						END

						-- User Story - 1669 : Previous and Current Address Type : Changes End

						
						
						-- UPDATE AND INSERT Select * from dbo.tblJourneyCustomer where CustomerID = 941285
						--FETCH Current JourneyOrder for this customer and JourneyID
						SELECT	 @MAXCustJnyID		= 0
								,@CurrCustJnyOrdID	= 0						
								,@NewCustJnyOrdID	= 0
								,@NewCustJnyOrdDay	= 0	
						
						SELECT	@CurrCustJnyOrdID = CurreJourneyOrderBy , 
								@NewCustJnyOrdID = NewJourneyOrderBy
						FROM ( 
						SELECT  ROW_NUMBER() OVER (ORDER BY CustJnyID DESC) AS ROWID ,Cust.JourneyOrderBy AS CurreJourneyOrderBy,temp.journeyOrder AS  NewJourneyOrderBy
						FROM dbo.tblJourneyCustomer Cust
						INNER JOIN #TempCustomerDetailsXmlData temp ON temp.CustomerID = Cust.CustomerID
																    AND temp.journeyId = Cust.journeyId
						WHERE 
							temp.TempID = @intTempID
						) AS tempJC WHERE tempJC.ROWID=1


						IF @CurrCustJnyOrdID <> @NewCustJnyOrdID
						BEGIN 

							--Print 'I am here ..'
							TRUNCATE TABLE #TempJourneyCustomerReOrder			-- XXXX Code Added

							SELECT @dtWeekEndDate = EndDate,  
							@dtWeekStartDate = DATEADD(D,1,wk.EndDate)   
							FROM [dbo].[vwWeekEnding] wk  
							INNER JOIN #TempCustomerDetailsXmlData temp ON CAST(temp.updatedDate AS DATE) BETWEEN wk.StartDate AND wk.EndDate  
							WHERE temp.TempID = @intTempID  


							--Insert JourneyOrderID of Customer
							INSERT INTO #TempJourneyCustomerReOrder(
									CustomerID,
									JourneyID,
									StartDate,
									EndDate,
									[Day],
									JourneyOrderBy,
									NewJourneyOrderBy
									)
							SELECT	JC.CustomerID,
									JC.JourneyID,
									JC.StartDate,
									JC.EndDate,
									temp.collectionDay,	--@NewCustJnyOrdDay,		--JC.[Day],
									JC.JourneyOrderBy,
									@NewCustJnyOrdID-1
							FROM dbo.tblJourneyCustomer JC
							INNER JOIN #TempCustomerDetailsXmlData temp ON temp.journeyId = JC.journeyId
							WHERE temp.TempID = @intTempID								-- XXXX Code Added
							AND JC.JourneyOrderBy = @CurrCustJnyOrdID AND JC.CustomerID = temp.CustomerID
							AND (JC.EndDate IS NULL OR (JC.EndDate > @dtWeekEndDate))	-- XXXX Code Added
							
											
							--SELECt 'Affectted Cust',* from #TempJourneyCustomerReOrder
							--Insert ALL THE Affected JourneyOrderID

							INSERT INTO #TempJourneyCustomerReOrder(
									CustomerID,
									JourneyID,
									StartDate,
									EndDate,
									[Day],
									JourneyOrderBy,
									NewJourneyOrderBy
									)
							SELECT	JC.CustomerID,
									JC.JourneyID,
									JC.StartDate,
									JC.EndDate,
									JC.[Day],
									JC.JourneyOrderBy,
									@NewCustJnyOrdID-1
							FROM dbo.tblJourneyCustomer JC
							INNER JOIN #TempCustomerDetailsXmlData temp ON temp.journeyId = JC.journeyId
							WHERE temp.TempID = @intTempID									-- XXXX Code Added
							AND JC.JourneyOrderBy >=	@NewCustJnyOrdID AND JC.JourneyOrderBy <> @CurrCustJnyOrdID
							AND (JC.EndDate IS NULL OR (JC.EndDate > @dtWeekEndDate))		-- XXXX Code Added	
							ORDER BY JC.JourneyOrderBy

							--SELECt 'Affectted Cust', Count(0) from #TempJourneyCustomerReOrder

							--UPDATE ALL THE AFFECTED JourneyOrderID by ENDDATE

							UPDATE JC
								SET  JC.EndDate		= @dtWeekEndDate		-- this will be EndDate Of Current Week.
									,JC.UpdatedDate	= GETDATE()				-- temp.UpdatedDate
									,JC.UpDatedBy	= @UserID
							FROM dbo.tblJourneyCustomer JC
							INNER JOIN #TempCustomerDetailsXmlData temp ON temp.journeyId = JC.journeyId
							WHERE 	temp.TempID = @intTempID 
								AND (JC.JourneyOrderBy >= @NewCustJnyOrdID OR (JC.JourneyOrderBy = @CurrCustJnyOrdID))
								AND (JC.EndDate IS NULL OR (JC.EndDate >= @dtWeekEndDate))


							INSERT INTO dbo.tblJourneyCustomer(
												CustomerID,
												JourneyID,
												StartDate,
												EndDate,
												[Day],
												JourneyOrderBy,
												CreatedDate,
												CreatedBy
												)
										SELECT
												CustomerID,
												JourneyID,
												@dtWeekStartDate,
												--CASE WHEN EndDate > @dtWeekEndDate THEN EndDate ELSE NULL END,
												NULL,
												[Day],
												NewJourneyOrderBy + TempID ,	-- TempID is Identity Column.
												GETDATE(),
												@UserID
										FROM #TempJourneyCustomerReOrder
										ORDER BY NewJourneyOrderBy

										
						END

						SET @intTempID =  @intTempID + 1
					END

				SET @IsSyncDone = 1				-- SYNC Completed
		END
		ELSE
		BEGIN
				SET @IsSyncDone = 0		 
				SET @ErrorCode='ERR-251'				-- NO RECORD FOUND
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
      	
		SET @ErrorCode='ERR-151'
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


SP_RECOMPILE '[mobile].[AP_X_CustomerDetails]'