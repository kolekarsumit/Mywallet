import { Box, Button, Container, Flex, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { MediaRenderer } from "@thirdweb-dev/react";
import { NextPage } from "next";
import Link from "next/link";
import { FEATURES_IMAGE_URL, HERO_IMAGE_URL } from "../const/addresses";
import FeatureCard from "../components/Featurecard";
import Events from "../components/Events";


const Home: NextPage = () => {
  return (
    <Container maxW={"1440px"} py={4}>
      <Flex flexDirection={"row"} h={"75vh"}>
        <Flex flexDirection={"column"} justifyContent={"center"} w={"60%"}>
          <Stack spacing={4}>
            <Heading fontSize={"xl"}>
              Transfer Token
            </Heading>
            <Heading fontSize={"6xl"}>
              send tokn to friends and family with ease
            </Heading>
            <Text fontSize={"xl"}>
              Select from a selection of token to transfer to your frient and family
            </Text>
            <Link href={"/transfer"}>
              <Button> Make a Transfer</Button>
            </Link>
          </Stack>

        </Flex>
        <Box>

          <MediaRenderer
            src={HERO_IMAGE_URL}
            height="100%"
            width="100%" />
        </Box>

      </Flex>

      <SimpleGrid column={2} spacing={4} mt={4}>

        <Box>
          <MediaRenderer
            src={FEATURES_IMAGE_URL}
            height="100%"
            width="50%" />
        </Box>

        <Flex flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
          <Stack spacing={4}>
          <FeatureCard
              step={"01"}
              title={"Select a Token"}
              description={"Select from a list of verified tokens from the drop down to send to your friends and family."}
            /> 
            <FeatureCard
              step={"02"}
              title={"Who to Send To"}
              description={"Enter the wallet address of the person you want to send the token to. This is non-reversible so make sure you have the right address."}
            />
              <FeatureCard
            step={"03"}
            title={"Write a Message"}
            description={"Write a message to go along with your token transfer. This is optional but it's always nice to send a message to your friends and family."}
          />
          </Stack>


        </Flex>
      </SimpleGrid>
      <Events />
    </Container>
  );
};

export default Home;
