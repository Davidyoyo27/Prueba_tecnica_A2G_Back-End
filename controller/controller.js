const dayjs = require('dayjs');
const isbetween = require('dayjs/plugin/isBetween');
const { get } = require("../util/request");
dayjs.extend(isbetween);

const countByCategory = async (req, res) => {
    const { token, idsensor } = req.headers;
    console.log(idsensor);
    const response = await get(`/api/Records/${idsensor}?pageSize=10000`, token);

    let low = 0;
    let mid = 0;
    let high = 0;
    console.log(response.data);
    response.data.map((item) => {
        if(item.value >= 0 && item.value <= 60) low++;
        if(item.value >= 61 && item.value <= 120) mid++;
        if(item.value >= 121 && item.value <= 200) high++;
    });

    res.json({ low, mid, high });
}

const countByDate = async (req, res) => {
    const { token, idsensor } = req.headers;
    console.log(idsensor);
    const response = await get(`/api/Records/${idsensor}?pageSize=10000`, token);

    let count = 0;
    let firstDate = dayjs('10-04-2023 08:00', 'DD-MM-YYYY HH:mm').format('YYYY-MM-DD HH:mm');
    let secondDate = dayjs('11-04-2023 20:00', 'DD-MM-YYYY HH:mm').format('YYYY-MM-DD HH:mm');
    console.log(firstDate);
    console.log(secondDate);
    response.data.map((item) => {
        let recordDate = new Date(item.ts);
        recordDate = new Date(recordDate.getTime() - (recordDate.getTimezoneOffset() * 60000));
        if(dayjs(recordDate, 'YYYY-MM-DD HH:mm').isBetween(firstDate, secondDate, null, '[]')) count++;
    });

    res.json({ count });
}

module.exports = {
    countByCategory,
    countByDate
}