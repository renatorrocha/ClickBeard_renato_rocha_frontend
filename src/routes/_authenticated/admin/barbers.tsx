import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Pencil, Plus, Search } from "lucide-react";
import { useState } from "react";
import { z } from "zod";

type Barber = {
	id: string;
	name: string;
	specialty: { label: string; id: string }[];
	createdAt: Date;
};

// Dados de exemplo
const initialBarbers: Barber[] = [
	{
		id: "1",
		name: "Renato Silva",
		specialty: [
			{ label: "Corte Degradê", id: "Corte Degradê" },
			{ label: "Corte Tesoura", id: "Corte Tesoura" },
		],
		createdAt: new Date(2023, 5, 12),
	},
	{
		id: "2",
		name: "Carlos Oliveira",
		specialty: [
			{ label: "Barba", id: "Barba" },
			{ label: "Corte Degradê", id: "Corte Degradê" },
		],
		createdAt: new Date(2023, 8, 23),
	},
	{
		id: "3",
		name: "Felipe Santos",
		specialty: [
			{ label: "Corte Degradê", id: "Corte Degradê" },
			{ label: "Corte Tesoura", id: "Corte Tesoura" },
		],
		createdAt: new Date(2024, 1, 5),
	},
	{
		id: "4",
		name: "André Martins",
		specialty: [{ label: "Corte Degradê", id: "Corte Degradê" }],
		createdAt: new Date(2023, 11, 15),
	},
	{
		id: "5",
		name: "Lucas Ferreira",
		specialty: [{ label: "Barba", id: "Barba" }],
		createdAt: new Date(2024, 2, 8),
	},
	{
		id: "6",
		name: "Gustavo Mendes",
		specialty: [
			{ label: "Sobrancelha", id: "Sobrancelha" },
			{ label: "Corte Degradê", id: "Corte Degradê" },
		],
		createdAt: new Date(2023, 7, 19),
	},
];

export const Route = createFileRoute("/_authenticated/admin/barbers")({
	validateSearch: z.object({
		barberName: z.string().optional(),
		specialty: z.string().optional(),
	}),
	component: RouteComponent,
});

function RouteComponent() {
	const [barbers, setBarbers] = useState<Barber[]>(initialBarbers);
	const { barberName, specialty } = Route.useSearch();

	const navigate = useNavigate({ from: Route.fullPath });

	function handleSearchBarber(name: string) {
		navigate({
			search: (prev) => ({
				...prev,
				barberName: name,
			}),
		});
	}

	const allSpecialties = barbers
		.flatMap((barber) => barber.specialty.map((specialty) => specialty.id))
		.filter((specialty, index, self) => self.indexOf(specialty) === index);

	const filteredBarbers = barbers.filter((barber) => {
		const nameMatch =
			!barberName ||
			barber.name.toLowerCase().includes(barberName.toLowerCase());

		const specialtyMatch =
			!specialty || barber.specialty.some((s) => s.id === specialty);

		return nameMatch && specialtyMatch;
	});

	function handleSpecialtyFilter(selectedSpecialty: string | undefined) {
		navigate({
			search: (prev) => ({
				...prev,
				specialty: selectedSpecialty,
			}),
		});
	}

	function handleClearFilters() {
		navigate({
			search: () => ({}),
		});
	}

	return (
		<div className="flex flex-col gap-4">
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<div>
						<CardTitle>Gerenciamento de Barbeiros</CardTitle>
						<CardDescription>
							Cadastre e gerencie os barbeiros da sua barbearia
						</CardDescription>
					</div>
					<Button>
						<Plus className="mr-2 h-4 w-4" />
						Novo Barbeiro
					</Button>
				</CardHeader>
				<CardContent>
					<div className="flex items-center mb-4">
						<div className="flex items-center gap-2">
							<div className="relative flex-1 max-w-sm">
								<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
								<Input
									type="search"
									placeholder="Buscar barbeiros..."
									className="pl-8"
									value={barberName}
									onChange={(e) => handleSearchBarber(e.target.value)}
								/>
							</div>

							<Select onValueChange={handleSpecialtyFilter} value={specialty}>
								<SelectTrigger>
									<SelectValue placeholder="Filtrar por especialidade" />
								</SelectTrigger>

								<SelectContent>
									{allSpecialties.map((specialty) => (
										<SelectItem key={specialty} value={specialty}>
											{specialty}
										</SelectItem>
									))}
								</SelectContent>
							</Select>

							<Button variant="outline" onClick={handleClearFilters}>
								Limpar filtros
							</Button>
						</div>

						<div className="ml-auto text-sm text-muted-foreground">
							{filteredBarbers.length} barbeiros encontrados
						</div>
					</div>

					<div className="rounded-md border">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Nome</TableHead>
									<TableHead>Especialidade</TableHead>
									<TableHead>Data de Cadastro</TableHead>
									<TableHead className="text-right">Ações</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{filteredBarbers.length > 0 ? (
									filteredBarbers.map((barber) => (
										<TableRow key={barber.id}>
											<TableCell className="font-medium">
												{barber.name}
											</TableCell>
											<TableCell>
												<Badge variant="outline">
													{barber.specialty
														.map((specialty) => specialty.label)
														.join(", ")}
												</Badge>
											</TableCell>
											<TableCell>
												{barber.createdAt.toLocaleDateString("pt-BR")}
											</TableCell>
											<TableCell className="text-right">
												<div className="flex justify-end gap-2">
													<Button variant="ghost" size="icon">
														<Pencil className="h-4 w-4" />
														<span className="sr-only">Editar</span>
													</Button>
												</div>
											</TableCell>
										</TableRow>
									))
								) : (
									<TableRow>
										<TableCell colSpan={4} className="h-24 text-center">
											Nenhum barbeiro encontrado.
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</div>
				</CardContent>
				<CardFooter className="flex justify-between">
					<div className="text-sm text-muted-foreground">
						Total de barbeiros:
						{barberName}
					</div>
				</CardFooter>
			</Card>
		</div>
	);
}
