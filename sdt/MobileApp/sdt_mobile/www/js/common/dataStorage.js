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
        		common.getSDTWeek();
                //common.redirect("dashboard.html");
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
				tx.executeSql(dbQueries.createMtbBalanceTransaction);
                tx.executeSql(dbQueries.createMtbCustomerUpdate);
                //tx.executeSql(dbQueries.createMtbSDTWeek);
				tx.executeSql(dbQueries.createMtbJourney);
            },
            this.txErrorHandler,
            function() {
                //logging required successfully table got created 
            	service.getCustomerInformation();
            	//service.getSDTWeek();
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
				tx.executeSql(dbQueries.dropMtbBalanceTransactionStatement);
				tx.executeSql(dbQueries.dropMtbCustomerUpdateTableStatement);
				//tx.executeSql(dbQueries.dropMtbSDTWeekTableStatement);
				tx.executeSql(dbQueries.createMtbJourney);
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
		tx.executeSql(dbQueries.deleteDataJourneyTbl);
				
            },
            this.txErrorHandler,
            function() {
                //logging required successfully table got created 
            	
            }
        );
    },
	deleteDataFromCardPaymentTables: function(){
        var dbObj = dataStorage.initializeDB();
    	console.log("Delete From CardPayment Tables");
    	dbObj.transaction(
            function(tx) {
            	tx.executeSql(dbQueries.deleteDataCardPaymentTbl);
            },
            this.txErrorHandler,
            function() {
                //logging required successfully table got created 
            	
            }
        );
    },
    /**********************insert retrieved SDT week data into offline DB***********************/
    insertIntoMtbSDTWeek: function(data){
    	//create SDTWeek table in offline db
    	dataStorage.createMtbSDTWeekTable();
    	var week = data.Week;
    	//Check if there is any data to insert
    	console.log("week start date"+week.startDate);
    	console.log("week end date"+week.endDate);
    	
    	//format week dates
	    var weekStartDate = formatDate.fromServiceToDB(week.startDate);
	    var weekEndDate = formatDate.fromServiceToDB(week.endDate);
	    
    	dataStorage.setData(WEEK_START_DATE,weekStartDate);
    	dataStorage.setData(WEEK_END_DATE,weekEndDate);
    	
		var dbObj = dataStorage.initializeDB();
		dbObj.transaction(function(tx){
			var weekParams = [week.weekNumber,week.yearNumber,weekStartDate,weekEndDate];
	    	tx.executeSql(dbQueries.insertIntoMtbSDTWeekStatement, weekParams);
		},function insertIntoMtbSDTWeekErr(){console.log("error");},function insertIntoMtbSDTWeekSuccess(){
													console.log("success");
													//service.getCustomerInformation(); DS
													common.redirect("login.html");
											   });
    	
    },
    /**********************insert retrieved customer data into offline DB***********************/
    insertIntoOfflineDB: function(data){
    	console.log("insert");
    	customerVisits = data.customerVisits;
    	journey = data.journey;
    	console.log(customerVisits);
    	console.log(customerVisits.length);
    	console.log("Journey id "+journey.journeyId);
    	console.log("Journey desc "+journey.journeyDescription);
    	//Check if there is any data to insert
    	if (customerVisits.length > 0) {
    		dataStorage.setData(CUSTOMER_VISITS_OBJ,JSON.stringify(customerVisits));
		var dbObj = dataStorage.initializeDB();
			dbObj.transaction(function insertCustRecords(tx){
			var userId = dataStorage.getData(USER_ID);
		    	//var journeyId = dataStorage.getData(JOURNEY_ID);
		    	var customerVisits = JSON.parse(dataStorage.getData(CUSTOMER_VISITS_OBJ));
		    	var custListLength = customerVisits.length;
		    	var customerVisit,agreement,visitDate,formattedVisitDate;
		    	
		    	//insert journey id in mtbUser table
		    	var JourneyUserParam = [journey.journeyId,journey.journeyDescription];
		    	tx.executeSql(dbQueries.updateJourneyIdIntoMtbUserStatement,JourneyUserParam);
				
				if(!isSyncing)
				{
					dataStorage.setData(JOURNEY_ID,journey.journeyId);
					dataStorage.setData(IS_SELECTED_JOURNEY_PRIMARY,1);
					
				}
		    	//dataStorage.setData(JOURNEY_ID,journey.journeyId);
				//Set primaryJourneyID in session
				dataStorage.setData(PRIMARY_JOURNEY_ID,journey.journeyId);
		    	dataStorage.setData(JOURNEY_DESCRIPTION,journey.journeyDescription);
				
				console.log("journey.journeyAgentStartDate "+journey.journeyAgentStartDate);
				//insert User branchId,Primary Journey Start and End Date in mtbUser table
		    	var UserParam = [journey.branchId,journey.journeyAgentStartDate,journey.journeyAgentEndDate];
		    	tx.executeSql(dbQueries.updateUserInfoIntoMtbUserStatement,UserParam);
		    	dataStorage.setData(LOGGEDINUSER_BRANCH_ID,journey.branchId);
				dataStorage.setData(JOURNEYAGENT_STARTDATE,journey.journeyAgentStartDate);
				dataStorage.setData(JOURNEYAGENT_ENDDATE,journey.journeyAgentEndDate);
		    	
		    	
                    for (var i = 0; i < custListLength; i++) {
				    customerVisit = customerVisits[i];
				    
				    //format visit date
				    visitDate = (customerVisits[i].visitDate).toString().split("-");
				    var date = (visitDate[2]).toString().split(" ");
				    formattedVisitDate = visitDate[0]+"-"+visitDate[1]+"-"+date[0];
		            var primaryAgentName = customerVisit.primaryAgentFirstName + " " + customerVisit.primaryAgentLastName;
                    
					//insert customer data in mtbCustomer
				    var customerParams = [customerVisit.customerId, customerVisit.visitId, formattedVisitDate, userId, customerVisit.journeyId, customerVisit.title, customerVisit.firstName, customerVisit.middleName, customerVisit.lastName, customerVisit.addressLine1, customerVisit.addressLine2, customerVisit.addressLine3, customerVisit.addressLine4, customerVisit.postcode, customerVisit.city, customerVisit.dob, customerVisit.mobile, customerVisit.phone, customerVisit.email, customerVisit.journeyOrder, customerVisit.status, customerVisit.totalPaidAmount, customerVisit.totalTermAmount, customerVisit.paymentTypeId, customerVisit.paymentPerformance, customerVisit.customerRefNumber, customerVisit.collectionDay, customerVisit.atRisk, customerVisit.vulnerable, customerVisit.journeyDescription, customerVisit.primaryAgent, primaryAgentName];
                                    tx.executeSql(dbQueries.insertIntoCustomerTableStatement, customerParams);
				   					
			    	//insert agreement data in mtbAgreement
                                    agreementList = customerVisits[i].agreementList;
				    var agrListLength = agreementList.length;
				    for(j = 0; j < agrListLength; j++){
				    	agreement = agreementList[j];
						agreementIdList.push(agreement.agreementId);
				    	var agreementParams = [agreement.agreementId, agreement.customerId, agreement.agreementNumber, agreement.instalments, agreement.termAmount, agreement.settlementRebate, agreement.arrears, agreement.status, agreement.agreementStartDate, agreement.principal, agreement.totalPayableAmount, agreement.balance, agreement.elapsedWeek, agreement.reloanedFromAgreementID, agreement.previousFolioNumber, agreement.settlementAmount,agreement.aaIndicatorId,agreement.paymentFrequencyID, agreement.settledDate];
				    	tx.executeSql(dbQueries.insertIntoAgreementTableStatement, agreementParams);	
				    }   
				}
				
				//Insert into offline Journey table
				tx.executeSql(dbQueries.insertIntoMtbJourneyStatement,[journey.journeyId,journey.journeyDescription]);	
				
				//Determine Primary journey and update journey table
				var isPrimaryJourney = 1;
				var journeyParams = [isPrimaryJourney];
				tx.executeSql(dbQueries.updateMtbJourneyIsPrimary,journeyParams);	
				
			},dataStorage.errorInsert, dataStorage.successInsert);
    	}
    
    },
    /****************************transaction error callback**************************/
    errorInsert: function() {
		   isSyncing = false; 
		   common.alertMessage(messageboxOfflineDataSave.messageError, callbackReturn, messageboxOfflineDataSave.messageTitleError);
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
    	else
    	{
    		transactionDataRestoreService.restoreTransactionData();
    	}
    	
    },
    
    /************************transaction success callback****************************/
    successInsertIntoMtbTransactionHistory: function() {
           //alert("data inserted successfully!");
           //common.redirect("dashboard.html");
		   
		   //check if there is data in transaction table
		   
		   //dataStorage.checkDataInTransactionTable();
		   
		   //Call Backup Service
				transactionDataRestoreService.restoreTransactionData();
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
                                                $('#loginPage').css('display','block');
                                            }
                                            else{
                                                common.redirect("userRegistration.html");
                                            }
                                            
                                        });
                                       
                                        //get journey id
                                        tx.executeSql(dbQueries.selectJourneyFromMtbUserStatement,[],function(tx,res){
                                            var journeyId = res.rows.item(0)["JourneyId"];
                                            var journeyDescription = res.rows.item(0)["JourneyDescription"];
                                                dataStorage.setData(JOURNEY_ID, journeyId);
                                                dataStorage.setData(JOURNEY_DESCRIPTION, journeyDescription);
                                        });
										
										
										//get branchid, journey startDate and EndDate
                                        tx.executeSql(dbQueries.selectUserInfoFromMtbUserStatement,[],function(tx,res){
                                            var branchId = res.rows.item(0)["BranchId"];
                                            var journeyAgentStartDate = res.rows.item(0)["PrimaryJourneyStartDate"];
											var journeyAgentEndDate = res.rows.item(0)["PrimaryJourneyEndDate"];
                                                dataStorage.setData(LOGGEDINUSER_BRANCH_ID,branchId);
												dataStorage.setData(JOURNEYAGENT_STARTDATE,journeyAgentStartDate);
												dataStorage.setData(JOURNEYAGENT_ENDDATE,journeyAgentEndDate);
												
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
    /*****************create SDTWeek table in offline DB*******************/
    createMtbSDTWeekTable: function(){
    	console.log("create week table");
        var dbObj = dataStorage.initializeDB();
    	dbObj.transaction(
            function(tx) {
            	tx.executeSql(dbQueries.createMtbSDTWeek);
            });
    },
    /*******************************insert into offline Agent table on registration*******************/
    insertIntoAgentOfflineDB: function(uID, title, fn, mn, ln, mac, pin, isActive){
        
        dataStorage.createAgentOfflineTable();
        var dbObj = dataStorage.initializeDB();
        dbObj.transaction(function insertAgentRecord(tx){
			var ShowOnLogin = 1;
            var insertParams = [uID, title, fn, mn, ln, mac, pin, isActive,ShowOnLogin];
            tx.executeSql(dbQueries.insertIntoMtbAgentStatement, insertParams);
        },dataStorage.errorInsert, dataStorage.successInsertIntoMtbAgent(isActive));
        
    },
    
    /************************transaction success callback****************************/
    successInsertIntoMtbAgent: function(isActive) {
           console.log("data inserted successfully!");
           //common.redirect("login.html"); DS
           //call SDTWeek service
           dataStorage.setData(IS_USER_LOCKED,isActive);
           service.getSDTWeek();
           
    },
    /*********************************Update mtbUser table if user is locked******************************/
    updateMtbUserTable: function(isLocked){
    	try{
    		var dbObj = dataStorage.initializeDB();
            dbObj.transaction(function updateUserTable(tx){
                var params = [isLocked];
                tx.executeSql(dbQueries.updateMtbUserTableStatement, params);
            },function errorUpdate(){},function successUpdate(){
            								dataStorage.setData(IS_USER_LOCKED,isLocked);
            						   });
    	}
    	catch(e){
    		console.log("Error updating MtbUserTable");
    	}
    	
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
					//tx.executeSql(dbQueries.deleteDataCardPaymentTbl);
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
			//common.alertMessage(messageboxSync.noCardPaymentData, callbackReturn, messageboxSync.messageTitleError);
    		
    	}
						 },
						 
						 
		/**********************check data in transaction table********************/
    checkDataInTransactionTable:function(){
    	console.log("getting count in transaction table");
    	var dbObj = dataStorage.initializeDB();
    	dbObj.transaction(
    			function(tx){
    				tx.executeSql(dbQueries.selectFromTransactionTable,[],function(tx, res){
    					rowCount = res.rows.item(0)["COUNT(*)"];
    					console.log("transaction table "+rowCount);
    				});
    			},dataStorage.errorCount,dataStorage.successCount);
    },
    errorCount: function(){
		console.log("Error initializing database");
		console.log("Database or table does not exists");
                
    },
    successCount: function(){
        console.log("Success initializing database");
        if(rowCount == 0){
        		//Call Backup Service
				transactionDataRestoreService.restoreTransactionData();
        }

        
    },
	
	/**********************insert retrieved customer data into offline DB***********************/
    restoreDataIntoOfflineDB: function(data){
    	console.log("insert");
    	var transactionData = data.transactions;
		var balanceTransactionData= data.balanceTransactions;
    	
    	
		var dbObj = dataStorage.initializeDB();
			dbObj.transaction(function (tx){
			
                    for (var i = 0; i < transactionData.length; i++) {
				    
				    
                     //insert transaction data in mtbTransaction
					 
							var transactionParams = [transactionData[i].VisitID,transactionData[i].CustomerID,transactionData[i].ResultID,transactionData[i].ResultDate,transactionData[i].ResultStatusID,transactionData[i].VisitStatusID,transactionData[i].AgreementID,transactionData[i].AgreementAmountPaid,transactionData[i].AgreementMode,"","",1,transactionData[i].journeyId];
                           
						   tx.executeSql(dbQueries.insertIntoMtbTransactionTableStatement, transactionParams);
				    }
					
			    	//insert balanceTransaction data in mtbBalanceTransaction
					
                    var balanceDate;
					var ChequeIndicator;
					var balanceId;
				    for(var j = 0; j < balanceTransactionData.length; j++){
					
						 balanceId = (balanceTransactionData[j].balanceId).substr(10);
						 console.log("balanceId Restoring "+balanceId);
				    	 balanceDate = (balanceTransactionData[j].balanceDate).toString().split(" ")[0];
						
						/*if(balanceTransactionData[j].chequeIndicator == "false")
						{
							ChequeIndicator = 0;
						}
						else if(balanceTransactionData[j].chequeIndicator == "true")
						{
							ChequeIndicator = 1;
						}*/
						
				    	var inputparam = [parseInt(balanceId),balanceDate,balanceTransactionData[j].amount,balanceTransactionData[j].reference,balanceTransactionData[j].balanceTypeId,balanceTransactionData[j].periodIndicator,balanceTransactionData[j].chequeIndicator,1,0,balanceTransactionData[j].journeyId];
				    	tx.executeSql(dbQueries.restoreMtbBalanceTransactionStatement, inputparam);	
				    }   
				
			},dataStorage.errorRestore, dataStorage.successRestore);
    	
    
    },
    /****************************transaction error callback**************************/
    errorRestore: function() {
		   
		   common.alertMessage(messageboxOfflineDataSave.messageError, callbackReturn, messageboxOfflineDataSave.messageTitleError);
    },
    /************************transaction success callback****************************/
    successRestore: function() {
	//alert("Success");
          dataStorage.getTransactionDataInAgreement();
           //common.redirect("dashboard.html");
						 },
						 
	
	//Get Transaction Data after Sync and UPdate Agreement table
	getTransactionDataInAgreement: function(){
        
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
						tx.executeSql(dbQueries.updateAgreementTableStatement, param);
						//dataStorage.updateAgreementTableInDB(param);
					}
					
                }

            });
        },dataStorage.errorInsert,function(){common.checkPreferenceOnLogin();});
    },
	/**********************update Agreement table into offline DB***********************/
    updateAgreementTableInDB: function(inputData){
    	console.log("Updating...");
    	
		var dbObj = dataStorage.initializeDB();
			dbObj.transaction(function updateAgreementRecords(tx){
					tx.executeSql(dbQueries.updateAgreementTableStatement, inputData);
			},dataStorage.errorInsert, function(){console.log("data updated successfully")});
    	
    	
    },
	errorInsert: function() {
           common.alertMessage(messageboxOfflineDataSave.messageError,callbackReturn,messageboxOfflineDataSave.messageTitleError);
						 }

						
						 

};