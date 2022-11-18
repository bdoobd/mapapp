const link =
  "https://geo.ipify.org/api/v2/country?apiKey=at_OdAYDZ56SgEg5W0cdxlr7ooOysJYH&ipAddress=";
const link_2 =
  "https://geo.ipify.org/api/v2/country,city?apiKey=at_OdAYDZ56SgEg5W0cdxlr7ooOysJYH&ipAddress=";

export async function getAddress(ip = "8.8.8.8") {
  const response = await fetch(`${link_2}${ip}`);

  return await response.json();
}
