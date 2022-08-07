function execute() {
  const input = $('input#command');
  const output = $('samp#output');
  const btn = $('button#run');
  const cmd = $.trim(input.val());

  input.val('');
  output.text('');

  if (cmd === '') {
    output.text('You sent nothing to run. Please try again.');
    return;
  }

  btn.attr('disabled', 'disabled');
  output.append(`> ${cmd}<br>`);

  var progressTimer = setInterval(() => {
    output.append(`.`);
  }, 500);

  setTimeout(() => {
    clearInterval(progressTimer);
    output.append(`<br>Haha<br>`);
    btn.removeAttr('disabled');
  }, 3000);
}

$(() => {
  $('form').submit((event) => {
    execute();
    event.preventDefault();
  });
});
