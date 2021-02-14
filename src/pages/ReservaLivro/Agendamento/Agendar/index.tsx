import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text } from 'react-native';
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import api from '../../../../services/api';

import { Container } from './styles';


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
        const data: AgendamentosResponse = {
            idCliente: idCliente,
            idLivro: idLivro,
            dataAgendamento: dataAgendamento,
        }
        console.log(data)

        api.post('/agendamentos', data).then((response) => {
             navegacao.navigate('ListaAgendamento', response);
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

            <Text>Data Agendamento</Text>
            <Input
                value={dataAgendamento}
                onChangeText={setDataAgendamento}
                name="dataAgendamento" />

            <Button
                onPress={() => { agendamento() }}
            >Agendar</Button>
        </Container>
    )
}



export default AgendamentoLivroCliente;