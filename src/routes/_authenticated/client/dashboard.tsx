import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/client/dashboard")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Client Dashboard</div>;
}
