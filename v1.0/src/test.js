let testCount = 1;
const test = ( title,expected, result )=>{
  if( expect( expected, result ))
    console.log(testCount++, "passed", title);
  else
    console.log( testCount++, "failed", title, "expected:",expected, ", got:", result);
}

const expect = ( result, value )=>{
  return value === result;
}
