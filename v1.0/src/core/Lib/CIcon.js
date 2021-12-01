
qPack("CIcon",function(){
	
	const CSize    	 = qRequire("CSize");
	const CWidget    = qRequire("CWidget");
	const CSvgIcon   = qRequire("CSvgIcon");
	const CPixelIcon = qRequire("CPixelIcon");
	const CFontIcon  = qRequire("CFontIcon");
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
	* @CIcon
	* The CIcon class Scalable icons in different modes and states which is used in all actions to display icons.
	* Scalable icons in different modes and states
	* 
	* @param 
	*
	* @param 
	* @examples:
	* var act = new CAction("Clear Selection");
	  var imgIcon  = new CIcon(':/icons/action/clear.png')
	  var fontIcon = new CIcon('\24D5F');
	  var icon 	   = new CIcon('\24D5F');
	  
	  icon.SetSource( '');
	  icon.SetFont( font );
	  icon.SetChar( '\333DF' );
	  icon.SetText( 'Clear' );
	  icon.SetSize( 24 );
	  icon.DrawPath( myPath );
	  icon.DrawPixel( myPath );
	  icon.SvgPath();

	  icon.SetMode( IMAGE | GLYPH | SVG );
	 
	  act.SetIcon( icon )

	  CFontIcon
	  CPixelIcon
	  CSvgIcon
	  CIcon.FromPixel
	  CIcon.FromSVG
	  CIcon.FromFont
	  CIcon:{size,text}
	  
	  button.SetIcon( new CFontIcon('\D3434', font) | CPixelIcon(url) | CSvgIcon(path) )
	*/
    function CIcon(src, name='', size = new CSize(12,12),  dc='i', text =''){

        qExtend(this,CWidget,dc,'CIcon '+name);

        var 
        _ = {src:src,text:text, size:size,mode:0 };

        this.Source = function(){ return _.src; };
        this.SetSource = function(src){
			_.src = src;
			this.DC().setAttribute('src',_.src);
		};
		
		this.Mode = function(){return _.mode;};
		this.SetMode = function( iconmode ){
			_.mode = iconmode;
		};

        this.Text = function(){ return _.text; };		
        this.SetText = function(txt){
            _.text = txt;
		};
		
        this.HasSource = function(){
            return _.src.length > 4;
		};
		
        this.Init = function(){
			this.CCSS().Set('width',_.size.Width()+_.size.Unit());
			this.CCSS().Set('height',_.size.Height()+_.size.Unit());
            if(this.Source().length)
                this.SetVisible(false);
        };

        this.Init();
    }

	/**
	* @static New  - Creates an instance of CIcon.
	* @src:String  - The icon source. This can be a relative or absolute path.
	* @text:String - The icon text.
	*/
    CIcon.New = function(src="resource/css/img/logo.png",text="logo"){ return new CIcon(src,text); };
	/**
	* @staticMethod 
	*
	* @param 
	*
	* @param 
	*/
    CIcon.Cast = function( other ){
        
        switch(debug.TypeOf(other)){
            case "CIcon":
                return other;
            case "String":
	        	if( other.length > 3){
	        		return QB.CIcon.New(other);
	   			 }
	   			break;
            default:
                console.warn("Failed to cast to an instance of CIcon. A default icon instance has been created instead.");
        		return CIcon.New();
        }    

    };

    
    //QB.EnumFreeze(CIcon,enums);

    return CIcon;
});
