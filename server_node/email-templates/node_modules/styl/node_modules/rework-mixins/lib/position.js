
/**
 * Positions.
 */

var positions = {
  top: true,
  left: true,
  right: true,
  bottom: true
};

/**
 * Return a mixin for the given position `type`.
 *
 * @param {String} type
 * @return {Function}
 * @api private
 */

module.exports = function(type){
  return function(str){
    var val;
    var pos;
    var ret = {};
    var vals = str.split(/\s+/);

    ret.position = type;

    for (var i = 0; i < vals.length; ++i) {
      val = vals[i];
      if (positions[val]) {
        pos = val;
        ret[pos] = '0';
      } else {
        ret[pos] = val;
      }
    }

    return ret;
  };
}
