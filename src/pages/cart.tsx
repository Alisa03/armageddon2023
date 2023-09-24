import { useState } from "react";
import { useListContext } from "@/provider";
import { IMeteor } from "@/Types";

import { CartItem } from "@/components";
import { List } from "@/ui";

import page from '@/styles/page.module.scss'
import list from '@/styles/ui/list.module.scss'
import element from '@/styles/ui/element.module.scss'

export default function CartPage() {
    const { listState, setListState } = useListContext();
    const [send, setSend] = useState<IMeteor[]>([])

    const Delete = (i: any) => setListState(listState.filter((item: IMeteor) => item.id !== i.id))

    const Send = () => {
        const list = listState.filter((item: IMeteor) => item.check && item.check === true)

        setSend([...send, ...list])
        setListState(listState.filter((item: IMeteor) => item.check !== true))
    }

    return (
        <List>
            <ul className={list.flex}>
                {listState.length == 0 ?
                    <p>В карзине пусто</p> :
                    <>
                        {
                            listState.map((i: IMeteor) =>
                                <CartItem key={i.id} i={i} Delete={Delete} />
                            )
                        }
                        <button
                            className={`${page.btn} ${page.btn_orange}`}
                            onClick={Send}
                        >Отправить</button>
                    </>
                }
                {
                    send.length !== 0 && <div>
                        <p style={{ marginBottom: 7, fontSize: "1.2rem" }}>Заказ отправлен:</p>
                        {
                            send.map((i: any) => <li key={i.id}>{i.name}</li>)
                        }
                    </div>
                }
            </ul>
        </List>
    )
}