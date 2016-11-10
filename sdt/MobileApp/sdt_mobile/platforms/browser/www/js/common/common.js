var instance;
var isSyncing = false;
var noPush = false;

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
/**************************enum for User type**********************************/
var userType = {
		USER1: 'Agent'
};
/**************************enum for Agreement Mode**********************************/
var agreementMode = {
		TERM: 'T',
		SETTLEMENT: 'S',
		ZEROPAYMENT: 'Z',
		NONWEEKLY: 'N'
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
		L: 'LOANS ISSUED',
		F: 'FLOAT WITHDRAWN',
		B: 'CASH BANKED',
		O: 'OTHER'
};

/********************************Message Box Text**********************************/

//Customer Details Page
var messageboxCustomerDetailsPage = {
  messageTitleConfirm: 'Confirm',
  messageTitleWarning: 'Warning',
  
  zeroPayment: 'Customer is not paying anything in this week. Select call outcome.',
  esbAmountExceeded :' Payment cannot be more than ESB amount',
  settlementAmtMatch:' For settlement tap on ESB amount',
  weeklyTermExceeded :' Customer is paying more than weekly term amount. Continue?',
  saveMessage         :' Changes will not be saved.Confirm ? '
  
};

//UserRegistration Page
var messageboxUserRegPage = {
  messageTitleRequiredField: "All fields mandatory",
  messageTitleError: 'Error',
  
  checkEmptyFields: 'Please enter all details',
  checkUserId: 'Please enter userid',
  checkSurname: 'Please enter surname',
  checkNotSdtUser: 'Invalid userid or surname. Try again',
  checkDuplicateReg: 'Entry already present'

};

//UserRegistration Page
var messageboxBalanceTransactionPage = {
  messageTitleRequiredField: "All fields mandatory",
  messageTitleError: 'Error',
  
  checkEmptyFields: 'Please enter all details',
  checkRef: 'Please enter Reference',
  checkAmt: 'Please enter Amount',
  checkNotSdtUser: 'Invalid userid or surname. Try again',
  checkDuplicateReg: 'Entry already present'

};

//UserRegistrationConfirm Page
var messageboxUserRegConfirmPage = {
  messageTitleWarning: 'Warning',
  messageTitleSuccess: 'Information',
  
  checkDigits: 'PIN must be a 4 digit number',
  checkSimilar: 'All digits of the PIN cannot be the same',
  checkConsecutive: 'Not a valid pin',
  checkPinMismatch: 'Pin does not match. Please try again',
  registrationSuccess: 'Registration is successful'
};

var messageboxLoginPage = {
  messageTitleWarning: 'Warning',
  messageTitleError: 'Error',
  validateUserLogin: 'Invalid PIN. Try again',
  checkPinLength: 'PIN must be a 4 digit number',
  messageUserBlocked: 'Your access to the application is blocked. Contact the system administrator'
};

var messageboxCallService = {
		messageTitleError: 'Error',
		messageTitleSuccess: 'Information',
		
		errorConnectionMsg: 'Error Connecting Server',
		errorConnectionCustomerServiceMsg: 'Error connecting to customer server',
		errorConnectionSecurityServiceMsg: 'Error connecting to security server',
		errorConnectionTransactionServiceMsg: 'Error connecting to transaction server',
		errorConnectionCardPaymentServiceMsg: 'Error connecting to card payment server',
		errorConnectionSDTWeekServiceMsg: "Error connecting to security server"
		
}

var messageboxSaveTransaction = {
		messageTitleSuccess: 'Transaction saved successfully'
};

var messageboxOfflineDataSave = {
		messageError: 'Error processing SQL',
		messageTitleError: 'Error',
		messageNoDataToInsert: 'No data to insert',
		messageSuccess: 'Transaction saved successfully',
		messageSuccessDelete: 'Transaction deleted successfully'
};
var messageboxCommonMessages = {
		messageTitleError: 'Error',
		messageTitleSuccess: 'Information',
		sessionExpired : 'Session expired', 	
		timeout: 'Timeout'
};

/***************************************Messages*************************************/
var messageboxError = {
		messageTitleError: 'Error',
		messageSelectVisitDate : 'Please select visit date'
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
  successSyncMsg: 'Sync finished Successfully',
  syncAgainMsg: 'Device was synched less than an hour ago. Do you want to sync again?',
  NoDataSyncMsg: 'No Transaction data to sync',
  customerSRFail: 'Transactions have been updated successfully. The latest customer visit, agreement and card payment summary information could not be fetched. Please check your network connection and try again later',
  cardPaymentSRFail: 'Transactions have been updated successfully. Customer Visit and Agreement data has been fetched. The Card Payment summary information could not be fetched. Please check your network connection and try again later',
  noPushCustomerSRFail: 'The latest customer visit, agreement and card payment summary information could not be fetched. Please check your network connection and try again later',
  noPushCardPaymentSRFail: 'Customer Visit and Agreement data has been fetched. The Card Payment summary information could not be fetched. Please check your network connection and try again later'
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
		                	common.redirect("dashboard.html");
		                }

		            });
		      });
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
			            tx.executeSql(dbQueries.getAgentDetails,[],function(tx,res){
			                var len = res.rows.length;
			                if(len==0){
					      console.log(len);      
			                }
			                if(len > 0) {
			              			var result = res.rows.item(0);
								var agentName = result.FirstName+" "+result.LastName;
			                	  $('div.agent').html(agentName);
								  $('div.journey').html("journey: "+dataStorage.getData(JOURNEY_DESCRIPTION));
								  var weekStartDate = formatDate.menuFormat(result.StartDate);
								  var weekEndDate = formatDate.menuFormat(result.EndDate);
								  console.log(weekStartDate+" - "+weekEndDate);
								  $('div.weekDate').html(weekStartDate+" - "+weekEndDate);
								  
			                }

			            });
			      });
		        }//try
		        catch(e){
		        	console.log("Error fetching Agent data for side menu");
		        }
		        
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
	syncData.initSync();
});
$(document).on('click','#menuDashboard', function(){
	common.redirect('dashboard.html');
});


//Database Queries
var dbQueries = {
		selectFromCustomerTable : "SELECT COUNT(*) FROM mtbCustomer",
		selectAgentOfflineTable : "SELECT count(name) FROM sqlite_master WHERE type='table' AND name='mtbUser'",
		createCustomerTableStatement : "CREATE TABLE IF NOT EXISTS mtbCustomer ( " +
										"CustomerID INTEGER , " +
										"VisitID INTEGER PRIMARY KEY,"+
										"VisitDate VARCHAR(50), " +
										"UserID VARCHAR(50), " +
										"JourneyID VARCHAR(50), " +
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
										"CollectionDay VARCHAR(50))",
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
                                                                                "PaymentFrequencyID INTEGER)",
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
                                                        	"lastSynced VARCHAR(50)," +
                                                        	"IsLocked INTEGER)",

	createMtbBalanceTransaction : "CREATE TABLE IF NOT EXISTS mtbBalanceTransaction(" +
								  "BalanceID INTEGER PRIMARY KEY AUTOINCREMENT," +
								  "BalanceDate VARCHAR(50)," +
								  "Amount VARCHAR(50)," +
								  "Reference VARCHAR(50)," +
								  "BalanceTypeID VARCHAR(10)," +
								  "PeriodIndicator VARCHAR(10)," +
								  "ChequeIndicator INTEGER DEFAULT 0," +
								  "IsSynced INTEGER," +
								  "IsDeleted INTEGER DEFAULT 0)", 						

        createMtbCustomerUpdate :"CREATE TABLE IF NOT EXISTS mtbCustomerUpdate ("+
	                                                        "CustomerID INTEGER PRIMARY KEY,"+
	                                                        "JourneyID INTEGER,"+
	                                                        "MobileNumber INTEGER,"+
	                                                        "PhoneNumber INTEGER,"+
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
										    				   
	insertIntoCustomerTableStatement : 	"INSERT OR REPLACE INTO mtbCustomer (CustomerID, VisitID, VisitDate, UserID, JourneyID, Title, FirstName, MiddleName, LastName, AddressLine1, AddressLine2, AddressLine3, AddressLine4, PostCode, City, DOB, MobileNumber, PhoneNumber, Email, JourneyOrderBy, StatusID, TotalPaidAmount, TotalTermAmount, PaymentTypeId, PaymentPerformance, CustomerNumber, CollectionDay) " +
								"VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
								
								
	insertIntoCustomerUpdateTableStatement : "INSERT OR REPLACE INTO mtbCustomerUpdate(CustomerID, JourneyID, MobileNumber, PhoneNumber, Email, AddressLine1, AddressLine2, AddressLine3, AddressLine4,City,PostCode,CollectionDay,JourneyOrderBy,IsSynced,UpdatedDate)"+"VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",							
	
	insertIntoAgreementTableStatement :	"INSERT OR REPLACE INTO mtbAgreement (AgreementID, CustomerID, AgreementNumber, Instalments, Terms, SettlementRebate, Arrears, StatusID, AgreementStartDate, Principal, TAP, Balance, ElapsedWeeks, ReloanedFromAgreementID, PreviousAgreementNumber, SettlementAmount,AAIndicatorID,PaymentFrequencyID)"+
								"VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
								
	insertIntoMtbTransactionHistoryTableStatement : "INSERT OR REPLACE INTO mtbTransactionHistory(AgreementID,TransactionID,PaidDate,WeekNumber,PaymentMethod,ActualAmount,Arrears) VALUES (?,?,?,?,?,?,?)", 

	insertIntoMtbTransactionTableStatement : "INSERT OR REPLACE INTO mtbTransaction(VisitID, CustomerID, ResultID, ResultDate, ResultStatusID, VisitStatusID, AgreementID, AgreementAmountPaid, AgreementMode, Lattitude, Longitude, IsSynced) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", 

	insertIntoMtbAgentStatement : "INSERT OR REPLACE INTO mtbUser(UserID,Title,FirstName,MiddleName,LastName,MacID,Pin,IsLocked) VALUES (?,?,?,?,?,?,?,?)",
	
	insertIntoMtbCardPaymentStatement : "INSERT OR REPLACE INTO mtbCardPayment(JourneyID,WeekDate,CardPaymentAmount) VALUES (?,?,?)",

	insertIntoMtbBalanceTransactionStatement : "INSERT INTO mtbBalanceTransaction(BalanceDate,Amount,Reference,BalanceTypeID,PeriodIndicator,ChequeIndicator,IsSynced,IsDeleted) VALUES (?,?,?,?,?,?,?,?)",
	
	insertIntoMtbSDTWeekStatement : "INSERT INTO mtbSDTWeek(WeekNo,YearNo,StartDate,EndDate) VALUES (?, ?, ?, ?)",
	
	updateJourneyIdIntoMtbUserStatement : "UPDATE mtbUser SET JourneyId  = (?),JourneyDescription = (?) WHERE UserID IN (SELECT UserID FROM mtbUser WHERE rowid = 1)",
	
	updateIntoMtbBalanceTransactionStatement : "UPDATE mtbBalanceTransaction set IsSynced = 0,Amount = ?,Reference = ?,ChequeIndicator = ? where BalanceID = ?",
	
	updateDeleteMtbBalanceTransaction : "UPDATE mtbBalanceTransaction set IsSynced = 0,IsDeleted = ? where BalanceID = ?",
	
	updateCustomerTableStatement : "UPDATE mtbCustomer set StatusID = ? , TotalPaidAmount = (COALESCE(TotalPaidAmount,0)+ ?) where VisitID = ?",

	updateAgreementTableStatement : "UPDATE mtbAgreement set AmountPaid = ? where AgreementID = ?",

	updateIntoCustomerTableStatement :"UPDATE mtbCustomer set MobileNumber = ?,PhoneNumber = ?,Email = ?,AddressLine1 = ?,AddressLine2 = ?,AddressLine3 =    ?,AddressLine4 = ?,PostCode = ?,City = ? where CustomerID = ?",

        updateMtbUserTableStatement : "UPDATE mtbUser SET IsLocked = (?) WHERE rowid = 1",

	dropCustomerTableStatement : "DROP TABLE mtbCustomer",

	dropAgreementTableStatement : "DROP TABLE mtbAgreement",

	dropMtbTransactionHistoryTableStatement : "DROP TABLE mtbTransactionHistory",

	dropMtbTransactionTableStatement : "DROP TABLE mtbTransaction",

	dropMtbCardPaymentTableStatement : "DROP TABLE mtbCardPayment",

	dropMtbBalanceTransactionStatement : "DROP TABLE mtbBalanceTransaction",

    dropMtbCustomerUpdateTableStatement : "DROP TABLE mtbCustomerUpdate",
        
    dropMtbSDTWeekTableStatement : "DROP TABLE mtbSDTWeek",    

	selectSCDailyListStatement : 'SELECT CustomerID,CustomerNumber,VisitDate,JourneyOrderBy,FirstName,LastName,AddressLine1,AddressLine2,PostCode,StatusID,TotalPaidAmount,TotalTermAmount,PaymentTypeId,CollectionDay FROM mtbCustomer WHERE VisitDate=(?) AND CustomerID IN (SELECT CustomerID FROM mtbAgreement WHERE StatusID = 1) ORDER BY JourneyOrderBy ASC',
	
	selectSCWeeklyListStatement : 'SELECT CustomerID,CustomerNumber,VisitDate,JourneyOrderBy,FirstName,LastName,AddressLine1,AddressLine2,PostCode,StatusID,TotalPaidAmount,TotalTermAmount,PaymentTypeId,CollectionDay FROM mtbCustomer WHERE CustomerID IN (SELECT CustomerID FROM mtbAgreement WHERE StatusID = 1) ORDER BY VisitDate,JourneyOrderBy ASC',

	 selectedCustDetailStatement : 'SELECT VisitID,CustomerNumber, Title, FirstName, MiddleName, LastName, AddressLine1, AddressLine2, AddressLine3, AddressLine4, City, PostCode, PaymentPerformance, MobileNumber, PhoneNumber, Email, DOB, CollectionDay, JourneyOrderBy, TotalPaidAmount FROM mtbCustomer where CustomerNumber = (?)',
	 selectCustLoanListStatement : 'SELECT AgreementID,CustomerID,AgreementNumber, AmountPaid, AgreementStartDate,ElapsedWeeks,Balance, Instalments, SettlementAmount, Terms, Arrears,AAIndicatorID, PaymentFrequencyID FROM mtbAgreement where StatusID = 1 and CustomerID = (SELECT CustomerID FROM mtbCustomer where CustomerNumber =(?)) ORDER BY AgreementStartDate DESC',
	 selectCustPaymentPerformanceStatement : 'SELECT AgreementID,CustomerID,AgreementNumber, AgreementStartDate,ElapsedWeeks,Balance, Instalments, SettlementAmount, Terms, Arrears,AAIndicatorID,PreviousAgreementNumber FROM mtbAgreement where CustomerID = (SELECT CustomerID FROM mtbCustomer where CustomerNumber =(?)) ORDER BY AgreementStartDate DESC',

	 selectedCustLoanDetailStatement : 'SELECT AgreementID, CustomerID, AgreementNumber, Instalments, Terms, SettlementRebate, Arrears, StatusID, AgreementStartDate, Principal, TAP, Balance, ElapsedWeeks, ReloanedFromAgreementID, PreviousAgreementNumber, SettlementAmount FROM mtbAgreement where AgreementNumber = (?)',

	 selectTransactionHistoryStatement : 'SELECT PaidDate,WeekNumber,PaymentMethod,ActualAmount,Arrears FROM mtbTransactionHistory WHERE AgreementID=(?) ORDER BY PaidDate DESC',

     selectDashboardData : "SELECT * FROM (" +
    		" SELECT substr(WeekDate,1,10) AS Date, 'CardPayments' AS DashboardData, SUM(CardPaymentAmount) AS CashSUM" +
    		" FROM mtbCardPayment" +
    		" WHERE JourneyID = (?) AND substr(WeekDate,1,10) BETWEEN (?) AND (?)" +
    		" GROUP BY substr(WeekDate,1,10)" +
    		" UNION ALL" +
    		" SELECT substr(VisitDate,1,10) AS Date, 'CallsClosed' AS CallsClosed, COUNT(*) AS CashSUM" +
    		" FROM mtbCustomer" +
    		" WHERE StatusID IN ('2','4','5','6','7','8') AND JourneyID = (?) AND UserID = (?) AND  VisitDate BETWEEN (?) AND (?)" +
    		" GROUP BY substr(VisitDate,1,10)" +
    		" UNION ALL" +
    		" SELECT substr(VisitDate,1,10) AS Date, 'TargetCalls' AS TargetClosed, COUNT(*) AS CashSUM " +
    		" FROM mtbCustomer" +
    		" WHERE JourneyID = (?) AND UserID = (?) AND  VisitDate BETWEEN (?) AND (?)" +
    		" GROUP BY substr(VisitDate,1,10)" +
    		" UNION ALL" +
    		" SELECT substr(T.ResultDate,1,10) AS Date,'TermCollections' AS AmountType,SUM (Case WHEN T.AgreementMode = 'S' THEN A.Terms ELSE T.AgreementAmountPaid END) AS CashSUM" +
    		" FROM mtbTransaction AS T" +
    		" INNER JOIN mtbAgreement AS A ON A.AgreementID = T.AgreementID" +
    		" INNER JOIN mtbCustomer AS C ON C.CustomerID = A.CustomerID" +
    		" WHERE C.JourneyID = (?) AND C.UserID = (?) AND substr(T.ResultDate,1,10) BETWEEN (?) AND (?)" +
    		" GROUP BY substr(T.ResultDate,1,10)" +
    		" UNION ALL" +
    		" SELECT substr(T.ResultDate,1,10) AS Date,'OtherCollections',SUM (Case WHEN T.AgreementMode = 'S' THEN (T.AgreementAmountPaid - A.Terms) ELSE 0 END) AS CashSUM" +
    		" FROM mtbTransaction AS T" +
    		" INNER JOIN mtbAgreement AS A ON A.AgreementID = T.AgreementID" +
    		" INNER JOIN mtbCustomer AS C ON C.CustomerID = A.CustomerID" +
    		" WHERE C.JourneyID = (?) AND C.UserID = (?) AND substr(T.ResultDate,1,10) BETWEEN (?) AND (?)" +
    		" GROUP BY substr(T.ResultDate,1,10)" +
    		" UNION ALL" +
    		" SELECT substr(BalanceDate,1,10) AS Date, BalanceTypeID,SUM(Amount) AS CashSUM" +
    		" FROM mtbBalanceTransaction" +
    		" WHERE BalanceTypeID IN ('B','L','F','O') AND IsDeleted <> 1 AND substr(BalanceDate,1,10) BETWEEN (?) AND (?)" +
    		" GROUP BY substr(BalanceDate,1,10),BalanceTypeID" +
    		" ) A" +
    		" ORDER BY 1",	
    		
	selectAgentMacIDStatement : 'SELECT UserID, MacID from mtbUser',

	selectAgentPinStatement : 'SELECT Pin from mtbUser where UserID = (?)',
	
	selectJourneyFromMtbUserStatement : "SELECT JourneyId,JourneyDescription FROM mtbUser",

	selectJourneyStatement : 'SELECT MIN(JourneyOrderBy),MAX(JourneyOrderBy) from mtbCustomer where JourneyID =(?)',
	
	selectJourneyCollectionStatement : 'select max(JourneyOrderBy) as MAX,min(JourneyOrderBy) as MIN,VisitDate,CollectionDay from mtbCustomer group by VisitDate',

	selectSDTWeekStatement : "SELECT StartDate, EndDate FROM mtbSDTWeek",
	
	selectUserLocked: "SELECT IsLocked FROM mtbUser",
	
	getSyncDataStmt : 'SELECT VisitID, CustomerID, ResultID, ResultDate, ResultStatusID, VisitStatusID, AgreementID, AgreementAmountPaid, AgreementMode from mtbTransaction where IsSynced = 0',

	getAgentDetails : 'SELECT FirstName,LastName,JourneyId,SDTW.StartDate,SDTW.EndDate FROM mtbUser AS U INNER JOIN mtbSDTWeek AS SDTW ON U.rowid=SDTW.rowid',

	updateTransactionIsSynched : 'UPDATE mtbTransaction set IsSynced = 1 where IsSynced = 0',

	updateCustomerUpdateIsSynched : 'UPDATE mtbCustomerUpdate set IsSynced = 1 where IsSynced = 0',
	
	updateBalanceTransactionIsSynched : 'UPDATE mtbBalanceTransaction set IsSynced = 1 where IsSynced = 0',

	updateUserLastSynced : 'UPDATE mtbUser set lastSynced = ? where UserID = ?',

	deleteDataCustomerTbl : "DELETE from mtbCustomer",

	deleteDataAgreementTbl : "DELETE from mtbAgreement",

	deleteDataCardPaymentTbl : "DELETE from mtbCardPayment",

	//selectDataTransaction  : "select agreementID,sum(agreementamountpaid) sumpaidamt from mtbTransaction where isSynced = 1 group by AgreementID",
	
	selectDataTransaction  : "select agreementID,agreementamountpaid  from mtbTransaction where isSynced = 1 group by AgreementID",
		
	selectCustomerUpdateData  : "SELECT CustomerID customerId, JourneyID journeyId, MobileNumber mobileNumber, PhoneNumber phoneNumber, Email email, AddressLine1 addressLine1, AddressLine2 addressLine2, AddressLine3 addressLine3, AddressLine4 addressLine4,City city,PostCode postCode,CollectionDay collectionDay,JourneyOrderBy journeyOrder,UpdatedDate updatedDate from mtbCustomerUpdate where IsSynced = 0",
	
	selectBalanceTransactionData  : "SELECT WeekNo,YearNo,BalanceID,BalanceDate,Amount,Reference,BalanceTypeID,PeriodIndicator,ChequeIndicator,IsDeleted from mtbBalanceTransaction inner join mtbSDTWeek where IsSynced = 0",
		
	getUserLastSynced : 'SELECT lastSynced FROM mtbUser where UserID = ?',

	getBalanceTransaction :	'select BalanceID,BalanceDate,Amount,Reference,ChequeIndicator from mtbBalanceTransaction where IsDeleted = 0  and BalanceTypeID = ? ORDER BY BalanceDate ASC', 
	
	getBalanceTransactionDaily : 'select BalanceID,BalanceDate,Amount,Reference,ChequeIndicator from mtbBalanceTransaction where IsDeleted = 0 and BalanceTypeID = ? and BalanceDate = ? '
};