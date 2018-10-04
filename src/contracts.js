export const CONTRACTS = {
  selected: "alphanet#1",
  versions: {
    "alphanet#1": {
      "ADMIN": "tz1iQ3xATBoSkFdzfDWyfkSycucqKn45BAWp",
      "CONTRACT.token": "KT19fNk76zo1BanJGeFPSXpSL7BuY3YqTxpy",
      "CONTRACT.reward": "KT1TTXrCkz5soiDBzyii69cunFSPRwsa7LQd",
      "CONTRACT.main": "KT1L5qmtbMeeMAXt3Q8ZyUeg998kQJJUYMuH",
      "CONTRACT.adapter": "KT1LwMyjw3QuGGf8Bs1vz9Cjh63J9NfpV5se"
    },
    "testnet#1": {
      "ADMIN": "tz1e8FzYbvNdaHijnBTfZMAHHugKP5eKDhgu",
      "CONTRACT.token": "KT1UHQoA3tt6wH3aEjYkgM2LSFoqBEBMjcAR",
      "CONTRACT.reward": "KT1QKfEmx23ytfEPrUhzyDQJ3j2tHboa8ocu",
      "CONTRACT.main": "KT1WrabGBN2gqDdpr2Bg41Pyrs8Rvng2aAY3",
      "CONTRACT.adapter": "KT1BexCEqkG3e4NiC41fmVfyMEUjWjtkhLqW"
    },
    "testnet#2": {
      "ADMIN": "tz1e8FzYbvNdaHijnBTfZMAHHugKP5eKDhgu",
      "CONTRACT.token": "KT1Vu7py1imbRHcNsvgbtemxUoo16AQ1jUxq",
      "CONTRACT.reward": "KT1GbB51GRq4zhpMroCSFrKAb3MVDb7yeEW2",
      "CONTRACT.main": "KT1Q2Me8wUuDE88NnwEGwT8zWxxYLg3GfTct",
      "CONTRACT.adapter": "KT1AgWWKwXfJaJPFjDB7eMhCgmBvxhJMqgjk"
    },
    "testnet#3": {
      "ADMIN": "tz1UJPFiywU6uGeMpZnPrY4w7zNhLekvJaUo",
      "CONTRACT.token": "KT1WuNaA5HEujWvXXFNe5kyDLdsVfXdTW1FV",
      "CONTRACT.reward": "KT1L9dPozLBsg554S2U8KPxCFyLmWHuHDzb8",
      "CONTRACT.main": "KT1XXjDco86pHU9Jwas5EubiaSHKwv9ZWggQ",
      "CONTRACT.adapter": "KT1WRh4bdwDcsbPFhhLqrQCyoJMCU8Xy34Dj"
    },
    "testnet#4": {
      "ADMIN": "tz1UJPFiywU6uGeMpZnPrY4w7zNhLekvJaUo",
      "CONTRACT.token": "KT1JG2pLm5jSuqdVBJKyf6MDVp3fvZgDfRvj",
      "CONTRACT.reward": "KT1MahENHUk16UNgZaQdGtSv6UbH7N8enBim",
      "CONTRACT.main": "KT1HoCCvQpYiSUTUsa64cTj7gPVXzFGiqrYs",
      "CONTRACT.adapter": "KT1NTmeWwqXGGVr8JGpJu2dHhh42SbCH3ePH"
    }
  }
}

export const TOKENS = {
  alphanet: {
    TES: 'KT19fNk76zo1BanJGeFPSXpSL7BuY3YqTxpy'
  },
  testnet: {
    TES: 'KT1JG2pLm5jSuqdVBJKyf6MDVp3fvZgDfRvj' 
  },
  mainnet: {

  }
}

export function getContract(name, version) {
  return CONTRACTS.versions[version || CONTRACTS.selected][`CONTRACT.${name}`]
}

export function getTokens() {
  const net_type = CONTRACTS.selected.split('#')[0]
  return TOKENS[net_type]
}