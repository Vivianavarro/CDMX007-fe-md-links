const mdLinks = require('../index');

test('links1 + link2 to equal 2',()=>{
  expect(mdLinks.scan(1,1)).toBe(2);
});


