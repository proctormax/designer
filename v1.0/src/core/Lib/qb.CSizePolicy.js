
/***
 * CSizePolicy
 * Layout attribute describing horizontal and vertical resizing policy
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
QB.CSizePolicy=function ( )
{
	QB.CLayout.apply(this,[""]);
};