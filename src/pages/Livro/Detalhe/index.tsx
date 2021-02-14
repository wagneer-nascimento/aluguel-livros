import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView } from 'react-native';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { LivroResponse } from '../../../interfaces/LivroResponse';
import { ResponseError } from '../../../interfaces/ResponseError';
import api from '../../../services/api';
import {
    Container,
    Label
} from './styles';

const DetalheLivro: React.FC = () => {
    const navegacao = useNavigation();
    const route = useRoute();
    const livro = route.params as LivroResponse;
    let [editavel, setEditavel] = useState<boolean>(false);
    const [id, setID] = useState<string>('');
    const [titulo, setTitulo] = useState<string>('');
    const [descricao, setDescricao] = useState<string>('');
    const [autor, setAutor] = useState<string>('');
    const [ano, setAno] = useState<string>('');

    useEffect(() => {
        preencherInputTextComOsValoresDoParametro();

    }, []);

    function preencherInputTextComOsValoresDoParametro() {
        setID(livro.id);
        setTitulo(livro.titulo);
        setDescricao(livro.descricao);
        setAutor(livro.autor);
        setAno(livro.ano);
    }

    function editarLivro() {
        const data: LivroResponse = {
            id: id,
            titulo: titulo,
            descricao: descricao,
            autor: autor,
            ano: ano,
        }

        api.put('/livros', data).then((response) => {
            navegacao.navigate('Livro', response);
        }).catch((error: ResponseError) => {
            Alert.alert(error.response.data.message)
        })
    }

    function removerLivro() {
        api.delete(`/livros/${id}`).then((response) => {
            navegacao.navigate('Livro', response);
        }).catch((error: ResponseError) => {
            Alert.alert(error.response.data.message)
        })
    }

    return (
        <Container>
            <ScrollView showsVerticalScrollIndicator={false}>

                <Label>Título</Label>
                <Input
                    value={titulo}
                    onChangeText={setTitulo}
                    name="titulo"
                    editable={editavel} />

                <Label>Autor</Label>
                <Input
                    value={autor}
                    onChangeText={setAutor}
                    name="autor"
                    editable={editavel} />

                <Label>Ano de lançamento</Label>
                <Input
                    value={ano}
                    onChangeText={setAno}
                    name="ano"
                    editable={editavel} />

                <Label>Descrição</Label>
                <Input
                    value={descricao}
                    onChangeText={setDescricao}
                    height={100}
                    multiline
                    name="descricao"
                    editable={editavel} />



                <Button
                    onPress={() => { setEditavel(!editavel) }}
                >Editar</Button>
                {
                    editavel ?
                        <Button
                            onPress={() => { editarLivro() }}
                        >Salvar</Button>
                        :
                        <Button
                            onPress={() => { removerLivro() }}
                        >Remover</Button>
                }
            </ScrollView>
        </Container>
    )
}

export default DetalheLivro;