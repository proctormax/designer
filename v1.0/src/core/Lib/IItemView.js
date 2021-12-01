


qPack("IItemView",function(){
    const CSignal = qRequire("CSignal");
    // property: [ accepts:[], signals:[] errors:[]]
    let PropType = {
        AlternatingRowColors : ["Boolean"], 
        AutoScroll           : ["Boolean"],//{signals:{pre:AutoScrollAboutToChange, post:AutoScrollChanged}
        AutoScrollMargin     : ["Number"],
        DefaultDropAction    : ["DropAction"],
        DragDropMode         : ["DragDropMode"],
        DragDropOverwriteMode: ["Boolean"],
        DragEnabled          : ["Boolean"],
        EditTriggers         : ["Array"],
        HorizontalScrollMode : ["ScrollMode"],
        IconSize             : ["CSize"],
        State                : ["State"],
        SelectionBehavior    : ["SelectionBehavior"],
        SelectionMode        : ["SelectionMode"], // errors:{code:034, message:}
        ShowDropIndicator    : ["Boolean"],
        TabKeyNavigation     : ["Boolean"],
        TextElideMode        : ["TextElideMode"], // {Signals:{pre: TextElideModeAboutToChange, post:TextElideModeChanged}}
        VerticalScrollMode   : ["ScrollMode"]
    };
    // priorChange
    // list.priorChange.Add("state",doSomething);
    // list.afterChange.Add("state",doSomethingElse);
    // list.preSet.At("state",doSomethingElse);
    // list.postSet.Add("state",doSomethingElse);
    // lv.dragModeChanged.Add(handleDragModeChange);
    // lv.dragModeChanged.Remove(handleDragModeChange);

    function CanSetProperty( property, type ){
        return PropType[property].indexOf(qTypeOf(type)) >= 0;
    };

    function IItemView(){
        let _alternatingRowColorsChanged  =  new CSignal(this,"alternatingRowColors",{alternatingRowColors:"Boolean"}); 
        let _autoScrollChanged            =  new CSignal(this,"autoScroll",{autoScroll:"Boolean"});
        let _autoScrollMarginChanged      =  new CSignal(this,"autoScrollMargin",{autoScrollMargin:"Number"});
        let _defaultDropActionChanged     =  new CSignal(this,"defaultDropAction",{defaultDropAction:"DropAction"});
        let _dragDropModeChanged          =  new CSignal(this,"dragDropMode",{dragDropMode:"DragDropMode"});
        let _dragDropOverwriteModeChanged =  new CSignal(this,"dragDropOverwriteMode",{dragDropOverwriteMode:"Boolean"});
        let _dragEnabledChanged           =  new CSignal(this,"dragEnabled",{dragEnabled:"Boolean"});
        let _editTriggersChanged          =  new CSignal(this,"editTriggers",{editTriggers:"Array"});
        let _horizontalScrollModeChanged  =  new CSignal(this,"horizontalScrollMode",{horizontalScrollMode:"ScrollMode"});
        let _iconSizeChanged              =  new CSignal(this,"iconSize",{iconSize:"CSize"});
        let _stateChanged                 =  new CSignal(this,"state",{state:"State"});
        let _selectionBehaviorChanged     =  new CSignal(this,"selectionBehavior",{selectionBehavior:"SelectionBehavior"});
        let _selectionModeChanged         =  new CSignal(this,"selectionMode",{selectionMode:"SelectionMode"});
        let _showDropIndicatorChanged     =  new CSignal(this,"showDropIndicator",{showDropIndicator:"Boolean"});
        let _tabKeyNavigationChanged      =  new CSignal(this,"tabKeyNavigation",{tabKeyNavigation:"Boolean"});
        let _textElideModeChanged         =  new CSignal(this,"textElideMode",{textElideMode:"TextElideMode"});
        let _verticalScrollModeChanged    =  new CSignal(this,"verticalScrollMode",{verticalScrollMode:"ScrollMode"});
       
        Object.defineProperty(this,"AlternatingRowColorsChanged",{value:_alternatingRowColorsChanged, writable:false});
        Object.defineProperty(this,"AutoScrollChanged",{value:_autoScrollChanged, writable:false});
        Object.defineProperty(this,"AutoScrollMarginChanged",{value:_autoScrollMarginChanged, writable:false});
        Object.defineProperty(this,"DefaultDropActionChanged",{value:_defaultDropActionChanged, writable:false});
        Object.defineProperty(this,"DragDropModeChanged",{value:_dragDropModeChanged, writable:false});
        Object.defineProperty(this,"DragDropOverwriteModeChanged",{value:_dragDropOverwriteModeChanged, writable:false});
        Object.defineProperty(this,"DragEnabledChanged",{value:_dragEnabledChanged, writable:false});
        Object.defineProperty(this,"EditTriggersChanged",{value:_editTriggersChanged, writable:false});
        Object.defineProperty(this,"HorizontalScrollModeChanged",{value:_horizontalScrollModeChanged, writable:false});
        Object.defineProperty(this,"IconSizeChanged",{value:_iconSizeChanged, writable:false});
        Object.defineProperty(this,"StateChanged",{value:_stateChanged, writable:false});
        Object.defineProperty(this,"SelectionBehaviorChanged",{value:_selectionBehaviorChanged, writable:false});
        Object.defineProperty(this,"SelectionModeChanged",{value:_selectionModeChanged, writable:false});
        Object.defineProperty(this,"ShowDropIndicatorChanged",{value:_showDropIndicatorChanged, writable:false});
        Object.defineProperty(this,"TabKeyNavigationChanged",{value:_tabKeyNavigationChanged, writable:false});
        Object.defineProperty(this,"TextElideModeChanged",{value:_textElideModeChanged, writable:false});
        Object.defineProperty(this,"VerticalScrollModeChanged",{value:_verticalScrollModeChanged, writable:false});       
        let _props = {}; // qObjectify(this, true, false );
        /**
         * Sets the value of the specified property.
         * @param property {String} The property name.
         * @param value {Variant} The new value to set.
         */
        this.Set = function( property, value){
            // first checks if prop accepts type of value
            if( CanSetProperty( property,value) )
            _props[property] = value;
        };

        /**
         * Returns the value of property.
         * @param property {String} - the property name.
        */
        this.Get = function( property ){
            return _props[property];
        };

        this.Init();
    }

    qSetProperties(IItemView,{});

    qEnums( IItemView,{TextElideMode:{
        ElideLeft   :0,//	"The ellipsis should appear at the beginning of the text."],
        ElideRight  :1,//	"The ellipsis should appear at the end of the text."],
        ElideMiddle :2,//	"The ellipsis should appear in the middle of the text."],
        ElideNone   :3,//	"Ellipsis should NOT appear in the text."],
    },DropAction:{
        CopyAction   :0x1,//	"Copy the data to the target."],
        MoveAction   :0x2,//	"Move the data from the source to the target."],
        LinkAction   :0x4,//	"Create a link from the source to the target."],
        IgnoreAction :0x0,//	"Ignore the action (do nothing with the data)."],
    },DragDropMode:{
       NoDragDrop   :0,// "Does not support dragging or dropping."],
       DragOnly     :1,// "The view supports dragging of its own items"],
       DropOnly     :2,// "The view accepts drops"],
       DragDrop     :3,// "The view supports both dragging and dropping"],
       InternalMove :4,// "The view accepts move (not copy) operations only from itself."]
    },EditTrigger:{
        NoEditTriggers  :0, //	"No editing possible."],
        CurrentChanged  :1, //	"Editing start whenever current item changes."],
        DoubleClicked   :2, //	"Editing starts when an item is double clicked."],
        SelectedClicked :4, //	"Editing starts when clicking on an already selected item."],
        EditKeyPressed  :8, //	"Editing starts when the platform edit key has been pressed over an item."],
        AnyKeyPressed   :16, //	"Editing starts when any key is pressed over an item."],
        AllEditTriggers :31, //	"Editing starts for all above actions."],
    },ScrollHint:{
        EnsureVisible	 :0,//	"Scroll to ensure that the item is visible."],
        PositionAtTop	 :1,//	"Scroll to position the item at the top of the viewport."],
        PositionAtBottom :2,//	"Scroll to position the item at the bottom of the viewport."],
        PositionAtCenter :3,//	"Scroll to position the item at the center of the viewport."],
    },ScrollMode:{        
        ScrollPerItem	:0,//	"The view will scroll the contents one item at a time."],
        ScrollPerPixel	:1,//	"The view will scroll the contents one pixel at a time."],
    },SelectionBehavior:{        
        SelectItems    :0,//	"Selecting single items."],
        SelectRows     :1,//	"Selecting only rows."],
        SelectColumns  :2,//	"Selecting only columns."],
    },SelectionMode:{
        SingleSelection      :1,//	"When the user selects an item, any already-selected item becomes unselected. It is possible for the user to deselect the selected item by pressing the Ctrl key when clicking the selected item."],
        ContiguousSelection  :4,//	"When the user selects an item in the usual way, the selection is cleared and the new item selected. However, if the user presses the Shift key while clicking on an item, all items between the current item and the clicked item are selected or unselected, depending on the state of the clicked item."],
        ExtendedSelection    :3,//	"When the user selects an item in the usual way, the selection is cleared and the new item selected. However, if the user presses the Ctrl key when clicking on an item, the clicked item gets toggled and all other items are left untouched. If the user presses the Shift key while clicking on an item, all items between the current item and the clicked item are selected or unselected, depending on the state of the clicked item. Multiple items can be selected by dragging the mouse over them."],
        MultiSelection       :2,//	"When the user selects an item in the usual way, the selection status of that item is toggled and the other items are left alone. Multiple items can be toggled by dragging the mouse over them."],
        NoSelection          :0,//	"Items cannot be selected."],
    },CursorAction:{
        MoveUp        :0,//	"Move to the item above the current item."],
        MoveDown      :1,//	"Move to the item below the current item."],
        MoveLeft      :2,//	"Move to the item left of the current item."],
        MoveRight     :3,//	"Move to the item right of the current item."],
        MoveHome      :4,//	"Move to the top-left corner item."],
        MoveEnd       :5,//	"Move to the bottom-right corner item."],
        MovePageUp    :6,//	"Move one page up above the current item."],
        MovePageDown  :7,//	"Move one page down below the current item."],
        MoveNext      :8,//	"Move to the item after the current item."],
        MovePrevious  :9,//	"Move to the item before the current item."],
    },DropIndicatorPosition:{
        OnItem      :0,//	"The item will be dropped on the index."],
        AboveItem   :1,//	"The item will be dropped above the index."],
        BelowItem   :2,//	"The item will be dropped below the index."],
        OnViewport  :3,//	"The item will be dropped onto a region of the viewport with no items. The way each view handles items dropped onto the viewport depends on the behavior of the underlying model in use."],
    },State:{
        NoState            :0,// "This is the default state."],
        DraggingState      :1,// "The user is dragging items."],
        DragSelectingState :2,// "The user is selecting items."],
        EditingState       :3,// "The user is editing an item in a widget editor."],
        ExpandingState     :4,// "The user is opening a branch of items."],
        CollapsingState    :5,// "The user is closing a branch of items."],
        AnimatingState     :6,// "The item view is performing an animation."],
    }});

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
    IItemView.prototype.AutoScroll = function(){
        return this.Get("AutoScroll");
    };           
    /**
     * Sets the ", value.
     * @param value {Boolean}
     * */
    IItemView.prototype.SetAutoScroll = function( value ){
        this.Set("AutoScroll", value);
    };           
    IItemView.prototype.AutoScrollMargin = function(){
        return this.Get("AutoScrollMargin");
    };     
    /**
     * Sets the AutoScrollMargin value.
     * @param value {Number}
     * */
    IItemView.prototype.SetAutoScrollMargin = function( value ){
        this.Set("AutoScrollMargin", value);
    };     
    IItemView.prototype.DefaultDropAction = function(){
        return this.Get("DefaultDropAction");
    };    
    /**
     * Sets the DefaultDropAction value.
     * @param value {DropAction}
     * */
    IItemView.prototype.SetDefaultDropAction = function( value ){
        this.Set("DefaultDropAction", value);
    };    
    IItemView.prototype.DragDropMode = function(){
        return this.Get("DragDropMode");
    };         
    /**
     * Sets the value value.
     * @param value {DragDropMode}
     * */
    IItemView.prototype.SetDragDropMode = function( value ){
        this.Set("DragDropMode", value);
    };         
    IItemView.prototype.DragDropOverwriteMode = function(){
        return this.Get("DragDropOverwriteMode");
    };
    /**
     * Sets the DragDropOverwriteMode value.
     * @param value {Boolean}
     * */
    IItemView.prototype.SetDragDropOverwriteMode = function( value ){
        this.Set("DragDropOverwriteMode", value);
    };
    IItemView.prototype.DragEnabled = function(){
        return this.Get("DragEnabled");
    };          
    /**
     * Sets the DragEnabled value.
     * @param value {Boolean}
     * */
    IItemView.prototype.SetDragEnabled = function( value ){
        this.Set("DragEnabled", value);
    };          
    IItemView.prototype.EditTriggers = function(){
        return this.Get("EditTriggers");
    };         
    /**
     * Sets the EditTriggers value.
     * @param value {Array}
     * */
    IItemView.prototype.SetEditTriggers = function( value ){
        this.Set("EditTriggers", value);
    };         
    IItemView.prototype.HorizontalScrollMode = function(){
        return this.Get("HorizontalScrollMode");
    }; 
    /**
     * Sets the HorizontalScrollMode value.
     * @param value {ScrollMode}
     * */
    IItemView.prototype.SetHorizontalScrollMode = function( value ){
        this.Set("HorizontalScrollMode", value);
    }; 
    IItemView.prototype.IconSize = function(){
        return this.Get("IconSize");
    };             
    /**
     * Sets the ", value.
     * @param value {CSize}
     * */
    IItemView.prototype.SetIconSize = function( value ){
        this.Set("IconSize", value);
    };             
    IItemView.prototype.State = function(){
        return this.Get("State");
    };                
    /**
     * Sets the value value.
     * @param value {State}
     * */
    IItemView.prototype.SetState = function( value ){
        this.Set("State", value);
    };                
    IItemView.prototype.SelectionBehavior = function(){
        return this.Get("SelectionBehavior");
    };    
    /**
     * Sets the SelectionBehavior value.
     * @param value {SelectionBehavior}
     * */
    IItemView.prototype.SetSelectionBehavior = function( value ){
        this.Set("SelectionBehavior", value);
    };    
    IItemView.prototype.SelectionMode = function(){
        return this.Get("SelectionMode");
    };        
    /**
     * Sets the value value.
     * @param value {SelectionMode}
     * */
    IItemView.prototype.SetSelectionMode = function( value ){
        this.Set("SelectionMode", value);
    };        
    IItemView.prototype.ShowDropIndicator = function(){
        return this.Get("ShowDropIndicator");
    };    
    /**
     * Sets the ShowDropIndicator value.
     * @param value {Boolean}
     * */
    IItemView.prototype.SetShowDropIndicator = function( value ){
        this.Set("ShowDropIndicator", value);
    };    
    IItemView.prototype.TabKeyNavigation = function(){
        return this.Get("TabKeyNavigation");
    };     
    /**
     * Sets the TabKeyNavigation value.
     * @param value {Boolean}
     * */
    IItemView.prototype.SetTabKeyNavigation = function( value ){
        this.Set("TabKeyNavigation", value);
    };     
    IItemView.prototype.TextElideMode = function(){
        return this.Get("TextElideMode");
    };        
    /**
     * Sets the value value.
     * @param value {TextElideMode}
     * */
    IItemView.prototype.SetTextElideMode = function( value ){
        this.Set("TextElideMode", value);
    };        
    IItemView.prototype.VerticalScrollMode = function(){
        return this.Get("VerticalScrollMode");
    };   
    /**
     * Sets the VerticalScrollMode value.
     * @param value {ScrollMode}  
     * */
    IItemView.prototype.SetVerticalScrollMode = function( value ){
        this.Set("VerticalScrollMode", value);
    };   

    IItemView.prototype.AlternatingRowColors = function( ){
        this.Get("AlternatingRowColors");
    };
    /**
     * If set to true, the rows will have alternating colors.
     * @param value {Boolean} the value to set.
     */
    IItemView.prototype.SetAlternatingRowColors = function( value ){
        this.Set("AlternatingRowColors", value );
    };
     
   IItemView.prototype.Init = function(){
        this.SetAlternatingRowColors(false);
        this.SetAutoScroll(true);
        this.SetAutoScrollMargin(0);
        this.SetDefaultDropAction(QB.DropAction.IgnoreAction);
        this.SetDragDropMode(QB.DragDropMode.NoDragDrop);
        this.SetDragDropOverwriteMode(true);
        this.SetDragEnabled(false);
        this.SetEditTriggers([QB.EditTrigger.NoEditTriggers]);
        this.SetHorizontalScrollMode(QB.ScrollMode.ScrollPerPixel );
        this.SetIconSize( QB.CSize.New(20,20));
        this.SetSelectionBehavior(QB.SelectionBehavior.SelectItems);
        this.SetSelectionMode(QB.SelectionMode.NoSelection);
        this.SetShowDropIndicator( true );
        this.SetTabKeyNavigation(true);
        this.SetVerticalScrollMode( QB.ScrollMode.ScrollPerPixel );
        this.SetTextElideMode(QB.TextElideMode.ElideLeft);
        this.SetState(IItemView.State.NoState);
        // DragMoveEvent
        this.StateChanged.Add( e =>{
            switch (e.state) {
                case IItemView.State.DraggingState:
                    // enter dragging state
                    break;
                case IItemView.State.DragSelectingState:
                    // enter dragging state
                    break;
            
                default:
                    break;
            }
        });
         this.SelectionModeChanged.Add( e =>{
            switch ( this.SelectionBehavior()) {
                case IItemView.SelectionBehavior.SelectItems:
                    
                    break;
            
                default:
                    break;
            }
        });
        // (enter|exit) drag-drop mode
        // this.PropertyAboutToChange.Connect(e)
        /* 
        this.PreChange("state").Add( );
        this.Changed("state").Add( );
        this.ConnectChange("horizontalScrollMode").Add( );
        ------------------------------------------------------
        this.OnChange("horizontalScrollMode", callback);
        this.BeforeChange("showDropIndicator", callback);
        this.OnChange("showDropIndicator", callback);
        this.OnChangeSignal("showDropIndicator", callback);
        ------------------------------------------------------
        this.AboutToChange.Connect( e=>{
            switch( e.propertyName ){
                case "AutoScrollMode":
                    myList.SetActive( true );
                    break;
                case "State":
                    myStyle.SetState( HoverState );
                    break;
                case IItemView.Property.DragDropMode:
                    myStyle.SetState( HoverState );
                    break;
                case IItemView.Property.AlternatingRowColors:
                    myStyle.SetState( HoverState );
                    break;
            }
        })
        
        this.AboutToChange.Emit({property:"TextElideMode", value: elideMode, type:"TextElideMode"})
        this.PreSignal.Emit({property:"DragEnabled", value: false, type:"Boolean"});
        this.PostSignal.Emit({property:"DragEnabled", value: false, type:"Boolean"});
        this.PreChanged.Emit({property:"DragEnabled", value: false, type:"Boolean"});
        this.Changed.Emit({property:"DragEnabled", value: false, type:"Boolean"});
        */
        // this.PropertyChanged.Connect(e.name)

    };   
    ///////// EVENTS //////////////////////////////////////////
    // CDragEvent( pos, data, dropZone )
    //
    ///////// EVENTS //////////////////////////////////////////
    /** 
     * @param {CDragEnterEvent} event the CDragEnterEvent event.
    */
    IItemView.prototype.DragEnterEvent = function (event){
        console.log("DragEntered");
    };
    /** 
     * @param {CDragLeaveEvent} event the CDragLeaveEvent event.
    */
    IItemView.prototype.DragLeaveEvent = function (event){
        console.log("DragLeft");
    };
    /** 
     * @param {CDragMoveEvent} event the CDragMoveEvent event.
    */
    IItemView.prototype.DragMoveEvent = function (event){
        console.log("DragMoved");
    };
    /** 
     * @param {CDropEvent} event the CDropEvent event.
    */
    IItemView.prototype.DropEvent = function (event){
        
        console.log("DragMoved");
    };
    /** 
     * @param {CEvent} event the CEvent event.
    */
    IItemView.prototype.Event = function (event){};
    /** 
     * @param {CEvent} event the CEvent event.
    */
    IItemView.prototype.EventFilter = function (event){};
    /** 
     * @param {CFocusEvent} event the CFocusEvent event.
    */
    IItemView.prototype.FocusInEvent = function (event){
        this.InitEvents();
    };
    
    /** 
     * @param {Boolean} next the CFocusEvent event.
    */
    IItemView.prototype.FocusNextPrevChild = function (next){};
    /** 
     * @param {CFocusEvent} event the CFocusEvent event.
    */
    IItemView.prototype.FocusOutEvent = function (event){};
    /** 
     * @param {CInputMethodEvent} event the CInputMethodEvent event.
    */
    IItemView.prototype.InputMethodEvent = function (event){};
    /** 
     * @param {CKeyEvent} event the CKeyEvent event.
    */
    IItemView.prototype.KeyPressEvent = function (event){ };
    /** 
     * @param event {CMouseEvent} the CMouseEvent event.
    */
    IItemView.prototype.MouseDoubleClickEvent = function (event){};
    /** 
     * @param {CMouseEvent} event the CMouseEvent event.
    */
    IItemView.prototype.MouseMoveEvent = function (event){};
    /** 
     * @param {CMouseEvent} event the CMouseEvent event.
    */
    IItemView.prototype.MousePressEvent = function (event){};
    /** 
     * @param {CMouseEvent} event the CMouseEvent event.
    */
    IItemView.prototype.MouseReleaseEvent = function (event){};
    /** 
     * @param {CResizeEvent} event the CResizeEvent event.
    */
    IItemView.prototype.ResizeEvent = function (event){};
    /** 
     * @param {CTimerEvent} event the CTimerEvent event.
    */
    IItemView.prototype.TimerEvent = function (event){};
    /** 
     * @param {CEvent} event the CEvent event.
    */
    IItemView.prototype.ViewportEvent = function (event){};
    IItemView.prototype.ViewportSizeHint = function () {};
    return IItemView;
});