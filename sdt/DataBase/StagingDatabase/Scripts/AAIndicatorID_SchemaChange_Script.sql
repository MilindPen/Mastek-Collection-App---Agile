 /****************************************************************************
*
* Project Name     : SDT
*
* Reference        : SPRINT-3 : Chnages in User Stories
*
* Description      : To AAIndicatorID to tblAgreement table and change views as per requirement
* 
*
* Objects Affected :  tblAgreement
*                     dbo.vwAgreement  
*                     mobile.vwAgreementList 
*
*
****************************************************************************/

IF NOT EXISTS(SELECT *
          FROM   INFORMATION_SCHEMA.COLUMNS
          WHERE  TABLE_NAME = 'tblAgreement' AND TABLE_SCHEMA = 'dbo'
                 AND COLUMN_NAME = 'AAIndicatorID') 
BEGIN

		ALTER TABLE [dbo].[tblAgreement]
		ADD AAIndicatorID INT 
END
GO


IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[vwAgreement]') AND type in (N'V'))
DROP VIEW [dbo].[vwAgreement]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[vwAgreement]
AS

	SELECT
		AgreementID,
		AgreementNumber,
		CustomerID,
		ReloanedFromAgreementID,
		ReloanedToAgreementID,
		Principal,
		Charges,
		Terms,
		Instalments,
		SettledDate,
		SettlementRebate,
		RebatePaidOut,
		AgreementStartDate,
		DefaultedDate,
		DefaultedFlag,
		DefaultedBalance,
		DefaultLetterPrintedDate,
		Balance,
		a.StatusId,
		s.StatusDesc,
		StatArrearsLetterSent,
		BadDebtStatusId,
		Arrears,
		p.ProductID,
		p.ProductCode,
		p.ProductName,
		PaymentFrequencyID,
		pf.[Description] AS PaymentFrequency,
		a.AAIndicatorID,
		a.CreatedBy,
		a.CreatedDate,
		a.UpdatedBy,
		a.UpdatedDate
	FROM 
		dbo.tblAgreement a
		INNER JOIN dbo.tblPaymentFrequency pf ON pf.FrequencyID = a.PaymentFrequencyID
		INNER JOIN dbo.tblProduct p ON p.ProductID = a.ProductID
		INNER JOIN dbo.tblAgreementStatus s ON a.statusId = s.statusId
GO

IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'mobile.vwAgreementList') AND type in (N'V'))
DROP VIEW mobile.vwAgreementList
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

GO
CREATE VIEW mobile.vwAgreementList
AS
	SELECT 
		ac.AgreementID, 
		ac.AgreementNumber, 
		ac.CustomerID, 
		ac.ReloanedFromAgreementID, 
		ac.ReloanedToAgreementID, 
		ac.Principal, 
		ac.Charges, 
		ac.Terms, 
		ac.Instalments, 
		ac.SettledDate, 
		ac.SettlementRebate, 
		ac.RebatePaidOut, 
		ac.AgreementStartDate, 
		ac.DefaultedDate, 
		ac.DefaultedFlag, 
		ac.DefaultedBalance, 
		ac.DefaultLetterPrintedDate, 
		ac.Balance, 
		ac.StatusId, 
		ac.StatusDesc, 
		ac.StatArrearsLetterSent, 
		ac.BadDebtStatusId, 
		ac.Arrears, 
		ac.ProductID, 
		ac.ProductCode, 
		ac.ProductName, 
		ac.PaymentFrequencyID, 
		ac.PaymentFrequency, 
		ac.AAIndicatorID,
		ac.CreatedBy, 
		ac.CreatedDate, 
		ac.UpdatedBy, 
		ac.UpdatedDate, 
		ap.AgreementNumber as ReloanedFromAgreementNumber
	FROM dbo.vwAgreement ac
	LEFT OUTER JOIN dbo.vwAgreement ap
	ON ap.AgreementID = ac.ReloanedFromAgreementID
	WHERE (ac.StatusID = 1 
		OR ac.SettledDate >= (SELECT StartDate FROM dbo.vwWeekEnding WHERE CONVERT(DATE,GetDate() - (14*7)) between StartDate and EndDate))
GO
