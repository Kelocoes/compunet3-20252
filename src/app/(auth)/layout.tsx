export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div id="auth-layout" className="min-h-screen flex items-center justify-center bg-gray-100">
            {children}
        </div>
    );
}
