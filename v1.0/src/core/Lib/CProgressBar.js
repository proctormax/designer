qPack("CProgressBar",function(){

    const CWidget = qRequire("CWidget");
    
    const ISlider = qRequire("ISlider");
    
    const CSignal = qRequire("CSignal");

    function CProgressBar( direction,  max, min, step=1){
        qExtend(this, ISlider,"CProgressBar", max, min, step );

        const m_ = {
            orientation:"String",
            direction:"String",
            seekBar:"CWidget",
            seekHead:"CWidget",
        };
        
        qProperties( this, m_ );
    }

    CProgressBar.prototype.Init = function(){
        this.SetSeekBar( new CWidget("div","CProgressRange"));
        this.SetHeadBar( new CWidget("div","CProgressHead"));
    };
    CProgressBar.prototype.Draw = function(){
        this.AddChild( this.SeekBar());
        this.AddChild( this.HeadBar());
    };
    
    CProgressBar.prototype.RenderEvent = function( ){
        
    };    
   
    return CProgressBar;
});

