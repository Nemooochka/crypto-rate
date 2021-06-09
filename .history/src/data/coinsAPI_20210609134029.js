export default function getCoinsUrl() {
  return `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,XRP,ADA&tsyms=USD,EUR&ap_key={${process.env.CRYPTO_API_KEY}}`;
}
