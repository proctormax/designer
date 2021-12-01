qPack("IStack",function(){
    const CWidget   = qRequire("CWidget");
    const CRect     = qRequire("CRect");
    const CCSS      = qRequire("CCSS");
    const Geom      = qRequire("Geom");
    const CSignal   = qRequire("CSignal");

    CCSS.New("IStack")
    .Add(".CStack",{
        "position":"relative"
    });
    // Horizontal | Vertical | Path |
    // Ascending  | Descending |
  
    function CStackItem( stack, contentType ){
        const _changed = new CSignal(this,"stackItemChanged",{item:"CStackItem"});
        const _emptied = new CSignal(this,"stackItemEmptied",{item:"CStackItem"});
        qExtend(this,CRect,0,0,0,0);
        var m_ptr = {
            content,
            stack,
            position:"CPoint2",
            size:"CSize"
        };
        Object.defineProperty(this,"Changed",{get:()=>{
            return _changed;
        }});
        Object.defineProperty(this,"Emptied",{get:()=>{
            return _emptied;
        }});

        this.SetContent = function( content ){
            m_ptr.content = content;
            if( content ){
                this.Set( Geom.GetRect(content));
            }
            m_ptr.stack.Update();
        };
        this.IsEmpty = function(){
            return m_ptr.content === null;
        };

        this.Content =function(){
            return m_ptr.content;
        };

        this.ReleaseContent =function(){
            if( this.IsEmpty() ) return null;
            var res =  m_ptr.content;
            this.SetContent( null );
            return res;
        };
        this.ReplaceContentWith =function( new_content ){
            if( this.IsEmpty() ) return null;
            var res =  m_ptr.content;
            this.SetContent( new_content );
            return res;
        };

    }

    function CStackWidgetItem(stack,widget){
        qExtend(this,CStackItem,stack,"CWidgetItem");
    }

    function CStackGraphicsItem(stack,content){
        qExtend(this,CStackItem,stack,"CGraphicsItem");
        qExtend(this, CWidget,'div','CStackItem');
    }
    
    function IStack( stackType, itemType ){
        const m_ptr = {
            items:"Array"
        };

        this.StackType = function(){
            return stackType;
        };
        this.ItemType = function(){
            return itemType;
        };

        qProperties(this,m_ptr);
    }
    IStack.prototype.Update = function( ){

    };
    IStack.prototype.Init = function( ){
        this.SetItems([]);
    };
    
    IStack.prototype.Add = function(item){
        this.Items().push(item);
        this.Update();
    };

    IStack.prototype.Remove = function(item){
        if( this.Contains(item) ){

        }
    };

    IStack.prototype.Contains = function(item){
        return this.Items().indexOf(item) > -1;
    };

    IStack.prototype.Insert = function( index, item){
        if( this.IsEmpty()) return this.Add(item);
    };
    IStack.prototype.Replace = function( index, item){
        if( this.IsEmpty()) return this.Add(item);
        return this.Items()[index].ReplaceContentWith( item );
    };

    function CHStack(){
        qExtend(this,IStack,"HStack");
    }
    function CVStack(){
        qExtend(this,IStack,"VStack");
    }
    function CDStack(){
        qExtend(this,IStack,"DStack");
    }

    var stack = new CHStack();
    
    stack
    return IStack;
});
