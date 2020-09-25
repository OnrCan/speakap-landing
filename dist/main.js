"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

window.onload = function () {
  materialInput.init();
  chartsAnimation.init();
  modal.init();
};

var modal = {
  // There is something wrong with the Bootstrap modal
  // that's why I created this block, just to finish rapidly
  // 
  // Sign Up Modal for Mobile
  modal: document.querySelector('#signup-form-modal'),
  body: document.querySelector('body'),
  show: function show() {
    this.modal.classList.add('active');
    this.body.classList.add('oh');
  },
  close: function close() {
    this.modal.classList.remove('active');
    this.body.classList.remove('oh');
  },
  setEventlistener: function setEventlistener() {
    var signupModalButtons = document.querySelectorAll('.mobile-signup-modal-trigger');

    if (window.innerWidth <= 992 && signupModalButtons) {
      _toConsumableArray(signupModalButtons).forEach(function (el) {
        el.onclick = function (event) {
          event.preventDefault();
          event.stopPropagation();
          modal.show();
        };
      });
    }
  },
  init: function init() {
    this.setEventlistener();
    var modalClose = document.querySelector('.modal-close-button');
    modalClose.addEventListener('click', function () {
      modal.close();
    });
    window.addEventListener('resize', this.setEventlistener, false);
  }
};
var materialInput = {
  textInputLabels: function textInputLabels() {
    var textInputs = document.querySelectorAll('input[type="text"], input[type="email"]'),
        textInputParents = _toConsumableArray(textInputs).map(function (el) {
      return el.parentNode;
    });

    return _toConsumableArray(textInputParents).map(function (parent) {
      return parent.querySelector('label');
    });
  },
  init: function init() {
    var labels = this.textInputLabels();
    labels.forEach(function (label) {
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
  }
};
var chartsAnimation = {
  chartsWrapper: document.querySelector('#js-stats-wrapper'),
  isElementInViewport: function isElementInViewport(el) {
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
  },
  onVisibilityChange: function onVisibilityChange(el, callback) {
    var old_visible;
    return function () {
      var visible = chartsAnimation.isElementInViewport(el);

      if (visible != old_visible) {
        old_visible = visible;

        if (typeof callback == 'function') {
          callback();
        }
      }
    };
  },
  init: function init() {
    var _this = this;

    var handler = this.onVisibilityChange(this.chartsWrapper, function () {
      _this.chartsWrapper.classList.toggle('animate');

      return;
    });
    window.addEventListener('DOMContentLoaded', handler, false);
    window.addEventListener('load', handler, false);
    window.addEventListener('scroll', handler, false);
    return;
  }
};