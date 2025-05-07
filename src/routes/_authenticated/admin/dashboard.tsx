import AppointmentsByDateCard from "@/components/ui/appointments-by-date-card";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useGetAppointments } from "@/lib/queries/appointments";
import { createFileRoute } from "@tanstack/react-router";
import { addDays, format } from "date-fns";
import { Loader2 } from "lucide-react";

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

function RouteComponent() {
	const { data: appointments, isLoading } = useGetAppointments();

	console.log(appointments);

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-full">
				<Loader2 className="h-4 w-4 animate-spin" />
			</div>
		);
	}

	const appointmentsByDate = appointments.reduce(
		(acc: Record<string, Appointment[]>, appointment: Appointment) => {
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
