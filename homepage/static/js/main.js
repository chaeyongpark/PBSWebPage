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

// create a reference to the old `.html()` function
var htmlOriginal = $.fn.html;

// redefine the `.html()` function to accept a callback
$.fn.html = function(html,callback){
  // run the old `.html()` function with the first parameter
  var ret = htmlOriginal.apply(this, arguments);
  // run the callback (if it is defined)
  if(typeof callback == "function"){
    callback();
  }
  // make sure chaining is not broken
  return ret;
}
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
	"일</p></div></div></a></div>",
	"\"><div class=\"card video-card hoverable\"><div class=\"card-image\"><img src=\"https://graph.facebook.com/",
	"/picture\"></div><div class=\"card-content\"><p>",
];

const nstr = [
	"<a href=\"/notice/?n=",
	"\"class=\"collection-item\"><p class=\"notice-list-title\">",
	"<span class=\"badge postech-orange white-text pulse\">New</span>",
	"<span class=\"menu grey-text text-darken-4\">",
	"</span></p><p class=\"notice-date\">",
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

var prev_scroll = 0;
$(window).on("scroll load resize", function(){
    var nav_height = $('.navbar-pbs').height();
    
    if ($(window).scrollTop() - prev_scroll > 0) {
        $('.navbar-pbs').addClass("scrolled");
        prev_scroll = $(window).scrollTop();
    } else if (prev_scroll - $(window).scrollTop() > 20) {
        $('.navbar-pbs').removeClass("scrolled");
        prev_scroll = $(window).scrollTop();
    }
});


$(document).on('click', '.list_change', function () {
	var page = $(this).attr('name');
	var url = $('.a-black').attr('href').split('/');

	$.post("/" + url[1] + "/", { next_page: page }, function (data) {
		var card = $.map(data.video, function(l) {
			var v = l.fields;
			date = DateParser(v.date);
			if (url[1] == "radio") {
                return cstr[0] + url[1] + cstr[1] + l.pk + cstr[2] + data.now + cstr[9] + v.url + cstr[10] + v.title + cstr[5] + 
					   date[0] + cstr[6] + date[1] + cstr[7] + date[2] + cstr[8];
			} else {
				return cstr[0] + url[1] + cstr[1] + l.pk + cstr[2] + data.now + cstr[3] + v.url + cstr[4] + v.title + cstr[5] + 
					   date[0] + cstr[6] + date[1] + cstr[7] + date[2] + cstr[8];
			}
		});
		$('#items').html(card).promise().done(function () {
			setTimeout(function () {
				$('.video-card').matchHeight();
			}, 10);
		});
		var p = $.map(data.page, function (l) {
			if (l == data.now) {
				return "<li class=\"active postech-red\"><a href=\"\" class=\"list_change\" name=\"" + l + "\">" + l + "</a></li>";
			} else {
				return "<li><a href=\"\" class=\"list_change\" name=\"" + l + "\">" + l + "</a></li>";
			}
		});
		$('#page-counter').html(p);
	});

	return false;
});

$(document).on('click', '.list_change_notice', function () {
	var page = $(this).attr('name');

	$.post('/notice/', { next_page: page }, function (data) {
		var i = 0;
		var note = $.map(data.note, function(l) {
			var n = l.fields;
			date = DateParser(n.date);
			if (data.new[i++] == true) {
				return nstr[0] + l.pk + nstr[1] + nstr[2] + nstr[3] + n.title + nstr[4] + date[0] + nstr[5] + date[1] + nstr[6] + date[2] + nstr[7];
			} else {
				return nstr[0] + l.pk + nstr[1] + nstr[3] + n.title + nstr[4] + date[0] + nstr[5] + date[1] + nstr[6] + date[2] + nstr[7];
			}
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

function DateParser(str) {
	var d = str.split('-');
	d[1] = d[1].replace(/(^0)/, "");
	d[2] = d[2].replace(/(^0)/, "");
	return d;
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

function Resize() {
	var rh = $('#rvideo').height()*0.91;

	$('#ivideo').height(rh/2);
	$('#rnote').height(rh/4);
	$('#rsurvey').height(rh/4);
}

$(document).ready(Resize);
$(window).resize(Resize);

// Make same height of video cards
$('.video-card').matchHeight();
$('.card-news').matchHeight();
$('.chart').matchHeight();
