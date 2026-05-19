export const getSimpleDateISOString = (includeSeconds?: boolean): string => {
	const now = new Date();
	const year = now.getFullYear().toString();
	const month = (now.getMonth() + 1).toString().padStart(2, "0");
	const day = now.getDate().toString().padStart(2, "0");
	const hours = now.getHours().toString().padStart(2, "0");
	const minutes = now.getMinutes().toString().padStart(2, "0");
	const seconds = now.getSeconds().toString().padStart(2, "0");

	if (includeSeconds) return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
	
	return `${year}-${month}-${day}T${hours}:${minutes}`;
};