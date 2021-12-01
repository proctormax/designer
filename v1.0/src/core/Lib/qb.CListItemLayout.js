
/***
* Hikestone Inc
**/
qRequire("CAction");
qRequire("CWidget");
qRequire("CVBoxLayout");
exports = 
qPackage("path.CListItemLayout",(function(){
    function CListItemLayout( arg ){
        
        QB.CWidget.ExtendTo(this,['div',"CListItemLayout"]);
        var  _ =
        {
                icon: null,
                label: new QB.CLabel(this,text),
                data: null
        };

        if(_.icon )this.ui.appendChild(_.icon.ui );
        this.ui.appendChild(_.label.ui);

        this.Text = function(){ return _.label.Text();};
        this.SetText = function(txt){ _.label.SetText(txt); };

        this.Icon = function(){ return _.icon; };
        this.SetIcon = function(icon){
            // _.icon.SetSource(QB.CIcon.Cast(icon).Source());
        };

        this.SetData = function(data){
            _.data = data;
        };
        this.Data = function(){
            return _.data;
        };
        this.SetIconVisible = function( visible ){
            // if(_.icon) _.icon.SetVisible(visible);
        };
    }
    construct__(CListItemLayout,"void",function(){
        return new CListItemLayout('');
    });
    CListItemLayout.Cast=function(other){ 
        return new CListItemLayout(other);
    };

    return CListItemLayout;
})());