import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import api from '../../../services/api';

import { Container } from './styles';

interface ClienteResponse {
    id: string;
    nome: string;
    email: string;
    telefone: string;
    endereco: string;
}

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
        setID(cliente.id);
        setNome(cliente.nome);
        setEmail(cliente.email);
        setTelefone(cliente.telefone);
        setEndereco(cliente.endereco);
    }

    function editarCliente() {
        const data: ClienteResponse = {
            id: id,
            nome: nome,
            email: email,
            telefone: telefone,
            endereco: endereco,
        }

        api.put('/clientes', data).then((response) => { 
            navegacao.navigate('Cliente', response);
        }).catch((error) => {
            console.log(error)
        })
    }

    function removerCliente() {
        api.delete(`/clientes/${id}`).then((response) => { 
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
                name="nome"
                editable={editavel} />

            <Text>Email</Text>
            <Input
                value={email}
                onChangeText={setEmail}
                name="email"
                editable={editavel} />

            <Text>Telefone</Text>
            <Input
                value={telefone}
                onChangeText={setTelefone}
                name="telefone"
                editable={editavel} />
            <Text>Endereço</Text>
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
        </Container>
    )
}

export default DetalheCliente;