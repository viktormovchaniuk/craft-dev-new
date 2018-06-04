var Isotope = require('isotope-layout');
var jQueryBridget = require('jquery-bridget');
jQueryBridget('isotope', Isotope, $);

import 'slick-carousel';


(function() {
  var dropdowns = $('.dropdown');

  dropdowns.each(function() {
    var dropdownMenu = $(this).find('.dropdown__menu');
    $(this).find('.dropdown__toggle').on('click', function() {
      dropdownMenu.slideToggle();
    });
  });

  var menuBtn = $('.toggler');
  menuBtn.on('click', function(e) {
    e.stopPropagation();
    $(this).toggleClass('is-active');
    $('.main-nav').slideToggle('normal', function() {
      if ($(this).is(':hidden')) $(this).css('display', '');
    });
  });


  $(window).resize(function() {
    $(window).width() > 900 && $('.main-nav').removeAttr('style') && menuBtn.removeClass('is-active');
  });

  var breadcrumb = $('.breadcrumb .breadcrumb__item:last-child a');

  if (breadcrumb.length !== 0) {
    breadcrumb.html(breadcrumb.html().substring(0, 20) + '...');
  }


  var modal = $('.modal');

  $('#modal-btn').on('click', function() {
    $('body').addClass('modal-open');
    modal.fadeIn().append('<div class="modal-overlay"></div>');
    $('.modal-overlay').on('click', function() {
      modal.fadeOut();
      $('body').removeClass('modal-open');
      $(this).remove('.modal-overlay');
    });
  });

  $('#btn-close').on('click', function() {
    modal.fadeOut();
    $('body').removeClass('modal-open');
    $('.modal-overlay').remove();
  });
}());


(function() {
  var isActive = $('#filters').find('.is-active');
  var initiaFilter = isActive.find('button').attr('data-filter');

  var $grid = $('.grid').isotope({
    itemSelector: '.grid-item',
    percentPosition: true,
    masonry: {
      columnWidth: '.grid-sizer',
      gutter: '.gutter-sizer'
    },
    getSortData: {
      selectedCategory: function selectedCategory(itemElem) {
        return $(itemElem).hasClass('new') ? 0 : 1;
      }
    },
    filter: initiaFilter,
    sortBy: 'selectedCategory'
  });

  isActive.find('button').addClass('is-checked').trigger('click');


  $('#filters').on('click', 'button', function() {
    var filterValue = $(this).attr('data-filter');
    $grid.isotope({
      filter: filterValue
    });
  });

  $('#filters').each(function(i, buttonGroup) {
    var $buttonGroup = $(buttonGroup);
    $buttonGroup.on('click', 'button', function() {
      $buttonGroup.find('.is-checked').removeClass('is-checked');
      $(this).addClass('is-checked');
    });
  });
}());

var carousel = (function() {
  var activeID = $('.progress-bar__btn').index($('.progress-bar__btn.is-checked')),
    itemW = ($(window).width() / 2) - 20,
    carouselCount = $('.progress-bar__item').length,
    $carouselItems = $('.progress-bar__row'),
    $carouselItem = $('.progress-bar__item'),
    $arrowPrev = $('.prev'),
    $arrowNext = $('.next'),
    slideSpeed = 0.65;

  function init() {
    activeID = $('.progress-bar__btn').index($('.progress-bar__btn.is-checked'));
    itemW = ($(window).width() / 2) - 20;
    $carouselItems.css({
      'width': (itemW * (carouselCount - 1)) + 'px'
    });
    navigateSlide();
  }

  if ($(window).width() <= 899) {
    init();
  }

  $(window).resize(function() {
    if ($(window).width() <= 899) {
      init();
    } else {
      $carouselItems.css({
        'width': 'auto',
        'transform': 'none',
        '-webit-transform': 'none',
        '-moz-transform': 'none',
      });
    }
  });



  function navigateSlide() {

    if (activeID >= carouselCount - 1) activeID = carouselCount - 1;
    if (activeID <= 0) activeID = 0;

    var xTarget = ((activeID * (itemW - 10) - (itemW - 10)) * -1);
    var move = 'translate(' + xTarget + 'px)';
    $carouselItems.css({
      '-webit-transform': move,
      '-moz-transform': move,
      'transform': move
    });
  }

  function slideDone() {
    if (activeID === 0) {
      $arrowPrev.addClass('disabled');
    } else {
      $arrowPrev.removeClass('disabled');
    }

    if (activeID + 1 === carouselCount) {
      $arrowNext.addClass('disabled');
    } else {
      $arrowNext.removeClass('disabled');
    }
  }

  $arrowNext.on('click', function() {
    activeID++;
    slideDone();
    navigateSlide();
    $carouselItems.find('.is-checked').removeClass('is-checked').parent().next().find('button').addClass('is-checked').trigger('click');
  });

  $arrowPrev.on('click', function() {
    activeID--;
    slideDone();
    navigateSlide();
    $carouselItems.find('.is-checked').removeClass('is-checked').parent().prev().find('button').addClass('is-checked').trigger('click');
  });
})();


(function() {
  $('.slider').each(function() {
    $(this).find('.slider-for').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: $(this).find('.slider-nav')
    });

    $(this).find('.slider-nav').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: $(this).find('.slider-for'),
      dots: false,
      arrows: false,
      centerMode: true,
      focusOnSelect: true,
      draggable: false
    });
  });
}());

$(document).ready(function() {
  var preloader = $('#preloader');
  setTimeout(function() {
    preloader.children('.preloader__item').fadeOut('slow', function() {
      preloader.addClass('preloader--hidden');
    });
    setTimeout(function() {
      preloader.css('display', 'none');
    }, 1500);
  }, 100);
});



(function() {
  var currentX = '';
  var currentY = '';
  var movementConstant = 0.015;
  $(document).mousemove(function(e) {
    if(currentX === '') currentX = e.pageX;
    var xdiff = e.pageX - currentX;
    currentX = e.pageX;
    if(currentY === '') currentY = e.pageY;
    var ydiff = e.pageY - currentY;
    currentY = e.pageY; 
    $('.bg').each(function(i, el) {
      var movement = (i + 1) * (xdiff * movementConstant);
      var movementy = (i + 1) * (ydiff * movementConstant);
  
      if(i%2 === 0) {
        var newX = $(el).position().left - movement;
        var newY = $(el).position().top - movementy;
      } else {
        var newX = $(el).position().left + movement;
        var newY = $(el).position().top + movementy;
      }
  
      $(el).css('transform', 'translate('+ newX + 'px, ' + newY + 'px )');
      
    });
  });
}());
