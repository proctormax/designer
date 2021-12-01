qPack("ISlider",function(){

    const CRange = qRequire("CRange");
    
    const CWidget = qRequire("CWidget");
    
    const CSignal = qRequire("CSignal");

    function ISlider( type,  max, min, step=1){
        qExtend(this, CRange, max, min, step );
        qExtend(this, CWidget, "div", type );

        const m_ = {
            pressed:"Boolean",
            released:"Boolean",
            moved:"Boolean",
        };

        qProperties( this, m_ );
    }
    ISlider.prototype.RenderEvent = function( ){
        
    };
    

    ISlider.prototype.RangeChanged  = new CSignal( ISlider.prototype,  "RangeChanged", {min:"Number", max:"Number"} );
    
    ISlider.prototype.SetRange = function( max, min ){
        qAssert( qTypeOf(max)!="Number" );
        qAssert( qTypeOf(min)!="Number" );

        this.SetMaximum( max );
        this.SetMinimum( min );

        //this.RangeChanged.Emit({max,min});
        qEmit( this,"RangeChanged", {max,min});

        this.RenderEvent();
    };
    
    return ISlider;
});

