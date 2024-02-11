import EventInterface from "../@shared/event.interface";

export default class ProductCreatedEvent implements EventInterface {
	dataTimeOccurred: Date;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	eventData: any;

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	constructor(eventData: any, dataTimeOccurred: Date) {
		this.dataTimeOccurred = dataTimeOccurred;
		this.eventData = eventData;
	}
}
