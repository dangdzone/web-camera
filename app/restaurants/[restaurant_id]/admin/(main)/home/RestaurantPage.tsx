
import { VStack } from "@chakra-ui/layout";
import { RestaurantInfo } from "./RestaurantInfo";
import { RestaurantReport } from "./RestaurantReport";

export const RestaurantPage = () => {

    return (
        <VStack w='full' spacing='5'>
            {/* <RestaurantReport /> */}
            <RestaurantInfo />
        </VStack>
    )
}