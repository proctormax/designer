qPack("CGroupBox",function(){
    const CWidget   = qRequire("CWidget");
    const CLabel    = qRequire("CLabel");
    const CCSS      = qRequire("CCSS");

    CCSS.New("CPaneGroup")
    
    .Add(".CGroupBox",{
        "text-align":"left",
        "width":"83%",
        "margin-top":"1pt",
        "display":"inline-block",
        "border":"solid 2px transparent",
    })
    .Add(".CGroupBox:not(.collapsed)",{
        //"box-shadow":" 0 0 4px 3px #111",
        "border-radius":"4px",
        "border-color":"#0004",
        //"background-color":"#3334",
    })
    .Add(".CGroupBox:not(.collapsed) > .CGroupBar",{
        //"box-shadow":" 0 0 4px 3px #111",
        "background-color":"#4442",
        "border-top-left-radius":"inherit",
        "border-top-right-radius":"inherit",
    })
    .Add(".CGroupBox.modified > .CGroupBar > .CGroupTitle",{
        //"box-shadow":" 0 0 4px 3px #111",
        //"border-bottom":"solid 1px #586",
        "color":"orangered"
    })
    .Add(".CGroupContent",{
        //"box-shadow":" 0 0 4px 3px #111",
        "position":"relative",
       // "overflow":"hidden",
        "padding":"2pt",
        "box-sizing":"content-box",
        //"border":"dashed 1px #449",
    })
    function CGroupBox( title, parent) {
        qExtend(this,CWidget,"div","CGroupBox");
        const m_rows = [];
        var m_title;
        var m_collapse;
        var m_header = new CWidget("div","CGroupBar");
        var m_content = new CWidget("div","CGroupContent");
        const $this = this;

        const m_collapsed = new QB.CSignal("collapsed",{collapse:"Boolean"});


        Object.defineProperty(this,"Header",{
            get:()=>{
                return m_header;
            },
            set:( header )=>{
                m_header = header;
            },
        });
        Object.defineProperty(this,"Title",{
            get:()=>{
                return m_title;
            },
            set:( title )=>{
                m_title = title;
            },
        });
        Object.defineProperty(this,"Content",{
            get:()=>{
                return m_content;
            },
            set:( content )=>{
                m_content = content;
            },
        });
        Object.defineProperty(this,"Collapsed",{
            get:()=>{
                return m_collapsed;
            }
        });
        
        this.Add = function( row ){
            m_rows.push( row );
            m_content.AddChild(row);
            return row;
        };
        this.CreateRow = function( sizes ){
            var row = new CRow( sizes );
            
            return this.Add(row);
        };

        this.ToggleCollapsed = function(){
            this.SetCollapsed( !this.IsCollapsed());
        };

        this.SetCollapsed = function( c ){
            if( c === m_collapse ) return;
            m_collapse = c;
            m_collapsed.Emit({collapse:c});
            this.Content.SetVisible( c === false );           
            if(c){
               CCSS.Add(this,"collapsed")               
            }else
            CCSS.Remove(this,"collapsed")
        };
        this.IsCollapsed = function(  ){
            return m_collapse === true;
        };

        this.Init = function(){

        m_title = new QB.CGroupTitle(title);
            this.Header.AddChild(m_title);
            this.AddChild(m_header);
            this.AddChild(m_content);
            this.Collapsed.Add( e=>{
            });

            m_header.DC().addEventListener("click",e=>{
                $this.ToggleCollapsed();
            });

            if( parent !== null ) parent.Add( this );
        };
        this.Init();
    }

    CGroupBox.prototype.AddChild = function( child ){
        this.Content.AddChild(child);
    };
    CGroupBox.prototype.Collapse = function(){
        this.SetCollapsed(true);
    };
    CGroupBox.prototype.Expand = function(){
        this.SetCollapsed(false);
    };
    CGroupBox.New = function(){
        return new CGroupBox("group",null);
    };

    return CGroupBox;
});
