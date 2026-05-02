const simplifyTime = (dateTime: string) => {
	return dateTime.split("T")[1].split(":").slice(0, 2).join(":");
};

export default simplifyTime;