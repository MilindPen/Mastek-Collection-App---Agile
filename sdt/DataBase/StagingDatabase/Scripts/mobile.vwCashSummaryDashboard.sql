
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

	/*
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
	--(
	--	SELECT Distinct VR.ResultID AS ResultID,VR.CreatedBy,JC.JourneyID FROM [dbo].[vwJourneyCustomer] JC
	--	INNER JOIN [dbo].[vwVisit] V			ON V.CustomerID  = JC.CustomerID
	--	INNER JOIN [dbo].[vwVisitResult] VR		ON VR.VisitID = V.VisitID
	--	INNER JOIN [dbo].[vwJourneyAgent] JA	ON JA.JourneyID = JC.JourneyID
	--									AND JA.StartDate <= VR.resultDate AND (JA.EndDate >= VR.resultDate OR JA.EndDate IS NULL)
	--									AND VR.CreatedBy = JA.UserId	-- DS DefectId: 2394
	--) VR
	INNER JOIN [dbo].[vwTransaction] T		ON T.CustomerID = JC.CustomerID 
	INNER JOIN [dbo].[tblPaymentType] PT	ON T.PaymentTypeID = PT.TypeID
	INNER JOIN [dbo].[vwWeekEnding] WE ON CONVERT(VARCHAR,T.PaidDate,110) BETWEEN WE.StartDate AND WE.EndDate
	WHERE T.PaymentTypeID IN (1,5)				-- Cash-1 + Settelment Cash-5 + Rebate-4 (Excluded Rebate) 
	AND ResponseStatusID IS NULL				-- Exclude Card Payment.
	--AND T.CreatedBy = VR.CreatedBy			-- DS DefectId: 2394
	*/
GO
