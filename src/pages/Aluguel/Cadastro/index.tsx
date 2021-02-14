import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import api from '../../../services/api';
import { ResponseError } from '../../../interfaces/ResponseError';
import { ScrollView } from 'react-native-gesture-handler';
import { AluguelCadastro } from '../../../interfaces/AluguelResponse';
import {
    Container,
    Label
} from './styles';

const CadastroAluguel: React.FC = () => {
    const navegacao = useNavigation();
    const [idCliente, setIdCliente] = useState<string>('');
    const [idLivro, setIdLivro] = useState<string>('');
    const [valor, setValor] = useState<string>('');
    const [dataAluguel, setDataAluguel] = useState<string>('');
    const [dataDevolucao, setDataDevolucao] = useState<string>('');

    function cadastroAluguel() {
        const data: AluguelCadastro = {
            idCliente: idCliente,
            idLivro: idLivro,
            valor: valor,
            dataAluguel: dataAluguel,
            dataDevolucao: dataDevolucao,
        }

        api.post('/aluguel', data).then((response) => {
            navegacao.navigate('Aluguel', response);
        }).catch((error: ResponseError) => {
            Alert.alert(error.response.data.message);
        });
    }

    return (
        <Container>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Label>Id Cliente</Label>
                <Input
                    value={idCliente}
                    onChangeText={setIdCliente}
                    name="idCliente" />

                <Label>Id Livro</Label>
                <Input
                    value={idLivro}
                    onChangeText={setIdLivro}
                    name="idLivro" />

                <Label>Valor</Label>
                <Input
                    value={valor}
                    onChangeText={setValor}
                    name="valor" />

                <Label>Data Aluguel</Label>
                <Input
                    value={dataAluguel}
                    onChangeText={setDataAluguel}
                    name="dataAaluguel" />

                <Label>Data Devolução</Label>
                <Input
                    value={dataDevolucao}
                    onChangeText={setDataDevolucao}
                    name="dataDevolucao" />

                <Button
                    onPress={() => { cadastroAluguel() }}
                >Agendar</Button>
            </ScrollView>
        </Container>
    )
}

export default CadastroAluguel;