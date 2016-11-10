var myPageScroll;
var divWidth;
var tr1Width,tr2Width,tr3Width;
var selectedUserId = dataStorage.getData(USER_ID);

var selectedCustLoanTransactionHistory = {
    /***************************************retrieving the customer loan details from offline DB************************************************/
    getCustLoanTransactionHistoryFromOfflineDB: function(agreementNum){
        
        var dbObj = dataStorage.initializeDB();
        var selectedCustomerFolioParam = [agreementNum]; //[dataStorage.getData(SELECTED_AGREEMENT_NUM)];
        
        //execute SQL query
        dbObj.transaction(function(tx) {
            tx.executeSql(dbQueries.selectTransactionHistoryStatement,selectedCustomerFolioParam,function(tx,res){
                var len = res.rows.length;
                if(len==0){
		      console.log(len);  
				//selectedCustLoanTransactionHistory.renderSelectedCustTransHistory(0);			  
                }
				selectedCustLoanTransactionHistory.renderSelectedCustSummary();
                if(len > 0) {
	            //console.log(JSON.stringify(res));
                    //alert(JSON.stringify(res));
					
					for(var i =0;i<len;i++)
					{
						selectedCustLoanTransactionHistory.renderSelectedCustTransHistory(i,JSON.stringify(res.rows.item(i)));
					//selectedCustLoanTransactionHistory.renderSelectedCustTransHistory(res.rows);
					}
                          //alert(divWidth);
                          //divWidth = divWidth+"px";
						  
						  //alert($("#header").height());
						  //alert($(".cust").height());
                          //alert($(".customheader").height());
						  
						  //alert($("#header").height()+$(".cust").height()+$(".customheader").height());
						  $("#header").css('width',divWidth);
						  $(".th1").css('width',tr1Width);
						  $(".th2").css('width',tr2Width);
						  $(".th3").css('width',tr3Width);
						  
                }
				else{
				$(".table-data").hide();
				$("#header-data").hide();
				$("ul.cust").append("<li class='ui-li-border cust ui-li-static ui-body-inherit' id=noList>");
				$("#noList").append('<span class="noList">No transaction history exists for the loan</span></li>');
				common.setHeight('ul.cust');
				//$(".table-data").append('<span class="noList">No Transaction History To Show</span>');
				}

            });
        });
    },
    /***************************************rendering the retrieved customer loan details************************************************/
    renderSelectedCustTransHistory: function(i,res){
        var listItem;
        listItem=JSON.parse(res);
		console.log(res);
		
		 var paymentDate,paymentTime;
			 
			 if(listItem.PaidDate != "" && listItem.PaidDate != null && listItem.PaidDate != undefined){
				var temp = (listItem.PaidDate).split(" ")[0].split("-");
				paymentDate = temp[2]+'/'+temp[1]+'/'+temp[0].toString().substr(2,2);
				
				var tempTime = (listItem.PaidDate).split(" ")[1].split(":");
				paymentTime = '('+tempTime[0]+':'+tempTime[1]+')';
				
				}
				else{
				  paymentDate = "";
				  paymentTime = "";
				}
				console.log("Week Number"+listItem.WeekNumber);
				console.log(selectedCustLoanTransactionHistory.isEven(listItem.WeekNumber));
				var even = selectedCustLoanTransactionHistory.isEven(listItem.WeekNumber);
				
				var ActualAmount = common.convertToAmount(listItem.ActualAmount);
				var arrears;
				var Amount;
				var arrearsCr;
				var amountCr;
				
				// arrears - checking for negative value
				if(common.convertToAmount(listItem.Arrears) < 0){
					//arrears = parseFloat(Math.abs(common.convertToAmount(listItem.Arrears))).toFixed(2)+" Cr";
					arrears = parseFloat(Math.abs(common.convertToAmount(listItem.Arrears))).toFixed(2);
					arrearsCr = "Cr";
				}
				else{
					arrears = common.convertToAmount(listItem.Arrears);
					arrearsCr = "";
				}	
				
				// Amount - checking for negative value
				if(ActualAmount < 0){
					//Amount = Math.abs(ActualAmount).toFixed(2)+" Cr";
					Amount = Math.abs(ActualAmount).toFixed(2);
					amountCr = "Cr";
				}
				else{
					Amount = ActualAmount;
					amountCr = "";
				}
				
				
				if(even)
				$('tbody.transactionHistoryTable').append('<tr class=tr-highlighted id=row'+i+'><td id='+i+'>'+paymentDate+' '+paymentTime+'</td><td id=td2'+i+' >'+Amount+'</td><td class=nopadding>'+amountCr+'</td><td id=td3'+i+' >'+arrears+'</td><td class=nopadding>'+arrearsCr+'</td></tr>');
				else
				$('tbody.transactionHistoryTable').append('<tr id=row'+i+'><td id='+i+'>'+paymentDate+' '+paymentTime+'</td><td id=td2'+i+' >'+Amount+'</td><td class=nopadding>'+amountCr+'</td><td id=td3'+i+' >'+arrears+'</td><td class=nopadding>'+arrearsCr+'</td></tr>');
				
				
				
				divWidth = $('#row0').width();
				tr1Width = $('#0').width();
				tr2Width = $('#td20').width();
				tr3Width = $('#td30').width();
				
				$('#td2'+i+'').css('text-align','right');
				$('#td3'+i+'').css('text-align','right');
				if(Amount == 0)
				{ //console.log("Got 0");
				$('#row'+i+'').addClass('fontRed')
				}
				
				if(listItem.PaymentMethod == 1 || listItem.PaymentMethod == 2)
					$('#'+i+'').append('<span class=card><img class=cardIcon src="css/themes/images/icons-png/card-icon.png" alt=""></span>')
			
				myPageScroll.refresh();
		
		
		
    },
	
	/***************************************rendering the retrieved customer loan details************************************************/
    renderSelectedCustSummary: function(){
        
		console.log(dataStorage.getData(SELECTED_CUSTOMER_NAME));
        //rendering the customer loan details on the page
        $('ul.cust').append('<li class="cust ui-li-static ui-body-inherit ui-first-child ui-last-child"><div class="cust-header"><span class="fullName">'+dataStorage.getData(SELECTED_CUSTOMER_NAME)+'</span></div></li>');
		$('ul.cust').append('<li class="ui-li-border ui-li-static ui-body-inherit ui-first-child ui-last-child ui-li-highlighted">Folio Number<span class="ui-li-aside"><strong>'+dataStorage.getData(SELECTED_AGREEMENT_NUM)+'</strong></span></li>');
		$('ul.cust').append('<li class="ui-li-border ui-li-static ui-body-inherit ui-first-child ui-last-child">Weekly Term Amount<span class="ui-li-aside"><strong>&pound;'+dataStorage.getData('WEEKLY_TERM_AMOUNT')+'</strong></span></li>');
				
		if(dataStorage.getData('PREVIOUS_AGREEMENT_NUM') != "" && dataStorage.getData('PREVIOUS_AGREEMENT_NUM') != 'null' && dataStorage.getData('PREVIOUS_AGREEMENT_NUM') != undefined){
			$('ul.cust').append('<li class="ui-li-border ui-li-static ui-body-inherit ui-first-child ui-last-child">Previous Folio Number <a href="#" onclick=selectedCustLoanDetails.showPreviousFolio("'+dataStorage.getData('PREVIOUS_AGREEMENT_NUM')+'")>'+dataStorage.getData('PREVIOUS_AGREEMENT_NUM')+'</a></li>');
		}
		$('ul.cust').append('<li class="ui-li-border ui-li-static ui-body-inherit ui-first-child ui-last-child">Last 13 weeks transactions<li>');  

		
		
		
    },	
	
	isEven: function(value) {
	value = parseInt(value);
	if (value%2 == 0)
		return true;
	else
		return false;
	}
	
	
	
	
};


/***************************************actions to perform on document ready************************************************/
$(document).on('ready',function(){
    //calling functions
	document.addEventListener("deviceready", onDeviceReady, false);
        myPageScroll = new IScroll('#wrapper', { mouseWheel: true });
	
	
    //calling functions
	common.setHeight('.table-data');
  
  $(window).resize(function() {
    common.setHeight('.table-data');
  });
	
	
	var agreementNum = dataStorage.getData('AGREEMENT_ID');
	//var agreementNum = '1';
    selectedCustLoanTransactionHistory.getCustLoanTransactionHistoryFromOfflineDB(agreementNum);
	//selectedCustLoanTransactionHistory.renderSelectedCustTransHistory(1);
  
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

