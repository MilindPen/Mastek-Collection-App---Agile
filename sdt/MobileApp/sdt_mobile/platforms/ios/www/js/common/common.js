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
            if(amt != "" && amt != null && amt != undefined){
                return parseFloat(amt).toFixed(2);
            }
    		
    		return parseFloat(0.00).toFixed(2);
            
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


//Database Queries
var selectFromCustomerTable = "SELECT COUNT(*) FROM mtbCustomer";

var createCustomerTableStatement = 	"CREATE TABLE IF NOT EXISTS mtbCustomer ( " +
							"CustomerID INTEGER PRIMARY KEY, " +
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
							"SettlementAmount VARCHAR(50))";
							
var createMtbTransactionHistory  = "CREATE TABLE IF NOT EXISTS mtbTransactionHistory ("+
							"AgreementID INTEGER PRIMARY KEY, " +
							"TransactionID INTEGER,"+
							"PaidDate VARCHAR(50),"+
							"WeekNumber INTEGER,"+
							"PaymentMethod INTEGER,"+
							"ActualAmount VARCHAR(50),"+
							"Arrears VARCHAR(50))";
							
							


var insertIntoCustomerTableStatement = 	"INSERT OR REPLACE INTO mtbCustomer (CustomerID, VisitDate, UserID, JourneyID, Title, FirstName, MiddleName, LastName, AddressLine1, AddressLine2, AddressLine3, AddressLine4, PostCode, City, DOB, MobileNumber, PhoneNumber, Email, JourneyOrderBy, StatusID, TotalPaidAmount, TotalTermAmount, PaymentTypeId, PaymentPerformance, CustomerNumber, CollectionDay) " +
							"VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
var insertIntoAgreementTableStatement =	"INSERT OR REPLACE INTO mtbAgreement (AgreementID, CustomerID, AgreementNumber, Instalments, Terms, SettlementRebate, Arrears, StatusID, AgreementStartDate, Principal, TAP, Balance, ElapsedWeeks, ReloanedFromAgreementID, PreviousAgreementNumber, SettlementAmount)"+
							"VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
							
var insertIntoMtbTransactionHistoryTableStatement = "INSERT OR REPLACE INTO mtbTransactionHistory(AgreementID,TransactionID,PaidDate,WeekNumber,PaymentMethod,ActualAmount,Arrears) VALUES (?,?,?,?,?,?,?)"; 

var dropCustomerTableStatement = "DROP TABLE mtbCustomer";

var dropAgreementTableStatement = "DROP TABLE mtbAgreement";

var dropMtbTransactionHistoryTableStatement = "DROP TABLE mtbTransactionHistory";

//var selectSCDailyListStatement = 'SELECT * FROM mtbCustomer AS c INNER JOIN mtbAgreement AS a ON c.id=a.CustomerID WHERE c.visitDate=(?) ORDER BY c.journeyOrderNumber ASC';
//var selectSCDailyListStatement = 'SELECT * FROM mtbCustomer WHERE VisitDate=(?) AND CustomerID IN (SELECT CustomerID FROM mtbAgreement WHERE StatusID = 1) ORDER BY JourneyOrderBy ASC';
var selectSCDailyListStatement = 'SELECT CustomerID,CustomerNumber,VisitDate,JourneyOrderBy,FirstName,LastName,AddressLine1,AddressLine2,PostCode,StatusID,TotalPaidAmount,TotalTermAmount,PaymentTypeId,CollectionDay FROM mtbCustomer WHERE VisitDate=(?) AND CustomerID IN (SELECT CustomerID FROM mtbAgreement WHERE StatusID = 1) ORDER BY JourneyOrderBy ASC';
var selectSCWeeklyListStatement = 'SELECT CustomerID,CustomerNumber,VisitDate,JourneyOrderBy,FirstName,LastName,AddressLine1,AddressLine2,PostCode,StatusID,TotalPaidAmount,TotalTermAmount,PaymentTypeId,CollectionDay FROM mtbCustomer WHERE CustomerID IN (SELECT CustomerID FROM mtbAgreement WHERE StatusID = 1) ORDER BY VisitDate,JourneyOrderBy ASC'

var selectedCustDetailStatement = 'SELECT Title, FirstName, MiddleName, LastName, CustomerNumber, AddressLine1, AddressLine2, AddressLine3, AddressLine4, City, PostCode, PaymentPerformance, MobileNumber, PhoneNumber, Email, DOB, CollectionDay, JourneyOrderBy FROM mtbCustomer where CustomerNumber = (?)';
var selectCustLoanListStatement = 'SELECT AgreementNumber, AgreementStartDate, Instalments, SettlementAmount, Terms, Arrears FROM mtbAgreement where StatusID = 1 and CustomerID = (SELECT CustomerID FROM mtbCustomer where CustomerNumber =(?)) ORDER BY AgreementStartDate DESC';
	
var selectedCustLoanDetailStatement = 'SELECT AgreementID, CustomerID, AgreementNumber, Instalments, Terms, SettlementRebate, Arrears, StatusID, AgreementStartDate, Principal, TAP, Balance, ElapsedWeeks, ReloanedFromAgreementID, PreviousAgreementNumber, SettlementAmount FROM mtbAgreement where AgreementNumber = (?)';

var selectTransactionHistoryStatement = 'SELECT PaidDate,WeekNumber,PaymentMethod,ActualAmount,Arrears FROM mtbTransactionHistory WHERE AgreementID=(?) ORDER BY PaidDate DESC';
