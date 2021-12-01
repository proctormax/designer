let effects = (function($){
  let exports = {};
  exports.fill = ( target, color )=>{
    $(target).style.backgroundColor = color;
  };
  exports.stroke = ( target, color )=>{
    $(target).style.borderColor = color;
  };
  exports.font = ( target, color )=>{
    $(target).style.color = color;
  };
  exports.blur = ( target, color, bx=2, by=0, spread=15 )=>{
    $(target).style.boxShadow = `${bx+" "+by+" "+spread+""+ color}`;
  };
  exports.dropShadow = ( target, color, bx, by, spread )=>{
    $(target).style.boxShadow = `${bx+" "+by+" "+spread+""+ color}`;
  };
  exports.innerGlow = ( target, color, bx, by, spread )=>{
    $(target).style.boxShadow = `${bx+" "+by+" "+spread+""+ color}`;
  };

  exports.gaussianBlur = ( target, radius, preserveAlpha=false )=>{
    $(target);
  };
  exports.outerGlow = ( target, color, opacity, radius, offset, angle )=>{
    $(target);
  };
  exports.innerGlow = ( target, color, opacity, radius, offset, angle  )=>{
    $(target);
  };
  exports.outerShadow = ( target, color, opacity, radius )=>{
    $(target);
  };
  exports.innerShadow = ( target, color, opacity, radius )=>{
    $(target);
  };
  exports.outline = ( target, color, opacity, radius )=>{
    $(target);
  };
  exports._3d = ( target, opacity, radius )=>{
    $(target);
  };
  exports.emboss = ( target, opacity, radius )=>{
    $(target);
  };
  exports.colorOverlay = ( target )=>{
    $(target);
  };
  exports.gradientOverlay = ( target )=>{
    $(target);
  };
  return exports;
});
