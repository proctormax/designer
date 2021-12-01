core.plugin('xshell',{
  about:`xshell`,
  version:'1.0.0',
  requires:{
  },
  exports:{
      events:[
          {event:"sceneCreated", title:"Creates a new scene", params:[
              {param:'scene', type:'CScene', info:'The created scene'},
              {param:'type', type:'SceneType', info:'The type of scene created.'},
              {param:'width', type:'Number', info:'The width of the scene'},
              {param:'height', type:'Number', info:'The height of the scene'},
          ]},
          {event:"sceneDeleted", title:"Deletes the current scene", params:[
              {param:'', type:'', info:''},
              {param:'', type:'', info:''},
          ]},
          {event:"sceneSelected", title:"Select a scene", params:[
              {param:'', type:'', info:'', short:''},
              {param:'', type:'', info:'', short:''},
          ]},
      ],
      actions:{},
      commands:[
          {command:"Scenes.Create", title:"Creates a new scene of the specified type.", params:[
              {param:'name', type:'String', info:'Name of the scene to be created.', short:'-n'},
              {param:'type', type:'SceneType', info:'', short:''},
          ]},
          {command:"Scenes.Delete", title:"Deletes the current scene", params:[
              {param:'', type:'', info:'', short:''},
              {param:'', type:'', info:'', short:''},
          ]},
          {command:"Scenes.Select", title:"Select a scene", params:[
              {param:'', type:'', info:'', short:''},
              {param:'', type:'', info:'', short:''},
          ]},
      ],
  }}, (function(){

    let textCount = 1;
    let iCount = 0;
    let _selection;
    let _stage;
    let _layers = {};
    let _layerNames = {};
    //  moveEvents[uid]=[]
    
    let service;
    
    const def = (owner,prop, val, setter=null ) => {
      let o = {};
      o.get = ()=>val;
      if(typeof setter === 'function')
      o.set = setter;
      Object.defineProperty(owner, prop, o);
    }
    
    
    const InitShell = ()=>{
  
    }
  
    const Pattern = (cmd, rx )=>{
    if( !(cmd in patterns ))
      patterns[cmd] = [];
      
      patterns[cmd].push(rx);
    }
    function CShell(code = '', name = 'shell'){
        let _shellName = name;
        let _commands = {};
        let _vars = {};
        let _history = [];
        let _historyIndex = 0;
        let _ui = document.createElement('div');
        _ui.innerHTML = `
        <section id="terminal" uid="layer1" style="width: 200pt; height: 16px; overflow:hidden;  background-color: rgba(0, 16, 32, 0.4);  position: absolute; bottom: 0px;">
            <div id="console" uid="layer2" style=" position: absolute; height: auto; max-height: 100%; width:110%; overflow-y: auto; bottom: 0 !important; left: 0; ">
                <div id="line-numbers" style="position: relative; float: left; "></div>
                <div class="code-line output"></div>
                <div class="code-line prompt">
                    <span id="prompt_cmd"  style="color: rgb(17, 153, 221);">shell</span>
                    <span id="prompt_time" style="color: rgb(221, 221, 221);"></span>
                    <span id="prompt_sign" style=" color: rgb(221, 153, 17); font-weight: bold;">&gt;</span>
                    <span class="text-edit" contenteditable="true" spellcheck="false"></span>
                </div>
            </div>
            
            <style>
            .code-line > .text-edit{
              outline: none; color: rgb(17, 170, 119); width: 200px;
            }
            .code-line, #line-numbers > .number{
              font-size: 12px;
              font-family: segoe ui;
              border-top: solid 1px #9990; 
            }
            .code-line > cmd{
              color: #d44;
            }
            .code-line > flag{
              color: #d66;
            }
            .code-line > type{
              color: #69d;
            }
            .code-line >  .text-edit
            {
              padding-left: 3pt;
            }
            .code-line >  about
            {
              padding-left: 23pt;
            }
            .console > .prompt, .console > .output{
              float: left;
            }
            .code-line:hover:not(.prompt){
              background-color: #5555;
            }
            #line-numbers{
              color: #dd3;
              width: auto;
              border-right: solid 1px #444;
            }
            #line-numbers > .number{
              text-align: right;          
              margin: 0 4pt;
              user-select: none;
            }
    
            </style>
        </section>`;
        let numbers    = _ui.querySelector('#line-numbers');
        let terminal   = _ui.querySelector('#console');
        let output     = _ui.querySelector('.output');
        let outputs    = [];
        let prompt     = _ui.querySelector('.prompt');
        let promptCmd  = _ui.querySelector('#prompt_cmd');
        let promptTime = _ui.querySelector('#prompt_time');
        let promptSign = _ui.querySelector('#prompt_sign');
        let input      = _ui.querySelector('.prompt > .text-edit');
        // pattern(cmd, rgx )
        // for each cmd->rx.test
        
        
        
            
        const rx_Identifier = /\b[_a-zA-Z]+[_a-zA-Z0-9]*/;
        const rx_string_1 = /('.+?'|".+?"|`.+?`)/g;
        const rx_flag = /-[a-zA-Z]+\s+/g;
        const rx_var_def = /\$[a-zA-Z_]+\s*=([a-zA-Z0-9]|'.+?'|".+?"|`.+?`)/g;
        const rx_comment_block = /"""(.|[\r\n])*"""/g;
    
        const Out = (...args) =>{
          //console.log([...args]);
        }
        const RegCommand = ( cmd, syntax, callback )=>{
            if(cmd in _commands){
                console.error(cmd,'exists!');
                return;
            }else 
            _commands[cmd] = {syntax,callback};
            //console.log(cmd, 'registered', syntax);
        };
        const Tokenize = (code)=>{
            // console.log('--------------- TOKENIZING -----------');
            let lines = code.split(/\;\s*$/gm);
            // command = {command, args}
            // cmd arg{name,type, index} -fui => -(f|u|i)
            const rx_cmd = /(?=^\s*)[a-zA-Z]+/;
            lines.forEach( line =>{
                // seperate commands from args
                line = line.replace(/(^\s+|\s+$)/,'');
                let cmd  = line.match(rx_cmd);
                let args = ParseArgs(line.replace(rx_cmd,'').replace(/(^\s+|\s+$)/,'')); 
        
                let token = {cmd, args};
                if(cmd) token.cmd = cmd[0];
                if( cmd in _commands )
                GenerateCode(token);
                else if(cmd!== null && cmd.length > 0){
                  Echo(`${_shellName}: unknown command <cmd>${cmd}</cmd>`);
                }
                //Shell( line );
            });
        };
        const GenerateCode = token =>{
            let cmd = _commands[token.cmd];
            let syntax = cmd.syntax;
            // for each token.arg, check if the value was sp
            Out('parsing... ',token.cmd, token.args); 
            //console.log(` checking if each param has a char alias.`);
            let res =[];
            for( let p in syntax ){
                let param = syntax[p];
                let val, arg, type = syntax[p].type;
        
                if('char' in param && param.char in token.args){
                    val = token.args[param.char];
                }else if( p in token.args){
                    val = token.args[p];
                }else {
                    val = null;
                    Echo(`${token.cmd}'s param "${p}" was not specified. `);
                }
                if(val !== null)
                val = val.replace(/(^\'|^\"|\'$|\"$)/g,'');
                res.push(val);
                Out(p,'=>',type(val)); 
            }
            Echo(cmd.callback.apply(null,res));
            Out('------------ done!', res); 
        }
        const ParseArgs = args =>{    
            let res = {};
            ///////////////////////////////////
            //let str = args.match(string_1);
            //args = args.replace(string_1,'%str#');
            //let flags = args.match(rx_flag);
            const rx_flag = /^(-[a-zA-Z]|--([a-zA-Z]{2,}))\s+/g;
            const rx_fval = /\s+([a-zA-Z0-9#%_-]+|'.+?'|".+?")$/g;
            const rx_vflag =  /(-[a-zA-Z]|--([a-zA-Z]{2,}))\s+([a-zA-Z0-9#%_-]+|'.+?'|".+?")/g;
            
            let fvals = args.match(rx_vflag);
            if(fvals)
            fvals.forEach( arg =>{        
                //console.warn(arg);
                const flag = arg.replace(rx_fval,'').replace(/(^-+|\s+)/,'');        
                const val =  arg.replace(rx_flag,'');
                res[flag] =  val;                    
            })
            // -a
            ///////////////////////////////////
            return res;
        }
        // var x = 40;
        const Var = (name, value=null, type=null) =>{
          if(value === null) value = 'null';
          if(type === null) type = 'null';
            _vars[name] = {name,type:type,value:value};
            Echo(value);
        };
        const Exec = script =>{
            Tokenize(script);
            Prompt();
        };
        let lineCount = 1;
        /* const Show = text =>{
          let line = document.createElement('div');
          line.innerHTML = text.toString();
          //output.appendChild(line);
          outputs.forEach(c=>{
            output.removeChild(c);
          });
          outputs.push(line);
          outputs.forEach(c=>{
            output.appendChild(c);
          })
          line.classList.add('code-line');
          line.setAttribute('id',`line-${lineCount}`);
          lineCount++;
          terminal.scrollTop += 16;
          //console.log(page.scrollTop,'>>> scrollTop', page.scrollTop, scrollTo);
        }; */
        const CreateLine = (text='', flag = '')=>{
          let res = document.createElement('div');
          res.classList.add('code-line');
          res.innerHTML = text.toString();
          res.classList.add(flag);
          return res;
          }
        const Echo = ( msg )=>{
          if(msg == undefined) return;
          let line = CreateLine(msg.toString(),'output');
          let lineNumber = CreateLine( numbers.children.length.toString(),'number');
          numbers.appendChild(lineNumber);        
          terminal.appendChild(line);        
        }
        const Prompt  = ( msg="" )=>{
          let pre     = promptCmd.outerHTML+ promptTime.outerHTML + promptSign.outerHTML;
          let line    = CreateLine(pre,'text-edit');
          let editor  = document.createElement('span');
    
          editor.classList.add('text-edit');
          editor.innerHTML = msg.toString();
            
          editor.spellcheck = false;
          editor.contentEditable = true;
          line.appendChild(editor);
          terminal.appendChild(line);
          editor.focus();
          input = editor;
        };
    
        const GetHelp = cmd =>{
            let res = _commands[cmd];
            Echo(`<cmd>${cmd}</cmd>`);
            Echo('options:');
            let opts = res.syntax;
            for( let o in opts ){
                const about = 'about' in opts[o] ? opts[o].about:'';
                Echo(`- <flag>${o}</flag> : <type>${opts[o].type.name}</type>`);
                if(about.length)Echo(`<about>${about}</about>`);
    
            }
        }
        const Help = ( cmd )=>{
            // get input from user
            if(cmd in _commands)
              GetHelp(cmd);
            else{
              for( let c in _commands)
                GetHelp(c);
            }
        }
        RegCommand('prompt',{message:{type:String, char:'m'}},Prompt);
        RegCommand('help',{command:{type:String, char:'c'}},Help);
        //RegCommand('var',{name:{type:String, char:'n'},val:{type:String, char:'='}},Var);
    
        def(this,'Prompt',Prompt);
        def(this,'Echo',Echo);
        def(this,'Exec',Exec);
        def(this,'RegCommand',RegCommand);
        def(this,'DC', ()=>_ui);
        const HistoryEmpty = ()=> _history.length === 0;
        const HistoryAtTop = ()=>{
          return _history.length > 0 && _historyIndex > _history.length - 1;
        }
        const Input = ( data )=>{
    //      Prompt( data );
          if( !input)  return;
          input.textContent = data.toString();
          //input.focus();
        }
        const HistoryPush = ( data )=>{
          
          //Show(data);
          if(data.length < 1) return;
          _history.push(data);
          _historyIndex = _history.length - 1;
        };
    
        const HistoryAtBottom = ()=>{
          return _historyIndex == 0;
        }
        const HistoryUp = () =>{
          if(HistoryEmpty() || HistoryAtTop()) return;
          //console.log('up',_historyIndex, _history.length );
          if(input)
          input.textContent =( _history[_historyIndex]);
          _historyIndex++;
        }
        const HistoryDown = () =>{
          if(HistoryEmpty() || HistoryAtBottom()) return;
          //console.log('down',_historyIndex, _history.length );      
          if(input)
          input.textContent = ( _history[_historyIndex]);
          _historyIndex--;
        }
    /* 
        const ClearInput = ( data ="")=>{
          let numb = document.createElement('div');
          numb.textContent = numbers.children.length.toString();
          numb.classList.add('number'); 
          numbers.appendChild(numb);
          input.textContent = data;
          input.focus();
        } */
        const NewLine = ()=>{
              let code = input.textContent.toString();
              input.contentEditable = false;
              HistoryPush( code );
              if( !code.endsWith(';'))
              code +=';';
              
              Exec( code );
    
        }
    
        const Init = () =>{
    
          console.log('--------------- SHELL -----------');
          // remove preset line.
          [ promptCmd,
          promptTime,
          promptSign,
          input].forEach(c=>{
            prompt.removeChild(c);
          });
          terminal.removeChild(numbers);
        NewLine();
          if(typeof code === 'string') Exec(code);
          terminal.addEventListener('keydown', e=>{
            switch (e.keyCode) {
              case 38: // up
              HistoryUp();
              break;
              case 40: // down
              HistoryDown();
              break;
              case 13:
                e.preventDefault();
                NewLine();
                break;
            
              default:
                //console.log(e.keyCode);
                break;
            }
          });
        };
    
        Init();
    
    }
    function RegCommands(){
        document.body.appendChild(service.DC());
        service.RegCommand("create",{
            name:{type:String,  char:'n', about:`Name of the item to create`}, 
            parent:{type:String, char:'p', about:'Optional name of the parent under whom to create the object.'}, 
            tag:{type:String, char:'t', about:'Html tag to use as the base of the item.'}}, 
            Create);
        service.RegCommand("fill", {color:{type:String,  char:'c'}}, Fill);
        service.RegCommand("fontcolor", {color:{type:String,  char:'c'}}, FontColor);
        service.RegCommand("fontsize", {size:{type:parseFloat,  char:'s'}, unit:{type:String, char:'u'}}, FontSize);
        service.RegCommand("text",  {value:{type:String,  char:'v'}, name:{type:String, char:'n'}, parent:{type:String, char:'p'}, tag:{type:String, char:'t'}}, Text);
        service.RegCommand("size",  {width:{type:Number, char:'w'}, height:{type:Number, char:'h'}}, Size);
        service.RegCommand("select",  {name:{type:String, char:'n'}}, Select);
        service.RegCommand("parent",  {parent:{type:String, char:'p'}, child:{type:String, char:'n'},}, Parent);
        service.RegCommand("unparent",  {name:{type:String, char:'n'},}, UnParent);
        service.RegCommand("css",  {property:{type:String, char:'p'}, value:{type:String, char:'v'},}, Style);
        service.RegCommand("attrib",  {property:{type:String, char:'p'}, value:{type:String, char:'v'},}, Attribute);
        service.RegCommand("echo",  {property:{type:String, char:'v'}}, service.Echo);
        service.RegCommand("corner",  {
            radius:{type:Number, char:'r'},
            side:{type:String, char:'s'}, 
        }, Fillet);
        // corener -s 
        
        service.RegCommand("stroke",  {
            style:{type:String, char:'t'}, 
            width:{type:Number, char:'w'},
            color:{type:String, char:'c'},
            side:{type:String,  char:'s'},
        }, Stroke);
    
    }
        
    // font -c
      
      /////////////////////////////////////////////
      
      const Style = (property, value)=>{
          if(_selection){
              _selection.style[property] = value;
          }
      }
      const Attribute = (property, value)=>{
          if(_selection){
              _selection.setAttribute(property,value);
              console.log('attributed',property,value);
          }
      }
      const LayerExists = (id) => { return _layers[id] !== null;};
      const CreateLayer = (parentId, item, name='layer')=>{
          let entity = {
          item: item,
          name: typeof name === 'string' ?  name :'layer'+iCount,
          enabled: true,
          uid: 'layer'+iCount,
          index: iCount,
          parentId: null, 
          pressed:{x:0,y:0},
          released:{x:0,y:0},
          children:[], 
          handlers:{
            pressed:[],
            released:[],
            moved:[],
            hovered:[]}
        };
        def(item,'uid', 'layer'+iCount);
        def(item,'name', name);
        entity.IsChildOf = id =>entity.parentId == id;
        entity.IsParentOf= id =>entity.children.indexOf(id) >= 0;
        entity.HasParent = ()=> entity.parentId !== null && LayerExists( entity.parentId ) && entity.id !== entity.parentId;
        
        entity.SetParent = id =>{
            if( !id) return false;
          if( typeof id !== 'string'){
            if( typeof id === 'object'){
                if( !('id' in id)) 
                    return false;
                id = id.id;
    
            }else{
              return false;
            }
          }
    
            // check if the item has another parent.
          if( entity.HasParent() ){
              let curr = _layers[entity.parentId];
            
            // remove this item from that parent.
            curr.item.removeChild( entity.item );
            curr.children.splice( curr.children.indexOf(entity.id),1);
            console.log('Removed',curr.id, 'as parent for ', entity.name);        
        }
        // check if the new parent exists and proceed.
        if( LayerExists(id)){
            let parent = _layers[id];
            if( parent ){
                parent.item.appendChild( entity.item );
                parent.children.push(entity.id);
                entity.parentId = id;
                console.log(parent.name, 'is now parent of', entity.name);        
                return true;
            }
            console.log('-----------------------------------');        
            console.warn(id, 'cannot be set as parent of', entity.id);        
            console.warn(parent);        
            console.log('-----------------------------------');        
            return false;
            
        }else{
            console.log(id, 'does not exist');
            return false;
          }
        };
        entity.Parent = () =>{
        if(entity.HasParent())
              return _layers[entity.parentId];
          return null;
        };
        if(parentId)
        entity.SetParent(parentId);
        iCount++;
        return entity;
      }
      const Create = (name=null,parentId='scene',tag='div', target=null ) =>{
      
        let res            = target === null ? document.createElement(tag) : target;
    
        let layer  = CreateLayer(parentId, res, name);
            
        res.setAttribute('id',name);
        res.setAttribute('uid',layer.uid);
        
        console.log('Created', res.tagName, 'named', layer.name);
        
        _layers[layer.name] = layer;
        _layerNames[layer.name] = res.uid;
        return Select(layer.name);
          //Pressed(e=>{ Select( layer.id );});
          
      }
              
      const Text = (text="text",name='text#', parentId='scene',tag='span')=>{
          /*
          Text(args) 
          if( set in args ) _setText( args.text )
          if( replace in args ) _setText( args.text )
          set
          replace
          find
          endsWith
          startsWith
          contains
    
          */
          if(name==='text#')
          name = 'text'+textCount;
        let res = Create(name,parentId, tag);
        res.textContent = text;
        textCount++;
        return true;
      }
      const Select = (index)=>{
        let res = `${index} not found.`;
        if(index in _layers){
          _selection = _layers[index].item;
          res =('Selected '+_selection.name);
        }
        return res;
      }
    
      const Parent = (id, childId=null)=>{
        let res = "Failure";
      if(typeof childId === 'string' && LayerExists(childId)) 
          Select(childId);
    
      if( _selection && _selection.name !== id && LayerExists(id)){
        _layers[_selection.name].SetParent(id);
          res = `${id} parented ${_selection.name}`;
        }
        return res;
      }
      const UnParent = (id)=>{
      if( LayerExists(id)){
          Select(id);
        let layer = _layers[_selection.name];
        
        if(layer.HasParent()){
            let p = _layers[layer.parentId];
            if(p){
                let i = p.children.indexOf(id);
                p.children.splice(i,1);
                p.item.removeChild(layer.item);
    
                console.log('UnParented',id,'from', p.name);
                return true;
            }
            return -2;
        }
    
        console.log('UnParented',id,'failed');
        return -3;
        }else{
            console.log(id,'has no parents');
            return false;
        }
      }
      const GetName = (index)=>{
      if( LayerExists(index))
        return _layers[index].name;
        
        console.log('Could not find: '+index);
      };
      
      const Rename = (index, name) =>{
        if( LayerExists(index))
            _layers[index].name = name;
      };
      
      const Size = (w,h)=>{
        if(_selection){
          _selection.style.width = w+'px';
          _selection.style.height = h+'px';
          console.log('Resized',_selection.id, w, h);
        }
        
      }
      const GetWidth = ()=>{
        if(_selection){
          let w = parseFloat(getComputedStyle(_selection)['width'].replace('px','')); 
          return w;
        }
        return 0;
      }
      const GetHeight = ()=>{
        if(_selection){
          let n = parseFloat(getComputedStyle(_selection)['height'].replace('px','')); 
          return n;
        }
        return 0;
      }
      const GetSize = ()=>{
        if(_selection){      
          return {w:GetWidth(),h:GetHeight()};
        }
        return 0;
      }
    
      const Fill = (color)=>{
        if(_selection){
            _selection.style.backgroundColor = color;
            //console.log('Filled', _selection.id, color, _selection.style.backgroundColor);
        }else{
            console.log('Fill:: no selection found');
        }
    }
    
    const FontColor = (color)=>{
        if(_selection){
            _selection.style.color = color;
            //console.log('FontColor', _selection.id, color);
        }
    }
    const FontSize = (size, unit='px')=>{
        if(_selection){
            //if( typeof size === 'number')
            size += unit;
            _selection.style.fontSize = size;
            //console.log('FontSize', _selection.id, size);
        }
    }
    
    const StrokeFill = (color)=>{
        if(_selection){
            _selection.style.borderColor = color;
          // console.log('StrokeFilled', _selection.id, color);
        }
      }
      
    const StrokeSize = ( size )=>{
        if(_selection){
            if( typeof size == "number") size += "px";
            _selection.style.borderWidth = size;
            console.log('Resized Stroke',_selection.id, size);
        }
    }
    const Stroke = (style, size, stroke='#000', side='all')=>{
        if(_selection){
            let prop;
            switch (side) {
                case 'l':
                case 'left':
                    prop = 'border-left';
                    break;
                case 'r':
                case 'right':
                    prop = 'border-right';
                    break;
                case 'b':
                case 'bottom':
                    prop = 'border-bottom';
                    break;
                case 't':
                case 'top':
                    prop = 'border-top';
                    break;
                default:
                    prop = 'border'
                    break;
            }
            if( typeof size === "number") 
            size += "px";
            _selection.style[prop] =`${style} ${size} ${stroke}`;
            console.log('Stroke',_selection.id,prop, style, size, stroke);
        }
    }
    const Pressed = (cb)=>{
      if(_selection){
        console.log('Pressed',_selection.name);
        _selection.addEventListener('mousedown',cb);
        _layers[_selection.name].handlers.pressed.push(cb);
        // layer.connections.push({connection:'mousemove', doSomething:e=>{}, target:$this})
        // pressEvents.Add(id,callback);
        // releaseEvents.Add(id,callback);
        // moveEvents.Add(id,callback);
        // moveEvents.Add(id,boxMoveHandler);
        // clickEvents.Add(id,callback);
        // events.click.Add(id,callback);
        // events.move.Remove(id,callback);
        // events.drag.Add(id,callback);
      }
    };
    
    const SetPoint = ( state, x,y )=>{
      if(_selection){
        _layers[_selection.name][state] = {x,y};
      }
    }
    const PointAt = (state) =>{
    if(_selection){
        p = _layers[_selection.name][state];
      if(p)
        return p;  
    }
      return {x:0,y:0};
    }
    
    const Hovered = (cb)=>{
      if(_selection){
        _selection.addEventListener('mouseover',cb);
        _layers[_selection.name].handlers.hovered.push(cb);
      }
    }
    
    const Released = (cb)=>{
      if(_selection){
        _selection.addEventListener('mouseup',cb);
        _layers[_selection.name].handlers.released.push(cb);
      }
    }
    
    const Moved = (cb)=>{
      if(_selection){
        _selection.addEventListener('mousemove',cb);
        _layers[_selection.name].handlers.moved.push(cb);
      }
    }
    const Fillet = (radius, side='all')=>{
  
        
        if(_selection){
          
          let prop;
          switch (side) {
              case 'tl':
                  prop = 'border-top-left-radius';
                  break;
              case 'tr':
                  prop = 'border-top-right-radius';
                  break;
              case 'br':
                  prop = 'border-bottom-right-radius';
                  break;
              case 'bl':
                  prop = 'border-bottom-left-radius';
                  break;   
              default:
                  prop = 'border-radius'
                  break;
          }
        console.log('Corner',prop, radius, typeof radius); 
          radius = typeof radius == "string"  ? radius : radius + 'px';
        _selection.style[prop] = `${radius}`;
      }
    }
      
    const init = ( includes )=>{
        service = new CShell();
        console.log('----------------------------- initializing shell -------------------------------');
        console.log(includes);
        const {events, actions, keybindings} = includes; 
        //actions.Create('add','scene.add');
        // commands
        if(keybindings)
        keybindings.SetKeys('ctrl+n','document-state','scene.add');
        _stage = Create('scene',null, null, document.body);
        
    };
    const main = ( args )=>{
        console.log('----------------------------- main -------------------------------');
        RegCommands();
      };
      
      const quit = ( args )=>{

      };
      return {init, main, quit };
    }));
    
///////// ////////////////////// ///////////////// /////////////// ///////////// /////////////
