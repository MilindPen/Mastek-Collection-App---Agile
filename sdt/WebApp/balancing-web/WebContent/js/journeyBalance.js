//Checks If user is logged in
//common.checkUserSession();
(commonAttributes.checkUserSession==true) ? common.checkUserSession() : "";

var journeyBalanceVar = {
	loggedInUser : session.getData(LOGGEDIN_USER_NAME),
	selectedWeek : session.getData(SELECTED_WEEK),
	selectedBranchName : session.getData(SELECTED_BRANCH_NAME),
	selectedUserName : session.getData(SELECTED_USER_NAME),
	selectedJourney : session.getData(SELECTED_JOURNEY),
	selectedJourneyDesc : session.getData(SELECTED_JOURNEY_DESC),
	closedWeekStatus : session.getData(CLOSEDWEEK_STATUSID)
}	

var temp = (journeyBalanceVar.selectedWeek).split(" ");
var weekStartDate = temp[0];
var weekEndDate = temp[1];
var weekNo = temp[2];
var yearNo = temp[3];

var delegatedActualRowObj = 0;
var delegatedDeclaredRowObj = 0;
var primaryJourneyObj = 0;
var delegatedDeclaredRowCount = 0;

/***Balance calculation for Primary Journey Variables***/
//Actual variables
var paCash = paCard = paCentral = paLoans = paRaf = paFloat = paBanked = paSO = "0.00";
//Declared variables
var pdCash = pdCard = pdCentral = pdLoans = pdRaf = pdFloat = pdBanked = pdSO = "0.00";
//balance summary variables
var pAgent = "";
var pCash = pCard = pCentral = pLoans = pRaf = pFloat = pBanked = pAgentSO = "0.00";
//Shorts & Over variables
var psoCash = psoLoans = psoFloat = psoBanked = psoSO = "0.00";

/***Balance calculation for Delegated Journey Variables***/		
//Actual variables
var daCash = daCard = daCentral = daLoans = daRaf = daFloat = daBanked = daSO = "0.00";
//Declared variables
var dAgent = "";
var ddCash = ddCard = ddCentral = ddLoans = ddRaf = ddFloat = ddBanked = ddSO = "0.00";
//balance summary variables
var dCash = dCard = dCentral = dLoans = dRaf = dFloat = dBanked = dAgentSO = dSO = "0.00";
//Shorts & Over variables
var dsoCash = dsoCard = dsoCentral = dsoLoans = dsoRaf = dsoFloat = dsoBanked = dsoSO = "0.00";

/***sum of total received amounts variables***/
//total received variables
var declaredTotalRecvAmt = actualTotalRecvAmt = declaredTotalCollAmt = actualTotalCollAmt = declaredTotalFloatAmt = actualTotalFloatAmt = "0.00";

/***sum of total paid out amounts variables***/
//total paid out variables
var declaredTotalPaidOutAmt = actualTotalPaidOutAmt = declaredTotalLoansAmt = actualTotalLoansAmt = declaredTotalBankedAmt = actualTotalBankedAmt = declaredTotalRafAmt = "0.00";
		
var journeyBalance = {
	renderJourneyInfo: function(){
		// setting headers and dates
		$("#menuAgentName").html(journeyBalanceVar.loggedInUser);
		$('#agentNameValue').html(journeyBalanceVar.selectedUserName);
		$('#journeyNumber').html(journeyBalanceVar.selectedJourneyDesc);
		$('#branchName').html(journeyBalanceVar.selectedBranchName);
		var displayWeekStartDate = moment(weekStartDate).format("DD MMM"); 
		var displayWeekEndDate = moment(weekEndDate).format("DD MMM"); 
		$('span#displayWeekStartValue').html(displayWeekStartDate); 
		$('span#displayWeekEndValue').html(displayWeekEndDate); 
		if(journeyBalanceVar.closedWeekStatus == "0")
		{
			$('span#closeWeekStatus').html("(Closed)");
		}
	},
	calculateJourneyBalanceSummary: function(agentList,callback){
		
		var tbody = $('#journeyBalanceSummaryTbody');
		tbody.empty();
		
		var listItem;
		listItem=JSON.parse(agentList);
		
		//Determine data from service
		for(var i=0;i<listItem.length;i++)
		{
			if(listItem[i].isPrimaryUser == true){		//Primary journey agent present
				primaryJourneyObj = 1;
			}
			if(listItem[i].isPrimaryUser == false){		//Delegated journey agent present
				if(listItem[i].userId != 0){	//detect delegated declared row
					delegatedDeclaredRowObj = 1;
					delegatedDeclaredRowCount = delegatedDeclaredRowCount + 1; 
				}
				if(listItem[i].userId == 0){	//detect delegated actual row
					delegatedActualRowObj = 1;
				}
			}
		}
		console.log("primaryJourneyObj"+primaryJourneyObj);
		console.log("delegatedDeclaredRowObj"+delegatedDeclaredRowObj);
		console.log("delegatedActualRowObj"+delegatedActualRowObj);
		console.log("delegatedDeclaredRowCount"+delegatedDeclaredRowCount);
		
		/*****************Display Primary section start*********************/
		for(var i=0;i<listItem.length;i++)
		{
			/***Balance calculation for Primary Journey***/
			//display Primary journey summary data		
				if(listItem[i].isPrimaryUser == true){	//if primary data is present in service, then assign to variables else zero
					console.log(i);
					console.log(listItem[i]);
					
					//Declared variables
					pAgent = $.trim(listItem[i].firstName) + " " + $.trim(listItem[i].lastName);
					pdCash = common.convertToFormattedAmount(listItem[i].declaredCash);
					pdLoans = common.convertToFormattedAmount(listItem[i].declaredLoans);
					pdRaf = common.convertToFormattedAmount(listItem[i].declaredRaf);
					pdFloat = common.convertToFormattedAmount(listItem[i].declaredFloat);
					pdBanked = common.convertToFormattedAmount(listItem[i].declaredCashBanked);
					pdSO = common.convertToFormattedAmount(listItem[i].declaredShortsAndOvers);
					
					//Actual variables
					paCash = common.convertToFormattedAmount(listItem[i].actualCash);
					paCard = common.convertToFormattedAmount(listItem[i].actualCard);
					paCentral = common.convertToFormattedAmount(listItem[i].actualCentral);
					paLoans = common.convertToFormattedAmount(listItem[i].actualLoans);
					paFloat = common.convertToFormattedAmount(listItem[i].actualFloat);
					paBanked = common.convertToFormattedAmount(listItem[i].actualCashBanked);
					paSO = common.convertToFormattedAmount(listItem[i].actualShortsAndOvers);
				}	
		}
		//balance summary calculation
		pCash = (paCash);
		pCard = (paCard);
		pCentral = (paCentral);
		pLoans = (paLoans);
		pRaf = (pdRaf);
		pFloat = (paFloat);
		pBanked = (pdBanked);
		pAgentSO = parseFloat(common.removeComma(pCash)) - parseFloat(common.removeComma(pLoans)) - parseFloat(common.removeComma(pRaf)) + parseFloat(common.removeComma(pFloat)) - parseFloat(common.removeComma(pBanked)).toFixed(2);		
		
		//Shorts & Over calculation		
		psoCash = (common.removeComma(paCash) - common.removeComma(pdCash)).toFixed(2);
		psoLoans = (common.removeComma(pdLoans) - common.removeComma(paLoans)).toFixed(2);
		psoFloat = (common.removeComma(paFloat) - common.removeComma(pdFloat)).toFixed(2);
		psoBanked = (common.removeComma(pdBanked) - common.removeComma(paBanked)).toFixed(2);
		psoSO = (common.removeComma(paSO) - common.removeComma(pdSO)).toFixed(2);
		
		//Journey Balance Summary primary totals row		
		var newRow = $('<tr class="bgFoam journeyBalanceSummaryPrimaryRow" id="journeyBalanceSummaryPrimaryRow">');
		var cols = "";
		cols += '<td class="textLeft fontBold">Primary</td>';
		cols += '<td class="textLeft"></td>';
		cols += '<td id="pCash">'+pCash+'</td>';	
		cols += '<td id="pCard">'+pCard+'</td>';
		cols += '<td id="pCentral">'+pCentral+'</td>';
		cols += '<td id="pLoans">'+pLoans+'</td>';
		cols += '<td id="pRaf">'+pRaf+'</td>';	
		cols += '<td id="pFloat">'+pFloat+'</td>';
		cols += '<td id="pBanked">'+pBanked+'</td>';
		cols += '<td id="pSO"></td>';
		if(pAgentSO != 0){
			cols += '<td id="pAgentSO" class="fontAmber">'+common.convertToFormattedAmount(pAgentSO)+'</td>';
		}
		else{
			cols += '<td id="pAgentSO">'+common.convertToFormattedAmount(pAgentSO)+'</td>';
		}
		newRow.append(cols);
		tbody.append(newRow);
		
		//Journey Balance Summary primary declared row		
		var newRow = $('<tr class="pdAgentRow" id="pdAgentRow">');
		var cols = "";
		cols += '<td class="textLeft bgChenin pAgent">'+pAgent+'</td>';
		cols += '<td class="textLeft fontBold">Declared</td>';
		cols += '<td id="pdCash">'+pdCash+'</td>';	
		cols += '<td id="pdCard"></td>';
		cols += '<td id="pdCentral"></td>';
		cols += '<td id="pdLoans">'+pdLoans+'</td>';
		cols += '<td id="pdRaf">'+pdRaf+'</td>';	
		cols += '<td id="pdFloat">'+pdFloat+'</td>';
		cols += '<td id="pdBanked">'+pdBanked+'</td>';
		if(pdSO != 0){
			cols += '<td id="pdSO" class="fontAmber">'+pdSO+'</td>';
		}
		else{
			cols += '<td id="pdSO">'+pdSO+'</td>';
		}
		cols += '<td></td>';
		newRow.append(cols);
		tbody.append(newRow);
		
		//Journey Balance Summary primary actual row		
		var newRow = $('<tr class="paRow" id="paRow">');
		var cols = "";
		cols += '<td class="textLeft"></td>';
		cols += '<td class="textLeft fontBold">Actual</td>';
		cols += '<td id="paCash">'+paCash+'</td>';	
		cols += '<td id="paCard">'+paCard+'</td>';
		cols += '<td id="paCentral">'+paCentral+'</td>';
		cols += '<td id="paLoans">'+paLoans+'</td>';
		cols += '<td id="paRaf"></td>';	
		cols += '<td id="paFloat">'+paFloat+'</td>';
		cols += '<td id="paBanked">'+paBanked+'</td>';
		if(paSO != 0){
			cols += '<td id="paSO" class="fontAmber">'+paSO+'</td>';
		}
		else{
			cols += '<td id="paSO">'+paSO+'</td>';
		}
		cols += '<td></td>';
		newRow.append(cols);
		tbody.append(newRow);
		
		//Journey Balance Summary primary S/O row		
		var newRow = $('<tr class="pSORow" id="pSORow">');
		var cols = "";
		cols += '<td class="textLeft"></td>';
		cols += '<td class="textLeft fontBold">S/O</td>';
		if(psoCash != 0){
			cols += '<td id="psoCash" class="fontAmber">'+common.thousandSeparator(psoCash)+'</td>';
		}
		else{
			cols += '<td id="psoCash">'+common.thousandSeparator(psoCash)+'</td>';
		}	
		cols += '<td id="psoCard"></td>';
		cols += '<td id="psoCentral"></td>';
		if(psoLoans != 0){
			cols += '<td id="psoLoans" class="fontAmber">'+common.thousandSeparator(psoLoans)+'</td>';
		}
		else{
			cols += '<td id="psoLoans">'+common.thousandSeparator(psoLoans)+'</td>';
		}
		
		cols += '<td id="psoRaf"></td>';	
		if(psoFloat != 0){
			cols += '<td id="psoFloat" class="fontAmber">'+common.thousandSeparator(psoFloat)+'</td>';
		}
		else{
			cols += '<td id="psoFloat">'+common.thousandSeparator(psoFloat)+'</td>';
		}
		if(psoBanked != 0){
			cols += '<td id="psoBanked" class="fontAmber">'+common.thousandSeparator(psoBanked)+'</td>';
		}
		else{
			cols += '<td id="psoBanked">'+common.thousandSeparator(psoBanked)+'</td>';
		}
		if(psoSO != 0 ){
			cols += '<td id="psoSO" class="fontAmber">'+common.thousandSeparator(psoSO)+'</td>';
		}
		else{
			cols += '<td id="psoSO">'+common.thousandSeparator(psoSO)+'</td>';
		}
		cols += '<td></td>';
		newRow.append(cols);
		tbody.append(newRow);
		/*************************display primary section end***********************/
		
		/*********************Display delegated section start***********************/
		//If Delegated journey agent present
		if(delegatedDeclaredRowObj == 1 || delegatedActualRowObj == 1){
			/***Balance calculation for Delegated Journey***/
				//display delegated totals row only once
				//Journey Balance Summary delegated totals row		
				var newRow = $('<tr class="bgFoam journeyBalanceSummaryDelegatedRow" id="journeyBalanceSummaryDelegatedRow">');
				var cols = "";
				cols += '<td class="textLeft fontBold">Delegated</td>';
				cols += '<td class="textLeft"></td>';
				cols += '<td id="dCash"></td>';	
				cols += '<td id="dCard"></td>';
				cols += '<td id="dCentral"></td>';
				cols += '<td id="dLoans"></td>';
				cols += '<td id="dRaf"></td>';	
				cols += '<td id="dFloat"></td>';
				cols += '<td id="dBanked"></td>';
				cols += '<td id="dSO"></td>';
				cols += '<td id="dAgentSO"></td>';
				newRow.append(cols);
				tbody.append(newRow);
		}
		for(var i=0;i<listItem.length;i++)
		{
			//If Delegated journey agent present
			if(delegatedDeclaredRowObj == 1 || delegatedActualRowObj == 1){
				/***Balance calculation for Delegated Journey***/
				if(listItem[i].isPrimaryUser == false){	//Delegated journey agent
					console.log(i);
					console.log(listItem[i]);
					
					/*if(i==0){	//display delegated totals row only once
						//Journey Balance Summary delegated totals row		
						var newRow = $('<tr class="bgFoam journeyBalanceSummaryDelegatedRow" id="journeyBalanceSummaryDelegatedRow">');
						var cols = "";
						cols += '<td class="textLeft fontBold">Delegated</td>';
						cols += '<td class="textLeft"></td>';
						cols += '<td id="dCash"></td>';	
						cols += '<td id="dCard"></td>';
						cols += '<td id="dCentral"></td>';
						cols += '<td id="dLoans"></td>';
						cols += '<td id="dRaf"></td>';	
						cols += '<td id="dFloat"></td>';
						cols += '<td id="dBanked"></td>';
						cols += '<td id="dSO"></td>';
						cols += '<td id="dAgentSO"></td>';
						newRow.append(cols);
						tbody.append(newRow);
					}*/
					
					if(delegatedDeclaredRowObj == 1){	//delegated declared row present
						if(listItem[i].userId != 0){	//detect delegated declared rows
							
							//Declared variables
							dAgent = $.trim(listItem[i].firstName) + " " + $.trim(listItem[i].lastName);
							dJourneyDesc = listItem[i].journeyDesc;
							ddCash = (parseFloat(ddCash) + parseFloat(common.convertToAmount(listItem[i].declaredCash))).toFixed(2);
							ddLoans = (parseFloat(ddLoans) + parseFloat(common.convertToAmount(listItem[i].declaredLoans))).toFixed(2);
							ddRaf = (parseFloat(ddRaf) + parseFloat(common.convertToAmount(listItem[i].declaredRaf))).toFixed(2);
							ddFloat = (parseFloat(ddFloat) + parseFloat(common.convertToAmount(listItem[i].declaredFloat))).toFixed(2);
							ddBanked = (parseFloat(ddBanked) + parseFloat(common.convertToAmount(listItem[i].declaredCashBanked))).toFixed(2);
							ddSO = (parseFloat(ddSO) + parseFloat(common.convertToAmount(listItem[i].declaredShortsAndOvers))).toFixed(2);
							
							//Journey Balance Summary delegated declared row		
							var newRow = $('<tr class="ddAgentRow" id="ddAgentRow'+i+'">');
							var cols = "";
							if(dJourneyDesc != null && dJourneyDesc != undefined && dJourneyDesc != ""){
								cols += '<td class="textLeft bgChenin">'+dAgent+' ('+dJourneyDesc+')</td>';
							}
							else{
								cols += '<td class="textLeft bgChenin">'+dAgent+'</td>';
							}
							cols += '<td class="textLeft fontBold">Declared</td>';
							cols += '<td id="dd'+i+'Cash">'+common.convertToFormattedAmount(listItem[i].declaredCash)+'</td>';	
							cols += '<td id="dd'+i+'Card"></td>';
							cols += '<td id="dd'+i+'Central"></td>';
							cols += '<td id="dd'+i+'Loans">'+common.convertToFormattedAmount(listItem[i].declaredLoans)+'</td>';
							cols += '<td id="dd'+i+'Raf">'+common.convertToFormattedAmount(listItem[i].declaredRaf)+'</td>';	
							cols += '<td id="dd'+i+'Float">'+common.convertToFormattedAmount(listItem[i].declaredFloat)+'</td>';
							cols += '<td id="dd'+i+'Banked">'+common.convertToFormattedAmount(listItem[i].declaredCashBanked)+'</td>';
							if(common.convertToFormattedAmount(listItem[i].declaredShortsAndOvers) != 0){
								cols += '<td id="dd'+i+'SO" class="fontAmber">'+common.convertToFormattedAmount(listItem[i].declaredShortsAndOvers)+'</td>';
							}
							else{
								cols += '<td id="dd'+i+'SO">'+common.convertToFormattedAmount(listItem[i].declaredShortsAndOvers)+'</td>';
							}
							cols += '<td></td>';
							newRow.append(cols);
							tbody.append(newRow);		
						}
					}
					if(delegatedDeclaredRowObj == 0){	//delegated declared row not present, display it once
						//Journey Balance Summary delegated declared row		
						var newRow = $('<tr class="ddAgentRow" id="ddAgentRow'+i+'">');
						var cols = "";
						cols += '<td class="textLeft bgChenin"></td>';
						cols += '<td class="textLeft fontBold">Declared</td>';
						cols += '<td id="dd'+i+'Cash">'+common.convertToFormattedAmount(listItem[i].declaredCash)+'</td>';	
						cols += '<td id="dd'+i+'Card"></td>';
						cols += '<td id="dd'+i+'Central"></td>';
						cols += '<td id="dd'+i+'Loans">'+common.convertToFormattedAmount(listItem[i].declaredLoans)+'</td>';
						cols += '<td id="dd'+i+'Raf">'+common.convertToFormattedAmount(listItem[i].declaredRaf)+'</td>';	
						cols += '<td id="dd'+i+'Float">'+common.convertToFormattedAmount(listItem[i].declaredFloat)+'</td>';
						cols += '<td id="dd'+i+'Banked">'+common.convertToFormattedAmount(listItem[i].declaredCashBanked)+'</td>';
						if(common.convertToFormattedAmount(listItem[i].declaredShortsAndOvers) != 0){
							cols += '<td id="dd'+i+'SO" class="fontAmber">'+common.convertToFormattedAmount(listItem[i].declaredShortsAndOvers)+'</td>';
						}
						else{
							cols += '<td id="dd'+i+'SO">'+common.convertToFormattedAmount(listItem[i].declaredShortsAndOvers)+'</td>';
						}
						cols += '<td></td>';
						newRow.append(cols);
						tbody.append(newRow);
					}
					if(delegatedActualRowObj == 1){		//if delegated actual row present
						var delegatedActualRow;
						
						if(listItem[i].userId == 0){	//if delegated actual data is present in service, then assign to variables else zero
							
							delegatedActualRowObj = 1;					
							//Actual variables
							daCash = common.convertToFormattedAmount(listItem[i].actualCash);
							daCard = common.convertToFormattedAmount(listItem[i].actualCard);
							daCentral = common.convertToFormattedAmount(listItem[i].actualCentral);
							daLoans = common.convertToFormattedAmount(listItem[i].actualLoans);
							//daRaf = 0;
							daFloat = common.convertToFormattedAmount(listItem[i].actualFloat);
							daBanked = common.convertToFormattedAmount(listItem[i].actualCashBanked);
							//daSO = common.convertToFormattedAmount(listItem[i].actualShortsAndOvers);
							daSO = (parseFloat(common.removeComma(daCash)) - parseFloat(ddRaf)).toFixed(2);
						}	
							
					}
					//Journey Balance Summary delegated actual row
					daSO = (parseFloat(common.removeComma(daCash)) - parseFloat(ddRaf)).toFixed(2);
					delegatedActualRow = $('<tr class="daRow">');
					var cols = "";
					cols += '<td class="textLeft"></td>';
					cols += '<td class="textLeft fontBold">Actual</td>';
					cols += '<td id="daCash">'+daCash+'</td>';	
					cols += '<td id="daCard"></td>';
					cols += '<td id="daCentral"></td>';
					cols += '<td id="daLoans"></td>';
					cols += '<td id="daRaf"></td>';	
					cols += '<td id="daFloat">'+daFloat+'</td>';
					cols += '<td id="daBanked">'+daBanked+'</td>';
					if(daSO != 0){
						cols += '<td id="daSO" class="fontAmber">'+common.convertToFormattedAmount(daSO)+'</td>';
					}
					else{
						cols += '<td id="daSO">'+common.convertToFormattedAmount(daSO)+'</td>';
					}
					cols += '<td></td>';
					delegatedActualRow.append(cols);
					//tbody.append(delegatedActualRow);
				}
				if(i == (listItem.length-1)){	//if there is last item in the list, then print actual and S/O rows
					
					//append delegated actual row
					tbody.append(delegatedActualRow);
					
					//balance summary calculation
					dCash = daCash;
					dCard = daCard;
					dCentral = daCentral;
					dLoans = daLoans;
					dRaf = ddRaf;
					dFloat = daFloat;
					dBanked = ddBanked;
					dAgentSO = (parseFloat(common.removeComma(dCash)) - parseFloat(common.removeComma(dLoans)) - parseFloat(common.removeComma(dRaf)) + parseFloat(common.removeComma(dFloat)) - parseFloat(common.removeComma(dBanked))).toFixed(2);
					daSO = (parseFloat(common.removeComma(dCash)) - parseFloat(common.removeComma(dRaf))).toFixed(2);
					
					//Shorts & Over calculation		
					dsoCash = (parseFloat(common.removeComma(daCash)) - parseFloat(ddCash)).toFixed(2);
					dsoLoans = (parseFloat(ddLoans) - parseFloat(common.removeComma(daLoans))).toFixed(2);
					dsoFloat = (parseFloat(common.removeComma((daFloat)) - parseFloat(ddFloat))).toFixed(2);
					dsoBanked = (parseFloat(ddBanked) - parseFloat(common.removeComma(daBanked))).toFixed(2);
					dsoSO = (parseFloat(daSO) - parseFloat(ddSO)).toFixed(2);
										
					//Journey Balance Summary delegated S/O row		
					var newRow = $('<tr class="dSORow" id="dSORow">');
					var cols = "";
					cols += '<td class="textLeft"></td>';
					cols += '<td class="textLeft fontBold">S/O</td>';
					if(dsoCash != 0){
						cols += '<td id="dsoCash" class="fontAmber">'+common.thousandSeparator(dsoCash)+'</td>';
					}
					else{
						cols += '<td id="dsoCash">'+common.thousandSeparator(dsoCash)+'</td>';
					}
					cols += '<td id="dsoCard"></td>';
					cols += '<td id="dsoCentral"></td>';
					if(dsoLoans != 0){
						cols += '<td id="dsoLoans" class="fontAmber">'+common.thousandSeparator(dsoLoans)+'</td>';
					}
					else{
						cols += '<td id="dsoLoans">'+common.thousandSeparator(dsoLoans)+'</td>';
					}
					cols += '<td id="dsoRaf"></td>';
					if(dsoFloat != 0){
						cols += '<td id="dsoFloat" class="fontAmber">'+common.thousandSeparator(dsoFloat)+'</td>';
					}
					else{
						cols += '<td id="dsoFloat">'+common.thousandSeparator(dsoFloat)+'</td>';
					}
					if(dsoBanked != 0){
						cols += '<td id="dsoBanked" class="fontAmber">'+common.thousandSeparator(dsoBanked)+'</td>';
					}
					else{
						cols += '<td id="dsoBanked">'+common.thousandSeparator(dsoBanked)+'</td>';
					}
					if(dsoSO != 0){
						cols += '<td id="dsoSO" class="fontAmber">'+common.thousandSeparator(dsoSO)+'</td>';
					}
					else{
						cols += '<td id="dsoSO">'+common.thousandSeparator(dsoSO)+'</td>';
					}
					cols += '<td></td>';
					newRow.append(cols);
					tbody.append(newRow);	
					
					//Journey Balance Summary delegated totals row calculated values
					$('td#dCash').text(common.thousandSeparator(dCash));
					$('td#dCard').text();
					$('td#dCentral').text();
					$('td#dLoans').text();
					$('td#dRaf').text(common.thousandSeparator(dRaf));
					$('td#dFloat').text(common.thousandSeparator(dFloat));
					$('td#dBanked').text(common.thousandSeparator(dBanked));
					$('td#dAgentSO').text(common.thousandSeparator(dAgentSO));
					if(dAgentSO != 0){
						$('td#dAgentSO').addClass("fontAmber");
					}
					else{
						if($('td#dAgentSO').hasClass("fontAmber")){
							$('td#dAgentSO').removeClass("fontAmber");
						}
					}
				}
			}
		}
	},
	calcJourneyBalanceTransactionsTotal: function(transactionDetails){
		
		var listItem;
		listItem=JSON.parse(transactionDetails);
		var actualCollectionsTranObj = listItem.actualCollections;
		var actualBankedTranObj = listItem.actualCashBanked;
		var actualFloatsTranObj = listItem.actualFloats;
		var actualLoansTranObj = listItem.actualLoans;
		var declaredBankedTranObj = listItem.declaredCashBanked;
		var declaredCollectionsTranObj = listItem.declaredCollections;
		var declaredFloatsTranObj = listItem.declaredFloats;
		var declaredLoansTranObj = listItem.declaredLoans;
		var declaredRafTranObj = listItem.declaredRaf;
		var maxLength = 0;
		
		/***Total Received Calculation***/
		//declared collections
		if(declaredCollectionsTranObj.length > 0){
			for(var i=0; i<declaredCollectionsTranObj.length; i++){
				declaredTotalCollAmt = (parseFloat(declaredTotalCollAmt) + parseFloat(common.convertToAmount(declaredCollectionsTranObj[i].amount))).toFixed(2);
			}
		}
		//actual collections
		if(actualCollectionsTranObj.length > 0){
			for(var i=0; i<actualCollectionsTranObj.length; i++){
				actualTotalCollAmt = (parseFloat(actualTotalCollAmt) + parseFloat(common.convertToAmount(actualCollectionsTranObj[i].amount))).toFixed(2);
			}
		}
		//declared float
		if(declaredFloatsTranObj.length > 0){
			for(var i=0; i<declaredFloatsTranObj.length; i++){
				declaredTotalFloatAmt = (parseFloat(declaredTotalFloatAmt) + parseFloat(common.convertToAmount(declaredFloatsTranObj[i].amount))).toFixed(2);
			}
		}
		//actual float
		if(actualFloatsTranObj.length > 0){
			for(var i=0; i<actualFloatsTranObj.length; i++){
				actualTotalFloatAmt = (parseFloat(actualTotalFloatAmt) + parseFloat(common.convertToAmount(actualFloatsTranObj[i].amount))).toFixed(2);
			}
		}
		
		/***Total Received Calculation***/
		//declared loans
		if(declaredLoansTranObj.length > 0){
			for(var i=0; i<declaredLoansTranObj.length; i++){
				declaredTotalLoansAmt = (parseFloat(declaredTotalLoansAmt) + parseFloat(common.convertToAmount(declaredLoansTranObj[i].amount))).toFixed(2);
			}
		}
		//actual loans
		if(actualLoansTranObj.length > 0){
			for(var i=0; i<actualLoansTranObj.length; i++){
				actualTotalLoansAmt = (parseFloat(actualTotalLoansAmt) + parseFloat(common.convertToAmount(actualLoansTranObj[i].amount))).toFixed(2);
			}
		}
		//declared banked
		if(declaredBankedTranObj.length > 0){
			for(var i=0; i<declaredBankedTranObj.length; i++){
				declaredTotalBankedAmt = (parseFloat(declaredTotalBankedAmt) + parseFloat(common.convertToAmount(declaredBankedTranObj[i].amount))).toFixed(2);
			}
		}
		//actual banked
		if(actualBankedTranObj.length > 0){
			for(var i=0; i<actualBankedTranObj.length; i++){
				actualTotalBankedAmt = (parseFloat(actualTotalBankedAmt) + parseFloat(common.convertToAmount(actualBankedTranObj[i].amount))).toFixed(2);
			}
		}
		//declared raf
		if(declaredRafTranObj.length > 0){
			for(var i=0; i<declaredRafTranObj.length; i++){
				declaredTotalRafAmt = (parseFloat(declaredTotalRafAmt) + parseFloat(common.convertToAmount(declaredRafTranObj[i].amount))).toFixed(2);
			}
		}
		
		/***Total Received Display Start***/
		//collections
		if(declaredCollectionsTranObj.length > 0 || actualCollectionsTranObj.length > 0){
			//determine the maximum of actual and declred row longth
			var maxLength = (declaredCollectionsTranObj.length > actualCollectionsTranObj.length) ? declaredCollectionsTranObj.length : actualCollectionsTranObj.length;
			
			//create thead and table header row
			var table = $('#totalRecvTableColl');
			table.empty();
			
			var thead = $('<thead class="bgBeige">');
			var newRow = $('<tr>');
			var cols = "";
			cols += '<th class="textLeft fontNormal">Date</th>';
			cols += '<th class="textLeft fontNormal">Agent</th>';
			cols += '<th class="textLeft fontNormal">Reference</th>';
			cols += '<th class="textRight fontNormal">Amount(&pound;)</th>';
			cols += '<th class="textRight fontNormal">Amount(&pound;)</th>';
			cols += '<th class="textLeft fontNormal">Reference</th>';
			cols += '<th class="textLeft fontNormal">Agent</th>';
			cols += '<th class="textLeft fontNormal">Date</th>';
			newRow.append(cols);
			thead.append(newRow);
			table.append(thead);
			
			//create tbody
			var tbody = $('<tbody class="" id="totalRecvTableCollTbody">');
			tbody.empty();
			
			//build the rows from max of declared & actual object length
			for(var i=0;i<maxLength;i++)
			{
				var newRow = $('<tr class="collectionsRow displayFlex" id="collectionsRow'+i+'">');
				var cols = "";
				cols += '<td class="textLeft" id="declaredCollDate'+i+'"></td>';
				cols += '<td class="textLeft" id="declaredCollAgent'+i+'"></td>';
				cols += '<td class="textLeft" id="declaredCollRef'+i+'"></td>';
				cols += '<td class="borderRight dCollections" id="declaredCollAmt'+i+'"></td>';
				cols += '<td class="textRight aCollections" id="actualCollAmt'+i+'"></td>';
				cols += '<td class="textLeft" id="actualCollRef'+i+'"></td>';
				cols += '<td class="textLeft" id="actualCollAgent'+i+'"></td>';
				cols += '<td class="textLeft" id="actualCollDate'+i+'"></td>';
				newRow.append(cols);
				tbody.append(newRow);
			}
			table.append(tbody);
			
			//put the values in the appropriate declared rows
			for(var i=0; i<declaredCollectionsTranObj.length; i++){
				var declaredDate = moment(declaredCollectionsTranObj[i].balanceDate).format("DD/MM/YYYY");
				var declaredAgentName = $.trim(declaredCollectionsTranObj[i].firstName) + " " + $.trim(declaredCollectionsTranObj[i].lastName);
				var declaredAmt = common.convertToFormattedAmount(declaredCollectionsTranObj[i].amount);
				
				$("td#declaredCollDate"+i).text(declaredDate);
				$("td#declaredCollAgent"+i).text(declaredAgentName);
				$("td#declaredCollRef"+i).text(declaredCollectionsTranObj[i].reference);
				$("td#declaredCollAmt"+i).text(declaredAmt);
			}
			//put the values in the appropriate actual rows
			for(var i=0; i<actualCollectionsTranObj.length; i++){
				var actualDate = moment(actualCollectionsTranObj[i].balanceDate).format("DD/MM/YYYY");
				var actualAgentName = $.trim(actualCollectionsTranObj[i].firstName) + " " + $.trim(actualCollectionsTranObj[i].lastName);
				var actualAmt = common.convertToFormattedAmount(actualCollectionsTranObj[i].amount);
				
				$("td#actualCollDate"+i).text(actualDate);
				$("td#actualCollAgent"+i).text(actualAgentName);
				$("td#actualCollRef"+i).text(actualCollectionsTranObj[i].reference);
				$("td#actualCollAmt"+i).text(actualAmt);
			}
			/*//set max height of row
			for(var i=0;i<maxLength;i++)
			{
				var max=0;
				$('tr#collectionsRow'+i+' td').each(function() {
				    max = Math.max($(this).height(), max);
				}).height(max);
				console.log(max);
				
				$('tr#collectionsRow'+i+' td').each(function() {
				    $(this).height(max);
				});
			}*/
		}
		//float
		if(declaredFloatsTranObj.length > 0 || actualFloatsTranObj.length > 0){
			//determine the maximum of actual and declred row longth
			var maxLength = (declaredFloatsTranObj.length > actualFloatsTranObj.length) ? declaredFloatsTranObj.length : actualFloatsTranObj.length;
			
			//create thead and table header row
			var table = $('#totalRecvTableFloat');
			table.empty();
			
			var thead = $('<thead class="bgBeige">');
			var newRow = $('<tr>');
			var cols = "";
			cols += '<th class="textLeft fontNormal">Date</th>';
			cols += '<th class="textLeft fontNormal">Agent</th>';
			cols += '<th class="textLeft fontNormal">Reference</th>';
			cols += '<th class="textRight fontNormal">Amount(&pound;)</th>';
			cols += '<th class="textRight fontNormal">Amount(&pound;)</th>';
			cols += '<th class="textLeft fontNormal">Reference</th>';
			cols += '<th class="textLeft fontNormal">Agent</th>';
			cols += '<th class="textLeft fontNormal">Date</th>';
			newRow.append(cols);
			thead.append(newRow);
			table.append(thead);
			
			//create tbody
			var tbody = $('<tbody class="" id="totalRecvTableFloatTbody">');
			tbody.empty();
			
			//build the rows from max of declared & actual object length
			for(var i=0;i<maxLength;i++)
			{
				var newRow = $('<tr class="floatRow displayFlex" id="floatRow'+i+'">');
				var cols = "";
				cols += '<td class="textLeft" id="declaredFloatDate'+i+'"></td>';
				cols += '<td class="textLeft" id="declaredFloatAgent'+i+'"></td>';
				cols += '<td class="textLeft" id="declaredFloatRef'+i+'"></td>';
				cols += '<td class="borderRight dFloat" id="declaredFloatAmt'+i+'"></td>';
				cols += '<td class="textRight aFloat" id="actualFloatAmt'+i+'"></td>';
				cols += '<td class="textLeft" id="actualFloatRef'+i+'"></td>';
				cols += '<td class="textLeft" id="actualFloatAgent'+i+'"></td>';
				cols += '<td class="textLeft" id="actualFloatDate'+i+'"></td>';
				newRow.append(cols);
				tbody.append(newRow);
			}
			table.append(tbody);
			
			//put the values in the appropriate declared rows
			for(var i=0; i<declaredFloatsTranObj.length; i++){
				var declaredDate = moment(declaredFloatsTranObj[i].balanceDate).format("DD/MM/YYYY");
				var declaredAgentName = $.trim(declaredFloatsTranObj[i].firstName) + " " + $.trim(declaredFloatsTranObj[i].lastName);
				var declaredAmt = common.convertToFormattedAmount(declaredFloatsTranObj[i].amount);
				
				$("td#declaredFloatDate"+i).text(declaredDate);
				$("td#declaredFloatAgent"+i).text(declaredAgentName);
				$("td#declaredFloatRef"+i).text(declaredFloatsTranObj[i].reference);
				$("td#declaredFloatAmt"+i).text(declaredAmt);
			}
			//put the values in the appropriate actual rows
			for(var i=0; i<actualFloatsTranObj.length; i++){
				var actualDate = moment(actualFloatsTranObj[i].balanceDate).format("DD/MM/YYYY");
				var actualAgentName = $.trim(actualFloatsTranObj[i].firstName) + " " + $.trim(actualFloatsTranObj[i].lastName);
				var actualAmt = common.convertToFormattedAmount(actualFloatsTranObj[i].amount);
				
				$("td#actualFloatDate"+i).text(actualDate);
				$("td#actualFloatAgent"+i).text(actualAgentName);
				$("td#actualFloatRef"+i).text(actualFloatsTranObj[i].reference);
				$("td#actualFloatAmt"+i).text(actualAmt);
			}
			/*//set max height of row
			for(var i=0;i<maxLength;i++)
			{
				var max=0;
				$('tr#floatRow'+i+' td').each(function() {
				    max = Math.max($(this).height(), max);
				}).height(max);
				console.log(max);
				
				$('tr#floatRow'+i+' td').each(function() {
				    $(this).height(max);
				});
			}*/
		}
		/***Total Received Display End***/
		
		/***Total Paid Out Display Start***/
		//loans
		if(declaredLoansTranObj.length > 0 || actualLoansTranObj.length > 0){
			//determine the maximum of actual and declred row longth
			var maxLength = (declaredLoansTranObj.length > actualLoansTranObj.length) ? declaredLoansTranObj.length : actualLoansTranObj.length;
			
			//create thead and table header row
			var table = $('#totalPaidOutTableLoans');
			table.empty();
			
			var thead = $('<thead class="bgBeige">');
			var newRow = $('<tr>');
			var cols = "";
			cols += '<th class="textLeft fontNormal">Date</th>';
			cols += '<th class="textLeft fontNormal">Agent</th>';
			cols += '<th class="textLeft fontNormal">Customer</th>';
			cols += '<th class="textRight fontNormal">Amount(&pound;)</th>';
			cols += '<th class="textRight fontNormal">Amount(&pound;)</th>';
			cols += '<th class="textLeft fontNormal">Customer</th>';
			cols += '<th class="textLeft fontNormal">Agent</th>';
			cols += '<th class="textLeft fontNormal">Date</th>';
			newRow.append(cols);
			thead.append(newRow);
			table.append(thead);
			
			//create tbody
			var tbody = $('<tbody class="" id="totalPaidOutTableLoansTbody">');
			tbody.empty();
			
			//build the rows from max of declared & actual object length
			for(var i=0;i<maxLength;i++)
			{
				var newRow = $('<tr class="loansRow displayFlex" id="loansRow'+i+'">');
				var cols = "";
				cols += '<td class="textLeft" id="declaredLoansDate'+i+'"></td>';
				cols += '<td class="textLeft" id="declaredLoansAgent'+i+'"></td>';
				cols += '<td class="textLeft" id="declaredLoansCust'+i+'"></td>';
				cols += '<td class="borderRight dLoans" id="declaredLoansAmt'+i+'"></td>';
				cols += '<td class="textRight aLoans" id="actualLoansAmt'+i+'"></td>';
				cols += '<td class="textLeft" id="actualLoansCust'+i+'"></td>';
				cols += '<td class="textLeft" id="actualLoansAgent'+i+'"></td>';
				cols += '<td class="textLeft" id="actualLoansDate'+i+'"></td>';
				newRow.append(cols);
				tbody.append(newRow);
			}
			table.append(tbody);
			
			//put the values in the appropriate declared rows
			for(var i=0; i<declaredLoansTranObj.length; i++){
				var declaredDate = moment(declaredLoansTranObj[i].balanceDate).format("DD/MM/YYYY");
				var declaredAgentName = $.trim(declaredLoansTranObj[i].firstName) + " " + $.trim(declaredLoansTranObj[i].lastName);
				var declaredAmt = common.convertToFormattedAmount(declaredLoansTranObj[i].amount);
				
				$("td#declaredLoansDate"+i).text(declaredDate);
				$("td#declaredLoansAgent"+i).text(declaredAgentName);
				$("td#declaredLoansCust"+i).text(declaredLoansTranObj[i].reference);
				$("td#declaredLoansAmt"+i).text(declaredAmt);
			}
			//put the values in the appropriate actual rows
			for(var i=0; i<actualLoansTranObj.length; i++){
				var actualDate = moment(actualLoansTranObj[i].balanceDate).format("DD/MM/YYYY");
				var actualAgentName = $.trim(actualLoansTranObj[i].firstName) + " " + $.trim(actualLoansTranObj[i].lastName);
				var actualAmt = common.convertToFormattedAmount(actualLoansTranObj[i].amount);
				
				$("td#actualLoansDate"+i).text(actualDate);
				$("td#actualLoansAgent"+i).text(actualAgentName);
				$("td#actualLoansCust"+i).text(actualLoansTranObj[i].reference);
				$("td#actualLoansAmt"+i).text(actualAmt);
			}
			/*//set max height of row
			for(var i=0;i<maxLength;i++)
			{
				var max=0;
				$('tr#loansRow'+i+' td').each(function() {
				    max = Math.max($(this).height(), max);
				}).height(max);
				console.log(max);
				
				$('tr#loansRow'+i+' td').each(function() {
				    $(this).height(max);
				});
			}*/
		}
		//banked
		if(declaredBankedTranObj.length > 0 || actualBankedTranObj.length > 0){
			//determine the maximum of actual and declred row longth
			var maxLength = (declaredBankedTranObj.length > actualBankedTranObj.length) ? declaredBankedTranObj.length : actualBankedTranObj.length;
			
			//create thead and table header row
			var table = $('#totalPaidOutTableBanked');
			table.empty();
			
			var thead = $('<thead class="bgBeige">');
			var newRow = $('<tr>');
			var cols = "";
			cols += '<th class="textLeft fontNormal">Date</th>';
			cols += '<th class="textLeft fontNormal">Agent</th>';
			cols += '<th class="textLeft fontNormal">Chq</th>';
			cols += '<th class="textLeft fontNormal">Reference</th>';
			cols += '<th class="textRight fontNormal">Amount(&pound;)</th>';
			cols += '<th class="textRight fontNormal">Amount(&pound;)</th>';
			cols += '<th class="textLeft fontNormal">Reference</th>';
			cols += '<th class="textLeft fontNormal">Chq</th>';
			cols += '<th class="textLeft fontNormal">Agent</th>';
			cols += '<th class="textLeft fontNormal">Date</th>';
			newRow.append(cols);
			thead.append(newRow);
			table.append(thead);
			
			//create tbody
			var tbody = $('<tbody class="" id="totalPaidOutTableBankedTbody">');
			tbody.empty();
			
			//build the rows from max of declared & actual object length
			for(var i=0;i<maxLength;i++)
			{
				var newRow = $('<tr class="bankedRow displayFlex" id="bankedRow'+i+'">');
				var cols = "";
				cols += '<td class="textLeft" id="declaredBankedDate'+i+'"></td>';
				cols += '<td class="textLeft" id="declaredBankedAgent'+i+'"></td>';
				cols += '<td class="textLeft" id="declaredBankedChq'+i+'"></td>';
				cols += '<td class="textLeft" id="declaredBankedRef'+i+'"></td>';
				cols += '<td class="borderRight dBanked" id="declaredBankedAmt'+i+'"></td>';
				cols += '<td class="textRight aBanked" id="actualBankedAmt'+i+'"></td>';
				cols += '<td class="textLeft" id="actualBankedRef'+i+'"></td>';
				cols += '<td class="textLeft" id="actualBankedChq'+i+'"></td>';
				cols += '<td class="textLeft" id="actualBankedAgent'+i+'"></td>';
				cols += '<td class="textLeft" id="actualBankedDate'+i+'"></td>';
				newRow.append(cols);
				tbody.append(newRow);
			}
			table.append(tbody);
			
			//put the values in the appropriate declared rows
			for(var i=0; i<declaredBankedTranObj.length; i++){
				var declaredDate = moment(declaredBankedTranObj[i].balanceDate).format("DD/MM/YYYY");
				var declaredAgentName = $.trim(declaredBankedTranObj[i].firstName) + " " + $.trim(declaredBankedTranObj[i].lastName);
				var declaredAmt = common.convertToFormattedAmount(declaredBankedTranObj[i].amount);
				var declaredChq = (declaredBankedTranObj[i].chequeIndicator == false) ? "N" : "Y";
				
				$("td#declaredBankedDate"+i).text(declaredDate);
				$("td#declaredBankedAgent"+i).text(declaredAgentName);
				$("td#declaredBankedChq"+i).text(declaredChq);
				$("td#declaredBankedRef"+i).text(declaredBankedTranObj[i].reference);
				$("td#declaredBankedAmt"+i).text(declaredAmt);
			}
			//put the values in the appropriate actual rows
			for(var i=0; i<actualBankedTranObj.length; i++){
				var actualDate = moment(actualBankedTranObj[i].balanceDate).format("DD/MM/YYYY");
				var actualAgentName = $.trim(actualBankedTranObj[i].firstName) + " " + $.trim(actualBankedTranObj[i].lastName);
				var actualAmt = common.convertToFormattedAmount(actualBankedTranObj[i].amount);
				var actualChq = (actualBankedTranObj[i].chequeIndicator == false) ? "N" : "Y";
				
				$("td#actualBankedDate"+i).text(actualDate);
				$("td#actualBankedAgent"+i).text(actualAgentName);
				$("td#actualBankedChq"+i).text(actualChq);
				$("td#actualBankedRef"+i).text(actualBankedTranObj[i].reference);
				$("td#actualBankedAmt"+i).text(actualAmt);
			}
			/*//set max height of row
			for(var i=0;i<maxLength;i++)
			{
				var max=0;
				$('tr#bankedRow'+i+' td').each(function() {
				    max = Math.max($(this).height(), max);
				}).height(max);
				console.log(max);
				
				$('tr#bankedRow'+i+' td').each(function() {
				    $(this).height(max);
				});
			}*/
		}
		//raf
		if(declaredRafTranObj.length > 0){
			
			//create thead and table header row
			var table = $('#totalPaidOutTableRaf');
			table.empty();
			
			var thead = $('<thead class="bgBeige">');
			var newRow = $('<tr>');
			var cols = "";
			cols += '<th class="textLeft fontNormal">Date</th>';
			cols += '<th class="textLeft fontNormal">Agent</th>';
			cols += '<th class="textLeft fontNormal">Reference</th>';
			cols += '<th class="textRight fontNormal">Amount(&pound;)</th>';
			newRow.append(cols);
			thead.append(newRow);
			table.append(thead);
			
			//create tbody
			var tbody = $('<tbody class="" id="totalPaidOutTableRafTbody">');
			tbody.empty();
			
			//build the rows of declared object length & put the values
			for(var i=0;i<declaredRafTranObj.length;i++)
			{
				var declaredDate = moment(declaredRafTranObj[i].balanceDate).format("DD/MM/YYYY");
				var declaredAgentName = $.trim(declaredRafTranObj[i].firstName) + " " + $.trim(declaredRafTranObj[i].lastName);
				var declaredAmt = common.convertToFormattedAmount(declaredRafTranObj[i].amount);
				
				var newRow = $('<tr class="rafRow displayFlex" id="rafRow'+i+'">');
				var cols = "";
				cols += '<td class="textLeft" id="declaredRafDate'+i+'">'+declaredDate+'</td>';
				cols += '<td class="textLeft" id="declaredRafAgent'+i+'">'+declaredAgentName+'</td>';
				cols += '<td class="textLeft" id="declaredRafRef'+i+'">'+declaredRafTranObj[i].reference+'</td>';
				cols += '<td class="borderRight dRaf" id="declaredRafAmt'+i+'">'+declaredAmt+'</td>';
				newRow.append(cols);
				tbody.append(newRow);
			
			}
			table.append(tbody);
			/*//set max height of row
			for(var i=0;i<declaredRafTranObj.length;i++)
			{
				var max=0;
				$('tr#rafRow'+i+' td').each(function() {
				    max = Math.max($(this).height(), max);
				}).height(max);
				console.log(max);
				
				$('tr#rafRow'+i+' td').each(function() {
				    $(this).height(max);
				});
			}*/
		}
		/***Total Paid Out Display End***/
		
		//sum of declared & actual total received
		declaredTotalRecvAmt = (parseFloat(declaredTotalCollAmt) + parseFloat(declaredTotalFloatAmt)).toFixed(2);
		actualTotalRecvAmt = (parseFloat(actualTotalCollAmt) + parseFloat(actualTotalFloatAmt)).toFixed(2);
		
		//sum of declared & actual total paid out
		declaredTotalPaidOutAmt = (parseFloat(declaredTotalLoansAmt) + parseFloat(declaredTotalBankedAmt) + parseFloat(declaredTotalRafAmt)).toFixed(2);
		actualTotalPaidOutAmt = (parseFloat(actualTotalLoansAmt) + parseFloat(actualTotalBankedAmt) + parseFloat(declaredTotalRafAmt)).toFixed(2);
		
		//call rendering function for journey balance transaction details
		journeyBalance.renderJourneyBalanceTransactions(declaredTotalCollAmt,declaredTotalFloatAmt,actualTotalCollAmt,actualTotalFloatAmt,declaredTotalRecvAmt,actualTotalRecvAmt,declaredTotalLoansAmt,declaredTotalBankedAmt,declaredTotalRafAmt,actualTotalLoansAmt,actualTotalBankedAmt,declaredTotalRafAmt,declaredTotalPaidOutAmt,actualTotalPaidOutAmt);
	},
	renderJourneyBalanceTransactions: function(declaredTotalCollAmt,declaredTotalFloatAmt,actualTotalCollAmt,actualTotalFloatAmt,declaredTotalRecvAmt,actualTotalRecvAmt,declaredTotalLoansAmt,declaredTotalBankedAmt,declaredTotalRafAmt,actualTotalLoansAmt,actualTotalBankedAmt,declaredTotalRafAmt,declaredTotalPaidOutAmt,actualTotalPaidOutAmt){
		
		//total recieved
		$('#declaredTotalCollAmt').text(common.thousandSeparator(declaredTotalCollAmt));
		$('#actualTotalCollAmt').text(common.thousandSeparator(actualTotalCollAmt));
		$('#declaredTotalFloatAmt').text(common.thousandSeparator(declaredTotalFloatAmt));
		$('#actualTotalFloatAmt').text(common.thousandSeparator(actualTotalFloatAmt));
		$('#declaredTotalRecvAmt').text(common.thousandSeparator(declaredTotalRecvAmt));
		$('#actualTotalRecvAmt').text(common.thousandSeparator(actualTotalRecvAmt));
		
		
		//total paid out
		$('#declaredTotalLoansAmt').text(common.thousandSeparator(declaredTotalLoansAmt));
		$('#actualTotalLoansAmt').text(common.thousandSeparator(actualTotalLoansAmt));
		$('#declaredTotalBankedAmt').text(common.thousandSeparator(declaredTotalBankedAmt));
		$('#actualTotalBankedAmt').text(common.thousandSeparator(actualTotalBankedAmt));
		$('#declaredTotalRafAmt').text(common.thousandSeparator(declaredTotalRafAmt));
		$('#declaredTotalPaidOutAmt').text(common.thousandSeparator(declaredTotalPaidOutAmt));
		$('#actualTotalPaidOutAmt').text(common.thousandSeparator(actualTotalPaidOutAmt));
		
	},
	renderPullData: function(data){
		
		console.log(data);
		//journey balance summary
		var agentList = data.journeyReportData;
		console.log("Retrieved journey balance summary data length "+agentList.length);
		journeyBalance.calculateJourneyBalanceSummary(JSON.stringify(agentList));	
		
		//journey balance transaction details
		var transactionDetails = data.journeyBalanceReportDetails;
		journeyBalance.calcJourneyBalanceTransactionsTotal(JSON.stringify(transactionDetails));	
		
	}	
}

/***************************************actions to perform on document ready************************************************/
$(document).on('ready',function(){
	
	//call the journey balance Report service to get the data
	service.getJourneyBalanceData(journeyBalanceVar.selectedJourney,weekNo,yearNo,function(data){
		journeyBalance.renderPullData(data);
	});
	//render journey balance report journey information
	journeyBalance.renderJourneyInfo();
});





