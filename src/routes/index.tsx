import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<h1 className="text-4xl font-bold">Landing Page</h1>

			<div className="flex gap-4">
				<Link to="/login">Login</Link>
				<Link to="/register">Register</Link>
			</div>
		</div>
	);
}
