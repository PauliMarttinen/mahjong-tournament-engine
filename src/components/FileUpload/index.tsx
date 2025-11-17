import type { ChangeEvent } from "react";
import { useRef } from "react";
import { Button } from "antd";
import styles from "./FileUpload.module.css";
import openFileSelection from "./utils/openFileSelection";
import fileInputOnChange from "./utils/fileInputOnChange";

type FileUploadProps = {
	className?: string,
	label: string,
	onUpload: (files: FileList | null) => void
};

const FileUpload = (props: FileUploadProps) => {
	const fileInputRef = useRef<HTMLInputElement>(null);

	return (
		<div className={styles.fileUpload}>
			<Button
				type={"default"}
				className={props.className}
				onClick={() => openFileSelection(fileInputRef)}>
				{props.label}
			</Button>
			<div className={styles.input}>
				<input
					ref={fileInputRef}
					type="file"
					onChange={(e: ChangeEvent<HTMLInputElement>) => props.onUpload(fileInputOnChange(e))}
				/>
			</div>
		</div>
	);
};

export default FileUpload;