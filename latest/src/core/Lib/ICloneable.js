qPack("ICloneable", function(){

    function ICloneable( ){
    }

    ICloneable.prototype.DeepCopy = function(){
        throw new Error("IClonabe::DeepCopy not implemented");
    };
    ICloneable.prototype.ShallowCopy = function(){
        throw new Error("IClonabe::ShallowCopy not implemented");        
    };

    ICloneable.New = function(  ){
        return new ICloneable( );
    }

    return ICloneable;
});