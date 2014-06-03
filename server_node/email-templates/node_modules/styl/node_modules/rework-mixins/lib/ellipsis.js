
/**
 * overflow: ellipsis
 */

module.exports = function(type) {
  if ('ellipsis' == type) {
    return {
      'white-space': 'nowrap',
      'overflow': 'hidden',
      'text-overflow': 'ellipsis'
    }
  }

  return {
    'overflow': type
  };
};
