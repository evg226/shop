import {ADMIN_ROUTE, CART_DESK, DESK_ROUTE, ORDER_DESK, PRODUCT_ROUTE, USER_ROUTE} from "../constants";
import {Cart} from "./cart";
import {Orders} from "../components/orders";
import {User} from "./user";
import {Desk} from "./desk";
import {Catalog} from "./catalog";
import {Product} from "./product";
import {Admin} from "./admin";


export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component:<Admin />
    },
    {
        path: CART_DESK,
        Component:<Cart />
    },
    {
        path: ORDER_DESK,
        Component:<Orders />
    },
    {
        path: USER_ROUTE,
        Component: <User />
    },
    {
        path: USER_ROUTE+"/:action",
        Component: <User  />
    },
];

export const publicRoutes = [
    {
        path: DESK_ROUTE,
        Component: <Desk />
    },
    {
        path: PRODUCT_ROUTE,
        Component:<Catalog />
    },
    {
        path: PRODUCT_ROUTE+"/:id",
        Component:<Product />
    }
];