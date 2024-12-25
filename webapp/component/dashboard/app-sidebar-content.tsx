import { MagicWandIcon } from "@radix-ui/react-icons";
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@shadcn/component/ui/sidebar";
import React from "react";
import { Link } from "react-router";

const AppSidebarContent: React.FC = () => {
	return <React.Fragment>
		<SidebarGroup className="mt-auto">
			<SidebarGroupContent>
				<SidebarMenu>
					<SidebarMenuItem >
						<SidebarMenuButton asChild size="sm">
							<Link to="/question" className="items-center py-2">
								<MagicWandIcon /> <span className="pb-1">Question</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	</React.Fragment>;
};

export default AppSidebarContent;