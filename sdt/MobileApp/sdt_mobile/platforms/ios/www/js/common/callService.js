var startEndDates=[];
var customerVisits = [];
var agreementList = [];
var weekDays = common.calcWeekDays();
startEndDates = common.calcStartEndDates(weekDays[0],weekDays[1]);

var service = {
		
		/***********************************service call to get the scheduled customer list********************************/
		getCustomerInformation: function(){
			var startDate = startEndDates[0];
			var endDate = startEndDates[1]
			var selectedUserId = dataStorage.getData(USER_ID);
			var selectedJourneyId = dataStorage.getData(JOURNEY_ID);
			
			var custJSONReq = {
					  "access": {
						"userId": selectedUserId
					  },
					  "startDate": startDate,
					  "endDate": endDate,
					  "journeyId": selectedJourneyId
					};
			console.log(custJSONReq);
			console.log("service");
	    	$.ajax({
                    type: 'POST',
	            url: SYNC_URL + "/customer-rs/customers/scheduled",
	            contentType: "application/json",
	            dataType:"json",
	            data: JSON.stringify(custJSONReq),
	            success:function (data) {
	            	if(data.errorMessage){
	            		alert(data.errorMessage);
	            	}
	            	else{
	            		console.log("req obj:"+JSON.stringify(custJSONReq));
		            	console.log(data);
		            	dataStorage.insertIntoOfflineDB(data);
	            	}
	            },
	            error: function(model, response) {
	                alert("Error connecting to the server");
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