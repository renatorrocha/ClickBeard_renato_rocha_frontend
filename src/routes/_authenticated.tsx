import Header from "@/components/ui/header";
import { useAuthStore } from "@/lib/stores/auth";
import { Outlet, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

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

		useEffect(() => {
			if (!isAuthenticated) {
				navigate({ to: "/login" });
			}
		}, [isAuthenticated, navigate]);

		if (!isAuthenticated) {
			return null;
		}

		return (
			<div className="flex flex-col min-h-screen">
				<Header />

				<main className="flex-grow container mx-auto px-4 py-6">
					<Outlet />
				</main>

				<footer className="bg-gray-900 text-white py-4">
					<div className="container mx-auto px-4 text-center text-sm">
						© {new Date().getFullYear()} Click-Beard. Todos os direitos
						reservados.
					</div>
				</footer>
			</div>
		);
	},
});
