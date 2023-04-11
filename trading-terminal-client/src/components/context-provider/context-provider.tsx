import React from 'react'
import { IContextProviderProps } from '../../types/props/context-provider-props';
import { createWebsocketClient } from '../../logic/websocket-client';
import { IWebsocketClient } from '../../types/websocket-client';
import { IOrder } from '../../types/order/order';
import { Side } from '../../types/order/side';
import { Instrument } from '../../types/order/instrument';
import { Position } from '../../types/position';

const initialPrices: Record<Side, number> = { Buy: 0, Sell: 0 }
const initialSubscriptionId: string = ""
const initialOrders: IOrder[] = []
const initialPositions: Record<Instrument, Position> = {
    eur_rub: { Buy: 0, Sell: 0 },
    eur_usd: { Buy: 0, Sell: 0 },
    usd_rub: { Buy: 0, Sell: 0 }
}

export const WebsocketClientContext = React.createContext<IWebsocketClient | null>(null);

export const PricesContext = React.createContext<Record<Side, number>>(initialPrices);
export const SubscriptionIdContext = React.createContext<string>(initialSubscriptionId);
export const OrdersContext = React.createContext<IOrder[]>([]);
export const PositionsContext = React.createContext<Record<Instrument, Position>>(initialPositions);

export const ContextProvider = (props: IContextProviderProps) => {
    const [prices, setPrices] = React.useState<Record<Side, number>>(initialPrices)
    const [subscriptionId, setSubscriptionId] = React.useState<string>(initialSubscriptionId)
    const [orders, setOrders] = React.useState<IOrder[]>(initialOrders)
    const [positions, setPositions] = React.useState<Record<Instrument, Position>>(initialPositions)

    const [websocketClient, setWebsocketClient] = React.useState<IWebsocketClient | null>(null)

    React.useEffect(() => {
        const websocketClient = createWebsocketClient(setPrices, setSubscriptionId, setOrders, setPositions)
        setWebsocketClient(websocketClient)

        return websocketClient.closeConnection;
    }, [])

    return (

        <WebsocketClientContext.Provider value={websocketClient}>

        <OrdersContext.Provider value={orders} >
            <PositionsContext.Provider value={positions} >
                    <PricesContext.Provider value={prices} >
                        <SubscriptionIdContext.Provider value={subscriptionId} >
                            {props.children}
                        </SubscriptionIdContext.Provider>
                    </PricesContext.Provider>
            </PositionsContext.Provider>
        </OrdersContext.Provider>
        
        </WebsocketClientContext.Provider>
    );
}
