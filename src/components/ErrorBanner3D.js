import { useSelector } from 'react-redux';
import React from 'react';
import { Text, Container } from '@react-three/uikit';

export function ErrorBanner3D() {
  const error = useSelector((state) => state.error);

  if (!error) return null;

  return (
    <Container
      backgroundColor="red"
      borderRadius={0.1}
      padding={.1}
      justifyContent="center"
      alignItems="center"
    >
      <Text fontSize={30} color="white">
        {error}
      </Text>
    </Container>
  );
}