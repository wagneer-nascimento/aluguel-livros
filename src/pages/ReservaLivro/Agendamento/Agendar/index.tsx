import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import { ResponseError } from '../../../../interfaces/ResponseError';
import api from '../../../../services/api';
import {
    Container,
    Label
} from './styles';

interface AgendamentosResponse {
    idCliente: string;
    idLivro: string;
    dataAgendamento: string;
}

const AgendamentoLivroCliente: React.FC = () => {
    const navegacao = useNavigation();
    const [idCliente, setIdCliente] = useState<string>('');
    const [idLivro, setIdLivro] = useState<string>('');
    const [dataAgendamento, setDataAgendamento] = useState<string>('');

    function agendamento() {
        if (!idCliente || !idLivro || !dataAgendamento) {
            return Alert.alert('Todos os dados são obrigatórios');
        }
        const data: AgendamentosResponse = {
            idCliente: idCliente,
            idLivro: idLivro,
            dataAgendamento: dataAgendamento,
        }

        api.post('/agendamentos', data).then((response) => {
            navegacao.navigate('ListaAgendamento', response);
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

                <Label>Data Agendamento</Label>
                <Input
                    value={dataAgendamento}
                    onChangeText={setDataAgendamento}
                    name="dataAgendamento" />

                <Button
                    onPress={() => { agendamento() }}
                >Agendar</Button>
            </ScrollView>
        </Container>
    )
}



export default AgendamentoLivroCliente;