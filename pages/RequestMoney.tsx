import { Card, Container, Heading, Box, Flex, Input, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react"
import { TRANSFER_CONTRACT_ADDRESS } from "../const/addresses";
import TransferButton from "../components/TransferButton";
import TokenSelection from "../components/TokenSelection";
import TokenBlance from "../components/TokenBalance";

export default function RequestMoney() {
    const router = useRouter();
    const { add, bal } = router.query;
    const [amount, setAmount] = useState('');
    const [days, setDays] = useState('');


    const address = useAddress();

    const {
        contract
    } = useContract(TRANSFER_CONTRACT_ADDRESS);

    const {
        data: verifiedTokens,
        isLoading: isVerifiedTokensLoading
    } = useContractRead(contract,
        "getVerifiedTokens");

    const [selectedToken, setSelectedToken] = useState("");
    const handleTokenSelection = (tokenAddress: string) => {
        setSelectedToken(tokenAddress);
    }

    const [formData, setFormData] = useState({

        reciver: '',
        amount: 0,
        message: ''

    });

    const handleChange = (e: any, name: any) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: e.target.value
        }))
    };

    return (
        <Flex
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh', // This ensures the card is centered vertically
            }}
        >

            <Card w={"50%"} p={20}>
                <Heading textAlign={"center"} mb={10}>Request Money</Heading>

                <Text fontWeight={"bold"} mt={4} mb={5}>Select Currency:</Text>

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

                <Text mt={4} mb={2}> Requesting to {add}</Text>

                <Text mt={4} mb={2} fontWeight={"bold"}>Request To:</Text>
                <Input
                    placeholder="0x0000000"
                    type="text"
                    value={formData.reciver}
                    onChange={(event) => handleChange(event, "reciver")}
                />
                {/* 
                <Text style={{ visibility: "hidden" }} mt={4} mb={2} fontWeight={"bold"}>Amount:</Text>
                <Input
                    style={{ visibility: "hidden" }}
                    placeholder="0.0"
                    type="number"
                    value={formData.amount}
                    onChange={(event) => handleChange(event, "amount")}
                /> */}

                <Text mt={4} mb={2} fontWeight={"bold"}> Money:</Text>
                <Input
                    placeholder="Add a note here."
                    type="text"
                    value={formData.message}
                    onChange={(event) => handleChange(event, "message")}
                />

                <Box mt={8}>
                    {address ? (
                        <TransferButton
                            tokenAddress={selectedToken}
                            receiver={formData.reciver}
                            amount="0"
                            message={formData.message}
                        />
                    ) : (
                        <Text>Please connect your wallet to make a Request.</Text>
                    )}
                </Box>
            </Card>
        </Flex>

    )
}