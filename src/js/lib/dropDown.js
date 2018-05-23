function dropDown() {
  var dropDown = $('.dropdown');
  var btn = dropDown.find('.dropdown__toggle');
  dropDown.click(function() {
    $( this ).slideUp();
  });
}
module.exports = dropDown;
  
