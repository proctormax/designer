qPack("IPropertyEdit",function(){
    const CShape = qRequire("CShape");
    const CPane  = qRquire("CPane");

    function IPropertyEdit( title,  type, layout ){
        var _setter;
        var _getter;
        Object.defineProperty(this,"Setter",{
            get:()=>{
                return _setter;
            },
            set:( value )=>{
                _setter = value;
            }
        });

        Object.defineProperty(this,"Getter",{
            get:()=>{
                return _getter;
            },
            set:( value )=>{
                _getter = value;
            }
        });
    };
    // OrganizeEditor
    // AppearanceEditor
    // FillsEditor
    // StrokeEditor
    // EffectsEditor

    return IPropertyEdit;
});