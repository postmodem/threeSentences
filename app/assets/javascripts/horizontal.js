var backgrounds = "html, nav, body, .left, .title, .session, .column, .cluster, #frame, .slidee, .triad, input"
var foregrounds = "p, h1, h2, h3, h4, h5, h6, li, input"

$(document).ready(function(){
    var screenRight,
        screenLeft,
        screenDown,
        screenUp,
        nightMode = false,
        greenMode = false,
        redMode = false,
        blueMode = false,
        yellowMode = false,
        colWidth = 850,
        scrollSpeed = 300;


    Mousetrap.bind('right', function() {
        screenRight = $(document).scrollLeft();
        $("html, body, .column").animate({scrollLeft: (screenRight + colWidth)}, scrollSpeed);
    });

    Mousetrap.bind(['shift+right', 'shift+option+6'], function() {
        $("html, body, .column").animate({scrollLeft: $(document).width() }, scrollSpeed);
    });

    Mousetrap.bind('left', function() {
        screenLeft = $(document).scrollLeft();
        $("html, body").animate({scrollLeft: (screenLeft - colWidth)}, scrollSpeed);
    });

    Mousetrap.bind(['shift+left','shift+option+1'], function() {
        $("html, body, .column").animate({scrollLeft: 0}, scrollSpeed);
    });

    Mousetrap.bind('down', function() {
        screenDown = $(".column").scrollTop();
        $(".column").animate({scrollTop: screenDown + 200}, scrollSpeed);
    });

    Mousetrap.bind('up', function() {
        screenUp = $(".column").scrollTop();
        $(".column").animate({scrollTop: screenUp - 200}, scrollSpeed);
    });

    Mousetrap.bind('shift+option+2', function() {
        $("html, body").animate({scrollLeft: 860}, scrollSpeed);
    });

    Mousetrap.bind('shift+option+3', function() {
        $("html, body").animate({scrollLeft: 1720}, scrollSpeed);
    });

    Mousetrap.bind('shift+option+4', function() {
        $("html, body").animate({scrollLeft: 2580}, scrollSpeed);
    });

    Mousetrap.bind('shift+option+5', function() {
        $("html, body").animate({scrollLeft: 3440}, scrollSpeed);
    });

    Mousetrap.bindGlobal('shift+ctrl+n', function() {
         if (nightMode === false){
         nightMode = true;
         $(backgrounds).css( "background", "#333333" );
         $(foregrounds).css( "color", "#F5FEFF" );
        }
        else {
         nightMode = false;
         $(backgrounds).css( "background", "#F5FEFF" );
         $(foregrounds).css( "color", "#333333" );
        }
    });

    Mousetrap.bindGlobal('shift+ctrl+k', function() {
         if (greenMode === false){
         greenMode = true;
         $(backgrounds).css( "background", "#41CA00" );
         $(foregrounds).css( "color", "#123600" );
        }
        else {
         greenMode = false;
         $(backgrounds).css( "background", "#F5FEFF" );
         $(foregrounds).css( "color", "#333333" );
        }
    });

    Mousetrap.bindGlobal('shift+ctrl+l', function() {
         if (redMode === false){
         redMode = true;
         $(backgrounds).css( "background", "#2D0400" );
         $(foregrounds).css( "color", "#FF1800" );
        }
        else {
         redMode = false;
         $(backgrounds).css( "background", "#F5FEFF" );
         $(foregrounds).css( "color", "#333333" );
        }
    });

    Mousetrap.bindGlobal('shift+ctrl+j', function() {
         if (blueMode === false){
         blueMode = true;
         $(backgrounds).css( "background", "#2217B4" );
         $(foregrounds).css( "color", "#FFEE00" );
        }
        else {
         blueMode = false;
         $(backgrounds).css( "background", "#F5FEFF" );
         $(foregrounds).css( "color", "#333333" );
        }
    });

    Mousetrap.bindGlobal('shift+ctrl+h', function() {
         if (yellowMode === false){
         yellowMode = true;
         $(backgrounds).css( "background", "#FFEE00" );
         $(foregrounds).css( "color", "#2217B4" );
        }
        else {
         yellowMode = false;
         $(backgrounds).css( "background", "#F5FEFF" );
         $(foregrounds).css( "color", "#333333" );
        }
    });


});

