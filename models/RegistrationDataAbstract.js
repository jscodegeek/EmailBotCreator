const Chance = require('chance');
const chance = new Chance();
const config = require('config');

const phones = config.get('phones.receivesmsonline');
	
class RegistrationDataAbstract {
	
	constructor(firstName, lastName, gender, birthDay, birthMonth, birthYear, additionalEmail, cellPhoneCountryCode, cellPhoneNumber) {
		this._firstName = firstName;
		this._lastName = lastName;
		this._gender = gender;
		this._birthDay = birthDay;
		this._birthMonth = birthMonth;
		this._birthYear = birthYear;
		this._additionalEmail = additionalEmail;
		this._cellPhoneCountryCode = cellPhoneCountryCode;
		this._cellPhoneNumber = cellPhoneNumber;
	}
	  
	get firstName() {
		return this._firstName;
	}


	get lastName() {
		return this._lastName;
	}


	get fullName() {
		return `${this._firstName} ${this._lastName}`;
	}

	get birthDate() {
		return {
			day: this._birthDay,
			month: this._birthMonth,
			year: this._birthYear
		}
	}

	get additionalEmail() {
		return this._additionalEmail;
	}

	get cellPhone() {
		return `+${this._cellPhoneCountryCode}${this._cellPhoneNumber}`;
	}
	  
	regenerate() {
		this._gender = chance.gender();
		this._firstName = chance.first({ gender: this._gender });
		this._lastName = chance.last();
		this._birthDay = chance.integer({min: 2, max: 28});
		this._birthMonth = chance.month({raw: true}).numeric;
		this._birthYear = chance.year({min: 1950, max: 1997});

		const phone = chance.pickone(phones);
		this._cellPhoneCountryCode = phone[0];
		this._cellPhoneNumber = phone[1];

	}

	toString() {
		return `{fullName: ${this._firstName} ${this._lastName}, lastName: ${this._lastName}, birthDate: ${this._birthDay}/${this._birthMonth}/${this._birthYear}, phone: +${this._cellPhoneCountryCode}${this._cellPhoneNumber} }`;
	}
}

module.exports = RegistrationDataAbstract;