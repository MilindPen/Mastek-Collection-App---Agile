var rowCount;

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
    				tx.executeSql(selectFromCustomerTable,[],function(tx, res){
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
            	tx.executeSql(createCustomerTableStatement);
                tx.executeSql(createAgreementTableStatement);
				tx.executeSql(createMtbTransactionHistory);
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
            	tx.executeSql(dropCustomerTableStatement);
                tx.executeSql(dropAgreementTableStatement);
				tx.executeSql(dropMtbTransactionHistoryTableStatement);
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
				    var customerParams = [customerVisit.customerId, formattedVisitDate, userId, journeyId, customerVisit.title, customerVisit.firstName, customerVisit.middleName, customerVisit.lastName, customerVisit.addressLine1, customerVisit.addressLine2, customerVisit.addressLine3, customerVisit.addressLine4, customerVisit.postcode, customerVisit.city, customerVisit.dob, customerVisit.mobile, customerVisit.phone, customerVisit.email, customerVisit.journeyOrder, customerVisit.status, customerVisit.totalPaidAmount, customerVisit.totalTermAmount, customerVisit.paymentTypeId, customerVisit.paymentPerformance, customerVisit.customerRefNumber, customerVisit.collectionDay];
                                    tx.executeSql(insertIntoCustomerTableStatement, customerParams);
				    
			    	//insert agreement data
                                    agreementList = customerVisits[i].agreementList;
				    var agrListLength = agreementList.length;
				    for(j = 0; j < agrListLength; j++){
				    	agreement = agreementList[j];
				    	var agreementParams = [agreement.agreementId, agreement.customerId, agreement.agreementNumber, agreement.instalments, agreement.termAmount, agreement.settlementRebate, agreement.arrears, agreement.status, agreement.agreementStartDate, agreement.principal, agreement.totalPayableAmount, agreement.balance, agreement.elapsedWeek, agreement.reloanedFromAgreementID, agreement.previousFolioNumber, agreement.settlementAmount];
				    	tx.executeSql(insertIntoAgreementTableStatement, agreementParams);	
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
           alert("Error processing SQL");
    },
    /************************transaction success callback****************************/
    successInsert: function() {
           //alert("data inserted successfully!");
           common.redirect("dashboard.html");
    }
};
