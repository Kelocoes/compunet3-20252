"use client";

export default function CheckBox({ label, checked, onChange }: { label?: string; checked?: boolean; onChange?: (checked: boolean) => void }) {
    return (
        <label className="inline-flex items-center space-x-2 cursor-pointer">
            <input
                type="checkbox"
                className="h-5 w-5 text-blue-600 transition duration-150 ease-in-out cursor-pointer"
                checked={checked}
                onChange={(e) => onChange && onChange(e.target.checked)}
            />
            {label && <span className="text-gray-700">{label}</span>}
        </label>
    );
}