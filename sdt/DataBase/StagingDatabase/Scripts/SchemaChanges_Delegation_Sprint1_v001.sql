
/****************************************************************************
*
* Project Name		: SDT-Delegation
*
* Reference			: Sprint-1 : Journey Delegation
*
* Description		: Journey & Customer Delegation
* 
* Auth				: Abhay J. Meher
*
* Objects Affected	:	
* DATE				: 23-08-2016
*
****************************************************************************/

/****** Object:  Table [mobile].[tblDelegatedJourneyAgent]    Script Date: 8/23/2016 11:22:40 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


IF NOT EXISTS (SELECT * FROM sys.objects WHERE OBJECT_ID = OBJECT_ID(N'[mobile].[tblDelegatedJourneyAgent]') AND type in (N'U'))
BEGIN

	CREATE TABLE [mobile].[tblDelegatedJourneyAgent](
		[DelegatedUserJnyID]				[int]		IDENTITY(1,1) NOT NULL,
		[UserJnyID]							[int]		NOT NULL,
		[DelegatedTo]						[int]		NOT NULL,
		[isAccepted]						[bit]		NULL DEFAULT(0),
		[StartDate]							[DATE]		NOT NULL,
		[EndDate]							[DATE]		NULL,
		[CreatedDate]						[datetime]	NOT NULL CONSTRAINT [DF_DelegatedAgent_CreatedDate]  DEFAULT (getdate()),
		[CreatedBy]							[int]		NOT NULL DEFAULT ((10000)),
		[UpdatedDate]						[datetime]	NULL,
		[UpdatedBy]							[int]		NULL,
		[IsDeleted]							[tinyint]	NULL DEFAULT ((0)),
	 CONSTRAINT [PK_DelegatedJourneyAgentLink] PRIMARY KEY CLUSTERED 
	(
		[DelegatedUserJnyID] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
	)



	ALTER TABLE [mobile].[tblDelegatedJourneyAgent]  WITH CHECK ADD  CONSTRAINT [FK_Delegated_JourneyAgent] FOREIGN KEY([UserJnyID])
	REFERENCES [dbo].[tblJourneyAgent] ([UserJnyID])


	ALTER TABLE [mobile].[tblDelegatedJourneyAgent] CHECK CONSTRAINT [FK_Delegated_JourneyAgent]


	ALTER TABLE [mobile].[tblDelegatedJourneyAgent]  WITH CHECK ADD  CONSTRAINT [FK_DelegatedJourneyAgentLink_User] FOREIGN KEY([DelegatedTo])
	REFERENCES [dbo].[tblUser] ([UserID])


	ALTER TABLE [mobile].[tblDelegatedJourneyAgent] CHECK CONSTRAINT [FK_DelegatedJourneyAgentLink_User]

END

-----------------------------------------------------------------


/****** Object:  Table [mobile].[tblJourneyCustomer]    Script Date: 8/23/2016 11:23:13 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



IF NOT EXISTS (SELECT * FROM sys.objects WHERE OBJECT_ID = OBJECT_ID(N'[mobile].[tblDelegatedJourneyCustomer]') AND type in (N'U'))
BEGIN

	CREATE TABLE [mobile].[tblDelegatedJourneyCustomer](
		[DelegatedCustJnyID] [int] IDENTITY(1,1) NOT NULL,
		[DelegatedUserJnyID] [int] NOT NULL,
		[CustJnyID] [int] NOT NULL,
		[CreatedDate] [datetime] NOT NULL CONSTRAINT [DF_DelegatedJourneyCustomerLink_CreatedDate]  DEFAULT (getdate()),
		[CreatedBy] [int] NULL,
		[UpdatedDate] [datetime] NULL,
		[UpdatedBy] [int] NULL,
		[IsDeleted] [tinyint] NULL DEFAULT ((0)),
	 CONSTRAINT [PK_DelegatedJourneyCustomerLink] PRIMARY KEY CLUSTERED 
	(
		[DelegatedCustJnyID] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
	)
	

	ALTER TABLE [mobile].[tblDelegatedJourneyCustomer]  WITH CHECK ADD  CONSTRAINT [FK_DelegatedJourneyCustomer_DelegatedUserJnyID] FOREIGN KEY([DelegatedUserJnyID])
	REFERENCES [mobile].[tblDelegatedJourneyAgent] ([DelegatedUserJnyID])


	ALTER TABLE [mobile].[tblDelegatedJourneyCustomer] CHECK CONSTRAINT [FK_DelegatedJourneyCustomer_DelegatedUserJnyID]


	ALTER TABLE [mobile].[tblDelegatedJourneyCustomer]  WITH CHECK ADD  CONSTRAINT [FK_DelegatedJourneyCustomer_CustJnyID] FOREIGN KEY([CustJnyID])
	REFERENCES [dbo].[tblJourneyCustomer] ([CustJnyID])


	ALTER TABLE [mobile].[tblDelegatedJourneyCustomer] CHECK CONSTRAINT [FK_DelegatedJourneyCustomer_CustJnyID]
END 



IF  EXISTS (SELECT * FROM sys.objects WHERE OBJECT_ID = OBJECT_ID(N'[mobile].[vwDelegatedJourneyAgent]') AND type in (N'V'))
DROP VIEW [mobile].[vwDelegatedJourneyAgent]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE VIEW [mobile].[vwDelegatedJourneyAgent]
AS
SELECT 
		 DelegatedUserJnyID
		,UserJnyID
		,DelegatedTo
		,isAccepted
		,StartDate
		,EndDate
		,CreatedDate
		,CreatedBy
		,UpdatedDate
		,UpdatedBy
FROM     
	[mobile].[tblDelegatedJourneyAgent]
WHERE IsDeleted != 1

GO




IF  EXISTS (SELECT * FROM sys.objects WHERE OBJECT_ID = OBJECT_ID(N'[mobile].[vwDelegatedJourneyCustomer]') AND type in (N'V'))
DROP VIEW [mobile].[vwDelegatedJourneyCustomer]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE VIEW [mobile].[vwDelegatedJourneyCustomer]
AS
SELECT 
		  DelegatedCustJnyID
		 ,DelegatedUserJnyID
		 ,CustJnyID
		 ,CreatedDate
		 ,CreatedBy
		 ,UpdatedDate
		 ,UpdatedBy
FROM     
	[mobile].[tblDelegatedJourneyCustomer]
WHERE IsDeleted != 1

GO




IF  EXISTS (SELECT * FROM sys.objects WHERE OBJECT_ID = OBJECT_ID(N'[mobile].[vwDelegatedJourneyAgentCustomerList]') AND type in (N'V'))
DROP VIEW [mobile].[vwDelegatedJourneyAgentCustomerList]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [mobile].[vwDelegatedJourneyAgentCustomerList]
AS
SELECT 
		 JA.JourneyId					AS JourneyID
		,JA.UserId						AS PrimaryAgent	
		,DJA.DelegatedTo				AS DelegatedAgent
		,DJA.isAccepted					AS isAccepted
		,DJA.StartDate					AS DelagatedStartDate
		,DJA.EndDate					AS DelagatedEndDate
		,JA.StartDate					AS JourneyAgentStartDate
		,JA.EndDate						AS JourneyAgentEndDate
		,JC.CustomerId					AS DelegatedCustomerID
		,JC.JourneyOrderBy				AS JourneyOrderBy
		,JC.CollectionDay				AS CollectionDay
		,JC.StartDate					AS JourneyCustomerStartDate
		,JC.EndDate						AS JourneyCustomerEndDate
FROM     
	[mobile].[vwDelegatedJourneyAgent]						AS DJA
	INNER JOIN [mobile].[vwDelegatedJourneyCustomer]		AS DJC
				ON DJA.DelegatedUserJnyID	= DJC.DelegatedUserJnyID
	INNER JOIN [dbo].[vwJourneyAgent]						AS JA
				ON DJA.UserJnyID			= JA.JourneyAgentId								
	INNER JOIN [dbo].[vwJourneyCustomer]					AS JC
				ON DJC.CustJnyID	= JC.CustJnyID	
GO



IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[mobile].[AP_S_CustomerListForJourneyDelegation]') AND type in (N'P', N'PC'))
DROP PROCEDURE [mobile].[AP_S_CustomerListForJourneyDelegation]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER OFF
GO


-- Create Procedure -----------------------------------------------
CREATE PROCEDURE [mobile].[AP_S_CustomerListForJourneyDelegation]
		@JourneyID								INT,
		@UserID									INT,
		@FromDate								DATE,
		@ToDate									DATE
AS
    BEGIN
    --***************************************************************************
    --* Project			:	Journey Delagation
    --* Description		:	Select List of Customers for give Journey Selection
    --*
    --* Configuration Record
    --* Review              Ver  Author        Date      
    --* SPRINT 1			1.0  Abhay		   25/08/2016
    --* Review              Ver  Author        Date        CR              Comments 
    --* E.g. 
	--*
    --***************************************************************************
	-- Exec [mobile].[AP_S_CustomerListForJourneyDelegation] 1320,2,'2016-08-18','2016-09-02'

    -- Procedure Body -------------------------------------------------
    SET NOCOUNT ON
		BEGIN TRY
				
		DECLARE @tempFromDate	DATE

				CREATE TABLE #TempCollectionDays (
								CollectionDay		TINYINT
							)
	
				IF DATEDIFF(d,@FromDate,@ToDate) >= 6 
				BEGIN 
					INSERT INTO #TempCollectionDays(CollectionDay)
					SELECT 1 UNION
					SELECT 2 UNION
					SELECT 3 UNION
					SELECT 4 UNION
					SELECT 5 UNION
					SELECT 6 UNION
					SELECT 7
				END
				ELSE
				BEGIN
					SET @tempFromDate = @FromDate
					--SELECT DATEPART(WEEKDAY, @FromDate) -1,DATEPART(WEEKDAY, @ToDate) -1
					WHILE (@tempFromDate <= @ToDate)
					BEGIN
						INSERT INTO #TempCollectionDays(CollectionDay)
						SELECT CASE WHEN (DATEPART(WEEKDAY, @tempFromDate) -1)= 0 THEN 7
								ELSE (DATEPART(WEEKDAY, @tempFromDate) -1) END
						SET @tempFromDate = DATEADD(d,1,@tempFromDate)
					END

				END

	
					SELECT 
							 JC.CustJnyID				AS CustJnyID
							,JC.JourneyID				AS JourneyID
							,@UserID					AS PrimaryAgent
							,JC.CustomerId				AS CustomerID
							,JC.JourneyOrderBy			AS JourneyOrderBy
							,JC.CollectionDay			AS CollectionDay
							,JC.StartDate				AS JourneyCustomerStartDate
							,JC.EndDate					AS JourneyCustomerEndtDate
							,C.CustomerNumber			AS CustomerNumber 
							,C.Title					AS Title	
							,C.FirstName				AS FirstName
							,C.MiddleName				AS MiddleName
							,C.LastName					AS LastName	
							,C.AddressLine1				AS AddressLine1
							,C.AddressLine2				AS AddressLine2
							,C.AddressLine3				AS AddressLine3
							,C.AddressLine4				AS AddressLine4
							,C.City						AS City
							,C.PostCode					AS PostCode
							,C.MobileNumber				AS MobileNumber
							,C.PhoneNumber				AS PhoneNumber
							,C.Email					AS Email
							,CAST(C.DOB AS DATE)		AS DOB
							,C.PaymentPerformance		AS PaymentPerformance		
					FROM 
					dbo.vwJourneyCustomer	JC
					INNER JOIN dbo.vwJourneyAgent	JA
							ON JA.JourneyId = JC.JourneyID
					LEFT JOIN mobile.vwDelegatedJourneyAgentCustomerList DCL
							ON DCL.JourneyID = JA.JourneyId 
							AND DCL.PrimaryAgent = JA.UserId
							AND DCL.DelegatedCustomerID =  JC.CustomerId
							AND CAST(DCL.DelagatedStartDate AS DATE)  <= @ToDate	
							AND (CAST(DCL.DelagatedEndDate   AS DATE) >= @FromDate OR DCL.DelagatedEndDate is Null)	
					INNER JOIN dbo.vwCustomer	C
							ON C.CustomerID = JC.CustomerId
					LEFT JOIN [dbo].[vwVisit]	V
							ON V.CustomerID = C.CustomerId
					WHERE 
					JC.JourneyID	=	@JourneyID
					AND JA.UserId	=   @UserID
					AND ((V.VisitDate BETWEEN @FromDate AND @ToDate)  OR V.VisitDate IS NULL ) 
					AND (V.StatusID = 1 OR V.StatusID IS NULL)					-- With Visit Status = PENDING
					AND DCL.DelegatedCustomerID IS NULL								-- To Exclude Already Delagated Customer
					AND CAST(JC.StartDate AS DATE)  <= @ToDate	
					AND (CAST(JC.EndDate   AS DATE) >= @FromDate OR JC.EndDate is Null)
					AND JC.CollectionDay IN (SELECT CollectionDay FROM #TempCollectionDays)
					Order By JC.CollectionDay,JC.JourneyOrderBy

        END TRY
		BEGIN CATCH
		        
			SELECT   'ERR-157' AS ErrorCode,CONVERT(VARCHAR(5),ERROR_NUMBER()) + ' : ' + Convert(VARCHAR(20),ERROR_LINE()) + ' : ' + Convert(VARCHAR(3500),ERROR_MESSAGE()) AS ErrorMessage;

		END CATCH
    SET NOCOUNT OFF
   
    RETURN
END
GO

sp_recompile '[mobile].[AP_S_CustomerListForJourneyDelegation]'
go


IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[mobile].[AP_X_CustomersForJourneyDelegation]') AND type in (N'P', N'PC'))
DROP PROCEDURE [mobile].[AP_X_CustomersForJourneyDelegation]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


-- Create Procedure -----------------------------------------------
CREATE PROCEDURE [mobile].[AP_X_CustomersForJourneyDelegation]
		@UserID									INT,
		@CustJnyIDListForDelegationXML			XML,
		@IsSyncDone								TINYINT OUTPUT,
		@ErrorCode								VARCHAR(10) OUTPUT,
		@ErrorMessage							VARCHAR(4000) OUTPUT

AS
    BEGIN
    --***************************************************************************
    --* Project			:	Journey Delagation
    --* Description		:	Select List of Customers for give Journey Selection
    --*
    --* Configuration Record
    --* Review              Ver  Author        Date      
    --* SPRINT 1			1.0  Abhay		   29/08/2016
    --* Review              Ver  Author        Date        CR              Comments 
    --* E.g. 
	--*
    --***************************************************************************
	-- Exec [mobile].[AP_X_CustomersForJourneyDelegation] 1320,2,'2016-08-18','2016-09-02',41,<XML>

    -- Procedure Body -------------------------------------------------
    SET NOCOUNT ON
		BEGIN TRY

		BEGIN TRANSACTION

		-- Variable Declare

		DECLARE @DelegatedTo					INT,
				@UserJourneyID					INT,
				@FromDate						DATE,
				@ToDate							DATE,
				@IsSelectAll					BIT,
				@intCustJnyCount				INT,
				@intDelegatedUserJnyID			INT,
				@intDelegatedCustJnyID			INT,
				@tempFromDate					DATE
		-- Variable Initializations

			SELECT	@intCustJnyCount = 0, 
					@IsSyncDone = 0
		
			-- Read Delagation Details from XML						
				SELECT  
						@DelegatedTo		=	delegatedAgentDetails.value('delegatedTo[1]','INT'),
						@UserJourneyID		=	delegatedAgentDetails.value('userJourneyId[1]','INT'),
						@FromDate			=	delegatedAgentDetails.value('startDate[1]','DATE'),
						@ToDate				=	delegatedAgentDetails.value('endDate[1]','DATE'),
						@IsSelectAll		=	delegatedAgentDetails.value('isSelectAll[1]','BIT')
				FROM @CustJnyIDListForDelegationXML.nodes('delegatedAgentDetails')Catalog(delegatedAgentDetails)

			-- Populate Collection Day
				CREATE TABLE #TempCollectionDays (
								CollectionDay		TINYINT
							)
	
				IF DATEDIFF(d,@FromDate,@ToDate) >= 6 
				BEGIN 
					INSERT INTO #TempCollectionDays(CollectionDay)
					SELECT 1 UNION
					SELECT 2 UNION
					SELECT 3 UNION
					SELECT 4 UNION
					SELECT 5 UNION
					SELECT 6 UNION
					SELECT 7
				END
				ELSE
				BEGIN
					SET @tempFromDate = @FromDate
					--SELECT DATEPART(WEEKDAY, @FromDate) -1,DATEPART(WEEKDAY, @ToDate) -1
					WHILE (@tempFromDate <= @ToDate)
					BEGIN
						INSERT INTO #TempCollectionDays(CollectionDay)
						SELECT CASE WHEN (DATEPART(WEEKDAY, @tempFromDate) -1)= 0 THEN 7
								ELSE (DATEPART(WEEKDAY, @tempFromDate) -1) END
						SET @tempFromDate = DATEADD(d,1,@tempFromDate)
					END

				END
		--	PRINT 'Save Start here'
				-- Read Data from XML

				CREATE TABLE #TempCustJnyIDXmlData (
								TempID                          INT				Identity(1,1),
								CustJnyID						INT
				)

				
				/*
						'<delegatedCustomers><customerJourneyIds>1</customerJourneyIds></delegatedCustomers>
						<delegatedCustomers><customerJourneyIds>2</customerJourneyIds></delegatedCustomers>
						<access><userType>Agent</userType><userId>2</userId></access>
						<delegatedAgentDetails>
						<delegatedTo>3</delegatedTo>
						<endDate>2016-09-02</endDate>
						<userJourneyId>1320</userJourneyId>
						<startDate>2016-08-18</startDate>
						<isSelectAll>0</isSelectAll>
						</delegatedAgentDetails>'
				*/
				
				IF @IsSelectAll = 0 
				BEGIN

						--PRINT 'Collect CustJnyID From XML Data'

						INSERT INTO #TempCustJnyIDXmlData (CustJnyID)
									SELECT 
											delegatedCustomers.value('customerJourneyIds[1]','INT')					AS CustJnyID
									FROM @CustJnyIDListForDelegationXML.nodes('delegatedCustomers')Catalog(delegatedCustomers)
						
						
						--SET @intCustJnyCount    = IDENT_CURRENT('#TempCustJnyIDXmlData') --SCOPE_IDENTITY()  
						SET @intCustJnyCount    = @@ROWCOUNT

				END
				ELSE
				BEGIN
						
						INSERT INTO #TempCustJnyIDXmlData (CustJnyID)
									SELECT 
										 JC.CustJnyID				AS CustJnyID
									FROM 
									dbo.vwJourneyCustomer									JC
									INNER JOIN dbo.vwJourneyAgent							JA
											ON JA.JourneyId = JC.JourneyID
									LEFT JOIN mobile.vwDelegatedJourneyAgentCustomerList	DCL
											ON DCL.JourneyID = JA.JourneyId 
											AND DCL.PrimaryAgent = JA.UserId
											AND DCL.DelegatedCustomerID =  JC.CustomerId
											AND CAST(DCL.DelagatedStartDate AS DATE)  <= @ToDate	
											AND (CAST(DCL.DelagatedEndDate   AS DATE) >= @FromDate OR DCL.DelagatedEndDate is Null)	
									INNER JOIN dbo.vwCustomer								C
											ON C.CustomerID = JC.CustomerId
									LEFT JOIN [dbo].[vwVisit]								V
											ON V.CustomerID = C.CustomerId
									WHERE 
									JC.JourneyID	=	@UserJourneyID
									AND JA.UserId	=   @UserID
									AND ((V.VisitDate BETWEEN @FromDate AND @ToDate)  OR V.VisitDate IS NULL ) 
									AND (V.StatusID	=   1 OR V.StatusID IS NULL)					-- With Visit Status = PENDING
									AND DCL.DelegatedCustomerID IS NULL								-- To Exclude Already Delagated Customer
									AND CAST(JC.StartDate AS DATE)  <= @ToDate	
									AND (CAST(JC.EndDate   AS DATE) >= @FromDate OR JC.EndDate is Null)
									AND JC.CollectionDay IN (SELECT CollectionDay FROM #TempCollectionDays)

						SET @intCustJnyCount    = @@ROWCOUNT -- IDENT_CURRENT('#TempCustJnyIDXmlData') --SCOPE_IDENTITY()  
				END

				--sp_help 'mobile.tblDelegatedJourneyAgent'

				--SELECt @intCustJnyCount

				IF @intCustJnyCount > 0 
				BEGIN
					-- Insert INTO tblDelegatedJourneyAgent

					INSERT INTO mobile.tblDelegatedJourneyAgent(
							UserJnyID,
							DelegatedTo,
							isAccepted,
							StartDate,
							EndDate,
							CreatedDate,
							CreatedBy,
							IsDeleted
						)
						SELECT JourneyAgentId,
							   @DelegatedTo,
							   1,
							   @FromDate,
							   @ToDate,
							   GETDATE(),
							   @UserID,
							   0
						FROM dbo.vwJourneyAgent
						WHERE	UserID = @UserID   	
							AND	JourneyId = @UserJourneyID	
								
					SET @intDelegatedUserJnyID    = IDENT_CURRENT('[mobile].[tblDelegatedJourneyAgent]') --SCOPE_IDENTITY() 
					-- Insert Into tblDelegatedJourneyCustomer
					--sp_help 'mobile.tblDelegatedJourneyCustomer'
					INSERT INTO mobile.tblDelegatedJourneyCustomer(
							DelegatedUserJnyID,
							CustJnyID,
							CreatedDate,
							CreatedBy,
							IsDeleted
							)
					SELECT 	@intDelegatedUserJnyID,
							CustJnyID,
							GETDATE(),
							@USERID,
							0
					FROM #TempCustJnyIDXmlData
						
				END
				ELSE
				BEGIN
					SET @IsSyncDone = 0;
					SET @ErrorCode='ERR-250'
					SET @ErrorMessage= 'No Records Found'			
        
					ROLLBACK TRANSACTION;
					RETURN;
				END
	
		SET @IsSyncDone = 1					-- SYNC Completed

		COMMIT TRANSACTION;	

        END TRY
		BEGIN CATCH
		        
			SET @IsSyncDone = 0

			IF (XACT_STATE()) = -1  
				ROLLBACK TRANSACTION;  
			ELSE
				ROLLBACK TRANSACTION;  
      	
			SET @ErrorCode ='ERR-158'
			SET @ErrorMessage = CONVERT(VARCHAR(5),ERROR_NUMBER()) + ' : ' + Convert(VARCHAR(20),ERROR_LINE()) + ' : ' + Convert(VARCHAR(3500),ERROR_MESSAGE())		

		END CATCH
    SET NOCOUNT OFF
   
    RETURN
END
GO

sp_recompile '[mobile].[AP_X_CustomersForJourneyDelegation]'
go

