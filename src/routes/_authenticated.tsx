import Header from "@/components/ui/header";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
	beforeLoad: ({ context, location }) => {
		// Verifica se o usuário está autenticado
		if (!context.auth.isAuthenticated || !context.auth.user) {
			throw redirect({
				to: "/login",
				search: {
					redirect: location.href,
				},
			});
		}

		const userRole = context.auth.user.role;
		const isAdminRoute = location.pathname.startsWith("/admin");
		const isClientRoute = location.pathname.startsWith("/client");

		// Se for rota admin e não for admin, redireciona
		if (isAdminRoute && userRole !== "ADMIN") {
			throw redirect({
				to: "/client",
			});
		}

		// Se for rota client e não for client, redireciona
		if (isClientRoute && userRole !== "CLIENT") {
			throw redirect({
				to: "/admin",
			});
		}

		// Se não for nenhuma rota específica, redireciona baseado na role
		if (!isAdminRoute && !isClientRoute) {
			throw redirect({
				to: userRole === "ADMIN" ? "/admin" : "/client",
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
