USE [sdtStaging]
GO

/****** Object:  View [mobile].[vwUser]    Script Date: 5/10/2016 5:18:17 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[mobile].[vwUser]') AND type in (N'V'))
DROP VIEW [mobile].[vwUser]
GO

/****** Object:  View [mobile].[vwUser]    Script Date: 5/10/2016 5:18:18 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO





CREATE VIEW [mobile].[vwUser]
AS

SELECT 
	u.UserID, 
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
	mu.PIN,
	mu.UserName,
	mu.[Password],
	mu.SecurityQuestion,
	mu.SecurityAnswer,
	mu.LastLoggedIn
FROM 
	dbo.vwUser u
	INNER JOIN mobile.tbluser mu ON mu.UserID = u.UserID
 



GO


