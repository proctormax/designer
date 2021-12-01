qPack("CItem", function(){
    const CWidget =  qRequire("CWidget");
    const CAction =  qRequire("CAction");
    const CSignal =  qRequire("CSignal");
    const CLabel  =  qRequire("CLabel");

    function CItem( text, type, index = 0 ){
        qExtend(this, CWidget, "CItem",type);
        const m_clicked = new CSignal(this, "itemClicked",{item:"CItem"});
        var m_label = new CLabel(text,"CItemText","spam");
        
        Object.defineProperty(this,"Clicked",{get:()=>{
            return m_clicked;
        }});

        var m_ptr = {
            index:"Number",
            role : "String"
        };
        qProperties(this,m_ptr);

        this.SetText = function( text ){
            m_label.SetText(text);
        };
        this.Text = function(  ){
            return m_label.Text();
        };

        this.Init = function(){

            this.AddChild( m_label);
    
            this.InitEvents();

            this.SetIndex(index);
        };

        this.Init();
    }

    CItem.prototype.ClickEvent = function(e){
        this.Clicked.Emit({item:this, event:e});
    };

    CItem.New = function( text ){
        return new CItem( text );
    }
    return CItem;
});