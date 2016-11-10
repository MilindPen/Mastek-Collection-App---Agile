USE [sdtStaging]
GO

/****** Object:  View [mobile].[vwCardPaymentSummary]    Script Date: 5/10/2016 5:11:10 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[mobile].[vwCardPaymentSummary]') AND type in (N'V'))
DROP VIEW [mobile].[vwCardPaymentSummary]
GO

/****** Object:  View [mobile].[vwCardPaymentSummary]    Script Date: 5/10/2016 5:11:11 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE VIEW [mobile].[vwCardPaymentSummary]
AS
SELECT
	jc.JourneyID AS JourneyID,
	tr.PaidDate as WeekDate,
	SUM (ta.Amount) as CardPaymentAmount
FROM dbo.vwVisit vs
INNER JOIN dbo.vwJourneyCustomer jc
			ON jc.CustomerID = vs.CustomerID
INNER JOIN dbo.vwTransaction tr
			ON tr.CustomerID = jc.CustomerID
INNER JOIN dbo.vwTransactionAllocation ta
			ON ta.TransactionID = tr.TransactionID
INNER JOIN [dbo].[tblResponseStatus] rs 
			ON rs.StatusID = tr.ResponseStatusID
WHERE rs.StatusID = 1 --tr.ResponseStatusID IS NOT NULL  -- StatusID = 1 - Accepted
GROUP BY jc.JourneyID,tr.PaidDate

GO


