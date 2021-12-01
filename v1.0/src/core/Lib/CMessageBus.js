qPack("CMessageBus", function( exports ){
    function CMessageBus( registery ){
        
        let m_listeners = {};

        this.Emit = function( sender, signal, data ){
        
            m_listeners[signal].handlers.forEach( handler => {
        
                handler( data );
        
            });
        
        };

        this.Connect = function( signal, sender, callback  ){
            
            if( !m_listeners[signal] )
            
                m_listeners[signal] = { handlers:[] };

                if( !callback.__meta )

                    callback.__meta = {listening:[ signal ]};

                else

                    callback.__meta.listening.push( signal );


                    
            m_listeners[signal].handlers.push( callback );

        };

        this.Disconnect = function( signal, callback  ){

                if( !callback.__meta ) return;

                signalIndex = callback.__meta.listening.indexOf( signal );

                callback.__meta.listening.unshift( signalIndex )
            
        };
    }
    return CMessageBus;
});