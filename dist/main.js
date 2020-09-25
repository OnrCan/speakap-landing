"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

window.onload = function () {
  var textInputs = document.querySelectorAll('input[type="text"], input[type="email"]');

  var textInputParents = _toConsumableArray(textInputs).map(function (el) {
    return el.parentNode;
  });

  var textInputLabels = _toConsumableArray(textInputParents).map(function (parent) {
    return parent.querySelector('label');
  });

  textInputLabels.forEach(function (label) {
    if (!label) return;
    var input = label.nextElementSibling;
    input.addEventListener('focus', function (event) {
      label.classList.add('active');
    });
    input.addEventListener('blur', function (event) {
      if (event.target.value !== '') return;
      label.classList.remove('active');
    });
  });
  var chartsWrapper = document.querySelector('#js-stats-wrapper');

  function isElementInViewport(el) {
    // Special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
      el = el[0];
    }

    var rect = el.getBoundingClientRect();
    return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    /* or $(window).height() */
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    /* or $(window).width() */
    ;
  }

  function onVisibilityChange(el, callback) {
    var old_visible;
    return function () {
      var visible = isElementInViewport(el);

      if (visible != old_visible) {
        old_visible = visible;

        if (typeof callback == 'function') {
          callback();
        }
      }
    };
  }

  var handler = onVisibilityChange(chartsWrapper, function () {
    /* Your code go here */
    chartsWrapper.classList.toggle('animate');
  });

  if (window.addEventListener) {
    addEventListener('DOMContentLoaded', handler, false);
    addEventListener('load', handler, false);
    addEventListener('scroll', handler, false);
    addEventListener('resize', handler, false);
  } else if (window.attachEvent) {
    attachEvent('onDOMContentLoaded', handler); // Internet Explorer 9+ :(

    attachEvent('onload', handler);
    attachEvent('onscroll', handler);
    attachEvent('onresize', handler);
  }
};