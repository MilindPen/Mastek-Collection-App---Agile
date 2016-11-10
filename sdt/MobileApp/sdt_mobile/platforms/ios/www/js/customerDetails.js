var idCounter;

var selectedCustDetails = {
    /***************************************retrieving the customer details from offline DB************************************************/
    getCustDetailFromOfflineDB: function(){
        
        var dbObj = dataStorage.initializeDB();
        var selectedCustomerParam = [dataStorage.getData(SELECTED_CUSTOMER_NUM)];
        
        //execute SQL query
        dbObj.transaction(function(tx) {
            tx.executeSql(selectedCustDetailStatement,selectedCustomerParam,function(tx,res){
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
            tx.executeSql(selectCustLoanListStatement, selectedCustomerParam,function(tx,res){
                var len = res.rows.length;
                //alert(len);
                if(len==0){
                    console.log(len);
                }
                if(len > 0){
                    console.log(JSON.stringify(res));
                    for(i=0;i<len;i++){
                        idCounter = i;
                        selectedCustDetails.renderSelectedCustLoanList(len,JSON.stringify(res.rows.item(i)));
                        console.log(JSON.stringify(res.rows.item(i)));
                    }
                    selectedCustDetails.renderTotalDues();
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
        $('ul.cust').append('<li class="cust ui-li-static ui-body-inherit ui-first-child ui-last-child"><div class="cust-header"><span class="fullName">'+fullName+'</span><span class="performanceIndicator"></span><br><span class="custNumber">'+listItem.CustomerNumber+'</span></div></li>');
        
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
        
        loanItem = JSON.parse(res);
        console.log(loanItem.AgreementNumber);
        
        folioNo = loanItem.AgreementNumber;
        tenure = loanItem.Instalments;
        esb = common.convertToAmount(loanItem.SettlementAmount);
        termAmt = common.convertToAmount(loanItem.Terms);
        arrearsVal = common.convertToAmount(loanItem.Arrears);
        
        // arrears - checking for negative value
        if(arrearsVal < 0){
            arrears = Math.abs(arrearsVal)+" Cr";
        }
        else{
            arrears = arrearsVal;
        }
        
        // create a listItem
        $('ul.ul-loanList').append('<li data-theme="d" class="ui-li-static ui-body-d" id="list'+idCounter+'"></li>');
        // add folio and tenure
        $('li#list'+idCounter).append('<div class="loanlist-folio">\n\
                                            <span class="folio" onclick=selectedCustDetails.forwardFolio("'+folioNo+'")>Folio No. <strong>'+folioNo+'</strong></span>\n\
                                            <span class="tenure"><strong>'+tenure+' WK</strong></span>\n\
                                      </div>');
        // add payment header
        $('li#list'+idCounter).append('<div class="loanlist-payment"><span>Payment</span></div>');
        // add term amount
        $('li#list'+idCounter).append('<div class="input-group">\n\
                                            <span class="input-left">£</span>\n\
                                            <div class="ui-select">\n\
                                                <div id="select-money-button" class="ui-btn ui-icon-carat-d ui-btn-icon-right ui-shadow">\n\
                                                    <select id="select-money'+idCounter+'" class="payment-cmbbox" onblur="selectCopy('+idCounter+')" data-corners="false">\n\
                                                        <option value="Term '+termAmt+'">Term '+termAmt+'</option>\n\
                                                        <option value="Not Due">Not Due</option>\n\
                                                    </select>\n\
                                                </div>\n\
                                            </div>\n\
                                            <div class="ui-input-text ui-body-c ui-corner-all ui-shadow-inset">\n\
                                                <input id="setAmount'+idCounter+'" class="actualPay" type="text" data-theme="c" onchange="inputModify('+idCounter+')" onkeyup="manualAddAmt()" onclick="clearTextField('+idCounter+')">\n\
                                            </div>\n\
                                     </div>');
        //add arrears and esb
        $('li#list'+idCounter).append('<div class="loanlist-arrears-esb">\n\
                                        <span class="arrears">Arrears &pound;'+arrears+'</span>\n\
                                        <span class="esb" onclick="copyEsb('+esb+','+idCounter+')">ESB &pound;'+esb+'</span>\n\
                                     </div>');
        
        $('#setAmount'+idCounter).val("Term "+termAmt);
        //dropdownHide(idCounter);
        
    },
    
    /***************************************render total dues in loanlist************************************************/
    renderTotalDues:function(){
        
        $('ul.ul-loanList').append('<li data-theme="f" class="ui-li-static ui-body-f ui-last-child" id="listPaymentDues"></li>');
        $('li#listPaymentDues').append('<span class="totalColl">Total payment Due</span><span class="total"></span>');
        
    },
    
    /***************************************adding buttons to loan list************************************************/
    addLoanListButtons:function(){
        
        $('div#pageone').append('<div class="custFooter ui-footer ui-bar-inherit ui-footer-fixed slideup" data-role="footer" data-position="fixed" role="contentinfo">\n\
                                    <div class="footer-btngroup">\n\
                                        <div class="footer-btn-group btn-group-justified" role="group" aria-label="..." style="">\n\
                                            <div id="footer-dashBtn1">\n\
                                                <button type="button" data-mini="true" id="paymentRequest" data-theme="a" class="btn btn-sucess ui-btn ui-btn-a ui-shadow ui-corner-all ui-mini">Save</button>\n\
                                            </div>\n\
                                        </div>\n\
                                        <div class="footer-btn-group btn-group-justified" role="group" aria-label="..." style="">\n\
                                            <div id="footer-dashBtn2">\n\
                                                <button type="button" data-mini="true" data-theme="a" class="btn btn-sucess ui-btn ui-btn-a ui-shadow ui-corner-all ui-mini">Call Outcome</button>\n\
                                            </div>\n\
                                        </div>\n\
                                    </div>\n\
                                </div>');
    },
    
    forwardFolio:function(folioNumber){
        dataStorage.setData(SELECTED_AGREEMENT_NUM,folioNumber);
        common.redirect("loanDetails.html");
    }
     
};

/***************************************functions to find total dues and manipulate inputs************************************************/

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
    $("#select-money"+n+" option:first").prop('selected', true);

};

//clear textbox on its click; and reset dropdown
function clearTextField(n){
    $('#setAmount'+n).val('');
    $('#select-money'+n).val([]);
    $("#select-money"+n+" option:first").prop('selected', true);
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
     $("#select-money"+n+" option:first").prop('selected', true);
     $('span.totalColl').text("Total Payment Collected");
    calcAmts();
    //dropdownHide(n);
};

//manually add amount and calculate total dues
function manualAddAmt(){
    $('span.totalColl').text("Total Payment Collected");
    calcAmts();
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
                sum += parseFloat(m);
            }
        }else{
            sum += parseFloat(m);
        }  
    }
});
    $("span.total").html("&pound;"+sum);
};




/***************************************actions to perform on document ready************************************************/
$(document).on('ready',function(){
    //calling functions
    selectedCustDetails.getCustDetailFromOfflineDB();
    
    $('h5.ui-collapsible-heading').on('click',function(){
                    if($('div.loanList').children().hasClass('ui-collapsible-heading-collapsed')){    
                        $('.custFooter').hide();
                    }
                    else{
                        $('.custFooter').show();
                    }
    });
   
  
});

