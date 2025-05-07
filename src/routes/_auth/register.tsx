import RegisterForm from "@/components/forms/register";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/register")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex flex-col gap-4 w-full bg-gray-100 max-w-md border rounded-lg p-4 shadow-md">
			<div className="text-center">
				<h1 className="text-2xl font-bold">Novo usuário</h1>
				<p className="text-sm text-muted-foreground">
					Crie uma conta para continuar
				</p>
			</div>

			<RegisterForm />

			<p className="text-sm text-muted-foreground mt-4 text-center">
				Já possui uma conta?{" "}
				<Link to="/login" className="text-primary font-semibold underline">
					Faça login
				</Link>
			</p>
		</div>
	);
}
