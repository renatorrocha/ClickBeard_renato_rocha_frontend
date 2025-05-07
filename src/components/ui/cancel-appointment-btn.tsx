import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { useState } from "react";

interface CancelAppointmentButtonProps {
	appointmentId: string;
}

export function CancelAppointmentButton({
	appointmentId,
}: CancelAppointmentButtonProps) {
	const [isLoading, setIsLoading] = useState(false);

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button
					variant="outline"
					className="text-destructive border-destructive hover:bg-destructive/10"
				>
					Cancelar
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle className="flex items-center gap-2">
						<AlertCircle className="h-5 w-5 text-destructive" />
						Cancelar agendamento
					</AlertDialogTitle>
					<AlertDialogDescription>
						Tem certeza que deseja cancelar este agendamento? Esta ação não pode
						ser desfeita.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Voltar</AlertDialogCancel>
					<AlertDialogAction
						disabled={isLoading}
						className="bg-destructive hover:bg-destructive/90"
					>
						{isLoading ? "Cancelando..." : "Sim, cancelar"}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
