//Checks If user is logged in
//common.checkUserSession();
(commonAttributes.checkUserSession==true) ? common.checkUserSession() : "";

var startDateToService,endDateToService;

var selectionSummaryVar = {
		selectedDashboardSelection : session.getData(SELECTED_DASHBOARD_SELECTION),
		selectedBranchId : session.getData(SELECTED_BRANCH),
		selectedBranchName : session.getData(SELECTED_BRANCH_NAME),
		selectedWeek : session.getData(SELECTED_WEEK),
		selectedUserId : session.getData(SELECTED_USER)
}

var temp = (selectionSummaryVar.selectedWeek).split(" ");
var weekStartDate = temp[0];
console.log("weekStartDate "+weekStartDate);
var weekEndDate = temp[1];
console.log("weekEndDate "+weekEndDate);

var selectionSummary = {
	/*renderWeekData: function(data){
		var week = data.Week;
		console.log(week.length);
		var x = document.getElementById("SDTWeekSelection");
		
		//add week options to week selection dropdown
		for(var i=0; i<week.length; i++){
			var option = document.createElement("option");
			console.log(week[i].startDate);
			var optionText1 = moment(week[i].startDate).format("DD MMM");
			var optionText2 = moment(week[i].endDate).format("DD MMM");
			var optionText = optionText1 + " - " + optionText2;
			var startDateValue = moment(week[i].startDate).format("YYYY-MM-DD");
			var endDateValue = moment(week[i].endDate).format("YYYY-MM-DD");
			var weekNumber = week[i].weekNumber;
			var yearNumber = week[i].yearNumber;
			option.text = optionText;
			option.value = startDateValue + " " + endDateValue + " " + weekNumber + " " + yearNumber;
			option.id = "week"+i;
			x.add(option);	
		}
		if(selectionSummaryVar.selectedDashboardSelection != "journeyBalance"){
			//set first option as default selected
			$("#SDTWeekSelection").prop("selectedIndex", 0);
			var selectedWeek = $("#SDTWeekSelection").val(); 
			var currentSDTWeek = $("#SDTWeekSelection option:first-child").val();	
			session.setData(SELECTED_WEEK,selectedWeek);
			session.setData(IS_SELECTED_WEEK_LATEST,1);
			session.setData(CURRENT_SDT_WEEK,currentSDTWeek);
		}
		
		//console.log($("#SDTWeekSelection").prop('value'));
		
		//call the user selection and journey selection service based on the week selected
		selectionSummary.callUserAndJourneyService();
		
	},*/
	renderWeekData: function(){
		
		$('[id^=branchNameValue]').html(selectionSummaryVar.selectedBranchName);
			
		var displayWeekStartDate = moment(weekStartDate).format("DD MMM"); 
		var displayWeekEndDate = moment(weekEndDate).format("DD MMM"); 
		
		$('span#displayWeekStartValue').html(displayWeekStartDate); 
		$('span#displayWeekEndValue').html(displayWeekEndDate); 
		
		//call the user selection and journey selection service based on the week selected
		selectionSummary.callUserAndJourneyService();
		selectionSummary.validateSelections();
	},
	renderUserData: function(data){
		//console.log(data.users.length);
		var users = data.users;
		var tbody = $('#userSearchable');
		tbody.empty();
		var userFullName;
		//console.log(users[0].firstName);
		for(var i=0; i<users.length; i++){
			//generate agent's fullname
			userFullName = (users[i].firstName).trim() + " " + (users[i].lastName).trim();				
			tbody.append("<tr id='userSearchableRow"+i+"'>");
			$("tr#userSearchableRow"+i).append("<td class=select><input class=userRadio type=radio name=userRadio value='"+users[i].userId+"'></td>");
			$("tr#userSearchableRow"+i).append("<td class=userFullName>"+userFullName+"</td>");
			$("tr#userSearchableRow"+i).append("<td class=userPrimaryJourney id='"+users[i].journeyId+"'>"+common.convertToBlankIfNull(users[i].journeyDescription)+"</td>");
			$("tr#userSearchableRow"+i).append("<td class=userType>"+common.convertToBlankIfNull(users[i].userType)+"</td>");
			//$("tr#userSearchableRow"+i).append("<td class=userBranchName>"+common.convertToBlankIfNull(users[i].branchName)+"</td>");
			$("tr#userSearchableRow"+i).append("</tr>");
		}
		$(".userRadio").bind("click", userRadioClick);	
	},
	renderJourneyData: function(data){
		//console.log(data.journeys.length);
		var journeys = data.journeys;
		var tbody = $('[id^=journeySearchable]');
		tbody.empty();
		var userFullName;
		//console.log(users[0].firstName);
		for(var i=0; i<journeys.length; i++){
			//generate agent's fullname
			userFullName = journeys[i].firstName + " " + journeys[i].lastName;
			tbody.append("<tr id='journeySearchableRow"+i+"'>");
			$("tr#journeySearchableRow"+i).append("<td class=select><input type=radio class=journeyRadio name=journeyRadio value='"+journeys[i].journeyId+"'></td>");
			$("tr#journeySearchableRow"+i).append("<td class=journeyDesc>"+common.convertToBlankIfNull(journeys[i].journeyDescription)+"</td>");
			$("tr#journeySearchableRow"+i).append("<td class=userFullName>"+common.convertToBlankIfNull(userFullName)+"</td>");
			//$("tr#journeySearchableRow"+i).append("<td id='"+common.convertToBlankIfNull(journeys[i].branchId)+"'class=journeyBranchName>"+common.convertToBlankIfNull(journeys[i].branchName)+"</td>");
			$("tr#journeySearchableRow"+i).append("</tr>");
		}
		$(".journeyRadio").bind("click", journeyRadioClick);
		$("html").css("display","block");
	
	},
	callUserAndJourneyService: function(){
		/*
		var weekDateValue = $("#SDTWeekSelection").prop('value');
		weekDateValue = weekDateValue.toString().split(" ");
		startDateToService = weekDateValue[0];
		endDateToService = weekDateValue[1];
		*/
		var selectedWeek = session.getData(SELECTED_WEEK);
		var temp = selectedWeek.split(" ");
		var weekStartDate = temp[0];
		console.log("weekStartDate "+weekStartDate);
		var weekEndDate = temp[1];
		console.log("weekEndDate "+weekEndDate);
		
		if(selectionSummaryVar.selectedDashboardSelection == "journeyBalance"){
			service.getJourneySelectionData(selectionSummaryVar.selectedUserId,userType,weekStartDate,weekEndDate,selectionSummaryVar.selectedBranchId,function(data){
				selectionSummary.renderJourneyData(data);
			});
			//check if called for journey balance
			if(selectionSummaryVar.selectedDashboardSelection == "journeyBalance"){
				
				selectionSummary.renderJourneySelectionInfo();
			}
		}
		else{
			service.getUserSelectionData(selectionSummaryVar.selectedUserId,userType,weekStartDate,weekEndDate,selectionSummaryVar.selectedBranchId,function(data){
				selectionSummary.renderUserData(data);	
			});
			service.getJourneySelectionData(selectionSummaryVar.selectedUserId,userType,weekStartDate,weekEndDate,selectionSummaryVar.selectedBranchId,function(data){
				selectionSummary.renderJourneyData(data);
			});	
		}
		
		
	},
	validateSelections: function(){
		
		var selectedWeek = session.getData(SELECTED_WEEK);
		var selectedUser = session.getData(SELECTED_USER);
		var selectedJourney = session.getData(SELECTED_JOURNEY);
		//if(selectedWeek==null || selectedUser==null || selectedJourney==null)
		
		if(selectedWeek!="" && selectedUser!="" && selectedJourney!=""){
			$("#submitSelectionScreenData").attr('disabled',false);
		}
		else{
			$("#submitSelectionScreenData").attr('disabled',true);
		}
		if(selectionSummaryVar.selectedDashboardSelection == "journeyBalance"){
			if(selectedJourney!=""){
				$("#journeySelectionSubmit").attr('disabled',false);
			}
			else{
				$("#journeySelectionSubmit").attr('disabled',true);
			}
		}
	},
	clearSelectedSessionData: function(){
		session.setData(SELECTED_JOURNEY,"");
		session.setData(SELECTED_USER,"");
		//session.setData(SELECTED_WEEK,"");
		//session.setData(SELECTED_USER_NAME,"");
		//session.setData(SELECTED_USER_JOURNEY,"");
		session.setData(SELECTED_JOURNEY_DESC,"");
		session.setData(SELECTED_JOURNEY_BRANCH,"");
		$('#AgentFilter').val("");
		$('#JourneyFilter').val("");
		$('#journeySelectionFilter').val("");
	},
	renderJourneySelectionInfo: function(){
		
		$('[id^=branchNameValue]').html(selectionSummaryVar.selectedBranchName);
		var displayWeekStartDate = moment(weekStartDate).format("DD MMM"); 
		var displayWeekEndDate = moment(weekEndDate).format("DD MMM");
		$('span#displayWeekStartValue').html(displayWeekStartDate); 
		$('span#displayWeekEndValue').html(displayWeekEndDate);
	}
};

$(document).ready(function() {
	//executes when HTML-Document is loaded and DOM is ready
	//console.log("document is ready");
	
	//check if called for journey balance
	if(selectionSummaryVar.selectedDashboardSelection == "journeyBalance"){
		$('#selectionScreenTitle').html("Journey Balance Selection");
		$('div.userJourneyDataRow').css("display","none");
		$('div.weekSelectionRow').css("display","none");
		$('div.journeyDataRow').css("display","block");
		$('h1.selectionScreenHeader').html("JOURNEY BALANCE");
		selectionSummary.callUserAndJourneyService();
		selectionSummary.validateSelections();
	}
	else{
		$('#selectionScreenTitle').html("Weekly Cash Summary Selection");
		$('div.userJourneyDataRow').css("display","block");
		$('div.journeyDataRow').css("display","none");
		$('h1.selectionScreenHeader').html("WEEKLY CASH SUMMARY");
	}
	
	//user search function
	(function ($) {
		$('#AgentFilter').on("input",function () {
			var rex = new RegExp($(this).val(), 'i');
			$('#userSearchable tr').hide();
			$('#userSearchable tr').filter(function () {
				//return rex.test($(this).text());
				return rex.test($(this).find("td:nth-child(2)").text());
			}).show();
		})
	}(jQuery));
	
	//user-journey search function	
	(function ($) {
		$('#JourneyFilter').on("input",function () {
			var rex = new RegExp($(this).val(), 'i');
			$('#journeySearchable tr').hide();
			$('#journeySearchable tr').filter(function () {
				//return rex.test($(this).text());
				return rex.test($(this).find("td:nth-child(2)").text());
			}).show();
		})
	}(jQuery));
	
	//journey selection search function	
	(function ($) {
		$('#journeySelectionFilter').on("input",function () {
			var rex = new RegExp($(this).val(), 'i');
			$('#journeySearchable_2 tr').hide();
			$('#journeySearchable_2 tr').filter(function () {
				//return rex.test($(this).text());
				return rex.test($(this).find("td:nth-child(2)").text());
			}).show();
		})
	}(jQuery));
	
	selectionSummary.renderWeekData();
	
	/*	
	//call the week selection service to get the data
	service.getWeekSelectionData(userid,userType,criteriaDate,function(data){
		selectionSummary.renderWeekData(data);
	});	

	//call the user selection and journey selection service onchange of week selection dropdown
	$('#SDTWeekSelection').change(function(){
		//console.log($("#SDTWeekSelection").prop('value'));
		//clear selected session data
		selectionSummary.clearSelectedSessionData();
		if($("#SDTWeekSelection").prop("selectedIndex")==0){
			session.setData(IS_SELECTED_WEEK_LATEST,1);	
		}
		else{
			session.setData(IS_SELECTED_WEEK_LATEST,0);	
		}
		var selectedWeek = $(this).val(); 
		session.setData(SELECTED_WEEK,selectedWeek);
		selectionSummary.callUserAndJourneyService();
		selectionSummary.validateSelections();
		
	});	*/

	
	$('#submitSelectionScreenData').click(function(){
		common.redirect("weeklySummarySheet.html");	
	});
	$('#journeySelectionSubmit').click(function(){
		common.redirect("journeyBalance.html");	
	});
	
});

//highlight the row onclick of radio button
function userRadioClick(event){
	$('.userTable tbody tr').css("background-color","white");	
	var par =  $(this).closest("tr");
	//console.log(par);
	par.css("background-color","#f6f6f6");	
	var selectedUser = $(this).val(); 
	var selectedUserName = par.children("td:nth-child(2)"); 
	var selectedUserJourney = par.children("td:nth-child(3)");
	//console.log("selectedUserName "+selectedUserName.text());
	//console.log("selectedUserJourneyId "+selectedUserJourney.attr("id"));
	session.setData(SELECTED_USER,selectedUser);
	session.setData(SELECTED_USER_NAME,selectedUserName.text());
	session.setData(SELECTED_USER_JOURNEY,selectedUserJourney.text());
	session.setData(SELECTED_USER_JOURNEYID,selectedUserJourney.attr("id"));
	selectionSummary.validateSelections();
};
function journeyRadioClick(event){
	$('.journeyTable tbody tr').css("background-color","white");	
	var par =  $(this).closest("tr");
	//console.log(par);
	par.css("background-color","#f6f6f6");	
	var selectedJourney = $(this).val();
	var selectedJourneyDescription = par.children("td:nth-child(2)");
	var selectedJourneyBranch = par.children("td:nth-child(4)");
	//console.log("selectedJourneyDescription "+selectedJourneyDescription.text());
	session.setData(SELECTED_JOURNEY,selectedJourney);
	session.setData(SELECTED_JOURNEY_DESC,selectedJourneyDescription.text());
	//session.setData(SELECTED_JOURNEY_BRANCH,selectedJourneyBranch.text());
	//session.setData(SELECTED_JOURNEY_BRANCHID,selectedJourneyBranch.attr("id"));
	selectionSummary.validateSelections();
};	

$(window).on('load',function(){
	//clear selected session data
	//console.log("window onload");
	selectionSummary.clearSelectedSessionData();
	selectionSummary.validateSelections();
});
