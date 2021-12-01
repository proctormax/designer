let fills = (function($){

  const none = ( target )=>{
    $(target).style.backgroundColor = "none";
  };
  const inherit = ( target )=>{
    $(target).style.backgroundColor = "inherit";
  };
  const transparent = ( target )=>{
    $(target).style.backgroundColor = "transparent";
  };
  const solid = ( target, color )=>{
    $(target).style.backgroundColor = color;
  };
  const linear = ( target, colors )=>{
    $(target).style.backgroundColor = `linear-gradient(to,from,color-stop)`;
  };
  const radial = ( target, colors )=>{
    $(target).style.backgroundColor = `radial-gradient(to,from,color-stop)`;
  };
  const conical = ( target, colors )=>{
    $(target).style.backgroundColor = `linear-gradient(to,from,color-stop)`;
  };

  return {none, inherit, transparent, solid, linear, radial, conical};
});
