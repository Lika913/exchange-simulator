export interface INotificationMessage {
    type: NotificatioType
    message: string
    duration: number
}

export type NotificatioType = "success" | "error";