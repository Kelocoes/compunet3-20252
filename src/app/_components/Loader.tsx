export default function Loader({size}: {size?: number}) {
    return (
        <div className={`w-${size || 16} h-${size || 16} border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin`}></div>
    );
}