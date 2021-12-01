
/***
 * UIMenu
 * Menu widget for use in menu bars, context menus, and other popup menus
 * CMenuItemEdit
 * CMenuItemView
 * CMenuItemFactory
**/

//qRequire( "CListView" );

exports = 
qPack("CMenu",function(){
    
    const CMenuItem = qRequire( "CMenuItem" );
    const CMenuItemContainer = qRequire( "CMenuItemContainer" );
    const CWidget = qRequire( "CWidget" );
    const CCSS = qRequire( "CCSS" );
    const CListView = qRequire( "CListView" );
	
	CCSS.New('CMenu')
	.Add('.CMenu',{
		'border-top':'solid 1px transparent',
		'border-bottom':'solid 1px #3939'
	})
    
    function CMenu(parent, title,icon=null){

        qExtend(this,CWidget,'div',"CMenu");
        var _ = {
        	title:title,
        	icon:icon,
            actions:{},
            listView: new QB.CListView(this)

        };

        this.Initialize = function(){
            _.listView.Initialize();
            CCSS.AddClass(this,"menu0");
            this.ui.appendChild(_.listView.ui);

        }

        this.Draw = function(){
        };

        function _GetActionText(title){
            return typeof title == "string" ? title : title.Text();
        }

        this.HasAction = function(title){
            return _.listView.HasItem(title);
        };
        this.Action    = function(title){
            return _.listView.Item(_GetActionText(title));
        };
        this.ActionAt   = function(pos){
            //return _.actions[title];
        };

        this.AddAction  = function(action,icon= null){
            var title   = _GetActionText(action);
            if(this.HasAction(title)) return this.Action( title );
            var act     = _.listView.Append(action,icon);
            act.ui.classList.add("menu-act");
            return act;
        };

        this.AddMenu = function(menu,icon=null){
            // this.AddAction( menu.Title() )
            // var wAct = QB.CWidgetAction(menu.Title(),menu.Icon())
            // act.SetMenu( menu );
            switch(qTypeOf(menu)){
                case "CMenu": // return res as an action
                res = this.AddAction(menu.Title(),menu.Icon());
                res.SetMenu(menu);
                return res;
                default:
                res = QB.CMenu.New(menu,icon);
                this.AddAction(menu,icon).SetMenu(menu);
                return res;
            }
        };

        this.AddSeparator = function(){
            var sep = qDOM("div","gui-separator-v");
            //var item = new QB.CListWidgetItem(sep);
            this.ui.appendChild(sep);
        };

        this.Initialize();
    };

    CMenu.New = function(parent=null,title="menu"){ return new CMenu(parent,title);};
    CMenu.Cast = function(menu){
        switch(TypeOf(menu)){
            case "CMenu": return menu;
            case "Object": return new CMenu(menu.parent,menu.title);
            case "String": return new CMenu(menu); // QB.CMenu.Cast("&File:");
        }
    };

    return CMenu;
});
