let amenities = []
const url1 = 'http://0.0.0.0:5001/api/v1/';
function one_array(amenities) {
        $('.amenities H4').text(amenities.join(', '))
}

function deleteThis(data, list) {
    for (let i = 0; i < list.length; i++) {
        if (list[i] === data) {
            list.splice(i, 1)
        }
    }
}


function init() {
    $('.amenities input').on('change', function(){
    let check_object = $(this)[0].checked
        if (check_object === true){
            amenities.push($(this).data('name'))
        } else {
            deleteThis($(this).data('name'), amenities)
        }
        one_array(amenities)
    })

    const url = 'http://0.0.0.0:5001/api/v1/status/';
    $.ajax({ url: url })
    .done(function (data) {
        $('DIV#api_status').addClass('available')
    })
    .fail(function (error) {
    $('DIV#api_status').removeClass('available')
    });

    $.ajax({ url1: url })
        .done(function(data) {

        })



}



$(document).ready(init)


