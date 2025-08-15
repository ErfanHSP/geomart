const daysToSeconds = (days) => {
    let ttl = Number(days) * 24 * 3600 * 1000
    return ttl
}

const minutesToSeconds = (minutes) => {
    let ttl = Number(minutes) * 60 * 1000
    return ttl
}

module.exports = {
    daysToSeconds,
    minutesToSeconds
}