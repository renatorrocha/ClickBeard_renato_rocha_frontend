import { createAppointmentSchema } from "@/lib/models/appointment";
import type { ICreateAppointment } from "@/lib/models/appointment";
import { useCreateAppointment } from "@/lib/queries/appointments";
import { useGetBarbers } from "@/lib/queries/barbers";
import { useSpecialties } from "@/lib/queries/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import AppointmentPicker from "../appointment-picker";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Form } from "../ui/form";
import {
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { Select } from "../ui/select";
import ControlledBtn from "./controlled-btn";
export default function AppointmentForm({
	onCancel,
	isOpen,
}: {
	onCancel: () => void;
	isOpen: boolean;
}) {
	const { mutate: createAppointment, isPending: isCreatingAppointment } =
		useCreateAppointment();
	const { data: specialties } = useSpecialties();
	const [time, setTime] = useState<string | null>(null);

	const form = useForm<ICreateAppointment>({
		resolver: zodResolver(createAppointmentSchema),
		defaultValues: {
			date: new Date(),
			specialtyId: "",
			barberId: "",
		},
	});

	const specialtyId = form.watch("specialtyId");

	const { data: barbers } = useGetBarbers(specialtyId, !!specialtyId);

	const barbersOptions = barbers?.map((barber) => ({
		label: barber.name,
		value: barber.id,
	}));

	const specialtiesOptions = specialties?.map((specialty) => ({
		label: specialty.label,
		value: specialty.id,
	}));

	async function onSubmit(data: ICreateAppointment) {
		const newDate = new Date(data.date);
		newDate.setHours(
			Number(time?.split(":")[0]),
			Number(time?.split(":")[1]),
			0,
			0,
		);

		const newData = {
			...data,
			date: newDate,
		};

		createAppointment(newData, {
			onSuccess: () => {
				form.reset();
				onCancel();
			},
		});
	}

	return (
		<Dialog open={isOpen} onOpenChange={onCancel}>
			<DialogContent className="sm:max-w-2xl space-y-4">
				<DialogHeader>
					<DialogTitle>Adicionar Agendamento</DialogTitle>
					<DialogDescription>
						Preencha os detalhes do agendamento aqui. Clique em salvar quando
						terminar.
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
							<FormField
								control={form.control}
								name="specialtyId"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Especialidade</FormLabel>
										<FormControl>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormItem>
													<FormControl>
														<SelectTrigger className="w-full">
															<SelectValue placeholder="Selecione uma especialidade" />

															<SelectContent>
																{specialtiesOptions?.map((option) => (
																	<SelectItem
																		key={option.value}
																		value={option.value}
																	>
																		{option.label}
																	</SelectItem>
																))}
															</SelectContent>
														</SelectTrigger>
													</FormControl>
												</FormItem>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{specialtyId && (
								<FormField
									control={form.control}
									name="barberId"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Barbeiro</FormLabel>
											<FormControl>
												<Select
													onValueChange={field.onChange}
													defaultValue={field.value}
												>
													<FormItem>
														<FormControl>
															<SelectTrigger className="w-full">
																<SelectValue placeholder="Selecione um barbeiro" />

																<SelectContent>
																	{barbersOptions?.map((option) => (
																		<SelectItem
																			key={option.value}
																			value={option.value}
																		>
																			{option.label}
																		</SelectItem>
																	))}
																</SelectContent>
															</SelectTrigger>
														</FormControl>
													</FormItem>
												</Select>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							)}

							<FormField
								control={form.control}
								name="date"
								render={({ field }) => (
									<FormItem className="col-span-2">
										<FormLabel>Data e horário</FormLabel>
										<FormControl>
											<AppointmentPicker
												date={field.value}
												setDate={field.onChange}
												time={time}
												setTime={setTime}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<ControlledBtn type="submit" isLoading={isCreatingAppointment}>
							Salvar
						</ControlledBtn>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
