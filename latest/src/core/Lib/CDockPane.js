qPack("CDockPane",function(){
    const CWidget   = qRequire("CWidget");
    const CLabel    = qRequire("CLabel");
    const CCSS      = qRequire("CCSS");

    CCSS.New("CDockPane")
    .Add(".CDockPane",{
        "font-size": "12px",
        "font-family": "sans-serif",
        "border": "1px solid #111",
        "display": "block",
        "border-radius": "0px",
        "box-shadow": "0px 2px 4px rgba(0, 0, 0, 0.2)",
        "margin-bottom": "2px !important",
        "float": "left",
        "clear": "both",
        "text-align": "center",
        //"background-color":"rgb(11, 20, 24)",
        "background-color":"rgb(24, 11, 11)",
        "background-color":"rgb(11, 12, 1)",
        "position":"absolute",
        "padding": "2px 0",
        "word-wrap": "none",
        "box-sizing": "content-box",
        "width": "220px",
    })
    .Add(".CDockPane::before",{
        "content":'" "',
        "position":' absolute',
        "display":' block',
        "height":' 100%',
        "width":' 100%',
        "left":' 0',
        "top":' 0',
        "border-style":' solid',
        "border-color":' transparent',
        "border-width":' 1px',
        "-moz-box-sizing":' border-box',
        "box-sizing":' border-box !important',
        "border-radius":' inherit',            
    })
    .Add(".CDockPane:hover::before",{
        "border-color":"#159",
        "transition":"0.5s border-color"
    })
    .Add(".CDockPane > .CDockHeader > .ctitle",{ 
        "padding-top": "3px",
        "text-transform": "capitalize",
        "font-size":"10px;",
        "margin-bottom":"3px",
        "display": "block",
       // "background-color":"#1592",
    })
    .Add(".CFrame",{
        "background-color":"#159",
        //"transition":"0.5s border-color"
    })
    function CDockPane( title, rect, parent = null) {
        qExtend(this,CWidget,"div","CDockPane");
        const m_rows = [];
        var m_collapse = false;
        const m_collapsed = new QB.CSignal("collapsed",{collapse:"Boolean"});
        var m_title;
        var m_header    = new CWidget("div","CDockHeader");
        var m_content   = new CWidget("div","CContent");
        const $this = this;

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
        this.SetCollapsed = function( collapse ){
            m_collapsed = collapse;
        };
        this.GetCollapsed = function(){
            return m_collapsed;
        };


        this.ToggleCollapsed = function(){
            this.SetCollapsed( !this.IsCollapsed());
        }

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

            m_title = new QB.CLabel(title,"ctitle");
            this.Header.AddChild(m_title);
            this.AddChild(m_header);
            this.AddChild(m_content);
            CCSS.Set(m_title,"padding","5px");
            CCSS.Set(m_title,"color","#dee");
            Geom.SetRect(this.Content, rect.M()); 
            Geom.SetWidth(this, rect.Width()); 
            this.SetDraggable(true,this,m_title);   
            
            m_header.DC().addEventListener("dblclick",e=>{
                $this.ToggleCollapsed();
            });

            if( parent !== null ) parent.Add( this );
        };
        this.Init();
    }
    

    CDockPane.prototype.Collapse = function(){
        this.SetCollapsed(true);
    };
    CDockPane.prototype.Expand = function(){
        this.SetCollapsed(false);
    };
    CDockPane.New = function(){
        return new CDockPane("group",null);
    };

    return CDockPane;
});
