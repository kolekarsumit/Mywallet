import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react"
import { TRANSFER_CONTRACT_ADDRESS } from "../const/addresses";
import { Box, Card, Flex, Heading, Text, Input } from "@chakra-ui/react";
import { useState } from "react";
import TokenSelection from "./TokenSelection";
import TokenBlance from "./TokenBalance";
import TransferButton from "./TransferButton";

export default function TransferCard(){

    const address =useAddress();

    const {
        contract
    }= useContract(TRANSFER_CONTRACT_ADDRESS);

    const {
        data: verifiedTokens,
        isLoading: isVerifiedTokensLoading
    }=useContractRead(contract,
        "getVerifiedTokens");

        const [selectedToken,setSelectedToken]=useState("");
        const handleTokenSelection=(tokenAddress: string)=>{
            setSelectedToken(tokenAddress);
        }

        const [formData,setFormData ]=useState({

            reciver:'',
            amount: '',
            message: ''

        });

        const handleChange=(e: any , name: any)=>{
            setFormData((prevState) => ({
                ...prevState,
                [name]: e.target.value
            }))
        };

    return(
<Card w={"50%"} p={20}>
<Heading textAlign={"center"} mb={10}>Transfer Money</Heading>

<Text fontWeight={"bold"} mt={4} mb={5}>Select Currency:</Text>

<Flex
  style={{
    display: "flex",
    flexDirection: "row",
    marginTop: "5px", 
    maxWidth:"25%",
    padding:"10px"

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

<Text mt={4} mb={2} fontWeight={"bold"}>Send To:</Text>
            <Input
                placeholder="0x0000000"
                type="text"
                value={formData.reciver}
                onChange={(event) => handleChange(event, "reciver")}
            />

<Text mt={4} mb={2} fontWeight={"bold"}>Amount:</Text>
            <Input
                placeholder="0.0"
                type="number"
                value={formData.amount}
                onChange={(event) => handleChange(event, "amount")}
            />
            <Text mt={4} mb={2} fontWeight={"bold"}>Note:</Text>
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
                        amount={formData.amount.toString()}
                        message={formData.message}
                    />
                ) : (
                    <Text>Please connect your wallet to make a transfer.</Text>
                )}
            </Box>

</Card>
    )
}
