import { buttonVariants } from "@shadcn/component/ui/button";
import { cn } from "@shadcn/lib/utils";
import React from "react";
import { NavLink, Outlet } from "react-router";

const AdminLayout: React.FC = () => {
	return <main className="w-full h-full flex flex-col space-y-4">
		<div className="pt-0 min-w-48 space-x-2">
			<NavLink to="/admin/auth/user" className={({ isActive }) => {
				return cn(buttonVariants({ variant: isActive ? "secondary" : "ghost", className: "" }));
			}}>
				AuthUser
			</NavLink>
			<NavLink to="/admin/database" className={({ isActive }) => {
				return cn(buttonVariants({ variant: isActive ? "secondary" : "ghost", className: "" }));
			}}>
				DataBase
			</NavLink>
		</div>
		<div className={
			"flex-1 p-2 " +
			"scrollbar-thin scrollbar-thumb-muted/90 scrollbar-track-background/10 overflow-y-scroll"
		}>
			<Outlet />
		</div>
	</main >;
};

export default AdminLayout;