IF EXISTS(SELECT 1
		FROM sys.sequences AS seq
		JOIN sys.schemas AS sch  ON seq.schema_id = sch.schema_id 
		WHERE sch.name = 'Mobile' and seq.name = 'SequenceTransactionAllocation'
		AND START_VALUE = 1000000)
BEGIN
	DROP SEQUENCE [mobile].[SequenceTransactionAllocation]
	PRINT 'SEQUENCE [mobile].[SequenceTransactionAllocation] DROPPED'
END
GO

IF NOT EXISTS (SELECT 1
		FROM sys.sequences AS seq
		JOIN sys.schemas AS sch  ON seq.schema_id = sch.schema_id 
		WHERE sch.name = 'Mobile' and seq.name = 'SequenceTransactionAllocation'
		AND CURRENT_VALUE = 1000000000)
BEGIN
		/*	CREATING SEQUENCE [mobile].[SequenceTransactionAllocation] */
		CREATE SEQUENCE [mobile].[SequenceTransactionAllocation] AS INT
		START WITH 1000000000
		INCREMENT BY 1

		PRINT 'SEQUENCE [mobile].[SequenceTransactionAllocation] START Modifed to 1,000,000,000'
END
GO
