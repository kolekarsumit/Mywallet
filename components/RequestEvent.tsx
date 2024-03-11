import { useAddress, useContract, useContractEvents } from "@thirdweb-dev/react";
import { TRANSFER_CONTRACT_ADDRESS } from "../const/addresses";
import { Box, Heading, Spinner, Card, Flex, Text, Button } from "@chakra-ui/react";
import { ethers } from "ethers";
import Link from "next/link";

export default function requestEvents() {


    const address = useAddress()?.toString();

    const {
        contract
    } = useContract(TRANSFER_CONTRACT_ADDRESS);

    const {
        data: events,
        isLoading: isEventLoading
    } = useContractEvents(
        contract,
        "TransactionCompleted",
        {
            queryFilter: {
                // fromBlock: -7000,
            }
        }
    );

    function approve(){
        <Link href={'/approve'}></Link>
    }
    function reject(){
       alert("Rejected");
    }

    return (
        <Box mt={20} w={"90%"}>
            <Heading mt={10} textAlign={"center"}>Request for loan</Heading>
            {!isEventLoading ? (
                events?.filter((event: any) => event.data.receiver === address && ethers.utils.formatEther(event.data.amount) === "0.0")
                    .map((event: any, index) => (
                        <Card border={"0.5px solid grey"} alignItems={"center"} key={index} p={8} my={4}>
                            <Flex flexDirection={"row"} alignItems={"center"}>
                                <Text mr={2} p={2} border={"1px solid grey"} borderRadius={6} fontSize={"xs"}>
                                    {(event.data.sender)}
                                </Text>
                                <Text mx={2} fontSize={"sm"}>
                                    To
                                </Text>
                                <Text ml={2} p={2} border={"1px solid grey"} borderRadius={6} fontSize={"xs"}>
                                    {(event.data.receiver)}
                                </Text>
                            </Flex>
                            <Text mt={2} fontSize={"xl"}>Amount to request:  {event.data.message}</Text>

                            <Flex>
                            <Link href={{
                                    pathname: "/approve", query: {
                                        add: event.data.receiver,
                                        bal: event.data.message,

                                    },
                                }} >
                                 <Button m={4} onClick={approve}>Approve</Button>
                                  
                                </Link>
                               
                                <Button m={4} onClick={reject}>Reject</Button>
                            </Flex>
                           
                        </Card>
                    )).reverse()
            ) : (
                <Spinner />
            )}
           
        </Box>
    )
}