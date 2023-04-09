import React from 'react'
import { IContextProviderProps } from '../../types/props/context-provider-props';
import { createWebsocketClient } from '../../logic/websocket-client';
import { IWebsocketClient } from '../../types/websocket-client';
import { IOrder } from '../../types/order/order';
import { IGlobalState } from '../../types/global-state';

export const GlobalStateContext = React.createContext<IGlobalState>(null!);
export const SendMassegeDiapatch = React.createContext<IWebsocketClient | null>(null);

export const ContextProvider = (props: IContextProviderProps) => {
    const [priceSell, setPriceSell] = React.useState<number>(0)
    const [priceBuy, setPriceBuy] = React.useState<number>(0)    
    const [subscriptionId, setSubscriptionId] = React.useState<string>("")
    const [orders, setOrders] = React.useState<IOrder[]>([])

    const [websocketClient, setWebsocketClient] = React.useState<IWebsocketClient | null>(null)

    React.useEffect(() => {
        const websocketClient = createWebsocketClient(setPriceSell, setPriceBuy, setSubscriptionId, setOrders)
        setWebsocketClient(websocketClient)
    }, [])
    
 
    const globalState: IGlobalState = {
        prices: {
            Buy: priceBuy,
            Sell: priceSell
        },
        subscriptionId,
        orders
    }

    return (
        <GlobalStateContext.Provider value={globalState} >
            <SendMassegeDiapatch.Provider value={websocketClient}> 
                {props.children}
            </SendMassegeDiapatch.Provider>         
        </GlobalStateContext.Provider>
    );
}
