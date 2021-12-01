qPack("CTabBar", function(){
    const CCSS    = qRequire("CCSS");
    const CWidget   = qRequire("CWidget");
    const CButton   = qRequire("CButton");

    var ETabPosition		= {North:0,South:1,West:2,East:3};

    var ETabShape			= {RR:0,RT:1,TR:2,TT:3};
    
    var ETabButtonPosition	= {LefSide:0,RightSide:1};
    
    var ETabSelectionBehavior= {SelectLeftTab:0,SelectRightTab:1,SelectPreviousTab:3};
    
    var ETabBarShape		 = {RoundedNorth:0,RoundedSouth:1,RoundedWest:2,RoundedEast:3,TriangularNorth:4,TriangularSourth:5,TriangularWest:6,TriangularEast:7};
	
	
	/**
	 * TabWest | TabEast | TabNorth | TabSouth
	 * TabBar.Horizontal | TabBar.Vertical
	 */
	function CTabBar(tabPos=ETabPosition.North){

		//QB.UIFrame.apply(this,[0,0,1000,30]);
		qExtend(this,CWidget, 'div','CTabBar');
		var
		m_size 			= new QB.CSize(100,30),
		m_lWidget,
		m_rWidget,
		m_bar 			= CWidget.New("div","qb-tabbar-bar"),
		m_tabs 			= [],
		m_activeTag		= "qb-tab-active",
		m_curIndex 		= 0;

		var // TabPositionTags
		m_NTag 			= "qb-north",
		m_STag 			= "qb-south",
		m_WTag 			= "qb-west",
		m_ETag 			= "qb-east",
		m_curTag			= m_NTag,
		m_tabPosList		= [m_NTag,m_ETag,m_STag,m_WTag];

		this.SetActiveTab = function(index){
			qAssert(m_tabs.length > qInt(index) );
			if( m_curIndex == index ) return this;
			if( index < 0 ) index = m_tabs.length + index;
			m_tabs[m_curIndex ].UiStyle.Swap(m_activeTag,"");
			m_curIndex = index;
			m_tabs[m_curIndex ].TagAs(m_activeTag);

			return this;
		}
		this.Count 		= function(){ return this.layout.ChildList().length;}

		this.AddTab		= function(text="",icon=null){
			if(text==="") text +="Tab "+ (m_tabs.length+1);
			var tab 	= CButton.New(icon,text),
			index 		= m_tabs.length,
			cbSetActive = new QB.Callback(this,"SetActiveTab",[index]);
			CCSS.TagAs(tab,"cos-tab");
			tab.clicked.Add(cbSetActive);
			m_tabs.push(tab);
			this.layout.AddChild(tab);
			this.SetActiveTab( this.Count()-1 );
			return m_curIndex;
		}
		this.SetTabText = function(index,text){
			qAssert(m_tabs.length > index);
			m_tabs[index].SetText(text);
			return this;
		}

		this.SetTabIcon = function(index,icon){
			qAssert(m_tabs.length > index);
			m_tabs[index].SetIcon(icon);
			return this;
		}
		this.SetTabClosable= function(closable){
			//m_tabs[index].textContent = text;
			return this;
		}
		this.RemoveTabAt 	= function(index=-1){
			qAssert(m_tabs.length > Math.abs(index));
			if(m_tabs.length < 2 ) return this;
			if( index < 0 ) index = m_tabs.length + index;
			m_tabs.splice(index,1);
			this.layout.RemoveChildAt(index);
			return this;
		}		
		this.SetOrientation = function( tabPos ){
			var i = this.Count();
			switch(tabPos){
				case QB.North:
                    while(i--) m_tabs[i].UiStyle.Swap(m_curTag,m_NTag);
                    this.layout.SetType(1);
                    break;
				case QB.South:
                    while(i--) m_tabs[i].UiStyle.Swap(m_curTag,m_STag);
                    this.layout.SetType(1);
                    break;
				case QB.West:
                    while(i--) m_tabs[i].UiStyle.Swap(m_curTag,m_WTag);
                    this.layout.SetType(0);
                    break;
				case QB.East:
                    while(i--) m_tabs[i].UiStyle.Swap(m_curTag,m_ETag);
                    this.layout.SetType(0);
                    break;
			}
			m_curTag = m_tabPosList[tabPos];
			return this;
		}
		this.SetTabsShape   = function(tabShape){
			switch(tabShape){ // TabShape:RT, RR, TT, TR

			}
			return this;
		}
		this.CurrentIndex 	= function(){ return m_curIndex;}

		this.SetOrientation(tabPos);

	}
    return CTabBar;
});