import { useState } from "react";
import { Modal, Button, Card, Space } from "antd";
import FileUpload from "../../../../components/FileUpload";
import readXlsxFile from "read-excel-file";
import { type Row } from "read-excel-file/types";
import { convertTemplateFromCsv, convertTemplateFromExcel } from "../../../../utils/convertTemplate";
import { generateRandomizedSeating } from "../utils/generateRandomizedSeating";
import { type NewTournament } from "../../../../data-types/new-tournament-data-types";
import { SeatingTemplateTypes } from "../../../../data-types/new-tournament-data-types";

type AddTemplateProps = {
	newTournament: NewTournament,
	onNewTemplate: (newTemplate: number[][], type: SeatingTemplateTypes) => void
};

const AddTemplate = (props: AddTemplateProps) => {
	const [showUploadModal, setShowUploadModal] = useState<boolean>(false);

	const readTemplateFile = (files: FileList | null) => {
		if (files === null) return;

		readXlsxFile(files[0]).then((excelRows: Row[]) => {
			props.onNewTemplate(convertTemplateFromExcel(excelRows, props.newTournament.info.rounds.length, props.newTournament.playerList.length), SeatingTemplateTypes.Custom);
			setShowUploadModal(false);
		}).catch((e) => {
			const fileReader = new FileReader();
			fileReader.onload = () => {
				if (fileReader.result === null) return;
				props.onNewTemplate(convertTemplateFromCsv(fileReader.result as string, props.newTournament.info.rounds.length, props.newTournament.playerList.length), SeatingTemplateTypes.Custom);
			};
			fileReader.readAsText(files[0]);
		});
	};

	const randomizeSeating = (): void => {
		props.onNewTemplate(generateRandomizedSeating(props.newTournament.playerList.length, props.newTournament.info.rounds.length), SeatingTemplateTypes.Randomized);
	};

	return (
		<>
			<Modal
				centered={true}
				open={showUploadModal}
				title={"Open Seating Template File"}
				onCancel={() => setShowUploadModal(false)}
				footer={[
					<Button type={"primary"} onClick={() => setShowUploadModal(false)}>Close</Button>
				]}>
				<p>You can open your own seating template as an Excel or CSV file.</p>
				<FileUpload
					label={"Open custom seating template file"}
					onUpload={(content) => readTemplateFile(content)}
				/>
			</Modal>
			<Card title={"Add template"}>
				<Space direction={"vertical"}>
					<Button
						type={"default"}
						onClick={() => randomizeSeating()}>
						Randomized
					</Button>
					<Button
						type={"default"}
						onClick={() => setShowUploadModal(true)}>
						Open from file
					</Button>	
				</Space>
			</Card>
		</>
	);
};

export default AddTemplate;