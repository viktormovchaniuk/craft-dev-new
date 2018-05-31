var Isotope = require('isotope-layout');
var jQueryBridget = require('jquery-bridget');
jQueryBridget( 'isotope', Isotope, $ );
import 'slick-carousel';


(function() {
  var dropdowns = $('.dropdown');

  dropdowns.each(function() {
    var dropdownMenu = $(this).find('.dropdown__menu');
    $(this).find('.dropdown__toggle').on( 'click', function() {
      dropdownMenu.slideToggle();
    });
  });

  var menuBtn = $('.toggler');
  menuBtn.on('click', function() {
    $(this).toggleClass('is-active');
    $('.main-nav').slideToggle('normal', function() {
      if ($(this).is(':hidden')) $(this).css('display', '');
    });
  });

  $(window).resize(function() {
    $(window).width() > 900 && $('.main-nav').removeAttr('style') && menuBtn.removeClass('is-active');
  });

  var breadcrumb = $( '.breadcrumb .breadcrumb__item:last-child a');

  if ( breadcrumb.length !== 0 ) {
    breadcrumb.html(breadcrumb.html().substring(0, 20) + '...');
  }

  

  var modal = $('.modal');
  
  
  $('#modal-btn').on('click', function() {
    $('body').addClass('modal-open');
    modal.fadeIn().append('<div class="modal-overlay"></div>');
    $('.modal-overlay').on('click', function() {
      modal.fadeOut();
      $('body').removeClass('modal-open');
      $( this ).remove('.modal-overlay');
    });
  });

  $('#btn-close').on('click', function() {
    modal.fadeOut();
    $('body').removeClass('modal-open');
    $('.modal-overlay').remove();
  });


}());

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
  $grid.isotope({ filter: filterValue });
});

$('#filters').each(function(i, buttonGroup) {
  var $buttonGroup = $(buttonGroup);
  $buttonGroup.on('click', 'button', function() {
    $buttonGroup.find('.is-checked').removeClass('is-checked');
    $(this).addClass('is-checked');
  });
});

$('#filters').slick({
  nextArrow: '.next',
  prevArrow: '.prev',
  infinite: false,
  slidesToShow: 2,
  slidesToScroll: 1,
  adaptiveHeight: true,
  mobileFirst: true,
  responsive: [
    {
      breakpoint: 900,
      settings: 'unslick'
    }
  ]
});

var nextBtn = $('.next');
var prevBtn = $('.prev');

nextBtn.on('click', function() {
  prevBtn.removeClass('disabled');
  var self = $( this );
  $('#filters').each(function(i, buttonGroup) {
    var $buttonGroup = $(buttonGroup);
    // console.log($buttonGroup.find('.is-checked').parent().parent().parent().next().find('button'));
    $buttonGroup.find('.is-checked').removeClass('is-checked').parent().parent().parent().next().find('button').addClass('is-checked').trigger('click');
  });
});

prevBtn.on('click', function() {
  nextBtn.removeClass('disabled');
  var self = $( this );
  $('#filters').each(function(i, buttonGroup) {
    var $buttonGroup = $(buttonGroup);
    $buttonGroup.find('.is-checked').removeClass('is-checked').parent().parent().parent().prev().find('button').addClass('is-checked').trigger('click');
  });
});



// if(window.matchMedia('(max-width: 900px)').matches) {
//   var itemCount = $('.progress-bar__item').length - 1;
  

//   var a = $(window).resize(function() {
//     var itemWidth = $('.progress-bar__item')[2].offsetWidth;
//     var minWidth = itemWidth * itemCount * 2;
//     return minWidth;
// //   });

// //   console.log(a);

// //   $('.progress-bar__row').css('minWidth', a);

  
  
  
//   // console.log(minWidth);
//   // isActive.css('display', 'flex');
//   // isActive.prev().css('display', 'flex');
//   // isActive.next().css('display', 'flex');
// }


