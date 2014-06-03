/**
 * size: 100px 50px
 */

module.exports = function(sizes) {
  sizes = sizes.split(/\s+/);
  if ( sizes.length == 1 ) sizes[1] = sizes[0];

  return {
    width:  sizes[0],
    height: sizes[1]
  };
};
