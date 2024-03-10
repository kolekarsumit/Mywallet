import { Container, Flex, Text } from "@chakra-ui/react";
import { ConnectWallet,useAddress } from "@thirdweb-dev/react";
import Link from "next/link";

export default function Navbar(){

const address = useAddress();


    return (
        <Container maxW={"1440px"} py={4} bg={"#333"} color={"white"} boxShadow={"0 0 10px rgba(0, 0, 0, 0.2)"}>
    <Flex flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>

        <Link href={"/"}>
            <Text fontWeight={"bold"} fontSize={20}>My Wallet</Text>
        </Link>

        {address && (
            <Flex flexDirection={"row"}>

                <Link href={"/transfer"}>
                    <Text mr={10} fontSize={16}>Transfer</Text>
                </Link>

                <Link href={"/userdata"}>
                    <Text mr={10} fontSize={16}>Get Loan</Text>
                </Link>


                <Link href={`/profile/${address}`}>
                    <Text mr={10} fontSize={16}>Profile</Text>
                </Link>

                <Link href={"/RequestMoney"}>
                    <Text mr={10} fontSize={16}>Request</Text>
                </Link>

            </Flex>
        )}

        <ConnectWallet/>

    </Flex>
</Container>

    )
}