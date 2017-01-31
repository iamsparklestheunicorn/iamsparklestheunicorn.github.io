var pages = 6;
var currentpage = 1;
if (document.location.hash) { currentpage = parseInt(document.location.hash.replace('#', '')); }
f
or portfolio_item in site.portfolio {
  currentp = portfolio_item.number;
}
var currentdiv = document.querySelector("div.imgfull-box")

console.log(currentpage);

var nextpage = currentpage + 1; if (nextpage > pages) { nextpage = pages; }
var prevpage = currentpage - 1; if (prevpage < 1) { prevpage = 1; }

var animatingup = false;
var animatingdown = false;

function scrolltocurrent() {
	var p2 = $( "#"+(currentpage) );
	var pageheight = p2.position().top;
	$('html, body').animate({ scrollTop: pageheight }, 200);
}

function resizeDiv() {
	vpw = $(window).width();
	vph = $(window).height();
	$('.imgfull-box').css({'min-height': vph + 'px'});
}

$(document).ready(function() {
	resizeDiv();
	//scrolltocurrent();
});

window.onresize = function(event) {
	resizeDiv();
	scrolltocurrent();
}

$(window).scroll(function(event) {

	if (animatingup==true) { console.log("animating up..."); return; }
	if (animatingdown==true) { console.log("animating down..."); return; }

	nextpage = currentpage + 1; if (nextpage > pages) { nextpage = pages; }
	prevpage = currentpage - 1; if (prevpage < 1) { prevpage = 1; }

	console.log("scroll happened, previous page is " + prevpage + ", current page is " + currentpage + ", next page is " + nextpage);

	//console.log($("#page"+(currentpage)).offset().top + " < " + $(window).scrollTop());

	//console.log($(window).scrollTop()+$(window).height() + " < " + $("#page"+(nextpage)).offset().top);

	if (animatingup == false) {
		if ($(window).scrollTop()+$(window).height()>=$("#page"+(nextpage)).offset().top+50) {
			if (nextpage > currentpage) {
				var p2 = $( "#"+(nextpage) );
				var pageheight = p2.position().top;
				animatingdown = true;
				$('html, body').animate({ scrollTop: pageheight }, 500, function() { currentpage = nextpage; animatingdown = false; document.location.hash = currentpage;});
				return;
			}
		}
	}

	if (animatingdown == false) {
		if ($(window).scrollTop()<=$("#page"+(currentpage)).offset().top-50) {
			if (prevpage < currentpage) {
				var p2 = $( "#"+(currentpage) );
				var pageheight = p2.position().top-$(window).height();
				animatingup = true;
				$('html, body').animate({ scrollTop: pageheight }, 500, function() { currentpage = prevpage; animatingup = false; document.location.hash = currentpage;});
				return;
			}
		}
	}
});
