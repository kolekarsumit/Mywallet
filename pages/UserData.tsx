import { Box, Button, Card, Center, Container, Flex, Heading, SimpleGrid, Spinner, Stack, Text } from '@chakra-ui/react'
import Records from '../components/user.json'
import { ConnectWallet, useAddress, useContract, useContractMetadata, useContractRead, useTokenBalance } from "@thirdweb-dev/react";
import TokenBlance from '../components/TokenBalance';
import { TRANSFER_CONTRACT_ADDRESS } from '../const/addresses';
import BalanceCard from '../components/BalanceCard';
import Link from 'next/link';
import { useState } from 'react';
import TokenSelection from '../components/TokenSelection';


type Props = {
    tokenAddress: string;
};

export default function UserInformation() {
    const address = useAddress();

    const {
        contract
    } = useContract(address);

    const {
        data: tokenBalance,
        isLoading: isTokenBalanceLoading,
    } = useTokenBalance(contract, address);

    const {
        data: verifiedTokens,
        isLoading: isVerifiedTokensLoading
    } = useContractRead(contract,
        "getVerifiedTokens");

    const [selectedToken, setSelectedToken] = useState("");
    const handleTokenSelection = (tokenAddress: string) => {
        setSelectedToken(tokenAddress);
    }

    return (

        <div>
            {Records &&
                Records.map((record) => {
                    const cardStyle = {
                        display: 'flex',
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        padding: '10px',
                        margin: 'auto',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        backgroundColor: '#fff',
                        cursor: 'pointer',
                        height: '500px',
                        width: '550px',
                    };

                    const [data, setData] = useState({
                        id: "1",
                    });

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
                        <Card p={3} px={8} py={10} style={cardStyle} key={record.id}>
                            <Stack spacing={8}>
                                <Flex flexDirection={"row"} alignItems={"center"}>
                                    <Text fontSize={"lg"} mr={4}>{record.address}</Text>
                                    <Text fontSize={"lg"} ml={12}>{record.balance}</Text>
                                </Flex>
                                <Flex
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        marginTop: "5px",
                                        maxWidth: "25%",
                                        padding: "10px"

                                    }}
                                >
                                    {!isVerifiedTokensLoading &&
                                        verifiedTokens.map((tokenAddress: string) => (
                                            <Box key={tokenAddress} onClick={() => handleTokenSelection(tokenAddress)}>
                                                <TokenSelection
                                                    tokenAddress={tokenAddress}
                                                    isSelected={selectedToken === tokenAddress}
                                                />
                                            </Box>
                                        ))}
                                </Flex>
                                <TokenBlance tokenAddress={selectedToken} />
                                <Link href={{
                                    pathname: "/RequestMoney", query: {
                                        add: record.address,
                                        bal: record.balance.toString(),

                                    },
                                }} >

                                    <button style={{ display: 'block', margin: 'auto', padding: '10px 20px', fontSize: '16px', fontWeight: 'bold', backgroundColor: '#3498db', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                                        Get Loan</button>
                                </Link>
                            </Stack>



                        </Card>

                    );
                })}
        </div>

    );
}