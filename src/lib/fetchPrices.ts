export async function getPrices() {
    const ids = ['bitcoin', 'ethereum', 'solana', 'sei-network'];
    const symbols = ['btc', 'eth', 'sol', 'sei'];
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids.join(',')}&vs_currencies=usd&include_24hr_change=true`;
    try {
        const res = await fetch(url, { next: { revalidate: 30 } }); // Cache for 30 seconds
        if (!res.ok) throw new Error('Failed to fetch prices');
        const data = await res.json();
        return Object.fromEntries(symbols.map((s, i) => [s, data[ids[i]]]));
    } catch (error) {
        console.error("Error fetching prices:", error);
        return null;
    }
}
