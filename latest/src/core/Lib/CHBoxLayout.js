
qPack("qb.gui.layouts.CHBoxLayout",function(){ 
	const CBoxLayout = qRequire("CBoxLayout");
	/***
	 * CHBoxLayout
	 * Lines up widgets horizontally
	**/
	
	function CHBoxLayout( parent = null)
	{
		qExtend(this,CBoxLayout,parent,"horizontal");
	};

	CHBoxLayout.prototype.ItemAddedEvent = function(e){
		console.error("added", e.size.ToArray());
		this.SetWidth( this.Width() + e.size.Width() );
		this.Update();
	};
	CHBoxLayout.prototype.ItemRemovedEvent = function(e){
		this.SetWidth( this.Width() - e.size.Width() );
		this.Update();
	};
	CHBoxLayout.New = function(parent=null){ return new CHBoxLayout(parent); };
	CHBoxLayout.Cast = function(other){ 
		switch(TypeOf(other)){
			case "CList": 	   
			var lt = CHBoxLayout.New();
			other.Call(function(i){ if(i.ui) lt.AddWidget(i);});
			return lt;
			case "CFrame":  	break;
			case "CBoxLayout": 	break;
			case "CVBoxLayout": break;
		}
		return new CHBoxLayout(); 
	};

	return CHBoxLayout;
});
