import { createProcess, createCommandFactory } from '@dojo/framework/stores/process';
import { replace } from '@dojo/framework/stores/state/operations';
import { State } from './interfaces';
import generateData from './data';
import * as faker from 'faker';

const commandFactory = createCommandFactory<State>();

interface UpdatePersonPayload {
	company: string;
	person: string;
}

const initialStateCommand = commandFactory(({ path }) => {
	return [replace(path('companies'), generateData(100))];
});

const updatePersonNameCommand = commandFactory<UpdatePersonPayload>(
	({ at, get, path, payload: { company, person } }) => {
		const companies = get(path('companies'));
		let personIndex = 0;
		let companyIndex = 0;
		companies.forEach((value, index) => {
			if (value.name === company) {
				companyIndex = index;
				personIndex = value.people.indexOf(person);
			}
		});

		// get the path for the company index
		const companyPath = at(path('companies'), companyIndex);

		// get the path for the person index
		const personPath = at(path(companyPath, 'people'), personIndex);

		// replace the person at the path with a new name
		return [replace(personPath, faker.name.firstName())];
	}
);

export const updateNameProcess = createProcess('update-name', [updatePersonNameCommand]);
export const initialStateProcess = createProcess('intial-state', [initialStateCommand]);
