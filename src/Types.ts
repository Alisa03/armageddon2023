export interface IAsteroids {
    element_count: number,
    links: { [key: string]: string }
    near_earth_objects: { [key: string]: IMeteor[] }
}

export interface IMeteor {
    name: string,
    id: string,
    nasa_jpl_url: string,
    close_approach_data: IDataMeteor[],
    estimated_diameter: {
        [key: string]: { [key: string]: number }
    },
    is_potentially_hazardous_asteroid: boolean,
    links: { self: string },
    check: boolean
}

export interface IDataMeteor {
    close_approach_date: string,
    miss_distance: { [key: string]: string },
    orbiting_body: string,
    relative_velocity: { [key: string]: number },
    epoch_date_close_approach: number
}
