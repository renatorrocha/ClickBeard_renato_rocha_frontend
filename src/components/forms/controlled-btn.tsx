import { Button, type buttonVariants } from "@/components/ui/button";
import type { VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";

interface IControlledBtn
	extends ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	isLoading: boolean;
}

export default function ControlledBtn({
	isLoading,
	className,
	children,
	...props
}: IControlledBtn) {
	return (
		<Button
			disabled={isLoading}
			className={className ?? "w-full bg-blue-500 hover:bg-blue-600"}
			{...props}
		>
			{isLoading ? (
				<div className="flex items-center gap-4">
					<Loader2 className="animate-spin" />
					Carregando...
				</div>
			) : (
				children
			)}
		</Button>
	);
}
