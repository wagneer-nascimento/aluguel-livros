import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import api from '../../../services/api';
import { Container } from './styles';

interface LivroResponse {
    titulo: string;
    descricao: string;
    autor: string;
    ano: string;
}

const LivroCadastro: React.FC = () => {
    const navegacao = useNavigation();
    const [titulo, setTitulo] = useState<string>('');
    const [descricao, setDescricao] = useState<string>('');
    const [autor, setAutor] = useState<string>('');
    const [ano, setAno] = useState<string>('');

    function cadastro() {
        const data: LivroResponse = {
            titulo: titulo,
            descricao: descricao,
            autor: autor,
            ano: ano,
        }

        api.post('/livros', data).then((response) => {
            console.log(response)
            navegacao.navigate('Livro', response);
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <Container>
            <Text>Título</Text>
            <Input
                value={titulo}
                onChangeText={setTitulo}
                name="titulo" />

            <Text>Autor</Text>
            <Input
                value={autor}
                onChangeText={setAutor}
                name="autor" />

            <Text>Ano de lançamento</Text>
            <Input
                value={ano}
                onChangeText={setAno}
                name="ano" />

            <Text>Descrição</Text>
            <Input
                value={descricao}
                onChangeText={setDescricao}
                height={100}
                multiline
                name="descricao" />

            <Button
                onPress={() => { cadastro() }}
            >Cadastrar</Button>
        </Container>
    )
}

export default LivroCadastro;