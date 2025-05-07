import { useAuthStore } from "@/lib/stores/auth";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/client/")({
	component: () => {
		const { user } = useAuthStore();
		const navigate = useNavigate();

		if (user?.role !== "CLIENT") {
			navigate({ to: "/admin" });
		}

		return <div>Hello "/_authenticated/client/"!</div>;
	},
});
