type Props = {
    date: Date,
}
export default function transformDate(date: Props) {
    const start_date = new Date(date.date).toLocaleDateString("en-US", { //если вынести в объект дает ошибку xd
        weekday: 'short',
        month: 'short',
        day: 'numeric',
    })
    
    const start_time = new Date(date.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    return [start_date, start_time]
}