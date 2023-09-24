import React from "react";
import Image from "next/image";
import Link from "next/link"

import { DistanceText, getDate } from "@/actions";

import { useDistanceContext } from "@/provider";
import { IMeteor } from "@/Types";

import page from '@/styles/page.module.scss'
import element from '@/styles/ui/element.module.scss'

interface IProps {
    item: IMeteor,
    children: React.ReactNode
}

const Element = ({ item, children }: IProps) => {
    const { distance } = useDistanceContext();
    const data = item.close_approach_data[0]
    const distanceS = data.miss_distance;

    const diameter = Math.round(item.estimated_diameter.meters.estimated_diameter_max)
    const size = diameter <= 400

    return <li className={element.item}>
        <Link className={element.link} href={`/asteroid/${item.id}`}>
            <div>
                {/* дата */}
                <div className={element.line}>
                    <p className={element.date}>
                        {getDate(data.close_approach_date)}
                    </p>
                    {item.is_potentially_hazardous_asteroid && <p>⚠️Опасен</p>}
                </div>
                <div className={element.line}>
                    {/* расстояние */}
                    <div className={element.distance}>
                        <p>
                            {
                                distance
                                    ?
                                    DistanceText(+distanceS.kilometers, "км") :
                                    DistanceText(+distanceS.lunar, "лунных орбит")
                            }
                        </p>
                    </div>
                    {/* диаметр */}
                    <Image
                        src="/asteroid.png"
                        alt={size ? "small item image" : "big item image"}
                        width={size ? 22 : 36}
                        height={size ? 24 : 40}
                    />
                    <div>
                        <p className={page.tdu}>{item.name}</p>
                        <p>Ø {diameter} м</p>
                    </div>
                </div>
            </div>
        </Link>
        {children}
    </li>
}

export default Element