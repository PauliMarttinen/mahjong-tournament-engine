import type { ChangeEvent } from "react";

const fileInputOnChange = (e: ChangeEvent<HTMLInputElement>): FileList | null => {
	if (e.target.files === null || e.target.files.length === 0)
	{
		return null;
	}

	return e.target.files;
};

export default fileInputOnChange;