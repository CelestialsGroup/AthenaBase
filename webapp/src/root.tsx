import Notice from "@component/notice";
import { ThemeProvider } from "@component/theme-provider";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";

import AdminLayout from "~/layout/admin";
import AuthLayout from "~/layout/auth";
import DashboardLayout from "~/layout/dashboard";
import Page from "~/page";


const Router: React.FC = () => {
	return <Routes>
		<Route path="/setup" element={<Page.SetUp />} />

		<Route path="/auth/login" element={<Page.Auth.Login />} />

		<Route element={<AuthLayout />}>
			<Route element={<DashboardLayout />}>

				<Route path="/" element={<Page.Home />} />
				<Route path="/auth/user" element={<Page.Auth.User />} />
				<Route path="/question" element={<Page.Question />} />

				<Route element={<AdminLayout />}>
					<Route path="/admin" element={<Page.Admin.Home />} />
					<Route path="/admin/auth/user" element={<Page.Auth.User />} />
					<Route path="/admin/database" element={<Page.Admin.DataBase />} />
				</Route>
			</Route>
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