
import {Card, Flex, Heading, Spinner, Stack, Text } from '@chakra-ui/react'
import Records from '../components/user.json'
import { ConnectWallet, useAddress, useContract, useContractMetadata, useContractRead, useTokenBalance } from "@thirdweb-dev/react";
import TokenBlance from '../components/TokenBalance';
import { TRANSFER_CONTRACT_ADDRESS } from '../const/addresses';
import BalanceCard from '../components/BalanceCard';


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
                height:'180px',
                width:'800px',
              };
      
              const handleClick = () => {
                window.location.href = `/address/${record.address}`;
              };

             
      
              return (
                <Card px={8} py={10} style={cardStyle} key={record.id} onClick={handleClick}>
                  <Stack spacing={8}>
                    <Flex flexDirection={"row"} alignItems={"center"}>
                      <Text fontSize={"lg"} mr={4}>{record.address}</Text>
                      <Text fontSize={"lg"} ml={12}>{record.intrest}</Text>
                    </Flex>
                    <Text fontSize={"bold"} >Balance:</Text>
                    {!isTokenBalanceLoading ? (
                        <Text fontSize={"3xl"} fontWeight={"bold"}>{tokenBalance?.displayValue}</Text>
                    ) : (
                        <Spinner />
                    )}
                  </Stack>
                </Card>
              );
            })}
        </div>
        
      );
}