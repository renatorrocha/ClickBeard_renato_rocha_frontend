import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import { routeTree } from "@/routeTree.gen";
import QueryProvider from "./lib/providers/react-query";
import { useAuthStore } from "./lib/stores/auth";

const getAuthState = () => useAuthStore.getState();

const router = createRouter({
	routeTree,
	context: {
		auth: getAuthState(),
	},
	defaultPreload: "intent",
	scrollRestoration: true,
	defaultStructuralSharing: true,
	defaultPreloadStaleTime: 0,
});

// Atualizar o contexto do router quando o estado de autenticação mudar
useAuthStore.subscribe((state) => {
	router.update({
		context: {
			auth: state,
		},
	});
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
				<RouterProvider router={router} context={{ auth: getAuthState() }} />
			</QueryProvider>
		</StrictMode>,
	);
}
