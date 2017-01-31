var pages = 7;
var currentpage = 1;
if (document.location.hash) { currentpage = parseInt(document.location.hash.replace('#', '')); }

var nextpage = currentpage + 1; if (nextpage > pages) { nextpage = pages; }
var prevpage = currentpage - 1; if (prevpage < 1) { prevpage = 1; }

var animatingup = false;
var animatingdown = false;

jQuery(window).scroll(function(event) {

if (animatingup==true) { return; }
if (animatingdown==true) { return; }
nextpage = currentpage + 1; if (nextpage > pages) { nextpage = pages; }
prevpage = currentpage - 1; if (prevpage < 1) { prevpage = 1; }

if (animatingup == false) {
    if (jQuery(window).scrollTop()+jQuery(window).height()>=jQuery("#page"+(nextpage)).offset().top+50) {
        if (nextpage > currentpage) {
            var p2 = jQuery( "#page"+(nextpage) );
            var pageheight = p2.position().top;
            animatingdown = true;
            jQuery('html, body').animate({ scrollTop: pageheight }, 800, function() { currentpage = nextpage; animatingdown = false; document.location.hash = currentpage;});
            return;
        }
    }
}

if (animatingdown == false) {
    if (jQuery(window).scrollTop()<=jQuery("#page"+(currentpage)).offset().top-50) {
        if (prevpage < currentpage) {
            var p2 = jQuery( "#page"+(currentpage) );
            var pageheight = p2.position().top-jQuery(window).height();
            animatingup = true;
            jQuery('html, body').animate({ scrollTop: pageheight }, 800, function() { currentpage = prevpage; animatingup = false; document.location.hash = currentpage;});
            return;
        }
