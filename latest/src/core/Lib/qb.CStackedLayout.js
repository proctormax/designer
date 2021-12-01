
/***
 * CStackedLayout
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
QB.CStackedLayout=function ( parent = null )
{
	QB.CLayout.apply(this,[parent]);

	this.AddWidget=function(widget){};
	this.CurrentIndex=function(){};
	this.CurrentWidget=function(){};
	this.InsertWidget=function(index, widget){};
	this.SetStackingMode=function(stackingMode){};
	this.StackingMode=function(){};
	this.Widget=function(index){};
};