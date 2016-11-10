document.addEventListener("offline", onOffline, false);
document.addEventListener("online", onDeviceOnline, false);
function onOffline() {
    // Handle the offline event
   
    $("#menuDelegateCust").addClass("ui-state-disabled");
}

function onDeviceOnline() {
    // Handle the online event
   
    $("#menuDelegateCust").removeClass("ui-state-disabled");
}

var buildAttributes	= {
	isTrainingApp : false		
};

var instance;
var isSyncing = false;
var isSyncingForLockedUser = false;
var noPush = false;
var timer = null; // timer to disable back button
/**************************enum for SDT week**********************************/
var week = {
		DAY0: 'Thursday',
		DAY1: 'Friday',
		DAY2: 'Saturday',
		DAY3: 'Sunday',
		DAY4: 'Monday',
		DAY5: 'Tuesday',
		DAY6: 'Wednesday'
};

/**************************enum for customer visit status**********************************/
var statusType = {
		PEND: '1',
		COMP: '2',
		CNSO: '3',
		CNSC: '4',
		 SWP: '5',
		 SCP: '6',
		  NW: '7',
		 CPA: '8',
		 CPD: '9'
};

/**************************enum for SDT week**********************************/
var collectDay = {
		DAY1: 'Monday',
		DAY2: 'Tuesday',
		DAY3: 'Wednesday',
		DAY4: 'Thursday',
		DAY5: 'Friday',
		DAY6: 'Saturday',
		DAY7: 'Sunday'
};

/**************************enum for SDT week**********************************/
var collectDate = {
		Monday:'1',
		Tuesday:'2',
		Wednesday:'3',
		Thursday:'4',
		Friday:'5',
		Saturday:'6',
		Sunday: '7'
};
/**************************enum for User type**********************************/
var userType = {
		USER1: 'Agent'
};
/**************************enum for Agreement Mode**********************************/
var agreementMode = {
		TERM: 'T',
		SETTLEMENT: 'S',
		ZEROPAYMENT: 'Z',
		NONWEEKLY: 'N',
		REFUND: 'R'
};

/**************************enum for customer Result status**********************************/
var resultstatusType = {
		PAID: '2',
		 NSP: '3',
		 NSC: '4',
		 SWP: '5',
		 SCP: '6',
		  NW: '7',
		 CPA: '8',
		 CPD: '9'
};
/**************************enum for AAIndicator**********************************/
var AAIndicator = {
		NoLoan: '0',
		CurrentTerms: '1',
		EnhancedTerms: '2'
};


/*************************enum for Payment Frequency******************************/
var paymentFreq = {
                Weekly: 'WK',
                Monthly: 'MN',
                Fortnightly: 'FN'
};
/*************************enum for Payment Frequency******************************/
var balanceTransactionType = {
                LaonsIssued: 'L',
                FloatWithdrawn: 'F',
                CashBanked: 'B',
                Other: 'O',
                Week: 'W',
		L: 'LOANS ISSUED',
		F: 'FLOAT WITHDRAWN',
		B: 'CASH BANKED',
		O: 'OTHER',
        W: 'Week'
};

var balanceType = {
  ShortsandOvers: 'S',
  Collections: 'C'
};

/********************************Message Box Text**********************************/

//Customer Details Page
var messageboxCustomerDetailsPage = {
  messageTitleConfirm: 'Confirm',
  messageTitleWarning: 'Warning',
  
  zeroPayment: 'Customer is not paying anything in this week. Select call outcome.',
  //esbAmountExceeded :' Payment cannot be more than ESB amount.',
  settlementAmtMatch:' For settlement tap on ESB amount.',
  weeklyTermExceeded :' Customer is paying more than twice the weekly term amount. Continue?',
  esbAmountExceeded: ' Customer is paying more than ESB. Continue?',
  saveMessage :' Changes will not be saved. Continue? ',
  saveChanges:'Changes saved successfully.',
  validateMobileNumber:'Mobile Number must be 11 digit starting with 0.\n',
  validatePhoneNumber:'Phone Number must be 11 digit starting with 0.\n',
  validateEmail:'Email address is not valid.\n',
  //validateNegativeEsb:'Negative payments (refunds) cannot be entered into the app. (Please contact customer services to apply refunds.)'
  validateNegativeEsb:'Overpaid loan cannot be settled.'
};

//UserRegistration Page
var messageboxUserRegPage = {
  messageTitleRequiredField: "All fields are mandatory.",
  messageTitleError: 'Error',
  
  checkEmptyFields: 'All fields are mandatory.',
  checkUserId: 'Please enter userid',
  checkSurname: 'Please enter surname',
  checkNotSdtUser: 'Invalid userid or surname. Please try again.',
  checkDuplicateReg: 'You are already registered. If you still want to proceed, then please contact the helpdesk.'

};

//UserRegistration Page
var messageboxBalanceTransactionPage = {
  messageTitleRequiredField: "All fields are mandatory.",
  messageTitleError: 'Error',
  
  checkEmptyFields: 'All fields are mandatory.',
  checkRef: 'Reference is mandatory',
  checkAmt: 'Amount is mandatory',
  zeroAmt: 'Amount must be greater than zero.',
  oneDecimalAllowed: 'Only one decimal is allowed',
  twoDigitAfterDecimalAllowed: 'Only 2 digit accepted after decimal',
  amtDecimalFormat: 'Amount must be in the format xxxx.xx',
  invalidAmt: 'Amount cannot be greater than 9999.99.',
  invalidRefLoan: 'Reference text format must be in the format Part 1 - Part 2, where:\n- Part 1 is mandatory, whereas Part 2 is optional\n- Part 1 must be a customer number in the format 9999999999 or x9999999999 or xx9999999999. It means:\ni.First character or first two characters as either alphabets (A to Z or a to z), or numeric (0 to 9)\nii.Rest of the characters as number which is less than 9999999999\n- Part 2 is free format text, typically customer name\nExamples: C1234567890, ca789012 , 14567 - James Smith, c9834 - Alison Bell',
  invalidRefFloatandCash: 'Reference text must be in the format Part 1/Part 2 - Part 3, where:\n- Part 1 is mandatory whereas Part 2 and Part 3 is optional.\n- Part 1 and Part 2 can be either a journey number starting with J or j, or manager number starting with M or m.\n- Part 3 is free format text.\nExamples: J23/J3456, J1234/M9890 - from Andrews, m90/J1435 - Solihull, J123, J345 - Solihull',
  checkNotSdtUser: 'Invalid userid or surname. Please try again.',
  checkDuplicateReg: 'You are already registered. If you still want to proceed, then please contact the helpdesk.'

};

//UserRegistrationConfirm Page
var messageboxUserRegConfirmPage = {
  messageTitleWarning: 'Warning',
  messageTitleSuccess: 'Information',
  
  checkDigits: 'PIN must be a 4 digit number.',
  checkSimilar: 'All digits of the PIN cannot be the same.',
  checkConsecutive: 'PIN digits cannot be consecutive numbers.',
  checkPinMismatch: 'Pin does not match. Please try again.',
  registrationSuccess: 'Registration is successful.'
};

var messageboxLoginPage = {
  messageTitleWarning: 'Warning',
  messageTitleError: 'Error',
  validateUserLogin: 'PIN is incorrect. Please try again.',
  checkPinLength: 'PIN must be a 4 digit number',
  messageUserBlocked: 'Your access to the application is blocked. Please contact the helpdesk.'
};

var messageboxCallService = {
		messageTitleError: 'Error',
		messageTitleSuccess: 'Information',
		
		//errorConnectionMsg: 'Error Connecting Server',
		errorConnectionMsg : 'Unable to complete the sync. Please check the internet connection and try again. (ERR-107)',
		//errorConnectionCustomerServiceMsg: 'Error connecting to customer server',
		errorConnectionCustomerServiceMsg : 'Unable to complete the sync, please try again. If the problem reoccurs then, contact the helpdesk. (ERR-108)',
		errorConnectionSecurityServiceMsg: 'Unable to complete the sync, please try again. If the problem reoccurs, then contact the helpdesk. (ERR-109)',
		errorConnectionTransactionServiceMsg: 'Unable to complete the sync, please try again. If the problem reoccurs, then contact the helpdesk. (ERR-110)',
		errorConnectionCardPaymentServiceMsg: 'Unable to complete the sync, please try again. If the problem reoccurs, then contact the helpdesk. (ERR-111)',
		errorConnectionSDTWeekServiceMsg: "Unable to complete the sync, please try again. If the problem reoccurs, then contact the helpdesk. (ERR-109)",
		errorConnectionCheckActiveUserServiceMsg: 'Unable to complete the sync. Please check the internet connection and try again. (ERR-107)',
		errorConnectionDataRestoreServiceMsg: "Unable to complete the sync, please try again. If the problem reoccurs, then contact the helpdesk. (ERR-110)"
		
}

var messageboxSaveTransaction = {
		messageNoChanges: 'There are no changes to save.',
	    messageSaveSuccess: 'Transaction saved successfully.'
};

var messageboxOfflineDataSave = {
		//messageError: 'Error processing SQL',
		messageError: 'System error. Please contact the helpdesk. (ERR-000)',
		messageTitleError: 'Error',
		messageNoDataToInsert: 'No data to insert',
		messageSuccess: 'Transaction saved successfully',
		messageSuccessDelete: 'Transaction deleted successfully'
};
var messageboxCommonMessages = {
		messageTitleError: 'Error',
		messageTitleSuccess: 'Information',
		sessionExpired : 'Session expired. Please login again.', 	
		timeout: 'Timeout'
};

/***************************************Messages*************************************/
var messageboxError = {
		messageTitleError: 'Error',
		messageSelectVisitDate : 'Please select a visit date.'
};
var messageboxInformation = {
		messageTitleInformation: 'Information'
};
var messageboxConfirm = {
		messageTitleConfirm: 'Confirm'
};
var messageboxWarning = {
		messageTitleWarning: 'Warning'
};

var closeWeekMessage = {  
  //callsOpenErrorMessage: 'Calls are open. Week cannot be closed.',
  closeWeekSuccessfully: 'Week closed successfully. Login again next week.',
  closeWeekSystemError: 'System error. Contact the HelpDesk.'
};

//Delegation Page
var messageboxDelegationPage = {
  messageTitleRequiredField: "All fields are mandatory.",
  messageTitleError: 'Error',
  messageTitleSuccess: 'Information',
  messageTitleConfirm: 'Confirm',
  
  checkEmptyFields: 'All fields are mandatory.',
  checkFromDate: 'From Date is mandatory.',
  checkToDate: 'To Date is mandatory.',
  
  dateValidation: 'To Date cannot be earlier than From date.',
  journeyOrderValidation: 'From Journey Order cannot be greater than To Journey Order.',
 
  ERR250 : 'There are no customer for delegation for selected dates.',
  msgNoCustomerSelected: 'No Customer Selected for delegation.',
  msgSaveSuccess: 'Changes saved successfully.',
  msgConfirmDelegateAll: 'You selected all customers. Please Confirm.'
};

//messagebox callback
function callbackReturn(){
    return false
}

function offlinecallback() {
    // Handle the offline event
    alert("Please check your network connection");
}

// Sync message
var messageboxSync = {
  messageTitleSuccess: 'Information',
  messageTitleError: 'Error',
  messageTitleAlert: 'Information',
  messageTitleConfirm: 'Confirm',
  
  errorSyncMsg: 'Unable to complete Sync. Please try again at a later time. In case this recurs, contact the HelpDesk',
  successSyncMsg: 'Sync completed successfully.',
  syncAgainMsg: 'Device was synched less than an hour ago. Do you want to sync again?',
  NoDataSyncMsg: 'No Transaction data to sync',
  //customerSRFail: 'Transactions have been updated successfully. The latest customer visit, agreement and card payment summary information could not be fetched. Please check your network connection and try again later',
  customerSRFail: 'Unable to complete the sync, please try again. If the problem reoccurs then, contact the helpdesk. (ERR-108)',
  cardPaymentSRFail: 'Unable to complete the sync, please try again. If the problem reoccurs, then contact the helpdesk. (ERR-111)',
  noPushCustomerSRFail: 'Unable to complete the sync, please try again. If the problem reoccurs then, contact the helpdesk. (ERR-108)',
  noPushCardPaymentSRFail: 'Unable to complete the sync, please try again. If the problem reoccurs, then contact the helpdesk. (ERR-111)'
  //checkPinLength: 'PIN must be a 4 digit number'
};


// Balance Transaction message
var messageboxBalance = {
  messageTitleSuccess: 'Information',
  messageTitleError: 'Error',
  messageTitleAlert: 'Information',
  messageTitleConfirm: 'Confirm',
  
  msgConfirmDelete: 'Changes will not be saved. Continue ?'
};


/*************************common functionalities****************************/
var common = {
        /********************************redirect to a specified URL****************************************/
        redirect: function(url){
            window.location.href=url;
        },
        /***************get the previous and next days according to todays day in the current week**********/
        calcWeekDays: function(){
            
            var prevDays;
            var nextDays;
            
            var todaysDay = Date.today().getDayName();
            
            switch(todaysDay){
                case week.DAY0:
                    prevDays=0;
                    nextDays=6;
                    break;
                case week.DAY1:
                    prevDays=1;
                    nextDays=5;
                    break;
                case week.DAY2:
                    prevDays=2;
                    nextDays=4;
                    break;
                case week.DAY3:
                    prevDays=3;
                    nextDays=3;
                    break;
                case week.DAY4:
                    prevDays=4;
                    nextDays=2;
                    break;
                case week.DAY5:
                    prevDays=5;
                    nextDays=1;
                    break;
                case week.DAY6:
                    prevDays=6;
                    nextDays=0;
                    break;    
                default:
                    break;
            }
            
            return [prevDays,nextDays];
        },
        /***********************calculate start date and end date of the current week***********************/
        calcStartEndDates: function(prevDays,nextDays){
            var formattedStartDate;
            var formattedEndDate;
            
            //build start date
            formattedStartDate = Date.today().add(0-prevDays).days();
            formattedStartDate = formattedStartDate.toString().split(" ");
            formattedStartDate = formattedStartDate[3]+"-"+formattedStartDate[1]+"-"+formattedStartDate[2];
            formattedStartDate = formatDate.reverseDateFormatter(formattedStartDate);
            //build end date
            formattedEndDate = Date.today().add(nextDays).days();
            formattedEndDate = formattedEndDate.toString().split(" ");
            formattedEndDate = formattedEndDate[3]+"-"+formattedEndDate[1]+"-"+formattedEndDate[2];
            formattedEndDate = formatDate.reverseDateFormatter(formattedEndDate);
            
            return [formattedStartDate,formattedEndDate];
        },
        getSDTWeek: function(){
        	 var dbObj = dataStorage.initializeDB();
		
		        //execute SQL query
		        dbObj.transaction(function(tx) {
		            tx.executeSql(dbQueries.selectSDTWeekStatement,[],function(tx,res){
		                var len = res.rows.length;
		                if(len > 0) {
		              			var weekStartDate = res.rows.item(0)["StartDate"];
		              			var weekEndDate = res.rows.item(0)["EndDate"];
		              			dataStorage.setData(WEEK_START_DATE,weekStartDate);
		              			dataStorage.setData(WEEK_END_DATE,weekEndDate);
		              			//common.redirect("dashboard.html");
		                }

		            });
		      },function error(){},function success(){
		    	  						common.isUserLocked();
		      						});
		 },
		 isUserLocked: function(){
			 var dbObj = dataStorage.initializeDB();
			 var isLocked;
			//execute SQL query
		        dbObj.transaction(function(tx) {
		            tx.executeSql(dbQueries.selectUserLocked,[],function(tx,res){
		                var len = res.rows.length;
		                if(len > 0) {
		              			isLocked = res.rows.item(0)["IsLocked"];
		              			dataStorage.setData(IS_USER_LOCKED,isLocked);
		                }
		                if(dataStorage.getData(IS_USER_LOCKED)==0){
							
							 common.checkPreferenceOnLogin(); 
		                }

		            });
		      });
		 },
		 
		checkPreferenceOnLogin: function(){
    	
		var dbObj = dataStorage.initializeDB();
			dbObj.transaction(function (tx){
					tx.executeSql(dbQueries.selectShowOnLogin, [],function(tx,res){
                var len = res.rows.length;
                if(len==0){
					console.log(len);
					
                }
                if(len > 0) {
					console.log("Fetched Data length "+len);
					for(var i = 0;i<len;i++)
					{
						console.log(JSON.stringify(res.rows.item(i)));
						
						var showOnLoginPreference = res.rows.item(i).ShowOnLogin;
						
						if(showOnLoginPreference== 1)
						  {
							
							tx.executeSql(dbQueries.selectDeligatedJourney,[],function(tx, res){
								rowCount = res.rows.item(0)["COUNT(*)"];
							
								if(rowCount>0){
							common.redirect("journeySelection.html");
									//common.redirect('journeySelection.html');
								}
								else{
									 //$("#menuSelectJourney").addClass("ui-state-disabled");
									 common.redirect("dashboard.html");
								}
							});
						  }
						  else
						  {
		                	common.redirect("dashboard.html");
		                }
					}
					
                }

		            });
			},function(){console.log("Error in fetching showOnlogin");}, function(){console.log("Success in fetching showOnlogin")});
		 },
    	/***************************************Convert Amount to float and fixed 2 decimal************************************************/
        convertToAmount: function(amt){
            if(amt !== "" && amt !== null && amt !== undefined){
                return parseFloat(amt).toFixed(2);
            }
    		
    		return parseFloat(0.00).toFixed(2);
            
        },
		
		/*****************************************Set Height to view port height******************************************************/
		setHeight: function(className) {
			windowHeight = $(window).innerHeight();
			$(className).css('min-height', windowHeight-60);
			$(className).css('background-color', '#ffffff');
		  },
        
        alertMessage: function(message, functionName, title){
            navigator.notification.alert(message,
            				functionName,
                                        title,
                                        'OK');
        },
        
        confirmMessage: function(message, functionName, title){
            navigator.notification.confirm(message,
            				functionName,
                                        title,
                                        ['OK','Cancel']);
        },
        
        //function to disable back button after session timeout
        disableBackButtonAfterTimeout: function(){
            console.log("disable back button"+SESSION_TIMEOUT);
            clearTimeout(timer); //cancel the previous timer.
            timer = setTimeout(common.disableBack, SESSION_TIMEOUT);
        },
        
        //function to add class 'ui-disable' to back button
        disableBack: function(){
            $('div.customheader>.ui-btn').addClass('ui-disabled');
            //$('div#callESBPopup>.ui-icon-delete').addClass('ui-disabled');
            //$( "div#callESBPopup" ).popup( "close" );
			$('div#callESBPopup>.ui-icon-delete').removeAttr('data-rel');
			$('div#callOutComePopup>.ui-icon-delete').removeAttr('data-rel');
        }

};   

var session = {	
    getInstance: function() {
        if (!instance) {
        	console.log(instance);
            instance = session.init();
            console.log(instance);
        }
        return instance;
    },

    init: function() {
    	console.log("init");
        return {
            // Public methods and variables.
            set: function(sessionData) {
            	console.log("set");
                window.localStorage.setItem(SESSION_ID_KEY, JSON.stringify(sessionData));
            },
            get: function() {
            	console.log("get");
                var result = null;
                try {
                    result = JSON.parse(window.localStorage.getItem(SESSION_ID_KEY));
                } catch (e) { }
                console.log("get result"+result);
                return result;
            }
        };
    },

    createSession: function(userId) {
    	console.log("creating new session");
        var today = new Date();
        var expirationDate = new Date();
        console.log(today.getTime());
        
        expirationDate.setTime(today.getTime() + SESSION_TIMEOUT);  //Calculate session expiration time
        console.log("expirationDate"+expirationDate);
        var sessionObject = {
            userId: userId,
            expirationDate: expirationDate
        }

        session.getInstance().set(sessionObject);
    },

    sessionValidate: function(userId) {
    	console.log("validating session");
    	var userId = dataStorage.getData(USER_ID);
        var userSession = session.getInstance().get();
        console.log(userSession);
        var today = new Date();
		if(userSession){
			if (new Date(userSession.expirationDate).getTime() >= today.getTime()) {
		    	console.log("re-creating new session");
		        session.createSession(userId);   //Session is active and reset session expiration date and time               
		    } else {
		    	common.alertMessage(messageboxCommonMessages.sessionExpired, callbackReturn, messageboxCommonMessages.messageTitleError);
		    	window.sessionStorage.clear();
		        window.localStorage.clear();      //Session got expired redirect to login screen
		        common.redirect("login.html");
		    }
		}
		else{
			session.createSession(userId);
		}
		        
    }
};
var sideMenu = {
		  getSideMenuAgentDetails: function(){
			  
		        var dbObj = dataStorage.initializeDB();
		        try{
		        	//execute SQL query
			        dbObj.transaction(function(tx) {
							//tx.executeSql(dbQueries.getAgentDetails,[],function(tx,res){
						    tx.executeSql(dbQueries.selectPrimaryJourney,[],function(tx,res){	
			                var len = res.rows.length;
			                if(len==0){
					      console.log(len);      
			                }
			                if(len > 0) {
			              			var result = res.rows.item(0);
								var agentName = result.FirstName+" "+result.LastName;
									var agentName = result.PrimaryAgentName;
			                	  $('div.agent').html(agentName);
								  //$('div.journey').html("Primary Journey: "+dataStorage.getData(JOURNEY_DESCRIPTION));
								  $('div.journey').html("Primary Journey: "+result.JourneyDescription);
								  var weekStartDate = formatDate.menuFormat(result.StartDate);
								  var weekEndDate = formatDate.menuFormat(result.EndDate);
								  console.log(weekStartDate+" - "+weekEndDate);
								  $('div.weekDate').html(weekStartDate+" - "+weekEndDate);
								  dataStorage.setData(PRIMARY_JOURNEY_ID,result.JourneyID);
			                }
			                $('div#version').html(APP_VERSION);

			            });
						
			      });
		        }//try
		        catch(e){
		        	console.log("Error fetching Agent data for side menu");
		        }
		        
		    },
			
			checkDeligatedJourneys :function(){
				
				var dbObj = dataStorage.initializeDB();
				dbObj.transaction(
    			function(tx){
    				tx.executeSql(dbQueries.selectDeligatedJourney,[],function(tx, res){
    					rowCount = res.rows.item(0)["COUNT(*)"];
						
    					if(rowCount>0){
						
							//common.redirect('journeySelection.html');
						}
						else{
							 $("#menuSelectJourney").addClass("ui-state-disabled");
							
						}
    				});
    			},function(){"Error getting deligated journeys"},function(){"Success getting deligated journeys"});
		    }
};
/***************************displaying errors********************************/
var error = {	
	invalidCredentials: function(){
        $('.error').css("background-image","url('images/failure.png')");
        $('.error').text("Either username or password is invalid.");
        $('.error').stop().fadeIn(1000).delay(2000).fadeOut(1000); //fade out after 3 seconds
        $('.error').click(function(){
            $('.error').stop().fadeOut(1000);
        });
    },
    blankField: function(fieldName){
        $('.error').css("background-image","url('images/failure.png')");
        $('.error').text("Please enter "+fieldName);
        $('.error').stop().fadeIn(1000).delay(2000).fadeOut(1000); //fade out after 3 seconds
        $('.error').click(function(){
            $('.error').stop().fadeOut(1000);
        });
        
    },
    selectedArea: function(selectedAreaName){
            $('.success').css("background-image","url('images/success.png')");
            $('.success').text('Area selected: '+selectedAreaName);
            $('.success').stop().fadeIn(1000).delay(2000).fadeOut(1000); //fade out after 3 seconds
            $('.success').click(function(){
                $('.success').stop().fadeOut(1000);
            });   
    },
    noArea: function(){
        $('.noArea').css("background-image","url('images/failure.png')");
        $('.noArea').text("No area is allocated to you...Logging out!!");
        $('.noArea').stop().fadeIn(1000).delay(1000).fadeOut(1000); //fade out after 3 seconds
        $('.noArea').click(function(){
            $('.noArea').stop().fadeOut(1000);
        });
    },
    defaultArea: function(){
        $('.info').css("background-image","url('images/success.png')");
        $('.info').text("Default area selected: "+sessionStorage.selectedAreaName);
        $('.info').stop().fadeIn(1000).delay(5000).fadeOut(1000); //fade out after 3 seconds
        $('.info').click(function(){
            $('.info').stop().fadeOut(1000);
        }); 
    }
};      


//side menu onclick
$(document).on('click','#menuSyncData', function(){
	syncData.initSync(false);
});
$(document).on('click','#menuDashboard', function(){
	common.redirect('dashboard.html');
});
$(document).on('click','#menuSelectJourney', function(){
	common.redirect('journeySelection.html');
});
$(document).on('click','#menuDelegateCust', function(){
	common.redirect('customerDelegation.html');
});


//Database Queries
var dbQueries = {
		selectFromCustomerTable : "SELECT COUNT(*) FROM mtbCustomer",
		selectFromTransactionTable : "SELECT COUNT(*) FROM mtbTransaction",
		selectAgentOfflineTable : "SELECT count(name) FROM sqlite_master WHERE type='table' AND name='mtbUser'",
		createCustomerTableStatement : "CREATE TABLE IF NOT EXISTS mtbCustomer ( " +
										"CustomerID INTEGER , " +
										"VisitID INTEGER PRIMARY KEY,"+
										"VisitDate VARCHAR(50), " +
										"UserID VARCHAR(50), " +
										"JourneyID INTEGER, " +
										"Title VARCHAR(50), " +
										"FirstName VARCHAR(50), " +
										"MiddleName VARCHAR(50), " +
										"LastName VARCHAR(50), " +
										"AddressLine1 VARCHAR(50), " +
										"AddressLine2 VARCHAR(50), " +
										"AddressLine3 VARCHAR(50), " +
										"AddressLine4 VARCHAR(50), " +
										"PostCode VARCHAR(50), " +
										"City VARCHAR(50), " +
										"DOB VARCHAR(50), " +
										"MobileNumber VARCHAR(50), " +
										"PhoneNumber VARCHAR(50), " +
										"Email VARCHAR(50), " +
										"JourneyOrderBy INTEGER, " +
										"StatusID VARCHAR(50), " +
										"TotalPaidAmount VARCHAR(50), " +
										"TotalTermAmount VARCHAR(50), " +
										"PaymentTypeId VARCHAR(50), " +
										"PaymentPerformance VARCHAR(50), " +
										"CustomerNumber VARCHAR(50), " +
										"CollectionDay VARCHAR(50)," +
										"AtRisk INTEGER," +
                                        "Vulnerable CHAR(1),"+
										"JourneyDescription VARCHAR(50),"+
										"PrimaryAgentID INTEGER,"+
										"PrimaryAgentName VARCHAR(201))",										
                                        
	createAgreementTableStatement : 	"CREATE TABLE IF NOT EXISTS mtbAgreement ("+
									 	"AgreementID INTEGER PRIMARY KEY, " +
										"CustomerID INTEGER REFERENCES mtbCustomer(CustomerID),"+
										"AgreementNumber VARCHAR(50),"+
										"Instalments INTEGER,"+
										"Terms VARCHAR(50),"+
										"AmountPaid VARCHAR(50),"+
										"SettlementRebate VARCHAR(50),"+
										"Arrears VARCHAR(50),"+
										"StatusID INTEGER,"+
										"AgreementStartDate VARCHAR(30),"+
										"Principal VARCHAR(30),"+
										/*"Charges VARCHAR(30),"+*/
										"TAP VARCHAR(30),"+
										"Balance VARCHAR(30),"+
										"ElapsedWeeks VARCHAR(30)," +
										"ReloanedFromAgreementID VARCHAR(30)," +
										"PreviousAgreementNumber VARCHAR(30)," +
										"SettlementAmount VARCHAR(50),"+
										"AAIndicatorID INTEGER," +
                                        "PaymentFrequencyID INTEGER," +
                                        "SettledDate VARCHAR(50))",
	createMtbTransactionHistory : "CREATE TABLE IF NOT EXISTS mtbTransactionHistory ("+
									"AgreementID INTEGER, " +
									"TransactionID INTEGER,"+
									"PaidDate VARCHAR(50),"+
									"WeekNumber INTEGER,"+
									"PaymentMethod INTEGER,"+
									"ActualAmount VARCHAR(50),"+
									"Arrears VARCHAR(50))",
	createMtbTransaction : 	"CREATE TABLE IF NOT EXISTS mtbTransaction ("+
							"VisitID INTEGER, " +
							"CustomerID INTEGER,"+
							"ResultID VARCHAR(20),"+
							"ResultDate VARCHAR(20),"+
							"ResultStatusID INTEGER,"+
							"VisitStatusID INTEGER,"+
							"AgreementID INTEGER,"+
							"AgreementAmountPaid VARCHAR(50),"+
							"AgreementMode VARCHAR(10),"+
							"Lattitude VARCHAR(10),"+
							"Longitude VARCHAR(10),"+
							"JourneyID INTEGER,"+
							"IsSynced INTEGER)",
							
	createMtbCardPayment : "CREATE TABLE IF NOT EXISTS mtbCardPayment ("+
							   "JourneyID INTEGER,"+
							   "WeekDate VARCHAR(20),"+
							   "CardPaymentAmount VARCHAR(20))",
							   
	createMtbAgentTableStatement : "CREATE TABLE IF NOT EXISTS mtbUser("+
	                                                        "UserID INTEGER,"+
	                                                        "Title VARCHAR(50),"+
	                                                        "FirstName VARCHAR(50),"+
	                                                        "MiddleName VARCHAR(50),"+
	                                                        "LastName VARCHAR(50),"+
	                                                        "MacID VARCHAR(50),"+
	                                                        "Pin VARCHAR(50)," +
	                                                        "JourneyId INTEGER," +
	                                                        "JourneyDescription VARCHAR(50),"+
															"BranchId INTEGER," +
	                                                        "PrimaryJourneyStartDate VARCHAR(15),"+
															"PrimaryJourneyEndDate VARCHAR(15),"+
                                                        	"lastSynced VARCHAR(50)," +
															"ShowOnLogin INTEGER," +
                                                        	"IsLocked INTEGER)",

	createMtbBalanceTransaction : "CREATE TABLE IF NOT EXISTS mtbBalanceTransaction(" +
								  "BalanceID INTEGER PRIMARY KEY AUTOINCREMENT," +
								  "BalanceDate VARCHAR(50)," +
								  "Amount VARCHAR(50)," +
								  "Reference VARCHAR(50)," +
								  "BalanceTypeID VARCHAR(10)," +
								  "PeriodIndicator VARCHAR(10)," +
								  "ChequeIndicator INTEGER DEFAULT 0," +
								  "JourneyID INTEGER,"+
								  "IsSynced INTEGER," +
								  "IsDeleted INTEGER DEFAULT 0)", 						

        createMtbCustomerUpdate :"CREATE TABLE IF NOT EXISTS mtbCustomerUpdate ("+
	                                                        "CustomerID INTEGER PRIMARY KEY,"+
	                                                        "JourneyID INTEGER,"+
	                                                        "MobileNumber VARCHAR (50),"+
	                                                        "PhoneNumber VARCHAR (50),"+
	                                                        "Email VARCHAR (50),"+
	                                                        "AddressLine1 VARCHAR (50),"+
	                                                        "AddressLine2 VARCHAR (50),"+
	                                                        "AddressLine3 VARCHAR (50),"+
	                                                        "AddressLine4 VARCHAR (50),"+
	                                                        "City VARCHAR (50),"+
	                                                        "PostCode VARCHAR (50),"+
                                                            "CollectionDay VARCHAR (50),"+
                                                            "JourneyOrderBy INTEGER (50),"+ 
                                                            "IsSynced INTEGER,"+
													        "UpdatedDate VARCHAR (50))",
													        
		createMtbSDTWeek : "CREATE TABLE IF NOT EXISTS mtbSDTWeek(" +
						    				   "WeekNo INTEGER," +
						    				   "YearNo INTEGER," +
						    				   "StartDate VARCHAR(50)," +
						    				   "EndDate VARCHAR(50))",
		
		createMtbJourney: "CREATE TABLE IF NOT EXISTS mtbJourney("+
												"JourneyID INTEGER PRIMARY KEY,"+
												"JourneyDescription VARCHAR(15),"+
												"PrimaryAgentID INTEGER,"+
												"PrimaryAgentName VARCHAR(201),"+
												"IsPrimaryJourney INTEGER DEFAULT 0)",
												//"WeeklyBalance VARCHAR(20),"+
												//"WeekClosureCollections VARCHAR(20))",
															   
	insertIntoCustomerTableStatement : 	"INSERT OR REPLACE INTO mtbCustomer (CustomerID, VisitID, VisitDate, UserID, JourneyID, Title, FirstName, MiddleName, LastName, AddressLine1, AddressLine2, AddressLine3, AddressLine4, PostCode, City, DOB, MobileNumber, PhoneNumber, Email, JourneyOrderBy, StatusID, TotalPaidAmount, TotalTermAmount, PaymentTypeId, PaymentPerformance, CustomerNumber, CollectionDay, AtRisk, Vulnerable, JourneyDescription, PrimaryAgentID, PrimaryAgentName) " +
								"VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
								
								
	insertIntoCustomerUpdateTableStatement : "INSERT OR REPLACE INTO mtbCustomerUpdate(CustomerID, JourneyID, MobileNumber, PhoneNumber, Email, AddressLine1, AddressLine2, AddressLine3, AddressLine4,City,PostCode,CollectionDay,JourneyOrderBy,IsSynced,UpdatedDate)"+"VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",							
	
	insertIntoAgreementTableStatement :	"INSERT OR REPLACE INTO mtbAgreement (AgreementID, CustomerID, AgreementNumber, Instalments, Terms, SettlementRebate, Arrears, StatusID, AgreementStartDate, Principal, TAP, Balance, ElapsedWeeks, ReloanedFromAgreementID, PreviousAgreementNumber, SettlementAmount,AAIndicatorID,PaymentFrequencyID, SettledDate)"+
								"VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
								
	insertIntoMtbTransactionHistoryTableStatement : "INSERT OR REPLACE INTO mtbTransactionHistory(AgreementID,TransactionID,PaidDate,WeekNumber,PaymentMethod,ActualAmount,Arrears) VALUES (?,?,?,?,?,?,?)", 

	insertIntoMtbTransactionTableStatement : "INSERT OR REPLACE INTO mtbTransaction(VisitID, CustomerID, ResultID, ResultDate, ResultStatusID, VisitStatusID, AgreementID, AgreementAmountPaid, AgreementMode, Lattitude, Longitude, IsSynced, JourneyID) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)", 

	insertIntoMtbAgentStatement : "INSERT OR REPLACE INTO mtbUser(UserID,Title,FirstName,MiddleName,LastName,MacID,Pin,IsLocked,ShowOnLogin) VALUES (?,?,?,?,?,?,?,?,?)",
	
	insertIntoMtbCardPaymentStatement : "INSERT OR REPLACE INTO mtbCardPayment(JourneyID,WeekDate,CardPaymentAmount) VALUES (?,?,?)",

	insertIntoMtbBalanceTransactionStatement : "INSERT INTO mtbBalanceTransaction(BalanceDate,Amount,Reference,BalanceTypeID,PeriodIndicator,ChequeIndicator,IsSynced,IsDeleted,JourneyID) VALUES (?,?,?,?,?,?,?,?,?)",
	
	restoreMtbBalanceTransactionStatement : "INSERT INTO mtbBalanceTransaction(BalanceID,BalanceDate,Amount,Reference,BalanceTypeID,PeriodIndicator,ChequeIndicator,IsSynced,IsDeleted,JourneyID) VALUES (?,?,?,?,?,?,?,?,?,?)",
	
	insertIntoMtbSDTWeekStatement : "INSERT INTO mtbSDTWeek(WeekNo,YearNo,StartDate,EndDate) VALUES (?, ?, ?, ?)",
	
	insertIntoMtbJourneyStatement: "INSERT INTO"+
								  " mtbJourney(JourneyID,JourneyDescription,PrimaryAgentID,PrimaryAgentName)"+
								  " SELECT DISTINCT JourneyID,JourneyDescription,PrimaryAgentID,PrimaryAgentName"+
								  " FROM mtbCustomer"+
								  " UNION "+
								  " SELECT ?,?,UserID,FirstName || ' ' || LastName From mtbUser ",
	
	updateJourneyIdIntoMtbUserStatement : "UPDATE mtbUser SET JourneyId  = (?),JourneyDescription = (?) WHERE UserID IN (SELECT UserID FROM mtbUser WHERE rowid = 1)",
	
	//updateJourneyIdIntoMtbUserStatement : "UPDATE mtbUser SET JourneyId  = (?) WHERE UserID IN (SELECT UserID FROM mtbUser WHERE rowid = 1)",
	
	updateIntoMtbBalanceTransactionStatement : "UPDATE mtbBalanceTransaction set IsSynced = 0,Amount = ?,Reference = ?,ChequeIndicator = ? where BalanceID = ?",
	
	updateDeleteMtbBalanceTransaction : "UPDATE mtbBalanceTransaction set IsSynced = 0,IsDeleted = ? where BalanceID = ?",
	
	//updateCustomerTableStatement : "UPDATE mtbCustomer set StatusID = ? , TotalPaidAmount = (COALESCE(TotalPaidAmount,0)+ ?) where VisitID = ?",
updateCustomerTableStatement : "UPDATE mtbCustomer"+
		" SET StatusID = ?,"+
		" TotalPaidAmount = "+ 
		" ("+
			 "SELECT SUM(CashSUM) FROM"+
		" ("+
			 " SELECT T.VisitID AS VisitID,T.AgreementID as AgreementID,(T.ResultDate) AS Date,'Refund' AS AmountType,SUM(T.AgreementAmountPaid) AS CashSUM"+
			 " FROM mtbTransaction AS T"+
			  " INNER JOIN ("+
										 " SELECT T.VisitID,T.AgreementID as AgreementID, MAX(T.ResultDate) As MaxResultDate from mtbTransaction as T"+
										 " WHERE T.AgreementMode = 'R'"+
										 " AND T.VisitID = ?"+
										 " GROUP BY T.VisitID,T.AgreementID "+
								  " ) AS AGR"+ 
											   " ON     AGR.VisitID = T.VisitID"+ 
											   " AND AGR.AgreementID = T.AgreementID"+ 
											   " AND AGR.MaxResultDate = (T.ResultDate)"+
			 " WHERE T.AgreementMode = 'R' "+  
					" AND T.VisitID = ?"+
			 
			 " UNION ALL"+

			 " SELECT T.VisitID AS VisitID,T.AgreementID as AgreementID,(T.ResultDate) AS Date,'Collection' AS AmountType,SUM(T.AgreementAmountPaid) AS CashSUM"+
			 " FROM mtbTransaction AS T"+
			 " INNER JOIN ("+
										 " SELECT T.VisitID ,T.AgreementID as AgreementID,MAX(T.ResultDate) As MaxResultDate from mtbTransaction as T"+
										 " WHERE T.AgreementMode != 'R'"+ 
											   " AND T.VisitID = ?"+   
										 " GROUP BY T.VisitID, T.AgreementID "+
								  " ) AS AGR"+ 
											   " ON AGR.VisitID = T.VisitID"+ 
											   " AND AGR.AgreementID = T.AgreementID"+ 
											   " AND AGR.MaxResultDate = (T.ResultDate)"+
			 " WHERE T.AgreementMode != 'R'"+
			 " AND T.VisitID = ?"+
		" ) WHERE VisitID = ?"+
		" GROUP BY VisitID"+
		" )"+ 
		" WHERE VisitID = ?",

	updateAgreementTableStatement : "UPDATE mtbAgreement set AmountPaid = ? where AgreementID = ?",

	updateIntoCustomerTableStatement :"UPDATE mtbCustomer set MobileNumber = ?,PhoneNumber = ?,Email = ?,AddressLine1 = ?,AddressLine2 = ?,AddressLine3 = ?,AddressLine4 = ?,PostCode = ?,City = ? where CustomerID = ?",

    updateMtbUserTableStatement : "UPDATE mtbUser SET IsLocked = (?) WHERE rowid = 1",
	
	updateMtbJourneyIsPrimary : "UPDATE mtbJourney"+ 
								   " SET IsPrimaryJourney = (?)"+
								   " WHERE PrimaryAgentID IN"+
								   " (SELECT UserID FROM mtbUser)",			   
	/*
	updateWeeklyBalance : "UPDATE mtbJourney"+
						  " SET WeeklyBalance = (?),"+
						  " WeekClosureCollections = (?)"+
						  " WHERE JourneyID = (?)",
	*/
	
	dropCustomerTableStatement : "DROP TABLE mtbCustomer",

	dropAgreementTableStatement : "DROP TABLE mtbAgreement",

	dropMtbTransactionHistoryTableStatement : "DROP TABLE mtbTransactionHistory",

	dropMtbTransactionTableStatement : "DROP TABLE mtbTransaction",

	dropMtbCardPaymentTableStatement : "DROP TABLE mtbCardPayment",

	dropMtbBalanceTransactionStatement : "DROP TABLE mtbBalanceTransaction",

    dropMtbCustomerUpdateTableStatement : "DROP TABLE mtbCustomerUpdate",
        
    dropMtbSDTWeekTableStatement : "DROP TABLE mtbSDTWeek",    

	selectSCDailyListStatement : 'SELECT CustomerID,CustomerNumber,VisitDate,JourneyOrderBy,FirstName,LastName,AddressLine1,AddressLine2,PostCode,StatusID,TotalPaidAmount,TotalTermAmount,PaymentTypeId,CollectionDay,AtRisk,Vulnerable FROM mtbCustomer WHERE VisitDate=(?) AND CustomerID IN (SELECT CustomerID FROM mtbAgreement WHERE StatusID = 1) AND JourneyID = (?) ORDER BY JourneyOrderBy ASC',
	
	selectSCWeeklyListStatement : 'SELECT CustomerID,CustomerNumber,VisitDate,JourneyOrderBy,FirstName,LastName,AddressLine1,AddressLine2,PostCode,StatusID,TotalPaidAmount,TotalTermAmount,PaymentTypeId,CollectionDay,AtRisk,Vulnerable FROM mtbCustomer WHERE CustomerID IN (SELECT CustomerID FROM mtbAgreement WHERE StatusID = 1) AND JourneyID = (?) ORDER BY VisitDate,JourneyOrderBy ASC',

	 selectedCustDetailStatement : 'SELECT VisitID,CustomerNumber, Title, FirstName, MiddleName, LastName, AddressLine1, AddressLine2, AddressLine3, AddressLine4, City, PostCode, PaymentPerformance, MobileNumber, PhoneNumber, Email, DOB, CollectionDay, JourneyOrderBy, TotalPaidAmount FROM mtbCustomer where CustomerNumber = (?)',
	 
	 //selectCustLoanListStatement : 'SELECT AgreementID,CustomerID,AgreementNumber, AmountPaid, AgreementStartDate,ElapsedWeeks,Balance, Instalments, SettlementAmount, Terms, Arrears,AAIndicatorID, PaymentFrequencyID FROM mtbAgreement where StatusID = 1 and CustomerID = (SELECT CustomerID FROM mtbCustomer where CustomerNumber =(?)) ORDER BY AgreementStartDate DESC',
	 
	 selectCustLoanListStatement : 'SELECT AgreementID,CustomerID,AgreementNumber, AmountPaid, AgreementStartDate,ElapsedWeeks,Balance, Instalments, SettlementAmount, Terms, Arrears,AAIndicatorID, PaymentFrequencyID FROM mtbAgreement where (StatusID = 1 or substr(SettledDate,1,10) BETWEEN (?) and (?)) and CustomerID = (SELECT CustomerID FROM mtbCustomer where CustomerNumber =(?)) ORDER BY AgreementStartDate DESC',
	 
	 selectCustPaymentPerformanceStatement : 'SELECT AgreementID,CustomerID,AgreementNumber, AgreementStartDate,ElapsedWeeks,Balance, Instalments, SettlementAmount, Terms, Arrears,AAIndicatorID,PreviousAgreementNumber FROM mtbAgreement where CustomerID = (SELECT CustomerID FROM mtbCustomer where CustomerNumber =(?)) ORDER BY AgreementStartDate DESC',

	 selectedCustLoanDetailStatement : 'SELECT AgreementID, CustomerID, AgreementNumber, Instalments, Terms, SettlementRebate, Arrears, StatusID, AgreementStartDate, Principal, TAP, Balance, ElapsedWeeks, ReloanedFromAgreementID, PreviousAgreementNumber, SettlementAmount FROM mtbAgreement where AgreementNumber = (?)',
	 selectAgreementModeStatement : 'Select AgreementMode,AgreementAmountPaid from mtbTransaction where AgreementID = (?) group by AgreementID',
	 selectTransactionHistoryStatement : 'SELECT PaidDate,WeekNumber,PaymentMethod,ActualAmount,Arrears FROM mtbTransactionHistory WHERE AgreementID=(?) ORDER BY PaidDate DESC, TransactionID DESC',

	 
	selectDashboardData : "SELECT * FROM (" +
			" SELECT substr(WeekDate,1,10) AS Date, 'CardPayments' AS DashboardData, SUM(CardPaymentAmount) AS CashSUM" +
			" FROM mtbCardPayment" +
			" WHERE JourneyID = (?) AND substr(WeekDate,1,10) BETWEEN (?) AND (?)" +
			" GROUP BY substr(WeekDate,1,10)" +
			" UNION ALL" +
			" SELECT substr(VisitDate,1,10) AS Date, 'CallsClosed' AS CallsClosed, COUNT(*) AS CashSUM" +
			" FROM mtbCustomer" +
			" WHERE StatusID IN ('2','4','5','6','8') AND JourneyID = (?) AND UserID = (?) AND  VisitDate BETWEEN (?) AND (?)" +
			" GROUP BY substr(VisitDate,1,10)" +
			" UNION ALL" +
			" SELECT substr(VisitDate,1,10) AS Date, 'TargetCalls' AS TargetClosed, COUNT(*) AS CashSUM" +
			" FROM mtbCustomer" +
			" WHERE JourneyID = (?) AND UserID = (?) AND VisitDate BETWEEN (?) AND (?)" +
			" GROUP BY substr(VisitDate,1,10)" +
			" UNION ALL" +
			" SELECT substr(T.ResultDate,1,10) AS Date,'TermCollections' AS AmountType,SUM (Case WHEN T.AgreementMode = 'S' THEN A.Terms WHEN  T.AgreementMode = 'R' THEN 0 ELSE T.AgreementAmountPaid END) AS CashSUM" +
			" FROM mtbTransaction AS T" +
			" INNER JOIN mtbAgreement AS A ON A.AgreementID = T.AgreementID" +
			" INNER JOIN mtbCustomer AS C ON C.CustomerID = A.CustomerID" +
			" INNER JOIN (" +
			" 				select A.AgreementID ,MAX(T.ResultDate) As MaxResultDate from mtbTransaction as T" +
			"				INNER JOIN mtbAgreement AS A ON A.AgreementID = T.AgreementID" +
			"				INNER JOIN mtbCustomer AS C ON C.CustomerID = A.CustomerID" +
			"				WHERE C.JourneyID = (?) AND C.UserID = (?) AND substr(T.ResultDate,1,10) BETWEEN (?) AND (?)" +
			" 				AND T.AgreementMode != 'R'"+
			"				GROUP BY A.AgreementID" +
			"			) AS AGR ON AGR.AgreementID = T.AgreementID AND AGR.MaxResultDate = T.ResultDate" +
			" WHERE  substr(T.ResultDate,1,10) BETWEEN (?) AND (?)" +
			" GROUP BY substr(T.ResultDate,1,10)" +
			" UNION ALL" +
			" SELECT substr(T.ResultDate,1,10) AS Date,'OtherCollections',SUM (Case WHEN T.AgreementMode = 'S' THEN (T.AgreementAmountPaid - A.Terms) ELSE 0 END) AS CashSUM" +
			" FROM mtbTransaction AS T" +
			" INNER JOIN mtbAgreement AS A ON A.AgreementID = T.AgreementID" +
			" INNER JOIN mtbCustomer AS C ON C.CustomerID = A.CustomerID" +
			" INNER JOIN (" +
			" 				select A.AgreementID ,MAX(T.ResultDate) As MaxResultDate from mtbTransaction as T" +
			"				INNER JOIN mtbAgreement AS A ON A.AgreementID = T.AgreementID" +
			"				INNER JOIN mtbCustomer AS C ON C.CustomerID = A.CustomerID" +
			"				WHERE C.JourneyID = (?) AND C.UserID = (?) AND substr(T.ResultDate,1,10) BETWEEN (?) AND (?)" +
			" 				AND T.AgreementMode != 'R'"+
			"				GROUP BY A.AgreementID" +
			"				) AS AGR ON AGR.AgreementID = T.AgreementID AND AGR.MaxResultDate = T.ResultDate" +
			" WHERE  substr(T.ResultDate,1,10) BETWEEN (?) AND (?)" +
			" GROUP BY substr(T.ResultDate,1,10)" +
			" UNION ALL" +
			" SELECT substr(T.ResultDate,1,10) AS Date,'Refund' AS AmountType,SUM(T.AgreementAmountPaid) AS CashSUM" +
			" FROM mtbTransaction AS T" +
			" INNER JOIN mtbAgreement AS A ON A.AgreementID = T.AgreementID" +
			" INNER JOIN mtbCustomer AS C ON C.CustomerID = A.CustomerID" +
			" INNER JOIN (" +
			" 				select A.AgreementID ,MAX(T.ResultDate) As MaxResultDate from mtbTransaction as T" +
			"				INNER JOIN mtbAgreement AS A ON A.AgreementID = T.AgreementID" +
			"				INNER JOIN mtbCustomer AS C ON C.CustomerID = A.CustomerID" +
			"				WHERE C.JourneyID = (?) AND C.UserID = (?) AND substr(T.ResultDate,1,10) BETWEEN (?) AND (?)" +
			" 				AND T.AgreementMode = 'R'"+
			"				GROUP BY A.AgreementID" +
			"				) AS AGR ON AGR.AgreementID = T.AgreementID AND AGR.MaxResultDate = T.ResultDate" +
			" WHERE  substr(T.ResultDate,1,10) BETWEEN (?) AND (?)" +
			" GROUP BY substr(T.ResultDate,1,10)" +
			" UNION ALL" +
			" SELECT substr(BalanceDate,1,10) AS Date, BalanceTypeID,SUM(Amount) AS CashSUM" +
			" FROM mtbBalanceTransaction" +
			" WHERE JourneyID = (?) AND BalanceTypeID IN ('B','L','F','O') AND IsDeleted=0 AND substr(BalanceDate,1,10) BETWEEN (?) AND (?)" +
			" GROUP BY substr(BalanceDate,1,10),BalanceTypeID" +
			" ) A" +
			" ORDER BY 1",
	 
	selectCloseWeekData : "SELECT A.JourneyID,J.JourneyDescription, "+
											"SUM(CASE WHEN DashboardData IN ('TermCollections','OtherCollections','F')"+
													" THEN CashSUM"+
													" WHEN DashboardData IN ('Refund','L','B','O')"+
													" THEN CashSUM*-1"+
													" ELSE 0 END) AS WeeklyBalance "+
													" , "+
											"SUM(CASE WHEN DashboardData IN ('TermCollections','OtherCollections')"+
													" THEN CashSUM"+
													" WHEN DashboardData IN ('Refund')"+
													" THEN CashSUM*-1"+
													" ELSE 0 END) AS WeekClosureCollections"+
													" , "+
											"SUM(CASE WHEN DashboardData IN ('CallsClosed')"+
													" THEN CashSUM"+
													" ELSE 0 END) AS CallsClosed"+
													" , "+
											"SUM(CASE WHEN DashboardData IN ('TargetCalls')"+		
													" THEN CashSUM"+
													" ELSE 0 END) AS TargetCalls"+
						   " FROM ("+
								   " SELECT JourneyID,substr(WeekDate,1,10) AS Date, 'CardPayments' AS DashboardData, SUM(CardPaymentAmount) AS CashSUM"+
								   " FROM mtbCardPayment"+
								   " WHERE substr(WeekDate,1,10) BETWEEN (?) AND (?)"+
								   " GROUP BY JourneyID,substr(WeekDate,1,10)"+
								   " UNION ALL"+
								   " SELECT JourneyID,substr(VisitDate,1,10) AS Date, 'CallsClosed' AS CallsClosed, COUNT(*) AS CashSUM"+
								   " FROM mtbCustomer"+
								   " WHERE StatusID IN ('2','4','5','6','8') AND UserID = (?) AND  VisitDate BETWEEN (?) AND (?)"+
								   " GROUP BY JourneyID,substr(VisitDate,1,10)"+							
								   " UNION ALL"+
								   " SELECT JourneyID,substr(VisitDate,1,10) AS Date, 'TargetCalls' AS TargetCalls, COUNT(*) AS CashSUM"+
								   " FROM mtbCustomer"+
								   " WHERE UserID = (?) AND VisitDate BETWEEN (?) AND (?)"+
								   " GROUP BY JourneyID,substr(VisitDate,1,10)"+
								   " UNION ALL"+
								   " SELECT T.JourneyID,substr(T.ResultDate,1,10) AS Date,'TermCollections' AS AmountType,SUM (Case WHEN T.AgreementMode = 'S'"+
								   " THEN A.Terms WHEN  T.AgreementMode = 'R' THEN 0 ELSE T.AgreementAmountPaid END) AS CashSUM"+
								   " FROM mtbTransaction AS T"+
								   " INNER JOIN mtbAgreement AS A ON A.AgreementID = T.AgreementID"+
								   " INNER JOIN mtbCustomer AS C ON C.CustomerID = A.CustomerID"+
								   " INNER JOIN ("+
												 " SELECT A.AgreementID ,MAX(T.ResultDate) AS MaxResultDate FROM mtbTransaction AS T"+
												 " INNER JOIN mtbAgreement AS A ON A.AgreementID = T.AgreementID"+
												 " INNER JOIN mtbCustomer AS C ON C.CustomerID = A.CustomerID"+
												 " WHERE C.UserID = (?) AND substr(T.ResultDate,1,10) BETWEEN (?) AND (?)"+
												 " AND T.AgreementMode != 'R'"+
												 " GROUP BY A.AgreementID"+
												 " ) AS AGR ON AGR.AgreementID = T.AgreementID AND AGR.MaxResultDate = T.ResultDate"+
								   " WHERE  substr(T.ResultDate,1,10) BETWEEN (?) AND (?)"+
								   " GROUP BY T.JourneyID,substr(T.ResultDate,1,10)"+
								   " UNION ALL"+
								   " SELECT T.JourneyID,substr(T.ResultDate,1,10) AS Date,'OtherCollections',SUM (Case WHEN T.AgreementMode = 'S' THEN (T.AgreementAmountPaid - A.Terms) ELSE 0 END) AS CashSUM"+
								   " FROM mtbTransaction AS T"+
								   " INNER JOIN mtbAgreement AS A ON A.AgreementID = T.AgreementID"+
								   " INNER JOIN mtbCustomer AS C ON C.CustomerID = A.CustomerID"+
								   " INNER JOIN ("+
												 " SELECT A.AgreementID ,MAX(T.ResultDate) AS MaxResultDate FROM mtbTransaction AS T"+
												 " INNER JOIN mtbAgreement AS A ON A.AgreementID = T.AgreementID"+
												 " INNER JOIN mtbCustomer AS C ON C.CustomerID = A.CustomerID"+
												 " WHERE C.UserID = (?) AND substr(T.ResultDate,1,10) BETWEEN (?) AND (?)"+
												 " AND T.AgreementMode != 'R'"+
												 " GROUP BY A.AgreementID"+
												 ") AS AGR ON AGR.AgreementID = T.AgreementID AND AGR.MaxResultDate = T.ResultDate"+
								   " WHERE  substr(T.ResultDate,1,10) BETWEEN (?) AND (?)"+
								   " GROUP BY T.JourneyID,substr(T.ResultDate,1,10)"+
								   " UNION ALL"+
								   " SELECT T.JourneyID,substr(T.ResultDate,1,10) AS Date,'Refund' AS AmountType,SUM(T.AgreementAmountPaid) AS CashSUM"+
								   " FROM mtbTransaction AS T"+
								   " INNER JOIN mtbAgreement AS A ON A.AgreementID = T.AgreementID"+
								   " INNER JOIN mtbCustomer AS C ON C.CustomerID = A.CustomerID"+
								   " INNER JOIN ("+
												 " SELECT A.AgreementID ,MAX(T.ResultDate) AS MaxResultDate FROM mtbTransaction AS T"+
												 " INNER JOIN mtbAgreement AS A ON A.AgreementID = T.AgreementID"+
												 " INNER JOIN mtbCustomer AS C ON C.CustomerID = A.CustomerID"+
												 " WHERE C.UserID = (?) AND substr(T.ResultDate,1,10) BETWEEN (?) AND (?)"+
												 " AND T.AgreementMode = 'R'"+
												 " GROUP BY A.AgreementID"+
												 ") AS AGR ON AGR.AgreementID = T.AgreementID AND AGR.MaxResultDate = T.ResultDate"+
								   " WHERE  substr(T.ResultDate,1,10) BETWEEN (?) AND (?)"+
								   " GROUP BY T.JourneyID,substr(T.ResultDate,1,10)"+
								   " UNION ALL"+
								   " SELECT JourneyID,substr(BalanceDate,1,10) AS Date, BalanceTypeID,SUM(Amount) AS CashSUM"+
								   " FROM mtbBalanceTransaction"+
								   " WHERE BalanceTypeID IN ('B','L','F','O') AND IsDeleted=0 AND substr(BalanceDate,1,10) BETWEEN (?) AND (?)"+
								   " GROUP BY JourneyID,substr(BalanceDate,1,10),BalanceTypeID"+
							") A"+
							" INNER JOIN mtbJourney AS J"+
							" ON J.JourneyID = A.JourneyID"+
							" GROUP BY A.JourneyID,J.JourneyDescription"+
							" ORDER BY 1",
	
	selectAgentMacIDStatement : 'SELECT UserID, MacID from mtbUser',

	selectAgentPinStatement : 'SELECT Pin from mtbUser where UserID = (?)',
	
	selectJourneyFromMtbUserStatement : "SELECT JourneyId,JourneyDescription FROM mtbUser",

	selectJourneyStatement : 'SELECT MIN(JourneyOrderBy),MAX(JourneyOrderBy) from mtbCustomer where JourneyID =(?)',
	
	selectJourneyCollectionStatement : 'select max(JourneyOrderBy) as MAX,min(JourneyOrderBy) as MIN,VisitDate,CollectionDay from mtbCustomer where JourneyID = (?) group by VisitDate',

	selectSDTWeekStatement : "SELECT StartDate, EndDate FROM mtbSDTWeek",
	
	selectUserLocked: "SELECT IsLocked FROM mtbUser",
	
	selectPrimaryJourney: "SELECT JourneyID,JourneyDescription,PrimaryAgentName,SDTW.StartDate,SDTW.EndDate FROM mtbJourney AS J INNER JOIN mtbSDTWeek AS SDTW ON J.IsPrimaryJourney=SDTW.rowid WHERE J.IsPrimaryJourney = 1",
	
	selectPrimaryJourneyData: "SELECT * FROM mtbJourney WHERE JourneyID =(?)",
	
	selectTotalCalls: "SELECT COUNT(*) AS TotalCalls"+
					  " FROM mtbCustomer"+
					  " WHERE StatusID IN ('2','4','5','6','8') AND JourneyID IN (SELECT JourneyID FROM mtbJourney) AND UserID = (?) AND VisitDate BETWEEN (?) AND (?)"+
					  " UNION ALL"+
					  " SELECT COUNT(*) AS TotalCalls"+
					  " FROM mtbCustomer"+
					  " WHERE JourneyID IN (SELECT JourneyID FROM mtbJourney) AND UserID = (?) AND VisitDate BETWEEN (?) AND (?)",
	
	//selectWeeklyBalance: "SELECT JourneyID,JourneyDescription,WeeklyBalance,IsPrimaryJourney FROM mtbJourney",
	
	selectTotalJourneys: "SELECT COUNT(*) AS TotalJourneys,JourneyID,WeeklyBalance FROM mtbJourney",
	
	getSyncDataStmt : 'SELECT VisitID, CustomerID, ResultID, ResultDate, ResultStatusID, VisitStatusID, AgreementID, AgreementAmountPaid, AgreementMode from mtbTransaction where IsSynced = 0',

	getAgentDetails : 'SELECT FirstName,LastName,JourneyId,SDTW.StartDate,SDTW.EndDate FROM mtbUser AS U INNER JOIN mtbSDTWeek AS SDTW ON U.rowid=SDTW.rowid',

	updateTransactionIsSynched : 'UPDATE mtbTransaction set IsSynced = 1 where IsSynced = 0',

	updateCustomerUpdateIsSynched : 'UPDATE mtbCustomerUpdate set IsSynced = 1 where IsSynced = 0',
	
	updateBalanceTransactionIsSynched : 'UPDATE mtbBalanceTransaction set IsSynced = 1 where IsSynced = 0',

	updateUserLastSynced : 'UPDATE mtbUser set lastSynced = ? where UserID = ?',
	
	deleteDataCustomerTbl : "DELETE from mtbCustomer",

	deleteDataAgreementTbl : "DELETE from mtbAgreement",

	deleteDataJourneyTbl : "DELETE from mtbJourney",

	deleteDataCardPaymentTbl : "DELETE from mtbCardPayment",

	//selectDataTransaction  : "select agreementID,sum(agreementamountpaid) sumpaidamt from mtbTransaction where isSynced = 1 group by AgreementID",
	
	selectDataTransaction  : "select agreementID,agreementamountpaid  from mtbTransaction where isSynced = 1 group by AgreementID",
		
	selectCustomerUpdateData  : "SELECT CustomerID customerId, JourneyID journeyId, MobileNumber mobileNumber, PhoneNumber phoneNumber, Email email, AddressLine1 addressLine1, AddressLine2 addressLine2, AddressLine3 addressLine3, AddressLine4 addressLine4,City city,PostCode postCode,CollectionDay collectionDay,JourneyOrderBy journeyOrder,UpdatedDate updatedDate from mtbCustomerUpdate where IsSynced = 0",
	
	selectBalanceTransactionData  : "SELECT WeekNo,YearNo,BalanceID,BalanceDate,Amount,Reference,BalanceTypeID,B.JourneyID,PeriodIndicator,ChequeIndicator,IsDeleted,IsPrimaryJourney from mtbBalanceTransaction as B inner join mtbJourney as J on B.JourneyID = J.JourneyID inner join mtbSDTWeek where IsSynced = 0",
		
	getUserLastSynced : 'SELECT lastSynced FROM mtbUser where UserID = ?',

	getBalanceTransaction :	'select BalanceID,BalanceDate,Amount,Reference,ChequeIndicator from mtbBalanceTransaction where IsDeleted = 0  and BalanceTypeID = ? and JourneyID = ? ORDER BY BalanceDate ASC', 
	
	getBalanceTransactionDaily : 'select BalanceID,BalanceTypeId,BalanceDate,Amount,Reference,ChequeIndicator from mtbBalanceTransaction where IsDeleted = 0 and BalanceTypeID = ? and BalanceDate = ? and JourneyID = ?',
    
    updateCloseWeekTransactionIntoMtbBalance : 'UPDATE mtbBalanceTransaction set Amount = ?,IsSynced = ? where BalanceDate = ? and BalanceTypeID = ? AND JournyeID = ?',
	
	//Delegation Queries
	
	updateUserInfoIntoMtbUserStatement : "UPDATE mtbUser SET BranchId  = (?),PrimaryJourneyStartDate = (?),PrimaryJourneyEndDate = (?) WHERE UserID IN (SELECT UserID FROM mtbUser WHERE rowid = 1)",
	
	selectUserInfoFromMtbUserStatement : "SELECT BranchId,PrimaryJourneyStartDate,PrimaryJourneyEndDate FROM mtbUser",
        
	selectJourneyList : "select JourneyID,JourneyDescription,PrimaryAgentID,PrimaryAgentName,IsPrimaryJourney from mtbJourney order by JourneyDescription",
	
	selectShowOnLogin : "select ShowOnLogin from mtbUser WHERE UserID IN (SELECT UserID FROM mtbUser WHERE rowid = 1)",
	
	updateShowOnLogin : "UPDATE mtbUser SET ShowOnLogin  = (?) WHERE UserID IN (SELECT UserID FROM mtbUser WHERE rowid = 1)",
        
	selectDeligatedJourney : "select COUNT(*) from mtbJourney where IsPrimaryJourney = 0 order by JourneyDescription",
        
     deleteRecordsFrom_mtbAgreement : 'Delete from mtbAgreement',
     deleteRecordsFrom_mtbBalanceTransaction : 'Delete from mtbBalanceTransaction',
     deleteRecordsFrom_mtbCardPayment : 'Delete from mtbCardPayment',
     deleteRecordsFrom_mtbCustomer : 'Delete from mtbCustomer',
     deleteRecordsFrom_mtbCustomerUpdate : 'Delete from mtbCustomerUpdate',
     deleteRecordsFrom_mtbTransaction : 'Delete from mtbTransaction',
     deleteRecordsFrom_mtbTransactionHistory : 'Delete from mtbTransactionHistory',
     deleteRecordsFrom_sqlite_sequence : 'Delete from sqlite_sequence',
     deleteRecordsFrom_mtbSDTWeek : 'Delete from mtbSDTWeek',
	 deleteRecordsFrom_mtbJourney : 'Delete from mtbJourney'
     
};