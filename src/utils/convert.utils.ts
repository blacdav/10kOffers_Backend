export const toKobo = (naira: number): number => {
    const value = typeof naira === 'string' ? parseInt(naira) : naira;
    if (isNaN(value)) return 0;
    
    return Number(value * 100);
};

// Convert Kobo to Naira (divide by 100)
export const toNaira = (kobo: number): number => {
    const value = typeof kobo === 'string' ? parseInt(kobo) : kobo;
    if (isNaN(value)) return 0;

    return Number((value / 100));
};

export const toCurrency = (val: number) => {
    const num = new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN'
    })

    return num.format(val);
}