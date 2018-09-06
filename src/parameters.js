import { getContract } from './contracts.js'

export function rewardWithDraw(version) {
  return {
            "prim": "Right",
            "args": [
              {
                "prim": "Left",
                "args": [
                  {
                    "prim": "Pair",
                    "args": [
                      {
                        "string": getContract('reward', version)
                      },
                      {
                        "prim": "Pair",
                        "args": [
                          {
                            "int": "0"
                          },
                          {
                            "prim": "Some",
                            "args": [
                              {
                                "prim": "Pair",
                                "args": [
                                  {
                                    "string": getContract('reward', version)
                                  },
                                  {
                                    "bytes": "050000"
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
}

export function rewardUnlock(version) {
  return {
            "prim": "Right",
            "args": [
              {
                "prim": "Left",
                "args": [
                  {
                    "prim": "Pair",
                    "args": [
                      {
                        "string": getContract('reward', version)
                      },
                      {
                        "prim": "Pair",
                        "args": [
                          {
                            "int": "0"
                          },
                          {
                            "prim": "Some",
                            "args": [
                              {
                                "prim": "Pair",
                                "args": [
                                  {
                                    "string": getContract('reward', version)
                                  },
                                  {
                                    "bytes": "050002"
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
}

export function rewardLock(token_amount, version) {
  return {
            "prim": "Right",
            "args": [
              {
                "prim": "Left",
                "args": [
                  {
                    "prim": "Pair",
                    "args": [
                      {
                        "string": getContract('reward', version)
                      },
                      {
                        "prim": "Pair",
                        "args": [
                          {
                            "int": token_amount + ''
                          },
                          {
                            "prim": "Some",
                            "args": [
                              {
                                "prim": "Pair",
                                "args": [
                                  {
                                    "string": getContract('reward', version)
                                  },
                                  {
                                    "bytes": "050001"
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
}

export function executeSelling(token_addr, price, owner) {
  return {
            "prim": "Right",
            "args": [
              {
                "prim": "Left",
                "args": [
                  {
                    "prim": "Pair",
                    "args": [
                      {
                        "string": token_addr
                      },
                      {
                        "prim": "Pair",
                        "args": [
                          {
                            "int": price
                          },
                          {
                            "prim": "Pair",
                            "args": [
                              {
                                "int": "0"
                              },
                              {
                                "string": owner
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
}

export function executeBuying(owner, token_amount, bytes, version) {
  return {
            "prim": "Right",
            "args": [
              {
                "prim": "Left",
                "args": [
                  {
                    "prim": "Pair",
                    "args": [
                      {
                        "string": owner
                      },
                      {
                        "prim": "Pair",
                        "args": [
                          {
                            "int": token_amount + ''
                          },
                          {
                            "prim": "Some",
                            "args": [
                              {
                                "prim": "Pair",
                                "args": [
                                  {
                                    "string": getContract('adapter', version)
                                  },
                                  {
                                    "bytes": bytes
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
}

export function createSelling(token_amount, bytes, version) {
  return {
            "prim": "Right",
            "args": [
              {
                "prim": "Left",
                "args": [
                  {
                    "prim": "Pair",
                    "args": [
                      {
                        "string": getContract('main', version)
                      },
                      {
                        "prim": "Pair",
                        "args": [
                          {
                            "int": token_amount + ''
                          },
                          {
                            "prim": "Some",
                            "args": [
                              {
                                "prim": "Pair",
                                "args": [
                                  {
                                    "string": getContract('adapter', version)
                                  },
                                  {
                                    "bytes": bytes
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
}

export function createBuying(token_addr, price) {
  return {
            "prim": "Left",
            "args": [
              {
                "prim": "Pair",
                "args": [
                  {
                    "string": token_addr
                  },
                  {
                    "prim": "Pair",
                    "args": [
                      {
                        "int": price + ''
                      },
                      {
                        "int": "0"
                      }
                    ]
                  }
                ]
              }
            ]
          }
}

export function cancelOrder(token_addr, is_buy, price) {
  return {
            "prim": "Right",
            "args": [
              {
                "prim": "Right",
                "args": [
                  {
                    "prim": "Left",
                    "args": [
                      {
                        "prim": "Pair",
                        "args": [
                          {
                            "string": token_addr
                          },
                          {
                            "prim": "Pair",
                            "args": [
                              {
                                "prim": is_buy ? "True" : "False",
                                "args": []
                              },
                              {
                                "int": price + ''
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
}