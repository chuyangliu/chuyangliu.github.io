/* global hljs */
/* global onDomReady */

$(() => {
  if (window.location.protocol !== 'http:') {
    window.location.protocol = 'http:';
  }

  $('img').addClass('img-responsive center-block');
  $('table').addClass('table table-bordered');

  if (typeof hljs !== 'undefined') {
    hljs.highlightAll();
  }

  if (typeof onDomReady === 'function') {
    onDomReady();
  }
});
