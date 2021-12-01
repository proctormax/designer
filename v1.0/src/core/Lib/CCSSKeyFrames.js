qPack('CCSSKeyFrames',function(){
    function CCSSKeyFrames(name,from='',to=''){
        var _name = name, _from = from, _to = to;
        var _at = {};
        this.From = function( _val ){ _at['0%'] = _val; return this;};
        this.To = function( _val ){  _at['100%'] = _val; return this;};
        this.Get = function(percent){ return _at[percent+'%']; };
        this.At = function(percent, rule){ _at[percent+'%'] = rule; return this;};
        this.Name = function(){ return _name; };
        this.SetName = function( _val ){ _name = _val; return this; };
    }
    CCSSKeyFrames.New = function(name,from,to){ return new CCSSKeyFrames(name,from,to);};
    return CCSSKeyFrames;
});