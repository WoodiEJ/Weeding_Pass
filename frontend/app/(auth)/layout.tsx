import { Geist, Geist_Mono, Roboto } from "next/font/google"
import "../globals.css"
import { SiteHeader } from "@/components/site-header"


const roboto = Roboto({ subsets: ['latin'], variable: '--font-sans' })

const fontMono = Geist_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
})

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <main>
            {children}
        </main>
    )
}
