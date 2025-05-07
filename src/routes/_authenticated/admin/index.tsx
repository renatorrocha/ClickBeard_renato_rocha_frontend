import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin/")({
	beforeLoad: ({ context }) => {
		const { user } = context.auth;

		if (user?.role !== "ADMIN") {
			return null;
		}

		return redirect({
			to: "/admin/dashboard",
		});
	},
});
