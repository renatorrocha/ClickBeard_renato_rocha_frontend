import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";
import { addDays, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Clock } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/dashboard")({
	component: RouteComponent,
});

const appointments = [
	{
		id: "1",
		clientName: "Pedro Alves",
		barberId: "1",
		service: "Corte de Tesoura",
		date: new Date(2025, 4, 2, 9, 0), // May 2, 2025, 9:00 AM
		status: "confirmado",
	},
	{
		id: "2",
		clientName: "Lucas Mendes",
		barberId: "2",
		service: "Sobrancelha",
		date: new Date(2025, 4, 2, 10, 0), // May 2, 2025, 10:00 AM
		status: "confirmado",
	},
	{
		id: "3",
		clientName: "Marcos Pereira",
		barberId: "1",
		service: "Barba",
		date: new Date(2025, 4, 2, 14, 30), // May 2, 2025, 2:30 PM
		status: "confirmado",
	},
	{
		id: "4",
		clientName: "Rafael Costa",
		barberId: "3",
		service: "Corte Degradê",
		date: new Date(2025, 4, 3, 11, 0), // May 3, 2025, 11:00 AM
		status: "confirmado",
	},
	{
		id: "5",
		clientName: "Bruno Ferreira",
		barberId: "2",
		service: "Corte Degradê",
		date: new Date(2025, 4, 3, 16, 0), // May 3, 2025, 4:00 PM
		status: "confirmado",
	},
	{
		id: "6",
		clientName: "Gustavo Lima",
		barberId: "3",
		service: "Sobrancelha",
		date: new Date(2025, 4, 4, 9, 30), // May 4, 2025, 9:30 AM
		status: "confirmado",
	},
];

function RouteComponent() {
	const appointmentsByDate = appointments.reduce(
		(acc, appointment) => {
			const dateKey = format(appointment.date, "yyyy-MM-dd");
			if (!acc[dateKey]) {
				acc[dateKey] = [];
			}
			acc[dateKey].push(appointment);
			return acc;
		},
		{} as Record<string, typeof appointments>,
	);

	return (
		<div>
			<h1>Dashboard</h1>

			<Card>
				<CardHeader>
					<CardTitle>Agenda Semanal</CardTitle>
					<CardDescription>Visão completa dos próximos 7 dias</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{Array.from({ length: 7 }).map((_, index) => {
							const currentDate = addDays(new Date(), index);
							const dateKey = format(currentDate, "yyyy-MM-dd");
							const dayAppointments = appointmentsByDate[dateKey] || [];

							return (
								<Card key={index} className="border shadow-sm">
									<CardHeader className="pb-2">
										<CardTitle className="text-base">
											{format(currentDate, "EEEE, dd/MM", { locale: ptBR })}
										</CardTitle>
										<CardDescription>
											{dayAppointments.length} agendamentos
										</CardDescription>
									</CardHeader>
									<CardContent className="max-h-60 overflow-y-auto">
										{dayAppointments.length > 0 ? (
											<div className="space-y-2">
												{dayAppointments.map((appointment) => (
													<div
														key={appointment.id}
														className="p-2 rounded-md bg-muted flex justify-between items-center text-sm"
													>
														<div className="flex items-center gap-2">
															<Clock className="h-3 w-3" />
															<span>{format(appointment.date, "HH:mm")}</span>
														</div>
														<div className="font-medium truncate max-w-[120px]">
															{appointment.clientName}
														</div>
														<div className="text-xs text-muted-foreground truncate max-w-[100px]">
															Renato
														</div>
													</div>
												))}
											</div>
										) : (
											<p className="text-xs text-muted-foreground">
												Nenhum agendamento
											</p>
										)}
									</CardContent>
								</Card>
							);
						})}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
