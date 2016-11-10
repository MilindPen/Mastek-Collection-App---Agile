var idCounter;
var datesBucket=[];
var currBucket=0;
var bucketListCounter=0;
var viewType = dataStorage.getData(IS_WEEKLY_VIEW);
var selectedUserId = dataStorage.getData(USER_ID);
var topCoordinate = 0;
var journeyOrderList = [];

var SCList = {		
	
    /***************************************retrieving the weekly customer list from offline DB************************************************/
    renderCustListData: function(data){
	    
    	
        var fullName=[];
			var lenWeekly = data.delegationCustomers.length;
				
				console.log("rows: "+lenWeekly);
				
				if(lenWeekly==0){
					$('div.weeklyCollapsible').hide();
					$('div.weeklyDivider').show();
					$('ul#weeklyNoList').append('<li class="cust ui-li-static ui-body-inherit" id=noWeeklyList>');
		            //$("ul.dailyList").append("<li class='cust ui-li-static ui-body-inherit' id=noList>");
		            $("#noWeeklyList").append('<span class="noList">There are no customer for delegation for selected dates.</span></li>');
		        }
				if(lenWeekly > 0) {
	                //console.log(JSON.stringify(res));
	                
	                //pre-render the weekly header section
	                SCList.populateWeelyHeader();
					for(j=0;j<lenWeekly;j++){
						SCList.renderSCWeeklyList(lenWeekly,data.delegationCustomers[j]);
					}
					
					//hide the sections where there are no visits
					SCList.hideWeeklyUnwantedSections();
					validateCheck();
				}
		
    },
   
    populateWeelyHeader: function(){
        var weekStartDate = dataStorage.getData(WEEK_START_DATE); 
        var weekEndDate = dataStorage.getData(WEEK_END_DATE);
        var todaysDay = Date.today().getDayName();
        var yesterday,tomorrow;
		
		datesBucket = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
    	for(i=0;i<7;i++){
    		
    		//weekly date
    		var weeklyDate = Date.parse(weekStartDate).add(i).days();
			weeklyDate = weeklyDate.toString().split(" ");
			
            var splitweeklyDate = weeklyDate[3]+"-"+weeklyDate[1]+"-"+weeklyDate[2];
			console.log("splitweeklyDate "+splitweeklyDate);
            var formattedweeklyDate = formatDate.reverseDateFormatter(splitweeklyDate);
            //$('span#weeklyDate'+i).text(weeklyDate[2]); 
            
    		//weekly day
    		var weeklyDay = Date.parse(weekStartDate).add(i).days().getDayName();
    		$('span#weeklyDay'+i).text(datesBucket[i]);
			console.log(weeklyDay);
    		/*if(weeklyDay==todaysDay){
    			$('span#weeklyDay'+i).text('Today');
    			dataStorage.setData("todaysDayId",i);
    			yesterday = i-1;
    			tomorrow = i+1;
    		}*/
    		//datesBucket[i]=formattedweeklyDate;
			//datesBucket[i]=formattedweeklyDate;
    		console.log("datesBucket["+i+"]");
			
			$('div#day'+i+' div.checkbox-input').append('<input type=checkbox name=checkbox-'+i+' id=checkbx'+i+'><label for=checkbx'+i+' id=chkboxlabel onclick="clickAction(this,event)" class="alignTick"></label>');
    	}
    	
    },
    /***************************************searching the pending customer list************************************************/	
    autoCompleteSearchWeekly: function(){     
        $('.searchbox-input').on('keyup change',function(e){
            //var tagElems = $('ul.dailyList').children();
            
            for(i=0;i<7;i++){
            	var lvl1 = $('div.weeklyCollapsible').children('div#day'+i);
            	var lvl2 = $(lvl1).children('div.ui-collapsible-content');
            	var lvl3 = $(lvl2).children('ul#weeklyListDay'+i);
            	
            	//get the length of search term
            	var searchTerm = $(this).val();
                var len = searchTerm.toLowerCase().length;
            	
            	if(!$(lvl3).has("li").length){
        			
        		}
            	else{
            		
            		var liLen = $(lvl3).children('li').length;
            		console.log("i: "+i+"liLen "+$(lvl3).children('li').length);
            		
            		//enable search if user enters minimum of 3 characters
                    if(len > 2){
                    	 
                         $(lvl1).hide();
                         
	            		for(j=0;j<liLen;j++){
	            			var lvl4 = $(lvl3).children('li#weeklyDay'+i+'List'+j);
	            			
	            			console.log("i: "+i+" j: "+j+": li: "+lvl4);
	            			
	            			$(lvl4).hide();
	            			var tag = $(lvl4).eq(j);
	            			//console.log("tag"+JSON.stringify(tag));
	            			var lvl5 = $(lvl4).children('.name-card-address');
	                        var lvl6 = $(lvl5).children('.name-card');
	                        var searchElementName = $(lvl6).children('span.SCDWName');      
	                        var searchElementAddress = $(lvl5).children('div.SCDWAddress');
	                        var searchElements=(searchElementName.text().toLowerCase())+(searchElementAddress.text().toLowerCase());
	                        
	                        var parent1 = $(lvl4).parent(); //parent of li=ul
                            var parent2 = $(parent1).parent(); //parent of ul=div.ui-collapsible-content
                            var parent3 = $(parent2).parent(); //parent of div.ui-collapsible-content=div#day
                            //$(parent3).hide();
                           
                            
	                        if((searchElements).indexOf($(this).val().toLowerCase()) > -1){
	                        	console.log("searchelems: "+searchElements);
	                            $(lvl4).show();
	                            //$(parent3).show();
	                            $(lvl1).show();
	                            console.log("parent3: "+parent3);
	                        }
	                  
	                        
	            		}//for
                    }//if len>2
                    else{
                    	$(lvl1).show();
                        //disable search and show all the entire list
                    	for(j=0;j<liLen;j++){
	            			var lvl4 = $(lvl3).children('li#weeklyDay'+i+'List'+j);
	            			$(lvl4).show();
	            			
	            			//$(lvl6).children('span.SCDWName').removeHighlight();
	            	        //$(lvl5).children('div.SCDWAddress').removeHighlight();
                    	}
                    	
                    }
            	}//else
            }//for
           
        });
       
    },
    /***************************************highlighting the searched results************************************************/
    searchHighlightWeekly: function(){    
        $('#search-input').bind('keyup change', function(ev) {
	        // pull in the search term

	        for(i=0;i<7;i++){
            	var lvl1 = $('div.weeklyCollapsible').children('div#day'+i);
            	var lvl2 = $(lvl1).children('div.ui-collapsible-content');
            	var lvl3 = $(lvl2).children('ul#weeklyListDay'+i);
            	
            	//get the length of search term
            	var searchTerm = $(this).val();
                var len = searchTerm.toLowerCase().length;
            	
            	if(!$(lvl3).has("li").length){
        			
        		}
            	else{
            		
            		var liLen = $(lvl3).children('li').length;
            		console.log("i: "+i+"liLen "+$(lvl3).children('li').length);
            		
            			
	            		for(j=0;j<liLen;j++){
	            			var lvl4 = $(lvl3).children('li#weeklyDay'+i+'List'+j);
	            			
	            			console.log("i: "+i+" j: "+j+": li: "+lvl4);
	            			var lvl5 = $(lvl4).children('.name-card-address');
	                        var lvl6 = $(lvl5).children('.name-card');
	                        var searchElementName = $(lvl6).children('span.SCDWName');      
	                        var searchElementAddress = $(lvl5).children('div.SCDWAddress');
	                        $(lvl6).children('span.SCDWName').removeHighlight();
	            	        $(lvl5).children('div.SCDWAddress').removeHighlight();
	            			
	            	        //enable search if user enters minimum of 3 characters
	                        if(len > 2){
	                        	$(lvl6).children('span.SCDWName').highlight(searchTerm);
	            	        	$(lvl5).children('div.SCDWAddress').highlight(searchTerm);
	            	        	$('.highlight').parents('div#day'+i).collapsible( "option", "collapsed", false );
	            	        	
	                        }//if len>2
	            		}//for
                  
            	}//else
            }//for
	        
	        
        });
    },
	/***************************************rendering the retrieved weekly customer list************************************************/
    renderSCWeeklyList: function(lenWeekly,res){
    	var len = lenWeekly;
    	var listItem=[];
		var fullName="";
		var address="";
        var totalTermAmount="";
        var totalPaidAmount="";
        var paymentTypeId="";
        var status="";
                
		listItem = res;
		
       // totalTermAmount = (!listItem.TotalTermAmount) ? "0":Math.round(listItem.TotalTermAmount);
		//totalPaidAmount = (!listItem.TotalPaidAmount) ? "0":Math.round(listItem.TotalPaidAmount);
		
		//status          = (listItem.StatusID);
        //paymentTypeId   = parseInt(listItem.PaymentTypeId);
                
		//building customer name
		if(listItem.firstName){
			fullName = fullName + listItem.firstName;
		}
		if(!listItem.firstName && listItem.lastName){
			fullName = fullName + listItem.lastName;
		}
		if(listItem.firstName && listItem.lastName){
			fullName = fullName +" "+listItem.lastName;
		}
		
		//building customer address
		if(listItem.addressLine1){
			address = listItem.addressLine1 + ", ";
		}
		if(listItem.addressLine2){
			address = address + listItem.addressLine2 + ", ";
		}
		if(listItem.postcode){
			address = address + listItem.postcode;
		}
		
		//console.log("custID: "+listItem.CustomerID);
		//console.log(listItem.VisitDate);
		//var date = listItem.VisitDate.toString().split("-");
		//console.log(date[2]);
		
		for(i=currBucket;i<datesBucket.length;i++){
			currBucket=i;
			if((i+1)==listItem.collectionDay){
				$('ul#weeklyListDay'+currBucket).append('<li class="cust ui-li-static ui-body-inherit" id=weeklyDay'+currBucket+'List'+bucketListCounter+'>');
                
				$('li#weeklyDay'+currBucket+'List'+bucketListCounter).append('<div class=SCDWvwhite>&nbsp;</div><div id=weeklyDay'+currBucket+'jOrder'+bucketListCounter+' class=journeyOrder>'+listItem.journeyOrder+'</div>');
                SCList.commonWeeklyListElements(currBucket,bucketListCounter,fullName,address);
				$('li#weeklyDay'+currBucket+'List'+bucketListCounter).append('<div class=checkbox-input><input type=checkbox name=checkboxGrp'+i+' id=checkbox'+i+bucketListCounter+' value='+listItem.journeyOrder+' data-customerJourneyId ='+listItem.customerJourneyId+'><label for=checkbox'+i+bucketListCounter+' id=chkboxlabel></label></div></li>');
				
				journeyOrderList.push(listItem.journeyOrder);
				
                
               /* if(paymentTypeId==2){
                	$('div#weeklyDay'+currBucket+'nc'+bucketListCounter).append('<span class=card><img class=cardIcon src="css/themes/images/icons-png/card-icon.png" alt=""></span>');
                }*/
				
                bucketListCounter=bucketListCounter+1;
              
				break;
			}
			else{
				bucketListCounter=0;
			}
			
		}
		
	},
	 commonWeeklyListElements: function(currBucket,bucketListCounter,fullName,address){
		 $('li#weeklyDay'+currBucket+'List'+bucketListCounter).append('<div id=weeklyDay'+currBucket+'nca'+bucketListCounter+' class="name-card-address">');
         $('div#weeklyDay'+currBucket+'nca'+bucketListCounter).append('<div id=weeklyDay'+currBucket+'nc'+bucketListCounter+' class="name-card">');
         $('div#weeklyDay'+currBucket+'nc'+bucketListCounter).append('<span class=SCDWName>'+fullName+'</span></div>');
         $('div#weeklyDay'+currBucket+'nca'+bucketListCounter).append('<div class=SCDWAddress>'+address+'</div></div></li>');
			
     },
     hideWeeklyUnwantedSections: function(){
    	for(i=0;i<7;i++){
    		var level1Elem = $('div#day'+i).children('div.ui-collapsible-content');
    		var level2Elem = $(level1Elem).children('ul#weeklyListDay'+i);
    		if(!$(level2Elem).has("li").length){
    			$('div#day'+i).hide();
    		}
    		else{
    		}
    	}
     },
     commonDailyListElements: function(idCounter,fullName,address){
            $('li#list'+idCounter).append('<div id=nca'+idCounter+' class="name-card-address">');
            $('div#nca'+idCounter).append('<div id=nc'+idCounter+' class="name-card">');
            $('div#nc'+idCounter).append('<span class=SCDWName>'+fullName+'</span></div>');
            $('div#nca'+idCounter).append('<div class=SCDWAddress>'+address+'</div></div></li>');
			
        },
	/***************************************redirecting to customer details page************************************************/
	/*callCustDetails: function(custNumber, n){
        dataStorage.setData(SELECTED_CUSTOMER_NUM,custNumber);
        console.log(n);
        topCoordinate =  $('ul.dailyList').scrollTop() + $('#list'+n).offset().top - 115;
        dataStorage.setData(SCROLL_POSITION, topCoordinate);
        common.redirect("customerDetails.html");
    },
    callCustDetailsWeekly: function(custNumber,cn,bn){
        dataStorage.setData(SELECTED_CUSTOMER_NUM,custNumber);
        topCoordinate =  $('div.weeklyCollapsible').scrollTop() + $('#weeklyDay'+cn+'List'+bn).offset().top - 85;
        dataStorage.setData(SCROLL_POSITION, topCoordinate);
        common.redirect("customerDetails.html");
    },*/

    initializeWeeklyPage: function(){
    	$('.searchbox-input').val("");

    	$('.searchbox-input').on('keyup focus',function(){
        var inputVal = $('.searchbox-input').val();
        inputVal = $.trim(inputVal).length;
        if (inputVal !== 0) {
            $('.searchbox-icon').css('display', 'none');
        } else {
            $('.searchbox-input').val('');
            
            $('.searchbox-icon').css('display', 'block');
            for(i=0;i<7;i++){
            	var lvl1 = $('div.weeklyCollapsible').children('div#day'+i);
            	$(lvl1).show();
            }
            SCList.hideWeeklyUnwantedSections();
        }
    	});
    	
        $('.searchbox-submit').on('click',function(){
            $(".searchbox-input").val("");
            $(".searchbox-input").focus();
            
            $('.searchbox-icon').css('display', 'block');
            $('.cust').removeHighlight();
            
            for(i=0;i<7;i++){
               	var lvl1 = $('div.weeklyCollapsible').children('div#day'+i);
               	//alert(i +": show")
               	$(lvl1).show();
                	var lvl2 = $(lvl1).children('div.ui-collapsible-content');
                	var lvl3 = $(lvl2).children('ul#weeklyListDay'+i);
                	var liLen = $(lvl3).children('li').length;
                	for(j=0;j<liLen;j++){
            			var lvl4 = $(lvl3).children('li#weeklyDay'+i+'List'+j);
            			$(lvl4).show();
                	}
                	
            }
            SCList.hideWeeklyUnwantedSections();
        });

    }
};

/***************************************actions to perform on document ready************************************************/
$(document).on('ready',function() {
	document.addEventListener("deviceready", onDeviceReady, false);
	
	//Check for delegated journeys and disable select journey option all sideMenu 
  sideMenu.checkDeligatedJourneys();
  
	//alert('document ready');
	$('.ui-content').hide();
    //calling functions
        //var dbObj = dataStorage.initializeDB();
       
        $('div.weeklyDivider').hide();
        
/*        $('.ui-content').height($(window).height());
        $(window).resize(function() {
        	$('.ui-content').height($(window).height());
          });*/
        
        //if(viewType=="1"){	//weekly view
        	/*$('#loading-indicator').show();
        	$('#disablingDiv').show();*/
			SCList.initializeWeeklyPage();
        	$("div.dailyList").hide();
			
			var delegationFromDate = dataStorage.getData(DELEGATION_FROM_DATE);
			var delegationToDate = dataStorage.getData(DELEGATION_TO_DATE);
			//var journeyId = dataStorage.getData(JOURNEY_ID);
			var journeyId = dataStorage.getData(PRIMARY_JOURNEY_ID);
			
			// Service call to get customer List
			delegationServices.getCustDelegationData(delegationFromDate,delegationToDate,journeyId,function(data){
					SCList.renderCustListData(data);	
			});
            
        	
        	//SCList.getWeeklyCustListFromOfflineDB(dbObj);
        	SCList.autoCompleteSearchWeekly();
        	SCList.searchHighlightWeekly();
        //}
        /*else{	//daily view
        	//SCList.initializePage();
        	//$('div.weeklyCollapsible').hide();
        	//SCList.getDailyCustListFromOfflineDB(dbObj);
            //SCList.autoCompleteSearchDaily();
            //SCList.searchHighlightDaily();	
        }*/
        //redirect to dashboard on click of icon
        $('.dashboardIcon').on('click',function(){
            common.redirect('dashboard.html');
        });
		sideMenu.getSideMenuAgentDetails();
		
		
		// SelectAll functionality
		$("#selectAll").click(function(){
			$(':checkbox').prop('checked', true);
		});

		// ClearAll functionality
		$("#clearAll").click(function(){
			$(':checkbox').prop('checked', false);
			$("#selectAll").removeClass('link-active');
		});
		
		// ClearAll functionality
		$("#journeyOrderNoSelection").click(function(){
			
			$('#journeyOrderNoSelectionPopup').popup();
			$('#journeyOrderNoSelectionPopup').popup('open');
			$('#fromJourneyOrder').val("");
			$('#toJourneyOrder').val("");
			$("#selectAll").removeClass('link-active');
            //$('#journeyOrderNoSelectionPopup').popup('reposition', {positionTo: 'window'});
		});
		
		$('#journeySubmit').on('click',function(){
            validateDates();
		});
		
		$('#closePopUp').on('click',function(){
			if(journeyOrderList.length != 0)
			{
				 if($("input[name^=checkboxGrp]").length == $("input[name^=checkboxGrp]:checked").length) {
				
				$("#selectAll").addClass('link-active');
				} else {
					
					$("#selectAll").removeClass('link-active');
				}
			}
          
			$('#journeyOrderNoSelectionPopup').popup('close');
		});
		
		
		$('#saveDelegationCust').on('click',function(){
			var customerJourneyIdList = [];
			var delegatedToUserId = dataStorage.getData(DELEGATION_AGENT_USERID);
			var isSelectAll = 0;
			
            $('input[name^=checkboxGrp]:checked').each(function () {
				
				console.log($(this).attr("value")+" "+$(this).attr("data-customerJourneyId"));
				customerJourneyIdList.push({
					"customerJourneyIds":$(this).attr("data-customerJourneyId")
				});
			});
			
			
			if($("input[name^=checkboxGrp]").length == $("input[name^=checkboxGrp]:checked").length) {
				isSelectAll = 1;
			} else {
				isSelectAll = 0;
			}
			
			if(customerJourneyIdList.length != 0)
			{
				// Service call to save delegated customers
				delegationServices.saveDelegatedCustomers(delegationFromDate,delegationToDate,journeyId,delegatedToUserId,isSelectAll,customerJourneyIdList,function(data){
						common.alertMessage(messageboxDelegationPage.msgSaveSuccess,callbackReturn,messageboxDelegationPage.messageTitleSuccess);
						common.redirect("dashboard.html");
				});
			}
			else
			{
				common.alertMessage(messageboxDelegationPage.msgNoCustomerSelected,callbackReturn,messageboxDelegationPage.messageTitleSuccess);
			}
			
		});
		
});

$(window).on('load',function(){
	//alert('window load');
	if(viewType=="1"){
	setTimeout(function(){
		$('.ui-content').fadeIn("fast");
		/*$('#loading-indicator').hide();
		$('#disablingDiv').hide();*/
	}, 0);
        //scroll/focus to previously selected customer in weekly view
        setTimeout(function(){
            if(dataStorage.getData(SCROLL_POSITION)) {
                $('div.weeklyCollapsible').animate({
                    scrollTop: dataStorage.getData(SCROLL_POSITION)
                }, 200);
            }
        }, 300);
	}
	else{
		$('.ui-content').fadeIn("fast");
		/*$('#loading-indicator').hide();
		$('#disablingDiv').hide();*/
        //scroll/focus to previously selected customer in daily view
        setTimeout(function(){
            if(dataStorage.getData(SCROLL_POSITION)) {
                $('ul.dailyList').animate({
                    scrollTop: dataStorage.getData(SCROLL_POSITION)
                }, 200);
            }
        }, 300);
	}

});

//session validation

$(document).on('click',function(){ 
    session.sessionValidate(selectedUserId);
});

function onDeviceReady() {
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




function validateDates()
{
	var fromJourneyOrder = $('#fromJourneyOrder').val();
	var toJourneyOrder = $('#toJourneyOrder').val();
	
	
	
	console.log("journeyOrderList "+journeyOrderList);
	//console.log("journeyOrderList Sorted "+journeyOrderList.sort(function(a, b){return a-b}));
	
	journeyOrderList.sort(function(a, b){return a-b})
	
	var minJourneyOrder = journeyOrderList[0];
	var maxJourneyOrder = journeyOrderList[journeyOrderList.length-1];
	
	console.log(minJourneyOrder+" "+maxJourneyOrder);
	
	var errmsg = "Journey Order Number should be between "+minJourneyOrder+" and "+maxJourneyOrder;
	
	if(fromJourneyOrder == "" && toJourneyOrder == ""){
		common.alertMessage(messageboxDelegationPage.checkEmptyFields, callbackReturn, messageboxDelegationPage.messageTitleError);
	}
	else if(fromJourneyOrder == ""){ //if fromDate empty
		common.alertMessage(messageboxDelegationPage.checkEmptyFields, callbackReturn, messageboxDelegationPage.messageTitleError);
	}
	else if(toJourneyOrder == ""){ //if toDate empty
		
		common.alertMessage(messageboxDelegationPage.checkEmptyFields, callbackReturn, messageboxDelegationPage.messageTitleError);
	}
	else {
		//Dates are not empty	
		fromJourneyOrder = parseInt(fromJourneyOrder);
		toJourneyOrder = parseInt(toJourneyOrder);
		//alert(toJourneyOrder);
		if(fromJourneyOrder > toJourneyOrder){
				//alert("From Journey Order cannot be greater than to Journey Order");
			common.alertMessage(messageboxDelegationPage.journeyOrderValidation, callbackReturn, messageboxDelegationPage.messageTitleError);
		}
		else if(fromJourneyOrder < minJourneyOrder)
		{
			common.alertMessage(errmsg, callbackReturn, messageboxDelegationPage.messageTitleError);
		}
		else if(fromJourneyOrder > maxJourneyOrder)
		{
			common.alertMessage(errmsg, callbackReturn, messageboxDelegationPage.messageTitleError);
		}
		else if(toJourneyOrder < minJourneyOrder)
		{
			common.alertMessage(errmsg, callbackReturn, messageboxDelegationPage.messageTitleError);
		}
		else if(toJourneyOrder > maxJourneyOrder)
		{
			common.alertMessage(errmsg, callbackReturn, messageboxDelegationPage.messageTitleError);
		}
		else
		{
			$('#fromJourneyOrder').val("");
			$('#toJourneyOrder').val("");
			$('#journeyOrderNoSelectionPopup').popup('close');
			
			var chkGrpName;
			var day;
			for(var i=fromJourneyOrder;i <= toJourneyOrder;i++){
				$("input[type=checkbox][value="+i+"]").prop("checked",true);
				chkGrpName = $("input[type=checkbox][value="+i+"]").attr("name");
				if(chkGrpName != undefined)
				{
					day = chkGrpName.substring(11);
					if($("input[name="+chkGrpName+"]").length == $("input[name="+chkGrpName+"]:checked").length) {
						$("#checkbx"+day).prop("checked", true);
					} else {
						$("#checkbx"+day).prop("checked", false);
					}
				}
				
			}
			
			if($("input[name^=checkboxGrp]").length == $("input[name^=checkboxGrp]:checked").length) {
				
				$("#selectAll").addClass('link-active');
			} else {
				
				$("#selectAll").removeClass('link-active');
			}
		}
		
	}
}

function clickAction(el,e){
  
   e.stopPropagation();
   e.preventDefault();
   var clickedBox = $(el).closest('label').attr("for");
   var day = clickedBox.substring(7);
   // If checked 
   if ($("#"+clickedBox).prop("checked") == true) {
			$("#"+clickedBox).prop("checked", false);
			
			$('#weeklyListDay'+day).find('input[id^="checkbox"]').each(function () {
				
				$(this).prop("checked", false);
			});
	}
	else { // else unchecked
		$("#"+clickedBox).prop("checked", true);
		$('#weeklyListDay'+day).find('input[id^="checkbox"]').each(function () {
				
				$(this).prop("checked", true);
			});
	}
	
	if($("input[name^=checkboxGrp]").length == $("input[name^=checkboxGrp]:checked").length) {
				
				$("#selectAll").addClass('link-active');
			} else {
				
				$("#selectAll").removeClass('link-active');
			}
}

function validateCheck(){
	$("input[name^=checkboxGrp]").click(function(){
		var chkGrpName = $(this).attr("name");
		var day = chkGrpName.substring(11);
		//alert($("input[name="+chkGrpName+"]:checked").length);
		if($("input[name="+chkGrpName+"]").length == $("input[name="+chkGrpName+"]:checked").length) {
			$("#checkbx"+day).prop("checked", true);
		} else {
			$("#checkbx"+day).prop("checked", false);
		}
		
		if($("input[name^=checkboxGrp]").length == $("input[name^=checkboxGrp]:checked").length) {
				
				$("#selectAll").addClass('link-active');
			} else {
				
				$("#selectAll").removeClass('link-active');
			}

	});
	
	
}; 

//Allow only number in journey order number
function validateNumberKeyPress(e) {
    
	if(!((e.keyCode > 95 && e.keyCode < 106)
	  || (e.keyCode > 47 && e.keyCode < 58) 
	  || e.keyCode == 8)) {
		return false;
	}    
    return true;
};









