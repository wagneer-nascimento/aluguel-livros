import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Text } from 'react-native';
import Button from '../../components/Button';
import { AluguelResponse } from '../../interfaces/AluguelResponse';
import { ResponseError } from '../../interfaces/ResponseError';
import api from '../../services/api';
import {
    Container,
    ContainerLista
} from './styles';

const Aluguel: React.FC = () => {
    const navegation = useNavigation();
    const route = useRoute();
    const aluguel = route.params as AluguelResponse;
    const [aluguelResponse, setAluguelResponse] = useState<AluguelResponse[]>();

    useEffect(() => {
        api.get('/aluguel').then((response) => {
            setAluguelResponse(response.data)
        }).catch((error: ResponseError) => {
            Alert.alert(error.response.data.message);
        });

    }, [aluguel])
    return (

        <Container>
            <FlatList
                data={aluguelResponse}
                keyExtractor={(dados: AluguelResponse) => dados.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }: { item: AluguelResponse }) => (
                    <ContainerLista>
                        <Text>Nome cliente: {item.cliente.nome}</Text>
                        <Text>Titulo livro: {item.livro.titulo}</Text>
                        <Text>valor: {item.valor}</Text>
                        <Text>Data aluguel : {item.dataAluguel}</Text>
                        <Text>Data devolução : {item.dataDevolucao}</Text>
                    </ContainerLista>
                )} />
            <Button
                onPress={() => { navegation.navigate('CadastroAluguel') }}
            >Novo Aluguel</Button>
        </Container>
    )


}

export default Aluguel;