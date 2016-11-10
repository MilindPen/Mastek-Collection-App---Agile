var previousAgreementNumber;
var weeklyTermAmt;

var selectedCustLoanDetails = {
    /***************************************retrieving the customer loan details from offline DB************************************************/
    getCustLoanDetailFromOfflineDB: function(agreementNum){
        
        var dbObj = dataStorage.initializeDB();
        var selectedCustomerFolioParam = [agreementNum]; //[dataStorage.getData(SELECTED_AGREEMENT_NUM)];
        
        //execute SQL query
        dbObj.transaction(function(tx) {
            tx.executeSql(dbQueries.selectedCustLoanDetailStatement,selectedCustomerFolioParam,function(tx,res){
                var len = res.rows.length;
                if(len==0){
		      console.log(len);      
                }
                if(len > 0) {
	            //console.log(JSON.stringify(res));
                    //alert(JSON.stringify(res));
                    selectedCustLoanDetails.renderSelectedCustDetails(JSON.stringify(res.rows.item(0)));
                }

            });
        });
    },
    /***************************************rendering the retrieved customer loan details************************************************/
    renderSelectedCustDetails: function(res){
        var listItem=[];
        listItem=JSON.parse(res);
		console.log(listItem.AgreementID);
		dataStorage.setData('AGREEMENT_ID',listItem.AgreementID);
		
        var loanAmount;
		var totalAmountPayable;
        var agreementDate;
		var outstandingBalance;
		var esb;
		var arrears;
		
		loanAmount = common.convertToAmount(listItem.Principal);
		totalAmountPayable = common.convertToAmount(listItem.TAP);
		weeklyTermAmt= common.convertToAmount(listItem.Terms);
        outstandingBalance = common.convertToAmount(listItem.Balance);
		esb = common.convertToAmount(listItem.SettlementAmount);
		var arrearsVal = common.convertToAmount(listItem.Arrears);
		
		// arrears - checking for negative value
        if(arrearsVal < 0){
            arrears = Math.abs(arrearsVal).toFixed(2)+" Cr";
        }
        else{
            arrears = arrearsVal;
        }
        
		if(listItem.AgreementStartDate != "" && listItem.AgreementStartDate != null && listItem.AgreementStartDate != undefined){
        	var temp = (listItem.AgreementStartDate).split(" ")[0].split("-");
        	agreementDate = temp[2]+'/'+temp[1]+'/'+temp[0];
        }
        else{
		  agreementDate = "";
        }
		
		previousAgreementNumber = listItem.PreviousAgreementNumber;
		
		
        //rendering the customer loan details on the page
        $('ul.cust').append('<li id="cust_name" class="cust ui-li-static ui-body-inherit ui-first-child ui-last-child"><div class="cust-header"><span class="fullName">'+dataStorage.getData(SELECTED_CUSTOMER_NAME)+'</span></div></li>');
		$('ul.cust').append('<li id="folio_number" class="ui-li-border ui-li-static ui-body-inherit ui-first-child ui-last-child ui-li-highlighted">Folio Number<span class="ui-li-aside"><strong>'+listItem.AgreementNumber+'</strong></span></li>');
		$('ul.cust').append('<li id="agreement_date" class="ui-li-border ui-li-static ui-body-inherit ui-first-child ui-last-child">Agreement Date<span class="ui-li-aside"><strong>'+agreementDate+'</strong></span></li>');
		$('ul.cust').append('<li id="loan_amt" class="ui-li-border ui-li-static ui-body-inherit ui-first-child ui-last-child">Loan Amount<span class="ui-li-aside"><strong>&pound;'+loanAmount+'</strong></span></li>');
		$('ul.cust').append('<li id="tot_pay_amt" class="ui-li-border ui-li-static ui-body-inherit ui-first-child ui-last-child">Total Amount Payable<span class="ui-li-aside"><strong>&pound;'+totalAmountPayable+'</strong></span></li>');
		$('ul.cust').append('<li id="term" class="ui-li-border ui-li-static ui-body-inherit ui-first-child ui-last-child">Term(weeks)<span class="ui-li-aside"><strong>'+listItem.Instalments+'</strong></span></li>');
		$('ul.cust').append('<li id="weekly_term" class="ui-li-border ui-li-static ui-body-inherit ui-first-child ui-last-child">Weekly Term Amount<span class="ui-li-aside"><strong>&pound;'+weeklyTermAmt+'</strong></span></li>');
		$('ul.cust').append('<li id="balance" class="LoanDetailsBorder ui-li-static ui-body-inherit ui-first-child ui-last-child">Outstanding Balance<span class="ui-li-aside"><strong>&pound;'+outstandingBalance+'</strong></span></li>');
		$('ul.cust').append('<li id="elapsed_week" class="ui-li-border ui-li-static ui-body-inherit ui-first-child ui-last-child">Elapsed Weeks<span class="ui-li-aside"><strong>'+listItem.ElapsedWeeks+'</strong></span></li>');
		$('ul.cust').append('<li id="esb" class="ui-li-border ui-li-static ui-body-inherit ui-first-child ui-last-child">ESB<span class="ui-li-aside"><strong>&pound;'+esb+'</strong></span></li>');
		$('ul.cust').append('<li id="arrears" class="ui-li-border ui-li-static ui-body-inherit ui-first-child ui-last-child">Arrears<span class="ui-li-aside"><strong>&pound;'+arrears+'</strong></span></li>');
		
		if(previousAgreementNumber != "" && previousAgreementNumber != null && previousAgreementNumber != undefined){
			$('ul.cust').append('<li id="previous_folio" class="ui-li-border ui-li-static ui-body-inherit ui-first-child ui-last-child">Previous Folio Number <a href="#" onclick=selectedCustLoanDetails.showPreviousFolio("'+previousAgreementNumber+'")>'+previousAgreementNumber+'</a></li>');
		}
		$('ul.cust').append('<li id="transactionHistory" class="ui-li-border ui-li-static ui-body-inherit ui-first-child ui-last-child"><a href="#" onclick=selectedCustLoanDetails.showTransactionHistory('+previousAgreementNumber+','+weeklyTermAmt+')>Last 13 weeks transactions</a></li>');        
    },
	
	/***************************************Convert Amount to float and fixed 2 decimal************************************************/
    showTransactionHistory: function(previousAgreementNo,weeklyTrmAmt){
        dataStorage.setData('PREVIOUS_AGREEMENT_NUM',previousAgreementNo);
		dataStorage.setData('WEEKLY_TERM_AMOUNT',weeklyTrmAmt);
        
		common.redirect('transactionHistory.html');
    },
	
	showPreviousFolio: function(folioNumber){
       // $('ul.cust').empty();
        var agreementNum = dataStorage.setData(SELECTED_AGREEMENT_NUM,folioNumber);
		//selectedCustLoanDetails.getCustLoanDetailFromOfflineDB(agreementNum);
		common.redirect('loanDetails.html');
    }

};

$(document).ready(function(){
	  document.addEventListener("deviceready", onDeviceReady, false);
	});

function onDeviceReady() {
	console.log(navigator.notification);
}