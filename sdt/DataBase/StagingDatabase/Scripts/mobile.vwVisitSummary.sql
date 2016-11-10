USE [sdtStaging]
GO

/****** Object:  View [mobile].[vwVisitSummary]    Script Date: 5/10/2016 5:19:23 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[mobile].[vwVisitSummary]') AND type in (N'V'))
DROP VIEW [mobile].[vwVisitSummary]
GO

/****** Object:  View [mobile].[vwVisitSummary]    Script Date: 5/10/2016 5:19:23 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE VIEW [mobile].[vwVisitSummary]
AS

SELECT 
       vt.VisitID
       , vt.CustomerID
       , vt.UserId
       , vt.VisitDate
       , vt.StatusID
       , SUM(vr.AmountPaid) AS TotalPaidAmount
	   , vt.UIColourCode
	   , vt.PaymentTypeID
FROM 
	dbo.vwVisit vt
	LEFT JOIN dbo.vwVisitResult vr ON vr.VisitID = vt.VisitID
GROUP BY 
	vt.VisitID
	, vt.CustomerID
	, vt.UserId
	, vt.VisitDate
	, vt.StatusID
	, vt.UIColourCode
    , vt.PaymentTypeID



GO


