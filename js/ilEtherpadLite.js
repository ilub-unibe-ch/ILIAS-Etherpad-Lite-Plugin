/**
 * etherpadliteJsClass
 *
 * @author  Timon Amstutz <timon.amstutz@ilub.unibe.ch>
 * **/

 function etherpadliteJsClass() {

    /** "Private" variables **/
    var fullscreenPad = false;
    var height = 0;

    /** "Public" functions **/
    this.toggleFullscreen = function () {
        fullscreenPad = !fullscreenPad;
        this.resizePad();
    }
    this.resizePad = function () {
        if (fullscreenPad) {
            height = $(window).height();
        }
        else {
            height = $(window).height() - ($("div.ilMainHeader").height() + $("div.ilTopBar").height() + $("footer.ilFooter").height() + $("div.il_HeaderInner").height() + 50);
        }
        repaintPad();
    }

    this.handleIE=function()
    {
		var isIE = /*@cc_on!@*/false || !!document.documentMode;
		if (isIE){
			var div = document.createElement("div");
			div.className="ieInfo";
			div.innerHTML = "<h3>Sie nutzen einen veralteten Browser.</h3><p> Etherpad ist für IE11 nicht verfügbar. Bitte wechseln Sie zu einem anderen Browser.</p>";
			document.getElementById("etherpad-lite").appendChild(div);
		}
    }
    /** Constructor actions **/
    this.resizePad();
    this.handleIE();
    $("#leaveFullscreenPad").hide();

    /** "Private" functions **/
    function repaintPad() {
        if (fullscreenPad) {
            $("#etherpad-lite").addClass("etherpad-liteFullscreen").removeClass("etherpad-liteRegular");
            $("html").scrollTop(0);
            $("body").addClass("hiddenOverflow");
            $("#enterFullscreenPad").hide();
            $("#leaveFullscreenPad").show();
        }
        else {
            $("#etherpad-lite").addClass("etherpad-liteRegular").removeClass("etherpad-liteFullscreen");
            $("body").removeClass("hiddenOverflow");
            $("#enterFullscreenPad").show();
            $("#leaveFullscreenPad").hide();
        }
        $("#etherpad-lite").css({'height':height + "px"});
        //$("#etherpad-liteFrame").css({'height':$("#etherpad-lite").height()});
        $("#etherpad-liteFrame").css({'height':$("#etherpad-lite").height() - $(".labeFullscreenPad").height()-1 + "px"});
    }

}

/** Actions done when Document is loaded **/
$(function () {
    var etherpadlite = new etherpadliteJsClass();

    $(window).resize(function () {
        etherpadlite.resizePad();
    });

    $(".labeFullscreenPad").click(function () {
        etherpadlite.toggleFullscreen();
    });
});


