import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import Button from '../../../components/Button';
import api from '../../../services/api';
import { Container, ContainerLista } from './styles';

interface AgendamentosResponse {
    id: string;
    idCliente: string;
    idLivro: string;
    nome: string;
    titulo: string;
    dataAgendamento: string;
}

export const DetalheAgendamento: React.FC = () => {
    const navegation = useNavigation();
    const route = useRoute();
    const agendamento = route.params as AgendamentosResponse;
    const [agendamentosResponse, setAgendamentosResponse] = useState<AgendamentosResponse[]>();

    useEffect(() => {
        api.get('/agendamentos').then((response) => {
            setAgendamentosResponse(response.data)
            console.log(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [agendamento]);

    function navegacaoParaDetalheAgendamento(id: string, idCliente: string, idLivro: string, nome: string, dataAgendamento: string, titulo: string) {
        const data: AgendamentosResponse = {
            id: id,
            idCliente: idCliente,
            idLivro: idLivro,
            nome: nome,
            dataAgendamento: dataAgendamento,
            titulo: titulo,
        }

        navegation.navigate('DetalheAgendamento', data);
    }
    return (
        <Container>
            <FlatList
                data={agendamentosResponse}
                keyExtractor={(dados: AgendamentosResponse) => dados.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }: { item: AgendamentosResponse }) => (
                    <ContainerLista onPress={() => {
                        navegacaoParaDetalheAgendamento(
                            item.id, item.idCliente, item.idLivro, item.nome, item.dataAgendamento, item.titulo
                        )
                    }}>
                        <Text>id cliente: {item.idCliente}</Text>
                        <Text>id livro: {item.idLivro}</Text>
                        <Text>Nome cliente: {item.nome}</Text>
                        <Text>Titulo : {item.titulo}</Text>
                        <Text>Data Agendamento: {item.dataAgendamento}</Text>
                    </ContainerLista>
                )} />
            <Button
                onPress={() => { navegation.navigate('AgendamentoLivroCliente') }}
            >Novo Agendamento</Button>
        </Container>
    );
}

export default DetalheAgendamento;