import Header from "@/components/ui/header";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
	beforeLoad: ({ context, location }) => {
		// Verifica se o usuário está autenticado
		if (!context.auth.isAuthenticated) {
			throw redirect({
				to: "/login",
				search: {
					redirect: location.href,
				},
			});
		}

		// Verifica se o usuário está tentando acessar uma rota admin
		if (
			location.pathname.startsWith("/admin") &&
			context.auth.user?.role !== "ADMIN"
		) {
			throw redirect({
				to: "/client",
			});
		}

		// Verifica se o usuário está tentando acessar uma rota client
		if (
			location.pathname.startsWith("/client") &&
			context.auth.user?.role !== "CLIENT"
		) {
			throw redirect({
				to: "/admin",
			});
		}
	},
	component: () => {
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
