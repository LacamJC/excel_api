exports.excelSerialDateToJSDate = (serial) => {
    const utcDays = Math.floor(serial - 25569);
    const utcValue = utcDays * 86400;
    const dateInfo = new Date(utcValue * 1000);

    const fractionalDay = serial - Math.floor(serial) + 0.0000001;

    let totalSeconds = Math.floor(86400 * fractionalDay);

    const seconds = totalSeconds % 60;
    totalSeconds -= seconds;

    const hours = Math.floor(totalSeconds / (60 * 60));
    const minutes = Math.floor(totalSeconds / 60) % 60;

    dateInfo.setUTCDate(dateInfo.getUTCDate());
    dateInfo.setUTCHours(hours);
    dateInfo.setUTCMinutes(minutes);
    dateInfo.setUTCSeconds(seconds);

    return dateInfo;
}

exports.excelSerialTimeToHMS = (serialTime) => {
    const totalSeconds = Math.round(serialTime * 86400);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};