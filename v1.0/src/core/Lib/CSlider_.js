qPack("CSlider",function() {
    const CWidget   = qRequire("CWidget");
    const CLabel   = qRequire("CLabel");
    const CCSS      = qRequire("CCSS");
    const qPercent  = qRequire("CMath").qPercent;
    const qFloat  = qRequire("CMath").qFloat;

    CCSS.New("CSlider")
    .Add(".slider",{
        "position":"absolute",
        "display":"block",
        //"width":"auto",
        //"height":"auto",
    })
    .Add(".slider-range",{
        "position":"absolute",
        "display":"block"
    })
    .Add(".slider-range.size-w-full",{
        "width":"100%"
    })
    .Add(".slider-range.size-h-full",{
        "height":"100%"
    })
    .Add(".slider-spindle",{
        "position":"absolute",
        "display":"block"
    })

    function CSlider(mode = 0, total = 180, range = 20, length = 100, thickness = 20) {
        qExtend(this,CWidget,'div', 'slider');
      mode = parseInt(mode);
      mode = mode > 1 ? 1 : mode;
      var _ = {
        labelUI: new CWidget('span', 'block'),
        isDown: false,
        modes: ['width', 'height'],
        mode: mode,
        change: 0,
        mode2: mode == 1 ? 0 : 1,
        rangeUI:  new CWidget('span', 'slider-range'),
        handleUI: new CWidget('div', 'slider-handle'),
        range: range,
        total: total,
        val: 0,
        length: length,
        mLength: 0,
        thickness: thickness,
        this: this
      };
      this.Render = function() {
        _.mode2 = _.mode == 1 ? 0 : 1;
        CCSS.Set(this, _.modes[_.mode], _.length + 'px');
        CCSS.Set(this, _.modes[_.mode2], _.thickness + 'px');
        CCSS.Set(_.rangeUI, _.modes[_.mode2], _.thickness + 'px');
        CCSS.Set(_.rangeUI, _.modes[_.mode], qPercent(_.range, _.length) + 'px');
        CCSS.Switch(_.rangeUI,(_.mode2==0?'size-h-full':'size-w-full'),(_.mode2==1?'size-w-full':'size-h-full'));
      };
  
      this.AddChild(_.rangeUI);
      this.AddChild(_.labelUI);
      this.SetText = function(txt) {
        _.labelUI.DC().textContent = txt;
      };
      this.Text = function() {
        return _.labelUI.DC().textContent;
      };
      this.OnValueChanged = function(e) {};
      this.SetRange = function(n) {
        _.range = Math.min(qFloat(n), 100);
        CCSS.Set(_.rangeUI, _.modes[_.mode], qPercent(_.range, _.length) + 'px');
        _.change = qPercent(_.range, _.total);
        this.SetText(_.range +'%');
        this.OnValueChanged(_.range);
      };
      this.Range = function() {
        return _.range;
      };
  
      this.SetTotal = function(n) {
        _.total = qFloat(n);
        this.OnValueChanged(_.range);
      };
      this.Total = function() {
        return _.total;
      };
      this.Value = function() {
        return qPercent(_.range, _.total);
      };
      this.SetValue = function(n) {
        n = Math.min(qFloat(n), _.total);
        this.SetRange(qPercent(0, _.total, n));
        this.OnValueChanged(n);
      }
      this.SetLength = function(l) {
        l = qFloat(l);
        _.length = l;
        this.Render();
        this.OnValueChanged(_.mode);
      };
      this.Length = function() {
        return _.length;
      };
      this.SetThickness = function(val) {
        val = qFloat(val);
        _.thickness = val;
        this.Render();
      };
      this.SetMode = function(m) {
        _.mode = Math.max(0, Math.min(m, 1));
        this.Render();
        this.OnValueChanged(_.mode);
      };
      this.Mode = function() {
        return _.mode;
      };
      this.Thickness = function() {
        return _.thickness;
      };
      this.MouseLeaveEvent = function(e) {
        //_.isDown = false;
      };
      this.MouseMoveEvent = function(e) {
        if (_.isDown) {
  
          _.mLength = _.mode == 0 ?
            e.x - _.this.Pos().x :
            e.y - _.this.Pos().y;
          // _.this.SetValue(v);
          _.percent= qPercent(0, _.length, _.mLength);
          _.this.SetRange(_.percent);
        }
      };
      this.MousePressEvent = function(e) {
        console.log("Slider::Pressed");
        //if(!e.ctrlKey) return;
        _.isDown = true;
  
        _.mLength = _.mode == 0 ?
          e.x - _.this.Pos().x :
          e.y - _.this.Pos().y;
          _.percent= qPercent(0, _.length, _.mLength);
        _.this.SetRange(_.percent);
      };
      this.MouseReleaseEvent = function(e) {
        _.isDown = false;
      };
     const _InitEvents = function(){
        _.this.DC().addEventListener("mousedown",_.this.MousePressEvent);
        _.this.DC().addEventListener("mouseup",_.this.MouseReleaseEvent);
        _.this.DC().addEventListener("mousemove",_.this.MouseMoveEvent);
      }
      this.Init = function() {
        this.SetText("slider");
        _.labelUI.DC().mouseEnabled = false;
        this.SetRange(range);
        this.Render();
        _InitEvents();
        CCSS.Set(this, 'background-color', 'rgba(100,100,100,0.2)');
        CCSS.Set(this.RangeUI(), 'background-color', 'rgba(120,15,50,1)');
      };
      this.RangeUI = function() {
        return _.rangeUI;
      };
      this.Init();
      this.Clone = function(){
        var res = new CSlider(_.total,_.range,_.length,_.thickness);
        CCSS.Add(res,this.DC().classList.toString());
        return res;
      };
    };
    CSlider.HORIZONTAL = 0;
    CSlider.VERTICAL = 1;
  
    CSlider.New = function(total = 180, range = 20, length = 200, thickness = 20) {
      var res = new CSlider(CSlider.HORIZONTAL, total, range, length, thickness);
      return res;
    };
  
    return CSlider;
  });