import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Text } from 'react-native';
import Button from '../../components/Button';
import api from '../../services/api';
import { Container, ContainerLista } from './styles';

interface AluguelResponse {
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

const Aluguel: React.FC = () => {
    const navegation = useNavigation();
    const route = useRoute();
    const aluguel = route.params as AluguelResponse;
    const [aluguelResponse, setAluguelResponse] = useState<AluguelResponse[]>();

    useEffect(() => {

        api.get('/aluguel').then((response) => {
            setAluguelResponse(response.data)
            console.log(response.data)
        }).catch((error) => {
            console.log(error)
        })

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