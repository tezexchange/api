import { getContract } from './contracts.js'

export default {
  tokenTransfer(receiver, token_amount) {
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
                        "string": receiver
                      },
                      {
                        "prim": "Pair",
                        "args": [
                          {
                            "int": token_amount + ''
                          },
                          {
                            "prim": "None",
                            "args": []
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
  },

  rewardWithdraw(version) {
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
  },

  rewardUnlock(version) {
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
  },

  rewardLock(token_amount, version) {
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
  },

  executeSelling(token_addr, price, owner) {
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
                              "int": price + ''
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
  },

  executeBuying(owner, token_amount, bytes, version) {
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
  },

  createSelling(token_amount, bytes, version) {
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
                          "string": getContract('order', version)
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
  },

  createBuying(token_addr, price) {
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
  },

  cancelOrder(token_addr, is_buy, price) {
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
}
