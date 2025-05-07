import { cn } from "@/lib/utils";
import type { Appointment } from "@/routes/_authenticated/admin/dashboard";
import { format, isToday } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Clock, X } from "lucide-react";
import { Badge } from "./badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./card";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "./tooltip";

export default function AppointmentsByDateCard({
	currentDate,
	dayAppointments,
}: {
	currentDate: Date;
	dayAppointments: Appointment[];
}) {
	// Ordenar agendamentos por horário
	const sortedAppointments = [...dayAppointments].sort(
		(a, b) => a.date.getTime() - b.date.getTime(),
	);

	return (
		<Card
			className={cn(
				"transition-all duration-200",
				isToday(currentDate)
					? "border-blue-500 bg-blue-50 dark:bg-blue-950/20"
					: "border-gray-200 hover:border-gray-300 dark:border-gray-800 dark:hover:border-gray-700",
			)}
		>
			<CardHeader className="pb-2">
				<CardTitle className="text-base capitalize">
					{format(currentDate, "EEEE, dd/MM", { locale: ptBR })}
				</CardTitle>
				<CardDescription>
					{dayAppointments.length}{" "}
					{dayAppointments.length === 1 ? "agendamento" : "agendamentos"}
				</CardDescription>
			</CardHeader>
			<CardContent className="max-h-60 overflow-y-auto scrollbar-thin">
				{sortedAppointments.length > 0 ? (
					<div className="space-y-2">
						{sortedAppointments.map((appointment) => (
							<TooltipProvider key={appointment.id}>
								<Tooltip>
									<TooltipTrigger asChild>
										<div
											className={cn(
												"p-2 rounded-md flex justify-between items-center text-sm",
												appointment.canceledAt
													? "bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800"
													: "bg-muted",
											)}
										>
											<div className="flex items-center gap-2">
												<Clock className="h-3 w-3" />
												<span>{format(appointment.date, "HH:mm")}</span>
											</div>
											<div className="font-medium truncate max-w-[120px]">
												{appointment.user.name}
											</div>
											<div className="flex items-center gap-1">
												{appointment.canceledAt ? (
													<Badge variant="destructive" className="text-xs h-5">
														<X className="h-3 w-3 mr-1" />
														Cancelado
													</Badge>
												) : (
													<Badge variant="outline" className="text-xs h-5">
														{appointment.barber.name || "Barbeiro"}
													</Badge>
												)}
											</div>
										</div>
									</TooltipTrigger>

									<TooltipContent>
										<div className="space-y-1 text-xs">
											<p>
												<strong>Cliente:</strong> {appointment.user.name}
											</p>
											<p>
												<strong>Serviço:</strong> {appointment.specialty.label}
											</p>
											<p>
												<strong>Barbeiro:</strong>{" "}
												{appointment.barber.name || "Não definido"}
											</p>
											{appointment.canceledAt && (
												<p>
													<strong>Cancelado em:</strong>{" "}
													{format(appointment.canceledAt, "dd/MM/yyyy HH:mm")}
												</p>
											)}
										</div>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						))}
					</div>
				) : (
					<div className="flex flex-col items-center justify-center py-4 text-center">
						<p className="text-sm text-muted-foreground">Nenhum agendamento</p>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
