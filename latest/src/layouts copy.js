let layouts = qService("layouts",function ( utils, UI, events ) {
  let service = {};
 

   let define = utils.define; 
   let $ = utils.GetFlag; 
    let AlignContent = { Center:"center", End:'flex-end', Start:'flex-start' };
    let Justify =
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
    let Wrapping = {NoWrap:'nowrap', Wrap:'wrap', WrapReverse:'wrap-reverse'};
    let Direction = { Row:'row', RowReverse:'row-reverse', Column:'column', ColumnReverse:'column-reverse'};
    let flexCount = 1;
    function CFlexItem( widget, parent = null, index=0 ){
      let 
      _widget = widget,
      _ui = utils.CTag('horizontal','hflex-'+ flexCount,'item');
      define( this, 'ui', _ui );
      define( this, 'DC', ()=>{ return _ui; } );
      define( this, 'index', index );
      define( this, 'widget', _widget, widget =>{
         if(_widget !== null) _ui.removeChild( $(_widget));
      } );

      if( widget )
        UI.addChild( widget, this );
    }
    function CHFlex( items, wrap = Wrapping.NoWrap, reverse = false){
        let 
        _ui = utils.CTag('horizontal','hflex-'+ flexCount,'layout'),
        _wrap,          
        _items = [],          
        _direction, 
        _space, 
        $this = _ui, 
        _reverse, 
        _justify, 
        _alignItems, 
        _alignContent;
        
        define( this, 'ui', _ui );
        define( this, 'items', _items );
        define( this, 'widgets', _items );
        define( this, 'DC', ()=>{return _ui; } );
        define( this, 'wrap', _wrap );
        define( this, 'justify', _justify );
        define( this, 'spacing', _space );
        define( this, 'alignment', _alignContent );
        define( this, 'reverse', _reverse , reverse =>{ 
          if(reverse) utils.Flag( $this,'reverse'); 
          else utils.Unflag( $this,'reverse'); 
        });

        ///////////// METHODS
        define( this, 'Add', widget => { 
          _widget.push( widget );
          this.AddItem(new CFlexItem(widget));
        });
        define( this, 'AddItem', item => {          
          item.parent = this;
          item.index  = _items.length;
          _items.push(item);
          UI.addChild( item, $this );
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

        flexCount++;
        
    };
    function CVFlex( items, wrap = Wrapping.NoWrap, reverse = false){
        let 
        _ui = utils.CTag('vertical','vflex-'+ flexCount,'layout'),
        _wrap,          
        _space,          
        _direction, 
        _reverse, 
        _justify, 
        _alignItems, 
        _alignContent;
        
        define( this, 'ui', _ui );
        define( this, 'DC', ()=>{return _ui; } );
        define( this, 'wrap', _wrap );
        define( this, 'justify', _justify );
        define( this, 'spacing', _space );
        define( this, 'alignment', _alignContent );
        define( this, 'reverse', _reverse , reverse =>{ console.log('CHFlex::revese -> changed', reverse ? 'True': 'False'); } );
        
        ///////////// METHODS
        define( this, 'Add', widget => {});
        define( this, 'AddItem', item => {});
        define( this, 'Remove', item => {});
        define( this, 'RemoveAt', index => {});
        define( this, 'Swap', (index, item) => {});
        define( this, 'Insert', (index, item) => {

        });
        flexCount++;
    };
    
    function CGridLayout( direction = 'horizontal'){

    };
/* @test:
    let hlt = new CHFlex( items );
    /////// Methods
    hlt.Add( widget );
    hlt.AddItem( lti );
    hlt.Insert( index, item);
    hlt.Swap( index, item);
    hlt.Remove( index, item);

    hlt.wrap        = Wrapping.WrapReverse;
    hlt.reverse     = true;
    hlt.alignment   = 'center';
    hlt.justify     = Justify.Between;
    hlt.spacing     = Spacing.SpaceAround;

    let lt = new CVFlex();
    let rowAct = new CAction('open',icons.Get('file-open'))
    lt.Add( item_open )

 */
    /// controls.
    let exports = {
      AlignContent,
      Justify,
      Wrapping,
      Direction,
      CHFlex, 
      CVFlex,
      CGridLayout}; 
    return exports;
});

/// Wireframing | Flow | Coding | Design | Execution | 
///////////// Modules, Actions, Layouts //////////////////////