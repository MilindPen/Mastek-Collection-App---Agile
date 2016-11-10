//Checks If user is logged in
//common.checkUserSession();
(commonAttributes.checkUserSession==true) ? common.checkUserSession() : "";

var isSuperUser = session.getData(IS_SUPERUSER).toString();
console.log("Super User "+isSuperUser);


var weeklyCollections, weeklyFloatWithdrawn, weeklyTotalRecv, weeklyLoansIssued, weeklyCashBanked, weeklyRaf, weeklyTotalPaidOut, weeklyBalance, weeklyBalanceLabel;
var selectedWeek = session.getData(SELECTED_WEEK);
var selectedUserId = session.getData(SELECTED_USER);
var selectedUserName = session.getData(SELECTED_USER_NAME);
var selectedUserJourney = session.getData(SELECTED_USER_JOURNEY);
var selectedJourney = session.getData(SELECTED_JOURNEY);
var selectedJourneyDesc = session.getData(SELECTED_JOURNEY_DESC);
var selectedBranch = session.getData(SELECTED_BRANCH_NAME);
var selectedBranchID  = session.getData(SELECTED_BRANCH);
var latestWeek = session.getData(IS_SELECTED_WEEK_LATEST);
var selectedUserJourneyId = session.getData(SELECTED_USER_JOURNEYID);
var preventNavigation = false;
var balTransactionsClicked = false;
var isManualReload = false;

var closedWeekStatus = "";			
var temp = selectedWeek.split(" ");
var weekStartDate = temp[0];
console.log("weekStartDate "+weekStartDate);
var weekEndDate = temp[1];
console.log("weekEndDate "+weekEndDate);
var weekNo = temp[2];
var yearNo = temp[3];
var weeklySummaryTransactionList = [];
var weeklySummarySheet = {
		renderWeeklySummarySheet: function(data){		
			var weekSummary = data.weeklySummary;
			console.log(weekSummary);
			weeklyCollections = common.convertToAmount(weekSummary.collections);
			weeklyFloatWithdrawn = common.convertToAmount(weekSummary.floatWithdrawn);
			weeklyTotalRecv =  parseFloat(weeklyCollections) + parseFloat(weeklyFloatWithdrawn);
			weeklyLoansIssued = common.convertToAmount(weekSummary.loansIssued);
			weeklyCashBanked = common.convertToAmount(weekSummary.cashBanked);
			weeklyRaf = common.convertToAmount(weekSummary.raf);
			weeklyTotalPaidOut = parseFloat(weeklyLoansIssued) + parseFloat(weeklyCashBanked) + parseFloat(weeklyRaf);
			weeklyBalance = weeklyTotalRecv - weeklyTotalPaidOut;
			//weeklyBalance = 5;
			if(weeklyBalance>0){
				weeklyBalanceLabel = 'Short';
			}
			else if(weeklyBalance<0){
				weeklyBalanceLabel = 'Over';
			}
			else{
				weeklyBalanceLabel = 'Balance';
			}
			$('a#collectionsAmt').html('&pound;'+weeklyCollections);
			$('a#floatWithdrawnAmt').html('&pound;'+weeklyFloatWithdrawn);
			$('span#totalRecvAmt').html('&pound;'+common.convertToAmount(weeklyTotalRecv));
			$('a#loansIssuedAmt').html('&pound;'+weeklyLoansIssued);
			$('a#cashBankedAmt').html('&pound;'+weeklyCashBanked);
			$('a#rafAmt').html('&pound;'+weeklyRaf);
			$('span#totalPaidOutAmt').html('&pound;'+common.convertToAmount(weeklyTotalPaidOut));
			$('span#balanceAmt').html('&pound;'+common.convertToAmount(Math.abs(weeklyBalance)));
			$('#weeklyBalanceLabel').html(weeklyBalanceLabel);
			session.setData(SHORT_AND_OVER_NEW_BALANCE,common.convertToAmount(weeklyBalance));
			if(selectedUserJourneyId == selectedJourney)
			{
				$('a#collectionsAmt').parent().text($('a#collectionsAmt').text());
				$('.summarySheetAmt').css('color','#000');
			}
			weeklySummarySheet.isReasonApplicable();
			$(".reasonSubmitButton").bind("click", reasonSubmitButtonClick);
		},
		isReasonApplicable: function(){
			closedWeekStatus = session.getData(CLOSEDWEEK_STATUSID);
			if(closedWeekStatus != 0 || isSuperUser === "true"){
				$('#weeklyShortsOverReason').attr('disabled',false);
				$('.reasonSubmitButton').attr('disabled',false);	
			}
			else{
				$('#weeklyShortsOverReason').attr('disabled',true);
				$('.reasonSubmitButton').attr('disabled',true);
			}
		},
		setAndRedirect: function(selectedBalanceType){
            //alert("setAndRedirect");
            balTransactionsClicked = true;
			closedWeekStatus = session.getData(CLOSEDWEEK_STATUSID);
		/*	if(closedWeekStatus == 0 && weeklyBalance == 0 ){	//if week is closed and balance is zero
			}
			else{*/
				switch(selectedBalanceType){
					case balanceTransactionType.Collection:
                        if(closedWeekStatus == "0" && weeklyCollections == "0.00" && isSuperUser === "false"){}
                        else{
                          session.setData(SELECTED_BALANCE_TYPE,balanceTransactionType.Collection);
						  common.redirect("balanceTransaction.html");    
                        }
						break;
					case balanceTransactionType.LaonsIssued:
                        if(closedWeekStatus == "0" && weeklyLoansIssued == 0.00 && isSuperUser === "false"){}
                        else{
						  session.setData(SELECTED_BALANCE_TYPE,balanceTransactionType.LaonsIssued);
						  common.redirect("balanceTransaction.html");
                        }
						break;
					case balanceTransactionType.CashBanked:
                        if(closedWeekStatus == "0" && weeklyCashBanked == "0.00" && isSuperUser === "false"){}
                        else{
						  session.setData(SELECTED_BALANCE_TYPE,balanceTransactionType.CashBanked);
						  common.redirect("balanceTransaction.html");
                        }
						break;
					case balanceTransactionType.FloatWithdrawn:
                        if(closedWeekStatus == "0" && weeklyFloatWithdrawn == "0.00" && isSuperUser === "false"){}
                        else{
						  session.setData(SELECTED_BALANCE_TYPE,balanceTransactionType.FloatWithdrawn);
						  common.redirect("balanceTransaction.html");
                        }
						break;
					case balanceTransactionType.Other:
                        if(closedWeekStatus == "0" && weeklyRaf == "0.00" && isSuperUser === "false"){}
                        else{
						  session.setData(SELECTED_BALANCE_TYPE,balanceTransactionType.Other);
						  common.redirect("balanceTransaction.html");
                        }
						break;
					default: 
						break;	
				}
			//}
			
		},
		saveWeeklyTransactionReason: function(){
			//if the reason is updated for existing week
			var balanceId="";
			var userBalanceId="";
			
			var shortsAndOverTransData = JSON.parse(session.getData(SHORTS_AND_OVER_TRANSACTION_DATA));
			console.log("shortsAndOverTransData: "+shortsAndOverTransData);
			if(shortsAndOverTransData.length>0){
				var temp = shortsAndOverTransData[0].balanceDate;
				temp = temp.split(" ");
				var prevBalanceDate = temp[0];	
				console.log("shortsAndOverTransData.balanceTypeId: " + shortsAndOverTransData[0].balanceTypeId);
				if(shortsAndOverTransData[0].balanceTypeId == 'S' && prevBalanceDate == weekEndDate){
					balanceId = session.getData(SHORTS_AND_OVER_BALANCE_ID);
				}
			}
			else{
				userBalanceId = yearNo.substr(2)+weekNo+padLeft(userid,6);
			}
			var isPrimaryJourney;
			if(selectedUserJourneyId == selectedJourney){
				isPrimaryJourney = "Y";
			}
			else{
				isPrimaryJourney = "N";
			}		
			var temp = selectedWeek.split(" ");
			var balanceDate = temp[1];
			console.log(userBalanceId);
			var periodIndicator = "W";
			var balanceType = "S";
			var amount = weeklyBalance;
			var reason = $('#weeklyShortsOverReason').val();
			var balanceTypeId = "S";
			var chequeIndicator = "0";
			var isDeleted = "0";
			
			var reqJson =  {
				"balanceId": balanceId,"userBalanceId":userBalanceId,"journeyId": selectedJourney,"balanceDate": balanceDate,"periodIndicator": periodIndicator,"amount": amount,"reference": "","balanceTypeId": balanceTypeId,"chequeIndicator": chequeIndicator,"isDeleted": isDeleted,"reason": reason,"journeyUserId": selectedUserId,"isPrimaryJourney": isPrimaryJourney
			};
			
			weeklySummaryTransactionList.push(reqJson);
			
			service.postBalanceTransactionData(weeklySummaryTransactionList,function(){
				//alert(messageboxCommon.messageTitleAlert,messageboxWeeklySummarySheet.msgSaveSuccess);
				isManualReload=true;
				bootbox.dialog({
					  message: messageboxWeeklySummarySheet.msgSaveSuccess,
					  title: messageboxCommon.messageTitleAlert,
					  buttons: {
					    success: {
					      label: "OK",
					      className: "custom-modalbtn-primary",
					      callback: function() {
					    	  common.redirect("/balancing/login/");
					      }
					    }
					    
					  }
				});
				//location.reload();
			});
			
		}
};
$(document).ready(function() {
 // executes when HTML-Document is loaded and DOM is ready
 //console.log("document is ready");
 
 //call the weekly summary sheet service to get the data
	service.getWeeklySummarySheetService(weekStartDate,weekEndDate,selectedJourney,selectedUserId,function(data){
		weeklySummarySheet.renderWeeklySummarySheet(data);
	});
	service.getBalanceTransactionDataService(weekStartDate,weekEndDate,selectedJourney,selectedUserId,"S",function(data){
		session.setData(SHORTS_AND_OVER_TRANSACTION_DATA,JSON.stringify(data.transactions));
		console.log(JSON.stringify(data.transactions));
		var transactions = JSON.parse((session.getData(SHORTS_AND_OVER_TRANSACTION_DATA)));
		console.log("transactions.length: " + transactions.length);
		//console.log("transactions: " + transactions);
		if(transactions.length>0){
			var reason = transactions[0].reason;
			console.log("transactions.reason: " + reason);
			session.setData(SHORTS_AND_OVER_BALANCE_ID,transactions[0].balanceId);
			session.setData(SHORTS_AND_OVER_PREV_REASON,((reason == null || reason == undefined) ? reason = "" : reason=reason));
			$('#weeklyShortsOverReason').text(session.getData(SHORTS_AND_OVER_PREV_REASON));
			console.log("transactions.reason: " + (transactions[0].reason));
            var prevWeeklyBalance = transactions[0].amount;
            session.setData(SHORTS_AND_OVER_PREV_BALANCE,common.convertToAmount(prevWeeklyBalance));
		}
		else{
			session.setData(SHORTS_AND_OVER_BALANCE_ID,"");
			session.setData(SHORTS_AND_OVER_PREV_REASON,"");
			session.setData(SHORTS_AND_OVER_PREV_BALANCE,"0.00");			
		}
		
	});
	service.getClosedWeekStatus(selectedBranchID,weekNo,yearNo,function(data){
			closedWeekStatus = data.branchWeekStatus.weekStatusId;
		
		if(closedWeekStatus == "0"){
			$('span.closeWeekStatus').html("(Closed)");
		}

		session.setData(CLOSEDWEEK_STATUSID,closedWeekStatus);
		weeklySummarySheet.isReasonApplicable();
		disableHyperlinks();
	});
	
	$('#agentNameValue').html(selectedUserName);
	if(selectedUserJourney){
		$('.primaryJourney').html(" (" + selectedUserJourney + ")");	
	}
	else{
		$('.primaryJourney').css("display","hidden");
	}
	
	$('#journeyNumber').html(selectedJourneyDesc);
	$('#branchName').html(selectedBranch);
	
	//confirmation on click of home button
	$('.menuHome').click(function(event){
		event.preventDefault();
		var transactions = JSON.parse((session.getData(SHORTS_AND_OVER_TRANSACTION_DATA)));
		//if(transactions.length>0){
			var reasonText = $('#weeklyShortsOverReason').val();
			var oldBalance = session.getData(SHORTS_AND_OVER_PREV_BALANCE);
			var newBalance = session.getData(SHORT_AND_OVER_NEW_BALANCE);
	        //alert(oldBalance + " " + newBalance);
	       if(oldBalance != newBalance){
				/*var result = confirm("Changes will not be saved. Continue ?");
				if (result == true) {
					common.redirect("/balancing/login/");
				}
								
				//common.confirmMessage(messageboxBalance.msgConfirmDelete,confirmBackCallback, messageboxBalance.messageTitleConfirm); */
	           //alert("Please click on submit to save the updated balance.");
	    	   alert(messageboxCommon.messageTitleAlert,messageboxWeeklySummarySheet.msgNavigatingAway);
			}
			else
			{
				common.redirect("/balancing/login/");
		    }
		//}
		//else
		//{
		//	common.redirect("/balancing/login/");
	    //}
		
	});
	
});

function disableHyperlinks(){
	closedWeekStatus = session.getData(CLOSEDWEEK_STATUSID);
	
	if(closedWeekStatus == 0 && weeklyCollections == 0 && isSuperUser === "false"){
		
		$('a#collectionsAmt').removeAttr("href");
		$('a#collectionsAmt').css("color","black");
		$('a#collectionsAmt').hover(function(){
			$(this).css("text-decoration","none");
		});
	}
	if(closedWeekStatus == 0 && weeklyFloatWithdrawn == 0 && isSuperUser === "false"){
		$('a#floatWithdrawnAmt').removeAttr("href");
		$('a#floatWithdrawnAmt').css("color","black");
		$('a#floatWithdrawnAmt').hover(function(){
			$(this).css("text-decoration","none");
		});
	}
	if(closedWeekStatus == 0 && weeklyLoansIssued == 0 && isSuperUser === "false"){
		$('a#loansIssuedAmt').removeAttr("href");
		$('a#loansIssuedAmt').css("color","black");
		$('a#loansIssuedAmt').hover(function(){
			$(this).css("text-decoration","none");
		});
	}
	if(closedWeekStatus == 0 && weeklyCashBanked == 0 && isSuperUser === "false"){
		$('a#cashBankedAmt').removeAttr("href");
		$('a#cashBankedAmt').css("color","black");
		$('a#cashBankedAmt').hover(function(){
			$(this).css("text-decoration","none");
		});
	}
	if(closedWeekStatus == 0 && weeklyRaf == 0 && isSuperUser === "false"){
		$('a#rafAmt').removeAttr("href");
		$('a#rafAmt').css("color","black");
		$('a#rafAmt').hover(function(){
			$(this).css("text-decoration","none");
		});
	}
}

function reasonSubmitButtonClick(event){
	var reasonText = $('#weeklyShortsOverReason').val();
		//reason is mandatory if weekly balance is non-zero
		if(weeklyBalance != 0 && reasonText.length == 0)
		{
			if(weeklyBalance > 0){
				var msg = "You are declaring a " + weeklyBalanceLabel + " of £" + common.convertToAmount(Math.abs(weeklyBalance)) + ". Please specify the reason."; 
				alert(messageboxCommon.messageTitleAlert,msg);
			}
			else if(weeklyBalance < 0){
				var msg = "You are declaring an " + weeklyBalanceLabel + " of £" + common.convertToAmount(Math.abs(weeklyBalance)) + ". Please specify the reason.";
				alert(messageboxCommon.messageTitleAlert,msg);
			}
		}
		//reason is not mandatory if weekly balanc=nce is zero
		else{
			weeklySummarySheet.saveWeeklyTransactionReason();
		}	
}

$(window).load(function() {
 // executes when complete page is fully loaded, including all frames, objects and images
 //console.log("window is loaded");
	var displayWeekStartDate = moment(weekStartDate).format("DD MMM"); 
	var displayWeekEndDate = moment(weekEndDate).format("DD MMM");
	$('span#displayWeekStartValue').html(displayWeekStartDate); 
	$('span#displayWeekEndValue').html(displayWeekEndDate);
	
   //alert("Called");
    /*if (typeof history.pushState === "function") {
        history.pushState("jibberish", null, null);
        window.onpopstate = function () {
            history.pushState('newjibberish', null, null);
            // Handle the back (or forward) buttons here
            // Will NOT handle refresh, use onbeforeunload for this.
            var transactions = JSON.parse((session.getData(SHORTS_AND_OVER_TRANSACTION_DATA)));
    		if(transactions.length>0){
    			var reasonText = $('#weeklyShortsOverReason').val();
    			var oldBalance = session.getData(SHORTS_AND_OVER_PREV_BALANCE);
    			var newBalance = session.getData(SHORT_AND_OVER_NEW_BALANCE);
    	       if(oldBalance != newBalance){
    				var result = confirm("Changes will not be saved. Continue ?");
    				if (result == true) {
    					common.redirect("selectionSummary.html");
    				} 
    				//common.confirmMessage(messageboxBalance.msgConfirmDelete,confirmBackCallback, messageboxBalance.messageTitleConfirm); 
                   //alert("Please click on submit to save the updated balance.");
    	    	   alert(messageboxCommon.messageTitleAlert,messageboxWeeklySummarySheet.msgNavigatingAway);
    			}
    			else
    			{
    				common.redirect("selectionSummary.html");
    			}
    		}
    		else
			{
				common.redirect("selectionSummary.html");
			}
			
        };
    }*/
});


window.onbeforeunload = function(e){
    //alert("onbeforeunload");
    if(balTransactionsClicked==false && isManualReload == false){
    	var transactions = JSON.parse((session.getData(SHORTS_AND_OVER_TRANSACTION_DATA)));
		//if(transactions.length>0){
			 var reasonText = $('#weeklyShortsOverReason').val();
				var oldBalance = session.getData(SHORTS_AND_OVER_PREV_BALANCE);
				var newBalance = session.getData(SHORT_AND_OVER_NEW_BALANCE);
		        //alert(oldBalance + " " + newBalance);
		       if(oldBalance != newBalance){
		            //var result = confirm('Changes will not be saved. Continue ?');
		            /*if(confirm('Changes will not be saved. Continue ?')){
		                //window.location.reload();
		                //setAndRedirect();
		            }
		            else {
		                e = e || event;
		                e.preventDefault();
		            }*/
		    	   //alert("Please click on submit to save the updated balance.");
		    	   alert(messageboxCommon.messageTitleAlert,messageboxWeeklySummarySheet.msgNavigatingAway);
		           event.preventDefault ? event.preventDefault() : (event.returnValue = false);
		        }    
		//}
       
    }
	
}


function padLeft(nr, n, str){
    return Array(n-String(nr).length+1).join(str||'0')+nr;
};

	