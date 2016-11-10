USE [sdtStaging]
GO

/****** Object:  View [mobile].[vwDashboardAmount]   Script Date: 5/24/2016 11:19:23 AM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[mobile].[vwDashboardAmount]') AND type in (N'V'))
DROP VIEW [mobile].[vwDashboardAmount]
GO

/****** Object:  View [mobile].[vwDashboardAmount]   Script Date: 5/24/2016 11:19:23 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE VIEW [mobile].[vwDashboardAmount]
AS
SELECT 
	   dba.[ID]
      ,dba.[JourneyID]
      ,dba.[BalanceDate]
      ,dba.[PeriodIndicator]
      ,dba.[BalanceTypeID]
	  , bt.[Description] BalanceTypeDesc
      ,dba.[Amount]
      ,dba.[Reference]
	  ,dba.[Cheque_ind]										-- New Column Added
      ,dba.[CreatedDate]
      ,dba.[CreatedBy]
      ,dba.[UpdatedDate]
      ,dba.[UpdatedBy]
  FROM 
	[mobile].[tblDashboardAmount] dba
	INNER JOIN mobile.tblBalanceType bt ON bt.TypeID = dba.BalanceTypeID

GO

/*
Following Views are Modified.
--	sp_helptext '[mobile].[vwCustomerVisitList]'
--	sp_helptext '[mobile].[vwUser]'
--	sp_helptext '[mobile].[vwLoginUser]'
--	sp_helptext '[dbo].[vwUser]'
--	sp_helptext '[dbo].[vwCustomer]'
--	sp_helptext '[dbo].[vwCustomerVisit]'
*/

/****** Object:  View [dbo].[vwCustomer]   Script Date: 5/25/2016 15:40:23 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[vwCustomer]') AND type in (N'V'))
DROP VIEW [dbo].[vwCustomer]
GO

/****** Object:  View [dbo].[vwCustomer]   Script Date: 5/25/2016 15:40:23 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[vwCustomer]
AS
SELECT
	c.CustomerID,
	CustomerNumber,
	Title,
	FirstName,
    MiddleName,
    LastName,
    DOB,
    AddressLine1,
    AddressLine2,
    AddressLine3,
    AddressLine4,
    City,
	County,
	AddressTypeID,
	AddressType,
    PostCode,
    PhoneNumber,
    MobileNumber,
    Email,
	c.PaymentPerformance,
	c.CreatedDate,
	c.CreatedBy,
	c.UpdatedDate,
	c.UpdatedBy,
	AtRisk,															-- New Column
	Vulnerable														-- New Column
FROM 
	[dbo].[tblCustomer] c
	LEFT JOIN (
		SELECT * FROM [dbo].[vwCustomerAddress] WHERE AddressTypeID = 1  /* 1 = Primary Address */
	) ca ON c.CustomerID = ca.CustomerID

GO


/****** Object:  View [dbo].[vwCustomerVisit]   Script Date: 5/25/2016 15:40:23 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[vwCustomerVisit]') AND type in (N'V'))
DROP VIEW [dbo].[vwCustomerVisit]
GO

/****** Object:  View [dbo].[vwCustomerVisit]   Script Date: 5/25/2016 15:40:23 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE VIEW [dbo].[vwCustomerVisit]
AS
SELECT
	VisitID,
	v.CustomerID,
	UserId,
	VisitDate,
	v.StatusID,
	vs.[Description] AS StatusDescription,
	c.CustomerNumber,
	c.AddressLine1,
	c.AddressLine2,
	c.AddressLine3,
	c.AddressLine4,	
	c.City,
	c.County,
	c.FirstName,
	c.MiddleName,
	c.LastName,
	v.CreatedDate,
	v.CreatedBy,
	v.UpdatedDate,
	v.UpdatedBy,
	c.AtRisk,														-- NEW Column
	c.Vulnerable													-- NEW Column
FROM [dbo].[tblVisit] v
	INNER JOIN [dbo].[tblVisitStatus] vs ON vs.StatusID = v.StatusID
	INNER JOIN [dbo].[vwCustomer] c ON c.CustomerID = v.CustomerID
 
GO


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
	c.DOB,
	c.AtRisk,												-- NEW COLUMN
	c.Vulnerable											-- NEW COLUMN
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

/****** Object:  View [dbo].[vwUser]   Script Date: 5/26/2016 15:40:23 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[vwUser]') AND type in (N'V'))
DROP VIEW [dbo].[vwUser]
GO

/****** Object:  View [dbo].[vwUser]   Script Date: 5/26/2016 15:40:23 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE VIEW [dbo].[vwUser]
AS

SELECT 
	  UserID, 
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
      CreatedDate,
      CreatedBy,
      UpdatedDate,
      UpdatedUserID,
	  RegistrationID
  FROM [dbo].[tblUser]
  
GO


/****** Object:  View [mobile].[vwUser]   Script Date: 5/25/2016 15:40:23 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[mobile].[vwUser]') AND type in (N'V'))
DROP VIEW [mobile].[vwUser]
GO

/****** Object:  View [mobile].[vwUser]   Script Date: 5/25/2016 15:40:23 ******/
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
	mu.LastLoggedIn,
	u.RegistrationID											-- NEW Column
FROM 
	dbo.vwUser u
	INNER JOIN mobile.tbluser mu ON mu.UserID = u.UserID

GO


/****** Object:  View [mobile].[vwDashboardAmount]   Script Date: 5/25/2016 15:40:23 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[mobile].[vwLoginUser]') AND type in (N'V'))
DROP VIEW [mobile].[vwLoginUser]
GO

/****** Object:  View [mobile].[vwDashboardAmount]   Script Date: 5/25/2016 15:40:23 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE VIEW [mobile].[vwLoginUser]
AS

SELECT 
	u.UserID			AS [SDTUser], 
	mu.UserID			AS [MobileUser],
	u.Title				AS [Title],
	u.FirstName			AS [FirstName],
	u.LastName			AS [LastName],
	u.MiddleName		AS [MiddleName],
	mu.PIN				AS [PIN],
	mu.MacAddress		AS [MacAddress],
	u.isActive			AS [IsActive],
	u.RegistrationID	AS [RegistrationID]						-- New Column
FROM 
	dbo.vwUser u
	LEFT OUTER JOIN [mobile].[tblUser]  mu ON mu.UserID = u.UserID 

GO

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
SELECT ROW_NUMBER() OVER( PARTITION BY AgreementID ORDER BY CreatedDate DESC) AS ROWNUM,
				AgreementID, TransactionTypeID
				FROM [dbo].[tblTransactionAllocation] WHERE AllocationID >= 1000000    -- Only Mobile Transaction Allocations
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


