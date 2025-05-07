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
import { MultiSelect, type Option } from "@/components/ui/multi-select";
import {
	type IBarberModel,
	type ICreateBarberModel,
	type IUpdateBarberModel,
	createBarberModel,
	updateBarberModel,
} from "@/lib/models/barber";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";

const specialitiesOptions: Option[] = [
	{ label: "Corte Masculino", value: "corte-masculino" },
	{ label: "Barba", value: "barba" },
	{ label: "Sobrancelha", value: "sobrancelha" },
	{ label: "Coloração", value: "coloracao" },
	{ label: "Tratamento Capilar", value: "tratamento-capilar" },
	{ label: "Penteados", value: "penteados" },
];

export default function BarberForm({
	barberData,
	onCancel,
	isOpen,
}: {
	onCancel: () => void;
	barberData?: IBarberModel;
	isOpen: boolean;
}) {
	const isEditing = Boolean(barberData);

	const form = useForm<ICreateBarberModel | IUpdateBarberModel>({
		resolver: zodResolver(isEditing ? updateBarberModel : createBarberModel),
		defaultValues: {
			name: barberData?.name || "",
			document: barberData?.document || "",
			specialities: barberData?.specialities || [],
			...(isEditing && { id: barberData?.id }),
		},
	});

	async function onSubmit(data: ICreateBarberModel | IUpdateBarberModel) {
		console.log(data);
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
								name="specialities"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Especialidades</FormLabel>
										<FormControl>
											<MultiSelect
												options={specialitiesOptions}
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
							<Button variant="outline" onClick={onCancel}>
								Cancelar
							</Button>

							<ControlledBtn type="submit" isLoading={false} className="w-fit">
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
