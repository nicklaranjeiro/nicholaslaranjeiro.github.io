function isFieldPatched(fieldName) {
    return $(`input[name=${fieldName}]`)
        .closest('.input-group')
        .find('input.patch-input')
        .eq(0)
        .prop('checked');
}

function isToggleForFieldOn(fieldName) {
    return $(`input[name=${fieldName}]`).prop('checked');
}

$(document).ready(function () {
    $('#downloadForm').on('submit', function (e) {
        e.preventDefault();
        confirm('Do you really want to generate your CFW? This is an experimental tool!');
        var version = $('select[name="version"]').val();
        var output = $('select[name="output"]').val();

        var name = $('input[name="name"]').val(); // note: file name

        var speed_normal_kmh = $('input[name="speed_normal_kmh"]').val();

        var cruise_control_delay = $('input[name="cruise_control_delay"]').val();
        var motor_start_speed = $('input[name="motor_start_speed"]').val();
        var motor_power_constant = $('input[name="motor_power_constant"]').val();

        var url =
            "https://get.scooterhacking.org/max?version=" + version + "&output=" + output;

        if(isFieldPatched('name')) {
            url += "&name=" + name;
        }

        if(isFieldPatched('speed_normal_kmh')) {
            url += "&speed_normal_kmh=" + speed_normal_kmh;
        }

        if(isFieldPatched('cruise_control_delay')) {
            url += "&cruise_control_delay=" + cruise_control_delay;
        }

        if(isFieldPatched('motor_start_speed')) {
            url += "&motor_start_speed=" + motor_start_speed;
        }

        if(isFieldPatched('motor_power_constant')) {
            url += "&motor_power_constant=" + motor_power_constant;
        }

        url += "&compat_patches=on";

        if (isToggleForFieldOn('version_spoofing')) {
            url += '&version_spoofing=on';
        } else {
            url += '&version_spoofing=off';
        }

        if (isToggleForFieldOn('no_kers')) {
            url += '&no_kers=on';
        } else {
            url += '&no_kers=off';
        }

        if (isToggleForFieldOn('bypass_BMS')) {
            url += '&bypass_BMS=on';
        } else {
            url += '&bypass_BMS=off';
        }

        if (isToggleForFieldOn('throttle_alg')) {
            url += '&throttle_alg=on';
        } else {
            url += '&throttle_alg=off';
        }

        if (isToggleForFieldOn('stay_on_locked')) {
            url += '&stay_on_locked=on';
        } else {
            url += '&stay_on_locked=off';
        }

        if (matchesExistingPreset()) {
            // do local download

        } else {
            // do web download
            //window.location.replace(url);
            errorPopup();

        }
    });
});

$('.input-group-text input').change(function() {
    var inputElement = $(this).closest('.input-group').find('input.form-control').eq(0);
    var attr = inputElement.attr('disabled');

    // For some browsers, `attr` is undefined; for others, `attr` is false. Check for both.
    if (typeof attr !== typeof undefined && attr !== false) {
        // Element has this attribute
        inputElement.prop('disabled', false);
    } else {
        // Element does not have this attribute
        inputElement.prop('disabled', true);
    }
});

function setBooleanForPatchCheckbox(fieldName, value) {
    if (isFieldPatched(fieldName) && !value) {
        $(`input[name=${fieldName}]`)
            .closest('.input-group')
            .find('input.patch-input')
            .eq(0)
            .click();
    } else if (!isFieldPatched(fieldName) && value) {
        $(`input[name=${fieldName}]`)
            .closest('.input-group')
            .find('input.patch-input')
            .eq(0)
            .click();
    }
}

function fillInFieldsWithValues(name,
                                speed_normal_kmh,
                                cruise_control_delay,
                                motor_start_speed,
                                motor_power_constant,

                                name_patched,
                                speed_normal_kmh_patched,
                                cruise_control_delay_patched,
                                motor_start_speed_patched,
                                motor_power_constant_patched,

                                version_spoofing,
                                no_kers,
                                bypass_BMS,
                                throttle_alg,
                                stay_on_locked) {
    // input fields
    $('input[name="name"]').val(name);
    $('input[name="speed_normal_kmh"]').val(speed_normal_kmh);
    $('input[name="cruise_control_delay"]').val(cruise_control_delay);
    $('input[name="motor_start_speed"]').val(motor_start_speed);
    $('input[name="motor_power_constant"]').val(motor_power_constant);

    // patch checkboxes
    setBooleanForPatchCheckbox('name', name_patched);
    setBooleanForPatchCheckbox('speed_normal_kmh', speed_normal_kmh_patched);
    setBooleanForPatchCheckbox('cruise_control_delay', cruise_control_delay_patched);
    setBooleanForPatchCheckbox('motor_start_speed', motor_start_speed_patched);
    setBooleanForPatchCheckbox('motor_power_constant', motor_power_constant_patched);

    // toggles
    $('input[name="version_spoofing"]').prop('checked', version_spoofing);
    $('input[name="no_kers"]').prop('checked', no_kers);
    $('input[name="bypass_BMS"]').prop('checked', bypass_BMS);
    $('input[name="throttle_alg"]').prop('checked', throttle_alg);
    $('input[name="stay_on_locked"]').prop('checked', stay_on_locked);
}

function doFieldsMatchThese(name,
                            speed_normal_kmh,
                            cruise_control_delay,
                            motor_start_speed,
                            motor_power_constant,

                            name_patched,
                            speed_normal_kmh_patched,
                            cruise_control_delay_patched,
                            motor_start_speed_patched,
                            motor_power_constant_patched,

                            version_spoofing,
                            no_kers,
                            bypass_BMS,
                            throttle_alg,
                            stay_on_locked) {
    // input fields
    return $('input[name="name"]').val() === name &&
    $('input[name="speed_normal_kmh"]').val() === speed_normal_kmh &&
    $('input[name="cruise_control_delay"]').val() === cruise_control_delay &&
    $('input[name="motor_start_speed"]').val() === motor_start_speed &&
    $('input[name="motor_power_constant"]').val() === motor_power_constant &&

    // patch checkboxes
    isFieldPatched('name') === name_patched &&
    isFieldPatched('speed_normal_kmh') === speed_normal_kmh_patched &&
    isFieldPatched('cruise_control_delay') === cruise_control_delay_patched &&
    isFieldPatched('motor_start_speed') === motor_start_speed_patched &&
    isFieldPatched('motor_power_constant') === motor_power_constant_patched &&

    // toggles
    $('input[name="version_spoofing"]').prop('checked') === version_spoofing &&
    $('input[name="no_kers"]').prop('checked') === no_kers &&
    $('input[name="bypass_BMS"]').prop('checked') === bypass_BMS &&
    $('input[name="throttle_alg"]').prop('checked') === throttle_alg &&
    $('input[name="stay_on_locked"]').prop('checked') === stay_on_locked;
}

function matchesStock() {
    return doFieldsMatchThese(
        // input fields
        'DRV126',
        '33',
        '5',
        '5',
        '51575',

        // patch checkboxes
        false,
        true,
        true,
        true,
        true,

        // toggles
        false,
        false,
        false,
        false,
        false
    );
}

function matchesDN1() {
    return doFieldsMatchThese(
        // input fields
        'DaddyNord',
        '33',
        '3',
        '0',
        '35000',

        // patch checkboxes
        true,
        false,
        true,
        true,
        true,

        // toggles
        true,
        false,
        false,
        true,
        true,
    );
}

function matchesDN2() {
    return doFieldsMatchThese(
        // input fields
        'DaddyNordV2',
        '33',
        '2',
        '0',
        '28000',

        // patch checkboxes
        true,
        false,
        true,
        true,
        true,

        // toggles
        true,
        false,
        false,
        true,
        true
    );
}

function matchesMax() {
    return doFieldsMatchThese(
        // input fields
        'MAXedOut',
        '33',
        '3',
        '0',
        '22000',

        // patch checkboxes
        true,
        false,
        true,
        true,
        true,

        // toggles
        true,
        false,
        false,
        true,
        true
    );
}

function popUp(){
    alert("The generation API is currently unreachable, however preset files are still available for download.");
}

function matchesExistingPreset() {
    var output = $('select[name="output"]').val();

    if (matchesStock()) {
        if(output === 'zip') {
            window.location.replace('downloads/Stock/Android/DRV126-1583807239.zip');
        } else if (output === 'zip2') {
            window.location.replace('downloads/Stock/Android V2/DRV126-0x5e66faef.zip');
        } else if (output === 'bin') {
            window.location.replace('downloads/Stock/Developer/DRV126-1583807273.bin');
        } else if (output === 'enc') {
            window.location.replace('downloads/Stock/Windows/DRV126-1583807257.bin.enc');
        }

        return true;
    }

    if (matchesDN1()) {
        if(output === 'zip') {
            window.location.replace('downloads/DN1/Android/DRV126-DaddyNord.zip');
        } else if (output === 'zip2') {
            window.location.replace('downloads/DN1/Android V2/DRV126-DaddyNord.zip');
        } else if (output === 'bin') {
            window.location.replace('downloads/DN1/Developer/DRV126-DaddyNord.bin');
        } else if (output === 'enc') {
            window.location.replace('downloads/DN1/Windows/DRV126-DaddyNord.bin.enc');
        }

        return true;
    }

    if (matchesDN2()) {
            if(output === 'zip') {
                window.location.replace('downloads/DN2/Android/DRV126-DaddyNordV2.zip');
            } else if (output === 'zip2') {
                window.location.replace('downloads/DN2/Android V2/DRV126-DaddyNordV2.zip');
            } else if (output === 'bin') {
                window.location.replace('downloads/DN2/Developer/DRV126-DaddyNordV2.bin');
            } else if (output === 'enc') {
                window.location.replace('downloads/DN2/Windows/DRV126-DaddyNordV2.bin.enc');
            }
    
            return true;
        }

    if (matchesMax()) {
        if(output === 'zip') {
            window.location.replace('downloads/MAXed/Android/DRV126-MAXedOut.zip');
        } else if (output === 'zip2') {
            window.location.replace('downloads/MAXed/Android V2/DRV126-MAXedOut.zip');
        } else if (output === 'bin') {
            window.location.replace('downloads/MAXed/Developer/DRV126-MAXedOut.bin');
        } else if (output === 'enc') {
            window.location.replace('downloads/MAXed/Windows/DRV126-MAXedOut.bin.enc');
        }

        return true;
    }
}

// Follow this pattern: this is the code for the "Stock" Preset
$('button:contains("Stock")').click(function () {
    fillInFieldsWithValues(
        // input fields
        'DRV126',
        '33',
        '5',
        '5',
        '51575',

        // patch checkboxes
        false,
        true,
        true,
        true,
        true,

        // toggles
        false,
        false,
        false,
        false,
        false
        );
});

// "DN 1.0" Preset
$('button:contains("DaddyNord 1.0")').click(function () {
    fillInFieldsWithValues(
        // input fields
        'DaddyNord',
        '33',
        '3',
        '0',
        '35000',

        // patch checkboxes
        true,
        false,
        true,
        true,
        true,

        // toggles
        true,
        false,
        false,
        true,
        true
        );
});

// "DN 2.0" Preset
$('button:contains("DaddyNord 2.0")').click(function () {
    fillInFieldsWithValues(
        // input fields
        'DaddyNordV2',
        '33',
        '2',
        '0',
        '28000',

        // patch checkboxes
        true,
        false,
        true,
        true,
        true,

        // toggles
        true,
        false,
        false,
        true,
        true
        );
});

// "MAXed Out" Preset
$('button:contains("MAXed Out")').click(function () {
    fillInFieldsWithValues(
        // input fields
        'MAXedOut',
        '33',
        '3',
        '0',
        '22000',

        // patch checkboxes
        true,
        false,
        true,
        true,
        true,

        // toggles
        true,
        false,
        false,
        true,
        true
        );
});

$(document).ready(function($) {
    var hasSeenPopup = localStorage.getItem('hasSeenPopup');

    if (hasSeenPopup !== 'true') {
        $('.cd-popup').addClass('is-visible');
        localStorage.setItem('hasSeenPopup', 'true');
    }

    //close popup
    $('.cd-popup').on('click', function(event){
        if( $(event.target).is('.cd-popup-close') || $(event.target).is('.cd-popup') ) {
            event.preventDefault();
            $(this).removeClass('is-visible');
        }
    });

    //close popup when clicking the esc keyboard button
    $(document).keyup(function(event){
        if(event.which=='27'){
            $('.cd-popup').removeClass('is-visible');
        }
    });
});

$(document).foundation();

/*global define*/
(function (global, undefined) {
	"use strict";

	var document = global.document,
	    Alertify;

	Alertify = function () {

		var _alertify = {},
		    dialogs   = {},
		    isopen    = false,
		    keys      = { ENTER: 13, ESC: 27, SPACE: 32 },
		    queue     = [],
		    $, btnCancel, btnOK, btnReset, btnResetBack, btnFocus, elCallee, elCover, elDialog, elLog, form, input, getTransitionEvent;

		/**
		 * Markup pieces
		 * @type {Object}
		 */
		dialogs = {
			buttons : {
				holder : "<nav class=\"alertify-buttons\">{{buttons}}</nav>",
				submit : "<button type=\"submit\" class=\"alertify-button alertify-button-ok\" id=\"alertify-ok\">{{ok}}</button>",
				ok     : "<button class=\"alertify-button alertify-button-ok\" id=\"alertify-ok\">{{ok}}</button>",
				cancel : "<button class=\"alertify-button alertify-button-cancel\" id=\"alertify-cancel\">{{cancel}}</button>"
			},
			input   : "<div class=\"alertify-text-wrapper\"><input type=\"text\" class=\"alertify-text\" id=\"alertify-text\"></div>",
			message : "<p class=\"alertify-message\">{{message}}</p>",
			log     : "<article class=\"alertify-log{{class}}\">{{message}}</article>"
		};

		/**
		 * Return the proper transitionend event
		 * @return {String}    Transition type string
		 */
		getTransitionEvent = function () {
			var t,
			    type,
			    supported   = false,
			    el          = document.createElement("fakeelement"),
			    transitions = {
				    "WebkitTransition" : "webkitTransitionEnd",
				    "MozTransition"    : "transitionend",
				    "OTransition"      : "otransitionend",
				    "transition"       : "transitionend"
			    };

			for (t in transitions) {
				if (el.style[t] !== undefined) {
					type      = transitions[t];
					supported = true;
					break;
				}
			}

			return {
				type      : type,
				supported : supported
			};
		};

		/**
		 * Shorthand for document.getElementById()
		 *
		 * @param  {String} id    A specific element ID
		 * @return {Object}       HTML element
		 */
		$ = function (id) {
			return document.getElementById(id);
		};

		/**
		 * Alertify private object
		 * @type {Object}
		 */
		_alertify = {

			/**
			 * Labels object
			 * @type {Object}
			 */
			labels : {
				ok     : "OK",
				cancel : "Cancel"
			},

			/**
			 * Delay number
			 * @type {Number}
			 */
			delay : 5000,

			/**
			 * Whether buttons are reversed (default is secondary/primary)
			 * @type {Boolean}
			 */
			buttonReverse : false,

			/**
			 * Which button should be focused by default
			 * @type {String}	"ok" (default), "cancel", or "none"
			 */
			buttonFocus : "ok",

			/**
			 * Set the transition event on load
			 * @type {[type]}
			 */
			transition : undefined,

			/**
			 * Set the proper button click events
			 *
			 * @param {Function} fn    [Optional] Callback function
			 *
			 * @return {undefined}
			 */
			addListeners : function (fn) {
				var hasOK     = (typeof btnOK !== "undefined"),
				    hasCancel = (typeof btnCancel !== "undefined"),
				    hasInput  = (typeof input !== "undefined"),
				    val       = "",
				    self      = this,
				    ok, cancel, common, key, reset;

				// ok event handler
				ok = function (event) {
					if (typeof event.preventDefault !== "undefined") event.preventDefault();
					common(event);
					if (typeof input !== "undefined") val = input.value;
					if (typeof fn === "function") {
						if (typeof input !== "undefined") {
							fn(true, val);
						}
						else fn(true);
					}
					return false;
				};

				// cancel event handler
				cancel = function (event) {
					if (typeof event.preventDefault !== "undefined") event.preventDefault();
					common(event);
					if (typeof fn === "function") fn(false);
					return false;
				};

				// common event handler (keyup, ok and cancel)
				common = function (event) {
					self.hide();
					self.unbind(document.body, "keyup", key);
					self.unbind(btnReset, "focus", reset);
					if (hasOK) self.unbind(btnOK, "click", ok);
					if (hasCancel) self.unbind(btnCancel, "click", cancel);
				};

				// keyup handler
				key = function (event) {
					var keyCode = event.keyCode;
					if ((keyCode === keys.SPACE && !hasInput) || (hasInput && keyCode === keys.ENTER)) ok(event);
					if (keyCode === keys.ESC && hasCancel) cancel(event);
				};

				// reset focus to first item in the dialog
				reset = function (event) {
					if (hasInput) input.focus();
					else if (!hasCancel || self.buttonReverse) btnOK.focus();
					else btnCancel.focus();
				};

				// handle reset focus link
				// this ensures that the keyboard focus does not
				// ever leave the dialog box until an action has
				// been taken
				this.bind(btnReset, "focus", reset);
				this.bind(btnResetBack, "focus", reset);
				// handle OK click
				if (hasOK) this.bind(btnOK, "click", ok);
				// handle Cancel click
				if (hasCancel) this.bind(btnCancel, "click", cancel);
				// listen for keys, Cancel => ESC
				this.bind(document.body, "keyup", key);
				if (!this.transition.supported) {
					this.setFocus();
				}
			},

			/**
			 * Bind events to elements
			 *
			 * @param  {Object}   el       HTML Object
			 * @param  {Event}    event    Event to attach to element
			 * @param  {Function} fn       Callback function
			 *
			 * @return {undefined}
			 */
			bind : function (el, event, fn) {
				if (typeof el.addEventListener === "function") {
					el.addEventListener(event, fn, false);
				} else if (el.attachEvent) {
					el.attachEvent("on" + event, fn);
				}
			},

			/**
			 * Use alertify as the global error handler (using window.onerror)
			 *
			 * @return {boolean} success
			 */
			handleErrors : function () {
				if (typeof global.onerror !== "undefined") {
					var self = this;
					global.onerror = function (msg, url, line) {
						self.error("[" + msg + " on line " + line + " of " + url + "]", 0);
					};
					return true;
				} else {
					return false;
				}
			},

			/**
			 * Append button HTML strings
			 *
			 * @param {String} secondary    The secondary button HTML string
			 * @param {String} primary      The primary button HTML string
			 *
			 * @return {String}             The appended button HTML strings
			 */
			appendButtons : function (secondary, primary) {
				return this.buttonReverse ? primary + secondary : secondary + primary;
			},

			/**
			 * Build the proper message box
			 *
			 * @param  {Object} item    Current object in the queue
			 *
			 * @return {String}         An HTML string of the message box
			 */
			build : function (item) {
				var html    = "",
				    type    = item.type,
				    message = item.message,
				    css     = item.cssClass || "";

				html += "<div class=\"alertify-dialog\">";
				html += "<a id=\"alertify-resetFocusBack\" class=\"alertify-resetFocus\" href=\"#\">Reset Focus</a>";

				if (_alertify.buttonFocus === "none") html += "<a href=\"#\" id=\"alertify-noneFocus\" class=\"alertify-hidden\"></a>";

				// doens't require an actual form
				if (type === "prompt") html += "<div id=\"alertify-form\">";

				html += "<article class=\"alertify-inner\">";
				html += dialogs.message.replace("{{message}}", message);

				if (type === "prompt") html += dialogs.input;

				html += dialogs.buttons.holder;
				html += "</article>";

				if (type === "prompt") html += "</div>";

				html += "<a id=\"alertify-resetFocus\" class=\"alertify-resetFocus\" href=\"#\">Reset Focus</a>";
				html += "</div>";

				switch (type) {
				case "confirm":
					html = html.replace("{{buttons}}", this.appendButtons(dialogs.buttons.cancel, dialogs.buttons.ok));
					html = html.replace("{{ok}}", this.labels.ok).replace("{{cancel}}", this.labels.cancel);
					break;
				case "prompt":
					html = html.replace("{{buttons}}", this.appendButtons(dialogs.buttons.cancel, dialogs.buttons.submit));
					html = html.replace("{{ok}}", this.labels.ok).replace("{{cancel}}", this.labels.cancel);
					break;
				case "alert":
					html = html.replace("{{buttons}}", dialogs.buttons.ok);
					html = html.replace("{{ok}}", this.labels.ok);
					break;
				default:
					break;
				}

				elDialog.className = "alertify alertify-" + type + " " + css;
				elCover.className  = "alertify-cover";
				return html;
			},

			/**
			 * Close the log messages
			 *
			 * @param  {Object} elem    HTML Element of log message to close
			 * @param  {Number} wait    [optional] Time (in ms) to wait before automatically hiding the message, if 0 never hide
			 *
			 * @return {undefined}
			 */
			close : function (elem, wait) {
				// Unary Plus: +"2" === 2
				var timer = (wait && !isNaN(wait)) ? +wait : this.delay,
				    self  = this,
				    hideElement, transitionDone;

				// set click event on log messages
				this.bind(elem, "click", function () {
					hideElement(elem);
				});
				// Hide the dialog box after transition
				// This ensure it doens't block any element from being clicked
				transitionDone = function (event) {
					event.stopPropagation();
					// unbind event so function only gets called once
					self.unbind(this, self.transition.type, transitionDone);
					// remove log message
					elLog.removeChild(this);
					if (!elLog.hasChildNodes()) elLog.className += " alertify-logs-hidden";
				};
				// this sets the hide class to transition out
				// or removes the child if css transitions aren't supported
				hideElement = function (el) {
					// ensure element exists
					if (typeof el !== "undefined" && el.parentNode === elLog) {
						// whether CSS transition exists
						if (self.transition.supported) {
							self.bind(el, self.transition.type, transitionDone);
							el.className += " alertify-log-hide";
						} else {
							elLog.removeChild(el);
							if (!elLog.hasChildNodes()) elLog.className += " alertify-logs-hidden";
						}
					}
				};
				// never close (until click) if wait is set to 0
				if (wait === 0) return;
				// set timeout to auto close the log message
				setTimeout(function () { hideElement(elem); }, timer);
			},

			/**
			 * Create a dialog box
			 *
			 * @param  {String}   message        The message passed from the callee
			 * @param  {String}   type           Type of dialog to create
			 * @param  {Function} fn             [Optional] Callback function
			 * @param  {String}   placeholder    [Optional] Default value for prompt input field
			 * @param  {String}   cssClass       [Optional] Class(es) to append to dialog box
			 *
			 * @return {Object}
			 */
			dialog : function (message, type, fn, placeholder, cssClass) {
				// set the current active element
				// this allows the keyboard focus to be resetted
				// after the dialog box is closed
				elCallee = document.activeElement;
				// check to ensure the alertify dialog element
				// has been successfully created
				var check = function () {
					if ((elLog && elLog.scrollTop !== null) && (elCover && elCover.scrollTop !== null)) return;
					else check();
				};
				// error catching
				if (typeof message !== "string") throw new Error("message must be a string");
				if (typeof type !== "string") throw new Error("type must be a string");
				if (typeof fn !== "undefined" && typeof fn !== "function") throw new Error("fn must be a function");
				// initialize alertify if it hasn't already been done
				this.init();
				check();

				queue.push({ type: type, message: message, callback: fn, placeholder: placeholder, cssClass: cssClass });
				if (!isopen) this.setup();

				return this;
			},

			/**
			 * Extend the log method to create custom methods
			 *
			 * @param  {String} type    Custom method name
			 *
			 * @return {Function}
			 */
			extend : function (type) {
				if (typeof type !== "string") throw new Error("extend method must have exactly one paramter");
				return function (message, wait) {
					this.log(message, type, wait);
					return this;
				};
			},

			/**
			 * Hide the dialog and rest to defaults
			 *
			 * @return {undefined}
			 */
			hide : function () {
				var transitionDone,
				    self = this;
				// remove reference from queue
				queue.splice(0,1);
				// if items remaining in the queue
				if (queue.length > 0) this.setup(true);
				else {
					isopen = false;
					// Hide the dialog box after transition
					// This ensure it doens't block any element from being clicked
					transitionDone = function (event) {
						event.stopPropagation();
						// unbind event so function only gets called once
						self.unbind(elDialog, self.transition.type, transitionDone);
					};
					// whether CSS transition exists
					if (this.transition.supported) {
						this.bind(elDialog, this.transition.type, transitionDone);
						elDialog.className = "alertify alertify-hide alertify-hidden";
					} else {
						elDialog.className = "alertify alertify-hide alertify-hidden alertify-isHidden";
					}
					elCover.className  = "alertify-cover alertify-cover-hidden";
					// set focus to the last element or body
					// after the dialog is closed
					elCallee.focus();
				}
			},

			/**
			 * Initialize Alertify
			 * Create the 2 main elements
			 *
			 * @return {undefined}
			 */
			init : function () {
				// ensure legacy browsers support html5 tags
				document.createElement("nav");
				document.createElement("article");
				document.createElement("section");
				// cover
				if ($("alertify-cover") == null) {
					elCover = document.createElement("div");
					elCover.setAttribute("id", "alertify-cover");
					elCover.className = "alertify-cover alertify-cover-hidden";
					document.body.appendChild(elCover);
				}
				// main element
				if ($("alertify") == null) {
					isopen = false;
					queue = [];
					elDialog = document.createElement("section");
					elDialog.setAttribute("id", "alertify");
					elDialog.className = "alertify alertify-hidden";
					document.body.appendChild(elDialog);
				}
				// log element
				if ($("alertify-logs") == null) {
					elLog = document.createElement("section");
					elLog.setAttribute("id", "alertify-logs");
					elLog.className = "alertify-logs alertify-logs-hidden";
					document.body.appendChild(elLog);
				}
				// set tabindex attribute on body element
				// this allows script to give it focus
				// after the dialog is closed
				document.body.setAttribute("tabindex", "0");
				// set transition type
				this.transition = getTransitionEvent();
			},

			/**
			 * Show a new log message box
			 *
			 * @param  {String} message    The message passed from the callee
			 * @param  {String} type       [Optional] Optional type of log message
			 * @param  {Number} wait       [Optional] Time (in ms) to wait before auto-hiding the log
			 *
			 * @return {Object}
			 */
			log : function (message, type, wait) {
				// check to ensure the alertify dialog element
				// has been successfully created
				var check = function () {
					if (elLog && elLog.scrollTop !== null) return;
					else check();
				};
				// initialize alertify if it hasn't already been done
				this.init();
				check();

				elLog.className = "alertify-logs";
				this.notify(message, type, wait);
				return this;
			},

			/**
			 * Add new log message
			 * If a type is passed, a class name "alertify-log-{type}" will get added.
			 * This allows for custom look and feel for various types of notifications.
			 *
			 * @param  {String} message    The message passed from the callee
			 * @param  {String} type       [Optional] Type of log message
			 * @param  {Number} wait       [Optional] Time (in ms) to wait before auto-hiding
			 *
			 * @return {undefined}
			 */
			notify : function (message, type, wait) {
				var log = document.createElement("article");
				log.className = "alertify-log" + ((typeof type === "string" && type !== "") ? " alertify-log-" + type : "");
				log.innerHTML = message;
				// append child
				elLog.appendChild(log);
				// triggers the CSS animation
				
				setTimeout(function() { log.className = log.className + " alertify-log-show"; }, 50);
				this.close(log, wait);
			},

			/**
			 * Set properties
			 *
			 * @param {Object} args     Passing parameters
			 *
			 * @return {undefined}
			 */
			set : function (args) {
				var k;
				// error catching
				if (typeof args !== "object" && args instanceof Array) throw new Error("args must be an object");
				// set parameters
				for (k in args) {
					if (args.hasOwnProperty(k)) {
						this[k] = args[k];
					}
				}
			},

			/**
			 * Common place to set focus to proper element
			 *
			 * @return {undefined}
			 */
			setFocus : function () {
				if (input) {
					input.focus();
					input.select();
				}
				else btnFocus.focus();
			},

			/**
			 * Initiate all the required pieces for the dialog box
			 *
			 * @return {undefined}
			 */
			setup : function (fromQueue) {
				var item = queue[0],
				    self = this,
				    transitionDone;

				// dialog is open
				isopen = true;
				// Set button focus after transition
				transitionDone = function (event) {
					event.stopPropagation();
					self.setFocus();
					// unbind event so function only gets called once
					self.unbind(elDialog, self.transition.type, transitionDone);
				};
				// whether CSS transition exists
				if (this.transition.supported && !fromQueue) {
					this.bind(elDialog, this.transition.type, transitionDone);
				}
				// build the proper dialog HTML
				elDialog.innerHTML = this.build(item);
				// assign all the common elements
				btnReset  = $("alertify-resetFocus");
				btnResetBack  = $("alertify-resetFocusBack");
				btnOK     = $("alertify-ok")     || undefined;
				btnCancel = $("alertify-cancel") || undefined;
				btnFocus  = (_alertify.buttonFocus === "cancel") ? btnCancel : ((_alertify.buttonFocus === "none") ? $("alertify-noneFocus") : btnOK),
				input     = $("alertify-text")   || undefined;
				form      = $("alertify-form")   || undefined;
				// add placeholder value to the input field
				if (typeof item.placeholder === "string" && item.placeholder !== "") input.value = item.placeholder;
				if (fromQueue) this.setFocus();
				this.addListeners(item.callback);
			},

			/**
			 * Unbind events to elements
			 *
			 * @param  {Object}   el       HTML Object
			 * @param  {Event}    event    Event to detach to element
			 * @param  {Function} fn       Callback function
			 *
			 * @return {undefined}
			 */
			unbind : function (el, event, fn) {
				if (typeof el.removeEventListener === "function") {
					el.removeEventListener(event, fn, false);
				} else if (el.detachEvent) {
					el.detachEvent("on" + event, fn);
				}
			}
		};

		return {
			alert   : function (message, fn, cssClass) { _alertify.dialog(message, "alert", fn, "", cssClass); return this; },
			confirm : function (message, fn, cssClass) { _alertify.dialog(message, "confirm", fn, "", cssClass); return this; },
			extend  : _alertify.extend,
			init    : _alertify.init,
			log     : function (message, type, wait) { _alertify.log(message, type, wait); return this; },
			prompt  : function (message, fn, placeholder, cssClass) { _alertify.dialog(message, "prompt", fn, placeholder, cssClass); return this; },
			success : function (message, wait) { _alertify.log(message, "success", wait); return this; },
			error   : function (message, wait) { _alertify.log(message, "error", wait); return this; },
			set     : function (args) { _alertify.set(args); },
			labels  : _alertify.labels,
			debug   : _alertify.handleErrors
		};
	};

	// AMD and window support
	if (typeof define === "function") {
		define([], function () { return new Alertify(); });
	} else if (typeof global.alertify === "undefined") {
		global.alertify = new Alertify();
	}

}(this));

function errorPopup(){
    alertify.set({ delay: 3000 });
    alertify.error("The generation API is currently unreachable, however preset files are still available for download.");    
}
    