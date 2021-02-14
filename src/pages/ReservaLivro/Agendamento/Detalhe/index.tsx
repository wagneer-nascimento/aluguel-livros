import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import api from '../../../../services/api';


import { Container, ContainerInfo } from './styles';

interface AgendamentosResponse {
    id: string;
    idCliente: string;
    idLivro: string;
    nome: string;
    titulo: string;
    dataAgendamento: string;
}

const DetalheCliente: React.FC = () => {
    const route = useRoute();
    const agendamento = route.params as AgendamentosResponse;
    const navegacao = useNavigation();

    function cancelarAgendamento() {
        api.delete(`/agendamentos/${agendamento.id}`).then((response) => {

            navegacao.navigate('ListaAgendamento', response);
            
        }).catch((error) => {
            console.log(error)
        });
    }

    return (
        <Container>
            <Text>Id Cliente</Text>
            <ContainerInfo>
                <Text>{agendamento.idCliente}</Text>
            </ContainerInfo>
            <Text>Nome</Text>
            <ContainerInfo>
                <Text>{agendamento.nome}</Text>
            </ContainerInfo>
            <Text>Id Livro</Text>
            <ContainerInfo>
                <Text>{agendamento.idLivro}</Text>
            </ContainerInfo>
            <Text>Título</Text>
            <ContainerInfo>
                <Text>{agendamento.titulo}</Text>
            </ContainerInfo>
            <Text>Data Agendamento</Text>
            <ContainerInfo>
                <Text>{agendamento.dataAgendamento}</Text>
            </ContainerInfo>

            <Button
                onPress={() => { cancelarAgendamento() }}
            >Cancelar agendamento</Button>

        </Container>
    )
}

export default DetalheCliente;