console.log('----------------------------- layouts -------------------------------');
let layouts = core.plugin("layouts",{
  about:"layouts is the control manager of all the layouts within the app",
  version:"1.0.0",
  requires:{
    "utils":"v1.0.0",
    "events":"v1.0.0",
    "UI":"v1.0.0",
  },
  extends:{
/*       panels:[
          {panel:"layouts", layout:"layoutsctl"}
      ],
      layouts:[
          {layout:'layouts', type:'CVFlex', items:[
              {item:'CFrame', width:500, height:20}
          ]}
      ] */
  },
},(function ( ) {

    let define = utils.def ;
    let AddChild = utils.AddChild;
    let GetTag       = utils.GetTag;
    let FlexAlignContent = { Center:"center", End:'flex-end', Start:'flex-start' };
    let FlexJustify =
    {
      FlexStart:"flex-start",
      FlexEnd:"flex-end",
      Center:"center",
      SpaceBetween:"space-between",
      SpaceAround:"space-around",
      SpaceEvenly:"space-evenly",
      Start:"start",
      End:"end",
      Left:"left",
      Right:"right",
      Safe:"safe",
      Unsafe:"unsafe",
    };
    let FlexWrap = {NoWrap:'nowrap', Wrap:'wrap', WrapReverse:'wrap-reverse'};
    let FlexDirection = { Row:'row', RowReverse:'row-reverse', Column:'column', ColumnReverse:'column-reverse'};
    let flexCount = 1;
    function CFlexItem( widget, parent = null, index=0 ,flag=null){
      let 
      _widget = widget,
      _ui = utils.CTag(flag,null,'item');
      define( this, 'ui', _ui );
      define( this, 'DC', ()=>{ return _ui; } );
      define( this, 'index', index );
      define( this, 'widget', _widget, widget =>{
         if(_widget !== null) _ui.removeChild( GetTag(_widget));
      } );

      if( widget )
        AddChild( widget, this );
    }
    function CFlex( items=null,direction = 'horizontal', wrap = FlexWrap.NoWrap, reverse = false){
        let 
        _ui = utils.CTag(direction,'flex-'+ flexCount,'layout'),
        _wrap,          
        _items = [],          
        _widgets = [],          
        _direction, 
        _space, 
        $this = _ui, 
        _reverse, 
        _justify, 
        _alignItems, 
        _alignContent;
        
        define( this, 'ui', _ui );
        define( this, 'items', _items );
        define( this, 'widgets', _widgets );
        define( this, 'DC', ()=>{return _ui; } );
        define( this, 'wrap', _wrap );
        define( this, 'justify', _justify, val => { $this.style.justifyContent = val; } );
        define( this, 'spacing', _space );
        define( this, 'alignment', _alignContent, val => { $this.style.alignContent = val; }  );
        define( this, 'reverse', _reverse , reverse =>{ 
          if(reverse == true) utils.Flag($this,'reversed')//+ '-reverse';
          else utils.Unflag($this,'reversed')//+ '-reverse';
          
          console.log('CFlex::reverse =>', reverse);
        });

        ///////////// METHODS
        define( this, 'Add', widget => { 
          _widgets.push( widget );
          this.AddItem(new CFlexItem(widget));
        });
        define( this, 'AddItem', item => {          
          item.parent = this;
          item.index  = _items.length;
          _items.push(item);
          AddChild( item, $this );
        });
        define( this, 'Remove', item => { 
          if( item.parent == this){           
            UI.removeChild( item, $this );
            return _items.splice(item.index, 1);
          }
        });
        define( this, 'RemoveAt', index => {

        });
        define( this, 'Swap', (index, item) => {

        });
        define( this, 'Insert', (index, item) => {

        });

        if( items !== null && items.length )
          items.forEach( item => {  this.Add(item);} );

        flexCount++;
        
    };
    function CHFlex(items){
      CFlex.apply(this,[items,'horizontal']);
    }
    function CVFlex(items){
      CFlex.apply(this,[items,'vertical']);
    }
    
    function CGridLayout( direction = 'horizontal'){

    };

  const init = ( ...includes )=>{
    //let utils = utilss.utils;
    console.warn('########## initialize "layouts v.0.0.1: includes', includes);
    /* define = utils.def; 
    AddChild = utils.AddChild; 
    $ = utils.GetFlag;  */
    

    UI.RegisterClass( "CFlex", CFlex );
    UI.RegisterClass( "CFlexItem", CFlexItem );
    UI.RegisterClass( "CVFlex", CVFlex );
    UI.RegisterClass( "CHFlex", CHFlex );
    UI.RegisterClass( "Flex", CHFlex );
    UI.RegisterClass( "FexAlignContent", FlexAlignContent);
    UI.RegisterClass( "FexJustify", FlexJustify);
    UI.RegisterClass( "FexWrap", FlexWrap);
    UI.RegisterClass( "FexDirection", FlexDirection);
    
    define( CHFlex, "FexAlignContent", FlexAlignContent);
    define( CVFlex, "FexAlignContent", FlexAlignContent);
    define( CHFlex, "FexJustify", FlexJustify);
    define( CVFlex, "FexJustify", FlexJustify);
    define( CHFlex, "FexWrap", FlexWrap);
    define( CVFlex, "FexWrap", FlexWrap);
    define( CHFlex, "FexDirection", FlexDirection);
    define( CVFlex, "FexDirection", FlexDirection);
  }
  const main = ()=>{
    console.log("layouts is started....");

  }
  const quit = ()=>{
    console.log("layouts is shutting down...");
  }
    /// controls.

    let exports = {
      init,
      main,
      quit,
      FlexAlignContent,
      FlexJustify,
      FlexWrap,
      FlexDirection,
      CHFlex, 
      CFlexItem, 
      CVFlex,
      CGridLayout}; 

    return exports;
}));

/// Wireframing | Flow | Coding | Design | Execution | 
///////////// Modules, Actions, Layouts //////////////////////