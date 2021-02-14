import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text } from 'react-native';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import api from '../../../services/api';
import { Container } from './styles';

interface ClienteResponse {
    nome: string;
    email: string;
    telefone: string;
    endereco: string;
}

const CadastroCliente: React.FC = () => {

    const navegacao = useNavigation();
    const [nome, setNome] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [telefone, setTelefone] = useState<string>('');
    const [endereco, setEndereco] = useState<string>('');

    function cadastro() {
        const data: ClienteResponse = {
            nome: nome,
            email: email,
            telefone: telefone,
            endereco: endereco,
        }

        api.post('/clientes', data).then((response) => {
            console.log(response)
            navegacao.navigate('Cliente', response);
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <Container>
            <Text>Nome</Text>
            <Input
                value={nome}
                onChangeText={setNome}
                name="nome" />

            <Text>Email</Text>
            <Input
                value={email}
                onChangeText={setEmail}
                name="email" />

            <Text>Telefone</Text>
            <Input
                value={telefone}
                onChangeText={setTelefone}
                name="telefone" />

            <Text>Endereço</Text>
            <Input
                value={endereco}
                onChangeText={setEndereco}
                name="endereco" />

            <Button
                onPress={() => { cadastro() }}
            >Cadastrar</Button>
        </Container>
    )
}

export default CadastroCliente;