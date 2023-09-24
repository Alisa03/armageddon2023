import { IMeteor } from "@/Types"

import { Element } from "@/ui"

import page from '@/styles/page.module.scss'
import element from '@/styles/ui/element.module.scss'

interface IProps {
    i: IMeteor,
    Delete: (i: IMeteor) => void
}

export default function CartItem({ i, Delete }: IProps) {
    return (
        <Element key={i.id} item={i}>
            <div className={element.line}>
                <button className={`${page.btn} ${page.btn_orange}`} onClick={() => Delete(i)}>Удалить</button>
                <label className={page.label}>
                    <input type="checkbox"
                        checked={i.check}
                        onChange={() => {
                            i.check = !i.check
                        }} /> Добавить
                </label>
            </div>
        </Element>
    )
}