--sp_help 'mobile.tblBranchClosedWeekDetails'

IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[mobile].[AP_I_BranchClosedWeekDetails]') AND type in (N'P', N'PC'))
DROP PROCEDURE [mobile].[AP_I_BranchClosedWeekDetails]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER OFF
GO

-- Create Procedure -----------------------------------------------
CREATE PROCEDURE [mobile].[AP_I_BranchClosedWeekDetails]
        @UserID									INT,
		@YearNo									INT,
		@WeekNo									INT,
		@BranchID								INT,
		@ClosedBy								INT,
		--@ClosedDateTime						DATETIME,
		@WeekStatusID							TINYINT,
		@IsSyncDone								TINYINT OUTPUT,
		@ErrorCode								VARCHAR(10) OUTPUT,
		@ErrorMessage							VARCHAR(4000) OUTPUT
AS
    BEGIN
    --***************************************************************************
    --*
    --* Description    :  Insert record in Mobile.tblBranchClosedWeekDetails Table
    --*
    --* Configuration Record
    --* Review              Ver  Author        Date      
    --* SPRINT 2			1.0  Abhay		   14/07/2016

    --* Review              Ver  Author        Date        CR              Comments 
    --* E.g. EXec [mobile].[AP_I_BranchClosedWeekDetails] <<Parameter list>>
    --***************************************************************************

	DECLARE @WeekID INT

    SELECT @ErrorCode = 0,
           @ErrorMessage   = ''

	SELECT @IsSyncDone = 0
    -- Procedure Body -------------------------------------------------

--BranchClosedWeekID
--WeekID
--BranchID
--ClosedBy
--ClosedDateTime
--WeekStatusID
--CreatedBy
--CreatedDateTime
--UpdatedBy
--UpdatedDateTime

		
	--SELECT @WeekID = WeekID From [dbo].[vwWeekEnding] WE WHERE WeekNo =  @WeekNo AND YearNo = @YearNo


    SET NOCOUNT ON
		BEGIN TRY
		 BEGIN TRANSACTION

			

			If NOT EXISTS(SELECT 1 from mobile.tblBranchClosedWeekDetails WHERE WeekNo =  @WeekNo AND YearNo = @YearNo AND BranchID = @BranchID)
			BEGIN

				INSERT INTO mobile.tblBranchClosedWeekDetails (
					WeekNo,
					YearNo,
					BranchID,
					ClosedBy,
					ClosedDateTime,
					WeekStatusID,
					CreatedBy,
					CreatedDateTime
					) 
				VALUES (
					@WeekNo,
					@YearNo,
					@BranchID,
					@ClosedBy,
					GETDATE(), --@ClosedDateTime,
					@WeekStatusID,
					@UserID,
					GETDATE()
					)

				SET @IsSyncDone = 1

			END
			ELSE
			BEGIN

				UPDATE mobile.tblBranchClosedWeekDetails
				SET		
					WeekStatusID	= @WeekStatusID,
					UpdatedBy		= @UserID,
					UpdatedDateTime = GETDATE()
				WHERE 
					WeekNo =  @WeekNo 
				AND YearNo = @YearNo 
				AND BranchID = @BranchID


				SET @IsSyncDone = 1
			END
		COMMIT TRANSACTION
        END TRY
		BEGIN CATCH

			SET @IsSyncDone = 0

			ROLLBACK TRANSACTION

			SET @ErrorCode='ERR-153'
			SET @ErrorMessage= CONVERT(VARCHAR(5),ERROR_NUMBER()) + ' : ' + Convert(VARCHAR(20),ERROR_LINE()) + ' : ' + Convert(VARCHAR(3500),ERROR_MESSAGE())			
        

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

sp_recompile '[Mobile].[AP_I_BranchClosedWeekDetails]'
go


