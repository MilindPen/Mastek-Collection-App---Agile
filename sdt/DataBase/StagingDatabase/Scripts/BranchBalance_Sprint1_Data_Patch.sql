/*
--* Data Patch For Branch Balance - Sprint-1
--* 
--*	Reference Data Added for following Entities
--* 1. tblBalanceType
--* 2. tblUserType
--* 3. tblWeekStatus

--* Date : 1-07-2016
--* Auth : Abhay M.
--* Review : Pending

*/


IF NOT EXISTS (SELECT 1 FROM  [mobile].[tblBalanceType] WHERE TypeID = 'C')
BEGIN

	INSERT INTO [mobile].[tblBalanceType] (TypeID,[Description])
	SELECT 'C','Collections'
END
GO

IF NOT EXISTS (SELECT 1 FROM dbo.tblUserType)
BEGIN

	INSERT INTO dbo.tblUserType (UserTypeID,UserType)
	SELECT 1,'Region Manager'
	UNION
	SELECT 2, 'Agent'
	UNION
	SELECT 3, 'Business Manager'
	UNION
	SELECT 4, 'Area Manager'
	UNION
	SELECT 5, 'System'

END
GO


IF NOT EXISTS (SELECT 1 FROM dbo.tblUserType WHERE UserTypeID = 6)
BEGIN

	INSERT INTO dbo.tblUserType (UserTypeID,UserType)
	SELECT 6,'Admin'
END




