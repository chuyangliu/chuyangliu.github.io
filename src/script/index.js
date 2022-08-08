function setButtonState(button, state) {
  if (state) {
    button.removeAttr('disabled');
  } else {
    button.attr('disabled', 'disabled');
  }
}

function startProgressDisplay(output) {
  return setInterval(() => {
    output.append('.');
  }, 300);
}

function stopProgressDisplay(progressDisplay) {
  clearInterval(progressDisplay);
}

function execute() {
  const input = $('input#command');
  const output = $('samp#output');
  const btn = $('button#run');
  const cmd = $.trim(input.val());

  input.val('');
  output.text('');
  setButtonState(btn, false);

  if (cmd === '') {
    output.append('You sent nothing to run. Please try again.');
    setButtonState(btn, true);
    return;
  }

  output.append(`> ${cmd}<br>`);
  const progressDisplay = startProgressDisplay(output);

  $.ajax({
    url: 'http://localhost:9017',
    method: 'POST',
    data: {
      command: cmd,
    },
    timeout: 10000,
    converters: {
      '* text': window.String,
      'text html': window.String,
      'text json': window.String,
      'text xml': window.String,
    },
  }).done((resp) => {
    stopProgressDisplay(progressDisplay);
    output.append(`<br>${resp}`);
  }).fail((xhr, status, error) => {
    stopProgressDisplay(progressDisplay);
    output.append('<br>Server is temporarily unavailable. Please try again later.');
    output.append(`<br>Status=${status}, Error=${error}, Details=${xhr.responseText}`);
  }).always(() => {
    setButtonState(btn, true);
  });
}

$(() => {
  $('form').submit((event) => {
    execute();
    event.preventDefault();
  });
});
