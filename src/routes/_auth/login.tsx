import LoginForm from "@/components/forms/login";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/login")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex flex-col gap-4 w-full max-w-md border rounded-lg p-4 shadow-md">
			<div className="text-center">
				<h1 className="text-2xl font-bold">Bem vindo</h1>
				<p className="text-sm text-muted-foreground">
					Faça login para continuar
				</p>
			</div>

			<LoginForm />

			<p className="text-sm text-muted-foreground mt-4 text-center">
				Não possui uma conta?{" "}
				<Link to="/register" className="text-primary font-semibold underline">
					Faça cadastro
				</Link>
			</p>
		</div>
	);
}
