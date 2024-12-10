import React from "react";
import { NavLink, Outlet } from "react-router";

const AdminLayout: React.FC = () => {
	return <div className="w-screen h-screen flex flex-col p-2">
		<div className="w-full flex justify-between">
			<div className="flex space-x-2">
				<div>logo</div>
				<nav>
					<NavLink
						to="/admin/database"
						className={({ isActive }) =>
							isActive ? "text-red-500" : ""
						}
					>
						DataBase
					</NavLink>

				</nav>
			</div>
			<div>
				logout
			</div>
		</div>
		<div className="flex-1 border rounded-lg"><Outlet /></div>
	</div>;
};

export default AdminLayout;