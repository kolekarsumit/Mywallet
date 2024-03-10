import { useContract, useContractEvents } from "@thirdweb-dev/react";
import { TRANSFER_CONTRACT_ADDRESS } from "../const/addresses";
import { Box, Heading, Spinner, Card, Flex, Text } from "@chakra-ui/react";
import { ethers } from "ethers";
import { truncateAddress } from "../const/truncateAddress";
export default function Events(){

  
    const {
        contract
    } = useContract(TRANSFER_CONTRACT_ADDRESS);


    const {
        data: events,
        isLoading: isEventLoading
    }=useContractEvents(
        contract,
        "TransactionCompleted",
        {
            queryFilter: {
                fromBlock: -7000,
            }
        }
    );

    return(

        <Box mt={20} w={"100%"}>
            <Heading mt={10} textAlign={"center"}>Recent Transfers: </Heading>
            {!isEventLoading ?(
                events?.map((events: any,index)=>(
            <Card border={"0.5px solid grey"} alignItems={"center"} key={index} p={8} my={4}>
            <Flex flexDirection={"row"} alignItems={"center"}>
                            <Text mr={2} p={2} border={"1px solid grey"} borderRadius={6} fontSize={"xs"}>{truncateAddress(events.data.sender)}</Text>
                            <Text mx={2} fontSize={"sm"}>To</Text>
                            <Text ml={2} p={2} border={"1px solid grey"} borderRadius={6} fontSize={"xs"}>{truncateAddress(events.data.receiver)}</Text>
                        </Flex>
                        <Text mt={2} fontSize={"xl"}> {events.data.message}</Text>
                        <Text mt={2}>Amount: {ethers.utils.formatEther(events.data.amount)}</Text>
            </Card>
                )).reverse()):(

                <Spinner />
            )}
        </Box>
    )
}