console.log('----------------------------- AppMain -------------------------------');
let App = core.plugin("AppMain",{
  version:'1.0.0'
},function(){
  let app = {};
  let header, content, statusbar, board;
  let statusText, statusLabel, mouse, toolsbox, selectionText;
  let box, boxCount;
  
  let GetTag = utils.GetTag;
  let CTag= utils.CTag;
  let tools, act_label, act_frame, act_tag;
  let addChild, CText, CTextEdit, CSlider;
  let toolsboxActions, currentTool, statusTips;
  
  let selectedItem = null;
  let _stage, _selection;
  let xshell;
  let docTabs;
  
  function initAll( ...includes ){
    //core.Start();
    toolsboxActions = [];
    mouse = {old:{x:0,y:0}, pos:{x:0, y:0},delta:{x:0,y:0}, isDown:false, rect:{} };
    //events    = core.GetService("events");
    console.warn('-------------------------- @Service: events', Object.keys(events));
  
    console.log('-------------------------- @Service:LAYOUTS');
    signals   = signals(GetTag,utils);
    //layouts   = core.GetService("layouts");
    console.warn(":::::::::::::::::::::::::::::: layouts >",layouts);
    //layouts   = layouts( utils, UI, events);
    console.log('-------------------------- @Window:LAYERS');
    //layers    = layers( utils, UI, events);
    addChild  = UI.addChild;
    CText     = UI.CText;
    CTextEdit = UI.CTextEdit;
    CSlider   = UI.CSlider;
    Geom      = Geom(CMath,CCSS(),utils);
    styles    = styles(GetTag);
    transform = transform(GetTag);
    effects   = effects(GetTag);
    colors    = colors(GetTag);
    
    if(core && core.IsRunning('xshell')){
      xshell = core.GetService('xshell');
        
        //xshell     = xshell();
    }
    fills     = fills(GetTag);
    strokes   = strokes(GetTag);
    gradients = gradients(GetTag);
    corners   = corners(GetTag);
    paddings  = paddings(GetTag);
    margins   = margins(GetTag);
    typography= typography(GetTag);
    fonts     = fonts(GetTag);
  
    board     = GetTag("body");
    header    = GetTag("#header");
    content   = GetTag("#viewport");
    docTabs   = GetTag("#docs");
  
    statusbar   = GetTag("#statusBar");
    statusTips  = GetTag("#statusBar #statusTips");
    statusLabel = CText("status","green");
    statusText  = GetTag("#statusText");
    selectionText  = GetTag("#selectionText");
    box       = CTag('box');
    boxCount  = 1;
    /* 
      sandbox.resources.icons
      sandbox.resources.fonts
      sandbox.resources.images
      sandbox.resources.themes
      sandbox.panels.Get('layers');
      sandbox.layouts.Get('layers');
    
    */
   initDynamics();
    // initGroups({toggles:null, optionals:null});
    // init_toggles();
    // init_optionalLists();
    
    // let toggle_list = $('.toggle-list', true);
    // let opts_lists   = $('.optional-list', true);
    // let action_lists= $('.cation', true); actLists, optLists, radioLists
    initCommands();
    initSelection();
    initStage();
    initLayers();
    initLayouts();
    initStyles();
    initEvents();
    initToolsbox();
    parseSlider( GetTag("#shearCombo"));
    initActions(GetTag("#wnd_assets .caction", true));
    initDropZones(GetTag("#wnd_assets .cpane-content", true));
    GetTag('.ui-combo',true).forEach( combo => initComboBox(combo));
    statusTips.contentEditable = true;
    events.on('keydown', statusTips, e=>{
      if( e.keyCode == 13 ){
        e.preventDefault();
        setToolTips( currentTool, e.target.textContent );      
      }
    })
    ///////////////////////////////////////////
    initDocTabs();
  }
  
  
  const newDoc = filename =>{
    let tabText = utils.CTag('ctab',null,'span');
    tabText.textContent = filename;
    let tabItem = utils.CTag(null,null,'item');
    addChild(tabText,tabItem);
    addChild(tabItem,docTabs.children[0]);
    
  }
  const initDocTabs = ()=>{
    newDoc('home.txt');
    newDoc('contact-us.html');
    newDoc('services.html');
    newDoc('store.html');
  }
  
  
  const initDynamics = ()=>{
  
    utils.Flag(GetTag("#menubar"),'stroked-t stroke-accent');
    let tabs_menus    = new UI.CToggleGroup(GetTag("#menubar > div", true),  {
      always:{flag:'padded'},
      //default:  {flag:'stroked-t',   on:'change',  clears:"activated"},
      activated:{flag:'fill-accent text-white', on:'click',  clear:'*'}    
    });
    let tabs_dialog   = new UI.CToggleGroup(GetTag("#dialog > #tabs > .inline", true),  {
      always:  {flag:'stroked-t cursor-default'},
      activated:{flag:'text-white stroke-accent fill-light-', on:'click',  clear:'*'}    
    });
    let tabs  = new UI.CToggleGroup(GetTag(".ui-tabbar > item", true),  {
      always:  {flag:'stroked-l stroke-transparent'},
      activated:{flag:'active', on:'click',  clear:'*', callback: e =>{ }}    
    });
    let toggles  = new UI.CToggleGroup(GetTag(".ui-togglebar > item", true),  {
      always:  {flag:'spaced-rs stroked sz-contraint padded-xss'},
      activated:{flag:'active dash-stroked_primary', on:'click',clear:"*", callback: e =>{ /* utils.ToggleFlag( e.item, 'active'); */}}    
    });
  
    let assets_cats   = new UI.CToggleGroup(GetTag("#dialog .clist > *", true),  {
      always:   {state:'always', flag:'strokeds-b cursor-default select-none'},
      default:  {state:'default',  on:'mouseout',  flag:'fill-none',             clear:"hovered", not:"activated"},
      //hovered:  {state:'hovered',  on:'mouseover', flag:'fill-light',            clear:'*',       not:"activated"},
      activated:{state:'activated',on:'click',     flag:'active fill-dark', clear:'*', callback: asset_cats_selected }    
    });
    
    let assets_pages  = new UI.CToggleGroup(GetTag("#wnd_assets .cpane-header", true),  {
      always:  {flag:"cursor-default stroke-none", callback: e=>{ utils.Flag(e.item.parentNode.children[1],'text-primary'); } },
      //default:  {flag:'fill-none',   on:'change',  clears:"activated"},
      activated:{flag:'expanded', on:'click',  clear:'*', callback: e=>{ utils.ToggleFlag(e.item.parentNode,e.flag); }}    
    });
  
    let assets_actions  = new UI.CToggleGroup(GetTag("#wnd_assets .caction", true),  {
      always:  {flag:'cursor-default stroked'},
      //default:  {flag:'fill-none',   on:'change',  clears:"activated"},
      activated:{flag:'active', on:'click',  clear:'*', callback: e=>{ console.log("action: ", e.item.textContent); }}    
    });
  
    let state_hovered = {state:'hovered',on:'mouseover', flag:'fill-light',     callback:"itemHovered", clear:'*', }; 
    let state_pressed = {state:'pressed',on:'mousedown', flag:'fill-dark stroked stroke-dark',   callback:"itemPressed", clear:'*', }; 
    let state_clicked = {state:'clicked',on:'click',     flag:'fill-default',       callback:"itemClicked", clear:'*', }; 
  
    let toolsboxStates = new UI.CToggleGroup(GetTag("#toolsbox .caction", true), {
      activated:{flag:'active',   on:'click',  clear:'*', callback: actionToggled}, 
      disabled: {flag:'disabled', on:'kk', clear:'*'}
    }); 
    // tg_displays; tg_tools; tg_cssDisplay, tg_menus
    let tabs_display  = new UI.CToggleGroup(GetTag("#css_display > div ", true), {
      activated:{flag:'highlight',   on:'click',  clear:'*'}, 
      disabled: {flag:'disabled', on:'change', clear:'*'}
    }); 
  };
  
  
  const initCommands = ()=>{
     commands.RegisterCommand('select', item => { console.log('selecting item', item);});
     commands.Exec('poly3dSphere -r -t 5 -sx 20 -sy 40 -ax 0 1 1 -cuv -3 -ch 4 -perspective5 0.0 -rotation 0.44');
     let cmd = {
       name: "select",
       syntax: /select\s+\w*.+:/, // select box4
       argc: 4, // select box4
       opts:[{t:/\-\t\s+\d+/}], // {t:{rx:-t %int %int %float, match:[]}, ax:{rx:/\-ax(\s\d+){3}/}}
     }
  };
  const initComboBox = combo =>{
    utils.ToggleFlag(combo.children[1],'hidden');
    //utils.Unlag(combo.children[1],'masked');
    events.on('click', combo.children[0], e=>{ utils.ToggleFlag(combo.children[1],'hidden'); });
  
  }
  const asset_cats_selected = e =>{
  
    let activeItem = e.item.parentNode.parentNode.children[0].children[0];
  
    activeItem.textContent = e.item.textContent;
  
    utils.ToggleFlag(e.item.parentNode,'hidden');
    //console.log( activeItem.textContent,'selected--------------' );
  }
  
  const actionToggled = e =>{
    currentTool = e.item;
    setSelectionText( e.item.textContent);
    setStatusTips( getToolTips(e.item).toString());
  }
  const setSelectionText = text =>{
    selectionText.textContent = text.toString();
  };
  const getSelectionText = text =>{
    return selectionText.textContent;
  };
  const setToolText = ( tool , text )=>{  
    selectionText.textContent = text.toString();
  }
  const getToolTips = ( tool )=>{
     return tool.getAttribute('tooltips') || "";
  };
  const setToolTips = ( tool , text )=>{
    // #Drag to create a new Ellipse shape, +#Shift to constrain proportions, +#Ctrl to create from center point, +#RightMouse to create along line, +#Alt to ignore snapping. #Click to select a shape to change the shape's parameter, +#Shift to toggle select.
    const rx = /\b#\w*/;
    const str = "";
    str.match(rx, e=>{
  
    });
    tool.setAttribute('tooltips', text.toString());
  }
  const setToolActive = ( tool, active=true )=>{
  
  };
  ////////////// LAYERS /////////////////////////////
  const initLayers = ()=>{
    layers.Add( _stage );
    addChild( layers.pane, GetTag('#layers > content'));
    events.on('layer-selected', e=>{
      console.log( 'layers.Selected',e.layerName );
      _selection.currentItem = e.widget;
      
      utils.ToggleFlag( GetTag(_selection.currentItem), 'selected');
    });
  };
  const AddLayer = ( widget, parent )=>{
    layers.Add( widget, parent );
    addChild( widget, parent );
  }
  
  ////////////// SELECTION //////////////////////////
  const cb_selection_current_items = () =>{
    return _selection.selectedItems();
  };
  function initSelection(){
    _selection = {};
    _selection.items = [];
    _selection.currentItem = null;
    _selection.selectedItems = ()=>{return [];};
  }
  const _makeSelectable = (item, selectable = true)=>{
    if( selectable ){
      //events.on('click', item, itemSelected );
      // layers.select( item.modelIndex )
    }
    else{
      
    }
  }
  const itemSelected = e=>{
    if(e.ctrlKey){
      // mutiselecting...
      console.log('multi-selected:', e.target.id );
    }else{
      _selection.currentItem = e.target;
      console.log('single-selected:', e.target.id );
      // clear previous selection and select new...
    }
      
  }
  const cb_toggle_layout_direction = (lt, direction)=>{
    //let lt_dir = e.target.textContent; e.target.textContent;
    utils.SwitchFlags(lt,'horizontal','vertical');
  };
  function initStage(){
    _stage  = GetTag('#stage');
    utils.Flag(_stage,'size-VGA align-hc');
  }
  ///////////// LAYOUTS /////////////////////////////
  function initLayouts(){
  
    let lt = GetTag("layout.ui-togglebar");
    let act_lt_v = GetTag("#act_layout_column");
    let act_lt_h = GetTag("#act_layout_row");
    let act_lt_t = GetTag("#act_layout_toggle");
  
    events.on('click',act_lt_t, e=>{ utils.ToggleFlag(e.target,'active'); cb_toggle_layout_direction(lt); });
    events.on('click',act_lt_v, e=>{ utils.SwitchFlags(lt,'horizontal','vertical');});
    events.on('click',act_lt_h, e=>{ cb_layout_create_row( cb_selection_current_items(), _stage);});
  
    
    let index = 0, item1, item2, item3, item4, item5, items = [], lti;
    item1 = UI.CText('first');
    item2 = UI.CText('second');
    item3 = UI.CText('third');
    item4 = UI.CText('fourth');
    item5 = UI.CText('fifth');
    let _colors = [
      new UI.CFrame(0,0,15,15,'stroked stroke-light absolute fill-light'),
      new UI.CFrame(0,0,15,15,'stroked stroke-light absolute fill-base'),
      new UI.CFrame(0,0,15,15,'stroked stroke-light absolute fill-light'),
      new UI.CFrame(0,0,15,15,'stroked stroke-light absolute fill-dark'),
      new UI.CFrame(0,0,15,15,'stroked stroke-light absolute fill-base'),
      new UI.CFrame(0,0,15,15,'stroked stroke-light absolute fill-dark'),
      new UI.CFrame(0,0,15,15,'stroked stroke-light absolute fill-light'),
      new UI.CFrame(0,0,15,15,'stroked stroke-light absolute fill-base'),
      new UI.CFrame(0,0,15,15,'stroked stroke-light absolute fill-dark'),
      new UI.CFrame(0,0,15,15,'stroked stroke-light absolute fill-primary'),
      new UI.CFrame(0,0,15,15,'stroked stroke-light absolute fill-accent')
    ]
    lti = new layouts.CFlexItem( item1 );
    items.push(item4, item2, item3);
    
    let hlt = new layouts.CHFlex( items );
    let vlt = new layouts.CHFlex( null);
    /////// Methods
    hlt.Add( item5 );
    hlt.AddItem( lti );
    hlt.Insert( index, item3);
    hlt.Swap( index, item3);
    hlt.Remove( index, item3);
  
    hlt.wrap        = layouts.FlexWrap.WrapReverse;
    vlt.reverse     = true;
    hlt.justify     = layouts.FlexJustify.SpaceBetween;
    hlt.reverse     = true;
  
    //AddLayer(hlt, _stage);
    
    _colors.forEach( (act, index) =>{
      transform.translate(GetTag(act), index%2== 0? 0 : 20, index * 20);
      _makeSelectable(act,true);
      events.on('click', act , e=>{ 
        
        let fill = getComputedStyle( GetTag(act) )['backgroundColor'];
        console.log('color =>',fill);
        GetTag('body').style.backgroundColor = fill; 
      },true);
      AddLayer(act, _stage);
    })
  
    let lv = new UI.CListView(_colors);
    // layers.create()
    //AddLayer(lv, _stage);
    console.log(lv.items);
  
  }
  
  const cb_layout_create_column = (items,flag, parent=null, id='group') =>{
    let lt = CTag('horizontal',null,'layout');
    items.forEach(item =>{
      let li = CTag('relative', id,'item');
      addChild(item, li);
      addChild(li, lt);    
    });
    if( parent )
       addChild(lt, parent);
    return lt;
  };
  const cb_layout_create_row = (items, parent=null, id='group') =>{
    let lt = CTag('vertical',null,'layout');
    items.forEach(item =>{
      let li = CTag('relative', id,'item');
      addChild(item, li);
      addChild(li, lt);    
    });
    if( parent )
       addChild(lt, parent);
    return lt;
  };
  
  //////////// TOOLBOX //////////////////////////////
  function initToolsbox( t=false){
    
    let acts = GetTag("#toolsbox .caction", true);
  
    if(acts.length > 0 )
    acts.forEach( act =>{
        if( act.classList.contains('active')){
          currentTool = act;
          setSelectionText(act.textContent);
        }      
    });
  
     console.log("no acts found", acts);
  }
  function initStyles(){
  
      //fills.solid( board, "grey");
  
      // content
      //styles.fill( content, "#333");
      transform.type( content, "relative");
  
      // statusbar
      //styles.padding( statusLabel, 4, 'pt');
  
  
      //fills.solid(box, "#5559");
     /*  strokes.lineWidth(box, 1);
      strokes.solidBottom(box,"black");
      corners.top( box, 5);
      corners.bottom( box, 0);
  
      let boxShape = CTag('action','rectShape','button');
      let boxLabel = CText("box");
      addChild(boxLabel, boxShape);
      addChild(boxShape, box);
      corners.all(boxShape, 4);
      paddings.vertical(boxShape, 1,'pt');
      paddings.horizontal(boxShape, 6,'pt');
  
      strokes.none(boxShape);
      fills.solid(boxShape,"#2228");
      strokes.lineWidth(boxShape,1);
      strokes.solidTop(boxShape,"#222");
  
      fonts.size(box, 3);
      fonts.family(boxLabel, "arial, sans-serif");
      fonts.style(boxLabel, "bold italic");
      fonts.color(boxLabel, colors.rgb(20,200,30)); */
  
  
      //gradients.fill(box,'linear',["red","green","blue","purple"]);
      //gradients.stroke(box,'linear',["red","green","blue","purple"]);
      //events.on('click', boxShape, addBoxToContent );
  
  
  }
  function initEvents(){
  
      events.on('mousemove', _stage, mouseMove);
      events.on('mousedown', _stage, boardPressed);
      events.on('mouseup',   _stage, boardReleased);
      events.on('keydown',   selectionText, e =>{
        switch (e.keyCode) {
          case 13: // Key_Enter
          case 27: // Key_Escape
            e.preventDefault();
            currentTool.children[1].textContent = selectionText.textContent;
            selectionText.blur();
            break;
          default:
  
        }
        //console.log( e.keyCode );
      });
      // NumberEdit, TextEdit, EmailEdit, TypeEdit
      setStatusText("--------");
  }
  
  
  const parseSlider = ( combo, parent)=>{
    let dropdown = combo.children[1];
    let slider = combo.children[1];
    console.log( slider, slider.parentNode );
  };
  const setStatusText = text =>{
    statusText.textContent = text.toString();
  }
  const setStatusTips = text =>{
    statusTips.innerHTML = text.toString();
  }
  const addBoxToContent = e=>{
    var shape = CTag('box','box'+boxCount);
    addChild( shape, content );
    transform.type(shape,"absolute");
    boxCount++;
    transform.resize(shape,100,100);
    transform.translate(shape,100,100);
    fills.solid(shape,"red");
    events.on( "click", shape, selectShape );
  }
  const selectShape = e =>{
    _selection.currentItem = e.target;
  }
  const mouseMove = e =>{
    if( e.buttons ){
      let dx = mouse.old.x - e.clientX;
      let dy = mouse.old.y - e.clientY;
      mouse.delta.x = Math.sqrt(dx*dx);
      mouse.delta.y = Math.sqrt(dy*dy);
      statusText.textContent = `mouse.delta[x:${ mouse.delta.x}, y:${ mouse.delta.y}]`;
      if( _selection.currentItem != null ){
        transform.translate(  _selection.currentItem, mouse.old.x, mouse.old.y );
        transform.width(  _selection.currentItem, mouse.delta.x );
        transform.height( _selection.currentItem, mouse.delta.y );
      }
      if(selectedItem !== null)
        events.emit('drag-move',{target: selectedItem, dx,dy, x: e.clientX, y:e.clientY }); // dataX, dataY, screenX, screenY, zoneX, zoneY
    }else
      statusText.textContent = `mouse( ${e.clientX}, ${e.clientY} )`;
  }
  const boardPressed = e =>{
    mouse.isDown = true;
    mouse.old.x = e.clientX;
    mouse.old.y = e.clientY;
  };
  const boardReleased = e =>{
    mouse.isDown = false;
    mouse.pos.x = e.clientX;
    mouse.pos.y = e.clientY;
  };
  /**
   * dragging:
   * - direction: out-in, in-out
   * - drop-type: inner-drop, 
   * - internal-drag:[started,cancelled,dropped]
   * - external-drag:[entered,exited,dropped]
   * - item: item-selected, internal-item-selected
   * - zone: zone-entered, drag-started, drag-ended, drag-exited, dropped
   * @example
   * 
   * let zone = new CDropZone( target, 'rw');
   * 
   * zone.onDropEvent( e=>{
   *  if( e.metaData() == 'CWidget' ){
   *    
   * }
   * } );
   * 
   */
  function test_drag_n_drop() {
    let states = [];
    states.push({name:"default", flag:"stroke-dark", onEnter:cb_02, onExit: cb_03});
    states.push({name:"pressed", flag:"fill-dark", onEnter:cb_02, onExit: cb_03});
    states.push({name:"released", flag:"fill-light", onEnter:cb_02, onExit: cb_03});
    states.push({name:"drag-start", flag:"fill-light", onEnter:cb_02, onExit: cb_03});
    states.push({name:"dragging", flag:"fill-light", onEnter:cb_02, onExit: cb_03});
    states.push({name:"drag-exit", flag:"fill-light", next:"default", onEnter:cb_02, onExit: cb_03});
    states.push({name:"dropped", flag:"fill-light", onEnter:cb_02, onExit: cb_03});
    let dropZone = new UI.CFrame(130,   230, 250, 300, 'stroked stroke-solid stroke-light absolute ');
    let dropZone2 = new UI.CFrame(385,  230, 250, 300, 'stroked stroke-solid stroke-light absolute ');
    let item1 = new UI.CFrame(130, 188, 50, 30,   'stroked stroke-light absolute ');
    let item2 = new UI.CFrame(200, 188, 50, 30,   'stroked stroke-light absolute ');
  
    let state = {name:"pressed", target: dropZone, enter: cb_state_enter, exit: cb_state_exit, on: "mousedown", off:"cancelled", flag:"fill-light", delay:0, exitTrigger:"mouseup", triggers:['mouseup','ctrl+4'] }
  
    dropZone.ui.style.minHeight = 
    dropZone2.ui.style.minHeight = '20px';
    dropZone.ui.style.height = 
    dropZone2.ui.style.height = 'auto';
    /**
     * 
     * state:
     * - name     : String -> name of the state
     * - target   : Object -> An owner of the state
     * - triggers : StringList -> A list of triggers for this state. Example includes events, states and flows.
     * - needs    : Array -> An array containing a list of states that's required for this state to run.
     * - exitTriggers: [ {state:'click', blues:''}, {keys:'ctrl+k'}, {key: 'a', code: 43, pressed: false}]
     * action.triggers
     * 
     * CDraggable = {dragMode:[dragData,dragContent,dragChild,dragSelf]}
     * DropType
     * draggable(item,dragMode, dropMode) // draggable.dropType = (dropSelf|dropCopy|dropLink);
     * events.on('draggable-dropped',draggable)
     * @Actions
     */
     let act_hide = {action:"hideSelection", instances:["readonly"], icon:"icn_hideselection", handler: "cb_hideselection", requires:['item-selected'], triggers:[{keys:'ctrl+alt+h'}, {event:'pressed'}], tip:'hide current selection',listeners:[]};
     act_hide.instances = [];
     
    // hoverState , dragStartState, draggingState, dropZoneEnterState, dropZoneExitState, dragContent, selectionDrag, se
    // li.icon, li.text, li.id, li.index, li.shortcut, li.enterCallback, li.exitCallback, li.triggers, li.states
    // state-canvas-idle | state-canvas-dragging | state
    let drawing_states = {
      name:"drawing",
      flow:["toolsbox.selected","canvas.pressed","canvas.move"]
    }
    
    AddLayer(item1, _stage);
    AddLayer(item2, _stage);
    AddLayer(dropZone, _stage);
    AddLayer(dropZone2, _stage);
    
    utils.Flag(GetTag(dropZone.DC()),'icon-size-small pressed-stroke-dashed hovered-stroke-dotted');
    utils.Flag(GetTag(dropZone2.DC()),'icon-size-medium');
    
    // canvas.press, canvas.move, canvas.release,
    // stateFlow = [pressState, moveState ]
    // dragging = [pressedL, moves]
    // panning = [pressedR, moves]
    // create_shape = [shape_selected, canvas_dragged]
    // shape_resize = [shape_selected, canvas_dragging]
    // dragging.needs:[press,move]
    // item-selected > drag-started > drag-moved > drag-drop
    // core.windows.CreateWindow( title, content );
    // core.windows.CreatePanel( title, content );
    // core.panels.CreatePanel( title, content );
    // core.views.CreateView( w,h, content );
    // core.views.CreateView( w,h, content );
    state.needs = ['canvas-dragging',''];
    
    initDropZone(dropZone);
    initDropZone(dropZone2);
    initDraggable(item1);
    initDraggable(item2);
  
    events.on('mouseup', content, clearSelection);
    signals.on(content,'clicked', box, 'SetVisible', true );
    //content.clicked.Tell( box, 'SetVisible', true );
    //content.clicked.Remove( box, 'SetVisible', true );
    // content.clicked.tell( callback )
    // content.clicked.tell( object, callback )
    // content.clicked.tell( object, callback, params )
  
    events.on('drag-start',  drag_started);
    events.on('drag-drop', drag_droped);
    events.on('drag-enter', e=>{ setStatusTips('drag entered');});
    events.on('drag-over', e=>{ setStatusTips('dragging over');});
    events.on('drag-leave', e=>{ setStatusTips('dragging left');});
    events.on('child-pressed', e=>{ 
      utils.SwitchFlags(GetTag(e.target),'stroke-accent','stroke-dark');
      setStatusTips('child pressed');
    });
    events.on('drag-move', e=>{ 
      //utils.SwitchFlags($(e.target),'stroke-accent','stroke-dark');
      //setStatusTips('child pressed');  
      
      setStatusTips('dragging...now');
     
    });
  
    utils.SetAttrib(item1,'disabled',true);
    //Geom.SetDraggable(1, item1);
  }
  
  const clearSelection = e => {
    selectedItem = null;
    setStatusTips('Select an item in the canvas.');
  }
  const stage_item_selected = e => {
    
  }
  const stage_item_deselected = e => {
  
  }
  
  //// DropZone ///////////// zoneX,zoneY, itemX,itemY
  const dropZone_entered = e =>{
    if( e.buttons && selectedItem !== null ){
      utils.SwitchFlags(GetTag(e.target),'stroke-solid','stroke-dashed');  
      events.emit('drag-enter',{target:e.target, data:selectedItem, zoneX:e.clientX, zoneY:e.clientY});    
      //events.on('mouseup', e.target, dropZone_released );
    }
  };
  const dropZone_pressed = e =>{
    if( e.buttons && selectedItem !== null ){
      events.emit('child-pressed',{target:e.target, data:selectedItem, zoneX:e.clientX, zoneY:e.clientY});        
    }else{
      events.emit('zone-pressed',{target:e.target, data:selectedItem, zoneX:e.clientX, zoneY:e.clientY});        
      
      utils.ToggleFlag(GetTag(e.target),'fill-base');  
    }
  };
  const dropZone_moved = e =>{
    if( selectedItem !== null ){  
      //utils.SwitchFlags(e.target,'stroke-dark stroke-dashed','stroke-accent stroke-solid');  
      events.emit('drag-over',{target:e.target, data: selectedItem, dropZone:e.target, x:e.clientX, y:e.clientY});
    }
  };
  const dropZone_released = e =>{
    if( selectedItem !== null ){  
      //utils.SwitchFlags(e.target,'stroke-dark stroke-dashed','stroke-accent stroke-solid');  
       let dropMode = e.altKey ? "copy" : e.ctrlKey ? "link" : "move";
      events.emit('drag-drop',{target:e.target, data: selectedItem, dropZone:e.target, x:e.clientX, y:e.clientY, dropMode});
    }
  };
  const dropZone_out = e =>{
    if( e.buttons && selectedItem !== null ){
      utils.SwitchFlags(e.target,'stroke-dashed','stroke-solid');  
      events.emit('drag-leave',{target:e.target, buttons:e.buttons});    
      events.on('mouseup', e.target, dropZone_released );
    }
  };
  ////// DRAGGABLE
  const item_pressed = e =>{
    if(e.target.getAttribute('disabled')) return;
    //utils.SwitchFlags(e.target,'stroke-accent','stroke-dark');
    
    selectedItem = {ui:e.target, old:{x:e.clientX, y:e.clientY}};
    events.emit('drag-pressed',{target: e.target, x:e.clientX, y:e.clientY, focus:e.currentTarget, event:e});
    utils.SetCursor(e.target,'move');
    setStatusTips('item selected');
  };
  
  const item_released = e =>{
    utils.SwitchFlags(e.target,'stroke-dark','stroke-accent');
    events.emit('drag-released',{target:e.target, pos:{x:e.clientX, y:e.clientY}, old:selectedItem.old});
    selectedItem = null;
  };
  
  /// DRAGGING: item | zone
  const drag_initiated = e =>{
    //utils.SwitchFlags(e.target,'fillet','stroke-accent');
    utils.SetAttrib( e.target, 'pressed', true);
    events.on('drag-released', drag_canceled);
    events.on('drag-moved',  drag_moved);
  };
  const drag_started = e =>{
    //utils.SwitchFlags(e.target,'fillet','stroke-accent');
  };
  const drag_canceled = e =>{
    //utils.SwitchFlags(content,'fillet','stroke-accent');
    if( selectedItem !== null )
    console.log('dragging-canceled');
  };
  const drag_moved = e =>{
    //utils.SwitchFlags(e.target,'fillet','stroke-accent');
    setStatusTips('item-dragging...');
  };
  const drag_droped = e =>{
    
    let item = GetTag(e.data);
    // copy_drop
    // utils.toLocal(target, parent)
    // utils.toGlobal(target, parent)
    if(item.parentNode !== e.target ){
      //utils.SwitchFlags(e.target,'stroke-accent','stroke-dark');
      // item.dragMode = DragMode.MoveDragged
  
      let li = utils.CTag('caction stroked fillet-none', null, GetTag(e.data).tagName);
      //addChild(e.data, li);
      li.innerHTML = GetTag(item).outerHTML;
      addChild(li, e.dropZone);
      initDraggable(li);
      //console.log("li.outerHTML =--->",li.outerHTML);
      //console.log("item.outerHTML =--->",item.outerHTML);
    }else{
  
    }
    setStatusTips('data dropped', e.data.focus);
    // li.style.left = (e.x - mouse.old.x)+'px';
    // li.style.top = (e.y - mouse.old.y)+'px';
    // zoneX, zoneY, itemX, itemY
  
  };
  
  const cb_state_enter = e => {
  
  };
  const cb_state_exit = e => {
  
  };
  const cb_02 = e => {};
  const cb_03 = e => {};
  
  const initDropZone = ( zone, dropMode, zoneType=2 )=>{
   /// zone.type = (ReadOnly|WriteOnly|ReadWrite)
   /// zone.drapMode = (copy|link|move|Data)
    events.on('mousedown',  zone, dropZone_pressed );
    events.on('mouseup',    zone, dropZone_released );
    events.on('mouseover',  zone, dropZone_entered );
    events.on('mousemove',  zone, dropZone_moved );
    events.on('mouseout',   zone, dropZone_out );
    // child-drag-started
    // child-drag-leave
    // child-drag-
  };
  
  function initDraggable(item) {
    //Object.defineProperty(item,'DC',{get:()=>$(item)});
    
    events.on('mousedown', item, item_pressed);
    events.on('mouseup', item, item_released);
  }
  const initActions = acts => {
    acts.forEach(act => {
      initDraggable(act);
    });
  };
  const initDropZones = zones => {
    zones.forEach( dz => {
      initDropZone(dz);
    });
  };
  const setMouseRect = rect =>{
    transform.translate( mouse.widget, rect.x - mouse.delta.x, rect.y - mouse.delta.y );
    transform.resize( mouse.widget, rect.width, rect.height);
  }
  //////////////////////////////////////////////////
  function quit(){};
  function main(){
  
    initAll();  
    test_drag_n_drop();
    mouse.widget = new UI.CFrame(100,100,20,80,'absolute stroked stroke-dashed no-mouse stroke-accent');
    addChild(mouse.widget,GetTag("#guides"));
  
    events.on('drag-move',e=>{
      setMouseRect( e.target.ui.getBoundingClientRect() );
    });
    let list = `
    left top width height right bottom 
    margin-top margin-bottom margin-right margin-left 
    padding-top padding-bottom padding-right padding-left 
    border-top-left-radius border-top-right-radius border-bottom-left-radius border-bottom-right-radius
    border-left-width border-right-width border-top-width border-bottom-width
    `.split(/\s+/);
  
    events.on('drag-pressed',e=>{
      //setMouseRect( e.target.getBoundingClientRect() );
      let rules = getComputedStyle(e.target);
      for( let r in rules ){
        let val =  rules[r];
        if( val && val.toString().endsWith('px'))
          if( list.indexOf(r)>=0)
          console.log('---------------- >>>>>>>>>>>>>',r,':',rules[r]);
      }
    });
  }
  app.init = initAll;
  app.main = main;
  app.quit = quit;
  return app;
});

