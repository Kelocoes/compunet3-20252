"use client";

export default function Chip({ label }: { label: string; }) {
    return (
        <div className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm">
            {label}
        </div>
    );
}