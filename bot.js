/*global require, module, console */
const util = require('util');
const botBuilder = require('claudia-bot-builder'),
	  getIntentName = function (alexaPayload) {
		  'use strict';
		  return alexaPayload &&
			  alexaPayload.request &&
			  alexaPayload.request.type === 'IntentRequest' &&
			  alexaPayload.request.intent &&
			  alexaPayload.request.intent.name;
	  };
const api = botBuilder(
	function (message, originalRequest) {
		'use strict';
	    console.log(originalRequest.body, false, null);
	    console.log(message.text, false, null);
	    if (getIntentName(originalRequest.body) === 'MedTaking'){
		if(message.text){
		    if(message.text.toLowerCase() === 'edarbi' || message.text.toLowerCase() === 'cialis'){
			return 'Yes, you are taking ' + message.text;
		    } else {
			return 'No, you are not taking ' + message.text;
		    }
		} else {
		    return 'You are currently taking Edarbi and Cialis';
		}
	    } else if (getIntentName(originalRequest.body) === 'MedDue'){
		if(message.text){
		    if(message.text.toLowerCase() === 'edarbi'){
			return 'Your ' + message.text + ' is due at 8:00am and 10:00pm';
		    } else if (message.text.toLowerCase() === 'cialis'){
			return 'Your ' + message.text + ' is due at 8:00am';
		    } else {
			return 'I do not show that you are currently taking ' + message.text;
		    }
		} else {
		    return 'Your Edarbi and Cialis are due at 8:00am and your Edarbi is due at 10:00pm';
		}
	    } else if (getIntentName(originalRequest.body) === 'MedTaken'){
		if(message.text){
		    if(message.text.toLowerCase() === 'edarbi'){
			return 'Your ' + message.text + ' was last taken at 8:11am';
		    } else if (message.text.toLowerCase() === 'cialis'){
			return 'Your ' + message.text + ' was last taken yesterday at 7:57am';
		    } else {
			return 'I do not show that you are currently taking ' + message.text;
		    }
		} else {
		    return 'Your Edarbi was last taken at 8:11am and your Cialis was last taken yesterday at 7:57am';
		}
	    } else if (getIntentName(originalRequest.body) === 'ExitApp'){
		// return a JavaScript object to set advanced response params
		// this prevents any packaging from bot builder and is just
		// returned to Alexa as you specify
		return {
			response: {
				outputSpeech: {
					type: 'PlainText',
					text: 'Bye from Timercap'
				},
				shouldEndSession: true
			}
		};
	    } else {
		return 'Timercap did not understand your request';
	    }
	},
    { platforms: ['alexa'] }
);

module.exports = api;
