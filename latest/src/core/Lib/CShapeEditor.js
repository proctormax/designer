qPack("CShapeEditor",function(){
    const CShape = qRequire("CShape");
    const CPane  = qRquire("CPane");

    function CShapeEditor( title,  type ){

    };
    // OrganizeEditor
    // AppearanceEditor
    // FillsEditor
    // StrokeEditor
    // EffectsEditor
    function CNumberEdit(property_name,enabled=true, value=0, unit = 'pt'){
        this.Value = function(){
            return _value;
        };
        this.SetValue = function( value ){
            _value = value;

            this.ValueChanged.Set("value",value );
        };

    }
    function CRangeEdit(property_name, enabled=true, max=1, min=0, value=0, step=0.1){
        var _max;
        var _min;
        var _step;
        var _value;
        var _percent;
        this.Max = function(){
            return _max;
        };
        this.SetMax = function(value){
            _max = value;
        };
        this.Min = function(){
            return _min;
        };
        this.SetMin = function(value){
            _min = value;
        };

        this.Increment = function(){
            if( _value < _max ){
                _value += _step;
            }
        };
        this.Decrement = function(){
            if( _value > _min ){
                _value -= _step;
            }
        };
        this.SetValue = function(value){
            _percent = value / _max * 100;
        };
        this.Value = function(){
            return _percent * 0.01 * _max;
        };
        
    }
    const Size = {
        Width: new CNumberEdit("SizeWidth",false,0),
        Depth: new CNumberEdit("SizeDepth",false,0),
        Height: new CNumberEdit("SizeHeight",false,0),
    }
    const Position = {
        X: new CNumberEdit("PositionX",false,0),
        Y: new CNumberEdit("PositionY",false,0),
        Z: new CNumberEdit("PositionZ",false,0),
    }
    const Rotation = {
        X:new CRangeEdit("RotationX",true,360,0,0,1),
        Y:new CRangeEdit("RotationY",true,360,0,0,1),
        Z:new CRangeEdit("RotationZ",true,360,0,0,1),
    }
    const Skew = {
        X: new CNumberEdit("SkewX",false,0),
        Y: new CNumberEdit("SkewY",false,0),
        Z: new CNumberEdit("SkewZ",false,0),
    }
    const Scale = {
        X: new CNumberEdit("ScaleX",false,0),
        Y: new CNumberEdit("ScaleY",false,0),
        Z: new CNumberEdit("ScaleZ",false,0),
    }

     const TransformEditor = {
         Position,
         Size,
         Rotation,
         Skew,
         Scale
     }

     OnItemSelected( item =>{
        switch (item.ObjectType) {
            case "CShape":
                // Size
                TransformEditor.Size.Height.SetValue( item.Width )
                TransformEditor.Size.Width.SetValue( item.Height )

                // Position
                TransformEditor.Position.X.SetValue( item.Transform.Position.X );
                TransformEditor.Position.Y.SetValue( item.Transform.Position.Y );
                TransformEditor.Position.Z.SetValue( item.Transform.Position.Z );
                
                // Rotation
                TransformEditor.Rotation.X.SetValue( item.Transform.Rotation.X );
                TransformEditor.Rotation.Y.SetValue( item.Transform.Rotation.Y );
                TransformEditor.Rotation.Z.SetValue( item.Transform.Rotation.Z );

                // Skew
                TransformEditor.Skew.X.SetValue( item.Transform.Skew.X );
                TransformEditor.Skew.Y.SetValue( item.Transform.Skew.Y );
                TransformEditor.Skew.Z.SetValue( item.Transform.Skew.Z );

                // Skew
                TransformEditor.Skew.X.SetValue( item.Transform.Skew.X );
                TransformEditor.Skew.Y.SetValue( item.Transform.Skew.Y );
                TransformEditor.Skew.Z.SetValue( item.Transform.Skew.Z );

                // Scale
                TransformEditor.Scale.X.SetValue( item.Transform.Scale.X );
                TransformEditor.Scale.Y.SetValue( item.Transform.Scale.Y );
                TransformEditor.Scale.Z.SetValue( item.Transform.Scale.Z );
                break;
        
            default:
                break;
        }
     })

     

    return CShapeEditor;
});