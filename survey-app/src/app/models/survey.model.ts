import { Person } from './person.model';

export class Survey { 
	id: string;
	itemName: string;
	projectId: string;
	projectName: string;
	clientId: string;
	clientName: string;
	createdBy: Person;
	recipient: Person;
	status: string;
	createdDt: string;

}
