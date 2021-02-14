import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import { Container, ContainerInfo, FlexDiretion } from './styles';


export const Home: React.FC = () => {
    const navegacao = useNavigation();
    return (
        <Container>
            <FlexDiretion>
                <ContainerInfo onPress={() => { navegacao.navigate('Cliente') }}>
                    <Text>Clientes</Text>
                </ContainerInfo>

                <ContainerInfo onPress={() => { navegacao.navigate('Livro') }}>
                    <Text>Livros</Text>
                </ContainerInfo>
            </FlexDiretion>

            <FlexDiretion>
                <ContainerInfo onPress={() => { navegacao.navigate('ListaAgendamento') }}>
                    <Text>Agendamentos</Text>
                </ContainerInfo>

                <ContainerInfo onPress={() => {navegacao.navigate('Aluguel')}}>
                <Text>Aluguel</Text>
                </ContainerInfo>
            </FlexDiretion>

        </Container>
    );
}

export default Home;