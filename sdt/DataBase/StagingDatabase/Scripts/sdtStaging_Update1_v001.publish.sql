﻿/*
Deployment script for sdtStaging

This code was generated by a tool.
Changes to this file may cause incorrect behavior and will be lost if
the code is regenerated.
*/

GO
SET ANSI_NULLS, ANSI_PADDING, ANSI_WARNINGS, ARITHABORT, CONCAT_NULL_YIELDS_NULL, QUOTED_IDENTIFIER ON;

SET NUMERIC_ROUNDABORT OFF;


GO
:setvar DatabaseName "sdtStaging"
:setvar DefaultFilePrefix "sdtStaging"
:setvar DefaultDataPath "D:\SQL\"
:setvar DefaultLogPath "D:\SQL\"

GO
:on error exit
GO
/*
Detect SQLCMD mode and disable script execution if SQLCMD mode is not supported.
To re-enable the script after enabling SQLCMD mode, execute the following:
SET NOEXEC OFF; 
*/
:setvar __IsSqlCmdEnabled "True"
GO
IF N'$(__IsSqlCmdEnabled)' NOT LIKE N'True'
    BEGIN
        PRINT N'SQLCMD mode must be enabled to successfully execute this script.';
        SET NOEXEC ON;
    END


GO
USE [$(DatabaseName)];


GO
PRINT N'Dropping [dbo].[DF_Payment_CreatedDate]...';


GO
ALTER TABLE [dbo].[tblVisitResult] DROP CONSTRAINT [DF_Payment_CreatedDate];


GO
PRINT N'Dropping [mobile].[DF_tblDashBoardAmount_CreatedDate]...';


GO
ALTER TABLE [mobile].[tblDashboardAmount] DROP CONSTRAINT [DF_tblDashBoardAmount_CreatedDate];


GO
PRINT N'Dropping [mobile].[DF_tblDashboardAmount_Cheque_ind]...';


GO
ALTER TABLE [mobile].[tblDashboardAmount] DROP CONSTRAINT [DF_tblDashboardAmount_Cheque_ind];


GO
PRINT N'Dropping [mobile].[DF_tblDelegatedDashBoardAmount_CreatedDate]...';


GO
ALTER TABLE [mobile].[tblDelegatedDashboardAmount] DROP CONSTRAINT [DF_tblDelegatedDashBoardAmount_CreatedDate];


--GO
--PRINT N'Dropping [mobile].[DF_tblDelegatedDashboardAmount_Cheque_ind]...';


--GO
--ALTER TABLE [mobile].[tblDelegatedDashboardAmount] DROP CONSTRAINT [DF_tblDelegatedDashboardAmount_Cheque_ind];


GO
PRINT N'Dropping [dbo].[FK_tblTransaction_tblVisitResult]...';


GO
ALTER TABLE [dbo].[tblTransaction] DROP CONSTRAINT [FK_tblTransaction_tblVisitResult];


GO
PRINT N'Dropping [dbo].[FK_CallResult_CustomerVisit]...';


GO
ALTER TABLE [dbo].[tblVisitResult] DROP CONSTRAINT [FK_CallResult_CustomerVisit];


GO
PRINT N'Dropping [dbo].[FK_tblVisitResult_tblVisitResultStatus]...';


GO
ALTER TABLE [dbo].[tblVisitResult] DROP CONSTRAINT [FK_tblVisitResult_tblVisitResultStatus];


GO
PRINT N'Dropping [mobile].[FK_tblDashboardAmount_tblBalanceType]...';


GO
ALTER TABLE [mobile].[tblDashboardAmount] DROP CONSTRAINT [FK_tblDashboardAmount_tblBalanceType];


GO
PRINT N'Dropping [mobile].[FK_tblDelegatedDashboardAmount_tblBalanceType]...';


GO
ALTER TABLE [mobile].[tblDelegatedDashboardAmount] DROP CONSTRAINT [FK_tblDelegatedDashboardAmount_tblBalanceType];


GO
PRINT N'Dropping [mobile].[FK_tblDelegatedDashBoardAmount_tblJourneyAgentDelegated]...';


GO
ALTER TABLE [mobile].[tblDelegatedDashboardAmount] DROP CONSTRAINT [FK_tblDelegatedDashBoardAmount_tblJourneyAgentDelegated];


GO
PRINT N'Dropping [dbo].[FK_Agreement_FromAgreement]...';


GO
ALTER TABLE [dbo].[tblAgreement] DROP CONSTRAINT [FK_Agreement_FromAgreement];


GO
PRINT N'Dropping [dbo].[FK_Agreement_ToAgreement]...';


GO
ALTER TABLE [dbo].[tblAgreement] DROP CONSTRAINT [FK_Agreement_ToAgreement];


GO
PRINT N'Dropping <unnamed>...';


--GO
--EXECUTE sp_droprolemember @rolename = N'db_datareader', @membername = N'SPRINGFIELD\tonycarter';


GO
PRINT N'Altering [dbo].[tblUser]...';


GO
ALTER TABLE [dbo].[tblUser]
    ADD [isTrainingMode] BIT NULL;


GO
PRINT N'Starting rebuilding table [dbo].[tblVisitResult]...';


GO
BEGIN TRANSACTION;

SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

SET XACT_ABORT ON;

CREATE TABLE [dbo].[tmp_ms_xx_tblVisitResult] (
    [ResultID]    INT               IDENTITY (1, 1) NOT NULL,
    [VisitID]     INT               NOT NULL,
    [StatusID]    INT               NOT NULL,
    [AmountPaid]  MONEY             NOT NULL,
    [ResultDate]  DATETIME          NOT NULL,
    [GeoLocation] [sys].[geography] NULL,
    [CreatedDate] DATETIME          CONSTRAINT [DF_Payment_CreatedDate] DEFAULT (getdate()) NOT NULL,
    [CreatedBy]   INT               NOT NULL,
    [UpdatedDate] DATETIME          NULL,
    [UpdatedBy]   INT               NULL,
    CONSTRAINT [tmp_ms_xx_constraint_PK_CallResults] PRIMARY KEY CLUSTERED ([ResultID] ASC)
);

IF EXISTS (SELECT TOP 1 1 
           FROM   [dbo].[tblVisitResult])
    BEGIN
        SET IDENTITY_INSERT [dbo].[tmp_ms_xx_tblVisitResult] ON;
        INSERT INTO [dbo].[tmp_ms_xx_tblVisitResult] ([ResultID], [VisitID], [StatusID], [AmountPaid], [ResultDate], [GeoLocation], [CreatedDate], [CreatedBy], [UpdatedDate], [UpdatedBy])
        SELECT   [ResultID],
                 [VisitID],
                 [StatusID],
                 [AmountPaid],
                 [ResultDate],
                 [GeoLocation],
                 [CreatedDate],
                 [CreatedBy],
                 [UpdatedDate],
                 [UpdatedBy]
        FROM     [dbo].[tblVisitResult]
        ORDER BY [ResultID] ASC;
        SET IDENTITY_INSERT [dbo].[tmp_ms_xx_tblVisitResult] OFF;
    END

DROP TABLE [dbo].[tblVisitResult];

EXECUTE sp_rename N'[dbo].[tmp_ms_xx_tblVisitResult]', N'tblVisitResult';

EXECUTE sp_rename N'[dbo].[tmp_ms_xx_constraint_PK_CallResults]', N'PK_CallResults', N'OBJECT';

COMMIT TRANSACTION;

SET TRANSACTION ISOLATION LEVEL READ COMMITTED;


GO
PRINT N'Starting rebuilding table [mobile].[tblDashboardAmount]...';


GO
BEGIN TRANSACTION;

SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

SET XACT_ABORT ON;

CREATE TABLE [mobile].[tmp_ms_xx_tblDashboardAmount] (
    [ID]              BIGINT        NOT NULL,
    [JourneyID]       INT           NOT NULL,
    [BalanceDate]     DATE          NOT NULL,
    [PeriodIndicator] CHAR (1)      NOT NULL,
    [Amount]          MONEY         NOT NULL,
    [Reference]       VARCHAR (250) NULL,
    [CreatedDate]     DATETIME      CONSTRAINT [DF_tblDashBoardAmount_CreatedDate] DEFAULT (getdate()) NOT NULL,
    [CreatedBy]       INT           NOT NULL,
    [UpdatedDate]     DATETIME      NULL,
    [UpdatedBy]       INT           NULL,
    [Cheque_ind]      BIT           CONSTRAINT [DF_tblDashboardAmount_Cheque_ind] DEFAULT ((0)) NOT NULL,
    [BalanceTypeID]   CHAR (1)      NULL,
    CONSTRAINT [tmp_ms_xx_constraint_PK_tblDashBoardAmount] PRIMARY KEY CLUSTERED ([ID] ASC)
);

IF EXISTS (SELECT TOP 1 1 
           FROM   [mobile].[tblDashboardAmount])
    BEGIN
        INSERT INTO [mobile].[tmp_ms_xx_tblDashboardAmount] ([ID], [JourneyID], [BalanceDate], [PeriodIndicator], [Amount], [Reference], [CreatedDate], [CreatedBy], [UpdatedDate], [UpdatedBy], [Cheque_ind], [BalanceTypeID])
        SELECT   [ID],
                 [JourneyID],
                 [BalanceDate],
                 [PeriodIndicator],
                 [Amount],
                 [Reference],
                 [CreatedDate],
                 [CreatedBy],
                 [UpdatedDate],
                 [UpdatedBy],
                 [Cheque_ind],
                 [BalanceTypeID]
        FROM     [mobile].[tblDashboardAmount]
        ORDER BY [ID] ASC;
    END

DROP TABLE [mobile].[tblDashboardAmount];

EXECUTE sp_rename N'[mobile].[tmp_ms_xx_tblDashboardAmount]', N'tblDashboardAmount';

EXECUTE sp_rename N'[mobile].[tmp_ms_xx_constraint_PK_tblDashBoardAmount]', N'PK_tblDashBoardAmount', N'OBJECT';

COMMIT TRANSACTION;

SET TRANSACTION ISOLATION LEVEL READ COMMITTED;


GO
PRINT N'Starting rebuilding table [mobile].[tblDelegatedDashboardAmount]...';


GO
BEGIN TRANSACTION;

SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

SET XACT_ABORT ON;

CREATE TABLE [mobile].[tmp_ms_xx_tblDelegatedDashboardAmount] (
    [ID]              BIGINT        NOT NULL,
    [JourneyID]       INT           NOT NULL,
    [JnyAgentDelID]   INT           NULL,
    [BalanceDate]     DATE          NOT NULL,
    [PeriodIndicator] CHAR (1)      NOT NULL,
    [Amount]          MONEY         NOT NULL,
    [Reference]       VARCHAR (250) NULL,
    [CreatedDate]     DATETIME      CONSTRAINT [DF_tblDelegatedDashBoardAmount_CreatedDate] DEFAULT (getdate()) NOT NULL,
    [CreatedBy]       INT           NOT NULL,
    [UpdatedDate]     DATETIME      NULL,
    [UpdatedBy]       INT           NULL,
    --[Cheque_ind]      BIT           CONSTRAINT [DF_tblDelegatedDashboardAmount_Cheque_ind] DEFAULT ((0)) NOT NULL,
    [BalanceTypeID]   CHAR (1)      NULL,
    CONSTRAINT [tmp_ms_xx_constraint_PK_tblDelegatedDashBoardAmount] PRIMARY KEY CLUSTERED ([ID] ASC)
);


IF EXISTS (SELECT TOP 1 1 
           FROM   [mobile].[tblDelegatedDashboardAmount])
    BEGIN
       --INSERT INTO [mobile].[tmp_ms_xx_tblDelegatedDashboardAmount] ([ID], [JourneyID], [JnyAgentDelID], [BalanceDate], [PeriodIndicator], [Amount], [Reference], [CreatedDate], [CreatedBy], [UpdatedDate], [UpdatedBy], [Cheque_ind], [BalanceTypeID])
	   INSERT INTO [mobile].[tmp_ms_xx_tblDelegatedDashboardAmount] ([ID], [JourneyID], [JnyAgentDelID], [BalanceDate], [PeriodIndicator], [Amount], [Reference], [CreatedDate], [CreatedBy], [UpdatedDate], [UpdatedBy], [BalanceTypeID])
        SELECT   [ID],
                 [JourneyID],
                 [JnyAgentDelID],
                 [BalanceDate],
                 [PeriodIndicator],
                 [Amount],
                 [Reference],
                 [CreatedDate],
                 [CreatedBy],
                 [UpdatedDate],
                 [UpdatedBy],
        --         [Cheque_ind],
                 [BalanceTypeID]
        FROM     [mobile].[tblDelegatedDashboardAmount]
        ORDER BY [ID] ASC;
    END

DROP TABLE [mobile].[tblDelegatedDashboardAmount];

EXECUTE sp_rename N'[mobile].[tmp_ms_xx_tblDelegatedDashboardAmount]', N'tblDelegatedDashboardAmount';

EXECUTE sp_rename N'[mobile].[tmp_ms_xx_constraint_PK_tblDelegatedDashBoardAmount]', N'PK_tblDelegatedDashBoardAmount', N'OBJECT';

COMMIT TRANSACTION;

SET TRANSACTION ISOLATION LEVEL READ COMMITTED;


GO
PRINT N'Creating [dbo].[FK_tblTransaction_tblVisitResult]...';


GO
ALTER TABLE [dbo].[tblTransaction] WITH NOCHECK
    ADD CONSTRAINT [FK_tblTransaction_tblVisitResult] FOREIGN KEY ([VisitResultID]) REFERENCES [dbo].[tblVisitResult] ([ResultID]);


GO
PRINT N'Creating [dbo].[FK_CallResult_CustomerVisit]...';


GO
ALTER TABLE [dbo].[tblVisitResult] WITH NOCHECK
    ADD CONSTRAINT [FK_CallResult_CustomerVisit] FOREIGN KEY ([VisitID]) REFERENCES [dbo].[tblVisit] ([VisitID]);


GO
PRINT N'Creating [dbo].[FK_tblVisitResult_tblVisitResultStatus]...';


GO
ALTER TABLE [dbo].[tblVisitResult] WITH NOCHECK
    ADD CONSTRAINT [FK_tblVisitResult_tblVisitResultStatus] FOREIGN KEY ([StatusID]) REFERENCES [dbo].[tblVisitResultStatus] ([StatusID]);


GO
PRINT N'Creating [mobile].[FK_tblDashboardAmount_tblBalanceType]...';


GO
ALTER TABLE [mobile].[tblDashboardAmount] WITH NOCHECK
    ADD CONSTRAINT [FK_tblDashboardAmount_tblBalanceType] FOREIGN KEY ([BalanceTypeID]) REFERENCES [mobile].[tblBalanceType] ([TypeID]);


GO
PRINT N'Creating [mobile].[FK_tblDelegatedDashboardAmount_tblBalanceType]...';


GO
ALTER TABLE [mobile].[tblDelegatedDashboardAmount] WITH NOCHECK
    ADD CONSTRAINT [FK_tblDelegatedDashboardAmount_tblBalanceType] FOREIGN KEY ([BalanceTypeID]) REFERENCES [mobile].[tblBalanceType] ([TypeID]);


GO
PRINT N'Creating [mobile].[FK_tblDelegatedDashBoardAmount_tblJourneyAgentDelegated]...';


GO
ALTER TABLE [mobile].[tblDelegatedDashboardAmount] WITH NOCHECK
    ADD CONSTRAINT [FK_tblDelegatedDashBoardAmount_tblJourneyAgentDelegated] FOREIGN KEY ([JnyAgentDelID]) REFERENCES [dbo].[tblJourneyAgentDelegated] ([JnyAgentDelID]);


GO
PRINT N'Creating [dbo].[FK_Agreement_FromAgreement]...';


GO
ALTER TABLE [dbo].[tblAgreement] WITH NOCHECK
    ADD CONSTRAINT [FK_Agreement_FromAgreement] FOREIGN KEY ([ReloanedFromAgreementID]) REFERENCES [dbo].[tblAgreement] ([AgreementID]);


GO
PRINT N'Creating [dbo].[FK_Agreement_ToAgreement]...';


GO
ALTER TABLE [dbo].[tblAgreement] WITH NOCHECK
    ADD CONSTRAINT [FK_Agreement_ToAgreement] FOREIGN KEY ([ReloanedToAgreementID]) REFERENCES [dbo].[tblAgreement] ([AgreementID]);


GO
PRINT N'Refreshing [dbo].[vwAgent]...';


GO
EXECUTE sp_refreshsqlmodule N'[dbo].[vwAgent]';


GO
PRINT N'Refreshing [dbo].[vwUser]...';


GO
EXECUTE sp_refreshsqlmodule N'[dbo].[vwUser]';


GO
PRINT N'Refreshing [dbo].[vwAreaManager]...';


GO
EXECUTE sp_refreshsqlmodule N'[dbo].[vwAreaManager]';


GO
PRINT N'Refreshing [dbo].[vwBusinessManager]...';


GO
EXECUTE sp_refreshsqlmodule N'[dbo].[vwBusinessManager]';


GO
PRINT N'Refreshing [dbo].[vwRegionManager]...';


GO
EXECUTE sp_refreshsqlmodule N'[dbo].[vwRegionManager]';


GO
PRINT N'Refreshing [mobile].[vwLoginUser]...';


GO
EXECUTE sp_refreshsqlmodule N'[mobile].[vwLoginUser]';


GO
PRINT N'Refreshing [mobile].[vwUser]...';


GO
EXECUTE sp_refreshsqlmodule N'[mobile].[vwUser]';


GO
PRINT N'Refreshing [dbo].[vwSection]...';


GO
EXECUTE sp_refreshsqlmodule N'[dbo].[vwSection]';


GO
PRINT N'Refreshing [dbo].[vwVisitResult]...';


GO
EXECUTE sp_refreshsqlmodule N'[dbo].[vwVisitResult]';


GO
PRINT N'Refreshing [dbo].[vwVisitSummary]...';


GO
EXECUTE sp_refreshsqlmodule N'[dbo].[vwVisitSummary]';


GO
PRINT N'Refreshing [mobile].[vwVisitSummary]...';


GO
EXECUTE sp_refreshsqlmodule N'[mobile].[vwVisitSummary]';


GO
PRINT N'Refreshing [mobile].[vwCustomerVisitList]...';


GO
EXECUTE sp_refreshsqlmodule N'[mobile].[vwCustomerVisitList]';


GO
PRINT N'Refreshing [mobile].[vwDashboardAmount]...';


GO
EXECUTE sp_refreshsqlmodule N'[mobile].[vwDashboardAmount]';


GO
PRINT N'Refreshing [mobile].[vwDelegatedDashboardAmount]...';


GO
EXECUTE sp_refreshsqlmodule N'[mobile].[vwDelegatedDashboardAmount]';


GO
PRINT N'Altering [dbo].[vwAgreement]...';


GO

/*
ALTER VIEW [dbo].[vwAgreement]
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
PRINT N'Creating [mobile].[vwAgreementList]...';


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
PRINT N'Creating [mobile].[vwTransactionHistory]...';


GO

CREATE VIEW [mobile].[vwTransactionHistory]
AS
SELECT 
	ta.AllocationID, 
	ta.TransactionID, 
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
GO
PRINT N'Creating [mobile].[AP_I_MobiletblUser]...';


GO
SET ANSI_NULLS ON;

SET QUOTED_IDENTIFIER OFF;


GO

-- Create Procedure -----------------------------------------------
CREATE PROCEDURE [mobile].[AP_I_MobiletblUser]
        @UserID								 INT,
        @PIN								 INT,
		@MACID								 VARCHAR(50),
		@IsDone								 TINYINT OUTPUT
AS
    BEGIN
    --***************************************************************************
     --*
    --* Description    :  Insert record in Mobile.tblUser Table
    --*
    --* Configuration Record
    --* Review              Ver  Author        Date      
    --* SPRINT 3			1.0  Abhay		   26/04/2016

    --* Review              Ver  Author        Date        CR              Comments 
    --* E.g. EXec [mobile].[AP_I_MobiletblUser] 1,1254,'afsfdgdfg3453'
    --***************************************************************************
	    
    DECLARE @intErrorNum   int,
            @strErrMsg     varchar(255)

    SELECT @intErrorNum = 60000,
           @strErrMsg   = ''

	SELECT @IsDone = 0
    -- Procedure Body -------------------------------------------------

    SET NOCOUNT ON
		BEGIN TRY
		 BEGIN TRANSACTION
			If NOT EXISTS(SELECT 1 from [mobile].[tblUser] WHERE USERID =  @UserID)
			BEGIN
			INSERT INTO [mobile].[tblUser] (
				UserID,
				PIN,
				MacAddress,
				UserName,
				[Password],
				[SecurityQuestion],
				SecurityAnswer,
				LastLoggedIn,
				CreatedDate,
				CreatedBy) 
			VALUES (
				@UserID,
				@PIN,
				@MACID,
				NULL,
				NULL,
				NULL,
				NULL,
				GETDATE(),
				GETDATE(),
				@UserID
				)

				SET @IsDone = 1

			END
			ELSE
			BEGIN

				--SELECT 'SDT USER LOGIN DETAILS ARE NOT EXIST'
				SET @IsDone = 0
		
			END
		COMMIT TRANSACTION
        END TRY
		BEGIN CATCH

			SET @IsDone = 0
			ROLLBACK TRANSACTION

			--SELECT   ERROR_NUMBER() AS ErrorNumber
			--		,ERROR_SEVERITY() AS ErrorSeverity
			--		,ERROR_STATE() AS ErrorState
			--		,ERROR_PROCEDURE() AS ErrorProcedure
			--		,ERROR_LINE() AS ErrorLine
			--		,ERROR_MESSAGE() AS ErrorMessage;

		END CATCH
    SET NOCOUNT OFF
   
    RETURN
END
GO
SET ANSI_NULLS, QUOTED_IDENTIFIER ON;

*/
GO
PRINT N'Refreshing [mobile].[AP_X_Transactions_From_Device]...';


GO
EXECUTE sp_refreshsqlmodule N'[mobile].[AP_X_Transactions_From_Device]';


GO
PRINT N'Checking existing data against newly created constraints';


GO
USE [$(DatabaseName)];


GO
ALTER TABLE [dbo].[tblTransaction] WITH CHECK CHECK CONSTRAINT [FK_tblTransaction_tblVisitResult];

ALTER TABLE [dbo].[tblVisitResult] WITH CHECK CHECK CONSTRAINT [FK_CallResult_CustomerVisit];

ALTER TABLE [dbo].[tblVisitResult] WITH CHECK CHECK CONSTRAINT [FK_tblVisitResult_tblVisitResultStatus];

ALTER TABLE [mobile].[tblDashboardAmount] WITH CHECK CHECK CONSTRAINT [FK_tblDashboardAmount_tblBalanceType];

ALTER TABLE [mobile].[tblDelegatedDashboardAmount] WITH CHECK CHECK CONSTRAINT [FK_tblDelegatedDashboardAmount_tblBalanceType];

ALTER TABLE [mobile].[tblDelegatedDashboardAmount] WITH CHECK CHECK CONSTRAINT [FK_tblDelegatedDashBoardAmount_tblJourneyAgentDelegated];

ALTER TABLE [dbo].[tblAgreement] WITH CHECK CHECK CONSTRAINT [FK_Agreement_FromAgreement];

ALTER TABLE [dbo].[tblAgreement] WITH CHECK CHECK CONSTRAINT [FK_Agreement_ToAgreement];


GO
PRINT N'Update complete.';


GO
