
import {Button, Card, Center, Flex, Heading, Spinner, Stack, Text } from '@chakra-ui/react'
import Records from '../components/user.json'
import { ConnectWallet, useAddress, useContract, useContractMetadata, useContractRead, useTokenBalance } from "@thirdweb-dev/react";
import TokenBlance from '../components/TokenBalance';
import { TRANSFER_CONTRACT_ADDRESS } from '../const/addresses';
import BalanceCard from '../components/BalanceCard';
import Request from './RequestMoney';
import Link from 'next/link';
import { useState } from 'react';


type Props = {
  tokenAddress: string;
};

export default function UserInformation(){
  const address = useAddress();

  const {
      contract
  } = useContract(address);
  
  const {
      data: tokenBalance,
      isLoading: isTokenBalanceLoading,
  } = useTokenBalance(contract, address);
  

    return (
  
        <div>
          {Records &&
            Records.map((record) => {
              const cardStyle = {
                display:'flex',
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '10px',
                margin: 'auto',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#fff',
                cursor: 'pointer', 
                height:'650px',
                width:'800px',
              };

              const [data,setData ]= useState({
                id:"1",
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
                <Card px={8} py={10} style={cardStyle} key={record.id}>
                  <Stack spacing={8}>
                    <Flex flexDirection={"row"} alignItems={"center"}>
                      <Text fontSize={"lg"} mr={4}>{record.address}</Text>
                      <Text fontSize={"lg"} ml={12}>{record.intrest}</Text>
                    </Flex>
                    <Text fontSize={"bold"} >Balance:</Text>
                    {!isVerifiedTokensLoading ? (
                            verifiedTokens.map((token: string) => (
                                <BalanceCard
                                    key={token}
                                    tokenAddress={token}
                                    add={record.address}
                                />
                            ))
                        ) : (
                            <Spinner />
                        )}
                        <Link href={{pathname: "/RequestMoney",query:{
                          add:record.address,
                          bal:" ",
                          inr:" "
                        },}} >
                          Get Loan
                        </Link>
                  </Stack>
       

       
                </Card>
                
              );
            })}
        </div>
        
      );
}