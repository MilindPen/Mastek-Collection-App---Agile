USE [sdtStaging]
GO

/****** Object:  View [mobile].[vwDelegatedDashboardAmount]    Script Date: 5/10/2016 5:16:08 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[mobile].[vwDelegatedDashboardAmount]') AND type in (N'V'))
DROP VIEW [mobile].[vwDelegatedDashboardAmount]
GO

/****** Object:  View [mobile].[vwDelegatedDashboardAmount]    Script Date: 5/10/2016 5:16:09 PM ******/
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
	  , bt.[Description] BalanceTypeDesc
      ,[Amount]
      ,[Reference]
      ,[CreatedDate]
      ,[CreatedBy]
      ,[UpdatedDate]
      ,[UpdatedBy]
  FROM 
	[mobile].[tblDelegatedDashboardAmount] dda
	INNER JOIN mobile.tblBalanceType bt ON bt.TypeID = dda.BalanceTypeID



GO


