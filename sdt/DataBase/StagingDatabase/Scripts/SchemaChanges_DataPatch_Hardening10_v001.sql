
 /****************************************************************************
*
* Project Name		: SDT
*
* Reference			: Hardening-10 : Collection App
*
* Description		: Data type change for Date column to DateTime in tblWeekEnding Table
* 
* Auth				: Abhay J. Meher
*
* Objects Affected	:	
* DATE				: 24-08-2016
*
****************************************************************************/

IF EXISTS ( Select 1 from sys.sysindexes where NAME = 'I_NC_WKE_1' AND object_name(id) = 'tblWeekEnding')
Begin
	DROP INDEX dbo.tblWeekEnding.I_NC_WKE_1
END

IF NOT EXISTS (SELECT *	FROM   INFORMATION_SCHEMA.COLUMNS
				WHERE  TABLE_NAME = 'tblWeekEnding' AND TABLE_SCHEMA = 'dbo'
                 AND COLUMN_NAME = 'EndDate' AND DATA_TYPE = 'datetime')
BEGIN

		ALTER Table tblWeekEnding
		ALTER COLUMN EndDate DATETIME NOT NULL
END

IF NOT EXISTS (SELECT *	FROM   INFORMATION_SCHEMA.COLUMNS
				WHERE  TABLE_NAME = 'tblWeekEnding' AND TABLE_SCHEMA = 'dbo'
                 AND COLUMN_NAME = 'startdate' AND DATA_TYPE = 'datetime')
BEGIN
		ALTER Table tblWeekEnding
		ALTER COLUMN StartDate DATETIME NOT NULL
END


IF NOT Exists (SELECT 1 from tblweekending 
				WHERE DATEPART(hh,enddate) = 23 
				  AND DATEPART(N,enddate) = 59 
				  AND DATEPART(SS,enddate) = 59)
BEGIN
		UPDATE tblweekending
		Set  EndDate = dateadd(ms,998,dateadd(SS,59,dateadd(N,59,dateadd(hh,23,EndDate))))   -- Adding timestamp to exising Date
			,UpdatedDate = GETDATE()
			,UPdatedBy = 10000
END

IF NOT EXISTS ( Select 1 from sys.sysindexes where NAME = 'I_NC_WKE_1' AND object_name(id) = 'tblWeekEnding')
BEGIN
	CREATE NONCLUSTERED INDEX I_NC_WKE_1
	ON [dbo].tblWeekEnding (StartDate,EndDate)
END

