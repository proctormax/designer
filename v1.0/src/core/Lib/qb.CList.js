
/***
 * CVectorIterator
 * No documentation found.
**/

qPack("Util.Collection.CList",function()
{
	const CListIterator = qRequire("CListIterator");

	/*
 	* This is by far the most commonly used container class. It stores a list of values of a given type 
 	* (T) that can be accessed by index. Internally, the CList is implemented using an array, ensuring 
 	* that index-based access is very fast.
	* Items can be added at either end of the list using CList::Append() and CList::Prepend(), or they 
	* can be inserted in the middle using CList::Insert(). More than any other container class, CList is 
	* highly optimized to expand to as little code as possible in the executable. CStringList inherits 
	* from CList<String>.
	*
	*/

	/*
	*	@method Type:void
	*	@method Length:int
	*	@method Iterator:CListIterator
	*	@method Clear:void
	*	@method Elements:Array<T>
	*
	*/
	function CList(T, length = 0 )
	{
		var _ 			=
		{
			type  		:T,
			list 		: new Array(),
			it 			: new CListIterator(this)
		};
		/*
		* 
		**/
		this._Destruct = function(){

		};

		/*
		* 
		**/
		this.Type 		= function( ){ return _.type;};
		/*
		* 
		**/
		this.Length		= function( ){ return _.list.length; };
		this.Iterator	= function( ){ return _.it; };
		this.Clear 		= function( ){ while(_.list.length)_.list.pop(); return this;};
		this.Elements 	= function( ){ return _.list;};

		this.Append		= function( item ){
			qAssert(!qTypeOf(item,_.type),"List.Append - Error: type mismatch! ==> "+ qTypeOf(item)+" != "+ _.type.name  );
			_.list.push(item);
			return this;
		};
		this.Prepend	= function( item ){
			if(qTypeOf(item,_.type) ){
				_.list.unshift(item);
			}
			return this;
		};

		this.Insert   = function(index,item){
			qAssert(qTypeOf(item,_.type),"List.Append - Error: type mismatch! ==> "+ qTypeOf(item)+" != "+ _.type.name );
			_.list.splice(index,0,item);
			return this;
		};

		this.IndexOf 	= function(item,from=-1){ 
			return _.list.indexOf(item,from);
		};

		this.LastIndexOf 	= function(item,from=-1){ 
			return _.list.lastIndexOf(item,from);
		};

		this.Contains 	= function(item){
			return _.list.indexOf(item) > -1;
		};

		this.Add  		= function(item ){
			// debug.Validate(item,"@Add");
			return this.Append(item);
		};

		this.Remove 	= function( item ){
			if(qTypeOf(item,_.type) ){
				var i 	= _.list.indexOf(item);
				if( i >= 0)
				_.list.splice(i,1);
			}
			return this;
		};
		this.RemoveAt 	= function( index,count=1 ){
			
			qAssert( this.Count() > index+Math.abs(count) );
			if(index < 0) index = this.Count() + index ;
			_.list.splice(index,count);
			
			return this;
		};
		this.Splice 	= function(index,count){
			return this.RemoveAt(index,count);
		};

		this.Pop 		= function(){
			return _.list.pop();
		};

		this.Unshift 	= function(item){
			return this.Prepend(item);
		};
		this.Push 		= function(item){
			return this.Append(item);
		};

		this.Get 		= function( index ){return _.list[index];};
		this.Set 		= function( index,item ){
			qAssert(qTypeOf(item,_.type),"List.Append - Error: type mismatch!" );
			if(qTypeOf(item,_.type))_.list[index] = item;			
			return this;
		};

		this.Reverse  	= function(){
			_.list.reverse();
		};

		this.Call 		= function( callback, args=null ){
			for( var i=0; i < this.Length(); i++ ){
				if(args && args.length){
					var index = args.indexOf("%i");
					args[index] = _.list[i];
					callback.apply(null,args);
				}
				else
					callback(_.list[i]);
			}
		};
	}


	CList.New = function(type){ return new CList(type); };
	
	return CList;

});

