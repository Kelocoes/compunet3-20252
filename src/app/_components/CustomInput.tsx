"use client";

type InputProps = {
    onChange?: (value: string) => void;
    placeholder?: string;
};

export default function CustomInput({ onChange, placeholder }: InputProps) {
    return (
        <input onChange={(e) => onChange?.(e.target.value)} placeholder={placeholder || "Type here..."}
            className=""
        />
    );
}