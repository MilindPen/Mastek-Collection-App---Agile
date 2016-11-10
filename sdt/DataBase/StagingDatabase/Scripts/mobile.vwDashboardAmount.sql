USE [sdtStaging]
GO

/****** Object:  View [mobile].[vwDashboardAmount]    Script Date: 5/10/2016 5:14:46 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[mobile].[vwDashboardAmount]') AND type in (N'V'))
DROP VIEW [mobile].[vwDashboardAmount]
GO

/****** Object:  View [mobile].[vwDashboardAmount]    Script Date: 5/10/2016 5:14:47 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [mobile].[vwDashboardAmount]
AS
SELECT 
	   [ID]
      ,[JourneyID]
      ,[BalanceDate]
      ,[PeriodIndicator]
      ,[BalanceTypeID]
	  , bt.[Description] BalanceTypeDesc
      ,[Amount]
      ,[Reference]
      ,[CreatedDate]
      ,[CreatedBy]
      ,[UpdatedDate]
      ,[UpdatedBy]
  FROM 
	[mobile].[tblDashboardAmount] dba
	INNER JOIN mobile.tblBalanceType bt ON bt.TypeID = dba.BalanceTypeID


GO


