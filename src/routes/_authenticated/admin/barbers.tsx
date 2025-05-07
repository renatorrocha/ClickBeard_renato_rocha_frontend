import BarberForm from "@/components/forms/barber";
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
import { DeleteBarberButton } from "@/components/ui/delete-barber";
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
import type { IBarberModel } from "@/lib/models/barber";
import { useGetBarbers } from "@/lib/queries/barbers";
import { useSpecialties } from "@/lib/queries/utils";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Pencil, Plus, Search } from "lucide-react";
import { useState } from "react";
import { z } from "zod";

export const Route = createFileRoute("/_authenticated/admin/barbers")({
	validateSearch: z.object({
		barberName: z.string().optional(),
		specialty: z.string().optional(),
	}),
	component: RouteComponent,
});

function RouteComponent() {
	const { data: specialties } = useSpecialties();
	const { data: barbers } = useGetBarbers();
	const { barberName, specialty } = Route.useSearch();
	const [isOpen, setIsOpen] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const navigate = useNavigate({ from: Route.fullPath });
	const [selectedBarber, setSelectedBarber] = useState<
		IBarberModel | undefined
	>();

	function handleSearchBarber(name: string) {
		navigate({
			search: (prev) => ({
				...prev,
				barberName: name,
			}),
		});
	}

	const filteredBarbers = barbers?.filter((barber) => {
		const nameMatch =
			!barberName ||
			barber.name.toLowerCase().includes(barberName.toLowerCase());

		const specialtyMatch =
			!specialty || barber.specialties.some((s) => s.id === specialty);

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
		<>
			<div className="flex flex-col gap-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<div>
							<CardTitle>Gerenciamento de Barbeiros</CardTitle>
							<CardDescription>
								Cadastre e gerencie os barbeiros da sua barbearia
							</CardDescription>
						</div>
						<Button onClick={() => setIsOpen(true)}>
							<Plus className="mr-2 h-4 w-4" />
							Novo Barbeiro
						</Button>
					</CardHeader>
					<CardContent>
						<div className="flex items-center mb-4">
							<div className=" items-center gap-2 hidden md:flex">
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
										{specialties?.map((specialty) => (
											<SelectItem key={specialty.id} value={specialty.id}>
												{specialty.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>

								<Button variant="outline" onClick={handleClearFilters}>
									Limpar filtros
								</Button>
							</div>

							<div className="ml-auto text-sm text-muted-foreground">
								{filteredBarbers?.length} barbeiros encontrados
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
									{filteredBarbers?.length && filteredBarbers.length > 0 ? (
										filteredBarbers.map((barber) => (
											<TableRow key={barber.id}>
												<TableCell className="font-medium">
													{barber.name}
												</TableCell>
												<TableCell>
													<Badge variant="outline">
														{barber.specialties
															.map((specialty) => specialty.label)
															.join(", ")}
													</Badge>
												</TableCell>
												<TableCell>
													{barber.createdAt
														? new Date(barber.createdAt).toLocaleDateString(
																"pt-BR",
															)
														: "N/A"}
												</TableCell>
												<TableCell className="text-right">
													<div className="flex justify-end gap-2">
														<Button
															variant="ghost"
															size="icon"
															onClick={() => {
																setSelectedBarber(barber);
																setIsEditing(true);
																setIsOpen(true);
															}}
														>
															<Pencil className="h-4 w-4" />
															<span className="sr-only">Editar</span>
														</Button>
														<DeleteBarberButton barberId={barber.id ?? ""} />
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
							Total de barbeiros: {barbers?.length}
						</div>
					</CardFooter>
				</Card>
			</div>

			<BarberForm
				specialties={specialties ?? []}
				onCancel={() => {
					setIsOpen(false);
					setIsEditing(false);
					setSelectedBarber(undefined);
				}}
				barberData={selectedBarber}
				isOpen={isOpen}
				isEditing={isEditing}
			/>
		</>
	);
}
