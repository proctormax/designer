let colors = (function($){

  const rgb = (  r, g, b )=>{
    return `rgb(${r},${r},${b})`;
  };
  const hsl = (  h, s, l )=>{
    return `hsl(${h},${s},${l})`;
  };
  const rgba = (  r, g, b, a )=>{
    return `rgb(${r},${r},${b},${a})`;
  };
  const hsla = (  h, s, l, a )=>{
    return `hsl(${h},${s},${l},${a})`;
  };

  return { rgb, hsl, rgba, hsla};
});
