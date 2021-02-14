import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import api from '../../../services/api';
import { Container, Label } from './styles';

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

        if (!nome || !email || !telefone || !endereco) {
            return Alert.alert('Todos os dados são obrigátorios');
        }

        const data: ClienteResponse = {
            nome: nome,
            email: email,
            telefone: telefone,
            endereco: endereco,
        }

        api.post('/clientes', data).then((response) => {
            navegacao.navigate('Cliente', response);
        }).catch((error) => {
            Alert.alert('Erro ao inserir cliente');
        });
    }

    return (
        <Container>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <Label>Nome</Label>
                <Input
                    value={nome}
                    onChangeText={setNome}
                    name="nome" />

                <Label>Email</Label>
                <Input
                    value={email}
                    onChangeText={setEmail}
                    name="email" />

                <Label>Telefone</Label>
                <Input
                    value={telefone}
                    onChangeText={setTelefone}
                    name="telefone" />

                <Label>Endereço</Label>
                <Input
                    value={endereco}
                    onChangeText={setEndereco}
                    name="endereco" />

                <Button
                    onPress={() => { cadastro() }}
                >Cadastrar</Button>
            </ScrollView>
        </Container>
    )
}

export default CadastroCliente;