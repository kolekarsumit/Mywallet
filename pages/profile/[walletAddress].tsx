import { Avatar, Container, Flex, Heading, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { TRANSFER_CONTRACT_ADDRESS } from "../../const/addresses";
import BalanceCard from "../../components/BalanceCard";
import { truncateAddress } from "../../const/truncateAddress";

export default function AccountPage() {
    const address = useAddress()?.toString();

    const {
        contract: transferContract,
    } = useContract(TRANSFER_CONTRACT_ADDRESS);

    const {
        data: verifiedTokens,
        isLoading: isVerifiedTokensLoading,
    } = useContractRead(
        transferContract,
        "getVerifiedTokens"
    );

    return (
        <Container maxW={"1440px"} py={4}>
            {address ? (
                <Flex>
                    <Flex flexDirection={"column"} mr={8} p={10}>
                        <Avatar size={"2xl"} mb={4} />
                        <Text
                            fontSize={"sm"}
                            border={"1px solid black"}
                            textAlign={"center"}
                            borderRadius={4}
                        >{truncateAddress(address)}</Text>
                    </Flex>
                    <Flex flexDirection={"column"} w={"100%"}>
                        <Heading>Accout Balances</Heading>
                        <SimpleGrid columns={3} spacing={4} mt={4}>
                            {!isVerifiedTokensLoading ? (
                                verifiedTokens.map((token: string) => (
                                    <BalanceCard
                                        key={token}
                                        tokenAddress={token}
                                        add={address}
                                    />
                                ))
                            ) : (
                                <Spinner />
                            )}
                        </SimpleGrid>
                    </Flex>
                </Flex>
            ) : (
                <Flex>
                    <Text>Connect Wallet</Text>
                </Flex>
            )}

        </Container>
        
    )
}