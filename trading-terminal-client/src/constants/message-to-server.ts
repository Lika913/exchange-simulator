export enum MESSAGE_TO_SERVER {
    SubscribeMarketData = 1000,
    UnsubscribeMarketData,
    PlaceOrder,
    CancelOrder,
    ExecutionReport,
    CalculatePositions,
}