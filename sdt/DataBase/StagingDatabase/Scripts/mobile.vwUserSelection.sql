IF  EXISTS (SELECT * FROM SYS.OBJECTS WHERE object_id = OBJECT_ID(N'mobile.vwUserSelection') AND type in (N'V'))
DROP VIEW mobile.vwUserSelection
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW mobile.vwUserSelection
AS
Select 
	U.UserID					AS UserID,
	U.FirstName					AS FirstName,
	U.LastName					AS LastName,
	U.UserTypeID				AS UserTypeID,
	UT.UserType					AS UserType,
	J.JourneyID					AS JourneyID,
	J.[Description]				AS JourneyDesc,
	SE.SectionID				AS SectionID,
	SE.SectionName				AS SectionName,
	BR.BranchID					AS BranchID,
	BR.BranchName				AS BranchName,
	SE.UserID					AS BusinessManagerID,
	AR.AreaID					AS AreaID,
	AR.AreaName					AS AreaName,
	AR.UserID					AS AreaManagerID,
	R.RegionID					AS RegionID,
	R.RegionName				AS RegionName,
	R.UserID					AS RegionManagerID,
	JA.StartDate				AS [JourneyAgentStartDate],
	JA.EndDate					AS [JourneyAgentEndDate],
	U.StartDate					AS [UserStartDate],
	U.EndDate					AS [UserEndDate]
FROM [dbo].[vwUser]					U
LEFT JOIN [dbo].[vwJourneyAgent]	JA		ON JA.UserID	 = U.UserID
LEFT JOIN [dbo].[vwJourney]			J		ON J.JourneyID	 = JA.JourneyID 
LEFT JOIN [dbo].[vwJourneySection]	JS		ON JS.JourneyID  = J.JourneyID
LEFT JOIN [dbo].[vwSection]			SE		ON SE.SectionID  = JS.SectionID OR (U.UserID = SE.UserID)
LEFT JOIN [dbo].[vwBranch]			BR		ON BR.BranchID	 = SE.BranchID
LEFT JOIN [dbo].[vwArea]			AR		ON Ar.AreaID	 = Br.AreaID	OR (U.UserID = AR.UserID)
LEFT JOIN [dbo].[vwRegion]			R		ON R.RegionID	 = Ar.RegionID  OR (U.UserID = R.UserID)
LEFT JOIN [dbo].[tblUserType]		UT		ON UT.UserTypeID = U.UserTypeID
WHERE 
	U.IsActive = 1
	--AND SE.isActive = 1
GO


--Select top 10 * from mobile.vwUserSelection

--Select * from tblUser


--AgreementID: 1964165
--CustomerID: 957210

