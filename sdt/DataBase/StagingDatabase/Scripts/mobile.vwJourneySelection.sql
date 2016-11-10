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
	   JA.StartDate					AS [JourneyAgentStartDate],
	   JA.EndDate					AS [JourneyAgentEndDate],
	   JS.StartDate					AS [JourneySectionStartDate],
	   JS.EndDate					AS [JourneySectionEndDate]
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




