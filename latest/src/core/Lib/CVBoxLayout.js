
qPack("UI.layouts.CVBoxLayout",function(){ 
	const CBoxLayout = qRequire("CBoxLayout");
	/***
	 * CVBoxLayout
	 * Lines up widgets horizontally
	**/
	
	function CVBoxLayout( parent = null)
	{
		qExtend(this,CBoxLayout,parent,"vertical");
	};
	
	CVBoxLayout.prototype.ItemAddedEvent = function(e){
		this.SetHeight( this.Height() + e.size.Height() );
		this.Update();
	};
	CVBoxLayout.prototype.ItemRemovedEvent = function(e){
		this.SetHeight( this.Height() - e.size.Height() );
		this.Update();
	};
	
	
	CVBoxLayout.New = function(parent=null){ return new CVBoxLayout(parent); };
	CVBoxLayout.Cast = function(other){ 
		switch(qTypeOf(other)){
			case "CList": 	   
			var lt = CVBoxLayout.New();
			other.Call(function(i){ if(i.ui) lt.AddWidget(i);});
			return lt;
			case "CFrame":  	break;
			case "CBoxLayout": 	break;
			case "CVBoxLayout": break;
		}
		return new CVBoxLayout(); 
	};
	
	return CVBoxLayout;
});
