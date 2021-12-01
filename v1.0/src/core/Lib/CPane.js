
qPack('CPane',function(){
    const CCSS       = qRequire('CCSS');
    const CRect      = qRequire('CRect');
    const CWidget    = qRequire('CWidget');
    const CView      = qRequire('CView');
    const CActionBar = qRequire('CActionBar');
    const CSignal    = qRequire('CSignal');
    const CSize      = qRequire('CSize');
    const CLabel     = qRequire('CLabel');
    const Geom       = qRequire('Geom');
    
    CCSS.New('CPane')
    .Add(".CPane",{
        "position":"absolute"
    })
    .Add(".CPane > .CPaneToolBar",{
        "position":"relative",
        "left":"0",
        "top":"0",
        //"display":"none !important",
        "height":"30px",
        "width":"100px",
        "background-color":"#821",
    })
    .Add(".CPane > .CView",{
        "border":'solid 1px transparent',
        "box-sizing":'border-box',
        "max-width":'100%',
        "bottom":'0',
		"min-width":"200px !important",
		"min-height":"100px !important"
    })
    .Add(".CPane:hover > .CView",{
        "border-color": 'rgb(0,140,40)',
        "transition":'0.5s border-color',
    });

    function CPane( rect , orientation=1, attrib='' ){
        qExtend(this,CWidget,'div',"CPane "+attrib);
        
        var $this = this;
        const m_title = new CLabel("untitled");
        var m_ptr = {
            content:"CWidget",
            /**
             * This pane's Rect
             */
            rect:"CRect",
            
            /**
             * The view / content Rect
             */
            contentRect:"CRect",

            orientation:"Number",
            /**
             * This pane's index number in the MDI
             */
            mdiIndex:"Number",
            /**
             * This pane's Left sibling MDI index.
             */
            leftMdiIndex:"Number",
            /**
             * This pane's Top sibling MDI index.
             */            
            topMdiIndex:"Number",
            /**
             * This pane's Right sibling MDI index.
             */
            rightMdiIndex:"Number",
            /**
             * This pane's Bottom sibling MDI index.
             */
            bottomMdiIndex:"Number",

            /**
             * This pane's tool Bar.
             */
            toolBar:"CActionBar",
            /**
             * This pane's viewport. Used to display contents.
             */
            view:"CView",

            title:"String"
        };
        qProperties(this, m_ptr );
        this.ContentRelased = new CSignal(this,'contentReleased',{content:"CWidget"});

		qOverload(this,'SetRect','Number,Number,Number,Number',(x,y,w,h)=>{
			m_ptr.rect.Reset(x,y,w,h);
			this.SetRect(m_ptr.rect);
		}); 
		this.Update = function( r = null ){
            r = qTypeOf(r,"CRect") ? r : m_ptr.rect;			
            Geom.SetRect($this,r.M());
            m_ptr.toolBar.SetWidth( r.Width() );
            //_field.toolBar.SetHeight( r.Width() );
            m_ptr.contentRect.SetHeight( r.Height() - m_ptr.toolBar.Height( ) - 2);
            m_ptr.contentRect.SetWidth( r.Width() - 2);
            m_ptr.view.Update( m_ptr.contentRect );



		};
        this.Init = function( rect ){
            rect = rect || new CRect(0,0,200,400);

            console.log("-------------------------------\n");
            console.log("-------------------------------\n");
            console.log("--------------CPane::Init",qTypeOf(rect),"------------\n");
            console.log("-------------------------------\n");
            console.log("-------------------------------\n");
            //qExtend(this,CRect, rect.X(),rect.Y(),rect.Width(), rect.Height());

            this.ContentChanged.Add( (a,b)=>{ 
                $this.RemoveChild(b);
                $this.AddChild(a);
            });


            m_ptr.toolBar          = new CActionBar( "horizontal",  CSize.New( rect.Width(), 24)  );
			m_ptr.rect = rect;
            m_ptr.contentRect =  new CRect(0, m_ptr.toolBar.Height()+1, rect.Width(),
            rect.Height() - m_ptr.toolBar.Height());
            
            m_ptr.toolBar.AddWidget( m_title );

            
            m_ptr.leftMdiIndex     = -1;
            m_ptr.topMdiIndex      = -1;
            m_ptr.rightMdiIndex    = -1;
            m_ptr.bottomMdiIndex   = -1;
            m_ptr.view             = new CView( m_ptr.contentRect );
            
            this.AddChild( m_ptr.view );
            this.AddChild( m_ptr.toolBar );

            this.RectChanged.Add(this.Update);
            
			this.SetRect(rect);
		
        };

        this.toString = function(){
            return "CPane <"+this.Rect().M().toString()+">";
        };

        this.Sides = function(){
            var res =  [ 
                this.TopRect(),
                this.RightRect(),
                this.BottomRect(),
                this.LeftRect()
            ];
            return res;
        };

        this.ReleaseContent = function(){
            if( this.Content() !== null ){
                this.RemoveChild(this.Content());
                this.ContentRelased.Emit([m_ptr.content]);
                m_ptr.content = null;
                return true;
            }
            return false;
        };

        this.IncrementRight = function( length ){
            m_ptr.rect.IncrementRight( length );
            this.Update( m_ptr.rect );
        };
        this.IncrementLeft = function( length ){
            m_ptr.rect.IncrementLeft( length );
            this.Update( m_ptr.rect );
        };
        this.IncrementBottom = function( length ){
            m_ptr.rect.IncrementBottom( length );
            this.Update( m_ptr.rect );
        };
        this.IncrementTop = function( length ){
            m_ptr.rect.IncrementTop( length );
            this.Update( m_ptr.rect );
        };

        this.Add = function( widget ){
            if( this.View() ){
                this.View().AddChild( widget);
            }
        }

			
        this.Init(rect);
    }

    CPane.New = function(){
        var view = new CPane(new CRect(0,0,1,1));
        return view;
    };
    qConstruct(CPane,"CRect",function(rect){
        var view = new CPane(rect);
        return view;
    });
	qConstruct(CRect,'Number,Number,Number,Number',(x,y,w,h)=>{		
		return new CPane(CRect.New(x,y,w,h) );
	});
	qConstruct(CPane,'Array',function( r ){
		return new CPane(CRect.Cast(r));
    });
    
	qConstruct(CPane,'Number,Number',function(w,h){ 				 
		return new CPane(CRect.New(0,0,w,h));
	});
	qCast(CPane,'CFloat4',function( f ){
		return new CPane(CRect.New(f.X(),f.Y(),f.Z(),f.W()));
	});
    return CPane;
});