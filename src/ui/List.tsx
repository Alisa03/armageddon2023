import { useDistanceContext } from "@/provider";

import page from '@/styles/page.module.scss'
import list from '@/styles/ui/list.module.scss'

const List = ({ children }: { children: React.ReactNode }) => {
    const { distance, setDistance } = useDistanceContext();

    return (
        <div className={list.block}>
            <button className={distance ? `${page.tdu} ${page.btn__distance}` : page.btn__distance} onClick={() => setDistance(true)}>в киллометрах</button>&nbsp; | &nbsp;
            <button className={distance ? page.btn__distance : `${page.tdu} ${page.btn__distance}`} onClick={() => setDistance(false)}> в лунных орбитах</button>
            {children}
        </div>
    )
}

export default List