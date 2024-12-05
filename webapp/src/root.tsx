import Notice from "@component/notice";
import { ThemeProvider } from "@component/theme-provider";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";

import AuthLayout from "~/layout/auth";
import Page from "~/page";

const Router: React.FC = () => {
	return <Routes>
		<Route path="/setup" element={<Page.SetUp />} />

		<Route path="/auth/login" element={<Page.Auth.Login />} />

		<Route element={<AuthLayout />}>
			<Route path="/" element={<Page.Home />} />
			<Route path="/question" element={<Page.Question />} />
		</Route>
		<Route path="/*" element={<Page.NotFound />} />
	</Routes>;
};

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