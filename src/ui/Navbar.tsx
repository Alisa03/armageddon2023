import Link from "next/link";

import { useListContext } from "@/provider";

import page from '@/styles/page.module.scss'
import navbar from '@/styles/ui/navbar.module.scss'

export default function Navbar() {
    const { listState } = useListContext();

    return <aside className={navbar.aside}>
        <nav className={navbar.nav}>
            <Link className={navbar.nav__link} href="/">Home</Link>
            <Link className={navbar.nav__link} href="/cart">Корзина</Link>
            <p>{listState.length} астероида</p>
            <Link href="/cart" className={`${page.btn} ${page.btn_orange}`}>Отправить</Link>
        </nav>
    </aside>
}