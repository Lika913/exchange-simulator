import { IOrder } from "../types/order";

export const orders: IOrder[] = [
    {
        id: 7,
        creation_time: new Date("04-05-2023"),
        change_time:  new Date("04-05-2023"),
        status: "Cancelled",
        side: 'Buy',
        price: 5.43,
        amount: 1000,
        instrument: 'eur_rub'
    },
    {
        id: 6,
        creation_time: new Date("04-06-2023"),
        change_time: new Date("04-06-2023"),
        status: 'Active',
        side: 'Sell',
        price: 5.43,
        amount: 1000,
        instrument: 'eur_rub'
    },
    {
        id: 5,
        creation_time: new Date("04-01-2023"),
        change_time: new Date("04-01-2023"),
        status: 'Active',
        side: 'Buy',
        price: 5.43,
        amount: 1000,
        instrument: 'eur_rub'
    },
    {
        id: 4,
        creation_time: new Date("04-02-2023"),
        change_time: new Date("04-02-2023"),
        status: "Active",
        side: 'Buy',
        price: 5.43,
        amount: 1000,
        instrument: 'eur_rub'
    },
    {
        id: 3,
        creation_time: new Date("03-30-2023"),
        change_time: new Date("03-30-2023"),
        status: "Filled",
        side: 'Buy',
        price: 5.43,
        amount: 1000,
        instrument: 'eur_rub'
    },
    {
        id: 2,
        creation_time: new Date("04-05-2023"),
        change_time: new Date("04-05-2023"),
        status: 'Active',
        side: 'Sell',
        price: 5.43,
        amount: 1000,
        instrument: 'eur_rub'
    },
    {
        id: 1,
        creation_time: new Date("04-01-2023"),
        change_time: new Date("04-01-2023"),
        status: 'Active',
        side: 'Buy',
        price: 5.43,
        amount: 1000,
        instrument: 'eur_rub'
    },
]