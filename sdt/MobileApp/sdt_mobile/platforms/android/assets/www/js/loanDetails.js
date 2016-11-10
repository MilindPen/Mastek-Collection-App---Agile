var selectedUserId = dataStorage.getData(USER_ID);

/***************************************actions to perform on document ready************************************************/
$(document).on('ready',function(){
    //calling functions
	document.addEventListener("deviceready", onDeviceReady, false);
	
  common.setHeight('.cust');
  
  $(window).resize(function() {
    common.setHeight('.cust');
  });
	
	
	
	
	var agreementNum = dataStorage.getData(SELECTED_AGREEMENT_NUM);
	//var agreementNum = 'AA12234';
    selectedCustLoanDetails.getCustLoanDetailFromOfflineDB(agreementNum);
	//selectedCustLoanDetails.renderSelectedCustDetails(1);
  
});

//session validation
$(document).on('click',function(){
	session.sessionValidate(selectedUserId);
});
function onDeviceReady() {
	console.log(navigator.notification);
    session.sessionValidate(selectedUserId);
    document.addEventListener("resume", onResume, false);
}
function onResume() {
    session.sessionValidate(selectedUserId);
 }
$(document).on("scrollstart",function(){
	  session.sessionValidate(selectedUserId);
});