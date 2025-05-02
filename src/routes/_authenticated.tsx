import { useAuthStore } from "@/lib/stores/auth";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
	beforeLoad: async ({ context }) => {
		const auth = useAuthStore.getState();

		if (auth.isAuthenticated) {
			context.auth = auth;
		}
	},
	component: () => {
		const { isAuthenticated } = useAuthStore();
		if (isAuthenticated) {
			return <Outlet />;
		}
		return <p>Not authenticated</p>;
	},
});
