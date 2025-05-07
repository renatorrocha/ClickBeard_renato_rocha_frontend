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
import { useDeleteBarber } from "@/lib/queries/barbers";
import { AlertCircle } from "lucide-react";

interface DeleteBarberButtonProps {
	barberId?: string;
}

export function DeleteBarberButton({ barberId }: DeleteBarberButtonProps) {
	const { mutate: deleteBarber, isPending: isLoading } = useDeleteBarber();

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button
					variant="outline"
					className="text-destructive border-destructive hover:bg-destructive/10"
				>
					Excluir
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle className="flex items-center gap-2">
						<AlertCircle className="h-5 w-5 text-destructive" />
						Excluir barbeiro
					</AlertDialogTitle>
					<AlertDialogDescription>
						Tem certeza que deseja excluir este barbeiro? Esta ação não pode ser
						desfeita.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Voltar</AlertDialogCancel>
					<AlertDialogAction
						onClick={() => deleteBarber(barberId ?? "")}
						disabled={isLoading}
						className="bg-destructive hover:bg-destructive/90"
					>
						{isLoading ? "Excluindo..." : "Sim, excluir"}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
