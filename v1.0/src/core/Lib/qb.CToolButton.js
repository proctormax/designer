
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

qPack("qb.gui.controls.CToolButton",function(){
    //QB.Require("qb.core.utils.CDebug.js");
    QB.RequireClass("qb.gui.CWidget");
    QB.RequireClass("qb.gui.controls.CAbstructButton");
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
	* @CToolButton
	* 
	* @param 
	*
	* @param 
	* @examples:
	*
	*/
    function CToolButton(parent){

        QB.CAbstractButton.apply(this,[parent,"div","gui-btn"]);
		/* ------------------------------- VARIABLES:
		*/
        var _ =
        { 
        	val1:0, // val comment
        	val2:"some text" // val2 comment
        };

       // var debug  = QB.CDebug.New(this);
		/* ------------------------------- PRIVATE METHODS:
		*/
		/* ------------------------------- PUBLIC METHODS:
			QToolButton(QWidget *parent = Q_NULLPTR)
			~QToolButton()
			Qt::ArrowType	arrowType() const
			bool	autoRaise() const
			QAction *	defaultAction() const
			QMenu *	menu() const
			ToolButtonPopupMode	popupMode() const
			void	setArrowType(Qt::ArrowType type)
			void	setAutoRaise(bool enable)
			void	setMenu(QMenu *menu)
			void	setPopupMode(ToolButtonPopupMode mode)
			Qt::ToolButtonStyle	toolButtonStyle() const
		*/

        this.Set = function( val ){
        	try{
            	debug.Assert("Set",val);

        	}catch(e){
        		debug.Warn(e.message);
        	}
        };

		/**
		* ~CToolButton
		*/
        this._CToolButton = function(){        	
            for( var i in _ ) delete _[i];
                delete _;
        	debug.Delete(this,_);
        };
    }

	/**
	* @param1	 
	* @param2	 
	*/
	CToolButton.New = function( param1 , param2 ){ return new CToolButton(param1,param2); };
	/**
	* @staticMethod 
	*
	* @param 
	*
	* @param 
	*/
    CToolButton.Cast= function( other ){
        switch(debug.TypeOf(other)){
            case "CToolButton":
                return other;
            default:
                debug.Alert("Failed to create an instance of CToolButton");
        }
    };
    
    QB.EnumFreeze(CToolButton,enums);

    return CToolButton;
});