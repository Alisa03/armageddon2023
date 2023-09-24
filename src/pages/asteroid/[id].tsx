import { useEffect, useState } from "react";
import { IMeteor } from "@/Types";

import { InfiniteScroll, ShopItem } from "@/components";
import { Block, List } from "@/ui";

import element from '@/styles/ui/element.module.scss'

export default function IdPage({ meteor }: { meteor: IMeteor }) {
    const [isLoading, setIsLoading] = useState(false);
    const length = meteor.close_approach_data.length

    const [numbers, setNumbers] = useState(length <= 50 ? length : 30)

    const [array, setArray] = useState(meteor.close_approach_data.slice(0, numbers))

    const diameter = Math.round(meteor.estimated_diameter.meters.estimated_diameter_max)

    useEffect(() => {
        const nextNumbers = numbers + 15

        if (length === array.length) {
            return setIsLoading(false)
        } else if (length <= nextNumbers) {
            setArray(meteor.close_approach_data)
            setNumbers(array.length)
            return setIsLoading(false)
        } else if (isLoading) {
            const getNewData = async () => {
                setArray([...array, ...meteor.close_approach_data.slice(numbers + 1, nextNumbers)])

                setNumbers(nextNumbers)

                setIsLoading(false);
            };
            getNewData();
        }

        return setIsLoading(false)
    }, [isLoading]);

    return (
        <List>
            <InfiniteScroll isLoading={isLoading} setIsLoading={setIsLoading}>
                <li className={element.item}>
                    <div className={element.line}>
                        <p className={element.date}>
                            {meteor.name}
                        </p>
                        {meteor.is_potentially_hazardous_asteroid && <p>⚠️Опасен</p>}
                    </div>
                    <div className={element.line}>
                        <a className={element.linkNasa} target="_blanck" href={meteor.nasa_jpl_url.replace("http://", "https://")}>В базе данных Nasa</a>
                    </div>
                    <div className={element.line}>
                        <p>Ø {diameter} м</p>
                    </div>
                </li>
                {array.map((item: any) =>
                    <Block key={item.epoch_date_close_approach} item={item} />)}
            </InfiniteScroll>
        </List>
    )
}

export async function getServerSideProps({ params }: any) {
    const api_Key = process.env.API_KEY

    try {
        const response = await fetch(`https://api.nasa.gov/neo/rest/v1/neo/${params.id}?api_key=${api_Key}`)
        const meteor = await response.json()

        return {
            props: { meteor },
        }

    } catch (error) {
        console.error((error as Error).message);

        return (error as Error).message
    }
}