(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";var _scrollTrigger=_interopRequireDefault(require("./scrollTrigger"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}!function(){var e=document.querySelector("header");function r(){window.pageYOffset<1?e.classList.remove("moving"):e.classList.add("moving")}window.addEventListener("scroll",function(e){r()}),window.addEventListener("DOMContentLoaded",function(){document.body.classList.remove("before-load")}),r(),_scrollTrigger.default.init()}();

},{"./scrollTrigger":2}],2:[function(require,module,exports){
"use strict";function init(){gsap.registerPlugin(ScrollTrigger),ScrollTrigger.matchMedia({all:function(){onGsapGnbMenuScroll(),onGsapChipBackground(),onGsapBodyThemeColor()},"(min-width: 769px)":function(){var e=onGsapImageSlider(202),t=onGsapRingProgress(),n=onGsapPlaylistPhone("pc");return function(){e.kill(),t.kill(),n.kill()}},"(max-width: 768px)":function(){var e=onGsapImageSlider(129),t=onGsapRingProgress(),n=onGsapPlaylistPhone("mobile");return function(){e.kill(),t.kill(),n.kill()}}})}function onGsapGnbMenuScroll(){gsap.utils.toArray(".js-nav-link").forEach(function(e){var t=e.getAttribute("href");e.addEventListener("click",function(e){e.preventDefault(),gsap.to(window,{duration:1,scrollTo:t})})}),gsap.utils.toArray("section").forEach(function(e){var t=e.dataset.section,n=document.querySelector(".js-nav-link[href='#".concat(t,"']")).parentNode;ScrollTrigger.create({trigger:e,start:"top 100%",end:"bottom bottom",onEnter:function(){return n.classList.add("active")},onLeave:function(){return n.classList.remove("active")},onEnterBack:function(){return n.classList.add("active")},onLeaveBack:function(){return n.classList.remove("active")}})})}function onGsapChipBackground(){var e=document.querySelectorAll(".chip"),t=gsap.timeline({scrollTrigger:{trigger:".exercise-section",start:"-30% top",toggleActions:"play none none reset"}});return e.forEach(function(e){t.from(e,{backgroundColor:"#fff",duration:.5})}),t}function onGsapBodyThemeColor(){var e=document.querySelectorAll(".js-theme img"),t=function(t){e.forEach(function(e){gsap.to(e,{duration:.5,opacity:function(){return e.dataset.theme===t?1:0}})})},n=function(){gsap.to(document.querySelector(".home-training-intro-section"),{duration:.5,backgroundColor:"#070707",onProgress:function(){t("black")}})},o=function(){gsap.to(document.querySelector(".home-training-intro-section"),{duration:.5,backgroundColor:"#fff",onProgress:function(){t("white")}})};return gsap.timeline({scrollTrigger:{trigger:".home-training-intro-section",start:"-15% top",end:"=".concat(document.body.offsetHeight),scrub:1,onEnter:n,onEnterBack:n,onLeave:o,onLeaveBack:o}})}function onGsapImageSlider(e){var t=document.querySelector(".js-img-slider"),n=document.querySelectorAll(".js-img-slider img"),o={slides:7,pause:1.5,width:e};n.length<=o.slides&&function(){for(var e=0;e<2;e++)t.appendChild(n[e].cloneNode(!0))}(),gsap.set(t,{clearProps:"all"});for(var r=gsap.timeline({repeat:-1,repeatDelay:0}),i=0;i<n.length;i++)r.to(t,{duration:.5,x:"-=".concat(o.width),ease:Expo.easeOut},"+=".concat(o.pause));return r}function onGsapRingProgress(){var e=document.querySelector(".js-ring-content"),t=document.querySelectorAll(".js-ring-content .js-ring"),n=document.querySelector(".js-ring-content svg"),o=document.querySelectorAll(".js-ring-content .recorder"),r=document.querySelectorAll(".js-ring-content .record-comment"),i=function(e,t){var n=e.getTotalLength(),o=n-t/100*n;e.style.strokeDashoffset=o};return gsap.timeline({scrollTrigger:{trigger:".js-ring-trigger",start:function(){return"".concat(e.offsetHeight/2,"px center")},end:"bottom bottom",scrub:1,pin:!0,onStart:function(){t.forEach(function(e){i(e,0)})},onUpdate:function(e){var a=100*calcScrollPercent(e.start,e.end);isNaN(a)&&(a=0);var c=a<1?1:Math.ceil(a/25);n.style.backgroundImage="url('images/home_training/Ring_Step".concat(c,".gif')"),r.forEach(function(e){e.dataset.step!=c?e.classList.remove("active"):e.classList.add("active")}),t.forEach(function(e){i(e,a)}),o.forEach(function(e){var t=e.dataset.min,n=e.dataset.max,o=Math.round((n-t)*a/100);e.innerText=isNaN(o)?0:o})}}})}function onGsapPlaylistPhone(e){var t=document.querySelector(".js-playlist-phone"),n=document.querySelectorAll(".js-playlist-phone .phone");if(gsap.set([t,n],{clearProps:"all"}),"pc"==e){var o=gsap.timeline({scrollTrigger:{trigger:".home-training-playlist-section",start:"-30% top"}});return n.forEach(function(e){o.from(e,{y:100,opacity:0,duration:1,ease:Power2.easeOut})}),o}return gsap.timeline({scrollTrigger:{trigger:".home-training-playlist-section",start:"top top",end:"bottom 50%",scrub:1,onUpdate:function(e){var n=calcScrollPercent(e.start,e.end);n>1&&(n=1),gsap.set(t,{x:"-".concat(250*n)})}},clearProps:"all"})}function calcScrollPercent(e,t){var n=window.pageYOffset;return n<e?n=e+1:n>t&&(n=t),(n-e)/(t-e)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _default={init:init};exports.default=_default;

},{}]},{},[1]);