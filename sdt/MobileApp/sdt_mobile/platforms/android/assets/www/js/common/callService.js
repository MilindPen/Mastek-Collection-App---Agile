var startEndDates=[];
var customerVisits = [];
var agreementList = [];
var weekDays = common.calcWeekDays();
startEndDates = common.calcStartEndDates(weekDays[0],weekDays[1]);
dataStorage.setData(WEEK_START_DATE,startEndDates[0]);
dataStorage.setData(WEEK_END_DATE,startEndDates[1]);
var startDate = startEndDates[0];
var endDate = startEndDates[1];
var selectedJourneyId = dataStorage.getData(JOURNEY_ID);

/**************************************Agent Verification and Registration services***************************/

var validateNewUser = {
    
		/***********************************service call to validate new user*****************************/
    getUser:function(userid, surname, mac){
        
        var newUserJSONReq = {
                                "access": {
                                            "userId": userid,
                                            "userType": "Agent"
                                          },

                                "surname": surname,
                                "macid": mac
                             };
                             
        console.log(newUserJSONReq);
        console.log("Sending request to verify user details");
        
        $.ajax({
                    type: 'POST',
	            url: SECURITY_SYNC_URL + "/security/user/verification",
	            contentType: "application/json",
	            dataType:"json",
	            timeout: 180000,  //180 sec
	            data: JSON.stringify(newUserJSONReq),
	            success:function (data) {
	            	if(data.success===false){
                                if(data.errorCode == "ERR-203"){
                                    common.alertMessage(messageboxUserRegPage.checkNotSdtUser, callbackReturn, messageboxUserRegPage.messageTitleError);
                                }
                                if(data.errorCode == "ERR-204"){
                                	var message = data.errorCode+": "+data.errorMessage;
                                    common.alertMessage(message, callbackReturn, messageboxUserRegPage.messageTitleError);
                                }
                                console.log(data.errorMessage);
                                $("input#surname").val("");
                                $("input#user-id").val("");
                                $("input#user-id").focus();
	            	}
	            	else{
                                console.log("req obj:"+JSON.stringify(newUserJSONReq));
		            	console.log(data);
                                console.log(JSON.stringify(data));
                                //alert(JSON.stringify(data));
                                var agentData = JSON.parse(JSON.stringify(data));
		            	//alert(agentData);
                                if(agentData.user.pin){
                                	var encryptedPass = CryptoJS.AES.encrypt(agentData.user.pin.toString(), KEY);
                                	dataStorage.insertIntoAgentOfflineDB(parseInt(agentData.user.userId), agentData.user.title, agentData.user.firstName, agentData.user.middleName, agentData.user.lastName, agentData.user.macAddress, encryptedPass);

                                }
                                else{
                                    dataStorage.setData(USERREG_AGENT_DATA, JSON.stringify(agentData.user));
                                    common.redirect("userRegistrationConfirm.html");
                                }
                                //else{
                                    //alert("Invalid userid or surname. Try again.");
                                //    message = "Invalid userid or surname. Try again.";
                                //    MessageBox(message);
                                //    $("input#surname").val("");
                                //    $("input#user-id").val("");
                                //    $("input#user-id").focus();
                                //}
	            	}
	            },
	            error: function(x, t, m) {
	                alert("Error connecting to security server");
	                if(t==="timeout") {
	                    alert("timeout");
	                } else {
	                    //alert(t);
	                }
	            }
	        });
    
    },

    //    /***********************************service call to register new user*****************************/
    sendNewRegistrationToDatabase: function(userid, title, fname, mname, lname, mac, pin,encryptedPass){
        var newUserRegistrationJSONReq = {
                                "access": {
                                            "userId": userid,
                                            "userType":"Agent"
                                            
                                          },

                                "mac": mac,
                                "pin": pin
                             };
                             
            console.log(newUserRegistrationJSONReq);
            console.log("Sending request to register new user");
        
            $.ajax({
                type: 'POST',
	            url: SECURITY_SYNC_URL + "/security/user/registration",
	            contentType: "application/json",
	            dataType:"json",
	            timeout: 180000,  //180 sec
	            data: JSON.stringify(newUserRegistrationJSONReq),
                    success:function (data){
                    	if(data.success===false){
    	            		var message = data.errorCode+": "+data.errorMessage;
    	            		common.alertMessage(message,callbackReturn, callbackReturn, messageboxCallService.messageTitleError);
                            console.log("Data insertion error");
                        }
                        else{
                            console.log(data);
                            //alert(data);
                            common.alertMessage(messageboxUserRegConfirmPage.registrationSuccess, callbackReturn, messageboxUserRegConfirmPage.messageTitleSuccess);
                            dataStorage.insertIntoAgentOfflineDB(parseInt(userid), title, fname, mname, lname, mac, encryptedPass);
                        }  
                    },
                    error: function(x, t, m) {
	                alert("Error connecting to security server");
	                if(t==="timeout") {
	                    alert("timeout");
	                } else {
	                    //alert(t);
	                }
	            }
            });
    
    }
    
};


var service = {
		
		/***********************************service call to get the scheduled customer list********************************/
		getCustomerInformation: function(){
			console.log("customer service called");
			var selectedUserId = dataStorage.getData(USER_ID);
			var selectedJourneyId = dataStorage.getData(JOURNEY_ID);
			
			var custJSONReq = {
					  "access": {
						"userId": selectedUserId,
						"userType":userType.USER1
					  },
					  "startDate": startDate,
					  "endDate": endDate,
					  "journeyId": selectedJourneyId
					};
			console.log(custJSONReq);
			console.log("service");
	    	$.ajax({
                    type: 'POST',
	            url: CUSTOMER_SYNC_URL + "/customers/scheduled",
	            contentType: "application/json",
	            dataType:"json",
	            timeout: 180000,  //180 sec
	            data: JSON.stringify(custJSONReq),
	            success:function (data) {
	            	if(data.success===false){
	            		var message = data.errorCode+": "+data.errorMessage;
	            		common.alertMessage(message,callbackReturn,messageboxCallService.messageTitleError);
	            		//alert(data.errorCode+": "+data.errorMessage);
	            	}
	            	else{
	            		//console.log("req obj:"+JSON.stringify(custJSONReq));
		            	console.log(data);
						if(isSyncing){
							//alert("Syncing");
							dataStorage.deleteDataFromTables();
							dataStorage.insertIntoOfflineDB(data);
						}
						else
						{
							//alert("Not Syncing");
		            	                         dataStorage.insertIntoOfflineDB(data);
	            	                        }
	            	}
	            },
	            error: function(x, t, m) {
					isSyncing = false; 
	                alert("Error connecting to customer server");
	                if(t==="timeout") {
	                    alert("timeout");
	                } else {
	                    //alert(t);
	                }
	            }
	        });
	    }
};


var transactionHistoryService = {
		
		/***********************************service call to get transaction history of customer********************************/
		getTransactionHistory: function(agreementIdsList){
			var agreementIdList = agreementIdsList;
			var selectedUserId = dataStorage.getData(USER_ID);
			var selectedJourneyId = dataStorage.getData(JOURNEY_ID);
			
			var InputJSON = {
						  "access": {
							"userId": selectedUserId,
							"userType":userType.USER1
						  },
					   "startDate": startDate,
					   "endDate": endDate,
					   "journeyId": selectedJourneyId
					};
					
					
			console.log(InputJSON);
			console.log("Calling Transaction History service");
			console.log(TRANSACTION_SYNC_URL + "/transactions/history");
	    	$.ajax({
                    type: 'POST',
	            url: TRANSACTION_SYNC_URL + "/transactions/history",  
				contentType: "application/json",
	            dataType:"json",
	            timeout: 250000,  //250 sec
	            data: JSON.stringify(InputJSON),
	            success:function (data) {
	            	if(data.success===false){
	            		var message = data.errorCode+": "+data.errorMessage;
	            		common.alertMessage(message,function(){common.redirect("dashboard.html")}(),messageboxCallService.messageTitleError);
						//common.redirect("dashboard.html");
	            	}
	            	else{
	            		//console.log("req obj:"+JSON.stringify(InputJSON));
		            	console.log(data);
		            	dataStorage.insertIntoMtbTransactionHistoryDB(data);
	            	}
	            },
	            error: function(x, t, m) {
	                alert("Error connecting to transaction server");
	                if(t==="timeout") {
	                    alert("timeout");
	                } else {
	                    //alert(t);
	                }
	            }
	        });
	    }
};

var cardPaymentService = {
	getCardPaymentInformation: function(){
		//var userId = $('#userId').val();
        //var journeyId = $('#journeyId').val();
        //dataStorage.setData(USER_ID,userId);
        //dataStorage.setData(JOURNEY_ID,journeyId);
       
		var selectedUserId = dataStorage.getData(USER_ID);
		var selectedJourneyId = dataStorage.getData(JOURNEY_ID);
		var cardPayJSONReq = {
				"access": 
					{
					"userId": selectedUserId,
					"userType":userType.USER1
				  },
				  "startDate": startDate,
				  "endDate": endDate,
				  "journeyID": selectedJourneyId
				};
		console.log(JSON.stringify(cardPayJSONReq));
		console.log("Calling Card Payment Service");
		console.log(TRANSACTION_SYNC_URL + "/transactions/card/payments");
    	$.ajax({
            type: 'POST',
            url: TRANSACTION_SYNC_URL + "/transactions/card/payments",  
			contentType: "application/json",
            dataType:"json",
            timeout: 180000,  //250 sec
            data: JSON.stringify(cardPayJSONReq),
            success:function (data) {
            	if(data.success===false){
            		var message = data.errorCode+": "+data.errorMessage;
            		common.alertMessage(message,callbackReturn,messageboxCallService.messageTitleError);
					//common.redirect("dashboard.html");
            	}
            	else{
            		//console.log("req obj:"+JSON.stringify(InputJSON));
	            	console.log(data);
	            	dataStorage.insertIntoMtbCardPayment(data);
            	}
            },
	    	 error: function(x, t, m) {
				isSyncing = false; 
	             alert("Error connecting to card payment server");
	             if(t==="timeout") {
	                 alert("timeout");
	             } else {
	                 //alert(t);
	             }
	         }
    	});
	}
};

var syncTransactionService = {

		/***********************************service call to post transaction for sync********************************/
		postSyncData: function(transactionDetailsList){
			//var agreementIdList = agreementIdsList;
			var selectedUserId = dataStorage.getData(USER_ID);
			
			var InputJSON = {
						  "access": {
							"userId": selectedUserId,
							"userType":userType.USER1
						  },
					   //"transactionRequest": {
							"transactionDetails": transactionDetailsList
						//  }
					};
					
					
			console.log(JSON.stringify(InputJSON));
			console.log("Calling Sync service");
			console.log(TRANSACTION_SYNC_URL + "/transactions/sync");
	    	$.ajax({
                    type: 'POST',
	            url: TRANSACTION_SYNC_URL + "/transactions/sync",  
				contentType: "application/json",
	            dataType:"json",
	            timeout: 25000,  //250 sec
	            data: JSON.stringify(InputJSON),
	            success:function (data) {
	            	/*if(data.errorMessage){
	            		alert(data.errorMessage);
						//common.redirect("dashboard.html");
	            	}
	            	else{
	            		//console.log("req obj:"+JSON.stringify(InputJSON));
		            	console.log(data);
				        syncData.updateTransactionTableInDB();
		            	//dataStorage.insertIntoMtbTransactionHistoryDB(data);
	            	}*/
					
					if(data.success != true){
	            		alert(data.errorCode+" : "+data.errorMessage);
						//common.redirect("dashboard.html");
	            	}
	            	else{
	            		//console.log("req obj:"+JSON.stringify(InputJSON));
		            	console.log(data);
						syncData.updateTransactionTableInDB();
		            	//dataStorage.insertIntoMtbTransactionHistoryDB(data);
	            	}
	            },
	            error: function(x, t, m) {
					isSyncing = false;
	                //alert("Unable to complete Sync. Please try again at a later time. In case this recurs, contact the HelpDesk.");
					common.alertMessage(messageboxSync.errorSync,callbackReturn, messageboxSync.messageTitleError);
	                if(t==="timeout") {
	                    alert("timeout");
	                } else {
	                    //alert(t);
	                }
	            }
	        });
	    }

};

$(document).ajaxSend(function(event, request, settings) {
	$('#loading-indicator').show();
	$('#disablingDiv').show();
});

$(document).ajaxComplete(function(event, request, settings) {
	$('#loading-indicator').hide();
	$('#disablingDiv').hide();
});
