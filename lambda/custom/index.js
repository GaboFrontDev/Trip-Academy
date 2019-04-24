/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require("ask-sdk-core");

const LaunchRequestHandler = {
	canHandle(handlerInput) {
		return handlerInput.requestEnvelope.request.type === "LaunchRequest";
	},
	handle(handlerInput) {
		const speechText = "Bienvenido, puedes decir hola!";

		return handlerInput.responseBuilder
			.speak(speechText)
			.reprompt(speechText)
			.withSimpleCard("Hola Mundo", speechText)
			.getResponse();
	}
};

const HelloWorldIntentHandler = {
	canHandle(handlerInput) {
		return handlerInput.requestEnvelope.request.type === "IntentRequest" && handlerInput.requestEnvelope.request.intent.name === "HelloWorldIntent";
	},
	handle(handlerInput) {
		const speechText = "Hola Mundo!";

		return handlerInput.responseBuilder
			.speak(speechText)
			.withSimpleCard("Hola Mundo", speechText)
			.getResponse();
	}
};

const HelpIntentHandler = {
	canHandle(handlerInput) {
		return handlerInput.requestEnvelope.request.type === "IntentRequest" && handlerInput.requestEnvelope.request.intent.name === "AMAZON.HelpIntent";
	},
	handle(handlerInput) {
		const speechText = "Puedes decirme hola!";

		return handlerInput.responseBuilder
			.speak(speechText)
			.reprompt(speechText)
			.withSimpleCard("Hola Mundo", speechText)
			.getResponse();
	}
};

const CancelAndStopIntentHandler = {
	canHandle(handlerInput) {
		return (
			handlerInput.requestEnvelope.request.type === "IntentRequest" &&
			(handlerInput.requestEnvelope.request.intent.name === "AMAZON.CancelIntent" ||
				handlerInput.requestEnvelope.request.intent.name === "AMAZON.StopIntent")
		);
	},
	handle(handlerInput) {
		const speechText = "Adiós!";

		return handlerInput.responseBuilder
			.speak(speechText)
			.withSimpleCard("Hello World", speechText)
			.getResponse();
	}
};

const SessionEndedRequestHandler = {
	canHandle(handlerInput) {
		return handlerInput.requestEnvelope.request.type === "SessionEndedRequest";
	},
	handle(handlerInput) {
		console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

		return handlerInput.responseBuilder.getResponse();
	}
};

const ErrorHandler = {
	canHandle() {
		return true;
	},
	handle(handlerInput, error) {
		console.log(`Error handled: ${error.message}`);

		return handlerInput.responseBuilder
			.speak("Sorry, I can't understand the command. Please say again.")
			.reprompt("Sorry, I can't understand the command. Please say again.")
			.getResponse();
	}
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
	.addRequestHandlers(LaunchRequestHandler, HelloWorldIntentHandler, HelpIntentHandler, CancelAndStopIntentHandler, SessionEndedRequestHandler)
	.addErrorHandlers(ErrorHandler)
	.lambda();
