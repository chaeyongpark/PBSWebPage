/* Copyright (C) Chaeyong Park, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * Written by Chaeyong Park <pcy8201@postech.ac.kr>, POSTECH, 2017
 *
 * Github: github.com/pcy8201
 * Linkedin: www.linkedin.com/in/chaeyong
 */

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
    $('.dropdown-button').dropdown({
        constrainWidth: false,
        hover: true,
        belowOrigin: true,
        stopPropagation: false
    });
});

$(document).on('click', '.list_change', function () { 
	console.log('CLICKED');

	var link = $(this).attr('href');
    var menu = link.split('/');
    var page = menu[2].split('=');

    console.log(menu[1], page[1]);
   	get_list(menu[1], page[1]);

	return false;
});
      
// For checking scroll, when navbar exist
if($('.navbar').length > 0){
    $(window).on("scroll load resize", function(){
        checkScroll();
    });
}

var get_list = function(menu, page) {
	$.getJSON('/' + menu + '/?p=' + page, function(data) {
		var card = $.map(data.video, function(l) {
			var v = l.fields;
			date = DateParser(v.date);
			list = cstr[0] + menu + cstr[1] + l.pk + cstr[2] + data.now + cstr[3] + v.url + cstr[4] + v.title + cstr[5] + 
				   date[0] + cstr[6] + date[1] + cstr[7] + date[2] + cstr[8];
			return list;
		}).join('');
		$('#videos').html(card);	
		$('.video-card').matchHeight();
		
		var p = $.map(data.page, function (l) {
			if (l == data.now) {
				return ActivePage(menu, l);
			} else {
				return UnactivePage(menu, l);
			}
		}).join('');
		$('#page-counter').html(p);
	});
};

// TODO delete 05 -> 5
function DateParser(str) {
	var d = str.split('-');
	d[1].replace(/(^0)/, "");
	return d;
};

function ActivePage(link, pnum) {
	return "<li class=\"active postech-red\"><a class=\"list_change\" href=\"/" + link + "/?p=" + pnum + "\">" + pnum + "</a></li>";
};

function UnactivePage(link, pnum) {
	return "<li><a class=\"list_change\" href=\"/" + link + "/?p=" + pnum + "\">" + pnum + "</a></li>";
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

// Make same height of video cards
$('.video-card').matchHeight();
