
/***
 * CStackedWidget
 * Stack of widgets where only one widget is visible at a time
**/
qPackage("path.CX",(function(){
    function CX( arg ){
        qProperties(this,[{'x':"String"}]);
    }
    qConstruct(CX,"void",function(){
        return new CX('');
    });
    CX.Cast=function(other){ 
        return new CX(other);
    };

    return CX;
})());
QB.CStackedWidget=function ( )
{
	QB.CLayout.apply(this,[""]);
};