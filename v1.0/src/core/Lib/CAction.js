qPack("UI.CAction", function( Cloud ){

	const	CSignal = qRequire("CSignal");

	function CAction(text="",icon=null,parent=null,caption="",shortcuts=null){

		var

		m_parent=parent,m_key,

		m_uis,m_data,

		m_issep = false;

		var m_ptr =

		{

			icon:"CIcon",	
			text:"String", 	
			caption:"String",

			parent:"CWidget",	
			parentAction:"CAction",	
			
			shortcut:"CShortcut",	
			autoRepeat:"Boolean",

			checkable:"Boolean",
			menu:"CMenu", 	
			font:"String",

			toolTip:"String", 	
			group:"CActionGroup", 	
			enabled:"Boolean",

			statusTip:"String", 
			shortcuts:"CList", 	
			checked:"Boolean",

			visible:"Boolean"

		};


		qProperties(this, m_ptr);

		/*SIGNALS*/

		this.Changed 	=  new CSignal( this, "Changed", {

			item:"String", value:"Object"

		});

		this.Hovered 	=  new CSignal( this, "Hovered", {

			b:"Boolean"

		});

		this.Toggled 	=  new CSignal( this, "Toggled", {

			b:"Boolean"

		});

		this.Triggered	=  new CSignal( this, "Triggered", {

			b:"Boolean"

		});

		/*SLOTS*/

		this.Activate= function (aevent){

			//this.Triggered.Emit([]);

		};

		this.Trigger = function(b){

			if(b){

				return qEmit(m_parent,Event.Trigger,b);

			}

			else{

				return qEmit(m_parent,Event.Trigger);

			}

		};

		this.Init = function(){
			m_ptr.text      = text;
			m_ptr.icon      = icon;
			m_ptr.parent    = parent;
			m_ptr.caption   = caption;
			m_ptr.shortcuts = shortcuts;
		};

		/*PUBLIC*/

		this.Widgets = function(){

			return m_uis;

		};

		this.Data 	 = function(){

			return m_data;

		};

		this.SetData = function(data){

			if( m_data !== data ){

				m_data = data;

				this.Changed.Emit(["SetData",data],m_key);

			}

		};


		this.ShowStatusText = function(widget=null){

			if( widget ) widget.SetStatusText( this.StatusTip() );

		};



		this.IsSeparator = function(){

			return m_issep;

		};

		this.SetSeparator = function( b ){

			m_issep   = b;

		};

		this.Init();

	}

	CAction.New = function(){
		return new CAction();
	};

	qConstruct(CAction,'String',function(text){

		return new CAction(text);

	});

	qConstruct(CAction,'CIcon',function(icon){

		return new CAction(icon.Text(),icon);

	});

	qConstruct(CAction,'CWidget,String',function(parent,text){

		return new CAction(text,null,parent);

	});

	qConstruct(CAction,'CWidget,CIcon',function(parent,icon){

		return new CAction(icon.Text(),icon,parent);

	});

	//EnumFreeze(CAction);

	//EnumInherit(CAction,[CAbstractItemView]);

	//Freeze(CAction);
	return CAction;

});