import {useQuery} from "@tanstack/react-query";
import {api} from "../../../lib/api.ts";

export interface StatusResponse {
    id: string;
    status: 'EM_ANALISE' | 'APROVADO' | 'REPROVADO';
}

export function useStatusTransferencia(idTransacao: string | null) {
    return useQuery({
        queryKey: ['status-transferencia', idTransacao],
        queryFn: async (): Promise<StatusResponse> => {
            const {data} = await api.get<StatusResponse>(`/transferencias/status/${idTransacao}`);
            return data;
        },
        enabled: !!idTransacao, // Só roda a query se idTransacao não for nulo
        refetchInterval: (query) => {
            const status = query.state.data?.status;

            if (status === 'EM_ANALISE') {
                return 1000;
            }

            return false;
        }
    })
}