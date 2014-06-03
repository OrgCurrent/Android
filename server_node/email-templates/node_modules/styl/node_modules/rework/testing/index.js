
var rework = require('..');
var fs = require('fs');
var str = fs.readFileSync('testing/index.css', 'utf8');

var vendors = ['-ms-', '-moz-', '-webkit-'];

function displayFlex(val) {
  if ('flex' == val) {
    return {
      display: [
        '-webkit-flex',
        '-moz-flex',
        'flex'
      ]
    }
  }

  return {
    display: val
  }
}

function displayInlineFlex(val) {
  if ('inline-flex' == val) {
    return {
      display: [
        '-webkit-inline-flex',
        '-moz-inline-flex',
        'inline-flex'
      ]
    }
  }

  return {
    display: val
  }
}

str = rework(str)
  // .use(rework.prefixSelector(''))
  .use(rework.mixin({ display: displayFlex }))
  .use(rework.mixin({ display: displayInlineFlex }))
  .toString();

console.log(str);

