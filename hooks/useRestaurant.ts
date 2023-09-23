"use client";

import { createStaticContext } from "@livequery/react";
import { Restaurant } from "../types"

export const [
    getRestaurantContext,
    RestaurantContextProvider
] = createStaticContext<Restaurant>()