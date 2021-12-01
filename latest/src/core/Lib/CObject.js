qPack("CObject",function(){
    function CObject( name, objectType ){
        var m_fields ={
            objectName:"String",
            objectType:"String"
        };

        INIT_PROPERTIES(this,m_fields);

        this.Init = function(){
            this.SetObjectName( name );
            this.SetObjectType( objectType );
        };

        this.Init();
    }

    return CObject;
});