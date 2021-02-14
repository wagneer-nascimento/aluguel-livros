import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Container, ContainerInfo, FlexDiretion, Label } from './styles';


export const Home: React.FC = () => {
    const navegacao = useNavigation();
    return (
        <Container>
            <ScrollView showsVerticalScrollIndicator={false}>
                <FlexDiretion>
                    <ContainerInfo onPress={() => { navegacao.navigate('Cliente') }}>
                        <Label>Clientes</Label>
                    </ContainerInfo>

                    <ContainerInfo onPress={() => { navegacao.navigate('Livro') }}>
                        <Label>Livros</Label>
                    </ContainerInfo>
                </FlexDiretion>

                <FlexDiretion>
                    <ContainerInfo onPress={() => { navegacao.navigate('ListaAgendamento') }}>
                        <Label>Agendamentos</Label>
                    </ContainerInfo>

                    <ContainerInfo onPress={() => { navegacao.navigate('Aluguel') }}>
                        <Label>Aluguel</Label>
                    </ContainerInfo>
                </FlexDiretion>
            </ScrollView>
        </Container>
    );
}

export default Home;