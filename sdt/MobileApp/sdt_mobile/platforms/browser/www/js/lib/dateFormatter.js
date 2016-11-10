/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var formatDate = {
    dateFormatter: function(date){
        var dateArray=[];
        dateArray=date.split("-");
        var monthArray=["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"];
        var month;
        var monthNum=dateArray[1];
        switch(monthNum){
            case '01':
                month=monthArray[0];
                break;
            case '02':
                month=monthArray[1];
                break;
            case '03':
                month=monthArray[2];
                break;
            case '04':
                month=monthArray[3];
                break;
            case '05':
                month=monthArray[4];
                break;
            case '06':
                month=monthArray[5];
                break;
            case '07':
                month=monthArray[6];
                break;
            case '08':
                month=monthArray[7];
                break;
            case '09':
                month=monthArray[8];
                break;
            case '10':
                month=monthArray[9];
                break;
            case '11':
                month=monthArray[10];
                break;
            case '12':
                month=monthArray[11];
                break;
            default:
                break;
        }
        formattedVisitDate=(dateArray[0]+"-"+month+"-"+dateArray[2]);
        return formattedVisitDate;
    },
    reverseDateFormatter: function(date){
        var dateArray=[];
        dateArray=date.split("-");
        var monthArray=["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"];
        var month;
        var monthName=dateArray[1];
        switch(monthName){
            case 'Jan':
                month='01';
                break;
            case 'Feb':
                month='02';
                break;
            case 'Mar':
                month='03';
                break;
            case 'Apr':
                month='04';
                break;
            case 'May':
                month='05';
                break;
            case 'June':
                month='06';
                break;
            case 'July':
                month='07';
                break;
            case 'Aug':
                month='08';
                break;
            case 'Sep':
                month='09';
                break;
            case 'Oct':
                month='10';
                break;
            case 'Nov':
                month='11';
                break;
            case 'Dec':
                month='12';
                break;
            default:
                break;
        }
        formattedVisitDate=(dateArray[0]+"-"+month+"-"+dateArray[2]);
        return formattedVisitDate;
    },
    slashFormat: function(date){
        var dateArray=[];
        dateArray=date.split("/");
        var monthArray=["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"];
        var month;
        var monthName=dateArray[1];
        switch(monthName){
            case 'Jan':
                month='01';
                break;
            case 'Feb':
                month='02';
                break;
            case 'Mar':
                month='03';
                break;
            case 'Apr':
                month='04';
                break;
            case 'May':
                month='05';
                break;
            case 'June':
                month='06';
                break;
            case 'July':
                month='07';
                break;
            case 'Aug':
                month='08';
                break;
            case 'Sep':
                month='09';
                break;
            case 'Oct':
                month='10';
                break;
            case 'Nov':
                month='11';
                break;
            case 'Dec':
                month='12';
                break;
            default:
                break;
        }
        formattedVisitDate=(dateArray[0]+"/"+month+"/"+dateArray[2]);
        return formattedVisitDate;
    },
    fromServiceToDB: function(date){
	    //format visit date
	    var date = (date).toString().split("-");
	    var splitDate = (date[2]).toString().split(" ");
	    var formattedDate = date[0]+"-"+date[1]+"-"+splitDate[0];
	    return formattedDate;
    },
    menuFormat: function(weekDate){
    	//format date as "07th, April" if "7th, April"
		var momentDate = moment(weekDate).format("Do, MMMM");
		var formatedDate = momentDate.split(",");
		if(formatedDate[0].length<=3){
		    formatedDate[0]="0"+formatedDate[0];
		    formatedDate=formatedDate[0]+formatedDate[1];
		}
		return formatedDate;
	}
};
