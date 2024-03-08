import { Container, Flex, Text } from "@chakra-ui/react";
import { ConnectWallet,useAddress } from "@thirdweb-dev/react";
import Link from "next/link";

export default function Navbar(){

const address = useAddress();


    return (
        <Container maxW={"1440px"} py={4}>
            <Flex flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>

                <Link href={"/"}>
                    <Text fontWeight={"bold"}> Transfer Token</Text>
                </Link>


                {address && (
                    <Flex flexDirection={"row"}>

                        <Link href={"/transfer"}>
                        <Text mr={8}>Transfer</Text>
                         </Link>

                         <Link href={"/claim"}>
                        <Text mr={8}>Claim</Text>
                        </Link>

                        <Link href={`/profile/${address}`}>
                            <Text mr={8}>My Account</Text>
                        </Link>

                        <Link href={"/UserData"}>
                            <Text mr={8}>Users</Text>
                        </Link>
                    </Flex>
                    
                )}

                <ConnectWallet />

            </Flex>
        </Container>
    )
}