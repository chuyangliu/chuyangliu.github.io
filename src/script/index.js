const SERVER_ENDPOINT = 'https://chuyangliu.top/bastion';
const MSG_UNREACHABLE = 'I\'m undergoing maintenance right now. Please try again later.';
const TIMEOUT = 60000;

const common = require('./common');

const execute = () => {
  const input = $('input#command');
  const output = $('samp#output');

  const print = (msg, clear = false, newline = false) => {
    if (clear) {
      output.text('');
    }
    output.append(msg.replaceAll('\r', '').replaceAll('\n', '<br>'));
    if (newline) {
      output.append('<br>');
    }
  };

  const disableInput = () => {
    input.val('');
    input.attr('disabled', 'disabled');
  };

  const enableInput = () => {
    input.removeAttr('disabled');
    input.focus();
  };

  const cmd = input.val().trim();
  disableInput();
  print(cmd.length <= 0 ? '> (empty)' : `> ${cmd}`, true, true);

  setTimeout(() => {
    $.ajax({
      url: SERVER_ENDPOINT,
      method: 'POST',
      contentType: 'text/plain; charset=utf-8',
      data: cmd,
      timeout: TIMEOUT,
    }).done((resp) => {
      print(resp);
    }).fail(() => {
      print(MSG_UNREACHABLE);
    }).always(() => {
      enableInput();
    });
  }, 1000);
};

$(() => {
  common.init();

  $('form').submit((event) => {
    execute();
    event.preventDefault();
  });
});
