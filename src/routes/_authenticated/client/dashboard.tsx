import AppointmentForm from "@/components/forms/appointment";
import AppointmentCard from "@/components/ui/appointment-card";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { IAppointment } from "@/lib/models/appointment";
import { useGetAppointmentsByClientId } from "@/lib/queries/appointments";
import { useAuthStore } from "@/lib/stores/auth";
import { createFileRoute } from "@tanstack/react-router";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_authenticated/client/dashboard")({
	component: RouteComponent,
});

function RouteComponent() {
	const { user } = useAuthStore();
	const { data: appointments, isLoading } = useGetAppointmentsByClientId(
		user?.id || "",
	);
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<div>
						<CardTitle>Gerenciamento de Barbeiros</CardTitle>
						<CardDescription>
							Cadastre e gerencie os barbeiros da sua barbearia
						</CardDescription>
					</div>

					<Button
						onClick={() => setIsOpen(true)}
						className="bg-blue-500 hover:bg-blue-600"
					>
						<Plus className="mr-2 h-4 w-4" />
						Novo Agendamento
					</Button>
				</CardHeader>

				<CardContent>
					{isLoading ? (
						<div className="flex justify-center items-center h-full">
							<Loader2 className="h-4 w-4 animate-spin" />
						</div>
					) : (
						<div className="space-y-4">
							{appointments.length === 0 ? (
								<div className="text-center py-10">
									<p className="text-muted-foreground">
										Você não possui agendamentos.
									</p>
								</div>
							) : (
								<div className="space-y-4">
									{appointments.map((appointment: IAppointment) => {
										return (
											<AppointmentCard
												key={appointment.id}
												appointment={appointment}
											/>
										);
									})}
								</div>
							)}
						</div>
					)}
				</CardContent>
			</Card>

			<AppointmentForm onCancel={() => setIsOpen(false)} isOpen={isOpen} />
		</>
	);
}
