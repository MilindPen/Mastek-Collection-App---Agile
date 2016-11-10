var loggedINUserBranchId = dataStorage.getData(LOGGEDINUSER_BRANCH_ID);
var weekStartDate = dataStorage.getData(WEEK_START_DATE);
var weekEndDate = dataStorage.getData(WEEK_END_DATE);
var primaryJourneyEndDate = dataStorage.getData(JOURNEYAGENT_ENDDATE);
var selectedUserId = dataStorage.getData(USER_ID);

/***************************************actions to perform on document ready************************************************/
$(document).on('ready',function(){

	//Check for delegated journeys and disable select journey option all sideMenu 
	sideMenu.checkDeligatedJourneys();
    
	
	//document.addEventListener("deviceready", onDeviceReady, false);
		
		$('#fromDate').val("");
		$('#toDate').val("");
		
		// Service call to get Agent List
		delegationServices.getUserSelectionData(weekStartDate,weekEndDate,loggedINUserBranchId,function(data){
				renderUserData(data);	
		});
			
		//redirect to dashboard on click of icon
        $('.dashboardIcon').on('click',function(){
            common.redirect('dashboard.html');
        });
		
		
		$('#selectDelegationCust').on('click',function(){
            //common.redirect('customerSelectionDeligation.html');
			if(validateDates())
			{
				common.redirect('customerSelectionDeligation.html');
			}
        });
		
		$('#selectDelegationAllCust').on('click',function(){
            //common.redirect('customerSelectionDeligation.html');
			if(validateDates())
			{
				common.confirmMessage(messageboxDelegationPage.msgConfirmDelegateAll,confirmCallbackDelegation, messageboxDelegationPage.messageTitleConfirm); 
				
			}
        });
		
		$('#filter-menu-button').on('click',function(){
            $('input[data-type="search"]').val('');
			$('input[data-type="search"]').trigger("keyup");
        });
		
		
		
		sideMenu.getSideMenuAgentDetails();
		
		
	
});

function validateDates()
{
	var fromDate = $('#fromDate').val();
	var toDate = $('#toDate').val();
	var agent = $('#filter-menu').val();
	
	if(fromDate == "" && toDate == ""){
		common.alertMessage(messageboxDelegationPage.checkEmptyFields, callbackReturn, messageboxDelegationPage.messageTitleError);
		return false;
	}
	else if(fromDate == ""){ //if fromDate empty
		common.alertMessage(messageboxDelegationPage.checkEmptyFields, callbackReturn, messageboxDelegationPage.messageTitleError);
		return false;
	}
	else if(toDate == ""){ //if toDate empty
		
		common.alertMessage(messageboxDelegationPage.checkEmptyFields, callbackReturn, messageboxDelegationPage.messageTitleError);
		return false;
	}
	else if(agent == "Select"){ //if agent empty
		
		common.alertMessage(messageboxDelegationPage.checkEmptyFields, callbackReturn, messageboxDelegationPage.messageTitleError);
		return false;
	}
	else {
		//Dates are not empty	
		
		var tempFromDate = fromDate.toString().split("/");
		var selectedFromDate = tempFromDate[2]+"-"+tempFromDate[1]+"-"+tempFromDate[0];
	  
		var tempToDate = toDate.toString().split("/");
		var selectedToDate = tempToDate[2]+"-"+tempToDate[1]+"-"+tempToDate[0];
		
		var futureEndDate = moment(Date.parse(weekEndDate)).add(DAYS, 'd').format("YYYY-MM-DD"); // End Date + 35 days
	  
		var errmsg = "";
		
		var tempWeekStartDate = weekStartDate.toString().split("-");
		var formattedWeekStartDate = tempWeekStartDate[2]+"/"+tempWeekStartDate[1]+"/"+tempWeekStartDate[0];
		
		var tempPrimaryJourneyEndDate = primaryJourneyEndDate.toString().split("-");
		var formattedPrimaryJourneyEndDate = tempPrimaryJourneyEndDate[2]+"/"+tempPrimaryJourneyEndDate[1]+"/"+tempPrimaryJourneyEndDate[0];
		
		var tempFutureEndDate = futureEndDate.toString().split("-");
		var formattedFutureEndDate = tempFutureEndDate[2]+"/"+tempFutureEndDate[1]+"/"+tempFutureEndDate[0];
		
		if(primaryJourneyEndDate != null && primaryJourneyEndDate != "" && primaryJourneyEndDate != "null" && Date.parse(primaryJourneyEndDate) < Date.parse(futureEndDate))
		{
			errmsg = "Dates should be between "+formattedWeekStartDate+" and "+formattedPrimaryJourneyEndDate;
		}
		else
		{
			errmsg = "Dates should be between "+formattedWeekStartDate+" and "+formattedFutureEndDate;
		}
		//alert(futureEndDate);
		//alert(fromDate+" "+toDate+" "+selectedToDate+" "+selectedFromDate);
	
		if(Date.parse(selectedFromDate) < Date.parse(weekStartDate)){
			//alert("From Date cannot be less than week start date");
			common.alertMessage(errmsg, callbackReturn, messageboxDelegationPage.messageTitleError);
			return false;
		}
		else if(Date.parse(selectedFromDate) > Date.parse(futureEndDate)){
			//alert("From Date cannot be greater than week end date + 35 days");
			common.alertMessage(errmsg, callbackReturn, messageboxDelegationPage.messageTitleError);
			return false;
		}
		else if(Date.parse(selectedFromDate) > Date.parse(selectedToDate)){
			//alert("To Date cannot be earlier that from date");
			common.alertMessage(messageboxDelegationPage.dateValidation, callbackReturn, messageboxDelegationPage.messageTitleError);
			return false;
		}
		else if(Date.parse(selectedToDate) > Date.parse(futureEndDate)){
			//alert("To Date cannot be greater than week end date + 35 days");
			common.alertMessage(errmsg, callbackReturn, messageboxDelegationPage.messageTitleError);
			return false;
		}
		else if(Date.parse(selectedToDate) > Date.parse(primaryJourneyEndDate) && primaryJourneyEndDate != null && primaryJourneyEndDate != "" && primaryJourneyEndDate != "null"){
				//alert("To Date cannot be greater than primary journey end date");
				common.alertMessage(errmsg, callbackReturn, messageboxDelegationPage.messageTitleError);
				return false;
		}
		else
		{
			dataStorage.setData(DELEGATION_FROM_DATE,selectedFromDate);
			dataStorage.setData(DELEGATION_TO_DATE,selectedToDate);
			dataStorage.setData(DELEGATION_AGENT_USERID,agent);
			//common.redirect('customerSelectionDeligation.html');
			return true;
		}
		
	}
}
	
function renderUserData(data){
	var agentList = data.users;
	console.log(agentList.length);
	var userid = dataStorage.getData(USER_ID);
	var x = document.getElementById("filter-menu");
	
	//add week options to week selection dropdown
	for(var i=0; i<agentList.length; i++){
		if(userid != agentList[i].userId){
			var option = document.createElement("option");
		
			var agentName = (agentList[i].firstName).trim() + " " + (agentList[i].lastName).trim();
			var agentUserId = agentList[i].userId;
			option.text = agentName;
			option.value = agentUserId;
			
			x.add(option);
		}
	}
	$("#filter-menu").selectmenu('refresh', true);
	
		//set first option as default selected
		$("#filter-menu").prop("selectedIndex", 0);
	
	
	var selAgentUserIdDelegation = $("#filter-menu").val(); 
	var selAgentDelegation = $("#filter-menu option:selected").text();
	console.log("selAgentDelegation "+selAgentDelegation);
	//session.setData(SELECTED_BRANCH,selectedBranch);
	//session.setData(SELECTED_BRANCH_NAME,selectedBranchName);
	
}

//onchange of week selection dropdown
$('#filter-menu').change(function(){
	var selAgentUserIdDelegation = $(this).val(); 
	var selAgentDelegation = $(this).find('option:selected').text(); 
	console.log("selAgentDelegation "+selAgentDelegation);
	//session.setData(SELECTED_BRANCH,selectedBranch);
	//session.setData(SELECTED_BRANCH_NAME,selectedBranchName);
});

function confirmCallbackDelegation(buttonIndex){
	if(buttonIndex == 1){
      
		var delegationFromDate = dataStorage.getData(DELEGATION_FROM_DATE);
		var delegationToDate = dataStorage.getData(DELEGATION_TO_DATE);
		var journeyId = dataStorage.getData(PRIMARY_JOURNEY_ID);
		var delegatedToUserId = dataStorage.getData(DELEGATION_AGENT_USERID);
		var isSelectAll = 1;
		var customerJourneyIdList = null;
		
		// Service call to save delegated customers
		delegationServices.saveDelegatedCustomers(delegationFromDate,delegationToDate,journeyId,delegatedToUserId,isSelectAll,customerJourneyIdList,function(data){
				
				common.alertMessage(messageboxDelegationPage.msgSaveSuccess,callbackReturn,messageboxDelegationPage.messageTitleSuccess);
				common.redirect("dashboard.html");
			
		});
	  
    }
};

//session validation

$(document).on('click',function(){
	session.sessionValidate(selectedUserId)
        common.disableBackButtonAfterTimeout();;
});
function onDeviceReady() {
	console.log(navigator.notification);
    session.sessionValidate(selectedUserId);
    common.disableBackButtonAfterTimeout();
    document.addEventListener("resume", onResume, false);
}
function onResume() {
    session.sessionValidate(selectedUserId);
    common.disableBackButtonAfterTimeout();
 }
$(document).on("scrollstart",function(){
	  session.sessionValidate(selectedUserId);
          common.disableBackButtonAfterTimeout();
});



// This Code is for dropdown menu  with search
$(document)
// The custom selectmenu plugin generates an ID for the listview by suffixing the ID of the
// native widget with "-menu". Upon creation of the listview widget we want to place an
// input field before the list to be used for a filter.
.on( "listviewcreate", "#filter-menu-menu,#title-filter-menu-menu", function( event ) {var input,
list = $( event.target ),
form = list.jqmData( "filter-form" );
// We store the generated form in a variable attached to the popup so we avoid creating a
// second form/input field when the listview is destroyed/rebuilt during a refresh.
if ( !form ) {
input = $( "<input data-type='search'></input>" );
form = $( "<form></form>" ).append( input );
input.textinput();
list
.before( form )
.jqmData( "filter-form", form ) ;
form.jqmData( "listview", list );
}
// Instantiate a filterable widget on the newly created listview and indicate that the
// generated input form element is to be used for the filtering.
list.filterable({
input: input,
children: "> li:not(:jqmData(placeholder='true'))"
});
})
// The custom select list may show up as either a popup or a dialog, depending on how much
// vertical room there is on the screen. If it shows up as a dialog, then the form containing
// the filter input field must be transferred to the dialog so that the user can continue to
// use it for filtering list items.
.on( "pagecontainerbeforeshow", function( event, data ) {
var listview, form,
id = data.toPage && data.toPage.attr( "id" );
if ( !( id === "filter-menu-dialog" || id === "title-filter-menu-dialog" ) ) {
return;
}
listview = data.toPage.find( "ul" );
form = listview.jqmData( "filter-form" );
// Attach a reference to the listview as a data item to the dialog, because during the
// pagecontainerhide handler below the selectmenu widget will already have returned the
// listview to the popup, so we won't be able to find it inside the dialog with a selector.
data.toPage.jqmData( "listview", listview );
// Place the form before the listview in the dialog.
listview.before( form );
})
// After the dialog is closed, the form containing the filter input is returned to the popup.
.on( "pagecontainerhide", function( event, data ) {
var listview, form,
id = data.toPage && data.toPage.attr( "id" );
if ( !( id === "filter-menu-dialog" || id === "title-filter-menu-dialog" ) ) {
return;
}
listview = data.toPage.jqmData( "listview" ),
form = listview.jqmData( "filter-form" );
// Put the form back in the popup. It goes ahead of the listview.
listview.before( form );
});
