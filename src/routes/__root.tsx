import type { AuthState } from "@/lib/stores/auth";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRouteWithContext<{
	auth: AuthState;
}>()({
	component: () => (
		<>
			<main className="flex h-dvh w-screen flex-col">
				<Outlet />
			</main>

			<TanStackRouterDevtools />
		</>
	),
});
