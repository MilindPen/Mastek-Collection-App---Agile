/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
document.addEventListener("deviceready",onDeviceReady,false);
function onDeviceReady(){

}
function btnCallFun(){
    window.plugins.CallNumber.callNumber(function(){ alert("calling");},function(e){},"8655877317");
}


