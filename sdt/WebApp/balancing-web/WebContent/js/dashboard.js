var loggedInUserName;
var loggedInUserEmailId;
var loggedInUserId;
var loggedInUserType;
var loggedInUserRole;
var isSuperUser = false;
var isReadOnlyMode = false;

var sessionSelectedWeek  = session.getData(SELECTED_WEEK);
var sessionSelectedBranch  = session.getData(SELECTED_BRANCH);

//sessionStorage.clear();
$(document).ready(function() {
	// executes when HTML-Document is loaded and DOM is ready
	
	console.log("document ready");
		
	$(".menuAgentEmailId").css("display","none");
	
	//bind the dashboard selection click events
	$(".journeyBalanceLink").bind("click", journeyBalanceClick);	
	$(".weeklyCashSummaryLink").bind("click", weeklyCashSummaryClick);	
	$(".branchBalanceLink").bind("click", branchBalanceClick);	
	
	loggedInUserName = $("#menuAgentName").text();
	console.log(loggedInUserName);
	loggedInUserEmailId = $(".menuAgentEmailId").text();
	console.log(loggedInUserEmailId);
	loggedInUserRole = $(".menuAgentUserType").text();
	console.log(loggedInUserRole);
	
	if(loggedInUserRole.toUpperCase() === "ADMIN")
	{
		isSuperUser = false;
	}
	else if(loggedInUserRole.toUpperCase() === "SUPERUSER")
	{
		isSuperUser = true;
	}
	else if(loggedInUserRole.toUpperCase() === "READONLY")
	{
		isReadOnlyMode = true;
	}
		
	session.setData(IS_SUPERUSER,isSuperUser);
	session.setData(LOGGEDIN_USER_NAME,loggedInUserName);
	session.setData(IS_READ_ONLY_MODE,isReadOnlyMode);
	//alert("before "+loggedInUserName+" "+loggedInUserEmailId);
	if(loggedInUserEmailId != "")
	{
		//call the userId Login service
		service.getUsedIdLogin(loggedInUserEmailId,function(data){
			if(data.success != true)
			{
				console.log(data.errorCode+" : "+data.errorMessage);
				//$('.errors').html(data.errorMessage);
				
				//$('#errorDiv').show();
				
				//$('a').click(function(e){
				//	e.preventDefault();
				//});
				session.setData(ERROR_CODE,data.errorCode);
				//session.setData(ERROR_MSG,data.errorMessage);
				//alert("after "+loggedInUserName+" "+loggedInUserEmailId);
				common.redirect(ERROR_PAGE);
			}
			else{
			
			var userData = data.user;
			loggedInUserId = userData.userId;
			loggedInUserType = userData.userType;
			
			if(loggedInUserType == null || loggedInUserType == "" || loggedInUserType == undefined)
			{
				loggedInUserType = "";
			}
			
			session.setData(LOGGEDIN_USER_ID,loggedInUserId);
			session.setData(LOGGEDIN_USER_TYPE,loggedInUserType);
				
				//Readonly mode for BMs
				if(isReadOnlyMode == true){	//BMs
					$("#weeklyCashSummarySelectionDiv").css("opacity","0.4");
					$(".weeklyCashSummaryLink").removeAttr("href");
				}
				
				//call the week selection service to get the data
				service.getWeekSelectionData(userid,userType,criteriaDate,function(data){
					renderWeekData(data.Week);
					renderBranchData(data.branchList);
				});	
			}
		});
	}
	

	document.onkeydown = function(e){
		if (e.ctrlKey && 
		    (e.keyCode === 67 || 
		     e.keyCode === 86 || 
		     e.keyCode === 85 || 
		     e.keyCode === 117)) {
		  return false;
		} else {
		    return true;
		}
		};
		
		
});


		
function renderWeekData(weekData){
	var week = weekData;
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
	
	
	//console.log("sessionSelectedWeek "+sessionSelectedWeek);
	if(sessionSelectedWeek != null)
	{
		$('#SDTWeekSelection').find('option').each(function(i,e){
	        if($(e).val() == sessionSelectedWeek){
	        	
	            $('#SDTWeekSelection').prop('selectedIndex',i);
	        }
	    });
	}
	else
	{
		//set first option as default selected
		$("#SDTWeekSelection").prop("selectedIndex", 0);
	}
	
	var selectedWeek = $("#SDTWeekSelection").val(); 
	var currentSDTWeek = $("#SDTWeekSelection option:first-child").val();	
	session.setData(SELECTED_WEEK,selectedWeek);
	session.setData(IS_SELECTED_WEEK_LATEST,1);
	session.setData(CURRENT_SDT_WEEK,currentSDTWeek);
	//console.log($("#SDTWeekSelection").prop('value'));
	
}

function renderBranchData(branchData){
	var branch = branchData;
	console.log(branch.length);
	var x = document.getElementById("SDTBranchSelection");
	
	//add week options to week selection dropdown
	for(var i=0; i<branch.length; i++){
		var option = document.createElement("option");
		
		var branchName = branch[i].branchName;
		var branchId = branch[i].branchId;
		option.text = branchName;
		option.value = branchId;
		
		x.add(option);	
	}
	
	if(sessionSelectedBranch != null)
	{
		$('#SDTBranchSelection').find('option').each(function(i,e){
	        if($(e).val() == sessionSelectedBranch){
	        	
	            $('#SDTBranchSelection').prop('selectedIndex',i);
	        }
	    });
	}
	else
	{
		//set first option as default selected
		$("#SDTBranchSelection").prop("selectedIndex", 0);
	}
	
	var selectedBranch = $("#SDTBranchSelection").val(); 
	var selectedBranchName = $("#SDTBranchSelection option:selected").text();
	console.log("selectedBranchName "+selectedBranchName);
	session.setData(SELECTED_BRANCH,selectedBranch);
	session.setData(SELECTED_BRANCH_NAME,selectedBranchName);
	$(".chosen-select").chosen();
	
}


//onchange of week selection dropdown
$('#SDTWeekSelection').change(function(){
	//console.log($("#SDTWeekSelection").prop('value'));
	//clear selected session data
	
	session.setData(SELECTED_WEEK,"");
	
	if($("#SDTWeekSelection").prop("selectedIndex")==0){
		session.setData(IS_SELECTED_WEEK_LATEST,1);	
	}
	else{
		session.setData(IS_SELECTED_WEEK_LATEST,0);	
	}
	var selectedWeek = $(this).val(); 
	session.setData(SELECTED_WEEK,selectedWeek);
	
});


//onchange of week selection dropdown
$('#SDTBranchSelection').change(function(){
	session.setData(SELECTED_BRANCH,"");	
	var selectedBranch = $(this).val(); 
	var selectedBranchName = $(this).find('option:selected').text(); 
	session.setData(SELECTED_BRANCH,selectedBranch);
	session.setData(SELECTED_BRANCH_NAME,selectedBranchName);
});

function journeyBalanceClick(){
	session.setData(SELECTED_DASHBOARD_SELECTION,"journeyBalance");
	//common.redirect("selectionSummary.html");
}
function weeklyCashSummaryClick(){
	session.setData(SELECTED_DASHBOARD_SELECTION,"weeklyCashSummary");
	//common.redirect("selectionSummary.html");
}
function branchBalanceClick(){
	session.setData(SELECTED_DASHBOARD_SELECTION,"branchBalance");
}
				