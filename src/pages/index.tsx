import { Canvas } from '@react-three/fiber';
import type { NextPage } from 'next';
import { Suspense, useState } from 'react';
import { Dice } from '../components/Dice';
import {
  Button,
  Flex, 
  Heading,
  Text
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react'

const Home: NextPage = () => {

  const [currentSide, setCurrentSide] = useState(5);
  const toast = useToast();

  function playDice() {
    const number = lcg();
    toast({
      title: 'Dado sorteado',
      description: `você tirou o número ${number !== 0 ? number : 2}`,
      status: 'success',
      duration: 1000,
      position: "top-right",
      isClosable: true,
    })
    setCurrentSide(number);
  }

  function lcg() {
    const m = 7;
    const a = 3;
    const c = 3;
    return ((currentSide * a) + c) % m;
  }

  return (
    <Flex 
    background="white"
    height="100vh"
    overflow="hidden"
    flexDirection="column"
    alignItems="center"
    >
      <Heading 
      as="h1" 
      color="black"
      mb={5}
      mt={5}
      textAlign="center"
      fontSize="5xl"
      >
        Dice Roll
      </Heading>
      <Text
      as="p"
      color="black"
      textAlign="center"
      maxW="500px"
      mr={5}
      ml={5}
      >
        Uma simples aplicação para lançamento de dados
        que utiliza o método das congruências lineares para
        gerar um número pseudo aleatório entre 1 e 6 que será
        a próxima face do dado.
      </Text>
      <Canvas
      camera={{ position: [0.75, 0.75, 2] }}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[12, 20, 50]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Suspense fallback={null}>
          <Dice
          diceFace={currentSide}
          />
        </Suspense>
      </Canvas>
      <Button
      colorScheme="blue"
      size="lg"
      mb={10}
      onClick={playDice}
      p={5}
      >
        Jogar
      </Button>
    </Flex>
  )
}

export default Home;