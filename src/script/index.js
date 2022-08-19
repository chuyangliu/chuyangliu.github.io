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
  const cmd = input.val();

  input.val('');
  output.text('');
  setButtonState(btn, false);

  output.append(`> ${cmd}<br>`);
  const progressDisplay = startProgressDisplay(output);

  setTimeout(() => {
    $.ajax({
      url: 'http://localhost:9017',
      method: 'POST',
      data: {
        command: cmd,
      },
      timeout: 5000,
      converters: {
        '* text': window.String,
        'text html': window.String,
        'text json': window.String,
        'text xml': window.String,
      },
    }).done((resp) => {
      stopProgressDisplay(progressDisplay);
      output.append(`<br>${resp}`);
    }).fail(() => {
      stopProgressDisplay(progressDisplay);
      output.append('<br>I\'m undergoing maintenance right now. Please try again later.');
    }).always(() => {
      setButtonState(btn, true);
    });
  }, 1000);
}

$(() => {
  if (location.protocol !== "http:") {
    location.protocol = "http:";
  }

  $('form').submit((event) => {
    execute();
    event.preventDefault();
  });
});
