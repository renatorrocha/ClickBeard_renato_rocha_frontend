import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import { Toaster } from "@/components/ui/sonner";
import { routeTree } from "@/routeTree.gen";
import QueryProvider from "./lib/providers/react-query";
import { useAuthStore } from "./lib/stores/auth";

const router = createRouter({
	routeTree,
	context: {
		auth: useAuthStore.getState(),
	},
	defaultPreload: "intent",
	scrollRestoration: true,
	defaultStructuralSharing: true,
	defaultPreloadStaleTime: 0,
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const rootElement = document.getElementById("app");
if (rootElement && !rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<StrictMode>
			<QueryProvider>
				<Toaster />
				<RouterProvider router={router} />
			</QueryProvider>
		</StrictMode>,
	);
}
