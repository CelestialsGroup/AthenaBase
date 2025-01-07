import React from "react";
import { Route, Routes } from "react-router";

import AdminPage from "~/admin";
import AdminDataBasePage from "~/admin/database";
import AuthLoginPage from "~/auth/login";
import AuthUserPage from "~/auth/user";
import AdminLayout from "~/layout/admin";
import AuthLayout from "~/layout/auth";
import SidebarLayout from "~/layout/sidebar";
import NotFoundPage from "~/router/404";
import ChartPage from "~/router/chart";
import DashboardPage from "~/router/dashboard";
import HomePage from "~/router/home";
import QueryPage from "~/router/query";
import SetUpPage from "~/router/setup";

const Router: React.FC = () => {
	return <Routes>
		<Route path="/setup" element={<SetUpPage />} />

		<Route path="/auth/login" element={<AuthLoginPage />} />

		<Route element={<AuthLayout />}>
			<Route element={<SidebarLayout />}>

				<Route path="/" element={<HomePage />} />
				<Route path="/auth/user" element={<AuthUserPage />} />
				<Route path="/query" element={<QueryPage />} />

				<Route path="/dashboard" element={<DashboardPage />} />
				<Route path="/chart" element={<ChartPage />} />

				<Route element={<AdminLayout />}>
					<Route path="/admin" element={<AdminPage />} />
					<Route path="/admin/auth/user" element={<AuthUserPage />} />
					<Route path="/admin/database" element={<AdminDataBasePage />} />
				</Route>
			</Route>
		</Route>

		<Route path="/*" element={<NotFoundPage />} />
	</Routes>;
};

export default Router;