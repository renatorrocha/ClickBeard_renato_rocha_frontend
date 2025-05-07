import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";

export default function AppointmentForm({
	onCancel,
	isOpen,
}: {
	onCancel: () => void;
	isOpen: boolean;
}) {
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
			</DialogContent>
		</Dialog>
	);
}
