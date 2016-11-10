var idCounter;
var deviceType;
var visitID;
var customerID;
var totalPaidAmt;
var checkforNotSeen;
var journeyId = dataStorage.getData(JOURNEY_ID);
var visitDate = dataStorage.getData(SELECTED_VISIT_DATE);
var isprimaryJourney = dataStorage.getData(IS_SELECTED_JOURNEY_PRIMARY);
var hashMap = new HashMap();
var agrModeHashMap = new HashMap();
var prevAmtHashMap = new HashMap();
var selectedUserId = dataStorage.getData(USER_ID);
var collectionDay;
var collectionDayDB;
var newjourneyOrderBy;
var mobileNumber;
var phoneNumber;
var emailID;
var addressLine1="";
var addressLine2="";
var addressLine3="";
var addressLine4="";
var city;
var postCode;
var newjourneyOrderBy;
var syncValue;
var updatedDate;
var editMode =false;
var listItem=[];
var hashMap1 = new HashMap();
var newCollectionDay;
var customerDetailsValidation = 1;
var updateCustAlerts = "";
var zeroPhFlag=0;
var digitPhFlag=0;
var zeroMbFlag =0;
var digitMbFlag = 0;
var flagCustDetailsSaved = 0;
var ignoreEsbExceedFlag = Array();
var isNegativeEsb = false;
var refundLoansCount = 0;
var loansCount = 0;
var isNegativeEsbPresent = false;
var isNoRefundSelected = false;
var weekStartDate = dataStorage.getData(WEEK_START_DATE);
var weekEndDate = dataStorage.getData(WEEK_END_DATE);
var manualAddAmtVar = 0;
var selectCopyVar = 0;
var selectedCustDetails = {
    /***************************************retrieving the customer details from offline DB************************************************/
    getCustDetailFromOfflineDB: function(){
        
        var dbObj = dataStorage.initializeDB();
        var selectedCustomerParam = [dataStorage.getData(SELECTED_CUSTOMER_NUM)];
        var selectedCustomerLoanListParam = [weekStartDate, weekEndDate, dataStorage.getData(SELECTED_CUSTOMER_NUM)];
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
            tx.executeSql(dbQueries.selectCustLoanListStatement, selectedCustomerLoanListParam,function(tx,res){
                var len = res.rows.length;
                //alert(len);
                if(len==0){
                    console.log(len);
                }
                if(len > 0){
					loansCount = len;
					console.log("Length of loan List"+len);
                    console.log(JSON.stringify(res));
                    for(i=0;i<len;i++){
						var esb = res.rows.item(i)["SettlementAmount"];
						if(esb < 0){
							refundLoansCount++;
							isNegativeEsbPresent = true;
						}
                        idCounter = i;
                        selectedCustDetails.renderSelectedCustLoanList(len,JSON.stringify(res.rows.item(i)));
                        console.log(JSON.stringify(res.rows.item(i)));
                    }
                    
                    if(len>1){
                        // add one more blank listItem
                        $('ul.ul-loanList').append('<li data-theme="d" class="ui-li-static ui-body-d" id="list'+idCounter+1+'"></li>');
                        $('li#list'+idCounter+1).append('<div style="height:50px; clear:both;"></div>');
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
       
        listItem=JSON.parse(res);
        var fullName="";
        var address="";
        /*var addressLine1="";
        var addressLine2="";
        var addressLine3="";
        var addressLine4="";*/
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
        $('ul.custPersonalDetails').append('<li id="mainElementList" data-theme="d" data-icon="false" class="contactMain ui-li-static ui-body-d ui-first-child"><h2>Contact</h2>');
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
            $('ul.custPersonalDetails').append('<li data-theme="d" data-icon="false" class="ui-li-static ui-body-d"><h2>Address</h2><div class="address editChangeAddress"><div contenteditable="false" class="addr ui-input-text ui-shadow-inset ui-body-inherit ui-corner-all ui-textinput-autogrow">'+address+'</div></div><span class="addressIcon" id="editLocationIcon"><img src="css\\themes\\images\\icons-png\\location-icon.png"></span></div></li>');

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
			collectionDayDB = listItem.CollectionDay;
            //var val = "";
            switch(day){
                case "day1":
                    collectionDay = collectDay.DAY1;
                    break;
                case "day2":
                    collectionDay = collectDay.DAY2;
                    break;
                case "day3":
                    collectionDay = collectDay.DAY3;
                    break;
                case "day4":
                    collectionDay = collectDay.DAY4;
                    break;
                case "day5":
                    collectionDay = collectDay.DAY5;
                    break;
                case "day6":
                    collectionDay = collectDay.DAY6;
                    break;
                case "day7":
                    collectionDay = collectDay.DAY7;
                    break;
                default:
                    break;
            }
            $('#weekday-button>span').text(collectionDay);
            
            //for journey order
            $('li.collectionInfo').append('<div class="journey-info"><h2>Journey Order No.</h2><div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset"><input id="journeyOrder" type="number" inputmode="numeric" pattern="[0-9]*" class="journey-text" value='+listItem.JourneyOrderBy+' readonly></div></div></li>');
            
            
        // adding edit button
        $('ul.custPersonalDetails').append('<li data-theme="d" class="ui-li-static ui-body-d ui-last-child"><div id="replaceButton" class="btngroup"><div class="btn-group btn-group-justified" role="group" aria-label="..." style=""><div id="dashBtnEdit"><button data-mini="true" id="editRequest" data-theme="a" type="button" class="btn btn-sucess ui-btn ui-btn-a ui-shadow ui-corner-all ui-mini">Edit</button></div></div></div></li>');
		
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
			ignoreEsbExceedFlag[idCounter] = 0;
        
        loanItem = JSON.parse(res);
        console.log(loanItem.AgreementNumber);
		customerID = loanItem.CustomerID;
        console.log("Loan Agreement ID "+loanItem.AgreementID);
		console.log("Loan Customer ID "+loanItem.CustomerID);
		
		//hashMap.set(idCounter,loanItem.AgreementID);
			
        folioNo = loanItem.AgreementNumber;
        tenure = loanItem.Instalments;
        esb = common.convertToAmount(loanItem.SettlementAmount);
        termAmt = common.convertToAmount(loanItem.Terms);
        arrearsVal = common.convertToAmount(loanItem.Arrears);
		balance = common.convertToAmount(loanItem.Balance);
		rebate = common.convertToAmount(loanItem.SettlementRebate);
		
		if(esb < 0){
			agrRefundMode = 'R'
				agrModeHashMap.set(loanItem.AgreementID,agrRefundMode);	
		}
		else{
			agrRefundMode = ''
		}
		hashMap.set(idCounter,loanItem.AgreementID);
		
		
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
                                            <span class="tenure"><strong></strong></span>\n\
                                      </div>');
    	// add payment header
        if(esb < 0){
            $('li#list'+idCounter).append('<div class="loanlist-payment"><span>Refund</span></div>');
        }
        else{
        	$('li#list'+idCounter).append('<div class="loanlist-payment"><span>Payment</span></div>');
        }
        
        // add term amount
        $('li#list'+idCounter).append('<div class="input-group">\n\
                                            <span class="input-left">&pound;</span>\n\
                                            <div class="ui-select">\n\
                                                <div id="select-money-button'+idCounter+'" class="ui-btn ui-icon-carat-d ui-btn-icon-right ui-shadow">');
		if(esb < 0){
			$('div#select-money-button'+idCounter).append('<select id="select-money'+idCounter+'" class="payment-cmbbox" data-corners="false">\n\
        			<option id="firstOption'+idCounter+'" value="Refund '+parseFloat(Math.abs(esb)).toFixed(2)+'">Refund '+parseFloat(Math.abs(esb)).toFixed(2)+'</option>\n\
					<option id="secondOption'+idCounter+'" value="No Refund">No Refund</option>\n\
					</select>\n\
                        </div>\n\
                    </div>\n\
                    <div class="ui-input-text ui-body-c ui-corner-all ui-shadow-inset">\n\
                                <input id="setAmount'+idCounter+'" readonly="readonly" class="actualPay" type="text" data-theme="c")>\n\
                    </div>\n\
             	</div>');
        	//isNegativeEsb = true;
		}
		else{
				$('div#select-money-button'+idCounter).append('<select id="select-money'+idCounter+'" class="payment-cmbbox" data-corners="false">\n\
                                                        <option id="firstOption'+idCounter+'" value="Term '+termAmt+'">Term '+termAmt+'</option>\n\
                                                        <option id="secondOption'+idCounter+'" value="Not Due">Not Due</option>\n\
                                                    </select>\n\
                                                </div>\n\
                                            </div>\n\
                                            <div class="ui-input-text ui-body-c ui-corner-all ui-shadow-inset">\n\
                                                        <input id="setAmount'+idCounter+'" class="actualPay" type="number" inputmode="numeric" step="0.01"  data-theme="c" onchange="inputModify('+idCounter+')" onkeyup="manualAddAmt('+idCounter+')" onblur="updateFloatAmount('+idCounter+')" onclick="clearTextField('+idCounter+')" onkeypress="return validateFloatKeyPress(this,event,'+idCounter+')">\n\
                                            </div>\n\
                                     </div>');
        	//isNegativeEsb = false;
		}
        //Display payment frequency
        if(loanItem.PaymentFrequencyID == 2){
            $('li#list'+idCounter+' span.tenure strong').html(+tenure+" "+paymentFreq.Fortnightly);
        }
        else if(loanItem.PaymentFrequencyID == 3){
            $('li#list'+idCounter+' span.tenure strong').html(+tenure+" "+paymentFreq.Monthly);
        }
        else if(loanItem.PaymentFrequencyID == 1){
			if(esb > 0){
            // If Weekly Loan, then hide Not Due (Validation)
            $('li#list'+idCounter+' span.tenure strong').html(+tenure+" "+paymentFreq.Weekly);
            $("#secondOption"+idCounter).remove();
        }
        }
        
        //add arrears and esb
        $('li#list'+idCounter).append('<div class="loanlist-arrears-esb">\n\
                                        <span class="arrears">Arrears &pound;'+arrears+'</span>\n\
                                        <span class="esb" onclick="callPopup('+idCounter+','+esb+')" id="esbAmt'+idCounter+'">ESB &pound;'+esb+'</span>\n\
                                     </div>');
        
        $('#setAmount'+idCounter).attr("type", 'text');
        $('#setAmount'+idCounter).prop("type", 'text');
		if(esb < 0){
			$('#setAmount'+idCounter).val("Refund "+parseFloat(Math.abs(esb)).toFixed(2));
		}
		else{
        $('#setAmount'+idCounter).val("Term "+termAmt);
		}
		
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
        prevAmtHashMap.set(loanItem.AgreementID,loanItem.AmountPaid);
        stateCheck(idCounter, loanItem.AmountPaid, loanItem.AgreementID, loanItem.Terms);
    },
                   
    renderESBPopUp: function(data,i){
	    folioData = JSON.parse(data);  
				
         $('ul#callESBList').append('<li data-theme="a" class="ui-li-static ui-body-d" id="esblist"></li>');
		
		
        $('li#esblist').append('<li class="esblist-popup-foliono">\n\
        									<span>Folio Number<span class="tenure"><strong>'+folioData.AgreementNumber+'</strong></span></span>\n\
                                            </li>');
		
        $('li#esblist').append('<li class="esblist-popup">\n\
                                            <span class="loanlist-folio">Weekly Term Amount</span><span class="tenure"><strong>&pound;'+common.convertToAmount(folioData.Terms)+'</strong></span></span>\n\
                                            </li>');
        
        $('li#esblist').append('<li class="esblist-popup-up">\n\
                                            <span class="loanlist-folio">Balance</span><span class="tenure"><strong>&pound;'+common.convertToAmount(folioData.Balance)+'<strong></span></span>\n\
                                            </li>');
        
        $('li#esblist').append('<hr><li class="esblist-popup-low">\n\
                                            <span class="loanlist-folio">Balance</span><span class="plussymbol">&#43;</span><div class="amountValue"><span class="tenure"><strong>&pound;'+common.convertToAmount(folioData.Balance)+'<strong></span></div></span>\n\
                                            </li>');
        
        $('li#esblist').append('<li class="esblist-popup">\n\
                                            <span class="loanlist-folio">Rebate</span><span class=minussymbol>&#45;</span><div class="amountValue"><span class="tenure"><strong> &pound;'+common.convertToAmount(folioData.SettlementRebate)+'</strong></span></div></span>\n\
                                            </li>');	
        $('li#esblist').append('<li class="esblist-popup esbAmt">\n\
                                            <span class="loanlist-folio">ESB</span><span class="tenure"> <strong>&pound;'+common.convertToAmount(folioData.SettlementAmount)+'</strong></span></span>\n\
                                            </li>');
											
        $('li#esblist').append('<li class="esblist-popup">\n\
        									<div class="checkbox-input"><input type="checkbox" name="checkbox-0" id="checkbox1"><label for="checkbox1" id="chkboxlabel"></label></div>\n\
                							<div class="checkbox-label">Re-Loaned</div>\n\
                                            </li>');	
											
											
         $('li#esblist').append('<li class="msg"><div class="imagemsg">\n\
                                            <img src="css/themes/images/icons-png/note-icon.png" class="note"/><label class="esb-msg"> ESB includes current weeks terms of &pound;'+parseFloat(folioData.Terms).toFixed(0)+'</label>\n\
                                            </div></li>');	
											
									
											
        $('li#esblist').append('<li class="esblist-popup-button"><div class="ui-grid-b">\n\
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
                                                <button type="button" data-mini="true" id="save" data-theme="a" class="btn btn-sucess ui-btn ui-btn-a ui-shadow ui-corner-all ui-mini">Save</button>\n\
                                            </div>\n\
                                        </div>\n\
                                        <div class="footer-btn-group btn-group-justified" role="group" aria-label="..." style="">\n\
                                            <div id="footer-dashBtn2">\n\
                                                <button type="button" data-mini="true" data-rel="popup" data-position-to="window" data-theme="a" class="btn btn-sucess ui-btn ui-btn-a ui-shadow ui-corner-all ui-mini" id="callOutcome">Call Outcome</button>\n\
                                            </div>\n\
                                        </div>\n\
                                    </div>\n\
                                </div>');
        
        //If payment is made, change 'Total Payment Due' to 'Total Payment Collected'
        if(checkforNotSeen == 1){
            $('span.totalColl').text("Total Payment Collected");
        }
    },
    
    forwardFolio:function(folioNumber){
        dataStorage.setData(SELECTED_AGREEMENT_NUM,folioNumber);
        flagCustDetailsSaved = "0"; 
        dataStorage.setData(CUST_DETAILS_AFTER_SAVE, flagCustDetailsSaved);
        common.redirect("loanDetails.html");
    }
     
};


//Edit Payment - Check if payment is done and display values accordingly in the loan list payment textbox
function stateCheck(n,amtpaid, agreementID, termAmt){
    
    if(totalPaidAmt){
            if(amtpaid){
                var dbObj = dataStorage.initializeDB();
                dbObj.transaction(function(tx){
                    tx.executeSql(dbQueries.selectAgreementModeStatement, [agreementID], function(tx,res){
                        var agreementMode = res.rows.item(0)["AgreementMode"];
						var agreementAmountPaid = res.rows.item(0)["AgreementAmountPaid"];
                        if(agreementMode === "N"){
                            $("#setAmount"+n).val("Not Due");
                            $("#select-money"+n+" option:eq(1)").prop('selected', true);
                            calcAmts();
                        }
						else if(agreementMode === "R" && agreementAmountPaid == 0){
                            $("#setAmount"+n).val("No Refund");
                            $("#select-money"+n+" option:eq(1)").prop('selected', true);
                            calcAmts();
                        }
						else if(agreementMode === "R" && agreementAmountPaid != 0){
							$("#setAmount"+n).val(amtpaid);
                            $("#select-money"+n+" option:eq(0)").prop('selected', true);
                            calcAmts();
                        }
						else if(agreementMode === "T" && (parseFloat(agreementAmountPaid).toFixed(2)) == (parseFloat(termAmt).toFixed(2))){
							$("#setAmount"+n).val(amtpaid);
                            $("#select-money"+n+" option:eq(0)").prop('selected', true);
                            calcAmts();
                        }
                        else{
                            $("#setAmount"+n).val(amtpaid);
                            $('#select-money'+n).val([]);
                            calcAmts();
                            if(amtpaid > $('#esbAmt'+n).text().substr(5, $('#esbAmt'+n).text().length)){
                                ignoreEsbExceedFlag[n] = 1;
                            }
                        }
                    });
                });

				if(amtpaid == $('#esbAmt'+n).text().substr(5, $('#esbAmt'+n).text().length)){
					$("#setAmount"+n).data('flag','copied');
				}
                checkforNotSeen = 1;
            }
            else{
                checkforNotSeen = 0;
            }
            	/*setTimeout(function(){
                	if(totalPaidAmt){
                	$("span.total").html("&pound;"+parseFloat(totalPaidAmt).toFixed(2));
                }
            },10);*/
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
	selectCopyVar = 1;
    var a=$("#select-money"+n).val();
    if(a == "No Refund"){
    	isNoRefundSelected = true;
    }
    else{
    	isNoRefundSelected = false;
    }
    $("#setAmount"+n).val(a);
    //$('span.totalColl').text("Total Payment Collected");
    calcAmts();
    //dropdownHide(n);
};


//reset dropdown when textbox value modified
function inputModify(n){
    $('#setAmount'+n).attr("type", 'text');
    $('#setAmount'+n).prop("type", 'text');

    $('#select-money'+n).val([]);
};

//clear textbox on its click; and reset dropdown
function clearTextField(n){
    $('#setAmount'+n).attr("type", 'number');
    $('#setAmount'+n).prop("type", 'number');
    $('#setAmount'+n).val('');
    $('#select-money'+n).val([]);
    
    //$('span.totalColl').text("Total Payment Collected");
    calcAmts();
};

//copy ESB to inputbox and calculate total dues; and reset dropdown
function copyEsb(e,n){
    $("#setAmount"+n).val(parseFloat(e).toFixed(2));
     //$('#select-money'+n).val('');
     $('#select-money'+n).val([]);
     //$("#select-money"+n+" option:first").prop('selected', true);
     $("#setAmount"+n).data('flag','copied');
     //$('span.totalColl').text("Total Payment Collected");
    calcAmts();
    //dropdownHide(n);
};

//manually add amount and calculate total dues
function manualAddAmt(n){
	manualAddAmtVar = 1;
    //$('span.totalColl').text("Total Payment Collected");
    calcAmts();
};

function callPopup(n,esb){
	if(esb < 0){
		common.alertMessage(messageboxCustomerDetailsPage.validateNegativeEsb,callbackReturn,messageboxError.messageTitleError);
	}
	else{
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
	}
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
				if(m.substring(0,6)=="Refund"){	
					m = m.substring(7);
					sum = parseFloat(sum) + parseFloat(-m);
				}
			}else{
				sum = parseFloat(sum) + parseFloat(m);
			}  
		}
	});
	if(refundLoansCount == loansCount && sum == 0){
		$('span.totalColl').text("Total Refund Paid");
	}
	else if((checkforNotSeen == 1 && sum >= 0) || (manualAddAmtVar == 1 && sum >= 0) || (selectCopyVar == 1 && sum >= 0)){
		$('span.totalColl').text("Total Payment Collected");
    }
	else if((checkforNotSeen == 1 && sum < 0) || (manualAddAmtVar == 1 && sum < 0) || (selectCopyVar == 1 && sum < 0)){
		$('span.totalColl').text("Total Refund Paid");
	}
	else if(checkforNotSeen != 1 && sum < 0){
		$('span.totalColl').text("Total Refund Due");
	}
	else if(checkforNotSeen != 1 && sum >= 0){
		$('span.totalColl').text("Total Payment Due");
	}
    $("span.total").html("&pound;"+parseFloat(sum).toFixed(2));
};

function success(){
                //message = "Transaction saved successfully!";
		common.alertMessage(messageboxSaveTransaction.messageSaveSuccess,callbackReturn,messageboxCommonMessages.messageTitleSuccess);
                flagCustDetailsSaved = "0"; 
                dataStorage.setData(CUST_DETAILS_AFTER_SAVE, flagCustDetailsSaved);
		common.redirect('scheduledCustomers.html');
};


function saveCustomerDetails(){
  updateCustAlerts = "";
  editMode =false;
   mobileNumber = document.getElementById("rmvMobileClass").value;
   phoneNumber ="";
    if(document.getElementById("rmvPhoneClass") !="" && document.getElementById("rmvPhoneClass") != undefined && document.getElementById("rmvPhoneClass") != null)
	{
		phoneNumber = document.getElementById("rmvPhoneClass").value;
	}
   emailID = document.getElementById("emailID").value;
  validateForm();
   addressLine1 = document.getElementById("addressline1").value;
  //alert(addressLine1);
   addressLine2 = document.getElementById("addressline2").value;
  //alert(addressLine2);
   addressLine3 = document.getElementById("addressline3").value;
  //alert(addressLine3);
   addressLine4 = document.getElementById("addressline4").value;
  //alert(addressLine4);
   city = document.getElementById("editCity").value;
  //alert(city);
   postCode = document.getElementById("editPostcode").value;
  //alert(postCode);
  newjourneyOrderBy = document.getElementById("journeyOrder").value;
  //alert(newjourneyOrderBy);
   updatedDate = saveTransaction.generateResultDate();
 //alert(updatedDate);
   syncValue = 0;
 //Function call for 11 digit
   validateElevenDigit();
   validateTwelveDigit();
  
//Mandatory check
  var checkForEmptyFields = '';
  if (addressLine1 === ''){
	checkForEmptyFields = checkForEmptyFields + "AddressLine1, ";
  }
   if (city === ''){
   checkForEmptyFields = checkForEmptyFields + "City, ";
  } 
   if (postCode === ''){
   checkForEmptyFields = checkForEmptyFields + "PostCode, ";
  }
   if (newjourneyOrderBy === ''){
   checkForEmptyFields = checkForEmptyFields + "Journey Order No, ";
  }
  
  if(checkForEmptyFields != ''){
	  updateCustAlerts = updateCustAlerts + "Following information is mandatory -"+checkForEmptyFields.substr(0, (checkForEmptyFields.length - 2))+"\n";
	  //alert("Please enter "+checkForEmptyFields.substr(0, (checkForEmptyFields.length - 2)));
  customerDetailsValidation = 0;
  }
  
  var intNewJourneyOrderBy = parseInt(newjourneyOrderBy);
  var visitDate = dataStorage.getData(SELECTED_VISIT_DATE);  
    var dbObj = dataStorage.initializeDB();
      	dbObj.transaction(
      			function(tx){
                              tx.executeSql(dbQueries.selectJourneyStatement,[journeyId],function(tx, res){
                                  
      					minJourney = res.rows.item(0)["MIN(JourneyOrderBy)"];
  						//alert("minJourney :"+minJourney);
  						maxJourney = res.rows.item(0)["MAX(JourneyOrderBy)"];
  						//alert("maxJourney : "+maxJourney);
  						if(intNewJourneyOrderBy >= minJourney && intNewJourneyOrderBy <= maxJourney){
                             customerDetailsValidation = 1;
                        }
                        else{
                        	if($('#journeyOrder').val() !== ""){
                                updateCustAlerts = updateCustAlerts + "Journey order must be between "+minJourney+" and "+maxJourney+".\n";
                                customerDetailsValidation = 0;
                            }
                            else{
                                return;
                            }
                        }
                        });
                });
    setTimeout(function(){
    if(updateCustAlerts != ""){
        common.alertMessage(updateCustAlerts, callbackReturn, messageboxCustomerDetailsPage.messageTitleWarning);
    }
    else{
         if(customerDetailsValidation !==0 ){
               checkJourneyCollectionDataInOffline(newjourneyOrderBy,visitDate,journeyId,mobileNumber,phoneNumber,emailID,addressLine1,addressLine2,addressLine3,addressLine4,city,postCode,syncValue,updatedDate);
          }
    }
    },300);
  }
  
  
    /********************************Journey collection data check************************/
    	function checkJourneyCollectionDataInOffline(newjourneyOrderBy,visitDate,journeyId,mobileNumber,phoneNumber,emailID,addressLine1,addressLine2,addressLine3,addressLine4,city,postCode,syncValue,updatedDate){ 
    	console.log("init");
		//alert("function2 validation");
    	var dbObj = dataStorage.initializeDB();
    	dbObj.transaction(
    			function(tx){
    				tx.executeSql(dbQueries.selectJourneyCollectionStatement,[journeyId],function(tx, res){
						
						var len = res.rows.length;
						console.log("res.rows.length: "+len);
						
						var intNewJourneyOrderBy = parseInt(newjourneyOrderBy);
						
						for(i=0;i<len;i++){
							var visitDate = res.rows.item(i)["VisitDate"];
							minJourneyCollection = res.rows.item(i)["MIN"];
							//alert("minJourney :"+minJourneyCollection);
							maxJourneyCollection = res.rows.item(i)["MAX"];
							//alert("maxJourney : "+maxJourneyCollection);
							var collectionDay = res.rows.item(i)["CollectionDay"];
							var hashMap2 = new HashMap();
							
							hashMap2.set("MIN",minJourneyCollection);
							hashMap2.set("MAX",maxJourneyCollection);
							hashMap2.set("VisitDate",visitDate);
							hashMap2.set("VisitDate",visitDate);
							hashMap2.set("CollectionDay",collectionDay);
							//console.log("hashMap1:"+hashMap1.get(visitDate));	
							
							hashMap1.set(visitDate,hashMap2);
						}	
						hashMap1.forEach(function(value, key) {
							  console.log(key + " : " + value);
							  var second = value;
							  var min = second.get("MIN");
							  var max = second.get("MAX");
							  if(intNewJourneyOrderBy>=min && intNewJourneyOrderBy<=max){
                                                                                                                              
								newCollectionDay = second.get("CollectionDay");
								
							  }
                             else if(max<intNewJourneyOrderBy)
							{
                              newCollectionDay = second.get("CollectionDay");   
							 
							}
							  
							  
						  });

						if(newCollectionDay!=listItem.CollectionDay){
								 switch(newCollectionDay){
								  	case "1":
								  		newCollectionDay = collectDay.DAY1;
								  		break;
								  	case "2":
								  		newCollectionDay = collectDay.DAY2;
								  		break;
								  	case "3":
								  		newCollectionDay = collectDay.DAY3;
								  		break;
								  	case "4":
								  		newCollectionDay = collectDay.DAY4;
								  		break;
								  	case "5":
								  		newCollectionDay = collectDay.DAY5;
								  		break;
								  	case "6":
								  		newCollectionDay = collectDay.DAY6;
								  		break;
								  	case "7":
								  		newCollectionDay = collectDay.DAY7;
								  		break;
								  }
								 var message = "New collection day is "+newCollectionDay+". Continue?";
								
								 common.confirmMessage(message,confirmCallbackSaveDetails,
		                                    messageboxCustomerDetailsPage.messageTitleConfirm);
							 }
							else
								{
								var inputparam = [customerID,journeyId,mobileNumber,phoneNumber,emailID,addressLine1,addressLine2,addressLine3,addressLine4,city,postCode,newCollectionDay,newjourneyOrderBy,syncValue,updatedDate];

								 
								//creating updateinputparam
								var updateinputparam = [mobileNumber,phoneNumber,emailID,addressLine1,addressLine2,addressLine3,addressLine4,postCode,city,customerID];						
								 if(customerDetailsValidation !==0){
								 saveToDatabase(inputparam,updateinputparam);}
								
								}
							 switch(newCollectionDay){
								  	case "Monday":
								  		newCollectionDay = collectDate.Monday;
								  		break;
								  	case "Tuesday":
								  		newCollectionDay = collectDate.Tuesday;
								  		break;
								  	case "Wednesday":
								  		newCollectionDay = collectDate.Wednesday;
								  		break;
								  	case "Thursday":
								  		newCollectionDay = collectDate.Thursday;
								  		break;
								  	case "Friday":
								  		newCollectionDay = collectDate.Friday;
								  		break;
								  	case "Saturday":
								  		newCollectionDay = collectDate.Saturday;
								  		break;
								  	case "Sunday":
								  		newCollectionDay = collectDate.Sunday;
								  		break;
								  }
						   
                        
 
 //creating inputparam
 /*var inputparam = [customerID,journeyId,mobileNumber,phoneNumber,emailID,addressLine1,addressLine2,addressLine3,addressLine4,city,postCode,newCollectionDay,newjourneyOrderBy,syncValue,updatedDate];

 
//creating updateinputparam
var updateinputparam = [mobileNumber,phoneNumber,emailID,addressLine1,addressLine2,addressLine3,addressLine4,postCode,city,customerID];						
 if(customerDetailsValidation !==0){
 saveToDatabase(inputparam,updateinputparam);}*/
    				});
    			});
  }
  
/**********************insert data into offline DB***********************/
function saveToDatabase(inputData,updateinputparam){
                console.log("Saving...");
                
                                var dbObj = dataStorage.initializeDB();
                                                dbObj.transaction(function insertCustomerDetailsRecords(tx){
                                                                                tx.executeSql(dbQueries.insertIntoCustomerUpdateTableStatement, inputData);
                                                },function errorInsert(){                    
												
												},function successInsert(){
												
												// saveToUpdateDatabase(inputData);
												 
                
												saveToUpdateDatabase(updateinputparam);
 

												 
												});
                
 }

function saveToUpdateDatabase(inputUpdateData){
                console.log("Updating...");
                
                                var dbObj = dataStorage.initializeDB();
                                                dbObj.transaction(function updateCustomerDetailsRecords(tx){
                                                                                tx.executeSql(dbQueries.updateIntoCustomerTableStatement,inputUpdateData);
                                                },function error(){console.log("update error");
												},function success(){
												console.log("updated");	
												//alert("Changes saved successfully");
												 common.alertMessage(messageboxCustomerDetailsPage.saveChanges, callbackReturn, messageboxCommonMessages.messageTitleSuccess);
                                                                                                flagCustDetailsSaved = "1"; 
                                                                                                dataStorage.setData(CUST_DETAILS_AFTER_SAVE, flagCustDetailsSaved);
												 common.redirect("customerDetails.html");
												});                                         
    }
  

function updateFloatAmount(n){
               
    $('#setAmount'+n).attr("type", 'text');
    $('#setAmount'+n).prop("type", 'text');                 
    var amount = $('#setAmount'+n).val();
     
     if(amount==""){                                
        $('#setAmount'+n).val("0.00");
     }else{
         $('#setAmount'+n).val(parseFloat(amount).toFixed(2));
     }
};

//numeric validations for payment text box
function validateFloatKeyPress(el, evt, n) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    var number = el.value.split('.');

    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
         return false;
     }
        
     //just one dot
     if(number.length>1 && charCode == 46){
          return false;
      }
      
     var currentChar = parseFloat(String.fromCharCode(charCode), 10);
     var nextValue = $('#setAmount'+n).val() + currentChar;
      //Check length after 2 decimal point  
      if(nextValue.indexOf('.')!=-1){         
       if(nextValue.split(".")[1].length > 2){                
                 return false;
           }
       }  
              
    return true;
};

function validateBeforeSave(){
    var folioMoreThanEsb = "";
    var folioEqualToEsb = "";
    var folioMoreThanTerm = "";
    
    prevAmtHashMap.forEach(function(value, key) {
				console.log(key + " : " + value);
			});
			
	
	// This Code checks if user has edited payment
		var amtNotChanged = 0;
		for(var i=0;i<hashMap.count();i++)
		{
			var AgreementId = hashMap.get(i);
			var AgreementAmtPaid = $('#setAmount'+i+'').val();
			if(isNaN(AgreementAmtPaid))
			{
				if(AgreementAmtPaid.substring(0,4)=="Term"){
					AgreementAmtPaid = AgreementAmtPaid.substring(5);
				}
				else if(AgreementAmtPaid == "Not Due"){
					AgreementAmtPaid = 0;
				}
				else if(AgreementAmtPaid.substring(0,6)=="Refund"){
					AgreementAmtPaid = -(AgreementAmtPaid.substring(7));
				}
				else if(AgreementAmtPaid == "No Refund"){
					AgreementAmtPaid = 0;
				}
			}
			var prevPaidAmt = prevAmtHashMap.get(AgreementId);
			if(prevPaidAmt != null)
			{
				if(prevPaidAmt == "Not Due")
				{
					prevPaidAmt = 0;
				var diffPaidAmt = parseFloat(AgreementAmtPaid) - parseFloat(prevPaidAmt);
				if(diffPaidAmt === 0)
					{
						amtNotChanged++;
					}
				}
				else
				{
					var diffPaidAmt = parseFloat(AgreementAmtPaid) - parseFloat(prevPaidAmt);
					if(diffPaidAmt === 0)
					{
					amtNotChanged++;
			        }
		        }
			}
			/*if(AgreementAmtPaid < 0){
				//common.alertMessage(messageboxCustomerDetailsPage.validateNegativeEsb,callbackReturn,messageboxError.messageTitleError);
				isNegativeEsb = true;
			}
			else{
				isNegativeEsb = false;
			}*/
		}
		
		
		if(amtNotChanged === hashMap.count())
		{
			//alert("None of Agreement Amount Changed");
			//message = "There are no changes to save";
			common.alertMessage(messageboxSaveTransaction.messageNoChanges,callbackReturn,messageboxCommonMessages.messageTitleSuccess);
			$('#save').removeAttr("disabled");
		}
                else{
                    for(var i=0;i<hashMap.count();i++){
        var esbData = $("#esbAmt"+i).text();
        var esbNumericData = esbData.substr(5, esbData.length);
        var termData = $("#select-money"+i+" option:first").val();
		if(termData.substring(0,6)=="Refund"){
			var termNumericData = termData.substr(7, termData.length);
		}
		else{
        var termNumericData = termData.substr(5, termData.length);
		}
        var folio = $('li#list'+i+'>.loanlist-folio>.folio>strong').text();
        
    //amount entered for a loan is more than ESB
        var enteredAmount = $('#setAmount'+i+'').val();
		if(isNaN(enteredAmount))
		{
			if(enteredAmount.substring(0,4)=="Term"){
				enteredAmount = enteredAmount.substring(5);
			}
			else if(enteredAmount == "Not Due"){
				enteredAmount = 0;
			}
			else if(enteredAmount.substring(0,6)=="Refund"){
				enteredAmount = -(enteredAmount.substring(7));
			}
			else if(enteredAmount == "No Refund"){
				enteredAmount = 0;
			}
		}
        console.log("parseFloat($(#setAmount+i).val()): "+ parseFloat(enteredAmount));
        if(enteredAmount > 0 && enteredAmount > parseFloat(esbNumericData) && ignoreEsbExceedFlag[i] === 0){
            //alert($('li#list'+i+'>.loanlist-folio>.folio>strong').text());
            folioMoreThanEsb = folioMoreThanEsb + folio+", ";
        }
    //amount entered for the loan is equal to ESB and customer has not opted for settlement
        if(enteredAmount > 0 && enteredAmount == parseFloat(esbNumericData) && $("#setAmount"+i).data('flag') != 'copied'){
            folioEqualToEsb = folioEqualToEsb + folio+", ";
        }
    // amount entered is more than twice the Weekly Term Amount but less than ESB
        if(enteredAmount > (parseFloat(termNumericData) * TERM_MULTIPLE) && parseFloat($("#setAmount"+i).val()) < parseFloat(esbNumericData)){
            folioMoreThanTerm = folioMoreThanTerm + folio+", ";
        }
   
    }//for loop ends
    
    if($("span.total").text() == "£0.00" && !checkNotDue() && !checkNoRefund()){
        common.confirmMessage(messageboxCustomerDetailsPage.zeroPayment,
                                    confirmCallbackZeroPayment,
                                    messageboxCustomerDetailsPage.messageTitleConfirm);
    }
    else{
        if(folioMoreThanEsb !="" || folioEqualToEsb !=""){
            var alertText = "";
            if(folioMoreThanEsb !=""){
                //alertText = alertText + folioMoreThanEsb.substr(0, (folioMoreThanEsb.length - 2)) + messageboxCustomerDetailsPage.esbAmountExceeded+"\n";
				common.confirmMessage(alertText + folioMoreThanEsb.substr(0, (folioMoreThanEsb.length - 2)) + messageboxCustomerDetailsPage.esbAmountExceeded,confirmCallbackMoreThanEsb,messageboxCustomerDetailsPage.messageTitleConfirm);
            }
            if(folioEqualToEsb !=""){
                alertText = alertText + folioEqualToEsb.substr(0, (folioEqualToEsb.length - 2)) + messageboxCustomerDetailsPage.settlementAmtMatch;
                common.alertMessage(alertText, callbackReturn, messageboxCustomerDetailsPage.messageTitleWarning);
            }
            
            //common.alertMessage(alertText, callbackReturn, messageboxCustomerDetailsPage.messageTitleWarning);
        }

        else if(folioMoreThanTerm !=""){
            common.confirmMessage(folioMoreThanTerm.substr(0, (folioMoreThanTerm.length - 2)) + messageboxCustomerDetailsPage.weeklyTermExceeded,
                                        confirmCallbackMoreThanTerm,
                                        messageboxCustomerDetailsPage.messageTitleConfirm);
        }
        else{
            saveTransactionRecords();
            }
        }
                    
     }
    
    
};

function confirmCallbackMoreThanTerm(buttonIndex){
    if(buttonIndex == 1){
        saveTransactionRecords();
    }
    
};

function confirmCallbackMoreThanEsb(buttonIndex){
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


function confirmCallbackSaveDetails(buttonIndex){
    if(buttonIndex == 1){
    	var inputparam = [customerID,journeyId,mobileNumber,phoneNumber,emailID,addressLine1,addressLine2,addressLine3,addressLine4,city,postCode,newCollectionDay,newjourneyOrderBy,syncValue,updatedDate];

        console.log("INPUT PARAM CONFIRM "+inputparam);
         //creating updateinputparam
         var updateinputparam = [mobileNumber,phoneNumber,emailID,addressLine1,addressLine2,addressLine3,addressLine4,postCode,city,customerID];						
          if(customerDetailsValidation !==0){
          saveToDatabase(inputparam,updateinputparam);
          }
    }
    else{
    	return customerDetailsValidation == 0;
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

function checkNoRefund(){
    var check;
    for(var i=0;i<hashMap.count();i++){
        if($("#setAmount"+i).val() == "No Refund"){
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
                    	$('div.custFooter').css('display','none');
                    }
                    else{
                    	$('div.custFooter').css('display','block');
                    }
    });
    
    //Navigate vaildation
    $('#gobackButton').click(function( event ) {
        event.preventDefault();
            if(editMode === true){
                common.confirmMessage(messageboxCustomerDetailsPage.saveMessage,
                confirmSaveBack, 
                messageboxCustomerDetailsPage.messageTitleConfirm);                
            }
            else{
                flagCustDetailsSaved = "0"; 
                dataStorage.setData(CUST_DETAILS_AFTER_SAVE, flagCustDetailsSaved);
                $.mobile.back();             
            }

    });

});
    
    function saveTransactionRecords() { 
			//saveToOfflineDB();
            //prevAmtHashMap.forEach(function(value, key) {
				//console.log(key + " : " + value);
			//});            
    	//check if device date is within SDT Week
      var todaysDate=Date.today();
	  todaysDate = todaysDate.toString().split(" ");
	  var splitTodaysDate = todaysDate[3]+"-"+todaysDate[1]+"-"+todaysDate[2];
	  var formattedTodaysDate = formatDate.reverseDateFormatter(splitTodaysDate);
	  dataStorage.setData(TODAYS_DATE,formattedTodaysDate);
	  var weekStartDate = dataStorage.getData(WEEK_START_DATE);
	  var weekEndDate = dataStorage.getData(WEEK_END_DATE);
	  
	  //if(formattedTodaysDate>=weekStartDate && formattedTodaysDate<=weekEndDate){

            	//alert("valid date");        
            	//$('#save').attr('disabled','disabled');
				var isNDSelected = false;
				var isNRSelected = false;
				var resultId = saveTransaction.generateResultID();
				var resultDate;
				
				if(formattedTodaysDate>=weekStartDate && formattedTodaysDate<=weekEndDate){
					resultDate = saveTransaction.generateResultDate();
				}
				else
				{
					resultDate = weekEndDate+" "+saveTransaction.getCurrentTimeStamp();
				}
				
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
					if(AgreementAmtPaid == "No Refund")
					{
						isNRSelected = true;
						//alert("All Non Due Selected");
					}
					/*else if(AgreementAmtPaid < 0){
						isNegativeEsb = true;
					}*/
					else if(AgreementAmtPaid != "Not Due")
					{
						//alert("All not NOT DUE Selected"+AgreementAmtPaid);
						isNDSelected = false;
						break;
					}
					}
								
				
				$('#save').attr('disabled','disabled');
				var dbObj = dataStorage.initializeDB();
				dbObj.transaction(function insertTransactionRecords(tx){
						
						
				for(var i=0;i<hashMap.count();i++)
				{
					
					var AgreementId = hashMap.get(i);
					var AgreementAmtPaid = $('#setAmount'+i+'').val();
					var ESBAmt = parseFloat($('#esbAmt'+i+'').text().substring(5));
					console.log(AgreementAmtPaid +" for "+AgreementId);
					var prevPaidAmt = prevAmtHashMap.get(AgreementId);
					console.log("prevPaidAmt "+prevPaidAmt);
					
					console.log("ESB Amount "+$('#esbAmt'+i+'').text().substring(5));
					console.log("Total amount Paid "+totalAmountPaid);
					if(isNDSelected)
					{
						AgreementAmtPaid = parseFloat(0).toFixed(2);
						AgreementMode = agreementMode.NONWEEKLY;
						ResultStatusID = resultstatusType.NW;
						VisitStatusID = statusType.COMP;
						
						var transactionParams = [visitID,customerID,resultId,resultDate,ResultStatusID,VisitStatusID,AgreementId,AgreementAmtPaid,AgreementMode,"","",0,journeyId];
						//var updateParam = [VisitStatusID,AgreementAmtPaid,visitID];
                        var updateParam = [VisitStatusID,visitID,visitID,visitID,visitID,visitID,visitID];
						var param = [AgreementAmtPaid,AgreementId];
						//saveTransaction.saveToDB(transactionParams);	
						//saveTransaction.updateCustomerTableInDB(updateParam);	
						//saveTransaction.updateAgreementTableInDB(param);
						tx.executeSql(dbQueries.insertIntoMtbTransactionTableStatement, transactionParams);
						tx.executeSql(dbQueries.updateCustomerTableStatement, updateParam);
						tx.executeSql(dbQueries.updateAgreementTableStatement, param);
					}
					//if(totalAmountPaid >0)
					else	
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
						else if(AgreementAmtPaid.substring(0,6)=="Refund"){
							AgreementAmtPaid = -(AgreementAmtPaid.substring(7));
							AgreementAmtPaid = parseFloat(AgreementAmtPaid).toFixed(2);
							AgreementMode = agreementMode.REFUND;
							ResultStatusID = resultstatusType.PAID;
							VisitStatusID = statusType.COMP;
						}
						else if(AgreementAmtPaid == "No Refund")
						{
							AgreementAmtPaid = parseFloat(0).toFixed(2);
							AgreementMode = agreementMode.REFUND;
							ResultStatusID = resultstatusType.PAID;
							VisitStatusID = statusType.COMP;
						}
						}else if(parseFloat(AgreementAmtPaid) != ESBAmt) {
							AgreementAmtPaid = parseFloat(AgreementAmtPaid).toFixed(2);
							AgreementMode = agreementMode.TERM;
							ResultStatusID = resultstatusType.PAID;
							VisitStatusID = statusType.COMP;
						}
						else if(parseFloat(AgreementAmtPaid) == ESBAmt && parseFloat(AgreementAmtPaid) > 0) {
							AgreementAmtPaid = parseFloat(AgreementAmtPaid).toFixed(2);
							AgreementMode = agreementMode.SETTLEMENT;
							ResultStatusID = resultstatusType.PAID;
							VisitStatusID = statusType.COMP;
						}
						else if(parseFloat(AgreementAmtPaid) == ESBAmt && parseFloat(AgreementAmtPaid) < 0) {
							AgreementAmtPaid = parseFloat(AgreementAmtPaid).toFixed(2);
							AgreementMode = agreementMode.REFUND;
							ResultStatusID = resultstatusType.PAID;
							VisitStatusID = statusType.COMP;
						}
						var diffPaidAmt;
						if(isNaN(diffPaidAmt))
						{
							diffPaidAmt = AgreementAmtPaid;
						}
						else{
							 diffPaidAmt = parseFloat(AgreementAmtPaid) - parseFloat(prevPaidAmt);
						}
						console.log("diffPaidAmt "+diffPaidAmt)						
						var transactionParams = [visitID,customerID,resultId,resultDate,ResultStatusID,VisitStatusID,AgreementId,AgreementAmtPaid,AgreementMode,"","",0,journeyId];
						//var updateParam = [VisitStatusID,diffPaidAmt,visitID];
                        var updateParam = [VisitStatusID,visitID,visitID,visitID,visitID,visitID,visitID];
						var param = [AgreementAmtPaid,AgreementId];
						 // saveTransaction.saveToDB(transactionParams);	
						  //saveTransaction.updateCustomerTableInDB(updateParam);	
						 // saveTransaction.updateAgreementTableInDB(param);
						//console.log(transactionParams);
						tx.executeSql(dbQueries.insertIntoMtbTransactionTableStatement, transactionParams);
						//console.log("updateParam "+updateParam);
						//console.log("1 "+dbQueries.updateCustomerTableStatement);
						tx.executeSql(dbQueries.updateCustomerTableStatement, updateParam);
						//console.log("2");
						tx.executeSql(dbQueries.updateAgreementTableStatement, param);					
					}
					/* else
					{
						//need to be handled for different user story
						//alert("Total Amount is Zero.");
						if(isNDSelected)
						{
							AgreementAmtPaid = parseFloat(0).toFixed(2);
							AgreementMode = agreementMode.NONWEEKLY;
							ResultStatusID = resultstatusType.NW;
							VisitStatusID = statusType.COMP;
							
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
					} */
					
				}
						
				},saveTransaction.errorInsert, saveTransaction.successInsert);
				
			//}//Negative esb else
				
			//}
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

		
	$(document).on('click', '#callOutComePopup li', function () {
        flagCustDetailsSaved = "0"; 
        dataStorage.setData(CUST_DETAILS_AFTER_SAVE, flagCustDetailsSaved);
                

	//check if device date is within SDT Week
      var todaysDate=Date.today();
	  todaysDate = todaysDate.toString().split(" ");
	  var splitTodaysDate = todaysDate[3]+"-"+todaysDate[1]+"-"+todaysDate[2];
	  var formattedTodaysDate = formatDate.reverseDateFormatter(splitTodaysDate);
	  dataStorage.setData(TODAYS_DATE,formattedTodaysDate);
	  var weekStartDate = dataStorage.getData(WEEK_START_DATE);
	  var weekEndDate = dataStorage.getData(WEEK_END_DATE);
	  
	  //if(formattedTodaysDate>=weekStartDate && formattedTodaysDate<=weekEndDate){

        	//alert("valid date");
        	
        	$('#callOutComePopup').popup('close');  
			var selectedCallOutCome = $(this).attr('data-name');
				
			var resultId = saveTransaction.generateResultID();
			var resultDate;
			
			if(formattedTodaysDate>=weekStartDate && formattedTodaysDate<=weekEndDate){
					resultDate = saveTransaction.generateResultDate();
				}
				else
				{
					resultDate = weekEndDate+" "+saveTransaction.getCurrentTimeStamp();
				}
			
			var AgreementMode;
			var ResultStatusID;
			var VisitStatusID;
			var totalAmountPaid = parseFloat(($("span.total").text()).substring(1));
			resultId = resultId+customerID;
			console.log("VisiteID "+visitID);
			console.log("CustomerID "+customerID);
			console.log("selectedCallOutCome "+selectedCallOutCome);
			AgreementAmtPaid = parseFloat(0).toFixed(2);
			
			/*if(isNoRefundSelected == true){
				AgreementMode = agreementMode.REFUND;
			}
			else{
				AgreementMode = agreementMode.ZEROPAYMENT;
			}*/
			
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
					
					if(agrModeHashMap.has(AgreementId)){
						AgreementMode = agrModeHashMap.get(AgreementId); 
					}
					else{
						AgreementMode = agreementMode.ZEROPAYMENT;
					}
						var transactionParams = [visitID,customerID,resultId,resultDate,ResultStatusID,VisitStatusID,AgreementId,AgreementAmtPaid,AgreementMode,"","",0,journeyId];
						var prevPaidAmt = prevAmtHashMap.get(AgreementId);
						console.log("prevPaidAmt "+prevPaidAmt);
						var diffPaidAmt;
						if(isNaN(diffPaidAmt))
						{
							diffPaidAmt = AgreementAmtPaid;
						}
						else{
							 diffPaidAmt = parseFloat(AgreementAmtPaid) - parseFloat(prevPaidAmt);
						}
						console.log("diffPaidAmt Call OutCome "+diffPaidAmt)
						//var updateParam = [VisitStatusID,diffPaidAmt,visitID];
						var updateParam = [VisitStatusID,visitID,visitID,visitID,visitID,visitID,visitID];
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
			
	});
	
$(document).on('click','#performance', function(){
    	if(editMode === true){
    		common.confirmMessage(messageboxCustomerDetailsPage.saveMessage,
    	    confirmRedirectToCustPerformance, 
    		messageboxCustomerDetailsPage.messageTitleConfirm);
    	}
             
    	else{
    		flagCustDetailsSaved = "0"; 
            dataStorage.setData(CUST_DETAILS_AFTER_SAVE, flagCustDetailsSaved);
            common.redirect('customerPerformance.html');
    	}
            
});	
    //$(document).on('click','span.esb', function(){
	

//session validation
    $(document).on('click',function(){
        common.disableBackButtonAfterTimeout();
    	session.sessionValidate(selectedUserId);
    });
    function onDeviceReady() {
    	console.log(navigator.notification);
        common.disableBackButtonAfterTimeout();
        session.sessionValidate(selectedUserId);
        document.addEventListener("resume", onResume, false);
        
            $(document).on('click', '#callOutcome', function (e) {
			
				var todaysDate=Date.today();
				  todaysDate = todaysDate.toString().split(" ");
				  var splitTodaysDate = todaysDate[3]+"-"+todaysDate[1]+"-"+todaysDate[2];
				  var formattedTodaysDate = formatDate.reverseDateFormatter(splitTodaysDate);
				  dataStorage.setData(TODAYS_DATE,formattedTodaysDate);
				  var weekStartDate = dataStorage.getData(WEEK_START_DATE);
				  var weekEndDate = dataStorage.getData(WEEK_END_DATE);
				if(formattedTodaysDate<weekStartDate){
					//format start date as "07th, April" if "7th, April"
					var momentStartDate = moment(formattedTodaysDate).format("Do, MMMM YY");
					var formatedStartDate = momentStartDate.split(",");
					//alert(date[0]);
					if(formatedStartDate[0].length<=3){
						   formatedStartDate[0]="0"+formatedStartDate[0];
						   formatedStartDate=formatedStartDate[0]+","+formatedStartDate[1];
					}
					message = "The device date "+formatedStartDate+" is not in the current week.";
					common.alertMessage(message,callbackReturn,messageboxCommonMessages.messageTitleError);
				}
				else
				{
		$('#callOutComePopup').popup();
		$('#callOutComePopup').popup('open');
                $('#callOutComePopup').popup('reposition', {positionTo: 'window'});
				}
				
            });
	
            $(document).on('click', 'button#save', function (e) {
			
				 var todaysDate=Date.today();
				  todaysDate = todaysDate.toString().split(" ");
				  var splitTodaysDate = todaysDate[3]+"-"+todaysDate[1]+"-"+todaysDate[2];
				  var formattedTodaysDate = formatDate.reverseDateFormatter(splitTodaysDate);
				  dataStorage.setData(TODAYS_DATE,formattedTodaysDate);
				  var weekStartDate = dataStorage.getData(WEEK_START_DATE);
				  var weekEndDate = dataStorage.getData(WEEK_END_DATE);
				if(formattedTodaysDate<weekStartDate){
					//format start date as "07th, April" if "7th, April"
					var momentStartDate = moment(formattedTodaysDate).format("Do, MMMM YY");
					var formatedStartDate = momentStartDate.split(",");
					//alert(date[0]);
					if(formatedStartDate[0].length<=3){
						   formatedStartDate[0]="0"+formatedStartDate[0];
						   formatedStartDate=formatedStartDate[0]+","+formatedStartDate[1];
					}
					message = "The device date "+formatedStartDate+" is not in the current week.";
					common.alertMessage(message,callbackReturn,messageboxCommonMessages.messageTitleError);
				}
				else
				{
		validateBeforeSave();
				}
				
				
            });

    }
    function onResume() {
        common.disableBackButtonAfterTimeout();
        session.sessionValidate(selectedUserId);
     }   
    $(document).on('pageinit',function (f) {
        $('[data-role=collapsible]').find("*").click(function () {
            session.sessionValidate(selectedUserId);
            common.disableBackButtonAfterTimeout();
        });
    });
    $(document).on("scrollstart",function(){
    	  session.sessionValidate(selectedUserId);
		  common.disableBackButtonAfterTimeout();
    });
	
	//editing mode for personal details
$(document).on('click','#editRequest', function(){
		//alert("clicked");
		editMode =true;
		if(listItem.AddressLine1){
            addressLine1 = listItem.AddressLine1;
        }
        if(listItem.AddressLine2){
            addressLine2 = listItem.AddressLine2;
        }
        if(listItem.AddressLine3){
            addressLine3 = listItem.AddressLine3;
        }
        if(listItem.AddressLine4){
            addressLine4 = listItem.AddressLine4;
        }
        $("#mainElementList").replaceWith('<li id="editMainElementList" data-theme="d" data-icon="false" class="contactMain ui-li-static ui-body-d ui-first-child"><h2>Contact</h2>');
		$('li#editMainElementList').append('<div class="editContact1"><input maxlength="11" id="rmvMobileClass" class="contactNumber editChange rmvLink textBoxChanges " placeholder="" value="'+listItem.MobileNumber+'" type="number" inputmode="numeric" pattern="[0-9]*" onclick=window.location.href=\'tel:'+listItem.MobileNumber+'\' readonly><span class="contactIcon rmvLink" onclick="window.location.href=\'tel:'+listItem.MobileNumber+'\'"><img id="mobileimg-edit" class="mobile-img" src="css\\themes\\images\\icons-png\\mobile-icon.png"></span></div>');
		$('li#editMainElementList').append('<div class="editContact2"><input id="rmvPhoneClass" maxlength="12" class="contactNumber editChange rmvLink textBoxChanges"  placeholder="" value="'+listItem.PhoneNumber+'" type="number" inputmode="numeric" pattern="[0-9]*" onclick=window.location.href=\'tel:'+listItem.PhoneNumber+'\' readonly><span class="contactIcon rmvLink" onclick="window.location.href=\'tel:'+listItem.PhoneNumber+'\'"><img id="phoneimg-edit" class="landline-img" src="css\\themes\\images\\icons-png\\landline-icon.png" style="height: 24px; width: 15px;"></span></div>');
        $('li#editMainElementList').append('<div class="editEmail"><input type="email" id="emailID" class="editChange textBoxChanges textBoxCSSEmail" name="email" pattern="[^ @]*@[^ @]*" placeholder="Email" value="'+listItem.Email+'" readonly></div></li>');
		
        $(".editChange").addClass("inputTextEditChange");
		$(".editChange").attr("readonly", false); 
		$('#mobileimg-edit').attr('src', 'css\\themes\\images\\icons-png\\mobile-icon-edit.png');
		$('#phoneimg-edit').attr('src', 'css\\themes\\images\\icons-png\\landline-icon-edit.png');
		$(".editChangeAddress").replaceWith('<div class="address"><input type="text" pattern="[a-z]*" inputmode="text" class="textBoxCSS editChange textBoxChanges" id="addressline1" autocomplete="off" data-corners="false" size="25" maxlength="50" value="'+addressLine1+'" required/><span class="addressIcon"><img src="css\\themes\\images\\icons-png\\location-icon-edit.png"></span></div><div class="address"><input type="text" pattern="[a-z]*" inputmode="text" id="addressline2" autocomplete="off" data-corners="false" placeholder="Line 2" class="textBoxChanges editChange"size="25" maxlength="50" value="'+addressLine2+'"/></div><div class="address"><input type="text" pattern="[a-z]*" inputmode="text" id="addressline3" autocomplete="off" data-corners="false" class="textBoxChanges editChange" placeholder="Line 3" size="25" maxlength="50" value="'+addressLine3+'"/></div><div class="address"><input type="text" pattern="[a-z]*" inputmode="text" id="addressline4" autocomplete="off" data-corners="false" class="textBoxChanges editChange" placeholder="Line 4" size="25" maxlength="50" value="'+addressLine4+'"/></div><div id="cityaddressline" class="address"><input id="editCity" class="textBoxCSS editChange textBoxChanges" type="text" pattern="[a-z]*" inputmode="text" size="10" autocomplete="off" data-corners="false"  maxlength="50" value="'+listItem.City+'" required/><input id="editPostcode" class="textBoxCSS editChange textBoxChanges" type="numeric" pattern="[a-z]*" inputmode="numeric"  autocomplete="off" data-corners="false"  maxlength="8" size="9" value="'+listItem.PostCode+'" required/></div>');
		$("#editLocationIcon").remove();	
        $(".rmvLink").removeAttr("onclick");
		$("#rmvMobileClass").removeClass("contactNumber");
		$("#rmvPhoneClass").removeClass("contactNumber");
		$("#replaceButton").replaceWith('<div id="replaceButton" class="btngroup"><div class="btn-group btn-group-justified" role="group" aria-label="..." style=""><div id="dashBtnSave"><button data-mini="true" id="editSave" data-theme="a" type="button" class="btn btn-sucess ui-btn ui-btn-a ui-shadow ui-corner-all ui-mini" onclick="saveCustomerDetails();">Save</button></div></div></div>');
		$(".textBoxCSS").addClass("textBoxChanges");
		$("#rmvMobileClass").addClass("textBoxContacts");
		$("#rmvPhoneClass").addClass("textBoxContacts");
	  	$(".textBoxCSSEmail").addClass("textBoxChangesEmail");	
		$('#rmvMobileClass').attr('onkeypress', 'return isNumberKey(event)');
		$('#rmvPhoneClass').attr('onkeypress', 'return isNumberKey(event)');
		$('#rmvPhoneClass').attr('onkeypress', 'return isNumberKey(event)');
		$('ul.custPersonalDetails').css('max-height', 'calc(100vh - 219px)');
        $('ul.custPersonalDetails').css('overflow-y', 'auto');
        $('ul.custPersonalDetails').css('-webkit-overflow-scrolling', 'touch');
		$("#rmvMobileClass").addClass("textBorder");
		$("#rmvPhoneClass").addClass("textBorder");
        $(".editChange").addClass("inputTextEditChange");
		$(".textBoxCSSEmail").addClass("textBorder");
		if(isprimaryJourney == 1)
		{
		$("#journeyOrder").css("border", "1px solid #464646");
        $("#journeyOrder").css("margin-top", "2px");
        $("#journeyOrder").css("background-color", "#f4f4f4");
        $("#journeyOrder").addClass('editChange textBoxCSS textBoxChanges inputTextEditChange');
        $("#journeyOrder").attr("readonly", false); 
	   }
        $("#cityaddressline").css("width", $("#addressline3").outerWidth()+4);
		
	
	});	

  //Number vaildation
   function isNumberKey(evt){
     var charCode = (evt.which) ? evt.which : event.keyCode
     if (charCode > 31 && (charCode < 48 || charCode > 57))
	 {
	 //alert("Enter number");
	 return false;
	 }
	 else{

	 return true;
	 }
}

 //11 digit validation
   function validateElevenDigit()
   { //Zero check
     var checkForZeroFields = '';
     var ex = /^[0-9]{11}$/;
      if(mobileNumber.length > 0)
     {  
        //var testMobileNumber =parseInt(mobileNumber);   
                                if (mobileNumber.charAt(0)!="0")
                                {
                                 zeroMbFlag = 1;
                                //checkForZeroFields = checkForZeroFields + "Mobile Number, ";
                                 customerDetailsValidation = 0;
                    }
                                else
                                {
                                zeroMbFlag = 0;
                                 customerDetailsValidation = 1;                                  }
        if(ex.test(mobileNumber) == false)
       {
                     digitMbFlag = 1; 
//           updateCustAlerts = updateCustAlerts +"Mobile Number should be 11 digit\n";    
              //common.alertMessage("Mobile Number should be 11 digit", callbackReturn, messageboxCustomerDetailsPage.messageTitleWarning);
               
               //return false;
       }
                              else
                              {
                                 digitMbFlag = 0;
                                 customerDetailsValidation = 1;                
                              }
                   if(zeroMbFlag==1 || digitMbFlag==1){
                              updateCustAlerts = updateCustAlerts + messageboxCustomerDetailsPage.validateMobileNumber;
                              customerDetailsValidation = 0;
                }
   }
   else{
             customerDetailsValidation = 1;
    }
  }

   //12 digit validation
   function validateTwelveDigit()
   {
              //Zero check
   var checkForZeroFields = '';
   var ex = /^[0-9]{11}$/;
    if(phoneNumber.length > 0)
    {
                               if (phoneNumber.charAt(0)!="0"){
                                              zeroPhFlag = 1;
                                              //checkForZeroFields = checkForZeroFields + "Mobile Number, ";
                                              customerDetailsValidation = 0;
                              }
                              else{
                              zeroPhFlag=0;
                              customerDetailsValidation = 1;
                              }

    if(ex.test(phoneNumber) == false)
    {
                                  digitPhFlag = 1; 

             //updateCustAlerts = updateCustAlerts + "Phone Number should be 12 digit\n";
        //common.alertMessage("Phone Number should be 12 digit", callbackReturn, messageboxCustomerDetailsPage.messageTitleWarning);
        
        //return false;
    }
                else{
                              digitPhFlag=0;
                              customerDetailsValidation = 1;
                              }
                if(zeroPhFlag==1 || digitPhFlag==1){
                              updateCustAlerts = updateCustAlerts + messageboxCustomerDetailsPage.validatePhoneNumber;
                              customerDetailsValidation = 0;
                }
   }
      else{
             customerDetailsValidation = 1;
    }
                
                  
   }

              
  //Email vaildation
  function validateForm() {
   var re;
    var x = document.getElementById("emailID").value;
                if(x.length>0){
    re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/;
    if( re.test(x)== false)
                {
                updateCustAlerts = updateCustAlerts + messageboxCustomerDetailsPage.validateEmail;
                customerDetailsValidation = 0;
                }else{
                customerDetailsValidation = 1;
    }
                }
                else{
                customerDetailsValidation = 1;
    }
}
				
function confirmSaveBack(buttonIndex){
    if(buttonIndex == 1){
        flagCustDetailsSaved = "0"; 
        dataStorage.setData(CUST_DETAILS_AFTER_SAVE, flagCustDetailsSaved);
        $.mobile.back();
}};
function confirmRedirectToCustPerformance(buttonIndex){
    if(buttonIndex == 1){
        flagCustDetailsSaved = "0"; 
        dataStorage.setData(CUST_DETAILS_AFTER_SAVE, flagCustDetailsSaved);
    	common.redirect('customerPerformance.html');
}};

$(window).on('load',function(){
        if(dataStorage.getData(CUST_DETAILS_AFTER_SAVE)=== "1"){
            //open personal details
                $('div.personalDetails').attr("data-collapsed","false");
                $('div.personalDetails').prop("data-collapsed","false");
                $('div.personalDetails').removeClass('ui-collapsible-collapsed');
                $('div.personalDetails h5').removeClass('ui-collapsible-heading-collapsed');
                $('div.personalDetails .ui-collapsible-content').removeClass('ui-collapsible-content-collapsed');
                $('div.personalDetails h5 a').removeClass('ui-icon-carat-d');
                $('div.personalDetails h5 a').addClass('ui-icon-carat-u');
            //close loan details
                $('div.loanList').attr("data-collapsed","true");
                $('div.loanList').prop("data-collapsed","true");
                $('div.loanList').addClass('ui-collapsible-collapsed');
                $('div.loanList h5').addClass('ui-collapsible-heading-collapsed');
                $('div.loanList .ui-collapsible-content').addClass('ui-collapsible-content-collapsed');
                $('div.loanList h5 a').removeClass('ui-icon-carat-u');
                $('div.loanList h5 a').addClass('ui-icon-carat-d');
                $('div.custFooter').css('display','none');
                setTimeout(function(){
                    $('div.custFooter').css('display','none');
                },150);
                
        }
});