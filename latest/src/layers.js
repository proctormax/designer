let layers = core.plugin("layers",{
    about:"layers is the control manager of all the layers within the app",
    version:"1.0.0",
    requires:{
      "utils":"v1.0.0",
      "events":"v1.0.0",
      "UI":"v1.0.0"
    },
    extends:{
        panels:[
            {panel:"layouts", layout:"layoutsctl"}
        ],
        layouts:[
            {layout:'layouts', type:'CVFlex', items:[
                {item:'CFrame', width:500, height:20}
            ]}
        ]
    }},(function( ){

        let define = utils.def;
        //let events;
        //let utils;
        //let commands;
        let LAYER_COUNT;
        let frame;
        let list;
        let view;
        let opacityLabel;
        let headlets;
        let _root;
        let header;

    const Remove = widget =>{        
       let index = list.indexOf(widget);
       if( index > -1){
          list.splice(index, 1);
       }
    };

    const init = ( ...includes)=>{
         console.warn("######### initializing LAYERS ############");
        //UI = UI;    
        //utils = utils;    
        //events = events;    
        //define = utils.def;
        //commands = {"select %layer%": "command.select"};
        LAYER_COUNT = 1;
        frame = new UI.CFrame(0,0,250,'auto','stroked font-sm');
        list = [];
        view = new UI.CListView();
        opacityLabel = UI.CText('Opacity:');
        headlets = [];
        _root;
        headlets.push( opacityLabel );
        
        let header = new UI.CHFlex(headlets);
        //utils.AddChild(header, frame);
        utils.AddChild(view, frame);
    
        utils.Flag(utils.GetTag(header), 'fill-light text-white padded');

        view.layout.reverse = true;
        
        console.log(view.ui.children);

    };

    const main = ( args = null )=>{};
    const quit = ( args = null )=>{};

    const Add = (widget, parentLayer=_root) =>{
        LAYER_COUNT++;
        let layer = new CLayer(widget,utils.GetTag(widget).id,`(${widget.constructor.name})`);
        view.Add( layer );
        //
        
    };
    
    // addLayer( parent, type, icon, name, locked, )
    // layer.SetParent( parent )
    // layer.SetIcon( icon )
    // layer.SetGrouped( bool )
    // layer.SetType( group )
    // layer.SetText( group )
    // layer.SetIndex( layerIndex )
    // layer.SetContent( content )
    // layer.SetEffects( effects )
    // layer.Add( layer )
    // layer.Remove( layer )
    // layer.Contains( layer )
    // layer.Contains( layer )
    function CLayer( widget, name,type = 'HTML'){
        UI.CFrame.apply(this,[0,'unset','auto','auto','ui-layer padded stroked-b']);
        let visible = true;
        
        let layerNameLabel = UI.CText(name,'padded-xss','span');
        let layerTypeLabel = UI.CText(type,'padded-xs');
        let lyrColIcon = new UI.CFrame('19%','19%',5,5,'stroked fillet-round absolute stroked-2 stroke-accent');
        let act_collapseLayer= new UI.CFrame(0,0,20,16,'relative oflow-hide sz-contraint');
        
        utils.AddChild(lyrColIcon, act_collapseLayer);
        
        let lyrVisIcon = new UI.CFrame('19%','19%',5,5,'stroked fillet-round absolute stroked-2 stroke-primary fill-light');
        let act_hideLayer= new UI.CFrame('unset','unset',20,16,'oflow-hide  sz-contraint');

        utils.AddChild(lyrVisIcon, act_hideLayer);

        events.on('click', act_hideLayer, e=>{
            utils.ToggleFlag( lyrVisIcon.DC(), 'layer-hidden' );
            utils.ToggleFlag( utils.getTag(widget), 'hidden' );
        });
        
        let lt_layerItem = new UI.CHFlex([
            act_hideLayer,
            layerNameLabel, 
            // act_collapseLayer, 
            //layerTypeLabel
        ]);

        let layer = new UI.CFrame('unset','unset','auto','auto','ui-layer');
        utils.AddChild( lyrVisIcon, act_hideLayer);
        utils.AddChild( lt_layerItem, this);
        //utils.AddChild(  layer);
        lt_layerItem.alignment = "flex-end";
        events.on('click', layerNameLabel, e=>{
            events.emit('layer-selected', {layer, layerName: name, widget});
            //console.log('layer selected => name:',name, 'type:', type, 'visible:', visible );
        });
        
    }
    // let subIcon,groupIcon,itemIcon,itemText;
    // lockIcon, showIcon, fxIcon;
    // command.MoveLayerUp(index)
    // command.MoveLayerDown(index)
    // command.SelectLayer(index)
    // command.UnSelectLayer(index)
    // command.HideLayer(index)
    // command.UnHideLayer(index)
    // command.UnHideAllLayers()
    // command.UnHideAllLayers()
    // command.GroupSelectedLayers()
    // command.UnGroupSelectedLayers()
    // command.UnGroupSelectedLayers()
    // command.register('clipboard.copy',{src:object})
    // command.register('clipboard.cut',{data:object})
    // command.register('clipboard.paste',{data:object})
    // command.register('clipboard.paste_special',{data:object})
    // command.register('history.undo',{action:string, step:"number"})
    // core.command.register('history.redo',{action:string, step:"number"})
    // service={actions,commands,events,panels,layouts,icons,scripts,menus,widgets,states}
    // codeit . | drawit | spreadsit | writeit | showit | moveit | designit
    // clipboard.action(34.4)
    // actions.trigger(234.340)[module|action|state]
    // [A340234234] 
    let A3434,A9083,E34343,E343898,S343434, I343434;
    // actions [A]
    function CHTMLLayer(widget, name ='layer' ){
        CLayer.apply(this,[widget,name, 'HTML']);
        this.Render = function(){

        };
    }
    function CPixLayer(widget, name ='layer' ){
        CLayer.apply(this,[widget,name, 'Pix']);
        this.Render = function(){

        };
    }
    function CSVGLayer(widget, name ='layer' ){
        CLayer.apply(this,[widget,name, 'SVG']);
        this.Render = function(){

        };
    }
    function CWGLLayer(widget, name ='layer' ){
        CLayer.apply(this,[widget,name, 'WGL']);
        this.Render = function(){

        };
    }
    // layers.AddGroup
    // layers.AddItem
    // layers.AddDOMLayer
    // layers.AddSVGLayer
    // layers.AddPixelLayer
    // layers.ExpandGroup
    // layers.SetLayerVisible(index, visible);
    // layers.MoveLayerUp(index, steps);
    // layers.MoveLayerDown(index, steps);
    // layers.AddLayerGroup(visible,group, )
    // layers.command.select_layer
    // layers.command.select_layer
    // colors.commands.Run('convert rgb hsl')
    // layers.commands.RegisterCommand('/select\-layer \d+', params => layers.SetLayerActive(params[0]))
    // layers.commands.RegisterCommand('/select\-index \d+', params => layers.SetLayerActive(params[0]))
    // layers.events.emit('layer-selected',{layer});
    // layers.actions.RegisterAction({action:'clearSelection', icon:':icn-action-clear', command:'layers.clear'});
    // ls layer | 
    return {init,main,quit,Add,Remove};
}));