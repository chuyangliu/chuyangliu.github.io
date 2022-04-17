/* global hljs */

if (typeof hljs !== 'undefined') {
  hljs.highlightAll();
}

$(() => {
  $('img').addClass('img-responsive center-block');
  $('table').addClass('table table-bordered');
});
