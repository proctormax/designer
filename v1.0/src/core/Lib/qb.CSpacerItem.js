INIT_CFRAMEWORK();
qRequire("CDebug");
/***
 * CSpacerItem
 * Blank space in a layout
**/

/***
* Hikestone Inc
**/

qPackage("qb.ui.layouts.CSpacerItem",(function(){
    
    

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
	* @CSpacerItem
	* 
	* @param length:int - Determins the length of the spacer item.
	*
	* @param direction:QB.EDirection - The direction of the item. i.e,  QB.HORIZONTAL | QB.VERTICAL 
	* @examples:
	*  var hspacer = new QB.CSpacerItem(30,QB.HORIZONTAL);
	*/
    function CSpacerItem( length, direction ){

        //QB.CSuperClass.Extend(this,[]);

        QB.CWidget.ExtendTo(this,["li","ui-spacer"]);
        var _ =
        { 
        	val1:null, // val comment
        	length:0, // val2 comment
        	ch:"ui-spacer-h", // val2 comment
        	cv:"ui-spacer-v" // val2 comment
        };

        var debug  = QB.CDebugger.New(this);

		/**
		*  @property Direction:EDirection - Returns the current direction of this spacer Item.
		*/
        this.Direction = function(){ return _.val1;};
		/**
		* @method SetDirection:void - Sets the direction of the spacer item to either QB.HORIZONTAL | QB.VERTICAL
		*
		* @param direction:EDirection
		*/
        this.SetDirection = function( direction ){
        	if(direction === this.Direction() ) return;
        	try{
        		switch(direction){
        			case QB.HORIZONTAL:
		            	_.val1 = direction;
		            	CCSS.SwitchClass(this,_.cv,_.ch);

        			break;
        			case QB.VERTICAL:
		            	_.val1 = direction;
		            	CCSS.SwitchClass(this,_.ch,_.cv);

        			break;
        			default: throw Error("CSpacerItem::SetDirection Error. Unknown direction specified.");
        		}


        	}catch(e){
        		debug.Warn(e.message);
        	}
        };
        /**
        * @method Length
        */
        this.Length  = function(){ return _.length; };
        /**
        * @method SetLength
        */
        this.SetLength = function(n){ n = Number(n); if( n === _.length ) return; _.length = n; if(this.IsHorizontal()) Geom.SetWidth(this,n); else Geom.SetHeight(this,n);  };
		/**
		* @method IsHorizontal:bool - Returns true if the current direction is QB.EDirection.HORIZONTAL, false otherwise.
		*/
        this.IsHorizontal = function(){ return this.Direction() === QB.HORIZONTAL; };

		/**
		* @method IsVertical:bool - Returns true if the current direction is QB.EDirection.VERTICAL, false otherwise.
		*/
        this.IsVertical  = function(){ return this.Direction() === QB.VERTICAL; };

		/**
		* @method ToHorizontal:void - Sets the direction to QB.EDirection.HORIZONTAL
		*/
        this.ToHorizontal= function(){ this.SetDirection(QB.HORIZONTAL); };

		/**
		* @method ToVertical:void - Sets the direction to QB.EDirection.VERTICAL
		*/
        this.ToVertical  = function(){ this.SetDirection(QB.VERTICAL); };

		/**
		* @method Flip:void - Flips the direction to the opposite direction.
		*/
        this.Flip  = function(){ this.SetDirection( this.IsHorizontal()? QB.VERTICAL : QB.HORIZONTAL ); };

		/**
		* ~CSpacerItem
		*/
        this._CSpacerItem = function(){        	
        	//debug.Delete(this,_);
        };
        this.Init = function(){ this.SetDirection(direction); this.SetLength(length); };
        this.Init();
    }

	/**
	* 
	* @param1	 
	* @param2	 
	*/
	CSpacerItem.New = function( param1 , param2 ){ return new CSpacerItem(param1,param2); };
	/**
	* @staticMethod 
	*
	* @param 
	*
	* @param 
	*/
    CSpacerItem.Cast= function( other ){
        switch(debug.TypeOf(other)){
            case "CSpacerItem":
                return other;
            default:
                debug.Alert("Failed to create an instance of CSpacerItem");
        }
    };
    
    //QB.EnumFreeze(CSpacerItem,enums);

    return CSpacerItem;
})());