import { Menu } from "antd";
import { type MenuProps } from "antd";
import styles from "./Navigation.module.css";
import { type MenuInfo } from "rc-menu/lib/interface";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../../utils/routeUtils";
import { useLocation } from "react-router-dom";
import { useTournament } from "../../../utils/hooks/useTournament";
import {
	LineChartOutlined,
	OrderedListOutlined,
	PrinterOutlined,
	TableOutlined,
	TeamOutlined,
	FormOutlined,
	SaveOutlined,
	ExportOutlined,
	CalendarOutlined,
	TransactionOutlined
} from "@ant-design/icons";
import { saveTournamentFile } from "../../../utils/saveTournamentFile";
import { saveSeatingFile } from "../../../utils/saveSeatingFile";
import BigScreenMonitor from "../../../components/BigScreenMonitor";

type MenuItem = Required<MenuProps>["items"][number];

enum Actions {
	SaveTournamentFile = "SaveTournamentFile",
	SaveSeatingFile = "SaveSeatingFile",
};

const Navigation = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const tournament = useTournament();

	const menus: MenuItem[][] = [
		[
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
				label: "Edit Uma",
				key: Routes.EditUma,
				icon: <TransactionOutlined/>
			},
			{
				label: "Edit schedule",
				key: Routes.EditSchedule,
				icon: <CalendarOutlined/>
			},
			{
				label: "Print-outs/PDFs",
				key: Routes.PrintOuts,
				icon: <PrinterOutlined/>
			},
			{
				label: "Player Performance",
				key: Routes.PlayerPerformance,
				icon: <LineChartOutlined/>
			}
		],
		[
			{
				label: "Big Screen",
				key: Routes.BigScreen,
				icon: <ExportOutlined/>
			}
		],
		[
			{
				label: "Save tournament file",
				key: Actions.SaveTournamentFile,
				icon: <SaveOutlined/> 
			},
			{
				label: "Save seating file",
				key: Actions.SaveSeatingFile,
				icon: <SaveOutlined/>
			}
		]
	];

	const onClick = (e: MenuInfo) => {
		switch (e.key) {
			case Actions.SaveTournamentFile:
				saveTournamentFile(tournament);
				break;
			case Actions.SaveSeatingFile:
				saveSeatingFile(tournament);
				break;
			default:
				navigate(e.key);
				break;
		};
	};

	return (
		<>
			{
				menus.map((menu: MenuItem[], index: number) => (
					<Menu
						key={`menu-${index}`}
						className={styles.menu}
						items={menu}
						theme={"dark"}
						onClick={onClick}
						selectedKeys={[location.pathname]}
					/>
				))
			}
			<BigScreenMonitor/>
		</>
	);
};

export default Navigation;