const wholeNumberFormatter = new Intl.NumberFormat("de-DE", {
    maximumFractionDigits: 0,
});

export function formatWholeNumber(value: number) {
    return wholeNumberFormatter.format(value);
}

export function formatCurrency(value: number, currencySymbol = "$") {
    return `${currencySymbol}${formatWholeNumber(value)}`;
}

export function formatCountdown(totalSeconds: number) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}
