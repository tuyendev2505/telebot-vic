export const shortenAddress = (address: string, l: number = 5) => {
  return `${address.substr(0, l)}...${address.substr(address.length - l, l)}`;
};
