var idCounter;
var datesBucket=[];
var currBucket=0;
var bucketListCounter=0;
var viewType = dataStorage.getData(IS_WEEKLY_VIEW);
var selectedUserId = dataStorage.getData(USER_ID);

var SCList = {		
	/***************************************searching the pending customer list************************************************/	
    autoCompleteSearchDaily: function(){     
        $('.searchbox-input').on('keyup',function(e){
            var tagElems = $('ul.dailyList').children();
            
            //get the length of search term
            var len = $(this).val().toLowerCase().length;
            
            //enable search if user enters minimum of 3 characters
            if(len > 2){
                $(tagElems).hide();
                for(var i = 0; i < tagElems.length; i++){
                    var tag = $(tagElems).eq(i);
                    var liChild1 = $(tag).children('.name-card-address');
                    var liChild2 = $(liChild1).children('.name-card');
                    var searchElementName = $(liChild2).children('span.SCDWName');      
                    var searchElementAddress = $(liChild1).children('div.SCDWAddress');
                    var searchElements=(searchElementName.text().toLowerCase())+(searchElementAddress.text().toLowerCase());
                    if((searchElements).indexOf($(this).val().toLowerCase()) > -1){
                        $(tag).show();
                    }
                }
            }
            else{
                //disable search and show all the entire list
                $(tagElems).show();
            }
        });
    },
    /***************************************highlighting the searched results************************************************/
    searchHighlightDaily: function(){    
        $('#search-input').bind('keyup change', function(ev) {
	        // pull in the search term
	        var searchTerm = $(this).val();
	        var tagElems = $('ul.dailyList').children();
	        var liChild1 = $(tagElems).children('.name-card-address');
	        var liChild2 = $(liChild1).children('.name-card');
	        var searchElementName = $(liChild2).children('span.SCDWName');
	        var searchElementAddress = $(liChild1).children('div.SCDWAddress');
	        $(liChild2).children('span.SCDWName').removeHighlight();
	        $(liChild1).children('div.SCDWAddress').removeHighlight();
	        
	        // enable highlight when user enters minimum of 3 characters
	        if ( searchTerm.length > 2 ) {
	            // highlight the searched term
	        	$(liChild2).children('span.SCDWName').highlight( searchTerm );
	            $(liChild1).children('div.SCDWAddress').highlight( searchTerm );
	        }
        });
    },
    /***************************************retrieving the daily customer list from offline DB************************************************/
    getDailyCustListFromOfflineDB: function(dbObj){
	    //var selectSCDailyListStatement = 'SELECT * FROM mtbCustomer WHERE visitDate="'+dataStorage.getData(SELECTED_VISIT_DATE)+'" ORDER BY journeyOrderNumber ASC';
        
        var selectedVisitDateParam = [dataStorage.getData(SELECTED_VISIT_DATE)];
            
	    var fullName=[];
	 
	    //execute select query
	    dbObj.transaction(function(tx) {	  
			tx.executeSql(dbQueries.selectSCDailyListStatement,selectedVisitDateParam,function(tx, res) {
				var len = res.rows.length;
				if(len==0){
		            $("ul.dailyList").append("<li class='cust ui-li-static ui-body-inherit' id=noList>");
		            $("#noList").append('<span class="noList">There are no visits for journey-'+dataStorage.getData(JOURNEY_ID)+' on '+dataStorage.getData(SELECTED_VISIT_DATE)+'</span></li>');
		        }
				if(len > 0) {
	                //console.log(JSON.stringify(res));
					for(i=0;i<len;i++){
						idCounter=i;
						SCList.renderSCDailyList(len,JSON.stringify(res.rows.item(i)));
					}
				}
			},function(e) {
				// alert("ERROR: " + e.message);
			});
		});	
	   
    },
    /***************************************retrieving the weekly customer list from offline DB************************************************/
    getWeeklyCustListFromOfflineDB: function(dbObj){
	    
    	
        var fullName=[];
	 
        //execute select query
	    dbObj.transaction(function(tx) {	  
			tx.executeSql(dbQueries.selectSCWeeklyListStatement,[],function(tx, res) {
				var lenWeekly = res.rows.length;
				
				console.log("rows: "+lenWeekly);
				
				if(lenWeekly==0){
					$('div.weeklyCollapsible').hide();
					$('div.weeklyDivider').show();
					$('ul#weeklyNoList').append('<li class="cust ui-li-static ui-body-inherit" id=noWeeklyList>');
		            //$("ul.dailyList").append("<li class='cust ui-li-static ui-body-inherit' id=noList>");
		            $("#noWeeklyList").append('<span class="noList">There are no visits for the journey '+dataStorage.getData(JOURNEY_ID)+'</span></li>');
		        }
				if(lenWeekly > 0) {
	                //console.log(JSON.stringify(res));
	                
	                //pre-render the weekly header section
	                SCList.populateWeelyHeader();
					for(j=0;j<lenWeekly;j++){
						SCList.renderSCWeeklyList(lenWeekly,JSON.stringify(res.rows.item(j)));
					}
					
					//hide the sections where there are no visits
					SCList.hideWeeklyUnwantedSections();
				}
			},function(e) {
				// alert("ERROR: " + e.message);
			});
		});	
	   
    },
    /***************************************rendering the retrieved customer list************************************************/
    renderSCDailyList: function(len,res){
    	var len = JSON.stringify(len);
    	var listItem=[];
		var fullName="";
		var address="";
        var totalTermAmount="";
        var totalPaidAmount="";
        var paymentTypeId="";
        var status="";
                
		listItem = JSON.parse(res);
		
        totalTermAmount = (!listItem.TotalTermAmount) ? "0":Math.round(listItem.TotalTermAmount);
		totalPaidAmount = (!listItem.TotalPaidAmount) ? "0":Math.round(listItem.TotalPaidAmount);
		status          = (listItem.StatusID).trim();
                //status          = parseInt(listItem.status);
                paymentTypeId   = parseInt(listItem.PaymentTypeId);
       
                
		//building customer name
		if(listItem.FirstName){
			fullName = fullName + listItem.FirstName;
		}
		if(!listItem.FirstName && listItem.LastName){
			fullName = fullName + listItem.LastName;
		}
		if(listItem.FirstName && listItem.LastName){
			fullName = fullName +" "+listItem.LastName;
		}
		
		//building customer address
		if(listItem.AddressLine1){
			address = listItem.AddressLine1 + ", ";
		}
		if(listItem.AddressLine2){
			address = address + listItem.AddressLine2 + ", ";
		}
		if(listItem.PostCode){
			address = address + listItem.PostCode;
		}
		
		//rendering the list depending on the status of the customer visit
		$('ul.dailyList').append('<li class="cust ui-li-static ui-body-inherit" id=list'+idCounter+' onclick=SCList.callCustDetails(\"'+listItem.CustomerNumber+'\")>');

		
                 switch(status){
                    case statusType.PEND:
                    case statusType.CNSO:    
                        $('li#list'+idCounter).append('<div class=SCDWvwhite>&nbsp;</div><div id="" class=journeyOrder>'+listItem.JourneyOrderBy+'</div>');
                        SCList.commonDailyListElements(idCounter,fullName,address);
                        break;
                    case statusType.CPA:
                        $('li#list'+idCounter).append('<div class=SCDWvgreen>&nbsp;</div><div id="" class=journeyOrder>'+listItem.JourneyOrderBy+'</div>');
                        SCList.commonDailyListElements(idCounter,fullName,address);
                        $('li#list'+idCounter).append('<div class="SCDWAmount"><span class="paidAmt">&pound;'+totalPaidAmount+'&nbsp;</span>(<span class="weeklyTermAmt">&pound;'+totalTermAmount+'</span>)</div></li>');
                        break;
                    case statusType.COMP:
                        $('li#list'+idCounter).append('<div class=SCDWvgreen>&nbsp;</div><div id="" class=journeyOrder>'+listItem.JourneyOrderBy+'</div>');
                        SCList.commonDailyListElements(idCounter,fullName,address);
                        $('li#list'+idCounter).append('<div class="SCDWAmount"><span class="paidAmt">&pound;'+totalPaidAmount+'&nbsp;</span>(<span class="weeklyTermAmt">&pound;'+totalTermAmount+'</span>)</div></li>');
                        break;
                    case statusType.CPD:
                        $('li#list'+idCounter).append('<div class=SCDWvamber>&nbsp;</div><div id="" class=journeyOrder>'+listItem.JourneyOrderBy+'</div>');
                        SCList.commonDailyListElements(idCounter,fullName,address);
						$('li#list'+idCounter).append('<div class="SCDWAmount"><span class="paidAmt">&pound;'+totalPaidAmount+'&nbsp;</span>(<span class="weeklyTermAmt">&pound;'+totalTermAmount+'</span>)</div></li>');
                        break;
                    case statusType.CNSC:
                    case statusType.SWP:
                    case statusType.SCP:    
                        $('li#list'+idCounter).append('<div class=SCDWvred>&nbsp;</div><div id="" class=journeyOrder>'+listItem.JourneyOrderBy+'</div>');
                        SCList.commonDailyListElements(idCounter,fullName,address);
                        $('li#list'+idCounter).append('<div class="SCDWAmount"><span class="paidAmt">&pound;'+totalPaidAmount+'&nbsp;</span>(<span class="weeklyTermAmt">&pound;'+totalTermAmount+'</span>)</div></li>');
                        break;
                    case (statusType.NW):
                        $('li#list'+idCounter).append('<div class=SCDWvblue>&nbsp;</div><div id="" class=journeyOrder>'+listItem.JourneyOrderBy+'</div>');
                    	SCList.commonDailyListElements(idCounter,fullName,address);
                        break;
                    default:
                        break;
                }
                if(paymentTypeId==2){
                    $('div#nc'+idCounter).append('<span class=card><img class=cardIcon src="css/themes/images/icons-png/card-icon.png" alt=""></span>');
                }
	},
    populateWeelyHeader: function(){
        var weekStartDate = dataStorage.getData(WEEK_START_DATE); 
        var weekEndDate = dataStorage.getData(WEEK_END_DATE);
        var todaysDay = Date.today().getDayName();
        var yesterday,tomorrow;
    	for(i=0;i<7;i++){
    		
    		//weekly date
    		var weeklyDate = Date.parse(weekStartDate).add(i).days();
			weeklyDate = weeklyDate.toString().split(" ");
            var splitweeklyDate = weeklyDate[3]+"-"+weeklyDate[1]+"-"+weeklyDate[2];
            var formattedweeklyDate = formatDate.reverseDateFormatter(splitweeklyDate);
            $('span#weeklyDate'+i).text(weeklyDate[2]);
            
    		//weekly day
    		var weeklyDay = Date.parse(weekStartDate).add(i).days().getDayName();
    		$('span#weeklyDay'+i).text(weeklyDay);
    		if(weeklyDay==todaysDay){
    			$('span#weeklyDay'+i).text('Today');
    			dataStorage.setData("todaysDayId",i);
    			yesterday = i-1;
    			tomorrow = i+1;
    		}
    		datesBucket[i]=formattedweeklyDate;
    		console.log("datesBucket["+i+"]: "+formattedweeklyDate);
    	}
    	$('span#weeklyDay'+yesterday).text('Yesterday');
    	$('span#weeklyDay'+tomorrow).text('Tomorrow');
    	
    	
    	//call function to get the previous and next days according to todays day in the current week
        /*var weekDays = common.calcWeekDays();
        prevDays = weekDays[0];
        nextDays = weekDays[1];
        //populate previous days
        var subDays;
        var formattedPrevDays;
        var prevDates;
        var days;
        var dayId=0;
        for(i=prevDays;i>=0;i--){
            days=(0-i);
            dayId=prevDays-i;
            subDays=Date.today().add(days).days();
            subDays = subDays.toString().split(" ");
            prevDates = subDays[3]+"-"+subDays[1]+"-"+subDays[2];
            formattedPrevDays = formatDate.reverseDateFormatter(prevDates);
            
            $('span#weeklyDate'+(dayId)).text(subDays[2]);
            var date = (subDays[3]+"-"+subDays[1]+"-"+subDays[2]);
            var formattedDate = formatDate.reverseDateFormatter(date);
            dayName = Date.today().add(days).days().getDayName();
            $('span#weeklyDay'+(dayId)).text(dayName);
            if(i==1){
                $('span#weeklyDay'+(dayId)).text("Yesterday");
            }
            if(i==0){
                $('span#weeklyDay'+(dayId)).text("Today");
                dataStorage.setData("todaysDayId",dayId);
            }
            datesBucket[dayId]=formattedDate;
            console.log("datesBucket["+dayId+"]: "+formattedDate);
        }
        //populate next days
        var addDays;
        var formattedNxtDays;
        var nextDates;
        for(i=1;i<=nextDays;i++){
            addDays=Date.today().add(i).days();
            addDays = addDays.toString().split(" ");
            nextDates = addDays[3]+"-"+addDays[1]+"-"+addDays[2];
            formattedNxtDays = formatDate.reverseDateFormatter(nextDates);
            
            $('span#weeklyDate'+(dayId+i)).text(addDays[2]);
            dayName = Date.today().add(i).days().getDayName();
            $('span#weeklyDay'+(dayId+i)).text(dayName);
            if(i==1){
                $('span#weeklyDay'+(dayId+i)).text("Tomorrow");
            }
            datesBucket[dayId+i]=formattedNxtDays;
            console.log("datesBucket["+(dayId+i)+"]: "+formattedNxtDays);
        }*/
        
        
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
    	var len = JSON.stringify(lenWeekly);
    	var listItem=[];
		var fullName="";
		var address="";
        var totalTermAmount="";
        var totalPaidAmount="";
        var paymentTypeId="";
        var status="";
                
		listItem = JSON.parse(res);
		
        totalTermAmount = (!listItem.TotalTermAmount) ? "0":Math.round(listItem.TotalTermAmount);
		totalPaidAmount = (!listItem.TotalPaidAmount) ? "0":Math.round(listItem.TotalPaidAmount);
		//status          = (listItem.StatusID).trim();
		status          = (listItem.StatusID);
        paymentTypeId   = parseInt(listItem.PaymentTypeId);
                
		//building customer name
		if(listItem.FirstName){
			fullName = fullName + listItem.FirstName;
		}
		if(!listItem.FirstName && listItem.LastName){
			fullName = fullName + listItem.LastName;
		}
		if(listItem.FirstName && listItem.LastName){
			fullName = fullName +" "+listItem.LastName;
		}
		
		//building customer address
		if(listItem.AddressLine1){
			address = listItem.AddressLine1 + ", ";
		}
		if(listItem.AddressLine2){
			address = address + listItem.AddressLine2 + ", ";
		}
		if(listItem.PostCode){
			address = address + listItem.PostCode;
		}
		
		//console.log("custID: "+listItem.CustomerID);
		//console.log(listItem.VisitDate);
		var date = listItem.VisitDate.toString().split("-");
		//console.log(date[2]);
		
		for(i=currBucket;i<datesBucket.length;i++){
			currBucket=i;
			if(datesBucket[i]==listItem.VisitDate){
				$('ul#weeklyListDay'+currBucket).append('<li class="cust ui-li-static ui-body-inherit" id=weeklyDay'+currBucket+'List'+bucketListCounter+' onclick=SCList.callCustDetails(\"'+listItem.CustomerNumber+'\")>');
                
				switch(status){
                    case statusType.PEND:
                    case statusType.CNSO:    
                        $('li#weeklyDay'+currBucket+'List'+bucketListCounter).append('<div class=SCDWvwhite>&nbsp;</div><div id=weeklyDay'+currBucket+'jOrder'+bucketListCounter+' class=journeyOrder>'+listItem.JourneyOrderBy+'</div>');
                        SCList.commonWeeklyListElements(currBucket,bucketListCounter,fullName,address);
                        break;
                    case statusType.CPA:
                    	$('li#weeklyDay'+currBucket+'List'+bucketListCounter).append('<div class=SCDWvgreen>&nbsp;</div><div id=weeklyDay'+currBucket+'jOrder'+bucketListCounter+' class=journeyOrder>'+listItem.JourneyOrderBy+'</div>');
                        SCList.commonWeeklyListElements(currBucket,bucketListCounter,fullName,address);
                        $('li#weeklyDay'+currBucket+'List'+bucketListCounter).append('<div class="SCDWAmount"><span class="paidAmt">&pound;'+totalPaidAmount+'&nbsp;</span>(<span class="weeklyTermAmt">&pound;'+totalTermAmount+'</span>)</div></li>');
                        break;
                    case statusType.COMP:
                    	$('li#weeklyDay'+currBucket+'List'+bucketListCounter).append('<div class=SCDWvgreen>&nbsp;</div><div id=weeklyDay'+currBucket+'jOrder'+bucketListCounter+' class=journeyOrder>'+listItem.JourneyOrderBy+'</div>');
                        SCList.commonWeeklyListElements(currBucket,bucketListCounter,fullName,address);
                        $('li#weeklyDay'+currBucket+'List'+bucketListCounter).append('<div class="SCDWAmount"><span class="paidAmt">&pound;'+totalPaidAmount+'&nbsp;</span>(<span class="weeklyTermAmt">&pound;'+totalTermAmount+'</span>)</div></li>');
                        break;
                    case statusType.CPD:
                    	$('li#weeklyDay'+currBucket+'List'+bucketListCounter).append('<div class=SCDWvamber>&nbsp;</div><div id=weeklyDay'+currBucket+'jOrder'+bucketListCounter+' class=journeyOrder>'+listItem.JourneyOrderBy+'</div>');
                        SCList.commonWeeklyListElements(currBucket,bucketListCounter,fullName,address);
                        $('li#weeklyDay'+currBucket+'List'+bucketListCounter).append('<div class="SCDWAmount"><span class="paidAmt">&pound;'+totalPaidAmount+'&nbsp;</span>(<span class="weeklyTermAmt">&pound;'+totalTermAmount+'</span>)</div></li>');
                        break;
                    case statusType.CNSC:
                    case statusType.SWP:
                    case statusType.SCP:    
                    	$('li#weeklyDay'+currBucket+'List'+bucketListCounter).append('<div class=SCDWvred>&nbsp;</div><div id=weeklyDay'+currBucket+'jOrder'+bucketListCounter+' class=journeyOrder>'+listItem.JourneyOrderBy+'</div>');
                        SCList.commonWeeklyListElements(currBucket,bucketListCounter,fullName,address);
                        $('li#weeklyDay'+currBucket+'List'+bucketListCounter).append('<div class="SCDWAmount"><span class="paidAmt">&pound;'+totalPaidAmount+'&nbsp;</span>(<span class="weeklyTermAmt">&pound;'+totalTermAmount+'</span>)</div></li>');
                        break;
                    case (statusType.NW):
                    	$('li#weeklyDay'+currBucket+'List'+bucketListCounter).append('<div class=SCDWvblue>&nbsp;</div><div id=weeklyDay'+currBucket+'jOrder'+bucketListCounter+' class=journeyOrder>'+listItem.JourneyOrderBy+'</div>');
                    	SCList.commonWeeklyListElements(currBucket,bucketListCounter,fullName,address);
                        break;
                    default:
                        break;
                }
                if(paymentTypeId==2){
                	$('div#weeklyDay'+currBucket+'nc'+bucketListCounter).append('<span class=card><img class=cardIcon src="css/themes/images/icons-png/card-icon.png" alt=""></span>');
                }
				
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
	callCustDetails: function(custNumber){
        dataStorage.setData(SELECTED_CUSTOMER_NUM,custNumber);
        common.redirect("customerDetails.html");
    },
    initializePage: function(){
    	$('.searchbox-input').val("");
    	
    	var viewType = dataStorage.getData(IS_WEEKLY_VIEW);
        if(viewType=="0" || viewType==""){	//daily view
	        //display selected date and day
	        var selectedVisitDate = dataStorage.getData(SELECTED_VISIT_DATE);
	        selectedVisitDate = selectedVisitDate.toString().split("-");
	        var selectedVisitDay = dataStorage.getData(SELECTED_VISIT_DAY);
	        var todaysDay = dataStorage.getData(TODAYS_DAY);
	        if(selectedVisitDay==todaysDay){
	                $('span.day').text("Today");
	        }
	        else{
	                $('span.day').text(selectedVisitDay);
	        }
	        $('span.date').text(selectedVisitDate[2]);
        }   

        //change search icon and clear search box 
        $('.searchbox-input').on('keyup focus',function(){
           var inputVal = $('.searchbox-input').val();
            inputVal = $.trim(inputVal).length;
            if (inputVal !== 0) {
                $('.searchbox-icon').css('display', 'none');
            } else {
                $('.searchbox-input').val('');
                $('ul.dailyList').children().show();
                $('.searchbox-icon').css('display', 'block');
            }
       });
       $('.searchbox-submit').on('click',function(){
           $(".searchbox-input").val("");
           $(".searchbox-input").focus();
           $('ul.dailyList').children().show();
           $('.searchbox-icon').css('display', 'block');
           $('.cust').removeHighlight();
       });

    },
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
	//alert('document ready');
	$('.ui-content').hide();
    //calling functions
        var dbObj = dataStorage.initializeDB();
       
        $('div.weeklyDivider').hide();
        
/*        $('.ui-content').height($(window).height());
        $(window).resize(function() {
        	$('.ui-content').height($(window).height());
          });*/
        
        if(viewType=="1"){	//weekly view
        	/*$('#loading-indicator').show();
        	$('#disablingDiv').show();*/
            
        	SCList.initializeWeeklyPage();
        	$("div.dailyList").hide();
        	SCList.getWeeklyCustListFromOfflineDB(dbObj);
        	SCList.autoCompleteSearchWeekly();
        	SCList.searchHighlightWeekly();
        }
        else{	//daily view
        	SCList.initializePage();
        	$('div.weeklyCollapsible').hide();
        	SCList.getDailyCustListFromOfflineDB(dbObj);
            SCList.autoCompleteSearchDaily();
            SCList.searchHighlightDaily();	
        }
        //redirect to dashboard on click of icon
        $('.dashboardIcon').on('click',function(){
            common.redirect('dashboard.html');
        });
		sideMenu.getSideMenuAgentDetails();

});

$(window).on('load',function(){
	//alert('window load');
	if(viewType=="1"){
	setTimeout(function(){
		$('.ui-content').fadeIn("fast");
		/*$('#loading-indicator').hide();
		$('#disablingDiv').hide();*/
	}, 0);	
	}
	else{
		$('.ui-content').fadeIn("fast");
		/*$('#loading-indicator').hide();
		$('#disablingDiv').hide();*/
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

