
//INIT_CFRAMEWORK();
/***
 * CLayoutItem
 * Abstract item that a CLayout manipulates
**/
/*
 var li = QB.CLayoutItem(widget,[QB.HORIZONTAL_ITEM | QB.VERTICAL_ITEM | QB.GRID_ITEM | QB.FORM_ITEM] )
*/
//using__(CFramework.UI );
qPack("ui.layouts.CLayoutItem",function (  )
{
	
	const Geom =  qRequire('Geom');
	const CRect =  qRequire('CRect');
	const CCSS  = qRequire('CCSS');
	//QB.CLayout.apply(this,[""]);
	var ItemStyle = 
	{
		HORIZONTAL_ITEM:"gui-li-h",
		VERTICAL_ITEM:"gui-li-v",
		GRID_ITEM:"ui-li-g",
		FREE_ITEM:"ui-li-free",
		FORM_ITEM:"ui-li-f"
	},
	ItemType  = {HORIZONTAL_ITEM:0,VERTICAL_ITEM:1,GRID_ITEM:2,FORM_ITEM:3,FREE_ITEM:4};

	for( var i in ItemType ) QB[i] = ItemType[i];
	function CLayoutItem (parent, content = null, itemType = ItemType.HORIZONTAL_ITEM)
	{
		var
		_ 				={ content: null, currStyle:null, parent:parent, this:this};		
		
		
		var _dc 		= qDOM( "CItem","cos-lti");	
		var _rect		= new CRect();			
		this.DC 		= function(){ return _dc; };

		this.Content 	= function(){ return _.content;}
		this.SetContent	= function( content ){
			if(_.content)this.DC().removeChild(_.content.DC());
			_.content 	= content;
			this.DC().appendChild(_.content.DC());
			_rect.SetSize(Geom.GetSize(_.content) );
			Geom.SetSize(this,_rect.Size().ToArray());
			return this;
		};
		this.SetItemType   = function(itemType){

			switch(itemType){
				case QB.HORIZONTAL_ITEM:_.style = ItemStyle.HORIZONTAL_ITEM;break;
				case QB.VERTICAL_ITEM: 	_.style = ItemStyle.VERTICAL_ITEM; 	break;
				case QB.GRID_ITEM: 		_.style = ItemStyle.GRID_ITEM; 		break;
				case QB.FORM_ITEM: 		_.style = ItemStyle.FORM_ITEM; 		break;
				case QB.FREE_ITEM: 		_.style = ItemStyle.FREE_ITEM; 		break;

			}
			_.itemType = itemType;
			//CCSS.Switch(this.DC(),_.currStyle,_.style);
			_.currStyle = _.style;
		};
		this.Rect  		= function(){
			_rect.SetSize(Geom.GetSize(_.content) );
			return _rect;
		};
		this._CLayoutItem = function(){
			for(var i in _ ) delete _[i];
			delete _;
			delete this;
		};
		this.Init  = function(){
			CCSS.Add(this,'CLayoutItem');
			//this.SetItemType(itemType);		
			if(content)this.SetContent(content);	
		};
		this.Init();
	};
	CLayoutItem.ItemType = ItemType;
	CLayoutItem.New = function( parent, widget ){ return new CLayoutItem(parent,widget); };
	CLayoutItem.Cast = function(other){
		switch(TypeOf(other)){
			case "CLayoutItem": return other;
			case "CWidget": return new CLayoutItem(other);
		}
	};
	
	CCSS.New('CLayoutItem')
	.Add('.CLayoutItem, CLayoutItem, .ltti, ltti',{
		"-webkit-box-sizing" : "content-box",
		"-moz-box-sizing" : "content-box",
		"-ms-box-sizing" : "content-box",
		"-o-box-sizing" : "content-box",
		"box-sizing" : "content-box",
		"width" : "auto",
		"height" : "auto",
	});

	return CLayoutItem;
});
