const common = require('./common');

const SERVER_ENDPOINT = 'https://chuyangliu.top/bastion';
const MSG_UNREACHABLE = 'I\'m undergoing maintenance right now. Please try again later.';

const print = (output, msg) => {
  output.append(msg.replaceAll('\r', '').replaceAll('\n', '<br>'));
};

const printLn = (output, msg) => {
  print(output, `${msg}<br>`);
};

const setButtonState = (button, state) => {
  if (state) {
    button.removeAttr('disabled');
  } else {
    button.attr('disabled', 'disabled');
  }
};

const execute = () => {
  const input = $('input#command');
  const output = $('samp#output');
  const btn = $('button#run');
  const cmd = input.val();

  input.val('');
  output.text('');
  setButtonState(btn, false);

  printLn(output, cmd.trim().length <= 0 ? '> (empty)' : `> ${cmd}`);

  setTimeout(() => {
    $.ajax({
      url: SERVER_ENDPOINT,
      method: 'POST',
      data: {
        command: cmd,
      },
      timeout: 3000,
      converters: {
        '* text': window.String,
        'text html': window.String,
        'text json': window.String,
        'text xml': window.String,
      },
    }).done((resp) => {
      print(output, resp);
    }).fail(() => {
      print(output, MSG_UNREACHABLE);
    }).always(() => {
      setButtonState(btn, true);
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
