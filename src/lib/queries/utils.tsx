import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export async function getSpecialities() {
	const response = await api.get("/utils/specialities");

	return response.data ?? [];
}

export const useSpecialities = () => {
	const query = useQuery({
		queryKey: ["specialities"],
		queryFn: getSpecialities,
	});

	return query;
};
