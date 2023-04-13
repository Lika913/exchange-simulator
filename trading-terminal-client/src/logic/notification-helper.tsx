import { INotificationMessage, NotificatioType } from '../types/notification-message';

const messages: INotificationMessage[] = [];
let currentMessage: string;

export const showSuccessNotification = (message: string, duration: number = 3) => {
    messages.unshift({ type: "success", message, duration });
    showNotification();
}

export const showErrorNotification = (message: string, duration: number = 3) => {
    messages.unshift({ type: "error", message, duration });
    showNotification();
}

const showNotification = () => {

    if (!currentMessage) {
        const message = messages.pop()!;
        currentMessage = message.message;

        const detail = {
            message: message.message,
            opacity: "0.7",
            background: colorsBack[message.type],
        }
        callShowEvent(detail)

        setTimeout(() => {            
            currentMessage = "";
            detail.opacity = "0";
            callShowEvent(detail);
        }, message.duration * 1000)
    } else {
        if (messages[messages.length - 1].message === currentMessage) {
            messages.pop();
        } else {
            setTimeout(() => {
                showNotification()
            }, 1000);
        }
    }
}

const callShowEvent = (detail: Record<string, string>) => {    
    document.dispatchEvent(new CustomEvent("show-notification", { detail }))
}

const colorsBack: Record<NotificatioType, string> = {
    success: "rgb(90, 214, 138)",
    error: "rgb(255, 77, 77)",
}
