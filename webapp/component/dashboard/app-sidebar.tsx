import AppSidebarContent from "@component/dashboard/app-sidebar-content";
import NavUser from "@component/dashboard/nav-user";
import internal from "@internal/index";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@shadcn/component/ui/sidebar";
import { Command } from "lucide-react";
import React from "react";
import { NavLink } from "react-router";

const AppSidebar: React.FC<React.ComponentProps<typeof Sidebar>> = ({ ...props }) => {
	return <Sidebar variant="inset" {...props}>
		<SidebarHeader>
			<SidebarMenu>
				<SidebarMenuItem>
					<SidebarMenuButton size="lg" asChild>
						<NavLink to="/">
							<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
								<Command className="size-4" />
							</div>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-semibold">{internal.Name}</span>
								<span className="truncate text-xs">{internal.Version}</span>
							</div>
						</NavLink>
					</SidebarMenuButton>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarHeader>
		<SidebarContent>
			<AppSidebarContent />
		</SidebarContent>
		<SidebarFooter>
			<NavUser />
		</SidebarFooter>
	</Sidebar>;
};

export default AppSidebar;