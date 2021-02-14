export interface AgendamentosResponse {
    id: string;
    dataAgendamento: string;

    livro: {
        id: string;
        ano: string;
        descricao: string;
        autor: string;
        titulo: string;
    }
    cliente: {
        id: string;
        nome: string;
        email: string;
        endereco: string;
        telefone: string;
    }
}