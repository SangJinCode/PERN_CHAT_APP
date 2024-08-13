export function extractTime(dateString: string) {
    const date = new Date(dateString);
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    return `${hours}:${minutes}`;
}

//시간 값을 받아 string으로 변환
//pasStart는 문자열이 maxLength(2) 보다 작은 경우 숫자 앞은 0으로 채움
//ex)01 02 같이 표현됨
function padZero(number: number) {
    return number.toString().padStart(2, "0")
}
