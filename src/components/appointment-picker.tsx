import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Appointment {
	id: string;
	date: string;
	canceledAt: string | null;
	specialtyId: string;
	userId: string;
	barberId: string;
	createdAt: string;
	user: {
		id: string;
		name: string;
		email: string;
		password: string;
		role: string;
		createdAt: string;
	};
	specialty: {
		id: string;
		label: string;
	};
}

export default function AppointmentPicker({
	date,
	setDate,
	time,
	setTime,
	appointments = [],
}: {
	date: Date;
	setDate: (date: Date) => void;
	time: string | null;
	setTime: (time: string | null) => void;
	appointments?: Appointment[];
}) {
	const today = new Date();

	// Função para verificar se um horário está disponível
	const isTimeSlotAvailable = (timeSlot: string) => {
		const selectedDate = format(date, "yyyy-MM-dd");
		const dateTime = `${selectedDate}T${timeSlot}:00.000Z`;

		// Verifica se existe algum agendamento não cancelado para este horário
		return !appointments.some(
			(appointment) => appointment.date === dateTime && !appointment.canceledAt,
		);
	};

	// Gera os horários disponíveis
	const timeSlots = [
		"08:00",
		"08:30",
		"09:00",
		"09:30",
		"10:00",
		"10:30",
		"11:00",
		"11:30",
		"12:00",
		"12:30",
		"13:00",
		"13:30",
		"14:00",
		"14:30",
		"15:00",
		"15:30",
		"16:00",
		"16:30",
		"17:00",
		"17:30",
		"18:00",
	].map((time) => ({
		time,
		available: isTimeSlotAvailable(time),
	}));

	return (
		<div>
			<div className="rounded-md border">
				<div className="flex max-sm:flex-col">
					<Calendar
						mode="single"
						selected={date}
						onSelect={(newDate) => {
							if (newDate) {
								setDate(newDate);
								setTime(null);
							}
						}}
						className="p-2 sm:pe-5"
						disabled={[{ before: today }]}
						locale={ptBR}
					/>
					<div className="relative w-full max-sm:h-48 sm:w-40">
						<div className="absolute inset-0 py-4 max-sm:border-t">
							<ScrollArea className="h-full sm:border-s">
								<div className="space-y-3">
									<div className="flex h-5 shrink-0 items-center px-5">
										<p className="text-sm font-medium">
											{format(date, "EEEE, d", { locale: ptBR })}
										</p>
									</div>
									<div className="grid gap-1.5 px-5 max-sm:grid-cols-2">
										{timeSlots.map(({ time: timeSlot, available }) => (
											<Button
												type="button"
												key={timeSlot}
												variant={time === timeSlot ? "default" : "outline"}
												size="sm"
												className="w-full bg-blue-500 hover:bg-blue-600"
												onClick={() => setTime(timeSlot)}
												disabled={!available}
											>
												{timeSlot}
											</Button>
										))}
									</div>
								</div>
							</ScrollArea>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
