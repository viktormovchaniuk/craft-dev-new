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

}());

var selectedCategory;

var $grid = $('.grid').isotope({
  itemSelector: '.grid-item',
  percentPosition: true,
  masonry: {
    columnWidth: '.grid-sizer',
    gutter: '.gutter-sizer'
  },
  getSortData: {
    selectedCategory: function( itemElem ) {
      return $( itemElem ).hasClass( selectedCategory ) ? 0 : 1;
    }
  }
});

var $items = $('.grid').find('.grid-item');

$('#filters').on( 'click', 'button', function() {

  selectedCategory = $( this ).attr('data-sort-by');
  if ( selectedCategory == 'all' ) {
    $grid.isotope({
      sortBy: 'original-order'
    });
    // restore all items to full opacity
    $items.css({
      opacity: 1
    });
    return;
  }
  // change opacity for selected/unselected items
  var selectedClass = '.' + selectedCategory;
  $items.filter( selectedClass ).find('.card__header-text').css({
    backgroundColor: '#faac03'
  });
  $items.not( selectedClass ).find('.card__header-text').css({
    backgroundColor: '#aaaaaa'
  });

  // update sort data now that selectedCategory has changed
  $grid.isotope('updateSortData');
  $grid.isotope({ sortBy: 'selectedCategory' });
});

// change is-checked class on buttons
$('#filters').each( function( i, buttonGroup ) {
  var $buttonGroup = $( buttonGroup );
  $buttonGroup.on( 'click', 'button', function() {
    $buttonGroup.find('.is-checked').removeClass('is-checked');
    $( this ).addClass('is-checked');
  });
});

var $newItems = $(`
<div class="grid-item access">
  <div class="card">
      <div class="card__header">
        <span class="card__header-text">access111</span>
      </div>
      <div class="card__body">
        <h4 class="card__body-title">Improve the logic of collecting resources with an inventory tool available</h4>
        <p class="card__body-text"> </p>
      </div>
  </div>
</div>`);
setTimeout(function() {
  $('.grid').append( $newItems).isotope( 'reloadItems' ).isotope({ sortBy: 'selectedCategory' });
  $items = $('.grid').find('.grid-item');

  var selectedClass = '.' + selectedCategory;
  $items.filter( selectedClass ).find('.card__header-text').css({
    backgroundColor: '#faac03'
  });
  $items.not( selectedClass ).find('.card__header-text').css({
    backgroundColor: '#aaaaaa'
  });
}, 5000);

console.log(Isotope);




