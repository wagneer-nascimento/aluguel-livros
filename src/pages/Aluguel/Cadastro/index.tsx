import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text } from 'react-native';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import api from '../../../services/api';

import { Container } from './styles';


interface AluguelResponse {
    idCliente: string;
    idLivro: string;
    valor: string;
    dataAluguel: string;
    dataDevolucao: string;
}


const CadastroAluguel: React.FC = () => {
    const navegacao = useNavigation();
    const [idCliente, setIdCliente] = useState<string>('');
    const [idLivro, setIdLivro] = useState<string>('');
    const [valor, setValor] = useState<string>('');
    const [dataAluguel, setDataAluguel] = useState<string>('');
    const [dataDevolucao, setDataDevolucao] = useState<string>('');

    function cadastroAluguel() {
        const data: AluguelResponse = {
            idCliente: idCliente,
            idLivro: idLivro,
            valor: valor,
            dataAluguel: dataAluguel,
            dataDevolucao: dataDevolucao,
        }
        console.log(data)

        api.post('/aluguel', data).then((response) => {
            navegacao.navigate('Aluguel', response);
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <Container>
            <Text>Id Cliente</Text>
            <Input
                value={idCliente}
                onChangeText={setIdCliente}
                name="idCliente" />

            <Text>Id Livro</Text>
            <Input
                value={idLivro}
                onChangeText={setIdLivro}
                name="idLivro" />

            <Text>Valor</Text>
            <Input
                value={valor}
                onChangeText={setValor}
                name="valor" />

            <Text>Data Aluguel</Text>
            <Input
                value={dataAluguel}
                onChangeText={setDataAluguel}
                name="dataAaluguel" />

            <Text>Data Devolução</Text>
            <Input
                value={dataDevolucao}
                onChangeText={setDataDevolucao}
                name="dataDevolucao" />

            <Button
                onPress={() => { cadastroAluguel() }}
            >Agendar</Button>
        </Container>
    )
}



export default CadastroAluguel;