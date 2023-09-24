export const DistanceText = (data: number, string: string) => {
    return Math.round(data)
        .toString()
        .replace(/(\d)(?=(\d{3})+$)/g, "$1 ")
        + " " + string
}