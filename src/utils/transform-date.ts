type Props = {
    start_date: Date,
    end_date: Date
}
export default function transformDate(date: Props) {
    const start_date = new Date(date.start_date).toLocaleDateString("en-US", { //если вынести в объект дает ошибку xd
        weekday: 'short',
        month: 'short',
        day: 'numeric',
    })
    const end_date = new Date(date.end_date).toLocaleDateString("en-US", {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
    })
    const start_time = new Date(date.start_date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    const end_time = new Date(date.end_date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    return [start_date, start_time, end_date, end_time]
}