
qPack('CButton',function(){
    const CFrame    = qRequire("CFrame");
    const CWidget   = qRequire("CWidget");
    const CAction   = qRequire("CAction");
    const CSize     = qRequire("CSize");
    const CRect     = qRequire("CRect");
    const CIcon     = qRequire("CIcon");
    const CLabel    = qRequire("CLabel");
    const CBoxLayout= qRequire("CBoxLayout");
    const CCSS      = qRequire("CCSS");
    const Geom      = qRequire("Geom");

    CCSS.New("CButton")
    
.Add(".XButton",{
    "text-transform":"capitalize",
    "position":"relative", 
    "overflow":"hidden",
    "text-align":"left",
    "-moz-box-sizing":"border-box",
    "box-sizing":"border-box !important",
    "float":"left",
    "vertical-align":"center",
    "border-radius":"3px",
    "cursor":"default",
    "display":"inline-block",
    "border-style":"solid",
    "border-width":"0.5px",
    "border-color":"#111",
    "padding":"3pt 4pt",
})

.Add(".XButton::before",{
    "content":'" "',
    "position":"absolute",
    "display":"block",
    "height":"100%",
    "width":"100%",
    "left":"0",
    "top":"0",
    "-moz-box-sizing":"border-box",
    "box-sizing":"border-box !important",
    "border-radius":"inherit",
    
})
.Add(".XButton:not(._active):hover .CLabel",{   
    "transition":"color 0.3s", 
    "color":"#DeD",
})

.Add(".XButton:not(._active):active",{ 
    "border-color": "rgb(2, 57, 85)", 
})

.Add(".XButton._active",{  
    "transition":"background-color 0.5s", 
    "background-color":"#18d4",
    "border-color": "#135", 
})
.Add(".XButton._active .CLabel",{  
    "color":"#ddd"
})
.Add(".XButton ._text",{ 
    "color":"inherit", 
    "cursor":"inherit !important", 
})
.Add(".XButton > .CLabel",{ 
    "position":"absolute", 
    //"left":"50%", 
    "font-size":"0.90em",
    "margin-top":"50%", 
    "transform":"translateY(-50%)", 
    "cursor":"default", 
})
    var CBehavior = 
    {
        ToggleButton:0,
        MenuBarButton:0,
        TabBarButton:0,
        PushButton:0,
        CheckButton:0,
        ComboButton:0
    };
    function CButton( text="push button",icon=null,size= new CSize(40,24) ){
        //////////////////////////////// 
        var m_label      = new CLabel(text,"_text","spam");
        var m_layout     = new CBoxLayout();
        var m_iconSize   = new CSize(size.Height(),size.Height());

        const m_ptr = {
            text:"String",
            icon:"CIcon",
            size:"CSize",
        };
        
        //qProperties(this, m_ptr);
        //////////////////////////////// 
        const m_clicked    = new CSignal(this,'clicked',{ctrl:"Boolean",alt:"Boolean",shift:"Boolean"});
        const m_pressed    = new CSignal(this,'pressed', {pressed:"Boolean"});
        const m_released   = new CSignal(this,'released', {released:"Boolean"});
        
        
        Object.defineProperty(this,"Label",{
            get:()=>{
                return m_label;
            }
        });
        
        Object.defineProperty(this,"Clicked",{
            get:()=>{
                return m_clicked;
            }
        });
        Object.defineProperty(this,"Pressed",{
            get:()=>{
                return m_pressed;
            }
        });
        Object.defineProperty(this,"Released",{
            get:()=>{
                return m_released;
            }
        });


        //////////////////////////////// 
        qExtend( this, CSize,size.Width(), size.Height());
        qExtend( this, CAction,text,icon);		
        qExtend( this, CWidget,"div","XButton");		
        
        //////////////////////////////// 
        this.Init = function(){
            //this.SetLayout( m_layout );
            //m_layout.Add( this.Icon() );
            this.AddWidget( m_label );

            //CCSS.Set(this,"border","solid 1px #0497");
            CCSS.Set(this,"padding","2px 4px");
            //CCSS.Set(this,"width","80px");
            this.InitEvents();

            this.DC().addEventListener("click", e =>{
                m_clicked.Emit({ctrl:e.ctrlKey,alt:e.altKey,shift:e.shiftKey});                
            });
        };
        this.IconSize = function(){ return m_iconSize; }
        this.SetIconSize = function(size){
           m_iconSize.Set(size);
        };


        this.Margins = function(){ return m_margins; };
        this.SetMargins = function( margins ){ m_margins = margin; };
        this.Label = function(){ return m_label; };        
        this.SetLabel = function( label ){ 

            m_label = label; 
        };        

        this.Init();
    }
    CButton.prototype.ClickEvent = function(e){
        this.Clicked.Emit({pressed:true});
    };
    CButton.prototype.MousePressEvent = function(e){
        this.Pressed.Emit({pressed:true});
    };
    CButton.prototype.MouseReleaseEvent = function(e){
        this.Released.Emit({released:true});
    };
    
    CButton.New = function(text="button"){
        return new CButton( text );
    };
    qConstruct(CButton,"CIcon", icon =>{
         return new CButton( icon.Text(), icon );
    });
    qConstruct(CButton,"CAction", act =>{
         return new CButton( act.Text(), act.Icon() );
    });
    return CButton;
});