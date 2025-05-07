import barberShop from "@/assets/barber-shop.jpg";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
	component: () => {
		return (
			<div className="flex h-dvh w-full flex-col lg:flex-row">
				{/* Left side - Image */}
				<figure className="relative h-64 lg:h-full lg:w-2/3 hidden lg:block">
					<img
						src={barberShop}
						alt="Barber Shop"
						className="h-full w-full object-cover"
					/>
					{/* Overlay */}

					<div className="absolute inset-0 bg-black/60" />
					{/* Text */}
					<div className="absolute bottom-0 left-0 flex flex-col items-center justify-center text-white p-8">
						<div className="flex items-center mb-6">
							<h1 className="text-4xl font-bold">
								<span className="text-blue-300">Click</span>-Beard
							</h1>
						</div>
					</div>
				</figure>

				{/* Right side - Form */}
				<div className="flex flex-col items-center flex-1 justify-center bg-gray-900 w-full lg:w-1/3">
					<Outlet />
				</div>
			</div>
		);
	},
});
