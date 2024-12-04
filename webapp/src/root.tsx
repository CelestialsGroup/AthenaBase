import Notice from "@component/notice";
import { ThemeProvider } from "@component/theme-provider";
import api from "@internal/api";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";


import Page from "~/page";

const Root = () => {
	React.useEffect(() => {
		api.properties.then(resp => { console.log(resp); });
	}, []);

	return <React.Fragment>
		<ThemeProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/setup" element={<Page.SetUp />} />
					<Route path="/question" element={<Page.Question />} />
					<Route path="/*" element={<Page.NotFound />} />
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
		<Notice.Toaster richColors />
	</React.Fragment>;
};

export default Root;