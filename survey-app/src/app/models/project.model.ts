import { Person } from "./person.model";

export class Project {
	id: string;
	itemName: string;
	clientId: string;
	clientName: string;
	contact: Person;
	programManager: Person;
}
