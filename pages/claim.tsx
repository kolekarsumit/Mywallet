import { Web3Button,MediaRenderer, useContract, useContractMetadata } from "@thirdweb-dev/react";
import { CALIM_TOKEN_CONTRACT_ADDRESS, CLAIM_TOKEN_IMAGE } from "../const/addresses";
import { Container, Flex, Heading, SimpleGrid, Stack, useToast, Text, Box } from "@chakra-ui/react";

export default function ClaimPage(){
    const {
        contract
    }= useContract(CALIM_TOKEN_CONTRACT_ADDRESS);

    const{
        data:contractMetatData
    }= useContractMetadata(contract);

    const claimAmount=10;
    const toast=useToast();

    return (
        <Container maxW={"1440px"} h={"80vh"}>
            <SimpleGrid columns={2} spacing={10}>
                <Flex>
                    <MediaRenderer
                    src={CLAIM_TOKEN_IMAGE}
                    height="100%"
                    width="100%"
                    />
                </Flex>
                <Flex flexDirection={"column"} justifyContent={"center"}>
                    <Stack spacing={4}>
                        <Heading>Claim ${contractMetatData?.symbol}</Heading>
                        <Text fontSize={"xl"}>Claim your FREE ${contractMetatData?.symbol}. Just pay for the gas fee to claim your ${contractMetatData?.symbol}. Use this token to test and try the transfer feature feature of this aApp</Text>
                        <Text fontWeight={"bold"}>Claim {claimAmount} ${contractMetatData?.symbol} Tokens</Text>
                        <Box>
                            <Web3Button
                                contractAddress={CALIM_TOKEN_CONTRACT_ADDRESS}
                                action={(contract) => contract.erc20.claim(claimAmount)}
                                onSuccess={() => toast({
                                    title: 'Claim Successful',
                                    description: "You have successfully claimed tokens!",
                                    status: 'success',
                                    duration: 9000,
                                    isClosable: true,
                                })}
                            >Claim Token</Web3Button>
                        </Box>
                    </Stack>

                </Flex>
            </SimpleGrid>
        </Container>
    )
}