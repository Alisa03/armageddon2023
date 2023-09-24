import { DistanceText, getDate } from "@/actions";
import { useDistanceContext } from "@/provider";
import { IDataMeteor } from "@/Types";

import element from '@/styles/ui/element.module.scss'

const Block = ({ item }: { item: IDataMeteor }) => {
    const { distance } = useDistanceContext();

    const bodies: { [key: string]: string } = {
        Earth: "Земли",
        Venus: "Венеры",
        Mars: "Марса",
        Moon: "Луны",
        Merc: "Меркурия",
        Juptr: "Юпитера",
    };

    return <li key={item.close_approach_date} className={element.item}>
        <div className={element.line}>
            <p className={`${element.info} ${element.date}`}>Дата:</p>
            <p className={element.date}>{getDate(item.close_approach_date)}</p>
        </div>
        <div className={element.line}>
            <p className={element.info}>Орбита:</p>
            <p>{bodies[item.orbiting_body]}</p>
        </div>
        <div className={element.line}>
            <p className={element.info}>Расстояние до Земли:</p>
            <p>
                ≈ {
                    distance
                        ?
                        DistanceText(+item.miss_distance.kilometers, "км") :
                        DistanceText(+item.miss_distance.lunar, "лунных орбит")
                }
            </p>
        </div>
        <div className={element.line}>
            <p className={element.info}>Скорость:</p>
            <p>≈ {Math.round(item.relative_velocity.kilometers_per_second)} км/с</p>
        </div>
    </li>
}

export default Block