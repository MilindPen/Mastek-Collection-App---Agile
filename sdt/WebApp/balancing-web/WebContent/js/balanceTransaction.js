//var selectedUserId = session.getData(USER_ID);
//Checks If user is logged in
//common.checkUserSession();
(commonAttributes.checkUserSession==true) ? common.checkUserSession() : "";

var isSuperUser = session.getData(IS_SUPERUSER).toString();
console.log("Super User "+isSuperUser);


var selectedBalanceType = session.getData(SELECTED_BALANCE_TYPE);
var loggedInUser = session.getData(LOGGEDIN_USER_NAME);

var selectedWeek = session.getData(SELECTED_WEEK);
var selectedUserId = session.getData(SELECTED_USER);
var selectedUserName = session.getData(SELECTED_USER_NAME);
var selectedUserJourney = session.getData(SELECTED_USER_JOURNEY);
var selectedUserJourneyId = session.getData(SELECTED_USER_JOURNEYID);
var selectedJourney = session.getData(SELECTED_JOURNEY);
var selectedJourneyDesc = session.getData(SELECTED_JOURNEY_DESC);
var selectedBranch = session.getData(SELECTED_BRANCH_NAME);
var isLatestSDTWeek = session.getData(IS_SELECTED_WEEK_LATEST);
var closedWeekStatus = session.getData(CLOSEDWEEK_STATUSID);

var defaultRefNo;
if(selectedUserJourney === selectedJourneyDesc)
{
	defaultRefNo = selectedUserJourney;
}
else
{
	defaultRefNo = selectedUserJourney+"/"+selectedJourneyDesc;
}

console.log("defaultRefNo "+defaultRefNo);
	
var temp = selectedWeek.split(" ");
var weekStartDate = temp[0];
console.log("weekStartDate "+weekStartDate);
var weekEndDate = temp[1];
console.log("weekEndDate "+weekEndDate);
var weekNo = temp[2];
var yearNo = temp[3].substr(2);

console.log("yearNo "+yearNo);
//var weekStartDate = "2016-06-30";
//var weekEndDate = "2016-07-06";

//var selectedBalanceType = 'B';
var counter = 0;
var balanceDate = "";
var balanceDateDB = "";
var rowNum;
var confirmDelete = false;
var editMode = false;
var addMode = false;
var deleteItem;
var dateList = [];
var errorList = [];

//Hiding Error Div
$('#errorDiv').hide();

/***************************************actions to perform on document ready************************************************/
$(document).on('ready',function(){
    if(closedWeekStatus !== "0" || isSuperUser === "true")
	{
	$("#btnAdd").bind("click", Add);
	$("#btnSave").bind("click", Save);
	$("#btnEdit").bind("click", Edit);
	}
	else
	{
		$('#btnAdd').attr('disabled', true);
		$("#btnSave").attr('disabled', true);
		$("#btnEdit").attr('disabled', true);
	}
	$("#balTransTblData tbody").on("change", 'input[name^="amt"]', function (event) {
		//alert("Onchange called");
        calculateRow($(this).closest("tr"));
        calculateGrandTotal();
    });
	
	if(selectedBalanceType==='F' || selectedBalanceType==='B'){
		//Cash Banked and Float WithDrawn
		
		$("#balTransTblData tbody").on("input", 'input[name^="refNo"]', function (event) {
			//alert("Onchange called");
			//listen('keydown', this, replaceVal(this));
	    });
	} 
	
	
	
	$('.menuHome').click(function(event){
			event.preventDefault();
			if(editMode === true || addMode === true)
			{
				var result = confirm(messageboxCommon.messageTitleConfirm,messageboxBalance.msgConfirmDelete,function(result){
					if (result == true) {
						common.redirect("/balancing/login/");
					}
				});
								
				//common.confirmMessage(messageboxBalance.msgConfirmDelete,confirmBackCallback, messageboxBalance.messageTitleConfirm); 
			}
			else
			{
				common.redirect("/balancing/login/");
			}
	});
	
	$("#btnBack").click(function( event ) {
			event.preventDefault();
			if(editMode === true || addMode === true)
			{
				var result = confirm(messageboxCommon.messageTitleConfirm,messageboxBalance.msgConfirmDelete,function(result){
					if (result == true) {
						common.redirect("weeklySummarySheet.html");
					}
				});
				//common.confirmMessage(messageboxBalance.msgConfirmDelete,confirmBackCallback, messageboxBalance.messageTitleConfirm); 
			}
			else
			{
				//window.history.back();
				common.redirect("weeklySummarySheet.html");
			}
	});
	
	
	renderDisplay();
  
});

function renderDisplay(){

	//getting parameter from session
	var balanceTransType = "";
	//var isWeekly = dataStorage.getData(IS_WEEKLY_VIEW);
	var displayDate = "";
	
	if(selectedBalanceType==='L')
		balanceTransType = balanceTransactionType.L;
	else if(selectedBalanceType==='B')
		balanceTransType = balanceTransactionType.B;
	else if(selectedBalanceType==='F')
		balanceTransType = balanceTransactionType.F;
	else if(selectedBalanceType==='O')
		balanceTransType = balanceTransactionType.O;
	else if(selectedBalanceType==='C')
		balanceTransType = balanceTransactionType.C;	
	
	//Hiding Error Div
	//$('#errorDiv').hide();
	
	// setting headers and dates
	
	$("#menuAgentName").html(loggedInUser);
	$(".page-header").html(balanceTransType);
	
	$('#agentNameValue').html(selectedUserName);
	$('.primaryJourney').html(selectedUserJourney);
	$('#journeyNumber').html(selectedJourneyDesc);
	$('.branchName').html(selectedBranch);
	
	
	var displayWeekStartDate = moment(weekStartDate).format("DD MMM"); 
	var displayWeekEndDate = moment(weekEndDate).format("DD MMM"); 
	
	$('span.displayWeekStartValue').html(displayWeekStartDate); 
	$('span.displayWeekEndValue').html(displayWeekEndDate); 
	if(closedWeekStatus == "0")
	{
		$('span.closeWeekStatus').html("(Closed)");
	}
	//$(".li-heading").html(displayDate);
	
	//hiding chq column if type is not CASH BANKED
	if(balanceTransType != 'CASH BANKED')
		$('td:nth-child(2),th:nth-child(2)').hide();
		
	
	var tempDate = weekStartDate.toString().split("-")
	
	//var date = new Date();
	for(var i =0;i<7;i++)
	{
		var date = new Date(tempDate[0],tempDate[1]-1,tempDate[2]);
		date.setDate(date.getDate() + i);
		var mm = (date.getMonth()+1).toString();
		mm = mm.length == 1 ? '0' + mm : mm;
		var DD = (date.getDate()).toString();
		DD = DD.length == 1 ? '0' + DD : DD;
		var dateMsg = DD+'/'+ mm +'/'+date.getFullYear();
		dateList.push(dateMsg);
	}

	//var dateMsg = date.getDate()+'/'+ (date.getMonth()+1) +'/'+date.getFullYear();
	console.log(dateList);	
	//getBalanceTransactionFromOfflineDB();	
	
	if(selectedBalanceType !='B'){	
		$('table#balTransTblData th:nth-of-type(1)').css('width','23%');
		$('table#balTransTblData tfoot td:nth-of-type(1)').css('width','23%');
		$('table#balTransTblData tbody td:nth-of-type(1)').css('width','23%'); 

		$('table#balTransTblData th:nth-of-type(3)').css('width','32%');
		$('table#balTransTblData tfoot td:nth-of-type(3)').css('width','32%');
		$('table#balTransTblData tbody td:nth-of-type(2)').css('width','32%');

		$('table#balTransTblData th:nth-of-type(4)').css('width','20%');
		$('table#balTransTblData tfoot td:nth-of-type(4)').css('width','20%');
		$('table#balTransTblData tbody td:nth-of-type(3)').css('width','20%');
		
		$('table#balTransTblData th:nth-of-type(5)').css('width','10%');
		$('table#balTransTblData tfoot td:nth-of-type(5)').css('width','10%');
		$('table#balTransTblData tbody td:nth-of-type(4)').css('width','10%');
		
		$('table#balTransTblData th:nth-of-type(6)').css('width','5%');
		$('table#balTransTblData tfoot td:nth-of-type(6)').css('width','5%');
		$('table#balTransTblData tbody td:nth-of-type(5)').css('width','5%');
		
		$('table#balTransTblData th:nth-of-type(7)').css('width','10%');
		$('table#balTransTblData tfoot td:nth-of-type(7)').css('width','10%');
		$('table#balTransTblData tbody td:nth-of-type(6)').css('width','10%');
	 }
	else
	{
		$('table#balTransTblData th:nth-of-type(1)').css('width','20%');
		$('table#balTransTblData tfoot td:nth-of-type(1)').css('width','20%');
		$('table#balTransTblData td:nth-of-type(1)').css('width','20%'); 

		$('table#balTransTblData th:nth-of-type(2)').css('width','10%');
		$('table#balTransTblData tfoot td:nth-of-type(2)').css('width','10%');
		$('table#balTransTblData td:nth-of-type(2)').css('width','10%');

		$('table#balTransTblData th:nth-of-type(3)').css('width','25%');
		$('table#balTransTblData tfoot td:nth-of-type(3)').css('width','25%');
		$('table#balTransTblData td:nth-of-type(3)').css('width','25%');

		$('table#balTransTblData th:nth-of-type(4)').css('width','20%');
		$('table#balTransTblData tfoot td:nth-of-type(4)').css('width','20%');
		$('table#balTransTblData td:nth-of-type(4)').css('width','20%');

		$('table#balTransTblData th:nth-of-type(5)').css('width','10%');
		$('table#balTransTblData tfoot td:nth-of-type(5)').css('width','10%');
		$('table#balTransTblData td:nth-of-type(5)').css('width','10%');

		$('table#balTransTblData th:nth-of-type(6)').css('width','5%');
		$('table#balTransTblData tfoot td:nth-of-type(6)').css('width','5%');
		$('table#balTransTblData td:nth-of-type(6)').css('width','5%');
		
		$('table#balTransTblData th:nth-of-type(7)').css('width','10%');
		$('table#balTransTblData tfoot td:nth-of-type(7)').css('width','10%');
		$('table#balTransTblData td:nth-of-type(7)').css('width','10%');
	}
	
	calculateGrandTotal();
	//call the weekly summary sheet service to get the data
	service.getBalanceTransactionDataService(weekStartDate,weekEndDate,selectedJourney,selectedUserId,selectedBalanceType,function(data){
		renderPullData(data);
	});
	
};

function renderPullData(data)
{
	$("#balTransTblData tbody").empty();
	
	var transactionsList = data.transactions;
	
	console.log("Retrieved Data Length "+transactionsList.length);
	//var sortedArray = [];
	if(transactionsList.length > 0 )
	{
		transactionsList.sort(sortFunction);
		console.log(JSON.stringify(transactionsList));
		for(var i=0;i<transactionsList.length;i++)
		{
			//console.log(JSON.stringify(res.rows.item(i)));
			//var balanceId = (transactionsList[i].balanceId).substr(10);
			//console.log("balanceId"+balanceId);
			//sortedArray[parseInt(balanceId)-1] = transactionsList[i];
			renderBalanceTrans(i,JSON.stringify(transactionsList[i]));
		}
		
		//console.log(sortedArray);
		
		
		calculateGrandTotal();
	}
	/*for(var i=0;i<sortedArray.length;i++)
	{
		if(sortedArray[i] != null && sortedArray[i] != "")
			renderBalanceTrans(i,JSON.stringify(sortedArray[i]));
	}*/
	calculateGrandTotal();
	if(selectedBalanceType !='B'){	
		$('table#balTransTblData th:nth-of-type(1)').css('width','23%');
		$('table#balTransTblData tfoot td:nth-of-type(1)').css('width','23%');
		$('table#balTransTblData tbody td:nth-of-type(1)').css('width','23%'); 

		$('table#balTransTblData th:nth-of-type(3)').css('width','32%');
		$('table#balTransTblData tfoot td:nth-of-type(3)').css('width','32%');
		$('table#balTransTblData tbody td:nth-of-type(2)').css('width','32%');

		$('table#balTransTblData th:nth-of-type(4)').css('width','20%');
		$('table#balTransTblData tfoot td:nth-of-type(4)').css('width','20%');
		$('table#balTransTblData tbody td:nth-of-type(3)').css('width','20%');
		
		$('table#balTransTblData th:nth-of-type(5)').css('width','10%');
		$('table#balTransTblData tfoot td:nth-of-type(5)').css('width','10%');
		$('table#balTransTblData tbody td:nth-of-type(4)').css('width','10%');
		
		$('table#balTransTblData th:nth-of-type(6)').css('width','5%');
		$('table#balTransTblData tfoot td:nth-of-type(6)').css('width','5%');
		$('table#balTransTblData tbody td:nth-of-type(5)').css('width','5%');
		
		$('table#balTransTblData th:nth-of-type(7)').css('width','10%');
		$('table#balTransTblData tfoot td:nth-of-type(7)').css('width','10%');
		$('table#balTransTblData tbody td:nth-of-type(6)').css('width','10%');
	 }
	else
	{
		$('table#balTransTblData th:nth-of-type(1)').css('width','20%');
		$('table#balTransTblData tfoot td:nth-of-type(1)').css('width','20%');
		$('table#balTransTblData td:nth-of-type(1)').css('width','20%'); 

		$('table#balTransTblData th:nth-of-type(2)').css('width','10%');
		$('table#balTransTblData tfoot td:nth-of-type(2)').css('width','10%');
		$('table#balTransTblData td:nth-of-type(2)').css('width','10%');

		$('table#balTransTblData th:nth-of-type(3)').css('width','25%');
		$('table#balTransTblData tfoot td:nth-of-type(3)').css('width','25%');
		$('table#balTransTblData td:nth-of-type(3)').css('width','25%');

		$('table#balTransTblData th:nth-of-type(4)').css('width','20%');
		$('table#balTransTblData tfoot td:nth-of-type(4)').css('width','20%');
		$('table#balTransTblData td:nth-of-type(4)').css('width','20%');

		$('table#balTransTblData th:nth-of-type(5)').css('width','10%');
		$('table#balTransTblData tfoot td:nth-of-type(5)').css('width','10%');
		$('table#balTransTblData td:nth-of-type(5)').css('width','10%');

		$('table#balTransTblData th:nth-of-type(6)').css('width','5%');
		$('table#balTransTblData tfoot td:nth-of-type(6)').css('width','5%');
		$('table#balTransTblData td:nth-of-type(6)').css('width','5%');
		
		$('table#balTransTblData th:nth-of-type(7)').css('width','10%');
		$('table#balTransTblData tfoot td:nth-of-type(7)').css('width','10%');
		$('table#balTransTblData td:nth-of-type(7)').css('width','10%');
	}
	
}
 
function Add(){
	
		
		addMode = true;
		
    	counter = $('#balTransTblData tr').length - 2;
    	currCounter = 0;
    		//alert(currCounter);
    	var newRow = $("<tr>");
            var cols = "";
			var selectList = "<td><select id=selectTransDate name=selectTransDate" + counter + ">";
			$(dateList).each(function(i) {
				selectList += "<option value="+i+">" + dateList[i] + "</option>";
			});
			selectList += "</select></td>";
			
    		//cols += '<td><select id="selectTransDate" class="form-control"></select></td>';
			cols += selectList;
    		if(selectedBalanceType==='B')
			{
				cols += '<td class="chq_padding"><input  type="checkbox" name="isChq' + counter + '" value="1" class="pull-left"></td>';
			}
    		cols += '<td><input type="text" name="refNo' + counter + '" value=""></td>';
    		cols += '<td class=amt-css id="amt' + counter + '" name="amt' + counter + '" ><input type="number" id="amt' + counter + '"  onkeypress="return validateFloatKeyPress(this,event,'+counter+');" inputmode="numeric" step="0.01" name="amt' + counter + '"/></td>';	
            cols += '<td class="edit_padding"><img src="img/edit-icon.png" name="edit' + counter + '" alt="edit" class="img-icon" id="btnEdit" onclick="Edit()"/></td>';
            cols += '<td class="delete_padding"><input type="checkbox" name="isDeleted' + counter + '" value="1" ></td>';
            cols += '<td><img src="img/discard-icon.png" class="img-icon" id="btnDelete" onclick="Delete()"/></td>';
            cols += '<td name="rowId' + counter + '" style="display:none;"><input type="hidden"   name="rowId' + counter + '"/></td>';
			
            
            newRow.append(cols);
            
            $("#balTransTblData tbody").append(newRow);
			
			
			$('input[name=isDeleted'+counter+']').prop("disabled", true);
			$("#balTransTblData tbody").find('img[id^="btnEdit"]').each(function () {
				$(this).attr("src", "img/edit-icon-disabled.png");
			});
			//if(selectedBalanceType!=='B')
				//$('td:nth-child(2)').hide();
			
    		var target = $("#amt"+counter);
    		
    		if( target.length ) {
    			//event.preventDefault();
    			$('html, tbody').animate({
    				scrollTop: target.offset().top
    			}, 100);
    		}
    		if(selectedBalanceType =='B' || selectedBalanceType =='F')
    		{
    			$('input[name=refNo'+counter+']').attr("value", defaultRefNo);
    		}
    		
    		
    		$('select[name=selectTransDate'+counter+']').focus();
    		//$("#amt"+counter).focusin();
            //counter++;
    		currCounter++;
           // if (currCounter == 1){
    		//	$('#btnAdd').attr('disabled', true);
    			//alert("Only one row can be added at a time");
    		//}
    		
    		
			if(selectedBalanceType !='B'){	
						$('table#balTransTblData th:nth-of-type(1)').css('width','23%');
						$('table#balTransTblData tfoot td:nth-of-type(1)').css('width','23%');
						$('table#balTransTblData tbody td:nth-of-type(1)').css('width','23%'); 
		
						$('table#balTransTblData th:nth-of-type(3)').css('width','32%');
						$('table#balTransTblData tfoot td:nth-of-type(3)').css('width','32%');
						$('table#balTransTblData tbody td:nth-of-type(2)').css('width','32%');

						$('table#balTransTblData th:nth-of-type(4)').css('width','20%');
						$('table#balTransTblData tfoot td:nth-of-type(4)').css('width','20%');
						$('table#balTransTblData tbody td:nth-of-type(3)').css('width','20%');
						
						$('table#balTransTblData th:nth-of-type(5)').css('width','10%');
						$('table#balTransTblData tfoot td:nth-of-type(5)').css('width','10%');
						$('table#balTransTblData tbody td:nth-of-type(4)').css('width','10%');
						
						$('table#balTransTblData th:nth-of-type(6)').css('width','5%');
						$('table#balTransTblData tfoot td:nth-of-type(6)').css('width','5%');
						$('table#balTransTblData tbody td:nth-of-type(5)').css('width','5%');
						
						$('table#balTransTblData th:nth-of-type(7)').css('width','10%');
						$('table#balTransTblData tfoot td:nth-of-type(7)').css('width','10%');
						$('table#balTransTblData tbody td:nth-of-type(6)').css('width','10%');
					 }
					else
					{
						$('table#balTransTblData th:nth-of-type(1)').css('width','20%');
						$('table#balTransTblData tfoot td:nth-of-type(1)').css('width','20%');
						$('table#balTransTblData td:nth-of-type(1)').css('width','20%'); 

						$('table#balTransTblData th:nth-of-type(2)').css('width','10%');
						$('table#balTransTblData tfoot td:nth-of-type(2)').css('width','10%');
						$('table#balTransTblData td:nth-of-type(2)').css('width','10%');

						$('table#balTransTblData th:nth-of-type(3)').css('width','25%');
						$('table#balTransTblData tfoot td:nth-of-type(3)').css('width','25%');
						$('table#balTransTblData td:nth-of-type(3)').css('width','25%');

						$('table#balTransTblData th:nth-of-type(4)').css('width','20%');
						$('table#balTransTblData tfoot td:nth-of-type(4)').css('width','20%');
						$('table#balTransTblData td:nth-of-type(4)').css('width','20%');

						$('table#balTransTblData th:nth-of-type(5)').css('width','10%');
						$('table#balTransTblData tfoot td:nth-of-type(5)').css('width','10%');
						$('table#balTransTblData td:nth-of-type(5)').css('width','10%');

						$('table#balTransTblData th:nth-of-type(6)').css('width','5%');
						$('table#balTransTblData tfoot td:nth-of-type(6)').css('width','5%');
						$('table#balTransTblData td:nth-of-type(6)').css('width','5%');
						
						$('table#balTransTblData th:nth-of-type(7)').css('width','10%');
						$('table#balTransTblData tfoot td:nth-of-type(7)').css('width','10%');
						$('table#balTransTblData td:nth-of-type(7)').css('width','10%');
					}
			
	     //$("#btnSave").bind("click", Save);
	     //$("#btnDelete").bind("click", Delete); 
	     //$("#btnEdit").bind("click", Edit);
    /*}//if
    else{
    	var todaysDate = dataStorage.getData(TODAYS_DATE);
        //format start date as "07th, April" if "7th, April"
        var momentStartDate = moment(todaysDate).format("Do, MMMM YY");
        var formatedStartDate = momentStartDate.split(",");
        //alert(date[0]);
        if(formatedStartDate[0].length<=3){
               formatedStartDate[0]="0"+formatedStartDate[0];
               formatedStartDate=formatedStartDate[0]+","+formatedStartDate[1];
        }
        message = "The device date "+formatedStartDate+" is not in the current week.";
		common.alertMessage(message,callbackReturn,messageboxCommonMessages.messageTitleError);
    }*/
	
	
 }; 


 function Save(){ 
	
var balanceTransactionList = [];
var blankCount = 0;
//editMode = false;
//addMode = false;
var refNo = "";
var amt = "";
var isChq = ""; 
var editbtn = ""; 
var deletechkbok = "";
var Reference = "";
var Amount = "";
var li = "";
errorList = [];
var error = [];
$('#errors').empty();

		var table = $("#balTransTblData tbody");

		table.find('tr').each(function (i) {
				if(selectedBalanceType==='B')
				{
					refNo = $(this).find("td:nth-child(3)"); 
					amt = $(this).find("td:nth-child(4)"); 
				}
				else
				{
					 refNo = $(this).find("td:nth-child(2)"); 
					 amt = $(this).find("td:nth-child(3)"); 
				}
				
				Reference = refNo.children("input[type=text]").val();
				Amount = amt.children("input[type=number]").val();
					
				
				console.log("Reference "+Reference);
				console.log("Amount "+Amount);
				
				if(Reference != undefined && Amount != undefined)
				{
				
					refNo.removeClass( "has-error" );
					amt.removeClass( "has-error" );
					if(!validateFields(refNo,amt))
					{
						error[i] = true;
						
					}
					else{
						error[i] = false;
						
					}
				}
		
		});
  console.log("Error Status"+error);
  if(error.indexOf(true) != -1)
  {
	$('#errorDiv').show();
	var errorMsgSet = new Set(errorList);
	console.log(errorMsgSet.getElements());
	errorMsgList = errorMsgSet.getElements();
	$(errorMsgList).each(function(i) {
		li += "<li>" + errorMsgList[i] + "</li>";
	});
	
	$('#errors').append(li);
  }
  else
  {
	//editMode = false;
	//addMode = false;
	var userBalanceId;
	var balanceDate;
	var periodIndicator;
	var amount;
	var reference;
	var balanceTypeId;
	var chequeIndicator;
	var isPrimaryJourney;
	
	
	var loggedInUserId = session.getData(LOGGEDIN_USER_ID);
	
	table.find('tr').each(function (i) {
		
		var transDate = $(this).find("td:nth-child(1)"); 
		
		if(selectedBalanceType==='B')
		{
			isChq = $(this).find("td:nth-child(2)"); 
			refNo = $(this).find("td:nth-child(3)"); 
			amt = $(this).find("td:nth-child(4)"); 
			editbtn = $(this).find("td:nth-child(5)"); 
			deletechkbok = $(this).find("td:nth-child(6)");
				rowId = $(this).find("td:nth-child(8)");
				//isSynched = $(this).find("td:nth-child(8)"); 
		}
		else
		{
			 refNo = $(this).find("td:nth-child(2)"); 
			 amt = $(this).find("td:nth-child(3)"); 
			 editbtn = $(this).find("td:nth-child(4)"); 
			 deletechkbok = $(this).find("td:nth-child(5)");
				rowId = $(this).find("td:nth-child(7)");
				//isSynched = $(this).find("td:nth-child(7)"); 	
		}
		
		var ChequeIndicator = '0';
		if(selectedBalanceType==='B')
		{
			ChequeIndicator = isChq.children("input[type=checkbox]:checked").val();
			if(ChequeIndicator == undefined)
				ChequeIndicator = '0';
		}
		
		var isDeleted = '0';
		
			isDeleted = deletechkbok.children("input[type=checkbox]:checked").val();
			if(isDeleted == undefined)
			{
				isDeleted = '0';
			}
			
			console.log("RowID "+rowId.children("input[type=hidden]").val());
			
			var balanceId = rowId.children("input[type=hidden]").val();
			
			
			
			$('#errorDiv').hide();
			
			calculateGrandTotal();
			
			$('#btnAdd').attr("disabled", false);
			
			if(isDeleted==1)
			{
				Reference = refNo.text();
				Amount = amt.text();
				TransDate = transDate.text();
			}
			else
			{
				Reference = refNo.children("input[type=text]").val();
				Amount = amt.children("input[type=number]").val();
				TransDate = transDate.find('option:selected').text();
			}
			
		//console.log(transDate.text());
			if(Reference != undefined && Amount != undefined)
			{
			  console.log("BalanceDate "+transDate.find('option:selected').text());
			  console.log("ChequeIndicator "+ChequeIndicator);
			  console.log("Reference "+Reference);
			  console.log("Amount "+Amount);
			  console.log("isDeleted "+isDeleted);
			  console.log("balanceId "+balanceId);
		
				//yearNo = yearNo.toString().substr(2);
				console.log("YEARNO "+yearNo);
					userBalanceId = yearNo+weekNo+padLeft(loggedInUserId,6);
					console.log("userBalanceId "+userBalanceId);
					var temp = (TransDate).toString().split("/"); 
					//console.log("temp "+temp);
					balanceDate = temp[2]+'-'+temp[1]+'-'+temp[0];
					
					console.log("balanceDate "+balanceDate);
					
					periodIndicator = 'D';
					amount = Amount;
					if(selectedBalanceType==='F' || selectedBalanceType==='B'){
						reference = replaceRefVal(Reference);
					}
					else
					{
						reference = Reference;
					}
					balanceTypeId = selectedBalanceType;
					chequeIndicator = ChequeIndicator;
					
					if(selectedUserJourneyId === selectedJourney)
						isPrimaryJourney = "Y";
					else
						isPrimaryJourney = "N";
					
					var reqJson =  {"balanceId": balanceId,"userBalanceId": userBalanceId,"journeyId": selectedJourney,"balanceDate": balanceDate,"periodIndicator": periodIndicator,"amount": amount,"reference": reference,"balanceTypeId": balanceTypeId,"chequeIndicator": chequeIndicator,"isDeleted": isDeleted,"reason": "","journeyUserId": selectedUserId,"isPrimaryJourney": isPrimaryJourney};
					
					balanceTransactionList.push(reqJson);
			}		
	});
	console.log(JSON.stringify(balanceTransactionList));
	if(balanceTransactionList.length>0)
	{
	service.postBalanceTransactionData(balanceTransactionList,function(){
		//alert(messageboxCommon.messageTitleAlert,messageboxBalance.msgSaveSuccess);
		
		//call the weekly summary sheet service to get the data
		//service.getBalanceTransactionDataService(weekStartDate,weekEndDate,selectedJourney,selectedUserId,selectedBalanceType,function(data){
		//	renderPullData(data);
		//});
		editMode = false;
		addMode = false;
		//Redirecting to Cash Summary Page
		common.redirect("weeklySummarySheet.html");
	});
  }
  }
  
 }; 
 
 function Edit(){ 
		//var editCount = 0;
		//alert("editMode "+editMode);
		if((addMode == false && closedWeekStatus != "0") || (addMode == false && isSuperUser === "true"))
		{
			//editMode = true;
			$("#balTransTblData tbody").on("click", "#btnEdit", function (event) {
			
			//if(editCount == 0)
			//{
			
			//editCount++;
			editMode = true;
			//var par = $(this).parent().parent(); //tr
			var par =  $(this).closest("tr");
			var transDate = par.children("td:nth-child(1)"); 
			
			var isChq; 
			var refNo; 
			var amt; 
			var editbtn; 
			var deletebtn; 
			
			if(selectedBalanceType==='B')
			{
				 isChq = par.children("td:nth-child(2)"); 
				 refNo = par.children("td:nth-child(3)"); 
				 amt = par.children("td:nth-child(4)"); 
				 editbtn = par.children("td:nth-child(5)"); 
				 deletebtn = par.children("td:nth-child(6)"); 
			}
			else
			{
				 refNo = par.children("td:nth-child(2)"); 
				 amt = par.children("td:nth-child(3)"); 
				 editbtn = par.children("td:nth-child(4)"); 
				 deletebtn = par.children("td:nth-child(5)"); 
			}
			//alert(transDate.text());
			var selectList = "<td><select id=selectTransDate>";
			$(dateList).each(function(i) {
				
				if(transDate.text() == dateList[i]) {
					selectList += "<option value="+i+" selected>" + dateList[i] + "</option>";
			    }
				else
				{
					selectList += "<option value="+i+">" + dateList[i] + "</option>";
				}
			});
			selectList += "</select></td>";
			var RefVal = refNo.children("div[class=elipssis]").html().trim();
			console.log(RefVal);
			console.log("Amt ID "+amt.attr("name").substring(3));
			//amt.css('padding-right','8px');
			var attrName = amt.attr("name");
			if(attrName != undefined)
			{
			
			transDate.html(selectList);
			if(selectedBalanceType==='B')
			isChq.children("input[type=checkbox]").prop("disabled", false);
			deletebtn.children("input[type=checkbox]").prop("disabled", true);
			//$("#balTransTblData tbody").find('input[name^="isDeleted"]').each(function () {
			//	$(this).prop("disabled", true);
			//});
			refNo.html("<input type='text' name='"+refNo.attr("name")+"' size='4' value='"+RefVal+"'>");
			
			amt.html("<input type='number' name='"+attrName+"' id='" + attrName + "' style='width: 100%;' data-corners=false size=4 onkeypress='return validateFloatKeyPress(this,event,"+attrName.substring(3)+");' inputmode=numeric step=0.01  value='"+amt.html().trim()+"'/>");
			//amt.html("<input type='text' name='' maxlength=4 size='4'  value='"+amt.html()+"'/>");
			//editbtn.html("<img src=css/themes/images/icons-png/save-icon.png class=icon-img id='btnSave' onclick='Save()'/>");
			editbtn.html("<img src=img/edit-icon-disabled.png name=edit" + counter + " alt=edit class=img-icon id=btnEdit/>");
			//deletebtn.html("<img src=css/themes/images/icons-png/delete-icon.png class=icon-img id='btnDelete' onclick='editDelete()'/>");
			}
			
		 $('#btnAdd').attr('disabled', true);
		 //}
		//else
		//{
		//	event.preventDefault();
		//}
    });
	
	}
	else
	{
		event.preventDefault();
	}
 };
 
 function Delete(){
	 
	  $("#balTransTblData tbody").on("click", "#btnDelete", function (event) {
	 		var par =  $(this).closest("tr");
	 		$(this).closest("tr").remove();
	 		if($('input[name^="amt"]').length == 0)
	 			{
	 				addMode = false;
	 				$("#balTransTblData tbody").find('img[id^="btnEdit"]').each(function () {
	 					$(this).attr("src", "img/edit-icon.png");
	 				});
	 			}
	         calculateGrandTotal();
	   });
};
 


 function calculateRow(row) {
    var amt = +row.find('input[name^="amt"]').val();
	
}

function calculateGrandTotal() {
    var grandTotal = 0;
   /* $("#balTransTblData tbody").find('input[name^="amt"]').each(function () {
        grandTotal += +$(this).val();
    });*/
	$("#balTransTblData tbody").find('td[name^="amt"]').each(function () {
        grandTotal += +$(this).text();
    });
    $("#grandtotal").text(grandTotal.toFixed(2));
	$("#grandtotal").css('font-weight','bold');
}



	
	function renderBalanceTrans(i,res){
	
		
        var listItem;
        listItem=JSON.parse(res);
		console.log(res);
		var amnt = common.convertToAmount(listItem.amount);
		var newRow = $("<tr class='row_width'>");
        var cols = "";
		var temp = (listItem.balanceDate).split("-");
		var balDateDisplay = temp[2].split(" ")[0]+'/'+temp[1]+'/'+temp[0];

		cols += '<td>'+balDateDisplay+'</td>';
		if(selectedBalanceType==='B')
		{
			if(listItem.chequeIndicator == 1)
				cols += '<td class="chq_padding"><input type="checkbox" name="isChq' + i + '" value="1" checked disabled class="ui-chkbox"></td>';
			else
				cols += '<td class="chq_padding"><input type="checkbox" name="isChq' + i + '" value="1" disabled class="ui-chkbox"></td>';
		}
		cols += '<td name="refNo' + i + '" class="ref_padding"><div class="elipssis"> '+listItem.reference+'</div></td>';
		cols += '<td name="amt' + i + '" class="amt-css">'+amnt+'</td>';	
        cols += '<td class="edit_padding"><img src="img/edit-icon.png" alt="edit" name="edit' + i + '" class="img-icon" id="btnEdit" onclick="Edit()"/></td>';
        cols += '<td class="delete_padding"><input type="checkbox" name="isDeleted' + i + '" value="1"></td>';
        cols += '<td></td>';
		cols += '<td name="rowId' + i + '" style="display:none;"><input type="hidden"  value="'+listItem.balanceId+'" name="rowId' + i + '"/></td>';
        
        newRow.append(cols);
        
        $("#balTransTblData tbody").append(newRow);
		/*if(isLatestSDTWeek !== "1")
		{
			$('input[name=isDeleted'+i+']').prop("disabled", true);
		}*/
		
		if(closedWeekStatus == "0" && isSuperUser !== "true")
		{	
			$('input[name=isDeleted'+i+']').prop("disabled", true);
			$('img[id^="btnEdit"]').attr("src", "img/edit-icon-disabled.png");
		}
		//$('#balTransTblData thead tr th,#balTransTblData tbody tr td,#balTransTblData tfoot tr td').css('width',  ($('#balTransTblData thead tr ').width()/Number(5)) + 'px');
    }

function validateFloatKeyPress(el, evt, n) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    var number = el.value.split('.');

   /* if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
         return false;
     }*/
	 
	 if ((charCode != 45 || $('input#amt'+n).val().indexOf('-') != -1) &&      // �-� CHECK MINUS, AND ONLY ONE.
            (charCode != 46 || $('input#amt'+n).val().indexOf('.') != -1) &&      // �.� CHECK DOT, AND ONLY ONE.
            (charCode < 48 || charCode > 57))
         return false;
        
     //just one dot
     if(number.length>1 && charCode == 46){
          return false;
      }
      
     var currentChar = parseFloat(String.fromCharCode(charCode), 10);
          
     var nextValue =  currentChar + $('input#amt'+n).val();
     
      //Check length after 2 decimal point  
      if(nextValue.indexOf('.')!=-1){         
       if(nextValue.split(".")[1].length > 2){                
                 return false;
           }
		}
	  
              
    return true;
};

function validateFields(refNo,amt){
var validationResult = true;
//errorList = [];
var Reference = refNo.children("input[type=text]").val();
var Amount = amt.children("input[type=number]").val();
				
		if(Reference == "" && selectedBalanceType!='C'){ //if userid empty
			refNo.addClass( "has-error" );
			errorList.push(errorMsg.blankReferenceField);
			validationResult = false;
		}
		else if(!validateRef(Reference) && Reference != undefined && selectedBalanceType!='C'){
			refNo.addClass( "has-error" );
			//errorList.push(errorMsg.invalidRefForFloatandCash);
			validationResult = false;
		}
		if(Amount == ""){ //if surname empty
			amt.addClass( "has-error" );
			errorList.push(errorMsg.blankAmountField);
			validationResult = false;
		}
		else if(parseFloat(Amount) === 0){
			amt.addClass( "has-error" );
			errorList.push(errorMsg.zeroAmount);
			validationResult = false;
		}
		else if(!validateAmount(Amount) && Amount != undefined){
			amt.addClass( "has-error" );
			errorList.push(errorMsg.maxAmount);
			validationResult = false;
		}
		
		return validationResult;
} 

function validateAmount(amtVal){
var pattern = /^\d{0,4}(\.\d{1,2})?$/;
if (!pattern.test(amtVal)) {
		
		//checks if dot is present
		if(amtVal.indexOf('.')!=-1){  
		//If dot present then number should not be greater than 2 after decimal
       if(amtVal.split(".")[1].length > 2){
				
				
				if(amtVal.split(".")[1].indexOf('.')!=-1)
				{
					//alert("Only one decimal is allowed");
					//common.alertMessage(messageboxBalanceTransactionPage.amtDecimalFormat, callbackReturn, messageboxBalanceTransactionPage.messageTitleError);
					return false;
				}
				else
				{
					//alert("Only 2 digit accepted after decimal");
					//common.alertMessage(messageboxBalanceTransactionPage.amtDecimalFormat, callbackReturn, messageboxBalanceTransactionPage.messageTitleError);
					return false;
				}
           }
		   //If dot present then number should not be greater 9999.99
		else if(amtVal.split(".")[0].length > 4){
		
				//alert("Amount cannot be more than 9999.99");
				//common.alertMessage(messageboxBalanceTransactionPage.invalidAmt, callbackReturn, messageboxBalanceTransactionPage.messageTitleError);
                 return false;
           }
		 
		}
		else
		{
			//If dot not present then number should not be greater 9999.99
			if(amtVal.length > 4){
		
				//alert("Amount cannot be more than 9999.99");
				//common.alertMessage(messageboxBalanceTransactionPage.invalidAmt, callbackReturn, messageboxBalanceTransactionPage.messageTitleError);
                 return false;
           }
		}
		  //return false;
	}
	else
	return true;
       }

function validateRef(refVal){
	
	var pattern = "";
if(selectedBalanceType==='L')
{
	//var pattern = /^[a-zA-Z]{0,2}\d{1,10}$/img;
	 pattern = /^[a-zA-Z]{0,2}\d{1,10}(\s?-+(.{1,250}))?$/img;
	if (!pattern.test(refVal.toString().trim())) {
				//alert("Reference Text format must be x9999999999 or xx9999999999");
				//common.alertMessage(messageboxBalanceTransactionPage.invalidRefLoan, callbackReturn, messageboxBalanceTransactionPage.messageTitleError);
				errorList.push(errorMsg.invalidRefLoan);
                 return false;
           }
}
if(selectedBalanceType==='F' || selectedBalanceType==='B') //Cash Banked and Float WithDrawn
{
	//var pattern = /^[jJmM]{1}\d{1,4}[\/]{1}[jJmM]{1}\d{1,4}(-.*?)?$/img;
	 pattern = /^[jJmM]{1}\d{1,4}([\/]{1}[jJmM]{1}\d{1,4})?(\s?-+(.{1,250}))?$/img;
	if (!pattern.test(refVal.toString().trim())) {
				//alert("Reference Text format must be J9999 or M9999");
				//common.alertMessage(messageboxBalanceTransactionPage.invalidRefFloatandCash, callbackReturn, messageboxBalanceTransactionPage.messageTitleError);
				errorList.push(errorMsg.invalidRefForFloatandCash);
                 return false;
           }
}
	return true;
}
              

function padLeft(nr, n, str){
    return Array(n-String(nr).length+1).join(str||'0')+nr;
};

function sortFunction(a,b){  
    var dateA = new Date(a.balanceDate.split(" ")[0]).getTime();
    var dateB = new Date(b.balanceDate.split(" ")[0]).getTime();
	//console.log("dateA "+dateA);
    return dateA > dateB ? 1 : -1;  
}; 
/*
window.onbeforeunload = function(event) {
	console.log("Event Fired "+JSON.stringify(event));
	event.preventDefault();
			if(editMode === true || addMode === true)
			{
				event.returnValue = "Changes will not be saved. Continue ?";
				//var result = confirm("Changes will not be saved. Continue ?");
				//if (result == true) {
				//	window.history.back();
				//} 
				//common.confirmMessage(messageboxBalance.msgConfirmDelete,confirmBackCallback, messageboxBalance.messageTitleConfirm); 
			}
			else
			{
				//window.history.back();
			}
};
*/

window.onload = function () {
	//alert("Called");
    if (typeof history.pushState === "function") {
        history.pushState("jibberish", null, null);
        window.onpopstate = function () {
            history.pushState('newjibberish', null, null);
            // Handle the back (or forward) buttons here
            // Will NOT handle refresh, use onbeforeunload for this.
			if(editMode === true || addMode === true)
			{
				
				var result = confirm(messageboxCommon.messageTitleConfirm,messageboxBalance.msgConfirmDelete,function(result){
					if (result == true) {
						common.redirect("weeklySummarySheet.html");
					}
				});
				
				//common.confirmMessage(messageboxBalance.msgConfirmDelete,confirmBackCallback, messageboxBalance.messageTitleConfirm); 
			}
			else
			{
				common.redirect("weeklySummarySheet.html");
			}
        };
    }
    
}

$(document).on('change', 'input[name^="isDeleted"]', function() {
    if(this.checked) {
    	var rowNum = $(this).attr("name").substring(9);
    	console.log("delete row "+rowNum);
    	$('img[name =edit'+rowNum+']').attr("src", "img/edit-icon-disabled.png");
    	$('img[name =edit'+rowNum+']').attr("onclick", "");
    }
    else
    {
    	if(!addMode)
		{
    		var rowNum = $(this).attr("name").substring(9);
    		$('img[name =edit'+rowNum+']').attr("src", "img/edit-icon.png");
    		$('img[name =edit'+rowNum+']').attr("onclick", "Edit()");
		}
    }
});


function replaceVal(el) {
	
    tempVal = el.value;
    
    if (tempVal.indexOf(defaultRefNo) == -1) {
        tempVal = defaultRefNo;
        el.value = defaultRefNo;
    }
}
function listen(event, elem, func) {
	//alert(""+elem.value,""+elem.value);
    if (elem.addEventListener) {
    	
        elem.addEventListener(event, func, false);
    } else if (elem.attachEvent) {
    	
        elem.attachEvent('on' + event, func);   
    }
}


function replaceRefVal(refval) {
	var tempVal;
	
	if (refval.indexOf("-") != -1) {
		var res = refval.substring(refval.indexOf("-"));
        tempVal = defaultRefNo+res;
       
    }
	else if(refval.indexOf("-") == -1)
	{
		tempVal = defaultRefNo;
	}
	
	return tempVal;
}





