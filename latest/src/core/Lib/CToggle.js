qPack("CToggle",function(){
    const CWidget = qRequire("CWidget");
    const CLabel  = qRequire("CLabel");
    const CCSS  = qRequire("CCSS");
    CCSS.New("CToggle")
    .Add(".CToggle",{
        "position":"relative",
    })
    .Add(".CToggle._active::before",{
        "content":"' '",
        "display":"block",
        "position":"absolute",
        "width":"100%",
        "height":"100%",
        //"border-color":"#000",
        "box-shadow":"0px 2px 5px 2px #000a inset",
    });
    function CToggle( text, toggled=false , size=null ) {
        const m_ptr = {
            toggled:"Boolean",
            icon:"CIcon",
            text:"String",
        };
        const m_label = new CLabel(text,'button-text',"spam");
        const $this = this;
        qProperties(this,m_ptr);
        
        Object.defineProperty(this,"Label",{get:()=>{
            return m_label;
        }});
        qExtend(this,CWidget,"div", "CToggle XButton" );

        this.Init = function(){
            this.AddChild( m_label );
            this.SetText( text );
            this.TextChanged.Add( e=>{
                m_label.SetText(e.text);
            });
            this.ToggledChanged.Add(e=>{
                if($this.Toggled())
                    CCSS.Add($this,"_active")
                else
                    CCSS.Remove($this,"_active")

            });
            this.SetToggled( toggled );

            this.DC().addEventListener("click", e =>{
                $this.Toggle();
            });

            if(size){
                this.UiStyle.Set("width",size.Width()+size.Unit());
                this.UiStyle.Set("height",size.Height()+size.Unit());
            }
        };

        

        this.Init();
    }

    CToggle.prototype.Toggle = function(){
        this.SetToggled( !this.Toggled() );
    };

    CToggle.New = function(text="toggle",toggled=true){
        return new CToggle(text,toggled);
    };


    return CToggle;
});