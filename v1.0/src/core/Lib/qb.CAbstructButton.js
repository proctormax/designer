
/***
* Hikestone Inc
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

qPack("qb.gui.controls.CAbstructButton",function(){
    //QB.Require("qb.core.utils.CDebug.js");
    QB.RequireClass("qb.gui.CWidget");
    QB.RequireClass("qb.gui.CAction");

    var enums = {
    	enum1:{
    		flag1: 0, 	// science fiction books by Craig French
    		flag2: 0, 	// science fiction books by Craig French
    	},
    	enum2:{
    		flag1: 0, 	// science fiction books by Craig French
    		flag2: 0, 	// science fiction books by Craig French
    	},
    };

	/**
	* @CAbstructButton
	* 
	* @param 
	*
	* @param 
	* @examples:
	*
	*/
    function CAbstructButton(parent){

        QB.CWidget.apply(this,[parent,"div","gui-btn"]);
        var _ =
        { 
        	val1:0, // val comment
        	val2:"some text" // val2 comment
        };

       // var debug  = QB.CDebug.New(this);

		/**
		* 
		*/
		
		/**
		* @method 
		*
		* @param 
		*
		* @param 
		*/
        this.Set = function( val ){
        	try{
            	debug.Assert("Set",val);

        	}catch(e){
        		debug.Warn(e.message);
        	}
        };

		/**
		* ~CAbstructButton
		*/
        this._CAbstructButton = function(){        	
            for( var i in _ ) delete _[i];
                delete _;
        	debug.Delete(this,_);
        };
    }

	/**
	* 
	* @param1	 
	* @param2	 
	*/
	CAbstructButton.New = function( param1 , param2 ){ return new CAbstructButton(param1,param2); };
	/**
	* @staticMethod 
	*
	* @param 
	*
	* @param 
	*/
    CAbstructButton.Cast= function( other ){
        switch(debug.TypeOf(other)){
            case "CAbstructButton":
                return other;
            default:
                debug.Alert("Failed to create an instance of CAbstructButton");
        }
    };
    
    QB.EnumFreeze(CAbstructButton,enums);

    return CAbstructButton;
});