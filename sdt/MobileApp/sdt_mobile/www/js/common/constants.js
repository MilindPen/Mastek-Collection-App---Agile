var SUBSCRIPTION_KEY = "9bb255f311d94c55934d8750e0242d99";
var USER_ID = "userId";
var JOURNEY_ID = "journeyID";
var JOURNEY_DESCRIPTION = "journeyDescription";
var LOGGEDINUSER_BRANCH_ID = "loggedInUserBranchId";
var JOURNEYAGENT_STARTDATE = "journeyAgentStartDate";
var JOURNEYAGENT_ENDDATE = "journeyAgentEndDate";
var DB_NAME = "sdtmobiledb";
var TODAYS_DAY = "todaysDay";
var TODAYS_DAY_ID = "todaysDayId";
var TODAYS_DATE = "todaysDate";
var SELECTED_VISIT_DATE = "selectedVisitDate";
var SELECTED_VISIT_DAY = "selectedVisitDay";
var CUSTOMER_VISITS_OBJ = "customerVisits";
var SELECTED_CUSTOMER_NUM = "selectedCustNumber";
var IS_WEEKLY_VIEW = "isWeekly";
var SELECTED_CUSTOMER_NAME = "selectedCustName";
var SELECTED_AGREEMENT_NUM = "selectedAgreementNumber";
var DEVICE_TYPE = "deviceType";
var DASHBOARD_ACTIVE_TAB = "dashboardActiveTab";
var USERREG_AGENT_DATA = "userRegAgentData";
var DEVICE_MACADDRESS = "deviceMacAddress";
var WEEK_START_DATE = "weekStartDate";
var WEEK_END_DATE = "weekEndDate";
var SELECTED_BALANCE_TYPE = "selectedBalanceType";
var IS_USER_LOCKED = "isUserLocked";
var SCROLL_POSITION = "scrollPosition";
var CUST_DETAILS_AFTER_SAVE = "custDetailsAfterSave";
var DELEGATION_FROM_DATE = "delegationFromDate";
var DELEGATION_TO_DATE = "delegationToDate";
var DELEGATION_AGENT_USERID = "delegatedAgentUserId";
var PRIMARY_JOURNEY_ID = "primaryJourneyID";
var IS_SELECTED_JOURNEY_PRIMARY = "isSelectedJourneyPrimary";
var PRIMARY_AGENT_NAME = "primaryAgentName";

//Integration service
//var SYNC_URL = "http://sdtintresteasyapi.azurewebsites.net";
//var TRANSACTION_SYNC_URL = "http://inttransactionrs.azurewebsites.net/transaction-rs/api";
//var CUSTOMER_SYNC_URL = "http://intcustomerrs.azurewebsites.net/customer-rs/api";
//var SECURITY_SYNC_URL = "http://intsecurityrs.azurewebsites.net/security-rs/api";

//New Service
//var CUSTOMER_SYNC_URL = "https://sdtmobile.azure-api.net/int/customer";
//var TRANSACTION_SYNC_URL = "https://sdtmobile.azure-api.net/int/transaction";
//var SECURITY_SYNC_URL = "https://sdtmobile.azure-api.net/int/security";

//Development service 
//var SYNC_URL = "http://sdt-resteasyapi.azurewebsites.net";
//var TRANSACTION_SYNC_URL = "http://sdttransactionrs.azurewebsites.net/transaction-rs";
//var CUSTOMER_SYNC_URL = "http://sdt-resteasyapi.azurewebsites.net/customer-rs";

//var CUSTOMER_SYNC_URL =  "http://devcustomerrs.azurewebsites.net/customer-rs/api";
//var TRANSACTION_SYNC_URL = "http://devtransactionrs.azurewebsites.net/transaction-rs/api";
//var SECURITY_SYNC_URL = "http://devsecurityrs.azurewebsites.net/security-rs/api";

//New Service
//var CUSTOMER_SYNC_URL = "https://sdtmobile.azure-api.net/dev/customer";
//var TRANSACTION_SYNC_URL = "https://sdtmobile.azure-api.net/dev/transaction";
//var SECURITY_SYNC_URL = "https://sdtmobile.azure-api.net/dev/security";
//var BALANCING_SYNC_URL = "https://sdtmobile.azure-api.net/dev/balancing"

//var CUSTOMER_SYNC_URL_OLD =  "http://devcustomerrs.azurewebsites.net/customer-rs/api";

//VM
//var CUSTOMER_SYNC_URL = "http://172.16.145.38:9090/customer-rs/api";
//var TRANSACTION_SYNC_URL = "http://172.16.145.38:9090/transaction-rs/api";
//var SECURITY_SYNC_URL = "http://172.16.145.38:9090/security-rs/api";
//var BALANCING_SYNC_URL = "http://172.16.145.38:9090/balancing-rs/api";

var CUSTOMER_SYNC_URL = "http://portal.mastek.com/customer-rs/api";
var TRANSACTION_SYNC_URL = "http://portal.mastek.com/transaction-rs/api";
var SECURITY_SYNC_URL = "http://portal.mastek.com/security-rs/api";
var BALANCING_SYNC_URL = "http://portal.mastek.com/balancing-rs/api";

//local
//var CUSTOMER_SYNC_URL =  "http://172.16.145.33:9092/customer-rs/api";
//var TRANSACTION_SYNC_URL = "http://172.16.145.33:9092/transaction-rs/api";
//var SECURITY_SYNC_URL = "http://172.16.145.33:9092/security-rs/api";

//UAT service
//var CUSTOMER_SYNC_URL = "http://uatcustomerrs.azurewebsites.net/customer-rs/api";
//var TRANSACTION_SYNC_URL = "http://uattransactionrs.azurewebsites.net/transaction-rs/api";
//var SECURITY_SYNC_URL = " http://uatsecurityrs.azurewebsites.net/security-rs/api";

//New Service
//var CUSTOMER_SYNC_URL = "https://sdtmobile.azure-api.net/uat/customer";
//var TRANSACTION_SYNC_URL = "https://sdtmobile.azure-api.net/uat/transaction";
//var SECURITY_SYNC_URL = "https://sdtmobile.azure-api.net/uat/security";

//User Session constants
var SESSION_TIMEOUT =  300000;  //5mins
var SESSION_ID_KEY = "sdtUserSession";
var KEY = 'sachin';

//Constant defined for setting multiple of term amount in CustomerDetails/LoanList
var TERM_MULTIPLE = 2;

//Number of Days for Delegation

var DAYS = 35;


//Application version (to be changed every time we release a new build)
var APP_VERSION = "Version: 3.3";
