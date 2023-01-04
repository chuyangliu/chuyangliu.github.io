/* global hljs */
/* global onDomReady */

$(() => {
  $('img').addClass('img-responsive center-block');
  $('table').addClass('table table-bordered');

  if (typeof hljs !== 'undefined') {
    hljs.highlightAll();
  }

  if (typeof onDomReady === 'function') {
    onDomReady();
  }
});
