IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'dbo.vwAgreement') AND type in (N'V'))
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
		INNER JOIN dbo.tblPaymentFrequency pf ON pf.FrequencyID = ISNULL(a.PaymentFrequencyID,1)
		INNER JOIN dbo.tblProduct p ON p.ProductID = a.ProductID
		INNER JOIN dbo.tblAgreementStatus s ON a.statusId = s.statusId

GO





