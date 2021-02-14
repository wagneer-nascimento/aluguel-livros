import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import api from '../../../services/api';
import { ClienteResponse } from '../../../interfaces/ClienteResponse';
import { ResponseError } from '../../../interfaces/ResponseError';
import {
    Container,
    Label
} from './styles';

const DetalheCliente: React.FC = () => {
    const navegacao = useNavigation();
    const route = useRoute();
    const cliente = route.params as ClienteResponse;
    let [editavel, setEditavel] = useState<boolean>(false);
    const [id, setID] = useState<string>('');
    const [nome, setNome] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [telefone, setTelefone] = useState<string>('');
    const [endereco, setEndereco] = useState<string>('');

    useEffect(() => {
        preencherInputTextComOsValoresDoParametro();

    }, []);

    function preencherInputTextComOsValoresDoParametro() {
        setID(cliente.id ? cliente.id : '');
        setNome(cliente.nome);
        setEmail(cliente.email);
        setTelefone(cliente.telefone);
        setEndereco(cliente.endereco);
    }

    function editarCliente() {

        if (!id || !nome || !email || !telefone || !endereco) {
            return Alert.alert('Todos os dados são obrigátorios');
        }

        const data: ClienteResponse = {
            id: id,
            nome: nome,
            email: email,
            telefone: telefone,
            endereco: endereco,
        }

        api.put('/clientes', data).then((response) => {
            navegacao.navigate('Cliente', response);
        }).catch((error: ResponseError) => {
            Alert.alert(error.response.data.message);
        });
    }

    function removerCliente() {
        api.delete(`/clientes/${id}`).then((response) => {
            navegacao.navigate('Cliente', response);
        }).catch((error: ResponseError) => {
            Alert.alert(error.response.data.message);
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
                    name="nome"
                    editable={editavel} />

                <Label>Email</Label>
                <Input
                    value={email}
                    onChangeText={setEmail}
                    name="email"
                    editable={editavel} />

                <Label>Telefone</Label>
                <Input
                    value={telefone}
                    onChangeText={setTelefone}
                    name="telefone"
                    editable={editavel} />
                <Label>Endereço</Label>
                <Input
                    value={endereco}
                    onChangeText={setEndereco}
                    name="endereco"
                    editable={editavel} />

                <Button
                    onPress={() => { setEditavel(!editavel) }}
                >Editar</Button>
                {
                    editavel ?
                        <Button
                            onPress={() => { editarCliente() }}
                        >Salvar</Button>
                        :
                        <Button
                            onPress={() => { removerCliente() }}
                        >Remover</Button>
                }
            </ScrollView>
        </Container>
    )
}

export default DetalheCliente;