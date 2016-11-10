
/****** Object:  View [mobile].[vwLatestAgreementTransaction]   Script Date: 5/24/2016 11:19:23 AM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[mobile].[vwLatestAgreementTransaction]') AND type in (N'V'))
DROP VIEW [mobile].[vwLatestAgreementTransaction]
GO

/****** Object:  View [mobile].[vwLatestAgreementTransaction]   Script Date: 5/24/2016 11:19:23 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [mobile].[vwLatestAgreementTransaction]
AS

	SELECT 
		LatestAgrRecord.UserID,
		LatestAgrRecord.VisitID,
		LatestAgrRecord.ResultID,
		LatestAgrRecord.visitStatusID,
		LatestAgrRecord.resultStatusID,
		LatestAgrRecord.customerID,
		LatestAgrRecord.AgreementID,
		LatestAgrRecord.ResultDate,
		LatestAgrRecord.agreementAmountPaid,
		CASE WHEN AGR1.TransactionTypeID = 51 THEN 'N' 
		ELSE LatestAgrRecord.AgreementMode END AS AgreementMode
		FROM (
		SELECT ROW_NUMBER() OVER( PARTITION BY AgreementID ORDER BY AllocationID DESC) AS ROWNUM,
						AgreementID, TransactionTypeID
						FROM [dbo].[tblTransactionAllocation] WHERE AllocationID >= 1000000000    -- Changed Mobile Transaction Allocations range
					)	AGR1	
		INNER JOIN 
		(SELECT	
				VR.CreatedBy						AS UserID,
				VR.VisitID							AS VisitID,
				FORMAT(MAX(VR.ResultDate), 'yymmddhhmmss', 'en-US' ) + Convert(VARCHAR(15),T.CustomerID)
													AS ResultID,
				V.StatusID							AS visitStatusID,
				V.StatusID							AS resultStatusID, --fix for Bug 1508
				T.CustomerID						AS customerID,
				TA.AgreementID						AS AgreementID,
				MAX(VR.ResultDate)					AS ResultDate,
				SUM(TA.Amount)						AS agreementAmountPaid,
				--MAX(CASE WHEN TA.TransactionTypeID = 99 then 1
				--	ELSE TA.TransactionTypeID END) AS TransactionType,
				CASE
					WHEN MAX(CASE WHEN TA.TransactionTypeID = 99 then 1
					ELSE TA.TransactionTypeID END) = 51 AND SUM(TA.Amount) = 0 THEN 'N'
					WHEN MAX(CASE WHEN TA.TransactionTypeID = 99 then 1
					ELSE TA.TransactionTypeID END) = 51 AND SUM(TA.Amount) = AGR.Balance  THEN 'S'
					WHEN MAX(CASE WHEN TA.TransactionTypeID = 99 then 1
					ELSE TA.TransactionTypeID END) = 50 AND SUM(TA.Amount) = AGR.Balance THEN 'S'
					WHEN MAX(CASE WHEN TA.TransactionTypeID = 99 then 1
					ELSE TA.TransactionTypeID END) <> 51 AND SUM(TA.Amount) = 0 THEN 'Z'
					WHEN MAX(CASE WHEN TA.TransactionTypeID = 99 then 1
					ELSE TA.TransactionTypeID END) = 1 AND SUM(TA.Amount) > 0 THEN 'T'
					ELSE 'T' 
					END AS AgreementMode			
		FROM [dbo].[tblVisit] V
		INNER JOIN [dbo].[tblVisitResult] VR				ON VR.VisitID		= V.VisitID
		INNER JOIN [dbo].[tblTransaction] T					ON T.VisitResultID	= VR.ResultID
		INNER JOIN [dbo].[tblTransactionAllocation] TA		ON TA.TransactionID = T.TransactionID
		INNER JOIN [dbo].[vwAgreement] AGR					ON AGR.AgreementID	= TA.AgreementID
		WHERE  T.PaymentTypeID NOT IN (4)   -- Rebate-4 (Excluded Rebate) 
		GROUP BY	VR.CreatedBy, 
					V.StatusID,
					VR.VisitID,
					--VR.StatusID, -- Fix for bug 1508
					T.CustomerID,
					TA.AgreementID,
					AGR.Balance
		) LatestAgrRecord ON LatestAgrRecord.AgreementID = AGR1.AgreementID
WHERE AGR1.ROWNUM = 1

GO

