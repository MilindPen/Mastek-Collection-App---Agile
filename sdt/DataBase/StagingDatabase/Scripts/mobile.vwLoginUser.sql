IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'mobile.vwLoginUser') AND type in (N'V'))
DROP VIEW mobile.vwLoginUser
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE VIEW mobile.vwLoginUser
AS

SELECT 
       u.UserID			AS [SDTUser], 
       mu.UserID		AS [MobileUser],
       u.Title			AS [Title],
       u.FirstName		AS [FirstName],
       u.LastName		AS [LastName],
       u.MiddleName		AS [MiddleName],
       mu.PIN			AS [PIN],
       mu.MacAddress	AS [MacAddress],
       u.isActive		AS [IsActive]
FROM 
       dbo.vwUser u
       LEFT OUTER JOIN [mobile].[tblUser]  mu ON mu.UserID = u.UserID 
GO








