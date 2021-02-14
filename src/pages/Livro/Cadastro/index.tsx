import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { LivroResponse } from '../../../interfaces/LivroResponse';
import { ResponseError } from '../../../interfaces/ResponseError';
import api from '../../../services/api';
import {
    Container,
    Label
} from './styles';

const LivroCadastro: React.FC = () => {
    const navegacao = useNavigation();
    const [titulo, setTitulo] = useState<string>('');
    const [descricao, setDescricao] = useState<string>('');
    const [autor, setAutor] = useState<string>('');
    const [ano, setAno] = useState<string>('');

    function cadastro() {
        const data: LivroResponse = {
            id: '',
            titulo: titulo,
            descricao: descricao,
            autor: autor,
            ano: ano,
        }

        api.post('/livros', data).then((response) => {
            navegacao.navigate('Livro', response);
        }).catch((error: ResponseError) => {
            Alert.alert(error.response.data.message);
        });
    }

    return (
        <Container>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Label>Título</Label>
                <Input
                    value={titulo}
                    onChangeText={setTitulo}
                    name="titulo" />

                <Label>Autor</Label>
                <Input
                    value={autor}
                    onChangeText={setAutor}
                    name="autor" />

                <Label>Ano de lançamento</Label>
                <Input
                    value={ano}
                    onChangeText={setAno}
                    name="ano" />

                <Label>Descrição</Label>
                <Input
                    value={descricao}
                    onChangeText={setDescricao}
                    height={100}
                    multiline
                    name="descricao" />

                <Button
                    onPress={() => { cadastro() }}
                >Cadastrar</Button>
            </ScrollView>
        </Container>
    )
}

export default LivroCadastro;