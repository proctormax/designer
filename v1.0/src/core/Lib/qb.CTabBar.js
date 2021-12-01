qRequire("CWidget");
qRequire("CFrame");
qRequire("CTab");
qPackage("ui.control.CTabBar", (function(){
    var ETabPosition		= {North:0,South:1,West:2,East:3};

    var ETabShape			= {RR:0,RT:1,TR:2,TT:3};
    
    var ETabButtonPosition	= {LefSide:0,RightSide:1};
    
    var ETabSelectionBehavior= {SelectLeftTab:0,SelectRightTab:1,SelectPreviousTab:3};
    
    var ETabBarShape		 = {RoundedNorth:0,RoundedSouth:1,RoundedWest:2,RoundedEast:3,TriangularNorth:4,TriangularSourth:5,TriangularWest:6,TriangularEast:7};
    function CTab(icon,text,closable){

    }
	function CTabBar(tabPos=ETabPosition.North){

		//QB.UIFrame.apply(this,[0,0,1000,30]);
		CWidget.ExtendTo(this,['div','qb-tabbar',false]);
		var
		_size 			= new QB.SizeF(100,30),
		_lWidget,
		_rWidget,
		_bar 			= CWidget.New("div","qb-tabbar-bar"),
		_tabs 			= [],
		_activeTag		= "qb-tab-active",
		_curIndex 		= 0;

		var // TabPositionTags
		_NTag 			= "qb-north",
		_STag 			= "qb-south",
		_WTag 			= "qb-west",
		_ETag 			= "qb-east",
		_curTag			= _NTag,
		_tabPosList		= [_NTag,_ETag,_STag,_WTag];

		this.SetActiveTab = function(index){
			Assert(_tabs.length > index || index < 0 );
			if( _curIndex == index ) return this;
			//if( index < 0 ) index = _tabs.length + index;
			_tabs[_curIndex ].Deactivate();
			_curIndex = index;
			_tabs[_curIndex ].Activate();

			return this;
		}
		this.Count 		= function(){ return this.layout.ChildList().length;}

		this.AddTab		= function(text="",icon=null){
			if(text==="") text +="Tab "+ (_tabs.length+1);
			var tab 	= CTab.New(icon,text),
			index 		= _tabs.length,
            cbSetActive = new QB.Callback(this,"SetActiveTab",[index]);
            tab.Layout().AddChild(closeAct);

			CCSS.Add(tab,"cos-tab");
			tab.Clicked.Add(cbSetActive);
			_tabs.push(tab);
			this.layout.AddChild(tab);
			this.SetActiveTab( this.Count()-1 );
			return _curIndex;
        };
        
		this.SetTab = function(index,tab){
			Assert(_tabs.length > index);
			_tabs[index] = tab;
			return this;
		}
		this.SetTabText = function(index,text){
			Assert(_tabs.length > index);
			_tabs[index].SetText(text);
			return this;
		}

		this.SetTabIcon = function(index,icon){
			Assert(_tabs.length > index);
			_tabs[index].SetIcon(icon);
			return this;
		}
		this.SetTabClosable= function(index,closable){
			Assert(_tabs.length > index);
			_tabs[index].SetClosable(closable);
			return this;
		}
		this.RemoveTabAt 	= function(index=-1){
			Assert(_tabs.length > Math.abs(index));
			if(_tabs.length < 2 ) return this;
			if( index < 0 ) index = _tabs.length + index;
			_tabs.splice(index,1);
			this.layout.RemoveChildAt(index);
			return this;
		}		
		this.SetOrientation = function( tabPos ){
			var i = this.Count();
			switch(tabPos){
				case QB.North:
                    while(i--) _tabs[i].SwapTags(_curTag,_NTag);
                    this.layout.SetType(1);
                    break;
				case QB.South:
                    while(i--) _tabs[i].SwapTags(_curTag,_STag);
                    this.layout.SetType(1);
                    break;
				case QB.West:
                    while(i--) _tabs[i].SwapTags(_curTag,_WTag);
                    this.layout.SetType(0);
                    break;
				case QB.East:
                    while(i--) _tabs[i].SwapTags(_curTag,_ETag);
                    this.layout.SetType(0);
                    break;
			}
			_curTag = _tabPosList[tabPos];
			return this;
		}
		this.SetTabsShape   = function(tabShape){
			switch(tabShape){ // TabShape:RT, RR, TT, TR

			}
			return this;
		}
		this.CurrentIndex 	= function(){ return _curIndex;}

		this.SetOrientation(tabPos);

    }
    
    CTabBar.CTab = CTab;
    CTabBar.CastDOM = function( dom ){

    }
    return CTabBar;
})());