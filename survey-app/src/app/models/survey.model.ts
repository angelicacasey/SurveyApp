import { Person } from './person.model';
import { Question } from './question.model';

export class Survey { 
	id: string;
	itemName: string;
	dataType: string
	associatedId: string;
	projectId: string;
	projectName: string;
	clientId: string;
	clientName: string;
	createdBy: Person;
	recipient: Person;
	status: string;
	createdDt: string;
	lastSentDt: string;
	numTimesSent: number = 0;
	respondedDt: string;
	questions: Question[];
	surveyform: string;
}
