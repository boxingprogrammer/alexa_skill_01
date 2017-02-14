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
	    console.log(message, false, null);
	    if (getIntentName(originalRequest.body) === 'MedTaking'){
		if(message.text){
		    if(message.text.toLowerCase() === 'edarbi' || message.text.toLowerCase() === 'cialis' ||
		       message.text.toLowerCase() === 'lipitor' || message.text.toLowerCase() === 'hydrocodone'){
			return 'Yes, you are taking ' + message.text;
		    } else {
			return 'No, you are not taking ' + message.text;
		    }
		} else {
		    return 'You are currently taking Edarbi, Cialis, Lipitor and Hydrocodone';
		}
	    } else if (getIntentName(originalRequest.body) === 'MedDue'){
		if(message.text){
		    if(message.text.toLowerCase() === 'edarbi'){
			return 'Your ' + message.text + ' is due at 8:00am and 10:00pm';
		    } else if (message.text.toLowerCase() === 'cialis'){
			return 'Your ' + message.text + ' is due at 8:00am';
		    } else if (message.text.toLowerCase() === 'lipitor'){
			return 'Your ' + message.text + ' is due at 8:00am';
		    } else if (message.text.toLowerCase() === 'hydrocodone'){
			return 'Your ' + message.text + ' is due at 8am, 2pm, and 8pm';
		    } else {
			return 'I do not show that you are currently taking ' + message.text;
		    }
		} else {
		    return 'Your Edarbi, Cialis, Lipitor and Hydrocodone are due at 8am, your Hydrocodone is due again at 2pm and 8pm,  and your Edarbi is due again at 10:00pm';
		}
	    } else if (getIntentName(originalRequest.body) === 'MedTaken'){
		if(message.text){
		    if(message.text.toLowerCase() === 'edarbi'){
			return 'Your ' + message.text + ' was taken at 8:11am';
		    } else if (message.text.toLowerCase() === 'cialis'){
			return 'Your ' + message.text + ' was taken yesterday at 7:57am';
		    } else if (message.text.toLowerCase() === 'lipitor'){
			return 'Your ' + message.text + ' was taken yesterday at 7:58am';
		    } else if (message.text.toLowerCase() === 'hydrocodone'){
			return 'Your ' + message.text + ' was last taken at 2:05pm';
		    } else {
			return 'I do not show that you are currently taking ' + message.text;
		    }
		} else {
		    return 'Your Edarbi was taken at 8:11am, your Cialis was taken yesterday at 7:57am, your Lipitor was taken yesterday at 7:58am, your Hydrocodone was taken at 2:05pm';
		}
	    } else if (getIntentName(originalRequest.body) === 'MedPin'){
		var my_user = 'unknown';
		if(message.text){
		    if(message.text === '1234'){
			my_user = 'Larry';
		    } else if (message.text === '9876'){
			my_user = 'Phil';
		    } else if (message.text === '2468'){
			my_user = 'Cliff';
		    } else {
			//
		    }
		} else {
		    //
		}
		if (my_user === 'unknown'){
		    return 'Sorry, please try again and refresh your pin number in the TimerCap App if needed';
		} else {
		    return {
			"response": {
			    "outputSpeech": {
				"type": "PlainText",
				"text": "Congratulations " + my_user + ", you are now on the road to better health with TimerCap.  See your Alexa App for Sample Phrases."
			    },
			    "card": {
				"content": "Congratulations " + my_user + ", you are now on the road to better health with TimerCap.  See below for sample phrases.\nWhat medicines am I taking?\nWhen is my {medicine name} due?\nWhen did I last take {medicine name}\nMore at http://www.timercap.com/alexa\n",
				"title": "alexa_skill_01",
				"type": "Simple"
			    },
			    "shouldEndSession": true
			}
		    };
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
