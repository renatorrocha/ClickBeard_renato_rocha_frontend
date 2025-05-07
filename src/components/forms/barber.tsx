import ControlledBtn from "@/components/forms/controlled-btn";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";
import {
	type IBarberModel,
	type ICreateBarberModel,
	type IUpdateBarberModel,
	createBarberModel,
	updateBarberModel,
} from "@/lib/models/barber";
import { useCreateBarber, useUpdateBarber } from "@/lib/queries/barbers";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function BarberForm({
	barberData,
	onCancel,
	isOpen,
	specialties,
	isEditing,
}: {
	onCancel: () => void;
	barberData?: IBarberModel;
	specialties: { id: string; label: string }[];
	isOpen: boolean;
	isEditing: boolean;
}) {
	const { mutate: createBarber, isPending: isCreatingBarber } =
		useCreateBarber();
	const { mutate: updateBarber, isPending: isUpdatingBarber } =
		useUpdateBarber();

	const specialtiesOptions = specialties.map((specialty) => ({
		label: specialty.label,
		value: specialty.id,
	}));

	const form = useForm<ICreateBarberModel | IUpdateBarberModel>({
		resolver: zodResolver(isEditing ? updateBarberModel : createBarberModel),
		defaultValues: {
			name: "",
			document: "",
			specialties: [],
		},
	});

	useEffect(() => {
		if (barberData && isEditing) {
			form.reset({
				name: barberData.name,
				document: barberData.document,
				specialties: barberData.specialties.map((spec) => spec.id),
				id: barberData.id,
			});
		} else {
			form.reset({
				name: "",
				document: "",
				specialties: [],
			});
		}
	}, [barberData, isEditing, form]);

	async function onSubmit(data: ICreateBarberModel | IUpdateBarberModel) {
		if (isEditing) {
			updateBarber(data as IUpdateBarberModel, {
				onSuccess: () => {
					form.reset();
					onCancel();
				},
			});
		} else {
			createBarber(data as ICreateBarberModel, {
				onSuccess: () => {
					form.reset();
					onCancel();
				},
			});
		}
	}

	return (
		<Dialog open={isOpen} onOpenChange={onCancel}>
			<DialogContent className="sm:max-w-2xl space-y-4">
				<DialogHeader>
					<DialogTitle>
						{isEditing ? "Editar Barbeiro" : "Adicionar Barbeiro"}
					</DialogTitle>
					<DialogDescription>
						Preencha os detalhes do barbeiro aqui. Clique em salvar quando
						terminar.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<div className="grid grid-cols-1 gap-4">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Nome</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="document"
								render={({ field }) => (
									<FormItem>
										<FormLabel>CPF</FormLabel>
										<FormControl>
											<Input {...field} type="number" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="specialties"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Especialidades</FormLabel>
										<FormControl>
											<MultiSelect
												options={specialtiesOptions}
												selected={field.value}
												onChange={field.onChange}
												placeholder="Selecione as especialidades..."
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className="flex justify-end gap-2 pt-2">
							<Button
								variant="outline"
								onClick={onCancel}
								className="bg-red-500 hover:bg-red-600"
							>
								Cancelar
							</Button>

							<ControlledBtn
								type="submit"
								isLoading={isEditing ? isUpdatingBarber : isCreatingBarber}
								className="w-fit"
							>
								<Save className="mr-2 h-4 w-4" />
								{isEditing ? "Atualizar Barbeiro" : "Adicionar Barbeiro"}
							</ControlledBtn>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
