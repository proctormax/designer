qPack("CCoditService",function( exports ){
    const CMessageBus = qRequire("CMessageBus");
    
    function CCoditService( name, about, version = 'v1.0' ){
        this.registery = null;
        this.manifesto = null;
        this.module = null;
        this.GetVersion = function(){ return version; };
        this.Info   = function( ){ return about; }
        this.Name   = function( ){ return name; }

        this.Emit   = function( signal, data ){
            if( this.registery )  registery.Emit( this, signal, data );
        };

        this.Main   = function( codit, global ){
            console.info(name,version,'has starting...');
            return 0;
        };
        this.Stop   = function( reason ){
        return  this.ShutDown( );
        };

        this.ShutDown = function( ){
            return true;
        };

    }
    
    return CCoditService;

});