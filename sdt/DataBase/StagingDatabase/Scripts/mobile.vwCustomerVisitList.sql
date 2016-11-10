/****** Object:  View [mobile].[vwCustomerVisitList]   Script Date: 5/25/2016 15:40:23 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[mobile].[vwCustomerVisitList]') AND type in (N'V'))
DROP VIEW [mobile].[vwCustomerVisitList]
GO

/****** Object:  View [mobile].[vwCustomerVisitList]   Script Date: 5/25/2016 15:40:23 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW mobile.vwCustomerVisitList
AS
SELECT 
	vs.VisitDate, 
	jc.CollectionDay,
	jc.JourneyOrderBy, 
	vs.VisitID, 
	vs.StatusID, 
	sts.[description] as VisitStatus, 
	vs.UserID, 
	jc.JourneyID, 
	vs.CustomerID, 
	c.CustomerNumber, 
	c.Title, 
	c.FirstName, 
	c.MiddleName, 
	c.LastName,
	vs.PaymentTypeID, 
	vs.TotalPaidAmount, 
	agr.TotalTermAmount, 
	c.PaymentPerformance,
	c.AddressLine1, 
	c.AddressLine2, 
	c.AddressLine3, 
	c.AddressLine4, 
	c.City, 
	c.PostCode,
	c.MobileNumber, 
	c.PhoneNumber, 
	c.Email, 
	c.DOB
FROM mobile.vwVisitsummary vs
INNER JOIN dbo.vwCustomer c				ON vs.CustomerID = c.CustomerID
INNER JOIN dbo.vwJourneyCustomer jc		ON jc.CustomerID = vs.CustomerID
INNER JOIN dbo.tblVisitStatus sts		ON sts.StatusID = vs.StatusID
INNER JOIN (SELECT a.CustomerID, SUM(a.Terms) as TotalTermAmount 
			FROM dbo.tblAgreement  a WHERE a.StatusID = 1 GROUP BY a.CustomerID) agr
										ON agr.CustomerID = vs.CustomerID
WHERE jc.StartDate <= vs.VisitDate
AND (jc.EndDate >= vs.VisitDate or jc.EndDate is null)

GO