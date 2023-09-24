import React, { useEffect } from "react";

import { Loader } from "@/ui";

import page from '@/styles/page.module.scss'
import list from '@/styles/ui/list.module.scss'

interface IProps {
    isLoading: boolean,
    setIsLoading: (isLoading: boolean) => void,
    children: React.ReactNode
}

export default function InfiniteScroll({ isLoading, setIsLoading, children }: IProps) {
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleScroll = () => {
        const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
        if (scrollHeight - scrollTop - clientHeight < 200) {
            if (!isLoading) setIsLoading(true);
        }
    };

    return <div>
        <ul className={list.flex}>
            {children}
        </ul>

        {isLoading ? (
            <Loader />
        ) :
            (
                <button
                    onClick={() => setIsLoading(true)}
                    className={`${page.btn} ${page.btn_orange}`}
                >
                    Загрузить еще
                </button>
            )
        }
    </div>
}