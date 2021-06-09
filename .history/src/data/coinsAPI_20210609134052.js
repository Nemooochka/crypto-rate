export default function getCoinsUrl() {
  return `https://min-ap.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,XRP,ADA&tsyms=USD,EUR&api_key={${process.env.CRYPTO_API_KEY}}`;
}
