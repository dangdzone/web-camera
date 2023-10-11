
import { VStack } from "@chakra-ui/layout";
import { RestaurantInfo } from "./RestaurantInfo";
import { Restaurant } from "@/types";
import { SmartQueryItem } from "@livequery/client";

export type RestaurantPage = {
    restaurant?: SmartQueryItem<Restaurant>
}

export const RestaurantPage = ({ restaurant }: RestaurantPage) => {

    return (
        <VStack w='full' spacing='5'>
            {/* <RestaurantReport /> */}
            <RestaurantInfo restaurant={restaurant as any} />
        </VStack>
    )
}