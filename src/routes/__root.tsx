import type { AuthState } from "@/lib/stores/auth";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Toaster } from "sonner";

export const Route = createRootRouteWithContext<{
	auth: AuthState;
}>()({
	component: () => (
		<>
			<main className="flex h-dvh w-full flex-col antialiased">
				<Outlet />
			</main>

			<Toaster richColors />
			<TanStackRouterDevtools />
		</>
	),
});
