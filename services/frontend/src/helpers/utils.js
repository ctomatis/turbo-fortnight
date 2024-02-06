const options = {
    hour: "numeric",
    minute: "numeric",
    month: "short",
    day: "numeric",
    weekday: "short"
}

const locale = "es-AR"

const formatDateTime = dt => {
    const date = new Date(dt)
    return new Intl.DateTimeFormat(locale, options).format(date)
}

export { formatDateTime }