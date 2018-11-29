export class Question {
	id: string;
	question: string;
	questionType: string;
	employeeId: string;
	options: string[];
	rating: number;
	response: string;
	deleted: boolean = false;
}