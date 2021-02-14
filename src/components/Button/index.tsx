import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import {
    ButtonText,
    Container
} from './styles';

interface ButtonProps extends TouchableOpacityProps {
    children: string,
}

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
    return (
        <Container {...rest}>
            <ButtonText>
                {children}
            </ButtonText>
        </Container>)
}

export default Button;