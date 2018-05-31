var Isotope = require('isotope-layout');
var jQueryBridget = require('jquery-bridget');
jQueryBridget( 'isotope', Isotope, $ );

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
    selectedCategory: function( itemElem ) {
      return $( itemElem ).hasClass( 'new' ) ? 0 : 1;
    }
  },
  filter: initiaFilter
});

isActive.find('button').addClass('is-checked').trigger('click');

$('#filters').on( 'click', 'button', function() {
  var filterValue = $( this ).attr('data-filter');
  $grid.isotope({ filter: filterValue });
  $grid.isotope('updateSortData');
  $grid.isotope({ sortBy: 'selectedCategory' });
});


$('#filters').each( function( i, buttonGroup ) {
  var $buttonGroup = $( buttonGroup );
  $buttonGroup.on( 'click', 'button', function() {
    $buttonGroup.find('.is-checked').removeClass('is-checked');
    $( this ).addClass('is-checked');
  });
});


// $(window).resize(function() {
//   if ($(window).width() < 900) {
//     isActive.prev().css('display', 'flex');
//     isActive.css('display', 'flex');
//     isActive.next().css('display', 'flex');
//   }
// });

var a = $('#filters').children();

function nextItem() {
  isActive.find('button').next().addClass('is-checked').trigger('click');
}

function prevItem() {
  isActive.find('button').prev().addClass('is-checked').trigger('click');
}   


$('.prev').on('click', prevItem());
$('.next').on('click', nextItem());



// var $newItems = $(`
// <div class="grid-item access">
//   <div class="card">
//       <div class="card__header">
//         <span class="card__header-text">access111</span>
//       </div>
//       <div class="card__body">
//         <h4 class="card__body-title">Improve the logic of collecting resources with an inventory tool available</h4>
//         <p class="card__body-text"> </p>
//       </div>
//   </div>
// </div>`);
// setTimeout(function() {
//   $('.grid').append( $newItems).isotope( 'reloadItems' ).isotope({ sortBy: 'selectedCategory' });
//   $items = $('.grid').find('.grid-item');

//   var selectedClass = '.' + selectedCategory;
//   $items.filter( selectedClass ).find('.card__header-text').css({
//     backgroundColor: '#faac03'
//   });
//   $items.not( selectedClass ).find('.card__header-text').css({
//     backgroundColor: '#aaaaaa'
//   });
// }, 5000);





