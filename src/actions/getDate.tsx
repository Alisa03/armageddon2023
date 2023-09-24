export const getDate = (date: string) => {
    const string: string[] = date.split("-")

    const russianMonths: string[] =
        [
            "Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря",
        ]

    string[1] = russianMonths[+string[1] - 1]

    return string.reverse().join(" ")
};