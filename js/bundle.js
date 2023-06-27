! function(i) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], i) : "undefined" != typeof exports ? module.exports = i(require("jquery")) : i(jQuery)
}(function(i) {
    "use strict";
    var e = window.Slick || {};
    (e = function() {
        var e = 0;
        return function(t, o) {
            var s, n = this;
            n.defaults = {
                accessibility: !0,
                adaptiveHeight: !1,
                appendArrows: i(t),
                appendDots: i(t),
                arrows: !0,
                asNavFor: null,
                prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                autoplay: !1,
                autoplaySpeed: 3e3,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function(e, t) {
                    return i('<button type="button" />').text(t + 1)
                },
                dots: !1,
                dotsClass: "slick-dots",
                draggable: !0,
                easing: "linear",
                edgeFriction: .35,
                fade: !1,
                focusOnSelect: !1,
                focusOnChange: !1,
                infinite: !0,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: !1,
                pauseOnHover: !0,
                pauseOnFocus: !0,
                pauseOnDotsHover: !1,
                respondTo: "window",
                responsive: null,
                rows: 1,
                rtl: !1,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: !0,
                swipeToSlide: !1,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                useTransform: !0,
                variableWidth: !1,
                vertical: !1,
                verticalSwiping: !1,
                waitForAnimate: !0,
                zIndex: 1e3
            }, n.initials = {
                animating: !1,
                dragging: !1,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                scrolling: !1,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: !1,
                slideOffset: 0,
                swipeLeft: null,
                swiping: !1,
                $list: null,
                touchObject: {},
                transformsEnabled: !1,
                unslicked: !1
            }, i.extend(n, n.initials), n.activeBreakpoint = null, n.animType = null, n.animProp = null, n.breakpoints = [], n.breakpointSettings = [], n.cssTransitions = !1, n.focussed = !1, n.interrupted = !1, n.hidden = "hidden", n.paused = !0, n.positionProp = null, n.respondTo = null, n.rowCount = 1, n.shouldClick = !0, n.$slider = i(t), n.$slidesCache = null, n.transformType = null, n.transitionType = null, n.visibilityChange = "visibilitychange", n.windowWidth = 0, n.windowTimer = null, s = i(t).data("slick") || {}, n.options = i.extend({}, n.defaults, o, s), n.currentSlide = n.options.initialSlide, n.originalSettings = n.options, void 0 !== document.mozHidden ? (n.hidden = "mozHidden", n.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (n.hidden = "webkitHidden", n.visibilityChange = "webkitvisibilitychange"), n.autoPlay = i.proxy(n.autoPlay, n), n.autoPlayClear = i.proxy(n.autoPlayClear, n), n.autoPlayIterator = i.proxy(n.autoPlayIterator, n), n.changeSlide = i.proxy(n.changeSlide, n), n.clickHandler = i.proxy(n.clickHandler, n), n.selectHandler = i.proxy(n.selectHandler, n), n.setPosition = i.proxy(n.setPosition, n), n.swipeHandler = i.proxy(n.swipeHandler, n), n.dragHandler = i.proxy(n.dragHandler, n), n.keyHandler = i.proxy(n.keyHandler, n), n.instanceUid = e++, n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, n.registerBreakpoints(), n.init(!0)
        }
    }()).prototype.activateADA = function() {
        this.$slideTrack.find(".slick-active").attr({
            "aria-hidden": "false"
        }).find("a, input, button, select").attr({
            tabindex: "0"
        })
    }, e.prototype.addSlide = e.prototype.slickAdd = function(e, t, o) {
        var s = this;
        if ("boolean" == typeof t) o = t, t = null;
        else if (t < 0 || t >= s.slideCount) return !1;
        s.unload(), "number" == typeof t ? 0 === t && 0 === s.$slides.length ? i(e).appendTo(s.$slideTrack) : o ? i(e).insertBefore(s.$slides.eq(t)) : i(e).insertAfter(s.$slides.eq(t)) : !0 === o ? i(e).prependTo(s.$slideTrack) : i(e).appendTo(s.$slideTrack), s.$slides = s.$slideTrack.children(this.options.slide), s.$slideTrack.children(this.options.slide).detach(), s.$slideTrack.append(s.$slides), s.$slides.each(function(e, t) {
            i(t).attr("data-slick-index", e)
        }), s.$slidesCache = s.$slides, s.reinit()
    }, e.prototype.animateHeight = function() {
        var i = this;
        if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) {
            var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
            i.$list.animate({
                height: e
            }, i.options.speed)
        }
    }, e.prototype.animateSlide = function(e, t) {
        var o = {},
            s = this;
        s.animateHeight(), !0 === s.options.rtl && !1 === s.options.vertical && (e = -e), !1 === s.transformsEnabled ? !1 === s.options.vertical ? s.$slideTrack.animate({
            left: e
        }, s.options.speed, s.options.easing, t) : s.$slideTrack.animate({
            top: e
        }, s.options.speed, s.options.easing, t) : !1 === s.cssTransitions ? (!0 === s.options.rtl && (s.currentLeft = -s.currentLeft), i({
            animStart: s.currentLeft
        }).animate({
            animStart: e
        }, {
            duration: s.options.speed,
            easing: s.options.easing,
            step: function(i) {
                i = Math.ceil(i), !1 === s.options.vertical ? (o[s.animType] = "translate(" + i + "px, 0px)", s.$slideTrack.css(o)) : (o[s.animType] = "translate(0px," + i + "px)", s.$slideTrack.css(o))
            },
            complete: function() {
                t && t.call()
            }
        })) : (s.applyTransition(), e = Math.ceil(e), !1 === s.options.vertical ? o[s.animType] = "translate3d(" + e + "px, 0px, 0px)" : o[s.animType] = "translate3d(0px," + e + "px, 0px)", s.$slideTrack.css(o), t && setTimeout(function() {
            s.disableTransition(), t.call()
        }, s.options.speed))
    }, e.prototype.getNavTarget = function() {
        var e = this,
            t = e.options.asNavFor;
        return t && null !== t && (t = i(t).not(e.$slider)), t
    }, e.prototype.asNavFor = function(e) {
        var t = this.getNavTarget();
        null !== t && "object" == typeof t && t.each(function() {
            var t = i(this).slick("getSlick");
            t.unslicked || t.slideHandler(e, !0)
        })
    }, e.prototype.applyTransition = function(i) {
        var e = this,
            t = {};
        !1 === e.options.fade ? t[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : t[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase, !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t)
    }, e.prototype.autoPlay = function() {
        var i = this;
        i.autoPlayClear(), i.slideCount > i.options.slidesToShow && (i.autoPlayTimer = setInterval(i.autoPlayIterator, i.options.autoplaySpeed))
    }, e.prototype.autoPlayClear = function() {
        var i = this;
        i.autoPlayTimer && clearInterval(i.autoPlayTimer)
    }, e.prototype.autoPlayIterator = function() {
        var i = this,
            e = i.currentSlide + i.options.slidesToScroll;
        i.paused || i.interrupted || i.focussed || (!1 === i.options.infinite && (1 === i.direction && i.currentSlide + 1 === i.slideCount - 1 ? i.direction = 0 : 0 === i.direction && (e = i.currentSlide - i.options.slidesToScroll, i.currentSlide - 1 == 0 && (i.direction = 1))), i.slideHandler(e))
    }, e.prototype.buildArrows = function() {
        var e = this;
        !0 === e.options.arrows && (e.$prevArrow = i(e.options.prevArrow).addClass("slick-arrow"), e.$nextArrow = i(e.options.nextArrow).addClass("slick-arrow"), e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows), !0 !== e.options.infinite && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1"
        }))
    }, e.prototype.buildDots = function() {
        var e, t, o = this;
        if (!0 === o.options.dots) {
            for (o.$slider.addClass("slick-dotted"), t = i("<ul />").addClass(o.options.dotsClass), e = 0; e <= o.getDotCount(); e += 1) t.append(i("<li />").append(o.options.customPaging.call(this, o, e)));
            o.$dots = t.appendTo(o.options.appendDots), o.$dots.find("li").first().addClass("slick-active")
        }
    }, e.prototype.buildOut = function() {
        var e = this;
        e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), e.slideCount = e.$slides.length, e.$slides.each(function(e, t) {
            i(t).attr("data-slick-index", e).data("originalStyling", i(t).attr("style") || "")
        }), e.$slider.addClass("slick-slider"), e.$slideTrack = 0 === e.slideCount ? i('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(), e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent(), e.$slideTrack.css("opacity", 0), !0 !== e.options.centerMode && !0 !== e.options.swipeToSlide || (e.options.slidesToScroll = 1), i("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"), e.setupInfinite(), e.buildArrows(), e.buildDots(), e.updateDots(), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), !0 === e.options.draggable && e.$list.addClass("draggable")
    }, e.prototype.buildRows = function() {
        var i, e, t, o, s, n, r, l = this;
        if (o = document.createDocumentFragment(), n = l.$slider.children(), l.options.rows > 1) {
            for (r = l.options.slidesPerRow * l.options.rows, s = Math.ceil(n.length / r), i = 0; i < s; i++) {
                var d = document.createElement("div");
                for (e = 0; e < l.options.rows; e++) {
                    var a = document.createElement("div");
                    for (t = 0; t < l.options.slidesPerRow; t++) {
                        var c = i * r + (e * l.options.slidesPerRow + t);
                        n.get(c) && a.appendChild(n.get(c))
                    }
                    d.appendChild(a)
                }
                o.appendChild(d)
            }
            l.$slider.empty().append(o), l.$slider.children().children().children().css({
                width: 100 / l.options.slidesPerRow + "%",
                display: "inline-block"
            })
        }
    }, e.prototype.checkResponsive = function(e, t) {
        var o, s, n, r = this,
            l = !1,
            d = r.$slider.width(),
            a = window.innerWidth || i(window).width();
        if ("window" === r.respondTo ? n = a : "slider" === r.respondTo ? n = d : "min" === r.respondTo && (n = Math.min(a, d)), r.options.responsive && r.options.responsive.length && null !== r.options.responsive) {
            s = null;
            for (o in r.breakpoints) r.breakpoints.hasOwnProperty(o) && (!1 === r.originalSettings.mobileFirst ? n < r.breakpoints[o] && (s = r.breakpoints[o]) : n > r.breakpoints[o] && (s = r.breakpoints[o]));
            null !== s ? null !== r.activeBreakpoint ? (s !== r.activeBreakpoint || t) && (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]), !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]), !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : null !== r.activeBreakpoint && (r.activeBreakpoint = null, r.options = r.originalSettings, !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e), l = s), e || !1 === l || r.$slider.trigger("breakpoint", [r, l])
        }
    }, e.prototype.changeSlide = function(e, t) {
        var o, s, n, r = this,
            l = i(e.currentTarget);
        switch (l.is("a") && e.preventDefault(), l.is("li") || (l = l.closest("li")), n = r.slideCount % r.options.slidesToScroll != 0, o = n ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll, e.data.message) {
            case "previous":
                s = 0 === o ? r.options.slidesToScroll : r.options.slidesToShow - o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - s, !1, t);
                break;
            case "next":
                s = 0 === o ? r.options.slidesToScroll : o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + s, !1, t);
                break;
            case "index":
                var d = 0 === e.data.index ? 0 : e.data.index || l.index() * r.options.slidesToScroll;
                r.slideHandler(r.checkNavigable(d), !1, t), l.children().trigger("focus");
                break;
            default:
                return
        }
    }, e.prototype.checkNavigable = function(i) {
        var e, t;
        if (e = this.getNavigableIndexes(), t = 0, i > e[e.length - 1]) i = e[e.length - 1];
        else
            for (var o in e) {
                if (i < e[o]) {
                    i = t;
                    break
                }
                t = e[o]
            }
        return i
    }, e.prototype.cleanUpEvents = function() {
        var e = this;
        e.options.dots && null !== e.$dots && (i("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", i.proxy(e.interrupt, e, !0)).off("mouseleave.slick", i.proxy(e.interrupt, e, !1)), !0 === e.options.accessibility && e.$dots.off("keydown.slick", e.keyHandler)), e.$slider.off("focus.slick blur.slick"), !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide), e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide), !0 === e.options.accessibility && (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler), e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))), e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler), e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler), e.$list.off("touchend.slick mouseup.slick", e.swipeHandler), e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler), e.$list.off("click.slick", e.clickHandler), i(document).off(e.visibilityChange, e.visibility), e.cleanUpSlideEvents(), !0 === e.options.accessibility && e.$list.off("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().off("click.slick", e.selectHandler), i(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange), i(window).off("resize.slick.slick-" + e.instanceUid, e.resize), i("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault), i(window).off("load.slick.slick-" + e.instanceUid, e.setPosition)
    }, e.prototype.cleanUpSlideEvents = function() {
        var e = this;
        e.$list.off("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.off("mouseleave.slick", i.proxy(e.interrupt, e, !1))
    }, e.prototype.cleanUpRows = function() {
        var i, e = this;
        e.options.rows > 1 && ((i = e.$slides.children().children()).removeAttr("style"), e.$slider.empty().append(i))
    }, e.prototype.clickHandler = function(i) {
        !1 === this.shouldClick && (i.stopImmediatePropagation(), i.stopPropagation(), i.preventDefault())
    }, e.prototype.destroy = function(e) {
        var t = this;
        t.autoPlayClear(), t.touchObject = {}, t.cleanUpEvents(), i(".slick-cloned", t.$slider).detach(), t.$dots && t.$dots.remove(), t.$prevArrow && t.$prevArrow.length && (t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()), t.$nextArrow && t.$nextArrow.length && (t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()), t.$slides && (t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
            i(this).attr("style", i(this).data("originalStyling"))
        }), t.$slideTrack.children(this.options.slide).detach(), t.$slideTrack.detach(), t.$list.detach(), t.$slider.append(t.$slides)), t.cleanUpRows(), t.$slider.removeClass("slick-slider"), t.$slider.removeClass("slick-initialized"), t.$slider.removeClass("slick-dotted"), t.unslicked = !0, e || t.$slider.trigger("destroy", [t])
    }, e.prototype.disableTransition = function(i) {
        var e = this,
            t = {};
        t[e.transitionType] = "", !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t)
    }, e.prototype.fadeSlide = function(i, e) {
        var t = this;
        !1 === t.cssTransitions ? (t.$slides.eq(i).css({
            zIndex: t.options.zIndex
        }), t.$slides.eq(i).animate({
            opacity: 1
        }, t.options.speed, t.options.easing, e)) : (t.applyTransition(i), t.$slides.eq(i).css({
            opacity: 1,
            zIndex: t.options.zIndex
        }), e && setTimeout(function() {
            t.disableTransition(i), e.call()
        }, t.options.speed))
    }, e.prototype.fadeSlideOut = function(i) {
        var e = this;
        !1 === e.cssTransitions ? e.$slides.eq(i).animate({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }, e.options.speed, e.options.easing) : (e.applyTransition(i), e.$slides.eq(i).css({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }))
    }, e.prototype.filterSlides = e.prototype.slickFilter = function(i) {
        var e = this;
        null !== i && (e.$slidesCache = e.$slides, e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.filter(i).appendTo(e.$slideTrack), e.reinit())
    }, e.prototype.focusHandler = function() {
        var e = this;
        e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", function(t) {
            t.stopImmediatePropagation();
            var o = i(this);
            setTimeout(function() {
                e.options.pauseOnFocus && (e.focussed = o.is(":focus"), e.autoPlay())
            }, 0)
        })
    }, e.prototype.getCurrent = e.prototype.slickCurrentSlide = function() {
        return this.currentSlide
    }, e.prototype.getDotCount = function() {
        var i = this,
            e = 0,
            t = 0,
            o = 0;
        if (!0 === i.options.infinite)
            if (i.slideCount <= i.options.slidesToShow) ++o;
            else
                for (; e < i.slideCount;) ++o, e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
        else if (!0 === i.options.centerMode) o = i.slideCount;
        else if (i.options.asNavFor)
            for (; e < i.slideCount;) ++o, e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
        else o = 1 + Math.ceil((i.slideCount - i.options.slidesToShow) / i.options.slidesToScroll);
        return o - 1
    }, e.prototype.getLeft = function(i) {
        var e, t, o, s, n = this,
            r = 0;
        return n.slideOffset = 0, t = n.$slides.first().outerHeight(!0), !0 === n.options.infinite ? (n.slideCount > n.options.slidesToShow && (n.slideOffset = n.slideWidth * n.options.slidesToShow * -1, s = -1, !0 === n.options.vertical && !0 === n.options.centerMode && (2 === n.options.slidesToShow ? s = -1.5 : 1 === n.options.slidesToShow && (s = -2)), r = t * n.options.slidesToShow * s), n.slideCount % n.options.slidesToScroll != 0 && i + n.options.slidesToScroll > n.slideCount && n.slideCount > n.options.slidesToShow && (i > n.slideCount ? (n.slideOffset = (n.options.slidesToShow - (i - n.slideCount)) * n.slideWidth * -1, r = (n.options.slidesToShow - (i - n.slideCount)) * t * -1) : (n.slideOffset = n.slideCount % n.options.slidesToScroll * n.slideWidth * -1, r = n.slideCount % n.options.slidesToScroll * t * -1))) : i + n.options.slidesToShow > n.slideCount && (n.slideOffset = (i + n.options.slidesToShow - n.slideCount) * n.slideWidth, r = (i + n.options.slidesToShow - n.slideCount) * t), n.slideCount <= n.options.slidesToShow && (n.slideOffset = 0, r = 0), !0 === n.options.centerMode && n.slideCount <= n.options.slidesToShow ? n.slideOffset = n.slideWidth * Math.floor(n.options.slidesToShow) / 2 - n.slideWidth * n.slideCount / 2 : !0 === n.options.centerMode && !0 === n.options.infinite ? n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2) - n.slideWidth : !0 === n.options.centerMode && (n.slideOffset = 0, n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2)), e = !1 === n.options.vertical ? i * n.slideWidth * -1 + n.slideOffset : i * t * -1 + r, !0 === n.options.variableWidth && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow), e = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, !0 === n.options.centerMode && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow + 1), e = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, e += (n.$list.width() - o.outerWidth()) / 2)), e
    }, e.prototype.getOption = e.prototype.slickGetOption = function(i) {
        return this.options[i]
    }, e.prototype.getNavigableIndexes = function() {
        var i, e = this,
            t = 0,
            o = 0,
            s = [];
        for (!1 === e.options.infinite ? i = e.slideCount : (t = -1 * e.options.slidesToScroll, o = -1 * e.options.slidesToScroll, i = 2 * e.slideCount); t < i;) s.push(t), t = o + e.options.slidesToScroll, o += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
        return s
    }, e.prototype.getSlick = function() {
        return this
    }, e.prototype.getSlideCount = function() {
        var e, t, o = this;
        return t = !0 === o.options.centerMode ? o.slideWidth * Math.floor(o.options.slidesToShow / 2) : 0, !0 === o.options.swipeToSlide ? (o.$slideTrack.find(".slick-slide").each(function(s, n) {
            if (n.offsetLeft - t + i(n).outerWidth() / 2 > -1 * o.swipeLeft) return e = n, !1
        }), Math.abs(i(e).attr("data-slick-index") - o.currentSlide) || 1) : o.options.slidesToScroll
    }, e.prototype.goTo = e.prototype.slickGoTo = function(i, e) {
        this.changeSlide({
            data: {
                message: "index",
                index: parseInt(i)
            }
        }, e)
    }, e.prototype.init = function(e) {
        var t = this;
        i(t.$slider).hasClass("slick-initialized") || (i(t.$slider).addClass("slick-initialized"), t.buildRows(), t.buildOut(), t.setProps(), t.startLoad(), t.loadSlider(), t.initializeEvents(), t.updateArrows(), t.updateDots(), t.checkResponsive(!0), t.focusHandler()), e && t.$slider.trigger("init", [t]), !0 === t.options.accessibility && t.initADA(), t.options.autoplay && (t.paused = !1, t.autoPlay())
    }, e.prototype.initADA = function() {
        var e = this,
            t = Math.ceil(e.slideCount / e.options.slidesToShow),
            o = e.getNavigableIndexes().filter(function(i) {
                return i >= 0 && i < e.slideCount
            });
        e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true",
            tabindex: "-1"
        }).find("a, input, button, select").attr({
            tabindex: "-1"
        }), null !== e.$dots && (e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(t) {
            var s = o.indexOf(t);
            i(this).attr({
                role: "tabpanel",
                id: "slick-slide" + e.instanceUid + t,
                tabindex: -1
            }), -1 !== s && i(this).attr({
                "aria-describedby": "slick-slide-control" + e.instanceUid + s
            })
        }), e.$dots.attr("role", "tablist").find("li").each(function(s) {
            var n = o[s];
            i(this).attr({
                role: "presentation"
            }), i(this).find("button").first().attr({
                role: "tab",
                id: "slick-slide-control" + e.instanceUid + s,
                "aria-controls": "slick-slide" + e.instanceUid + n,
                "aria-label": s + 1 + " of " + t,
                "aria-selected": null,
                tabindex: "-1"
            })
        }).eq(e.currentSlide).find("button").attr({
            "aria-selected": "true",
            tabindex: "0"
        }).end());
        for (var s = e.currentSlide, n = s + e.options.slidesToShow; s < n; s++) e.$slides.eq(s).attr("tabindex", 0);
        e.activateADA()
    }, e.prototype.initArrowEvents = function() {
        var i = this;
        !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.off("click.slick").on("click.slick", {
            message: "previous"
        }, i.changeSlide), i.$nextArrow.off("click.slick").on("click.slick", {
            message: "next"
        }, i.changeSlide), !0 === i.options.accessibility && (i.$prevArrow.on("keydown.slick", i.keyHandler), i.$nextArrow.on("keydown.slick", i.keyHandler)))
    }, e.prototype.initDotEvents = function() {
        var e = this;
        !0 === e.options.dots && (i("li", e.$dots).on("click.slick", {
            message: "index"
        }, e.changeSlide), !0 === e.options.accessibility && e.$dots.on("keydown.slick", e.keyHandler)), !0 === e.options.dots && !0 === e.options.pauseOnDotsHover && i("li", e.$dots).on("mouseenter.slick", i.proxy(e.interrupt, e, !0)).on("mouseleave.slick", i.proxy(e.interrupt, e, !1))
    }, e.prototype.initSlideEvents = function() {
        var e = this;
        e.options.pauseOnHover && (e.$list.on("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.on("mouseleave.slick", i.proxy(e.interrupt, e, !1)))
    }, e.prototype.initializeEvents = function() {
        var e = this;
        e.initArrowEvents(), e.initDotEvents(), e.initSlideEvents(), e.$list.on("touchstart.slick mousedown.slick", {
            action: "start"
        }, e.swipeHandler), e.$list.on("touchmove.slick mousemove.slick", {
            action: "move"
        }, e.swipeHandler), e.$list.on("touchend.slick mouseup.slick", {
            action: "end"
        }, e.swipeHandler), e.$list.on("touchcancel.slick mouseleave.slick", {
            action: "end"
        }, e.swipeHandler), e.$list.on("click.slick", e.clickHandler), i(document).on(e.visibilityChange, i.proxy(e.visibility, e)), !0 === e.options.accessibility && e.$list.on("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.slick", e.selectHandler), i(window).on("orientationchange.slick.slick-" + e.instanceUid, i.proxy(e.orientationChange, e)), i(window).on("resize.slick.slick-" + e.instanceUid, i.proxy(e.resize, e)), i("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault), i(window).on("load.slick.slick-" + e.instanceUid, e.setPosition), i(e.setPosition)
    }, e.prototype.initUI = function() {
        var i = this;
        !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.show(), i.$nextArrow.show()), !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.show()
    }, e.prototype.keyHandler = function(i) {
        var e = this;
        i.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === i.keyCode && !0 === e.options.accessibility ? e.changeSlide({
            data: {
                message: !0 === e.options.rtl ? "next" : "previous"
            }
        }) : 39 === i.keyCode && !0 === e.options.accessibility && e.changeSlide({
            data: {
                message: !0 === e.options.rtl ? "previous" : "next"
            }
        }))
    }, e.prototype.lazyLoad = function() {
        function e(e) {
            i("img[data-lazy]", e).each(function() {
                var e = i(this),
                    t = i(this).attr("data-lazy"),
                    o = i(this).attr("data-srcset"),
                    s = i(this).attr("data-sizes") || n.$slider.attr("data-sizes"),
                    r = document.createElement("img");
                r.onload = function() {
                    e.animate({
                        opacity: 0
                    }, 100, function() {
                        o && (e.attr("srcset", o), s && e.attr("sizes", s)), e.attr("src", t).animate({
                            opacity: 1
                        }, 200, function() {
                            e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")
                        }), n.$slider.trigger("lazyLoaded", [n, e, t])
                    })
                }, r.onerror = function() {
                    e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), n.$slider.trigger("lazyLoadError", [n, e, t])
                }, r.src = t
            })
        }
        var t, o, s, n = this;
        if (!0 === n.options.centerMode ? !0 === n.options.infinite ? s = (o = n.currentSlide + (n.options.slidesToShow / 2 + 1)) + n.options.slidesToShow + 2 : (o = Math.max(0, n.currentSlide - (n.options.slidesToShow / 2 + 1)), s = n.options.slidesToShow / 2 + 1 + 2 + n.currentSlide) : (o = n.options.infinite ? n.options.slidesToShow + n.currentSlide : n.currentSlide, s = Math.ceil(o + n.options.slidesToShow), !0 === n.options.fade && (o > 0 && o--, s <= n.slideCount && s++)), t = n.$slider.find(".slick-slide").slice(o, s), "anticipated" === n.options.lazyLoad)
            for (var r = o - 1, l = s, d = n.$slider.find(".slick-slide"), a = 0; a < n.options.slidesToScroll; a++) r < 0 && (r = n.slideCount - 1), t = (t = t.add(d.eq(r))).add(d.eq(l)), r--, l++;
        e(t), n.slideCount <= n.options.slidesToShow ? e(n.$slider.find(".slick-slide")) : n.currentSlide >= n.slideCount - n.options.slidesToShow ? e(n.$slider.find(".slick-cloned").slice(0, n.options.slidesToShow)) : 0 === n.currentSlide && e(n.$slider.find(".slick-cloned").slice(-1 * n.options.slidesToShow))
    }, e.prototype.loadSlider = function() {
        var i = this;
        i.setPosition(), i.$slideTrack.css({
            opacity: 1
        }), i.$slider.removeClass("slick-loading"), i.initUI(), "progressive" === i.options.lazyLoad && i.progressiveLazyLoad()
    }, e.prototype.next = e.prototype.slickNext = function() {
        this.changeSlide({
            data: {
                message: "next"
            }
        })
    }, e.prototype.orientationChange = function() {
        var i = this;
        i.checkResponsive(), i.setPosition()
    }, e.prototype.pause = e.prototype.slickPause = function() {
        var i = this;
        i.autoPlayClear(), i.paused = !0
    }, e.prototype.play = e.prototype.slickPlay = function() {
        var i = this;
        i.autoPlay(), i.options.autoplay = !0, i.paused = !1, i.focussed = !1, i.interrupted = !1
    }, e.prototype.postSlide = function(e) {
        var t = this;
        t.unslicked || (t.$slider.trigger("afterChange", [t, e]), t.animating = !1, t.slideCount > t.options.slidesToShow && t.setPosition(), t.swipeLeft = null, t.options.autoplay && t.autoPlay(), !0 === t.options.accessibility && (t.initADA(), t.options.focusOnChange && i(t.$slides.get(t.currentSlide)).attr("tabindex", 0).focus()))
    }, e.prototype.prev = e.prototype.slickPrev = function() {
        this.changeSlide({
            data: {
                message: "previous"
            }
        })
    }, e.prototype.preventDefault = function(i) {
        i.preventDefault()
    }, e.prototype.progressiveLazyLoad = function(e) {
        e = e || 1;
        var t, o, s, n, r, l = this,
            d = i("img[data-lazy]", l.$slider);
        d.length ? (t = d.first(), o = t.attr("data-lazy"), s = t.attr("data-srcset"), n = t.attr("data-sizes") || l.$slider.attr("data-sizes"), (r = document.createElement("img")).onload = function() {
            s && (t.attr("srcset", s), n && t.attr("sizes", n)), t.attr("src", o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"), !0 === l.options.adaptiveHeight && l.setPosition(), l.$slider.trigger("lazyLoaded", [l, t, o]), l.progressiveLazyLoad()
        }, r.onerror = function() {
            e < 3 ? setTimeout(function() {
                l.progressiveLazyLoad(e + 1)
            }, 500) : (t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), l.$slider.trigger("lazyLoadError", [l, t, o]), l.progressiveLazyLoad())
        }, r.src = o) : l.$slider.trigger("allImagesLoaded", [l])
    }, e.prototype.refresh = function(e) {
        var t, o, s = this;
        o = s.slideCount - s.options.slidesToShow, !s.options.infinite && s.currentSlide > o && (s.currentSlide = o), s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0), t = s.currentSlide, s.destroy(!0), i.extend(s, s.initials, {
            currentSlide: t
        }), s.init(), e || s.changeSlide({
            data: {
                message: "index",
                index: t
            }
        }, !1)
    }, e.prototype.registerBreakpoints = function() {
        var e, t, o, s = this,
            n = s.options.responsive || null;
        if ("array" === i.type(n) && n.length) {
            s.respondTo = s.options.respondTo || "window";
            for (e in n)
                if (o = s.breakpoints.length - 1, n.hasOwnProperty(e)) {
                    for (t = n[e].breakpoint; o >= 0;) s.breakpoints[o] && s.breakpoints[o] === t && s.breakpoints.splice(o, 1), o--;
                    s.breakpoints.push(t), s.breakpointSettings[t] = n[e].settings
                }
            s.breakpoints.sort(function(i, e) {
                return s.options.mobileFirst ? i - e : e - i
            })
        }
    }, e.prototype.reinit = function() {
        var e = this;
        e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"), e.slideCount = e.$slides.length, e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), e.registerBreakpoints(), e.setProps(), e.setupInfinite(), e.buildArrows(), e.updateArrows(), e.initArrowEvents(), e.buildDots(), e.updateDots(), e.initDotEvents(), e.cleanUpSlideEvents(), e.initSlideEvents(), e.checkResponsive(!1, !0), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.slick", e.selectHandler), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.setPosition(), e.focusHandler(), e.paused = !e.options.autoplay, e.autoPlay(), e.$slider.trigger("reInit", [e])
    }, e.prototype.resize = function() {
        var e = this;
        i(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay), e.windowDelay = window.setTimeout(function() {
            e.windowWidth = i(window).width(), e.checkResponsive(), e.unslicked || e.setPosition()
        }, 50))
    }, e.prototype.removeSlide = e.prototype.slickRemove = function(i, e, t) {
        var o = this;
        if (i = "boolean" == typeof i ? !0 === (e = i) ? 0 : o.slideCount - 1 : !0 === e ? --i : i, o.slideCount < 1 || i < 0 || i > o.slideCount - 1) return !1;
        o.unload(), !0 === t ? o.$slideTrack.children().remove() : o.$slideTrack.children(this.options.slide).eq(i).remove(), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slidesCache = o.$slides, o.reinit()
    }, e.prototype.setCSS = function(i) {
        var e, t, o = this,
            s = {};
        !0 === o.options.rtl && (i = -i), e = "left" == o.positionProp ? Math.ceil(i) + "px" : "0px", t = "top" == o.positionProp ? Math.ceil(i) + "px" : "0px", s[o.positionProp] = i, !1 === o.transformsEnabled ? o.$slideTrack.css(s) : (s = {}, !1 === o.cssTransitions ? (s[o.animType] = "translate(" + e + ", " + t + ")", o.$slideTrack.css(s)) : (s[o.animType] = "translate3d(" + e + ", " + t + ", 0px)", o.$slideTrack.css(s)))
    }, e.prototype.setDimensions = function() {
        var i = this;
        !1 === i.options.vertical ? !0 === i.options.centerMode && i.$list.css({
            padding: "0px " + i.options.centerPadding
        }) : (i.$list.height(i.$slides.first().outerHeight(!0) * i.options.slidesToShow), !0 === i.options.centerMode && i.$list.css({
            padding: i.options.centerPadding + " 0px"
        })), i.listWidth = i.$list.width(), i.listHeight = i.$list.height(), !1 === i.options.vertical && !1 === i.options.variableWidth ? (i.slideWidth = Math.ceil(i.listWidth / i.options.slidesToShow), i.$slideTrack.width(Math.ceil(i.slideWidth * i.$slideTrack.children(".slick-slide").length))) : !0 === i.options.variableWidth ? i.$slideTrack.width(5e3 * i.slideCount) : (i.slideWidth = Math.ceil(i.listWidth), i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0) * i.$slideTrack.children(".slick-slide").length)));
        var e = i.$slides.first().outerWidth(!0) - i.$slides.first().width();
        !1 === i.options.variableWidth && i.$slideTrack.children(".slick-slide").width(i.slideWidth - e)
    }, e.prototype.setFade = function() {
        var e, t = this;
        t.$slides.each(function(o, s) {
            e = t.slideWidth * o * -1, !0 === t.options.rtl ? i(s).css({
                position: "relative",
                right: e,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0
            }) : i(s).css({
                position: "relative",
                left: e,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0
            })
        }), t.$slides.eq(t.currentSlide).css({
            zIndex: t.options.zIndex - 1,
            opacity: 1
        })
    }, e.prototype.setHeight = function() {
        var i = this;
        if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) {
            var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
            i.$list.css("height", e)
        }
    }, e.prototype.setOption = e.prototype.slickSetOption = function() {
        var e, t, o, s, n, r = this,
            l = !1;
        if ("object" === i.type(arguments[0]) ? (o = arguments[0], l = arguments[1], n = "multiple") : "string" === i.type(arguments[0]) && (o = arguments[0], s = arguments[1], l = arguments[2], "responsive" === arguments[0] && "array" === i.type(arguments[1]) ? n = "responsive" : void 0 !== arguments[1] && (n = "single")), "single" === n) r.options[o] = s;
        else if ("multiple" === n) i.each(o, function(i, e) {
            r.options[i] = e
        });
        else if ("responsive" === n)
            for (t in s)
                if ("array" !== i.type(r.options.responsive)) r.options.responsive = [s[t]];
                else {
                    for (e = r.options.responsive.length - 1; e >= 0;) r.options.responsive[e].breakpoint === s[t].breakpoint && r.options.responsive.splice(e, 1), e--;
                    r.options.responsive.push(s[t])
                }
        l && (r.unload(), r.reinit())
    }, e.prototype.setPosition = function() {
        var i = this;
        i.setDimensions(), i.setHeight(), !1 === i.options.fade ? i.setCSS(i.getLeft(i.currentSlide)) : i.setFade(), i.$slider.trigger("setPosition", [i])
    }, e.prototype.setProps = function() {
        var i = this,
            e = document.body.style;
        i.positionProp = !0 === i.options.vertical ? "top" : "left", "top" === i.positionProp ? i.$slider.addClass("slick-vertical") : i.$slider.removeClass("slick-vertical"), void 0 === e.WebkitTransition && void 0 === e.MozTransition && void 0 === e.msTransition || !0 === i.options.useCSS && (i.cssTransitions = !0), i.options.fade && ("number" == typeof i.options.zIndex ? i.options.zIndex < 3 && (i.options.zIndex = 3) : i.options.zIndex = i.defaults.zIndex), void 0 !== e.OTransform && (i.animType = "OTransform", i.transformType = "-o-transform", i.transitionType = "OTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.MozTransform && (i.animType = "MozTransform", i.transformType = "-moz-transform", i.transitionType = "MozTransition", void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (i.animType = !1)), void 0 !== e.webkitTransform && (i.animType = "webkitTransform", i.transformType = "-webkit-transform", i.transitionType = "webkitTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.msTransform && (i.animType = "msTransform", i.transformType = "-ms-transform", i.transitionType = "msTransition", void 0 === e.msTransform && (i.animType = !1)), void 0 !== e.transform && !1 !== i.animType && (i.animType = "transform", i.transformType = "transform", i.transitionType = "transition"), i.transformsEnabled = i.options.useTransform && null !== i.animType && !1 !== i.animType
    }, e.prototype.setSlideClasses = function(i) {
        var e, t, o, s, n = this;
        if (t = n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), n.$slides.eq(i).addClass("slick-current"), !0 === n.options.centerMode) {
            var r = n.options.slidesToShow % 2 == 0 ? 1 : 0;
            e = Math.floor(n.options.slidesToShow / 2), !0 === n.options.infinite && (i >= e && i <= n.slideCount - 1 - e ? n.$slides.slice(i - e + r, i + e + 1).addClass("slick-active").attr("aria-hidden", "false") : (o = n.options.slidesToShow + i, t.slice(o - e + 1 + r, o + e + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === i ? t.eq(t.length - 1 - n.options.slidesToShow).addClass("slick-center") : i === n.slideCount - 1 && t.eq(n.options.slidesToShow).addClass("slick-center")), n.$slides.eq(i).addClass("slick-center")
        } else i >= 0 && i <= n.slideCount - n.options.slidesToShow ? n.$slides.slice(i, i + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : t.length <= n.options.slidesToShow ? t.addClass("slick-active").attr("aria-hidden", "false") : (s = n.slideCount % n.options.slidesToShow, o = !0 === n.options.infinite ? n.options.slidesToShow + i : i, n.options.slidesToShow == n.options.slidesToScroll && n.slideCount - i < n.options.slidesToShow ? t.slice(o - (n.options.slidesToShow - s), o + s).addClass("slick-active").attr("aria-hidden", "false") : t.slice(o, o + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));
        "ondemand" !== n.options.lazyLoad && "anticipated" !== n.options.lazyLoad || n.lazyLoad()
    }, e.prototype.setupInfinite = function() {
        var e, t, o, s = this;
        if (!0 === s.options.fade && (s.options.centerMode = !1), !0 === s.options.infinite && !1 === s.options.fade && (t = null, s.slideCount > s.options.slidesToShow)) {
            for (o = !0 === s.options.centerMode ? s.options.slidesToShow + 1 : s.options.slidesToShow, e = s.slideCount; e > s.slideCount - o; e -= 1) t = e - 1, i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t - s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");
            for (e = 0; e < o + s.slideCount; e += 1) t = e, i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t + s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");
            s.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                i(this).attr("id", "")
            })
        }
    }, e.prototype.interrupt = function(i) {
        var e = this;
        i || e.autoPlay(), e.interrupted = i
    }, e.prototype.selectHandler = function(e) {
        var t = this,
            o = i(e.target).is(".slick-slide") ? i(e.target) : i(e.target).parents(".slick-slide"),
            s = parseInt(o.attr("data-slick-index"));
        s || (s = 0), t.slideCount <= t.options.slidesToShow ? t.slideHandler(s, !1, !0) : t.slideHandler(s)
    }, e.prototype.slideHandler = function(i, e, t) {
        var o, s, n, r, l, d = null,
            a = this;
        if (e = e || !1, !(!0 === a.animating && !0 === a.options.waitForAnimate || !0 === a.options.fade && a.currentSlide === i))
            if (!1 === e && a.asNavFor(i), o = i, d = a.getLeft(o), r = a.getLeft(a.currentSlide), a.currentLeft = null === a.swipeLeft ? r : a.swipeLeft, !1 === a.options.infinite && !1 === a.options.centerMode && (i < 0 || i > a.getDotCount() * a.options.slidesToScroll)) !1 === a.options.fade && (o = a.currentSlide, !0 !== t ? a.animateSlide(r, function() {
                a.postSlide(o)
            }) : a.postSlide(o));
            else if (!1 === a.options.infinite && !0 === a.options.centerMode && (i < 0 || i > a.slideCount - a.options.slidesToScroll)) !1 === a.options.fade && (o = a.currentSlide, !0 !== t ? a.animateSlide(r, function() {
            a.postSlide(o)
        }) : a.postSlide(o));
        else {
            if (a.options.autoplay && clearInterval(a.autoPlayTimer), s = o < 0 ? a.slideCount % a.options.slidesToScroll != 0 ? a.slideCount - a.slideCount % a.options.slidesToScroll : a.slideCount + o : o >= a.slideCount ? a.slideCount % a.options.slidesToScroll != 0 ? 0 : o - a.slideCount : o, a.animating = !0, a.$slider.trigger("beforeChange", [a, a.currentSlide, s]), n = a.currentSlide, a.currentSlide = s, a.setSlideClasses(a.currentSlide), a.options.asNavFor && (l = (l = a.getNavTarget()).slick("getSlick")).slideCount <= l.options.slidesToShow && l.setSlideClasses(a.currentSlide), a.updateDots(), a.updateArrows(), !0 === a.options.fade) return !0 !== t ? (a.fadeSlideOut(n), a.fadeSlide(s, function() {
                a.postSlide(s)
            })) : a.postSlide(s), void a.animateHeight();
            !0 !== t ? a.animateSlide(d, function() {
                a.postSlide(s)
            }) : a.postSlide(s)
        }
    }, e.prototype.startLoad = function() {
        var i = this;
        !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.hide(), i.$nextArrow.hide()), !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.hide(), i.$slider.addClass("slick-loading")
    }, e.prototype.swipeDirection = function() {
        var i, e, t, o, s = this;
        return i = s.touchObject.startX - s.touchObject.curX, e = s.touchObject.startY - s.touchObject.curY, t = Math.atan2(e, i), (o = Math.round(180 * t / Math.PI)) < 0 && (o = 360 - Math.abs(o)), o <= 45 && o >= 0 ? !1 === s.options.rtl ? "left" : "right" : o <= 360 && o >= 315 ? !1 === s.options.rtl ? "left" : "right" : o >= 135 && o <= 225 ? !1 === s.options.rtl ? "right" : "left" : !0 === s.options.verticalSwiping ? o >= 35 && o <= 135 ? "down" : "up" : "vertical"
    }, e.prototype.swipeEnd = function(i) {
        var e, t, o = this;
        if (o.dragging = !1, o.swiping = !1, o.scrolling) return o.scrolling = !1, !1;
        if (o.interrupted = !1, o.shouldClick = !(o.touchObject.swipeLength > 10), void 0 === o.touchObject.curX) return !1;
        if (!0 === o.touchObject.edgeHit && o.$slider.trigger("edge", [o, o.swipeDirection()]), o.touchObject.swipeLength >= o.touchObject.minSwipe) {
            switch (t = o.swipeDirection()) {
                case "left":
                case "down":
                    e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide + o.getSlideCount()) : o.currentSlide + o.getSlideCount(), o.currentDirection = 0;
                    break;
                case "right":
                case "up":
                    e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide - o.getSlideCount()) : o.currentSlide - o.getSlideCount(), o.currentDirection = 1
            }
            "vertical" != t && (o.slideHandler(e), o.touchObject = {}, o.$slider.trigger("swipe", [o, t]))
        } else o.touchObject.startX !== o.touchObject.curX && (o.slideHandler(o.currentSlide), o.touchObject = {})
    }, e.prototype.swipeHandler = function(i) {
        var e = this;
        if (!(!1 === e.options.swipe || "ontouchend" in document && !1 === e.options.swipe || !1 === e.options.draggable && -1 !== i.type.indexOf("mouse"))) switch (e.touchObject.fingerCount = i.originalEvent && void 0 !== i.originalEvent.touches ? i.originalEvent.touches.length : 1, e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold, !0 === e.options.verticalSwiping && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold), i.data.action) {
            case "start":
                e.swipeStart(i);
                break;
            case "move":
                e.swipeMove(i);
                break;
            case "end":
                e.swipeEnd(i)
        }
    }, e.prototype.swipeMove = function(i) {
        var e, t, o, s, n, r, l = this;
        return n = void 0 !== i.originalEvent ? i.originalEvent.touches : null, !(!l.dragging || l.scrolling || n && 1 !== n.length) && (e = l.getLeft(l.currentSlide), l.touchObject.curX = void 0 !== n ? n[0].pageX : i.clientX, l.touchObject.curY = void 0 !== n ? n[0].pageY : i.clientY, l.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(l.touchObject.curX - l.touchObject.startX, 2))), r = Math.round(Math.sqrt(Math.pow(l.touchObject.curY - l.touchObject.startY, 2))), !l.options.verticalSwiping && !l.swiping && r > 4 ? (l.scrolling = !0, !1) : (!0 === l.options.verticalSwiping && (l.touchObject.swipeLength = r), t = l.swipeDirection(), void 0 !== i.originalEvent && l.touchObject.swipeLength > 4 && (l.swiping = !0, i.preventDefault()), s = (!1 === l.options.rtl ? 1 : -1) * (l.touchObject.curX > l.touchObject.startX ? 1 : -1), !0 === l.options.verticalSwiping && (s = l.touchObject.curY > l.touchObject.startY ? 1 : -1), o = l.touchObject.swipeLength, l.touchObject.edgeHit = !1, !1 === l.options.infinite && (0 === l.currentSlide && "right" === t || l.currentSlide >= l.getDotCount() && "left" === t) && (o = l.touchObject.swipeLength * l.options.edgeFriction, l.touchObject.edgeHit = !0), !1 === l.options.vertical ? l.swipeLeft = e + o * s : l.swipeLeft = e + o * (l.$list.height() / l.listWidth) * s, !0 === l.options.verticalSwiping && (l.swipeLeft = e + o * s), !0 !== l.options.fade && !1 !== l.options.touchMove && (!0 === l.animating ? (l.swipeLeft = null, !1) : void l.setCSS(l.swipeLeft))))
    }, e.prototype.swipeStart = function(i) {
        var e, t = this;
        if (t.interrupted = !0, 1 !== t.touchObject.fingerCount || t.slideCount <= t.options.slidesToShow) return t.touchObject = {}, !1;
        void 0 !== i.originalEvent && void 0 !== i.originalEvent.touches && (e = i.originalEvent.touches[0]), t.touchObject.startX = t.touchObject.curX = void 0 !== e ? e.pageX : i.clientX, t.touchObject.startY = t.touchObject.curY = void 0 !== e ? e.pageY : i.clientY, t.dragging = !0
    }, e.prototype.unfilterSlides = e.prototype.slickUnfilter = function() {
        var i = this;
        null !== i.$slidesCache && (i.unload(), i.$slideTrack.children(this.options.slide).detach(), i.$slidesCache.appendTo(i.$slideTrack), i.reinit())
    }, e.prototype.unload = function() {
        var e = this;
        i(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(), e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(), e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    }, e.prototype.unslick = function(i) {
        var e = this;
        e.$slider.trigger("unslick", [e, i]), e.destroy()
    }, e.prototype.updateArrows = function() {
        var i = this;
        Math.floor(i.options.slidesToShow / 2), !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && !i.options.infinite && (i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === i.currentSlide ? (i.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - i.options.slidesToShow && !1 === i.options.centerMode ? (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - 1 && !0 === i.options.centerMode && (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
    }, e.prototype.updateDots = function() {
        var i = this;
        null !== i.$dots && (i.$dots.find("li").removeClass("slick-active").end(), i.$dots.find("li").eq(Math.floor(i.currentSlide / i.options.slidesToScroll)).addClass("slick-active"))
    }, e.prototype.visibility = function() {
        var i = this;
        i.options.autoplay && (document[i.hidden] ? i.interrupted = !0 : i.interrupted = !1)
    }, i.fn.slick = function() {
        var i, t, o = this,
            s = arguments[0],
            n = Array.prototype.slice.call(arguments, 1),
            r = o.length;
        for (i = 0; i < r; i++)
            if ("object" == typeof s || void 0 === s ? o[i].slick = new e(o[i], s) : t = o[i].slick[s].apply(o[i].slick, n), void 0 !== t) return t;
        return o
    }
});

/*! Magnific Popup - v1.1.0 - 2016-02-20
 * http://dimsemenov.com/plugins/magnific-popup/
 * Copyright (c) 2016 Dmitry Semenov; */
! function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof exports ? require("jquery") : window.jQuery || window.Zepto)
}(function(a) {
    var b, c, d, e, f, g, h = "Close",
        i = "BeforeClose",
        j = "AfterClose",
        k = "BeforeAppend",
        l = "MarkupParse",
        m = "Open",
        n = "Change",
        o = "mfp",
        p = "." + o,
        q = "mfp-ready",
        r = "mfp-removing",
        s = "mfp-prevent-close",
        t = function() {},
        u = !!window.jQuery,
        v = a(window),
        w = function(a, c) {
            b.ev.on(o + a + p, c)
        },
        x = function(b, c, d, e) {
            var f = document.createElement("div");
            return f.className = "mfp-" + b, d && (f.innerHTML = d), e ? c && c.appendChild(f) : (f = a(f), c && f.appendTo(c)), f
        },
        y = function(c, d) {
            b.ev.triggerHandler(o + c, d), b.st.callbacks && (c = c.charAt(0).toLowerCase() + c.slice(1), b.st.callbacks[c] && b.st.callbacks[c].apply(b, a.isArray(d) ? d : [d]))
        },
        z = function(c) {
            return c === g && b.currTemplate.closeBtn || (b.currTemplate.closeBtn = a(b.st.closeMarkup.replace("%title%", b.st.tClose)), g = c), b.currTemplate.closeBtn
        },
        A = function() {
            a.magnificPopup.instance || (b = new t, b.init(), a.magnificPopup.instance = b)
        },
        B = function() {
            var a = document.createElement("p").style,
                b = ["ms", "O", "Moz", "Webkit"];
            if (void 0 !== a.transition) return !0;
            for (; b.length;)
                if (b.pop() + "Transition" in a) return !0;
            return !1
        };
    t.prototype = {
        constructor: t,
        init: function() {
            var c = navigator.appVersion;
            b.isLowIE = b.isIE8 = document.all && !document.addEventListener, b.isAndroid = /android/gi.test(c), b.isIOS = /iphone|ipad|ipod/gi.test(c), b.supportsTransition = B(), b.probablyMobile = b.isAndroid || b.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), d = a(document), b.popupsCache = {}
        },
        open: function(c) {
            var e;
            if (c.isObj === !1) {
                b.items = c.items.toArray(), b.index = 0;
                var g, h = c.items;
                for (e = 0; e < h.length; e++)
                    if (g = h[e], g.parsed && (g = g.el[0]), g === c.el[0]) {
                        b.index = e;
                        break
                    }
            } else b.items = a.isArray(c.items) ? c.items : [c.items], b.index = c.index || 0;
            if (b.isOpen) return void b.updateItemHTML();
            b.types = [], f = "", c.mainEl && c.mainEl.length ? b.ev = c.mainEl.eq(0) : b.ev = d, c.key ? (b.popupsCache[c.key] || (b.popupsCache[c.key] = {}), b.currTemplate = b.popupsCache[c.key]) : b.currTemplate = {}, b.st = a.extend(!0, {}, a.magnificPopup.defaults, c), b.fixedContentPos = "auto" === b.st.fixedContentPos ? !b.probablyMobile : b.st.fixedContentPos, b.st.modal && (b.st.closeOnContentClick = !1, b.st.closeOnBgClick = !1, b.st.showCloseBtn = !1, b.st.enableEscapeKey = !1), b.bgOverlay || (b.bgOverlay = x("bg").on("click" + p, function() {
                b.close()
            }), b.wrap = x("wrap").attr("tabindex", -1).on("click" + p, function(a) {
                b._checkIfClose(a.target) && b.close()
            }), b.container = x("container", b.wrap)), b.contentContainer = x("content"), b.st.preloader && (b.preloader = x("preloader", b.container, b.st.tLoading));
            var i = a.magnificPopup.modules;
            for (e = 0; e < i.length; e++) {
                var j = i[e];
                j = j.charAt(0).toUpperCase() + j.slice(1), b["init" + j].call(b)
            }
            y("BeforeOpen"), b.st.showCloseBtn && (b.st.closeBtnInside ? (w(l, function(a, b, c, d) {
                c.close_replaceWith = z(d.type)
            }), f += " mfp-close-btn-in") : b.wrap.append(z())), b.st.alignTop && (f += " mfp-align-top"), b.fixedContentPos ? b.wrap.css({
                overflow: b.st.overflowY,
                overflowX: "hidden",
                overflowY: b.st.overflowY
            }) : b.wrap.css({
                top: v.scrollTop(),
                position: "absolute"
            }), (b.st.fixedBgPos === !1 || "auto" === b.st.fixedBgPos && !b.fixedContentPos) && b.bgOverlay.css({
                height: d.height(),
                position: "absolute"
            }), b.st.enableEscapeKey && d.on("keyup" + p, function(a) {
                27 === a.keyCode && b.close()
            }), v.on("resize" + p, function() {
                b.updateSize()
            }), b.st.closeOnContentClick || (f += " mfp-auto-cursor"), f && b.wrap.addClass(f);
            var k = b.wH = v.height(),
                n = {};
            if (b.fixedContentPos && b._hasScrollBar(k)) {
                var o = b._getScrollbarSize();
                o && (n.marginRight = o)
            }
            b.fixedContentPos && (b.isIE7 ? a("body, html").css("overflow", "hidden") : n.overflow = "hidden");
            var r = b.st.mainClass;
            return b.isIE7 && (r += " mfp-ie7"), r && b._addClassToMFP(r), b.updateItemHTML(), y("BuildControls"), a("html").css(n), b.bgOverlay.add(b.wrap).prependTo(b.st.prependTo || a(document.body)), b._lastFocusedEl = document.activeElement, setTimeout(function() {
                b.content ? (b._addClassToMFP(q), b._setFocus()) : b.bgOverlay.addClass(q), d.on("focusin" + p, b._onFocusIn)
            }, 16), b.isOpen = !0, b.updateSize(k), y(m), c
        },
        close: function() {
            b.isOpen && (y(i), b.isOpen = !1, b.st.removalDelay && !b.isLowIE && b.supportsTransition ? (b._addClassToMFP(r), setTimeout(function() {
                b._close()
            }, b.st.removalDelay)) : b._close())
        },
        _close: function() {
            y(h);
            var c = r + " " + q + " ";
            if (b.bgOverlay.detach(), b.wrap.detach(), b.container.empty(), b.st.mainClass && (c += b.st.mainClass + " "), b._removeClassFromMFP(c), b.fixedContentPos) {
                var e = {
                    marginRight: ""
                };
                b.isIE7 ? a("body, html").css("overflow", "") : e.overflow = "", a("html").css(e)
            }
            d.off("keyup" + p + " focusin" + p), b.ev.off(p), b.wrap.attr("class", "mfp-wrap").removeAttr("style"), b.bgOverlay.attr("class", "mfp-bg"), b.container.attr("class", "mfp-container"), !b.st.showCloseBtn || b.st.closeBtnInside && b.currTemplate[b.currItem.type] !== !0 || b.currTemplate.closeBtn && b.currTemplate.closeBtn.detach(), b.st.autoFocusLast && b._lastFocusedEl && a(b._lastFocusedEl).focus(), b.currItem = null, b.content = null, b.currTemplate = null, b.prevHeight = 0, y(j)
        },
        updateSize: function(a) {
            if (b.isIOS) {
                var c = document.documentElement.clientWidth / window.innerWidth,
                    d = window.innerHeight * c;
                b.wrap.css("height", d), b.wH = d
            } else b.wH = a || v.height();
            b.fixedContentPos || b.wrap.css("height", b.wH), y("Resize")
        },
        updateItemHTML: function() {
            var c = b.items[b.index];
            b.contentContainer.detach(), b.content && b.content.detach(), c.parsed || (c = b.parseEl(b.index));
            var d = c.type;
            if (y("BeforeChange", [b.currItem ? b.currItem.type : "", d]), b.currItem = c, !b.currTemplate[d]) {
                var f = b.st[d] ? b.st[d].markup : !1;
                y("FirstMarkupParse", f), f ? b.currTemplate[d] = a(f) : b.currTemplate[d] = !0
            }
            e && e !== c.type && b.container.removeClass("mfp-" + e + "-holder");
            var g = b["get" + d.charAt(0).toUpperCase() + d.slice(1)](c, b.currTemplate[d]);
            b.appendContent(g, d), c.preloaded = !0, y(n, c), e = c.type, b.container.prepend(b.contentContainer), y("AfterChange")
        },
        appendContent: function(a, c) {
            b.content = a, a ? b.st.showCloseBtn && b.st.closeBtnInside && b.currTemplate[c] === !0 ? b.content.find(".mfp-close").length || b.content.append(z()) : b.content = a : b.content = "", y(k), b.container.addClass("mfp-" + c + "-holder"), b.contentContainer.append(b.content)
        },
        parseEl: function(c) {
            var d, e = b.items[c];
            if (e.tagName ? e = {
                    el: a(e)
                } : (d = e.type, e = {
                    data: e,
                    src: e.src
                }), e.el) {
                for (var f = b.types, g = 0; g < f.length; g++)
                    if (e.el.hasClass("mfp-" + f[g])) {
                        d = f[g];
                        break
                    }
                e.src = e.el.attr("data-mfp-src"), e.src || (e.src = e.el.attr("href"))
            }
            return e.type = d || b.st.type || "inline", e.index = c, e.parsed = !0, b.items[c] = e, y("ElementParse", e), b.items[c]
        },
        addGroup: function(a, c) {
            var d = function(d) {
                d.mfpEl = this, b._openClick(d, a, c)
            };
            c || (c = {});
            var e = "click.magnificPopup";
            c.mainEl = a, c.items ? (c.isObj = !0, a.off(e).on(e, d)) : (c.isObj = !1, c.delegate ? a.off(e).on(e, c.delegate, d) : (c.items = a, a.off(e).on(e, d)))
        },
        _openClick: function(c, d, e) {
            var f = void 0 !== e.midClick ? e.midClick : a.magnificPopup.defaults.midClick;
            if (f || !(2 === c.which || c.ctrlKey || c.metaKey || c.altKey || c.shiftKey)) {
                var g = void 0 !== e.disableOn ? e.disableOn : a.magnificPopup.defaults.disableOn;
                if (g)
                    if (a.isFunction(g)) {
                        if (!g.call(b)) return !0
                    } else if (v.width() < g) return !0;
                c.type && (c.preventDefault(), b.isOpen && c.stopPropagation()), e.el = a(c.mfpEl), e.delegate && (e.items = d.find(e.delegate)), b.open(e)
            }
        },
        updateStatus: function(a, d) {
            if (b.preloader) {
                c !== a && b.container.removeClass("mfp-s-" + c), d || "loading" !== a || (d = b.st.tLoading);
                var e = {
                    status: a,
                    text: d
                };
                y("UpdateStatus", e), a = e.status, d = e.text, b.preloader.html(d), b.preloader.find("a").on("click", function(a) {
                    a.stopImmediatePropagation()
                }), b.container.addClass("mfp-s-" + a), c = a
            }
        },
        _checkIfClose: function(c) {
            if (!a(c).hasClass(s)) {
                var d = b.st.closeOnContentClick,
                    e = b.st.closeOnBgClick;
                if (d && e) return !0;
                if (!b.content || a(c).hasClass("mfp-close") || b.preloader && c === b.preloader[0]) return !0;
                if (c === b.content[0] || a.contains(b.content[0], c)) {
                    if (d) return !0
                } else if (e && a.contains(document, c)) return !0;
                return !1
            }
        },
        _addClassToMFP: function(a) {
            b.bgOverlay.addClass(a), b.wrap.addClass(a)
        },
        _removeClassFromMFP: function(a) {
            this.bgOverlay.removeClass(a), b.wrap.removeClass(a)
        },
        _hasScrollBar: function(a) {
            return (b.isIE7 ? d.height() : document.body.scrollHeight) > (a || v.height())
        },
        _setFocus: function() {
            (b.st.focus ? b.content.find(b.st.focus).eq(0) : b.wrap).focus()
        },
        _onFocusIn: function(c) {
            return c.target === b.wrap[0] || a.contains(b.wrap[0], c.target) ? void 0 : (b._setFocus(), !1)
        },
        _parseMarkup: function(b, c, d) {
            var e;
            d.data && (c = a.extend(d.data, c)), y(l, [b, c, d]), a.each(c, function(c, d) {
                if (void 0 === d || d === !1) return !0;
                if (e = c.split("_"), e.length > 1) {
                    var f = b.find(p + "-" + e[0]);
                    if (f.length > 0) {
                        var g = e[1];
                        "replaceWith" === g ? f[0] !== d[0] && f.replaceWith(d) : "img" === g ? f.is("img") ? f.attr("src", d) : f.replaceWith(a("<img>").attr("src", d).attr("class", f.attr("class"))) : f.attr(e[1], d)
                    }
                } else b.find(p + "-" + c).html(d)
            })
        },
        _getScrollbarSize: function() {
            if (void 0 === b.scrollbarSize) {
                var a = document.createElement("div");
                a.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(a), b.scrollbarSize = a.offsetWidth - a.clientWidth, document.body.removeChild(a)
            }
            return b.scrollbarSize
        }
    }, a.magnificPopup = {
        instance: null,
        proto: t.prototype,
        modules: [],
        open: function(b, c) {
            return A(), b = b ? a.extend(!0, {}, b) : {}, b.isObj = !0, b.index = c || 0, this.instance.open(b)
        },
        close: function() {
            return a.magnificPopup.instance && a.magnificPopup.instance.close()
        },
        registerModule: function(b, c) {
            c.options && (a.magnificPopup.defaults[b] = c.options), a.extend(this.proto, c.proto), this.modules.push(b)
        },
        defaults: {
            disableOn: 0,
            key: null,
            midClick: !1,
            mainClass: "",
            preloader: !0,
            focus: "",
            closeOnContentClick: !1,
            closeOnBgClick: !0,
            closeBtnInside: !0,
            showCloseBtn: !0,
            enableEscapeKey: !0,
            modal: !1,
            alignTop: !1,
            removalDelay: 0,
            prependTo: null,
            fixedContentPos: "auto",
            fixedBgPos: "auto",
            overflowY: "auto",
            closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
            tClose: "Close (Esc)",
            tLoading: "Loading...",
            autoFocusLast: !0
        }
    }, a.fn.magnificPopup = function(c) {
        A();
        var d = a(this);
        if ("string" == typeof c)
            if ("open" === c) {
                var e, f = u ? d.data("magnificPopup") : d[0].magnificPopup,
                    g = parseInt(arguments[1], 10) || 0;
                f.items ? e = f.items[g] : (e = d, f.delegate && (e = e.find(f.delegate)), e = e.eq(g)), b._openClick({
                    mfpEl: e
                }, d, f)
            } else b.isOpen && b[c].apply(b, Array.prototype.slice.call(arguments, 1));
        else c = a.extend(!0, {}, c), u ? d.data("magnificPopup", c) : d[0].magnificPopup = c, b.addGroup(d, c);
        return d
    };
    var C, D, E, F = "inline",
        G = function() {
            E && (D.after(E.addClass(C)).detach(), E = null)
        };
    a.magnificPopup.registerModule(F, {
        options: {
            hiddenClass: "hide",
            markup: "",
            tNotFound: "Content not found"
        },
        proto: {
            initInline: function() {
                b.types.push(F), w(h + "." + F, function() {
                    G()
                })
            },
            getInline: function(c, d) {
                if (G(), c.src) {
                    var e = b.st.inline,
                        f = a(c.src);
                    if (f.length) {
                        var g = f[0].parentNode;
                        g && g.tagName && (D || (C = e.hiddenClass, D = x(C), C = "mfp-" + C), E = f.after(D).detach().removeClass(C)), b.updateStatus("ready")
                    } else b.updateStatus("error", e.tNotFound), f = a("<div>");
                    return c.inlineElement = f, f
                }
                return b.updateStatus("ready"), b._parseMarkup(d, {}, c), d
            }
        }
    });
    var H, I = "ajax",
        J = function() {
            H && a(document.body).removeClass(H)
        },
        K = function() {
            J(), b.req && b.req.abort()
        };
    a.magnificPopup.registerModule(I, {
        options: {
            settings: null,
            cursor: "mfp-ajax-cur",
            tError: '<a href="%url%">The content</a> could not be loaded.'
        },
        proto: {
            initAjax: function() {
                b.types.push(I), H = b.st.ajax.cursor, w(h + "." + I, K), w("BeforeChange." + I, K)
            },
            getAjax: function(c) {
                H && a(document.body).addClass(H), b.updateStatus("loading");
                var d = a.extend({
                    url: c.src,
                    success: function(d, e, f) {
                        var g = {
                            data: d,
                            xhr: f
                        };
                        y("ParseAjax", g), b.appendContent(a(g.data), I), c.finished = !0, J(), b._setFocus(), setTimeout(function() {
                            b.wrap.addClass(q)
                        }, 16), b.updateStatus("ready"), y("AjaxContentAdded")
                    },
                    error: function() {
                        J(), c.finished = c.loadError = !0, b.updateStatus("error", b.st.ajax.tError.replace("%url%", c.src))
                    }
                }, b.st.ajax.settings);
                return b.req = a.ajax(d), ""
            }
        }
    });
    var L, M = function(c) {
        if (c.data && void 0 !== c.data.title) return c.data.title;
        var d = b.st.image.titleSrc;
        if (d) {
            if (a.isFunction(d)) return d.call(b, c);
            if (c.el) return c.el.attr(d) || ""
        }
        return ""
    };
    a.magnificPopup.registerModule("image", {
        options: {
            markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
            cursor: "mfp-zoom-out-cur",
            titleSrc: "title",
            verticalFit: !0,
            tError: '<a href="%url%">The image</a> could not be loaded.'
        },
        proto: {
            initImage: function() {
                var c = b.st.image,
                    d = ".image";
                b.types.push("image"), w(m + d, function() {
                    "image" === b.currItem.type && c.cursor && a(document.body).addClass(c.cursor)
                }), w(h + d, function() {
                    c.cursor && a(document.body).removeClass(c.cursor), v.off("resize" + p)
                }), w("Resize" + d, b.resizeImage), b.isLowIE && w("AfterChange", b.resizeImage)
            },
            resizeImage: function() {
                var a = b.currItem;
                if (a && a.img && b.st.image.verticalFit) {
                    var c = 0;
                    b.isLowIE && (c = parseInt(a.img.css("padding-top"), 10) + parseInt(a.img.css("padding-bottom"), 10)), a.img.css("max-height", b.wH - c)
                }
            },
            _onImageHasSize: function(a) {
                a.img && (a.hasSize = !0, L && clearInterval(L), a.isCheckingImgSize = !1, y("ImageHasSize", a), a.imgHidden && (b.content && b.content.removeClass("mfp-loading"), a.imgHidden = !1))
            },
            findImageSize: function(a) {
                var c = 0,
                    d = a.img[0],
                    e = function(f) {
                        L && clearInterval(L), L = setInterval(function() {
                            return d.naturalWidth > 0 ? void b._onImageHasSize(a) : (c > 200 && clearInterval(L), c++, void(3 === c ? e(10) : 40 === c ? e(50) : 100 === c && e(500)))
                        }, f)
                    };
                e(1)
            },
            getImage: function(c, d) {
                var e = 0,
                    f = function() {
                        c && (c.img[0].complete ? (c.img.off(".mfploader"), c === b.currItem && (b._onImageHasSize(c), b.updateStatus("ready")), c.hasSize = !0, c.loaded = !0, y("ImageLoadComplete")) : (e++, 200 > e ? setTimeout(f, 100) : g()))
                    },
                    g = function() {
                        c && (c.img.off(".mfploader"), c === b.currItem && (b._onImageHasSize(c), b.updateStatus("error", h.tError.replace("%url%", c.src))), c.hasSize = !0, c.loaded = !0, c.loadError = !0)
                    },
                    h = b.st.image,
                    i = d.find(".mfp-img");
                if (i.length) {
                    var j = document.createElement("img");
                    j.className = "mfp-img", c.el && c.el.find("img").length && (j.alt = c.el.find("img").attr("alt")), c.img = a(j).on("load.mfploader", f).on("error.mfploader", g), j.src = c.src, i.is("img") && (c.img = c.img.clone()), j = c.img[0], j.naturalWidth > 0 ? c.hasSize = !0 : j.width || (c.hasSize = !1)
                }
                return b._parseMarkup(d, {
                    title: M(c),
                    img_replaceWith: c.img
                }, c), b.resizeImage(), c.hasSize ? (L && clearInterval(L), c.loadError ? (d.addClass("mfp-loading"), b.updateStatus("error", h.tError.replace("%url%", c.src))) : (d.removeClass("mfp-loading"), b.updateStatus("ready")), d) : (b.updateStatus("loading"), c.loading = !0, c.hasSize || (c.imgHidden = !0, d.addClass("mfp-loading"), b.findImageSize(c)), d)
            }
        }
    });
    var N, O = function() {
        return void 0 === N && (N = void 0 !== document.createElement("p").style.MozTransform), N
    };
    a.magnificPopup.registerModule("zoom", {
        options: {
            enabled: !1,
            easing: "ease-in-out",
            duration: 300,
            opener: function(a) {
                return a.is("img") ? a : a.find("img")
            }
        },
        proto: {
            initZoom: function() {
                var a, c = b.st.zoom,
                    d = ".zoom";
                if (c.enabled && b.supportsTransition) {
                    var e, f, g = c.duration,
                        j = function(a) {
                            var b = a.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                                d = "all " + c.duration / 1e3 + "s " + c.easing,
                                e = {
                                    position: "fixed",
                                    zIndex: 9999,
                                    left: 0,
                                    top: 0,
                                    "-webkit-backface-visibility": "hidden"
                                },
                                f = "transition";
                            return e["-webkit-" + f] = e["-moz-" + f] = e["-o-" + f] = e[f] = d, b.css(e), b
                        },
                        k = function() {
                            b.content.css("visibility", "visible")
                        };
                    w("BuildControls" + d, function() {
                        if (b._allowZoom()) {
                            if (clearTimeout(e), b.content.css("visibility", "hidden"), a = b._getItemToZoom(), !a) return void k();
                            f = j(a), f.css(b._getOffset()), b.wrap.append(f), e = setTimeout(function() {
                                f.css(b._getOffset(!0)), e = setTimeout(function() {
                                    k(), setTimeout(function() {
                                        f.remove(), a = f = null, y("ZoomAnimationEnded")
                                    }, 16)
                                }, g)
                            }, 16)
                        }
                    }), w(i + d, function() {
                        if (b._allowZoom()) {
                            if (clearTimeout(e), b.st.removalDelay = g, !a) {
                                if (a = b._getItemToZoom(), !a) return;
                                f = j(a)
                            }
                            f.css(b._getOffset(!0)), b.wrap.append(f), b.content.css("visibility", "hidden"), setTimeout(function() {
                                f.css(b._getOffset())
                            }, 16)
                        }
                    }), w(h + d, function() {
                        b._allowZoom() && (k(), f && f.remove(), a = null)
                    })
                }
            },
            _allowZoom: function() {
                return "image" === b.currItem.type
            },
            _getItemToZoom: function() {
                return b.currItem.hasSize ? b.currItem.img : !1
            },
            _getOffset: function(c) {
                var d;
                d = c ? b.currItem.img : b.st.zoom.opener(b.currItem.el || b.currItem);
                var e = d.offset(),
                    f = parseInt(d.css("padding-top"), 10),
                    g = parseInt(d.css("padding-bottom"), 10);
                e.top -= a(window).scrollTop() - f;
                var h = {
                    width: d.width(),
                    height: (u ? d.innerHeight() : d[0].offsetHeight) - g - f
                };
                return O() ? h["-moz-transform"] = h.transform = "translate(" + e.left + "px," + e.top + "px)" : (h.left = e.left, h.top = e.top), h
            }
        }
    });
    var P = "iframe",
        Q = "//about:blank",
        R = function(a) {
            if (b.currTemplate[P]) {
                var c = b.currTemplate[P].find("iframe");
                c.length && (a || (c[0].src = Q), b.isIE8 && c.css("display", a ? "block" : "none"))
            }
        };
    a.magnificPopup.registerModule(P, {
        options: {
            markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
            srcAction: "iframe_src",
            patterns: {
                youtube: {
                    index: "youtube.com",
                    id: "v=",
                    src: "//www.youtube.com/embed/%id%?autoplay=1"
                },
                vimeo: {
                    index: "vimeo.com/",
                    id: "/",
                    src: "//player.vimeo.com/video/%id%?autoplay=1"
                },
                gmaps: {
                    index: "//maps.google.",
                    src: "%id%&output=embed"
                }
            }
        },
        proto: {
            initIframe: function() {
                b.types.push(P), w("BeforeChange", function(a, b, c) {
                    b !== c && (b === P ? R() : c === P && R(!0))
                }), w(h + "." + P, function() {
                    R()
                })
            },
            getIframe: function(c, d) {
                var e = c.src,
                    f = b.st.iframe;
                a.each(f.patterns, function() {
                    return e.indexOf(this.index) > -1 ? (this.id && (e = "string" == typeof this.id ? e.substr(e.lastIndexOf(this.id) + this.id.length, e.length) : this.id.call(this, e)), e = this.src.replace("%id%", e), !1) : void 0
                });
                var g = {};
                return f.srcAction && (g[f.srcAction] = e), b._parseMarkup(d, g, c), b.updateStatus("ready"), d
            }
        }
    });
    var S = function(a) {
            var c = b.items.length;
            return a > c - 1 ? a - c : 0 > a ? c + a : a
        },
        T = function(a, b, c) {
            return a.replace(/%curr%/gi, b + 1).replace(/%total%/gi, c)
        };
    a.magnificPopup.registerModule("gallery", {
        options: {
            enabled: !1,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            preload: [0, 2],
            navigateByImgClick: !0,
            arrows: !0,
            tPrev: "Previous (Left arrow key)",
            tNext: "Next (Right arrow key)",
            tCounter: "%curr% of %total%"
        },
        proto: {
            initGallery: function() {
                var c = b.st.gallery,
                    e = ".mfp-gallery";
                return b.direction = !0, c && c.enabled ? (f += " mfp-gallery", w(m + e, function() {
                    c.navigateByImgClick && b.wrap.on("click" + e, ".mfp-img", function() {
                        return b.items.length > 1 ? (b.next(), !1) : void 0
                    }), d.on("keydown" + e, function(a) {
                        37 === a.keyCode ? b.prev() : 39 === a.keyCode && b.next()
                    })
                }), w("UpdateStatus" + e, function(a, c) {
                    c.text && (c.text = T(c.text, b.currItem.index, b.items.length))
                }), w(l + e, function(a, d, e, f) {
                    var g = b.items.length;
                    e.counter = g > 1 ? T(c.tCounter, f.index, g) : ""
                }), w("BuildControls" + e, function() {
                    if (b.items.length > 1 && c.arrows && !b.arrowLeft) {
                        var d = c.arrowMarkup,
                            e = b.arrowLeft = a(d.replace(/%title%/gi, c.tPrev).replace(/%dir%/gi, "left")).addClass(s),
                            f = b.arrowRight = a(d.replace(/%title%/gi, c.tNext).replace(/%dir%/gi, "right")).addClass(s);
                        e.click(function() {
                            b.prev()
                        }), f.click(function() {
                            b.next()
                        }), b.container.append(e.add(f))
                    }
                }), w(n + e, function() {
                    b._preloadTimeout && clearTimeout(b._preloadTimeout), b._preloadTimeout = setTimeout(function() {
                        b.preloadNearbyImages(), b._preloadTimeout = null
                    }, 16)
                }), void w(h + e, function() {
                    d.off(e), b.wrap.off("click" + e), b.arrowRight = b.arrowLeft = null
                })) : !1
            },
            next: function() {
                b.direction = !0, b.index = S(b.index + 1), b.updateItemHTML()
            },
            prev: function() {
                b.direction = !1, b.index = S(b.index - 1), b.updateItemHTML()
            },
            goTo: function(a) {
                b.direction = a >= b.index, b.index = a, b.updateItemHTML()
            },
            preloadNearbyImages: function() {
                var a, c = b.st.gallery.preload,
                    d = Math.min(c[0], b.items.length),
                    e = Math.min(c[1], b.items.length);
                for (a = 1; a <= (b.direction ? e : d); a++) b._preloadItem(b.index + a);
                for (a = 1; a <= (b.direction ? d : e); a++) b._preloadItem(b.index - a)
            },
            _preloadItem: function(c) {
                if (c = S(c), !b.items[c].preloaded) {
                    var d = b.items[c];
                    d.parsed || (d = b.parseEl(c)), y("LazyLoad", d), "image" === d.type && (d.img = a('<img class="mfp-img" />').on("load.mfploader", function() {
                        d.hasSize = !0
                    }).on("error.mfploader", function() {
                        d.hasSize = !0, d.loadError = !0, y("LazyLoadError", d)
                    }).attr("src", d.src)), d.preloaded = !0
                }
            }
        }
    });
    var U = "retina";
    a.magnificPopup.registerModule(U, {
        options: {
            replaceSrc: function(a) {
                return a.src.replace(/\.\w+$/, function(a) {
                    return "@2x" + a
                })
            },
            ratio: 1
        },
        proto: {
            initRetina: function() {
                if (window.devicePixelRatio > 1) {
                    var a = b.st.retina,
                        c = a.ratio;
                    c = isNaN(c) ? c() : c, c > 1 && (w("ImageHasSize." + U, function(a, b) {
                        b.img.css({
                            "max-width": b.img[0].naturalWidth / c,
                            width: "100%"
                        })
                    }), w("ElementParse." + U, function(b, d) {
                        d.src = a.replaceSrc(d, c)
                    }))
                }
            }
        }
    }), A()
});


var delay_tab = 300,
    delay_show_mm = 300,
    delay_hide_mm = 300;

$("body").append(getFullscreenBg());

$.fn.initMM = function() {
    var mmpanel = {
        $mobilemenu: $(".panel-menu"),
        mm_close_button: 'Close',
        mm_back_button: 'Back',
        mm_breakpoint: 1024,
        mm_enable_breakpoint: false,
        mm_mobile_button: false,
        remember_state: false,
        second_button: false, // class
        init: function($button, data) {
            var _this = this;
            if (!_this.$mobilemenu.length) {
                console.log('You not have <nav class="panel-menu">menu</nav>. See Documentation')
                return false;
            }

            arguments[1] != undefined && _this.parse_arguments(data);
            _this.$mobilemenu.parse_mm(mmpanel); //_this.mm_close_button, _this.mm_back_button);
            _this.$mobilemenu.init_mm(mmpanel);
            _this.mm_enable_breakpoint && _this.$mobilemenu.check_resolution_mm(mmpanel); //_this.mm_breakpoint);
            $button.mm_handler(mmpanel);
        },
        parse_arguments: function(data) {
            var _this = this;
            if (Object(data).hasOwnProperty("menu_class")) _this.$mobilemenu = $("." + data.menu_class);

            $.each(data, function(k, v) {
                switch (k) {
                    case 'right':
                        v && _this.$mobilemenu.addClass("mm-right");
                        break;
                    case 'close_button_name':
                        _this.mm_close_button = v;
                        break;
                    case 'back_button_name':
                        _this.mm_back_button = v;
                        break;
                    case 'width':
                        _this.$mobilemenu.css("width", v);
                        break;
                    case 'breakpoint':
                        _this.mm_breakpoint = v;
                        break;
                    case 'enable_breakpoint':
                        _this.mm_enable_breakpoint = v;
                        break;
                    case 'mobile_button':
                        _this.mm_mobile_button = v;
                        break;
                    case 'remember_state':
                        _this.remember_state = v;
                        break;
                    case 'second_button':
                        _this.second_button = v;
                        break;
                };
            });
        },
        show_button_in_mobile: function($button) {
            var _this = this;
            if (_this.mm_mobile_button) {
                window.innerWidth > _this.mm_breakpoint ? $button.hide() : $button.show();
                $(window).resize(function() {
                    window.innerWidth > _this.mm_breakpoint ? $button.hide() : $button.show();
                })
            }
        }
    }
    mmpanel.init($(this), arguments[0]);
    mmpanel.show_button_in_mobile($(this));
}

$.fn.check_resolution_mm = function(mmpanel) {
    var _this = $(this);
    $(window).resize(function() {
        if (!$("body").hasClass("mm-open") || !_this.hasClass("mmitemopen")) return false;
        window.innerWidth > mmpanel.mm_breakpoint && _this.closemm(mmpanel);
    });
}
$.fn.mm_handler = function(mmpanel) {
    $(this).click(function(e) {
        e.preventDefault();
        mmpanel.$mobilemenu.openmm();
    });

    if (mmpanel.second_button != false) {
        $(mmpanel.second_button).click(function(e) {
            e.preventDefault();
            mmpanel.$mobilemenu.openmm();
        });
    };
}

$.fn.parse_mm = function(mmpanel) {
    var $mm_curent = $(this).clone(),
        $mm_new = $(get_mm_parent()),
        $mm_block = false,
        count = 0,
        _this = false,
        $btnBack = false,
        $ul;
    $(this).empty();

    $mm_curent.find('a').each(function() {
        _this = $(this);
        $ul = _this.parent().find("ul").first();
        if ($ul.length) {
            count++;
            $ul.prepend("<li></li>").find("li").first().append(_this.clone().addClass("mm-original-link"));
            _this.attr("href", "#mm" + count).attr("data-target", "#mm" + count).addClass("mm-next-level");
        }
    });
    $mm_curent.find('ul').each(function(index) {
        $btnBack = false;
        $mm_block = $(get_mm_block()).attr("id", "mm" + index).append($(this));
        if (index == 0) {
            $mm_block.addClass("mmopened").addClass("mmcurrent").removeClass("mmhidden");
            $btnBack = getButtonClose($mm_curent.find(".mm-closebtn").html(), mmpanel.mm_close_button);
            $mm_block.find("ul").first().prepend($btnBack);
        } else {
            $btnBack = getButtonBack($mm_curent.find(".mm-backbtn").html(), mmpanel.mm_back_button);
            $mm_block.find("ul").first().prepend($btnBack);
        }
        $mm_new.append($mm_block);
    });

    $(this).append($mm_new);
}
$.fn.init_mm = function(mmpanel) {
    var _parent = $(this);
    _parent.find("a").each(function() {
        $(this).click(function(e) {
            var _this = $(this);
            var $panel = false;
            var $currobj = false;
            var lv = '';
            if (_this.hasClass("mm-next-level")) {
                e.preventDefault();
                lv = _this.attr("href");
                $currobj = _parent.find(".mmcurrent");
                $currobj.addClass("mmsubopened").removeClass("mmcurrent");
                _parent.find(lv).removeClass("mmhidden");
                setTimeout(function() {
                    _parent.find(lv).scrollTop(0).addClass("mmcurrent").addClass("mmopened");
                }, 0);
                setTimeout(function() {
                    $currobj.addClass("mmhidden")
                }, delay_tab);
                return false;
            }
            if (_this.hasClass("mm-prev-level")) {
                e.preventDefault();
                lv = _this.attr("href");
                $currobj = _parent.find(".mmcurrent");
                $currobj.removeClass("mmcurrent").removeClass("mmopened");
                _parent.find(".mmsubopened").last().removeClass("mmhidden").scrollTop(0).removeClass("mmsubopened").addClass("mmcurrent");
                setTimeout(function() {
                    $currobj.addClass("mmhidden")
                }, delay_tab);
                return false;
            }
            if (_this.hasClass("mm-close")) {
                _parent.closemm(mmpanel);
                return false;
            }
        })
    });
    $(".mm-fullscreen-bg").click(function(e) {
        e.preventDefault();
        _parent.closemm(mmpanel);
    });
}
$.fn.openmm = function() {
    var _this = $(this);
    _this.show();
    setTimeout(function() {
        $("body").addClass("mm-open");
        _this.addClass("mmitemopen");
        $(".mm-fullscreen-bg").fadeIn(delay_show_mm);
    }, 0);
}
$.fn.closemm = function(mmpanel) {
    var _this = $(this);
    _this.addClass("mmhide");
    $(".mm-fullscreen-bg").fadeOut(delay_hide_mm);
    setTimeout(function() {
        mm_destroy(_this, mmpanel);
    }, delay_hide_mm);
}

function mm_destroy(_parent, mmpanel) {
    if (!mmpanel.remember_state) {
        _parent.find(".mmpanel").toggleClass("mmsubopened mmcurrent mmopened", false).addClass("mmhidden");
        _parent.find("#mm0").addClass("mmopened").addClass("mmcurrent").removeClass("mmhidden");
    }
    _parent.toggleClass("mmhide mmitemopen", false).hide();
    $("body").removeClass("mm-open");
}

function get_mm_parent() {
    return '<div class="mmpanels"></div>';
}

function get_mm_block() {
    return '<div class="mmpanel mmhidden">';
}

function getButtonBack(value, _default) {
    value = value == undefined ? _default : value;
    return '<li><a href="#" data-target="#" class="mm-prev-level">' + value + '</a></li>';
}

function getButtonClose(value, _default) {
    value = value == undefined ? _default : value;
    return '<li class="mm-close-parent"><a href="#close" data-target="#close" class="mm-close">' + value + '</a></li>';
}

function getFullscreenBg() {
    return '<div class="mm-fullscreen-bg"></div>';
}! function(t, e, i) {
    ! function() {
        var s, a, n, h = "2.2.3",
            o = "datepicker",
            r = ".datepicker-here",
            c = !1,
            d = '<div class="datepicker"><i class="datepicker--pointer"></i><nav class="datepicker--nav"></nav><div class="datepicker--content"></div></div>',
            l = {
                classes: "",
                inline: !1,
                language: "ru",
                startDate: new Date,
                firstDay: "",
                weekends: [6, 0],
                dateFormat: "",
                altField: "",
                altFieldDateFormat: "@",
                toggleSelected: !0,
                keyboardNav: !0,
                position: "bottom left",
                offset: 12,
                view: "days",
                minView: "days",
                showOtherMonths: !0,
                selectOtherMonths: !0,
                moveToOtherMonthsOnSelect: !0,
                showOtherYears: !0,
                selectOtherYears: !0,
                moveToOtherYearsOnSelect: !0,
                minDate: "",
                maxDate: "",
                disableNavWhenOutOfRange: !0,
                multipleDates: !1,
                multipleDatesSeparator: ",",
                range: !1,
                todayButton: !1,
                clearButton: !1,
                showEvent: "focus",
                autoClose: !1,
                monthsField: "monthsShort",
                prevHtml: '<svg><path d="M 17,12 l -5,5 l 5,5"></path></svg>',
                nextHtml: '<svg><path d="M 14,12 l 5,5 l -5,5"></path></svg>',
                navTitles: {
                    days: "MM, <i>yyyy</i>",
                    months: "yyyy",
                    years: "yyyy1 - yyyy2"
                },
                timepicker: !1,
                onlyTimepicker: !1,
                dateTimeSeparator: " ",
                timeFormat: "",
                minHours: 0,
                maxHours: 24,
                minMinutes: 0,
                maxMinutes: 59,
                hoursStep: 1,
                minutesStep: 1,
                onSelect: "",
                onShow: "",
                onHide: "",
                onChangeMonth: "",
                onChangeYear: "",
                onChangeDecade: "",
                onChangeView: "",
                onRenderCell: ""
            },
            u = {
                ctrlRight: [17, 39],
                ctrlUp: [17, 38],
                ctrlLeft: [17, 37],
                ctrlDown: [17, 40],
                shiftRight: [16, 39],
                shiftUp: [16, 38],
                shiftLeft: [16, 37],
                shiftDown: [16, 40],
                altUp: [18, 38],
                altRight: [18, 39],
                altLeft: [18, 37],
                altDown: [18, 40],
                ctrlShiftUp: [16, 17, 38]
            },
            m = function(t, a) {
                this.el = t, this.$el = e(t), this.opts = e.extend(!0, {}, l, a, this.$el.data()), s == i && (s = e("body")), this.opts.startDate || (this.opts.startDate = new Date), "INPUT" == this.el.nodeName && (this.elIsInput = !0), this.opts.altField && (this.$altField = "string" == typeof this.opts.altField ? e(this.opts.altField) : this.opts.altField), this.inited = !1, this.visible = !1, this.silent = !1, this.currentDate = this.opts.startDate, this.currentView = this.opts.view, this._createShortCuts(), this.selectedDates = [], this.views = {}, this.keys = [], this.minRange = "", this.maxRange = "", this._prevOnSelectValue = "", this.init()
            };
        n = m, n.prototype = {
            VERSION: h,
            viewIndexes: ["days", "months", "years"],
            init: function() {
                c || this.opts.inline || !this.elIsInput || this._buildDatepickersContainer(), this._buildBaseHtml(), this._defineLocale(this.opts.language), this._syncWithMinMaxDates(), this.elIsInput && (this.opts.inline || (this._setPositionClasses(this.opts.position), this._bindEvents()), this.opts.keyboardNav && !this.opts.onlyTimepicker && this._bindKeyboardEvents(), this.$datepicker.on("mousedown", this._onMouseDownDatepicker.bind(this)), this.$datepicker.on("mouseup", this._onMouseUpDatepicker.bind(this))), this.opts.classes && this.$datepicker.addClass(this.opts.classes), this.opts.timepicker && (this.timepicker = new e.fn.datepicker.Timepicker(this, this.opts), this._bindTimepickerEvents()), this.opts.onlyTimepicker && this.$datepicker.addClass("-only-timepicker-"), this.views[this.currentView] = new e.fn.datepicker.Body(this, this.currentView, this.opts), this.views[this.currentView].show(), this.nav = new e.fn.datepicker.Navigation(this, this.opts), this.view = this.currentView, this.$el.on("clickCell.adp", this._onClickCell.bind(this)), this.$datepicker.on("mouseenter", ".datepicker--cell", this._onMouseEnterCell.bind(this)), this.$datepicker.on("mouseleave", ".datepicker--cell", this._onMouseLeaveCell.bind(this)), this.inited = !0
            },
            _createShortCuts: function() {
                this.minDate = this.opts.minDate ? this.opts.minDate : new Date(-86399999136e5), this.maxDate = this.opts.maxDate ? this.opts.maxDate : new Date(86399999136e5)
            },
            _bindEvents: function() {
                this.$el.on(this.opts.showEvent + ".adp", this._onShowEvent.bind(this)), this.$el.on("mouseup.adp", this._onMouseUpEl.bind(this)), this.$el.on("blur.adp", this._onBlur.bind(this)), this.$el.on("keyup.adp", this._onKeyUpGeneral.bind(this)), e(t).on("resize.adp", this._onResize.bind(this)), e("body").on("mouseup.adp", this._onMouseUpBody.bind(this))
            },
            _bindKeyboardEvents: function() {
                this.$el.on("keydown.adp", this._onKeyDown.bind(this)), this.$el.on("keyup.adp", this._onKeyUp.bind(this)), this.$el.on("hotKey.adp", this._onHotKey.bind(this))
            },
            _bindTimepickerEvents: function() {
                this.$el.on("timeChange.adp", this._onTimeChange.bind(this))
            },
            isWeekend: function(t) {
                return -1 !== this.opts.weekends.indexOf(t)
            },
            _defineLocale: function(t) {
                "string" == typeof t ? (this.loc = e.fn.datepicker.language[t], this.loc || (console.warn("Can't find language \"" + t + '" in Datepicker.language, will use "ru" instead'), this.loc = e.extend(!0, {}, e.fn.datepicker.language.ru)), this.loc = e.extend(!0, {}, e.fn.datepicker.language.ru, e.fn.datepicker.language[t])) : this.loc = e.extend(!0, {}, e.fn.datepicker.language.ru, t), this.opts.dateFormat && (this.loc.dateFormat = this.opts.dateFormat), this.opts.timeFormat && (this.loc.timeFormat = this.opts.timeFormat), "" !== this.opts.firstDay && (this.loc.firstDay = this.opts.firstDay), this.opts.timepicker && (this.loc.dateFormat = [this.loc.dateFormat, this.loc.timeFormat].join(this.opts.dateTimeSeparator)), this.opts.onlyTimepicker && (this.loc.dateFormat = this.loc.timeFormat);
                var i = this._getWordBoundaryRegExp;
                (this.loc.timeFormat.match(i("aa")) || this.loc.timeFormat.match(i("AA"))) && (this.ampm = !0)
            },
            _buildDatepickersContainer: function() {
                c = !0, s.append('<div class="datepickers-container" id="datepickers-container"></div>'), a = e("#datepickers-container")
            },
            _buildBaseHtml: function() {
                var t, i = e('<div class="datepicker-inline">');
                t = "INPUT" == this.el.nodeName ? this.opts.inline ? i.insertAfter(this.$el) : a : i.appendTo(this.$el), this.$datepicker = e(d).appendTo(t), this.$content = e(".datepicker--content", this.$datepicker), this.$nav = e(".datepicker--nav", this.$datepicker)
            },
            _triggerOnChange: function() {
                if (!this.selectedDates.length) {
                    if ("" === this._prevOnSelectValue) return;
                    return this._prevOnSelectValue = "", this.opts.onSelect("", "", this)
                }
                var t, e = this.selectedDates,
                    i = n.getParsedDate(e[0]),
                    s = this,
                    a = new Date(i.year, i.month, i.date, i.hours, i.minutes);
                t = e.map(function(t) {
                    return s.formatDate(s.loc.dateFormat, t)
                }).join(this.opts.multipleDatesSeparator), (this.opts.multipleDates || this.opts.range) && (a = e.map(function(t) {
                    var e = n.getParsedDate(t);
                    return new Date(e.year, e.month, e.date, e.hours, e.minutes)
                })), this._prevOnSelectValue = t, this.opts.onSelect(t, a, this)
            },
            next: function() {
                var t = this.parsedDate,
                    e = this.opts;
                switch (this.view) {
                    case "days":
                        this.date = new Date(t.year, t.month + 1, 1), e.onChangeMonth && e.onChangeMonth(this.parsedDate.month, this.parsedDate.year);
                        break;
                    case "months":
                        this.date = new Date(t.year + 1, t.month, 1), e.onChangeYear && e.onChangeYear(this.parsedDate.year);
                        break;
                    case "years":
                        this.date = new Date(t.year + 10, 0, 1), e.onChangeDecade && e.onChangeDecade(this.curDecade)
                }
            },
            prev: function() {
                var t = this.parsedDate,
                    e = this.opts;
                switch (this.view) {
                    case "days":
                        this.date = new Date(t.year, t.month - 1, 1), e.onChangeMonth && e.onChangeMonth(this.parsedDate.month, this.parsedDate.year);
                        break;
                    case "months":
                        this.date = new Date(t.year - 1, t.month, 1), e.onChangeYear && e.onChangeYear(this.parsedDate.year);
                        break;
                    case "years":
                        this.date = new Date(t.year - 10, 0, 1), e.onChangeDecade && e.onChangeDecade(this.curDecade)
                }
            },
            formatDate: function(t, e) {
                e = e || this.date;
                var i, s = t,
                    a = this._getWordBoundaryRegExp,
                    h = this.loc,
                    o = n.getLeadingZeroNum,
                    r = n.getDecade(e),
                    c = n.getParsedDate(e),
                    d = c.fullHours,
                    l = c.hours,
                    u = t.match(a("aa")) || t.match(a("AA")),
                    m = "am",
                    p = this._replacer;
                switch (this.opts.timepicker && this.timepicker && u && (i = this.timepicker._getValidHoursFromDate(e, u), d = o(i.hours), l = i.hours, m = i.dayPeriod), !0) {
                    case /@/.test(s):
                        s = s.replace(/@/, e.getTime());
                    case /aa/.test(s):
                        s = p(s, a("aa"), m);
                    case /AA/.test(s):
                        s = p(s, a("AA"), m.toUpperCase());
                    case /dd/.test(s):
                        s = p(s, a("dd"), c.fullDate);
                    case /d/.test(s):
                        s = p(s, a("d"), c.date);
                    case /DD/.test(s):
                        s = p(s, a("DD"), h.days[c.day]);
                    case /D/.test(s):
                        s = p(s, a("D"), h.daysShort[c.day]);
                    case /mm/.test(s):
                        s = p(s, a("mm"), c.fullMonth);
                    case /m/.test(s):
                        s = p(s, a("m"), c.month + 1);
                    case /MM/.test(s):
                        s = p(s, a("MM"), this.loc.months[c.month]);
                    case /M/.test(s):
                        s = p(s, a("M"), h.monthsShort[c.month]);
                    case /ii/.test(s):
                        s = p(s, a("ii"), c.fullMinutes);
                    case /i/.test(s):
                        s = p(s, a("i"), c.minutes);
                    case /hh/.test(s):
                        s = p(s, a("hh"), d);
                    case /h/.test(s):
                        s = p(s, a("h"), l);
                    case /yyyy/.test(s):
                        s = p(s, a("yyyy"), c.year);
                    case /yyyy1/.test(s):
                        s = p(s, a("yyyy1"), r[0]);
                    case /yyyy2/.test(s):
                        s = p(s, a("yyyy2"), r[1]);
                    case /yy/.test(s):
                        s = p(s, a("yy"), c.year.toString().slice(-2))
                }
                return s
            },
            _replacer: function(t, e, i) {
                return t.replace(e, function(t, e, s, a) {
                    return e + i + a
                })
            },
            _getWordBoundaryRegExp: function(t) {
                var e = "\\s|\\.|-|/|\\\\|,|\\$|\\!|\\?|:|;";
                return new RegExp("(^|>|" + e + ")(" + t + ")($|<|" + e + ")", "g")
            },
            selectDate: function(t) {
                var e = this,
                    i = e.opts,
                    s = e.parsedDate,
                    a = e.selectedDates,
                    h = a.length,
                    o = "";
                if (Array.isArray(t)) return void t.forEach(function(t) {
                    e.selectDate(t)
                });
                if (t instanceof Date) {
                    if (this.lastSelectedDate = t, this.timepicker && this.timepicker._setTime(t), e._trigger("selectDate", t), this.timepicker && (t.setHours(this.timepicker.hours), t.setMinutes(this.timepicker.minutes)), "days" == e.view && t.getMonth() != s.month && i.moveToOtherMonthsOnSelect && (o = new Date(t.getFullYear(), t.getMonth(), 1)), "years" == e.view && t.getFullYear() != s.year && i.moveToOtherYearsOnSelect && (o = new Date(t.getFullYear(), 0, 1)), o && (e.silent = !0, e.date = o, e.silent = !1, e.nav._render()), i.multipleDates && !i.range) {
                        if (h === i.multipleDates) return;
                        e._isSelected(t) || e.selectedDates.push(t)
                    } else i.range ? 2 == h ? (e.selectedDates = [t], e.minRange = t, e.maxRange = "") : 1 == h ? (e.selectedDates.push(t), e.maxRange ? e.minRange = t : e.maxRange = t, n.bigger(e.maxRange, e.minRange) && (e.maxRange = e.minRange, e.minRange = t), e.selectedDates = [e.minRange, e.maxRange]) : (e.selectedDates = [t], e.minRange = t) : e.selectedDates = [t];
                    e._setInputValue(), i.onSelect && e._triggerOnChange(), i.autoClose && !this.timepickerIsActive && (i.multipleDates || i.range ? i.range && 2 == e.selectedDates.length && e.hide() : e.hide()), e.views[this.currentView]._render()
                }
            },
            removeDate: function(t) {
                var e = this.selectedDates,
                    i = this;
                if (t instanceof Date) return e.some(function(s, a) {
                    return n.isSame(s, t) ? (e.splice(a, 1), i.selectedDates.length ? i.lastSelectedDate = i.selectedDates[i.selectedDates.length - 1] : (i.minRange = "", i.maxRange = "", i.lastSelectedDate = ""), i.views[i.currentView]._render(), i._setInputValue(), i.opts.onSelect && i._triggerOnChange(), !0) : void 0
                })
            },
            today: function() {
                this.silent = !0, this.view = this.opts.minView, this.silent = !1, this.date = new Date, this.opts.todayButton instanceof Date && this.selectDate(this.opts.todayButton)
            },
            clear: function() {
                this.selectedDates = [], this.minRange = "", this.maxRange = "", this.views[this.currentView]._render(), this._setInputValue(), this.opts.onSelect && this._triggerOnChange()
            },
            update: function(t, i) {
                var s = arguments.length,
                    a = this.lastSelectedDate;
                return 2 == s ? this.opts[t] = i : 1 == s && "object" == typeof t && (this.opts = e.extend(!0, this.opts, t)), this._createShortCuts(), this._syncWithMinMaxDates(), this._defineLocale(this.opts.language), this.nav._addButtonsIfNeed(), this.opts.onlyTimepicker || this.nav._render(), this.views[this.currentView]._render(), this.elIsInput && !this.opts.inline && (this._setPositionClasses(this.opts.position), this.visible && this.setPosition(this.opts.position)), this.opts.classes && this.$datepicker.addClass(this.opts.classes), this.opts.onlyTimepicker && this.$datepicker.addClass("-only-timepicker-"), this.opts.timepicker && (a && this.timepicker._handleDate(a), this.timepicker._updateRanges(), this.timepicker._updateCurrentTime(), a && (a.setHours(this.timepicker.hours), a.setMinutes(this.timepicker.minutes))), this._setInputValue(), this
            },
            _syncWithMinMaxDates: function() {
                var t = this.date.getTime();
                this.silent = !0, this.minTime > t && (this.date = this.minDate), this.maxTime < t && (this.date = this.maxDate), this.silent = !1
            },
            _isSelected: function(t, e) {
                var i = !1;
                return this.selectedDates.some(function(s) {
                    return n.isSame(s, t, e) ? (i = s, !0) : void 0
                }), i
            },
            _setInputValue: function() {
                var t, e = this,
                    i = e.opts,
                    s = e.loc.dateFormat,
                    a = i.altFieldDateFormat,
                    n = e.selectedDates.map(function(t) {
                        return e.formatDate(s, t)
                    });
                i.altField && e.$altField.length && (t = this.selectedDates.map(function(t) {
                    return e.formatDate(a, t)
                }), t = t.join(this.opts.multipleDatesSeparator), this.$altField.val(t)), n = n.join(this.opts.multipleDatesSeparator), this.$el.val(n)
            },
            _isInRange: function(t, e) {
                var i = t.getTime(),
                    s = n.getParsedDate(t),
                    a = n.getParsedDate(this.minDate),
                    h = n.getParsedDate(this.maxDate),
                    o = new Date(s.year, s.month, a.date).getTime(),
                    r = new Date(s.year, s.month, h.date).getTime(),
                    c = {
                        day: i >= this.minTime && i <= this.maxTime,
                        month: o >= this.minTime && r <= this.maxTime,
                        year: s.year >= a.year && s.year <= h.year
                    };
                return e ? c[e] : c.day
            },
            _getDimensions: function(t) {
                var e = t.offset();
                return {
                    width: t.outerWidth(),
                    height: t.outerHeight(),
                    left: e.left,
                    top: e.top
                }
            },
            _getDateFromCell: function(t) {
                var e = this.parsedDate,
                    s = t.data("year") || e.year,
                    a = t.data("month") == i ? e.month : t.data("month"),
                    n = t.data("date") || 1;
                return new Date(s, a, n)
            },
            _setPositionClasses: function(t) {
                t = t.split(" ");
                var e = t[0],
                    i = t[1],
                    s = "datepicker -" + e + "-" + i + "- -from-" + e + "-";
                this.visible && (s += " active"), this.$datepicker.removeAttr("class").addClass(s)
            },
            setPosition: function(t) {
                t = t || this.opts.position;
                var e, i, s = this._getDimensions(this.$el),
                    a = this._getDimensions(this.$datepicker),
                    n = t.split(" "),
                    h = this.opts.offset,
                    o = n[0],
                    r = n[1];
                switch (o) {
                    case "top":
                        e = s.top - a.height - h;
                        break;
                    case "right":
                        i = s.left + s.width + h;
                        break;
                    case "bottom":
                        e = s.top + s.height + h;
                        break;
                    case "left":
                        i = s.left - a.width - h
                }
                switch (r) {
                    case "top":
                        e = s.top;
                        break;
                    case "right":
                        i = s.left + s.width - a.width;
                        break;
                    case "bottom":
                        e = s.top + s.height - a.height;
                        break;
                    case "left":
                        i = s.left;
                        break;
                    case "center":
                        /left|right/.test(o) ? e = s.top + s.height / 2 - a.height / 2 : i = s.left + s.width / 2 - a.width / 2
                }
                this.$datepicker.css({
                    left: i,
                    top: e
                })
            },
            show: function() {
                var t = this.opts.onShow;
                this.setPosition(this.opts.position), this.$datepicker.addClass("active"), this.visible = !0, t && this._bindVisionEvents(t)
            },
            hide: function() {
                var t = this.opts.onHide;
                this.$datepicker.removeClass("active").css({
                    left: "-100000px"
                }), this.focused = "", this.keys = [], this.inFocus = !1, this.visible = !1, this.$el.blur(), t && this._bindVisionEvents(t)
            },
            down: function(t) {
                this._changeView(t, "down")
            },
            up: function(t) {
                this._changeView(t, "up")
            },
            _bindVisionEvents: function(t) {
                this.$datepicker.off("transitionend.dp"), t(this, !1), this.$datepicker.one("transitionend.dp", t.bind(this, this, !0))
            },
            _changeView: function(t, e) {
                t = t || this.focused || this.date;
                var i = "up" == e ? this.viewIndex + 1 : this.viewIndex - 1;
                i > 2 && (i = 2), 0 > i && (i = 0), this.silent = !0, this.date = new Date(t.getFullYear(), t.getMonth(), 1), this.silent = !1, this.view = this.viewIndexes[i]
            },
            _handleHotKey: function(t) {
                var e, i, s, a = n.getParsedDate(this._getFocusedDate()),
                    h = this.opts,
                    o = !1,
                    r = !1,
                    c = !1,
                    d = a.year,
                    l = a.month,
                    u = a.date;
                switch (t) {
                    case "ctrlRight":
                    case "ctrlUp":
                        l += 1, o = !0;
                        break;
                    case "ctrlLeft":
                    case "ctrlDown":
                        l -= 1, o = !0;
                        break;
                    case "shiftRight":
                    case "shiftUp":
                        r = !0, d += 1;
                        break;
                    case "shiftLeft":
                    case "shiftDown":
                        r = !0, d -= 1;
                        break;
                    case "altRight":
                    case "altUp":
                        c = !0, d += 10;
                        break;
                    case "altLeft":
                    case "altDown":
                        c = !0, d -= 10;
                        break;
                    case "ctrlShiftUp":
                        this.up()
                }
                s = n.getDaysCount(new Date(d, l)), i = new Date(d, l, u), u > s && (u = s), i.getTime() < this.minTime ? i = this.minDate : i.getTime() > this.maxTime && (i = this.maxDate), this.focused = i, e = n.getParsedDate(i), o && h.onChangeMonth && h.onChangeMonth(e.month, e.year), r && h.onChangeYear && h.onChangeYear(e.year), c && h.onChangeDecade && h.onChangeDecade(this.curDecade)
            },
            _registerKey: function(t) {
                var e = this.keys.some(function(e) {
                    return e == t
                });
                e || this.keys.push(t)
            },
            _unRegisterKey: function(t) {
                var e = this.keys.indexOf(t);
                this.keys.splice(e, 1)
            },
            _isHotKeyPressed: function() {
                var t, e = !1,
                    i = this,
                    s = this.keys.sort();
                for (var a in u) t = u[a], s.length == t.length && t.every(function(t, e) {
                    return t == s[e]
                }) && (i._trigger("hotKey", a), e = !0);
                return e
            },
            _trigger: function(t, e) {
                this.$el.trigger(t, e)
            },
            _focusNextCell: function(t, e) {
                e = e || this.cellType;
                var i = n.getParsedDate(this._getFocusedDate()),
                    s = i.year,
                    a = i.month,
                    h = i.date;
                if (!this._isHotKeyPressed()) {
                    switch (t) {
                        case 37:
                            "day" == e ? h -= 1 : "", "month" == e ? a -= 1 : "", "year" == e ? s -= 1 : "";
                            break;
                        case 38:
                            "day" == e ? h -= 7 : "", "month" == e ? a -= 3 : "", "year" == e ? s -= 4 : "";
                            break;
                        case 39:
                            "day" == e ? h += 1 : "", "month" == e ? a += 1 : "", "year" == e ? s += 1 : "";
                            break;
                        case 40:
                            "day" == e ? h += 7 : "", "month" == e ? a += 3 : "", "year" == e ? s += 4 : ""
                    }
                    var o = new Date(s, a, h);
                    o.getTime() < this.minTime ? o = this.minDate : o.getTime() > this.maxTime && (o = this.maxDate), this.focused = o
                }
            },
            _getFocusedDate: function() {
                var t = this.focused || this.selectedDates[this.selectedDates.length - 1],
                    e = this.parsedDate;
                if (!t) switch (this.view) {
                    case "days":
                        t = new Date(e.year, e.month, (new Date).getDate());
                        break;
                    case "months":
                        t = new Date(e.year, e.month, 1);
                        break;
                    case "years":
                        t = new Date(e.year, 0, 1)
                }
                return t
            },
            _getCell: function(t, i) {
                i = i || this.cellType;
                var s, a = n.getParsedDate(t),
                    h = '.datepicker--cell[data-year="' + a.year + '"]';
                switch (i) {
                    case "month":
                        h = '[data-month="' + a.month + '"]';
                        break;
                    case "day":
                        h += '[data-month="' + a.month + '"][data-date="' + a.date + '"]'
                }
                return s = this.views[this.currentView].$el.find(h), s.length ? s : e("")
            },
            destroy: function() {
                var t = this;
                t.$el.off(".adp").data("datepicker", ""), t.selectedDates = [], t.focused = "", t.views = {}, t.keys = [], t.minRange = "", t.maxRange = "", t.opts.inline || !t.elIsInput ? t.$datepicker.closest(".datepicker-inline").remove() : t.$datepicker.remove()
            },
            _handleAlreadySelectedDates: function(t, e) {
                this.opts.range ? this.opts.toggleSelected ? this.removeDate(e) : 2 != this.selectedDates.length && this._trigger("clickCell", e) : this.opts.toggleSelected && this.removeDate(e), this.opts.toggleSelected || (this.lastSelectedDate = t, this.opts.timepicker && (this.timepicker._setTime(t), this.timepicker.update()))
            },
            _onShowEvent: function(t) {
                this.visible || this.show()
            },
            _onBlur: function() {
                !this.inFocus && this.visible && this.hide()
            },
            _onMouseDownDatepicker: function(t) {
                this.inFocus = !0
            },
            _onMouseUpDatepicker: function(t) {
                this.inFocus = !1, t.originalEvent.inFocus = !0, t.originalEvent.timepickerFocus || this.$el.focus()
            },
            _onKeyUpGeneral: function(t) {
                var e = this.$el.val();
                e || this.clear()
            },
            _onResize: function() {
                this.visible && this.setPosition()
            },
            _onMouseUpBody: function(t) {
                t.originalEvent.inFocus || this.visible && !this.inFocus && this.hide()
            },
            _onMouseUpEl: function(t) {
                t.originalEvent.inFocus = !0, setTimeout(this._onKeyUpGeneral.bind(this), 4)
            },
            _onKeyDown: function(t) {
                var e = t.which;
                if (this._registerKey(e), e >= 37 && 40 >= e && (t.preventDefault(), this._focusNextCell(e)), 13 == e && this.focused) {
                    if (this._getCell(this.focused).hasClass("-disabled-")) return;
                    if (this.view != this.opts.minView) this.down();
                    else {
                        var i = this._isSelected(this.focused, this.cellType);
                        if (!i) return this.timepicker && (this.focused.setHours(this.timepicker.hours), this.focused.setMinutes(this.timepicker.minutes)), void this.selectDate(this.focused);
                        this._handleAlreadySelectedDates(i, this.focused)
                    }
                }
                27 == e && this.hide()
            },
            _onKeyUp: function(t) {
                var e = t.which;
                this._unRegisterKey(e)
            },
            _onHotKey: function(t, e) {
                this._handleHotKey(e)
            },
            _onMouseEnterCell: function(t) {
                var i = e(t.target).closest(".datepicker--cell"),
                    s = this._getDateFromCell(i);
                this.silent = !0, this.focused && (this.focused = ""), i.addClass("-focus-"), this.focused = s, this.silent = !1, this.opts.range && 1 == this.selectedDates.length && (this.minRange = this.selectedDates[0], this.maxRange = "", n.less(this.minRange, this.focused) && (this.maxRange = this.minRange, this.minRange = ""), this.views[this.currentView]._update())
            },
            _onMouseLeaveCell: function(t) {
                var i = e(t.target).closest(".datepicker--cell");
                i.removeClass("-focus-"), this.silent = !0, this.focused = "", this.silent = !1
            },
            _onTimeChange: function(t, e, i) {
                var s = new Date,
                    a = this.selectedDates,
                    n = !1;
                a.length && (n = !0, s = this.lastSelectedDate), s.setHours(e), s.setMinutes(i), n || this._getCell(s).hasClass("-disabled-") ? (this._setInputValue(), this.opts.onSelect && this._triggerOnChange()) : this.selectDate(s)
            },
            _onClickCell: function(t, e) {
                this.timepicker && (e.setHours(this.timepicker.hours), e.setMinutes(this.timepicker.minutes)), this.selectDate(e)
            },
            set focused(t) {
                if (!t && this.focused) {
                    var e = this._getCell(this.focused);
                    e.length && e.removeClass("-focus-")
                }
                this._focused = t, this.opts.range && 1 == this.selectedDates.length && (this.minRange = this.selectedDates[0], this.maxRange = "", n.less(this.minRange, this._focused) && (this.maxRange = this.minRange, this.minRange = "")), this.silent || (this.date = t)
            },
            get focused() {
                return this._focused
            },
            get parsedDate() {
                return n.getParsedDate(this.date)
            },
            set date(t) {
                return t instanceof Date ? (this.currentDate = t, this.inited && !this.silent && (this.views[this.view]._render(), this.nav._render(), this.visible && this.elIsInput && this.setPosition()), t) : void 0
            },
            get date() {
                return this.currentDate
            },
            set view(t) {
                return this.viewIndex = this.viewIndexes.indexOf(t), this.viewIndex < 0 ? void 0 : (this.prevView = this.currentView, this.currentView = t, this.inited && (this.views[t] ? this.views[t]._render() : this.views[t] = new e.fn.datepicker.Body(this, t, this.opts), this.views[this.prevView].hide(), this.views[t].show(), this.nav._render(), this.opts.onChangeView && this.opts.onChangeView(t), this.elIsInput && this.visible && this.setPosition()), t)
            },
            get view() {
                return this.currentView
            },
            get cellType() {
                return this.view.substring(0, this.view.length - 1)
            },
            get minTime() {
                var t = n.getParsedDate(this.minDate);
                return new Date(t.year, t.month, t.date).getTime()
            },
            get maxTime() {
                var t = n.getParsedDate(this.maxDate);
                return new Date(t.year, t.month, t.date).getTime()
            },
            get curDecade() {
                return n.getDecade(this.date)
            }
        }, n.getDaysCount = function(t) {
            return new Date(t.getFullYear(), t.getMonth() + 1, 0).getDate()
        }, n.getParsedDate = function(t) {
            return {
                year: t.getFullYear(),
                month: t.getMonth(),
                fullMonth: t.getMonth() + 1 < 10 ? "0" + (t.getMonth() + 1) : t.getMonth() + 1,
                date: t.getDate(),
                fullDate: t.getDate() < 10 ? "0" + t.getDate() : t.getDate(),
                day: t.getDay(),
                hours: t.getHours(),
                fullHours: t.getHours() < 10 ? "0" + t.getHours() : t.getHours(),
                minutes: t.getMinutes(),
                fullMinutes: t.getMinutes() < 10 ? "0" + t.getMinutes() : t.getMinutes()
            }
        }, n.getDecade = function(t) {
            var e = 10 * Math.floor(t.getFullYear() / 10);
            return [e, e + 9]
        }, n.template = function(t, e) {
            return t.replace(/#\{([\w]+)\}/g, function(t, i) {
                return e[i] || 0 === e[i] ? e[i] : void 0
            })
        }, n.isSame = function(t, e, i) {
            if (!t || !e) return !1;
            var s = n.getParsedDate(t),
                a = n.getParsedDate(e),
                h = i ? i : "day",
                o = {
                    day: s.date == a.date && s.month == a.month && s.year == a.year,
                    month: s.month == a.month && s.year == a.year,
                    year: s.year == a.year
                };
            return o[h]
        }, n.less = function(t, e, i) {
            return t && e ? e.getTime() < t.getTime() : !1
        }, n.bigger = function(t, e, i) {
            return t && e ? e.getTime() > t.getTime() : !1
        }, n.getLeadingZeroNum = function(t) {
            return parseInt(t) < 10 ? "0" + t : t
        }, n.resetTime = function(t) {
            return "object" == typeof t ? (t = n.getParsedDate(t), new Date(t.year, t.month, t.date)) : void 0
        }, e.fn.datepicker = function(t) {
            return this.each(function() {
                if (e.data(this, o)) {
                    var i = e.data(this, o);
                    i.opts = e.extend(!0, i.opts, t), i.update()
                } else e.data(this, o, new m(this, t))
            })
        }, e.fn.datepicker.Constructor = m, e.fn.datepicker.language = {
            ru: {
                days: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
                daysShort: ["Вос", "Пон", "Вто", "Сре", "Чет", "Пят", "Суб"],
                daysMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
                months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
                monthsShort: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
                today: "Сегодня",
                clear: "Очистить",
                dateFormat: "dd.mm.yyyy",
                timeFormat: "hh:ii",
                firstDay: 1
            }
        }, e(function() {
            e(r).datepicker()
        })
    }(),
    function() {
        var t = {
                days: '<div class="datepicker--days datepicker--body"><div class="datepicker--days-names"></div><div class="datepicker--cells datepicker--cells-days"></div></div>',
                months: '<div class="datepicker--months datepicker--body"><div class="datepicker--cells datepicker--cells-months"></div></div>',
                years: '<div class="datepicker--years datepicker--body"><div class="datepicker--cells datepicker--cells-years"></div></div>'
            },
            s = e.fn.datepicker,
            a = s.Constructor;
        s.Body = function(t, i, s) {
            this.d = t, this.type = i, this.opts = s, this.$el = e(""), this.opts.onlyTimepicker || this.init()
        }, s.Body.prototype = {
            init: function() {
                this._buildBaseHtml(), this._render(), this._bindEvents()
            },
            _bindEvents: function() {
                this.$el.on("click", ".datepicker--cell", e.proxy(this._onClickCell, this))
            },
            _buildBaseHtml: function() {
                this.$el = e(t[this.type]).appendTo(this.d.$content), this.$names = e(".datepicker--days-names", this.$el), this.$cells = e(".datepicker--cells", this.$el)
            },
            _getDayNamesHtml: function(t, e, s, a) {
                return e = e != i ? e : t, s = s ? s : "", a = a != i ? a : 0, a > 7 ? s : 7 == e ? this._getDayNamesHtml(t, 0, s, ++a) : (s += '<div class="datepicker--day-name' + (this.d.isWeekend(e) ? " -weekend-" : "") + '">' + this.d.loc.daysMin[e] + "</div>", this._getDayNamesHtml(t, ++e, s, ++a))
            },
            _getCellContents: function(t, e) {
                var i = "datepicker--cell datepicker--cell-" + e,
                    s = new Date,
                    n = this.d,
                    h = a.resetTime(n.minRange),
                    o = a.resetTime(n.maxRange),
                    r = n.opts,
                    c = a.getParsedDate(t),
                    d = {},
                    l = c.date;
                switch (e) {
                    case "day":
                        n.isWeekend(c.day) && (i += " -weekend-"), c.month != this.d.parsedDate.month && (i += " -other-month-", r.selectOtherMonths || (i += " -disabled-"), r.showOtherMonths || (l = ""));
                        break;
                    case "month":
                        l = n.loc[n.opts.monthsField][c.month];
                        break;
                    case "year":
                        var u = n.curDecade;
                        l = c.year, (c.year < u[0] || c.year > u[1]) && (i += " -other-decade-", r.selectOtherYears || (i += " -disabled-"), r.showOtherYears || (l = ""))
                }
                return r.onRenderCell && (d = r.onRenderCell(t, e) || {}, l = d.html ? d.html : l, i += d.classes ? " " + d.classes : ""), r.range && (a.isSame(h, t, e) && (i += " -range-from-"), a.isSame(o, t, e) && (i += " -range-to-"), 1 == n.selectedDates.length && n.focused ? ((a.bigger(h, t) && a.less(n.focused, t) || a.less(o, t) && a.bigger(n.focused, t)) && (i += " -in-range-"), a.less(o, t) && a.isSame(n.focused, t) && (i += " -range-from-"), a.bigger(h, t) && a.isSame(n.focused, t) && (i += " -range-to-")) : 2 == n.selectedDates.length && a.bigger(h, t) && a.less(o, t) && (i += " -in-range-")), a.isSame(s, t, e) && (i += " -current-"), n.focused && a.isSame(t, n.focused, e) && (i += " -focus-"), n._isSelected(t, e) && (i += " -selected-"), (!n._isInRange(t, e) || d.disabled) && (i += " -disabled-"), {
                    html: l,
                    classes: i
                }
            },
            _getDaysHtml: function(t) {
                var e = a.getDaysCount(t),
                    i = new Date(t.getFullYear(), t.getMonth(), 1).getDay(),
                    s = new Date(t.getFullYear(), t.getMonth(), e).getDay(),
                    n = i - this.d.loc.firstDay,
                    h = 6 - s + this.d.loc.firstDay;
                n = 0 > n ? n + 7 : n, h = h > 6 ? h - 7 : h;
                for (var o, r, c = -n + 1, d = "", l = c, u = e + h; u >= l; l++) r = t.getFullYear(), o = t.getMonth(), d += this._getDayHtml(new Date(r, o, l));
                return d
            },
            _getDayHtml: function(t) {
                var e = this._getCellContents(t, "day");
                return '<div class="' + e.classes + '" data-date="' + t.getDate() + '" data-month="' + t.getMonth() + '" data-year="' + t.getFullYear() + '">' + e.html + "</div>"
            },
            _getMonthsHtml: function(t) {
                for (var e = "", i = a.getParsedDate(t), s = 0; 12 > s;) e += this._getMonthHtml(new Date(i.year, s)), s++;
                return e
            },
            _getMonthHtml: function(t) {
                var e = this._getCellContents(t, "month");
                return '<div class="' + e.classes + '" data-month="' + t.getMonth() + '">' + e.html + "</div>"
            },
            _getYearsHtml: function(t) {
                var e = (a.getParsedDate(t), a.getDecade(t)),
                    i = e[0] - 1,
                    s = "",
                    n = i;
                for (n; n <= e[1] + 1; n++) s += this._getYearHtml(new Date(n, 0));
                return s
            },
            _getYearHtml: function(t) {
                var e = this._getCellContents(t, "year");
                return '<div class="' + e.classes + '" data-year="' + t.getFullYear() + '">' + e.html + "</div>"
            },
            _renderTypes: {
                days: function() {
                    var t = this._getDayNamesHtml(this.d.loc.firstDay),
                        e = this._getDaysHtml(this.d.currentDate);
                    this.$cells.html(e), this.$names.html(t)
                },
                months: function() {
                    var t = this._getMonthsHtml(this.d.currentDate);
                    this.$cells.html(t)
                },
                years: function() {
                    var t = this._getYearsHtml(this.d.currentDate);
                    this.$cells.html(t)
                }
            },
            _render: function() {
                this.opts.onlyTimepicker || this._renderTypes[this.type].bind(this)()
            },
            _update: function() {
                var t, i, s, a = e(".datepicker--cell", this.$cells),
                    n = this;
                a.each(function(a, h) {
                    i = e(this), s = n.d._getDateFromCell(e(this)), t = n._getCellContents(s, n.d.cellType), i.attr("class", t.classes)
                })
            },
            show: function() {
                this.opts.onlyTimepicker || (this.$el.addClass("active"), this.acitve = !0)
            },
            hide: function() {
                this.$el.removeClass("active"), this.active = !1
            },
            _handleClick: function(t) {
                var e = t.data("date") || 1,
                    i = t.data("month") || 0,
                    s = t.data("year") || this.d.parsedDate.year,
                    a = this.d;
                if (a.view != this.opts.minView) return void a.down(new Date(s, i, e));
                var n = new Date(s, i, e),
                    h = this.d._isSelected(n, this.d.cellType);
                return h ? void a._handleAlreadySelectedDates.bind(a, h, n)() : void a._trigger("clickCell", n)
            },
            _onClickCell: function(t) {
                var i = e(t.target).closest(".datepicker--cell");
                i.hasClass("-disabled-") || this._handleClick.bind(this)(i)
            }
        }
    }(),
    function() {
        var t = '<div class="datepicker--nav-action" data-action="prev">#{prevHtml}</div><div class="datepicker--nav-title">#{title}</div><div class="datepicker--nav-action" data-action="next">#{nextHtml}</div>',
            i = '<div class="datepicker--buttons"></div>',
            s = '<span class="datepicker--button" data-action="#{action}">#{label}</span>',
            a = e.fn.datepicker,
            n = a.Constructor;
        a.Navigation = function(t, e) {
            this.d = t, this.opts = e, this.$buttonsContainer = "", this.init()
        }, a.Navigation.prototype = {
            init: function() {
                this._buildBaseHtml(), this._bindEvents()
            },
            _bindEvents: function() {
                this.d.$nav.on("click", ".datepicker--nav-action", e.proxy(this._onClickNavButton, this)), this.d.$nav.on("click", ".datepicker--nav-title", e.proxy(this._onClickNavTitle, this)), this.d.$datepicker.on("click", ".datepicker--button", e.proxy(this._onClickNavButton, this))
            },
            _buildBaseHtml: function() {
                this.opts.onlyTimepicker || this._render(), this._addButtonsIfNeed()
            },
            _addButtonsIfNeed: function() {
                this.opts.todayButton && this._addButton("today"), this.opts.clearButton && this._addButton("clear")
            },
            _render: function() {
                var i = this._getTitle(this.d.currentDate),
                    s = n.template(t, e.extend({
                        title: i
                    }, this.opts));
                this.d.$nav.html(s), "years" == this.d.view && e(".datepicker--nav-title", this.d.$nav).addClass("-disabled-"), this.setNavStatus()
            },
            _getTitle: function(t) {
                return this.d.formatDate(this.opts.navTitles[this.d.view], t)
            },
            _addButton: function(t) {
                this.$buttonsContainer.length || this._addButtonsContainer();
                var i = {
                        action: t,
                        label: this.d.loc[t]
                    },
                    a = n.template(s, i);
                e("[data-action=" + t + "]", this.$buttonsContainer).length || this.$buttonsContainer.append(a)
            },
            _addButtonsContainer: function() {
                this.d.$datepicker.append(i), this.$buttonsContainer = e(".datepicker--buttons", this.d.$datepicker)
            },
            setNavStatus: function() {
                if ((this.opts.minDate || this.opts.maxDate) && this.opts.disableNavWhenOutOfRange) {
                    var t = this.d.parsedDate,
                        e = t.month,
                        i = t.year,
                        s = t.date;
                    switch (this.d.view) {
                        case "days":
                            this.d._isInRange(new Date(i, e - 1, 1), "month") || this._disableNav("prev"), this.d._isInRange(new Date(i, e + 1, 1), "month") || this._disableNav("next");
                            break;
                        case "months":
                            this.d._isInRange(new Date(i - 1, e, s), "year") || this._disableNav("prev"), this.d._isInRange(new Date(i + 1, e, s), "year") || this._disableNav("next");
                            break;
                        case "years":
                            var a = n.getDecade(this.d.date);
                            this.d._isInRange(new Date(a[0] - 1, 0, 1), "year") || this._disableNav("prev"), this.d._isInRange(new Date(a[1] + 1, 0, 1), "year") || this._disableNav("next")
                    }
                }
            },
            _disableNav: function(t) {
                e('[data-action="' + t + '"]', this.d.$nav).addClass("-disabled-")
            },
            _activateNav: function(t) {
                e('[data-action="' + t + '"]', this.d.$nav).removeClass("-disabled-")
            },
            _onClickNavButton: function(t) {
                var i = e(t.target).closest("[data-action]"),
                    s = i.data("action");
                this.d[s]()
            },
            _onClickNavTitle: function(t) {
                return e(t.target).hasClass("-disabled-") ? void 0 : "days" == this.d.view ? this.d.view = "months" : void(this.d.view = "years")
            }
        }
    }(),
    function() {
        var t = '<div class="datepicker--time"><div class="datepicker--time-current">   <span class="datepicker--time-current-hours">#{hourVisible}</span>   <span class="datepicker--time-current-colon">:</span>   <span class="datepicker--time-current-minutes">#{minValue}</span></div><div class="datepicker--time-sliders">   <div class="datepicker--time-row">      <input type="range" name="hours" value="#{hourValue}" min="#{hourMin}" max="#{hourMax}" step="#{hourStep}"/>   </div>   <div class="datepicker--time-row">      <input type="range" name="minutes" value="#{minValue}" min="#{minMin}" max="#{minMax}" step="#{minStep}"/>   </div></div></div>',
            i = e.fn.datepicker,
            s = i.Constructor;
        i.Timepicker = function(t, e) {
            this.d = t, this.opts = e, this.init()
        }, i.Timepicker.prototype = {
            init: function() {
                var t = "input";
                this._setTime(this.d.date), this._buildHTML(), navigator.userAgent.match(/trident/gi) && (t = "change"), this.d.$el.on("selectDate", this._onSelectDate.bind(this)), this.$ranges.on(t, this._onChangeRange.bind(this)), this.$ranges.on("mouseup", this._onMouseUpRange.bind(this)), this.$ranges.on("mousemove focus ", this._onMouseEnterRange.bind(this)), this.$ranges.on("mouseout blur", this._onMouseOutRange.bind(this))
            },
            _setTime: function(t) {
                var e = s.getParsedDate(t);
                this._handleDate(t), this.hours = e.hours < this.minHours ? this.minHours : e.hours, this.minutes = e.minutes < this.minMinutes ? this.minMinutes : e.minutes
            },
            _setMinTimeFromDate: function(t) {
                this.minHours = t.getHours(), this.minMinutes = t.getMinutes(), this.d.lastSelectedDate && this.d.lastSelectedDate.getHours() > t.getHours() && (this.minMinutes = this.opts.minMinutes)
            },
            _setMaxTimeFromDate: function(t) {
                this.maxHours = t.getHours(), this.maxMinutes = t.getMinutes(), this.d.lastSelectedDate && this.d.lastSelectedDate.getHours() < t.getHours() && (this.maxMinutes = this.opts.maxMinutes)
            },
            _setDefaultMinMaxTime: function() {
                var t = 23,
                    e = 59,
                    i = this.opts;
                this.minHours = i.minHours < 0 || i.minHours > t ? 0 : i.minHours, this.minMinutes = i.minMinutes < 0 || i.minMinutes > e ? 0 : i.minMinutes, this.maxHours = i.maxHours < 0 || i.maxHours > t ? t : i.maxHours, this.maxMinutes = i.maxMinutes < 0 || i.maxMinutes > e ? e : i.maxMinutes
            },
            _validateHoursMinutes: function(t) {
                this.hours < this.minHours ? this.hours = this.minHours : this.hours > this.maxHours && (this.hours = this.maxHours), this.minutes < this.minMinutes ? this.minutes = this.minMinutes : this.minutes > this.maxMinutes && (this.minutes = this.maxMinutes)
            },
            _buildHTML: function() {
                var i = s.getLeadingZeroNum,
                    a = {
                        hourMin: this.minHours,
                        hourMax: i(this.maxHours),
                        hourStep: this.opts.hoursStep,
                        hourValue: this.hours,
                        hourVisible: i(this.displayHours),
                        minMin: this.minMinutes,
                        minMax: i(this.maxMinutes),
                        minStep: this.opts.minutesStep,
                        minValue: i(this.minutes)
                    },
                    n = s.template(t, a);
                this.$timepicker = e(n).appendTo(this.d.$datepicker), this.$ranges = e('[type="range"]', this.$timepicker), this.$hours = e('[name="hours"]', this.$timepicker), this.$minutes = e('[name="minutes"]', this.$timepicker), this.$hoursText = e(".datepicker--time-current-hours", this.$timepicker), this.$minutesText = e(".datepicker--time-current-minutes", this.$timepicker), this.d.ampm && (this.$ampm = e('<span class="datepicker--time-current-ampm">').appendTo(e(".datepicker--time-current", this.$timepicker)).html(this.dayPeriod), this.$timepicker.addClass("-am-pm-"))
            },
            _updateCurrentTime: function() {
                var t = s.getLeadingZeroNum(this.displayHours),
                    e = s.getLeadingZeroNum(this.minutes);
                this.$hoursText.html(t), this.$minutesText.html(e), this.d.ampm && this.$ampm.html(this.dayPeriod)
            },
            _updateRanges: function() {
                this.$hours.attr({
                    min: this.minHours,
                    max: this.maxHours
                }).val(this.hours), this.$minutes.attr({
                    min: this.minMinutes,
                    max: this.maxMinutes
                }).val(this.minutes)
            },
            _handleDate: function(t) {
                this._setDefaultMinMaxTime(), t && (s.isSame(t, this.d.opts.minDate) ? this._setMinTimeFromDate(this.d.opts.minDate) : s.isSame(t, this.d.opts.maxDate) && this._setMaxTimeFromDate(this.d.opts.maxDate)), this._validateHoursMinutes(t)
            },
            update: function() {
                this._updateRanges(), this._updateCurrentTime()
            },
            _getValidHoursFromDate: function(t, e) {
                var i = t,
                    a = t;
                t instanceof Date && (i = s.getParsedDate(t), a = i.hours);
                var n = e || this.d.ampm,
                    h = "am";
                if (n) switch (!0) {
                    case 0 == a:
                        a = 12;
                        break;
                    case 12 == a:
                        h = "pm";
                        break;
                    case a > 11:
                        a -= 12, h = "pm"
                }
                return {
                    hours: a,
                    dayPeriod: h
                }
            },
            set hours(t) {
                this._hours = t;
                var e = this._getValidHoursFromDate(t);
                this.displayHours = e.hours, this.dayPeriod = e.dayPeriod
            },
            get hours() {
                return this._hours
            },
            _onChangeRange: function(t) {
                var i = e(t.target),
                    s = i.attr("name");
                this.d.timepickerIsActive = !0, this[s] = i.val(), this._updateCurrentTime(), this.d._trigger("timeChange", [this.hours, this.minutes]), this._handleDate(this.d.lastSelectedDate), this.update()
            },
            _onSelectDate: function(t, e) {
                this._handleDate(e), this.update()
            },
            _onMouseEnterRange: function(t) {
                var i = e(t.target).attr("name");
                e(".datepicker--time-current-" + i, this.$timepicker).addClass("-focus-")
            },
            _onMouseOutRange: function(t) {
                var i = e(t.target).attr("name");
                this.d.inFocus || e(".datepicker--time-current-" + i, this.$timepicker).removeClass("-focus-")
            },
            _onMouseUpRange: function(t) {
                this.d.timepickerIsActive = !1
            }
        }
    }()
}(window, jQuery);
/* perfect-scrollbar v0.6.10 */
(function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = typeof require == "function" && require;
                if (!u && a) return a(o, !0);
                if (i) return i(o, !0);
                var f = new Error("Cannot find module '" + o + "'");
                throw f.code = "MODULE_NOT_FOUND", f
            }
            var l = n[o] = {
                exports: {}
            };
            t[o][0].call(l.exports, function(e) {
                var n = t[o][1][e];
                return s(n ? n : e)
            }, l, l.exports, e, t, n, r)
        }
        return n[o].exports
    }
    var i = typeof require == "function" && require;
    for (var o = 0; o < r.length; o++) s(r[o]);
    return s
})({
    1: [function(require, module, exports) {
        'use strict';

        var ps = require('../main'),
            psInstances = require('../plugin/instances');

        function mountJQuery(jQuery) {
            jQuery.fn.perfectScrollbar = function(settingOrCommand) {
                return this.each(function() {
                    if (typeof settingOrCommand === 'object' ||
                        typeof settingOrCommand === 'undefined') {
                        // If it's an object or none, initialize.
                        var settings = settingOrCommand;

                        if (!psInstances.get(this)) {
                            ps.initialize(this, settings);
                        }
                    } else {
                        // Unless, it may be a command.
                        var command = settingOrCommand;

                        if (command === 'update') {
                            ps.update(this);
                        } else if (command === 'destroy') {
                            ps.destroy(this);
                        }
                    };
                    return jQuery(this);
                });
            };
        }

        if (typeof define === 'function' && define.amd) {
            // AMD. Register as an anonymous module.
            define(['jquery'], mountJQuery);
        } else {
            var jq = window.jQuery ? window.jQuery : window.$;
            if (typeof jq !== 'undefined') {
                mountJQuery(jq);
            }
        }

        module.exports = mountJQuery;

    }, {
        "../main": 7,
        "../plugin/instances": 18
    }],
    2: [function(require, module, exports) {
        'use strict';

        function oldAdd(element, className) {
            var classes = element.className.split(' ');
            if (classes.indexOf(className) < 0) {
                classes.push(className);
            }
            element.className = classes.join(' ');
        }

        function oldRemove(element, className) {
            var classes = element.className.split(' ');
            var idx = classes.indexOf(className);
            if (idx >= 0) {
                classes.splice(idx, 1);
            }
            element.className = classes.join(' ');
        }

        exports.add = function(element, className) {
            if (element.classList) {
                element.classList.add(className);
            } else {
                oldAdd(element, className);
            }
        };

        exports.remove = function(element, className) {
            if (element.classList) {
                element.classList.remove(className);
            } else {
                oldRemove(element, className);
            }
        };

        exports.list = function(element) {
            if (element.classList) {
                return Array.prototype.slice.apply(element.classList);
            } else {
                return element.className.split(' ');
            }
        };

    }, {}],
    3: [function(require, module, exports) {
        'use strict';

        var DOM = {};

        DOM.e = function(tagName, className) {
            var element = document.createElement(tagName);
            element.className = className;
            return element;
        };

        DOM.appendTo = function(child, parent) {
            parent.appendChild(child);
            return child;
        };

        function cssGet(element, styleName) {
            return window.getComputedStyle(element)[styleName];
        }

        function cssSet(element, styleName, styleValue) {
            if (typeof styleValue === 'number') {
                styleValue = styleValue.toString() + 'px';
            }
            element.style[styleName] = styleValue;
            return element;
        }

        function cssMultiSet(element, obj) {
            for (var key in obj) {
                var val = obj[key];
                if (typeof val === 'number') {
                    val = val.toString() + 'px';
                }
                element.style[key] = val;
            }
            return element;
        }

        DOM.css = function(element, styleNameOrObject, styleValue) {
            if (typeof styleNameOrObject === 'object') {
                // multiple set with object
                return cssMultiSet(element, styleNameOrObject);
            } else {
                if (typeof styleValue === 'undefined') {
                    return cssGet(element, styleNameOrObject);
                } else {
                    return cssSet(element, styleNameOrObject, styleValue);
                }
            }
        };

        DOM.matches = function(element, query) {
            if (typeof element.matches !== 'undefined') {
                return element.matches(query);
            } else {
                if (typeof element.matchesSelector !== 'undefined') {
                    return element.matchesSelector(query);
                } else if (typeof element.webkitMatchesSelector !== 'undefined') {
                    return element.webkitMatchesSelector(query);
                } else if (typeof element.mozMatchesSelector !== 'undefined') {
                    return element.mozMatchesSelector(query);
                } else if (typeof element.msMatchesSelector !== 'undefined') {
                    return element.msMatchesSelector(query);
                }
            }
        };

        DOM.remove = function(element) {
            if (typeof element.remove !== 'undefined') {
                element.remove();
            } else {
                if (element.parentNode) {
                    element.parentNode.removeChild(element);
                }
            }
        };

        DOM.queryChildren = function(element, selector) {
            return Array.prototype.filter.call(element.childNodes, function(child) {
                return DOM.matches(child, selector);
            });
        };

        module.exports = DOM;

    }, {}],
    4: [function(require, module, exports) {
        'use strict';

        var EventElement = function(element) {
            this.element = element;
            this.events = {};
        };

        EventElement.prototype.bind = function(eventName, handler) {
            if (typeof this.events[eventName] === 'undefined') {
                this.events[eventName] = [];
            }
            this.events[eventName].push(handler);
            this.element.addEventListener(eventName, handler, false);
        };

        EventElement.prototype.unbind = function(eventName, handler) {
            var isHandlerProvided = (typeof handler !== 'undefined');
            this.events[eventName] = this.events[eventName].filter(function(hdlr) {
                if (isHandlerProvided && hdlr !== handler) {
                    return true;
                }
                this.element.removeEventListener(eventName, hdlr, false);
                return false;
            }, this);
        };

        EventElement.prototype.unbindAll = function() {
            for (var name in this.events) {
                this.unbind(name);
            }
        };

        var EventManager = function() {
            this.eventElements = [];
        };

        EventManager.prototype.eventElement = function(element) {
            var ee = this.eventElements.filter(function(eventElement) {
                return eventElement.element === element;
            })[0];
            if (typeof ee === 'undefined') {
                ee = new EventElement(element);
                this.eventElements.push(ee);
            }
            return ee;
        };

        EventManager.prototype.bind = function(element, eventName, handler) {
            this.eventElement(element).bind(eventName, handler);
        };

        EventManager.prototype.unbind = function(element, eventName, handler) {
            this.eventElement(element).unbind(eventName, handler);
        };

        EventManager.prototype.unbindAll = function() {
            for (var i = 0; i < this.eventElements.length; i++) {
                this.eventElements[i].unbindAll();
            }
        };

        EventManager.prototype.once = function(element, eventName, handler) {
            var ee = this.eventElement(element);
            var onceHandler = function(e) {
                ee.unbind(eventName, onceHandler);
                handler(e);
            };
            ee.bind(eventName, onceHandler);
        };

        module.exports = EventManager;

    }, {}],
    5: [function(require, module, exports) {
        'use strict';

        module.exports = (function() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return function() {
                return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                    s4() + '-' + s4() + s4() + s4();
            };
        })();

    }, {}],
    6: [function(require, module, exports) {
        'use strict';

        var cls = require('./class'),
            d = require('./dom');

        exports.toInt = function(x) {
            return parseInt(x, 10) || 0;
        };

        exports.clone = function(obj) {
            if (obj === null) {
                return null;
            } else if (typeof obj === 'object') {
                var result = {};
                for (var key in obj) {
                    result[key] = this.clone(obj[key]);
                }
                return result;
            } else {
                return obj;
            }
        };

        exports.extend = function(original, source) {
            var result = this.clone(original);
            for (var key in source) {
                result[key] = this.clone(source[key]);
            }
            return result;
        };

        exports.isEditable = function(el) {
            return d.matches(el, "input,[contenteditable]") ||
                d.matches(el, "select,[contenteditable]") ||
                d.matches(el, "textarea,[contenteditable]") ||
                d.matches(el, "button,[contenteditable]");
        };

        exports.removePsClasses = function(element) {
            var clsList = cls.list(element);
            for (var i = 0; i < clsList.length; i++) {
                var className = clsList[i];
                if (className.indexOf('ps-') === 0) {
                    cls.remove(element, className);
                }
            }
        };

        exports.outerWidth = function(element) {
            return this.toInt(d.css(element, 'width')) +
                this.toInt(d.css(element, 'paddingLeft')) +
                this.toInt(d.css(element, 'paddingRight')) +
                this.toInt(d.css(element, 'borderLeftWidth')) +
                this.toInt(d.css(element, 'borderRightWidth'));
        };

        exports.startScrolling = function(element, axis) {
            cls.add(element, 'ps-in-scrolling');
            if (typeof axis !== 'undefined') {
                cls.add(element, 'ps-' + axis);
            } else {
                cls.add(element, 'ps-x');
                cls.add(element, 'ps-y');
            }
        };

        exports.stopScrolling = function(element, axis) {
            cls.remove(element, 'ps-in-scrolling');
            if (typeof axis !== 'undefined') {
                cls.remove(element, 'ps-' + axis);
            } else {
                cls.remove(element, 'ps-x');
                cls.remove(element, 'ps-y');
            }
        };

        exports.env = {
            isWebKit: 'WebkitAppearance' in document.documentElement.style,
            supportsTouch: (('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch),
            supportsIePointer: window.navigator.msMaxTouchPoints !== null
        };

    }, {
        "./class": 2,
        "./dom": 3
    }],
    7: [function(require, module, exports) {
        'use strict';

        var destroy = require('./plugin/destroy'),
            initialize = require('./plugin/initialize'),
            update = require('./plugin/update');

        module.exports = {
            initialize: initialize,
            update: update,
            destroy: destroy
        };

    }, {
        "./plugin/destroy": 9,
        "./plugin/initialize": 17,
        "./plugin/update": 21
    }],
    8: [function(require, module, exports) {
        'use strict';

        module.exports = {
            maxScrollbarLength: null,
            minScrollbarLength: null,
            scrollXMarginOffset: 0,
            scrollYMarginOffset: 0,
            stopPropagationOnClick: true,
            suppressScrollX: false,
            suppressScrollY: false,
            swipePropagation: true,
            useBothWheelAxes: false,
            useKeyboard: true,
            useSelectionScroll: false,
            wheelPropagation: false,
            wheelSpeed: 1,
            theme: 'default'
        };

    }, {}],
    9: [function(require, module, exports) {
        'use strict';

        var d = require('../lib/dom'),
            h = require('../lib/helper'),
            instances = require('./instances');

        module.exports = function(element) {
            var i = instances.get(element);

            if (!i) {
                return;
            }

            i.event.unbindAll();
            d.remove(i.scrollbarX);
            d.remove(i.scrollbarY);
            d.remove(i.scrollbarXRail);
            d.remove(i.scrollbarYRail);
            h.removePsClasses(element);

            instances.remove(element);
        };

    }, {
        "../lib/dom": 3,
        "../lib/helper": 6,
        "./instances": 18
    }],
    10: [function(require, module, exports) {
        'use strict';

        var h = require('../../lib/helper'),
            instances = require('../instances'),
            updateGeometry = require('../update-geometry'),
            updateScroll = require('../update-scroll');

        function bindClickRailHandler(element, i) {
            function pageOffset(el) {
                return el.getBoundingClientRect();
            }
            var stopPropagation = window.Event.prototype.stopPropagation.bind;

            if (i.settings.stopPropagationOnClick) {
                i.event.bind(i.scrollbarY, 'click', stopPropagation);
            }
            i.event.bind(i.scrollbarYRail, 'click', function(e) {
                var halfOfScrollbarLength = h.toInt(i.scrollbarYHeight / 2);
                var positionTop = i.railYRatio * (e.pageY - window.pageYOffset - pageOffset(i.scrollbarYRail).top - halfOfScrollbarLength);
                var maxPositionTop = i.railYRatio * (i.railYHeight - i.scrollbarYHeight);
                var positionRatio = positionTop / maxPositionTop;

                if (positionRatio < 0) {
                    positionRatio = 0;
                } else if (positionRatio > 1) {
                    positionRatio = 1;
                }

                updateScroll(element, 'top', (i.contentHeight - i.containerHeight) * positionRatio);
                updateGeometry(element);

                e.stopPropagation();
            });

            if (i.settings.stopPropagationOnClick) {
                i.event.bind(i.scrollbarX, 'click', stopPropagation);
            }
            i.event.bind(i.scrollbarXRail, 'click', function(e) {
                var halfOfScrollbarLength = h.toInt(i.scrollbarXWidth / 2);
                var positionLeft = i.railXRatio * (e.pageX - window.pageXOffset - pageOffset(i.scrollbarXRail).left - halfOfScrollbarLength);
                var maxPositionLeft = i.railXRatio * (i.railXWidth - i.scrollbarXWidth);
                var positionRatio = positionLeft / maxPositionLeft;

                if (positionRatio < 0) {
                    positionRatio = 0;
                } else if (positionRatio > 1) {
                    positionRatio = 1;
                }

                updateScroll(element, 'left', ((i.contentWidth - i.containerWidth) * positionRatio) - i.negativeScrollAdjustment);
                updateGeometry(element);

                e.stopPropagation();
            });
        }

        module.exports = function(element) {
            var i = instances.get(element);
            bindClickRailHandler(element, i);
        };

    }, {
        "../../lib/helper": 6,
        "../instances": 18,
        "../update-geometry": 19,
        "../update-scroll": 20
    }],
    11: [function(require, module, exports) {
        'use strict';

        var d = require('../../lib/dom'),
            h = require('../../lib/helper'),
            instances = require('../instances'),
            updateGeometry = require('../update-geometry'),
            updateScroll = require('../update-scroll');

        function bindMouseScrollXHandler(element, i) {
            var currentLeft = null;
            var currentPageX = null;

            function updateScrollLeft(deltaX) {
                var newLeft = currentLeft + (deltaX * i.railXRatio);
                var maxLeft = Math.max(0, i.scrollbarXRail.getBoundingClientRect().left) + (i.railXRatio * (i.railXWidth - i.scrollbarXWidth));

                if (newLeft < 0) {
                    i.scrollbarXLeft = 0;
                } else if (newLeft > maxLeft) {
                    i.scrollbarXLeft = maxLeft;
                } else {
                    i.scrollbarXLeft = newLeft;
                }

                var scrollLeft = h.toInt(i.scrollbarXLeft * (i.contentWidth - i.containerWidth) / (i.containerWidth - (i.railXRatio * i.scrollbarXWidth))) - i.negativeScrollAdjustment;
                updateScroll(element, 'left', scrollLeft);
            }

            var mouseMoveHandler = function(e) {
                updateScrollLeft(e.pageX - currentPageX);
                updateGeometry(element);
                e.stopPropagation();
                e.preventDefault();
            };

            var mouseUpHandler = function() {
                h.stopScrolling(element, 'x');
                i.event.unbind(i.ownerDocument, 'mousemove', mouseMoveHandler);
            };

            i.event.bind(i.scrollbarX, 'mousedown', function(e) {
                currentPageX = e.pageX;
                currentLeft = h.toInt(d.css(i.scrollbarX, 'left')) * i.railXRatio;
                h.startScrolling(element, 'x');

                i.event.bind(i.ownerDocument, 'mousemove', mouseMoveHandler);
                i.event.once(i.ownerDocument, 'mouseup', mouseUpHandler);

                e.stopPropagation();
                e.preventDefault();
            });
        }

        function bindMouseScrollYHandler(element, i) {
            var currentTop = null;
            var currentPageY = null;

            function updateScrollTop(deltaY) {
                var newTop = currentTop + (deltaY * i.railYRatio);
                var maxTop = Math.max(0, i.scrollbarYRail.getBoundingClientRect().top) + (i.railYRatio * (i.railYHeight - i.scrollbarYHeight));

                if (newTop < 0) {
                    i.scrollbarYTop = 0;
                } else if (newTop > maxTop) {
                    i.scrollbarYTop = maxTop;
                } else {
                    i.scrollbarYTop = newTop;
                }

                var scrollTop = h.toInt(i.scrollbarYTop * (i.contentHeight - i.containerHeight) / (i.containerHeight - (i.railYRatio * i.scrollbarYHeight)));
                updateScroll(element, 'top', scrollTop);
            }

            var mouseMoveHandler = function(e) {
                updateScrollTop(e.pageY - currentPageY);
                updateGeometry(element);
                e.stopPropagation();
                e.preventDefault();
            };

            var mouseUpHandler = function() {
                h.stopScrolling(element, 'y');
                i.event.unbind(i.ownerDocument, 'mousemove', mouseMoveHandler);
            };

            i.event.bind(i.scrollbarY, 'mousedown', function(e) {
                currentPageY = e.pageY;
                currentTop = h.toInt(d.css(i.scrollbarY, 'top')) * i.railYRatio;
                h.startScrolling(element, 'y');

                i.event.bind(i.ownerDocument, 'mousemove', mouseMoveHandler);
                i.event.once(i.ownerDocument, 'mouseup', mouseUpHandler);

                e.stopPropagation();
                e.preventDefault();
            });
        }

        module.exports = function(element) {
            var i = instances.get(element);
            bindMouseScrollXHandler(element, i);
            bindMouseScrollYHandler(element, i);
        };

    }, {
        "../../lib/dom": 3,
        "../../lib/helper": 6,
        "../instances": 18,
        "../update-geometry": 19,
        "../update-scroll": 20
    }],
    12: [function(require, module, exports) {
        'use strict';

        var h = require('../../lib/helper'),
            d = require('../../lib/dom'),
            instances = require('../instances'),
            updateGeometry = require('../update-geometry'),
            updateScroll = require('../update-scroll');

        function bindKeyboardHandler(element, i) {
            var hovered = false;
            i.event.bind(element, 'mouseenter', function() {
                hovered = true;
            });
            i.event.bind(element, 'mouseleave', function() {
                hovered = false;
            });

            var shouldPrevent = false;

            function shouldPreventDefault(deltaX, deltaY) {
                var scrollTop = element.scrollTop;
                if (deltaX === 0) {
                    if (!i.scrollbarYActive) {
                        return false;
                    }
                    if ((scrollTop === 0 && deltaY > 0) || (scrollTop >= i.contentHeight - i.containerHeight && deltaY < 0)) {
                        return !i.settings.wheelPropagation;
                    }
                }

                var scrollLeft = element.scrollLeft;
                if (deltaY === 0) {
                    if (!i.scrollbarXActive) {
                        return false;
                    }
                    if ((scrollLeft === 0 && deltaX < 0) || (scrollLeft >= i.contentWidth - i.containerWidth && deltaX > 0)) {
                        return !i.settings.wheelPropagation;
                    }
                }
                return true;
            }

            i.event.bind(i.ownerDocument, 'keydown', function(e) {
                if (e.isDefaultPrevented && e.isDefaultPrevented()) {
                    return;
                }

                var focused = d.matches(i.scrollbarX, ':focus') ||
                    d.matches(i.scrollbarY, ':focus');

                if (!hovered && !focused) {
                    return;
                }

                var activeElement = document.activeElement ? document.activeElement : i.ownerDocument.activeElement;
                if (activeElement) {
                    // go deeper if element is a webcomponent
                    while (activeElement.shadowRoot) {
                        activeElement = activeElement.shadowRoot.activeElement;
                    }
                    if (h.isEditable(activeElement)) {
                        return;
                    }
                }

                var deltaX = 0;
                var deltaY = 0;

                switch (e.which) {
                    case 37: // left
                        deltaX = -30;
                        break;
                    case 38: // up
                        deltaY = 30;
                        break;
                    case 39: // right
                        deltaX = 30;
                        break;
                    case 40: // down
                        deltaY = -30;
                        break;
                    case 33: // page up
                        deltaY = 90;
                        break;
                    case 32: // space bar
                        if (e.shiftKey) {
                            deltaY = 90;
                        } else {
                            deltaY = -90;
                        }
                        break;
                    case 34: // page down
                        deltaY = -90;
                        break;
                    case 35: // end
                        if (e.ctrlKey) {
                            deltaY = -i.contentHeight;
                        } else {
                            deltaY = -i.containerHeight;
                        }
                        break;
                    case 36: // home
                        if (e.ctrlKey) {
                            deltaY = element.scrollTop;
                        } else {
                            deltaY = i.containerHeight;
                        }
                        break;
                    default:
                        return;
                }

                updateScroll(element, 'top', element.scrollTop - deltaY);
                updateScroll(element, 'left', element.scrollLeft + deltaX);
                updateGeometry(element);

                shouldPrevent = shouldPreventDefault(deltaX, deltaY);
                if (shouldPrevent) {
                    e.preventDefault();
                }
            });
        }

        module.exports = function(element) {
            var i = instances.get(element);
            bindKeyboardHandler(element, i);
        };

    }, {
        "../../lib/dom": 3,
        "../../lib/helper": 6,
        "../instances": 18,
        "../update-geometry": 19,
        "../update-scroll": 20
    }],
    13: [function(require, module, exports) {
        'use strict';

        var instances = require('../instances'),
            updateGeometry = require('../update-geometry'),
            updateScroll = require('../update-scroll');

        function bindMouseWheelHandler(element, i) {
            var shouldPrevent = false;

            function shouldPreventDefault(deltaX, deltaY) {
                var scrollTop = element.scrollTop;
                if (deltaX === 0) {
                    if (!i.scrollbarYActive) {
                        return false;
                    }
                    if ((scrollTop === 0 && deltaY > 0) || (scrollTop >= i.contentHeight - i.containerHeight && deltaY < 0)) {
                        return !i.settings.wheelPropagation;
                    }
                }

                var scrollLeft = element.scrollLeft;
                if (deltaY === 0) {
                    if (!i.scrollbarXActive) {
                        return false;
                    }
                    if ((scrollLeft === 0 && deltaX < 0) || (scrollLeft >= i.contentWidth - i.containerWidth && deltaX > 0)) {
                        return !i.settings.wheelPropagation;
                    }
                }
                return true;
            }

            function getDeltaFromEvent(e) {
                var deltaX = e.deltaX;
                var deltaY = -1 * e.deltaY;

                if (typeof deltaX === "undefined" || typeof deltaY === "undefined") {
                    // OS X Safari
                    deltaX = -1 * e.wheelDeltaX / 6;
                    deltaY = e.wheelDeltaY / 6;
                }

                if (e.deltaMode && e.deltaMode === 1) {
                    // Firefox in deltaMode 1: Line scrolling
                    deltaX *= 10;
                    deltaY *= 10;
                }

                if (deltaX !== deltaX && deltaY !== deltaY /* NaN checks */ ) {
                    // IE in some mouse drivers
                    deltaX = 0;
                    deltaY = e.wheelDelta;
                }

                return [deltaX, deltaY];
            }

            function shouldBeConsumedByTextarea(deltaX, deltaY) {
                var hoveredTextarea = element.querySelector('textarea:hover');
                if (hoveredTextarea) {
                    var maxScrollTop = hoveredTextarea.scrollHeight - hoveredTextarea.clientHeight;
                    if (maxScrollTop > 0) {
                        if (!(hoveredTextarea.scrollTop === 0 && deltaY > 0) &&
                            !(hoveredTextarea.scrollTop === maxScrollTop && deltaY < 0)) {
                            return true;
                        }
                    }
                    var maxScrollLeft = hoveredTextarea.scrollLeft - hoveredTextarea.clientWidth;
                    if (maxScrollLeft > 0) {
                        if (!(hoveredTextarea.scrollLeft === 0 && deltaX < 0) &&
                            !(hoveredTextarea.scrollLeft === maxScrollLeft && deltaX > 0)) {
                            return true;
                        }
                    }
                }
                return false;
            }

            function mousewheelHandler(e) {
                var delta = getDeltaFromEvent(e);

                var deltaX = delta[0];
                var deltaY = delta[1];

                if (shouldBeConsumedByTextarea(deltaX, deltaY)) {
                    return;
                }

                shouldPrevent = false;
                if (!i.settings.useBothWheelAxes) {
                    // deltaX will only be used for horizontal scrolling and deltaY will
                    // only be used for vertical scrolling - this is the default
                    updateScroll(element, 'top', element.scrollTop - (deltaY * i.settings.wheelSpeed));
                    updateScroll(element, 'left', element.scrollLeft + (deltaX * i.settings.wheelSpeed));
                } else if (i.scrollbarYActive && !i.scrollbarXActive) {
                    // only vertical scrollbar is active and useBothWheelAxes option is
                    // active, so let's scroll vertical bar using both mouse wheel axes
                    if (deltaY) {
                        updateScroll(element, 'top', element.scrollTop - (deltaY * i.settings.wheelSpeed));
                    } else {
                        updateScroll(element, 'top', element.scrollTop + (deltaX * i.settings.wheelSpeed));
                    }
                    shouldPrevent = true;
                } else if (i.scrollbarXActive && !i.scrollbarYActive) {
                    // useBothWheelAxes and only horizontal bar is active, so use both
                    // wheel axes for horizontal bar
                    if (deltaX) {
                        updateScroll(element, 'left', element.scrollLeft + (deltaX * i.settings.wheelSpeed));
                    } else {
                        updateScroll(element, 'left', element.scrollLeft - (deltaY * i.settings.wheelSpeed));
                    }
                    shouldPrevent = true;
                }

                updateGeometry(element);

                shouldPrevent = (shouldPrevent || shouldPreventDefault(deltaX, deltaY));
                if (shouldPrevent) {
                    e.stopPropagation();
                    e.preventDefault();
                }
            }

            if (typeof window.onwheel !== "undefined") {
                i.event.bind(element, 'wheel', mousewheelHandler);
            } else if (typeof window.onmousewheel !== "undefined") {
                i.event.bind(element, 'mousewheel', mousewheelHandler);
            }
        }

        module.exports = function(element) {
            var i = instances.get(element);
            bindMouseWheelHandler(element, i);
        };

    }, {
        "../instances": 18,
        "../update-geometry": 19,
        "../update-scroll": 20
    }],
    14: [function(require, module, exports) {
        'use strict';

        var instances = require('../instances'),
            updateGeometry = require('../update-geometry');

        function bindNativeScrollHandler(element, i) {
            i.event.bind(element, 'scroll', function() {
                updateGeometry(element);
            });
        }

        module.exports = function(element) {
            var i = instances.get(element);
            bindNativeScrollHandler(element, i);
        };

    }, {
        "../instances": 18,
        "../update-geometry": 19
    }],
    15: [function(require, module, exports) {
        'use strict';

        var h = require('../../lib/helper'),
            instances = require('../instances'),
            updateGeometry = require('../update-geometry'),
            updateScroll = require('../update-scroll');

        function bindSelectionHandler(element, i) {
            function getRangeNode() {
                var selection = window.getSelection ? window.getSelection() :
                    document.getSelection ? document.getSelection() : '';
                if (selection.toString().length === 0) {
                    return null;
                } else {
                    return selection.getRangeAt(0).commonAncestorContainer;
                }
            }

            var scrollingLoop = null;
            var scrollDiff = {
                top: 0,
                left: 0
            };

            function startScrolling() {
                if (!scrollingLoop) {
                    scrollingLoop = setInterval(function() {
                        if (!instances.get(element)) {
                            clearInterval(scrollingLoop);
                            return;
                        }

                        updateScroll(element, 'top', element.scrollTop + scrollDiff.top);
                        updateScroll(element, 'left', element.scrollLeft + scrollDiff.left);
                        updateGeometry(element);
                    }, 50); // every .1 sec
                }
            }

            function stopScrolling() {
                if (scrollingLoop) {
                    clearInterval(scrollingLoop);
                    scrollingLoop = null;
                }
                h.stopScrolling(element);
            }

            var isSelected = false;
            i.event.bind(i.ownerDocument, 'selectionchange', function() {
                if (element.contains(getRangeNode())) {
                    isSelected = true;
                } else {
                    isSelected = false;
                    stopScrolling();
                }
            });
            i.event.bind(window, 'mouseup', function() {
                if (isSelected) {
                    isSelected = false;
                    stopScrolling();
                }
            });

            i.event.bind(window, 'mousemove', function(e) {
                if (isSelected) {
                    var mousePosition = {
                        x: e.pageX,
                        y: e.pageY
                    };
                    var containerGeometry = {
                        left: element.offsetLeft,
                        right: element.offsetLeft + element.offsetWidth,
                        top: element.offsetTop,
                        bottom: element.offsetTop + element.offsetHeight
                    };

                    if (mousePosition.x < containerGeometry.left + 3) {
                        scrollDiff.left = -5;
                        h.startScrolling(element, 'x');
                    } else if (mousePosition.x > containerGeometry.right - 3) {
                        scrollDiff.left = 5;
                        h.startScrolling(element, 'x');
                    } else {
                        scrollDiff.left = 0;
                    }

                    if (mousePosition.y < containerGeometry.top + 3) {
                        if (containerGeometry.top + 3 - mousePosition.y < 5) {
                            scrollDiff.top = -5;
                        } else {
                            scrollDiff.top = -20;
                        }
                        h.startScrolling(element, 'y');
                    } else if (mousePosition.y > containerGeometry.bottom - 3) {
                        if (mousePosition.y - containerGeometry.bottom + 3 < 5) {
                            scrollDiff.top = 5;
                        } else {
                            scrollDiff.top = 20;
                        }
                        h.startScrolling(element, 'y');
                    } else {
                        scrollDiff.top = 0;
                    }

                    if (scrollDiff.top === 0 && scrollDiff.left === 0) {
                        stopScrolling();
                    } else {
                        startScrolling();
                    }
                }
            });
        }

        module.exports = function(element) {
            var i = instances.get(element);
            bindSelectionHandler(element, i);
        };

    }, {
        "../../lib/helper": 6,
        "../instances": 18,
        "../update-geometry": 19,
        "../update-scroll": 20
    }],
    16: [function(require, module, exports) {
        'use strict';

        var instances = require('../instances'),
            updateGeometry = require('../update-geometry'),
            updateScroll = require('../update-scroll');

        function bindTouchHandler(element, i, supportsTouch, supportsIePointer) {
            function shouldPreventDefault(deltaX, deltaY) {
                var scrollTop = element.scrollTop;
                var scrollLeft = element.scrollLeft;
                var magnitudeX = Math.abs(deltaX);
                var magnitudeY = Math.abs(deltaY);

                if (magnitudeY > magnitudeX) {
                    // user is perhaps trying to swipe up/down the page

                    if (((deltaY < 0) && (scrollTop === i.contentHeight - i.containerHeight)) ||
                        ((deltaY > 0) && (scrollTop === 0))) {
                        return !i.settings.swipePropagation;
                    }
                } else if (magnitudeX > magnitudeY) {
                    // user is perhaps trying to swipe left/right across the page

                    if (((deltaX < 0) && (scrollLeft === i.contentWidth - i.containerWidth)) ||
                        ((deltaX > 0) && (scrollLeft === 0))) {
                        return !i.settings.swipePropagation;
                    }
                }

                return true;
            }

            function applyTouchMove(differenceX, differenceY) {
                updateScroll(element, 'top', element.scrollTop - differenceY);
                updateScroll(element, 'left', element.scrollLeft - differenceX);

                updateGeometry(element);
            }

            var startOffset = {};
            var startTime = 0;
            var speed = {};
            var easingLoop = null;
            var inGlobalTouch = false;
            var inLocalTouch = false;

            function globalTouchStart() {
                inGlobalTouch = true;
            }

            function globalTouchEnd() {
                inGlobalTouch = false;
            }

            function getTouch(e) {
                if (e.targetTouches) {
                    return e.targetTouches[0];
                } else {
                    // Maybe IE pointer
                    return e;
                }
            }

            function shouldHandle(e) {
                if (e.targetTouches && e.targetTouches.length === 1) {
                    return true;
                }
                if (e.pointerType && e.pointerType !== 'mouse' && e.pointerType !== e.MSPOINTER_TYPE_MOUSE) {
                    return true;
                }
                return false;
            }

            function touchStart(e) {
                if (shouldHandle(e)) {
                    inLocalTouch = true;

                    var touch = getTouch(e);

                    startOffset.pageX = touch.pageX;
                    startOffset.pageY = touch.pageY;

                    startTime = (new Date()).getTime();

                    if (easingLoop !== null) {
                        clearInterval(easingLoop);
                    }

                    e.stopPropagation();
                }
            }

            function touchMove(e) {
                if (!inGlobalTouch && inLocalTouch && shouldHandle(e)) {
                    var touch = getTouch(e);

                    var currentOffset = {
                        pageX: touch.pageX,
                        pageY: touch.pageY
                    };

                    var differenceX = currentOffset.pageX - startOffset.pageX;
                    var differenceY = currentOffset.pageY - startOffset.pageY;

                    applyTouchMove(differenceX, differenceY);
                    startOffset = currentOffset;

                    var currentTime = (new Date()).getTime();

                    var timeGap = currentTime - startTime;
                    if (timeGap > 0) {
                        speed.x = differenceX / timeGap;
                        speed.y = differenceY / timeGap;
                        startTime = currentTime;
                    }

                    if (shouldPreventDefault(differenceX, differenceY)) {
                        e.stopPropagation();
                        e.preventDefault();
                    }
                }
            }

            function touchEnd() {
                if (!inGlobalTouch && inLocalTouch) {
                    inLocalTouch = false;

                    clearInterval(easingLoop);
                    easingLoop = setInterval(function() {
                        if (!instances.get(element)) {
                            clearInterval(easingLoop);
                            return;
                        }

                        if (Math.abs(speed.x) < 0.01 && Math.abs(speed.y) < 0.01) {
                            clearInterval(easingLoop);
                            return;
                        }

                        applyTouchMove(speed.x * 30, speed.y * 30);

                        speed.x *= 0.8;
                        speed.y *= 0.8;
                    }, 10);
                }
            }

            if (supportsTouch) {
                i.event.bind(window, 'touchstart', globalTouchStart);
                i.event.bind(window, 'touchend', globalTouchEnd);
                i.event.bind(element, 'touchstart', touchStart);
                i.event.bind(element, 'touchmove', touchMove);
                i.event.bind(element, 'touchend', touchEnd);
            }

            if (supportsIePointer) {
                if (window.PointerEvent) {
                    i.event.bind(window, 'pointerdown', globalTouchStart);
                    i.event.bind(window, 'pointerup', globalTouchEnd);
                    i.event.bind(element, 'pointerdown', touchStart);
                    i.event.bind(element, 'pointermove', touchMove);
                    i.event.bind(element, 'pointerup', touchEnd);
                } else if (window.MSPointerEvent) {
                    i.event.bind(window, 'MSPointerDown', globalTouchStart);
                    i.event.bind(window, 'MSPointerUp', globalTouchEnd);
                    i.event.bind(element, 'MSPointerDown', touchStart);
                    i.event.bind(element, 'MSPointerMove', touchMove);
                    i.event.bind(element, 'MSPointerUp', touchEnd);
                }
            }
        }

        module.exports = function(element, supportsTouch, supportsIePointer) {
            var i = instances.get(element);
            bindTouchHandler(element, i, supportsTouch, supportsIePointer);
        };

    }, {
        "../instances": 18,
        "../update-geometry": 19,
        "../update-scroll": 20
    }],
    17: [function(require, module, exports) {
        'use strict';

        var cls = require('../lib/class'),
            h = require('../lib/helper'),
            instances = require('./instances'),
            updateGeometry = require('./update-geometry');

        // Handlers
        var clickRailHandler = require('./handler/click-rail'),
            dragScrollbarHandler = require('./handler/drag-scrollbar'),
            keyboardHandler = require('./handler/keyboard'),
            mouseWheelHandler = require('./handler/mouse-wheel'),
            nativeScrollHandler = require('./handler/native-scroll'),
            selectionHandler = require('./handler/selection'),
            touchHandler = require('./handler/touch');

        module.exports = function(element, userSettings) {
            userSettings = typeof userSettings === 'object' ? userSettings : {};

            cls.add(element, 'ps-container');

            // Create a plugin instance.
            var i = instances.add(element);

            i.settings = h.extend(i.settings, userSettings);
            cls.add(element, 'ps-theme-' + i.settings.theme);

            clickRailHandler(element);
            dragScrollbarHandler(element);
            mouseWheelHandler(element);
            nativeScrollHandler(element);

            if (i.settings.useSelectionScroll) {
                selectionHandler(element);
            }

            if (h.env.supportsTouch || h.env.supportsIePointer) {
                touchHandler(element, h.env.supportsTouch, h.env.supportsIePointer);
            }
            if (i.settings.useKeyboard) {
                keyboardHandler(element);
            }

            updateGeometry(element);
        };

    }, {
        "../lib/class": 2,
        "../lib/helper": 6,
        "./handler/click-rail": 10,
        "./handler/drag-scrollbar": 11,
        "./handler/keyboard": 12,
        "./handler/mouse-wheel": 13,
        "./handler/native-scroll": 14,
        "./handler/selection": 15,
        "./handler/touch": 16,
        "./instances": 18,
        "./update-geometry": 19
    }],
    18: [function(require, module, exports) {
        'use strict';

        var cls = require('../lib/class'),
            d = require('../lib/dom'),
            defaultSettings = require('./default-setting'),
            EventManager = require('../lib/event-manager'),
            guid = require('../lib/guid'),
            h = require('../lib/helper');

        var instances = {};

        function Instance(element) {
            var i = this;

            i.settings = h.clone(defaultSettings);
            i.containerWidth = null;
            i.containerHeight = null;
            i.contentWidth = null;
            i.contentHeight = null;

            i.isRtl = d.css(element, 'direction') === "rtl";
            i.isNegativeScroll = (function() {
                var originalScrollLeft = element.scrollLeft;
                var result = null;
                element.scrollLeft = -1;
                result = element.scrollLeft < 0;
                element.scrollLeft = originalScrollLeft;
                return result;
            })();
            i.negativeScrollAdjustment = i.isNegativeScroll ? element.scrollWidth - element.clientWidth : 0;
            i.event = new EventManager();
            i.ownerDocument = element.ownerDocument || document;

            function focus() {
                cls.add(element, 'ps-focus');
            }

            function blur() {
                cls.remove(element, 'ps-focus');
            }

            i.scrollbarXRail = d.appendTo(d.e('div', 'ps-scrollbar-x-rail'), element);
            i.scrollbarX = d.appendTo(d.e('div', 'ps-scrollbar-x'), i.scrollbarXRail);
            i.scrollbarX.setAttribute('tabindex', 0);
            i.event.bind(i.scrollbarX, 'focus', focus);
            i.event.bind(i.scrollbarX, 'blur', blur);
            i.scrollbarXActive = null;
            i.scrollbarXWidth = null;
            i.scrollbarXLeft = null;
            i.scrollbarXBottom = h.toInt(d.css(i.scrollbarXRail, 'bottom'));
            i.isScrollbarXUsingBottom = i.scrollbarXBottom === i.scrollbarXBottom; // !isNaN
            i.scrollbarXTop = i.isScrollbarXUsingBottom ? null : h.toInt(d.css(i.scrollbarXRail, 'top'));
            i.railBorderXWidth = h.toInt(d.css(i.scrollbarXRail, 'borderLeftWidth')) + h.toInt(d.css(i.scrollbarXRail, 'borderRightWidth'));
            // Set rail to display:block to calculate margins
            d.css(i.scrollbarXRail, 'display', 'block');
            i.railXMarginWidth = h.toInt(d.css(i.scrollbarXRail, 'marginLeft')) + h.toInt(d.css(i.scrollbarXRail, 'marginRight'));
            d.css(i.scrollbarXRail, 'display', '');
            i.railXWidth = null;
            i.railXRatio = null;

            i.scrollbarYRail = d.appendTo(d.e('div', 'ps-scrollbar-y-rail'), element);
            i.scrollbarY = d.appendTo(d.e('div', 'ps-scrollbar-y'), i.scrollbarYRail);
            i.scrollbarY.setAttribute('tabindex', 0);
            i.event.bind(i.scrollbarY, 'focus', focus);
            i.event.bind(i.scrollbarY, 'blur', blur);
            i.scrollbarYActive = null;
            i.scrollbarYHeight = null;
            i.scrollbarYTop = null;
            i.scrollbarYRight = h.toInt(d.css(i.scrollbarYRail, 'right'));
            i.isScrollbarYUsingRight = i.scrollbarYRight === i.scrollbarYRight; // !isNaN
            i.scrollbarYLeft = i.isScrollbarYUsingRight ? null : h.toInt(d.css(i.scrollbarYRail, 'left'));
            i.scrollbarYOuterWidth = i.isRtl ? h.outerWidth(i.scrollbarY) : null;
            i.railBorderYWidth = h.toInt(d.css(i.scrollbarYRail, 'borderTopWidth')) + h.toInt(d.css(i.scrollbarYRail, 'borderBottomWidth'));
            d.css(i.scrollbarYRail, 'display', 'block');
            i.railYMarginHeight = h.toInt(d.css(i.scrollbarYRail, 'marginTop')) + h.toInt(d.css(i.scrollbarYRail, 'marginBottom'));
            d.css(i.scrollbarYRail, 'display', '');
            i.railYHeight = null;
            i.railYRatio = null;
        }

        function getId(element) {
            if (typeof element.dataset === 'undefined') {
                return element.getAttribute('data-ps-id');
            } else {
                return element.dataset.psId;
            }
        }

        function setId(element, id) {
            if (typeof element.dataset === 'undefined') {
                element.setAttribute('data-ps-id', id);
            } else {
                element.dataset.psId = id;
            }
        }

        function removeId(element) {
            if (typeof element.dataset === 'undefined') {
                element.removeAttribute('data-ps-id');
            } else {
                delete element.dataset.psId;
            }
        }

        exports.add = function(element) {
            var newId = guid();
            setId(element, newId);
            instances[newId] = new Instance(element);
            return instances[newId];
        };

        exports.remove = function(element) {
            delete instances[getId(element)];
            removeId(element);
        };

        exports.get = function(element) {
            return instances[getId(element)];
        };

    }, {
        "../lib/class": 2,
        "../lib/dom": 3,
        "../lib/event-manager": 4,
        "../lib/guid": 5,
        "../lib/helper": 6,
        "./default-setting": 8
    }],
    19: [function(require, module, exports) {
        'use strict';

        var cls = require('../lib/class'),
            d = require('../lib/dom'),
            h = require('../lib/helper'),
            instances = require('./instances'),
            updateScroll = require('./update-scroll');

        function getThumbSize(i, thumbSize) {
            if (i.settings.minScrollbarLength) {
                thumbSize = Math.max(thumbSize, i.settings.minScrollbarLength);
            }
            if (i.settings.maxScrollbarLength) {
                thumbSize = Math.min(thumbSize, i.settings.maxScrollbarLength);
            }
            return thumbSize;
        }

        function updateCss(element, i) {
            var xRailOffset = {
                width: i.railXWidth
            };
            if (i.isRtl) {
                xRailOffset.left = i.negativeScrollAdjustment + element.scrollLeft + i.containerWidth - i.contentWidth;
            } else {
                xRailOffset.left = element.scrollLeft;
            }
            if (i.isScrollbarXUsingBottom) {
                xRailOffset.bottom = i.scrollbarXBottom - element.scrollTop;
            } else {
                xRailOffset.top = i.scrollbarXTop + element.scrollTop;
            }
            d.css(i.scrollbarXRail, xRailOffset);

            var yRailOffset = {
                top: element.scrollTop,
                height: i.railYHeight
            };
            if (i.isScrollbarYUsingRight) {
                if (i.isRtl) {
                    yRailOffset.right = i.contentWidth - (i.negativeScrollAdjustment + element.scrollLeft) - i.scrollbarYRight - i.scrollbarYOuterWidth;
                } else {
                    yRailOffset.right = i.scrollbarYRight - element.scrollLeft;
                }
            } else {
                if (i.isRtl) {
                    yRailOffset.left = i.negativeScrollAdjustment + element.scrollLeft + i.containerWidth * 2 - i.contentWidth - i.scrollbarYLeft - i.scrollbarYOuterWidth;
                } else {
                    yRailOffset.left = i.scrollbarYLeft + element.scrollLeft;
                }
            }
            d.css(i.scrollbarYRail, yRailOffset);

            d.css(i.scrollbarX, {
                left: i.scrollbarXLeft,
                width: i.scrollbarXWidth - i.railBorderXWidth
            });
            d.css(i.scrollbarY, {
                top: i.scrollbarYTop,
                height: i.scrollbarYHeight - i.railBorderYWidth
            });
        }

        module.exports = function(element) {
            var i = instances.get(element);

            i.containerWidth = element.clientWidth;
            i.containerHeight = element.clientHeight;
            i.contentWidth = element.scrollWidth;
            i.contentHeight = element.scrollHeight;

            var existingRails;
            if (!element.contains(i.scrollbarXRail)) {
                existingRails = d.queryChildren(element, '.ps-scrollbar-x-rail');
                if (existingRails.length > 0) {
                    existingRails.forEach(function(rail) {
                        d.remove(rail);
                    });
                }
                d.appendTo(i.scrollbarXRail, element);
            }
            if (!element.contains(i.scrollbarYRail)) {
                existingRails = d.queryChildren(element, '.ps-scrollbar-y-rail');
                if (existingRails.length > 0) {
                    existingRails.forEach(function(rail) {
                        d.remove(rail);
                    });
                }
                d.appendTo(i.scrollbarYRail, element);
            }

            if (!i.settings.suppressScrollX && i.containerWidth + i.settings.scrollXMarginOffset < i.contentWidth) {
                i.scrollbarXActive = true;
                i.railXWidth = i.containerWidth - i.railXMarginWidth;
                i.railXRatio = i.containerWidth / i.railXWidth;
                i.scrollbarXWidth = getThumbSize(i, h.toInt(i.railXWidth * i.containerWidth / i.contentWidth));
                i.scrollbarXLeft = h.toInt((i.negativeScrollAdjustment + element.scrollLeft) * (i.railXWidth - i.scrollbarXWidth) / (i.contentWidth - i.containerWidth));
            } else {
                i.scrollbarXActive = false;
            }

            if (!i.settings.suppressScrollY && i.containerHeight + i.settings.scrollYMarginOffset < i.contentHeight) {
                i.scrollbarYActive = true;
                i.railYHeight = i.containerHeight - i.railYMarginHeight;
                i.railYRatio = i.containerHeight / i.railYHeight;
                i.scrollbarYHeight = getThumbSize(i, h.toInt(i.railYHeight * i.containerHeight / i.contentHeight));
                i.scrollbarYTop = h.toInt(element.scrollTop * (i.railYHeight - i.scrollbarYHeight) / (i.contentHeight - i.containerHeight));
            } else {
                i.scrollbarYActive = false;
            }

            if (i.scrollbarXLeft >= i.railXWidth - i.scrollbarXWidth) {
                i.scrollbarXLeft = i.railXWidth - i.scrollbarXWidth;
            }
            if (i.scrollbarYTop >= i.railYHeight - i.scrollbarYHeight) {
                i.scrollbarYTop = i.railYHeight - i.scrollbarYHeight;
            }

            updateCss(element, i);

            if (i.scrollbarXActive) {
                cls.add(element, 'ps-active-x');
            } else {
                cls.remove(element, 'ps-active-x');
                i.scrollbarXWidth = 0;
                i.scrollbarXLeft = 0;
                updateScroll(element, 'left', 0);
            }
            if (i.scrollbarYActive) {
                cls.add(element, 'ps-active-y');
            } else {
                cls.remove(element, 'ps-active-y');
                i.scrollbarYHeight = 0;
                i.scrollbarYTop = 0;
                updateScroll(element, 'top', 0);
            }
        };

    }, {
        "../lib/class": 2,
        "../lib/dom": 3,
        "../lib/helper": 6,
        "./instances": 18,
        "./update-scroll": 20
    }],
    20: [function(require, module, exports) {
        'use strict';

        var instances = require('./instances');

        var upEvent = document.createEvent('Event'),
            downEvent = document.createEvent('Event'),
            leftEvent = document.createEvent('Event'),
            rightEvent = document.createEvent('Event'),
            yEvent = document.createEvent('Event'),
            xEvent = document.createEvent('Event'),
            xStartEvent = document.createEvent('Event'),
            xEndEvent = document.createEvent('Event'),
            yStartEvent = document.createEvent('Event'),
            yEndEvent = document.createEvent('Event'),
            lastTop, lastLeft;

        upEvent.initEvent('ps-scroll-up', true, true);
        downEvent.initEvent('ps-scroll-down', true, true);
        leftEvent.initEvent('ps-scroll-left', true, true);
        rightEvent.initEvent('ps-scroll-right', true, true);
        yEvent.initEvent('ps-scroll-y', true, true);
        xEvent.initEvent('ps-scroll-x', true, true);
        xStartEvent.initEvent('ps-x-reach-start', true, true);
        xEndEvent.initEvent('ps-x-reach-end', true, true);
        yStartEvent.initEvent('ps-y-reach-start', true, true);
        yEndEvent.initEvent('ps-y-reach-end', true, true);

        module.exports = function(element, axis, value) {
            if (typeof element === 'undefined') {
                throw 'You must provide an element to the update-scroll function';
            }

            if (typeof axis === 'undefined') {
                throw 'You must provide an axis to the update-scroll function';
            }

            if (typeof value === 'undefined') {
                throw 'You must provide a value to the update-scroll function';
            }

            if (axis === 'top' && value <= 0) {
                element.scrollTop = value = 0; // don't allow negative scroll
                element.dispatchEvent(yStartEvent);
            }

            if (axis === 'left' && value <= 0) {
                element.scrollLeft = value = 0; // don't allow negative scroll
                element.dispatchEvent(xStartEvent);
            }

            var i = instances.get(element);

            if (axis === 'top' && value >= i.contentHeight - i.containerHeight) {
                element.scrollTop = value = i.contentHeight - i.containerHeight; // don't allow scroll past container
                element.dispatchEvent(yEndEvent);
            }

            if (axis === 'left' && value >= i.contentWidth - i.containerWidth) {
                element.scrollLeft = value = i.contentWidth - i.containerWidth; // don't allow scroll past container
                element.dispatchEvent(xEndEvent);
            }

            if (!lastTop) {
                lastTop = element.scrollTop;
            }

            if (!lastLeft) {
                lastLeft = element.scrollLeft;
            }

            if (axis === 'top' && value < lastTop) {
                element.dispatchEvent(upEvent);
            }

            if (axis === 'top' && value > lastTop) {
                element.dispatchEvent(downEvent);
            }

            if (axis === 'left' && value < lastLeft) {
                element.dispatchEvent(leftEvent);
            }

            if (axis === 'left' && value > lastLeft) {
                element.dispatchEvent(rightEvent);
            }

            if (axis === 'top') {
                element.scrollTop = lastTop = value;
                element.dispatchEvent(yEvent);
            }

            if (axis === 'left') {
                element.scrollLeft = lastLeft = value;
                element.dispatchEvent(xEvent);
            }

        };

    }, {
        "./instances": 18
    }],
    21: [function(require, module, exports) {
        'use strict';

        var d = require('../lib/dom'),
            h = require('../lib/helper'),
            instances = require('./instances'),
            updateGeometry = require('./update-geometry'),
            updateScroll = require('./update-scroll');

        module.exports = function(element) {
            var i = instances.get(element);

            if (!i) {
                return;
            }

            // Recalcuate negative scrollLeft adjustment
            i.negativeScrollAdjustment = i.isNegativeScroll ? element.scrollWidth - element.clientWidth : 0;

            // Recalculate rail margins
            d.css(i.scrollbarXRail, 'display', 'block');
            d.css(i.scrollbarYRail, 'display', 'block');
            i.railXMarginWidth = h.toInt(d.css(i.scrollbarXRail, 'marginLeft')) + h.toInt(d.css(i.scrollbarXRail, 'marginRight'));
            i.railYMarginHeight = h.toInt(d.css(i.scrollbarYRail, 'marginTop')) + h.toInt(d.css(i.scrollbarYRail, 'marginBottom'));

            // Hide scrollbars not to affect scrollWidth and scrollHeight
            d.css(i.scrollbarXRail, 'display', 'none');
            d.css(i.scrollbarYRail, 'display', 'none');

            updateGeometry(element);

            // Update top/left scroll to trigger events
            updateScroll(element, 'top', element.scrollTop);
            updateScroll(element, 'left', element.scrollLeft);

            d.css(i.scrollbarXRail, 'display', '');
            d.css(i.scrollbarYRail, 'display', '');
        };

    }, {
        "../lib/dom": 3,
        "../lib/helper": 6,
        "./instances": 18,
        "./update-geometry": 19,
        "./update-scroll": 20
    }]
}, {}, [1]);
/* jQuery elevateZoom 3.0.8 - Demo's and documentation: - www.elevateweb.co.uk/image-zoom - Copyright (c) 2013 Andrew Eades - www.elevateweb.co.uk - Dual licensed under the LGPL licenses. - http://en.wikipedia.org/wiki/MIT_License - http://en.wikipedia.org/wiki/GNU_General_Public_License */
"function" !== typeof Object.create && (Object.create = function(d) {
    function h() {}
    h.prototype = d;
    return new h
});
(function(d, h, l, m) {
    var k = {
        init: function(b, a) {
            var c = this;
            c.elem = a;
            c.$elem = d(a);
            c.imageSrc = c.$elem.data("zoom-image") ? c.$elem.data("zoom-image") : c.$elem.attr("src");
            c.options = d.extend({}, d.fn.elevateZoom.options, b);
            c.options.tint && (c.options.lensColour = "none", c.options.lensOpacity = "1");
            "inner" == c.options.zoomType && (c.options.showLens = !1);
            c.$elem.parent().removeAttr("title").removeAttr("alt");
            c.zoomImage = c.imageSrc;
            c.refresh(1);
            d("#" + c.options.gallery + " a").click(function(a) {
                c.options.galleryActiveClass &&
                    (d("#" + c.options.gallery + " a").removeClass(c.options.galleryActiveClass), d(this).addClass(c.options.galleryActiveClass));
                a.preventDefault();
                d(this).data("zoom-image") ? c.zoomImagePre = d(this).data("zoom-image") : c.zoomImagePre = d(this).data("image");
                c.swaptheimage(d(this).data("image"), c.zoomImagePre);
                return !1
            })
        },
        refresh: function(b) {
            var a = this;
            setTimeout(function() {
                a.fetch(a.imageSrc)
            }, b || a.options.refresh)
        },
        fetch: function(b) {
            var a = this,
                c = new Image;
            c.onload = function() {
                a.largeWidth = c.width;
                a.largeHeight =
                    c.height;
                a.startZoom();
                a.currentImage = a.imageSrc;
                a.options.onZoomedImageLoaded(a.$elem)
            };
            c.src = b
        },
        startZoom: function() {
            var b = this;
            b.nzWidth = b.$elem.width();
            b.nzHeight = b.$elem.height();
            b.isWindowActive = !1;
            b.isLensActive = !1;
            b.isTintActive = !1;
            b.overWindow = !1;
            b.options.imageCrossfade && (b.zoomWrap = b.$elem.wrap('<div style="height:' + b.nzHeight + "px;width:" + b.nzWidth + 'px;" class="zoomWrapper" />'), b.$elem.css("position", "absolute"));
            b.zoomLock = 1;
            b.scrollingLock = !1;
            b.changeBgSize = !1;
            b.currentZoomLevel = b.options.zoomLevel;
            b.nzOffset = b.$elem.offset();
            b.widthRatio = b.largeWidth / b.currentZoomLevel / b.nzWidth;
            b.heightRatio = b.largeHeight / b.currentZoomLevel / b.nzHeight;
            "window" == b.options.zoomType && (b.zoomWindowStyle = "overflow: hidden;background-position: 0px 0px;text-align:center;background-color: " + String(b.options.zoomWindowBgColour) + ";width: " + String(b.options.zoomWindowWidth) + "px;height: " + String(b.options.zoomWindowHeight) + "px;float: left;background-size: " + b.largeWidth / b.currentZoomLevel + "px " + b.largeHeight / b.currentZoomLevel +
                "px;display: none;z-index:100;border: " + String(b.options.borderSize) + "px solid " + b.options.borderColour + ";background-repeat: no-repeat;position: absolute;");
            if ("inner" == b.options.zoomType) {
                var a = b.$elem.css("border-left-width");
                b.zoomWindowStyle = "overflow: hidden;margin-left: " + String(a) + ";margin-top: " + String(a) + ";background-position: 0px 0px;width: " + String(b.nzWidth) + "px;height: " + String(b.nzHeight) + "px;float: left;display: none;cursor:" + b.options.cursor + ";px solid " + b.options.borderColour + ";background-repeat: no-repeat;position: absolute;"
            }
            "window" ==
            b.options.zoomType && (lensHeight = b.nzHeight < b.options.zoomWindowWidth / b.widthRatio ? b.nzHeight : String(b.options.zoomWindowHeight / b.heightRatio), lensWidth = b.largeWidth < b.options.zoomWindowWidth ? b.nzWidth : b.options.zoomWindowWidth / b.widthRatio, b.lensStyle = "background-position: 0px 0px;width: " + String(b.options.zoomWindowWidth / b.widthRatio) + "px;height: " + String(b.options.zoomWindowHeight / b.heightRatio) + "px;float: right;display: none;overflow: hidden;z-index: 999;-webkit-transform: translateZ(0);opacity:" +
                b.options.lensOpacity + ";filter: alpha(opacity = " + 100 * b.options.lensOpacity + "); zoom:1;width:" + lensWidth + "px;height:" + lensHeight + "px;background-color:" + b.options.lensColour + ";cursor:" + b.options.cursor + ";border: " + b.options.lensBorderSize + "px solid " + b.options.lensBorderColour + ";background-repeat: no-repeat;position: absolute;");
            b.tintStyle = "display: block;position: absolute;background-color: " + b.options.tintColour + ";filter:alpha(opacity=0);opacity: 0;width: " + b.nzWidth + "px;height: " + b.nzHeight + "px;";
            b.lensRound = "";
            "lens" == b.options.zoomType && (b.lensStyle = "background-position: 0px 0px;float: left;display: none;border: " + String(b.options.borderSize) + "px solid " + b.options.borderColour + ";width:" + String(b.options.lensSize) + "px;height:" + String(b.options.lensSize) + "px;background-repeat: no-repeat;position: absolute;");
            "round" == b.options.lensShape && (b.lensRound = "border-top-left-radius: " + String(b.options.lensSize / 2 + b.options.borderSize) + "px;border-top-right-radius: " + String(b.options.lensSize / 2 + b.options.borderSize) +
                "px;border-bottom-left-radius: " + String(b.options.lensSize / 2 + b.options.borderSize) + "px;border-bottom-right-radius: " + String(b.options.lensSize / 2 + b.options.borderSize) + "px;");
            b.zoomContainer = d('<div class="zoomContainer" style="-webkit-transform: translateZ(0);position:absolute;left:' + b.nzOffset.left + "px;top:" + b.nzOffset.top + "px;height:" + b.nzHeight + "px;width:" + b.nzWidth + 'px;"></div>');
            d("body").append(b.zoomContainer);
            b.options.containLensZoom && "lens" == b.options.zoomType && b.zoomContainer.css("overflow",
                "hidden");
            "inner" != b.options.zoomType && (b.zoomLens = d("<div class='zoomLens' style='" + b.lensStyle + b.lensRound + "'>&nbsp;</div>").appendTo(b.zoomContainer).click(function() {
                b.$elem.trigger("click")
            }), b.options.tint && (b.tintContainer = d("<div/>").addClass("tintContainer"), b.zoomTint = d("<div class='zoomTint' style='" + b.tintStyle + "'></div>"), b.zoomLens.wrap(b.tintContainer), b.zoomTintcss = b.zoomLens.after(b.zoomTint), b.zoomTintImage = d('<img style="position: absolute; left: 0px; top: 0px; max-width: none; width: ' +
                b.nzWidth + "px; height: " + b.nzHeight + 'px;" src="' + b.imageSrc + '">').appendTo(b.zoomLens).click(function() {
                b.$elem.trigger("click")
            })));
            isNaN(b.options.zoomWindowPosition) ? b.zoomWindow = d("<div style='z-index:999;left:" + b.windowOffsetLeft + "px;top:" + b.windowOffsetTop + "px;" + b.zoomWindowStyle + "' class='zoomWindow'>&nbsp;</div>").appendTo("body").click(function() {
                b.$elem.trigger("click")
            }) : b.zoomWindow = d("<div style='z-index:999;left:" + b.windowOffsetLeft + "px;top:" + b.windowOffsetTop + "px;" + b.zoomWindowStyle +
                "' class='zoomWindow'>&nbsp;</div>").appendTo(b.zoomContainer).click(function() {
                b.$elem.trigger("click")
            });
            b.zoomWindowContainer = d("<div/>").addClass("zoomWindowContainer").css("width", b.options.zoomWindowWidth);
            b.zoomWindow.wrap(b.zoomWindowContainer);
            "lens" == b.options.zoomType && b.zoomLens.css({
                backgroundImage: "url('" + b.imageSrc + "')"
            });
            "window" == b.options.zoomType && b.zoomWindow.css({
                backgroundImage: "url('" + b.imageSrc + "')"
            });
            "inner" == b.options.zoomType && b.zoomWindow.css({
                backgroundImage: "url('" + b.imageSrc +
                    "')"
            });
            b.$elem.bind("touchmove", function(a) {
                a.preventDefault();
                b.setPosition(a.originalEvent.touches[0] || a.originalEvent.changedTouches[0])
            });
            b.zoomContainer.bind("touchmove", function(a) {
                "inner" == b.options.zoomType && b.showHideWindow("show");
                a.preventDefault();
                b.setPosition(a.originalEvent.touches[0] || a.originalEvent.changedTouches[0])
            });
            b.zoomContainer.bind("touchend", function(a) {
                b.showHideWindow("hide");
                b.options.showLens && b.showHideLens("hide");
                b.options.tint && "inner" != b.options.zoomType && b.showHideTint("hide")
            });
            b.$elem.bind("touchend", function(a) {
                b.showHideWindow("hide");
                b.options.showLens && b.showHideLens("hide");
                b.options.tint && "inner" != b.options.zoomType && b.showHideTint("hide")
            });
            b.options.showLens && (b.zoomLens.bind("touchmove", function(a) {
                a.preventDefault();
                b.setPosition(a.originalEvent.touches[0] || a.originalEvent.changedTouches[0])
            }), b.zoomLens.bind("touchend", function(a) {
                b.showHideWindow("hide");
                b.options.showLens && b.showHideLens("hide");
                b.options.tint && "inner" != b.options.zoomType && b.showHideTint("hide")
            }));
            b.$elem.bind("mousemove", function(a) {
                !1 == b.overWindow && b.setElements("show");
                if (b.lastX !== a.clientX || b.lastY !== a.clientY) b.setPosition(a), b.currentLoc = a;
                b.lastX = a.clientX;
                b.lastY = a.clientY
            });
            b.zoomContainer.bind("mousemove", function(a) {
                !1 == b.overWindow && b.setElements("show");
                if (b.lastX !== a.clientX || b.lastY !== a.clientY) b.setPosition(a), b.currentLoc = a;
                b.lastX = a.clientX;
                b.lastY = a.clientY
            });
            "inner" != b.options.zoomType && b.zoomLens.bind("mousemove", function(a) {
                if (b.lastX !== a.clientX || b.lastY !== a.clientY) b.setPosition(a),
                    b.currentLoc = a;
                b.lastX = a.clientX;
                b.lastY = a.clientY
            });
            b.options.tint && "inner" != b.options.zoomType && b.zoomTint.bind("mousemove", function(a) {
                if (b.lastX !== a.clientX || b.lastY !== a.clientY) b.setPosition(a), b.currentLoc = a;
                b.lastX = a.clientX;
                b.lastY = a.clientY
            });
            "inner" == b.options.zoomType && b.zoomWindow.bind("mousemove", function(a) {
                if (b.lastX !== a.clientX || b.lastY !== a.clientY) b.setPosition(a), b.currentLoc = a;
                b.lastX = a.clientX;
                b.lastY = a.clientY
            });
            b.zoomContainer.add(b.$elem).mouseenter(function() {
                !1 == b.overWindow &&
                    b.setElements("show")
            }).mouseleave(function() {
                b.scrollLock || b.setElements("hide")
            });
            "inner" != b.options.zoomType && b.zoomWindow.mouseenter(function() {
                b.overWindow = !0;
                b.setElements("hide")
            }).mouseleave(function() {
                b.overWindow = !1
            });
            b.minZoomLevel = b.options.minZoomLevel ? b.options.minZoomLevel : 2 * b.options.scrollZoomIncrement;
            b.options.scrollZoom && b.zoomContainer.add(b.$elem).bind("mousewheel DOMMouseScroll MozMousePixelScroll", function(a) {
                b.scrollLock = !0;
                clearTimeout(d.data(this, "timer"));
                d.data(this, "timer",
                    setTimeout(function() {
                        b.scrollLock = !1
                    }, 250));
                var e = a.originalEvent.wheelDelta || -1 * a.originalEvent.detail;
                a.stopImmediatePropagation();
                a.stopPropagation();
                a.preventDefault();
                0 < e / 120 ? b.currentZoomLevel >= b.minZoomLevel && b.changeZoomLevel(b.currentZoomLevel - b.options.scrollZoomIncrement) : b.options.maxZoomLevel ? b.currentZoomLevel <= b.options.maxZoomLevel && b.changeZoomLevel(parseFloat(b.currentZoomLevel) + b.options.scrollZoomIncrement) : b.changeZoomLevel(parseFloat(b.currentZoomLevel) + b.options.scrollZoomIncrement);
                return !1
            })
        },
        setElements: function(b) {
            if (!this.options.zoomEnabled) return !1;
            "show" == b && this.isWindowSet && ("inner" == this.options.zoomType && this.showHideWindow("show"), "window" == this.options.zoomType && this.showHideWindow("show"), this.options.showLens && this.showHideLens("show"), this.options.tint && "inner" != this.options.zoomType && this.showHideTint("show"));
            "hide" == b && ("window" == this.options.zoomType && this.showHideWindow("hide"), this.options.tint || this.showHideWindow("hide"), this.options.showLens && this.showHideLens("hide"),
                this.options.tint && this.showHideTint("hide"))
        },
        setPosition: function(b) {
            if (!this.options.zoomEnabled) return !1;
            this.nzHeight = this.$elem.height();
            this.nzWidth = this.$elem.width();
            this.nzOffset = this.$elem.offset();
            this.options.tint && "inner" != this.options.zoomType && (this.zoomTint.css({
                top: 0
            }), this.zoomTint.css({
                left: 0
            }));
            this.options.responsive && !this.options.scrollZoom && this.options.showLens && (lensHeight = this.nzHeight < this.options.zoomWindowWidth / this.widthRatio ? this.nzHeight : String(this.options.zoomWindowHeight /
                this.heightRatio), lensWidth = this.largeWidth < this.options.zoomWindowWidth ? this.nzWidth : this.options.zoomWindowWidth / this.widthRatio, this.widthRatio = this.largeWidth / this.nzWidth, this.heightRatio = this.largeHeight / this.nzHeight, "lens" != this.options.zoomType && (lensHeight = this.nzHeight < this.options.zoomWindowWidth / this.widthRatio ? this.nzHeight : String(this.options.zoomWindowHeight / this.heightRatio), lensWidth = this.options.zoomWindowWidth < this.options.zoomWindowWidth ? this.nzWidth : this.options.zoomWindowWidth /
                this.widthRatio, this.zoomLens.css("width", lensWidth), this.zoomLens.css("height", lensHeight), this.options.tint && (this.zoomTintImage.css("width", this.nzWidth), this.zoomTintImage.css("height", this.nzHeight))), "lens" == this.options.zoomType && this.zoomLens.css({
                width: String(this.options.lensSize) + "px",
                height: String(this.options.lensSize) + "px"
            }));
            this.zoomContainer.css({
                top: this.nzOffset.top
            });
            this.zoomContainer.css({
                left: this.nzOffset.left
            });
            this.mouseLeft = parseInt(b.pageX - this.nzOffset.left);
            this.mouseTop =
                parseInt(b.pageY - this.nzOffset.top);
            "window" == this.options.zoomType && (this.Etoppos = this.mouseTop < this.zoomLens.height() / 2, this.Eboppos = this.mouseTop > this.nzHeight - this.zoomLens.height() / 2 - 2 * this.options.lensBorderSize, this.Eloppos = this.mouseLeft < 0 + this.zoomLens.width() / 2, this.Eroppos = this.mouseLeft > this.nzWidth - this.zoomLens.width() / 2 - 2 * this.options.lensBorderSize);
            "inner" == this.options.zoomType && (this.Etoppos = this.mouseTop < this.nzHeight / 2 / this.heightRatio, this.Eboppos = this.mouseTop > this.nzHeight -
                this.nzHeight / 2 / this.heightRatio, this.Eloppos = this.mouseLeft < 0 + this.nzWidth / 2 / this.widthRatio, this.Eroppos = this.mouseLeft > this.nzWidth - this.nzWidth / 2 / this.widthRatio - 2 * this.options.lensBorderSize);
            0 >= this.mouseLeft || 0 > this.mouseTop || this.mouseLeft > this.nzWidth || this.mouseTop > this.nzHeight ? this.setElements("hide") : (this.options.showLens && (this.lensLeftPos = String(this.mouseLeft - this.zoomLens.width() / 2), this.lensTopPos = String(this.mouseTop - this.zoomLens.height() / 2)), this.Etoppos && (this.lensTopPos = 0),
                this.Eloppos && (this.tintpos = this.lensLeftPos = this.windowLeftPos = 0), "window" == this.options.zoomType && (this.Eboppos && (this.lensTopPos = Math.max(this.nzHeight - this.zoomLens.height() - 2 * this.options.lensBorderSize, 0)), this.Eroppos && (this.lensLeftPos = this.nzWidth - this.zoomLens.width() - 2 * this.options.lensBorderSize)), "inner" == this.options.zoomType && (this.Eboppos && (this.lensTopPos = Math.max(this.nzHeight - 2 * this.options.lensBorderSize, 0)), this.Eroppos && (this.lensLeftPos = this.nzWidth - this.nzWidth - 2 * this.options.lensBorderSize)),
                "lens" == this.options.zoomType && (this.windowLeftPos = String(-1 * ((b.pageX - this.nzOffset.left) * this.widthRatio - this.zoomLens.width() / 2)), this.windowTopPos = String(-1 * ((b.pageY - this.nzOffset.top) * this.heightRatio - this.zoomLens.height() / 2)), this.zoomLens.css({
                    backgroundPosition: this.windowLeftPos + "px " + this.windowTopPos + "px"
                }), this.changeBgSize && (this.nzHeight > this.nzWidth ? ("lens" == this.options.zoomType && this.zoomLens.css({
                    "background-size": this.largeWidth / this.newvalueheight + "px " + this.largeHeight / this.newvalueheight +
                        "px"
                }), this.zoomWindow.css({
                    "background-size": this.largeWidth / this.newvalueheight + "px " + this.largeHeight / this.newvalueheight + "px"
                })) : ("lens" == this.options.zoomType && this.zoomLens.css({
                    "background-size": this.largeWidth / this.newvaluewidth + "px " + this.largeHeight / this.newvaluewidth + "px"
                }), this.zoomWindow.css({
                    "background-size": this.largeWidth / this.newvaluewidth + "px " + this.largeHeight / this.newvaluewidth + "px"
                })), this.changeBgSize = !1), this.setWindowPostition(b)), this.options.tint && "inner" != this.options.zoomType &&
                this.setTintPosition(b), "window" == this.options.zoomType && this.setWindowPostition(b), "inner" == this.options.zoomType && this.setWindowPostition(b), this.options.showLens && (this.fullwidth && "lens" != this.options.zoomType && (this.lensLeftPos = 0), this.zoomLens.css({
                    left: this.lensLeftPos + "px",
                    top: this.lensTopPos + "px"
                })))
        },
        showHideWindow: function(b) {
            "show" != b || this.isWindowActive || (this.options.zoomWindowFadeIn ? this.zoomWindow.stop(!0, !0, !1).fadeIn(this.options.zoomWindowFadeIn) : this.zoomWindow.show(), this.isWindowActive = !0);
            "hide" == b && this.isWindowActive && (this.options.zoomWindowFadeOut ? this.zoomWindow.stop(!0, !0).fadeOut(this.options.zoomWindowFadeOut) : this.zoomWindow.hide(), this.isWindowActive = !1)
        },
        showHideLens: function(b) {
            "show" != b || this.isLensActive || (this.options.lensFadeIn ? this.zoomLens.stop(!0, !0, !1).fadeIn(this.options.lensFadeIn) : this.zoomLens.show(), this.isLensActive = !0);
            "hide" == b && this.isLensActive && (this.options.lensFadeOut ? this.zoomLens.stop(!0, !0).fadeOut(this.options.lensFadeOut) : this.zoomLens.hide(),
                this.isLensActive = !1)
        },
        showHideTint: function(b) {
            "show" != b || this.isTintActive || (this.options.zoomTintFadeIn ? this.zoomTint.css({
                opacity: this.options.tintOpacity
            }).animate().stop(!0, !0).fadeIn("slow") : (this.zoomTint.css({
                opacity: this.options.tintOpacity
            }).animate(), this.zoomTint.show()), this.isTintActive = !0);
            "hide" == b && this.isTintActive && (this.options.zoomTintFadeOut ? this.zoomTint.stop(!0, !0).fadeOut(this.options.zoomTintFadeOut) : this.zoomTint.hide(), this.isTintActive = !1)
        },
        setLensPostition: function(b) {},
        setWindowPostition: function(b) {
            var a = this;
            if (isNaN(a.options.zoomWindowPosition)) a.externalContainer = d("#" + a.options.zoomWindowPosition), a.externalContainerWidth = a.externalContainer.width(), a.externalContainerHeight = a.externalContainer.height(), a.externalContainerOffset = a.externalContainer.offset(), a.windowOffsetTop = a.externalContainerOffset.top, a.windowOffsetLeft = a.externalContainerOffset.left;
            else switch (a.options.zoomWindowPosition) {
                case 1:
                    a.windowOffsetTop = a.options.zoomWindowOffety;
                    a.windowOffsetLeft = +a.nzWidth;
                    break;
                case 2:
                    a.options.zoomWindowHeight > a.nzHeight && (a.windowOffsetTop = -1 * (a.options.zoomWindowHeight / 2 - a.nzHeight / 2), a.windowOffsetLeft = a.nzWidth);
                    break;
                case 3:
                    a.windowOffsetTop = a.nzHeight - a.zoomWindow.height() - 2 * a.options.borderSize;
                    a.windowOffsetLeft = a.nzWidth;
                    break;
                case 4:
                    a.windowOffsetTop = a.nzHeight;
                    a.windowOffsetLeft = a.nzWidth;
                    break;
                case 5:
                    a.windowOffsetTop = a.nzHeight;
                    a.windowOffsetLeft = a.nzWidth - a.zoomWindow.width() - 2 * a.options.borderSize;
                    break;
                case 6:
                    a.options.zoomWindowHeight >
                        a.nzHeight && (a.windowOffsetTop = a.nzHeight, a.windowOffsetLeft = -1 * (a.options.zoomWindowWidth / 2 - a.nzWidth / 2 + 2 * a.options.borderSize));
                    break;
                case 7:
                    a.windowOffsetTop = a.nzHeight;
                    a.windowOffsetLeft = 0;
                    break;
                case 8:
                    a.windowOffsetTop = a.nzHeight;
                    a.windowOffsetLeft = -1 * (a.zoomWindow.width() + 2 * a.options.borderSize);
                    break;
                case 9:
                    a.windowOffsetTop = a.nzHeight - a.zoomWindow.height() - 2 * a.options.borderSize;
                    a.windowOffsetLeft = -1 * (a.zoomWindow.width() + 2 * a.options.borderSize);
                    break;
                case 10:
                    a.options.zoomWindowHeight > a.nzHeight &&
                        (a.windowOffsetTop = -1 * (a.options.zoomWindowHeight / 2 - a.nzHeight / 2), a.windowOffsetLeft = -1 * (a.zoomWindow.width() + 2 * a.options.borderSize));
                    break;
                case 11:
                    a.windowOffsetTop = a.options.zoomWindowOffety;
                    a.windowOffsetLeft = -1 * (a.zoomWindow.width() + 2 * a.options.borderSize);
                    break;
                case 12:
                    a.windowOffsetTop = -1 * (a.zoomWindow.height() + 2 * a.options.borderSize);
                    a.windowOffsetLeft = -1 * (a.zoomWindow.width() + 2 * a.options.borderSize);
                    break;
                case 13:
                    a.windowOffsetTop = -1 * (a.zoomWindow.height() + 2 * a.options.borderSize);
                    a.windowOffsetLeft =
                        0;
                    break;
                case 14:
                    a.options.zoomWindowHeight > a.nzHeight && (a.windowOffsetTop = -1 * (a.zoomWindow.height() + 2 * a.options.borderSize), a.windowOffsetLeft = -1 * (a.options.zoomWindowWidth / 2 - a.nzWidth / 2 + 2 * a.options.borderSize));
                    break;
                case 15:
                    a.windowOffsetTop = -1 * (a.zoomWindow.height() + 2 * a.options.borderSize);
                    a.windowOffsetLeft = a.nzWidth - a.zoomWindow.width() - 2 * a.options.borderSize;
                    break;
                case 16:
                    a.windowOffsetTop = -1 * (a.zoomWindow.height() + 2 * a.options.borderSize);
                    a.windowOffsetLeft = a.nzWidth;
                    break;
                default:
                    a.windowOffsetTop =
                        a.options.zoomWindowOffety, a.windowOffsetLeft = a.nzWidth
            }
            a.isWindowSet = !0;
            a.windowOffsetTop += a.options.zoomWindowOffety;
            a.windowOffsetLeft += a.options.zoomWindowOffetx;
            a.zoomWindow.css({
                top: a.windowOffsetTop
            });
            a.zoomWindow.css({
                left: a.windowOffsetLeft
            });
            "inner" == a.options.zoomType && (a.zoomWindow.css({
                top: 0
            }), a.zoomWindow.css({
                left: 0
            }));
            a.windowLeftPos = String(-1 * ((b.pageX - a.nzOffset.left) * a.widthRatio - a.zoomWindow.width() / 2));
            a.windowTopPos = String(-1 * ((b.pageY - a.nzOffset.top) * a.heightRatio - a.zoomWindow.height() /
                2));
            a.Etoppos && (a.windowTopPos = 0);
            a.Eloppos && (a.windowLeftPos = 0);
            a.Eboppos && (a.windowTopPos = -1 * (a.largeHeight / a.currentZoomLevel - a.zoomWindow.height()));
            a.Eroppos && (a.windowLeftPos = -1 * (a.largeWidth / a.currentZoomLevel - a.zoomWindow.width()));
            a.fullheight && (a.windowTopPos = 0);
            a.fullwidth && (a.windowLeftPos = 0);
            if ("window" == a.options.zoomType || "inner" == a.options.zoomType) 1 == a.zoomLock && (1 >= a.widthRatio && (a.windowLeftPos = 0), 1 >= a.heightRatio && (a.windowTopPos = 0)), a.largeHeight < a.options.zoomWindowHeight && (a.windowTopPos =
                0), a.largeWidth < a.options.zoomWindowWidth && (a.windowLeftPos = 0), a.options.easing ? (a.xp || (a.xp = 0), a.yp || (a.yp = 0), a.loop || (a.loop = setInterval(function() {
                a.xp += (a.windowLeftPos - a.xp) / a.options.easingAmount;
                a.yp += (a.windowTopPos - a.yp) / a.options.easingAmount;
                a.scrollingLock ? (clearInterval(a.loop), a.xp = a.windowLeftPos, a.yp = a.windowTopPos, a.xp = -1 * ((b.pageX - a.nzOffset.left) * a.widthRatio - a.zoomWindow.width() / 2), a.yp = -1 * ((b.pageY - a.nzOffset.top) * a.heightRatio - a.zoomWindow.height() / 2), a.changeBgSize && (a.nzHeight >
                    a.nzWidth ? ("lens" == a.options.zoomType && a.zoomLens.css({
                        "background-size": a.largeWidth / a.newvalueheight + "px " + a.largeHeight / a.newvalueheight + "px"
                    }), a.zoomWindow.css({
                        "background-size": a.largeWidth / a.newvalueheight + "px " + a.largeHeight / a.newvalueheight + "px"
                    })) : ("lens" != a.options.zoomType && a.zoomLens.css({
                        "background-size": a.largeWidth / a.newvaluewidth + "px " + a.largeHeight / a.newvalueheight + "px"
                    }), a.zoomWindow.css({
                        "background-size": a.largeWidth / a.newvaluewidth + "px " + a.largeHeight / a.newvaluewidth + "px"
                    })),
                    a.changeBgSize = !1), a.zoomWindow.css({
                    backgroundPosition: a.windowLeftPos + "px " + a.windowTopPos + "px"
                }), a.scrollingLock = !1, a.loop = !1) : (a.changeBgSize && (a.nzHeight > a.nzWidth ? ("lens" == a.options.zoomType && a.zoomLens.css({
                    "background-size": a.largeWidth / a.newvalueheight + "px " + a.largeHeight / a.newvalueheight + "px"
                }), a.zoomWindow.css({
                    "background-size": a.largeWidth / a.newvalueheight + "px " + a.largeHeight / a.newvalueheight + "px"
                })) : ("lens" != a.options.zoomType && a.zoomLens.css({
                    "background-size": a.largeWidth / a.newvaluewidth +
                        "px " + a.largeHeight / a.newvaluewidth + "px"
                }), a.zoomWindow.css({
                    "background-size": a.largeWidth / a.newvaluewidth + "px " + a.largeHeight / a.newvaluewidth + "px"
                })), a.changeBgSize = !1), a.zoomWindow.css({
                    backgroundPosition: a.xp + "px " + a.yp + "px"
                }))
            }, 16))) : (a.changeBgSize && (a.nzHeight > a.nzWidth ? ("lens" == a.options.zoomType && a.zoomLens.css({
                "background-size": a.largeWidth / a.newvalueheight + "px " + a.largeHeight / a.newvalueheight + "px"
            }), a.zoomWindow.css({
                "background-size": a.largeWidth / a.newvalueheight + "px " + a.largeHeight /
                    a.newvalueheight + "px"
            })) : ("lens" == a.options.zoomType && a.zoomLens.css({
                "background-size": a.largeWidth / a.newvaluewidth + "px " + a.largeHeight / a.newvaluewidth + "px"
            }), a.largeHeight / a.newvaluewidth < a.options.zoomWindowHeight ? a.zoomWindow.css({
                "background-size": a.largeWidth / a.newvaluewidth + "px " + a.largeHeight / a.newvaluewidth + "px"
            }) : a.zoomWindow.css({
                "background-size": a.largeWidth / a.newvalueheight + "px " + a.largeHeight / a.newvalueheight + "px"
            })), a.changeBgSize = !1), a.zoomWindow.css({
                backgroundPosition: a.windowLeftPos +
                    "px " + a.windowTopPos + "px"
            }))
        },
        setTintPosition: function(b) {
            this.nzOffset = this.$elem.offset();
            this.tintpos = String(-1 * (b.pageX - this.nzOffset.left - this.zoomLens.width() / 2));
            this.tintposy = String(-1 * (b.pageY - this.nzOffset.top - this.zoomLens.height() / 2));
            this.Etoppos && (this.tintposy = 0);
            this.Eloppos && (this.tintpos = 0);
            this.Eboppos && (this.tintposy = -1 * (this.nzHeight - this.zoomLens.height() - 2 * this.options.lensBorderSize));
            this.Eroppos && (this.tintpos = -1 * (this.nzWidth - this.zoomLens.width() - 2 * this.options.lensBorderSize));
            this.options.tint && (this.fullheight && (this.tintposy = 0), this.fullwidth && (this.tintpos = 0), this.zoomTintImage.css({
                left: this.tintpos + "px"
            }), this.zoomTintImage.css({
                top: this.tintposy + "px"
            }))
        },
        swaptheimage: function(b, a) {
            var c = this,
                e = new Image;
            c.options.loadingIcon && (c.spinner = d("<div style=\"background: url('" + c.options.loadingIcon + "') no-repeat center;height:" + c.nzHeight + "px;width:" + c.nzWidth + 'px;z-index: 2000;position: absolute; background-position: center center;"></div>'), c.$elem.after(c.spinner));
            c.options.onImageSwap(c.$elem);
            e.onload = function() {
                c.largeWidth = e.width;
                c.largeHeight = e.height;
                c.zoomImage = a;
                c.zoomWindow.css({
                    "background-size": c.largeWidth + "px " + c.largeHeight + "px"
                });
                c.zoomWindow.css({
                    "background-size": c.largeWidth + "px " + c.largeHeight + "px"
                });
                c.swapAction(b, a)
            };
            e.src = a
        },
        swapAction: function(b, a) {
            var c = this,
                e = new Image;
            e.onload = function() {
                c.nzHeight = e.height;
                c.nzWidth = e.width;
                c.options.onImageSwapComplete(c.$elem);
                c.doneCallback()
            };
            e.src = b;
            c.currentZoomLevel = c.options.zoomLevel;
            c.options.maxZoomLevel = !1;
            "lens" == c.options.zoomType && c.zoomLens.css({
                backgroundImage: "url('" + a + "')"
            });
            "window" == c.options.zoomType && c.zoomWindow.css({
                backgroundImage: "url('" + a + "')"
            });
            "inner" == c.options.zoomType && c.zoomWindow.css({
                backgroundImage: "url('" + a + "')"
            });
            c.currentImage = a;
            if (c.options.imageCrossfade) {
                var f = c.$elem,
                    g = f.clone();
                c.$elem.attr("src", b);
                c.$elem.after(g);
                g.stop(!0).fadeOut(c.options.imageCrossfade, function() {
                    d(this).remove()
                });
                c.$elem.width("auto").removeAttr("width");
                c.$elem.height("auto").removeAttr("height");
                f.fadeIn(c.options.imageCrossfade);
                c.options.tint && "inner" != c.options.zoomType && (f = c.zoomTintImage, g = f.clone(), c.zoomTintImage.attr("src", a), c.zoomTintImage.after(g), g.stop(!0).fadeOut(c.options.imageCrossfade, function() {
                    d(this).remove()
                }), f.fadeIn(c.options.imageCrossfade), c.zoomTint.css({
                    height: c.$elem.height()
                }), c.zoomTint.css({
                    width: c.$elem.width()
                }));
                c.zoomContainer.css("height", c.$elem.height());
                c.zoomContainer.css("width", c.$elem.width());
                "inner" != c.options.zoomType || c.options.constrainType ||
                    (c.zoomWrap.parent().css("height", c.$elem.height()), c.zoomWrap.parent().css("width", c.$elem.width()), c.zoomWindow.css("height", c.$elem.height()), c.zoomWindow.css("width", c.$elem.width()))
            } else c.$elem.attr("src", b), c.options.tint && (c.zoomTintImage.attr("src", a), c.zoomTintImage.attr("height", c.$elem.height()), c.zoomTintImage.css({
                height: c.$elem.height()
            }), c.zoomTint.css({
                height: c.$elem.height()
            })), c.zoomContainer.css("height", c.$elem.height()), c.zoomContainer.css("width", c.$elem.width());
            c.options.imageCrossfade &&
                (c.zoomWrap.css("height", c.$elem.height()), c.zoomWrap.css("width", c.$elem.width()));
            c.options.constrainType && ("height" == c.options.constrainType && (c.zoomContainer.css("height", c.options.constrainSize), c.zoomContainer.css("width", "auto"), c.options.imageCrossfade ? (c.zoomWrap.css("height", c.options.constrainSize), c.zoomWrap.css("width", "auto"), c.constwidth = c.zoomWrap.width()) : (c.$elem.css("height", c.options.constrainSize), c.$elem.css("width", "auto"), c.constwidth = c.$elem.width()), "inner" == c.options.zoomType &&
                    (c.zoomWrap.parent().css("height", c.options.constrainSize), c.zoomWrap.parent().css("width", c.constwidth), c.zoomWindow.css("height", c.options.constrainSize), c.zoomWindow.css("width", c.constwidth)), c.options.tint && (c.tintContainer.css("height", c.options.constrainSize), c.tintContainer.css("width", c.constwidth), c.zoomTint.css("height", c.options.constrainSize), c.zoomTint.css("width", c.constwidth), c.zoomTintImage.css("height", c.options.constrainSize), c.zoomTintImage.css("width", c.constwidth))), "width" ==
                c.options.constrainType && (c.zoomContainer.css("height", "auto"), c.zoomContainer.css("width", c.options.constrainSize), c.options.imageCrossfade ? (c.zoomWrap.css("height", "auto"), c.zoomWrap.css("width", c.options.constrainSize), c.constheight = c.zoomWrap.height()) : (c.$elem.css("height", "auto"), c.$elem.css("width", c.options.constrainSize), c.constheight = c.$elem.height()), "inner" == c.options.zoomType && (c.zoomWrap.parent().css("height", c.constheight), c.zoomWrap.parent().css("width", c.options.constrainSize), c.zoomWindow.css("height",
                    c.constheight), c.zoomWindow.css("width", c.options.constrainSize)), c.options.tint && (c.tintContainer.css("height", c.constheight), c.tintContainer.css("width", c.options.constrainSize), c.zoomTint.css("height", c.constheight), c.zoomTint.css("width", c.options.constrainSize), c.zoomTintImage.css("height", c.constheight), c.zoomTintImage.css("width", c.options.constrainSize))))
        },
        doneCallback: function() {
            this.options.loadingIcon && this.spinner.hide();
            this.nzOffset = this.$elem.offset();
            this.nzWidth = this.$elem.width();
            this.nzHeight = this.$elem.height();
            this.currentZoomLevel = this.options.zoomLevel;
            this.widthRatio = this.largeWidth / this.nzWidth;
            this.heightRatio = this.largeHeight / this.nzHeight;
            "window" == this.options.zoomType && (lensHeight = this.nzHeight < this.options.zoomWindowWidth / this.widthRatio ? this.nzHeight : String(this.options.zoomWindowHeight / this.heightRatio), lensWidth = this.options.zoomWindowWidth < this.options.zoomWindowWidth ? this.nzWidth : this.options.zoomWindowWidth / this.widthRatio, this.zoomLens && (this.zoomLens.css("width",
                lensWidth), this.zoomLens.css("height", lensHeight)))
        },
        getCurrentImage: function() {
            return this.zoomImage
        },
        getGalleryList: function() {
            var b = this;
            b.gallerylist = [];
            b.options.gallery ? d("#" + b.options.gallery + " a").each(function() {
                    var a = "";
                    d(this).data("zoom-image") ? a = d(this).data("zoom-image") : d(this).data("image") && (a = d(this).data("image"));
                    a == b.zoomImage ? b.gallerylist.unshift({
                        href: "" + a + "",
                        title: d(this).find("img").attr("title")
                    }) : b.gallerylist.push({
                        href: "" + a + "",
                        title: d(this).find("img").attr("title")
                    })
                }) :
                b.gallerylist.push({
                    href: "" + b.zoomImage + "",
                    title: d(this).find("img").attr("title")
                });
            return b.gallerylist
        },
        changeZoomLevel: function(b) {
            this.scrollingLock = !0;
            this.newvalue = parseFloat(b).toFixed(2);
            newvalue = parseFloat(b).toFixed(2);
            maxheightnewvalue = this.largeHeight / (this.options.zoomWindowHeight / this.nzHeight * this.nzHeight);
            maxwidthtnewvalue = this.largeWidth / (this.options.zoomWindowWidth / this.nzWidth * this.nzWidth);
            "inner" != this.options.zoomType && (maxheightnewvalue <= newvalue ? (this.heightRatio = this.largeHeight /
                maxheightnewvalue / this.nzHeight, this.newvalueheight = maxheightnewvalue, this.fullheight = !0) : (this.heightRatio = this.largeHeight / newvalue / this.nzHeight, this.newvalueheight = newvalue, this.fullheight = !1), maxwidthtnewvalue <= newvalue ? (this.widthRatio = this.largeWidth / maxwidthtnewvalue / this.nzWidth, this.newvaluewidth = maxwidthtnewvalue, this.fullwidth = !0) : (this.widthRatio = this.largeWidth / newvalue / this.nzWidth, this.newvaluewidth = newvalue, this.fullwidth = !1), "lens" == this.options.zoomType && (maxheightnewvalue <= newvalue ?
                (this.fullwidth = !0, this.newvaluewidth = maxheightnewvalue) : (this.widthRatio = this.largeWidth / newvalue / this.nzWidth, this.newvaluewidth = newvalue, this.fullwidth = !1)));
            "inner" == this.options.zoomType && (maxheightnewvalue = parseFloat(this.largeHeight / this.nzHeight).toFixed(2), maxwidthtnewvalue = parseFloat(this.largeWidth / this.nzWidth).toFixed(2), newvalue > maxheightnewvalue && (newvalue = maxheightnewvalue), newvalue > maxwidthtnewvalue && (newvalue = maxwidthtnewvalue), maxheightnewvalue <= newvalue ? (this.heightRatio = this.largeHeight /
                newvalue / this.nzHeight, this.newvalueheight = newvalue > maxheightnewvalue ? maxheightnewvalue : newvalue, this.fullheight = !0) : (this.heightRatio = this.largeHeight / newvalue / this.nzHeight, this.newvalueheight = newvalue > maxheightnewvalue ? maxheightnewvalue : newvalue, this.fullheight = !1), maxwidthtnewvalue <= newvalue ? (this.widthRatio = this.largeWidth / newvalue / this.nzWidth, this.newvaluewidth = newvalue > maxwidthtnewvalue ? maxwidthtnewvalue : newvalue, this.fullwidth = !0) : (this.widthRatio = this.largeWidth / newvalue / this.nzWidth, this.newvaluewidth =
                newvalue, this.fullwidth = !1));
            scrcontinue = !1;
            "inner" == this.options.zoomType && (this.nzWidth > this.nzHeight && (this.newvaluewidth <= maxwidthtnewvalue ? scrcontinue = !0 : (scrcontinue = !1, this.fullwidth = this.fullheight = !0)), this.nzHeight > this.nzWidth && (this.newvaluewidth <= maxwidthtnewvalue ? scrcontinue = !0 : (scrcontinue = !1, this.fullwidth = this.fullheight = !0)));
            "inner" != this.options.zoomType && (scrcontinue = !0);
            scrcontinue && (this.zoomLock = 0, this.changeZoom = !0, this.options.zoomWindowHeight / this.heightRatio <= this.nzHeight &&
                (this.currentZoomLevel = this.newvalueheight, "lens" != this.options.zoomType && "inner" != this.options.zoomType && (this.changeBgSize = !0, this.zoomLens.css({
                    height: String(this.options.zoomWindowHeight / this.heightRatio) + "px"
                })), "lens" == this.options.zoomType || "inner" == this.options.zoomType) && (this.changeBgSize = !0), this.options.zoomWindowWidth / this.widthRatio <= this.nzWidth && ("inner" != this.options.zoomType && this.newvaluewidth > this.newvalueheight && (this.currentZoomLevel = this.newvaluewidth), "lens" != this.options.zoomType &&
                    "inner" != this.options.zoomType && (this.changeBgSize = !0, this.zoomLens.css({
                        width: String(this.options.zoomWindowWidth / this.widthRatio) + "px"
                    })), "lens" == this.options.zoomType || "inner" == this.options.zoomType) && (this.changeBgSize = !0), "inner" == this.options.zoomType && (this.changeBgSize = !0, this.nzWidth > this.nzHeight && (this.currentZoomLevel = this.newvaluewidth), this.nzHeight > this.nzWidth && (this.currentZoomLevel = this.newvaluewidth)));
            this.setPosition(this.currentLoc)
        },
        closeAll: function() {
            self.zoomWindow && self.zoomWindow.hide();
            self.zoomLens && self.zoomLens.hide();
            self.zoomTint && self.zoomTint.hide()
        },
        changeState: function(b) {
            "enable" == b && (this.options.zoomEnabled = !0);
            "disable" == b && (this.options.zoomEnabled = !1)
        }
    };
    d.fn.elevateZoom = function(b) {
        return this.each(function() {
            var a = Object.create(k);
            a.init(b, this);
            d.data(this, "elevateZoom", a)
        })
    };
    d.fn.elevateZoom.options = {
        zoomActivation: "hover",
        zoomEnabled: !0,
        preloading: 1,
        zoomLevel: 1,
        scrollZoom: !1,
        scrollZoomIncrement: 0.1,
        minZoomLevel: !1,
        maxZoomLevel: !1,
        easing: !1,
        easingAmount: 12,
        lensSize: 200,
        zoomWindowWidth: 400,
        zoomWindowHeight: 400,
        zoomWindowOffetx: 0,
        zoomWindowOffety: 0,
        zoomWindowPosition: 1,
        zoomWindowBgColour: "#fff",
        lensFadeIn: !1,
        lensFadeOut: !1,
        debug: !1,
        zoomWindowFadeIn: !1,
        zoomWindowFadeOut: !1,
        zoomWindowAlwaysShow: !1,
        zoomTintFadeIn: !1,
        zoomTintFadeOut: !1,
        borderSize: 4,
        showLens: !0,
        borderColour: "#888",
        lensBorderSize: 1,
        lensBorderColour: "#000",
        lensShape: "square",
        zoomType: "window",
        containLensZoom: !1,
        lensColour: "white",
        lensOpacity: 0.4,
        lenszoom: !1,
        tint: !1,
        tintColour: "#333",
        tintOpacity: 0.4,
        gallery: !1,
        galleryActiveClass: "zoomGalleryActive",
        imageCrossfade: !1,
        constrainType: !1,
        constrainSize: !1,
        loadingIcon: !1,
        cursor: "default",
        responsive: !0,
        onComplete: d.noop,
        onZoomedImageLoaded: function() {},
        onImageSwap: d.noop,
        onImageSwapComplete: d.noop
    }
})(jQuery, window, document);
/*!
 * imagesLoaded PACKAGED v5.0.0
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */
! function(t, e) {
    "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
}("undefined" != typeof window ? window : this, (function() {
    function t() {}
    let e = t.prototype;
    return e.on = function(t, e) {
        if (!t || !e) return this;
        let i = this._events = this._events || {},
            s = i[t] = i[t] || [];
        return s.includes(e) || s.push(e), this
    }, e.once = function(t, e) {
        if (!t || !e) return this;
        this.on(t, e);
        let i = this._onceEvents = this._onceEvents || {};
        return (i[t] = i[t] || {})[e] = !0, this
    }, e.off = function(t, e) {
        let i = this._events && this._events[t];
        if (!i || !i.length) return this;
        let s = i.indexOf(e);
        return -1 != s && i.splice(s, 1), this
    }, e.emitEvent = function(t, e) {
        let i = this._events && this._events[t];
        if (!i || !i.length) return this;
        i = i.slice(0), e = e || [];
        let s = this._onceEvents && this._onceEvents[t];
        for (let n of i) {
            s && s[n] && (this.off(t, n), delete s[n]), n.apply(this, e)
        }
        return this
    }, e.allOff = function() {
        return delete this._events, delete this._onceEvents, this
    }, t
})),
/*!
 * imagesLoaded v5.0.0
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */
function(t, e) {
    "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter")) : t.imagesLoaded = e(t, t.EvEmitter)
}("undefined" != typeof window ? window : this, (function(t, e) {
    let i = t.jQuery,
        s = t.console;

    function n(t, e, o) {
        if (!(this instanceof n)) return new n(t, e, o);
        let r = t;
        var h;
        ("string" == typeof t && (r = document.querySelectorAll(t)), r) ? (this.elements = (h = r, Array.isArray(h) ? h : "object" == typeof h && "number" == typeof h.length ? [...h] : [h]), this.options = {}, "function" == typeof e ? o = e : Object.assign(this.options, e), o && this.on("always", o), this.getImages(), i && (this.jqDeferred = new i.Deferred), setTimeout(this.check.bind(this))) : s.error(`Bad element for imagesLoaded ${r||t}`)
    }
    n.prototype = Object.create(e.prototype), n.prototype.getImages = function() {
        this.images = [], this.elements.forEach(this.addElementImages, this)
    };
    const o = [1, 9, 11];
    n.prototype.addElementImages = function(t) {
        "IMG" === t.nodeName && this.addImage(t), !0 === this.options.background && this.addElementBackgroundImages(t);
        let {
            nodeType: e
        } = t;
        if (!e || !o.includes(e)) return;
        let i = t.querySelectorAll("img");
        for (let t of i) this.addImage(t);
        if ("string" == typeof this.options.background) {
            let e = t.querySelectorAll(this.options.background);
            for (let t of e) this.addElementBackgroundImages(t)
        }
    };
    const r = /url\((['"])?(.*?)\1\)/gi;

    function h(t) {
        this.img = t
    }

    function d(t, e) {
        this.url = t, this.element = e, this.img = new Image
    }
    return n.prototype.addElementBackgroundImages = function(t) {
        let e = getComputedStyle(t);
        if (!e) return;
        let i = r.exec(e.backgroundImage);
        for (; null !== i;) {
            let s = i && i[2];
            s && this.addBackground(s, t), i = r.exec(e.backgroundImage)
        }
    }, n.prototype.addImage = function(t) {
        let e = new h(t);
        this.images.push(e)
    }, n.prototype.addBackground = function(t, e) {
        let i = new d(t, e);
        this.images.push(i)
    }, n.prototype.check = function() {
        if (this.progressedCount = 0, this.hasAnyBroken = !1, !this.images.length) return void this.complete();
        let t = (t, e, i) => {
            setTimeout((() => {
                this.progress(t, e, i)
            }))
        };
        this.images.forEach((function(e) {
            e.once("progress", t), e.check()
        }))
    }, n.prototype.progress = function(t, e, i) {
        this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded, this.emitEvent("progress", [this, t, e]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, t), this.progressedCount === this.images.length && this.complete(), this.options.debug && s && s.log(`progress: ${i}`, t, e)
    }, n.prototype.complete = function() {
        let t = this.hasAnyBroken ? "fail" : "done";
        if (this.isComplete = !0, this.emitEvent(t, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
            let t = this.hasAnyBroken ? "reject" : "resolve";
            this.jqDeferred[t](this)
        }
    }, h.prototype = Object.create(e.prototype), h.prototype.check = function() {
        this.getIsImageComplete() ? this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image, this.img.crossOrigin && (this.proxyImage.crossOrigin = this.img.crossOrigin), this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.proxyImage.src = this.img.currentSrc || this.img.src)
    }, h.prototype.getIsImageComplete = function() {
        return this.img.complete && this.img.naturalWidth
    }, h.prototype.confirm = function(t, e) {
        this.isLoaded = t;
        let {
            parentNode: i
        } = this.img, s = "PICTURE" === i.nodeName ? i : this.img;
        this.emitEvent("progress", [this, s, e])
    }, h.prototype.handleEvent = function(t) {
        let e = "on" + t.type;
        this[e] && this[e](t)
    }, h.prototype.onload = function() {
        this.confirm(!0, "onload"), this.unbindEvents()
    }, h.prototype.onerror = function() {
        this.confirm(!1, "onerror"), this.unbindEvents()
    }, h.prototype.unbindEvents = function() {
        this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
    }, d.prototype = Object.create(h.prototype), d.prototype.check = function() {
        this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url, this.getIsImageComplete() && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents())
    }, d.prototype.unbindEvents = function() {
        this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
    }, d.prototype.confirm = function(t, e) {
        this.isLoaded = t, this.emitEvent("progress", [this, this.element, e])
    }, n.makeJQueryPlugin = function(e) {
        (e = e || t.jQuery) && (i = e, i.fn.imagesLoaded = function(t, e) {
            return new n(this, t, e).jqDeferred.promise(i(this))
        })
    }, n.makeJQueryPlugin(), n
}));
/*!
 * Bootstrap v4.0.0 (https://getbootstrap.com)
 * Copyright 2011-2018 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
! function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports, require("jquery"), require("popper.js")) : "function" == typeof define && define.amd ? define(["exports", "jquery", "popper.js"], e) : e(t.bootstrap = {}, t.jQuery, t.Popper)
}(this, function(t, e, n) {
    "use strict";

    function i(t, e) {
        for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
        }
    }

    function s(t, e, n) {
        return e && i(t.prototype, e), n && i(t, n), t
    }

    function r() {
        return (r = Object.assign || function(t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = arguments[e];
                for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i])
            }
            return t
        }).apply(this, arguments)
    }
    e = e && e.hasOwnProperty("default") ? e.default : e, n = n && n.hasOwnProperty("default") ? n.default : n;
    var o, a, l, h, c, u, f, d, _, g, p, m, v, E, T, y, C, I, A, b, D, S, w, N, O, k, P = function(t) {
            var e = !1;

            function n(e) {
                var n = this,
                    s = !1;
                return t(this).one(i.TRANSITION_END, function() {
                    s = !0
                }), setTimeout(function() {
                    s || i.triggerTransitionEnd(n)
                }, e), this
            }
            var i = {
                TRANSITION_END: "bsTransitionEnd",
                getUID: function(t) {
                    do {
                        t += ~~(1e6 * Math.random())
                    } while (document.getElementById(t));
                    return t
                },
                getSelectorFromElement: function(e) {
                    var n, i = e.getAttribute("data-target");
                    i && "#" !== i || (i = e.getAttribute("href") || ""), "#" === i.charAt(0) && (n = i, i = n = "function" == typeof t.escapeSelector ? t.escapeSelector(n).substr(1) : n.replace(/(:|\.|\[|\]|,|=|@)/g, "\\$1"));
                    try {
                        return t(document).find(i).length > 0 ? i : null
                    } catch (t) {
                        return null
                    }
                },
                reflow: function(t) {
                    return t.offsetHeight
                },
                triggerTransitionEnd: function(n) {
                    t(n).trigger(e.end)
                },
                supportsTransitionEnd: function() {
                    return Boolean(e)
                },
                isElement: function(t) {
                    return (t[0] || t).nodeType
                },
                typeCheckConfig: function(t, e, n) {
                    for (var s in n)
                        if (Object.prototype.hasOwnProperty.call(n, s)) {
                            var r = n[s],
                                o = e[s],
                                a = o && i.isElement(o) ? "element" : (l = o, {}.toString.call(l).match(/\s([a-zA-Z]+)/)[1].toLowerCase());
                            if (!new RegExp(r).test(a)) throw new Error(t.toUpperCase() + ': Option "' + s + '" provided type "' + a + '" but expected type "' + r + '".')
                        }
                    var l
                }
            };
            return e = ("undefined" == typeof window || !window.QUnit) && {
                end: "transitionend"
            }, t.fn.emulateTransitionEnd = n, i.supportsTransitionEnd() && (t.event.special[i.TRANSITION_END] = {
                bindType: e.end,
                delegateType: e.end,
                handle: function(e) {
                    if (t(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
                }
            }), i
        }(e),
        L = (a = "alert", h = "." + (l = "bs.alert"), c = (o = e).fn[a], u = {
            CLOSE: "close" + h,
            CLOSED: "closed" + h,
            CLICK_DATA_API: "click" + h + ".data-api"
        }, f = "alert", d = "fade", _ = "show", g = function() {
            function t(t) {
                this._element = t
            }
            var e = t.prototype;
            return e.close = function(t) {
                t = t || this._element;
                var e = this._getRootElement(t);
                this._triggerCloseEvent(e).isDefaultPrevented() || this._removeElement(e)
            }, e.dispose = function() {
                o.removeData(this._element, l), this._element = null
            }, e._getRootElement = function(t) {
                var e = P.getSelectorFromElement(t),
                    n = !1;
                return e && (n = o(e)[0]), n || (n = o(t).closest("." + f)[0]), n
            }, e._triggerCloseEvent = function(t) {
                var e = o.Event(u.CLOSE);
                return o(t).trigger(e), e
            }, e._removeElement = function(t) {
                var e = this;
                o(t).removeClass(_), P.supportsTransitionEnd() && o(t).hasClass(d) ? o(t).one(P.TRANSITION_END, function(n) {
                    return e._destroyElement(t, n)
                }).emulateTransitionEnd(150) : this._destroyElement(t)
            }, e._destroyElement = function(t) {
                o(t).detach().trigger(u.CLOSED).remove()
            }, t._jQueryInterface = function(e) {
                return this.each(function() {
                    var n = o(this),
                        i = n.data(l);
                    i || (i = new t(this), n.data(l, i)), "close" === e && i[e](this)
                })
            }, t._handleDismiss = function(t) {
                return function(e) {
                    e && e.preventDefault(), t.close(this)
                }
            }, s(t, null, [{
                key: "VERSION",
                get: function() {
                    return "4.0.0"
                }
            }]), t
        }(), o(document).on(u.CLICK_DATA_API, '[data-dismiss="alert"]', g._handleDismiss(new g)), o.fn[a] = g._jQueryInterface, o.fn[a].Constructor = g, o.fn[a].noConflict = function() {
            return o.fn[a] = c, g._jQueryInterface
        }, g),
        R = (m = "button", E = "." + (v = "bs.button"), T = ".data-api", y = (p = e).fn[m], C = "active", I = "btn", A = "focus", b = '[data-toggle^="button"]', D = '[data-toggle="buttons"]', S = "input", w = ".active", N = ".btn", O = {
            CLICK_DATA_API: "click" + E + T,
            FOCUS_BLUR_DATA_API: "focus" + E + T + " blur" + E + T
        }, k = function() {
            function t(t) {
                this._element = t
            }
            var e = t.prototype;
            return e.toggle = function() {
                var t = !0,
                    e = !0,
                    n = p(this._element).closest(D)[0];
                if (n) {
                    var i = p(this._element).find(S)[0];
                    if (i) {
                        if ("radio" === i.type)
                            if (i.checked && p(this._element).hasClass(C)) t = !1;
                            else {
                                var s = p(n).find(w)[0];
                                s && p(s).removeClass(C)
                            }
                        if (t) {
                            if (i.hasAttribute("disabled") || n.hasAttribute("disabled") || i.classList.contains("disabled") || n.classList.contains("disabled")) return;
                            i.checked = !p(this._element).hasClass(C), p(i).trigger("change")
                        }
                        i.focus(), e = !1
                    }
                }
                e && this._element.setAttribute("aria-pressed", !p(this._element).hasClass(C)), t && p(this._element).toggleClass(C)
            }, e.dispose = function() {
                p.removeData(this._element, v), this._element = null
            }, t._jQueryInterface = function(e) {
                return this.each(function() {
                    var n = p(this).data(v);
                    n || (n = new t(this), p(this).data(v, n)), "toggle" === e && n[e]()
                })
            }, s(t, null, [{
                key: "VERSION",
                get: function() {
                    return "4.0.0"
                }
            }]), t
        }(), p(document).on(O.CLICK_DATA_API, b, function(t) {
            t.preventDefault();
            var e = t.target;
            p(e).hasClass(I) || (e = p(e).closest(N)), k._jQueryInterface.call(p(e), "toggle")
        }).on(O.FOCUS_BLUR_DATA_API, b, function(t) {
            var e = p(t.target).closest(N)[0];
            p(e).toggleClass(A, /^focus(in)?$/.test(t.type))
        }), p.fn[m] = k._jQueryInterface, p.fn[m].Constructor = k, p.fn[m].noConflict = function() {
            return p.fn[m] = y, k._jQueryInterface
        }, k),
        j = function(t) {
            var e = "carousel",
                n = "bs.carousel",
                i = "." + n,
                o = t.fn[e],
                a = {
                    interval: 5e3,
                    keyboard: !0,
                    slide: !1,
                    pause: "hover",
                    wrap: !0
                },
                l = {
                    interval: "(number|boolean)",
                    keyboard: "boolean",
                    slide: "(boolean|string)",
                    pause: "(string|boolean)",
                    wrap: "boolean"
                },
                h = "next",
                c = "prev",
                u = "left",
                f = "right",
                d = {
                    SLIDE: "slide" + i,
                    SLID: "slid" + i,
                    KEYDOWN: "keydown" + i,
                    MOUSEENTER: "mouseenter" + i,
                    MOUSELEAVE: "mouseleave" + i,
                    TOUCHEND: "touchend" + i,
                    LOAD_DATA_API: "load" + i + ".data-api",
                    CLICK_DATA_API: "click" + i + ".data-api"
                },
                _ = "carousel",
                g = "active",
                p = "slide",
                m = "carousel-item-right",
                v = "carousel-item-left",
                E = "carousel-item-next",
                T = "carousel-item-prev",
                y = {
                    ACTIVE: ".active",
                    ACTIVE_ITEM: ".active.carousel-item",
                    ITEM: ".carousel-item",
                    NEXT_PREV: ".carousel-item-next, .carousel-item-prev",
                    INDICATORS: ".carousel-indicators",
                    DATA_SLIDE: "[data-slide], [data-slide-to]",
                    DATA_RIDE: '[data-ride="carousel"]'
                },
                C = function() {
                    function o(e, n) {
                        this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this.touchTimeout = null, this._config = this._getConfig(n), this._element = t(e)[0], this._indicatorsElement = t(this._element).find(y.INDICATORS)[0], this._addEventListeners()
                    }
                    var C = o.prototype;
                    return C.next = function() {
                        this._isSliding || this._slide(h)
                    }, C.nextWhenVisible = function() {
                        !document.hidden && t(this._element).is(":visible") && "hidden" !== t(this._element).css("visibility") && this.next()
                    }, C.prev = function() {
                        this._isSliding || this._slide(c)
                    }, C.pause = function(e) {
                        e || (this._isPaused = !0), t(this._element).find(y.NEXT_PREV)[0] && P.supportsTransitionEnd() && (P.triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null
                    }, C.cycle = function(t) {
                        t || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval))
                    }, C.to = function(e) {
                        var n = this;
                        this._activeElement = t(this._element).find(y.ACTIVE_ITEM)[0];
                        var i = this._getItemIndex(this._activeElement);
                        if (!(e > this._items.length - 1 || e < 0))
                            if (this._isSliding) t(this._element).one(d.SLID, function() {
                                return n.to(e)
                            });
                            else {
                                if (i === e) return this.pause(), void this.cycle();
                                var s = e > i ? h : c;
                                this._slide(s, this._items[e])
                            }
                    }, C.dispose = function() {
                        t(this._element).off(i), t.removeData(this._element, n), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null
                    }, C._getConfig = function(t) {
                        return t = r({}, a, t), P.typeCheckConfig(e, t, l), t
                    }, C._addEventListeners = function() {
                        var e = this;
                        this._config.keyboard && t(this._element).on(d.KEYDOWN, function(t) {
                            return e._keydown(t)
                        }), "hover" === this._config.pause && (t(this._element).on(d.MOUSEENTER, function(t) {
                            return e.pause(t)
                        }).on(d.MOUSELEAVE, function(t) {
                            return e.cycle(t)
                        }), "ontouchstart" in document.documentElement && t(this._element).on(d.TOUCHEND, function() {
                            e.pause(), e.touchTimeout && clearTimeout(e.touchTimeout), e.touchTimeout = setTimeout(function(t) {
                                return e.cycle(t)
                            }, 500 + e._config.interval)
                        }))
                    }, C._keydown = function(t) {
                        if (!/input|textarea/i.test(t.target.tagName)) switch (t.which) {
                            case 37:
                                t.preventDefault(), this.prev();
                                break;
                            case 39:
                                t.preventDefault(), this.next()
                        }
                    }, C._getItemIndex = function(e) {
                        return this._items = t.makeArray(t(e).parent().find(y.ITEM)), this._items.indexOf(e)
                    }, C._getItemByDirection = function(t, e) {
                        var n = t === h,
                            i = t === c,
                            s = this._getItemIndex(e),
                            r = this._items.length - 1;
                        if ((i && 0 === s || n && s === r) && !this._config.wrap) return e;
                        var o = (s + (t === c ? -1 : 1)) % this._items.length;
                        return -1 === o ? this._items[this._items.length - 1] : this._items[o]
                    }, C._triggerSlideEvent = function(e, n) {
                        var i = this._getItemIndex(e),
                            s = this._getItemIndex(t(this._element).find(y.ACTIVE_ITEM)[0]),
                            r = t.Event(d.SLIDE, {
                                relatedTarget: e,
                                direction: n,
                                from: s,
                                to: i
                            });
                        return t(this._element).trigger(r), r
                    }, C._setActiveIndicatorElement = function(e) {
                        if (this._indicatorsElement) {
                            t(this._indicatorsElement).find(y.ACTIVE).removeClass(g);
                            var n = this._indicatorsElement.children[this._getItemIndex(e)];
                            n && t(n).addClass(g)
                        }
                    }, C._slide = function(e, n) {
                        var i, s, r, o = this,
                            a = t(this._element).find(y.ACTIVE_ITEM)[0],
                            l = this._getItemIndex(a),
                            c = n || a && this._getItemByDirection(e, a),
                            _ = this._getItemIndex(c),
                            C = Boolean(this._interval);
                        if (e === h ? (i = v, s = E, r = u) : (i = m, s = T, r = f), c && t(c).hasClass(g)) this._isSliding = !1;
                        else if (!this._triggerSlideEvent(c, r).isDefaultPrevented() && a && c) {
                            this._isSliding = !0, C && this.pause(), this._setActiveIndicatorElement(c);
                            var I = t.Event(d.SLID, {
                                relatedTarget: c,
                                direction: r,
                                from: l,
                                to: _
                            });
                            P.supportsTransitionEnd() && t(this._element).hasClass(p) ? (t(c).addClass(s), P.reflow(c), t(a).addClass(i), t(c).addClass(i), t(a).one(P.TRANSITION_END, function() {
                                t(c).removeClass(i + " " + s).addClass(g), t(a).removeClass(g + " " + s + " " + i), o._isSliding = !1, setTimeout(function() {
                                    return t(o._element).trigger(I)
                                }, 0)
                            }).emulateTransitionEnd(600)) : (t(a).removeClass(g), t(c).addClass(g), this._isSliding = !1, t(this._element).trigger(I)), C && this.cycle()
                        }
                    }, o._jQueryInterface = function(e) {
                        return this.each(function() {
                            var i = t(this).data(n),
                                s = r({}, a, t(this).data());
                            "object" == typeof e && (s = r({}, s, e));
                            var l = "string" == typeof e ? e : s.slide;
                            if (i || (i = new o(this, s), t(this).data(n, i)), "number" == typeof e) i.to(e);
                            else if ("string" == typeof l) {
                                if ("undefined" == typeof i[l]) throw new TypeError('No method named "' + l + '"');
                                i[l]()
                            } else s.interval && (i.pause(), i.cycle())
                        })
                    }, o._dataApiClickHandler = function(e) {
                        var i = P.getSelectorFromElement(this);
                        if (i) {
                            var s = t(i)[0];
                            if (s && t(s).hasClass(_)) {
                                var a = r({}, t(s).data(), t(this).data()),
                                    l = this.getAttribute("data-slide-to");
                                l && (a.interval = !1), o._jQueryInterface.call(t(s), a), l && t(s).data(n).to(l), e.preventDefault()
                            }
                        }
                    }, s(o, null, [{
                        key: "VERSION",
                        get: function() {
                            return "4.0.0"
                        }
                    }, {
                        key: "Default",
                        get: function() {
                            return a
                        }
                    }]), o
                }();
            return t(document).on(d.CLICK_DATA_API, y.DATA_SLIDE, C._dataApiClickHandler), t(window).on(d.LOAD_DATA_API, function() {
                t(y.DATA_RIDE).each(function() {
                    var e = t(this);
                    C._jQueryInterface.call(e, e.data())
                })
            }), t.fn[e] = C._jQueryInterface, t.fn[e].Constructor = C, t.fn[e].noConflict = function() {
                return t.fn[e] = o, C._jQueryInterface
            }, C
        }(e),
        H = function(t) {
            var e = "collapse",
                n = "bs.collapse",
                i = "." + n,
                o = t.fn[e],
                a = {
                    toggle: !0,
                    parent: ""
                },
                l = {
                    toggle: "boolean",
                    parent: "(string|element)"
                },
                h = {
                    SHOW: "show" + i,
                    SHOWN: "shown" + i,
                    HIDE: "hide" + i,
                    HIDDEN: "hidden" + i,
                    CLICK_DATA_API: "click" + i + ".data-api"
                },
                c = "show",
                u = "collapse",
                f = "collapsing",
                d = "collapsed",
                _ = "width",
                g = "height",
                p = {
                    ACTIVES: ".show, .collapsing",
                    DATA_TOGGLE: '[data-toggle="collapse"]'
                },
                m = function() {
                    function i(e, n) {
                        this._isTransitioning = !1, this._element = e, this._config = this._getConfig(n), this._triggerArray = t.makeArray(t('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]'));
                        for (var i = t(p.DATA_TOGGLE), s = 0; s < i.length; s++) {
                            var r = i[s],
                                o = P.getSelectorFromElement(r);
                            null !== o && t(o).filter(e).length > 0 && (this._selector = o, this._triggerArray.push(r))
                        }
                        this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle()
                    }
                    var o = i.prototype;
                    return o.toggle = function() {
                        t(this._element).hasClass(c) ? this.hide() : this.show()
                    }, o.show = function() {
                        var e, s, r = this;
                        if (!this._isTransitioning && !t(this._element).hasClass(c) && (this._parent && 0 === (e = t.makeArray(t(this._parent).find(p.ACTIVES).filter('[data-parent="' + this._config.parent + '"]'))).length && (e = null), !(e && (s = t(e).not(this._selector).data(n)) && s._isTransitioning))) {
                            var o = t.Event(h.SHOW);
                            if (t(this._element).trigger(o), !o.isDefaultPrevented()) {
                                e && (i._jQueryInterface.call(t(e).not(this._selector), "hide"), s || t(e).data(n, null));
                                var a = this._getDimension();
                                t(this._element).removeClass(u).addClass(f), this._element.style[a] = 0, this._triggerArray.length > 0 && t(this._triggerArray).removeClass(d).attr("aria-expanded", !0), this.setTransitioning(!0);
                                var l = function() {
                                    t(r._element).removeClass(f).addClass(u).addClass(c), r._element.style[a] = "", r.setTransitioning(!1), t(r._element).trigger(h.SHOWN)
                                };
                                if (P.supportsTransitionEnd()) {
                                    var _ = "scroll" + (a[0].toUpperCase() + a.slice(1));
                                    t(this._element).one(P.TRANSITION_END, l).emulateTransitionEnd(600), this._element.style[a] = this._element[_] + "px"
                                } else l()
                            }
                        }
                    }, o.hide = function() {
                        var e = this;
                        if (!this._isTransitioning && t(this._element).hasClass(c)) {
                            var n = t.Event(h.HIDE);
                            if (t(this._element).trigger(n), !n.isDefaultPrevented()) {
                                var i = this._getDimension();
                                if (this._element.style[i] = this._element.getBoundingClientRect()[i] + "px", P.reflow(this._element), t(this._element).addClass(f).removeClass(u).removeClass(c), this._triggerArray.length > 0)
                                    for (var s = 0; s < this._triggerArray.length; s++) {
                                        var r = this._triggerArray[s],
                                            o = P.getSelectorFromElement(r);
                                        if (null !== o) t(o).hasClass(c) || t(r).addClass(d).attr("aria-expanded", !1)
                                    }
                                this.setTransitioning(!0);
                                var a = function() {
                                    e.setTransitioning(!1), t(e._element).removeClass(f).addClass(u).trigger(h.HIDDEN)
                                };
                                this._element.style[i] = "", P.supportsTransitionEnd() ? t(this._element).one(P.TRANSITION_END, a).emulateTransitionEnd(600) : a()
                            }
                        }
                    }, o.setTransitioning = function(t) {
                        this._isTransitioning = t
                    }, o.dispose = function() {
                        t.removeData(this._element, n), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null
                    }, o._getConfig = function(t) {
                        return (t = r({}, a, t)).toggle = Boolean(t.toggle), P.typeCheckConfig(e, t, l), t
                    }, o._getDimension = function() {
                        return t(this._element).hasClass(_) ? _ : g
                    }, o._getParent = function() {
                        var e = this,
                            n = null;
                        P.isElement(this._config.parent) ? (n = this._config.parent, "undefined" != typeof this._config.parent.jquery && (n = this._config.parent[0])) : n = t(this._config.parent)[0];
                        var s = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';
                        return t(n).find(s).each(function(t, n) {
                            e._addAriaAndCollapsedClass(i._getTargetFromElement(n), [n])
                        }), n
                    }, o._addAriaAndCollapsedClass = function(e, n) {
                        if (e) {
                            var i = t(e).hasClass(c);
                            n.length > 0 && t(n).toggleClass(d, !i).attr("aria-expanded", i)
                        }
                    }, i._getTargetFromElement = function(e) {
                        var n = P.getSelectorFromElement(e);
                        return n ? t(n)[0] : null
                    }, i._jQueryInterface = function(e) {
                        return this.each(function() {
                            var s = t(this),
                                o = s.data(n),
                                l = r({}, a, s.data(), "object" == typeof e && e);
                            if (!o && l.toggle && /show|hide/.test(e) && (l.toggle = !1), o || (o = new i(this, l), s.data(n, o)), "string" == typeof e) {
                                if ("undefined" == typeof o[e]) throw new TypeError('No method named "' + e + '"');
                                o[e]()
                            }
                        })
                    }, s(i, null, [{
                        key: "VERSION",
                        get: function() {
                            return "4.0.0"
                        }
                    }, {
                        key: "Default",
                        get: function() {
                            return a
                        }
                    }]), i
                }();
            return t(document).on(h.CLICK_DATA_API, p.DATA_TOGGLE, function(e) {
                "A" === e.currentTarget.tagName && e.preventDefault();
                var i = t(this),
                    s = P.getSelectorFromElement(this);
                t(s).each(function() {
                    var e = t(this),
                        s = e.data(n) ? "toggle" : i.data();
                    m._jQueryInterface.call(e, s)
                })
            }), t.fn[e] = m._jQueryInterface, t.fn[e].Constructor = m, t.fn[e].noConflict = function() {
                return t.fn[e] = o, m._jQueryInterface
            }, m
        }(e),
        W = function(t) {
            var e = "dropdown",
                i = "bs.dropdown",
                o = "." + i,
                a = ".data-api",
                l = t.fn[e],
                h = new RegExp("38|40|27"),
                c = {
                    HIDE: "hide" + o,
                    HIDDEN: "hidden" + o,
                    SHOW: "show" + o,
                    SHOWN: "shown" + o,
                    CLICK: "click" + o,
                    CLICK_DATA_API: "click" + o + a,
                    KEYDOWN_DATA_API: "keydown" + o + a,
                    KEYUP_DATA_API: "keyup" + o + a
                },
                u = "disabled",
                f = "show",
                d = "dropup",
                _ = "dropright",
                g = "dropleft",
                p = "dropdown-menu-right",
                m = "dropdown-menu-left",
                v = "position-static",
                E = '[data-toggle="dropdown"]',
                T = ".dropdown form",
                y = ".dropdown-menu",
                C = ".navbar-nav",
                I = ".dropdown-menu .dropdown-item:not(.disabled)",
                A = "top-start",
                b = "top-end",
                D = "bottom-start",
                S = "bottom-end",
                w = "right-start",
                N = "left-start",
                O = {
                    offset: 0,
                    flip: !0,
                    boundary: "scrollParent"
                },
                k = {
                    offset: "(number|string|function)",
                    flip: "boolean",
                    boundary: "(string|element)"
                },
                L = function() {
                    function a(t, e) {
                        this._element = t, this._popper = null, this._config = this._getConfig(e), this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar(), this._addEventListeners()
                    }
                    var l = a.prototype;
                    return l.toggle = function() {
                        if (!this._element.disabled && !t(this._element).hasClass(u)) {
                            var e = a._getParentFromElement(this._element),
                                i = t(this._menu).hasClass(f);
                            if (a._clearMenus(), !i) {
                                var s = {
                                        relatedTarget: this._element
                                    },
                                    r = t.Event(c.SHOW, s);
                                if (t(e).trigger(r), !r.isDefaultPrevented()) {
                                    if (!this._inNavbar) {
                                        if ("undefined" == typeof n) throw new TypeError("Bootstrap dropdown require Popper.js (https://popper.js.org)");
                                        var o = this._element;
                                        t(e).hasClass(d) && (t(this._menu).hasClass(m) || t(this._menu).hasClass(p)) && (o = e), "scrollParent" !== this._config.boundary && t(e).addClass(v), this._popper = new n(o, this._menu, this._getPopperConfig())
                                    }
                                    "ontouchstart" in document.documentElement && 0 === t(e).closest(C).length && t("body").children().on("mouseover", null, t.noop), this._element.focus(), this._element.setAttribute("aria-expanded", !0), t(this._menu).toggleClass(f), t(e).toggleClass(f).trigger(t.Event(c.SHOWN, s))
                                }
                            }
                        }
                    }, l.dispose = function() {
                        t.removeData(this._element, i), t(this._element).off(o), this._element = null, this._menu = null, null !== this._popper && (this._popper.destroy(), this._popper = null)
                    }, l.update = function() {
                        this._inNavbar = this._detectNavbar(), null !== this._popper && this._popper.scheduleUpdate()
                    }, l._addEventListeners = function() {
                        var e = this;
                        t(this._element).on(c.CLICK, function(t) {
                            t.preventDefault(), t.stopPropagation(), e.toggle()
                        })
                    }, l._getConfig = function(n) {
                        return n = r({}, this.constructor.Default, t(this._element).data(), n), P.typeCheckConfig(e, n, this.constructor.DefaultType), n
                    }, l._getMenuElement = function() {
                        if (!this._menu) {
                            var e = a._getParentFromElement(this._element);
                            this._menu = t(e).find(y)[0]
                        }
                        return this._menu
                    }, l._getPlacement = function() {
                        var e = t(this._element).parent(),
                            n = D;
                        return e.hasClass(d) ? (n = A, t(this._menu).hasClass(p) && (n = b)) : e.hasClass(_) ? n = w : e.hasClass(g) ? n = N : t(this._menu).hasClass(p) && (n = S), n
                    }, l._detectNavbar = function() {
                        return t(this._element).closest(".navbar").length > 0
                    }, l._getPopperConfig = function() {
                        var t = this,
                            e = {};
                        return "function" == typeof this._config.offset ? e.fn = function(e) {
                            return e.offsets = r({}, e.offsets, t._config.offset(e.offsets) || {}), e
                        } : e.offset = this._config.offset, {
                            placement: this._getPlacement(),
                            modifiers: {
                                offset: e,
                                flip: {
                                    enabled: this._config.flip
                                },
                                preventOverflow: {
                                    boundariesElement: this._config.boundary
                                }
                            }
                        }
                    }, a._jQueryInterface = function(e) {
                        return this.each(function() {
                            var n = t(this).data(i);
                            if (n || (n = new a(this, "object" == typeof e ? e : null), t(this).data(i, n)), "string" == typeof e) {
                                if ("undefined" == typeof n[e]) throw new TypeError('No method named "' + e + '"');
                                n[e]()
                            }
                        })
                    }, a._clearMenus = function(e) {
                        if (!e || 3 !== e.which && ("keyup" !== e.type || 9 === e.which))
                            for (var n = t.makeArray(t(E)), s = 0; s < n.length; s++) {
                                var r = a._getParentFromElement(n[s]),
                                    o = t(n[s]).data(i),
                                    l = {
                                        relatedTarget: n[s]
                                    };
                                if (o) {
                                    var h = o._menu;
                                    if (t(r).hasClass(f) && !(e && ("click" === e.type && /input|textarea/i.test(e.target.tagName) || "keyup" === e.type && 9 === e.which) && t.contains(r, e.target))) {
                                        var u = t.Event(c.HIDE, l);
                                        t(r).trigger(u), u.isDefaultPrevented() || ("ontouchstart" in document.documentElement && t("body").children().off("mouseover", null, t.noop), n[s].setAttribute("aria-expanded", "false"), t(h).removeClass(f), t(r).removeClass(f).trigger(t.Event(c.HIDDEN, l)))
                                    }
                                }
                            }
                    }, a._getParentFromElement = function(e) {
                        var n, i = P.getSelectorFromElement(e);
                        return i && (n = t(i)[0]), n || e.parentNode
                    }, a._dataApiKeydownHandler = function(e) {
                        if ((/input|textarea/i.test(e.target.tagName) ? !(32 === e.which || 27 !== e.which && (40 !== e.which && 38 !== e.which || t(e.target).closest(y).length)) : h.test(e.which)) && (e.preventDefault(), e.stopPropagation(), !this.disabled && !t(this).hasClass(u))) {
                            var n = a._getParentFromElement(this),
                                i = t(n).hasClass(f);
                            if ((i || 27 === e.which && 32 === e.which) && (!i || 27 !== e.which && 32 !== e.which)) {
                                var s = t(n).find(I).get();
                                if (0 !== s.length) {
                                    var r = s.indexOf(e.target);
                                    38 === e.which && r > 0 && r--, 40 === e.which && r < s.length - 1 && r++, r < 0 && (r = 0), s[r].focus()
                                }
                            } else {
                                if (27 === e.which) {
                                    var o = t(n).find(E)[0];
                                    t(o).trigger("focus")
                                }
                                t(this).trigger("click")
                            }
                        }
                    }, s(a, null, [{
                        key: "VERSION",
                        get: function() {
                            return "4.0.0"
                        }
                    }, {
                        key: "Default",
                        get: function() {
                            return O
                        }
                    }, {
                        key: "DefaultType",
                        get: function() {
                            return k
                        }
                    }]), a
                }();
            return t(document).on(c.KEYDOWN_DATA_API, E, L._dataApiKeydownHandler).on(c.KEYDOWN_DATA_API, y, L._dataApiKeydownHandler).on(c.CLICK_DATA_API + " " + c.KEYUP_DATA_API, L._clearMenus).on(c.CLICK_DATA_API, E, function(e) {
                e.preventDefault(), e.stopPropagation(), L._jQueryInterface.call(t(this), "toggle")
            }).on(c.CLICK_DATA_API, T, function(t) {
                t.stopPropagation()
            }), t.fn[e] = L._jQueryInterface, t.fn[e].Constructor = L, t.fn[e].noConflict = function() {
                return t.fn[e] = l, L._jQueryInterface
            }, L
        }(e),
        M = function(t) {
            var e = "modal",
                n = "bs.modal",
                i = "." + n,
                o = t.fn.modal,
                a = {
                    backdrop: !0,
                    keyboard: !0,
                    focus: !0,
                    show: !0
                },
                l = {
                    backdrop: "(boolean|string)",
                    keyboard: "boolean",
                    focus: "boolean",
                    show: "boolean"
                },
                h = {
                    HIDE: "hide" + i,
                    HIDDEN: "hidden" + i,
                    SHOW: "show" + i,
                    SHOWN: "shown" + i,
                    FOCUSIN: "focusin" + i,
                    RESIZE: "resize" + i,
                    CLICK_DISMISS: "click.dismiss" + i,
                    KEYDOWN_DISMISS: "keydown.dismiss" + i,
                    MOUSEUP_DISMISS: "mouseup.dismiss" + i,
                    MOUSEDOWN_DISMISS: "mousedown.dismiss" + i,
                    CLICK_DATA_API: "click" + i + ".data-api"
                },
                c = "modal-scrollbar-measure",
                u = "modal-backdrop",
                f = "modal-open",
                d = "fade",
                _ = "show",
                g = {
                    DIALOG: ".modal-dialog",
                    DATA_TOGGLE: '[data-toggle="modal"]',
                    DATA_DISMISS: '[data-dismiss="modal"]',
                    FIXED_CONTENT: ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
                    STICKY_CONTENT: ".sticky-top",
                    NAVBAR_TOGGLER: ".navbar-toggler"
                },
                p = function() {
                    function o(e, n) {
                        this._config = this._getConfig(n), this._element = e, this._dialog = t(e).find(g.DIALOG)[0], this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._originalBodyPadding = 0, this._scrollbarWidth = 0
                    }
                    var p = o.prototype;
                    return p.toggle = function(t) {
                        return this._isShown ? this.hide() : this.show(t)
                    }, p.show = function(e) {
                        var n = this;
                        if (!this._isTransitioning && !this._isShown) {
                            P.supportsTransitionEnd() && t(this._element).hasClass(d) && (this._isTransitioning = !0);
                            var i = t.Event(h.SHOW, {
                                relatedTarget: e
                            });
                            t(this._element).trigger(i), this._isShown || i.isDefaultPrevented() || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), this._adjustDialog(), t(document.body).addClass(f), this._setEscapeEvent(), this._setResizeEvent(), t(this._element).on(h.CLICK_DISMISS, g.DATA_DISMISS, function(t) {
                                return n.hide(t)
                            }), t(this._dialog).on(h.MOUSEDOWN_DISMISS, function() {
                                t(n._element).one(h.MOUSEUP_DISMISS, function(e) {
                                    t(e.target).is(n._element) && (n._ignoreBackdropClick = !0)
                                })
                            }), this._showBackdrop(function() {
                                return n._showElement(e)
                            }))
                        }
                    }, p.hide = function(e) {
                        var n = this;
                        if (e && e.preventDefault(), !this._isTransitioning && this._isShown) {
                            var i = t.Event(h.HIDE);
                            if (t(this._element).trigger(i), this._isShown && !i.isDefaultPrevented()) {
                                this._isShown = !1;
                                var s = P.supportsTransitionEnd() && t(this._element).hasClass(d);
                                s && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), t(document).off(h.FOCUSIN), t(this._element).removeClass(_), t(this._element).off(h.CLICK_DISMISS), t(this._dialog).off(h.MOUSEDOWN_DISMISS), s ? t(this._element).one(P.TRANSITION_END, function(t) {
                                    return n._hideModal(t)
                                }).emulateTransitionEnd(300) : this._hideModal()
                            }
                        }
                    }, p.dispose = function() {
                        t.removeData(this._element, n), t(window, document, this._element, this._backdrop).off(i), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._scrollbarWidth = null
                    }, p.handleUpdate = function() {
                        this._adjustDialog()
                    }, p._getConfig = function(t) {
                        return t = r({}, a, t), P.typeCheckConfig(e, t, l), t
                    }, p._showElement = function(e) {
                        var n = this,
                            i = P.supportsTransitionEnd() && t(this._element).hasClass(d);
                        this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.scrollTop = 0, i && P.reflow(this._element), t(this._element).addClass(_), this._config.focus && this._enforceFocus();
                        var s = t.Event(h.SHOWN, {
                                relatedTarget: e
                            }),
                            r = function() {
                                n._config.focus && n._element.focus(), n._isTransitioning = !1, t(n._element).trigger(s)
                            };
                        i ? t(this._dialog).one(P.TRANSITION_END, r).emulateTransitionEnd(300) : r()
                    }, p._enforceFocus = function() {
                        var e = this;
                        t(document).off(h.FOCUSIN).on(h.FOCUSIN, function(n) {
                            document !== n.target && e._element !== n.target && 0 === t(e._element).has(n.target).length && e._element.focus()
                        })
                    }, p._setEscapeEvent = function() {
                        var e = this;
                        this._isShown && this._config.keyboard ? t(this._element).on(h.KEYDOWN_DISMISS, function(t) {
                            27 === t.which && (t.preventDefault(), e.hide())
                        }) : this._isShown || t(this._element).off(h.KEYDOWN_DISMISS)
                    }, p._setResizeEvent = function() {
                        var e = this;
                        this._isShown ? t(window).on(h.RESIZE, function(t) {
                            return e.handleUpdate(t)
                        }) : t(window).off(h.RESIZE)
                    }, p._hideModal = function() {
                        var e = this;
                        this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._isTransitioning = !1, this._showBackdrop(function() {
                            t(document.body).removeClass(f), e._resetAdjustments(), e._resetScrollbar(), t(e._element).trigger(h.HIDDEN)
                        })
                    }, p._removeBackdrop = function() {
                        this._backdrop && (t(this._backdrop).remove(), this._backdrop = null)
                    }, p._showBackdrop = function(e) {
                        var n = this,
                            i = t(this._element).hasClass(d) ? d : "";
                        if (this._isShown && this._config.backdrop) {
                            var s = P.supportsTransitionEnd() && i;
                            if (this._backdrop = document.createElement("div"), this._backdrop.className = u, i && t(this._backdrop).addClass(i), t(this._backdrop).appendTo(document.body), t(this._element).on(h.CLICK_DISMISS, function(t) {
                                    n._ignoreBackdropClick ? n._ignoreBackdropClick = !1 : t.target === t.currentTarget && ("static" === n._config.backdrop ? n._element.focus() : n.hide())
                                }), s && P.reflow(this._backdrop), t(this._backdrop).addClass(_), !e) return;
                            if (!s) return void e();
                            t(this._backdrop).one(P.TRANSITION_END, e).emulateTransitionEnd(150)
                        } else if (!this._isShown && this._backdrop) {
                            t(this._backdrop).removeClass(_);
                            var r = function() {
                                n._removeBackdrop(), e && e()
                            };
                            P.supportsTransitionEnd() && t(this._element).hasClass(d) ? t(this._backdrop).one(P.TRANSITION_END, r).emulateTransitionEnd(150) : r()
                        } else e && e()
                    }, p._adjustDialog = function() {
                        var t = this._element.scrollHeight > document.documentElement.clientHeight;
                        !this._isBodyOverflowing && t && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !t && (this._element.style.paddingRight = this._scrollbarWidth + "px")
                    }, p._resetAdjustments = function() {
                        this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
                    }, p._checkScrollbar = function() {
                        var t = document.body.getBoundingClientRect();
                        this._isBodyOverflowing = t.left + t.right < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth()
                    }, p._setScrollbar = function() {
                        var e = this;
                        if (this._isBodyOverflowing) {
                            t(g.FIXED_CONTENT).each(function(n, i) {
                                var s = t(i)[0].style.paddingRight,
                                    r = t(i).css("padding-right");
                                t(i).data("padding-right", s).css("padding-right", parseFloat(r) + e._scrollbarWidth + "px")
                            }), t(g.STICKY_CONTENT).each(function(n, i) {
                                var s = t(i)[0].style.marginRight,
                                    r = t(i).css("margin-right");
                                t(i).data("margin-right", s).css("margin-right", parseFloat(r) - e._scrollbarWidth + "px")
                            }), t(g.NAVBAR_TOGGLER).each(function(n, i) {
                                var s = t(i)[0].style.marginRight,
                                    r = t(i).css("margin-right");
                                t(i).data("margin-right", s).css("margin-right", parseFloat(r) + e._scrollbarWidth + "px")
                            });
                            var n = document.body.style.paddingRight,
                                i = t("body").css("padding-right");
                            t("body").data("padding-right", n).css("padding-right", parseFloat(i) + this._scrollbarWidth + "px")
                        }
                    }, p._resetScrollbar = function() {
                        t(g.FIXED_CONTENT).each(function(e, n) {
                            var i = t(n).data("padding-right");
                            "undefined" != typeof i && t(n).css("padding-right", i).removeData("padding-right")
                        }), t(g.STICKY_CONTENT + ", " + g.NAVBAR_TOGGLER).each(function(e, n) {
                            var i = t(n).data("margin-right");
                            "undefined" != typeof i && t(n).css("margin-right", i).removeData("margin-right")
                        });
                        var e = t("body").data("padding-right");
                        "undefined" != typeof e && t("body").css("padding-right", e).removeData("padding-right")
                    }, p._getScrollbarWidth = function() {
                        var t = document.createElement("div");
                        t.className = c, document.body.appendChild(t);
                        var e = t.getBoundingClientRect().width - t.clientWidth;
                        return document.body.removeChild(t), e
                    }, o._jQueryInterface = function(e, i) {
                        return this.each(function() {
                            var s = t(this).data(n),
                                a = r({}, o.Default, t(this).data(), "object" == typeof e && e);
                            if (s || (s = new o(this, a), t(this).data(n, s)), "string" == typeof e) {
                                if ("undefined" == typeof s[e]) throw new TypeError('No method named "' + e + '"');
                                s[e](i)
                            } else a.show && s.show(i)
                        })
                    }, s(o, null, [{
                        key: "VERSION",
                        get: function() {
                            return "4.0.0"
                        }
                    }, {
                        key: "Default",
                        get: function() {
                            return a
                        }
                    }]), o
                }();
            return t(document).on(h.CLICK_DATA_API, g.DATA_TOGGLE, function(e) {
                var i, s = this,
                    o = P.getSelectorFromElement(this);
                o && (i = t(o)[0]);
                var a = t(i).data(n) ? "toggle" : r({}, t(i).data(), t(this).data());
                "A" !== this.tagName && "AREA" !== this.tagName || e.preventDefault();
                var l = t(i).one(h.SHOW, function(e) {
                    e.isDefaultPrevented() || l.one(h.HIDDEN, function() {
                        t(s).is(":visible") && s.focus()
                    })
                });
                p._jQueryInterface.call(t(i), a, this)
            }), t.fn.modal = p._jQueryInterface, t.fn.modal.Constructor = p, t.fn.modal.noConflict = function() {
                return t.fn.modal = o, p._jQueryInterface
            }, p
        }(e),
        U = function(t) {
            var e = "tooltip",
                i = "bs.tooltip",
                o = "." + i,
                a = t.fn[e],
                l = new RegExp("(^|\\s)bs-tooltip\\S+", "g"),
                h = {
                    animation: "boolean",
                    template: "string",
                    title: "(string|element|function)",
                    trigger: "string",
                    delay: "(number|object)",
                    html: "boolean",
                    selector: "(string|boolean)",
                    placement: "(string|function)",
                    offset: "(number|string)",
                    container: "(string|element|boolean)",
                    fallbackPlacement: "(string|array)",
                    boundary: "(string|element)"
                },
                c = {
                    AUTO: "auto",
                    TOP: "top",
                    RIGHT: "right",
                    BOTTOM: "bottom",
                    LEFT: "left"
                },
                u = {
                    animation: !0,
                    template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
                    trigger: "hover focus",
                    title: "",
                    delay: 0,
                    html: !1,
                    selector: !1,
                    placement: "top",
                    offset: 0,
                    container: !1,
                    fallbackPlacement: "flip",
                    boundary: "scrollParent"
                },
                f = "show",
                d = "out",
                _ = {
                    HIDE: "hide" + o,
                    HIDDEN: "hidden" + o,
                    SHOW: "show" + o,
                    SHOWN: "shown" + o,
                    INSERTED: "inserted" + o,
                    CLICK: "click" + o,
                    FOCUSIN: "focusin" + o,
                    FOCUSOUT: "focusout" + o,
                    MOUSEENTER: "mouseenter" + o,
                    MOUSELEAVE: "mouseleave" + o
                },
                g = "fade",
                p = "show",
                m = ".tooltip-inner",
                v = ".arrow",
                E = "hover",
                T = "focus",
                y = "click",
                C = "manual",
                I = function() {
                    function a(t, e) {
                        if ("undefined" == typeof n) throw new TypeError("Bootstrap tooltips require Popper.js (https://popper.js.org)");
                        this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this.element = t, this.config = this._getConfig(e), this.tip = null, this._setListeners()
                    }
                    var I = a.prototype;
                    return I.enable = function() {
                        this._isEnabled = !0
                    }, I.disable = function() {
                        this._isEnabled = !1
                    }, I.toggleEnabled = function() {
                        this._isEnabled = !this._isEnabled
                    }, I.toggle = function(e) {
                        if (this._isEnabled)
                            if (e) {
                                var n = this.constructor.DATA_KEY,
                                    i = t(e.currentTarget).data(n);
                                i || (i = new this.constructor(e.currentTarget, this._getDelegateConfig()), t(e.currentTarget).data(n, i)), i._activeTrigger.click = !i._activeTrigger.click, i._isWithActiveTrigger() ? i._enter(null, i) : i._leave(null, i)
                            } else {
                                if (t(this.getTipElement()).hasClass(p)) return void this._leave(null, this);
                                this._enter(null, this)
                            }
                    }, I.dispose = function() {
                        clearTimeout(this._timeout), t.removeData(this.element, this.constructor.DATA_KEY), t(this.element).off(this.constructor.EVENT_KEY), t(this.element).closest(".modal").off("hide.bs.modal"), this.tip && t(this.tip).remove(), this._isEnabled = null, this._timeout = null, this._hoverState = null, this._activeTrigger = null, null !== this._popper && this._popper.destroy(), this._popper = null, this.element = null, this.config = null, this.tip = null
                    }, I.show = function() {
                        var e = this;
                        if ("none" === t(this.element).css("display")) throw new Error("Please use show on visible elements");
                        var i = t.Event(this.constructor.Event.SHOW);
                        if (this.isWithContent() && this._isEnabled) {
                            t(this.element).trigger(i);
                            var s = t.contains(this.element.ownerDocument.documentElement, this.element);
                            if (i.isDefaultPrevented() || !s) return;
                            var r = this.getTipElement(),
                                o = P.getUID(this.constructor.NAME);
                            r.setAttribute("id", o), this.element.setAttribute("aria-describedby", o), this.setContent(), this.config.animation && t(r).addClass(g);
                            var l = "function" == typeof this.config.placement ? this.config.placement.call(this, r, this.element) : this.config.placement,
                                h = this._getAttachment(l);
                            this.addAttachmentClass(h);
                            var c = !1 === this.config.container ? document.body : t(this.config.container);
                            t(r).data(this.constructor.DATA_KEY, this), t.contains(this.element.ownerDocument.documentElement, this.tip) || t(r).appendTo(c), t(this.element).trigger(this.constructor.Event.INSERTED), this._popper = new n(this.element, r, {
                                placement: h,
                                modifiers: {
                                    offset: {
                                        offset: this.config.offset
                                    },
                                    flip: {
                                        behavior: this.config.fallbackPlacement
                                    },
                                    arrow: {
                                        element: v
                                    },
                                    preventOverflow: {
                                        boundariesElement: this.config.boundary
                                    }
                                },
                                onCreate: function(t) {
                                    t.originalPlacement !== t.placement && e._handlePopperPlacementChange(t)
                                },
                                onUpdate: function(t) {
                                    e._handlePopperPlacementChange(t)
                                }
                            }), t(r).addClass(p), "ontouchstart" in document.documentElement && t("body").children().on("mouseover", null, t.noop);
                            var u = function() {
                                e.config.animation && e._fixTransition();
                                var n = e._hoverState;
                                e._hoverState = null, t(e.element).trigger(e.constructor.Event.SHOWN), n === d && e._leave(null, e)
                            };
                            P.supportsTransitionEnd() && t(this.tip).hasClass(g) ? t(this.tip).one(P.TRANSITION_END, u).emulateTransitionEnd(a._TRANSITION_DURATION) : u()
                        }
                    }, I.hide = function(e) {
                        var n = this,
                            i = this.getTipElement(),
                            s = t.Event(this.constructor.Event.HIDE),
                            r = function() {
                                n._hoverState !== f && i.parentNode && i.parentNode.removeChild(i), n._cleanTipClass(), n.element.removeAttribute("aria-describedby"), t(n.element).trigger(n.constructor.Event.HIDDEN), null !== n._popper && n._popper.destroy(), e && e()
                            };
                        t(this.element).trigger(s), s.isDefaultPrevented() || (t(i).removeClass(p), "ontouchstart" in document.documentElement && t("body").children().off("mouseover", null, t.noop), this._activeTrigger[y] = !1, this._activeTrigger[T] = !1, this._activeTrigger[E] = !1, P.supportsTransitionEnd() && t(this.tip).hasClass(g) ? t(i).one(P.TRANSITION_END, r).emulateTransitionEnd(150) : r(), this._hoverState = "")
                    }, I.update = function() {
                        null !== this._popper && this._popper.scheduleUpdate()
                    }, I.isWithContent = function() {
                        return Boolean(this.getTitle())
                    }, I.addAttachmentClass = function(e) {
                        t(this.getTipElement()).addClass("bs-tooltip-" + e)
                    }, I.getTipElement = function() {
                        return this.tip = this.tip || t(this.config.template)[0], this.tip
                    }, I.setContent = function() {
                        var e = t(this.getTipElement());
                        this.setElementContent(e.find(m), this.getTitle()), e.removeClass(g + " " + p)
                    }, I.setElementContent = function(e, n) {
                        var i = this.config.html;
                        "object" == typeof n && (n.nodeType || n.jquery) ? i ? t(n).parent().is(e) || e.empty().append(n) : e.text(t(n).text()) : e[i ? "html" : "text"](n)
                    }, I.getTitle = function() {
                        var t = this.element.getAttribute("data-original-title");
                        return t || (t = "function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title), t
                    }, I._getAttachment = function(t) {
                        return c[t.toUpperCase()]
                    }, I._setListeners = function() {
                        var e = this;
                        this.config.trigger.split(" ").forEach(function(n) {
                            if ("click" === n) t(e.element).on(e.constructor.Event.CLICK, e.config.selector, function(t) {
                                return e.toggle(t)
                            });
                            else if (n !== C) {
                                var i = n === E ? e.constructor.Event.MOUSEENTER : e.constructor.Event.FOCUSIN,
                                    s = n === E ? e.constructor.Event.MOUSELEAVE : e.constructor.Event.FOCUSOUT;
                                t(e.element).on(i, e.config.selector, function(t) {
                                    return e._enter(t)
                                }).on(s, e.config.selector, function(t) {
                                    return e._leave(t)
                                })
                            }
                            t(e.element).closest(".modal").on("hide.bs.modal", function() {
                                return e.hide()
                            })
                        }), this.config.selector ? this.config = r({}, this.config, {
                            trigger: "manual",
                            selector: ""
                        }) : this._fixTitle()
                    }, I._fixTitle = function() {
                        var t = typeof this.element.getAttribute("data-original-title");
                        (this.element.getAttribute("title") || "string" !== t) && (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""))
                    }, I._enter = function(e, n) {
                        var i = this.constructor.DATA_KEY;
                        (n = n || t(e.currentTarget).data(i)) || (n = new this.constructor(e.currentTarget, this._getDelegateConfig()), t(e.currentTarget).data(i, n)), e && (n._activeTrigger["focusin" === e.type ? T : E] = !0), t(n.getTipElement()).hasClass(p) || n._hoverState === f ? n._hoverState = f : (clearTimeout(n._timeout), n._hoverState = f, n.config.delay && n.config.delay.show ? n._timeout = setTimeout(function() {
                            n._hoverState === f && n.show()
                        }, n.config.delay.show) : n.show())
                    }, I._leave = function(e, n) {
                        var i = this.constructor.DATA_KEY;
                        (n = n || t(e.currentTarget).data(i)) || (n = new this.constructor(e.currentTarget, this._getDelegateConfig()), t(e.currentTarget).data(i, n)), e && (n._activeTrigger["focusout" === e.type ? T : E] = !1), n._isWithActiveTrigger() || (clearTimeout(n._timeout), n._hoverState = d, n.config.delay && n.config.delay.hide ? n._timeout = setTimeout(function() {
                            n._hoverState === d && n.hide()
                        }, n.config.delay.hide) : n.hide())
                    }, I._isWithActiveTrigger = function() {
                        for (var t in this._activeTrigger)
                            if (this._activeTrigger[t]) return !0;
                        return !1
                    }, I._getConfig = function(n) {
                        return "number" == typeof(n = r({}, this.constructor.Default, t(this.element).data(), n)).delay && (n.delay = {
                            show: n.delay,
                            hide: n.delay
                        }), "number" == typeof n.title && (n.title = n.title.toString()), "number" == typeof n.content && (n.content = n.content.toString()), P.typeCheckConfig(e, n, this.constructor.DefaultType), n
                    }, I._getDelegateConfig = function() {
                        var t = {};
                        if (this.config)
                            for (var e in this.config) this.constructor.Default[e] !== this.config[e] && (t[e] = this.config[e]);
                        return t
                    }, I._cleanTipClass = function() {
                        var e = t(this.getTipElement()),
                            n = e.attr("class").match(l);
                        null !== n && n.length > 0 && e.removeClass(n.join(""))
                    }, I._handlePopperPlacementChange = function(t) {
                        this._cleanTipClass(), this.addAttachmentClass(this._getAttachment(t.placement))
                    }, I._fixTransition = function() {
                        var e = this.getTipElement(),
                            n = this.config.animation;
                        null === e.getAttribute("x-placement") && (t(e).removeClass(g), this.config.animation = !1, this.hide(), this.show(), this.config.animation = n)
                    }, a._jQueryInterface = function(e) {
                        return this.each(function() {
                            var n = t(this).data(i),
                                s = "object" == typeof e && e;
                            if ((n || !/dispose|hide/.test(e)) && (n || (n = new a(this, s), t(this).data(i, n)), "string" == typeof e)) {
                                if ("undefined" == typeof n[e]) throw new TypeError('No method named "' + e + '"');
                                n[e]()
                            }
                        })
                    }, s(a, null, [{
                        key: "VERSION",
                        get: function() {
                            return "4.0.0"
                        }
                    }, {
                        key: "Default",
                        get: function() {
                            return u
                        }
                    }, {
                        key: "NAME",
                        get: function() {
                            return e
                        }
                    }, {
                        key: "DATA_KEY",
                        get: function() {
                            return i
                        }
                    }, {
                        key: "Event",
                        get: function() {
                            return _
                        }
                    }, {
                        key: "EVENT_KEY",
                        get: function() {
                            return o
                        }
                    }, {
                        key: "DefaultType",
                        get: function() {
                            return h
                        }
                    }]), a
                }();
            return t.fn[e] = I._jQueryInterface, t.fn[e].Constructor = I, t.fn[e].noConflict = function() {
                return t.fn[e] = a, I._jQueryInterface
            }, I
        }(e),
        x = function(t) {
            var e = "popover",
                n = "bs.popover",
                i = "." + n,
                o = t.fn[e],
                a = new RegExp("(^|\\s)bs-popover\\S+", "g"),
                l = r({}, U.Default, {
                    placement: "right",
                    trigger: "click",
                    content: "",
                    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
                }),
                h = r({}, U.DefaultType, {
                    content: "(string|element|function)"
                }),
                c = "fade",
                u = "show",
                f = ".popover-header",
                d = ".popover-body",
                _ = {
                    HIDE: "hide" + i,
                    HIDDEN: "hidden" + i,
                    SHOW: "show" + i,
                    SHOWN: "shown" + i,
                    INSERTED: "inserted" + i,
                    CLICK: "click" + i,
                    FOCUSIN: "focusin" + i,
                    FOCUSOUT: "focusout" + i,
                    MOUSEENTER: "mouseenter" + i,
                    MOUSELEAVE: "mouseleave" + i
                },
                g = function(r) {
                    var o, g;

                    function p() {
                        return r.apply(this, arguments) || this
                    }
                    g = r, (o = p).prototype = Object.create(g.prototype), o.prototype.constructor = o, o.__proto__ = g;
                    var m = p.prototype;
                    return m.isWithContent = function() {
                        return this.getTitle() || this._getContent()
                    }, m.addAttachmentClass = function(e) {
                        t(this.getTipElement()).addClass("bs-popover-" + e)
                    }, m.getTipElement = function() {
                        return this.tip = this.tip || t(this.config.template)[0], this.tip
                    }, m.setContent = function() {
                        var e = t(this.getTipElement());
                        this.setElementContent(e.find(f), this.getTitle());
                        var n = this._getContent();
                        "function" == typeof n && (n = n.call(this.element)), this.setElementContent(e.find(d), n), e.removeClass(c + " " + u)
                    }, m._getContent = function() {
                        return this.element.getAttribute("data-content") || this.config.content
                    }, m._cleanTipClass = function() {
                        var e = t(this.getTipElement()),
                            n = e.attr("class").match(a);
                        null !== n && n.length > 0 && e.removeClass(n.join(""))
                    }, p._jQueryInterface = function(e) {
                        return this.each(function() {
                            var i = t(this).data(n),
                                s = "object" == typeof e ? e : null;
                            if ((i || !/destroy|hide/.test(e)) && (i || (i = new p(this, s), t(this).data(n, i)), "string" == typeof e)) {
                                if ("undefined" == typeof i[e]) throw new TypeError('No method named "' + e + '"');
                                i[e]()
                            }
                        })
                    }, s(p, null, [{
                        key: "VERSION",
                        get: function() {
                            return "4.0.0"
                        }
                    }, {
                        key: "Default",
                        get: function() {
                            return l
                        }
                    }, {
                        key: "NAME",
                        get: function() {
                            return e
                        }
                    }, {
                        key: "DATA_KEY",
                        get: function() {
                            return n
                        }
                    }, {
                        key: "Event",
                        get: function() {
                            return _
                        }
                    }, {
                        key: "EVENT_KEY",
                        get: function() {
                            return i
                        }
                    }, {
                        key: "DefaultType",
                        get: function() {
                            return h
                        }
                    }]), p
                }(U);
            return t.fn[e] = g._jQueryInterface, t.fn[e].Constructor = g, t.fn[e].noConflict = function() {
                return t.fn[e] = o, g._jQueryInterface
            }, g
        }(e),
        K = function(t) {
            var e = "scrollspy",
                n = "bs.scrollspy",
                i = "." + n,
                o = t.fn[e],
                a = {
                    offset: 10,
                    method: "auto",
                    target: ""
                },
                l = {
                    offset: "number",
                    method: "string",
                    target: "(string|element)"
                },
                h = {
                    ACTIVATE: "activate" + i,
                    SCROLL: "scroll" + i,
                    LOAD_DATA_API: "load" + i + ".data-api"
                },
                c = "dropdown-item",
                u = "active",
                f = {
                    DATA_SPY: '[data-spy="scroll"]',
                    ACTIVE: ".active",
                    NAV_LIST_GROUP: ".nav, .list-group",
                    NAV_LINKS: ".nav-link",
                    NAV_ITEMS: ".nav-item",
                    LIST_ITEMS: ".list-group-item",
                    DROPDOWN: ".dropdown",
                    DROPDOWN_ITEMS: ".dropdown-item",
                    DROPDOWN_TOGGLE: ".dropdown-toggle"
                },
                d = "offset",
                _ = "position",
                g = function() {
                    function o(e, n) {
                        var i = this;
                        this._element = e, this._scrollElement = "BODY" === e.tagName ? window : e, this._config = this._getConfig(n), this._selector = this._config.target + " " + f.NAV_LINKS + "," + this._config.target + " " + f.LIST_ITEMS + "," + this._config.target + " " + f.DROPDOWN_ITEMS, this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, t(this._scrollElement).on(h.SCROLL, function(t) {
                            return i._process(t)
                        }), this.refresh(), this._process()
                    }
                    var g = o.prototype;
                    return g.refresh = function() {
                        var e = this,
                            n = this._scrollElement === this._scrollElement.window ? d : _,
                            i = "auto" === this._config.method ? n : this._config.method,
                            s = i === _ ? this._getScrollTop() : 0;
                        this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), t.makeArray(t(this._selector)).map(function(e) {
                            var n, r = P.getSelectorFromElement(e);
                            if (r && (n = t(r)[0]), n) {
                                var o = n.getBoundingClientRect();
                                if (o.width || o.height) return [t(n)[i]().top + s, r]
                            }
                            return null
                        }).filter(function(t) {
                            return t
                        }).sort(function(t, e) {
                            return t[0] - e[0]
                        }).forEach(function(t) {
                            e._offsets.push(t[0]), e._targets.push(t[1])
                        })
                    }, g.dispose = function() {
                        t.removeData(this._element, n), t(this._scrollElement).off(i), this._element = null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null
                    }, g._getConfig = function(n) {
                        if ("string" != typeof(n = r({}, a, n)).target) {
                            var i = t(n.target).attr("id");
                            i || (i = P.getUID(e), t(n.target).attr("id", i)), n.target = "#" + i
                        }
                        return P.typeCheckConfig(e, n, l), n
                    }, g._getScrollTop = function() {
                        return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop
                    }, g._getScrollHeight = function() {
                        return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
                    }, g._getOffsetHeight = function() {
                        return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height
                    }, g._process = function() {
                        var t = this._getScrollTop() + this._config.offset,
                            e = this._getScrollHeight(),
                            n = this._config.offset + e - this._getOffsetHeight();
                        if (this._scrollHeight !== e && this.refresh(), t >= n) {
                            var i = this._targets[this._targets.length - 1];
                            this._activeTarget !== i && this._activate(i)
                        } else {
                            if (this._activeTarget && t < this._offsets[0] && this._offsets[0] > 0) return this._activeTarget = null, void this._clear();
                            for (var s = this._offsets.length; s--;) {
                                this._activeTarget !== this._targets[s] && t >= this._offsets[s] && ("undefined" == typeof this._offsets[s + 1] || t < this._offsets[s + 1]) && this._activate(this._targets[s])
                            }
                        }
                    }, g._activate = function(e) {
                        this._activeTarget = e, this._clear();
                        var n = this._selector.split(",");
                        n = n.map(function(t) {
                            return t + '[data-target="' + e + '"],' + t + '[href="' + e + '"]'
                        });
                        var i = t(n.join(","));
                        i.hasClass(c) ? (i.closest(f.DROPDOWN).find(f.DROPDOWN_TOGGLE).addClass(u), i.addClass(u)) : (i.addClass(u), i.parents(f.NAV_LIST_GROUP).prev(f.NAV_LINKS + ", " + f.LIST_ITEMS).addClass(u), i.parents(f.NAV_LIST_GROUP).prev(f.NAV_ITEMS).children(f.NAV_LINKS).addClass(u)), t(this._scrollElement).trigger(h.ACTIVATE, {
                            relatedTarget: e
                        })
                    }, g._clear = function() {
                        t(this._selector).filter(f.ACTIVE).removeClass(u)
                    }, o._jQueryInterface = function(e) {
                        return this.each(function() {
                            var i = t(this).data(n);
                            if (i || (i = new o(this, "object" == typeof e && e), t(this).data(n, i)), "string" == typeof e) {
                                if ("undefined" == typeof i[e]) throw new TypeError('No method named "' + e + '"');
                                i[e]()
                            }
                        })
                    }, s(o, null, [{
                        key: "VERSION",
                        get: function() {
                            return "4.0.0"
                        }
                    }, {
                        key: "Default",
                        get: function() {
                            return a
                        }
                    }]), o
                }();
            return t(window).on(h.LOAD_DATA_API, function() {
                for (var e = t.makeArray(t(f.DATA_SPY)), n = e.length; n--;) {
                    var i = t(e[n]);
                    g._jQueryInterface.call(i, i.data())
                }
            }), t.fn[e] = g._jQueryInterface, t.fn[e].Constructor = g, t.fn[e].noConflict = function() {
                return t.fn[e] = o, g._jQueryInterface
            }, g
        }(e),
        V = function(t) {
            var e = "bs.tab",
                n = "." + e,
                i = t.fn.tab,
                r = {
                    HIDE: "hide" + n,
                    HIDDEN: "hidden" + n,
                    SHOW: "show" + n,
                    SHOWN: "shown" + n,
                    CLICK_DATA_API: "click.bs.tab.data-api"
                },
                o = "dropdown-menu",
                a = "active",
                l = "disabled",
                h = "fade",
                c = "show",
                u = ".dropdown",
                f = ".nav, .list-group",
                d = ".active",
                _ = "> li > .active",
                g = '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
                p = ".dropdown-toggle",
                m = "> .dropdown-menu .active",
                v = function() {
                    function n(t) {
                        this._element = t
                    }
                    var i = n.prototype;
                    return i.show = function() {
                        var e = this;
                        if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && t(this._element).hasClass(a) || t(this._element).hasClass(l))) {
                            var n, i, s = t(this._element).closest(f)[0],
                                o = P.getSelectorFromElement(this._element);
                            if (s) {
                                var h = "UL" === s.nodeName ? _ : d;
                                i = (i = t.makeArray(t(s).find(h)))[i.length - 1]
                            }
                            var c = t.Event(r.HIDE, {
                                    relatedTarget: this._element
                                }),
                                u = t.Event(r.SHOW, {
                                    relatedTarget: i
                                });
                            if (i && t(i).trigger(c), t(this._element).trigger(u), !u.isDefaultPrevented() && !c.isDefaultPrevented()) {
                                o && (n = t(o)[0]), this._activate(this._element, s);
                                var g = function() {
                                    var n = t.Event(r.HIDDEN, {
                                            relatedTarget: e._element
                                        }),
                                        s = t.Event(r.SHOWN, {
                                            relatedTarget: i
                                        });
                                    t(i).trigger(n), t(e._element).trigger(s)
                                };
                                n ? this._activate(n, n.parentNode, g) : g()
                            }
                        }
                    }, i.dispose = function() {
                        t.removeData(this._element, e), this._element = null
                    }, i._activate = function(e, n, i) {
                        var s = this,
                            r = ("UL" === n.nodeName ? t(n).find(_) : t(n).children(d))[0],
                            o = i && P.supportsTransitionEnd() && r && t(r).hasClass(h),
                            a = function() {
                                return s._transitionComplete(e, r, i)
                            };
                        r && o ? t(r).one(P.TRANSITION_END, a).emulateTransitionEnd(150) : a()
                    }, i._transitionComplete = function(e, n, i) {
                        if (n) {
                            t(n).removeClass(c + " " + a);
                            var s = t(n.parentNode).find(m)[0];
                            s && t(s).removeClass(a), "tab" === n.getAttribute("role") && n.setAttribute("aria-selected", !1)
                        }
                        if (t(e).addClass(a), "tab" === e.getAttribute("role") && e.setAttribute("aria-selected", !0), P.reflow(e), t(e).addClass(c), e.parentNode && t(e.parentNode).hasClass(o)) {
                            var r = t(e).closest(u)[0];
                            r && t(r).find(p).addClass(a), e.setAttribute("aria-expanded", !0)
                        }
                        i && i()
                    }, n._jQueryInterface = function(i) {
                        return this.each(function() {
                            var s = t(this),
                                r = s.data(e);
                            if (r || (r = new n(this), s.data(e, r)), "string" == typeof i) {
                                if ("undefined" == typeof r[i]) throw new TypeError('No method named "' + i + '"');
                                r[i]()
                            }
                        })
                    }, s(n, null, [{
                        key: "VERSION",
                        get: function() {
                            return "4.0.0"
                        }
                    }]), n
                }();
            return t(document).on(r.CLICK_DATA_API, g, function(e) {
                e.preventDefault(), v._jQueryInterface.call(t(this), "show")
            }), t.fn.tab = v._jQueryInterface, t.fn.tab.Constructor = v, t.fn.tab.noConflict = function() {
                return t.fn.tab = i, v._jQueryInterface
            }, v
        }(e);
    ! function(t) {
        if ("undefined" == typeof t) throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
        var e = t.fn.jquery.split(" ")[0].split(".");
        if (e[0] < 2 && e[1] < 9 || 1 === e[0] && 9 === e[1] && e[2] < 1 || e[0] >= 4) throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")
    }(e), t.Util = P, t.Alert = L, t.Button = R, t.Carousel = j, t.Collapse = H, t.Dropdown = W, t.Modal = M, t.Popover = x, t.Scrollspy = K, t.Tab = V, t.Tooltip = U, Object.defineProperty(t, "__esModule", {
        value: !0
    })
});
//# sourceMappingURL=bootstrap.min.js.map
/*! lazysizes - v5.3.2 */

! function(e) {
    var t = function(u, D, f) {
        "use strict";
        var k, H;
        if (function() {
                var e;
                var t = {
                    lazyClass: "lazyload",
                    loadedClass: "lazyloaded",
                    loadingClass: "lazyloading",
                    preloadClass: "lazypreload",
                    errorClass: "lazyerror",
                    autosizesClass: "lazyautosizes",
                    fastLoadedClass: "ls-is-cached",
                    iframeLoadMode: 0,
                    srcAttr: "data-src",
                    srcsetAttr: "data-srcset",
                    sizesAttr: "data-sizes",
                    minSize: 40,
                    customMedia: {},
                    init: true,
                    expFactor: 1.5,
                    hFac: .8,
                    loadMode: 2,
                    loadHidden: true,
                    ricTimeout: 0,
                    throttleDelay: 125
                };
                H = u.lazySizesConfig || u.lazysizesConfig || {};
                for (e in t) {
                    if (!(e in H)) {
                        H[e] = t[e]
                    }
                }
            }(), !D || !D.getElementsByClassName) {
            return {
                init: function() {},
                cfg: H,
                noSupport: true
            }
        }
        var O = D.documentElement,
            i = u.HTMLPictureElement,
            P = "addEventListener",
            $ = "getAttribute",
            q = u[P].bind(u),
            I = u.setTimeout,
            U = u.requestAnimationFrame || I,
            o = u.requestIdleCallback,
            j = /^picture$/i,
            r = ["load", "error", "lazyincluded", "_lazyloaded"],
            a = {},
            G = Array.prototype.forEach,
            J = function(e, t) {
                if (!a[t]) {
                    a[t] = new RegExp("(\\s|^)" + t + "(\\s|$)")
                }
                return a[t].test(e[$]("class") || "") && a[t]
            },
            K = function(e, t) {
                if (!J(e, t)) {
                    e.setAttribute("class", (e[$]("class") || "").trim() + " " + t)
                }
            },
            Q = function(e, t) {
                var a;
                if (a = J(e, t)) {
                    e.setAttribute("class", (e[$]("class") || "").replace(a, " "))
                }
            },
            V = function(t, a, e) {
                var i = e ? P : "removeEventListener";
                if (e) {
                    V(t, a)
                }
                r.forEach(function(e) {
                    t[i](e, a)
                })
            },
            X = function(e, t, a, i, r) {
                var n = D.createEvent("Event");
                if (!a) {
                    a = {}
                }
                a.instance = k;
                n.initEvent(t, !i, !r);
                n.detail = a;
                e.dispatchEvent(n);
                return n
            },
            Y = function(e, t) {
                var a;
                if (!i && (a = u.picturefill || H.pf)) {
                    if (t && t.src && !e[$]("srcset")) {
                        e.setAttribute("srcset", t.src)
                    }
                    a({
                        reevaluate: true,
                        elements: [e]
                    })
                } else if (t && t.src) {
                    e.src = t.src
                }
            },
            Z = function(e, t) {
                return (getComputedStyle(e, null) || {})[t]
            },
            s = function(e, t, a) {
                a = a || e.offsetWidth;
                while (a < H.minSize && t && !e._lazysizesWidth) {
                    a = t.offsetWidth;
                    t = t.parentNode
                }
                return a
            },
            ee = function() {
                var a, i;
                var t = [];
                var r = [];
                var n = t;
                var s = function() {
                    var e = n;
                    n = t.length ? r : t;
                    a = true;
                    i = false;
                    while (e.length) {
                        e.shift()()
                    }
                    a = false
                };
                var e = function(e, t) {
                    if (a && !t) {
                        e.apply(this, arguments)
                    } else {
                        n.push(e);
                        if (!i) {
                            i = true;
                            (D.hidden ? I : U)(s)
                        }
                    }
                };
                e._lsFlush = s;
                return e
            }(),
            te = function(a, e) {
                return e ? function() {
                    ee(a)
                } : function() {
                    var e = this;
                    var t = arguments;
                    ee(function() {
                        a.apply(e, t)
                    })
                }
            },
            ae = function(e) {
                var a;
                var i = 0;
                var r = H.throttleDelay;
                var n = H.ricTimeout;
                var t = function() {
                    a = false;
                    i = f.now();
                    e()
                };
                var s = o && n > 49 ? function() {
                    o(t, {
                        timeout: n
                    });
                    if (n !== H.ricTimeout) {
                        n = H.ricTimeout
                    }
                } : te(function() {
                    I(t)
                }, true);
                return function(e) {
                    var t;
                    if (e = e === true) {
                        n = 33
                    }
                    if (a) {
                        return
                    }
                    a = true;
                    t = r - (f.now() - i);
                    if (t < 0) {
                        t = 0
                    }
                    if (e || t < 9) {
                        s()
                    } else {
                        I(s, t)
                    }
                }
            },
            ie = function(e) {
                var t, a;
                var i = 99;
                var r = function() {
                    t = null;
                    e()
                };
                var n = function() {
                    var e = f.now() - a;
                    if (e < i) {
                        I(n, i - e)
                    } else {
                        (o || r)(r)
                    }
                };
                return function() {
                    a = f.now();
                    if (!t) {
                        t = I(n, i)
                    }
                }
            },
            e = function() {
                var v, m, c, h, e;
                var y, z, g, p, C, b, A;
                var n = /^img$/i;
                var d = /^iframe$/i;
                var E = "onscroll" in u && !/(gle|ing)bot/.test(navigator.userAgent);
                var _ = 0;
                var w = 0;
                var M = 0;
                var N = -1;
                var L = function(e) {
                    M--;
                    if (!e || M < 0 || !e.target) {
                        M = 0
                    }
                };
                var x = function(e) {
                    if (A == null) {
                        A = Z(D.body, "visibility") == "hidden"
                    }
                    return A || !(Z(e.parentNode, "visibility") == "hidden" && Z(e, "visibility") == "hidden")
                };
                var W = function(e, t) {
                    var a;
                    var i = e;
                    var r = x(e);
                    g -= t;
                    b += t;
                    p -= t;
                    C += t;
                    while (r && (i = i.offsetParent) && i != D.body && i != O) {
                        r = (Z(i, "opacity") || 1) > 0;
                        if (r && Z(i, "overflow") != "visible") {
                            a = i.getBoundingClientRect();
                            r = C > a.left && p < a.right && b > a.top - 1 && g < a.bottom + 1
                        }
                    }
                    return r
                };
                var t = function() {
                    var e, t, a, i, r, n, s, o, l, u, f, c;
                    var d = k.elements;
                    if ((h = H.loadMode) && M < 8 && (e = d.length)) {
                        t = 0;
                        N++;
                        for (; t < e; t++) {
                            if (!d[t] || d[t]._lazyRace) {
                                continue
                            }
                            if (!E || k.prematureUnveil && k.prematureUnveil(d[t])) {
                                R(d[t]);
                                continue
                            }
                            if (!(o = d[t][$]("data-expand")) || !(n = o * 1)) {
                                n = w
                            }
                            if (!u) {
                                u = !H.expand || H.expand < 1 ? O.clientHeight > 500 && O.clientWidth > 500 ? 500 : 370 : H.expand;
                                k._defEx = u;
                                f = u * H.expFactor;
                                c = H.hFac;
                                A = null;
                                if (w < f && M < 1 && N > 2 && h > 2 && !D.hidden) {
                                    w = f;
                                    N = 0
                                } else if (h > 1 && N > 1 && M < 6) {
                                    w = u
                                } else {
                                    w = _
                                }
                            }
                            if (l !== n) {
                                y = innerWidth + n * c;
                                z = innerHeight + n;
                                s = n * -1;
                                l = n
                            }
                            a = d[t].getBoundingClientRect();
                            if ((b = a.bottom) >= s && (g = a.top) <= z && (C = a.right) >= s * c && (p = a.left) <= y && (b || C || p || g) && (H.loadHidden || x(d[t])) && (m && M < 3 && !o && (h < 3 || N < 4) || W(d[t], n))) {
                                R(d[t]);
                                r = true;
                                if (M > 9) {
                                    break
                                }
                            } else if (!r && m && !i && M < 4 && N < 4 && h > 2 && (v[0] || H.preloadAfterLoad) && (v[0] || !o && (b || C || p || g || d[t][$](H.sizesAttr) != "auto"))) {
                                i = v[0] || d[t]
                            }
                        }
                        if (i && !r) {
                            R(i)
                        }
                    }
                };
                var a = ae(t);
                var S = function(e) {
                    var t = e.target;
                    if (t._lazyCache) {
                        delete t._lazyCache;
                        return
                    }
                    L(e);
                    K(t, H.loadedClass);
                    Q(t, H.loadingClass);
                    V(t, B);
                    X(t, "lazyloaded")
                };
                var i = te(S);
                var B = function(e) {
                    i({
                        target: e.target
                    })
                };
                var T = function(e, t) {
                    var a = e.getAttribute("data-load-mode") || H.iframeLoadMode;
                    if (a == 0) {
                        e.contentWindow.location.replace(t)
                    } else if (a == 1) {
                        e.src = t
                    }
                };
                var F = function(e) {
                    var t;
                    var a = e[$](H.srcsetAttr);
                    if (t = H.customMedia[e[$]("data-media") || e[$]("media")]) {
                        e.setAttribute("media", t)
                    }
                    if (a) {
                        e.setAttribute("srcset", a)
                    }
                };
                var s = te(function(t, e, a, i, r) {
                    var n, s, o, l, u, f;
                    if (!(u = X(t, "lazybeforeunveil", e)).defaultPrevented) {
                        if (i) {
                            if (a) {
                                K(t, H.autosizesClass)
                            } else {
                                t.setAttribute("sizes", i)
                            }
                        }
                        s = t[$](H.srcsetAttr);
                        n = t[$](H.srcAttr);
                        if (r) {
                            o = t.parentNode;
                            l = o && j.test(o.nodeName || "")
                        }
                        f = e.firesLoad || "src" in t && (s || n || l);
                        u = {
                            target: t
                        };
                        K(t, H.loadingClass);
                        if (f) {
                            clearTimeout(c);
                            c = I(L, 2500);
                            V(t, B, true)
                        }
                        if (l) {
                            G.call(o.getElementsByTagName("source"), F)
                        }
                        if (s) {
                            t.setAttribute("srcset", s)
                        } else if (n && !l) {
                            if (d.test(t.nodeName)) {
                                T(t, n)
                            } else {
                                t.src = n
                            }
                        }
                        if (r && (s || l)) {
                            Y(t, {
                                src: n
                            })
                        }
                    }
                    if (t._lazyRace) {
                        delete t._lazyRace
                    }
                    Q(t, H.lazyClass);
                    ee(function() {
                        var e = t.complete && t.naturalWidth > 1;
                        if (!f || e) {
                            if (e) {
                                K(t, H.fastLoadedClass)
                            }
                            S(u);
                            t._lazyCache = true;
                            I(function() {
                                if ("_lazyCache" in t) {
                                    delete t._lazyCache
                                }
                            }, 9)
                        }
                        if (t.loading == "lazy") {
                            M--
                        }
                    }, true)
                });
                var R = function(e) {
                    if (e._lazyRace) {
                        return
                    }
                    var t;
                    var a = n.test(e.nodeName);
                    var i = a && (e[$](H.sizesAttr) || e[$]("sizes"));
                    var r = i == "auto";
                    if ((r || !m) && a && (e[$]("src") || e.srcset) && !e.complete && !J(e, H.errorClass) && J(e, H.lazyClass)) {
                        return
                    }
                    t = X(e, "lazyunveilread").detail;
                    if (r) {
                        re.updateElem(e, true, e.offsetWidth)
                    }
                    e._lazyRace = true;
                    M++;
                    s(e, t, r, i, a)
                };
                var r = ie(function() {
                    H.loadMode = 3;
                    a()
                });
                var o = function() {
                    if (H.loadMode == 3) {
                        H.loadMode = 2
                    }
                    r()
                };
                var l = function() {
                    if (m) {
                        return
                    }
                    if (f.now() - e < 999) {
                        I(l, 999);
                        return
                    }
                    m = true;
                    H.loadMode = 3;
                    a();
                    q("scroll", o, true)
                };
                return {
                    _: function() {
                        e = f.now();
                        k.elements = D.getElementsByClassName(H.lazyClass);
                        v = D.getElementsByClassName(H.lazyClass + " " + H.preloadClass);
                        q("scroll", a, true);
                        q("resize", a, true);
                        q("pageshow", function(e) {
                            if (e.persisted) {
                                var t = D.querySelectorAll("." + H.loadingClass);
                                if (t.length && t.forEach) {
                                    U(function() {
                                        t.forEach(function(e) {
                                            if (e.complete) {
                                                R(e)
                                            }
                                        })
                                    })
                                }
                            }
                        });
                        if (u.MutationObserver) {
                            new MutationObserver(a).observe(O, {
                                childList: true,
                                subtree: true,
                                attributes: true
                            })
                        } else {
                            O[P]("DOMNodeInserted", a, true);
                            O[P]("DOMAttrModified", a, true);
                            setInterval(a, 999)
                        }
                        q("hashchange", a, true);
                        ["focus", "mouseover", "click", "load", "transitionend", "animationend"].forEach(function(e) {
                            D[P](e, a, true)
                        });
                        if (/d$|^c/.test(D.readyState)) {
                            l()
                        } else {
                            q("load", l);
                            D[P]("DOMContentLoaded", a);
                            I(l, 2e4)
                        }
                        if (k.elements.length) {
                            t();
                            ee._lsFlush()
                        } else {
                            a()
                        }
                    },
                    checkElems: a,
                    unveil: R,
                    _aLSL: o
                }
            }(),
            re = function() {
                var a;
                var n = te(function(e, t, a, i) {
                    var r, n, s;
                    e._lazysizesWidth = i;
                    i += "px";
                    e.setAttribute("sizes", i);
                    if (j.test(t.nodeName || "")) {
                        r = t.getElementsByTagName("source");
                        for (n = 0, s = r.length; n < s; n++) {
                            r[n].setAttribute("sizes", i)
                        }
                    }
                    if (!a.detail.dataAttr) {
                        Y(e, a.detail)
                    }
                });
                var i = function(e, t, a) {
                    var i;
                    var r = e.parentNode;
                    if (r) {
                        a = s(e, r, a);
                        i = X(e, "lazybeforesizes", {
                            width: a,
                            dataAttr: !!t
                        });
                        if (!i.defaultPrevented) {
                            a = i.detail.width;
                            if (a && a !== e._lazysizesWidth) {
                                n(e, r, i, a)
                            }
                        }
                    }
                };
                var e = function() {
                    var e;
                    var t = a.length;
                    if (t) {
                        e = 0;
                        for (; e < t; e++) {
                            i(a[e])
                        }
                    }
                };
                var t = ie(e);
                return {
                    _: function() {
                        a = D.getElementsByClassName(H.autosizesClass);
                        q("resize", t)
                    },
                    checkElems: t,
                    updateElem: i
                }
            }(),
            t = function() {
                if (!t.i && D.getElementsByClassName) {
                    t.i = true;
                    re._();
                    e._()
                }
            };
        return I(function() {
            H.init && t()
        }), k = {
            cfg: H,
            autoSizer: re,
            loader: e,
            init: t,
            uP: Y,
            aC: K,
            rC: Q,
            hC: J,
            fire: X,
            gW: s,
            rAF: ee
        }
    }(e, e.document, Date);
    e.lazySizes = t, "object" == typeof module && module.exports && (module.exports = t)
}("undefined" != typeof window ? window : {});
/*! lazysizes - v5.3.2 */

! function(e, t) {
    var a = function() {
        t(e.lazySizes), e.removeEventListener("lazyunveilread", a, !0)
    };
    t = t.bind(null, e, e.document), "object" == typeof module && module.exports ? t(require("lazysizes")) : "function" == typeof define && define.amd ? define(["lazysizes"], t) : e.lazySizes ? a() : e.addEventListener("lazyunveilread", a, !0)
}(window, function(e, z, c) {
    "use strict";
    var g, y, b, f, r, l, s, v, m;
    e.addEventListener && (g = c.cfg, y = /\s+/g, b = /\s*\|\s+|\s+\|\s*/g, f = /^(.+?)(?:\s+\[\s*(.+?)\s*\])(?:\s+\[\s*(.+?)\s*\])?$/, r = /^\s*\(*\s*type\s*:\s*(.+?)\s*\)*\s*$/, l = /\(|\)|'/, s = {
        contain: 1,
        cover: 1
    }, v = function(e, t) {
        var a;
        t && ((a = t.match(r)) && a[1] ? e.setAttribute("type", a[1]) : e.setAttribute("media", g.customMedia[t] || t))
    }, m = function(e) {
        var t, a, r, i, s;
        e.target._lazybgset && (a = (t = e.target)._lazybgset, (r = t.currentSrc || t.src) && (i = l.test(r) ? JSON.stringify(r) : r, (s = c.fire(a, "bgsetproxy", {
            src: r,
            useSrc: i,
            fullSrc: null
        })).defaultPrevented || (a.style.backgroundImage = s.detail.fullSrc || "url(" + s.detail.useSrc + ")")), t._lazybgsetLoading && (c.fire(a, "_lazyloaded", {}, !1, !0), delete t._lazybgsetLoading))
    }, addEventListener("lazybeforeunveil", function(e) {
        var t, a, r, i, s, l, n, d, u, o;
        !e.defaultPrevented && (t = e.target.getAttribute("data-bgset")) && (u = e.target, (o = z.createElement("img")).alt = "", o._lazybgsetLoading = !0, e.detail.firesLoad = !0, a = t, r = u, i = o, s = z.createElement("picture"), l = r.getAttribute(g.sizesAttr), n = r.getAttribute("data-ratio"), d = r.getAttribute("data-optimumx"), r._lazybgset && r._lazybgset.parentNode == r && r.removeChild(r._lazybgset), Object.defineProperty(i, "_lazybgset", {
            value: r,
            writable: !0
        }), Object.defineProperty(r, "_lazybgset", {
            value: s,
            writable: !0
        }), a = a.replace(y, " ").split(b), s.style.display = "none", i.className = g.lazyClass, 1 != a.length || l || (l = "auto"), a.forEach(function(e) {
            var t, a = z.createElement("source");
            l && "auto" != l && a.setAttribute("sizes", l), (t = e.match(f)) ? (a.setAttribute(g.srcsetAttr, t[1]), v(a, t[2]), v(a, t[3])) : a.setAttribute(g.srcsetAttr, e), s.appendChild(a)
        }), l && (i.setAttribute(g.sizesAttr, l), r.removeAttribute(g.sizesAttr), r.removeAttribute("sizes")), d && i.setAttribute("data-optimumx", d), n && i.setAttribute("data-ratio", n), s.appendChild(i), r.appendChild(s), setTimeout(function() {
            c.loader.unveil(o), c.rAF(function() {
                c.fire(o, "_lazyloaded", {}, !0, !0), o.complete && m({
                    target: o
                })
            })
        }))
    }), z.addEventListener("load", m, !0), e.addEventListener("lazybeforesizes", function(e) {
        var t, a, r, i;
        e.detail.instance == c && e.target._lazybgset && e.detail.dataAttr && (t = e.target._lazybgset, r = t, i = (getComputedStyle(r) || {
            getPropertyValue: function() {}
        }).getPropertyValue("background-size"), !s[i] && s[r.style.backgroundSize] && (i = r.style.backgroundSize), s[a = i] && (e.target._lazysizesParentFit = a, c.rAF(function() {
            e.target.setAttribute("data-parent-fit", a), e.target._lazysizesParentFit && delete e.target._lazysizesParentFit
        })))
    }, !0), z.documentElement.addEventListener("lazybeforesizes", function(e) {
        var t, a;
        !e.defaultPrevented && e.target._lazybgset && e.detail.instance == c && (e.detail.width = (t = e.target._lazybgset, a = c.gW(t, t.parentNode), (!t._lazysizesWidth || a > t._lazysizesWidth) && (t._lazysizesWidth = a), t._lazysizesWidth))
    }))
});
/*!
 * jQuery Form Plugin
 * version: 3.32.0-2013.04.09
 * @requires jQuery v1.5 or later
 * Copyright (c) 2013 M. Alsup
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Project repository: https://github.com/malsup/form
 * Dual licensed under the MIT and GPL licenses.
 * https://github.com/malsup/form#copyright-and-license
 */
/*global ActiveXObject */
;
(function($) {
    "use strict";

    /*
        Usage Note:
        -----------
        Do not use both ajaxSubmit and ajaxForm on the same form.  These
        functions are mutually exclusive.  Use ajaxSubmit if you want
        to bind your own submit handler to the form.  For example,

        $(document).ready(function() {
            $('#myForm').on('submit', function(e) {
                e.preventDefault(); // <-- important
                $(this).ajaxSubmit({
                    target: '#output'
                });
            });
        });

        Use ajaxForm when you want the plugin to manage all the event binding
        for you.  For example,

        $(document).ready(function() {
            $('#myForm').ajaxForm({
                target: '#output'
            });
        });

        You can also use ajaxForm with delegation (requires jQuery v1.7+), so the
        form does not have to exist when you invoke ajaxForm:

        $('#myForm').ajaxForm({
            delegation: true,
            target: '#output'
        });

        When using ajaxForm, the ajaxSubmit function will be invoked for you
        at the appropriate time.
    */

    /**
     * Feature detection
     */
    var feature = {};
    feature.fileapi = $("<input type='file'/>").get(0).files !== undefined;
    feature.formdata = window.FormData !== undefined;

    var hasProp = !!$.fn.prop;

    // attr2 uses prop when it can but checks the return type for
    // an expected string.  this accounts for the case where a form
    // contains inputs with names like "action" or "method"; in those
    // cases "prop" returns the element
    $.fn.attr2 = function() {
        if (!hasProp)
            return this.attr.apply(this, arguments);
        var val = this.prop.apply(this, arguments);
        if ((val && val.jquery) || typeof val === 'string')
            return val;
        return this.attr.apply(this, arguments);
    };

    /**
     * ajaxSubmit() provides a mechanism for immediately submitting
     * an HTML form using AJAX.
     */
    $.fn.ajaxSubmit = function(options) {
        /*jshint scripturl:true */

        // fast fail if nothing selected (http://dev.jquery.com/ticket/2752)
        if (!this.length) {
            log('ajaxSubmit: skipping submit process - no element selected');
            return this;
        }

        var method, action, url, $form = this;

        if (typeof options == 'function') {
            options = {
                success: options
            };
        }

        method = this.attr2('method');
        action = this.attr2('action');

        url = (typeof action === 'string') ? $.trim(action) : '';
        url = url || window.location.href || '';
        if (url) {
            // clean url (don't include hash vaue)
            url = (url.match(/^([^#]+)/) || [])[1];
        }

        options = $.extend(true, {
            url: url,
            success: $.ajaxSettings.success,
            type: method || 'GET',
            iframeSrc: /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank'
        }, options);

        // hook for manipulating the form data before it is extracted;
        // convenient for use with rich editors like tinyMCE or FCKEditor
        var veto = {};
        this.trigger('form-pre-serialize', [this, options, veto]);
        if (veto.veto) {
            log('ajaxSubmit: submit vetoed via form-pre-serialize trigger');
            return this;
        }

        // provide opportunity to alter form data before it is serialized
        if (options.beforeSerialize && options.beforeSerialize(this, options) === false) {
            log('ajaxSubmit: submit aborted via beforeSerialize callback');
            return this;
        }

        var traditional = options.traditional;
        if (traditional === undefined) {
            traditional = $.ajaxSettings.traditional;
        }

        var elements = [];
        var qx, a = this.formToArray(options.semantic, elements);
        if (options.data) {
            options.extraData = options.data;
            qx = $.param(options.data, traditional);
        }

        // give pre-submit callback an opportunity to abort the submit
        if (options.beforeSubmit && options.beforeSubmit(a, this, options) === false) {
            log('ajaxSubmit: submit aborted via beforeSubmit callback');
            return this;
        }

        // fire vetoable 'validate' event
        this.trigger('form-submit-validate', [a, this, options, veto]);
        if (veto.veto) {
            log('ajaxSubmit: submit vetoed via form-submit-validate trigger');
            return this;
        }

        var q = $.param(a, traditional);
        if (qx) {
            q = (q ? (q + '&' + qx) : qx);
        }
        if (options.type.toUpperCase() == 'GET') {
            options.url += (options.url.indexOf('?') >= 0 ? '&' : '?') + q;
            options.data = null; // data is null for 'get'
        } else {
            options.data = q; // data is the query string for 'post'
        }

        var callbacks = [];
        if (options.resetForm) {
            callbacks.push(function() {
                $form.resetForm();
            });
        }
        if (options.clearForm) {
            callbacks.push(function() {
                $form.clearForm(options.includeHidden);
            });
        }

        // perform a load on the target only if dataType is not provided
        if (!options.dataType && options.target) {
            var oldSuccess = options.success || function() {};
            callbacks.push(function(data) {
                var fn = options.replaceTarget ? 'replaceWith' : 'html';
                $(options.target)[fn](data).each(oldSuccess, arguments);
            });
        } else if (options.success) {
            callbacks.push(options.success);
        }

        options.success = function(data, status, xhr) { // jQuery 1.4+ passes xhr as 3rd arg
            var context = options.context || this; // jQuery 1.4+ supports scope context
            for (var i = 0, max = callbacks.length; i < max; i++) {
                callbacks[i].apply(context, [data, status, xhr || $form, $form]);
            }
        };

        // are there files to upload?

        // [value] (issue #113), also see comment:
        // https://github.com/malsup/form/commit/588306aedba1de01388032d5f42a60159eea9228#commitcomment-2180219
        var fileInputs = $('input[type=file]:enabled[value!=""]', this);

        var hasFileInputs = fileInputs.length > 0;
        var mp = 'multipart/form-data';
        var multipart = ($form.attr('enctype') == mp || $form.attr('encoding') == mp);

        var fileAPI = feature.fileapi && feature.formdata;
        log("fileAPI :" + fileAPI);
        var shouldUseFrame = (hasFileInputs || multipart) && !fileAPI;

        var jqxhr;

        // options.iframe allows user to force iframe mode
        // 06-NOV-09: now defaulting to iframe mode if file input is detected
        if (options.iframe !== false && (options.iframe || shouldUseFrame)) {
            // hack to fix Safari hang (thanks to Tim Molendijk for this)
            // see:  http://groups.google.com/group/jquery-dev/browse_thread/thread/36395b7ab510dd5d
            if (options.closeKeepAlive) {
                $.get(options.closeKeepAlive, function() {
                    jqxhr = fileUploadIframe(a);
                });
            } else {
                jqxhr = fileUploadIframe(a);
            }
        } else if ((hasFileInputs || multipart) && fileAPI) {
            jqxhr = fileUploadXhr(a);
        } else {
            jqxhr = $.ajax(options);
        }

        $form.removeData('jqxhr').data('jqxhr', jqxhr);

        // clear element array
        for (var k = 0; k < elements.length; k++)
            elements[k] = null;

        // fire 'notify' event
        this.trigger('form-submit-notify', [this, options]);
        return this;

        // utility fn for deep serialization
        function deepSerialize(extraData) {
            var serialized = $.param(extraData).split('&');
            var len = serialized.length;
            var result = [];
            var i, part;
            for (i = 0; i < len; i++) {
                // #252; undo param space replacement
                serialized[i] = serialized[i].replace(/\+/g, ' ');
                part = serialized[i].split('=');
                // #278; use array instead of object storage, favoring array serializations
                result.push([decodeURIComponent(part[0]), decodeURIComponent(part[1])]);
            }
            return result;
        }

        // XMLHttpRequest Level 2 file uploads (big hat tip to francois2metz)
        function fileUploadXhr(a) {
            var formdata = new FormData();

            for (var i = 0; i < a.length; i++) {
                formdata.append(a[i].name, a[i].value);
            }

            if (options.extraData) {
                var serializedData = deepSerialize(options.extraData);
                for (i = 0; i < serializedData.length; i++)
                    if (serializedData[i])
                        formdata.append(serializedData[i][0], serializedData[i][1]);
            }

            options.data = null;

            var s = $.extend(true, {}, $.ajaxSettings, options, {
                contentType: false,
                processData: false,
                cache: false,
                type: method || 'POST'
            });

            if (options.uploadProgress) {
                // workaround because jqXHR does not expose upload property
                s.xhr = function() {
                    var xhr = jQuery.ajaxSettings.xhr();
                    if (xhr.upload) {
                        xhr.upload.addEventListener('progress', function(event) {
                            var percent = 0;
                            var position = event.loaded || event.position; /*event.position is deprecated*/
                            var total = event.total;
                            if (event.lengthComputable) {
                                percent = Math.ceil(position / total * 100);
                            }
                            options.uploadProgress(event, position, total, percent);
                        }, false);
                    }
                    return xhr;
                };
            }

            s.data = null;
            var beforeSend = s.beforeSend;
            s.beforeSend = function(xhr, o) {
                o.data = formdata;
                if (beforeSend)
                    beforeSend.call(this, xhr, o);
            };
            return $.ajax(s);
        }

        // private function for handling file uploads (hat tip to YAHOO!)
        function fileUploadIframe(a) {
            var form = $form[0],
                el, i, s, g, id, $io, io, xhr, sub, n, timedOut, timeoutHandle;
            var deferred = $.Deferred();

            if (a) {
                // ensure that every serialized input is still enabled
                for (i = 0; i < elements.length; i++) {
                    el = $(elements[i]);
                    if (hasProp)
                        el.prop('disabled', false);
                    else
                        el.removeAttr('disabled');
                }
            }

            s = $.extend(true, {}, $.ajaxSettings, options);
            s.context = s.context || s;
            id = 'jqFormIO' + (new Date().getTime());
            if (s.iframeTarget) {
                $io = $(s.iframeTarget);
                n = $io.attr2('name');
                if (!n)
                    $io.attr2('name', id);
                else
                    id = n;
            } else {
                $io = $('<iframe name="' + id + '" src="' + s.iframeSrc + '" />');
                $io.css({
                    position: 'absolute',
                    top: '-1000px',
                    left: '-1000px'
                });
            }
            io = $io[0];


            xhr = { // mock object
                aborted: 0,
                responseText: null,
                responseXML: null,
                status: 0,
                statusText: 'n/a',
                getAllResponseHeaders: function() {},
                getResponseHeader: function() {},
                setRequestHeader: function() {},
                abort: function(status) {
                    var e = (status === 'timeout' ? 'timeout' : 'aborted');
                    log('aborting upload... ' + e);
                    this.aborted = 1;

                    try { // #214, #257
                        if (io.contentWindow.document.execCommand) {
                            io.contentWindow.document.execCommand('Stop');
                        }
                    } catch (ignore) {}

                    $io.attr('src', s.iframeSrc); // abort op in progress
                    xhr.error = e;
                    if (s.error)
                        s.error.call(s.context, xhr, e, status);
                    if (g)
                        $.event.trigger("ajaxError", [xhr, s, e]);
                    if (s.complete)
                        s.complete.call(s.context, xhr, e);
                }
            };

            g = s.global;
            // trigger ajax global events so that activity/block indicators work like normal
            if (g && 0 === $.active++) {
                $.event.trigger("ajaxStart");
            }
            if (g) {
                $.event.trigger("ajaxSend", [xhr, s]);
            }

            if (s.beforeSend && s.beforeSend.call(s.context, xhr, s) === false) {
                if (s.global) {
                    $.active--;
                }
                deferred.reject();
                return deferred;
            }
            if (xhr.aborted) {
                deferred.reject();
                return deferred;
            }

            // add submitting element to data if we know it
            sub = form.clk;
            if (sub) {
                n = sub.name;
                if (n && !sub.disabled) {
                    s.extraData = s.extraData || {};
                    s.extraData[n] = sub.value;
                    if (sub.type == "image") {
                        s.extraData[n + '.x'] = form.clk_x;
                        s.extraData[n + '.y'] = form.clk_y;
                    }
                }
            }

            var CLIENT_TIMEOUT_ABORT = 1;
            var SERVER_ABORT = 2;

            function getDoc(frame) {
                /* it looks like contentWindow or contentDocument do not
                 * carry the protocol property in ie8, when running under ssl
                 * frame.document is the only valid response document, since
                 * the protocol is know but not on the other two objects. strange?
                 * "Same origin policy" http://en.wikipedia.org/wiki/Same_origin_policy
                 */

                var doc = null;

                // IE8 cascading access check
                try {
                    if (frame.contentWindow) {
                        doc = frame.contentWindow.document;
                    }
                } catch (err) {
                    // IE8 access denied under ssl & missing protocol
                    log('cannot get iframe.contentWindow document: ' + err);
                }

                if (doc) { // successful getting content
                    return doc;
                }

                try { // simply checking may throw in ie8 under ssl or mismatched protocol
                    doc = frame.contentDocument ? frame.contentDocument : frame.document;
                } catch (err) {
                    // last attempt
                    log('cannot get iframe.contentDocument: ' + err);
                    doc = frame.document;
                }
                return doc;
            }

            // Rails CSRF hack (thanks to Yvan Barthelemy)
            var csrf_token = $('meta[name=csrf-token]').attr('content');
            var csrf_param = $('meta[name=csrf-param]').attr('content');
            if (csrf_param && csrf_token) {
                s.extraData = s.extraData || {};
                s.extraData[csrf_param] = csrf_token;
            }

            // take a breath so that pending repaints get some cpu time before the upload starts
            function doSubmit() {
                // make sure form attrs are set
                var t = $form.attr2('target'),
                    a = $form.attr2('action');

                // update form attrs in IE friendly way
                form.setAttribute('target', id);
                if (!method) {
                    form.setAttribute('method', 'POST');
                }
                if (a != s.url) {
                    form.setAttribute('action', s.url);
                }

                // ie borks in some cases when setting encoding
                if (!s.skipEncodingOverride && (!method || /post/i.test(method))) {
                    $form.attr({
                        encoding: 'multipart/form-data',
                        enctype: 'multipart/form-data'
                    });
                }

                // support timout
                if (s.timeout) {
                    timeoutHandle = setTimeout(function() {
                        timedOut = true;
                        cb(CLIENT_TIMEOUT_ABORT);
                    }, s.timeout);
                }

                // look for server aborts
                function checkState() {
                    try {
                        var state = getDoc(io).readyState;
                        log('state = ' + state);
                        if (state && state.toLowerCase() == 'uninitialized')
                            setTimeout(checkState, 50);
                    } catch (e) {
                        log('Server abort: ', e, ' (', e.name, ')');
                        cb(SERVER_ABORT);
                        if (timeoutHandle)
                            clearTimeout(timeoutHandle);
                        timeoutHandle = undefined;
                    }
                }

                // add "extra" data to form if provided in options
                var extraInputs = [];
                try {
                    if (s.extraData) {
                        for (var n in s.extraData) {
                            if (s.extraData.hasOwnProperty(n)) {
                                // if using the $.param format that allows for multiple values with the same name
                                if ($.isPlainObject(s.extraData[n]) && s.extraData[n].hasOwnProperty('name') && s.extraData[n].hasOwnProperty('value')) {
                                    extraInputs.push(
                                        $('<input type="hidden" name="' + s.extraData[n].name + '">').val(s.extraData[n].value)
                                        .appendTo(form)[0]);
                                } else {
                                    extraInputs.push(
                                        $('<input type="hidden" name="' + n + '">').val(s.extraData[n])
                                        .appendTo(form)[0]);
                                }
                            }
                        }
                    }

                    if (!s.iframeTarget) {
                        // add iframe to doc and submit the form
                        $io.appendTo('body');
                        if (io.attachEvent)
                            io.attachEvent('onload', cb);
                        else
                            io.addEventListener('load', cb, false);
                    }
                    setTimeout(checkState, 15);

                    try {
                        form.submit();
                    } catch (err) {
                        // just in case form has element with name/id of 'submit'
                        var submitFn = document.createElement('form').submit;
                        submitFn.apply(form);
                    }
                } finally {
                    // reset attrs and remove "extra" input elements
                    form.setAttribute('action', a);
                    if (t) {
                        form.setAttribute('target', t);
                    } else {
                        $form.removeAttr('target');
                    }
                    $(extraInputs).remove();
                }
            }

            if (s.forceSync) {
                doSubmit();
            } else {
                setTimeout(doSubmit, 10); // this lets dom updates render
            }

            var data, doc, domCheckCount = 50,
                callbackProcessed;

            function cb(e) {
                if (xhr.aborted || callbackProcessed) {
                    return;
                }

                doc = getDoc(io);
                if (!doc) {
                    log('cannot access response document');
                    e = SERVER_ABORT;
                }
                if (e === CLIENT_TIMEOUT_ABORT && xhr) {
                    xhr.abort('timeout');
                    deferred.reject(xhr, 'timeout');
                    return;
                } else if (e == SERVER_ABORT && xhr) {
                    xhr.abort('server abort');
                    deferred.reject(xhr, 'error', 'server abort');
                    return;
                }

                if (!doc || doc.location.href == s.iframeSrc) {
                    // response not received yet
                    if (!timedOut)
                        return;
                }
                if (io.detachEvent)
                    io.detachEvent('onload', cb);
                else
                    io.removeEventListener('load', cb, false);

                var status = 'success',
                    errMsg;
                try {
                    if (timedOut) {
                        throw 'timeout';
                    }

                    var isXml = s.dataType == 'xml' || doc.XMLDocument || $.isXMLDoc(doc);
                    log('isXml=' + isXml);
                    if (!isXml && window.opera && (doc.body === null || !doc.body.innerHTML)) {
                        if (--domCheckCount) {
                            // in some browsers (Opera) the iframe DOM is not always traversable when
                            // the onload callback fires, so we loop a bit to accommodate
                            log('requeing onLoad callback, DOM not available');
                            setTimeout(cb, 250);
                            return;
                        }
                        // let this fall through because server response could be an empty document
                        //log('Could not access iframe DOM after mutiple tries.');
                        //throw 'DOMException: not available';
                    }

                    //log('response detected');
                    var docRoot = doc.body ? doc.body : doc.documentElement;
                    xhr.responseText = docRoot ? docRoot.innerHTML : null;
                    xhr.responseXML = doc.XMLDocument ? doc.XMLDocument : doc;
                    if (isXml)
                        s.dataType = 'xml';
                    xhr.getResponseHeader = function(header) {
                        var headers = {
                            'content-type': s.dataType
                        };
                        return headers[header];
                    };
                    // support for XHR 'status' & 'statusText' emulation :
                    if (docRoot) {
                        xhr.status = Number(docRoot.getAttribute('status')) || xhr.status;
                        xhr.statusText = docRoot.getAttribute('statusText') || xhr.statusText;
                    }

                    var dt = (s.dataType || '').toLowerCase();
                    var scr = /(json|script|text)/.test(dt);
                    if (scr || s.textarea) {
                        // see if user embedded response in textarea
                        var ta = doc.getElementsByTagName('textarea')[0];
                        if (ta) {
                            xhr.responseText = ta.value;
                            // support for XHR 'status' & 'statusText' emulation :
                            xhr.status = Number(ta.getAttribute('status')) || xhr.status;
                            xhr.statusText = ta.getAttribute('statusText') || xhr.statusText;
                        } else if (scr) {
                            // account for browsers injecting pre around json response
                            var pre = doc.getElementsByTagName('pre')[0];
                            var b = doc.getElementsByTagName('body')[0];
                            if (pre) {
                                xhr.responseText = pre.textContent ? pre.textContent : pre.innerText;
                            } else if (b) {
                                xhr.responseText = b.textContent ? b.textContent : b.innerText;
                            }
                        }
                    } else if (dt == 'xml' && !xhr.responseXML && xhr.responseText) {
                        xhr.responseXML = toXml(xhr.responseText);
                    }

                    try {
                        data = httpData(xhr, dt, s);
                    } catch (err) {
                        status = 'parsererror';
                        xhr.error = errMsg = (err || status);
                    }
                } catch (err) {
                    log('error caught: ', err);
                    status = 'error';
                    xhr.error = errMsg = (err || status);
                }

                if (xhr.aborted) {
                    log('upload aborted');
                    status = null;
                }

                if (xhr.status) { // we've set xhr.status
                    status = (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) ? 'success' : 'error';
                }

                // ordering of these callbacks/triggers is odd, but that's how $.ajax does it
                if (status === 'success') {
                    if (s.success)
                        s.success.call(s.context, data, 'success', xhr);
                    deferred.resolve(xhr.responseText, 'success', xhr);
                    if (g)
                        $.event.trigger("ajaxSuccess", [xhr, s]);
                } else if (status) {
                    if (errMsg === undefined)
                        errMsg = xhr.statusText;
                    if (s.error)
                        s.error.call(s.context, xhr, status, errMsg);
                    deferred.reject(xhr, 'error', errMsg);
                    if (g)
                        $.event.trigger("ajaxError", [xhr, s, errMsg]);
                }

                if (g)
                    $.event.trigger("ajaxComplete", [xhr, s]);

                if (g && !--$.active) {
                    $.event.trigger("ajaxStop");
                }

                if (s.complete)
                    s.complete.call(s.context, xhr, status);

                callbackProcessed = true;
                if (s.timeout)
                    clearTimeout(timeoutHandle);

                // clean up
                setTimeout(function() {
                    if (!s.iframeTarget)
                        $io.remove();
                    xhr.responseXML = null;
                }, 100);
            }

            var toXml = $.parseXML || function(s, doc) { // use parseXML if available (jQuery 1.5+)
                if (window.ActiveXObject) {
                    doc = new ActiveXObject('Microsoft.XMLDOM');
                    doc.async = 'false';
                    doc.loadXML(s);
                } else {
                    doc = (new DOMParser()).parseFromString(s, 'text/xml');
                }
                return (doc && doc.documentElement && doc.documentElement.nodeName != 'parsererror') ? doc : null;
            };
            var parseJSON = $.parseJSON || function(s) {
                /*jslint evil:true */
                return window['eval']('(' + s + ')');
            };

            var httpData = function(xhr, type, s) { // mostly lifted from jq1.4.4

                var ct = xhr.getResponseHeader('content-type') || '',
                    xml = type === 'xml' || !type && ct.indexOf('xml') >= 0,
                    data = xml ? xhr.responseXML : xhr.responseText;

                if (xml && data.documentElement.nodeName === 'parsererror') {
                    if ($.error)
                        $.error('parsererror');
                }
                if (s && s.dataFilter) {
                    data = s.dataFilter(data, type);
                }
                if (typeof data === 'string') {
                    if (type === 'json' || !type && ct.indexOf('json') >= 0) {
                        data = parseJSON(data);
                    } else if (type === "script" || !type && ct.indexOf("javascript") >= 0) {
                        $.globalEval(data);
                    }
                }
                return data;
            };

            return deferred;
        }
    };

    /**
     * ajaxForm() provides a mechanism for fully automating form submission.
     *
     * The advantages of using this method instead of ajaxSubmit() are:
     *
     * 1: This method will include coordinates for <input type="image" /> elements (if the element
     *    is used to submit the form).
     * 2. This method will include the submit element's name/value data (for the element that was
     *    used to submit the form).
     * 3. This method binds the submit() method to the form for you.
     *
     * The options argument for ajaxForm works exactly as it does for ajaxSubmit.  ajaxForm merely
     * passes the options argument along after properly binding events for submit elements and
     * the form itself.
     */
    $.fn.ajaxForm = function(options) {
        options = options || {};
        options.delegation = options.delegation && $.isFunction($.fn.on);

        // in jQuery 1.3+ we can fix mistakes with the ready state
        if (!options.delegation && this.length === 0) {
            var o = {
                s: this.selector,
                c: this.context
            };
            if (!$.isReady && o.s) {
                log('DOM not ready, queuing ajaxForm');
                $(function() {
                    $(o.s, o.c).ajaxForm(options);
                });
                return this;
            }
            // is your DOM ready?  http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
            log('terminating; zero elements found by selector' + ($.isReady ? '' : ' (DOM not ready)'));
            return this;
        }

        if (options.delegation) {
            $(document)
                .off('submit.form-plugin', this.selector, doAjaxSubmit)
                .off('click.form-plugin', this.selector, captureSubmittingElement)
                .on('submit.form-plugin', this.selector, options, doAjaxSubmit)
                .on('click.form-plugin', this.selector, options, captureSubmittingElement);
            return this;
        }

        return this.ajaxFormUnbind()
            .bind('submit.form-plugin', options, doAjaxSubmit)
            .bind('click.form-plugin', options, captureSubmittingElement);
    };

    // private event handlers
    function doAjaxSubmit(e) {
        /*jshint validthis:true */
        var options = e.data;
        if (!e.isDefaultPrevented()) { // if event has been canceled, don't proceed
            e.preventDefault();
            $(this).ajaxSubmit(options);
        }
    }

    function captureSubmittingElement(e) {
        /*jshint validthis:true */
        var target = e.target;
        var $el = $(target);
        if (!($el.is("[type=submit],[type=image]"))) {
            // is this a child element of the submit el?  (ex: a span within a button)
            var t = $el.closest('[type=submit]');
            if (t.length === 0) {
                return;
            }
            target = t[0];
        }
        var form = this;
        form.clk = target;
        if (target.type == 'image') {
            if (e.offsetX !== undefined) {
                form.clk_x = e.offsetX;
                form.clk_y = e.offsetY;
            } else if (typeof $.fn.offset == 'function') {
                var offset = $el.offset();
                form.clk_x = e.pageX - offset.left;
                form.clk_y = e.pageY - offset.top;
            } else {
                form.clk_x = e.pageX - target.offsetLeft;
                form.clk_y = e.pageY - target.offsetTop;
            }
        }
        // clear form vars
        setTimeout(function() {
            form.clk = form.clk_x = form.clk_y = null;
        }, 100);
    }


    // ajaxFormUnbind unbinds the event handlers that were bound by ajaxForm
    $.fn.ajaxFormUnbind = function() {
        return this.unbind('submit.form-plugin click.form-plugin');
    };

    /**
     * formToArray() gathers form element data into an array of objects that can
     * be passed to any of the following ajax functions: $.get, $.post, or load.
     * Each object in the array has both a 'name' and 'value' property.  An example of
     * an array for a simple login form might be:
     *
     * [ { name: 'username', value: 'jresig' }, { name: 'password', value: 'secret' } ]
     *
     * It is this array that is passed to pre-submit callback functions provided to the
     * ajaxSubmit() and ajaxForm() methods.
     */
    $.fn.formToArray = function(semantic, elements) {
        var a = [];
        if (this.length === 0) {
            return a;
        }

        var form = this[0];
        var els = semantic ? form.getElementsByTagName('*') : form.elements;
        if (!els) {
            return a;
        }

        var i, j, n, v, el, max, jmax;
        for (i = 0, max = els.length; i < max; i++) {
            el = els[i];
            n = el.name;
            if (!n || el.disabled) {
                continue;
            }

            if (semantic && form.clk && el.type == "image") {
                // handle image inputs on the fly when semantic == true
                if (form.clk == el) {
                    a.push({
                        name: n,
                        value: $(el).val(),
                        type: el.type
                    });
                    a.push({
                        name: n + '.x',
                        value: form.clk_x
                    }, {
                        name: n + '.y',
                        value: form.clk_y
                    });
                }
                continue;
            }

            v = $.fieldValue(el, true);
            if (v && v.constructor == Array) {
                if (elements)
                    elements.push(el);
                for (j = 0, jmax = v.length; j < jmax; j++) {
                    a.push({
                        name: n,
                        value: v[j]
                    });
                }
            } else if (feature.fileapi && el.type == 'file') {
                if (elements)
                    elements.push(el);
                var files = el.files;
                if (files.length) {
                    for (j = 0; j < files.length; j++) {
                        a.push({
                            name: n,
                            value: files[j],
                            type: el.type
                        });
                    }
                } else {
                    // #180
                    a.push({
                        name: n,
                        value: '',
                        type: el.type
                    });
                }
            } else if (v !== null && typeof v != 'undefined') {
                if (elements)
                    elements.push(el);
                a.push({
                    name: n,
                    value: v,
                    type: el.type,
                    required: el.required
                });
            }
        }

        if (!semantic && form.clk) {
            // input type=='image' are not found in elements array! handle it here
            var $input = $(form.clk),
                input = $input[0];
            n = input.name;
            if (n && !input.disabled && input.type == 'image') {
                a.push({
                    name: n,
                    value: $input.val()
                });
                a.push({
                    name: n + '.x',
                    value: form.clk_x
                }, {
                    name: n + '.y',
                    value: form.clk_y
                });
            }
        }
        return a;
    };

    /**
     * Serializes form data into a 'submittable' string. This method will return a string
     * in the format: name1=value1&amp;name2=value2
     */
    $.fn.formSerialize = function(semantic) {
        //hand off to jQuery.param for proper encoding
        return $.param(this.formToArray(semantic));
    };

    /**
     * Serializes all field elements in the jQuery object into a query string.
     * This method will return a string in the format: name1=value1&amp;name2=value2
     */
    $.fn.fieldSerialize = function(successful) {
        var a = [];
        this.each(function() {
            var n = this.name;
            if (!n) {
                return;
            }
            var v = $.fieldValue(this, successful);
            if (v && v.constructor == Array) {
                for (var i = 0, max = v.length; i < max; i++) {
                    a.push({
                        name: n,
                        value: v[i]
                    });
                }
            } else if (v !== null && typeof v != 'undefined') {
                a.push({
                    name: this.name,
                    value: v
                });
            }
        });
        //hand off to jQuery.param for proper encoding
        return $.param(a);
    };

    /**
     * Returns the value(s) of the element in the matched set.  For example, consider the following form:
     *
     *  <form><fieldset>
     *      <input name="A" type="text" />
     *      <input name="A" type="text" />
     *      <input name="B" type="checkbox" value="B1" />
     *      <input name="B" type="checkbox" value="B2"/>
     *      <input name="C" type="radio" value="C1" />
     *      <input name="C" type="radio" value="C2" />
     *  </fieldset></form>
     *
     *  var v = $('input[type=text]').fieldValue();
     *  // if no values are entered into the text inputs
     *  v == ['','']
     *  // if values entered into the text inputs are 'foo' and 'bar'
     *  v == ['foo','bar']
     *
     *  var v = $('input[type=checkbox]').fieldValue();
     *  // if neither checkbox is checked
     *  v === undefined
     *  // if both checkboxes are checked
     *  v == ['B1', 'B2']
     *
     *  var v = $('input[type=radio]').fieldValue();
     *  // if neither radio is checked
     *  v === undefined
     *  // if first radio is checked
     *  v == ['C1']
     *
     * The successful argument controls whether or not the field element must be 'successful'
     * (per http://www.w3.org/TR/html4/interact/forms.html#successful-controls).
     * The default value of the successful argument is true.  If this value is false the value(s)
     * for each element is returned.
     *
     * Note: This method *always* returns an array.  If no valid value can be determined the
     *    array will be empty, otherwise it will contain one or more values.
     */
    $.fn.fieldValue = function(successful) {
        for (var val = [], i = 0, max = this.length; i < max; i++) {
            var el = this[i];
            var v = $.fieldValue(el, successful);
            if (v === null || typeof v == 'undefined' || (v.constructor == Array && !v.length)) {
                continue;
            }
            if (v.constructor == Array)
                $.merge(val, v);
            else
                val.push(v);
        }
        return val;
    };

    /**
     * Returns the value of the field element.
     */
    $.fieldValue = function(el, successful) {
        var n = el.name,
            t = el.type,
            tag = el.tagName.toLowerCase();
        if (successful === undefined) {
            successful = true;
        }

        if (successful && (!n || el.disabled || t == 'reset' || t == 'button' ||
                (t == 'checkbox' || t == 'radio') && !el.checked ||
                (t == 'submit' || t == 'image') && el.form && el.form.clk != el ||
                tag == 'select' && el.selectedIndex == -1)) {
            return null;
        }

        if (tag == 'select') {
            var index = el.selectedIndex;
            if (index < 0) {
                return null;
            }
            var a = [],
                ops = el.options;
            var one = (t == 'select-one');
            var max = (one ? index + 1 : ops.length);
            for (var i = (one ? index : 0); i < max; i++) {
                var op = ops[i];
                if (op.selected) {
                    var v = op.value;
                    if (!v) { // extra pain for IE...
                        v = (op.attributes && op.attributes['value'] && !(op.attributes['value'].specified)) ? op.text : op.value;
                    }
                    if (one) {
                        return v;
                    }
                    a.push(v);
                }
            }
            return a;
        }
        return $(el).val();
    };

    /**
     * Clears the form data.  Takes the following actions on the form's input fields:
     *  - input text fields will have their 'value' property set to the empty string
     *  - select elements will have their 'selectedIndex' property set to -1
     *  - checkbox and radio inputs will have their 'checked' property set to false
     *  - inputs of type submit, button, reset, and hidden will *not* be effected
     *  - button elements will *not* be effected
     */
    $.fn.clearForm = function(includeHidden) {
        return this.each(function() {
            $('input,select,textarea', this).clearFields(includeHidden);
        });
    };

    /**
     * Clears the selected form elements.
     */
    $.fn.clearFields = $.fn.clearInputs = function(includeHidden) {
        var re = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i; // 'hidden' is not in this list
        return this.each(function() {
            var t = this.type,
                tag = this.tagName.toLowerCase();
            if (re.test(t) || tag == 'textarea') {
                this.value = '';
            } else if (t == 'checkbox' || t == 'radio') {
                this.checked = false;
            } else if (tag == 'select') {
                this.selectedIndex = -1;
            } else if (t == "file") {
                if (/MSIE/.test(navigator.userAgent)) {
                    $(this).replaceWith($(this).clone(true));
                } else {
                    $(this).val('');
                }
            } else if (includeHidden) {
                // includeHidden can be the value true, or it can be a selector string
                // indicating a special test; for example:
                //  $('#myForm').clearForm('.special:hidden')
                // the above would clean hidden inputs that have the class of 'special'
                if ((includeHidden === true && /hidden/.test(t)) ||
                    (typeof includeHidden == 'string' && $(this).is(includeHidden)))
                    this.value = '';
            }
        });
    };

    /**
     * Resets the form data.  Causes all form elements to be reset to their original value.
     */
    $.fn.resetForm = function() {
        return this.each(function() {
            // guard against an input with the name of 'reset'
            // note that IE reports the reset function as an 'object'
            if (typeof this.reset == 'function' || (typeof this.reset == 'object' && !this.reset.nodeType)) {
                this.reset();
            }
        });
    };

    /**
     * Enables or disables any matching elements.
     */
    $.fn.enable = function(b) {
        if (b === undefined) {
            b = true;
        }
        return this.each(function() {
            this.disabled = !b;
        });
    };

    /**
     * Checks/unchecks any matching checkboxes or radio buttons and
     * selects/deselects and matching option elements.
     */
    $.fn.selected = function(select) {
        if (select === undefined) {
            select = true;
        }
        return this.each(function() {
            var t = this.type;
            if (t == 'checkbox' || t == 'radio') {
                this.checked = select;
            } else if (this.tagName.toLowerCase() == 'option') {
                var $sel = $(this).parent('select');
                if (select && $sel[0] && $sel[0].type == 'select-one') {
                    // deselect all other options
                    $sel.find('option').selected(false);
                }
                this.selected = select;
            }
        });
    };

    // expose debug var
    $.fn.ajaxSubmit.debug = false;

    // helper fn for console logging
    function log() {
        if (!$.fn.ajaxSubmit.debug)
            return;
        var msg = '[jquery.form] ' + Array.prototype.join.call(arguments, '');
        if (window.console && window.console.log) {
            window.console.log(msg);
        } else if (window.opera && window.opera.postError) {
            window.opera.postError(msg);
        }
    }

})(jQuery);

/*! jQuery Validation Plugin - v1.11.1 - 3/22/2013\n* https://github.com/jzaefferer/jquery-validation
 * Copyright (c) 2013 Jörn Zaefferer; Licensed MIT */
(function(t) {
    t.extend(t.fn, {
        validate: function(e) {
            if (!this.length) return e && e.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing."), void 0;
            var i = t.data(this[0], "validator");
            return i ? i : (this.attr("novalidate", "novalidate"), i = new t.validator(e, this[0]), t.data(this[0], "validator", i), i.settings.onsubmit && (this.validateDelegate(":submit", "click", function(e) {
                i.settings.submitHandler && (i.submitButton = e.target), t(e.target).hasClass("cancel") && (i.cancelSubmit = !0), void 0 !== t(e.target).attr("formnovalidate") && (i.cancelSubmit = !0)
            }), this.submit(function(e) {
                function s() {
                    var s;
                    return i.settings.submitHandler ? (i.submitButton && (s = t("<input type='hidden'/>").attr("name", i.submitButton.name).val(t(i.submitButton).val()).appendTo(i.currentForm)), i.settings.submitHandler.call(i, i.currentForm, e), i.submitButton && s.remove(), !1) : !0
                }
                return i.settings.debug && e.preventDefault(), i.cancelSubmit ? (i.cancelSubmit = !1, s()) : i.form() ? i.pendingRequest ? (i.formSubmitted = !0, !1) : s() : (i.focusInvalid(), !1)
            })), i)
        },
        valid: function() {
            if (t(this[0]).is("form")) return this.validate().form();
            var e = !0,
                i = t(this[0].form).validate();
            return this.each(function() {
                e = e && i.element(this)
            }), e
        },
        removeAttrs: function(e) {
            var i = {},
                s = this;
            return t.each(e.split(/\s/), function(t, e) {
                i[e] = s.attr(e), s.removeAttr(e)
            }), i
        },
        rules: function(e, i) {
            var s = this[0];
            if (e) {
                var r = t.data(s.form, "validator").settings,
                    n = r.rules,
                    a = t.validator.staticRules(s);
                switch (e) {
                    case "add":
                        t.extend(a, t.validator.normalizeRule(i)), delete a.messages, n[s.name] = a, i.messages && (r.messages[s.name] = t.extend(r.messages[s.name], i.messages));
                        break;
                    case "remove":
                        if (!i) return delete n[s.name], a;
                        var u = {};
                        return t.each(i.split(/\s/), function(t, e) {
                            u[e] = a[e], delete a[e]
                        }), u
                }
            }
            var o = t.validator.normalizeRules(t.extend({}, t.validator.classRules(s), t.validator.attributeRules(s), t.validator.dataRules(s), t.validator.staticRules(s)), s);
            if (o.required) {
                var l = o.required;
                delete o.required, o = t.extend({
                    required: l
                }, o)
            }
            return o
        }
    }), t.extend(t.expr[":"], {
        blank: function(e) {
            return !t.trim("" + t(e).val())
        },
        filled: function(e) {
            return !!t.trim("" + t(e).val())
        },
        unchecked: function(e) {
            return !t(e).prop("checked")
        }
    }), t.validator = function(e, i) {
        this.settings = t.extend(!0, {}, t.validator.defaults, e), this.currentForm = i, this.init()
    }, t.validator.format = function(e, i) {
        return 1 === arguments.length ? function() {
            var i = t.makeArray(arguments);
            return i.unshift(e), t.validator.format.apply(this, i)
        } : (arguments.length > 2 && i.constructor !== Array && (i = t.makeArray(arguments).slice(1)), i.constructor !== Array && (i = [i]), t.each(i, function(t, i) {
            e = e.replace(RegExp("\\{" + t + "\\}", "g"), function() {
                return i
            })
        }), e)
    }, t.extend(t.validator, {
        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error",
            validClass: "valid",
            errorElement: "label",
            focusInvalid: !0,
            errorContainer: t([]),
            errorLabelContainer: t([]),
            onsubmit: !0,
            ignore: ":hidden",
            ignoreTitle: !1,
            onfocusin: function(t) {
                this.lastActive = t, this.settings.focusCleanup && !this.blockFocusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, t, this.settings.errorClass, this.settings.validClass), this.addWrapper(this.errorsFor(t)).hide())
            },
            onfocusout: function(t) {
                this.checkable(t) || !(t.name in this.submitted) && this.optional(t) || this.element(t)
            },
            onkeyup: function(t, e) {
                (9 !== e.which || "" !== this.elementValue(t)) && (t.name in this.submitted || t === this.lastElement) && this.element(t)
            },
            onclick: function(t) {
                t.name in this.submitted ? this.element(t) : t.parentNode.name in this.submitted && this.element(t.parentNode)
            },
            highlight: function(e, i, s) {
                "radio" === e.type ? this.findByName(e.name).addClass(i).removeClass(s) : t(e).addClass(i).removeClass(s)
            },
            unhighlight: function(e, i, s) {
                "radio" === e.type ? this.findByName(e.name).removeClass(i).addClass(s) : t(e).removeClass(i).addClass(s)
            }
        },
        setDefaults: function(e) {
            t.extend(t.validator.defaults, e)
        },
        messages: {
            required: "This field is required.",
            remote: "Please fix this field.",
            email: "Please enter a valid email address.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date (ISO).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            creditcard: "Please enter a valid credit card number.",
            equalTo: "Please enter the same value again.",
            maxlength: t.validator.format("Please enter no more than {0} characters."),
            minlength: t.validator.format("Please enter at least {0} characters."),
            rangelength: t.validator.format("Please enter a value between {0} and {1} characters long."),
            range: t.validator.format("Please enter a value between {0} and {1}."),
            max: t.validator.format("Please enter a value less than or equal to {0}."),
            min: t.validator.format("Please enter a value greater than or equal to {0}.")
        },
        autoCreateRanges: !1,
        prototype: {
            init: function() {
                function e(e) {
                    var i = t.data(this[0].form, "validator"),
                        s = "on" + e.type.replace(/^validate/, "");
                    i.settings[s] && i.settings[s].call(i, this[0], e)
                }
                this.labelContainer = t(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || t(this.currentForm), this.containers = t(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset();
                var i = this.groups = {};
                t.each(this.settings.groups, function(e, s) {
                    "string" == typeof s && (s = s.split(/\s/)), t.each(s, function(t, s) {
                        i[s] = e
                    })
                });
                var s = this.settings.rules;
                t.each(s, function(e, i) {
                    s[e] = t.validator.normalizeRule(i)
                }), t(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ", "focusin focusout keyup", e).validateDelegate("[type='radio'], [type='checkbox'], select, option", "click", e), this.settings.invalidHandler && t(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler)
            },
            form: function() {
                return this.checkForm(), t.extend(this.submitted, this.errorMap), this.invalid = t.extend({}, this.errorMap), this.valid() || t(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid()
            },
            checkForm: function() {
                this.prepareForm();
                for (var t = 0, e = this.currentElements = this.elements(); e[t]; t++) this.check(e[t]);
                return this.valid()
            },
            element: function(e) {
                e = this.validationTargetFor(this.clean(e)), this.lastElement = e, this.prepareElement(e), this.currentElements = t(e);
                var i = this.check(e) !== !1;
                return i ? delete this.invalid[e.name] : this.invalid[e.name] = !0, this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), i
            },
            showErrors: function(e) {
                if (e) {
                    t.extend(this.errorMap, e), this.errorList = [];
                    for (var i in e) this.errorList.push({
                        message: e[i],
                        element: this.findByName(i)[0]
                    });
                    this.successList = t.grep(this.successList, function(t) {
                        return !(t.name in e)
                    })
                }
                this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
            },
            resetForm: function() {
                t.fn.resetForm && t(this.currentForm).resetForm(), this.submitted = {}, this.lastElement = null, this.prepareForm(), this.hideErrors(), this.elements().removeClass(this.settings.errorClass).removeData("previousValue")
            },
            numberOfInvalids: function() {
                return this.objectLength(this.invalid)
            },
            objectLength: function(t) {
                var e = 0;
                for (var i in t) e++;
                return e
            },
            hideErrors: function() {
                this.addWrapper(this.toHide).hide()
            },
            valid: function() {
                return 0 === this.size()
            },
            size: function() {
                return this.errorList.length
            },
            focusInvalid: function() {
                if (this.settings.focusInvalid) try {
                    t(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                } catch (e) {}
            },
            findLastActive: function() {
                var e = this.lastActive;
                return e && 1 === t.grep(this.errorList, function(t) {
                    return t.element.name === e.name
                }).length && e
            },
            elements: function() {
                var e = this,
                    i = {};
                return t(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function() {
                    return !this.name && e.settings.debug && window.console && console.error("%o has no name assigned", this), this.name in i || !e.objectLength(t(this).rules()) ? !1 : (i[this.name] = !0, !0)
                })
            },
            clean: function(e) {
                return t(e)[0]
            },
            errors: function() {
                var e = this.settings.errorClass.replace(" ", ".");
                return t(this.settings.errorElement + "." + e, this.errorContext)
            },
            reset: function() {
                this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = t([]), this.toHide = t([]), this.currentElements = t([])
            },
            prepareForm: function() {
                this.reset(), this.toHide = this.errors().add(this.containers)
            },
            prepareElement: function(t) {
                this.reset(), this.toHide = this.errorsFor(t)
            },
            elementValue: function(e) {
                var i = t(e).attr("type"),
                    s = t(e).val();
                return "radio" === i || "checkbox" === i ? t("input[name='" + t(e).attr("name") + "']:checked").val() : "string" == typeof s ? s.replace(/\r/g, "") : s
            },
            check: function(e) {
                e = this.validationTargetFor(this.clean(e));
                var i, s = t(e).rules(),
                    r = !1,
                    n = this.elementValue(e);
                for (var a in s) {
                    var u = {
                        method: a,
                        parameters: s[a]
                    };
                    try {
                        if (i = t.validator.methods[a].call(this, n, e, u.parameters), "dependency-mismatch" === i) {
                            r = !0;
                            continue
                        }
                        if (r = !1, "pending" === i) return this.toHide = this.toHide.not(this.errorsFor(e)), void 0;
                        if (!i) return this.formatAndAdd(e, u), !1
                    } catch (o) {
                        throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + e.id + ", check the '" + u.method + "' method.", o), o
                    }
                }
                return r ? void 0 : (this.objectLength(s) && this.successList.push(e), !0)
            },
            customDataMessage: function(e, i) {
                return t(e).data("msg-" + i.toLowerCase()) || e.attributes && t(e).attr("data-msg-" + i.toLowerCase())
            },
            customMessage: function(t, e) {
                var i = this.settings.messages[t];
                return i && (i.constructor === String ? i : i[e])
            },
            findDefined: function() {
                for (var t = 0; arguments.length > t; t++)
                    if (void 0 !== arguments[t]) return arguments[t];
                return void 0
            },
            defaultMessage: function(e, i) {
                return this.findDefined(this.customMessage(e.name, i), this.customDataMessage(e, i), !this.settings.ignoreTitle && e.title || void 0, t.validator.messages[i], "<strong>Warning: No message defined for " + e.name + "</strong>")
            },
            formatAndAdd: function(e, i) {
                var s = this.defaultMessage(e, i.method),
                    r = /\$?\{(\d+)\}/g;
                "function" == typeof s ? s = s.call(this, i.parameters, e) : r.test(s) && (s = t.validator.format(s.replace(r, "{$1}"), i.parameters)), this.errorList.push({
                    message: s,
                    element: e
                }), this.errorMap[e.name] = s, this.submitted[e.name] = s
            },
            addWrapper: function(t) {
                return this.settings.wrapper && (t = t.add(t.parent(this.settings.wrapper))), t
            },
            defaultShowErrors: function() {
                var t, e;
                for (t = 0; this.errorList[t]; t++) {
                    var i = this.errorList[t];
                    this.settings.highlight && this.settings.highlight.call(this, i.element, this.settings.errorClass, this.settings.validClass), this.showLabel(i.element, i.message)
                }
                if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success)
                    for (t = 0; this.successList[t]; t++) this.showLabel(this.successList[t]);
                if (this.settings.unhighlight)
                    for (t = 0, e = this.validElements(); e[t]; t++) this.settings.unhighlight.call(this, e[t], this.settings.errorClass, this.settings.validClass);
                this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show()
            },
            validElements: function() {
                return this.currentElements.not(this.invalidElements())
            },
            invalidElements: function() {
                return t(this.errorList).map(function() {
                    return this.element
                })
            },
            showLabel: function(e, i) {
                var s = this.errorsFor(e);
                s.length ? (s.removeClass(this.settings.validClass).addClass(this.settings.errorClass), s.html(i)) : (s = t("<" + this.settings.errorElement + ">").attr("for", this.idOrName(e)).addClass(this.settings.errorClass).html(i || ""), this.settings.wrapper && (s = s.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.append(s).length || (this.settings.errorPlacement ? this.settings.errorPlacement(s, t(e)) : s.insertAfter(e))), !i && this.settings.success && (s.text(""), "string" == typeof this.settings.success ? s.addClass(this.settings.success) : this.settings.success(s, e)), this.toShow = this.toShow.add(s)
            },
            errorsFor: function(e) {
                var i = this.idOrName(e);
                return this.errors().filter(function() {
                    return t(this).attr("for") === i
                })
            },
            idOrName: function(t) {
                return this.groups[t.name] || (this.checkable(t) ? t.name : t.id || t.name)
            },
            validationTargetFor: function(t) {
                return this.checkable(t) && (t = this.findByName(t.name).not(this.settings.ignore)[0]), t
            },
            checkable: function(t) {
                return /radio|checkbox/i.test(t.type)
            },
            findByName: function(e) {
                return t(this.currentForm).find("[name='" + e + "']")
            },
            getLength: function(e, i) {
                switch (i.nodeName.toLowerCase()) {
                    case "select":
                        return t("option:selected", i).length;
                    case "input":
                        if (this.checkable(i)) return this.findByName(i.name).filter(":checked").length
                }
                return e.length
            },
            depend: function(t, e) {
                return this.dependTypes[typeof t] ? this.dependTypes[typeof t](t, e) : !0
            },
            dependTypes: {
                "boolean": function(t) {
                    return t
                },
                string: function(e, i) {
                    return !!t(e, i.form).length
                },
                "function": function(t, e) {
                    return t(e)
                }
            },
            optional: function(e) {
                var i = this.elementValue(e);
                return !t.validator.methods.required.call(this, i, e) && "dependency-mismatch"
            },
            startRequest: function(t) {
                this.pending[t.name] || (this.pendingRequest++, this.pending[t.name] = !0)
            },
            stopRequest: function(e, i) {
                this.pendingRequest--, 0 > this.pendingRequest && (this.pendingRequest = 0), delete this.pending[e.name], i && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (t(this.currentForm).submit(), this.formSubmitted = !1) : !i && 0 === this.pendingRequest && this.formSubmitted && (t(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1)
            },
            previousValue: function(e) {
                return t.data(e, "previousValue") || t.data(e, "previousValue", {
                    old: null,
                    valid: !0,
                    message: this.defaultMessage(e, "remote")
                })
            }
        },
        classRuleSettings: {
            required: {
                required: !0
            },
            email: {
                email: !0
            },
            url: {
                url: !0
            },
            date: {
                date: !0
            },
            dateISO: {
                dateISO: !0
            },
            number: {
                number: !0
            },
            digits: {
                digits: !0
            },
            creditcard: {
                creditcard: !0
            }
        },
        addClassRules: function(e, i) {
            e.constructor === String ? this.classRuleSettings[e] = i : t.extend(this.classRuleSettings, e)
        },
        classRules: function(e) {
            var i = {},
                s = t(e).attr("class");
            return s && t.each(s.split(" "), function() {
                this in t.validator.classRuleSettings && t.extend(i, t.validator.classRuleSettings[this])
            }), i
        },
        attributeRules: function(e) {
            var i = {},
                s = t(e),
                r = s[0].getAttribute("type");
            for (var n in t.validator.methods) {
                var a;
                "required" === n ? (a = s.get(0).getAttribute(n), "" === a && (a = !0), a = !!a) : a = s.attr(n), /min|max/.test(n) && (null === r || /number|range|text/.test(r)) && (a = Number(a)), a ? i[n] = a : r === n && "range" !== r && (i[n] = !0)
            }
            return i.maxlength && /-1|2147483647|524288/.test(i.maxlength) && delete i.maxlength, i
        },
        dataRules: function(e) {
            var i, s, r = {},
                n = t(e);
            for (i in t.validator.methods) s = n.data("rule-" + i.toLowerCase()), void 0 !== s && (r[i] = s);
            return r
        },
        staticRules: function(e) {
            var i = {},
                s = t.data(e.form, "validator");
            return s.settings.rules && (i = t.validator.normalizeRule(s.settings.rules[e.name]) || {}), i
        },
        normalizeRules: function(e, i) {
            return t.each(e, function(s, r) {
                if (r === !1) return delete e[s], void 0;
                if (r.param || r.depends) {
                    var n = !0;
                    switch (typeof r.depends) {
                        case "string":
                            n = !!t(r.depends, i.form).length;
                            break;
                        case "function":
                            n = r.depends.call(i, i)
                    }
                    n ? e[s] = void 0 !== r.param ? r.param : !0 : delete e[s]
                }
            }), t.each(e, function(s, r) {
                e[s] = t.isFunction(r) ? r(i) : r
            }), t.each(["minlength", "maxlength"], function() {
                e[this] && (e[this] = Number(e[this]))
            }), t.each(["rangelength", "range"], function() {
                var i;
                e[this] && (t.isArray(e[this]) ? e[this] = [Number(e[this][0]), Number(e[this][1])] : "string" == typeof e[this] && (i = e[this].split(/[\s,]+/), e[this] = [Number(i[0]), Number(i[1])]))
            }), t.validator.autoCreateRanges && (e.min && e.max && (e.range = [e.min, e.max], delete e.min, delete e.max), e.minlength && e.maxlength && (e.rangelength = [e.minlength, e.maxlength], delete e.minlength, delete e.maxlength)), e
        },
        normalizeRule: function(e) {
            if ("string" == typeof e) {
                var i = {};
                t.each(e.split(/\s/), function() {
                    i[this] = !0
                }), e = i
            }
            return e
        },
        addMethod: function(e, i, s) {
            t.validator.methods[e] = i, t.validator.messages[e] = void 0 !== s ? s : t.validator.messages[e], 3 > i.length && t.validator.addClassRules(e, t.validator.normalizeRule(e))
        },
        methods: {
            required: function(e, i, s) {
                if (!this.depend(s, i)) return "dependency-mismatch";
                if ("select" === i.nodeName.toLowerCase()) {
                    var r = t(i).val();
                    return r && r.length > 0
                }
                return this.checkable(i) ? this.getLength(e, i) > 0 : t.trim(e).length > 0
            },
            email: function(t, e) {
                return this.optional(e) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(t)
            },
            url: function(t, e) {
                return this.optional(e) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(t)
            },
            date: function(t, e) {
                return this.optional(e) || !/Invalid|NaN/.test("" + new Date(t))
            },
            dateISO: function(t, e) {
                return this.optional(e) || /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(t)
            },
            number: function(t, e) {
                return this.optional(e) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(t)
            },
            digits: function(t, e) {
                return this.optional(e) || /^\d+$/.test(t)
            },
            creditcard: function(t, e) {
                if (this.optional(e)) return "dependency-mismatch";
                if (/[^0-9 \-]+/.test(t)) return !1;
                var i = 0,
                    s = 0,
                    r = !1;
                t = t.replace(/\D/g, "");
                for (var n = t.length - 1; n >= 0; n--) {
                    var a = t.charAt(n);
                    s = parseInt(a, 10), r && (s *= 2) > 9 && (s -= 9), i += s, r = !r
                }
                return 0 === i % 10
            },
            minlength: function(e, i, s) {
                var r = t.isArray(e) ? e.length : this.getLength(t.trim(e), i);
                return this.optional(i) || r >= s
            },
            maxlength: function(e, i, s) {
                var r = t.isArray(e) ? e.length : this.getLength(t.trim(e), i);
                return this.optional(i) || s >= r
            },
            rangelength: function(e, i, s) {
                var r = t.isArray(e) ? e.length : this.getLength(t.trim(e), i);
                return this.optional(i) || r >= s[0] && s[1] >= r
            },
            min: function(t, e, i) {
                return this.optional(e) || t >= i
            },
            max: function(t, e, i) {
                return this.optional(e) || i >= t
            },
            range: function(t, e, i) {
                return this.optional(e) || t >= i[0] && i[1] >= t
            },
            equalTo: function(e, i, s) {
                var r = t(s);
                return this.settings.onfocusout && r.unbind(".validate-equalTo").bind("blur.validate-equalTo", function() {
                    t(i).valid()
                }), e === r.val()
            },
            remote: function(e, i, s) {
                if (this.optional(i)) return "dependency-mismatch";
                var r = this.previousValue(i);
                if (this.settings.messages[i.name] || (this.settings.messages[i.name] = {}), r.originalMessage = this.settings.messages[i.name].remote, this.settings.messages[i.name].remote = r.message, s = "string" == typeof s && {
                        url: s
                    } || s, r.old === e) return r.valid;
                r.old = e;
                var n = this;
                this.startRequest(i);
                var a = {};
                return a[i.name] = e, t.ajax(t.extend(!0, {
                    url: s,
                    mode: "abort",
                    port: "validate" + i.name,
                    dataType: "json",
                    data: a,
                    success: function(s) {
                        n.settings.messages[i.name].remote = r.originalMessage;
                        var a = s === !0 || "true" === s;
                        if (a) {
                            var u = n.formSubmitted;
                            n.prepareElement(i), n.formSubmitted = u, n.successList.push(i), delete n.invalid[i.name], n.showErrors()
                        } else {
                            var o = {},
                                l = s || n.defaultMessage(i, "remote");
                            o[i.name] = r.message = t.isFunction(l) ? l(e) : l, n.invalid[i.name] = !0, n.showErrors(o)
                        }
                        r.valid = a, n.stopRequest(i, a)
                    }
                }, s)), "pending"
            }
        }
    }), t.format = t.validator.format
})(jQuery),
function(t) {
    var e = {};
    if (t.ajaxPrefilter) t.ajaxPrefilter(function(t, i, s) {
        var r = t.port;
        "abort" === t.mode && (e[r] && e[r].abort(), e[r] = s)
    });
    else {
        var i = t.ajax;
        t.ajax = function(s) {
            var r = ("mode" in s ? s : t.ajaxSettings).mode,
                n = ("port" in s ? s : t.ajaxSettings).port;
            return "abort" === r ? (e[n] && e[n].abort(), e[n] = i.apply(this, arguments), e[n]) : i.apply(this, arguments)
        }
    }
}(jQuery),
function(t) {
    t.extend(t.fn, {
        validateDelegate: function(e, i, s) {
            return this.bind(i, function(i) {
                var r = t(i.target);
                return r.is(e) ? s.apply(r, arguments) : void 0
            })
        }
    })
}(jQuery);
jQuery(function($) {
    function successModal() {
        if ($('body').hasClass('modal-open')) {
            var objModal = $('.modal');
            if (!objModal.hasClass('show')) return false;
            objModal.find('.tt-modal-message').addClass('tt-active');
            setTimeout(function() {
                objModal.find('.close').trigger('click');
                objModal.find('.tt-modal-message').removeClass('tt-active');
            }, 1600);
        };
    };

    function successForm1(obj) {
        var objMessage = $(obj).next('.tt-modal-message');
        objMessage.addClass('tt-active');
        setTimeout(function() {
            objMessage.removeClass('tt-active');
        }, 3600);
    };

    function successForm(obj) {
        var objMessage = $(obj).find('.tt-modal-message');
        objMessage.addClass('tt-active');
        setTimeout(function() {
            objMessage.removeClass('tt-active');
        }, 3600);
    };
    //contact.html
    var formContactForm = $('#feedbackform');
    if (formContactForm.length) {
        formContactForm.validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                email: {
                    required: true,
                    email: true
                },
                message: {
                    required: true,
                }
            },
            messages: {
                name: {
                    required: "Please enter your name",
                    minlength: "Your name must consist of at least 2 characters"
                },
                email: {
                    required: "Please enter your email"
                },
                message: {
                    required: "Please enter your message"
                }
            },
            submitHandler: function(form) {
                $(form).ajaxSubmit({
                    type: "POST",
                    data: $(form).serialize(),
                    url: "external/form/contact-form.php",
                    success: function() {
                        $('#success').fadeIn();
                        formContactForm.each(function() {
                            this.reset();
                        });
                        successForm(formContactForm);
                    },
                    error: function() {
                        formContactForm.fadeTo("slow", 1, function() {
                            $('#error').fadeIn();
                        });
                    }
                });
            }
        });
    };
    //newsletterform
    var subscribeform = $('#subscribeform');
    if (subscribeform.length) {
        subscribeform.validate({
            rules: {
                email: {
                    required: true,
                    email: true
                }
            },
            submitHandler: function(form) {
                $(form).ajaxSubmit({
                    type: "POST",
                    data: $(form).serialize(),
                    url: "external/form/newsletter-form.php",
                    success: function() {
                        $('#success').fadeIn();
                        subscribeform.each(function() {
                            this.reset();
                        });
                        successForm(subscribeform);
                    },
                    error: function() {
                        subscribeform.fadeTo("slow", 1, function() {
                            $('#error').fadeIn();
                        });
                    }
                });
            }
        });
    };
    //jsFormMakeAppointment
    var formjsFormMakeAppointment = $('#jsFormMakeAppointment');
    if (formjsFormMakeAppointment.length) {
        formjsFormMakeAppointment.validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                email: {
                    required: true,
                    email: true
                },
                message: {
                    required: true,
                }
            },
            messages: {
                name: {
                    required: "Please enter your name",
                    minlength: "Your name must consist of at least 2 characters"
                },
                email: {
                    required: "Please enter your email"
                },
                message: {
                    required: "Please enter your message"
                }
            },
            submitHandler: function(form) {
                $(form).ajaxSubmit({
                    type: "POST",
                    data: $(form).serialize(),
                    url: "external/form/modal-make-appointment.php",
                    success: function() {
                        $('#success').fadeIn();
                        formjsFormMakeAppointment.each(function() {
                            this.reset();
                        });
                        successModal(formjsFormMakeAppointment);
                    },
                    error: function() {
                        formjsFormMakeAppointment.fadeTo("slow", 1, function() {
                            $('#error').fadeIn();
                        });
                    }
                });
            }
        });
    };
    //contact.html
    var blogCommentForm = $('#feedbackComment');
    if (blogCommentForm.length) {
        blogCommentForm.validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                email: {
                    required: true,
                    email: true
                },
                message: {
                    required: true,
                }
            },
            messages: {
                name: {
                    required: "Please enter your name",
                    minlength: "Your name must consist of at least 2 characters"
                },
                email: {
                    required: "Please enter your email"
                },
                message: {
                    required: "Please enter your message"
                }
            },
            submitHandler: function(form) {
                $(form).ajaxSubmit({
                    type: "POST",
                    data: $(form).serialize(),
                    url: "external/form/comment-form.php",
                    success: function() {
                        $('#success').fadeIn();
                        blogCommentForm.each(function() {
                            this.reset();
                        });
                        successForm(blogCommentForm);
                    },
                    error: function() {
                        blogCommentForm.fadeTo("slow", 1, function() {
                            $('#error').fadeIn();
                        });
                    }
                });
            }
        });
    };
    var orderForm = $('#orderform');
    if (orderForm.length) {
        orderForm.validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                email: {
                    required: true,
                    email: true
                },
                message: {
                    required: true,
                }
            },
            messages: {
                name: {
                    required: "Please enter your name",
                    minlength: "Your name must consist of at least 2 characters"
                },
                email: {
                    required: "Please enter your email"
                },
                message: {
                    required: "Please enter your message"
                }
            },
            submitHandler: function(form) {
                $(form).ajaxSubmit({
                    type: "POST",
                    data: $(form).serialize(),
                    url: "external/form/index-request-services-today.php",
                    success: function() {
                        $('#success').fadeIn();
                        orderForm.each(function() {
                            this.reset();
                        });
                        successForm1(orderForm);
                    },
                    error: function() {
                        orderForm.fadeTo("slow", 1, function() {
                            $('#error').fadeIn();
                        });
                    }
                });
            }
        });
    };
});
(function($) {
    var mobileProduct = $('#mobile-product');
    if (mobileProduct.length) {
        mobileProduct.slick({
            dots: true,
            arrows: false,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            adaptiveHeight: true,
            lazyLoad: 'progressive'
        });
    };


    //product pages
    var elevateZoomWidget = {
        scroll_zoom: true,
        class_name: '.zoom-product',
        thumb_parent: $('#smallGallery'),
        scrollslider_parent: $('.slider-scroll-product'),
        checkNoZoom: function() {
            return $(this.class_name).parent().parent().hasClass('no-zoom');
        },
        init: function(type) {
            var _ = this;
            var currentW = window.innerWidth || $(window).width();
            var zoom_image = $(_.class_name);
            var _thumbs = _.thumb_parent;
            _.initBigGalleryButtons();
            _.scrollSlider();

            if (zoom_image.length == 0) return false;
            if (!_.checkNoZoom()) {
                var attr_scroll = zoom_image.parent().parent().attr('data-scrollzoom');
                attr_scroll = attr_scroll ? attr_scroll : _.scroll_zoom;
                _.scroll_zoom = attr_scroll == 'false' ? false : true;
                currentW > 575 && _.configureZoomImage();
                _.resize();
            }

            if (_thumbs.length == 0) return false;
            var thumb_type = _thumbs.parent().attr('class').indexOf('-vertical') > -1 ? 'vertical' : 'horizontal';
            _[thumb_type](_thumbs);
            _.setBigImage(_thumbs);
        },
        configureZoomImage: function() {
            var _ = this;
            $('.zoomContainer').remove();
            var zoom_image = $(this.class_name);
            zoom_image.each(function() {
                var _this = $(this);
                var clone = _this.removeData('elevateZoom').clone();
                _this.after(clone).remove();
            });
            setTimeout(function() {
                $(_.class_name).elevateZoom({
                    gallery: _.thumb_parent.attr('id'),
                    zoomType: "inner",
                    scrollZoom: Boolean(_.scroll_zoom),
                    cursor: "crosshair",
                    zoomWindowFadeIn: 300,
                    zoomWindowFadeOut: 300
                });
            }, 100);
        },
        resize: function() {
            var _ = this;
            $(window).resize(function() {
                var currentW = window.innerWidth || $(window).width();
                if (currentW <= 575) return false;
                _.configureZoomImage();
            });
        },
        horizontal: function(_parent) {
            _parent.slick({
                infinite: true,
                dots: false,
                arrows: true,
                slidesToShow: 4,
                slidesToScroll: 1,
                nextArrow: '<a href="#" class="tt-custom-next"><i class="tt-icon icon-arrowhead-pointing-to-the-right-1"></i><span class="tt-text">more</span></button>',
                responsive: [{
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 3
                        }
                    },
                    {
                        breakpoint: 767,
                        settings: {
                            slidesToShow: 2
                        }
                    }
                ]
            });
        },
        vertical: function(_parent) {
            _parent.slick({
                vertical: true,
                infinite: true,
                slidesToShow: 4,
                slidesToScroll: 1,
                verticalSwiping: true,
                arrows: true,
                dots: false,
                centerPadding: "0px",
                customPaging: "0px",

                responsive: [{
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 5,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 5,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 5,
                            slidesToScroll: 1
                        }
                    }
                ]
            });
        },
        initBigGalleryButtons: function() {
            var bigGallery = $('.bigGallery');
            if (bigGallery.length == 0) return false;
            $('body').on('mouseenter', '.zoomContainer',
                function() {
                    bigGallery.find('button').addClass('show');
                }
            ).on('mouseleave', '.zoomContainer',
                function() {
                    bigGallery.find('button').removeClass('show');
                }
            );
        },
        scrollSlider: function() {
            var _scrollslider_parent = this.scrollslider_parent;
            if (_scrollslider_parent.length == 0) return false;
            _scrollslider_parent.on('init', function(event, slick) {
                _scrollslider_parent.css({
                    'opacity': 1
                });
            });
            _scrollslider_parent.css({
                'opacity': 0
            }).slick({
                infinite: false,
                vertical: true,
                verticalScrolling: true,
                dots: true,
                arrows: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                responsive: [{
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            }).mousewheel(function(e) {
                e.preventDefault();
                e.deltaY < 0 ? $(this).slick('slickNext') : $(this).slick('slickPrev');
            });
        },
        setBigImage: function(_parent) {
            var _ = this;
            _parent.find('a').on('click', function(e) {
                _.checkNoZoom() && e.preventDefault();
                var zoom_image = $(_.class_name);
                var getParam = _.checkNoZoom() ? 'data-image' : 'data-zoom-image';
                var setParam = _.checkNoZoom() ? 'src' : 'data-zoom-image';
                var big_image = $(this).attr(getParam);
                zoom_image.attr(setParam, big_image);

                if (!_.checkNoZoom()) return false;
                _parent.find('.zoomGalleryActive').removeClass('zoomGalleryActive');
                $(this).addClass('zoomGalleryActive');
            });
        }
    };
    elevateZoomWidget.init();


    //ttInputCounter
    var inputCounter = $('.tt-input-counter');
    if (inputCounter.length) {
        inputCounter.find('.minus-btn, .plus-btn').on('click', function(e) {
            var $input = $(this).parent().find('input');
            var count = parseInt($input.val(), 10) + parseInt(e.currentTarget.className === 'plus-btn' ? 1 : -1, 10);
            $input.val(count).change();
        });
        inputCounter.find("input").change(function() {
                var _ = $(this);
                var min = 1;
                var val = parseInt(_.val(), 10);
                var max = parseInt(_.attr('size'), 10);
                val = Math.min(val, max);
                val = Math.max(val, min);
                _.val(val);
            })
            .on("keypress", function(e) {
                if (e.keyCode === 13) {
                    e.preventDefault();
                }
            });
    }
})(jQuery);

/*
(*page-sizing-guide.html, page-faq.html)
*/
(function($) {
    var methods = {
        init: function(options) {
            return this.each(function() {
                var obj = $(this),
                    objOpen = obj.find('.tt-item.tt-item__open'),
                    objItemTitle = obj.find('.tt-item .tt-item__title');

                objOpen.find('.tt-item__content').slideToggle(100);

                objItemTitle.on('click', function() {
                    if (!$(this).parent().hasClass('tt-item__open')) {
                        $(this).parent().siblings().removeClass('tt-item__open').find('.tt-item__content').slideUp(200);
                    };
                    $(this).next().slideToggle(200).parent().toggleClass('tt-item__open');
                });
            });
        }
    };
    $.fn.accordeon = function(action) {
        if (methods[action]) {
            return methods[action].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof action === 'object' || !action) {
            return methods.init.apply(this, arguments);
        } else {
            console.info('Action ' + action + 'not found this plugin');
            return this;
        }
    };
    $('#tt-pageContent .js-accordeon').accordeon();
})(jQuery);

(function($) {
    var ptBackToTop = $('#js-backtotop'),
        $window = $(window);

    if (ptBackToTop.length) {
        initbacktotop();
    };

    function initbacktotop() {
        ptBackToTop.on('click', function(e) {
            $('html, body').animate({
                scrollTop: 0
            }, 500);
            return false;
        });
        $window.scroll(function() {
            $window.scrollTop() > 500 ? ptBackToTop.stop(true.false).addClass('pt-show') : ptBackToTop.stop(true.false).removeClass('pt-show');
        });
    };
})(jQuery);

(function($) {
    var $html = $('html');

    var cssFix = function() {
        var u = navigator.userAgent.toLowerCase(),
            is = function(t) {
                return (u.indexOf(t) != -1)
            };
        $html.addClass([
            (!(/opera|webtv/i.test(u)) && /msie (\d)/.test(u)) ? ('ie ie' + RegExp.$1) :
            is('firefox/2') ? 'gecko ff2' :
            is('firefox/3') ? 'gecko ff3' :
            is('gecko/') ? 'gecko' :
            is('opera/9') ? 'opera opera9' : /opera (\d)/.test(u) ? 'opera opera' + RegExp.$1 :
            is('konqueror') ? 'konqueror' :
            is('applewebkit/') ? 'webkit safari' :
            is('mozilla/') ? 'gecko' : '',
            (is('x11') || is('linux')) ? ' linux' :
            is('mac') ? ' mac' :
            is('win') ? ' win' : ''
        ].join(''));
    }();
    // identify touch device
    function is_touch_device() {
        return !!('ontouchstart' in window) || !!('onmsgesturechange' in window);
    };
    if (is_touch_device()) {
        $html.addClass('touch-device');
    };
    if (/Edge/.test(navigator.userAgent)) {
        $html.addClass('edge');
    };
})(jQuery);

/*
  Debouncer
*/
function debouncer(func, timeout) {
    var timeoutID, timeout = timeout || 500;
    return function() {
        var scope = this,
            args = arguments;
        clearTimeout(timeoutID);
        timeoutID = setTimeout(function() {
            func.apply(scope, Array.prototype.slice.call(args));
        }, timeout);
    }
};
(function($) {
    var nav = $('#tt-nav');

    if (!nav.length) return false;

    var determineSybMenu = (function() {
        nav.find('> ul > li').each(function() {
            if ($(this).children('ul').length != 0) {
                $(this).addClass('subMenu');
            }
        });
    }());

    var determineActive = (function() {
        var location = window.location.href.split('#')[0],
            cur_url = location.split('/').pop() || 'index.html';

        nav.find('li').each(function() {
            var link = $(this).find('a').attr('href');
            if (cur_url == link) {
                $(this).addClass('active').closest('.subMenu').addClass('active');
                nav.addClass('defined-item');
            }
        });
    }());

    var missingItemActive = (function() {
        if (!nav.hasClass('defined-item')) {
            nav.find('> ul > li:first-child').addClass('active');
        }
    }());
    var hoverAddClass = (function() {
        nav.find('li').on("mouseenter mouseleave", function(event) {
            $(this).toggleClass('is-hover');
        });
    }());

})(jQuery);

(function($) {
    var dropdownCart = $('#tt-header .js-dropdown-cart');
    if (!dropdownCart.length) return false;
    $('body').on('click touchstart', '.js-dropdown-cart .tt-obj__btn', function(e) {
        e.preventDefault();
        if ($(this).closest('.js-dropdown-cart').hasClass('active')) {
            closeDropdown();
            return false;
        };
        $.ajax({
            url: 'ajax-content/cart-dropdown.php',
            success: function(data) {
                var $item = $(data);
                var ajaxInclude = (function() {
                    $('.js-dropdown-cart .tt-obj__dropdown').append($item);
                }());
            }
        });
        $(this).closest('.tt-obj-cart').toggleClass('active');
    });
    $('body').on('click touchstart', '.js-dropdown-cart .tt-obj__dropdown-close', function(e) {
        closeDropdown();
    });
    $(document).mouseup(function(e) {
        var div = $("#tt-header .js-dropdown-cart");
        if (!div.is(e.target) && div.has(e.target).length === 0) {
            closeDropdown()
        }
    });

    function closeDropdown() {
        $("#tt-header .js-dropdown-cart").each(function() {
            $(this).removeClass('active');
            setTimeout(function() {
                $("#tt-header .js-dropdown-cart").find('.tt-obj__dropdown').children().remove();
            }, 200);
        });

    };
    $(window).resize(debouncer(function(e) {
        closeDropdown();
    }));
})(jQuery);

(function($) {
    var filterNav = $('#filter-nav'),
        filterLayout = $('#filter-layout');

    if (!filterNav.length && !filterLayout.length) return false;

    var initFilter = (function() {
        var valueFilter = filterNav.find('.active a').attr('href');
        filterLayout.find('.' + valueFilter).addClass('show');
    }());

    $('body').on('click touchstart', '#filter-nav .gallery-navitem', function(e) {
        e.preventDefault();
        if ($(this).closest('li').hasClass('active')) {
            return false
        } else {
            $(this).closest('li').addClass('active').siblings().removeClass('active');
            var valueFilter = filterNav.find('.active a').attr('href');

            filterLayout.find('.show').removeClass('show');
            filterLayout.find('.' + valueFilter).addClass('show');
        };
    });

    var moreWrapper = $('#js-more-include');
    if (!moreWrapper.length) return false;

    $('body').on('click touchstart', '#js-more-include > *', function(e) {
        var includeValue = $('#js-more-include').data('include');
        e.preventDefault();
        $.ajax({
            url: includeValue,
            success: function(data) {
                var $item = $(data);
                var ajaxInclude = (function() {
                    moreWrapper.parent().append($item);
                    moreWrapper.remove();
                }());
            }
        });
    });
})(jQuery);

(function($) {
    var nav = $('#f-nav');

    if (!nav.length) return false;

    var determineActive = (function() {
        var location = window.location.href.split('#')[0],
            cur_url = location.split('/').pop() || 'index.html';

        nav.find('li').each(function() {
            var link = $(this).find('a').attr('href');
            if (cur_url == link) {
                $(this).addClass('active').closest('.subMenu').addClass('active');
                nav.addClass('defined-item');
            }
        });
    }());

    var missingItemActive = (function() {
        if (!nav.hasClass('defined-item')) {
            nav.find('> ul > li:first-child').addClass('active');
        }
    }());
})(jQuery);

(function($) {
    $('#tt-pageContent [data-slick]').slick({
        lazyLoad: 'progressive',
        dots: true,
        arrows: false,
        infinite: true,
        speed: 300,
        autoplay: true,
        adaptiveHeight: true,
        slidesToScroll: 1,
        pauseOnFocus: false,
        pauseOnHover: false
    });
})(jQuery);
(function($) {
    function initSliderCarusel() {
        var slick04 = $('#tt-pageContent .js-init-carusel-04'),
            width = window.innerWidth || document.body.clientWidth;

        if (!slick04.length) return false;
        if (width <= 1024) {
            slick04.slick({
                lazyLoad: 'progressive',
                dots: true,
                arrows: false,
                infinite: true,
                speed: 300,
                slidesToShow: 1,
                slidesToScroll: 1,
                adaptiveHeight: true,
                autoplay: true,
                autoplaySpeed: 4500,
                pauseOnFocus: false,
                pauseOnHover: false
            });
        } else {
            slick04.filter('.slick-initialized').slick('unslick');
        }
    };
    initSliderCarusel();
    $(window).resize(debouncer(function(e) {
        initSliderCarusel();
    }));
})(jQuery);
(function($) {
    function initSliderCarusel() {
        var slick05 = $('#tt-pageContent .js-init-carusel-05'),
            width = window.innerWidth || document.body.clientWidth;

        if (!slick05.length) return false;

        if (width <= 1024) {
            slick05.slick({
                lazyLoad: 'progressive',
                dots: true,
                arrows: false,
                infinite: true,
                speed: 300,
                slidesToShow: 5,
                slidesToScroll: 1,
                adaptiveHeight: true,
                autoplay: true,
                autoplaySpeed: 2000,
                pauseOnFocus: false,
                pauseOnHover: false,
                responsive: [{
                        breakpoint: 767,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    }
                ]
            });
        } else {
            slick05.filter('.slick-initialized').slick('unslick');
        }
    };
    initSliderCarusel();
    $(window).resize(debouncer(function(e) {
        initSliderCarusel();
    }));
})(jQuery);


(function($) {
    var slideinfo = $('#tt-pageContent .tt-slideinfo');

    if (!slideinfo.length) return false;

    var initSlideInfo = (function() {
        $('#tt-pageContent .tt-slideinfo').on("mouseenter", function() {
            $(this).addClass('wide active').siblings().addClass('short');
        }).on('mouseleave', function() {
            $(this).removeClass('active').siblings().removeClass('short');
        });
    }());

    var initOpenInfo = (function() {
        $('body').on('click touchstart', '.tt-slideinfo .tt-item__btn > *', function(e) {
            var obj = $(this);
            if ($(this).closest('.tt-slideinfo').hasClass('open-info')) {
                closeLayout(obj);
            } else {
                openLayout(obj);
            };
            return false;
        });
    }());

    function openLayout(obj) {
        obj.html('-');
        obj.closest('.tt-slideinfo').siblings().removeClass('open-info').find('.tt-item__btn  > *').html('+');
        obj.closest('.tt-slideinfo').addClass('open-info');
    };

    function closeLayout(obj) {
        obj.html('+');
        obj.closest('.tt-slideinfo').removeClass('open-info');
    };



    function initSliderCarusel() {
        var slickCarusel = $('#tt-pageContent .tt-slideinfo-wrapper'),
            width = window.innerWidth || document.body.clientWidth;

        if (!slickCarusel.length) return false;

        if (width <= 767) {
            slickCarusel.slick({
                dots: true,
                arrows: false,
                infinite: true,
                speed: 300,
                slidesToShow: 2,
                slidesToScroll: 1,
                adaptiveHeight: true,
                autoplay: true,
                autoplaySpeed: 2000,
                responsive: [{
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                }]
            });
        } else {
            slickCarusel.filter('.slick-initialized').slick('unslick');
        }
    };
    initSliderCarusel();
    $(window).resize(debouncer(function(e) {
        initSliderCarusel();
    }));
})(jQuery);

(function($) {
    $.fn.datepicker.language['en'] = {
        days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        today: 'Today',
        clear: 'Clear',
        dateFormat: 'mm/dd/yyyy',
        timeFormat: 'hh:ii aa',
        firstDay: 0
    };
    var dp = $('#modalMakeAppointment .js_datepicker-1').datepicker({
        language: 'en',
    }).data('datepicker');

    var dp = $('#orderform .datepicker-1').datepicker({
        language: 'en',
    }).data('datepicker');

})(jQuery);




(function($) {
    var $ttDesctopMenu = $('#tt-nav'),
        mobileMenuToggle = $('#tt-menu-toggle');

    if ($ttDesctopMenu && mobileMenuToggle) {
        var ttDesktopMenu = $ttDesctopMenu.find('ul').first().children().clone();
        $('#mobile-menu').find('ul').append(ttDesktopMenu);
        mobileMenuToggle.initMM({
            enable_breakpoint: true,
            mobile_button: true,
            breakpoint: 1025
        });
    };
})(jQuery);

(function($) {
    var videoPopup = $('#tt-pageContent .js-video-popup');
    if (!videoPopup.length) return;
    videoPopup.each(function() {
        $(this).magnificPopup({
            type: 'iframe',
            iframe: {
                patterns: {
                    dailymotion: {
                        index: 'dailymotion.com',
                        id: function(url) {
                            var m = url.match(/^.+dailymotion.com\/(video|hub)\/([^_]+)[^#]*(#video=([^_&]+))?/);
                            if (m !== null) {
                                if (m[4] !== undefined) {
                                    return m[4];
                                }
                                return m[2];
                            }
                            return null;
                        },
                        src: 'https://www.dailymotion.com/embed/video/%id%'
                    }
                }
            }
        });
    });
})(jQuery);
(function($) {
    $('#tt-pageContent .js-wrapper-gallery').magnificPopup({
        delegate: '.tt-gallery',
        type: 'image',
        gallery: {
            enabled: true
        }
    });
})(jQuery);


(function($) {
    function calcHeight() {
        var ttwindowWidth = window.innerWidth || $(window).width();
        if (ttwindowWidth <= 786) {
            $('#tt-pageContent .layout01').each(function() {
                $(this).find('.layout01__content-wrapper').removeAttr("style");
            });
            return false;
        };

        $('#tt-pageContent .layout01').each(function() {
            $(this).find('.layout01__content-wrapper').removeAttr("style");
            var imgObj = $(this).find('.tt-img-main'),
                imgObjHeight = parseInt(imgObj.height() + 1, 10),
                contentObj = $(this).find('.layout01__content'),
                contentObjHeight = parseInt(contentObj.innerHeight(), 10);

            if (imgObjHeight > contentObjHeight) {
                var obj = $(this).find('.layout01__content-wrapper'),
                    objMarginTop = parseInt(obj.css('margin-top'), 10),
                    finalValue = parseInt(imgObjHeight - objMarginTop, 10);

                obj.css('min-height', finalValue);
            }
        });
    };

    $(window).on('load', function() {
        calcHeight();
    });
    $(window).resize(debouncer(function(e) {
        calcHeight()
    }));
})(jQuery);

(function($) {
    document.addEventListener('lazybeforeunveil', function(e) {
        var bg = e.target.getAttribute('data-bg');
        if (bg) {
            e.target.style.backgroundImage = 'url(' + bg + ')';
        }
    });
})(jQuery);


(function($) {
    "use strict";
    var mainSlider = $('#js-mainSlider');
    if (mainSlider.length) initMainSlider();

    function initMainSlider() {
        mainSlider.on('init', function(e, slick) {
            var $firstAnimatingElements = $('div.slide:first-child').find('[data-animation]');
            doAnimations($firstAnimatingElements);
        });
        mainSlider.on('beforeChange', function(e, slick, currentSlide, nextSlide) {
            var $currentSlide = $('div.slide[data-slick-index="' + nextSlide + '"]');
            var $animatingElements = $currentSlide.find('[data-animation]');
            doAnimations($animatingElements);
        });
        mainSlider.slick({
            arrows: false,
            dots: false,
            autoplay: true,
            autoplaySpeed: 5500,
            fade: true,
            speed: 1000,
            pauseOnHover: false,
            pauseOnDotsHover: true,
            responsive: [{
                breakpoint: 768,
                settings: {
                    arrows: false
                }
            }, {
                breakpoint: 1025,
                settings: {
                    dots: false,
                    arrows: false
                }
            }]
        });
    };

    function doAnimations(elements) {
        var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        elements.each(function() {
            var $this = $(this);
            var $animationDelay = $this.data('animation-delay');
            var $animationType = 'animated ' + $this.data('animation');
            $this.css({
                'animation-delay': $animationDelay,
                '-webkit-animation-delay': $animationDelay
            });
            $this.addClass($animationType).one(animationEndEvents, function() {
                $this.removeClass($animationType);
            });
            if ($this.hasClass('animate')) {
                $this.removeClass('animation');
            }
        });
    };
})(jQuery);
var mapElement = document.getElementById('map');
var mapElementContact = document.getElementById('map-contact');
if (mapElement) {
    // When the window has finished loading create our google map below
    google.maps.event.addDomListener(window, 'load', init);

    function init() {
        // Basic options for a simple Google Map
        // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
        var mapOptions = {
            // How zoomed in you want the map to start at (always required)
            zoom: 12,

            // The latitude and longitude to center the map (always required)
            center: new google.maps.LatLng(40.6700, -73.9400), // New York

            scrollwheel: false,

            // How you would like to style the map.
            // This is where you would paste any style found on Snazzy Maps.
            styles: [{
                    "featureType": "water",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#abd0fa"
                    }]
                },
                {
                    "featureType": "transit",
                    "stylers": [{
                        "color": "#808080"
                    }, {
                        "visibility": "off"
                    }]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [{
                        "visibility": "on"
                    }, {
                        "color": "#e1d9c6"
                    }]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#eee9da"
                    }]
                },
                {
                    "featureType": "road.local",
                    "elementType": "geometry.fill",
                    "stylers": [{
                            "visibility": "on"
                        },
                        {
                            "color": "000"
                        }, {
                            "weight": 1.8
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "geometry.stroke",
                    "stylers": [{
                        "color": "#d7d7d7"
                    }]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "visibility": "on"
                    }, {
                        "color": "#ebebeb"
                    }]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#eee9da"
                    }]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#fffbf8"
                    }]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#fffbf8"
                    }]
                },
                {
                    "featureType": "landscape",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "visibility": "on"
                    }, {
                        "color": "#fbf7ee"
                    }]
                },
                {
                    "featureType": "road",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#d6d6d6"
                    }]
                },
                {
                    "featureType": "administrative",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                            "visibility": "on"
                        },
                        {
                            "color": "#3c3424"
                        }
                    ]
                }, {
                    "featureType": "poi",
                    "elementType": "labels.icon",
                    "stylers": [{
                        "visibility": "off"
                    }]
                },
                {
                    "featureType": "poi",
                    "elementType": "labels",
                    "stylers": [{
                        "visibility": "off"
                    }]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "geometry.stroke",
                    "stylers": [{
                        "color": "#d6d6d6"
                    }]
                },
                {
                    "featureType": "road",
                    "elementType": "labels.icon",
                    "stylers": [{
                        "visibility": "off"
                    }]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#aee9c6"
                    }]
                }
            ]
        };

        // Get the HTML DOM element that will contain your map
        // We are using a div with id="map" seen below in the <body>
        var mapElement = document.getElementById('map');

        // Create the Google Map using our element and options defined above
        var map = new google.maps.Map(mapElement, mapOptions);

        var image = 'images/beachflag.png';

        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(40.6700, -73.9400),
            map: map,
            icon: image,
            title: 'Snazzy!'
        });
    }
}
if (mapElementContact) {
    // When the window has finished loading create our google map below
    google.maps.event.addDomListener(window, 'load', initContact);

    function initContact() {
        // Basic options for a simple Google Map
        // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
        var mapOptions = {
            // How zoomed in you want the map to start at (always required)
            zoom: 12,

            // The latitude and longitude to center the map (always required)
            center: new google.maps.LatLng(40.6700, -73.9400), // New York

            scrollwheel: false,

            // How you would like to style the map.
            // This is where you would paste any style found on Snazzy Maps.
            styles: [{
                    "featureType": "water",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#abd0fa"
                    }]
                },
                {
                    "featureType": "transit",
                    "stylers": [{
                        "color": "#808080"
                    }, {
                        "visibility": "off"
                    }]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [{
                        "visibility": "on"
                    }, {
                        "color": "#e1d9c6"
                    }]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#eee9da"
                    }]
                },
                {
                    "featureType": "road.local",
                    "elementType": "geometry.fill",
                    "stylers": [{
                            "visibility": "on"
                        },
                        {
                            "color": "000"
                        }, {
                            "weight": 1.8
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "geometry.stroke",
                    "stylers": [{
                        "color": "#d7d7d7"
                    }]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "visibility": "on"
                    }, {
                        "color": "#ebebeb"
                    }]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#eee9da"
                    }]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#fffbf8"
                    }]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#fffbf8"
                    }]
                },
                {
                    "featureType": "landscape",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "visibility": "on"
                    }, {
                        "color": "#fbf7ee"
                    }]
                },
                {
                    "featureType": "road",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#d6d6d6"
                    }]
                },
                {
                    "featureType": "administrative",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                            "visibility": "on"
                        },
                        {
                            "color": "#3c3424"
                        }
                    ]
                }, {
                    "featureType": "poi",
                    "elementType": "labels.icon",
                    "stylers": [{
                        "visibility": "off"
                    }]
                },
                {
                    "featureType": "poi",
                    "elementType": "labels",
                    "stylers": [{
                        "visibility": "off"
                    }]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "geometry.stroke",
                    "stylers": [{
                        "color": "#d6d6d6"
                    }]
                },
                {
                    "featureType": "road",
                    "elementType": "labels.icon",
                    "stylers": [{
                        "visibility": "off"
                    }]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#aee9c6"
                    }]
                }
            ]
        };

        // Get the HTML DOM element that will contain your map
        // We are using a div with id="map" seen below in the <body>
        var mapElementContact = document.getElementById('map-contact');

        // Create the Google Map using our element and options defined above
        var map = new google.maps.Map(mapElementContact, mapOptions);

        var image = 'images/beachflag.png';

        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(40.6700, -73.9400),
            map: map,
            icon: image,
            title: 'Snazzy!'
        });
    }
}



function findOffset(element) {
    var top = 0,
        left = 0;

    do {
        top += element.offsetTop || 0;
        left += element.offsetLeft || 0;
        element = element.offsetParent;
    } while (element);

    return {
        top: top,
        left: left
    };
}

window.onload = function() {
    var stickyHeader = document.getElementById('js-init-sticky');
    var headerOffset = findOffset(stickyHeader);
    var $html = document.getElementById('js-filters-toggle');

    window.onscroll = function() {
        var bodyScrollTop = document.documentElement.scrollTop || document.body.scrollTop;

        if (bodyScrollTop > headerOffset.top) {
            stickyHeader.classList.add('fixed');
            if ($html) {
                $html.classList.add('fixed');
            }

        } else {
            stickyHeader.classList.remove('fixed');
            if ($html) {
                $html.classList.remove('fixed');
            }

        }
    };
};



(function($) {
    var header = $('#tt-header'),
        $window = $(window);
    if (header.length) {
        stuck();
        initStuck();
    };

    function stuck() {
        $window.scroll(function() {
            initStuck();
        });
    };

    function initStuck() {
        if ($window.scrollTop() > 0) {
            header.addClass('stuck');
        } else {
            header.removeClass('stuck');
        }
    };
})(jQuery);

(function($) {
    var $toggleHolder = $('#js-toggle-h-holder');
    if (!$toggleHolder.length) return false;
    $('body').on('click', '#js-toggle-h-holder', function(e) {
        $(this).toggleClass('active').prev().slideToggle(300);
        return false;
    });
})(jQuery);

(function($) {
    var $toggleHolder = $('#js-toggle-orderform');
    if (!$toggleHolder.length) return false;
    $('body').on('click', '#js-toggle-orderform', function(e) {
        $(this).toggleClass('active').next().slideToggle(300);
        return false;
    });
})(jQuery);