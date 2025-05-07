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
import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_authenticated/client/dashboard")({
	component: RouteComponent,
});

function RouteComponent() {
	// const { data: appointments } = useGetAppointments();
	const [isOpen, setIsOpen] = useState(false);
	const appointments: IAppointment[] = [
		{
			id: "1",
			date: "2024-01-01",
			canceledAt: new Date("2024-01-01"),
			specialty: {
				name: "Cabelo",
			},
			barber: {
				name: "João da Silva",
			},
			createdAt: new Date("2024-01-01"),
			updatedAt: new Date("2024-01-01"),
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
		<>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<div>
						<CardTitle>Gerenciamento de Barbeiros</CardTitle>
						<CardDescription>
							Cadastre e gerencie os barbeiros da sua barbearia
						</CardDescription>
					</div>

					<Button onClick={() => setIsOpen(true)} className="bg-primary">
						<Plus className="mr-2 h-4 w-4" />
						Novo Agendamento
					</Button>
				</CardHeader>

				<CardContent>
					{appointments.length === 0 ? (
						<div className="text-center py-10">
							<p className="text-muted-foreground">
								Você não possui agendamentos.
							</p>
						</div>
					) : (
						<div className="space-y-4">
							{appointments.map((appointment) => {
								return (
									<AppointmentCard
										key={appointment.id}
										appointment={appointment}
									/>
								);
							})}
						</div>
					)}
				</CardContent>
			</Card>

			<AppointmentForm onCancel={() => setIsOpen(false)} isOpen={isOpen} />
		</>
	);
}
