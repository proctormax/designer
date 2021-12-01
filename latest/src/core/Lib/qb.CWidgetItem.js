
/***
 * CWidgetItem
 * Layout item that represents a widget
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
QB.CWidgetItem=function ( )
{
	QB.CLayout.apply(this,[""]);
};