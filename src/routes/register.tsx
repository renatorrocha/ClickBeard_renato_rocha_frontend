import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/register")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Register Page</div>;
}
