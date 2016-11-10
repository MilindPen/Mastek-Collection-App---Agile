--New Transaction Types 

-- SRART - SPRINT3 - Changes 

IF NOT EXISTS (Select 1 from [dbo].[tblTransactionType] WHERE TypeDescription = 'Settlement Cash')
BEGIN 
	INSERT INTO [dbo].[tblTransactionType] (
											TypeID,
											TypeDescription,
											TypeGroupID,
											TypeCentralPayment,
											TypeOrder,
											TypeSubOrder,
											TypeShortDescription
											)
									SELECT	50,
											'Settlement Cash',
											1,
											NULL,
											NULL,
											NULL,
											NULL
		PRINT 'New Transaction Type : 50 - ''Settlement Cash'' Added.'
END

IF NOT EXISTS (Select 1 from [dbo].[tblTransactionType] WHERE TypeDescription = 'Cash - Not Due')
BEGIN
	INSERT INTO [dbo].[tblTransactionType] (
											TypeID,
											TypeDescription,
											TypeGroupID,
											TypeCentralPayment,
											TypeOrder,
											TypeSubOrder,
											TypeShortDescription
											)
									SELECT	51,
											'Cash - Not Due',
											1,
											NULL,
											NULL,
											NULL,
											NULL
		PRINT 'New Transaction Type : 51 - ''Cash - Not Due'' Added.'
END
-- END - SPRINT3 - Changes 


-- SRART - SPRINT4 - Changes 

IF NOT EXISTS (Select 1 from [dbo].[tblTransactionType] WHERE TypeDescription = 'Adjustment')
BEGIN 
	INSERT INTO [dbo].[tblTransactionType] (
											TypeID,
											TypeDescription,
											TypeGroupID,
											TypeCentralPayment,
											TypeOrder,
											TypeSubOrder,
											TypeShortDescription
											)
									SELECT	99,
											'Adjustment',
											1,
											NULL,
											NULL,
											NULL,
											NULL
		PRINT 'New Transaction Type : 99 - ''Adjustment'' Added.'
END

-- END - SPRINT4 - Changes 