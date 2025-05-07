import { Navigate } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin/")({
	// Redireciona para o dashboard do admin
	component: () => {
		return <Navigate to="/admin/dashboard" />;
	},
});
