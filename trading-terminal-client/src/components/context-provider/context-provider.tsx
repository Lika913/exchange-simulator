import React from 'react'
import { IContextProviderProps } from '../../types/props/context-provider-props';
import { createWebsocketClient } from '../../logic/websocket-client';
import { IWebsocketClient } from '../../types/websocket-client';
import { IOrder } from '../../types/order/order';
import { IGlobalState } from '../../types/global-state';
import { Side } from '../../types/order/side';
import { Instrument } from '../../types/order/instrument';
import { Position } from '../../types/position';

export const GlobalStateContext = React.createContext<IGlobalState | null>(null);
export const SendMassegeDispatch = React.createContext<IWebsocketClient | null>(null);

export const ContextProvider = (props: IContextProviderProps) => {
    const [prices, setPrices] = React.useState<Record<Side, number>>({ Buy: 0, Sell: 0 })
    const [subscriptionId, setSubscriptionId] = React.useState<string>("")
    const [orders, setOrders] = React.useState<IOrder[]>([])
    const [positions, setPositions] = React.useState<Record<Instrument, Position>>({
        eur_rub: { Buy: 0, Sell: 0 },
        eur_usd: { Buy: 0, Sell: 0 },
        usd_rub: { Buy: 0, Sell: 0 }
    })

    const [websocketClient, setWebsocketClient] = React.useState<IWebsocketClient | null>(null)

    React.useEffect(() => {
        const websocketClient = createWebsocketClient(setPrices, setSubscriptionId, setOrders, setPositions)
        setWebsocketClient(websocketClient)
    }, [])


    const globalState: IGlobalState = {
        prices,
        positions,
        subscriptionId,
        orders
    }

    return (
        <GlobalStateContext.Provider value={globalState} >
            <SendMassegeDispatch.Provider value={websocketClient}>
                {props.children}
            </SendMassegeDispatch.Provider>
        </GlobalStateContext.Provider>
    );
}
