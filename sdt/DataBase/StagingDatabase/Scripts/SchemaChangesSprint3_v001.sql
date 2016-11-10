
 /****************************************************************************
*
* Project Name		: SDT
*
* Reference			: SPRINT-3 : Branch Balancing
*
* Description		: Changes regarding Registration and Customer attributes related
* 
* Auth				: Abhay J. Meher
*
* Objects Affected	:	
* DATE				: 02-08-2016
*
****************************************************************************/

IF NOT EXISTS(SELECT *
          FROM   INFORMATION_SCHEMA.COLUMNS
          WHERE  TABLE_NAME = 'tblDashboardAmount' AND TABLE_SCHEMA = 'mobile'
                 AND COLUMN_NAME = 'IsDeleted' ) 
BEGIN

		ALTER TABLE [mobile].[tblDashboardAmount] 
		ADD IsDeleted TINYINT DEFAULT 0


		PRINT 'Column ''IsDeleted'' Added in [mobile].[tblDashboardAmount] Table'
END
GO

IF NOT EXISTS(SELECT *
          FROM   INFORMATION_SCHEMA.COLUMNS
          WHERE  TABLE_NAME = 'tblDelegatedDashboardAmount' AND TABLE_SCHEMA = 'mobile'
                 AND COLUMN_NAME = 'IsDeleted' ) 
BEGIN

		ALTER TABLE [mobile].[tblDelegatedDashboardAmount] 
		ADD IsDeleted TINYINT DEFAULT 0

		PRINT 'Column ''IsDeleted'' Added in [mobile].[tblDelegatedDashboardAmount] Table'
END
GO

IF  EXISTS (SELECT * FROM sys.objects WHERE OBJECT_ID = OBJECT_ID(N'[mobile].[vwDashboardAmount]') AND type in (N'V'))
DROP VIEW [mobile].[vwDashboardAmount]
GO

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
	  ,dba.[Reason]											-- NEW Column 
  FROM 
	[mobile].[tblDashboardAmount] dba
	INNER JOIN mobile.tblBalanceType bt ON bt.TypeID = dba.BalanceTypeID
  WHERE dba.IsDeleted = 0 OR dba.IsDeleted IS NULL
  
GO


IF  EXISTS (SELECT * FROM sys.objects WHERE OBJECT_ID = OBJECT_ID(N'[mobile].[vwDelegatedDashboardAmount]') AND type in (N'V'))
DROP VIEW [mobile].[vwDelegatedDashboardAmount]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE VIEW [mobile].[vwDelegatedDashboardAmount]
AS
SELECT 
	   [ID]
      ,[JourneyID]
      ,[JnyAgentDelID]
      ,[BalanceDate]
      ,[PeriodIndicator]
      ,[BalanceTypeID]
	  ,bt.[Description] BalanceTypeDesc
      ,[Amount]
      ,[Reference]
      ,[CreatedDate]
      ,[CreatedBy]
      ,[UpdatedDate]
      ,[UpdatedBy]
	  ,dda.[Reason]											-- NEW Column 
	  ,dda.[Cheque_ind]										-- Added Missing Column
	  ,DelegatedToUserID									-- NEW Column
  FROM 
	[mobile].[tblDelegatedDashboardAmount] dda
	INNER JOIN mobile.tblBalanceType bt ON bt.TypeID = dda.BalanceTypeID
	WHERE dda.IsDeleted = 0 OR dda.IsDeleted IS NULL

go



IF  EXISTS (SELECT * FROM sys.objects WHERE OBJECT_ID = OBJECT_ID(N'[mobile].[vwTransactionHistory]') AND type in (N'V'))
DROP VIEW [mobile].[vwTransactionHistory]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE VIEW [mobile].[vwTransactionHistory]
AS
SELECT 
	ta.TransactionID AS AllocationID, 
	ta.AllocationID AS TransactionID, 
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
WHERE vs.VisitDate >= jc.StartDate
AND (vs.VisitDate <= jc.EndDate OR jc.EndDate IS NULL)
AND ta.TransactionTypeID not in (2,3)

GO


