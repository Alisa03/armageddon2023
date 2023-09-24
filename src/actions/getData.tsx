export async function getData(nextUrl: string) {
    try {
        const data = await fetch(nextUrl);
        const asteroids = await data.json();

        return asteroids
    } catch (error) {
        console.error((error as Error).message);

        return (error as Error).message
    }
}