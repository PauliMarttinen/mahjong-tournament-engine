import {Menu} from "antd";
import type {MenuProps} from "antd";
import styles from "./Navigation.module.css";
import type { MenuInfo } from "rc-menu/lib/interface";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../../utils/routeUtils";
import { useLocation } from "react-router-dom";
import useTournament from "../../../utils/hooks/useTournament";
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
import saveTournamentFile from "../../../utils/saveTournamentFile";

type MenuItem = Required<MenuProps>["items"][number];

enum Actions {
	SaveTournamentFile = "SaveTournamentFile"
};

const Navigation = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const tournament = useTournament();

	const navigationItems: MenuItem[] = [
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
		}		
	];

	const actionItems: MenuItem[] = [
		{
			label: "Save tournament file",
			key: Actions.SaveTournamentFile,
			icon: <SaveOutlined/> 
		}
	];

	const onClickNavigation = (e: MenuInfo) => {
		navigate(e.key);
	};

	const onClickAction = (e: MenuInfo) => {
		switch (e.key)
		{
			case Actions.SaveTournamentFile:
				saveTournamentFile(tournament);
				break;
		}
	};

	return (
		<>
		<Menu
			className={styles.navigation}
			items={navigationItems}
			theme={"dark"}
			onClick={onClickNavigation}
			selectedKeys={[location.pathname]}
		/>
		<Menu
			className={styles.actions}
			items={actionItems}
			theme={"dark"}
			onClick={onClickAction}
			selectedKeys={[]}
		/>
		</>
	);
};

export default Navigation;