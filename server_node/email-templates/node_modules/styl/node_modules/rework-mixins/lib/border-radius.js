
/**
 * Positions.
 */

var position = {
  top: true,
  left: true,
  right: true,
  bottom: true
};

/**
 * border-radius: 5px
 * border-radius: 5px 10px
 * border-radius: top 5px
 * border-radius: top 5px left 10px
 */

module.exports = function(str){
  var vals = str.split(/\s+/);
  var pos;
  var ret;

  for (var i = 0; i < vals.length; ++i) {
    var val = vals[i];
    if (!position[val]) continue;
    ret = ret || {};
    pos = val;
    val = vals[++i];
    switch (pos) {
      case 'top':
      case 'bottom':
        ret['border-' + pos + '-left-radius'] = val;
        ret['border-' + pos + '-right-radius'] = val;
        break;
      case 'left':
      case 'right':
        ret['border-top-' + pos + '-radius'] = val;
        ret['border-bottom-' + pos + '-radius'] = val;
        break;
    }
  }

  if (!ret) {
    return {
      'border-radius': str
    }
  }

  return ret;
};
