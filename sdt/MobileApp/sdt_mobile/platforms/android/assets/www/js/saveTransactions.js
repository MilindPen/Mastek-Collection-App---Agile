var saveTransaction = {

/***************************************creating mtbTransaction table in offline DB************************************************/
    generateResultID: function(){
        
		var date = new Date();
		var YY = date.getFullYear().toString().substr(2,2);
		var DD = date.getDate();
		var HH = date.getHours();
		var MM = date.getMinutes();
		var SS = date.getSeconds();
               
		return YY+DD+HH+MM+SS;	   
    },
	
	generateResultDate: function(){
        
		var date = new Date();
		var YYYY = date.getFullYear();
		var mm = (date.getMonth()+1).toString();
		mm = mm.length == 1 ? '0' + mm : mm;
		var DD = (date.getDate()).toString();
		DD = DD.length == 1 ? '0' + DD : DD;
		var HH = date.getHours();
		var MM = date.getMinutes();
		var SS = date.getSeconds();
               
		var resultDate = YYYY+"-"+mm+"-"+DD+" "+HH+":"+MM+":"+SS  ;
		return resultDate;	   
    },
	/**********************insert retrieved data into offline DB***********************/
    saveToDB: function(inputData){
    	console.log("Saving...");
    	
		var dbObj = dataStorage.initializeDB();
			dbObj.transaction(function insertTransactionRecords(tx){
					tx.executeSql(dbQueries.insertIntoMtbTransactionTableStatement, inputData);
			},saveTransaction.errorInsert, saveTransaction.successInsert);
    	
    	
    },
	/**********************update customer table into offline DB***********************/
    updateCustomerTableInDB: function(inputData){
    	console.log("Updating...");
    	
		var dbObj = dataStorage.initializeDB();
			dbObj.transaction(function updateTransactionRecords(tx){
					tx.executeSql(dbQueries.updateCustomerTableStatement, inputData);
			},saveTransaction.errorInsert, saveTransaction.updateSuccess);
    	
    	
    },
	/**********************update Agreement table into offline DB***********************/
    updateAgreementTableInDB: function(inputData){
    	console.log("Updating...");
    	
		var dbObj = dataStorage.initializeDB();
			dbObj.transaction(function updateAgreementRecords(tx){
					tx.executeSql(dbQueries.updateAgreementTableStatement, inputData);
			},saveTransaction.errorInsert, saveTransaction.success);
    	
    	
    },
    /****************************transaction error callback**************************/
    errorInsert: function() {
    	common.alertMessage(messageboxOfflineDataSave.messageError,callbackReturn,messageboxOfflineDataSave.messageTitleError);   
    },
    /************************transaction success callback****************************/
    successInsert: function() {
    	common.alertMessage(messageboxSaveTransaction.messageTitleSuccess,function(){common.redirect("scheduledCustomers.html")}(),messageboxCallService.messageTitleSuccess);
			//saveTransaction.updateCustomerTableInDB()
			//common.redirect('scheduledCustomers.html');
    },
	/************************transaction success callback****************************/
    updateSuccess: function() {
           //console.log("data updated successfully!");
			//common.redirect('scheduledCustomers.html');
    },
	/************************transaction success callback****************************/
    success: function() {
           //alert("data updated successfully!");
			//common.redirect('scheduledCustomers.html');
    }

	

};



