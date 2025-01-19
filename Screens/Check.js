import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
    justify-content: center;
    align-items: center;
`;

const StyledText = styled.Text`
    font-size: 30px;
    margin-bottom: 10px;
`;

const Home = () => {
    return (
        <Container>
            <StyledText>출석 체크 현황</StyledText>
        </Container>

    )
}

export default Home;