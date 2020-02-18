const amenities = [];
function oneArray (amenities) {
  $('.amenities H4').text(amenities.join(', '));
}

function deleteThis (data, list) {
  for (let i = 0; i < list.length; i++) {
    if (list[i] === data) {
      list.splice(i, 1);
    }
  }
}

function init () {
  $('.amenities input').on('change', function () {
    const checkObject = $(this)[0].checked;
    if (checkObject === true) {
      amenities.push($(this).data('name'));
    } else {
      deleteThis($(this).data('name'), amenities);
    }
    oneArray(amenities);
  });

  const url = 'http://0.0.0.0:5001/api/v1/status/';
  $.ajax({ url: url })
    .done(function (data) {
      $('DIV#api_status').addClass('available');
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      $('DIV#api_status').removeClass('available');
    });
}

$(document).ready(init);
