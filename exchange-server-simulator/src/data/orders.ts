import { IOrder } from "../types/order";

export const orders: IOrder[] = [
    {
        id: 7,
        creationTime: new Date("04-05-2023"),
        changeTime:  new Date("04-05-2023"),
        status: "Cancelled",
        side: 'Buy',
        price: 657800,
        amount: 1000,
        instrument: 'eur_rub'
    },
    {
        id: 6,
        creationTime: new Date("04-06-2023"),
        changeTime: new Date("04-06-2023"),
        status: 'Active',
        side: 'Sell',
        price: 5.43,
        amount: 1000,
        instrument: 'eur_rub'
    },
    {
        id: 5,
        creationTime: new Date("04-01-2023"),
        changeTime: new Date("04-01-2023"),
        status: 'Active',
        side: 'Buy',
        price: 112433975.56,
        amount: 5556,
        instrument: 'eur_usd'
    },
    {
        id: 4,
        creationTime: new Date("04-02-2023"),
        changeTime: new Date("04-02-2023"),
        status: "Active",
        side: 'Buy',
        price: 4319.765,
        amount: 34,
        instrument: 'eur_usd'
    },
    {
        id: 3,
        creationTime: new Date("03-30-2023"),
        changeTime: new Date("03-30-2023"),
        status: "Filled",
        side: 'Buy',
        price: 34345.09,
        amount: 103,
        instrument: 'usd_rub'
    },
    {
        id: 2,
        creationTime: new Date("04-05-2023"),
        changeTime: new Date("06-05-2023"),
        status: 'Rejected',
        side: 'Sell',
        price: 65461.89,
        amount: 1000,
        instrument: 'eur_usd'
    },
    {
        id: 1,
        creationTime: new Date("04-01-2023"),
        changeTime: new Date("04-01-2023"),
        status: 'Active',
        side: 'Sell',
        price: 5.43,
        amount: 1,
        instrument: 'eur_usd'
    },
]