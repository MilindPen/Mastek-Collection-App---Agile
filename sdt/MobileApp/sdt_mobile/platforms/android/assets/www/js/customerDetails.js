var idCounter;
var deviceType;
var visitID;
var customerID;
var totalPaidAmt;
var checkforNotSeen;

var hashMap = new HashMap();
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
            tx.executeSql(dbQueries.selectCustLoanListStatement, selectedCustomerParam,function(tx,res){
                var len = res.rows.length;
                //alert(len);
                if(len==0){
                    console.log(len);
                }
                if(len > 0){
					console.log("Length of loan List"+len);
                    console.log(JSON.stringify(res));
                    for(i=0;i<len;i++){
                        idCounter = i;
                        selectedCustDetails.renderSelectedCustLoanList(len,JSON.stringify(res.rows.item(i)));
                        console.log(JSON.stringify(res.rows.item(i)));
                    }
                    //selectedCustDetails.renderTotalDues();
					console.log("Count in HashMap"+hashMap.count());
                    selectedCustDetails.addLoanListButtons();
                    calcAmts();
                    
                }
                
            },function(e) {
                    // alert("ERROR: " + e.message);
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
        
        totalPaidAmt = listItem.TotalPaidAmount;
		
		visitID = listItem.VisitID;
		//alert("VisitID "+visitID);
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
        
        //building customer address
        if(listItem.AddressLine1){
            addressLine1 = listItem.AddressLine1+", ";
        }
        if(listItem.AddressLine2){
            addressLine2 = listItem.AddressLine2+", ";
        }
        if(listItem.AddressLine3){
            addressLine3 = listItem.AddressLine3+", ";
        }
        if(listItem.AddressLine4){
            addressLine4 = listItem.AddressLine4+", ";
        }
        if(listItem.City){
            city = listItem.City+", ";
        }
        if(listItem.PostCode){
            postCode = listItem.PostCode;
        }
        
        address = addressLine1 + addressLine2 + addressLine3 + addressLine4 + city + postCode;
        
        
        //rendering the customer details on the page
        $('ul.cust').append('<li class="cust ui-li-static ui-body-inherit ui-first-child ui-last-child"><div class="cust-header"><span class="fullName">'+fullName+'</span><span class="performanceIndicator" id="performance"></span><br><span class="custNumber">'+listItem.CustomerNumber+'</span></div></li>');
        
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
        
        //contact info
        $('ul.custPersonalDetails').append('<li data-theme="d" data-icon="false" class="contactMain ui-li-static ui-body-d ui-first-child"><h2>Contact</h2>');
        if(listItem.MobileNumber || listItem.PhoneNumber || listItem.Email){
            
            if(listItem.MobileNumber){
                $('li.contactMain').append('<div class="contact1"><div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset"><input type="text" class="contactNumber" value="'+listItem.MobileNumber+'" onclick=window.location.href=\'tel:'+listItem.MobileNumber+'\' readonly></div><span class="contactIcon" onclick="window.location.href=\'tel:'+listItem.MobileNumber+'\'"><img class="mobile-img" src="css\\themes\\images\\icons-png\\mobile-icon.png"></span></div>');
            }
            if(listItem.PhoneNumber){
                $('li.contactMain').append('<div class="contact2"><div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset"><input type="text" class="contactNumber" value="'+listItem.PhoneNumber+'" onclick=window.location.href=\'tel:'+listItem.PhoneNumber+'\' readonly></div><span class="contactIcon" onclick="window.location.href=\'tel:'+listItem.PhoneNumber+'\'"><img class="landline-img" src="css\\themes\\images\\icons-png\\landline-icon.png"></span></div>');
            }
            if(listItem.Email){
                $('li.contactMain').append('<div class="email"><div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset"><input type="email" value="'+listItem.Email+'" readonly></div></div>');
            }
            
            $('ul.customerPersonalDetails').append('</li>');
        }
        
        //address info
            $('ul.custPersonalDetails').append('<li data-theme="d" data-icon="false" class="ui-li-static ui-body-d"><h2>Address</h2><div class="address"><div contenteditable="false" class="addr ui-input-text ui-shadow-inset ui-body-inherit ui-corner-all ui-textinput-autogrow">'+address+'</div></div><span class="addressIcon"><img src="css\\themes\\images\\icons-png\\location-icon.png"></span></div></li>');

        //d.o.b info
            var dob = listItem.DOB;
            var formattedDOB = moment(dob).format("Do MMM YY");
            var n = formattedDOB.length;
            if(n<11)
            {
                formattedDOB = "0"+ formattedDOB;
            }
            if(formattedDOB!=""){
                $('ul.custPersonalDetails').append('<li data-theme="d" data-icon="false" class="ui-li-static ui-body-d"><h2>Date of Birth</h2><span class="dob">'+formattedDOB+'</span></li>');
            }
            else{
                $('ul.custPersonalDetails').append('<li data-theme="d" data-icon="false" class="ui-li-static ui-body-d"><h2>Date of Birth</h2><span class="dob">&nbsp;</span></li>');
            }
            

        //collection day and journey order info
            $('ul.custPersonalDetails').append('<li data-theme="d" data-icon="false" class="ui-li-static ui-body-d collectionInfo"></li>');
            
            //for collection day
            $('li.collectionInfo').append('<div class="collection-day"><h2>Collection Day</h2><div class="walkOrder"><div class="ui-select"><div id="weekday-button" class="ui-btn ui-corner-all ui-shadow ui-state-disabled" aria-disabled="true"><span>Sunday</span><select id="weekday" data-icon="false" disabled="disabled" class="mobile-selectmenu-disabled"><option id="day1" value="1">'+collectDay.DAY1+'</option><option id="day2" value="2">'+collectDay.DAY2+'</option><option id="day3" value="3">'+collectDay.DAY3+'</option><option id="day4" value="4">'+collectDay.DAY4+'</option><option id="day5" value="5">'+collectDay.DAY5+'</option><option id="day6" value="6">'+collectDay.DAY6+'</option><option id="day7" value="7">'+collectDay.DAY7+'</option></select></div></div></div></div>');
            
            var day = "day"+listItem.CollectionDay;
            var val = "";
            switch(day){
                case "day1":
                    val = collectDay.DAY1;
                    break;
                case "day2":
                    val = collectDay.DAY2;
                    break;
                case "day3":
                    val = collectDay.DAY3;
                    break;
                case "day4":
                    val = collectDay.DAY4;
                    break;
                case "day5":
                    val = collectDay.DAY5;
                    break;
                case "day6":
                    val = collectDay.DAY6;
                    break;
                case "day7":
                    val = collectDay.DAY7;
                    break;
                default:
                    break;
            }
            $('#weekday-button>span').text(val);
            
            //for journey order
            $('li.collectionInfo').append('<div class="journey-info"><h2>Journey Order No.</h2><div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset"><input type="number" class="journey-text" value='+listItem.JourneyOrderBy+' readonly></div></div></li>');
            
            
        // adding edit button
        $('ul.custPersonalDetails').append('<li data-theme="d" class="ui-li-static ui-body-d ui-last-child"><div class="btngroup"><div class="btn-group btn-group-justified" role="group" aria-label="..." style=""><div id="dashBtnEdit"><button data-mini="true" id="editRequest" data-theme="a" type="button" class="btn btn-sucess ui-btn ui-btn-a ui-shadow ui-corner-all ui-mini">Edit</button></div></div></div></li>');
        
        
    },
    
    /***************************************rendering the retrieved loan list************************************************/
    renderSelectedCustLoanList:function(len,res){
        var loanItem=[];

            var folioNo = "";
            var tenure = "";
            var arrears = "";
            var esb = "";
            var termAmt = "";
			var balance =" ";
			var rebate ="";
			
        
        loanItem = JSON.parse(res);
        console.log(loanItem.AgreementNumber);
		customerID = loanItem.CustomerID;
        console.log("Loan Agreement ID "+loanItem.AgreementID);
		console.log("Loan Customer ID "+loanItem.CustomerID);
		
		hashMap.set(idCounter,loanItem.AgreementID);
			
        folioNo = loanItem.AgreementNumber;
        tenure = loanItem.Instalments;
        esb = common.convertToAmount(loanItem.SettlementAmount);
        termAmt = common.convertToAmount(loanItem.Terms);
        arrearsVal = common.convertToAmount(loanItem.Arrears);
		balance = common.convertToAmount(loanItem.Balance);
		rebate = common.convertToAmount(loanItem.SettlementRebate);
	
        
        // arrears - checking for negative value
        if(arrearsVal < 0){
            arrears = Math.abs(arrearsVal)+" Cr";
        }
        else{
            arrears = arrearsVal;
        }
        
        //alert(dataStorage.getData(DEVICE_TYPE));
        
        // create a listItem
        $('ul.ul-loanList').append('<li data-theme="d" class="ui-li-static ui-body-d" id="list'+idCounter+'"></li>');
        // add folio and tenure
        $('li#list'+idCounter).append('<div class="loanlist-folio">\n\
                                            <span class="folio" id="folioNo'+idCounter+'" onclick=selectedCustDetails.forwardFolio("'+folioNo+'")>Folio No. <strong>'+folioNo+'</strong></span>\n\
                                            <span class="tenure"><strong>'+tenure+' WK</strong></span>\n\
                                      </div>');
        // add payment header
        $('li#list'+idCounter).append('<div class="loanlist-payment"><span>Payment</span></div>');
        // add term amount
        $('li#list'+idCounter).append('<div class="input-group">\n\
                                            <span class="input-left">&pound;</span>\n\
                                            <div class="ui-select">\n\
                                                <div id="select-money-button" class="ui-btn ui-icon-carat-d ui-btn-icon-right ui-shadow">\n\
                                                    <select id="select-money'+idCounter+'" class="payment-cmbbox" data-corners="false">\n\
                                                        <option id="firstOption'+idCounter+'" value="Term '+termAmt+'">Term '+termAmt+'</option>\n\
                                                        <option id="secondOption'+idCounter+'" value="Not Due">Not Due</option>\n\
                                                    </select>\n\
                                                </div>\n\
                                            </div>\n\
                                            <div class="ui-input-text ui-body-c ui-corner-all ui-shadow-inset">\n\
                                                        <input id="setAmount'+idCounter+'" class="actualPay" type="text" inputmode="numeric" pattern="[0-9]*" data-theme="c" onchange="inputModify('+idCounter+')" onkeyup="manualAddAmt('+idCounter+')" onclick="clearTextField('+idCounter+')">\n\
                                            </div>\n\
                                     </div>');
        
        // If Weekly Loan, then hide Not Due (Validation)
        if(loanItem.PaymentFrequencyID == 1){
            $("#secondOption"+idCounter).remove();
        }
        
        //add arrears and esb
        $('li#list'+idCounter).append('<div class="loanlist-arrears-esb">\n\
                                        <span class="arrears">Arrears &pound;'+arrears+'</span>\n\
                                        <span class="esb" onclick="callPopup('+idCounter+')" id="esbAmt'+idCounter+'">ESB &pound;'+esb+'</span>\n\
                                     </div>');
        
        $('#setAmount'+idCounter).val("Term "+termAmt);
        //dropdownHide(idCounter);
        
        if(dataStorage.getData(DEVICE_TYPE) == "iOS"){
           //alert(dataStorage.getData(DEVICE_TYPE));
            $('#select-money'+idCounter).attr('onblur', 'selectCopy('+idCounter+')');
            $('#select-money'+idCounter).attr('onfocus', 'noneSelectIOS('+idCounter+')');
        }
        else if(dataStorage.getData(DEVICE_TYPE) == "Android"){
            //alert("its android");
            $('#select-money'+idCounter).attr('onchange', 'selectCopy('+idCounter+')');
            //$('#select-money'+idCounter).attr('onfocus', 'noneSelect('+idCounter+')');
        }
        else if(dataStorage.getData(DEVICE_TYPE) == "browser"){
            //alert("its browser");
            $('#select-money'+idCounter).attr('onchange', 'selectCopy('+idCounter+')');
            //$('#select-money'+idCounter).attr('onfocus', 'noneSelect('+idCounter+')');
        }
        else{
            //alert("generic");
            $('#select-money'+idCounter).attr('onchange', 'selectCopy('+idCounter+')');
            //$('#select-money'+idCounter).attr('onfocus', 'noneSelect('+idCounter+')');
        }
        
        stateCheck(idCounter, loanItem.AmountPaid);
    },
                   
    renderESBPopUp: function(data,i){
	    folioData = JSON.parse(data);  
				
         $('ul#callESBList').append('<li data-theme="a" class="ui-li-static ui-body-d" id="esblist"> ');
		
		
        $('li#esblist').append('<li><div class="esblist-popup-foliono">\n\
                                            <span onclick=selectedCustDetails.forwardFolio("'+folioData.AgreementNumber+'")>Folio Number<span class="tenure"><strong>'+folioData.AgreementNumber+'</strong></span></span>\n\
                                            </div></li>');
		
        $('li#esblist').append('<li><div class="esblist-popup">\n\
                                            <span class="loanlist-folio">Weekly Term Amount</span><span class="tenure"><strong>&pound;'+folioData.Terms+'</strong></span></span>\n\
                                            </div></li>');
        
        $('li#esblist').append('<li><div class="esblist-popup-up">\n\
                                            <span class="loanlist-folio">Balance</span><span class="tenure"><strong>&pound;'+folioData.Balance+'<strong></span></span>\n\
                                            </div></li>');
        
        $('li#esblist').append('<hr><li><div class="esblist-popup-low">\n\
                                            <span class="loanlist-folio">Balance</span><span class="plussymbol">&#43;</span><div class="amountValue"><span class="tenure"><strong>&pound;'+folioData.Balance+'<strong></span></div></span>\n\
                                            </div></li>');
        
        $('li#esblist').append('<li><div class="esblist-popup">\n\
                                            <span class="loanlist-folio">Rebate</span><span class=minussymbol>&#45;</span><div class="amountValue"><span class="tenure"><strong> &pound;'+folioData.SettlementRebate+'</strong></span></div></span>\n\
                                            </div></li>');	
        $('li#esblist').append('<li><div class="esblist-popup">\n\
                                            <span class="loanlist-folio">ESB</span><span class="tenure"> <strong>&pound;'+folioData.SettlementAmount+'</strong></span></span>\n\
                                            </div></li>');
											
        $('li#esblist').append('<li><div class="esblist-popup">\n\
                                            <label class="check"><input type="checkbox" name="checkbox-0 ">Re-loaned</label>\n\
                                            </div></li>');	
											
											
         $('li#esblist').append('<li class="msg"><div class="imagemsg">\n\
                                            <img src="css/themes/images/icons-png/note-icon.png" class="note"/><label class="esb-msg"> ESB includes current weeks terms of &pound;'+parseFloat(folioData.Terms).toFixed(0)+'</label>\n\
                                            </div></li>');	
											
									
											
        $('li#esblist').append('<li><div class="ui-grid-b">\n\
                                            <div class="ui-block-a esb-popupbtn"><a href="customerDetails.html" data-role="button" data-theme="a"  class="btn btn-sucess ui-btn ui-btn-a ui-shadow ui-corner-all  esb-btninline">Cancel</a></div>\n\
                                            <div class="ui-block-b esb-popupbtn"><a href="customerDetails.html" data-role="button" data-theme="a"  class="btn btn-sucess ui-btn ui-btn-a ui-shadow ui-corner-all esb-btninline " onclick="copyEsb('+folioData.SettlementAmount+','+i+')">OK</a></div>\n\
                                        </div></li></ul></div>');
        
											$('#callESBPopup').popup();
											$('#callESBPopup').popup('open');
										
    },
    
    /***************************************render total dues in loanlist************************************************/
//    renderTotalDues:function(){
//        
//        $('ul.ul-loanList').append('<li data-theme="f" class="ui-li-static ui-body-f ui-last-child" id="listPaymentDues"></li>');
//        $('li#listPaymentDues').append('<span class="totalColl">Total payment Due</span><span class="total"></span>');
//        
//    },
    
    /***************************************adding buttons to loan list************************************************/
    addLoanListButtons:function(){
        
        $('div#pageone').append('<div class="custFooter ui-footer ui-bar-inherit ui-footer-fixed slideup" data-role="footer" data-position="fixed" role="contentinfo">\n\
                                        <div data-theme="f" class="ui-li-static ui-body-f ui-last-child" id="listPaymentDues">\n\
                                            <span class="totalColl">Total payment Due</span><span class="total"></span></div>\n\
                                        <div class="footer-btngroup">\n\
                                        <div class="footer-btn-group btn-group-justified" role="group" aria-label="..." style="">\n\
                                            <div id="footer-dashBtn1">\n\
                                                <button type="button" data-mini="true" onclick="validateBeforeSave()" id="save" data-theme="a" class="btn btn-sucess ui-btn ui-btn-a ui-shadow ui-corner-all ui-mini">Save</button>\n\
                                            </div>\n\
                                        </div>\n\
                                        <div class="footer-btn-group btn-group-justified" role="group" aria-label="..." style="">\n\
                                            <div id="footer-dashBtn2">\n\
                                                <button type="button" data-mini="true" data-rel="popup" data-position-to="window" data-theme="a" class="btn btn-sucess ui-btn ui-btn-a ui-shadow ui-corner-all ui-mini" id="callOutcome">Call Outcome</button>\n\
                                            </div>\n\
                                        </div>\n\
                                    </div>\n\
                                </div>');
        
        if(checkforNotSeen == 1){
            $('span.totalColl').text("Total Payment Collected");
        }
    },
    
    forwardFolio:function(folioNumber){
        dataStorage.setData(SELECTED_AGREEMENT_NUM,folioNumber);
        common.redirect("loanDetails.html");
    }
     
};

function stateCheck(n,amtpaid){
    
    if(totalPaidAmt){
            if(amtpaid){
                $("#setAmount"+n).val(amtpaid);
                checkforNotSeen = 1;
            }
            else{
                checkforNotSeen = 0;
            }
    }
        
};

/***************************************functions to find total dues and manipulate inputs************************************************/
// function for iOS
function noneSelectIOS(n){
    $('#select-money'+n).val([]);
    $("#select-money"+n+" option:first").prop('selected', true);
};

//function for Android and Browser
function noneSelect(n){
    $('#select-money'+n).val([]);
};
//copy selected option to inputbox and calculate total dues
function selectCopy(n){
    var a=$("#select-money"+n).val();
    $("#setAmount"+n).val(a);
    $('span.totalColl').text("Total Payment Collected");
    calcAmts();
    //dropdownHide(n);
};


//reset dropdown when textbox value modified
function inputModify(n){
    //$('#select-money'+n).val('');
    $('#select-money'+n).val([]);
    //$("#select-money"+n+" option:first").prop('selected', true);

};

//clear textbox on its click; and reset dropdown
function clearTextField(n){
    $('#setAmount'+n).val('');
    $('#select-money'+n).val([]);
    $('#setAmount'+n).priceFormat({
        prefix: '',
        thousandsSeparator: ''
        });
    //$("#select-money"+n+" option:first").prop('selected', true);
    $('span.totalColl').text("Total Payment Collected");
    calcAmts();
    //$("#select-money"+n+" option").prop("selected", false);
    //document.getElementById('#select-money'+n).selectedIndex = -1;
    //dropdownHide(n);
};

//copy ESB to inputbox and calculate total dues; and reset dropdown
function copyEsb(e,n){
    $("#setAmount"+n).val(e);
     //$('#select-money'+n).val('');
     $('#select-money'+n).val([]);
     //$("#select-money"+n+" option:first").prop('selected', true);
     $('span.totalColl').text("Total Payment Collected");
    calcAmts();
    //dropdownHide(n);
};

//manually add amount and calculate total dues
function manualAddAmt(n){
    $('#setAmount'+n).priceFormat({
    prefix: '',
    thousandsSeparator: ''
    });
    $('span.totalColl').text("Total Payment Collected");
    calcAmts();
};

function callPopup(n){
	$('#callESBList').empty();
	console.log("counter "+n);
	
	var folio = $('li#list'+n+'>.loanlist-folio>.folio>strong').text();
	//alert("Selected Folio Number "+folio);
	
	var dbObj = dataStorage.initializeDB();
    var selectedAgreementParam = [folio];
        
        //execute SQL query
        dbObj.transaction(function(tx) {
        tx.executeSql(dbQueries.selectedCustLoanDetailStatement,selectedAgreementParam,function(tx,res){
              
                   console.log(JSON.stringify(res.rows.item(0)));
					selectedCustDetails.renderESBPopUp(JSON.stringify(res.rows.item(0)),n);
			 });
	//$('#callESBPopup'+n).popup();
    //$('#callESBPopup'+n).popup('open');
});
};
// function to calculate total dues
function calcAmts(){
    var sum = 0;
$('.actualPay').each(function() {
    if($(this).val()!="")
    {
        var m = $(this).val();
        if(isNaN(m)){
            if(m.substring(0,4)=="Term"){
                m = m.substring(5);
                sum = parseFloat(sum) + parseFloat(m);
            }
        }else{
            sum = parseFloat(sum) + parseFloat(m);
        }  
    }
});
    $("span.total").html("&pound;"+parseFloat(sum).toFixed(2));
};

function success(){
		alert("Transaction saved successfully!");
		common.redirect('scheduledCustomers.html');
};


function validateBeforeSave(){
    var folioMoreThanEsb = "";
    var folioEqualToEsb = "";
    var folioMoreThanTerm = "";
    for(var i=0;i<hashMap.count();i++){
        var esbData = $("#esbAmt"+i).text();
        var esbNumericData = esbData.substr(5, esbData.length);
        var termData = $("#select-money"+i+" option:first").val();
        var termNumericData = termData.substr(5, termData.length);
        var folio = $('li#list'+i+'>.loanlist-folio>.folio>strong').text();
        
    //amount entered for a loan is more than ESB
        if(parseFloat($("#setAmount"+i).val()) > parseFloat(esbNumericData)){
            //alert($('li#list'+i+'>.loanlist-folio>.folio>strong').text());
            folioMoreThanEsb = folioMoreThanEsb + folio+", ";
        }
    //amount entered for the loan is equal to ESB and customer has not opted for settlement
        if(parseFloat($("#setAmount"+i).val()) == parseFloat(esbNumericData) && $("#setAmount"+i).data('flag') != 'copied'){
            folioEqualToEsb = folioEqualToEsb + folio+", ";
        }
    // amount entered is more than twice the Weekly Term Amount but less than ESB
        if(parseFloat($("#setAmount"+i).val()) > (parseFloat(termNumericData) * TERM_MULTIPLE) && parseFloat($("#setAmount"+i).val()) < parseFloat(esbNumericData)){
            folioMoreThanTerm = folioMoreThanTerm + folio+", ";
        }
   
    }
    
    if($("span.total").text() == "£0.00" && !checkNotDue()){
        navigator.notification.confirm(messageboxCustomerDetailsPage.zeroPayment,
                                    confirmCallbackZeroPayment,
                                    ['Confirm','Cancel']);
    }
    else{
        if(folioMoreThanEsb !=""){
            navigator.notification.alert(folioMoreThanEsb.substr(0, (folioMoreThanEsb.length - 2)) + messageboxCustomerDetailsPage.esbAmountExceeded,
                                        callbackReturn,
                                        'OK');
        }
        else if(folioEqualToEsb !=""){
            navigator.notification.alert(folioEqualToEsb.substr(0, (folioEqualToEsb.length - 2)) + messageboxCustomerDetailsPage.settlementAmtMatch,
                                        callbackReturn,
                                        'OK');
        }
        else if(folioMoreThanTerm !=""){
            navigator.notification.confirm(folioMoreThanTerm.substr(0, (folioMoreThanTerm.length - 2)) + messageboxCustomerDetailsPage.weeklyTermExceeded,
                                        confirmCallbackMoreThanTerm,
                                        ['Confirm','Cancel']);
        }
        else{
            saveTransactionRecords();
        }
    }
    
};


function confirmCallbackMoreThanTerm(buttonIndex){
    if(buttonIndex == 1){
        saveTransactionRecords();
    }
    
};

function confirmCallbackZeroPayment(buttonIndex){
    if(buttonIndex == 1){
        $('#callOutComePopup').popup();
        $('#callOutComePopup').popup('open');
    }
};

function checkNotDue(){
    var check;
    for(var i=0;i<hashMap.count();i++){
        if($("#setAmount"+i).val() == "Not Due"){
            check = 'true';
        }
        else{
            check = 'false';
            break;
        }
    }
    if(check == 'true'){
        return true;
    }
    else{
        return false;
    }
};


/***************************************actions to perform on document ready************************************************/
$(document).ready(function(){
	document.addEventListener("deviceready", onDeviceReady, false);
				  
                  selectedCustDetails.getCustDetailFromOfflineDB();
                  
                  $('h5.ui-collapsible-heading').on('click',function(){
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
    
    function saveTransactionRecords() { 
			//saveToOfflineDB();
                        $('#save').attr('disabled','disabled');
			var isNDSelected = false;
			var resultId = saveTransaction.generateResultID();
			var resultDate =	saveTransaction.generateResultDate();
			
			var AgreementMode;
			var ResultStatusID;
			var VisitStatusID;
			var totalAmountPaid = parseFloat(($("span.total").text()).substring(1));
			resultId = resultId+customerID;
			console.log("VisiteID "+visitID);
			console.log("CustomerID "+customerID);
			
			// This Code checks if there is any ESB in loan list
			for(var i=0;i<hashMap.count();i++)
			{
				var AgreementId = hashMap.get(i);
				var AgreementAmtPaid = $('#setAmount'+i+'').val();
				if(AgreementAmtPaid == "Not Due")
				{
					isNDSelected = true;
					//alert("All Non Due Selected");
				}
				else if(AgreementAmtPaid != "Not Due")
				{
					//alert("All not NOT DUE Selected"+AgreementAmtPaid);
					isNDSelected = false;
					break;
				}
								
				}
							
					
			
			var dbObj = dataStorage.initializeDB();
			dbObj.transaction(function insertTransactionRecords(tx){
					
					
			for(var i=0;i<hashMap.count();i++)
			{
				
				var AgreementId = hashMap.get(i);
				var AgreementAmtPaid = $('#setAmount'+i+'').val();
				var ESBAmt = parseFloat($('#esbAmt'+i+'').text().substring(5));
				console.log(AgreementAmtPaid +" for "+AgreementId);
				console.log("ESB Amount "+$('#esbAmt'+i+'').text().substring(5));
				console.log("Total amount Paid "+totalAmountPaid);
				if(totalAmountPaid >0)
				{
					if(isNaN(AgreementAmtPaid)){
					if(AgreementAmtPaid.substring(0,4)=="Term"){
						AgreementAmtPaid = AgreementAmtPaid.substring(5);
						AgreementAmtPaid = parseFloat(AgreementAmtPaid).toFixed(2);
						AgreementMode = agreementMode.TERM;
						ResultStatusID = resultstatusType.PAID;
						VisitStatusID = statusType.COMP;
					}
					else if(AgreementAmtPaid == "Not Due")
					{
						AgreementAmtPaid = parseFloat(0).toFixed(2);
						AgreementMode = agreementMode.NONWEEKLY;
						ResultStatusID = resultstatusType.PAID;
						VisitStatusID = statusType.COMP;
					}
					}else if(parseFloat(AgreementAmtPaid) != ESBAmt) {
						AgreementAmtPaid = parseFloat(AgreementAmtPaid).toFixed(2);
						AgreementMode = agreementMode.TERM;
						ResultStatusID = resultstatusType.PAID;
						VisitStatusID = statusType.COMP;
					}
					else if(parseFloat(AgreementAmtPaid) == ESBAmt) {
						AgreementAmtPaid = parseFloat(AgreementAmtPaid).toFixed(2);
						AgreementMode = agreementMode.SETTLEMENT;
						ResultStatusID = resultstatusType.PAID;
						VisitStatusID = statusType.COMP;
					}
							
					var transactionParams = [visitID,customerID,resultId,resultDate,ResultStatusID,VisitStatusID,AgreementId,AgreementAmtPaid,AgreementMode,"","",0];
					var updateParam = [VisitStatusID,AgreementAmtPaid,visitID];
					var param = [AgreementAmtPaid,AgreementId];
					 // saveTransaction.saveToDB(transactionParams);	
					  //saveTransaction.updateCustomerTableInDB(updateParam);	
					 // saveTransaction.updateAgreementTableInDB(param);	
					tx.executeSql(dbQueries.insertIntoMtbTransactionTableStatement, transactionParams);
					tx.executeSql(dbQueries.updateCustomerTableStatement, updateParam);
					tx.executeSql(dbQueries.updateAgreementTableStatement, param);					
				}
				else
				{
					//need to be handled for different user story
					//alert("Total Amount is Zero.");
					if(isNDSelected)
					{
						AgreementAmtPaid = parseFloat(0).toFixed(2);
						AgreementMode = agreementMode.NONWEEKLY;
						ResultStatusID = resultstatusType.NW;
						VisitStatusID = statusType.NW;
						
						var transactionParams = [visitID,customerID,resultId,resultDate,ResultStatusID,VisitStatusID,AgreementId,AgreementAmtPaid,AgreementMode,"","",0];
						var updateParam = [VisitStatusID,AgreementAmtPaid,visitID];
						var param = [AgreementAmtPaid,AgreementId];
						//saveTransaction.saveToDB(transactionParams);	
						//saveTransaction.updateCustomerTableInDB(updateParam);	
						//saveTransaction.updateAgreementTableInDB(param);
						tx.executeSql(dbQueries.insertIntoMtbTransactionTableStatement, transactionParams);
						tx.executeSql(dbQueries.updateCustomerTableStatement, updateParam);
						tx.executeSql(dbQueries.updateAgreementTableStatement, param);
					}
				}
				
			
					
	
			}
					
					
			},saveTransaction.errorInsert, saveTransaction.successInsert);
	
	};
	
	$(document).on('click', '#callOutcome', function () {
                $('#callOutComePopup').popup();
                $('#callOutComePopup').popup('open');
	});
	
		
	$(document).on('click', '#callOutComePopup li', function () {
                
				//alert($(this).attr('data-name'));
				$('#callOutComePopup').popup('close');
			var selectedCallOutCome = $(this).attr('data-name');
				
			var resultId = saveTransaction.generateResultID();
			var resultDate =	saveTransaction.generateResultDate();
			
			var AgreementMode;
			var ResultStatusID;
			var VisitStatusID;
			var totalAmountPaid = parseFloat(($("span.total").text()).substring(1));
			resultId = resultId+customerID;
			console.log("VisiteID "+visitID);
			console.log("CustomerID "+customerID);
			console.log("selectedCallOutCome "+selectedCallOutCome);
			AgreementAmtPaid = parseFloat(0).toFixed(2);
			AgreementMode = agreementMode.ZEROPAYMENT;
			
			if(selectedCallOutCome != "3")
			{
				//AgreementAmtPaid = parseFloat(0).toFixed(2);
				//AgreementMode = agreementMode.ZEROPAYMENT;
				//VisitStatusID = statusType.COMP;
				
				if(selectedCallOutCome == "1")
				{
					ResultStatusID = resultstatusType.SWP;
					VisitStatusID = statusType.SWP;
				}
				else if(selectedCallOutCome== "2")
				{
					ResultStatusID = resultstatusType.SCP;
					VisitStatusID = statusType.SCP;
				}
				else if(selectedCallOutCome == "4")
				{
					ResultStatusID = resultstatusType.NSC;
					VisitStatusID = statusType.CNSC;
				}
			}
			else if(selectedCallOutCome == "3")
			{
				//AgreementAmtPaid = "";
				//AgreementMode = agreementMode.ZEROPAYMENT;
				ResultStatusID = resultstatusType.NSP;
				VisitStatusID = statusType.PEND;
			}
			
			
			var dbObj = dataStorage.initializeDB();
			dbObj.transaction(function insertTransactionRecords(tx){
			
			for(var i=0;i<hashMap.count();i++)
				{
					var AgreementId = hashMap.get(i);
					AgreementAmtPaid = parseFloat(0).toFixed(2);
					
						var transactionParams = [visitID,customerID,resultId,resultDate,ResultStatusID,VisitStatusID,AgreementId,AgreementAmtPaid,AgreementMode,"","",0];
						var updateParam = [VisitStatusID,AgreementAmtPaid,visitID];
						if(selectedCallOutCome == "3")
							AgreementAmtPaid = "";
							
						var param = [AgreementAmtPaid,AgreementId];
						  //saveTransaction.saveToDB(transactionParams);	
						  //saveTransaction.updateCustomerTableInDB(updateParam);	
						  //saveTransaction.updateAgreementTableInDB(param);	
							tx.executeSql(dbQueries.insertIntoMtbTransactionTableStatement, transactionParams);
							tx.executeSql(dbQueries.updateCustomerTableStatement, updateParam);
							tx.executeSql(dbQueries.updateAgreementTableStatement, param);
						
					
				}
			},saveTransaction.errorInsert, saveTransaction.successInsert);
			
			
	});
	
    $(document).on('click','#performance', function(){
			common.redirect('customerPerformance.html');
	});	
    //$(document).on('click','span.esb', function(){
	

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
    $(document).on('pageinit',function (f) {
        $('[data-role=collapsible]').find("*").click(function () {
        	session.sessionValidate(selectedUserId);
        });
    });
    $(document).on("scrollstart",function(){
    	  session.sessionValidate(selectedUserId);
    });