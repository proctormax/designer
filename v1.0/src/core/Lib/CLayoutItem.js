qPack("UI/Layout/qb.CLayoutItem.js", function( Cloud ){

	const	CRect = qRequire("Math/qb.CRect.js");

	const 	Geom  = qRequire("Geom");

	const 	CWidget = qRequire("CWidget");

	const 	CCSS  = qRequire("CCSS");
	
	var ItemStyle = 
	{
		HORIZONTAL_ITEM:"gui-li-h",
		VERTICAL_ITEM:"gui-li-v",
		GRID_ITEM:"ui-li-g",
		FREE_ITEM:"ui-li-free",
		FORM_ITEM:"ui-li-f"
	},
	ItemType  = {HORIZONTAL_ITEM:0,VERTICAL_ITEM:1,GRID_ITEM:2,FORM_ITEM:3,FREE_ITEM:4};

	function CLayoutItem (parent, content = null, itemType = ItemType.HORIZONTAL_ITEM){

		var

		_ 	={

			content: null, currStyle:null, parent:parent, this:this

		};

		qExtend(this,CWidget,"spam","CLayoutItem");

		var _rect	= new CRect();

		this.Content 	= function(){

			return _.content;

		}

		this.SetContent	= function( content ){

			//console.error("@CLayoutItem",Geom.GetSize(content));
			if(!this.IsEmpty()) this.ReleaseContent();

			_.content 	= content;

			this.DC().appendChild(_.content.DC());

			_rect.SetSize(Geom.GetSize(_.content) );

			Geom.SetSize(this,_rect.Size().ToArray());

			content.SetParent(this);

			return this;

		};

		this.IsEmpty = function(){
			return _.content === null;
		};

		this.ReleaseContent = function( ){
			if( this.IsEmpty() ) return null;
			const res = _.content;
			_.content = null;
			res.SetParent(null);
			return res;
		};

		this.SetItemType   = function(itemType){

			switch(itemType){

				case QB.HORIZONTAL_ITEM:_.style = ItemStyle.HORIZONTAL_ITEM;break;

				case QB.VERTICAL_ITEM: 	_.style = ItemStyle.VERTICAL_ITEM; 	break;

				case QB.GRID_ITEM: 	_.style = ItemStyle.GRID_ITEM; 	break;

				case QB.FORM_ITEM: 	_.style = ItemStyle.FORM_ITEM; 	break;

				case QB.FREE_ITEM: 	_.style = ItemStyle.FREE_ITEM; 	break;

			}

			_.itemType = itemType;

			//CCSS.Switch(this.DC(),_.currStyle,_.style);

			_.currStyle = _.style;

		};

		this.Rect  	= function(){

			_rect.SetSize(Geom.GetSize(_.content) );

			return _rect;

		};

		this._CLayoutItem = function(){

			for(var i in _ ) delete _[i];

			delete _;

			delete this;

		};

		this.Init  = function(){
			//this.SetItemType(itemType);

			if(content)this.SetContent(content);

		};

		this.Init();

	};

	CLayoutItem.ItemType = ItemType;

	CLayoutItem.New = function( parent, widget ){

		return new CLayoutItem(parent,widget);

	};

	CLayoutItem.Cast = function(other){

		switch(TypeOf(other)){

			case "CLayoutItem": return other;

			case "CWidget": return new CLayoutItem(other);

		}

	};

	CCSS.New("CLayoutItem")
	.Add('.CLayoutItem',{

		"-webkit-box-sizing" : "content-box",

		"-moz-box-sizing" : "content-box",

		"-ms-box-sizing" : "content-box",

		"-o-box-sizing" : "content-box",

		"box-sizing" : "content-box",

		"position":"absolute",

	});

	return CLayoutItem;

});