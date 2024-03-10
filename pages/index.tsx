import { Box, Button, Container, Flex, Heading, Link, Stack, Text } from '@chakra-ui/react';
import { MediaRenderer } from '@thirdweb-dev/react';
import { NextPage } from 'next';
import React from 'react';


const Home: NextPage = () => {
  return (
    <Container maxW={'1440px'} py={4}>
      <Flex flexDirection={'row'} h={'65vh'}>
        <Flex flexDirection={'column'} justifyContent={'center'} w={'60%'} p={4}>
          <Stack spacing={4}>
            <Heading fontSize={'3xl'} fontWeight={'bold'}>
              Transfer Money
            </Heading>
            <Heading fontSize={'6xl'} fontWeight={'bold'}>
              Get a Loan as Fast as Possible
            </Heading>
            <Text fontSize={'xl'} color={'gray.600'}>
              Select from a range of tokens to access instant loans with minimal interest.
            </Text>
            <Link href={'https://forms.gle/6ygq2We7k3oYbFmY7'}>
              <Button colorScheme={'blue'} size={'lg'}>
                Register Now
              </Button>
            </Link>
          </Stack>
        </Flex>

        <Box marginTop={40} ml={8}>
          <MediaRenderer
            style={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
            src={'https://fontsarena.com/wp-content/uploads/2023/11/Sans-titre-1.jpg'}
            width="100%"
            alt="Loan Image"
          />
        </Box>
      </Flex>
    </Container>
  );
};

export default Home;

