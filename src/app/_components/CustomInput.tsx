"use client";

type InputProps = {
    onChange?: (value: string) => void;
    placeholder?: string;
};

export default function CustomInput({ onChange, placeholder }: InputProps) {
    return (
        <input onChange={(e) => onChange?.(e.target.value)} placeholder={placeholder || "Type here..."}
            className="border-2 rounded-lg p-2 font-sans border-blue-500 focus:outline-blue-600 w-full"
        />
    );
}