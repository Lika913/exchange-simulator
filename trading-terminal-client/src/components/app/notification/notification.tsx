import "./notification.css"
import { useEffect, useRef, useState } from 'react'

const Notification = (): JSX.Element => {

    const ref = useRef<HTMLDivElement>(null);
    const [message, setMessage] = useState<string>("");
    const [opacity, setOpacity] = useState<string>("");
    const [background, setBackground] = useState<string>("");

    useEffect(() => {
        const show = (event: Event) => {
            const { detail } = (event as CustomEvent);

            setMessage(detail.message);
            setBackground(detail.background);            
            setOpacity(detail.opacity);
        };

        document.addEventListener('show-notification', show);
        return () => {
            document.removeEventListener('show-notification', show);
        };
    }, [])

    return (
        <div
            className="notification"
            ref={ref}
            style={{
                opacity: opacity,
                background: background
            }}
        >
            {message}
        </div>
    )
}

export default Notification;