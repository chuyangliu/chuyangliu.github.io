/* global hljs */

module.exports = (() => {
  const init = () => {
    $('img').addClass('img-responsive center-block');
    $('table').addClass('table table-bordered');

    if (typeof hljs !== 'undefined') {
      hljs.highlightAll();
    }
  };

  return {
    init,
  };
})();
