function CSelection( list, AnItemIsDeselected, AnItemIsSelected, MultipleSelectionOcurred ){
    var _selected = [];
    var _items = list;
    var _rect;
    var _bSelectionEnabled = true;

    this.Count = function(){ return _selected.length; }
    this.IsEmpty = function(){ return this.Count() === 0; }
    this.Exists = function(){ return !this.IsEmpty(); }
    
    this.ContainsThis = function(item){
      return _selected.indexOf(item)>=0;
    };

    /**
     * 
     */
    this.SelectMany = function(item, bClear=false){
      if(bClear)this.Clear();
      if(this.ContainsThis(item))return this.RemoveThis(item);
      _selected.push(item);
    
      MultipleSelectionOcurred( _selected );
      AnItemIsSelected(item);
    };

    /**
     * 
     */
    this.SelectOne = function(item){
      this.Clear();
      _selected.push(item);
    
      AnItemIsSelected(item);
    };

    /**
     * 
     */
    this.SelectAll = function(){
      this.Clear();
      return this.SelectList(ItemList());
    };

    /**
     * 
     */
    this.SelectList = function( list,clear=false ){
      if(clear)this.Clear();
      for( var i=0;i<list.length;i++){
        this.SelectMany(list[i]);
      }
    };

    /**
     * 
     */
    this.RemoveThis = function(item){
      _selected.splice(_selected.indexOf(item),1);
      AnItemIsDeselected(item);
    };

    /**
     * 
     */
    this.ForEach = function(callback){
      for(var i=0;i<this.Count();i++){
        callback(_selected[i]);
      }
    };

    /**
     * Returns the first selected item if any.
     */
    this.FirstItem = function(){
      if(!this.Exists()) return null;
      return _selected[0];
    };

    /**
     * Returns the last selected item.
     */
    this.LastItem = function(){
      if(!this.Exists()) return null;
      return _selected[this.Count()-1];
    };

    /**
     * Clears the selection.
     */    
    this.Clear = function(){
      while( this.Exists() ){
        this.RemoveThis(this.LastItem());
      }
    };

    /**
     * Inverts the selection.
     */
    this.Invert = function(){
      if(this.IsEmpty()) return;
      var list = [];
      for(var i=0;i<ItemList().length;i++)
      {
        item = ItemList()[i];
        if(!this.ContainsThis(item)) list.push(item);
      }
      this.Clear();
      this.SelectList(list);
    };

    /**
     * 
     */
    this.Rect = function(){
      if(!_rect){
         _rect = CWidget.New('div','absolute selectionRect stroke-thin border-dashed' );
        //Get('.view1').appendChild(_rect.DC());
        console.log( "Initiated selection.");
      }
      return _rect;
    };

    /**
     * 
     */
    this.DrawRect = function(r){
      Geom.SetRect( this.Rect(), r);
    };

    /**
     * 
     */
    this.AutoFitRect = function(){
      if(this.Enabled())
      this.DrawRect( this.Bound() );
    };

    /**
     * 
     */
    
    this.DrawMouseRect = function(){    
      this.DrawRect( mouse.rect );
    };

    /**
     * 
     */
    this.Bound = function(){ return GetWidgetsBound(_selected); }
    this.Enabled = function(){ return _bSelectionEnabled === true; }
    this.SetEnabled = function( enable ){  _bSelectionEnabled = enable; }
    this.Disable = function( ){ this.SetEnabled(false); }
    this.Enable = function( ){ this.SetEnabled(true); }


    ///////////////// PRIVATE
    
  function GetWidgetsBound(list,tweak=2){
    var R = [0,0,0,0,0,0];
    if(list.length<1)return R;
    R = Geom.GetRect(list[0]);
    for( var i=1; i<list.length;i++){
      var r = Geom.GetRect(list[i]);

      R[0] = Math.min(R[0],r[0]);
      R[1] = Math.min(R[1],r[1]);
      R[2] = Math.max(R[2],r[2]);
      R[3] = Math.max(R[3],r[3]);
      R[4] = Math.max(R[4],r[4]);
      R[5] = Math.max(R[5],r[5]);

    };

    /**
     * 
     */

    R[2]  = R[4]-R[0];
    R[3]  = R[5]-R[1];
    R[1]  += tweak;

    return R;
  }

  function ItemList(){
    return _items;
  }
}