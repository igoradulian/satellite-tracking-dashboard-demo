import { useEffect, useState } from "react";

export function useSkyStream() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";
        const eventSource = new EventSource(
            new URL("/api/gps/data/subscribe", apiBaseUrl).toString()
        );

        eventSource.addEventListener("sky-update", (event) => {
            try {
                const parsed = JSON.parse(event.data);
                setData(Array.isArray(parsed) ? parsed[0] : parsed);
            } catch (err) {
                console.error("Failed to parse SSE payload", err);
            }
        });

        eventSource.onerror = (err) => {
            console.error("SSE error", err);
        };

        return () => eventSource.close();
    }, []);

    return data;
}