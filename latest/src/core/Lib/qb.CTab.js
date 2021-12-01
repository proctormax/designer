
qPack('CTab',function(){
    const CFrame = qRequire("CFrame");
    const CAction = qRequire("CAction");
    const CSize = qRequire("CSize");
    const CIcon = qRequire("CIcon");
    
    var CBehavior = 
    {
        ToggleButton:0,
        MenuBarButton:0,
        TabBarButton:0,
        PushButton:0,
        CheckButton:0,
        ComboButton:0
    };
    function CTab( icon=null,text="push button",size= new CSize(40,24) ){
        //////////////////////////////// 
        qExtend(this, CWidget,'div','CTab');
        qExtend(this, CAction,text,icon|| new CIcon());		
        //////////////////////////////// 
        var _field ={            
            layout      :"CBoxLayout",
            iconSize    :"CSize",
            icon        :"CIcon",
            label       :"CLabel",
            closeAct    :"CIcon"
        };

        qProperties(this, _field );

        //////////////////////////////// 
        this.Clicked    = new CSignal(this,'TabClicked', {ctrlKey:"Boolean",altKey:"Boolean",shiftKey:"Boolean"});
        this.Pressed    = new CSignal(this,'TabPressed', {pressed:"Boolean"});
        this.Released   = new CSignal(this,'TabReleased',{released:"Boolean"});        
        
        //////////////////////////////// 
        this.Init = function(){
            //this.SetLayout( _field.layout );
            this.Add( this.Icon() );
            this.Add( _field.label );
            this.Add( _field.closeAct );
            //this.SetLayout(_field.layout);
        };

        this.Init();
    }
    
    CTab.Cast = function(dom){

    }
    return CTab;
});