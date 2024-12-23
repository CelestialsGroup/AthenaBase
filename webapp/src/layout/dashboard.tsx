import Common from "@component/common";
import Dashboard from "@component/dashboard";
import internal from "@internal/index";
import {
	Breadcrumb, BreadcrumbList, BreadcrumbItem,
	BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage
} from "@shadcn/component/ui/breadcrumb";
import { Separator } from "@shadcn/component/ui/separator";
import {
	SidebarInset, SidebarProvider, SidebarTrigger
} from "@shadcn/component/ui/sidebar";
import React from "react";
import { Outlet } from "react-router";

const DashboardLayout: React.FC = () => {
	return <SidebarProvider>
		<Dashboard.AppSidebar />
		<SidebarInset style={{ height: "calc(100svh - 1rem)" }} className="p-4">
			<header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 justify-between backdrop-blur-lg bg-background/10">
				<div className="flex items-center gap-2 px-4">
					<SidebarTrigger className="-ml-1" />
					<Separator orientation="vertical" className="mr-2 h-4" />
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem className="hidden md:block">
								<BreadcrumbLink href="/">{internal.Name}</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator className="hidden md:block" />
							<BreadcrumbItem>
								<BreadcrumbPage>...</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
				<div className="flex items-center gap-2 px-4">
					<Common.FullScreen /> <Common.ThemeToggle /> <Common.Logout />
				</div>
			</header>
			<div className="flex-1 overflow-auto"><Outlet /></div>
		</SidebarInset>
	</SidebarProvider>;
};

export default DashboardLayout;