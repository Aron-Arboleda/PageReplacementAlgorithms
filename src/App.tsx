/**
 * This file is one of the main entry points for the React application.
 */

import { useTranslation } from "react-i18next";
import "./App.css";
import AppRoutes from "./Routes";
import ContextProvider from "./contexts/ContextProvider";
import { useTauriContext } from "./tauri/TauriProvider";
import { useComputedColorScheme, useMantineColorScheme } from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { useLocalForage } from "./common/utils";
import { useEffect } from "react";
import { TitleBar } from "./tauri/TitleBar";

export default function App() {
	const { t } = useTranslation();
	// check if using custom titlebar to adjust other components
	const { usingCustomTitleBar } = useTauriContext();

	// const { toggleColorScheme } = useMantineColorScheme();
	// const colorScheme = useComputedColorScheme();
	// useHotkeys([["ctrl+J", toggleColorScheme]]);

	const [footersSeen, setFootersSeen, footersSeenLoading] = useLocalForage(
		"footersSeen",
		{}
	);

	// const FOOTER_KEY = "footer[0]";
	// const showFooter =
	// 	FOOTER_KEY && !footersSeenLoading && !(FOOTER_KEY in footersSeen);
	// // assume key is always available
	// const footerText = t(FOOTER_KEY);

	// hack for global styling the vertical simplebar based on state
	useEffect(() => {
		const el = document.getElementsByClassName("simplebar-vertical")[0];
		if (el instanceof HTMLElement) {
			el.style.marginTop = usingCustomTitleBar ? "100px" : "70px";
		}
	}, [usingCustomTitleBar]);

	return (
		<ContextProvider>
			{usingCustomTitleBar && <TitleBar />}
			<AppRoutes />
		</ContextProvider>
	);
}
