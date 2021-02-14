export interface AluguelResponse {
    id: string;
    valor: string;
    dataAluguel: string;
    dataDevolucao: string;

    cliente: {
        email: string;
        endereco: string;
        id: string;
        nome: string;
        telefone: string;
    }
    livro: {
        id: string;
        ano: string;
        autor: string;
        descricao: string;
        titulo: string;
    }
}
export interface AluguelCadastro {
    idCliente: string;
    idLivro: string;
    valor: string;
    dataAluguel: string;
    dataDevolucao: string;
}
