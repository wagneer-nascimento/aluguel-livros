import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Alert } from 'react-native';
import Button from '../../../components/Button';
import { ResponseError } from '../../../interfaces/ResponseError';
import api from '../../../services/api';
import { Container, ContainerLista } from './styles';

interface AgendamentosResponse {
    id: string;
    dataAgendamento: string;

    livro: {
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

export const DetalheAgendamento: React.FC = () => {
    const navegation = useNavigation();
    const route = useRoute();
    const agendamento = route.params as AgendamentosResponse;
    const [agendamentosResponse, setAgendamentosResponse] = useState<AgendamentosResponse[]>();

    useEffect(() => {
        api.get('/agendamentos').then((response) => {
            setAgendamentosResponse(response.data);
        }).catch((error: ResponseError) => {
            Alert.alert(error.response.data.message);
        })
    }, [agendamento]);

    function navegacaoParaDetalheAgendamento(id: string) {
        const data = {
            id: id,
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
                        navegacaoParaDetalheAgendamento(item.id)
                    }}>

                        <Text>Nome cliente: {item.cliente.nome}</Text>
                        <Text>Endereço: {item.cliente.endereco}</Text>
                        <Text>Telefon: {item.cliente.telefone}</Text>
                        <Text>Titulo livro: {item.livro.titulo}</Text>
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