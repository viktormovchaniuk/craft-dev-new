function sayHello() {
  var elem = document.querySelector('.grid');
  var iso = new Isotope(elem, {
    itemSelector: '.grid-item',
    percentPosition: true,
    masonry: {
      columnWidth: '.grid-sizer',
      gutter: '.gutter-sizer'
    },
    getSortData: {
      event: '[data-event]'
    }
  });

  // bind sort button click
  var sortByGroup = document.querySelector('.progress-bar');
  sortByGroup.addEventListener( 'click', function( event ) {
    // only button clicks
    if ( !matchesSelector( event.target, '.progress-bar__btn' ) ) {
      return;
    }
    var sortValue = event.target.getAttribute('data-sort-by');
    iso.arrange({ sortBy: sortValue });
  });
  
  // change is-checked class on buttons
  var buttonGroups = document.querySelectorAll('.progress-bar');
  for ( var i=0; i < buttonGroups.length; i++ ) {
    buttonGroups[i].addEventListener( 'click', onButtonGroupClick );
  }
  
  function onButtonGroupClick( event ) {
   
    // only button clicks
    if ( !matchesSelector( event.target, '.progress-bar__btn' ) ) {
      return;
    }
    var button = event.target;
    button.parentNode.parentNode.querySelector('.is-checked').classList.remove('is-checked');
    button.classList.add('is-checked');
  }

}
module.exports = sayHello;
