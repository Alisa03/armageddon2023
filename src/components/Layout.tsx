import { Suspense } from "react";

import { Provider } from "../provider";

import { Footer, Header, Loader, Navbar } from "@/ui";

import page from '@/styles/page.module.scss'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <Provider>
            <Header />
            <Navbar />
            <Suspense fallback={<Loader />}>
                <main className={page.main}>
                    {children}
                </main>
            </Suspense>
            <Footer />
        </Provider>
    )
}