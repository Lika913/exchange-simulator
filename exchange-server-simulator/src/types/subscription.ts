import { Instrument } from "./instrument"

export interface ISubscription {
    subscriptionId: string
    instrument: Instrument
}