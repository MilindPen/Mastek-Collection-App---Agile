var rowCount;
var agreementIdList = [];
/*****************************data storage mechanism*************************************/
var dataStorage = {
	/*************************set session data********************************/	
    setData: function(key,value){
        sessionStorage.setItem(key,value);
    },
    /*************************get session data********************************/
    getData: function(key){
        var value = sessionStorage.getItem(key);
        return value; 
    },
    initializeDB: function(){
    	var dbObj = window.openDatabase(DB_NAME, "1.0", DB_NAME, 200000);
    	return dbObj;
    },
    
    /**********************initialize offline DB (WEB SQL)********************/
    checkDataInOfflineDB:function(dbObj){
    	console.log("init");
    	
    	dbObj.transaction(
    			function(tx){
    				tx.executeSql(dbQueries.selectFromCustomerTable,[],function(tx, res){
    					rowCount = res.rows.item(0)["COUNT(*)"];
    					console.log(rowCount);
    				});
    			},dataStorage.errorInit,dataStorage.successInit);
    	
    },
    errorInit: function(){
		console.log("Error initializing database");
		console.log("Database or table does not exists");
                var dbObj = dataStorage.initializeDB();
		dataStorage.createTables(dbObj);
    },
    successInit: function(){
        console.log("Success initializing database");
        if(rowCount>0){
        		
                common.redirect("dashboard.html");
        }

        else{
                service.getCustomerInformation();

        }
    },
    /*****************create tables in offline DB (WEB SQL)*******************/
    createTables: function(dbObj){
    	console.log("create");
    	dbObj.transaction(
            function(tx) {
            	tx.executeSql(dbQueries.createCustomerTableStatement);
                tx.executeSql(dbQueries.createAgreementTableStatement);
				tx.executeSql(dbQueries.createMtbTransactionHistory);
				tx.executeSql(dbQueries.createMtbTransaction);
				tx.executeSql(dbQueries.createMtbCardPayment);
            },
            this.txErrorHandler,
            function() {
                //logging required successfully table got created 
            	service.getCustomerInformation();
            }
        );
    },
    dropTables: function(){
        var dbObj = dataStorage.initializeDB();
    	console.log("drop");
    	dbObj.transaction(
            function(tx) {
            	tx.executeSql(dbQueries.dropCustomerTableStatement);
                tx.executeSql(dbQueries.dropAgreementTableStatement);
				tx.executeSql(dbQueries.dropMtbTransactionHistoryTableStatement);
				tx.executeSql(dbQueries.dropMtbTransactionTableStatement);
				tx.executeSql(dbQueries.dropMtbCardPaymentTableStatement);
            },
            this.txErrorHandler,
            function() {
                //logging required successfully table got created 
            	
            }
        );
    },
	deleteDataFromTables: function(){
        var dbObj = dataStorage.initializeDB();
    	console.log("Delete From Tables");
    	dbObj.transaction(
            function(tx) {
            	tx.executeSql(dbQueries.deleteDataCustomerTbl);
                tx.executeSql(dbQueries.deleteDataAgreementTbl);
				
            },
            this.txErrorHandler,
            function() {
                //logging required successfully table got created 
            	
            }
        );
    },
    /**********************insert retrieved data into offline DB***********************/
    insertIntoOfflineDB: function(data){
    	console.log("insert");
    	customerVisits = data.customerVisits;
    	console.log(customerVisits);
    	console.log(customerVisits.length);
    	
    	//Check if there is any data to insert
    	if (customerVisits.length > 0) {
    		dataStorage.setData(CUSTOMER_VISITS_OBJ,JSON.stringify(customerVisits));
		var dbObj = dataStorage.initializeDB();
			dbObj.transaction(function insertCustRecords(tx){
			var userId = dataStorage.getData(USER_ID);
		    	var journeyId = dataStorage.getData(JOURNEY_ID);
		    	var customerVisits = JSON.parse(dataStorage.getData(CUSTOMER_VISITS_OBJ));
		    	var custListLength = customerVisits.length;
		    	var customerVisit,agreement,visitDate,formattedVisitDate;
		    	
                    for (var i = 0; i < custListLength; i++) {
				    customerVisit = customerVisits[i];
				    
				    //format visit date
				    visitDate = (customerVisits[i].visitDate).toString().split("-");
				    var date = (visitDate[2]).toString().split(" ");
				    formattedVisitDate = visitDate[0]+"-"+visitDate[1]+"-"+date[0];
		            
                                     //insert customer data
				    var customerParams = [customerVisit.customerId, customerVisit.visitId, formattedVisitDate, userId, journeyId, customerVisit.title, customerVisit.firstName, customerVisit.middleName, customerVisit.lastName, customerVisit.addressLine1, customerVisit.addressLine2, customerVisit.addressLine3, customerVisit.addressLine4, customerVisit.postcode, customerVisit.city, customerVisit.dob, customerVisit.mobile, customerVisit.phone, customerVisit.email, customerVisit.journeyOrder, customerVisit.status, customerVisit.totalPaidAmount, customerVisit.totalTermAmount, customerVisit.paymentTypeId, customerVisit.paymentPerformance, customerVisit.customerRefNumber, customerVisit.collectionDay];
                                    tx.executeSql(dbQueries.insertIntoCustomerTableStatement, customerParams);
				    
			    	//insert agreement data
                                    agreementList = customerVisits[i].agreementList;
				    var agrListLength = agreementList.length;
				    for(j = 0; j < agrListLength; j++){
				    	agreement = agreementList[j];
						agreementIdList.push(agreement.agreementId);
				    	var agreementParams = [agreement.agreementId, agreement.customerId, agreement.agreementNumber, agreement.instalments, agreement.termAmount, agreement.settlementRebate, agreement.arrears, agreement.status, agreement.agreementStartDate, agreement.principal, agreement.totalPayableAmount, agreement.balance, agreement.elapsedWeek, agreement.reloanedFromAgreementID, agreement.previousFolioNumber, agreement.settlementAmount,agreement.aaIndicatorId,agreement.paymentFrequencyID];
				    	tx.executeSql(dbQueries.insertIntoAgreementTableStatement, agreementParams);	
				    }   
				}
			},dataStorage.errorInsert, dataStorage.successInsert);
    	}
    	else{
    		alert("No data to sync");
    	}
    },
    /****************************transaction error callback**************************/
    errorInsert: function() {
		   isSyncing = false; 
           alert("Error processing SQL");
    },
    /************************transaction success callback****************************/
    successInsert: function() {
           //alert("data inserted successfully!");
		   if(isSyncing){
							//alert("Syncing..Fetching Card Payment Data");
							cardPaymentService.getCardPaymentInformation();
						}
						else
						{
							//alert("Not Syncing");
		   console.log("Agreement Ids List "+agreementIdList.length);
		   transactionHistoryService.getTransactionHistory(agreementIdList);
						}
		  
           //common.redirect("dashboard.html");
    },
	
	
	/********************** insert retrieved data into offline DB Transaction History ***********************/
    insertIntoMtbTransactionHistoryDB: function(data){
    	console.log("insert");
    	var transactionsList = data.transactions;
    	console.log(transactionsList);
    	console.log(transactionsList.length);
    	
    	//Check if there is any data to insert
    	if (transactionsList.length > 0) {
    		
		var dbObj = dataStorage.initializeDB();
			dbObj.transaction(function insertTransactionHistoryRecords(tx){
			
		    	
                    for (var i = 0; i < transactionsList.length; i++) {
				    
				    
					  //insert customer data
				    var insertParams = [transactionsList[i].agreementId,transactionsList[i].transactionId,transactionsList[i].paidDate,transactionsList[i].weekNumber,transactionsList[i].status,transactionsList[i].amount,transactionsList[i].arrears];
                                    tx.executeSql(dbQueries.insertIntoMtbTransactionHistoryTableStatement, insertParams);
				    
			    	   
				}
			},dataStorage.errorInsert, dataStorage.successInsertIntoMtbTransactionHistory);
    	}
    	else{
    		alert("No data to sync");
    	}
    },
    
    /************************transaction success callback****************************/
    successInsertIntoMtbTransactionHistory: function() {
           //alert("data inserted successfully!");
           common.redirect("dashboard.html");
    },
    /**********************Check offline DB(WEB SQL)***********************/
    checkAgentTableInOfflineDB:function(dbObj){
        console.log("init");
        dbObj.transaction(
                function(tx){
                    tx.executeSql(dbQueries.selectAgentOfflineTable,[],function(tx, res){
                        rowCount = res.rows.item(0)["count(name)"];
                        console.log(rowCount);
                        //alert(rowCount);
                        if(rowCount == 1){
                            dbObj.transaction(
                                    function(tx){
                                        tx.executeSql(dbQueries.selectAgentMacIDStatement,[],function(tx,res){
                                            var agentMac = res.rows.item(0)["MacID"];
                                            //alert("macid"+agentMac);
                                            if(agentMac == dataStorage.getData(DEVICE_MACADDRESS)){
                                                //alert("match_found");
                                                var agentID = res.rows.item(0)["UserID"];
                                                //alert("userID"+agentID);
                                                dataStorage.setData(USER_ID, agentID);
                                            }
                                            else{
                                                common.redirect("userRegistration.html");
                                            }
                                            
                                        });
                                    });
                        }
                        else{
                            common.redirect("userRegistration.html");
                        }
                    });
                });
        
    },
    
    /*****************create Agent table in offline DB (WEB SQL)*******************/
    createAgentOfflineTable: function(){
    	console.log("create");
        var dbObj = dataStorage.initializeDB();
    	dbObj.transaction(
            function(tx) {
            	tx.executeSql(dbQueries.createMtbAgentTableStatement);
            });
    },
    
    /*******************************insert into offline Agent table on registration*******************/
    insertIntoAgentOfflineDB: function(uID, title, fn, mn, ln, mac, pin){
        
        dataStorage.createAgentOfflineTable();
        var dbObj = dataStorage.initializeDB();
        dbObj.transaction(function insertAgentRecord(tx){
            var insertParams = [uID, title, fn, mn, ln, mac, pin];
            tx.executeSql(dbQueries.insertIntoMtbAgentStatement, insertParams);
        },dataStorage.errorInsert, dataStorage.successInsertIntoMtbAgent);
        
    },
    
    /************************transaction success callback****************************/
    successInsertIntoMtbAgent: function() {
           console.log("data inserted successfully!");
           common.redirect("login.html");
           
    },
    /********************************Insert into offline card payment table************************/
    insertIntoMtbCardPayment: function(data){
    	console.log("insert card payment");
    	var cardPayments = data.cardPayments;
    	console.log(cardPayments);
    	console.log(cardPayments.length);
    	
    	//Check if there is any data to insert
    	if (cardPayments.length > 0) {	
		var dbObj = dataStorage.initializeDB();
			dbObj.transaction(function(tx){	
                    for (var i = 0; i < cardPayments.length; i++) {
                    	//insert customer data
                    	var insertParams = [dataStorage.getData(JOURNEY_ID),cardPayments[i].weekDate,cardPayments[i].cardPaymentAmount];
                                    tx.executeSql(dbQueries.insertIntoMtbCardPaymentStatement, insertParams);
				}
			},function errorInsert(){console.log("Error inserting card payment records");},
			function successInsert(){console.log("Success inserting card payment records");
					 //call function to initialize database
					//isSyncing = false;
					if(isSyncing)
					{
						syncData.getTransactionData();
					}
					else{
			        var dbObj = dataStorage.initializeDB();
			        dataStorage.checkDataInOfflineDB(dbObj);
					}
					
			        
			});
    	}
    	else{
			//isSyncing = false;
			if(isSyncing)
			{
				syncData.getTransactionData();
			}			
    		alert("No card payment data to sync");
    	}
    }
};