qPack("CPlugin", function( ){

    function CPlugin( name, version ){
        var _startCallback;
    
        var _stopCallback;
        
        this.GetName = function(){
            return name;
        };
        this.GetVersion = function(){
            return version;
        };
    
        Object.defineProperty(this,"Start",{
            get:()=>{ return _startCallback; },
            Set:( callback )=>{ 
                _startCallback = callback; 
            }
        });
    
        Object.defineProperty(this,"Stop",{
            get:()=>{ return _stopCallback; },
            Set:( callback )=>{ 
                _stopCallback = callback; 
            }
        });
    };

    return CPlugin;
});

