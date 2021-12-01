
/***
 * CListIterator
 * Read-Only iterator for CList and CQueue containers.
**/
qPack("qb.core.containers.CListIterator",function(){

	function CListIterator(list)
	{
		var _pos 		= 0;		
		this.Valid		= function( ){ return list.Length() > _pos;};
		this.HasNext	= function( steps=1 ){ return (list.Length() > _pos+steps) && (_pos+steps >= 0); };
		this.Ptr		= function( ){	return this.Valid()? list[_pos]:null;};
		this.Next 		= function( steps=1 ){ steps = Int(steps); if(this.HasNext(steps))_pos += steps;	return this;};
		this.Position	= function( ){ return _pos;};
		this.AtEnd 		= function( ){  _pos === list.Length() - 1;};
		this.AtStart 	= function( ){  _pos === 0;};
		this.ToBack		= function( ){ _pos= Math.max(list.Length()-1,0); return this;};
		this.ToFront	= function( ){ _pos= 0; return this;};
		this.FindPrevious = function( val ){
			return list.LastIndexOf(val,this.Position()) > -1;
		};
	}
	CListIterator.New  	= function(list){
		return new CListIterator(list);
	};
	return CListIterator;

});