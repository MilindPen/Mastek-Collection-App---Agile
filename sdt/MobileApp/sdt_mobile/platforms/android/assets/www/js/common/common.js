var instance;
var isSyncing = false;
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

/********************************Message Box Text**********************************/

//Customer Details Page
var messageboxCustomerDetailsPage = {
  zeroPayment: 'Customer is not paying anything in this week. Select call outcome.',
  esbAmountExceeded: ': Payment cannot be more than ESB amount',
  settlementAmtMatch: ': For settlement tap on ESB amount',
  weeklyTermExceeded: ': Customer is paying more than weekly term amount. Continue?'
  
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

//UserRegistrationConfirm Page
var messageboxUserRegConfirmPage = {
  messageTitleWarning: 'Warning',
  messageTitleSuccess: 'Success',
  
  checkDigits: 'PIN must be a 4 digit number',
  checkSimilar: 'All digits of the PIN cannot be the same',
  checkConsecutive: 'Not a valid pin',
  checkPinMismatch: 'Pin does not match. Please try again',
  registrationSuccess: 'Registration is successful'
};

var messageboxLoginPage = {
  messageTitleWarning: 'Warning',
  
  validateUserLogin: 'Invalid PIN. Try again',
  checkPinLength: 'PIN must be a 4 digit number'
};

var messageboxCallService = {
		messageTitleError: 'Error',
		messageTitleSuccess: 'Success'
}

var messageboxSaveTransaction = {
		messageTitleSuccess: 'Success'
};

var messageboxOfflineDataSave = {
		messageError: 'Error processing SQL',
		messageTitleError: 'Error'	
};

//messagebox callback
function callbackReturn(){
    return false;
};

var messageboxSync = {
  messageTitleSuccess: 'Success',
  messageTitleError: 'Error',
  
  errorSync: 'Unable to complete Sync. Please try again at a later time.',
  successSync: 'Sync finished Successfully'
  //checkPinLength: 'PIN must be a 4 digit number'
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
		    	alert("session expired");
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
							  $('div.journey').html("journey: "+dataStorage.getData(JOURNEY_ID));
		                }

		            });
		      });
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
	                                                        "Pin VARCHAR(50),"+
								"lastSynced VARCHAR(50))",



	insertIntoCustomerTableStatement : 	"INSERT OR REPLACE INTO mtbCustomer (CustomerID, VisitID, VisitDate, UserID, JourneyID, Title, FirstName, MiddleName, LastName, AddressLine1, AddressLine2, AddressLine3, AddressLine4, PostCode, City, DOB, MobileNumber, PhoneNumber, Email, JourneyOrderBy, StatusID, TotalPaidAmount, TotalTermAmount, PaymentTypeId, PaymentPerformance, CustomerNumber, CollectionDay) " +
								"VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
	insertIntoAgreementTableStatement :	"INSERT OR REPLACE INTO mtbAgreement (AgreementID, CustomerID, AgreementNumber, Instalments, Terms, SettlementRebate, Arrears, StatusID, AgreementStartDate, Principal, TAP, Balance, ElapsedWeeks, ReloanedFromAgreementID, PreviousAgreementNumber, SettlementAmount,AAIndicatorID,PaymentFrequencyID)"+
								"VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
								
	insertIntoMtbTransactionHistoryTableStatement : "INSERT OR REPLACE INTO mtbTransactionHistory(AgreementID,TransactionID,PaidDate,WeekNumber,PaymentMethod,ActualAmount,Arrears) VALUES (?,?,?,?,?,?,?)", 

	insertIntoMtbTransactionTableStatement : "INSERT OR REPLACE INTO mtbTransaction(VisitID, CustomerID, ResultID, ResultDate, ResultStatusID, VisitStatusID, AgreementID, AgreementAmountPaid, AgreementMode, Lattitude, Longitude, IsSynced) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", 

	insertIntoMtbAgentStatement : "INSERT OR REPLACE INTO mtbUser(UserID,Title,FirstName,MiddleName,LastName,MacID,Pin) VALUES (?,?,?,?,?,?,?)",
	
	insertIntoMtbCardPaymentStatement : "INSERT OR REPLACE INTO mtbCardPayment(JourneyID,WeekDate,CardPaymentAmount) VALUES (?,?,?)",

	updateCustomerTableStatement : "UPDATE mtbCustomer set StatusID = ? , TotalPaidAmount = (COALESCE(TotalPaidAmount,0)+ ?) where VisitID = ?",

	updateAgreementTableStatement : "UPDATE mtbAgreement set AmountPaid = ? where AgreementID = ?",

	dropCustomerTableStatement : "DROP TABLE mtbCustomer",

	dropAgreementTableStatement : "DROP TABLE mtbAgreement",

	dropMtbTransactionHistoryTableStatement : "DROP TABLE mtbTransactionHistory",

	dropMtbTransactionTableStatement : "DROP TABLE mtbTransaction",

	dropMtbCardPaymentTableStatement : "DROP TABLE mtbCardPayment",

	//var selectSCDailyListStatement = 'SELECT * FROM mtbCustomer AS c INNER JOIN mtbAgreement AS a ON c.id=a.CustomerID WHERE c.visitDate=(?) ORDER BY c.journeyOrderNumber ASC';
	//var selectSCDailyListStatement = 'SELECT * FROM mtbCustomer WHERE VisitDate=(?) AND CustomerID IN (SELECT CustomerID FROM mtbAgreement WHERE StatusID = 1) ORDER BY JourneyOrderBy ASC';
	selectSCDailyListStatement : 'SELECT CustomerID,CustomerNumber,VisitDate,JourneyOrderBy,FirstName,LastName,AddressLine1,AddressLine2,PostCode,StatusID,TotalPaidAmount,TotalTermAmount,PaymentTypeId,CollectionDay FROM mtbCustomer WHERE VisitDate=(?) AND CustomerID IN (SELECT CustomerID FROM mtbAgreement WHERE StatusID = 1) ORDER BY JourneyOrderBy ASC',
	
	selectSCWeeklyListStatement : 'SELECT CustomerID,CustomerNumber,VisitDate,JourneyOrderBy,FirstName,LastName,AddressLine1,AddressLine2,PostCode,StatusID,TotalPaidAmount,TotalTermAmount,PaymentTypeId,CollectionDay FROM mtbCustomer WHERE CustomerID IN (SELECT CustomerID FROM mtbAgreement WHERE StatusID = 1) ORDER BY VisitDate,JourneyOrderBy ASC',

	 selectedCustDetailStatement : 'SELECT VisitID,CustomerNumber, Title, FirstName, MiddleName, LastName, AddressLine1, AddressLine2, AddressLine3, AddressLine4, City, PostCode, PaymentPerformance, MobileNumber, PhoneNumber, Email, DOB, CollectionDay, JourneyOrderBy, TotalPaidAmount FROM mtbCustomer where CustomerNumber = (?)',
	 selectCustLoanListStatement : 'SELECT AgreementID,CustomerID,AgreementNumber, AmountPaid, AgreementStartDate,ElapsedWeeks,Balance, Instalments, SettlementAmount, Terms, Arrears,AAIndicatorID, PaymentFrequencyID FROM mtbAgreement where StatusID = 1 and CustomerID = (SELECT CustomerID FROM mtbCustomer where CustomerNumber =(?)) ORDER BY AgreementStartDate DESC',
	 selectCustPaymentPerformanceStatement : 'SELECT AgreementID,CustomerID,AgreementNumber, AgreementStartDate,ElapsedWeeks,Balance, Instalments, SettlementAmount, Terms, Arrears,AAIndicatorID,PreviousAgreementNumber FROM mtbAgreement where CustomerID = (SELECT CustomerID FROM mtbCustomer where CustomerNumber =(?)) ORDER BY AgreementStartDate DESC',

	 selectedCustLoanDetailStatement : 'SELECT AgreementID, CustomerID, AgreementNumber, Instalments, Terms, SettlementRebate, Arrears, StatusID, AgreementStartDate, Principal, TAP, Balance, ElapsedWeeks, ReloanedFromAgreementID, PreviousAgreementNumber, SettlementAmount FROM mtbAgreement where AgreementNumber = (?)',

	 selectTransactionHistoryStatement : 'SELECT PaidDate,WeekNumber,PaymentMethod,ActualAmount,Arrears FROM mtbTransactionHistory WHERE AgreementID=(?) ORDER BY PaidDate DESC',

	 selectDailyCallsClosed : 'SELECT COUNT(*) FROM mtbCustomer WHERE VisitDate = (?) AND JourneyID = (?) AND UserID = (?) AND StatusID IN ("2","4","5","6","7","8")',

	selectWeeklyCallsClosed : 'SELECT COUNT(*) FROM mtbCustomer WHERE StatusID IN ("2","4","5","6","7","8") AND JourneyID = (?) AND UserID = (?) AND  VisitDate BETWEEN (?) AND (?)',

	selectDailyTargetCalls : 'SELECT COUNT(*) FROM mtbCustomer WHERE VisitDate = (?) AND JourneyID = (?) AND UserID = (?)',

	selectWeeklyTargetCalls : 'SELECT COUNT(*) FROM mtbCustomer WHERE JourneyID = (?) AND UserID = (?) AND VisitDate BETWEEN (?) AND (?)',

	selectDailyCardPayments : 'SELECT SUM(CardPaymentAmount) AS CashSUM FROM mtbCardPayment WHERE JourneyID = (?) AND substr(WeekDate,0,11) = (?)',

	selectWeeklyCardPayments : 'SELECT SUM(CardPaymentAmount) AS CashSUM FROM mtbCardPayment WHERE JourneyID = (?) AND substr(WeekDate,0,11) BETWEEN (?) AND (?)',

	selectDailyTermCollcetions : "SELECT SUM (Case WHEN T.AgreementMode = 'S' THEN A.Terms ELSE T.AgreementAmountPaid END) AS CashSUM" +
									 " FROM mtbTransaction AS T"+
								 	 " INNER JOIN mtbAgreement AS A ON A.AgreementID = T.AgreementID"+
								 	 " INNER JOIN mtbCustomer AS C ON C.CustomerID = A.CustomerID"+
								 	 " WHERE substr(T.ResultDate,0,11) = (?) AND C.JourneyID = (?) AND C.UserID = (?)",

	selectWeeklyTermCollcetions : "SELECT SUM (Case WHEN T.AgreementMode = 'S' THEN A.Terms ELSE T.AgreementAmountPaid END) AS CashSUM" +
									 " FROM mtbTransaction AS T"+
									 " INNER JOIN mtbAgreement AS A ON A.AgreementID = T.AgreementID"+
									 " INNER JOIN mtbCustomer AS C ON C.CustomerID = A.CustomerID"+
									 " WHERE C.JourneyID = (?) AND C.UserID = (?) AND substr(T.ResultDate,0,11) BETWEEN (?) AND (?)",

	selectDailyOtherCollcetions : "SELECT SUM (Case WHEN T.AgreementMode = 'S' THEN (T.AgreementAmountPaid - A.Terms) ELSE 0 END) AS CashSUM" +
									 " FROM mtbTransaction AS T"+
									 " INNER JOIN mtbAgreement AS A ON A.AgreementID = T.AgreementID"+
									 " INNER JOIN mtbCustomer AS C ON C.CustomerID = A.CustomerID"+
									 " WHERE substr(T.ResultDate,0,11) = (?) AND C.JourneyID = (?) AND C.UserID = (?)",

	selectWeeklyOtherCollcetions : "SELECT SUM (Case WHEN T.AgreementMode = 'S' THEN (T.AgreementAmountPaid - A.Terms) ELSE 0 END) AS CashSUM" +
									  " FROM mtbTransaction AS T"+
									  " INNER JOIN mtbAgreement AS A ON A.AgreementID = T.AgreementID"+
									  " INNER JOIN mtbCustomer AS C ON C.CustomerID = A.CustomerID"+
									  " WHERE C.JourneyID = (?) AND C.UserID = (?) AND substr(T.ResultDate,0,11) BETWEEN (?) AND (?)",

	selectAgentMacIDStatement : 'SELECT UserID, MacID from mtbUser',

	selectAgentPinStatement : 'SELECT Pin from mtbUser where UserID = (?)',

	getSyncDataStmt : 'SELECT VisitID, CustomerID, ResultID, ResultDate, ResultStatusID, VisitStatusID, AgreementID, AgreementAmountPaid, AgreementMode from mtbTransaction where IsSynced = 0',

	getAgentDetails : 'SELECT FirstName,LastName FROM mtbUser',

	updateTransactionIsSynched : 'UPDATE mtbTransaction set IsSynced = 1 where IsSynced = 0',

	updateUserLastSynced : 'UPDATE mtbUser set lastSynced = ? where UserID = ?',

	deleteDataCustomerTbl : "DELETE from mtbCustomer",

	deleteDataAgreementTbl : "DELETE from mtbCustomer",

	selectDataTransaction  : "select agreementID,sum(agreementamountpaid) sumpaidamt from mtbTransaction where isSynced = 1 group by AgreementID",
		
	getUserLastSynced : 'SELECT lastSynced FROM mtbUser where UserID = ?',	
};


//Database Queries
var selectFromCustomerTable = "SELECT COUNT(*) FROM mtbCustomer";

var selectAgentOfflineTable = "SELECT count(name) FROM sqlite_master WHERE type='table' AND name='mtbUser'";

var createCustomerTableStatement = 	"CREATE TABLE IF NOT EXISTS mtbCustomer ( " +
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
							"CollectionDay VARCHAR(50))";

var createAgreementTableStatement = 	"CREATE TABLE IF NOT EXISTS mtbAgreement ("+
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
							"PaymentFrequencyID INTEGER)";
							
var createMtbTransactionHistory  = "CREATE TABLE IF NOT EXISTS mtbTransactionHistory ("+
							"AgreementID INTEGER, " +
							"TransactionID INTEGER,"+
							"PaidDate VARCHAR(50),"+
							"WeekNumber INTEGER,"+
							"PaymentMethod INTEGER,"+
							"ActualAmount VARCHAR(50),"+
							"Arrears VARCHAR(50))";
							
var createMtbTransaction  = "CREATE TABLE IF NOT EXISTS mtbTransaction ("+
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
							"IsSynced INTEGER)";							
							
var createMtbCardPayment = "CREATE TABLE IF NOT EXISTS mtbCardPayment ("+
						   "JourneyID INTEGER,"+
						   "WeekDate VARCHAR(20),"+
						   "CardPaymentAmount VARCHAR(20))";
						   
var createMtbAgentTableStatement = "CREATE TABLE IF NOT EXISTS mtbUser("+
                                                        "UserID INTEGER,"+
                                                        "Title VARCHAR(50),"+
                                                        "FirstName VARCHAR(50),"+
                                                        "MiddleName VARCHAR(50),"+
                                                        "LastName VARCHAR(50),"+
                                                        "MacID VARCHAR(50),"+
                                                        "Pin VARCHAR(50))";



var insertIntoCustomerTableStatement = 	"INSERT OR REPLACE INTO mtbCustomer (CustomerID, VisitID, VisitDate, UserID, JourneyID, Title, FirstName, MiddleName, LastName, AddressLine1, AddressLine2, AddressLine3, AddressLine4, PostCode, City, DOB, MobileNumber, PhoneNumber, Email, JourneyOrderBy, StatusID, TotalPaidAmount, TotalTermAmount, PaymentTypeId, PaymentPerformance, CustomerNumber, CollectionDay) " +
							"VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
var insertIntoAgreementTableStatement =	"INSERT OR REPLACE INTO mtbAgreement (AgreementID, CustomerID, AgreementNumber, Instalments, Terms, SettlementRebate, Arrears, StatusID, AgreementStartDate, Principal, TAP, Balance, ElapsedWeeks, ReloanedFromAgreementID, PreviousAgreementNumber, SettlementAmount,AAIndicatorID,PaymentFrequencyID)"+
							"VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
							
var insertIntoMtbTransactionHistoryTableStatement = "INSERT OR REPLACE INTO mtbTransactionHistory(AgreementID,TransactionID,PaidDate,WeekNumber,PaymentMethod,ActualAmount,Arrears) VALUES (?,?,?,?,?,?,?)"; 

var insertIntoMtbTransactionTableStatement = "INSERT OR REPLACE INTO mtbTransaction(VisitID, CustomerID, ResultID, ResultDate, ResultStatusID, VisitStatusID, AgreementID, AgreementAmountPaid, AgreementMode, Lattitude, Longitude, IsSynced) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)"; 

var insertIntoMtbAgentStatement = "INSERT OR REPLACE INTO mtbUser(UserID,Title,FirstName,MiddleName,LastName,MacID,Pin) VALUES (?,?,?,?,?,?,?)";
var insertIntoMtbCardPaymentStatement = "INSERT OR REPLACE INTO mtbCardPayment(JourneyID,WeekDate,CardPaymentAmount) VALUES (?,?,?)";

var updateCustomerTableStatement = "UPDATE mtbCustomer set StatusID = ? , TotalPaidAmount = (COALESCE(TotalPaidAmount,0)+ ?) where VisitID = ?";

var updateAgreementTableStatement = "UPDATE mtbAgreement set AmountPaid = ? where AgreementID = ?";

var dropCustomerTableStatement = "DROP TABLE mtbCustomer";

var dropAgreementTableStatement = "DROP TABLE mtbAgreement";

var dropMtbTransactionHistoryTableStatement = "DROP TABLE mtbTransactionHistory";

var dropMtbTransactionTableStatement = "DROP TABLE mtbTransaction";

var dropMtbCardPaymentTableStatement = "DROP TABLE mtbCardPayment";

//var selectSCDailyListStatement = 'SELECT * FROM mtbCustomer AS c INNER JOIN mtbAgreement AS a ON c.id=a.CustomerID WHERE c.visitDate=(?) ORDER BY c.journeyOrderNumber ASC';
//var selectSCDailyListStatement = 'SELECT * FROM mtbCustomer WHERE VisitDate=(?) AND CustomerID IN (SELECT CustomerID FROM mtbAgreement WHERE StatusID = 1) ORDER BY JourneyOrderBy ASC';
var selectSCDailyListStatement = 'SELECT CustomerID,CustomerNumber,VisitDate,JourneyOrderBy,FirstName,LastName,AddressLine1,AddressLine2,PostCode,StatusID,TotalPaidAmount,TotalTermAmount,PaymentTypeId,CollectionDay FROM mtbCustomer WHERE VisitDate=(?) AND CustomerID IN (SELECT CustomerID FROM mtbAgreement WHERE StatusID = 1) ORDER BY JourneyOrderBy ASC';
var selectSCWeeklyListStatement = 'SELECT CustomerID,CustomerNumber,VisitDate,JourneyOrderBy,FirstName,LastName,AddressLine1,AddressLine2,PostCode,StatusID,TotalPaidAmount,TotalTermAmount,PaymentTypeId,CollectionDay FROM mtbCustomer WHERE CustomerID IN (SELECT CustomerID FROM mtbAgreement WHERE StatusID = 1) ORDER BY VisitDate,JourneyOrderBy ASC';

var selectedCustDetailStatement = 'SELECT VisitID,CustomerNumber, Title, FirstName, MiddleName, LastName, AddressLine1, AddressLine2, AddressLine3, AddressLine4, City, PostCode, PaymentPerformance, MobileNumber, PhoneNumber, Email, DOB, CollectionDay, JourneyOrderBy FROM mtbCustomer where CustomerNumber = (?)';
var selectCustLoanListStatement = 'SELECT AgreementID,CustomerID,AgreementNumber, AgreementStartDate,ElapsedWeeks,Balance, Instalments, SettlementAmount, Terms, Arrears,AAIndicatorID, PaymentFrequencyID FROM mtbAgreement where StatusID = 1 and CustomerID = (SELECT CustomerID FROM mtbCustomer where CustomerNumber =(?)) ORDER BY AgreementStartDate DESC';
var selectCustPaymentPerformanceStatement = 'SELECT AgreementID,CustomerID,AgreementNumber, AgreementStartDate,ElapsedWeeks,Balance, Instalments, SettlementAmount, Terms, Arrears,AAIndicatorID FROM mtbAgreement where CustomerID = (SELECT CustomerID FROM mtbCustomer where CustomerNumber =(?)) ORDER BY AgreementStartDate DESC';

var selectedCustLoanDetailStatement = 'SELECT AgreementID, CustomerID, AgreementNumber, Instalments, Terms, SettlementRebate, Arrears, StatusID, AgreementStartDate, Principal, TAP, Balance, ElapsedWeeks, ReloanedFromAgreementID, PreviousAgreementNumber, SettlementAmount FROM mtbAgreement where AgreementNumber = (?)';

var selectTransactionHistoryStatement = 'SELECT PaidDate,WeekNumber,PaymentMethod,ActualAmount,Arrears FROM mtbTransactionHistory WHERE AgreementID=(?) ORDER BY PaidDate DESC';

var selectDailyCallsClosed = 'SELECT COUNT(*) FROM mtbCustomer WHERE VisitDate = (?) AND JourneyID = (?) AND UserID = (?) AND StatusID IN ("2","4","5","6","7","8")';

var selectWeeklyCallsClosed = 'SELECT COUNT(*) FROM mtbCustomer WHERE StatusID IN ("2","4","5","6","7","8") AND JourneyID = (?) AND UserID = (?) AND  VisitDate BETWEEN (?) AND (?)';

var selectDailyTargetCalls = 'SELECT COUNT(*) FROM mtbCustomer WHERE VisitDate = (?) AND JourneyID = (?) AND UserID = (?)';

var selectWeeklyTargetCalls = 'SELECT COUNT(*) FROM mtbCustomer WHERE JourneyID = (?) AND UserID = (?) AND VisitDate BETWEEN (?) AND (?)';

var selectDailyCardPayments = 'SELECT SUM(CardPaymentAmount) FROM mtbCardPayment WHERE JourneyID = (?) AND WeekDate = (?)';

var selectWeeklyCardPayments = 'SELECT SUM(CardPaymentAmount) FROM mtbCardPayment WHERE JourneyID = (?) AND WeekDate BETWEEN (?) AND (?)';

var selectDailyTermCollcetions = "SELECT SUM (Case WHEN T.AgreementMode = 'S' THEN A.Terms ELSE T.AgreementAmountPaid END) AS CashSUM" +
								 " FROM mtbTransaction AS T"+
							 	 " INNER JOIN mtbAgreement AS A ON A.AgreementID = T.AgreementID"+
							 	 " INNER JOIN mtbCustomer AS C ON C.CustomerID = A.CustomerID"+
							 	 " WHERE substr(T.ResultDate,0,11) = (?) AND C.JourneyID = (?) AND C.UserID = (?)";

var selectWeeklyTermCollcetions = "SELECT SUM (Case WHEN T.AgreementMode = 'S' THEN A.Terms ELSE T.AgreementAmountPaid END) AS CashSUM" +
								 " FROM mtbTransaction AS T"+
								 " INNER JOIN mtbAgreement AS A ON A.AgreementID = T.AgreementID"+
								 " INNER JOIN mtbCustomer AS C ON C.CustomerID = A.CustomerID"+
								 " WHERE C.JourneyID = (?) AND C.UserID = (?) AND substr(T.ResultDate,0,11) BETWEEN (?) AND (?)";

var selectDailyOtherCollcetions = "SELECT SUM (Case WHEN T.AgreementMode = 'S' THEN (T.AgreementAmountPaid - A.Terms) ELSE 0 END) AS CashSUM" +
								 " FROM mtbTransaction AS T"+
								 " INNER JOIN mtbAgreement AS A ON A.AgreementID = T.AgreementID"+
								 " INNER JOIN mtbCustomer AS C ON C.CustomerID = A.CustomerID"+
								 " WHERE substr(T.ResultDate,0,11) = (?) AND C.JourneyID = (?) AND C.UserID = (?)";

var selectWeeklyOtherCollcetions = "SELECT SUM (Case WHEN T.AgreementMode = 'S' THEN (T.AgreementAmountPaid - A.Terms) ELSE 0 END) AS CashSUM" +
								  " FROM mtbTransaction AS T"+
								  " INNER JOIN mtbAgreement AS A ON A.AgreementID = T.AgreementID"+
								  " INNER JOIN mtbCustomer AS C ON C.CustomerID = A.CustomerID"+
								  " WHERE C.JourneyID = (?) AND C.UserID = (?) AND substr(T.ResultDate,0,11) BETWEEN (?) AND (?)";

var selectDailyCardPayments = "SELECT CardPaymentAmount FROM mtbCardPayment WHERE JourneyID = (?) AND WeekDate = (?)";

var selectWeeklyCardPayments = "SELECT SUM(CardPaymentAmount) FROM mtbCardPayment WHERE JourneyID = (?) AND substr(WeekDate,0,11) BETWEEN (?) AND (?)";

var selectAgentMacIDStatement = 'SELECT UserID, MacID from mtbUser';

var selectAgentPinStatement = 'SELECT Pin from mtbUser where UserID = (?)';

var getSyncDataStmt = 'SELECT VisitID, CustomerID, ResultID, ResultDate, ResultStatusID, VisitStatusID, AgreementID, AgreementAmountPaid, AgreementMode from mtbTransaction where IsSynced = 0';

var getAgentDetails = 'SELECT FirstName,LastName FROM mtbUser';

var updateTransactionIsSynched = 'UPDATE mtbTransaction set IsSynced = 1 where IsSynced = 0';

var updateUserLastSynced = 'UPDATE mtbUser set lastSynced = ? where UserID = ?';

var deleteDataCustomerTbl = "DELETE from mtbCustomer";

var deleteDataAgreementTbl = "DELETE from mtbCustomer";
