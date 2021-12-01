let gradients = (function($){
  let exports = {};
  exports.fill = ( target, color )=>{
    $(target).style.backgroundColor = color;
  };
  exports.stroke = ( target, color )=>{
    $(target).style.borderColor = color;
  };
  exports.text = ( target, color )=>{
    $(target).style.color = color;
  };
  return exports;
});
