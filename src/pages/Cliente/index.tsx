import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Text } from 'react-native';
import Button from '../../components/Button';
import { ClienteResponse } from '../../interfaces/ClienteResponse';
import api from '../../services/api';
import {
    Container,
    ContainerLista
} from './styles';

 export const ListaCliente: React.FC = () => {
    const route = useRoute();
    const cliente = route.params as ClienteResponse;
    const navegation = useNavigation();
    const [clienteResponse, setClienteResponse] = useState<ClienteResponse[]>();

    useEffect(() => {
        api.get('/clientes').then((response) => {
            setClienteResponse(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [cliente]);

    function navegacaoParaDetalheCliente(id: string, email: string, endereco: string, nome: string, telefone: string) {
        const data: ClienteResponse = {
            id: id,
            nome: nome,
            email: email,
            telefone: telefone,
            endereco: endereco,
        }
        navegation.navigate('ClienteDetalhe', data);
    }

    return (
        <Container>
            <FlatList
                data={clienteResponse}
                keyExtractor={(clienteResponse: ClienteResponse) => clienteResponse.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }: { item: ClienteResponse }) => (
                    <ContainerLista onPress={() => {
                        navegacaoParaDetalheCliente(
                            item.id, item.email, item.endereco, item.nome, item.telefone
                        )
                    }}>
                        <Text>Nome: {item.nome}</Text>
                        <Text>Email: {item.email}</Text>
                        <Text>Telefone: {item.telefone}</Text>
                        <Text>Endereço: {item.endereco}</Text>
                    </ContainerLista>
                )} />

            <Button onPress={() => { navegation.navigate('ClienteCadastro') }}
            >Adicionar Cliente</Button>

        </Container>
    );
}

export default ListaCliente;