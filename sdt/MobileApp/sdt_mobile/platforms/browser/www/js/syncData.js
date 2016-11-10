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
					//alert("No Data to Sync");
					noPush = true;
					//common.alertMessage(messageboxSync.NoDataSyncMsg,noDataSyncCallback,messageboxSync.messageTitleAlert);
					//isSyncing = false;
					 syncData.syncCustomerUpdateData();
					//service.getCustomerInformation();	
                }
                if(len > 0) {
					console.log("Fetched Data length "+len);
					noPush = false;
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
	//Get Transaction Data after Sync
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
						
						var param = [res.rows.item(i).AgreementAmountPaid,res.rows.item(i).AgreementID];
						syncData.updateAgreementTableInDB(param);
					}
					//console.log(transactionDetails);
					
                    //alert(JSON.stringify(res));
                    //selectedCustLoanDetails.renderSelectedCustDetails(JSON.stringify(res.rows.item(0)));
                }

            });
        },syncData.errorInsert, syncData.successDB);
    },
		
	// Get Customer update details from Offline DB for Sync
	syncCustomerUpdateData: function(){
        
        var dbObj = dataStorage.initializeDB();
       
        
        //execute SQL query
        dbObj.transaction(function(tx) {
            tx.executeSql(dbQueries.selectCustomerUpdateData,[],function(tx,res){
                var len = res.rows.length;
                if(len==0){
					console.log(len);
					syncData.syncBalanceTransactionData();
                }
                if(len > 0) {
					console.log("Fetched Data length "+len);
					var customerUpdateList = [];
					for(var i = 0;i<len;i++)
					{
						console.log(JSON.stringify(res.rows.item(i)));
						customerUpdateList.push(res.rows.item(i));
					}
					console.log(customerUpdateList);
					syncCustomerUpdateService.postCustomerUpdateData(customerUpdateList);
                    
                }

            });
        });
    },
	
	
	// Get Balance Transaction data from Offline DB for Sync
	syncBalanceTransactionData: function(){
        
        var dbObj = dataStorage.initializeDB();
       
        
        //execute SQL query
        dbObj.transaction(function(tx) {
            tx.executeSql(dbQueries.selectBalanceTransactionData,[],function(tx,res){
                var len = res.rows.length;
                if(len==0){
					console.log(len);
					service.getCustomerInformation();
				}
                if(len > 0) {
					console.log("Fetched Data length "+len);
					var balanceTransactionList = [];
					var weekNo;
					var yearNo;
					var balanceId;
					var balanceDate;
					var periodIndicator;
					var amount;
					var reference;
					var balanceTypeId;
					var chequeIndicator;
					var isDeleted;
					var listItem;
					var selectedUserId = dataStorage.getData(USER_ID);
					var journeyId = dataStorage.getData(JOURNEY_ID);
					for(var i = 0;i<len;i++)
					{
						console.log(JSON.stringify(res.rows.item(i)));
						listItem = res.rows.item(i);
						
						weekNo = listItem.WeekNo;
						yearNo = (listItem.YearNo).toString().substr(2);
						balanceId = yearNo+weekNo+padLeft(selectedUserId,6)+padLeft(listItem.BalanceID,3);
						console.log("balanceID "+balanceId);
						//var temp = (listItem.BalanceDate).toString().split("/"); 
						//balanceDate = '20'+temp[2]+'-'+temp[0]+'-'+temp[1];
						balanceDate = listItem.BalanceDate;
						console.log("balanceDate "+balanceDate);
						
						periodIndicator = listItem.PeriodIndicator;
						amount = listItem.Amount;
					    reference = listItem.Reference;
						balanceTypeId = listItem.BalanceTypeID;
						chequeIndicator = listItem.ChequeIndicator;
						isDeleted = listItem.IsDeleted;
						
						var reqJson =  {"balanceId": balanceId,"journeyId": journeyId,"balanceDate": balanceDate,"periodIndicator": periodIndicator,"amount": amount,"reference": reference,"balanceTypeId": balanceTypeId,"chequeIndicator": chequeIndicator,"isDeleted": isDeleted};
						
						balanceTransactionList.push(reqJson);
					}
					console.log(balanceTransactionList);
					syncBalanceTransactionService.postBalanceTransactionData(balanceTransactionList);
                    
                }

            });
        });
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
                          //console.log("After replace "+(data.lastSynced).toString().replace(" ","T"));
					if(data.lastSynced !="" && data.lastSynced !=null && data.lastSynced != undefined)
					{
						var lastSyncedDate = new Date((data.lastSynced).toString().replace(" ","T"));
						var currentDate = new Date((saveTransaction.generateResultDate()).toString().replace(" ","T"));
						
						console.log("lastSyncedDate "+lastSyncedDate);
						console.log("currentDate "+currentDate);
						
						var hoursDiff  = Math.abs(currentDate - lastSyncedDate) / 36e5;
						console.log("Hours Diff "+hoursDiff);
						if(hoursDiff < 1)
						{
							syncData.startSync();
							//alert("Do you want to Sync Again");
							//common.confirmMessage(messageboxSync.syncAgainMsg,confirmCallback, messageboxSync.messageTitleConfirm);
						}
						else
						{
							syncData.startSync();
						}
					}
					else
					{
						syncData.startSync();
					}
					
                    //alert(JSON.stringify(res));
                    //selectedCustLoanDetails.renderSelectedCustDetails(JSON.stringify(res.rows.item(0)));
                }

            });
        },syncData.errorInsert, function(){
			//syncData.startSync()
		});
    },
		
					
					
	/**********************update transaction table into offline DB***********************/
    updateTransactionTableInDB: function(){
    	console.log("Updating...");
    	
		var dbObj = dataStorage.initializeDB();
			dbObj.transaction(function updateTransactionRecords(tx){
					tx.executeSql(dbQueries.updateTransactionIsSynched, []);
			},syncData.errorInsert, syncData.success);
    	
    	
    },
	/**********************update customer update table into offline DB after successful Sync***********************/
	updateCustomerUpdateTableInDB: function(){
    	console.log("Updating...");
    	
		var dbObj = dataStorage.initializeDB();
			dbObj.transaction(function (tx){
					tx.executeSql(dbQueries.updateCustomerUpdateIsSynched, []);
			},syncData.errorInsert, syncData.customerUpdateSuccess);
    	
    	
    },
	/**********************update balance transaction table into offline DB after successful Sync***********************/
	updateBalanceTransactionTableInDB: function(){
    	console.log("Updating...");
    	
		var dbObj = dataStorage.initializeDB();
			dbObj.transaction(function (tx){
					tx.executeSql(dbQueries.updateBalanceTransactionIsSynched, []);
			},syncData.errorInsert, syncData.balanceTransactionSuccess);
    	
    	
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
           //console.log("data updated successfully!");
			console.log("Pushing customer update data");
			
			//service.getCustomerInformation();
			syncData.syncCustomerUpdateData();
			
    },
	customerUpdateSuccess: function() {
           //console.log("data updated successfully!");
			console.log("Pushing customer update data");
			
			//service.getCustomerInformation();
			syncData.syncBalanceTransactionData();
			
    },
	balanceTransactionSuccess: function() {
           //console.log("data updated successfully!");
			console.log("Calling customer service");
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
			common.alertMessage(messageboxSync.successSyncMsg,callbackReturn, messageboxSync.messageTitleSuccess);
				
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

function confirmCallback(buttonIndex){
    if(buttonIndex == 1){
      syncData.startSync(); 
    }
};

function noDataSyncCallback(){
    service.getCustomerInformation();
};

function padLeft(nr, n, str){
    return Array(n-String(nr).length+1).join(str||'0')+nr;
}
