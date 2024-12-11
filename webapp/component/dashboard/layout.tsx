import Common from "@component/common";
import AppSidebar from "@component/dashboard/app-sidebar";
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

const Layout: React.FC = () => {
	return <SidebarProvider>
		<AppSidebar />
		<SidebarInset>
			<header className="flex h-16 shrink-0 items-center gap-2 justify-between">
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
					<Common.FullScreen /> <Common.ThemeToggle />
				</div>
			</header>
			<main className="flex flex-1 flex-col gap-4 p-4 pt-0">
				<Outlet />
			</main>
		</SidebarInset>
	</SidebarProvider>;
};

export default Layout;