/* Page object fields */

var options = {
  valueNames: [ 'label', 'url', 'name' ]
};


/* Initialize object containing all pages */
var userList = new List('users', options);


/* Generates images dynamically */
function makeImage(length) {
      // turns text-based picture id data into an <img>
      var link = $(document.body).find("li").find("a.url");      
      link.each(function() {
          var cleanlinkid = $(this).text().replace(/\s/g,'');
          if (cleanlinkid !== '') {
            var item = $(this).closest("li");
            var alt = $.trim(item.find(".name").text()) + ", " + $.trim(item.find(".label").text());
            $(this).empty();
            // Harvard MPS IIIF image service, sized to fit 2x the 200x210 display box
            $(this).append($("<img>", { src: "https://mps.lib.harvard.edu/assets/images/drs:" + encodeURIComponent(cleanlinkid) + "/full/!400,420/0/default.jpg", alt: alt }));
          }
      });

      // Makes images appear if hidden
      var visibleImages = $(document.body).find("ul.list").find("li");      
      visibleImages.each(function() {
        $(this).css("display","block");  
      });

      // Remove helper and add load message
      var helpbox = $(document.body).find("div.helper");
      helpbox.empty();
      helpbox.append('<p class="help-message">Pages may take some seconds to load</p>');

      // No match
      if (length === 0){
        helpbox.empty();
        helpbox.append('<p class="help-message">There are no pages that meet your search. Please try another search or click a button.</p>');
      }


}

/* Prevents user from loading too many images at once and crashing the browser */
function hideImage() {
      // hides images thumbnails
      var visibleImages = $(document.body).find("ul.list").find("li");
      visibleImages.each(function() {
          $(this).css("display","none");
      });

      // update message to guide user to narrow their search
      var helpbox = $(document.body).find("div.helper");
      helpbox.empty();
      helpbox.append('<p class="help-message">Too many results. Please specify your search or click a button.</p>');


}


/* Causes button clicks to update the search box */

$( "#users button" ).click(function() {
  var text = $( this ).text();
  // Mark the chosen button as the current selection
  $( "#users button" ).removeClass( "active" ).filter( "[aria-pressed]" ).attr( "aria-pressed", "false" );
  $( this ).addClass( "active" ).filter( "[aria-pressed]" ).attr( "aria-pressed", "true" );
  $( "input.search" ).val( text ).keyup();
$(function() {
    $('input.search').keydown();
    $('input.search').keypress();
    $('input.search').keyup();
    $('input.search').blur();
});});

// Bootstrap 3 also sets aria-expanded on the collapsing panel itself, where
// it isn't a valid attribute; only the toggle button should carry it.
$( document ).on( "shown.bs.collapse hidden.bs.collapse", function( e ) {
  $( e.target ).removeAttr( "aria-expanded" );
});
