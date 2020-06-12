import * as faker from 'faker';

export default function generateData(size: number): any {
	const companies = [];
	for (let i = 0; i < size; i++) {
		const people = [];
		for (let j = 0; j < 5; j++) {
			people.push(faker.name.firstName());
		}
		companies.push({
			name: faker.company.companyName(),
			people
		});
	}
	return companies;
}
