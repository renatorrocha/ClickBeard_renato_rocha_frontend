import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/admin/dashboard")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/admin/dashboard"!</div>;
}
