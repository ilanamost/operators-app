import * as Yup from 'yup';

const phoneRegExp = "^[0-9/()/+]+$";

export const operatorsValidationSchema = Yup.object().shape({
	operatorsNumber: Yup.number('Has to be number')
	.integer('Number has to be whole').
	positive('Number has to be positive'),

	firstName: Yup.string('Must be string')
	.required('Required'),

	phone: Yup.string('Must be string').matches(phoneRegExp, 'Phone number is not valid'),

	dataPullFrequensy: Yup.string('Must be string'),

	numberOfPreviousStations: Yup.number('Has to be number')
	.integer('Number has to be whole').
	positive('Number has to be positive'),

	predictionSystem: Yup.string('Must be string'),

	protocolVersion: Yup.string('Must be string'),

	addressForTravelQuery: Yup.string('Must be string'),

	addressForHistoryQuery: Yup.string('Must be string'),

	operatorName: Yup.string('Must be string')
	.required('Required'),

	lastName: Yup.string('Must be string')
	.required('Required'),

	email: Yup.string('Must be string')
	.email('Please enter valid email')
	.required('Required')
});
