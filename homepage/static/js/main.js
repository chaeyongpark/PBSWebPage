/**
 * Copyright (C) Chaeyong Park, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * Written by Chaeyong Park <pcy8201@postech.ac.kr>, POSTECH, 2017.08.23
 *
 * Github: github.com/pcy8201
 * Linkedin: www.linkedin.com/in/chaeyong
 */

/**
 *  Setting of AJAX post method
 */
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
/**
 * redefine the `.html()` function to accept a callback
 */
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

/**
 * Video card string
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
    "일</p></div></div></a></div>",
    "\"><div class=\"card video-card hoverable\"><div class=\"card-image\"><img src=\"https://graph.facebook.com/",
    "/picture\"></div><div class=\"card-content\"><p>",
];

/**
 * Notice card string
 */
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

/**
 * Cardnews card string
 */
const cnstr = [
    "<div class=\"col s12 m6 l4\"><a class=\"a-black\" href=\"/card_news/?c=",
    "\"><div class=\"card card-news hoverable\"><div class=\"card-image\"><img src=\"/media/",
    "\"></div><div class=\"card-content\"><p>",
    "</p><p class=\"video-date\">",
    "년 ",
    "월 ",
    "일</p></div></div></a></div>"
];

/**
 * Mobile side navbar menu
 */
$(".button-collapse").sideNav();

/**
 * Ready function
 * When page loading finish, this function is called
 */
$(document).ready(function(){
    if($(window).width() < 450) {
        $('#islider').slider({ height: 300});
    } else {
        $('#islider').slider({ height: 500});
    }
    $('.modal').modal();
    $('.collapsible').collapsible();
    $('.parallax').parallax();
    $('.carousel.carousel-slider').carousel({fullWidth: true});
    $('.dropdown-button').dropdown({
        constrainWidth: false,
        hover: true,
        belowOrigin: true,
        stopPropagation: false
    });

    $('.video-card').matchHeight();
    $('.card-news').matchHeight();
    $('.chart').matchHeight();
    $('select').material_select();

    if ($(window).width() > 450) {
        $('.main-banner').height($(window).height()*0.65);
    }
});

/**
 * Pop-up search modal
 */
$('#search-btn').click(function(e) {
    e.preventDefault();
    $('#search-modal').modal('open');

    // Auto complete
    $('input.search-auto').autocomplete({
        data: auto_data 
    });
});

/**
 * Navbar change event, when mouse scrolling
 * When mouse moves down side, navbar become little transparent
 * When mouse moves upside, navbar become default mode 
 */
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

/**
 * video page movement event
 * Method: AJAX POST
 */
$(document).on('click', '.list_change', function () {
    var page = $(this).attr('name');
    var url = $('.a-black').attr('href').split('/');

    $.post("/" + url[1] + "/", { next_page: page }, function (data) {
        var card = $.map(data.video, function(l) {
            var v = l.fields;
            date = DateParser(v.date);
            if (v.is_youtube == false) {
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
            }, 600);
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

/**
 * Notice page movement event
 * Method: AJAX POST
 */
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

/**
 * Cardnews page movement event
 * Method: AJAX POST
 */
$(document).on('click', '.list_change_card', function () {
    var page = $(this).attr('name');

    $.post('/card_news/', { next_page: page }, function (data) {
        var i = 0;
        var cardnews = $.map(data.card, function(l) {
            var n = l.fields;
            date = DateParser(n.date);
            return cnstr[0] + l.pk + cnstr[1] + data.thumbnail[i++] + cnstr[2] + n.title + cnstr[3] + date[0] + cnstr[4] + date[1] + cnstr[5] + date[2] + cnstr[6];
        });
         $('#items').html(cardnews).promise().done(function () {
            setTimeout(function () {
                $('.card-news').matchHeight();
            }, 600);
        });

        var p = $.map(data.page, function (l) {
            if (l == data.now) {
                return "<li class=\"active postech-red\"><a href=\"\" class=\"list_change_card\" name=\"" + l + "\">" + l + "</a></li>";
            } else {
                return "<li><a href=\"\" class=\"list_change_card\" name=\"" + l + "\">" + l + "</a></li>";
            }
        });
        $('#page-counter').html(p);

    });

    return false;
});

$(document).ready(Resize);
$(window).resize(Resize);

/**
 * Date parser
 * @param {string} str - date string (i.e. 2017-08-23)
 * @return {array} d - date array non-start zero (i.e ["2017", "8", "23])
 */
function DateParser(str) {
    var d = str.split('-');
    d[1] = d[1].replace(/(^0)/, "");
    d[2] = d[2].replace(/(^0)/, "");
    return d;
};

/**
 * Initialize google map
 */
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

/**
 * When window re-sizing, call this function
 */
function Resize() {
    var rh = $('#rvideo').height()*0.91;
    
    if ($(window).width() > 975) {
        $('#ivideo').height(rh/2);
        $('#rnote').height(rh/4);
        $('#rsurvey').height(rh/4);
    } else if ($(window).width() > 585) {
       $('.home-card').matchHeight();
    }  
}


