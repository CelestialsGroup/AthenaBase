import React from "react";
import { Route, Routes } from "react-router";

import AdminLayout from "~/layout/admin";
import AuthLayout from "~/layout/auth";
import SidebarLayout from "~/layout/sidebar";
import Page from "~/page";
import NotFoundPage from "~/router/404";
import AuthLoginPage from "~/router/auth.login";
import DashboardPage from "~/router/dashboard";

const Router: React.FC = () => {
	return <Routes>
		<Route path="/setup" element={<Page.SetUp />} />

		<Route path="/auth/login" element={<AuthLoginPage />} />

		<Route element={<AuthLayout />}>
			<Route element={<SidebarLayout />}>

				<Route path="/" element={<Page.Home />} />
				<Route path="/auth/user" element={<Page.Auth.User />} />
				<Route path="/question" element={<Page.Question />} />

				<Route path="/dashboard" element={<DashboardPage />} />

				<Route element={<AdminLayout />}>
					<Route path="/admin" element={<Page.Admin.Home />} />
					<Route path="/admin/auth/user" element={<Page.Auth.User />} />
					<Route path="/admin/database" element={<Page.Admin.DataBase />} />
				</Route>
			</Route>
		</Route>
		<Route path="/*" element={<NotFoundPage />} />
	</Routes>;
};

export default Router;