

/*

	1857 - Prevent Changes to Weekly Cash Summary in Closed Week. 

*/

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'mobile.tblWeekStatus') AND type in (N'U'))
BEGIN
	CREATE TABLE [mobile].[tblWeekStatus](
		[WeekStatusID]			TINYINT NOT NULL,
		[WeekStatusDesc]		VARCHAR(250) NOT NULL,
	 CONSTRAINT [PK_WeekStatusID] PRIMARY KEY CLUSTERED 
	(
		[WeekStatusID] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
	)
END
GO

IF NOT EXISTS (SELECT 1 FROM  [mobile].[tblWeekStatus])
BEGIN

	INSERT INTO [mobile].[tblWeekStatus] (WeekStatusID,WeekStatusDesc)
	SELECT '0','Close'
	UNION ALL
	SELECT '1','Open'
END
GO


SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


SET ANSI_PADDING ON
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'mobile.tblBranchClosedWeekDetails') AND type in (N'U'))
BEGIN
	CREATE TABLE [mobile].[tblBranchClosedWeekDetails](
		[BranchClosedWeekID]	INT IDENTITY (1, 1) NOT NULL,
		[WeekNo]				INT	NOT NULL,
		[YearNo]				INT	NOT NULL,
		[BranchID]				INT	NOT NULL,
		[ClosedBy]				INT NOT NULL,
		[ClosedDateTime]		DATETIME,
		[WeekStatusID]			TINYINT	,
		[CreatedBy]				INT	,
		[CreatedDateTime]		DATETIME CONSTRAINT [DF_tblBranchClosedWeekDetails_CreatedDate]  DEFAULT (getdate()),
		[UpdatedBy]				INT,
		[UpdatedDateTime]		DATETIME,
		 CONSTRAINT [PK_BranchClosedWeekID] PRIMARY KEY NONCLUSTERED 
	(
		[BranchClosedWeekID] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
	)
END
GO



IF NOT EXISTS ( SELECT 1  from SYS.INDEXES I 
					INNER JOIN SYS.OBJECTS O ON I.Object_ID = O.Object_ID 
					WHERE I.NAME = 'I_C_BCW_1' 
					  AND O.NAME = 'tblBranchClosedWeekDetails' 
					  AND SCHEMA_NAME(SCHEMA_ID) = 'mobile'
					)
BEGIN

	CREATE CLUSTERED INDEX [I_C_BCW_1] ON [mobile].[tblBranchClosedWeekDetails] 
	(
		[YearNo] ASC,[WeekNo] ASC
	) WITH ( FILLFACTOR = 80) 
END
GO

IF NOT EXISTS ( SELECT 1  from SYS.INDEXES I 
					INNER JOIN SYS.OBJECTS O ON I.Object_ID = O.Object_ID 
					WHERE I.NAME = 'I_C_BCW_1' 
					  AND O.NAME = 'tblBranchClosedWeekDetails' 
					  AND SCHEMA_NAME(SCHEMA_ID) = 'mobile'
					)
BEGIN
	CREATE NONCLUSTERED INDEX [I_NC_BCW_1]
	ON [mobile].[tblBranchClosedWeekDetails] ([ClosedBy])
	WITH (FILLFACTOR = 80)
END

		
IF NOT EXISTS(SELECT OBJECT_NAME(Parent_Object_id) FROM SYS.OBJECTS WHERE NAME = 'FK_tblBranchClosedWeekDetails_tblBranch' 
				AND OBJECT_NAME(Parent_Object_id) = 'tblBranchClosedWeekDetails' AND TYPE = 'F')
BEGIN

	ALTER TABLE [mobile].[tblBranchClosedWeekDetails]  WITH CHECK ADD  CONSTRAINT [FK_tblBranchClosedWeekDetails_tblBranch] FOREIGN KEY([BranchID])
	REFERENCES [dbo].[tblBranch] ([BranchID])


	ALTER TABLE [mobile].[tblBranchClosedWeekDetails] CHECK CONSTRAINT [FK_tblBranchClosedWeekDetails_tblBranch]

END
GO 

IF NOT EXISTS(SELECT OBJECT_NAME(Parent_Object_id) FROM SYS.OBJECTS WHERE NAME = 'FK_tblBranchClosedWeekDetails_tblUser_ClosedBy' 
				AND OBJECT_NAME(Parent_Object_id) = 'tblBranchClosedWeekDetails' AND TYPE = 'F')
BEGIN
	
	ALTER TABLE [mobile].[tblBranchClosedWeekDetails]  WITH CHECK ADD  CONSTRAINT [FK_tblBranchClosedWeekDetails_tblUser_ClosedBy] FOREIGN KEY([ClosedBy])
	REFERENCES [dbo].[tblUser] ([UserID])

	ALTER TABLE [mobile].[tblBranchClosedWeekDetails] CHECK CONSTRAINT [FK_tblBranchClosedWeekDetails_tblUser_ClosedBy]

END
GO 


IF NOT EXISTS(SELECT OBJECT_NAME(Parent_Object_id) FROM SYS.OBJECTS WHERE NAME = 'FK_tblBranchClosedWeekDetails_tblUser_CreatedBy' 
				AND OBJECT_NAME(Parent_Object_id) = 'tblBranchClosedWeekDetails' AND TYPE = 'F')
BEGIN
	
	
	ALTER TABLE [mobile].[tblBranchClosedWeekDetails]  WITH CHECK ADD  CONSTRAINT [FK_tblBranchClosedWeekDetails_tblUser_CreatedBy] FOREIGN KEY([CreatedBY])
	REFERENCES [dbo].[tblUser] ([UserID])

	ALTER TABLE [mobile].[tblBranchClosedWeekDetails] CHECK CONSTRAINT [FK_tblBranchClosedWeekDetails_tblUser_CreatedBy]

END
GO 


IF NOT EXISTS(SELECT OBJECT_NAME(Parent_Object_id) FROM SYS.OBJECTS WHERE NAME = 'FK_tblBranchClosedWeekDetails_tblWeekStatus' 
				AND OBJECT_NAME(Parent_Object_id) = 'tblBranchClosedWeekDetails' AND TYPE = 'F')
BEGIN
	
	ALTER TABLE [mobile].[tblBranchClosedWeekDetails]  WITH CHECK ADD  CONSTRAINT [FK_tblBranchClosedWeekDetails_tblWeekStatus] FOREIGN KEY([WeekStatusID])
	REFERENCES [mobile].[tblWeekStatus] ([WeekStatusID])

	ALTER TABLE [mobile].[tblBranchClosedWeekDetails] CHECK CONSTRAINT [FK_tblBranchClosedWeekDetails_tblWeekStatus]

END
GO 




IF  EXISTS (SELECT * FROM sys.objects WHERE OBJECT_ID = OBJECT_ID(N'mobile.vwBranchClosedWeekDetails') AND type in (N'V'))
DROP VIEW mobile.vwBranchClosedWeekDetails
GO


SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE VIEW [mobile].[vwBranchClosedWeekDetails]
AS
SELECT 
		BCWD.[BranchClosedWeekID]	AS BranchClosedWeekID,
		WE.[YearNo]					AS YearNo,
		WE.[WeekNO]					AS WeekNo,
		BCWD.[BranchID]				AS BranchID,
		BCWD.[ClosedBy]				AS ClosedBy,
		U.FirstName					AS FirstName,
		U.lastName					AS LastName,
		BCWD.[ClosedDateTime]		AS ClosedDateTime,
		BCWD.[WeekStatusID]			AS WeekStatusID,
		WS.[WeekStatusDesc]			AS WeekStatusDesc,
		BCWD.[CreatedBy]			AS CreatedBy,
		BCWD.[CreatedDateTime]		AS CreatedDateTime,
		BCWD.[UpdatedBy]			AS UpdatedBy,
		BCWD.[UpdatedDateTime]		AS UpdatedDateTime
  FROM 
	[mobile].[tblBranchClosedWeekDetails] BCWD
	INNER JOIN [mobile].[tblWeekStatus] WS ON WS.WeekStatusID = BCWD.WeekStatusID
	INNER JOIN [dbo].[vwWeekEnding] WE	ON WE.WeekNo = BCWD.WeekNo AND WE.YearNo = BCWD.YearNo
	INNER JOIN [dbo].[vwUser] U ON U.USerID = BCWD.ClosedBy
GO


IF  EXISTS (SELECT * FROM sys.objects WHERE OBJECT_ID = OBJECT_ID(N'mobile.vwBranchDetails') AND type in (N'V'))
DROP VIEW mobile.vwBranchDetails
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [mobile].[vwBranchDetails]
AS
SELECT 
		Br.BranchID				AS BranchID,
		Br.BranchName			AS BranchName,
		Ar.AreaID				AS AreaID,
		Ar.AreaName				AS AreaName,
		Re.RegionID				AS RegionID,
		Re.RegionName			AS RegionName 
FROM [dbo].[vwBranch] Br
INNER JOIN [dbo].[vwArea] Ar ON Br.AreaID = Ar.AreaID
INNER JOIN [dbo].[vwRegion] Re ON Ar.RegionID = Re.RegionID
GO




IF  EXISTS (SELECT * FROM sys.objects WHERE OBJECT_ID = OBJECT_ID(N'dbo.vwTransactionAllocation') AND type in (N'V'))
DROP VIEW [dbo].[vwTransactionAllocation]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE VIEW [dbo].[vwTransactionAllocation]
AS
SELECT
	   [AllocationID]
      ,[TransactionID]
      ,[AgreementID]
      ,[Amount]
      ,[Arrears]
      ,[Balance]
      ,[TransactionTypeID]
	  ,tt.[TypeDescription] TransactionTypeDesc
      ,[CreatedDate]
      ,[CreatedBy]
      ,[UpdatedDate]
      ,[UpdatedBy]
	  ,tt.[TypeCentralPayment] AS TypeCentralPayment
  FROM 
	[dbo].[tblTransactionAllocation] a
	INNER JOIN dbo.tblTransactionType tt ON tt.TypeID = a.TransactionTypeID

GO


IF NOT EXISTS (SELECT 1 FROM  [mobile].[tblBalanceType] WHERE TypeID = 'C')
BEGIN

	INSERT INTO [mobile].[tblBalanceType] (TypeID,[Description])
	SELECT 'C','Collections'
	
END
GO

IF NOT EXISTS (SELECT 1 FROM  [mobile].[tblBalanceType] WHERE TypeID = 'D')
BEGIN

	INSERT INTO [mobile].[tblBalanceType] (TypeID,[Description])
	SELECT 'D','A&L Deposits'
	
END
GO

IF NOT EXISTS (SELECT 1 FROM  [mobile].[tblBalanceType] WHERE TypeID = 'W')
BEGIN

	INSERT INTO [mobile].[tblBalanceType] (TypeID,[Description])
	SELECT 'W','ATM Withdrawals'
	
END
GO