qPack("CComboBox", function(){
    const CListView     = qRequire("CListView");
    const CToggle       = qRequire("CToggle");
    const CWidget       = qRequire("CWidget");
    const CCSS          = qRequire("CCSS");
    
    CCSS.New("CComboBox")
    .Add(".CComboBox",{
        "position":"relative",
        "width":"auto",
        "height":"auto",
        "background-color":"transparent",
    })
    .Add(".CComboBox > .CToggle",{
        "width":"inherit"
    })
    .Add(".CComboBox > .CListView",{
        "position":"absolute",
        "min-width":"100%",
        "width":"auto",
        "height":"auto",
        "left":"0",
        "top":"0",
        "padding-top":"0",
        "border-radius":"4px",
        "background-color":"#212121",
        "border":"solid 1px #222",
        "z-index":"99999",
    })
    /**
     * lst = [
     * {icon: check, name:item 1, type:item},
     * {icon: check, name:item 1, type:item},
     * {icon: check, name:item 1, type:item},
     * {icon: check, name:item 1, type:item},
     * {icon: check, name:item 1, type:item},
     * ]
     */
    function CComboBox( itemList, activeIndex = 0 ){
        qExtend(this, CWidget,"div","CComboBox");
        const m_ptr = {

        };

        var m_index     = activeIndex;
        var m_toggle;
        const m_view    = new CListView( itemList );

        this.Text = function(){
            return m_toggle.Text();
        };
        this.Init = function(){
            m_toggle  = new CToggle( itemList[m_index]);
            this.AddChild( m_view );
            this.AddChild( m_toggle );

            m_view.Hide();

            m_view.UiStyle.Add("CMenu");

            m_toggle.ToggledChanged.Add( e =>{
                m_view.SetVisible( e.toggled );
            });
            m_view.CurrentIndexChanged.Add( e =>{
                m_view.Hide( );
                m_toggle.SetText( e.item.Text());
                m_toggle.Toggle();
            });

        };

        this.Init();


    }


    CComboBox.New = function( list ){
        return new CComboBox(list);
    };

    return CComboBox;
});