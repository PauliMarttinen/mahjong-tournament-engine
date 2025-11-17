import type { RefObject } from "react";

const openFileSelection = (fileInputRef: RefObject<HTMLInputElement>) => {
	if (fileInputRef !== null && fileInputRef.current !== null)
	{
		fileInputRef.current.click();
	}
};

export default openFileSelection;