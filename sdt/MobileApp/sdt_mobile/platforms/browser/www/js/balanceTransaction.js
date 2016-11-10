var selectedUserId = dataStorage.getData(USER_ID);
var selectedBalanceType = dataStorage.getData(SELECTED_BALANCE_TYPE);
var counter = 0;
var balanceDate = "";
var balanceDateDB = "";
var rowNum;
var confirmDelete = false;
var editMode = false;
/***************************************actions to perform on document ready************************************************/
$(document).on('ready',function(){
    //calling functions
	document.addEventListener("deviceready", onDeviceReady, false);
	
  //common.setHeight('.scroll');
  
  //$(window).resize(function() {
    //common.setHeight('.cust');
  //});
	
	$("#btnAdd").bind("click", Add);
	$("#btnEdit").bind("click", Edit);
	
	$("#tblData tbody").on("change", 'input[name^="amt"]', function (event) {
		//alert("Onchange called");
        calculateRow($(this).closest("tr"));
        calculateGrandTotal();
    });
	
	$("#backLink").click(function( event ) {
			event.preventDefault();
			if(editMode === true)
				common.confirmMessage(messageboxBalance.msgConfirmDelete,confirmBackCallback, messageboxBalance.messageTitleConfirm); 
			else
				$.mobile.back();
	});
	
	
	renderDisplay();
  
});

function renderDisplay(){

	//getting parameter from session
	var balanceTransType = "";
	var isWeekly = dataStorage.getData(IS_WEEKLY_VIEW);
	var displayDate = "";
	
	if(selectedBalanceType==='L')
		balanceTransType = balanceTransactionType.L;
	else if(selectedBalanceType==='B')
		balanceTransType = balanceTransactionType.B;
	else if(selectedBalanceType==='F')
		balanceTransType = balanceTransactionType.F;
	else if(selectedBalanceType==='O')
		balanceTransType = balanceTransactionType.O;
		
	if(isWeekly !="")
	{
		var startDate = dataStorage.getData(WEEK_START_DATE);
		var endDate = dataStorage.getData(WEEK_END_DATE);
		
		
		//format start date as "07th, April" if "7th, April"
		var momentStartDate = moment(startDate).format("Do, MMMM");
		var formatedStartDate = momentStartDate.split(",");
		//alert(date[0]);
		if(formatedStartDate[0].length<=3){formatedStartDate[0]="0"+formatedStartDate[0];
		formatedStartDate=formatedStartDate[0]+formatedStartDate[1];}
		
		//format end date as "07th, April" if "7th, April"
		var momentEndDate = moment(endDate).format("Do, MMMM");
		var formatedEndDate = momentEndDate.split(",");
		if(formatedEndDate[0].length<=3){formatedEndDate[0]="0"+formatedEndDate[0];
		formatedEndDate=formatedEndDate[0]+","+formatedEndDate[1];}
		//$('div.weekDisplay').text(formatedStartDate + " - " + formatedEndDate);
	
	
		displayDate = formatedStartDate+" - "+formatedEndDate;
		
		var date = new Date();
		var YYYY = date.getFullYear();
		var mm = (date.getMonth()+1).toString();
		mm = mm.length == 1 ? '0' + mm : mm;
		var DD = (date.getDate()).toString();
		DD = DD.length == 1 ? '0' + DD : DD;
		balanceDateDB = YYYY+'-'+mm+'-'+DD;
		balanceDate = mm+'/'+DD+'/'+YYYY.toString().substr(2,2);
		
	}
	else
	{
		var visitDate = dataStorage.getData(SELECTED_VISIT_DATE);
		//format start date as "07th, April" if "7th, April"
		var momentStartDate = moment(visitDate).format("Do, MMMM");
		//console.log("momentStartDate "+ momentStartDate);
		var formatedStartDate = momentStartDate.split(",");
		//console.log("formatedStartDate "+ formatedStartDate);
		//alert(date[0]);
		if(formatedStartDate[0].length<=3){formatedStartDate[0]="0"+formatedStartDate[0];
		formatedStartDate=formatedStartDate[0]+formatedStartDate[1];}
		//console.log("formatedStartDate2 "+ formatedStartDate);
		displayDate = formatedStartDate.toString();
		//2016-05-11
		var temp = (visitDate).split("-");
		balanceDate = temp[1]+'/'+temp[2]+'/'+temp[0].toString().substr(2,2);
		balanceDateDB = visitDate;
		
	}
	
	// setting headers and dates
	$(".customheader h1").html(balanceTransType);
	$(".li-heading").html(displayDate);
	
	//hiding chq column if type is not CASH BANKED
	if(balanceTransType != 'CASH BANKED')
		$('td:nth-child(2),th:nth-child(2)').hide();
		
	getBalanceTransactionFromOfflineDB();	
	
};
 
function Add(){
	
	//check if system date is within SDT Week
	var todaysDate = dataStorage.getData(TODAYS_DATE);
    var weekStartDate = dataStorage.getData(WEEK_START_DATE);
    var weekEndDate = dataStorage.getData(WEEK_END_DATE);
    if(todaysDate>=weekStartDate && todaysDate<=weekEndDate){
		
		editMode = true;
		
    	counter = $('#tblData tr').length - 2;
    	currCounter = 0;
    		//alert(currCounter);
    	var newRow = $("<tr>");
            var cols = "";

    		cols += '<td>'+balanceDate+'</td>';
    		if(selectedBalanceType==='B')
    		cols += '<td><input type="checkbox" name="isChq' + counter + '" value="1" class="ui-chkbox"></td>';
    		cols += '<td><input type="text" maxlength="250" size="4" name="refNo' + counter + '"/></td>';
    		cols += '<td id="amt' + counter + '" name="amt' + counter + '" style="padding-right: 8px;"><input type="number" id="amt' + counter + '" style="width: 100%;" size=4 onkeypress="return validateFloatKeyPress(this,event,'+counter+');" inputmode="numeric" step="0.01" name="amt' + counter + '"/></td>';	
            cols += '<td><img src="css/themes/images/icons-png/save-icon.png" class="icon-img" id="btnSave" onclick="Save()"/></td>';
            cols += '<td><img src="css/themes/images/icons-png/delete-icon.png" class="icon-img" id="btnDelete" onclick="Delete()"/></td>';
    		cols += '<td name="rowId' + counter + '" style="display:none;"><input type="hidden"  size="4" name="rowId' + counter + '"/></td>';
            
            newRow.append(cols);
            
            $("#tblData tbody").append(newRow);
    		var target = $("#amt"+counter);

    		if( target.length ) {
    			event.preventDefault();
    			$('html, tbody').animate({
    				scrollTop: target.offset().top
    			}, 1000);
    		}
    		//$("#amt"+counter).focusin();
            //counter++;
    		currCounter++;
            if (currCounter == 1){
    			$('#btnAdd').attr('disabled', true);
    			//alert("Only one row can be added at a time");
    		}
    		
    		
			if(selectedBalanceType !='B'){	
						//alert("here");
						$('table#tblData td:nth-of-type(1)').css('width','30%'); 
						$('table#tblData td:nth-of-type(2)').css('width','30%');
						$('table#tblData td:nth-of-type(2)').each(function () {
							this.style.setProperty( 'padding-left', '5px', 'important' );
						});
						$('table#tblData td:nth-of-type(3)').css('width','40%');
						//$('table#tblData td:nth-of-type(3)').css('padding-left','0px !important'); 
						$('table#tblData td:nth-of-type(3)').each(function () {
							this.style.setProperty( 'padding-left', '0px', 'important' );
						});
						$("td#amt"+counter).css('padding-right','23px');
						//$('table#tblData td:nth-of-type(3)').css('padding-right','23px');
						$('table#tblData td:nth-of-type(4)').css('width','20%');
						//$('table#tblData td:nth-of-type(4)').css('padding-left','5px !important'); 
						$('table#tblData td:nth-of-type(4)').each(function () {
							this.style.setProperty( 'padding-left', '8px', 'important' );
						});
						$('table#tblData td:nth-of-type(5)').css('width','20%');
						//$('table#tblData td:nth-of-type(5)').css('padding-left','2px !important');
						$('table#tblData td:nth-of-type(5)').each(function () {
							this.style.setProperty( 'padding-left', '13px', 'important' );
						});						
						
					 }
					else
					{
					//alert("Not here");
						$("table#tblData td:nth-of-type(1)").css('width','30%'); 
						$("table#tblData td:nth-of-type(2)").css('width','10%');
						//$("table#tblData td:nth-of-type(2)").css('padding-left','2px !important');
						$('table#tblData td:nth-of-type(2)').each(function () {
							this.style.setProperty( 'padding-left', '2px', 'important' );
						});
						$("table#tblData td:nth-of-type(3)").css('width','30%');
						$("table#tblData td:nth-of-type(4)").css('width','40%');
						//$("table#tblData td:nth-of-type(4)").css('padding-left','0px !important'); 
						$('table#tblData td:nth-of-type(4)').each(function () {
							this.style.setProperty( 'padding-left', '0px', 'important' );
						});
						//$("table#tblData td:nth-of-type(4)").css('padding-right','8px');
						$("table#tblData td:nth-of-type(5)").css('width','20%');
						//$("table#tblData td:nth-of-type(5)").css('padding-left','5px !important'); 
						$('table#tblData td:nth-of-type(5)').each(function () {
							this.style.setProperty( 'padding-left', '5px', 'important' );
						});
						$("table#tblData td:nth-of-type(6)").css('width','20%');
						//$("table#tblData td:nth-of-type(6)").css('padding-left','2px !important'); 
						$('table#tblData td:nth-of-type(6)').each(function () {
							this.style.setProperty( 'padding-left', '2px', 'important' );
						});
					}
    		
	     //$("#btnSave").bind("click", Save);
	     //$("#btnDelete").bind("click", Delete); 
	     //$("#btnEdit").bind("click", Edit);
    }//if
    else{
    	message = "The device date "+dataStorage.getData(TODAYS_DATE)+" is not in the current week.";
		common.alertMessage(message,callbackReturn,messageboxCommonMessages.messageTitleError);
    }
	
	
 }; 

 
 function Save(){ 
var blankCount = 0;
editMode = false;
	$("#tblData tbody").on("click", "#btnSave", function (event) {
		//var par = $(this).parent().parent(); //tr 
		var par =  $(this).closest("tr");
		var transDate = par.children("td:nth-child(1)"); 
		var rowId;
		if(selectedBalanceType==='B')
		{
			var isChq = par.children("td:nth-child(2)"); 
			var refNo = par.children("td:nth-child(3)"); 
			var amt = par.children("td:nth-child(4)"); 
			var savebtn = par.children("td:nth-child(5)"); 
			var deletebtn = par.children("td:nth-child(6)");
				rowId = par.children("td:nth-child(7)"); 			
		}
		else
		{
			var refNo = par.children("td:nth-child(2)"); 
			var amt = par.children("td:nth-child(3)"); 
			var savebtn = par.children("td:nth-child(4)"); 
			var deletebtn = par.children("td:nth-child(5)"); 
			rowId = par.children("td:nth-child(6)"); 
		}
		//console.log(transDate.html());
		var ChequeIndicator = '0';
		if(selectedBalanceType==='B')
		{
			ChequeIndicator = isChq.children("input[type=checkbox]:checked").val();
			if(ChequeIndicator == undefined)
				ChequeIndicator = '0';
		}
			
		Reference = refNo.children("input[type=text]").val();
		Amount = amt.children("input[type=number]").val();
		//console.log("Reference "+Reference);
		//console.log("Amount "+Amount);
		console.log(refNo.children("input[type=text]").attr("id"));
		if(blankCount === 0){
			blankCount++;
		// if both fields empty
		if(Reference == "" && Amount == ""){
			//$("input#user-id").focus();
			//alert(Reference);
			common.alertMessage(messageboxBalanceTransactionPage.checkEmptyFields, callbackReturn, messageboxBalanceTransactionPage.messageTitleRequiredField);
		}
		else if(Reference == ""){ //if userid empty
			//$("input#user-id").focus();
			common.alertMessage(messageboxBalanceTransactionPage.checkRef, callbackReturn, messageboxBalanceTransactionPage.messageTitleRequiredField);
		}
		else if(Amount == ""){ //if surname empty
			//$("input#surname").focus();
			common.alertMessage(messageboxBalanceTransactionPage.checkAmt, callbackReturn, messageboxBalanceTransactionPage.messageTitleRequiredField);
		}
		else{
		
			var amnt = common.convertToAmount(Amount);
			console.log("RowID "+rowId.children("input[type=hidden]").val());
			//alert("RowID "+rowId.children("input[type=hidden]").val());
			var rowNumber = rowId.children("input[type=hidden]").val();
			//transDate.html(transDate); 
			if(selectedBalanceType==='B')
			isChq.children("input[type=checkbox]").prop("disabled", true);
			
			//refNo.append('<div class="elipssis">'+refNo.children("input[type=text]").val()+'</div>');
			
			refNo.html('<div class="elipssis">'+refNo.children("input[type=text]").val()+'</div>');
			amt.html(amnt);
			savebtn.html("");
			deletebtn.html("<img src=css/themes/images/icons-png/edit-icon.png class=icon-img id='btnEdit' onclick='Edit()'/>");
			
			
			calculateGrandTotal();
			
			//saving to offline database
			//alert("why loop");
			if( Amount != undefined && Reference != undefined)
			{
				if(rowNumber !="" && rowNumber != undefined && rowNumber != null)
				{
					var inputparam = [Amount,Reference,ChequeIndicator,rowNumber];
					console.log(inputparam);
					updateToDB(inputparam);
				}
				else
				{
					
					var inputparam = [balanceDateDB,Amount,Reference,selectedBalanceType,'D',ChequeIndicator,0,0];
					console.log(inputparam);
					saveToDB(inputparam,rowId);
				}
			
			}
			
			$('#btnAdd').attr("disabled", false);
		}
		
		
		}
		
		
  });
  $("#btnEdit").bind("click", Edit);
		//$('#btnAdd').attr("disabled", false);
		//$("#btnDelete").bind("click", Delete); 
 }; 
 
 
 function Edit(){ 
	
	 $("#tblData tbody").on("click", "#btnEdit", function (event) {
			//var par = $(this).parent().parent(); //tr
			var par =  $(this).closest("tr");
			var transDate = par.children("td:nth-child(1)"); 
			
			if(selectedBalanceType==='B')
			{
				var isChq = par.children("td:nth-child(2)"); 
				var refNo = par.children("td:nth-child(3)"); 
				var amt = par.children("td:nth-child(4)"); 
				var savebtn = par.children("td:nth-child(5)"); 
				var deletebtn = par.children("td:nth-child(6)"); 
			}
			else
			{
				var refNo = par.children("td:nth-child(2)"); 
				var amt = par.children("td:nth-child(3)"); 
				var savebtn = par.children("td:nth-child(4)"); 
				var deletebtn = par.children("td:nth-child(5)"); 
			}
			
			
			//console.log(refNo.children("input[type=text]").attr("name"));
			//console.log("Amt ID "+amt.attr("name").substring(3));
			//amt.css('padding-right','8px');
			var attrName = amt.attr("name");
			if(attrName != undefined)
			{
			if(selectedBalanceType==='B')
			isChq.children("input[type=checkbox]").prop("disabled", false);
			refNo.html("<input type='text' name='' maxlength='250' size='4' value='"+refNo.children("div[class=elipssis]").html()+"'/>");
			
			amt.html("<input type='number' name='"+attrName+"' id='" + attrName + "' style='width: 100%;' data-corners=false size=4 onkeypress='return validateFloatKeyPress(this,event,"+attrName.substring(3)+");' inputmode=numeric step=0.01  value='"+amt.html()+"'/>");
			//amt.html("<input type='text' name='' maxlength=4 size='4'  value='"+amt.html()+"'/>");
			savebtn.html("<img src=css/themes/images/icons-png/save-icon.png class=icon-img id='btnSave' onclick='Save()'/>");
			deletebtn.html("<img src=css/themes/images/icons-png/delete-icon.png class=icon-img id='btnDelete' onclick='editDelete()'/>");
			}
			
		 $('#btnAdd').attr('disabled', true);
    });
	
	$("#btnSave").bind("click", Save); 
		 //$("#btnEdit").bind("click", Edit); 
		 $("#btnDelete").bind("click", editDelete);  
	
 };
 
 function Delete(){
 var result = confirm(messageboxBalance.msgConfirmDelete);

if (result == true) {
    //Logic to delete the item
	editMode = false;
	var deleteCount = 0;
 $("#tblData tbody").on("click", "#btnDelete", function (event) {
		var par =  $(this).closest("tr");
		
		var rowId;
		if(selectedBalanceType==='B')
		{
			var refNo = par.children("td:nth-child(3)"); 
			var amt = par.children("td:nth-child(4)"); 
			rowId = par.children("td:nth-child(7)"); 			
		}
		else
		{
			var refNo = par.children("td:nth-child(2)"); 
			var amt = par.children("td:nth-child(3)"); 
			rowId = par.children("td:nth-child(6)"); 
		}
		
		
		Reference = refNo.children("input[type=text]").val();
		Amount = amt.children("input[type=number]").val();
		console.log("Reference "+Reference);
		console.log("Amount "+Amount);
		console.log("RowID "+rowId.children("input[type=hidden]").val());
		var rowNumber = rowId.children("input[type=hidden]").val();
		//alert(rowNumber);
		if( Amount != undefined && Reference != undefined)
		{
			if(rowNumber !="" && rowNumber != undefined && rowNumber != null)
				{
					if(deleteCount == 0)
					{
						deleteCount++;
						var inputparam = [1,rowNumber];
						console.log(inputparam);
						updateDeleteToDB(inputparam);
					}
				}
			
		}
		
        $(this).closest("tr").remove();
        calculateGrandTotal();
        counter --;
        $('#btnAdd').attr("disabled", false);
    });
}
//common.confirmMessage(messageboxBalance.msgConfirmDelete,confirmDeleteCallback, messageboxBalance.messageTitleConfirm); 


 };
 
  function editDelete(){
var deleteCount = 0;

 $("#tblData tbody").on("click", "#btnDelete", function (event) {
		var par =  $(this).closest("tr");
		
		var rowId;
		if(selectedBalanceType==='B')
		{
			var refNo = par.children("td:nth-child(3)"); 
			var amt = par.children("td:nth-child(4)"); 
			rowId = par.children("td:nth-child(7)"); 			
		}
		else
		{
			var refNo = par.children("td:nth-child(2)"); 
			var amt = par.children("td:nth-child(3)"); 
			rowId = par.children("td:nth-child(6)"); 
		}
		
		
		Reference = refNo.children("input[type=text]").val();
		Amount = amt.children("input[type=number]").val();
		console.log("Reference "+Reference);
		console.log("Amount "+Amount);
		console.log("RowID "+rowId.children("input[type=hidden]").val());
		var rowNumber = rowId.children("input[type=hidden]").val();
		//alert(rowNumber);
		if( Amount != undefined && Reference != undefined)
		{
			if(rowNumber !="" && rowNumber != undefined && rowNumber != null)
				{
					if(deleteCount == 0)
					{
						deleteCount++;
						var inputparam = [1,rowNumber];
						console.log(inputparam);
						updateDeleteToDB(inputparam);
					}
				}
			
		}
		
        $(this).closest("tr").remove();
        calculateGrandTotal();
        counter --;
        $('#btnAdd').attr("disabled", false);
    });

 };



 function calculateRow(row) {
    var amt = +row.find('input[name^="amt"]').val();
	//var amt = +row.find('td[name^="amt"]').val();

}

function calculateGrandTotal() {
    var grandTotal = 0;
   /* $("#tblData tbody").find('input[name^="amt"]').each(function () {
        grandTotal += +$(this).val();
    });*/
	$("#tblData tbody").find('td[name^="amt"]').each(function () {
        grandTotal += +$(this).text();
    });
    $("#grandtotal").text(grandTotal.toFixed(2));
	$("#grandtotal").css('font-weight','bold');
}

// Database 

/**********************insert data into offline DB***********************/
 function saveToDB(inputData,rownum){
    	console.log("Saving...");
    	
		var dbObj = dataStorage.initializeDB();
			dbObj.transaction(function insertTransactionRecords(tx){
					tx.executeSql(dbQueries.insertIntoMtbBalanceTransactionStatement, inputData,function(tx, results) {
    var lastInsertId = results.insertId;
	rownum.html("<input type='hidden' name='' size='4'  value='"+lastInsertId+"'/>");
	//alert(lastInsertId);
  });
			},errorInsert,successInsert);
    	
    	
 }
 
 function updateToDB(inputData){
    	console.log("Updating...");
    	
		var dbObj = dataStorage.initializeDB();
			dbObj.transaction(function updateTransactionRecords(tx){
					tx.executeSql(dbQueries.updateIntoMtbBalanceTransactionStatement, inputData);
			},errorInsert,successInsert);
}

function updateDeleteToDB(inputData){
    	console.log("Deleting...");
    	
		var dbObj = dataStorage.initializeDB();
			dbObj.transaction(function updateDeleteTransactionRecords(tx){
					tx.executeSql(dbQueries.updateDeleteMtbBalanceTransaction, inputData);
			},errorInsert,successDelete);
}
 
 function errorInsert() {
    	common.alertMessage(messageboxOfflineDataSave.messageError,callbackReturn,messageboxCommonMessages.messageTitleError);   
    }
    /************************transaction success callback****************************/
 function successInsert() {
    	common.alertMessage(messageboxOfflineDataSave.messageSuccess,callbackReturn,messageboxCommonMessages.messageTitleSuccess);
			
    }
	function successDelete() {
    	common.alertMessage(messageboxOfflineDataSave.messageSuccessDelete,callbackReturn,messageboxCommonMessages.messageTitleSuccess);
			
    }
	
function getBalanceTransactionFromOfflineDB(){
        
		var isWeekly = dataStorage.getData(IS_WEEKLY_VIEW);
		var query;
		if(isWeekly != "")
		{
			query = dbQueries.getBalanceTransaction;
			inputParam = [selectedBalanceType];
		}
		else
		{
			var visitDate = dataStorage.getData(SELECTED_VISIT_DATE);
			//var temp = (visitDate).split("-");
			//var selectedBalanceDate = temp[1]+'/'+temp[2]+'/'+temp[0].toString().substr(2,2);
			query = dbQueries.getBalanceTransactionDaily;
			inputParam = [selectedBalanceType,visitDate];
		}
		
        var dbObj = dataStorage.initializeDB();
        
        //execute SQL query
        dbObj.transaction(function(tx) {
            tx.executeSql(query,inputParam,function(tx,res){
                var len = res.rows.length;
                if(len==0){
					console.log(len);      
                }
                if(len > 0) {
					for(var i=0;i<len;i++)
					{
						//console.log(JSON.stringify(res.rows.item(i)));
						renderBalanceTrans(i,JSON.stringify(res.rows.item(i)))
					}
					calculateGrandTotal();
					//$("td:nth-of-type(1)").css("background-color", "yellow");
					if(selectedBalanceType !='B'){	
						//alert("here");
						$('table#tblData td:nth-of-type(1)').css('width','30%'); 
						$('table#tblData td:nth-of-type(2)').css('width','30%');
						$('table#tblData td:nth-of-type(2)').each(function () {
							this.style.setProperty( 'padding-left', '5px', 'important' );
						});
						$('table#tblData td:nth-of-type(3)').css('width','40%');
						//$('table#tblData td:nth-of-type(3)').css('padding-left','0px !important'); 
						$('table#tblData td:nth-of-type(3)').each(function () {
							this.style.setProperty( 'padding-left', '0px', 'important' );
						});
						$('table#tblData td:nth-of-type(3)').css('padding-right','38px');
						$('table#tblData td:nth-of-type(4)').css('width','20%');
						//$('table#tblData td:nth-of-type(4)').css('padding-left','5px !important'); 
						$('table#tblData td:nth-of-type(4)').each(function () {
							this.style.setProperty( 'padding-left', '5px', 'important' );
						});
						$('table#tblData td:nth-of-type(5)').css('width','20%');
						//$('table#tblData td:nth-of-type(5)').css('padding-left','2px !important');
						$('table#tblData td:nth-of-type(5)').each(function () {
							this.style.setProperty( 'padding-left', '13px', 'important' );
						});						
						
					 }
					else
					{
					//alert("Not here");
						$("table#tblData td:nth-of-type(1)").css('width','30%'); 
						$("table#tblData td:nth-of-type(2)").css('width','10%');
						//$("table#tblData td:nth-of-type(2)").css('padding-left','2px !important');
						$('table#tblData td:nth-of-type(2)').each(function () {
							this.style.setProperty( 'padding-left', '2px', 'important' );
						});
						$("table#tblData td:nth-of-type(3)").css('width','30%');
						
						$("table#tblData td:nth-of-type(4)").css('width','40%');
						//$("table#tblData td:nth-of-type(4)").css('padding-left','0px !important'); 
						$('table#tblData td:nth-of-type(4)').each(function () {
							this.style.setProperty( 'padding-left', '0px', 'important' );
						});
						$("table#tblData td:nth-of-type(4)").css('padding-right','20px');
						$("table#tblData td:nth-of-type(5)").css('width','20%');
						//$("table#tblData td:nth-of-type(5)").css('padding-left','5px !important'); 
						$('table#tblData td:nth-of-type(5)').each(function () {
							this.style.setProperty( 'padding-left', '5px', 'important' );
						});
						$("table#tblData td:nth-of-type(6)").css('width','20%');
						//$("table#tblData td:nth-of-type(6)").css('padding-left','2px !important'); 
						$('table#tblData td:nth-of-type(6)').each(function () {
							this.style.setProperty( 'padding-left', '2px', 'important' );
						});
					}
                   // alert(JSON.stringify(res));
                    //selectedCustLoanDetails.renderSelectedCustDetails(JSON.stringify(res.rows.item(0)));
                }

            });
        });
    }
	
	
	function renderBalanceTrans(i,res){
        var listItem;
        listItem=JSON.parse(res);
		console.log(res);
		var amnt = common.convertToAmount(listItem.Amount);
		var newRow = $("<tr>");
        var cols = "";
		var temp = (listItem.BalanceDate).split("-");
		var balDateDisplay = temp[1]+'/'+temp[2]+'/'+temp[0].toString().substr(2,2);

		cols += '<td>'+balDateDisplay+'</td>';
		if(selectedBalanceType==='B')
		{
			if(listItem.ChequeIndicator == 1)
				cols += '<td><input type="checkbox" name="isChq' + i + '" value="1" checked disabled class="ui-chkbox"></td>';
			else
				cols += '<td><input type="checkbox" name="isChq' + i + '" value="1" disabled class="ui-chkbox"></td>';
		}
		cols += '<td><div class="elipssis"> '+listItem.Reference+'</div></td>';
		cols += '<td name="amt' + i + '" class="amt-css">'+amnt+'</td>';	
        cols += '<td></td>';
        cols += '<td><img src=css/themes/images/icons-png/edit-icon.png class=icon-img id="btnEdit" onclick="Edit()"/></td>';
		cols += '<td name="rowId' + i + '" style="display:none;"><input type="hidden"  size="4" value="'+listItem.BalanceID+'" name="rowId' + i + '"/></td>';
        
        newRow.append(cols);
        
        $("#tblData tbody").append(newRow);
		//$('#tblData thead tr th,#tblData tbody tr td,#tblData tfoot tr td').css('width',  ($('#tblData thead tr ').width()/Number(5)) + 'px');
    }

/*function validateFloatKeyPress(el, evt, n) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    var number = el.value.split('.');
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    //just one dot
    if(number.length>1 && charCode == 46){
         return false;
    }
    //get the carat position
    var caratPos = getSelectionStart(el);
    var dotPos = el.value.indexOf(".");
    if( caratPos > dotPos && dotPos>-1 && (number[1].length > 1)){
        return false;
    }
    var currentChar = parseFloat(String.fromCharCode(charCode), 10);
    var nextValue = $('#amt'+n).val() + currentChar;
    if(parseFloat(nextValue, 10) > 9999.99){
        return false;
    }
    return true;
};*/


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
     var nextValue = $('#amt'+n).val() + currentChar;
      //Check length after 2 decimal point  
      if(nextValue.indexOf('.')!=-1){         
       if(nextValue.split(".")[1].length > 2){                
                 return false;
           }
		if(nextValue.split(".")[0].length > 5){                
                 return false;
           }
       }
	  /* else
	   {
			if(nextValue.length > 4){                
                 return false;
           }
	   }*/
		
              
    return true;
};



//thanks: http://javascript.nwbox.com/cursor_position/
/*function getSelectionStart(o) {
	if (o.createTextRange) {
		var r = document.selection.createRange().duplicate()
		r.moveEnd('character', o.value.length)
		if (r.text == '') return o.value.length
		return o.value.lastIndexOf(r.text)
	} else return o.selectionStart
}*/

function confirmDeleteCallback(buttonIndex){
	alert("calback");
    if(buttonIndex == 1){
      
	  //$("#btnDelete").trigger("click");
	  
    }
};

function confirmBackCallback(buttonIndex){
	if(buttonIndex == 1){
      $.mobile.back();
	  //$("#btnDelete").trigger("click");
	  
    }
};

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