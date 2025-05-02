import { useAuthStore } from "@/lib/stores/auth";
import { Outlet, createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
	beforeLoad: async ({ context }) => {
		const auth = useAuthStore.getState();

		if (auth.isAuthenticated) {
			context.auth = auth;
		}
	},
	component: () => {
		const { isAuthenticated } = useAuthStore();
		const navigate = useNavigate();
		if (isAuthenticated) {
			return <Outlet />;
		}
		return navigate({ to: "/login" });
	},
});
