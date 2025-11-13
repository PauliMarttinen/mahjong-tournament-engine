import {Menu} from "antd";
import type {MenuProps} from "antd";
import styles from "./Navigation.module.css";
import { MenuInfo } from "rc-menu/lib/interface";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../../utils/routeUtils";
import {
	LineChartOutlined,
	OrderedListOutlined,
	TrophyOutlined,
	PrinterOutlined,
	TableOutlined,
	TeamOutlined,
	FormOutlined,
	SaveOutlined
} from "@ant-design/icons";

type MenuItem = Required<MenuProps>["items"][number];

enum NonNavigationActions {
	SaveTournamentFile = "SaveTournamentFile"
};

const Navigation = () => {
	const navigate = useNavigate();

	const items: MenuItem[] = [
		{
			label: "Overview",
			key: Routes.Overview,
			icon: <TableOutlined/>
		},
		{
			label: "Hanchan results",
			key: Routes.HanchanResults,
			icon: <FormOutlined/>
		},
		{
			label: "Standings",
			key: Routes.Standings,
			icon: <OrderedListOutlined/>
		},
		{
			label: "Edit Players",
			key: Routes.EditPlayers,
			icon: <TeamOutlined/>
		},
		{
			label: "Print-outs/PDFs",
			key: Routes.PrintOuts,
			icon: <PrinterOutlined/>
		},
		{
			label: "Final Results",
			key: Routes.FinalResults,
			icon: <TrophyOutlined/>
		},
		{
			label: "Player Performance",
			key: Routes.PlayerPerformance,
			icon: <LineChartOutlined/>
		},
		{
			label: "Save tournament file",
			key: NonNavigationActions.SaveTournamentFile,
			icon: <SaveOutlined/> 
		}
	];

	const onClick = (e: MenuInfo) => {
		if (e.key === NonNavigationActions.SaveTournamentFile) {
			console.log("save file")
			return;
		};

		navigate(e.key);
	};

	return (
		<Menu
			className={styles.navigation}
			items={items}
			theme={"dark"}
			onClick={onClick}
		/>
	);
};

export default Navigation;