import { Navigate, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/client/")({
	component: () => {
		// Redireciona para o dashboard do cliente
		return <Navigate to="/client/dashboard" />;
	},
});
