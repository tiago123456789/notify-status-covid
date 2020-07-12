module.exports = {
    getCurrentDateInFormatYearMonthDay() {
        const date = new Date();
        const valueIncrementMonth = 1;
        return `${date.getFullYear()}-${date.getMonth() + valueIncrementMonth}-${date.getDate()}`;
    }
}