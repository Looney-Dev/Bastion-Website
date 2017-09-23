/**
 * @license
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function () {
  'use strict';

  /**
   * Class constructor for Radio MDL component.
   * Implements MDL component design pattern defined at:
   * https://github.com/jasonmayes/mdl-component-design-pattern
   *
   * @constructor
   * @param {HTMLElement} element The element that will be upgraded.
   */

  var MaterialRadio = function MaterialRadio(element) {
    this.element_ = element;

    // Initialize instance.
    this.init();
  };
  window['MaterialRadio'] = MaterialRadio;

  /**
   * Store constants in one place so they can be updated easily.
   *
   * @enum {string | number}
   * @private
   */
  MaterialRadio.prototype.Constant_ = {
    TINY_TIMEOUT: 0.001
  };

  /**
   * Store strings for class names defined by this component that are used in
   * JavaScript. This allows us to simply change it in one place should we
   * decide to modify at a later date.
   *
   * @enum {string}
   * @private
   */
  MaterialRadio.prototype.CssClasses_ = {
    IS_FOCUSED: 'is-focused',
    IS_DISABLED: 'is-disabled',
    IS_CHECKED: 'is-checked',
    IS_UPGRADED: 'is-upgraded',
    JS_RADIO: 'mdl-js-radio',
    RADIO_BTN: 'mdl-radio__button',
    RADIO_OUTER_CIRCLE: 'mdl-radio__outer-circle',
    RADIO_INNER_CIRCLE: 'mdl-radio__inner-circle',
    RIPPLE_EFFECT: 'mdl-js-ripple-effect',
    RIPPLE_IGNORE_EVENTS: 'mdl-js-ripple-effect--ignore-events',
    RIPPLE_CONTAINER: 'mdl-radio__ripple-container',
    RIPPLE_CENTER: 'mdl-ripple--center',
    RIPPLE: 'mdl-ripple'
  };

  /**
   * Handle change of state.
   *
   * @param {Event} event The event that fired.
   * @private
   */
  MaterialRadio.prototype.onChange_ = function (event) {
    // Since other radio buttons don't get change events, we need to look for
    // them to update their classes.
    var radios = document.getElementsByClassName(this.CssClasses_.JS_RADIO);
    for (var i = 0; i < radios.length; i++) {
      var button = radios[i].querySelector('.' + this.CssClasses_.RADIO_BTN);
      // Different name == different group, so no point updating those.
      if (button.getAttribute('name') === this.btnElement_.getAttribute('name')) {
        if (typeof radios[i]['MaterialRadio'] !== 'undefined') {
          radios[i]['MaterialRadio'].updateClasses_();
        }
      }
    }
  };

  /**
   * Handle focus.
   *
   * @param {Event} event The event that fired.
   * @private
   */
  MaterialRadio.prototype.onFocus_ = function (event) {
    this.element_.classList.add(this.CssClasses_.IS_FOCUSED);
  };

  /**
   * Handle lost focus.
   *
   * @param {Event} event The event that fired.
   * @private
   */
  MaterialRadio.prototype.onBlur_ = function (event) {
    this.element_.classList.remove(this.CssClasses_.IS_FOCUSED);
  };

  /**
   * Handle mouseup.
   *
   * @param {Event} event The event that fired.
   * @private
   */
  MaterialRadio.prototype.onMouseup_ = function (event) {
    this.blur_();
  };

  /**
   * Update classes.
   *
   * @private
   */
  MaterialRadio.prototype.updateClasses_ = function () {
    this.checkDisabled();
    this.checkToggleState();
  };

  /**
   * Add blur.
   *
   * @private
   */
  MaterialRadio.prototype.blur_ = function () {

    // TODO: figure out why there's a focus event being fired after our blur,
    // so that we can avoid this hack.
    window.setTimeout(function () {
      this.btnElement_.blur();
    }.bind(this), /** @type {number} */this.Constant_.TINY_TIMEOUT);
  };

  // Public methods.

  /**
   * Check the components disabled state.
   *
   * @public
   */
  MaterialRadio.prototype.checkDisabled = function () {
    if (this.btnElement_.disabled) {
      this.element_.classList.add(this.CssClasses_.IS_DISABLED);
    } else {
      this.element_.classList.remove(this.CssClasses_.IS_DISABLED);
    }
  };
  MaterialRadio.prototype['checkDisabled'] = MaterialRadio.prototype.checkDisabled;

  /**
   * Check the components toggled state.
   *
   * @public
   */
  MaterialRadio.prototype.checkToggleState = function () {
    if (this.btnElement_.checked) {
      this.element_.classList.add(this.CssClasses_.IS_CHECKED);
    } else {
      this.element_.classList.remove(this.CssClasses_.IS_CHECKED);
    }
  };
  MaterialRadio.prototype['checkToggleState'] = MaterialRadio.prototype.checkToggleState;

  /**
   * Disable radio.
   *
   * @public
   */
  MaterialRadio.prototype.disable = function () {
    this.btnElement_.disabled = true;
    this.updateClasses_();
  };
  MaterialRadio.prototype['disable'] = MaterialRadio.prototype.disable;

  /**
   * Enable radio.
   *
   * @public
   */
  MaterialRadio.prototype.enable = function () {
    this.btnElement_.disabled = false;
    this.updateClasses_();
  };
  MaterialRadio.prototype['enable'] = MaterialRadio.prototype.enable;

  /**
   * Check radio.
   *
   * @public
   */
  MaterialRadio.prototype.check = function () {
    this.btnElement_.checked = true;
    this.onChange_(null);
  };
  MaterialRadio.prototype['check'] = MaterialRadio.prototype.check;

  /**
   * Uncheck radio.
   *
   * @public
   */
  MaterialRadio.prototype.uncheck = function () {
    this.btnElement_.checked = false;
    this.onChange_(null);
  };
  MaterialRadio.prototype['uncheck'] = MaterialRadio.prototype.uncheck;

  /**
   * Initialize element.
   */
  MaterialRadio.prototype.init = function () {
    if (this.element_) {
      this.btnElement_ = this.element_.querySelector('.' + this.CssClasses_.RADIO_BTN);

      this.boundChangeHandler_ = this.onChange_.bind(this);
      this.boundFocusHandler_ = this.onChange_.bind(this);
      this.boundBlurHandler_ = this.onBlur_.bind(this);
      this.boundMouseUpHandler_ = this.onMouseup_.bind(this);

      var outerCircle = document.createElement('span');
      outerCircle.classList.add(this.CssClasses_.RADIO_OUTER_CIRCLE);

      var innerCircle = document.createElement('span');
      innerCircle.classList.add(this.CssClasses_.RADIO_INNER_CIRCLE);

      this.element_.appendChild(outerCircle);
      this.element_.appendChild(innerCircle);

      var rippleContainer;
      if (this.element_.classList.contains(this.CssClasses_.RIPPLE_EFFECT)) {
        this.element_.classList.add(this.CssClasses_.RIPPLE_IGNORE_EVENTS);
        rippleContainer = document.createElement('span');
        rippleContainer.classList.add(this.CssClasses_.RIPPLE_CONTAINER);
        rippleContainer.classList.add(this.CssClasses_.RIPPLE_EFFECT);
        rippleContainer.classList.add(this.CssClasses_.RIPPLE_CENTER);
        rippleContainer.addEventListener('mouseup', this.boundMouseUpHandler_);

        var ripple = document.createElement('span');
        ripple.classList.add(this.CssClasses_.RIPPLE);

        rippleContainer.appendChild(ripple);
        this.element_.appendChild(rippleContainer);
      }

      this.btnElement_.addEventListener('change', this.boundChangeHandler_);
      this.btnElement_.addEventListener('focus', this.boundFocusHandler_);
      this.btnElement_.addEventListener('blur', this.boundBlurHandler_);
      this.element_.addEventListener('mouseup', this.boundMouseUpHandler_);

      this.updateClasses_();
      this.element_.classList.add(this.CssClasses_.IS_UPGRADED);
    }
  };

  // The component registers itself. It can assume componentHandler is available
  // in the global scope.
  componentHandler.register({
    constructor: MaterialRadio,
    classAsString: 'MaterialRadio',
    cssClass: 'mdl-js-radio',
    widget: true
  });
})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJhZGlvLmpzIl0sIm5hbWVzIjpbIk1hdGVyaWFsUmFkaW8iLCJlbGVtZW50IiwiZWxlbWVudF8iLCJpbml0Iiwid2luZG93IiwicHJvdG90eXBlIiwiQ29uc3RhbnRfIiwiVElOWV9USU1FT1VUIiwiQ3NzQ2xhc3Nlc18iLCJJU19GT0NVU0VEIiwiSVNfRElTQUJMRUQiLCJJU19DSEVDS0VEIiwiSVNfVVBHUkFERUQiLCJKU19SQURJTyIsIlJBRElPX0JUTiIsIlJBRElPX09VVEVSX0NJUkNMRSIsIlJBRElPX0lOTkVSX0NJUkNMRSIsIlJJUFBMRV9FRkZFQ1QiLCJSSVBQTEVfSUdOT1JFX0VWRU5UUyIsIlJJUFBMRV9DT05UQUlORVIiLCJSSVBQTEVfQ0VOVEVSIiwiUklQUExFIiwib25DaGFuZ2VfIiwiZXZlbnQiLCJyYWRpb3MiLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJpIiwibGVuZ3RoIiwiYnV0dG9uIiwicXVlcnlTZWxlY3RvciIsImdldEF0dHJpYnV0ZSIsImJ0bkVsZW1lbnRfIiwidXBkYXRlQ2xhc3Nlc18iLCJvbkZvY3VzXyIsImNsYXNzTGlzdCIsImFkZCIsIm9uQmx1cl8iLCJyZW1vdmUiLCJvbk1vdXNldXBfIiwiYmx1cl8iLCJjaGVja0Rpc2FibGVkIiwiY2hlY2tUb2dnbGVTdGF0ZSIsInNldFRpbWVvdXQiLCJibHVyIiwiYmluZCIsImRpc2FibGVkIiwiY2hlY2tlZCIsImRpc2FibGUiLCJlbmFibGUiLCJjaGVjayIsInVuY2hlY2siLCJib3VuZENoYW5nZUhhbmRsZXJfIiwiYm91bmRGb2N1c0hhbmRsZXJfIiwiYm91bmRCbHVySGFuZGxlcl8iLCJib3VuZE1vdXNlVXBIYW5kbGVyXyIsIm91dGVyQ2lyY2xlIiwiY3JlYXRlRWxlbWVudCIsImlubmVyQ2lyY2xlIiwiYXBwZW5kQ2hpbGQiLCJyaXBwbGVDb250YWluZXIiLCJjb250YWlucyIsImFkZEV2ZW50TGlzdGVuZXIiLCJyaXBwbGUiLCJjb21wb25lbnRIYW5kbGVyIiwicmVnaXN0ZXIiLCJjb25zdHJ1Y3RvciIsImNsYXNzQXNTdHJpbmciLCJjc3NDbGFzcyIsIndpZGdldCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUJBLENBQUMsWUFBVztBQUNWOztBQUVBOzs7Ozs7Ozs7QUFRQSxNQUFJQSxnQkFBZ0IsU0FBU0EsYUFBVCxDQUF1QkMsT0FBdkIsRUFBZ0M7QUFDbEQsU0FBS0MsUUFBTCxHQUFnQkQsT0FBaEI7O0FBRUE7QUFDQSxTQUFLRSxJQUFMO0FBQ0QsR0FMRDtBQU1BQyxTQUFPLGVBQVAsSUFBMEJKLGFBQTFCOztBQUVBOzs7Ozs7QUFNQUEsZ0JBQWNLLFNBQWQsQ0FBd0JDLFNBQXhCLEdBQW9DO0FBQ2xDQyxrQkFBYztBQURvQixHQUFwQzs7QUFJQTs7Ozs7Ozs7QUFRQVAsZ0JBQWNLLFNBQWQsQ0FBd0JHLFdBQXhCLEdBQXNDO0FBQ3BDQyxnQkFBWSxZQUR3QjtBQUVwQ0MsaUJBQWEsYUFGdUI7QUFHcENDLGdCQUFZLFlBSHdCO0FBSXBDQyxpQkFBYSxhQUp1QjtBQUtwQ0MsY0FBVSxjQUwwQjtBQU1wQ0MsZUFBVyxtQkFOeUI7QUFPcENDLHdCQUFvQix5QkFQZ0I7QUFRcENDLHdCQUFvQix5QkFSZ0I7QUFTcENDLG1CQUFlLHNCQVRxQjtBQVVwQ0MsMEJBQXNCLHFDQVZjO0FBV3BDQyxzQkFBa0IsNkJBWGtCO0FBWXBDQyxtQkFBZSxvQkFacUI7QUFhcENDLFlBQVE7QUFiNEIsR0FBdEM7O0FBZ0JBOzs7Ozs7QUFNQXJCLGdCQUFjSyxTQUFkLENBQXdCaUIsU0FBeEIsR0FBb0MsVUFBU0MsS0FBVCxFQUFnQjtBQUNsRDtBQUNBO0FBQ0EsUUFBSUMsU0FBU0MsU0FBU0Msc0JBQVQsQ0FBZ0MsS0FBS2xCLFdBQUwsQ0FBaUJLLFFBQWpELENBQWI7QUFDQSxTQUFLLElBQUljLElBQUksQ0FBYixFQUFnQkEsSUFBSUgsT0FBT0ksTUFBM0IsRUFBbUNELEdBQW5DLEVBQXdDO0FBQ3RDLFVBQUlFLFNBQVNMLE9BQU9H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RSxnQkFBaEIsQ0FBaUMsU0FBakMsRUFBNEMsS0FBS1Asb0JBQWpEOztBQUVBLFlBQUlRLFNBQVN0QyxTQUFTZ0MsYUFBVCxDQUF1QixNQUF2QixDQUFiO0FBQ0FNLGVBQU81QixTQUFQLENBQWlCQyxHQUFqQixDQUFxQixLQUFLNUIsV0FBTCxDQUFpQmEsTUFBdEM7O0FBRUF1Qyx3QkFBZ0JELFdBQWhCLENBQTRCSSxNQUE1QjtBQUNBLGFBQUs3RCxRQUFMLENBQWN5RCxXQUFkLENBQTBCQyxlQUExQjtBQUNEOztBQUVELFdBQUs1QixXQUFMLENBQWlCOEIsZ0JBQWpCLENBQWtDLFFBQWxDLEVBQTRDLEtBQUtWLG1CQUFqRDtBQUNBLFdBQUtwQixXQUFMLENBQWlCOEIsZ0JBQWpCLENBQWtDLE9BQWxDLEVBQTJDLEtBQUtULGtCQUFoRDtBQUNBLFdBQUtyQixXQUFMLENBQWlCOEIsZ0JBQWpCLENBQWtDLE1BQWxDLEVBQTBDLEtBQUtSLGlCQUEvQztBQUNBLFdBQUtwRCxRQUFMLENBQWM0RCxnQkFBZCxDQUErQixTQUEvQixFQUEwQyxLQUFLUCxvQkFBL0M7O0FBRUEsV0FBS3RCLGNBQUw7QUFDQSxXQUFLL0IsUUFBTCxDQUFjaUMsU0FBZCxDQUF3QkMsR0FBeEIsQ0FBNEIsS0FBSzVCLFdBQUwsQ0FBaUJJLFdBQTdDO0FBQ0Q7QUFDRixHQTlDRDs7QUFnREE7QUFDQTtBQUNBb0QsbUJBQWlCQyxRQUFqQixDQUEwQjtBQUN4QkMsaUJBQWFsRSxhQURXO0FBRXhCbUUsbUJBQWUsZUFGUztBQUd4QkMsY0FBVSxjQUhjO0FBSXhCQyxZQUFRO0FBSmdCLEdBQTFCO0FBTUQsQ0F2UUQiLCJmaWxlIjoicmFkaW8uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNSBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLyoqXG4gICAqIENsYXNzIGNvbnN0cnVjdG9yIGZvciBSYWRpbyBNREwgY29tcG9uZW50LlxuICAgKiBJbXBsZW1lbnRzIE1ETCBjb21wb25lbnQgZGVzaWduIHBhdHRlcm4gZGVmaW5lZCBhdDpcbiAgICogaHR0cHM6Ly9naXRodWIuY29tL2phc29ubWF5ZXMvbWRsLWNvbXBvbmVudC1kZXNpZ24tcGF0dGVyblxuICAgKlxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYmUgdXBncmFkZWQuXG4gICAqL1xuICB2YXIgTWF0ZXJpYWxSYWRpbyA9IGZ1bmN0aW9uIE1hdGVyaWFsUmFkaW8oZWxlbWVudCkge1xuICAgIHRoaXMuZWxlbWVudF8gPSBlbGVtZW50O1xuXG4gICAgLy8gSW5pdGlhbGl6ZSBpbnN0YW5jZS5cbiAgICB0aGlzLmluaXQoKTtcbiAgfTtcbiAgd2luZG93WydNYXRlcmlhbFJhZGlvJ10gPSBNYXRlcmlhbFJhZGlvO1xuXG4gIC8qKlxuICAgKiBTdG9yZSBjb25zdGFudHMgaW4gb25lIHBsYWNlIHNvIHRoZXkgY2FuIGJlIHVwZGF0ZWQgZWFzaWx5LlxuICAgKlxuICAgKiBAZW51bSB7c3RyaW5nIHwgbnVtYmVyfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgTWF0ZXJpYWxSYWRpby5wcm90b3R5cGUuQ29uc3RhbnRfID0ge1xuICAgIFRJTllfVElNRU9VVDogMC4wMDFcbiAgfTtcblxuICAvKipcbiAgICogU3RvcmUgc3RyaW5ncyBmb3IgY2xhc3MgbmFtZXMgZGVmaW5lZCBieSB0aGlzIGNvbXBvbmVudCB0aGF0IGFyZSB1c2VkIGluXG4gICAqIEphdmFTY3JpcHQuIFRoaXMgYWxsb3dzIHVzIHRvIHNpbXBseSBjaGFuZ2UgaXQgaW4gb25lIHBsYWNlIHNob3VsZCB3ZVxuICAgKiBkZWNpZGUgdG8gbW9kaWZ5IGF0IGEgbGF0ZXIgZGF0ZS5cbiAgICpcbiAgICogQGVudW0ge3N0cmluZ31cbiAgICogQHByaXZhdGVcbiAgICovXG4gIE1hdGVyaWFsUmFkaW8ucHJvdG90eXBlLkNzc0NsYXNzZXNfID0ge1xuICAgIElTX0ZPQ1VTRUQ6ICdpcy1mb2N1c2VkJyxcbiAgICBJU19ESVNBQkxFRDogJ2lzLWRpc2FibGVkJyxcbiAgICBJU19DSEVDS0VEOiAnaXMtY2hlY2tlZCcsXG4gICAgSVNfVVBHUkFERUQ6ICdpcy11cGdyYWRlZCcsXG4gICAgSlNfUkFESU86ICdtZGwtanMtcmFkaW8nLFxuICAgIFJBRElPX0JUTjogJ21kbC1yYWRpb19fYnV0dG9uJyxcbiAgICBSQURJT19PVVRFUl9DSVJDTEU6ICdtZGwtcmFkaW9fX291dGVyLWNpcmNsZScsXG4gICAgUkFESU9fSU5ORVJfQ0lSQ0xFOiAnbWRsLXJhZGlvX19pbm5lci1jaXJjbGUnLFxuICAgIFJJUFBMRV9FRkZFQ1Q6ICdtZGwtanMtcmlwcGxlLWVmZmVjdCcsXG4gICAgUklQUExFX0lHTk9SRV9FVkVOVFM6ICdtZGwtanMtcmlwcGxlLWVmZmVjdC0taWdub3JlLWV2ZW50cycsXG4gICAgUklQUExFX0NPTlRBSU5FUjogJ21kbC1yYWRpb19fcmlwcGxlLWNvbnRhaW5lcicsXG4gICAgUklQUExFX0NFTlRFUjogJ21kbC1yaXBwbGUtLWNlbnRlcicsXG4gICAgUklQUExFOiAnbWRsLXJpcHBsZSdcbiAgfTtcblxuICAvKipcbiAgICogSGFuZGxlIGNoYW5nZSBvZiBzdGF0ZS5cbiAgICpcbiAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgVGhlIGV2ZW50IHRoYXQgZmlyZWQuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBNYXRlcmlhbFJhZGlvLnByb3RvdHlwZS5vbkNoYW5nZV8gPSBmdW5jdGlvbihldmVudCkge1xuICAgIC8vIFNpbmNlIG90aGVyIHJhZGlvIGJ1dHRvbnMgZG9uJ3QgZ2V0IGNoYW5nZSBldmVudHMsIHdlIG5lZWQgdG8gbG9vayBmb3JcbiAgICAvLyB0aGVtIHRvIHVwZGF0ZSB0aGVpciBjbGFzc2VzLlxuICAgIHZhciByYWRpb3MgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMuQ3NzQ2xhc3Nlc18uSlNfUkFESU8pO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmFkaW9zLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgYnV0dG9uID0gcmFkaW9zW2ldLnF1ZXJ5U2VsZWN0b3IoJy4nICsgdGhpcy5Dc3NDbGFzc2VzXy5SQURJT19CVE4pO1xuICAgICAgLy8gRGlmZmVyZW50IG5hbWUgPT0gZGlmZmVyZW50IGdyb3VwLCBzbyBubyBwb2ludCB1cGRhdGluZyB0aG9zZS5cbiAgICAgIGlmIChidXR0b24uZ2V0QXR0cmlidXRlKCduYW1lJykgPT09IHRoaXMuYnRuRWxlbWVudF8uZ2V0QXR0cmlidXRlKCduYW1lJykpIHtcbiAgICAgICAgaWYgKHR5cGVvZiByYWRpb3NbaV1bJ01hdGVyaWFsUmFkaW8nXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICByYWRpb3NbaV1bJ01hdGVyaWFsUmFkaW8nXS51cGRhdGVDbGFzc2VzXygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBIYW5kbGUgZm9jdXMuXG4gICAqXG4gICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IFRoZSBldmVudCB0aGF0IGZpcmVkLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgTWF0ZXJpYWxSYWRpby5wcm90b3R5cGUub25Gb2N1c18gPSBmdW5jdGlvbihldmVudCkge1xuICAgIHRoaXMuZWxlbWVudF8uY2xhc3NMaXN0LmFkZCh0aGlzLkNzc0NsYXNzZXNfLklTX0ZPQ1VTRUQpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBIYW5kbGUgbG9zdCBmb2N1cy5cbiAgICpcbiAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgVGhlIGV2ZW50IHRoYXQgZmlyZWQuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBNYXRlcmlhbFJhZGlvLnByb3RvdHlwZS5vbkJsdXJfID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICB0aGlzLmVsZW1lbnRfLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5Dc3NDbGFzc2VzXy5JU19GT0NVU0VEKTtcbiAgfTtcblxuICAvKipcbiAgICogSGFuZGxlIG1vdXNldXAuXG4gICAqXG4gICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IFRoZSBldmVudCB0aGF0IGZpcmVkLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgTWF0ZXJpYWxSYWRpby5wcm90b3R5cGUub25Nb3VzZXVwXyA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgdGhpcy5ibHVyXygpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBVcGRhdGUgY2xhc3Nlcy5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICovXG4gIE1hdGVyaWFsUmFkaW8ucHJvdG90eXBlLnVwZGF0ZUNsYXNzZXNfID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5jaGVja0Rpc2FibGVkKCk7XG4gICAgdGhpcy5jaGVja1RvZ2dsZVN0YXRlKCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEFkZCBibHVyLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgTWF0ZXJpYWxSYWRpby5wcm90b3R5cGUuYmx1cl8gPSBmdW5jdGlvbigpIHtcblxuICAgIC8vIFRPRE86IGZpZ3VyZSBvdXQgd2h5IHRoZXJlJ3MgYSBmb2N1cyBldmVudCBiZWluZyBmaXJlZCBhZnRlciBvdXIgYmx1cixcbiAgICAvLyBzbyB0aGF0IHdlIGNhbiBhdm9pZCB0aGlzIGhhY2suXG4gICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmJ0bkVsZW1lbnRfLmJsdXIoKTtcbiAgICB9LmJpbmQodGhpcyksIC8qKiBAdHlwZSB7bnVtYmVyfSAqLyAodGhpcy5Db25zdGFudF8uVElOWV9USU1FT1VUKSk7XG4gIH07XG5cbiAgLy8gUHVibGljIG1ldGhvZHMuXG5cbiAgLyoqXG4gICAqIENoZWNrIHRoZSBjb21wb25lbnRzIGRpc2FibGVkIHN0YXRlLlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqL1xuICBNYXRlcmlhbFJhZGlvLnByb3RvdHlwZS5jaGVja0Rpc2FibGVkID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuYnRuRWxlbWVudF8uZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuZWxlbWVudF8uY2xhc3NMaXN0LmFkZCh0aGlzLkNzc0NsYXNzZXNfLklTX0RJU0FCTEVEKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbGVtZW50Xy5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuQ3NzQ2xhc3Nlc18uSVNfRElTQUJMRUQpO1xuICAgIH1cbiAgfTtcbiAgTWF0ZXJpYWxSYWRpby5wcm90b3R5cGVbJ2NoZWNrRGlzYWJsZWQnXSA9XG4gICAgICBNYXRlcmlhbFJhZGlvLnByb3RvdHlwZS5jaGVja0Rpc2FibGVkO1xuXG4gIC8qKlxuICAgKiBDaGVjayB0aGUgY29tcG9uZW50cyB0b2dnbGVkIHN0YXRlLlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqL1xuICBNYXRlcmlhbFJhZGlvLnByb3RvdHlwZS5jaGVja1RvZ2dsZVN0YXRlID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuYnRuRWxlbWVudF8uY2hlY2tlZCkge1xuICAgICAgdGhpcy5lbGVtZW50Xy5jbGFzc0xpc3QuYWRkKHRoaXMuQ3NzQ2xhc3Nlc18uSVNfQ0hFQ0tFRCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZWxlbWVudF8uY2xhc3NMaXN0LnJlbW92ZSh0aGlzLkNzc0NsYXNzZXNfLklTX0NIRUNLRUQpO1xuICAgIH1cbiAgfTtcbiAgTWF0ZXJpYWxSYWRpby5wcm90b3R5cGVbJ2NoZWNrVG9nZ2xlU3RhdGUnXSA9XG4gICAgICBNYXRlcmlhbFJhZGlvLnByb3RvdHlwZS5jaGVja1RvZ2dsZVN0YXRlO1xuXG4gIC8qKlxuICAgKiBEaXNhYmxlIHJhZGlvLlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqL1xuICBNYXRlcmlhbFJhZGlvLnByb3RvdHlwZS5kaXNhYmxlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5idG5FbGVtZW50Xy5kaXNhYmxlZCA9IHRydWU7XG4gICAgdGhpcy51cGRhdGVDbGFzc2VzXygpO1xuICB9O1xuICBNYXRlcmlhbFJhZGlvLnByb3RvdHlwZVsnZGlzYWJsZSddID0gTWF0ZXJpYWxSYWRpby5wcm90b3R5cGUuZGlzYWJsZTtcblxuICAvKipcbiAgICogRW5hYmxlIHJhZGlvLlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqL1xuICBNYXRlcmlhbFJhZGlvLnByb3RvdHlwZS5lbmFibGUgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmJ0bkVsZW1lbnRfLmRpc2FibGVkID0gZmFsc2U7XG4gICAgdGhpcy51cGRhdGVDbGFzc2VzXygpO1xuICB9O1xuICBNYXRlcmlhbFJhZGlvLnByb3RvdHlwZVsnZW5hYmxlJ10gPSBNYXRlcmlhbFJhZGlvLnByb3RvdHlwZS5lbmFibGU7XG5cbiAgLyoqXG4gICAqIENoZWNrIHJhZGlvLlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqL1xuICBNYXRlcmlhbFJhZGlvLnByb3RvdHlwZS5jaGVjayA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuYnRuRWxlbWVudF8uY2hlY2tlZCA9IHRydWU7XG4gICAgdGhpcy5vbkNoYW5nZV8obnVsbCk7XG4gIH07XG4gIE1hdGVyaWFsUmFkaW8ucHJvdG90eXBlWydjaGVjayddID0gTWF0ZXJpYWxSYWRpby5wcm90b3R5cGUuY2hlY2s7XG5cbiAgLyoqXG4gICAqIFVuY2hlY2sgcmFkaW8uXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIE1hdGVyaWFsUmFkaW8ucHJvdG90eXBlLnVuY2hlY2sgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmJ0bkVsZW1lbnRfLmNoZWNrZWQgPSBmYWxzZTtcbiAgICB0aGlzLm9uQ2hhbmdlXyhudWxsKTtcbiAgfTtcbiAgTWF0ZXJpYWxSYWRpby5wcm90b3R5cGVbJ3VuY2hlY2snXSA9IE1hdGVyaWFsUmFkaW8ucHJvdG90eXBlLnVuY2hlY2s7XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgZWxlbWVudC5cbiAgICovXG4gIE1hdGVyaWFsUmFkaW8ucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5lbGVtZW50Xykge1xuICAgICAgdGhpcy5idG5FbGVtZW50XyA9IHRoaXMuZWxlbWVudF8ucXVlcnlTZWxlY3RvcignLicgK1xuICAgICAgICAgIHRoaXMuQ3NzQ2xhc3Nlc18uUkFESU9fQlROKTtcblxuICAgICAgdGhpcy5ib3VuZENoYW5nZUhhbmRsZXJfID0gdGhpcy5vbkNoYW5nZV8uYmluZCh0aGlzKTtcbiAgICAgIHRoaXMuYm91bmRGb2N1c0hhbmRsZXJfID0gdGhpcy5vbkNoYW5nZV8uYmluZCh0aGlzKTtcbiAgICAgIHRoaXMuYm91bmRCbHVySGFuZGxlcl8gPSB0aGlzLm9uQmx1cl8uYmluZCh0aGlzKTtcbiAgICAgIHRoaXMuYm91bmRNb3VzZVVwSGFuZGxlcl8gPSB0aGlzLm9uTW91c2V1cF8uYmluZCh0aGlzKTtcblxuICAgICAgdmFyIG91dGVyQ2lyY2xlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgb3V0ZXJDaXJjbGUuY2xhc3NMaXN0LmFkZCh0aGlzLkNzc0NsYXNzZXNfLlJBRElPX09VVEVSX0NJUkNMRSk7XG5cbiAgICAgIHZhciBpbm5lckNpcmNsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgIGlubmVyQ2lyY2xlLmNsYXNzTGlzdC5hZGQodGhpcy5Dc3NDbGFzc2VzXy5SQURJT19JTk5FUl9DSVJDTEUpO1xuXG4gICAgICB0aGlzLmVsZW1lbnRfLmFwcGVuZENoaWxkKG91dGVyQ2lyY2xlKTtcbiAgICAgIHRoaXMuZWxlbWVudF8uYXBwZW5kQ2hpbGQoaW5uZXJDaXJjbGUpO1xuXG4gICAgICB2YXIgcmlwcGxlQ29udGFpbmVyO1xuICAgICAgaWYgKHRoaXMuZWxlbWVudF8uY2xhc3NMaXN0LmNvbnRhaW5zKFxuICAgICAgICAgIHRoaXMuQ3NzQ2xhc3Nlc18uUklQUExFX0VGRkVDVCkpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50Xy5jbGFzc0xpc3QuYWRkKFxuICAgICAgICAgICAgdGhpcy5Dc3NDbGFzc2VzXy5SSVBQTEVfSUdOT1JFX0VWRU5UUyk7XG4gICAgICAgIHJpcHBsZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgcmlwcGxlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXG4gICAgICAgICAgICB0aGlzLkNzc0NsYXNzZXNfLlJJUFBMRV9DT05UQUlORVIpO1xuICAgICAgICByaXBwbGVDb250YWluZXIuY2xhc3NMaXN0LmFkZCh0aGlzLkNzc0NsYXNzZXNfLlJJUFBMRV9FRkZFQ1QpO1xuICAgICAgICByaXBwbGVDb250YWluZXIuY2xhc3NMaXN0LmFkZCh0aGlzLkNzc0NsYXNzZXNfLlJJUFBMRV9DRU5URVIpO1xuICAgICAgICByaXBwbGVDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuYm91bmRNb3VzZVVwSGFuZGxlcl8pO1xuXG4gICAgICAgIHZhciByaXBwbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIHJpcHBsZS5jbGFzc0xpc3QuYWRkKHRoaXMuQ3NzQ2xhc3Nlc18uUklQUExFKTtcblxuICAgICAgICByaXBwbGVDb250YWluZXIuYXBwZW5kQ2hpbGQocmlwcGxlKTtcbiAgICAgICAgdGhpcy5lbGVtZW50Xy5hcHBlbmRDaGlsZChyaXBwbGVDb250YWluZXIpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmJ0bkVsZW1lbnRfLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuYm91bmRDaGFuZ2VIYW5kbGVyXyk7XG4gICAgICB0aGlzLmJ0bkVsZW1lbnRfLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcy5ib3VuZEZvY3VzSGFuZGxlcl8pO1xuICAgICAgdGhpcy5idG5FbGVtZW50Xy5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgdGhpcy5ib3VuZEJsdXJIYW5kbGVyXyk7XG4gICAgICB0aGlzLmVsZW1lbnRfLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmJvdW5kTW91c2VVcEhhbmRsZXJfKTtcblxuICAgICAgdGhpcy51cGRhdGVDbGFzc2VzXygpO1xuICAgICAgdGhpcy5lbGVtZW50Xy5jbGFzc0xpc3QuYWRkKHRoaXMuQ3NzQ2xhc3Nlc18uSVNfVVBHUkFERUQpO1xuICAgIH1cbiAgfTtcblxuICAvLyBUaGUgY29tcG9uZW50IHJlZ2lzdGVycyBpdHNlbGYuIEl0IGNhbiBhc3N1bWUgY29tcG9uZW50SGFuZGxlciBpcyBhdmFpbGFibGVcbiAgLy8gaW4gdGhlIGdsb2JhbCBzY29wZS5cbiAgY29tcG9uZW50SGFuZGxlci5yZWdpc3Rlcih7XG4gICAgY29uc3RydWN0b3I6IE1hdGVyaWFsUmFkaW8sXG4gICAgY2xhc3NBc1N0cmluZzogJ01hdGVyaWFsUmFkaW8nLFxuICAgIGNzc0NsYXNzOiAnbWRsLWpzLXJhZGlvJyxcbiAgICB3aWRnZXQ6IHRydWVcbiAgfSk7XG59KSgpO1xuIl19