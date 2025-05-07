import { CancelAppointmentButton } from "@/components/ui/cancel-appointment-btn";
import { useGetAppointments } from "@/lib/queries/appointments";
import { createFileRoute } from "@tanstack/react-router";
import { formatDate } from "date-fns";

export const Route = createFileRoute("/_authenticated/client/dashboard")({
	component: RouteComponent,
});

function RouteComponent() {
	// const { data: appointments } = useGetAppointments();
	const appointments = [
		{
			id: "1",
			date: "2024-01-01",
			canceledAt: "2024-01-01",
			specialty: {
				name: "Cabelo",
			},
			barber: {
				name: "João da Silva",
			},
		},
		{
			id: "1",
			date: "2024-01-01",
			specialty: {
				name: "Cabelo",
			},
			barber: {
				name: "João da Silva",
			},
		},
		{
			id: "1",
			date: "2025-06-01",
			specialty: {
				name: "Cabelo",
			},
			barber: {
				name: "João da Silva",
			},
		},
	];

	return (
		<div className="container py-10">
			<h1 className="text-2xl font-bold mb-6">Meus Agendamentos</h1>

			{appointments.length === 0 ? (
				<div className="text-center py-10">
					<p className="text-muted-foreground">Você não possui agendamentos.</p>
				</div>
			) : (
				<div className="space-y-4">
					{appointments.map((appointment) => {
						const appointmentDate = new Date(appointment.date);
						const now = new Date();
						const timeDiff = appointmentDate.getTime() - now.getTime();
						const hoursDiff = timeDiff / (1000 * 60 * 60);
						const canCancel = hoursDiff > 2 && !appointment.canceledAt;
						const isPast = appointmentDate < now;

						return (
							<div
								key={appointment.id}
								className={`p-4 border rounded-lg ${
									appointment.canceledAt
										? "bg-muted/50 border-muted"
										: isPast
											? "bg-muted/30"
											: "bg-card"
								}`}
							>
								<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
									<div>
										<h3 className="font-medium">
											{appointment.specialty.name} com {appointment.barber.name}
										</h3>
										<p className="text-sm text-muted-foreground">
											{formatDate(appointment.date, "dd/MM/yyyy")}
										</p>
										{appointment.canceledAt && (
											<p className="text-sm text-destructive mt-1">
												Cancelado em{" "}
												{formatDate(appointment.canceledAt, "dd/MM/yyyy HH:mm")}
											</p>
										)}
										{isPast && !appointment.canceledAt && (
											<p className="text-sm text-muted-foreground mt-1">
												Agendamento concluído
											</p>
										)}
									</div>

									{canCancel && (
										<CancelAppointmentButton appointmentId={appointment.id} />
									)}
								</div>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}
