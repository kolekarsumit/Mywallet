import { Card, Box,Text,Spinner } from "@chakra-ui/react";
import { useContract, useContractMetadata } from "@thirdweb-dev/react";

type Props={
    tokenAddress: string;
    isSelected?: boolean;
};


const TokenSelection: React.FC<Props> = ({tokenAddress,isSelected})=>{
    const{
        contract
    }=useContract(tokenAddress);

    const{
        data: contractMetadata,
        isLoading: isContractMetadataLoading
    }=useContractMetadata(contract);

    let coinBorderColor="gray.200";
    if(isSelected){
        coinBorderColor="blue.500";
    }
    return(
        <Card p={4} mr={2} border={"2px solid"} borderColor={coinBorderColor}>
            {!isContractMetadataLoading ? (
<Box>
    <Text>
        {contractMetadata?.symbol}
    </Text>
</Box>
            ):(
                <Spinner />
            )}
        </Card>
    )
};

export default TokenSelection;