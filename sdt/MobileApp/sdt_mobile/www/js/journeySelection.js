var loggedINUserBranchId = dataStorage.getData(LOGGEDINUSER_BRANCH_ID);
var weekStartDate = dataStorage.getData(WEEK_START_DATE);
var weekEndDate = dataStorage.getData(WEEK_END_DATE);

var selectedUserId = dataStorage.getData(USER_ID);
var counter = 1;
/***************************************actions to perform on document ready************************************************/
$(document).on('ready',function(){

    //calling functions
	//document.addEventListener("deviceready", onDeviceReady, false);
		dataStorage.setData(DASHBOARD_ACTIVE_TAB,"daily");
		if(dataStorage.getData(JOURNEY_ID)== "null")
		{
			$('.dashboardIcon').addClass("ui-state-disabled");
		}
		else
		{
			$('.dashboardIcon').removeClass("ui-state-disabled");
			//redirect to dashboard on click of icon
			$('.dashboardIcon').on('click',function(){
				common.redirect('dashboard.html');
			});
		}
		
		//Check for delegated journeys and disable select journey option all sideMenu 
		sideMenu.checkDeligatedJourneys();
	
		
		
		sideMenu.getSideMenuAgentDetails();
		
		$('.pageFooter').append('<div class="checkbox-input"><input type="checkbox" name="checkbox-0" id="checkbox1"><label for="checkbox1" id="chkboxlabel"></label></div>\n\<div class="checkbox-label">Show me this list every time I login</div>\n\ ');
		
		getJourneyList();
		getShowOnLoginInfo();
		
		$('#checkbox1').change(function() {			
		var showOnLogin = 0;
        if(this.checked) {
            showOnLogin = 1;
        }
		
			updateMTBUserShowOnLogin(showOnLogin);
			  
		});
	
});

//Get Primary and Delegated Journey List Data
	function getJourneyList(){
        
        var dbObj = dataStorage.initializeDB();
       
        
        //execute SQL query
        dbObj.transaction(function(tx) {
            tx.executeSql(dbQueries.selectJourneyList,[],function(tx,res){
                var len = res.rows.length;
                if(len==0){
					console.log(len);
					
                }
                if(len > 0) {
					console.log("Fetched Data length "+len);
					for(var i = 0;i<len;i++)
					{
						console.log(JSON.stringify(res.rows.item(i)));
						renderJourneyList(res.rows.item(i));
					}
					$( "ul#journeyList" ).listview( "refresh" );
                }

            });
        },function(){console.log("Error");}, function(){console.log("Success");});
 }
 
 //Get Primary and Delegated Journey List Data
	function getShowOnLoginInfo(){
        
        var dbObj = dataStorage.initializeDB();
       
        
        //execute SQL query
        dbObj.transaction(function(tx) {
            tx.executeSql(dbQueries.selectShowOnLogin,[],function(tx,res){
                var len = res.rows.length;
                if(len==0){
					console.log(len);
					
                }
                if(len > 0) {
					console.log("Fetched Data length "+len);
					for(var i = 0;i<len;i++)
					{
						console.log(JSON.stringify(res.rows.item(i)));
						
						if(res.rows.item(i).ShowOnLogin == 1)
						{	
							$('#checkbox1').prop("checked", true);
						}
					}
					
                }

            });
        },function(){console.log("Error");}, function(){console.log("Success");});
 }
 
 function updateMTBUserShowOnLogin(showOnLogin){
    	
		var dbObj = dataStorage.initializeDB();
			dbObj.transaction(function(tx){
					tx.executeSql(dbQueries.updateShowOnLogin, [showOnLogin]);
			},function(){console.log("Error Updating")}, function(){console.log("Success Updating")});
    	
    	
    }
 
 
 function renderJourneyList(journeyList){
	console.log("journeyList "+journeyList.JourneyID);
	journeyIndicator = "";
	if(journeyList.IsPrimaryJourney ==1)
	{
		$('li#primary span#journeyDesc').html(journeyList.JourneyDescription);
		$('li#primary span#primaryAgentName').html(journeyList.PrimaryAgentName);
		$('li#primary a').attr('onclick','handleRedirect("'+journeyList.JourneyID+'","'+journeyList.IsPrimaryJourney+'","'+journeyList.JourneyDescription+'","'+journeyList.PrimaryAgentName+'")');
	}
	else
	{
		if(counter == 1)
		{
			journeyIndicator = 'D';
		}
		
		
		$('ul#journeyList').append('<li class="delegated" data-icon="false"><span id="journeyIndicator" class="delegatedJourney">'+journeyIndicator+'</span><a href="#" class="ui-btn"><span id="journeyDesc">'+journeyList.JourneyDescription+'</span>&nbsp;-&nbsp;<span id="primaryAgentName">'+journeyList.PrimaryAgentName+'</span></a></li>');
		$('li.delegated a').attr('onclick','handleRedirect("'+journeyList.JourneyID+'","'+journeyList.IsPrimaryJourney+'","'+journeyList.JourneyDescription+'","'+journeyList.PrimaryAgentName+'")');
				
		counter++;
	}
	
 }
 
 function handleRedirect(journeyId,isPrimaryJourney,journeyDesc,primaryAgentName){
	dataStorage.setData(JOURNEY_ID,journeyId);
	dataStorage.setData(IS_SELECTED_JOURNEY_PRIMARY,isPrimaryJourney);	
	dataStorage.setData(JOURNEY_DESCRIPTION,journeyDesc);
	dataStorage.setData(PRIMARY_AGENT_NAME,primaryAgentName);
	common.redirect("dashboard.html");
}

//session validation

$(document).on('click',function(){
	session.sessionValidate(selectedUserId)
        common.disableBackButtonAfterTimeout();;
});
function onDeviceReady() {
	console.log(navigator.notification);
    session.sessionValidate(selectedUserId);
    common.disableBackButtonAfterTimeout();
    document.addEventListener("resume", onResume, false);
}
function onResume() {
    session.sessionValidate(selectedUserId);
    common.disableBackButtonAfterTimeout();
 }
$(document).on("scrollstart",function(){
	  session.sessionValidate(selectedUserId);
          common.disableBackButtonAfterTimeout();
});

