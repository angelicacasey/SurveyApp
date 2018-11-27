import { Person } from "./person.model";
import { Employee } from "./employee.model";

export class Project {
	id: string;
	itemName: string;
	dataType: string
	associatedId: string;
	clientId: string;
	clientName: string;
	contact: Person;
	programManager: Person;
	employees: Employee[];
}
