/* Copyright (C) Chaeyong Park, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * Written by Chaeyong Park <pcy8201@postech.ac.kr>, POSTECH, 2017
 *
 * Github: github.com/pcy8201
 * Linkedin: www.linkedin.com/in/chaeyong
 */

// Setting of AJAX post method
var csrftoken = getCookie('csrftoken');

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function csrfSafeMethod(method) {
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});
////////////

const cstr = [
	"<div class=\"col s12 m6 l4\"><a class=\"a-black\" href=\"/",
	"/?v=",
	"&p=",
	"\"><div class=\"card video-card hoverable\"><div class=\"card-image\"><img src=\"https://img.youtube.com/vi/",
	"/mqdefault.jpg\"></div><div class=\"card-content\"><p>",
	"</p><p class=\"video-date\">",
	"년 ",
	"월 ",
	"일</p></div></div></a></div>"
];

const nstr = [
	"<a href=\"/notice/?n=",
	"\"class=\"collection-item\"><span class=\"menu grey-text text-darken-4\">",
	"<br></span><p class=\"notice-date\">",
	"년 ",
	"월 ",
	"일 </p></a>"
];

// Mobile side navbar menu
$(".button-collapse").sideNav();

// Ready function
$(document).ready(function(){
	if($(window).width() < 400) {
		$('.slider').slider({height: 300});
	} else {
		$('.slider').slider({height: 500});
	}
	$('.collapsible').collapsible();
	$('.parallax').parallax();
	$('.carousel.carousel-slider').carousel({fullWidth: true});
    $('.dropdown-button').dropdown({
        constrainWidth: false,
        hover: true,
        belowOrigin: true,
        stopPropagation: false
    });
});

// For checking scroll, when navbar exist
if($('.navbar').length > 0){
    $(window).on("scroll load resize", function(){
        checkScroll();
    });
}

$(document).on('click', '.list_change', function () {
	var page = $(this).attr('name');
	ChangePageOfVideo(page, "list_change", "pbs_plus");
	
	return false;
});

$(document).on('click', '.list_change_notice', function () {
	var page = $(this).attr('name');

	$.post('/notice/', { next_page: page }, function (data) {
		var note = $.map(data.note, function(l) {
			var n = l.fields;
			date = DateParser(n.date);
			return nstr[0] + l.pk + nstr[1] + n.title + nstr[2] + date[0] + nstr[3] + date[1] + nstr[4] + date[2] + nstr[5];
		});
		$('#items').html(note);

		var p = $.map(data.page, function (l) {
			if (l == data.now) {
				return "<li class=\"active postech-red\"><a href=\"\" class=\"list_change_notice\" name=\"" + l + "\">" + l + "</a></li>";
			} else {
				return "<li><a href=\"\" class=\"list_change_notice\" name=\"" + l + "\">" + l + "</a></li>";
			}
		});
		$('#page-counter').html(p);

	});

	return false;
});

function ChangePageOfVideo(page, class_name, url) {
	$.post("/" + url + "/", { next_page: page }, function (data) {
		var card = $.map(data.video, function(l) {
			var v = l.fields;
			date = DateParser(v.date);
			return cstr[0] + url + cstr[1] + l.pk + cstr[2] + data.now + cstr[3] + v.url + cstr[4] + v.title + cstr[5] + 
				   date[0] + cstr[6] + date[1] + cstr[7] + date[2] + cstr[8];
		});
		$('#items').html(card);	
		$('.video-card').matchHeight();

		var p = $.map(data.page, function (l) {
			if (l == data.now) {
				return "<li class=\"active postech-red\"><a href=\"\" class=\""+ class_name +"\" name=\"" + l + "\">" + l + "</a></li>";
			} else {
				return "<li><a href=\"\" class=\"" + class_name + "\" name=\"" + l + "\">" + l + "</a></li>";
			}
		});
		$('#page-counter').html(p);
	});
};

// TODO delete 05 -> 5
function DateParser(str) {
	var d = str.split('-');
	d[1] = d[1].replace(/(^0)/, "");
	d[2] = d[2].replace(/(^0)/, "");
	return d;
};

// Check whether scroll is on or not
function checkScroll(){
    var nav_height = $('.navbar').height();

    if($(window).scrollTop() > nav_height){
        $('.nav-wrapper').addClass("scrolled");
        console.log("SCROLL");
    } else {
        $('.nav-wrapper').removeClass("scrolled");
        console.log("UNSCROLL");
    }
};

function initMap() {
	var pbs_coord = {lat: 36.013123, lng: 129.321050};
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 16,
		center: pbs_coord
	});
	var marker = new google.maps.Marker({
		position: pbs_coord,
		map: map
	});
}
// Make same height of video cards
$('.video-card').matchHeight();
$('.video-card').matchHeight();
