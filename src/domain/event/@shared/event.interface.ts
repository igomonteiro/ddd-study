export default interface EventInterface {
	dataTimeOccurred: Date;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	eventData: any;
}
