import { useEffect, useState } from "react";
import { getData, getFormatedDate } from "@/actions";
import { IAsteroids, IMeteor } from "@/Types";

import { ShopItem, InfiniteScroll } from "@/components";
import { List } from "@/ui";

import page from '@/styles/page.module.scss'

export default function HomePage({ asteroids }: { asteroids: IAsteroids }) {
  const [onlyHazard, setOnlyHazard] = useState(false);
  const [data, setData] = useState<IAsteroids>(asteroids)
  const [asteroid, setAsteroid] = useState<IMeteor[]>(Object.values(data.near_earth_objects)[0] || [])
  const [isLoading, setIsLoading] = useState(false);
  const [nextPage, setNextPage] = useState(
    data.links.next!.replace("http://", "https://")
  );

  useEffect(() => {
    if (isLoading) {
      const getNewData = async () => {
        const newData = await getData(nextPage);

        if (newData) {
          const next = newData.links.next.replace("http", "https");

          setData(newData)
          setNextPage(next);

          const array: any = Object.values(newData.near_earth_objects)[0]
          setAsteroid([...asteroid, ...array]);
        }

        setIsLoading(false);
      };
      getNewData();
    }
  }, [isLoading, nextPage]);

  return (
    <List>
      <label className={page.label}>
        <input
          type="checkbox"
          checked={onlyHazard}
          onChange={() => setOnlyHazard(!onlyHazard)}
        />
        Показать только опасные
      </label>

      <InfiniteScroll isLoading={isLoading} setIsLoading={setIsLoading}>
        {
          asteroid.filter((item: IMeteor) => {
            return onlyHazard ?
              item.is_potentially_hazardous_asteroid === true :
              item
          }).map((item: IMeteor) => <ShopItem key={item.id} item={item} />)
        }
      </InfiniteScroll>
    </List>
  )
}

export async function getServerSideProps(context: IAsteroids) {

  const url = "https://api.nasa.gov/neo/rest/v1/feed";
  const start = getFormatedDate();
  const end = getFormatedDate();
  const apiKey = "TnwsoDArReE0abFZZ2T0RTcQewIELp42XHs9ycxo"

  try {
    const apiUrl: string = `${url}?start_date=${start}&end_date=${end}&api_key=${apiKey}`

    const data = await fetch(apiUrl);
    const asteroids = await data.json();

    return { props: { asteroids } }
  } catch (error) {
    console.error((error as Error).message);

    return (error as Error).message
  }
}