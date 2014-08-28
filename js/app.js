// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();

$( document ).ready(function() {
  skrollr.init({
      render: function(data) {
          //Log the current scroll position.
          // console.log(data.curTop);
      }
  });

  var wow = new WOW(
    {
      boxClass:     'wow',      // animated element css class (default is wow)
      animateClass: 'animated', // animation css class (default is animated)
      offset:       0,          // distance to the element when triggering the animation (default is 0)
      mobile:       true,       // trigger animations on mobile devices (default is true)
      live:         true        // act on asynchronously loaded content (default is true)
    }
  );
  wow.init();


  var project_1_height= $("#project_1 h2").height() + $("#project_1 .techno").height() + $("#s5").height() + 100;
  $("#project_content").height(project_1_height);
});

  $( window ).resize(function() {
    var project_1_height= $("#project_1 h2").height() + $("#project_1 .techno").height() + $("#s5").height() + 100;
    $("#project_content").height(project_1_height);
  });