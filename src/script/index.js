const SERVER_ENDPOINT = 'http://bstbst.westus.cloudapp.azure.com:9017';
const MSG_UNREACHABLE = 'I\'m undergoing maintenance right now. Please try again later.';

function print(output, msg) {
  output.append(msg.replaceAll('\r', '').replaceAll('\n', '<br>'));
}

function printLn(output, msg) {
  print(output, `${msg}<br>`);
}

function setButtonState(button, state) {
  if (state) {
    button.removeAttr('disabled');
  } else {
    button.attr('disabled', 'disabled');
  }
}

function execute() {
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
}

// Add the method explicitly to global scope to silence eslint
this.onDomReady = () => {
  if (window.location.protocol !== 'http:') {
    window.location.protocol = 'http:';
  }

  $('form').submit((event) => {
    execute();
    event.preventDefault();
  });
};
