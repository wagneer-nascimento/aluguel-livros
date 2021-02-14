import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import { ResponseError } from '../../../../interfaces/ResponseError';
import api from '../../../../services/api';


import { Container, ContainerInfo, Label } from './styles';

interface AgendamentosResponse {
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
const DetalheCliente: React.FC = () => {
    const route = useRoute();
    const agendamento = route.params as AgendamentosResponse;
    const navegacao = useNavigation();
    const [agendamentosResponse, setAgendamentosResponse] = useState<AgendamentosResponse>();

    useEffect(() => {
        api.get(`/agendamentos/${agendamento.id}`).then((response) => {
             setAgendamentosResponse(response.data);
        }).catch((error: ResponseError) => {
            Alert.alert(error.response.data.message);
        })
    }, [agendamento]);

    function cancelarAgendamento() {
        api.delete(`/agendamentos/${agendamento.id}`).then((response) => {
            navegacao.navigate('ListaAgendamento', response);

        }).catch((error: ResponseError) => {
            Alert.alert(error.response.data.message);
        });
    }

    return (
        <Container>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <Label>Nome</Label>
                <ContainerInfo>
                    <Label>{agendamentosResponse?.cliente.nome}</Label>
                </ContainerInfo>
                <Label>Email</Label>
                <ContainerInfo>
                    <Label>{agendamentosResponse?.cliente.email}</Label>
                </ContainerInfo>
                <Label>Endereço</Label>
                <ContainerInfo>
                    <Label>{agendamentosResponse?.cliente.endereco}</Label>
                </ContainerInfo>
                <Label>Telefone</Label>
                <ContainerInfo>
                    <Label>{agendamentosResponse?.cliente.telefone}</Label>
                </ContainerInfo>
                <Label>Título</Label>
                <ContainerInfo>
                    <Text>{agendamentosResponse?.livro.titulo}</Text>
                </ContainerInfo>
                <Label>Autor</Label>
                <ContainerInfo>
                    <Text>{agendamentosResponse?.livro.autor}</Text>
                </ContainerInfo>
                <Label>Descrição</Label>
                <ContainerInfo>
                    <Text>{agendamentosResponse?.livro.descricao}</Text>
                </ContainerInfo>
                <Label>Data agendamento</Label>
                <ContainerInfo>
                    <Text>{agendamentosResponse?.dataAgendamento}</Text>
                </ContainerInfo>

                <Button
                    onPress={() => { cancelarAgendamento() }}
                >Cancelar agendamento</Button>
            </ScrollView>
        </Container>
    );
}

export default DetalheCliente;