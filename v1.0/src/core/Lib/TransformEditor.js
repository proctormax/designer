qPack("CShapeEditor",function(){
    const CShape    = qRequire("CShape");
    const CPane     = qRequire("CPane");
    const CAction   = qRequire("CAction");
    const CNumberEdit   = qRequire("CNumberEdit");
    const CRangeEdit   = qRequire("CRangeEdit");
    const IPropertyEdit = qRequire("IPropertyEdit");

    function CShapeEditor( title,  type ){
        qExtend(this,IPropertyEdit,title,type);
        var _target = {};

    };

    /**
     * var posX_edit = new CPropertyEdit("x","Number");
     * pX_edit.Target = box;
     * pX_edit.SetValue(10)
     * pX_edit.Setter = ( value )=>{ target.X = value; }
     * pX_edit.Getter = ( )=>{ return target.X; }
     * 
     * rx_edit = new CPropertyEdit("X Rotation");
     * ry_edit = new CPropertyEdit("Y Rotation");
     */
    
    const Size = {
        Width: new CNumberEdit("SizeWidth",false,0),
        Depth: new CNumberEdit("SizeDepth",false,0),
        Height: new CNumberEdit("SizeHeight",false,0)
    };

    const Position = {
        X: new CNumberEdit("PositionX",false,0),
        Y: new CNumberEdit("PositionY",false,0),
        Z: new CNumberEdit("PositionZ",false,0)
    };

    const Rotation = {
        X:new CRangeEdit("RotationX",true,360,0,0,1),
        Y:new CRangeEdit("RotationY",true,360,0,0,1),
        Z:new CRangeEdit("RotationZ",true,360,0,0,1)
    };

    const Skew = {
        X: new CNumberEdit("SkewX",false,0),
        Y: new CNumberEdit("SkewY",false,0),
        Z: new CNumberEdit("SkewZ",false,0)
    };

    const Scale = {
        X: new CNumberEdit("ScaleX",false,0),
        Y: new CNumberEdit("ScaleY",false,0),
        Z: new CNumberEdit("ScaleZ",false,0)
    };

     const TransformEditor = {
         Position,
         Size,
         Rotation,
         Skew,
         Scale
     };

     sandbox.Connect("OnItemSelected", item =>{
        switch (item.ObjectType) {
            case "CShape":
                // Size
                TransformEditor.Size.Height.SetValue( item.Width );
                TransformEditor.Size.Width.SetValue( item.Height );

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

                // Scale
                TransformEditor.Scale.X.SetValue( item.Transform.Scale.X );
                TransformEditor.Scale.Y.SetValue( item.Transform.Scale.Y );
                TransformEditor.Scale.Z.SetValue( item.Transform.Scale.Z );
                break;
        
            default:
                break;
        }
     });

     sandbox.Connect("OnItemMoved", item =>{
         TransformEditor.Position.X.SetValue( item.Transform.Position.X );
         TransformEditor.Position.Y.SetValue( item.Transform.Position.Y );
         TransformEditor.Position.Z.SetValue( item.Transform.Position.Z );
     });


     sandbox.commands.RegisterCommand("transform.SetRotationX", (item, value)=>{
        item.Transform.Rotation.X.SetValue(value);
     });

     sandbox.commands.RegisterCommand("transform.SetRotationY", (item, value)=>{
        item.Transform.Rotation.Y.SetValue(value);
     });

     const actions = {};

     actions.x_pos = new CAction();
     actions.y_pos = new CAction();
     actions.Z_pos = new CAction();

     actions.rotateX = new CAction();
     actions.rotateY = new CAction();
     actions.rotateZ = new CAction();

     actions.rotateX.SetIcon("icons/rotation-x");
     actions.rotateX.SetCommand( TransformEditor.Position.X.SetValue );
     const move_x = new CAction();
     move_x.SetTriggerGesture(Gesture.MouseClick);
     move_x.Triggered.Connect( TransformEditor.Position.X.SetValue );


    return CShapeEditor;
});

/// shell $:for $i in selection: rotateX $i 40deg  