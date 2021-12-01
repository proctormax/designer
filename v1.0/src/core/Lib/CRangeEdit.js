qPack("CRangeEdit",function(){
    const CAction   = qRequire("CAction");
    const CLabel    = qRequire("CLabel");
    const CWidget   = qRequire("CWidget");
    const CSeekBar  = qRequire("CSeekBar");
    const CCSS      = qRequire("CCSS");
    const Geom      = qRequire("Geom");

    CCSS.New("CRangeEdit")
    .Add(".crange-label, .crange-input",{
        "position":"relative",
        "float":"left",
        "padding":"4px",
        "box-sizing":"content-box",

    })
    .Add(".crange-input",{
        "min-width":"20px",
        "height":"13px",
        "overflow":"hidden",
        "color":"#eee",
        "outline":"none",
        "white-space":"none",
        "text-align":"center",
        "font-family":"lovelo,sans",

    })
    .Add(".CRangeEdit",{
        "min-height":"24px",
        "border":"dashed 1px #334",

    });
    function CRangeEdit(property="property", max=1, min=0, value=0, step=0.1, enabled=true){
        
        const m_label = new CLabel(property,'crange-label',"spam");
        const m_input = new CLabel(value.toString(),'crange-input',"spam");
        const m_seekBar= new CSeekBar("horizontal", max, min, step );
        const m_changed = new CSignal( property+"Changed",{value:"Number"});
        const m_lt = new CWidget("div","lt");


        const m_ptr = {
            maximum:"Number",
            minimum:"Number",
            step:"Number",
        };

        qProperties(this,m_ptr);
        qExtend(this, CWidget,"CRangeEdit");

        m_seekBar.UiStyle.Set("position","relative");
        m_seekBar.UiStyle.Set("display","block");
        m_lt.UiStyle.Set("position","relative");
        m_seekBar.UiStyle.Set("background-color","#455");
        this.UiStyle.Set("padding","4px");
        m_lt.UiStyle.Set("overflow","hidden");
        Object.defineProperty(this,"Changed",{get:()=>{
            return m_changed;
        }});
        Object.defineProperty(this,"Label",{get:()=>{
            return m_label;
        }});
        Object.defineProperty(this,"Input",{get:()=>{
            return m_input;
        }});
        Object.defineProperty(this,"SeekBar",{get:()=>{
            return m_seekBar;
        }});

        
        //this.Widgets().progress.SetVisible(false);
        

        m_lt.AddChild( m_label );
        m_lt.AddChild( m_input );
        this.AddChild( m_lt );
        //this.AddChild( m_seekBar );
        m_seekBar.ProgressChanged.Add( e=>{
            m_input.SetText( e.progress.toString());
        });

        m_input.SetAttribute("contentEditable",true);
        m_label.SetAttribute("mouseEnabled",false);

        CCSS.Set( this,"position","relative");
        
    }

    return CRangeEdit;
});
