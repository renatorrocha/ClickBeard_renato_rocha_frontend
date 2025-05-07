import { Button } from "@/components/ui/button";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { Github } from "lucide-react";
import { Calendar, MapPin, Phone, Scissors } from "lucide-react";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	const navigate = useNavigate();
	return (
		<div className="flex flex-col items-center justify-between min-h-screen bg-gray-900 text-white overflow-hidden">
			{/* Header */}
			<header className="w-full py-4 px-6 flex justify-between items-center">
				<div className="flex items-center gap-2">
					<Scissors className="h-6 w-6 text-zinc-500" />
					<span className="text-xl font-bold">
						<span className="text-blue-300">Click</span>-Beard
					</span>
				</div>
				<div className="hidden md:flex gap-6">
					<Link to="/login" className="text-white hover:text-blue-300">
						Login
					</Link>
					<Link to="/register" className="text-white hover:text-blue-300">
						Cadastro
					</Link>
				</div>
			</header>

			{/* Main Content */}
			<main className="flex-1 w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-8 px-6 py-4">
				{/* Left Column - Text Content */}
				<div className="flex flex-col justify-center space-y-6">
					<div>
						<h1 className="text-4xl md:text-6xl font-bold mb-2">
							<span className="text-blue-300">Click</span>-Beard
						</h1>
						<p className="text-xl text-zinc-400">
							Estilo e precisão em cada corte
						</p>
					</div>

					<div className="space-y-4">
						<div className="flex items-center gap-3">
							<div className="bg-blue-500/20 p-2 rounded-full">
								<Scissors className="h-5 w-5 text-blue-500" />
							</div>
							<div>
								<h3 className="font-medium">Cortes Modernos</h3>
								<p className="text-sm text-zinc-400">
									Especialistas em todos os estilos
								</p>
							</div>
						</div>

						<div className="flex items-center gap-3">
							<div className="bg-blue-500/20 p-2 rounded-full">
								<Scissors className="h-5 w-5 text-blue-500" />
							</div>
							<div>
								<h3 className="font-medium">Barba Perfeita</h3>
								<p className="text-sm text-zinc-400">
									Modelagem e tratamentos completos
								</p>
							</div>
						</div>
					</div>

					<div className="pt-4">
						<Button
							className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 text-lg"
							onClick={() => navigate({ to: "/login" })}
						>
							<Calendar className="h-5 w-5 mr-2" />
							Agendar Horário
						</Button>
					</div>
				</div>

				{/* Right Column - Image */}
				<div className="relative hidden md:flex items-center justify-center">
					<div className="absolute inset-0 bg-blue-500/10 rounded-full blur-3xl" />
					<div className="relative z-10 h-[400px] w-[400px] rounded-full overflow-hidden border-4 border-blue-500/30">
						<img
							src="/placeholder.svg?height=400&width=400"
							alt="Barbeiro profissional"
							width={400}
							height={400}
							className="object-cover"
						/>
					</div>
				</div>
			</main>

			{/* Footer */}
			<footer className="w-full py-4 px-6 flex flex-col md:flex-row justify-between items-center bg-zinc-800">
				<div className="flex items-center gap-4 mb-4 md:mb-0">
					<div className="flex items-center gap-1">
						<MapPin className="h-4 w-4 text-amber-500" />
						<span className="text-sm">Av. Principal, 123</span>
					</div>
					<div className="flex items-center gap-1">
						<Phone className="h-4 w-4 text-amber-500" />
						<span className="text-sm">(11) 99999-9999</span>
					</div>
				</div>
				<div className="flex gap-4">
					<a
						href="https://www.renatodev.com"
						target="_blank"
						rel="noopener noreferrer"
						className="text-zinc-400 hover:text-amber-500"
					>
						<Github className="h-5 w-5" />
					</a>
				</div>
			</footer>
		</div>
	);
}
