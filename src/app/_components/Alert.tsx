"use client";
import { useAppSelector } from "@/lib/hooks";
import { useEffect, useState } from "react";

export default function Alert() {
    const [open, setOpen] = useState(false);
    const alertState = useAppSelector((state) => state.alert);

    useEffect(() => {
        if (alertState.alert) {
            setOpen(true);
        }
    }, [alertState]);

    return (
        <div className={`toast toast-top toast-center ${open ? '' : 'hidden'}`}>
            <div className={`alert ${
                alertState.severity === 'error' ? 'alert-error' : 
                alertState.severity === 'warning' ? 'alert-warning' : 
                alertState.severity === 'success' ? 'alert-success' : 
                'alert-info'
            }`}>
                <span>{alertState.alert}</span>
            </div>
        </div>
    );
}