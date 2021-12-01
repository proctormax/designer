
/***
* Hikestone Inc
**/

// Require("qb.core.utils.CDebug.js");
qPack("CTableCell",function(){
	
	const CWidget = qRequire("CWidget");
	const CCSS = qRequire("CCSS");

	CCSS.New("CTableCell")
	.Add(".CTableCell",{
		"position":"relative",
		"outline":"none",
	})
	.Add(".CTableCell.focused",{
		"color":"#259",
	})
	.Add(".CTableCell.modified",{
		"color":"#592",
	})

	/**
	* @CTableCell
	* 
	* @param 
	*
	* @param 
	* @examples:
	*
	*/
    function CTableCell(text="label", format = "font-1",tagname="span"){

		var _ = {
			textFormat: format,
			text:text
		};
		qExtend(this,CWidget,tagname, 'CTableCell ' + _.textFormat);
		let _this = this;
	
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
			var res = new CTableCell(this.Text());
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
		* ~CTableCell
		*/
        this._CTableCell = function(){        	
        	//debug.Delete(this,_);
        };

        this.Initialize = function(){
			this.DC().textContent = _.text;
            this.DC().addEventListener( "focus", e=>{ _this.FocusInEvent();} );
            this.DC().addEventListener( "blur", e=>{ _this.FocusOutEvent();} );
        };

		this.Initialize();
		
		
}
	CTableCell.prototype.FocusInEvent = function(e){
		this.DC().classList.add("focused");
	};
	CTableCell.prototype.FocusOutEvent = function(e){
		this.DC().classList.remove("focused");
		var text = this.DC().textContent;
		if( text != this.Text() ){
			this.DC().classList.add("modified");
		}
	};
	/**
	* 
	* @param1	 
	* @param2	 
	*/
	CTableCell.New = function(text='static text', format = 'font-1') {
		var res = new CTableCell(text, format);
		return res;
	}
	/**
	* @staticMethod 
	*
	* @param 
	*
	* @param 
	*/
    CTableCell.Cast= function( other ){
        switch(debug.TypeOf(other)){
            case "CTableCell":
                return other;
            default:
                debug.Alert("Failed to create an instance of CTableCell");
        }
    };
    
    //EnumFreeze(CTableCell,enums);

    return CTableCell;
});