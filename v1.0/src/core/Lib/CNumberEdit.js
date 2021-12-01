qPack("CNumberEdit", function( exports={}){

    const CWidget = qRequire("CWidget");
    const CSignal = qRequire("CSignal");
    const CLabel  = qRequire("CLabel");
    const IPropertyEdit = qRequire("IPropertyEdit");
    const CCSS    = qRequire("CCSS");

    CCSS.New("CNumberEdit")
    .Add(".CNumberEdit",{
        "position":"relative",
        "display":"inline-block",
        "font-family":"sans-serif !important",
        "border-bottom":"dashed 1px transparent",
    })
    .Add(".CNumberEdit .cvalue",{
        "position":"relative",
        "color":"#ddd",
        "font-size":"14px",
        "font-family":"lovelo, sans",
        "outline":"none",
        "padding":"2px",
    })
    .Add(".CNumberEdit .cunit",{
        "position":"relative",
        "color":"#ddd",
        "font-size":"14px",
        "font-family":"sans",
        "outline":"none",
    })
    .Add(".CNumberEdit .ctext",{
        "padding":"2px",
        "position":"relative",
        "font-size":"14px",
    })
    .Add(".CNumberEdit > *",{
        "display":"inline-block"
    });

    /**
     * Provides editing facility of numeric property values of an object.
     * @param {String} property_name property name
     * @param {Boolean} enabled property editable
     * @param {Number} value initial value of the property
     * @param {String} unit unit of the value.
     */
    function CNumberEdit(property_name, value=100, step =1 ,unit = 'pt', enabled=true){

        qExtend(this,CWidget,'div',"CNumberEdit");
        const m_changed = new CSignal(property_name+"Changed",{value:"Number"});
        const m_label = new CLabel(property_name,"ctext","spam");
        const m_input = new CLabel(value.toString(),"cvalue _C2", "spam");
        const m_unit  = new CLabel(unit,"cunit", "spam");

        const m_ptr = {
            value:"Number",
            step:"Number",
            unit:"String",
        };
        Object.defineProperty(this,"Label",{get:()=>{
            return m_label;
        }});
        Object.defineProperty(this,"Input",{get:()=>{
            return m_input;
        }});
        Object.defineProperty(this,"Unit",{get:()=>{
            return m_unit;
        }});

        qProperties(this,m_ptr);
        
        m_input.DC().contentEditable = true;
        

        this.Text = function(){
            return m_label.Text();
        };
        this.SetText = function( label ){
            m_label.SetText(label);
        };

        this.DC().click = this.GrabKeyboard();
        this.AddChild( m_label);
        this.AddChild( m_input);
        m_input.AddChild( m_unit);
        this.SetValue(value);
        this.SetUnit(unit);
        this.SetStep(step);
        this.InitEvents();
        this.ValueChanged.Add( e => {            
            m_input.SetText( e.value.toString() );
        });
        this.UnitChanged.Add( e => {            
            m_unit.SetText( e.unit );
        });

    }

    CNumberEdit.prototype.KeyReleaseEvent = function(e){
            //console.error(e.keyCode);
    };

    CNumberEdit.prototype.KeyPressEvent = function(e){
        
            //console.error( this.Text(),e.keyCode);
    };

    CNumberEdit.prototype.WheelEvent = function(e){
        this.SetValue( this.Value() +( e.deltaY * 0.01));
        //console.error("@wheel",e);
    };

    CNumberEdit.prototype.Increment = function(){

        this.SetValue( this.Value() + this.Step() );
    };




    return CNumberEdit;
});