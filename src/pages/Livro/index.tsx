import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import Button from '../../components/Button';
import api from '../../services/api';
import { Container, ContainerLista } from './styles';

interface LivroResponse {
    id: string;
    titulo: string;
    descricao: string;
    autor: string;
    ano: string;
}

export const ListaLivro: React.FC = () => {
    const route = useRoute();
    const livro = route.params as LivroResponse;
    const navegation = useNavigation();
    const [livroResponse, setLivroResponse] = useState<LivroResponse[]>();

    useEffect(() => {
        api.get('/livros').then((response) => {
            setLivroResponse(response.data);

        }).catch((error) => {
            console.log(error)
        })
    }, [livro]);

    function navegacaoParaDetalheLivro(id: string, autor: string, descricao: string, ano: string, titulo: string) {
        const data: LivroResponse = {
            id: id,
            autor: autor,
            descricao: descricao,
            ano: ano,
            titulo: titulo,
        }
        console.log(data)
        navegation.navigate('DetalheLivro', data);
    }

    return (
        <Container>
            <FlatList
                data={livroResponse}
                keyExtractor={(livroResponse: LivroResponse) => livroResponse.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }: { item: LivroResponse }) => (
                    <ContainerLista onPress={() => {
                        navegacaoParaDetalheLivro(item.id, item.autor, item.descricao, item.ano, item.titulo)
                    }}>
                        <Text>titulo: {item.titulo}</Text>
                        <Text>Autor: {item.autor}</Text>
                        <Text>Ano Lançamento: {item.ano}</Text>
                        <Text>descricao: {item.descricao}</Text>
                    </ContainerLista>
                )} />

            <Button onPress={() => { navegation.navigate('CadastroLivro') }}
            >Adicionar Livro</Button>

        </Container>
    );
}

export default ListaLivro;