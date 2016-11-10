var loggedInUserId = session.getData(LOGGEDIN_USER_ID);
var loggedInUserType = session.getData(LOGGEDIN_USER_TYPE);

var service = {
	getWeekSelectionData: function(userid,userType,criteriaDate,callback){
		var JSONReq = {
						"access": {
									"userId": loggedInUserId,
	                                "userType": loggedInUserType
									
								  },
						"criteriaDate": criteriaDate
					 };
	                             
	            console.log(JSONReq);
	            console.log("Sending request to get week selection data");
	        
	            $.ajax({
	                type: 'POST',
		            url: BALANCING_SYNC_URL + GET_WEEK_URL,
		            contentType: "application/json",
					beforeSend: function (xhr) {
						xhr.setRequestHeader(SUBSCRIPTION_KEY_NAME, SUBSCRIPTION_KEY_VALUE);
					},
		            dataType:"json",
		            timeout: SERVICE_TIMEOUT,  //180 sec
		            data: JSON.stringify(JSONReq),
	                    success:function (data){
	                    	if(data.success===false){
	                            console.log("Week selection service error");
								console.log(data.errorMessage);
								if(data.errorCode=="ERR-208"){
									var child = $('#SDTWeekSelection');
									child.empty();
								}
	                        }
	                        else{
	                            console.log(data);
								callback(data);
	                        }  
	                    },
	                    error: function(x, t, m) {
		                if(t==="timeout") {
							//alert("timeout");	//common.alertMessage(messageboxCommonMessages.timeout,callbackReturn,messageboxCommonMessages.messageTitleError);
		                } else {
		                    //alert(t);
		                }
		            }
	            });
	},
	getUserSelectionData: function(userid,userType,startDate,endDate,selectedBranchId,callback){
		var JSONReq = {
						"access": {
									"userId": loggedInUserId,
	                                "userType": loggedInUserType
									
								  },
						"startDate": startDate,
						"endDate": endDate,
						"branchId": selectedBranchId
					 };
	                             
	            console.log(JSONReq);
	            console.log("Sending request to get user selection data");
	        
	            $.ajax({
	                type: 'POST',
		            url: BALANCING_SYNC_URL + GET_USERS_URL,
		            contentType: "application/json",
					beforeSend: function (xhr) {
						xhr.setRequestHeader(SUBSCRIPTION_KEY_NAME, SUBSCRIPTION_KEY_VALUE);
					},
		            dataType:"json",
		            timeout: SERVICE_TIMEOUT,  //180 sec
		            data: JSON.stringify(JSONReq),
	                    success:function (data){
	                    	if(data.success===false){
	                            console.log("User selection service error");
								console.log(data.errorMessage);
								if(data.errorCode=="ERR-210"){
									var tbody = $('#userSearchable');
									tbody.empty();
								}
	                        }
	                        else{
	                            console.log(data);
								callback(data);
	                        }  
	                    },
	                    error: function(x, t, m) {
		                if(t==="timeout") {
							//alert("timeout");	//common.alertMessage(messageboxCommonMessages.timeout,callbackReturn,messageboxCommonMessages.messageTitleError);
		                } else {
		                    //alert(t);
		                }
		            }
	            });
	},
	getJourneySelectionData: function(userid,userType,startDate,endDate,selectedBranchId,callback){
		var JSONReq = {
						"access": {
									"userId": loggedInUserId,
	                                "userType": loggedInUserType
									
								  },
						"startDate": startDate,
						"endDate": endDate,
						"branchId": selectedBranchId
					 };
	                             
	            console.log(JSONReq);
	            console.log("Sending request to get journey selection data");
	        
	            $.ajax({
	                type: 'POST',
		            url: BALANCING_SYNC_URL + GET_JOURNEYS_URL,
		            contentType: "application/json",
					beforeSend: function (xhr) {
						xhr.setRequestHeader(SUBSCRIPTION_KEY_NAME, SUBSCRIPTION_KEY_VALUE);
					},
		            dataType:"json",
		            timeout: SERVICE_TIMEOUT,  //180 sec
		            data: JSON.stringify(JSONReq),
	                    success:function (data){
	                    	if(data.success===false){
	                            console.log("Journey selection service error");
								console.log(data.errorMessage);
								if(data.errorCode=="ERR-209"){
									var tbody = $('[id^=journeySearchable]');
									tbody.empty();
								}
								//callback(data);
	                        }
	                        else{
	                            console.log(data);
								callback(data);
	                        }  
	                    },
	                    error: function(x, t, m) {
		                if(t==="timeout") {
							//alert("timeout");	//common.alertMessage(messageboxCommonMessages.timeout,callbackReturn,messageboxCommonMessages.messageTitleError);
		                } else {
		                    //alert(t);
		                }
		            }
	            });
	},
	getWeeklySummarySheetService: function(weekStartDate,weekEndDate,selectedJourney,selectedUserId,callback){
	    	var JSONReq = {
	                                "access": {
	                                            "userId": loggedInUserId,
	                                            "userType": loggedInUserType
	                                            
	                                          },

	                                "startDate": weekStartDate,
								    "endDate": weekEndDate,
								    "journeyId": selectedJourney,
								    "userId": selectedUserId
	                             };
	                             
	            console.log(JSONReq);
	            console.log("Sending request to get weekly summary sheet data");
	        
	            $.ajax({
	                type: 'POST',
		            url: BALANCING_SYNC_URL + GET_WEEKLY_CASH_SUMMARY_URL,
		            contentType: "application/json",
					beforeSend: function (xhr) {
						xhr.setRequestHeader(SUBSCRIPTION_KEY_NAME, SUBSCRIPTION_KEY_VALUE);
					},
		            dataType:"json",
		            timeout: SERVICE_TIMEOUT,  //180 sec
		            data: JSON.stringify(JSONReq),
	                    success:function (data){
	                    	if(data.success===false){
	                            console.log("Cash Summary Service Error");
	                        }
	                        else{
	                            console.log(data);
	                           callback(data); 
	                        }  
	                    },
	                    error: function(x, t, m) {
		                //alert("Error connecting to balancing server");
		                alert(messageboxCommon.messageTitleError,messageboxCallService.errorConnectionMsgBalancing);
		                if(t==="timeout") {
		                	//alert("timeout");//common.alertMessage(messageboxCommonMessages.timeout,callbackReturn,messageboxCommonMessages.messageTitleError);
		                } else {
		                    //alert(t);
		                }
		            }
	            });
	    
	    },
		
		getBalanceTransactionDataService: function(weekStartDate,weekEndDate,selectedJourney,selectedUserId,selectedBalanceType,callback){
	    	var JSONReq = {
	                                "access": {
	                                            "userId": loggedInUserId,
	                                            "userType": loggedInUserType
	                                            
	                                          },

	                                "startDate": weekStartDate,
								    "endDate": weekEndDate,
								    "journeyId": selectedJourney,
								    "journeyUserId": selectedUserId,
									"balanceTypeId": selectedBalanceType

	                             };
	                             
	            console.log(JSONReq);
	            console.log("Sending request to get balance transaction data");
	        
	            $.ajax({
	                type: 'POST',
		            url: BALANCING_SYNC_URL + GET_BALANCE_TRANSACTIONS_URL,
		            contentType: "application/json",
					beforeSend: function (xhr) {
						xhr.setRequestHeader(SUBSCRIPTION_KEY_NAME, SUBSCRIPTION_KEY_VALUE);
					},
		            dataType:"json",
		            timeout: SERVICE_TIMEOUT,  //180 sec
		            data: JSON.stringify(JSONReq),
	                    success:function (data){
	                    	if(data.success===false){
	                            console.log("Balance Transaction Pull Service Error");
	                        }
	                        else{
	                            console.log(data);
	                           callback(data); 
	                        }  
	                    },
	                    error: function(x, t, m) {
		                //alert("Error connecting to balancing server");
		                alert(messageboxCommon.messageTitleError,messageboxCallService.errorConnectionMsgBalancing);
		                if(t==="timeout") {
		                	//alert("timeout");//common.alertMessage(messageboxCommonMessages.timeout,callbackReturn,messageboxCommonMessages.messageTitleError);
		                } else {
		                    //alert(t);
		                }
		            }
	            });
	    
	    },
		
		postBalanceTransactionData: function(balanceTransactionList,callback){
			var retryCounter = 0;
			var InputJSON = {
						  "access": {
							"userId": loggedInUserId,
	                        "userType": loggedInUserType
						  },
					     "balanceTransactions": balanceTransactionList
					};
					
					
			console.log(JSON.stringify(InputJSON));
			console.log("Calling balance Transaction Sync service");
			console.log(TRANSACTION_SYNC_URL + POST_BALANCE_TRANSACTIONS_URL);
	    	$.ajax({
                type: 'POST',
	            url: TRANSACTION_SYNC_URL + POST_BALANCE_TRANSACTIONS_URL, 
				contentType: "application/json",
				beforeSend: function (xhr) {
					xhr.setRequestHeader(SUBSCRIPTION_KEY_NAME, SUBSCRIPTION_KEY_VALUE);
				},
	            dataType:"json",
	            timeout: SERVICE_TIMEOUT,  //5 sec
	            data: JSON.stringify(InputJSON),
				processData: false,
	            success:function (data) {
	            						
					if(data.success != true){
	            		//alert(data.errorCode+" : "+data.errorMessage);
						
	            		alert(messageboxCommon.messageTitleError,data.errorMessage);
					}
	            	else{
		            	console.log(data);
						callback(data);
	            	}
	            },
	            error: function(x, t, m) {
	            	console.log("ERROR AJAX CALL "+JSON.stringify(x));
	            	var opts = this;
					if(retryCounter <3)
					{
						retryCounter++;
						console.log("Retrying Again" +retryCounter);
						$.ajax(opts);
					}
					else
					{
					
						//alert("Unable to save. Please try again.");
						alert(messageboxCommon.messageTitleError,messageboxCallService.errorConnectionMsgSave);
						
						if(t==="timeout") {
							//alert("timeout");
						} else {
							//alert(t);
						}
					}
	            }
	        });
	    },
		
		getClosedWeekStatus: function(selectedJourneyBranchId,weekNo,yearNo,callback){
			
			var InputJSON = {
						  "access": {
							"userId": loggedInUserId,
	                        "userType": loggedInUserType
						  },
					     "branchId": selectedJourneyBranchId,
						 "weekNumber": weekNo,
						 "yearNumber": yearNo
						
					};
					
					
			console.log(JSON.stringify(InputJSON));
			console.log("Calling Closed Week Status service");
			console.log(BALANCING_SYNC_URL + GET_CLOSED_WEEK_STATUS_URL);
	    	$.ajax({
                    type: 'POST',
	            url: BALANCING_SYNC_URL + GET_CLOSED_WEEK_STATUS_URL, 
				//url: "http://172.16.145.46:8082/customer-rs/api/transactions/balance/sync",
				contentType: "application/json",
				beforeSend: function (xhr) {
					xhr.setRequestHeader(SUBSCRIPTION_KEY_NAME, SUBSCRIPTION_KEY_VALUE);
				},
	            dataType:"json",
	            timeout: SERVICE_TIMEOUT,  
	            data: JSON.stringify(InputJSON),
	            success:function (data) {
	            						
					if(data.success != true){
	            		alert(messageboxCommon.messageTitleError,data.errorMessage+" ("+data.errorCode+")");
	            		//session.setData(CLOSEDWEEK_STATUSID,"1");
					}
	            	else{
		            	console.log(data);
						callback(data);
		            	
	            	}
	            },
	            error: function(x, t, m) {
					
	                //alert("Error Connecting Balancing server");
	                alert(messageboxCommon.messageTitleError,messageboxCallService.errorConnectionMsgBalancing);
	                if(t==="timeout") {
						//alert("timeout");
	                } else {
	                    //alert(t);
	                }
	            }
	        });
	    },
			
		getUsedIdLogin: function(userEmailId,callback){
			
			var InputJSON = {
						  "email": userEmailId
					};
					
					
			console.log(JSON.stringify(InputJSON));
			console.log("Calling UserId Login service");
			console.log(SECURITY_SYNC_URL + GET_LOGGED_IN_USER_URL);
	    	$.ajax({
                    type: 'POST',
	            url: SECURITY_SYNC_URL + GET_LOGGED_IN_USER_URL, 
				
	            beforeSend: function(xhrObj){
	                // Request headers
	                xhrObj.setRequestHeader("Content-Type","application/json");
	                xhrObj.setRequestHeader(SUBSCRIPTION_KEY_NAME,SUBSCRIPTION_KEY_VALUE);
	            },
	            dataType:"json",
	            timeout: SERVICE_TIMEOUT,  //250 sec
	            data: JSON.stringify(InputJSON),
	            success:function (data) {
					if(data.success != true){
	            		//alert(data.errorCode+" : "+data.errorMessage);
	            		callback(data);
					}
	            	else{
	            		//console.log("req obj:"+JSON.stringify(InputJSON));
		            	console.log(data);
						callback(data);
	            	}
	            },
	            error: function(x, t, m) {
	                //alert("Error Connecting Security server "+securitySericeErrorCode);
	               // if(t==="timeout") {
					//	alert("timeout");
	                //} else {
	                    //alert(t);
	               // }
	            	session.setData(ERROR_CODE,securitySericeErrorCode);
	            	common.redirect(ERROR_PAGE);
	            }
	        });
	    },
		
		getBranchBalanceData: function(selectedBranchId,weekNo,yearNo,callback){
			
			var InputJSON = {
						  "access": {
							"userId": loggedInUserId,
	                        "userType": loggedInUserType
						  },
					     "branchId": selectedBranchId,
						 "weekNumber": weekNo,
						 "yearNumber": yearNo
						
					};
					
			console.log(JSON.stringify(InputJSON));
			console.log("Calling UserId Login service");
			console.log(BALANCING_SYNC_URL + GET_BRANCH_BALANCE_REPORT_URL);
	    	$.ajax({
                    type: 'POST',
	            url: BALANCING_SYNC_URL + GET_BRANCH_BALANCE_REPORT_URL, 
				contentType: "application/json",
				beforeSend: function (xhr) {
					xhr.setRequestHeader(SUBSCRIPTION_KEY_NAME, SUBSCRIPTION_KEY_VALUE);
				},
	            dataType:"json",
	            timeout: 25000,  //250 sec
	            data: JSON.stringify(InputJSON),
	            success:function (data) {
					if(data.success != true){
	            		//alert(data.errorCode+" : "+data.errorMessage);
						alert(messageboxCommon.messageTitleError,data.errorMessage);
					}
	            	else{
	            		//console.log("req obj:"+JSON.stringify(InputJSON));
		            	console.log(data);
						callback(data);
	            	}
	            },
	            error: function(x, t, m) {
	            	alert(messageboxCommon.messageTitleError,messageboxCallService.errorConnectionMsgBalancing);
	               // if(t==="timeout") {
					//	alert("timeout");
	                //} else {
	                    //alert(t);
	               // }
	            	
	            }
	        });
	    },
	    
	    closeWeek: function(selectedBranchId,weekNo,yearNo,callback){
			
			var InputJSON = {
						  "access": {
							"userId": loggedInUserId,
	                        "userType": loggedInUserType
						  },
					     "branchId": selectedBranchId,
						 "weekNumber": weekNo,
						 "yearNumber": yearNo,
						 "weekStatusId": 0
					};
					
					
			console.log(JSON.stringify(InputJSON));
			console.log("Calling Closed Week service");
			console.log(BALANCING_SYNC_URL + POST_CLOSE_WEEK_STATUS_URL);
	    	$.ajax({
                    type: 'POST',
	            url: BALANCING_SYNC_URL + POST_CLOSE_WEEK_STATUS_URL, 
				contentType: "application/json",
				beforeSend: function (xhr) {
					xhr.setRequestHeader(SUBSCRIPTION_KEY_NAME, SUBSCRIPTION_KEY_VALUE);
				},
	            dataType:"json",
	            timeout: SERVICE_TIMEOUT,  
	            data: JSON.stringify(InputJSON),
	            success:function (data) {
	            						
					if(data.success != true){
	            		alert(messageboxCommon.messageTitleError,data.errorMessage+" ("+data.errorCode+")");
	            		
					}
	            	else{
		            	console.log(data);
						callback(data);
		            	
	            	}
	            },
	            error: function(x, t, m) {
					
	                //alert("Error Connecting Balancing server");
	                alert(messageboxCommon.messageTitleError,messageboxCallService.errorConnectionMsgBalancing);
	                if(t==="timeout") {
						//alert("timeout");
	                } else {
	                    //alert(t);
	                }
	            }
	        });
	    },
		getJourneyBalanceData: function(selectedJourneyId,weekNo,yearNo,callback){
			
			var InputJSON = {
						  "access": {
							"userId": loggedInUserId,
	                        "userType": loggedInUserType
						  },
					     "journeyId": selectedJourneyId,
						 "weekNumber": weekNo,
						 "yearNumber": yearNo
						  /*"journeyId": "1757",
						  "weekNumber": "27",
						  "yearNumber": "2016"*/
						
					};
					
			console.log(JSON.stringify(InputJSON));
			console.log("Calling journey balance report service");
			console.log(BALANCING_SYNC_URL + GET_JOURNEY_BALANCE_REPORT_URL);
	    	$.ajax({
                type: 'POST',
	            url: BALANCING_SYNC_URL + GET_JOURNEY_BALANCE_REPORT_URL, 
				contentType: "application/json",
				beforeSend: function (xhr) {
					xhr.setRequestHeader(SUBSCRIPTION_KEY_NAME, SUBSCRIPTION_KEY_VALUE);
				},
	            dataType:"json",
	            timeout: 25000,  //250 sec
	            data: JSON.stringify(InputJSON),
	            success:function (data) {
					if(data.success != true){
	            		//alert(data.errorCode+" : "+data.errorMessage);
						alert(messageboxCommon.messageTitleError,data.errorMessage);
					}
	            	else{
	            		//console.log("req obj:"+JSON.stringify(InputJSON));
		            	console.log(data);
						callback(data);
	            	}
	            },
	            error: function(x, t, m) {
	            	alert(messageboxCommon.messageTitleError,messageboxCallService.errorConnectionMsgBalancing);
	               // if(t==="timeout") {
					//	alert("timeout");
	                //} else {
	                    //alert(t);
	               // }
	            	
	            }
	        });
	    }
	
};


$(document).ajaxSend(function(event, request, settings) {
	$('#loading-indicator').show();
	$('#disablingDiv').show();
});

$(document).ajaxStop(function(event, request, settings) {
	$('#loading-indicator').hide();
	$('#disablingDiv').hide();
});

