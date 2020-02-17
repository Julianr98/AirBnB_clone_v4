let amenities = []
let amenitiesId = []
const url = 'http://0.0.0.0:5001/api/v1';

function htmlPlace(place) {
    // template
    const htmlstring =  [
    '<article>',
    '<div class="title">',
        `<h2>${place.name}<h2>`,
    '<div class="price_by_night">',
        `${place.price_by_night}`,
    '</div>',
    '</div>',
    '<div class="information">',
    '<div class="max_guest">',
    '<i class="fa fa-users fa-3x" aria-hidden="true"></i>',
        '<br />',
        `${place.number_rooms} Bedrooms`,
        '</div>',
        '<div class="number_bathrooms">',
        '<i class="fa fa-bath fa-3x" aria-hidden="true"></i>',
        '<br />',
        `${place.number_bathrooms} Bathroom`,
        '</div>',
        '</div>',
        '<div class="user">',
        '<strong>Owner</strong>',
        '</div>',
        '<div class="description">',
        `${ place.description}`,
    ].join('');

    return htmlstring;

}

function search() {
    const data = {amenities:amenitiesId}
$.ajax({
        type: "POST",
        contentType: "application/json",
        url: url + "/places_search",
        // convert JSON to string
        data: JSON.stringify(data)
    })
        .done(function(data) {
            // every time renders start I have to eliminate the selector with.html
            $('SECTION.places').html('<h1>Places</h1>');

            for (let i=0; i < data.length; i++) {
                // <section class="places"> in the html
                $('SECTION.places').append(htmlPlace(data[i]));

            }
        })

}


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
            amenities.push($(this).data('name'));
            amenitiesId.push($(this).data('id'));
        } else {
            deleteThis($(this).data('name'), amenities);
            deleteThis($(this).data('id'), amenitiesId);
        }
        one_array(amenities)
    })

    $.ajax({ url: url + '/status/' })
    .done(function (data) {
        $('DIV#api_status').addClass('available')
    })
    .fail(function (error) {
    $('DIV#api_status').removeClass('available')
    });
    //let arr = {amenities:amenitiesId}
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: url + "/places_search",
        data: '{}'
    })
        .done(function(data) {

            for (let i=0; i < data.length; i++) {
                // <section class="places"> in the html
                $('SECTION.places').append(htmlPlace(data[i]));

            }
        })

    $('SECTION.filters button').click(search)

}




$(document).ready(init)


