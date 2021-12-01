qPack("CFontIcon",function(){
	
	//qRequire("CCSS");

   /* var enums = {
    	enum1:{
    		flag1: 0, 	// science fiction books by Craig French
    		flag2: 0, 	// science fiction books by Craig French
    	},
    	enum2:{
    		flag1: 0, 	// science fiction books by Craig French
    		flag2: 0, 	// science fiction books by Craig French
    	},
    };*/

	/**
	*
	* The CFontIcon class Scalable icons in different modes and states which is used in all actions to display icons.
	* Scalable icons in different modes and states
	* 
	* @param {String} text the icon text
	*
	* @param {String} font the icon font 
	* @param {Number} fontSize the icon size
	* 
	* @examples
	* var act = new CAction("Clear Selection");
	*  var imgIcon  = new CFontIcon(':/icons/action/clear.png')
	*  var fontIcon = new CFontIcon('\24D5F');
	*  var icon 	= new CFontIcon('\24D5F');
	*  
	*  icon.SetSource( '');
	*  icon.SetFont( font );
	*  icon.SetChar( '\333DF' );
	*  icon.SetText( 'Clear' );
	*  icon.SetSize( 24 );
	*  icon.DrawPath( myPath );
	*  icon.DrawPixel( myPath );
	*  icon.SvgPath();
	*
	*  icon.SetMode( IMAGE | GLYPH | SVG );
	* 
	*  act.SetIcon( icon )
	*/
    function CFontIcon( value='34DC',size = new QB.CSize(30,30), font = 'inherit', fontSize=16, fontUnit="px" ){

        //QB.CSuperClass.Extend(this,[]);

        var 
        m_ptr = {
			value :"String",
			font :"String",
			fontSize :"Number",
			fontUnit :"String",
		};
		const m_icon = new QB.CWidget('i','context');
		Object.defineProperty( this,"Context",{get:()=>{
			return m_icon;
		}});
		qProperties(this,m_ptr);

		qExtend(this,CWidget,"div","CFontIcon");
				

        this.Init = function(){
		   this.SetValue(value);
		   this.SetFont(font);
		   this.SetFontUnit(fontUnit);
		   this.SetFontSize(fontSize);

		   this.SetSize( size);

		   this.Render();

		   this.ValueChanged.Add( this.Render );
		   this.FontUnitChanged.Add( this.Render );

		   
        };
        this.Init();
	}
	
	CFontIcon.prototype.Render = function(){
		
		   this.UiStyle.Set("background-color","#991");
		   this.UiStyle.Set("color","#291");
		   this.UiStyle.Set("font-family",this.Font());
		   this.Context.UiStyle.Set("content",this.Value());
		   this.Context.UiStyle.Set("font-size",this.FontSize()+this.FontUnit());
		   this.UiStyle.Set('border',"solid 1px red");
		   this.UiStyle.Set('width',this.Size().Width()+"pt");
		   this.UiStyle.Set('height',this.Size().Height()+"pt");
	}

	/**
	* @static New  - Creates an instance of CFontIcon.
	* @src:String  - The icon source. This can be a relative or absolute path.
	* @text:String - The icon text.
	*/
    CFontIcon.New = function(src="resource/css/img/logo.png",text="logo"){ return new CFontIcon(src,text); };
	/**
	* @staticMethod 
	*
	* @param 
	*
	* @param 
	*/
    CFontIcon.Cast = function( other ){
        
        switch(debug.TypeOf(other)){
            case "CFontIcon":
                return other;
            case "String":
	        	if( other.length > 3){
	        		return QB.CFontIcon.New(other);
	   			 }
	   			break;
            default:
                debug.Warn("Failed to cast to an instance of CFontIcon. A default icon instance has been created instead.");
        		return CFontIcon.New();
        }    

    };

    
    //QB.EnumFreeze(CFontIcon,enums);

    return CFontIcon;
});
