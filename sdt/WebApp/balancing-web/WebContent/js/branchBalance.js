//Checks If user is logged in
//common.checkUserSession();
(commonAttributes.checkUserSession==true) ? common.checkUserSession() : "";

var loggedInUser = session.getData(LOGGEDIN_USER_NAME);
var isReadOnlyMode = session.getData(IS_READ_ONLY_MODE);

var selectedWeek = session.getData(SELECTED_WEEK);
var selectedBranchId = session.getData(SELECTED_BRANCH);
var selectedBranchName = session.getData(SELECTED_BRANCH_NAME);

var selectedUserId = session.getData(SELECTED_USER);
var selectedUserName = session.getData(SELECTED_USER_NAME);
var selectedUserJourney = session.getData(SELECTED_USER_JOURNEY);
var selectedUserJourneyId = session.getData(SELECTED_USER_JOURNEYID);
var selectedJourney = session.getData(SELECTED_JOURNEY);
var selectedJourneyDesc = session.getData(SELECTED_JOURNEY_DESC);
var selectedJourneyBranch = session.getData(SELECTED_JOURNEY_BRANCH);
var isLatestSDTWeek = session.getData(IS_SELECTED_WEEK_LATEST);
var closedWeekStatus = session.getData(CLOSEDWEEK_STATUSID);

var temp = selectedWeek.split(" ");
var weekStartDate = temp[0];
console.log("weekStartDate "+weekStartDate);
var weekEndDate = temp[1];
console.log("weekEndDate "+weekEndDate);
var weekNo = temp[2];
var yearNo = temp[3];

console.log("yearNo "+yearNo);

//weekStartDate = "2016-07-21";
//weekEndDate = "2016-07-27";



/***************************************actions to perform on document ready************************************************/
$(document).on('ready',function(){
   
	renderDisplay();
	checkCloseWeekStatus();
	
});

function checkCloseWeekStatus(){
	
	//Call Service to get week status
	service.getClosedWeekStatus(selectedBranchId,weekNo,yearNo,function(data){
		
		var closedByAgentName = "";
		var closedWeekTime = "";
		if(data.branchWeekStatus.weekStatusId != null)
			{
				closedWeekStatus = data.branchWeekStatus.weekStatusId;
				session.setData(CLOSEDWEEK_STATUSID,closedWeekStatus);
				
			}
		if(data.branchWeekStatus.firstName != null)
			{
				closedByAgentName = (data.branchWeekStatus.firstName).toString().trim()+"&nbsp;"+data.branchWeekStatus.lastName;
			}
		if(data.branchWeekStatus.closedDateTime != null)
			{
				closedWeekTime = data.branchWeekStatus.closedDateTime;
				console.log("Formatted Date "+moment(closedWeekTime).format("DD/MM/YYYY HH:mm"));
				closedWeekTime = moment(closedWeekTime).format("DD/MM/YYYY HH:mm");
			}
		
		if(data.branchWeekStatus.weekStatusId == "0"){
			$('span.status').html("(Closed");
			$('span.closedByAgent').html("&nbsp;,By : "+closedByAgentName);
			$('span.closedTime').html("&nbsp;,Time : "+closedWeekTime+")");
			$("#btnCloseBranch").attr("disabled",true);
		}
  
	});
}

function renderDisplay(){

	// setting headers and dates
	
	$("#menuAgentName").html(loggedInUser);
	$('#agentNameValue').html(selectedUserName);
	$('.branchNameValue').html(selectedBranchName);
	
	
	var displayWeekStartDate = moment(weekStartDate).format("DD MMM"); 
	var displayWeekEndDate = moment(weekEndDate).format("DD MMM"); 
	
	$('span.displayWeekStartValue').html(displayWeekStartDate); 
	$('span.displayWeekEndValue').html(displayWeekEndDate); 
	
	/*if(closedWeekStatus == "0")
	{
		$('span.status').html("(Closed");
		$('span.closedByAgent').html(",By : "+closedByAgentName);
		$('span.closedTime').html(",Time : "+closedWeekTime+")");
	}*/
	
	//Readonly mode for BMs
	if(isReadOnlyMode == "true"){	//BMs
		$("#btnCloseBranch").attr("disabled",true);
	}
	
	//call the branch balance Report service to get the data
	service.getBranchBalanceData(selectedBranchId,weekNo,yearNo,function(data){
		renderPullData(data);
	});
	
};

function renderPullData(data)
{
	
	var journeyList = data.branchReportData;
	
	console.log("Retrieved Data Length "+journeyList.length);
	
	if(journeyList.length > 0 )
	{
		//journeyList.sort(sortFunction);
		//console.log(JSON.stringify(journeyList));
		for(var i=0;i<journeyList.length;i++)
		{
			//console.log(JSON.stringify(res.rows.item(i)));
			renderJourneyTable(i,JSON.stringify(journeyList[i]));
		}
		
		
	}
	calculateBranchBalanceSummary();
	
}

// This Function calculates Branch Summary.
function calculateBranchBalanceSummary() {
    var cashTotal = 0;
	var cardTotal = 0;
	var centralTotal = 0;
	var loanTotal = 0;
	var rafTotal = 0;
	var floatTotal = 0;
	var bankedTotal = 0;
	var branchSOTotal = 0;
	
	 var cashSOTotal = 0;
	 var loanSOTotal = 0;
	 var floatSOTotal = 0;
	 var bankedSOTotal = 0;
   
	$("#journeyList").find('table[id^="journeyListTable"]').each(function () {
        console.log("Found");
		
		$(this).find('td[id^="cash"]').each(function () {
			cashTotal += +parseFloat(common.removeComma($(this).text()));
		});
		
		$(this).find('td[id^="card"]').each(function () {
			cardTotal += +parseFloat(common.removeComma($(this).text()));
		});
		
		$(this).find('td[id^="central"]').each(function () {
			centralTotal += +parseFloat(common.removeComma($(this).text()));
		});
		
		$(this).find('td[id^="loan"]').each(function () {
			loanTotal += +parseFloat(common.removeComma($(this).text()));
		});
		
		$(this).find('td[id^="raf"]').each(function () {
			rafTotal += +parseFloat(common.removeComma($(this).text()));
		});
		
		$(this).find('td[id^="float"]').each(function () {
			floatTotal += +parseFloat(common.removeComma($(this).text()));
		});
		
		$(this).find('td[id^="banked"]').each(function () {
			bankedTotal += +parseFloat(common.removeComma($(this).text()));
		});
		
		$(this).find('td[id^="journeySO"]').each(function () {
			branchSOTotal += +parseFloat(common.removeComma($(this).text()));
		});
		
		$(this).find('td[id^="SOcash"]').each(function () {
			cashSOTotal += +parseFloat(common.removeComma($(this).text()));
		});
		
		$(this).find('td[id^="SOloan"]').each(function () {
			loanSOTotal += +parseFloat(common.removeComma($(this).text()));
		});
		
		$(this).find('td[id^="SOfloat"]').each(function () {
			floatSOTotal += +parseFloat(common.removeComma($(this).text()));
		});
		
		$(this).find('td[id^="SObanked"]').each(function () {
			bankedSOTotal += +parseFloat(common.removeComma($(this).text()));
		});
		

    });
	console.log("cashTotal "+cashTotal);
	
	$("#cashTotal").text(common.convertToFormattedAmount(cashTotal));
	$("#cardTotal").text(common.convertToFormattedAmount(cardTotal));
	$("#centralTotal").text(common.convertToFormattedAmount(centralTotal));
	$("#loanTotal").text(common.convertToFormattedAmount(loanTotal));
	$("#rafTotal").text(common.convertToFormattedAmount(rafTotal));
	$("#floatTotal").text(common.convertToFormattedAmount(floatTotal));
	$("#bankedTotal").text(common.convertToFormattedAmount(bankedTotal));
	$("#branchSOTotal").text(common.convertToFormattedAmount(branchSOTotal));
	
	$("#cashSOTotal").text(common.convertToFormattedAmount(cashSOTotal));
	$("#loanSOTotal").text(common.convertToFormattedAmount(loanSOTotal));
	$("#floatSOTotal").text(common.convertToFormattedAmount(floatSOTotal));
	$("#bankedSOTotal").text(common.convertToFormattedAmount(bankedSOTotal));
    
	if(branchSOTotal !== 0)
	{
		$("#branchSOTotal").css('color','#ffb44f');
	}
	
	
	if(cashSOTotal !== 0)
	{
		$("#cashSOTotal").css('color','#ffb44f');
	}
	
	if(loanSOTotal !== 0)
	{
		$("#loanSOTotal").css('color','#ffb44f');
	}
	
	
	if(floatSOTotal !== 0)
	{
		$("#floatSOTotal").css('color','#ffb44f');
	}
	
	if(bankedSOTotal !== 0)
	{
		$("#bankedSOTotal").css('color','#ffb44f');
	}
	
	//$("#grandtotal").css('font-weight','bold');
}

//This function renders journey list from service in html
	function renderJourneyTable(i,res){
	
		
		var listItem;
        listItem=JSON.parse(res);
		var journeyId = listItem.journeyId;
		var journeyDesc = (listItem.journeyDesc).toString().trim();
		var agentName = (listItem.firstName).toString().trim()+" "+(listItem.lastName).toString().trim();
		var agentContactNo = listItem.contactNumber;
		
		if(agentContactNo == undefined || agentContactNo == null)
		{
			agentContactNo = "";
		}
		
		//Declared	
		var dcash = common.convertToFormattedAmount(listItem.declaredCash);
		//var dcard = common.convertToFormattedAmount(listItem.dcard);
		//var dcentral = common.convertToFormattedAmount(listItem.dcentral);
		var dloans = common.convertToFormattedAmount(listItem.declaredLoans);
		var draf = common.convertToFormattedAmount(listItem.declaredRaf);
		var dfloat = common.convertToFormattedAmount(listItem.declaredFloat);
		var dbanked = common.convertToFormattedAmount(listItem.declaredCashBanked);
		var dshort = common.convertToFormattedAmount(listItem.declaredShort);
		
		//Actual
		var acash = common.convertToFormattedAmount(listItem.actualCash);
		var acard = common.convertToFormattedAmount(listItem.actualCard);
		var acentral = common.convertToFormattedAmount(listItem.actualCentral);
		var aloans = common.convertToFormattedAmount(listItem.actualLoans);
		//var araf = common.convertToFormattedAmount(listItem.araf);
		var afloat = common.convertToFormattedAmount(listItem.actualFloat);
		var abanked = common.convertToFormattedAmount(listItem.actualCashBanked);
		var ashort = common.convertToFormattedAmount(listItem.actualShort);
		
		var journeySO = parseFloat(common.removeComma(acash))-parseFloat(common.removeComma(aloans))-parseFloat(common.removeComma(draf))+parseFloat(common.removeComma(afloat))-parseFloat(common.removeComma(dbanked));
		
		var newNode = document.createElement('div');
        newNode.className = 'row bg-white';
		 newNode.id = 'journeyListRow'+i;
		$('#journeyList').append(newNode);

    var newNode1 = document.createElement('div');
		newNode1.className = 'col-lg-12 journeyListInfo';
		newNode1.id = 'journeyListInfoDiv'+i;
		$('#journeyListRow'+i).append(newNode1);

	var newTable = document.createElement('table');
		newTable.className = 'table table-hover journeyListTable';
		newTable.id = 'journeyListTable'+i;
		$('#journeyListInfoDiv'+i).append(newTable);	

	var newThead = $(document.createElement('thead')).appendTo('#journeyListTable'+i);
	var newTbody = $(document.createElement('tbody')).appendTo('#journeyListTable'+i);	


	//Row for table Header								
	var newRow = $("<tr>");
        var cols = "";
		cols += '<th class="journeyNumberTH"><a href="#" onclick=handleRedirect("'+journeyId+'","'+journeyDesc+'")>'+journeyDesc+"&nbsp;("+agentName+')</a><br/><span class="agentContactNoTH">'+agentContactNo+'</span></th>';
		cols += '<th>Cash</th>';
		cols += '<th>Card</th>';	
        cols += '<th>Central</th>';
        cols += '<th>Loans</th>';
		cols += '<th>RAF</th>';
        cols += '<th>Float</th>';	
        cols += '<th>Banked</th>';
        cols += '<th>Short/Over</th>';
		cols += '<th>Journey S/O</th>';
		
        newRow.append(cols);
        
        $('#journeyListTable'+i+' thead').append(newRow);
	
	//Row for table Journey Balance Summary		
	var newRow = $("<tr>");
        var cols = "";
		cols += '<td class=textLeft></td>';
		cols += '<td id=cash'+i+'>'+acash+'</td>';
		cols += '<td id=card'+i+'>'+acard+'</td>';	
        cols += '<td id=central'+i+'>'+acentral+'</td>';
        cols += '<td id=loan'+i+'>'+aloans+'</td>';
		cols += '<td id=raf'+i+'>'+draf+'</td>';
        cols += '<td id=float'+i+'>'+afloat+'</td>';	
        cols += '<td id=banked'+i+'>'+dbanked+'</td>';
        cols += '<td></td>';
		cols += '<td id=journeySO'+i+'>'+common.convertToFormattedAmount(journeySO)+'</td>';
		
        newRow.append(cols);
        
        $('#journeyListTable'+i+' tbody').append(newRow);
		
		if(journeySO !== 0)
		{
			$("#journeySO"+i).css('color','#ffb44f');
		}
		
		//Row for Declared		
	var newRow = $("<tr>");
        var cols = "";
		cols += '<td class=textLeft>Declared</td>';
		cols += '<td>'+dcash+'</td>';
		cols += '<td></td>';	
        cols += '<td></td>';
        cols += '<td>'+dloans+'</td>';
		cols += '<td>'+draf+'</td>';
        cols += '<td>'+dfloat+'</td>';	
        cols += '<td>'+dbanked+'</td>';
		if(parseFloat(common.removeComma(dshort)) != 0)
		{
			cols += '<td class=amber-color>'+dshort+'</td>';
		}
		else
		{
        cols += '<td>'+dshort+'</td>';
		}
        
		cols += '<td></td>';
		
        newRow.append(cols);
        
        $('#journeyListTable'+i+' tbody').append(newRow);
		
		//Row for Actual	
	var newRow = $("<tr>");
        var cols = "";
		cols += '<td class=textLeft>Actual</td>';
		cols += '<td>'+acash+'</td>';
		cols += '<td>'+acard+'</td>';	
        cols += '<td>'+acentral+'</td>';
        cols += '<td>'+aloans+'</td>';
		cols += '<td></td>';
        cols += '<td>'+afloat+'</td>';	
        cols += '<td>'+abanked+'</td>';
		if(parseFloat(common.removeComma(ashort)) != 0)
		{
			cols += '<td class=amber-color>'+ashort+'</td>';
		}
		else
		{
        cols += '<td>'+ashort+'</td>';
		}
        
		cols += '<td></td>';
		
        newRow.append(cols);
        
        $('#journeyListTable'+i+' tbody').append(newRow);
		
		var cashSO = parseFloat(common.removeComma(acash))- parseFloat(common.removeComma(dcash));
		var loansSO = parseFloat(common.removeComma(dloans))- parseFloat(common.removeComma(aloans));
		var floatSO = parseFloat(common.removeComma(afloat))- parseFloat(common.removeComma(dfloat));
		var cashBankedSO = parseFloat(common.removeComma(dbanked))- parseFloat(common.removeComma(abanked));
		var totalSO = parseFloat(common.removeComma(ashort))- parseFloat(common.removeComma(dshort));
		//Row for S/O	
	var newRow = $("<tr>");
        var cols = "";
		cols += '<td class=textLeft>S/O</td>';
		if(cashSO != 0)
		{
			cols += '<td id=SOcash'+i+' class=amber-color>'+common.convertToFormattedAmount(cashSO)+'</td>';
		}
		else
		{
			cols += '<td id=SOcash'+i+'>'+common.convertToFormattedAmount(cashSO)+'</td>';
		}
		
		cols += '<td></td>';	
        cols += '<td></td>';
		if(loansSO != 0)
		{
			cols += '<td id=SOloan'+i+' class=amber-color>'+common.convertToFormattedAmount(loansSO)+'</td>';
		}
		else
		{
			cols += '<td id=SOloan'+i+'>'+common.convertToFormattedAmount(loansSO)+'</td>';
		}
        
		cols += '<td></td>';
		if(floatSO != 0)
		{
			cols += '<td id=SOfloat'+i+' class=amber-color>'+common.convertToFormattedAmount(floatSO)+'</td>';
		}
		else
		{
			cols += '<td id=SOfloat'+i+'>'+common.convertToFormattedAmount(floatSO)+'</td>';
		}
        
		if(cashBankedSO != 0)
		{
			cols += '<td id=SObanked'+i+'class=amber-color>'+common.convertToFormattedAmount(cashBankedSO)+'</td>';
		}
		else
		{
			cols += '<td id=SObanked'+i+'>'+common.convertToFormattedAmount(cashBankedSO)+'</td>';
		}		
        
		if(totalSO != 0)
		{
			
			cols += '<td class=amber-color>'+common.convertToFormattedAmount(totalSO)+'</td>';
		}
		else
		{
			cols += '<td>'+common.convertToFormattedAmount(totalSO)+'</td>';
		}	
        
		cols += '<td></td>';
		
        newRow.append(cols);
        
        $('#journeyListTable'+i+' tbody').append(newRow);
		
    }

/*
function sortFunction(a,b){  
    var dateA = new Date(a.balanceDate.split(" ")[0]).getTime();
    var dateB = new Date(b.balanceDate.split(" ")[0]).getTime();
	//console.log("dateA "+dateA);
    return dateA > dateB ? 1 : -1;  
}; 
*/
function handleRedirect(journeyId,journeyDesc){

	session.setData(SELECTED_JOURNEY,journeyId);
	session.setData(SELECTED_JOURNEY_DESC,journeyDesc);	

	common.redirect("journeyBalance.html");
}

$("#btnCloseBranch").click(function() {
	

	var result = confirm(messageboxCommon.messageTitleConfirm,messageboxBranchBalance.msgConfirmClose,function(result){
		if (result == true) {
			
			//call the close week service to get the data
			service.closeWeek(selectedBranchId,weekNo,yearNo,function(data){
				alert(messageboxCommon.messageTitleAlert,messageboxBranchBalance.msgSuccess);
				checkCloseWeekStatus();
			});
		}
	});
		//common.confirmMessage(messageboxBalance.msgConfirmDelete,confirmBackCallback, messageboxBalance.messageTitleConfirm); 
	
});


