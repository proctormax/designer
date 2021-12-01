qPack("CRange",function(){
    
    const CSignal = qRequire("CSignal");

    function CRange(  max = 1,min = 0, step = 1) {
        const _prop = {
            minimum: "Number",
            maximum: "Number",
            step: "Number",
            value:"Number",
        };

        const _maximized = new CSignal(this,"MaximumReached",{value:"Number"});
        const _minimized = new CSignal(this,"MinimumReached",{value:"Number"});

        Object.defineProperty(this,"Maximised",{
            get:()=>{
                return _maximized;
            }
        });
        Object.defineProperty(this,"Minimised",{
            get:()=>{
                return _minimized;
            }
        });
        qProperties(this, _prop);

        this.Reset(max, min, step);

        this.ValueChanged.Add( e =>{

            if( e.value > this.Maximum() ){
               e.value =  _prop.value = this.Maximum();
            }
            if( e.value < this.Minimum() ){
               e.value =  _prop.value = this.Minimum();
            }

            if(e.value == this.Maximum()){
                _maximized.Emit({value:e.value});
            }

            if(e.value == this.Minimum()){
                _minimized.Emit({value:e.value});
            }

            this.ValueChangeEvent( e );
        });
    }

    CRange.prototype.ValueChangeEvent = function(e){

    };


    CRange.prototype.Reset = function( minimum, maximum, step ){
        this.SetMinimum(minimum);
        this.SetMaximum(maximum);
        this.SetStep(step);
    };

    CRange.prototype.SeekTo = function( n ){

        if( n <= 100 && n >= 0 ){
            this.SetValue( n * 0.01 * this.Maximum());
        }
    };
    CRange.prototype.SeekBy = function( n ){

        this.SeekTo( this.Progress() + n );
    };
    CRange.prototype.Progress = function( ){        
        return ( this.Value() / this.Maximum()) * 0.01;
    };

    CRange.prototype.Set = function( other ){
        this.SetMinimum( other.Minimum());
        this.SetMaximum( other.Minimum());
        this.SetStep( other.Step());
    };

    CRange.prototype.StepForward = function( ){        
        this.SeekTo( this.Progress() + this.Step() );
    };

    CRange.prototype.StepBackward = function( ){        
        this.SeekTo( this.Progress() - this.Step() );
    };


    qDef( CRange.prototype, "SetRange", ["Number","Number"], function(max, min){
        this.SetMaximum( max );
        this.SetMinimum( min );
    });

    CRange.New = function(){
        return new CRange(1,0,1);
    };



    return CRange;
});