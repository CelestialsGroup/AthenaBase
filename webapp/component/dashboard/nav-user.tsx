"use client";

import Provider from "@internal/provider";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@shadcn/component/ui/avatar";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@shadcn/component/ui/sidebar";
import React from "react";
import { useNavigate } from "react-router";

const NavUser: React.FC = () => {
	const { session: { authUser: user } } = Provider.useSession();
	const navigate = useNavigate();

	return <SidebarMenu>
		<SidebarMenuItem>
			<SidebarMenuButton
				size="lg"
				className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
				onClick={() => {
					navigate("/admin");
				}}
			>
				<Avatar className="h-8 w-8 rounded-lg">
					<AvatarImage src={user.avatar} alt={user.name} />
					<AvatarFallback className="rounded-lg">CN</AvatarFallback>
				</Avatar>
				<div className="grid flex-1 text-left text-sm leading-tight">
					<span className="truncate font-semibold">{user.name}</span>
					<span className="truncate text-xs">{user.email}</span>
				</div>
			</SidebarMenuButton>
		</SidebarMenuItem>
	</SidebarMenu>;
};

export default NavUser;
