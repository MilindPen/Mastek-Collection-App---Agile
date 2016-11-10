var idCounter;
var deviceType;
var selectedUserId = dataStorage.getData(USER_ID);


var selectedCustDetails = {
    /***************************************retrieving the customer details from offline DB************************************************/
    getCustDetailFromOfflineDB: function(){
        
        var dbObj = dataStorage.initializeDB();
        var selectedCustomerParam = [dataStorage.getData(SELECTED_CUSTOMER_NUM)];
        
        //execute SQL query
        dbObj.transaction(function(tx) {
            tx.executeSql(dbQueries.selectedCustDetailStatement,selectedCustomerParam,function(tx,res){
                var len = res.rows.length;
                if(len==0){
		      console.log(len);      
                }
                if(len > 0) {
	            //console.log(JSON.stringify(res));
                    //alert(JSON.stringify(res));
                    selectedCustDetails.renderSelectedCustDetails(JSON.stringify(res.rows.item(0)));
                }

            });
            tx.executeSql(dbQueries.selectCustPaymentPerformanceStatement, selectedCustomerParam,function(tx,res){
                var len = res.rows.length;
                //alert(len);
                if(len==0){
                    console.log(len);
                }
                if(len > 0){
                    console.log(JSON.stringify(res));
					console.log("length"+len);
                    for(i=0;i<len;i++){
                        idCounter = i;
                        selectedCustDetails.renderSelectedCustLoanList(len,JSON.stringify(res.rows.item(i)));
                        console.log(JSON.stringify(res.rows.item(i)));
                    }
                  
                    
                }
                
            },function(e) {
                  
            });
        });
        
    },
    /***************************************rendering the retrieved customer details************************************************/
    renderSelectedCustDetails: function(res){
        var listItem=[];
        listItem=JSON.parse(res);
        var fullName="";
        var address="";
        var addressLine1="";
        var addressLine2="";
        var addressLine3="";
        var addressLine4="";
        var city="";
        var postCode="";
        //building customer name
        if(listItem.Title){
            fullName = fullName + listItem.Title+" ";
        }
        if(listItem.FirstName){
            fullName = fullName + listItem.FirstName+" ";
        }
        if(listItem.MiddleName){
            fullName = fullName + listItem.MiddleName+" ";
        }
        if(listItem.LastName){
            fullName = fullName + listItem.LastName+" ";
        }
        
        dataStorage.setData(SELECTED_CUSTOMER_NAME,fullName);
        
      
        
        
        //rendering the customer details on the page
        $('ul.cust').append('<li class="cust ui-li-static ui-body-inherit ui-first-child ui-last-child"><div class="cust-header"><span class="fullName">'+fullName+'</span><span class="performanceIndicator" id="payPerformance"></span><br><span class="custNumber">'+listItem.CustomerNumber+'</span></div></li>');
        
        //performanceIndicator Status
        var paymentPerformance = parseInt(listItem.PaymentPerformance);
        
        if(listItem.PaymentPerformance){
            $('span.performanceIndicator').text(paymentPerformance+"%");
            if(listItem.PaymentPerformance >= 90){
                $('span.performanceIndicator').addClass('piGreen');
            }
            else if(listItem.PaymentPerformance < 90 && listItem.PaymentPerformance >= 70){
                $('span.performanceIndicator').addClass('piAmber');
            }
            else{
                $('span.performanceIndicator').addClass('piRed');
            }
        }
        else{
            $('span.performanceIndicator').removeClass('performanceIndicator');
        }
        
        
        
    },
	
	
	 /***************************************rendering the retrieved loan list************************************************/
    renderSelectedCustLoanList:function(len,res){
        var loanItem=[];

            var term = "";
            var elapsedWeeks = "";
            var balance = "";
			var folioNo = "";
			var arrears = "";
			var instalments ="";
			var aaIndicatorId ="";
			var prevFolioNo="";
            
        
        loanItem = JSON.parse(res);
        console.log(loanItem.AgreementNumber);
        
		folioNo = loanItem.AgreementNumber;
        term = common.convertToAmount(loanItem.Terms);
        elapsedWeeks = loanItem.ElapsedWeeks;
        balance = loanItem.Balance;
		arrearsVal = common.convertToAmount(loanItem.Arrears);
		instalments =loanItem.Instalments;
		aaIndicatorId=loanItem.AAIndicatorID;
		prevFolioNo=loanItem.PreviousAgreementNumber;
		
		
		 // arrears - checking for negative value
        if(arrearsVal < 0){
            arrears = Math.abs(arrearsVal)+" Cr";
        }
        else{
            arrears = arrearsVal;
        }
                
       
       
        
/***************************************rendering the folio and arrears list************************************************/
		var div=$("#loan-render");
		
        var collapsible= $('<div id="'+idCounter+'" data-role="collapsible" class="ui-alt-icon ui-collapsible" data-theme="f" data-collapsed="true" data-mini="true" data-expanded-icon="carat-u" data-collapsed-icon="carat-d" data-iconpos="right" data-content-theme="c">');
		

		collapsible.append('<h5 class="ui-collapsible-heading" id="collapsiblePayment"><div id=loanIndicator'+idCounter+' class="loanIndication"></div><span class="toggle-heading loanlist-folio ">Folio No.'+folioNo+'&nbsp;(Arrears &pound;'+arrears+')</span></h5>');
				
		var ul = $('<ul class="ul-loanList ui-listview" data-role="listview" data-inset="false">');
		ul.append('<li data-theme="d" class="ui-li-static ui-body-d" id="list0">\n\
						<div class="loanlist-folio">\n\
							<span class="loanlist-folio">Weekly Term Amount</span><span class="tenure"> &pound;'+term+'<span></span>\n\
						</div>\n\
						<div class="loanlist-folio">\n\
							<span class="loanlist-folio">Elapsed Weeks</span><div class="elapsedWeeks"><span class=""> '+elapsedWeeks+'</span><span class=""> ('+instalments+')</span></div>\n\
						</div>\n\
						<div class="loanlist-folio">\n\
							<span class="loanlist-folio">Balance</span><span class="tenure">&pound;'+balance+'</span>\n\
						</div>\n\
						<div>\n\
							<a href="#" class="lastTransaction" onclick="selectedCustLoanDetails.showTransactionHistory('+prevFolioNo+','+term+')">Last 13 weeks transactions</a>\n\
						</div>\n\
					</li>');
		
		collapsible.append(ul);
		div.append(collapsible);
        div.trigger('create');
		
	     //checking the color condition for loanIndicator  
		if(aaIndicatorId==0){$('div#loanIndicator'+idCounter).addClass('loanIndicatorRed')}
		else if(aaIndicatorId==1){$('div#loanIndicator'+idCounter).addClass('loanIndicatorAmber')}
		else if(aaIndicatorId==2){$('div#loanIndicator'+idCounter).addClass('loanIndicatorGreen')}
		else{$('div#loanIndicator'+idCounter).addClass('defaultColor')}
	        
    },
        
     
};


/***************************************actions to perform on document ready************************************************/
$(document).ready(function(){
	document.addEventListener("deviceready", onDeviceReady, false); 
                  selectedCustDetails.getCustDetailFromOfflineDB();
                  
                  $('h5#collapsiblePayment').on('click',function(){
                                                    if($('div.loanList').children().hasClass('ui-collapsible-heading-collapsed')){
                                                    $('.custFooter').hide();
                                                    }
                                                    else{
                                                    $('.custFooter').show();
                                                    }
                                                    });
                  

                  //document.addEventListener("deviceready",function(){
                          //                  alert("123");
                              //              }, true);

                  });
				  
	
//session validation
$(document).on('click',function(){
	session.sessionValidate(selectedUserId);
});
function onDeviceReady() {
	console.log(navigator.notification);
	session.sessionValidate(selectedUserId);
    
}
function onResume() {
    session.sessionValidate(selectedUserId);
 }
$(document).on('pageinit',function (f) {
    $('[data-role=collapsible]').find("*").click(function () {
    	session.sessionValidate(selectedUserId);
    });
});


