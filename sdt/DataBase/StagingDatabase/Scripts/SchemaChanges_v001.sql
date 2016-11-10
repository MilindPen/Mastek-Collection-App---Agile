/*
		START : Change Column Name  FOR DEV and INT
*/

IF EXISTS(SELECT *
          FROM   INFORMATION_SCHEMA.COLUMNS
          WHERE  TABLE_NAME = 'tblArea' AND TABLE_SCHEMA = 'dbo'
                 AND COLUMN_NAME = 'AreaManagerID') 
BEGIN

		EXEC sp_RENAME 'tblArea.AreaManagerID' , 'UserID', 'COLUMN'
END
GO

IF EXISTS(SELECT *
          FROM   INFORMATION_SCHEMA.COLUMNS
          WHERE  TABLE_NAME = 'tblRegion' AND TABLE_SCHEMA = 'dbo'
                 AND COLUMN_NAME = 'RegionManagerID') 
BEGIN

		EXEC sp_RENAME 'tblRegion.RegionManagerID' , 'UserID', 'COLUMN'
END
GO

IF EXISTS(SELECT *
          FROM   INFORMATION_SCHEMA.COLUMNS
          WHERE  TABLE_NAME = 'tblSection' AND TABLE_SCHEMA = 'dbo'
                 AND COLUMN_NAME = 'BusinessManagerID') 
BEGIN

		EXEC sp_RENAME 'tblSection.BusinessManagerID' , 'UserID', 'COLUMN'
END
GO

/*
		END : Change Column Name 
*/


--IF NOT EXISTS(SELECT *
--          FROM   INFORMATION_SCHEMA.COLUMNS
--          WHERE  TABLE_NAME = 'tblUser' AND TABLE_SCHEMA = 'dbo'
--                 AND COLUMN_NAME = 'RegistrationId') 
--BEGIN

--		ALTER TABLE dbo.tblUser
--		ADD RegistrationId CHAR(8) NULL DEFAULT (right(CONVERT([decimal](15,15),rand(checksum(newid()))),(8)))
--END
--GO

--IF NOT EXISTS(SELECT *
--          FROM   INFORMATION_SCHEMA.COLUMNS
--          WHERE  TABLE_NAME = 'tblUser' AND TABLE_SCHEMA = 'dbo'
--                 AND COLUMN_NAME = 'AppInstalled') 
--BEGIN

--		ALTER TABLE dbo.tblUser
--		ADD AppInstalled INT NOT NULL DEFAULT 0
--END
--GO



/****** Object:  Table [dbo].[tblUserType]    Script Date: 6/30/2016 9:02:53 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'dbo.tblUserType') AND type in (N'U'))
BEGIN
	CREATE TABLE [dbo].[tblUserType](
		[UserTypeID] [int] NOT NULL,
		[UserType] [varchar](250) NOT NULL,
	 CONSTRAINT [PK_UserTypeID] PRIMARY KEY CLUSTERED 
	(
		[UserTypeID] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
	)
END
GO


IF NOT EXISTS(SELECT *
          FROM   INFORMATION_SCHEMA.COLUMNS
          WHERE  TABLE_NAME = 'tblDashboardAmount' AND TABLE_SCHEMA = 'mobile'
                 AND COLUMN_NAME = 'Reason') 
BEGIN

		ALTER TABLE [mobile].[tblDashboardAmount]
		ADD Reason VARCHAR(250) NULL
END
GO


IF NOT EXISTS(SELECT *
          FROM   INFORMATION_SCHEMA.COLUMNS
          WHERE  TABLE_NAME = 'tblDelegatedDashboardAmount' AND TABLE_SCHEMA = 'mobile'
                 AND COLUMN_NAME = 'Reason') 
BEGIN

		ALTER TABLE [mobile].[tblDelegatedDashboardAmount]
		ADD Reason VARCHAR(250) NULL
END
GO

IF NOT EXISTS(SELECT *
          FROM   INFORMATION_SCHEMA.COLUMNS
          WHERE  TABLE_NAME = 'tblDelegatedDashboardAmount' AND TABLE_SCHEMA = 'mobile'
                 AND COLUMN_NAME = 'Cheque_ind') 
BEGIN

		ALTER TABLE [mobile].[tblDelegatedDashboardAmount]
		ADD Cheque_ind BIT DEFAULT 0
END
GO

IF NOT EXISTS(SELECT *
          FROM   INFORMATION_SCHEMA.COLUMNS
          WHERE  TABLE_NAME = 'tblDelegatedDashboardAmount' AND TABLE_SCHEMA = 'mobile'
                 AND COLUMN_NAME = 'DelegatedToUserID') 
BEGIN

		ALTER TABLE [mobile].[tblDelegatedDashboardAmount]
		ADD DelegatedToUserID INT NULL
END
GO


IF NOT EXISTS(SELECT *
          FROM   INFORMATION_SCHEMA.COLUMNS
          WHERE  TABLE_NAME = 'tblJourney' AND TABLE_SCHEMA = 'dbo'
                 AND COLUMN_NAME = 'isActive') 
BEGIN

		ALTER TABLE dbo.tblJourney
		ADD isActive BIT DEFAULT 1
END
GO

IF NOT EXISTS(SELECT *
          FROM   INFORMATION_SCHEMA.COLUMNS
          WHERE  TABLE_NAME = 'tblJourney' AND TABLE_SCHEMA = 'dbo'
                 AND COLUMN_NAME = 'JourneyType') 
BEGIN

		ALTER TABLE dbo.tblJourney
		ADD JourneyType CHAR(1) NULL
END
GO

/*
	ADD FOREIGN KEY CONSTRAINT TO [tblUser] for tblUserTypeID
*/

IF NOT EXISTS(SELECT OBJECT_NAME(Parent_Object_id) FROM SYS.OBJECTS WHERE NAME = 'FK_tblUser_tblUserType' 
				AND OBJECT_NAME(Parent_Object_id) = 'tblUser' AND TYPE = 'F')
BEGIN

	ALTER TABLE [dbo].[tblUser]  WITH CHECK ADD CONSTRAINT [FK_tblUser_tblUserType] FOREIGN KEY([UserTypeID])
	REFERENCES [dbo].[tblUserType] ([UserTypeID])


	ALTER TABLE [dbo].[tblUser] CHECK CONSTRAINT [FK_tblUser_tblUserType]
END
GO


IF NOT EXISTS(SELECT OBJECT_NAME(Parent_Object_id) FROM SYS.OBJECTS WHERE NAME = 'FK_tblDelegatedDashboardAmount_DelegatedToUserID' 
				AND OBJECT_NAME(Parent_Object_id) = 'tblDelegatedDashboardAmount' AND TYPE = 'F')
BEGIN

	ALTER TABLE [mobile].[tblDelegatedDashboardAmount] WITH CHECK ADD CONSTRAINT [FK_tblDelegatedDashboardAmount_DelegatedToUserID] FOREIGN KEY([DelegatedToUserID])
	REFERENCES [dbo].[tblUser] ([UserID])


	ALTER TABLE [mobile].[tblDelegatedDashboardAmount] CHECK CONSTRAINT [FK_tblDelegatedDashboardAmount_DelegatedToUserID]
END
GO


IF  EXISTS (SELECT * FROM sys.objects WHERE OBJECT_ID = OBJECT_ID(N'mobile.vwDashboardAmount') AND type in (N'V'))
DROP VIEW mobile.vwDashboardAmount
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [mobile].[vwDashboardAmount]
AS
SELECT 
	   dba.[ID]
      ,dba.[JourneyID]
      ,dba.[BalanceDate]
      ,dba.[PeriodIndicator]
      ,dba.[BalanceTypeID]
	  , bt.[Description] BalanceTypeDesc
      ,dba.[Amount]
      ,dba.[Reference]
	  ,dba.[Cheque_ind]										-- New Column Added
      ,dba.[CreatedDate]
      ,dba.[CreatedBy]
      ,dba.[UpdatedDate]
      ,dba.[UpdatedBy]
	  ,dba.[Reason]											-- NEW Column 
  FROM 
	[mobile].[tblDashboardAmount] dba
	INNER JOIN mobile.tblBalanceType bt ON bt.TypeID = dba.BalanceTypeID
GO



IF  EXISTS (SELECT * FROM sys.objects WHERE OBJECT_ID = OBJECT_ID(N'mobile.vwDelegatedDashboardAmount') AND type in (N'V'))
DROP VIEW mobile.vwDelegatedDashboardAmount
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE VIEW [mobile].[vwDelegatedDashboardAmount]
AS
SELECT 
	   [ID]
      ,[JourneyID]
      ,[JnyAgentDelID]
      ,[BalanceDate]
      ,[PeriodIndicator]
      ,[BalanceTypeID]
	  ,bt.[Description] BalanceTypeDesc
      ,[Amount]
      ,[Reference]
      ,[CreatedDate]
      ,[CreatedBy]
      ,[UpdatedDate]
      ,[UpdatedBy]
	  ,dda.[Reason]											-- NEW Column 
	  ,dda.[Cheque_ind]										-- Added Missing Column
	  ,DelegatedToUserID									-- NEW Column
  FROM 
	[mobile].[tblDelegatedDashboardAmount] dda
	INNER JOIN mobile.tblBalanceType bt ON bt.TypeID = dda.BalanceTypeID
GO



IF  EXISTS (SELECT * FROM sys.objects WHERE OBJECT_ID = OBJECT_ID(N'dbo.vwJourneySection') AND type in (N'V'))
DROP VIEW dbo.vwJourneySection
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[vwJourneySection]
AS
SELECT 
	JnySectionID,
	ja.JourneyID,					-- Added Missing Comma = ","
	ja.SectionID,
	StartDate,
	EndDate,
	CreatedDate,
	CreatedBy,
	UpdatedDate,
	UpdatedBy
FROM 
	[dbo].[tblJourneySection] ja 

GO



IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'dbo.vwArea') AND type in (N'V'))
DROP VIEW dbo.vwArea
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE VIEW [dbo].[vwArea]
AS

SELECT 
	AreaID,
	AreaName,
	UserID,					-- Column added in view 
	RegionID,				-- Column added in view
	CreatedDate,
	CreatedUserID,
	UpdatedDate,
	UpdatedUserID
FROM dbo.tblArea 
GO


IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'dbo.vwJourney') AND type in (N'V'))
DROP VIEW dbo.vwJourney
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE VIEW [dbo].[vwJourney]
AS
SELECT 
	JourneyID,
	ISNULL(JourneyType,'') + '' + ISNULL([Description],'') AS [Description],
	CreatedDate CreatedDate,
	CreatedBy CreatedBy,
	UpdatedDate UpdatedDate,
	UpdatedBy UpdatedBy,
	isActive
FROM
	dbo.tblJourney

GO



IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'dbo.vwRegion') AND type in (N'V'))
DROP VIEW dbo.vwRegion
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[vwRegion]
AS

SELECT 
	RegionID,
	RegionName,
	UserID,
	CompanyID
	CreatedDate,
	CreatedBy,
    UpdatedDate,
    UpdatedUserID  
FROM 
	dbo.tblRegion 
GO

--sp_helptext 'vwSection'


IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'dbo.vwSection') AND type in (N'V'))
DROP VIEW dbo.[vwSection]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[vwSection]
AS
SELECT 
	SectionID, 
	SectionName, 
	s.isActive,
	s.BranchID,
	s.UserID,
	s.CreatedDate, 
	s.CreatedBy, 
	s.UpdatedDate, 
	s.UpdatedBy
FROM     
	dbo.tblSection s INNER JOIN
    dbo.vwBusinessManager bm ON s.UserID = bm.UserID
--WHERE 
--	isActive = 1
GO

IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'dbo.vwUser') AND type in (N'V'))
DROP VIEW dbo.vwUser
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[vwUser]
AS

SELECT 
	  UserID, 
      Title,
      FirstName,
      LastName,
      MiddleName,
      AddressLine1,
      AddressLine2,
      AddressLine3,
      AddressLine4,
      City,
	  County,
      PostCode,
      StartDate,
      EndDate,
      isActive,
	  Email,
	  MobileNumber,
	  HomePhone,
      CreatedDate,
      CreatedBy,
      UpdatedDate,
      UpdatedUserID,
	  U.UserTypeID,
	  UT.UserType
  FROM [dbo].[tblUser] U
  LEFT JOIN [dbo].[tblUserType]  UT ON U.UserTypeID = UT.UserTypeID

  GO


