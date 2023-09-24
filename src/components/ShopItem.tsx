import { useListContext } from "@/provider";
import { IMeteor } from "@/Types";

import { Element } from "@/ui"

import page from '@/styles/page.module.scss'

const ShopItem = ({ item }: { item: IMeteor }) => {
    const { listState, setListState } = useListContext();

    const state = listState.find((i: IMeteor) => item.id === i.id);

    const handleOrder = (i: IMeteor) => {
        if (state) {
            const newListState = listState.filter((asteroid: IMeteor) => asteroid.id !== i.id);
            setListState(newListState);
        }

        setListState([...listState, i])
    };

    return (
        <Element item={item}>
            <button
                className={`${page.btn} ${state ? page.btn_active : page.btn_orange}`}
                onClick={() => handleOrder(item)}
            >
                <span>{state ? "В корзине" : "Заказать"}</span>
            </button>
        </Element>
    )
}

export default ShopItem