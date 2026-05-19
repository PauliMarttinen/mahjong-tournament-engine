export const print = (target: string) => {
	const iframe = document.getElementById(target) as HTMLIFrameElement;
	if (iframe !== null && "contentWindow" in iframe)
	{
		iframe?.contentWindow?.print();
	}
};