const simplifyTime = (dateTime: string) => {
	if (dateTime.indexOf("T") !== -1)	return dateTime.split("T")[1].split(":").slice(0, 2).join(":");

	return dateTime.split(":").slice(0, 2).join(":");
};

export default simplifyTime;