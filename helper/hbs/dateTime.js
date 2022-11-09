const now = function () {
    const time = new Date().getFullYear();
    return `${time}`;
}

exports.dateTime = now;