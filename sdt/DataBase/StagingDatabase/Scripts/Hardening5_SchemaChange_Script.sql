 /****************************************************************************
*
* Project Name		: SDT
*
* Reference			: HARDENING - 5 : Changes in User Stories
*
* Description		: Changes Regarding User Registration 
* 
* Auth				: Abhay J. Meher
*
* Objects Affected	:	dbo.tblUser
* DATE				:	01-06-2016
*
****************************************************************************/



--Dbo.tblUser	RegistrationID

IF EXISTS(SELECT *
          FROM   INFORMATION_SCHEMA.COLUMNS
          WHERE  TABLE_NAME = 'tblUser' AND TABLE_SCHEMA = 'dbo'
                 AND COLUMN_NAME = 'RegistrationID') 
BEGIN

		ALTER TABLE [dbo].[tblUser] 
		DROP COLUMN RegistrationID

		PRINT 'New Column ''RegistrationID'' Dropped from [dbo].[tblUser] Table'
				
END
GO



