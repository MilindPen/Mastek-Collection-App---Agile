var m_CloseWeek,m_CloseWeek2;
var closeWeekTransCount = 0;
var selectedUserId = dataStorage.getData(USER_ID);
var weekStartDate = dataStorage.getData(WEEK_START_DATE);
var weekEndDate = dataStorage.getData(WEEK_END_DATE);
var journeyListLen=0;

var closeWeek = {
    
    isCallsClosed: function() {
        var dbObj = dataStorage.initializeDB();
		
		var params=[weekStartDate,weekEndDate,selectedUserId,weekStartDate,weekEndDate,selectedUserId,weekStartDate,weekEndDate,selectedUserId,weekStartDate,weekEndDate,weekStartDate,weekEndDate,selectedUserId,weekStartDate,weekEndDate,weekStartDate,weekEndDate,selectedUserId,weekStartDate,weekEndDate,weekStartDate,weekEndDate,weekStartDate,weekEndDate];
		
		var callsClosed,targetCalls;
		var isCallsClosed = true;
		var openCalls=0;
		var callsOpenErrorMessage="Calls are open for journey ";
		
		var openCallsJourney=[];
		
		dbObj.transaction(function(tx) {
            tx.executeSql(dbQueries.selectCloseWeekData,params,function(tx,res){
                var len = res.rows.length;
                if(len==0){
					console.log(len);
                }
                if(len > 0) {
					console.log("Fetched Data length "+len);
					
					//Check if calls are open
					for(var i=0; i<len; i++){
						callsClosed = res.rows.item(i)["CallsClosed"];
						targetCalls = res.rows.item(i)["TargetCalls"];
					
					//If calls closed in the week are less than the total target calls
						if(callsClosed != targetCalls){							//common.alertMessage(closeWeekMessage.callsOpenErrorMessage,callbackReturn,messageboxCommonMessages.messageTitleError);
						isCallsClosed = false;            
							openCallsJourney[openCalls]=res.rows.item(i)["JourneyDescription"];
							openCalls++;	
					}
                }
					if(openCalls > 0){
						var openJourneyList="";
						var openCallsLength=openCallsJourney.length;
						for(var i=0;i<openCallsLength;i++){
							openJourneyList =	openJourneyList + openCallsJourney[i] + ", ";
						}
						callsOpenErrorMessage = callsOpenErrorMessage + openJourneyList.substr(0, (openJourneyList.length - 2)) + ". Week cannot be closed."	
						common.alertMessage(callsOpenErrorMessage,callbackReturn,messageboxCommonMessages.messageTitleError);
        }
					else{	//If all the calls are closed
					
							//Check if there are any shorts/over
							var isBalancedZero = true;
							var message="";
							var weeklyBalance=[];
							var weekClosureCollections=[];
							var journeyDescription=[];
							var journeyID=[];
							for(var i=0; i<len; i++){
								journeyID[i] = res.rows.item(i)["JourneyID"];
								journeyDescription[i] = res.rows.item(i)["JourneyDescription"];
								weeklyBalance[i] = res.rows.item(i)["WeeklyBalance"];	
								weekClosureCollections[i] = res.rows.item(i)["WeekClosureCollections"];			
								
								if(weeklyBalance[i] < 0){ 
										message = message + "You are declaring an over of £" + common.convertToAmount(Math.abs(weeklyBalance[i])) +" for Journey "+ journeyDescription[i] 
										+". Please confirm to close the week.\n";
										//common.confirmMessage(message,closeWeekConfirmCallBack, messageboxBalance.messageTitleConfirm);
										isBalancedZero = false;            
								}
								else if(weeklyBalance[i] > 0){
										message = message + "You are declaring a short of £" + common.convertToAmount(Math.abs(weeklyBalance[i])) +" for Journey "+ journeyDescription[i] 
										+". Please confirm to close the week.\n";
										//common.confirmMessage(message,closeWeekConfirmCallBack, messageboxBalance.messageTitleConfirm);
										isBalancedZero = false;
								}
							}
							if(isBalancedZero == false){
								//common.confirmMessage(message,closeWeekConfirmCallBack, messageboxBalance.messageTitleConfirm);
								common.confirmMessage(message,function(buttonIndex){
									if(buttonIndex == 1){
									   var transactionRecorded = closeWeek.checkClosedWeekTransaction(journeyID,journeyDescription,weeklyBalance,weekClosureCollections);    
									}	
								}, messageboxBalance.messageTitleConfirm);
								
							}
							else{
								var transactionRecorded = closeWeek.checkClosedWeekTransaction(journeyID,journeyDescription,weeklyBalance,weekClosureCollections);    
							}
						}
					
					}

				});
			},function(){console.log("Error");}, function success(){console.log("Success");});
    },
			
    checkClosedWeekTransaction: function(journeyID,journeyDescription,weeklyBalance,weekClosureCollections){
        
			var dbObj = dataStorage.initializeDB();
            
			//execute SQL query
			dbObj.transaction(function(tx) {
                    
		journeyListLen = journeyID.length;
		for(var i=0; i<journeyListLen; i++){
			/***create transaction records start***/
			//Collections transaction
			var weekEndDate = dataStorage.getData(WEEK_END_DATE);
			var balanceAmount = weeklyBalance[i];
			var collectionsAmount = weekClosureCollections[i];
			var reference = "";
			var balanceTypeID = balanceType.Collections;
			var periodIndicator = balanceTransactionType.Week;
			var chequeIndicator = 0;
			var journeyId = journeyID[i];
			var isSynced = 0;
			var isDeleted = 0;
			  
			var balanceCloseWeekC = {
				WeekEndDate: weekEndDate,
				BalanceAmount: balanceAmount,
				CollectionAmount: collectionsAmount,
				Reference: reference,
				BalanceTypeID: balanceTypeID,
				PeriodIndicator: periodIndicator,
				ChequeIndicator: chequeIndicator,
				JourneyID: journeyId,
				IsSynced: isSynced,
				IsDeleted: isDeleted
            }
                
			//Shorts & Over transaction	   
			var weekEndDate = dataStorage.getData(WEEK_END_DATE);
			var balanceAmount = weeklyBalance[i];
			var collectionsAmount = null;
			var reference = "";
			var balanceTypeID = balanceType.ShortsandOvers;
			var periodIndicator = balanceTransactionType.Week;
			var chequeIndicator = 0;
			var journeyId = journeyID[i];
			var isSynced = 0;
			var isDeleted = 0;
                            
			var balanceCloseWeekS = {
				WeekEndDate: weekEndDate,
				BalanceAmount: balanceAmount,
				Reference: reference,
				BalanceTypeID: balanceTypeID,
				PeriodIndicator: periodIndicator,
				ChequeIndicator: chequeIndicator,
				JourneyID: journeyId,
				IsSynced: isSynced,
				IsDeleted: isDeleted
        }
			/***create transaction records end***/
    
			var inputparam1 = [balanceCloseWeekC.WeekEndDate,balanceCloseWeekC.CollectionAmount,balanceCloseWeekC.Reference,balanceCloseWeekC.BalanceTypeID,balanceCloseWeekC.PeriodIndicator,balanceCloseWeekC.ChequeIndicator,balanceCloseWeekC.IsSynced,balanceCloseWeekC.IsDeleted,balanceCloseWeekC.JourneyID];
                
			var inputparam2 = [balanceCloseWeekS.WeekEndDate,balanceCloseWeekS.BalanceAmount,balanceCloseWeekS.Reference,balanceCloseWeekS.BalanceTypeID,balanceCloseWeekS.PeriodIndicator,balanceCloseWeekS.ChequeIndicator,balanceCloseWeekS.IsSynced,balanceCloseWeekS.IsDeleted,balanceCloseWeekS.JourneyID];
        
            tx.executeSql(dbQueries.insertIntoMtbBalanceTransactionStatement, inputparam1);
            tx.executeSql(dbQueries.insertIntoMtbBalanceTransactionStatement, inputparam2);
                
                         
        
			//inputParam2 = [balanceCloseWeekS.BalanceTypeID,balanceCloseWeekS.WeekEndDate,balanceCloseWeekS.JourneyID];
        
			//var dbObj = dataStorage.initializeDB();
        
        //execute SQL query
			//dbObj.transaction(function(tx) {
                
			//});	
		} 
	},errorSQL, function successSQL() {
		syncData.initSync(true);  
		//closeWeekTransCount++;
		//if(closeWeekTransCount == journeyListLen){
                    
		//}
        });      
    },    
    
    insertClosedWeekTransaction: function(balanceCloseWeek,journeyListLen) {
              
		var dbObj = dataStorage.initializeDB();
		if(balanceCloseWeek.BalanceTypeID == 'C'){
			var inputparam = [balanceCloseWeek.WeekEndDate,balanceCloseWeek.CollectionAmount,balanceCloseWeek.Reference,balanceCloseWeek.BalanceTypeID,balanceCloseWeek.PeriodIndicator,balanceCloseWeek.ChequeIndicator,balanceCloseWeek.IsSynced,balanceCloseWeek.IsDeleted,balanceCloseWeek.JourneyID];
		}
		else if(balanceCloseWeek.BalanceTypeID == 'S'){
        var inputparam = [balanceCloseWeek.WeekEndDate,balanceCloseWeek.BalanceAmount,balanceCloseWeek.Reference,balanceCloseWeek.BalanceTypeID,balanceCloseWeek.PeriodIndicator,balanceCloseWeek.ChequeIndicator,balanceCloseWeek.IsSynced,balanceCloseWeek.IsDeleted,balanceCloseWeek.JourneyID];
		}
		
        dbObj.transaction(function insertClosedWeekTransactionRecord(tx){    
            tx.executeSql(dbQueries.insertIntoMtbBalanceTransactionStatement, inputparam,function(tx, results) {
                        var lastInsertId = results.insertId;
                    });
            },errorSQL, successSQL(journeyListLen));
       
    },  
    
    updateClosedWeekTransaction: function(balanceCloseWeek,journeyListLen) {
        
        var dbObj = dataStorage.initializeDB();
        var IsSynced = 0;
		
        if(balanceCloseWeek.BalanceTypeID == 'C'){
			var inputparam1 = [balanceCloseWeek.CollectionAmount,IsSynced,balanceCloseWeek.WeekEndDate,balanceCloseWeek.BalanceTypeID,balanceCloseWeek.JourneyID];
			dbObj.transaction(function updateTransactionRecords(tx){
				tx.executeSql(dbQueries.updateCloseWeekTransactionIntoMtbBalance, inputparam1);
			},errorSQL, successSQL(journeyListLen));
		}
		else if(balanceCloseWeek.BalanceTypeID == 'S'){
			var inputparam2 = [balanceCloseWeek.BalanceAmount,IsSynced,balanceCloseWeek.WeekEndDate,balanceCloseWeek.BalanceTypeID,balanceCloseWeek.JourneyID];
        dbObj.transaction(function updateTransactionRecords(tx){
				tx.executeSql(dbQueries.updateCloseWeekTransactionIntoMtbBalance, inputparam2);
			},errorSQL, successSQL(journeyListLen));
		}
    },
    
    wipeOutDatabase: function() {
        
        console.log("wipe out database");
        
        var dbObj = dataStorage.initializeDB();
    	dbObj.transaction(
            function(tx) {
            	tx.executeSql(dbQueries.deleteRecordsFrom_mtbAgreement);
                tx.executeSql(dbQueries.deleteRecordsFrom_mtbBalanceTransaction);
				tx.executeSql(dbQueries.deleteRecordsFrom_mtbCardPayment);
				tx.executeSql(dbQueries.deleteRecordsFrom_mtbCustomer);
				tx.executeSql(dbQueries.deleteRecordsFrom_mtbCustomerUpdate);
				tx.executeSql(dbQueries.deleteRecordsFrom_mtbTransaction);
                tx.executeSql(dbQueries.deleteRecordsFrom_mtbTransactionHistory);
				tx.executeSql(dbQueries.deleteRecordsFrom_mtbJourney);
                tx.executeSql(dbQueries.deleteRecordsFrom_sqlite_sequence);
                tx.executeSql(dbQueries.deleteRecordsFrom_mtbSDTWeek);
                                
            },wipeDBFailed, wipeDBSuccess);
    }
    
}

function wipeDBSuccess() {
   
    common.alertMessage(closeWeekMessage.closeWeekSuccessfully,callbackReturn,messageboxCommonMessages.messageTitleSuccess);
    
    window.localStorage.clear();      //User logoff
    service.getSDTWeek();    
}

function wipeDBFailed() {
    common.alertMessage(closeWeekMessage.closeWeekSystemError,callbackReturn,messageboxCommonMessages.messageTitleError);
    
    window.localStorage.clear();      //User logoff
    service.getSDTWeek();    
}

function errorSQL() {
    	common.alertMessage(messageboxOfflineDataSave.messageError,callbackReturn,messageboxCommonMessages.messageTitleError);   
}
    
/************************transaction success callback****************************/
function successSQL(journeyListLen) {
	closeWeekTransCount++;
	if(closeWeekTransCount == journeyListLen){
           syncData.initSync(true);            
}
	else{
		return;
	}
}

function closeWeekConfirmCallBack(buttonIndex){
	
    if(buttonIndex == 1){
        var transactionRecorded = closeWeek.checkClosedWeekTransaction(m_CloseWeek,m_CloseWeek2);    
    }
	  
}