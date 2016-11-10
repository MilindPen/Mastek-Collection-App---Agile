
/****************************************************************************
*
* Project Name		: SDT-Delegation
*
* Reference			: Sprint-2 : Journey Delegation
*
* Description		: Journey & Customer Delegation
* 
* Auth				: Abhay J. Meher
*
* Objects Affected	:	
* DATE				: 01-09-2016
*
****************************************************************************/
 



IF  EXISTS (SELECT * FROM sys.objects WHERE OBJECT_ID = OBJECT_ID(N'[mobile].[vwCustomerVisitList]') AND type in (N'V'))
DROP VIEW [mobile].[vwCustomerVisitList]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE VIEW [mobile].[vwCustomerVisitList]
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
	c.DOB,
	c.AtRisk,												
	c.Vulnerable,
	JA.UserId	AS PrimaryAgent,
	U.FirstName	AS PrimaryAgentFirstName,
	U.LastName	AS PrimaryAgentLastName,
	J.[Description]	AS JourneyDescription					
FROM mobile.vwVisitsummary vs
INNER JOIN dbo.vwCustomer c				ON vs.CustomerID = c.CustomerID
INNER JOIN dbo.vwJourneyCustomer jc		ON jc.CustomerID = vs.CustomerID
INNER JOIN dbo.tblVisitStatus sts		ON sts.StatusID = vs.StatusID
INNER JOIN (SELECT a.CustomerID, SUM(CASE WHEN  (a.Balance - a.SettlementRebate) < 0 THEN (a.Balance - a.SettlementRebate)
									ELSE a.terms END) as TotalTermAmount 
			FROM dbo.tblAgreement  a WHERE a.StatusID = 1 GROUP BY a.CustomerID) agr
										ON agr.CustomerID = vs.CustomerID
INNER JOIN dbo.vwJourneyAgent	JA	ON JA.JourneyId = JC.JourneyID
INNER JOIN dbo.vwUser			U	ON	U.UserID	= JA.UserId
INNER JOIN dbo.vwJourney		J	ON J.JourneyID	= JA.JourneyId
WHERE jc.StartDate <= vs.VisitDate
AND (jc.EndDate >= vs.VisitDate or jc.EndDate is null)
AND JA.StartDate <= vs.VisitDate
AND (JA.EndDate >= vs.VisitDate or JA.EndDate is null)

GO



IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[mobile].[vwLatestAgreementTransaction]') AND type in (N'V'))
DROP VIEW [mobile].[vwLatestAgreementTransaction]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE VIEW [mobile].[vwLatestAgreementTransaction]
AS
	SELECT 
		LatestAgrRecord.UserID,
		LatestAgrRecord.VisitID,
		LatestAgrRecord.JourneyID,
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
(
SELECT	
		VR.CreatedBy						AS UserID,
		VR.VisitID							AS VisitID,
		JC.JourneyID						AS JourneyID,
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
			ELSE TA.TransactionTypeID END) = 51 AND SUM(TA.Amount) = (AGR.Balance - ISNUll(AGR.SettlementRebate,0))  THEN 'S'
			WHEN MAX(CASE WHEN TA.TransactionTypeID = 99 then 1
			ELSE TA.TransactionTypeID END) = 50 AND SUM(TA.Amount) = (AGR.Balance - ISNUll(AGR.SettlementRebate,0)) THEN 'S'
			WHEN MAX(CASE WHEN TA.TransactionTypeID = 99 then 1
			ELSE TA.TransactionTypeID END) <> 51 AND SUM(TA.Amount) = 0 THEN 'Z'
			WHEN MAX(CASE WHEN TA.TransactionTypeID = 99 then 1
			ELSE TA.TransactionTypeID END) = 1 AND SUM(TA.Amount) > 0 THEN 'T'
			WHEN MAX(CASE WHEN TA.TransactionTypeID = 99 then 1
			ELSE TA.TransactionTypeID END) IN (52,98) THEN 'R'
			ELSE 'T' 
			END AS AgreementMode			
FROM [dbo].[tblVisit] V
INNER JOIN [dbo].[tblVisitResult] VR				ON VR.VisitID		= V.VisitID
INNER JOIN [dbo].[tblTransaction] T					ON T.VisitResultID	= VR.ResultID
INNER JOIN [dbo].[tblTransactionAllocation] TA		ON TA.TransactionID = T.TransactionID
INNER JOIN [dbo].[vwAgreement] AGR					ON AGR.AgreementID	= TA.AgreementID
INNER JOIN [dbo].[vwJourneyCustomer]	JC			ON JC.CustomerID	= T.CustomerID
WHERE  T.PaymentTypeID NOT IN (4)   -- Rebate-4 (Excluded Rebate) 
	AND 	JC.StartDate <= V.VisitDate
	AND		(JC.EndDate >= V.VisitDate or JC.EndDate is null)

GROUP BY	VR.CreatedBy, 
			V.StatusID,
			VR.VisitID,
			JC.JourneyID,
			--VR.StatusID, -- Fix for bug 1508
			T.CustomerID,
			TA.AgreementID,
			AGR.Balance,
			AGR.SettlementRebate

) LatestAgrRecord ON LatestAgrRecord.AgreementID = AGR1.AgreementID
WHERE AGR1.ROWNUM = 1

GO
