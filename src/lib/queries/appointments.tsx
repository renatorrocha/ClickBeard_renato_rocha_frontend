import { useQuery } from "@tanstack/react-query";
import { apiPrivate } from "../api";

async function getAppointments() {
	const response = await apiPrivate.get("/appointments");
	return response.data;
}

export const useGetAppointments = () => {
	return useQuery({
		queryKey: ["appointments"],
		queryFn: getAppointments,
	});
};
