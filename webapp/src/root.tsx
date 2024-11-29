import { ThemeProvider } from "@component/theme-provider";
import { BrowserRouter, Route, Routes } from "react-router";

import Page from "~/page";

const Root = () => {
	return <ThemeProvider>
		<BrowserRouter>
			<Routes>
				<Route path="/setup" element={<Page.SetUp />} />
				<Route path="/question" element={<Page.Question />} />
				<Route path="/*" element={<Page.NotFound />} />
			</Routes>
		</BrowserRouter>
	</ThemeProvider>;
};

export default Root;