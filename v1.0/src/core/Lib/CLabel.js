
/***
* Hikestone Inc
**/

// Require("qb.core.utils.CDebug.js");
qPack("CLabel",function(){
	
	const CWidget = qRequire("CWidget");
	const CCSS = qRequire("CCSS");

	CCSS.New("CLabel")
	.Add(".CLable",{
		"position":"relative"
	})

	/**
	* @CLabel
	* 
	* @param 
	*
	* @param 
	* @examples:
	*
	*/
    function CLabel(text="label", format = "font-1",tagname="div"){

		var _ = {
			textFormat: format,
			text:text
		};
		qExtend(this,CWidget,tagname, 'CLabel ' + _.textFormat);
	
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
			var res = new CLabel(this.Text());
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
		* ~CLabel
		*/
        this._CLabel = function(){        	
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
	CLabel.New = function(text='static text', format = 'font-1') {
		var res = new CLabel(text, format);
		return res;
	}
	/**
	* @staticMethod 
	*
	* @param 
	*
	* @param 
	*/
    CLabel.Cast= function( other ){
        switch(debug.TypeOf(other)){
            case "CLabel":
                return other;
            default:
                debug.Alert("Failed to create an instance of CLabel");
        }
    };
    
    //EnumFreeze(CLabel,enums);

    return CLabel;
});