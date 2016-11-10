IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[mobile].[AP_I_MobiletblUser]') AND type in (N'P', N'PC'))
DROP PROCEDURE [mobile].[AP_I_MobiletblUser]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER OFF
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

sp_recompile '[mobile].[AP_I_MobiletblUser]'
go





/*
Begin Tran
Declare @out int
EXec [mobile].[AP_I_MobiletblUser] 888,2543,'Ad:90:98:HJ',@out OUTPUT
Select @out
Select * from [mobile].[tblUser]
Rollback Tran
*/