var all_spans = $('.item span').hide();

$('.item a').click(function(e){
    var thisSpan = $(this).parent().find('span'),
        isShowing = thisSpan.is(":visible");

    // Hide all spans
    all_spans.hide();

    // If our span *wasn't* showing, show it
    if (!isShowing) {
        thisSpan.show();
    }

    e.preventDefault();
});