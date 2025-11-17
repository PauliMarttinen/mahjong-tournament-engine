const bodyNoMargin = (): void => {
	const body = document.body;
	if (body) {
		body.style.margin = "0";
	}
}

export default bodyNoMargin;