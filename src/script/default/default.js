/* global hljs */

if (typeof hljs !== 'undefined') {
  hljs.initHighlightingOnLoad();
}

$(() => {
  $('img').addClass('img-responsive center-block');
  $('table').addClass('table table-bordered');
});
