var commonAttributes = {
		checkUserSession: true,
		blockViewSource: true
};

var balanceTransactionType = {
                LaonsIssued: 'L',
                FloatWithdrawn: 'F',
                CashBanked: 'B',
                Other: 'O',
                Week: 'W',
				Collection: 'C',
		L: 'LOANS ISSUED',
		F: 'FLOAT WITHDRAWN',
		B: 'CASH BANKED',
		O: 'OTHER',
		C: 'COLLECTION',
        W: 'Week'
};

var errorMsg = {
                blankReferenceField: 'Reference is mandatory.',
                blankAmountField: 'Amount is mandatory.',
                zeroAmount: 'Amount must be greater than zero.',
                maxAmount: 'Amount cannot be greater than 9999.99',
	        invalidRefLoan: 'Reference text format must be in the format Part 1 - Part 2, where:<br>- Part 1 is mandatory, whereas Part 2 is optional<br>- Part 1 must be a customer number in the format 9999999999 or x9999999999 or xx9999999999. It means:<br>i.First character or first two characters as either alphabets (A to Z or a to z), or numeric (0 to 9)<br>ii.Rest of the characters as number which is less than 9999999999<br>- Part 2 is free format text, typically customer name<br>Examples: C1234567890, ca789012 , 14567 � James Smith , c9834 � Alison Bell',
                invalidRefForFloatandCash: 'Reference text must be in the format Part 1/Part 2 - Part 3, where:<br>- Part 1 is mandatory whereas Part 2 and Part 3 is optional.<br>- Part 1 and Part 2 can be either a journey number starting with J or j, or manager number starting with M or m and rest of the characters are numeric and length is not more than 4.<br>- Part 3 is free format text.<br>Examples: J23/J3456, J1234/M9890 - from Andrews, m90/J1435 - Solihull, J123, J345 - Solihull'
};


/**********************session storage***************************/
var session = {
	/*************************set session data********************************/	
    setData: function(key,value){
        sessionStorage.setItem(key,value);
    },
    /*************************get session data********************************/
    getData: function(key){
        var value = sessionStorage.getItem(key);
        return value; 
    }
};

/**********************Common functions***************************/
var common = {
	/********************************redirect to a specified URL****************************************/
	redirect: function(url){
		window.location.href=url;
	},
	
	/***************************************Convert Amount to float and fixed 2 decimal************************************************/
	convertToAmount: function(amt){
		if(amt !== "" && amt !== null && amt !== undefined){
			return parseFloat(amt).toFixed(2);
		}
		
		return parseFloat(0.00).toFixed(2);
		
	},
	convertToFormattedAmount: function(amt){
		if(amt !== "" && amt !== null && amt !== undefined){
			return common.thousandSeparator(parseFloat(amt).toFixed(2));
		}
		
		return parseFloat(0.00).toFixed(2);
		
	},
	convertToBlankIfNull: function(data){
		if(data==null || data=="" || data==undefined){
			data="";
		}
		return data;
	},
	
	checkUserSession: function(){
		var loggedInUserId = session.getData(LOGGEDIN_USER_ID);
		console.log("loggedInUserId "+loggedInUserId);
		if(loggedInUserId == "" || loggedInUserId == null || loggedInUserId == undefined){
			common.redirect("balancing/");
		}
		
	},
	//amount formatting functions
	thousandSeparator: function(x) {
	   
	   //Seperates the components of the number
		var components = x.toString().split(".");
		//Comma-fies the first part
		components [0] = components [0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		//Combines the two sections
		return components.join(".");
	},
	removeComma: function(x){
		x = x.replace(/,/g, '');
		//var parsed = parseFloat(x).toFixed(2);
		return parseFloat(x).toFixed(2);
	}
};

/**********************Messages***************************/
var messageboxCommon = {
		messageTitleError: 'Error',
		messageTitleAlert: 'Information',
		messageTitleConfirm: 'Confirm'
};


//Display Logged-in user name on header
$(document).on('ready',function(){
	$('#menuAgentName').html(session.getData(LOGGEDIN_USER_NAME));
	detectBrowser();
});

//Balance Transaction message
var messageboxBalance = {
	msgSaveSuccess: 'Changes saved successfully.',
    msgConfirmDelete: 'Changes will not be saved. Continue ?'
};

var messageboxWeeklySummarySheet = {
	msgSaveSuccess: 'Changes saved successfully.',
	msgNavigatingAway: 'Please click on submit to save the updated balance.'
};

var messageboxBranchBalance = {
		msgSuccess: 'Week closed successfully.',
	    msgConfirmClose: 'Are you sure, you want to close the week ?'
};

var messageboxCallService = {
		
		errorConnectionMsgSave: 'Unable to save. Please try again.',
		errorConnectionMsgBalancing: 'Error connecting to balancing server.',
		errorConnectionMsgSecurity: 'Error connecting to Security server.',
		errorConnectionMsgTransaction: 'Error connecting to Transaction server.',
		
}

window.alert=function(title,alertMessage){
	bootbox.dialog({
		  message: alertMessage,
		  title: title,
		  buttons: {
		    success: {
		      label: "OK",
		      className: "custom-modalbtn-primary",
		      callback: function() {
		        
		      }
		    }
		    
		  }
		});
}


window.confirm=function(title,alertMessage,callbackConfirm){
	bootbox.confirm({
		  message: alertMessage,
		  title: title,
		  callback: callbackConfirm,
		  buttons: {
			  cancel: {
			      label: "Cancel",
			      className: "custom-modalbtn-default",
			      callback: function(result) {
			    	console.log("Cancelled");
			        return false;
			      }
			    }, 
			    confirm: {
			      label: "OK",
			      className: "custom-modalbtn-primary",
			      callback: function(result) {
			    	 console.log("OK");
			         return true;
			      }
			    }
		  }
		});
}


/*********Prevent View Source******************/
$(document).keydown(function(event){
    if(event.keyCode==123 && commonAttributes.blockViewSource == true){
    return false;
   }
else if(event.ctrlKey && event.shiftKey && event.keyCode==73 && commonAttributes.blockViewSource == true){        
      return false;  //Prevent from ctrl+shift+i
   }
});

//disable right click
document.oncontextmenu = function(e){
	if(commonAttributes.blockViewSource == true){
	return false;
	}
}

function detectBrowser(){
    // Opera 8.0+
	var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
	    // Firefox 1.0+
	var isFirefox = typeof InstallTrigger !== 'undefined';
	    // At least Safari 3+: "[object HTMLElementConstructor]"
	var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
	    // Internet Explorer 6-11
	var isIE = /*@cc_on!@*/false || !!document.documentMode;
	    // Edge 20+
	var isEdge = !isIE && !!window.StyleMedia;
	    // Chrome 1+
	var isChrome = !!window.chrome && !!window.chrome.webstore;
	    // Blink engine detection
	var isBlink = (isChrome || isOpera) && !!window.CSS;

	var browserType;
	
	if(isIE == true){ 
		browserType = "IE" 
	}
	else if(isChrome == true){ 
		browserType = "CHROME"
	}
	else if(isFirefox == true){
		browserType = "FIREFOX"
	}
	else if(isEdge == true){ 
		browserType = "EDGE"
	}
	
	session.setData(BROWSER_TYPE,browserType);
	console.log(browserType);
	
}
