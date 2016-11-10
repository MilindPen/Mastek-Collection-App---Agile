USE [sdtStaging]
GO

IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[mobile].[vwAgreementList]') AND type in (N'V'))
DROP VIEW [mobile].[vwAgreementList]
GO


/****** Object:  View [mobile].[vwAgreementList]    Script Date: 5/10/2016 5:07:50 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [mobile].[vwAgreementList]
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


