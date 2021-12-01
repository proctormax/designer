qPack("UI/Layout/qb.CLayout.js", function( Cloud ){

	const	CObject = qRequire("CObject");

	const	CSize 	= qRequire("CSize");

	const	CList 	= qRequire("Util/qb.CList.js");

	const 	CWidget = qRequire("UI/CWidget.js");

	const 	CCSS   	= qRequire("UI/Appearance/CCSS.js");

	const   CLayoutItem = qRequire("CLayoutItem");

	function CLayout(widget , type , tag = "div" ){

		var _dc = qDOM( tag,`${type}`);
		qExtend(this, CObject,"layout","CLayout");
		var	_ =	{

			enabled: true,

			cntMargins: [0,0,0,0],

			sizeConst: 0,

			widgetList:new CList(CWidget),

			itemList:  new CList(CLayoutItem),

			alignment: 0,

			sizeTotal: CSize.New(),

			spacing: 0,

			rect: [0,0,0,0],

			menubar:null,

			parentWidget:null

		};

		this.IsVisible = function(){

			return !CCSS.Is(this,"hidden");

		};

		this.DC = function(){

			return _dc;

		};

		this.Init=function(){

			//CCSS.Add(this,TAG_GROUP);

		};

		this.Init();

		this.Activate= function(){

		};

		this.Show= function(){

			CCSS.Switch(this,"hidden","block");

		};

		this.Hide= function(){

			CCSS.Switch(this,"block","hidden");

		};

		this.Add= function(item){

			_.itemList.Add( CLayoutItem.New(this,item));

			_.widgetList.Add(item);

		};

		this.AddItem= function(item){

			_.itemList.Add(item);

			_.widgetList.Add();

		};

		this.AddWidget= function(w){

			_.widgetList.Add(w);

			this.DC().appendChild(w.DC());

		};

		this.ContentsMargins= function(){

			return _.cntMargins;

		};

		this.ContentsRect= function(){

			return _.rect;

		};

		this.Count= function(){

			return _.widgetList.Length();

		};

		this.IndexOf= function(widget){

			return _.widgetList.IndexOf(widget);

		};

		this.IsEnabled= function(){

			return _.enabled;

		};

		this.ItemAt= function(index){

		};

		this.MenuBar= function(){

			return _.menubar;

		};

		this.ParentWidget= function(){

			return _.parentWidget;

		};

		this.RemoveItem= function(item){

		};

		this.RemoveWidget= function(widget){

		};

		this.ReplaceWidget= function(from,to,flag = "FindChildrenRecursively"){

		};

		this.SetAlignment= function(w,alignment){

		};

		this.SetContentsMargins= function(margins){

			_.cntMargins = margins;

		};

		this.SetEnabled= function(enable){

			_.enabled = enable;

		};

		this.SetSizeConstraint= function(sizeConstraint){

			_.sizeConst = sizeConstraint;

		};

		this.SetSpacing= function(int){

			_.spacing = spacing;

		};

		this.SizeConstraint= function(){

			return _.sizeConst;

		};

		this.Spacing= function(){

			return _.spacing;

		};

		this.TakeAt= function(index){

		};

		this.Update= function(){

		};

	};

	var GetStyle = function(item,property){

		return window.getComputedStyle(item).getPropertyValue(property).replace('px','');

	}

	CLayout.GetItemRect = function( item ){

		var size  	= Geom.GetSize(item);

		var boxSign 	= GetStyle(item.DC(),'box-sizing').indexOf('border-box') >= 0 ?0:1;

		var border	= {

		};

		border.top 	= parseFloat(GetStyle(item.DC(),'border-top-width'));

		border.bottom 	= parseFloat(GetStyle(item.DC(),'border-bottom-width'));

		border.left 	= parseFloat(GetStyle(item.DC(),'border-left-width'));

		border.right 	= parseFloat(GetStyle(item.DC(),'border-right-width'));

		var

		outlineWidth  	= parseFloat(GetStyle(item.DC(),'outline-width'));

		var outlineOffset= Math.max(0,parseFloat(GetStyle(item.DC(),'outline-offset')));

		var padding	= {

		};

		padding.top 	= parseFloat(GetStyle(item.DC(),'padding-top'));

		padding.bottom 	= parseFloat(GetStyle(item.DC(),'padding-bottom'));

		padding.left 	= parseFloat(GetStyle(item.DC(),'padding-left'));

		padding.right 	= parseFloat(GetStyle(item.DC(),'padding-right'));

		var res 	= {

			padding:padding, border:border, outlineWidth:outlineWidth, outlineOffset:outlineOffset

		};

		var actualSize 	= [size[0],size[1]];

		actualSize[0]  +=

		(border.left    * boxSign + border.right * boxSign) +

		(outlineWidth   * 2 + outlineOffset * 2) +

		(padding.left   + padding.right);

		actualSize[1]  +=

		(border.top 	* boxSign + border.bottom * boxSign )+

		(outlineWidth 	* 2 + outlineOffset * 2)+

		(padding.top 	+ padding.bottom);

		res.sizeActual 	= actualSize;

		res.size 	= size;

		res.sizeDiff 	= [ actualSize[0]-size[0],actualSize[1]-size[1] ];

		return res;

	}

	return CLayout;

});