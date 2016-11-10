
 /****************************************************************************
*
* Project Name		: SDT
*
* Reference			: Hardening-9 : Collection App
*
* Description		: Refund Transaction
* 
* Auth				: Abhay J. Meher
*
* Objects Affected	:	
* DATE				: 09-08-2016
*
****************************************************************************/



IF NOT EXISTS (Select 1 from [dbo].[tblTransactionType] WHERE TypeDescription = 'Refund')
BEGIN

INSERT INTO [dbo].[tblTransactionType]
	(
		TypeID, 
		TypeDescription, 
		TypeGroupID 
	)
	SELECT 52,
	'Refund',
	1
END

IF NOT EXISTS (Select 1 from [dbo].[tblTransactionType] WHERE TypeDescription = 'Refund Adjustment')
BEGIN

INSERT INTO [dbo].[tblTransactionType]
	(
		TypeID, 
		TypeDescription, 
		TypeGroupID 
	)
	SELECT 98,
	'Refund Adjustment',
	1
END
GO

IF NOT EXISTS (Select 1 from [dbo].[tblTransactionType] WHERE TypeDescription = 'Cost Reversal')
BEGIN

INSERT INTO [dbo].[tblTransactionType]
	(
		TypeID, 
		TypeDescription, 
		TypeGroupID 
	)
	SELECT 55,
	'Cost Reversal',
	1
END
GO

IF NOT EXISTS (Select 1 from [dbo].[tblTransactionType] WHERE TypeDescription = 'Cash Reversal')
BEGIN

INSERT INTO [dbo].[tblTransactionType]
	(
		TypeID, 
		TypeDescription, 
		TypeGroupID 
	)
	SELECT 53,
	'Cash Reversal',
	1
END
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
			WHEN MAX(CASE WHEN TA.TransactionTypeID = 99 then 1
			ELSE TA.TransactionTypeID END) IN (52,98) THEN 'R'
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


IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'mobile.vwCustomerVisitList') AND type in (N'V'))
DROP VIEW mobile.vwCustomerVisitList
GO

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
	c.DOB,
	c.AtRisk,												-- NEW COLUMN
	c.Vulnerable											-- NEW COLUMN
FROM mobile.vwVisitsummary vs
INNER JOIN dbo.vwCustomer c				ON vs.CustomerID = c.CustomerID
INNER JOIN dbo.vwJourneyCustomer jc		ON jc.CustomerID = vs.CustomerID
INNER JOIN dbo.tblVisitStatus sts		ON sts.StatusID = vs.StatusID
INNER JOIN (SELECT a.CustomerID, SUM(CASE WHEN  (a.Balance - a.SettlementRebate) < 0 THEN (a.Balance - a.SettlementRebate)
									ELSE a.terms END) as TotalTermAmount 
			FROM dbo.tblAgreement  a WHERE a.StatusID = 1 GROUP BY a.CustomerID) agr
										ON agr.CustomerID = vs.CustomerID
WHERE jc.StartDate <= vs.VisitDate
AND (jc.EndDate >= vs.VisitDate or jc.EndDate is null)

GO



IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'mobile.vwCashSummaryDashboard') AND type in (N'V'))
DROP VIEW mobile.vwCashSummaryDashboard
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW mobile.vwCashSummaryDashboard
AS

	Select
		 DA.ID						AS [BalanceID]
		,DA.JourneyID				AS [JourneyID]
		,DA.BalanceDate				AS [BalanceDate]
		,DA.BalanceTypeID			AS [BalanceTypeID]
		,DA.BalanceTypeDesc			AS [BalanceTypeDesc]
		,DA.Amount					AS [Amount]
		,DA.CreatedBy				AS [UserID]
		,DA.CreatedDate				AS [CreatedDate]
		,DA.[Reference]				AS [Reference]
		,WE.YearNo					AS [YearNo]
		,WE.WeekNo					AS [WeekNo]
		,DA.PeriodIndicator			AS [PeriodIndicator]
		,DA.Cheque_ind				AS [Cheque_ind]
		,DA.Reason					AS [Reason]
	FROM [mobile].[vwDashboardAmount] DA
	INNER JOIN [dbo].[vwWeekEnding] WE ON CONVERT(VARCHAR,DA.CreatedDate,110) BETWEEN WE.StartDate AND WE.EndDate

	UNION ALL 
	
	SELECT 
		 DDA.ID						AS [BalanceID]
		,DDA.JourneyID				AS [JourneyID]
		,DDA.BalanceDate			AS [BalanceDate]
		,DDA.BalanceTypeID			AS [BalanceTypeID]
		,DDA.BalanceTypeDesc		AS [BalanceTypeDesc]
		,DDA.Amount					AS [Amount]
		,DDA.DelegatedToUserID		AS [UserID]
		,DDA.CreatedDate			AS [CreatedDate]
		,DDA.[Reference]			AS [Reference]
		,WE.YearNo					AS [YearNo]
		,WE.WeekNo					AS [WeekNo]
		,DDA.PeriodIndicator		AS [PeriodIndicator]
		,DDA.Cheque_ind				AS [Cheque_ind]
		,DDA.Reason					AS [Reason]
	 FROM [mobile].[vwDelegatedDashboardAmount] DDA
	INNER JOIN [dbo].[vwWeekEnding] WE ON CONVERT(VARCHAR,DDA.CreatedDate,110) BETWEEN WE.StartDate AND WE.EndDate

	
	UNION ALL

	SELECT
		 T.TransactionID				AS [BalanceID]
		,JC.JourneyID				AS [JourneyID]
		,T.PaidDate					AS [BalanceDate]
		,CONVERT(VARCHAR(2),T.PaymentTypeID)	AS [BalanceTypeID]
		,PT.PaymentTypeDescription	AS [BalanmceTypeDesc]
		,T.AmountPaid				AS [Amount]
		,T.CreatedBy				AS [UserID]
		,T.PaidDate					AS [CreatedDate]
		,NULL						AS [Reference]
		,WE.YearNo					AS [YearNo]
		,WE.WeekNo					AS [WeekNo]
		,NULL						AS [PeriodIndicator]
		,NULL						AS [Cheque_ind]
		,NULL						AS [Reason]
	FROM [dbo].[vwJourneyCustomer] JC
	INNER JOIN [dbo].[vwTransaction] T		ON T.CustomerID = JC.CustomerID 
	INNER JOIN [dbo].[tblPaymentType] PT	ON T.PaymentTypeID = PT.TypeID
	INNER JOIN [dbo].[vwWeekEnding] WE ON CAST(T.PaidDate AS DATE) BETWEEN WE.StartDate AND WE.EndDate
	WHERE T.PaymentTypeID IN (1,5)				-- Cash-1 + Settelment Cash-5 + Rebate-4 (Excluded Rebate) 
	AND ResponseStatusID IS NULL				-- Exclude Card Payment.
	--AND T.CreatedBy = VR.CreatedBy			-- DS DefectId: 2394
	
GO





IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'mobile.vwUserSelection') AND type in (N'V'))
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
	CAST(JA.StartDate AS DATE)	AS [JourneyAgentStartDate],
	CAST(JA.EndDate AS DATE)	AS [JourneyAgentEndDate],
	CAST(U.StartDate AS DATE)	AS [UserStartDate],
	CAST(U.EndDate AS DATE)		AS [UserEndDate]
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
	   CAST(JA.StartDate AS DATE)   AS [JourneyAgentStartDate],
	   CAST(JA.EndDate AS DATE)		AS [JourneyAgentEndDate],
	   CAST(JS.StartDate AS DATE)   AS [JourneySectionStartDate],
	   CAST(JS.EndDate AS DATE)		AS [JourneySectionEndDate]
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
