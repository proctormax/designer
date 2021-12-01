
qRequire("CDebug");
qRequire("CWidget");
qRequire("CAction");

/***
* Hikestone Inc
**/
qPackage("Control.CLinkButton",(function(){
    function CLinkButton( action, url="#" ){
        CWidget.ExtentTo(this,['a','CLinkButton']);
    }
    construct__(CLinkButton,"void",function(){
        return new CLinkButton('link','#');
    });
    CLinkButton.Cast=function(other){ 
        return new CLinkButton(other);
    };

    return CLinkButton;
})());