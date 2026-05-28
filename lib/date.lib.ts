const dayMonthYearFormatter = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
});

export function parseDateValue(dateValue: Date | number | string) {
    const date = dateValue instanceof Date ? dateValue : new Date(dateValue);

    return Number.isNaN(date.getTime()) ? null : date;
}

export function formatDayMonthYear(dateValue: Date | number | string) {
    const date = parseDateValue(dateValue);

    return date ? dayMonthYearFormatter.format(date) : String(dateValue);
}
