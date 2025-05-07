import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export async function getSpecialties() {
	const response = await api.get("/utils/specialties");

	return response.data ?? [];
}

export const useSpecialties = () => {
	const query = useQuery({
		queryKey: ["specialties"],
		queryFn: getSpecialties,
	});

	return query;
};
