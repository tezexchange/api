export const CONTRACTS = {
  selected: "alphanet#2",
  versions: {
    "alphanet#2": {
      "ADMIN": "tz1gRaTpXdZPEdcoG85gG9EuUYNeRKuTUoz4",
      "CONTRACT.token": "KT19eP5E3HyJaNWFFpsXPaYx9BmJDxLULCXd",
      "CONTRACT.reward": "KT1NuavwJ1QRiSzcCsWJ99tRYifWNQGRMHdT",
      "CONTRACT.order": "KT1Ap4UZRBGGo9Pm92sFbR8gJrrFTfUbX4kc",
      "CONTRACT.adapter": "KT196TdWjorB4PGyphnkTb3DW2sDwVJu4Js4"
    },
    "alphanet#1": {
      "ADMIN": "tz1fBJf5HAcfTCaRmHCPfcQZiR9TayJf7XsE",
      "CONTRACT.token": "KT1QsMSGuLG3HL8YZjHJqXTpL8v8yNkvfSvn",
      "CONTRACT.reward": "KT1MVjKAyEUozrwDVratszVvTGZC6eAiozES",
      "CONTRACT.main": "KT1EKGRmfwaMEsqyopxj1NSRvqhq8kVqVdoA",
      "CONTRACT.adapter": "KT1Lh4RR3Y2sVLJu9uKCJHmjrRbqqLNMmKR5"
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
    TES: 'KT19eP5E3HyJaNWFFpsXPaYx9BmJDxLULCXd'
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