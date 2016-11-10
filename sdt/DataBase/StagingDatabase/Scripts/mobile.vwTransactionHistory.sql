
/****** Object:  View [mobile].[vwTransactionHistory]    Script Date: 5/10/2016 5:17:09 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[mobile].[vwTransactionHistory]') AND type in (N'V'))
DROP VIEW [mobile].[vwTransactionHistory]
GO

/****** Object:  View [mobile].[vwTransactionHistory]    Script Date: 5/10/2016 5:17:09 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [mobile].[vwTransactionHistory]
AS
SELECT 
	ta.AllocationID, 
	ta.TransactionID, 
	ta.AgreementID,
	we.YearNo,
	we.WeekNo, 
	ta.Amount, 
	ta.Arrears, 
	ta.TransactionTypeID, 
	tr.PaidDate, 
	tr.ResponseStatusID, 
	jc.JourneyID, 
	tr.CustomerID,
	vs.VisitDate,
	vs.UserID
FROM dbo.vwVisit vs
INNER JOIN dbo.vwJourneyCustomer jc
ON jc.CustomerID = vs.CustomerID
INNER JOIN mobile.vwAgreementList al
ON al.CustomerID = vs.CustomerID
INNER JOIN dbo.vwTransactionAllocation ta
ON ta.AgreementID = al.AgreementID
INNER JOIN dbo.vwTransaction tr
ON ta.TransactionID = tr.TransactionID
INNER JOIN dbo.vwWeekEnding we
ON tr.PaidDate BETWEEN we.StartDate AND we.EndDate
WHERE ta.TransactionTypeID NOT IN (2,3)					-- Excluding Transaction Type : 2-Cost & 3-Charge
AND vs.VisitDate >= jc.StartDate
AND (vs.VisitDate <= jc.EndDate OR jc.EndDate IS NULL)

GO

