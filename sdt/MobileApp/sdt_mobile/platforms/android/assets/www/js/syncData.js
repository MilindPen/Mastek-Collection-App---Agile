var transactionDetails = [];


var syncData = {
    /***************************************retrieving the customer loan details from offline DB************************************************/
    initSync: function(){
        
        syncData.getLastSyncInfo();
		
    },
	
	startSync: function(){
        
        
        var dbObj = dataStorage.initializeDB();
       
        isSyncing = true;
        //execute SQL query
        dbObj.transaction(function(tx) {
            tx.executeSql(dbQueries.getSyncDataStmt,[],function(tx,res){
                var len = res.rows.length;
                if(len==0){
					console.log(len);
					alert("No Data to Sync");
					isSyncing = false;
                }
                if(len > 0) {
					console.log("Fetched Data length "+len);
					for(var i = 0;i<len;i++)
					{
						transactionDetails.push(res.rows.item(i))
					}
					console.log(transactionDetails);
					syncTransactionService.postSyncData(transactionDetails);
                    //alert(JSON.stringify(res));
                    //selectedCustLoanDetails.renderSelectedCustDetails(JSON.stringify(res.rows.item(0)));
                }

            });
        });
    },
	
	getTransactionData: function(){
        
        var dbObj = dataStorage.initializeDB();
       
        
        //execute SQL query
        dbObj.transaction(function(tx) {
            tx.executeSql(dbQueries.selectDataTransaction,[],function(tx,res){
                var len = res.rows.length;
                if(len==0){
					console.log(len);
					
                }
                if(len > 0) {
					console.log("Fetched Data length "+len);
					for(var i = 0;i<len;i++)
					{
						console.log(JSON.stringify(res.rows.item(i)));
						
						var param = [res.rows.item(i).sumpaidamt,res.rows.item(i).AgreementID];
						syncData.updateAgreementTableInDB(param);
					}
					//console.log(transactionDetails);
					
                    //alert(JSON.stringify(res));
                    //selectedCustLoanDetails.renderSelectedCustDetails(JSON.stringify(res.rows.item(0)));
                }

            });
        },syncData.errorInsert, syncData.successDB);
    },
		
	getLastSyncInfo: function(){
        
        var dbObj = dataStorage.initializeDB();
       var selectedUserId = dataStorage.getData(USER_ID);
        //isSyncing = true;
        //execute SQL query
        dbObj.transaction(function(tx) {
            tx.executeSql(dbQueries.getUserLastSynced,[selectedUserId],function(tx,res){
                var len = res.rows.length;
                if(len==0){
					console.log(len);
					//alert("No Data to Sync");
					//isSyncing = false;
                }
                if(len > 0) {
					console.log("Fetched Data length "+len);
					
					console.log(JSON.stringify(res.rows.item(0)));
					var data = res.rows.item(0);
					var lastSyncedDate = new Date(data.lastSynced);
					var currentDate = new Date(saveTransaction.generateResultDate());
					
					console.log("lastSyncedDate "+lastSyncedDate);
					console.log("currentDate "+currentDate);
					
					var hoursDiff  = Math.abs(currentDate - lastSyncedDate) / 36e5;
					console.log("Hours Diff "+hoursDiff);
					if(hoursDiff < 1)
					{
						alert("Do you want to Sync Again");
					}
					
                    //alert(JSON.stringify(res));
                    //selectedCustLoanDetails.renderSelectedCustDetails(JSON.stringify(res.rows.item(0)));
                }

            });
        },syncData.errorInsert, function(){syncData.startSync()});
    },
		
					
					
	/**********************update customer table into offline DB***********************/
    updateTransactionTableInDB: function(){
    	console.log("Updating...");
    	
		var dbObj = dataStorage.initializeDB();
			dbObj.transaction(function updateTransactionRecords(tx){
					tx.executeSql(dbQueries.updateTransactionIsSynched, []);
			},syncData.errorInsert, syncData.success);
    	
    	
    },
	/**********************update Agreement table into offline DB***********************/
    updateAgreementTableInDB: function(inputData){
    	console.log("Updating...");
    	
		var dbObj = dataStorage.initializeDB();
			dbObj.transaction(function updateAgreementRecords(tx){
					tx.executeSql(dbQueries.updateAgreementTableStatement, inputData);
			},syncData.errorInsert, syncData.updateSuccess);
    	
    	
    },
	/**********************update User table into offline DB***********************/
    updateUserTableInDB: function(inputData){
    	console.log("Updating...");
    	
		var dbObj = dataStorage.initializeDB();
			dbObj.transaction(function updateUserRecords(tx){
					tx.executeSql(dbQueries.updateUserLastSynced, inputData);
			},syncData.errorInsert, syncData.SyncSuccess);
    	
    	
    },
	 /****************************transaction error callback**************************/
    errorInsert: function() {
			//alert("Error Processing SQL");
           common.alertMessage(messageboxOfflineDataSave.messageError,callbackReturn,messageboxOfflineDataSave.messageTitleError);
		   isSyncing = false;
    },
	/************************transaction success callback****************************/
    success: function() {
           console.log("data updated successfully!");
			console.log("Calling customer data");
			//alert("Sync finished Successfully");
			service.getCustomerInformation();	
    },
	 updateSuccess: function() {
           console.log("data updated successfully!");
			isSyncing = false;
			//alert("Sync finished Successfully");
				
    },
	successDB: function() {
          // console.log("data updated successfully!");
			isSyncing = false;
			//alert("Sync finished Successfully");
			var lastSyncedDateTime = saveTransaction.generateResultDate();
			var selectedUserId = dataStorage.getData(USER_ID);
			var input = [lastSyncedDateTime,selectedUserId];
			syncData.updateUserTableInDB(input);
				
    },
	SyncSuccess: function() {
           console.log("data updated successfully!");
			isSyncing = false;
			//alert("Sync finished Successfully");
			common.alertMessage(messageboxSync.successSync,callbackReturn, messageboxSync.messageTitleSuccess);
				
    },
	
	dateDiff : function(currentDate,lastSyncedDate){
		var hours = Math.abs(currentDate - lastSyncedDate) / 36e5;
	}

	
};

$(document).ready(function(){
	  document.addEventListener("deviceready", onDeviceReady, false);
	});

function onDeviceReady() {
	console.log(navigator.notification);
}

