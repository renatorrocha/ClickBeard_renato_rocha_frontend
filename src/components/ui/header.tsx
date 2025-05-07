import { useAuthStore } from "@/lib/stores/auth";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { Calendar, LogOut, Menu, Users, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./button";

type NavItem = {
	name: string;
	href: string;
	icon: React.ReactNode;
};

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();

	const adminNavigation: NavItem[] = [
		{
			name: "Agendamentos",
			href: "/admin/dashboard",
			icon: <Calendar className="w-5 h-5 mr-2" />,
		},
		{
			name: "Barbeiros",
			href: "/admin/barbers",
			icon: <Users className="w-5 h-5 mr-2" />,
		},
	];

	const clientNavigation: NavItem[] = [
		{
			name: "Agendamentos",
			href: "/client/dashboard",
			icon: <Calendar className="w-5 h-5 mr-2" />,
		},
	];

	function toggleMenu() {
		setIsMenuOpen(!isMenuOpen);
	}

	const { logout } = useAuthStore();

	function handleLogout() {
		logout();
		navigate({ to: "/login" });
	}

	function isActive(path: string) {
		return location.pathname.includes(path);
	}

	const navigation =
		useAuthStore.getState().user?.role === "ADMIN"
			? adminNavigation
			: clientNavigation;

	return (
		<header className="bg-gray-900 text-white shadow-md">
			<div className="container mx-auto px-4">
				
				<div className="flex justify-between items-center py-4">
					<div className="flex items-center">
						<h1 className="text-xl font-bold">
							<span className="text-blue-300">Click</span>-Beard
						</h1>
					</div>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex space-x-6">
						{navigation.map((item) => (
							<Link
								key={item.name}
								to={item.href}
								className={`flex items-center transition-colors duration-200 hover:text-blue-300 ${
									isActive(item.href) ? "text-blue-400 font-medium" : ""
								}`}
							>
								{item.icon}
								{item.name}
							</Link>
						))}

						<Button
							variant="outline"
							size="icon"
							className="bg-gray-600 hover:bg-gray-700 border-none"
							onClick={handleLogout}
						>
							<LogOut className="w-5 h-5 text-gray-300" />
						</Button>
					</nav>

					{/* Mobile Menu Button */}
					<Button
						type="button"
						className="md:hidden text-white focus:outline-none"
						onClick={toggleMenu}
						aria-label="Toggle menu"
					>
						{isMenuOpen ? (
							<X className="w-6 h-6" />
						) : (
							<Menu className="w-6 h-6" />
						)}
					</Button>
				</div>

				{/* Mobile Navigation */}
				{isMenuOpen && (
					<div className="md:hidden py-3">
						<div className="flex flex-col space-y-3 pb-3">
							{navigation.map((item) => (
								<Link
									key={item.name}
									to={item.href}
									className={`flex items-center px-3 py-2 rounded transition-colors duration-200 hover:bg-gray-800 ${
										isActive(item.href) ? "bg-gray-800 text-blue-400" : ""
									}`}
									onClick={() => setIsMenuOpen(false)}
								>
									{item.icon}
									{item.name}
								</Link>
							))}

							<Button
								variant="outline"
								size="icon"
								className="bg-gray-600 hover:bg-gray-700 border-none"
								onClick={handleLogout}
							>
								<LogOut className="w-5 h-5 text-gray-300" />
							</Button>
						</div>
					</div>
				)}
			</div>
		</header>
	);
}
