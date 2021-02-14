import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Cliente from '../pages/Cliente';
import ClienteCadastro from '../pages/Cliente/Cadastro';
import ClienteDetalhe from '../pages/Cliente/Detalhe';
import Livro from '../pages/Livro';
import CadastroLivro from '../pages/Livro/Cadastro';
import DetalheLivro from '../pages/Livro/Detalhe';
import ListaAgendamento from '../pages/ReservaLivro/Agendamento';
import AgendamentoLivroCliente from '../pages/ReservaLivro/Agendamento/Agendar';
import DetalheAgendamento from '../pages/ReservaLivro/Agendamento/Detalhe';
import Home from '../pages/Home/';
import Aluguel from '../pages/Aluguel/';
import CadastroAluguel from '../pages/Aluguel/Cadastro';

const navegacao = createStackNavigator();

const Routas: React.FC = () => {
    return (
        <navegacao.Navigator>

            <navegacao.Screen
                options={{ headerTitle: 'Aluguel de livros' }}
                name="Home" component={Home} />

            <navegacao.Screen
                options={{ headerTitle: 'Cadastro de aluguel' }}
                name="CadastroAluguel" component={CadastroAluguel} />

            <navegacao.Screen
                options={{ headerTitle: 'Livros alugados' }}
                name="Aluguel" component={Aluguel} />

            <navegacao.Screen
                options={{ headerTitle: 'Agendamentos' }}
                name="ListaAgendamento" component={ListaAgendamento} />

            <navegacao.Screen
                options={{ headerTitle: 'Agendar cliente livro' }}
                name="AgendamentoLivroCliente" component={AgendamentoLivroCliente} />

            <navegacao.Screen
                options={{ headerTitle: 'Detalhe agendamento' }}
                name="DetalheAgendamento" component={DetalheAgendamento} />

            <navegacao.Screen
                options={{ headerTitle: 'Clientes' }}
                name="Cliente" component={Cliente} />

            <navegacao.Screen
                options={{ headerTitle: 'Cliente cadastro' }}
                name="ClienteCadastro" component={ClienteCadastro} />

            <navegacao.Screen
                options={{ headerTitle: 'Cliente detalhe' }}
                name="ClienteDetalhe" component={ClienteDetalhe} />

            <navegacao.Screen
                options={{ headerTitle: 'Livros' }}
                name="Livro" component={Livro} />

            <navegacao.Screen
                options={{ headerTitle: 'Cadastro livro' }}
                name="CadastroLivro" component={CadastroLivro} />

            <navegacao.Screen
                options={{ headerTitle: 'Detalhe livro' }}
                name="DetalheLivro" component={DetalheLivro} />

        </navegacao.Navigator>
    );
}
export default Routas;