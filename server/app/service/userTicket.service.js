export function addTime(currentTimestamp, dateString) {

    let timestamp = dateString.replace(/(getTime\(\))|(getMonth\(\))|(setFullYear\(\))|(\+\d+)|(-\d+)/g, (match) => {
        if (match === 'getTime()') {
            return currentTimestamp;
        } else if (match === 'getMonth()') {
            const regex = /\d+/g;
            let number = parseInt(dateString.match(regex));
            let date = new Date(currentTimestamp);
            date.setMonth(date.getMonth() + number);
            return date.getTime();
        }
        return match;
    });

    let date = new Date(eval(timestamp));

    return date.getTime();
}
