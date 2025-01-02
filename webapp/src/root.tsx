import Notice from "@component/notice";
import { ThemeProvider } from "@component/theme-provider";
import React from "react";
import { BrowserRouter } from "react-router";

import Router from "~/router";


const Root = () => {
	return <React.Fragment>
		<ThemeProvider>
			<BrowserRouter>
				<Router />
			</BrowserRouter>
		</ThemeProvider>
		<Notice.Toaster richColors />
	</React.Fragment>;
};

export default Root;