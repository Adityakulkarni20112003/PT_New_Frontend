import type { Metadata } from "next";
import "./globals.css";

import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
    title: "NOVAEX Intelligence",
    description: "Modern Market Dashboard for Aluminium Data",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased bg-[#f8f9fa] pt-22 ">
                <Script
                    id="orchids-browser-logs"
                    src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts/orchids-browser-logs.js"
                    strategy="afterInteractive"
                    data-orchids-project-id="9971878a-e8d8-4af1-9815-7cf3746c6bbb"
                />
                <ErrorReporter />
                <Script
                    src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
                    strategy="afterInteractive"
                    data-target-origin="*"
                    data-message-type="ROUTE_CHANGE"
                    data-include-search-params="true"
                    data-only-in-iframe="true"
                    data-debug="true"
                    data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
                />
                <Navbar />
                {children}

            </body>
        </html>
    );
}