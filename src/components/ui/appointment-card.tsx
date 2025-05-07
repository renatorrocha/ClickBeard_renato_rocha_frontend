import type { IAppointment } from "@/lib/models/appointment";
import { formatDate } from "date-fns";
import { CancelAppointmentButton } from "./cancel-appointment-btn";

export default function AppointmentCard({
	appointment,
}: { appointment: IAppointment }) {
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
}
