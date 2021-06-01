export function getCoinsUrl(coins) {
  return `'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,XRP,ADA&tsyms=USD,EUR&api_key={${process.env.CRYPTO_API_KEY}}'`;
}
