
/****************************************************************************
*
* Project Name		: SDT
*
* Reference			: Sprint-5 : BRANCH BALANCE
*
* Description		: Test Branch
* 
* Auth				: Abhay J. Meher
*
* Objects Affected	:	
* DATE				: 22-08-2016
*
****************************************************************************/


IF NOT EXISTS(SELECT *
				FROM   INFORMATION_SCHEMA.COLUMNS
				WHERE  TABLE_NAME = 'tblBranch' AND TABLE_SCHEMA = 'dbo'
                 AND COLUMN_NAME = 'isTest' ) 
BEGIN

		ALTER TABLE [dbo].[tblBranch] 
		ADD isTest BIT DEFAULT 0


		PRINT 'Column ''isTest'' Added in [dbo].[tblBranch] Table'
END
GO


IF  EXISTS (SELECT * FROM sys.objects WHERE OBJECT_ID = OBJECT_ID(N'[dbo].[vwBranch]') AND type in (N'V'))
DROP VIEW [dbo].[vwBranch]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE VIEW [dbo].[vwBranch]
AS
SELECT 
	BranchID, 
	BranchName, 
	AddressLine1, 
	AddressLine2, 
	AddressLine3, 
	AddressLine4, 
    City,
	County,
	PostCode, 
	PhoneNumber, 
    FaxNumber, 
	Email,
	BranchCode, 
	a.AreaID,
	a.AreaName,
	b.CreateDate, 
	b.CreatedUserID, 
	b.UpdatedDate, 
	b.UpdatedBy,
	isTest
FROM     
	dbo.tblBranch b
	INNER JOIN dbo.vwArea a on b.AreaID = a.AreaID
WHERE isActive = 1

GO


IF  EXISTS (SELECT * FROM sys.objects WHERE OBJECT_ID = OBJECT_ID(N'[mobile].[vwBranchDetails]') AND type in (N'V'))
DROP VIEW [mobile].[vwBranchDetails]
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
WHERE ISNULL(Br.isTest,0) = 0
GO





IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'mobile.vwJourneySelection') AND type in (N'V'))
DROP VIEW mobile.vwJourneySelection
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW mobile.vwJourneySelection
AS

SELECT 
       J.JourneyID					AS [JourneyID], 
       J.[description]				AS [JourneyDesc],
       U.UserID						AS [UserID],
       U.firstname					AS [FirstName],
       U.lastName					AS [Lastname],
       SE.branchid					AS [BranchId],
       BR.branchName				AS [BranchName],
	   CAST(JA.StartDate AS DATE)   AS [JourneyAgentStartDate],
	   CAST(JA.EndDate AS DATE)		AS [JourneyAgentEndDate],
	   CAST(JS.StartDate AS DATE)   AS [JourneySectionStartDate],
	   CAST(JS.EndDate AS DATE)		AS [JourneySectionEndDate],
	   U.MobileNumber				AS [MobileNumber],
	   U.HomePhone					AS [HomePhone]
FROM 
       [dbo].[vwJourneyAgent] JA
       INNER JOIN [dbo].[vwJourney] J			ON JA.journeyid = J.journeyid 
       INNER JOIN [dbo].[vwUser] U				ON U.UserID = JA.UserID
       INNER JOIN [dbo].[vwJourneySection] JS	ON JS.journeyid = JA.journeyid
       INNER JOIN [dbo].[vwSection] SE			ON JS.SectionID = SE.SectionID
       INNER JOIN [dbo].[vwBranch] BR			ON BR.BranchID = SE.BranchID
 WHERE 			
			SE.isActive = 1
		AND U.isActive = 1

GO
