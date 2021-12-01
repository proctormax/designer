
/***
* Hikestone Inc
**/

// Require("qb.core.utils.CDebug.js");
qPack("CGroupTitle",function(){
	
	const CWidget = qRequire("CWidget");
	const CCSS = qRequire("CCSS");

	CCSS.New("CGroupTitle")
	.Add(".CGroupTitle",
    { 
        "padding":" 3px",
        "text-transform":"capitalize",
        "font-size":"0.90em",
        "margin-bottom":"3px",
        "display":" block",
       // "background-color":" #3334",
    })

	/**
	* @CGroupTitle
	* 
	* @param 
	*
	* @param 
	* @examples:
	*
	*/
    function CGroupTitle(text="label", format = "font-1",tagname="div"){

		var _ = {
			textFormat: format,
			text:text
        };
        
		qExtend(this,CWidget,tagname, 'CGroupTitle ctitle' + _.textFormat);
	
	 	CCSS.Set(this,"position","relative");
		this.SetFormat = function(textFormat) {
			CCSS.Remove(this, _.textFormat);
			_.textFormat = textFormat;
			CCSS.Add(this, _.textFormat);
		};
		this.Format = function() {
			return _.textFormat;
		};
		this.Clone = function(){
			var res = new CGroupTitle(this.Text());
			CCSS.Add(res,this.DC().classList.toString());
			return res;
		};
       // var debug  = CDebug.New(this);

		/**
		* Returns the text content of this label.
		*/
        this.Text = function(){ return _.text;};
		/**
		* @method 
		*
		* @param 
		*
		* @param 
		*/
        this.SetText = function( val ){
        	try{
                _.text = String(val);
            	this.DC().textContent = _.text;

        	}catch(e){
        		//debug.Warn(e.message);
        	}
        };

		this.SetHtml    = function(html){
			this.DC().innerHTML = html;		
		};
		this.Html  		= function(){ return this.DC().innerHTML;};
		/**
		* ~CGroupTitle
		*/
        this._CGroupTitle = function(){        	
        	//debug.Delete(this,_);
        };

        this.Initialize = function(){
            this.DC().textContent = _.text;
        };

        this.Initialize();
    }

	/**
	* 
	* @param1	 
	* @param2	 
	*/
	CGroupTitle.New = function(text='static text', format = 'font-1') {
		var res = new CGroupTitle(text, format);
		return res;
	}
	/**
	* @staticMethod 
	*
	* @param 
	*
	* @param 
	*/
    CGroupTitle.Cast= function( other ){
        switch(debug.TypeOf(other)){
            case "CGroupTitle":
                return other;
            default:
                debug.Alert("Failed to create an instance of CGroupTitle");
        }
    };
    
    //EnumFreeze(CGroupTitle,enums);

    return CGroupTitle;
});