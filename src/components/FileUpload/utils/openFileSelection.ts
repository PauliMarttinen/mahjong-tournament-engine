import { type RefObject } from "react";

export const openFileSelection = (fileInputRef: RefObject<HTMLInputElement>) => {
	if (fileInputRef !== null && fileInputRef.current !== null)
	{
		fileInputRef.current.click();
	}
};