import AppointmentsByDateCard from "@/components/ui/appointments-by-date-card";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";
import { addDays, format } from "date-fns";

export const Route = createFileRoute("/_authenticated/admin/dashboard")({
	component: RouteComponent,
});
export type Appointment = {
	id: string;
	clientName: string;
	barberId: string;
	service: string;
	date: Date;
	canceledAt?: Date;
};

const appointments: Appointment[] = [
	{
		id: "1",
		clientName: "Pedro Alves",
		barberId: "1",
		service: "Corte de Tesoura",
		date: new Date(2025, 4, 2, 9, 0), // May 2, 2025, 9:00 AM
		canceledAt: new Date(2025, 4, 2, 9, 30),
	},
	{
		id: "2",
		clientName: "Lucas Mendes",
		barberId: "2",
		service: "Sobrancelha",
		date: new Date(2025, 4, 5, 10, 0), // May 2, 2025, 10:00 AM
	},
	{
		id: "3",
		clientName: "Marcos Pereira",
		barberId: "1",
		service: "Barba",
		date: new Date(2025, 4, 5, 14, 30), // May 2, 2025, 2:30 PM
		canceledAt: new Date(2025, 4, 2, 14, 30),
	},
	{
		id: "4",
		clientName: "Rafael Costa",
		barberId: "3",
		service: "Corte Degradê",
		date: new Date(2025, 4, 5, 11, 0), // May 3, 2025, 11:00 AM
	},
	{
		id: "5",
		clientName: "Bruno Ferreira",
		barberId: "2",
		service: "Corte Degradê",
		date: new Date(2025, 4, 5, 16, 0), // May 3, 2025, 4:00 PM
	},
	{
		id: "6",
		clientName: "Gustavo Lima",
		barberId: "3",
		service: "Sobrancelha",
		date: new Date(2025, 4, 5, 9, 30), // May 4, 2025, 9:30 AM
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
		{} as Record<string, Appointment[]>,
	);

	return (
		<div>
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
								<AppointmentsByDateCard
									key={currentDate.toISOString()}
									currentDate={currentDate}
									dayAppointments={dayAppointments}
								/>
							);
						})}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
