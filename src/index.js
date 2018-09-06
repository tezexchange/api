import parameters from './parameters'
import { CONTRACTS, getTokens, getContract } from './contracts.js'

export default class Api {
  constructor(tzclient, tezbridge, version) {
    this.client = tzclient || tezbridge
    this.client_name = tzclient ? 'tzclient' : tezbridge ? 'tezbridge' : undefined
    this.version = version || CONTRACTS.selected

    this.contracts = JSON.parse(JSON.stringify(CONTRACTS.versions[this.version]).replace(/CONTRACT\./g, ''))
    this.tokens = JSON.parse(JSON.stringify(getTokens()))
  }

  getStorage(name) {
    return ({
      tzclient() {
        return this.client.raw_storage(getContract(name, this.version))
      },

      tezbridge() {
        return this.client({
          method: 'raw_storage', 
          contract: getContract(name, this.version)
        })
      }
    })[this.client_name]()
  }

  getBytes(pack_data, pack_type) {
    return ({
      tzclient() {
        return this.client.pack_data(pack_data, pack_type)
      },

      tezbridge() {
        return this.client({
          method: 'pack_data',
          data: pack_data,
          type: pack_type
        })
      }
    })[this.client_name]()
  }

  basicTransfer(destination, parameters, xtz_amount) {
    return ({
      tzclient() {
        return this.client.transfer({
          destination, 
          amount: xtz_amount,
          parameters
        })
      },

      tezbridge() {
        return this.client({
          method: 'transfer', 
          destination, 
          amount: xtz_amount,
          parameters
        })
      }
    })[this.client_name]()
  }

  rewardWithDraw() {
    const parameters = parameters.rewardWithDraw(this.version)
    const destination = getContract('token', this.version)

    return this.basicTransfer(destination, parameters)
  }

  rewardUnlock() {
    const parameters = parameters.rewardUnlock(this.version)
    const destination = getContract('token', this.version)

    return this.basicTransfer(destination, parameters)
  }

  rewardLock(token_amount) {
    const parameters = parameters.rewardLock(token_amount, this.version)
    const destination = getContract('token', this.version)

    return this.basicTransfer(destination, parameters)
  }

  executeSelling(token_addr, price, owner, xtz_amount) {
    const parameters = parameters.executeSelling(token_addr, price, owner)
    const destination = getContract('main', this.version)

    return this.basicTransfer(destination, parameters, xtz_amount)
  }

  async executeBuying(token_addr, price, owner, token_amount) {
    const pack_data = { "prim": "Pair", "args": [ { "int": "1" }, { "int": price + '' } ] }
    const pack_type = { "prim": "pair", "args": [ { "prim": "nat" }, { "prim": "mutez" } ] }

    const bytes = await this.getBytes(pack_data, pack_type)

    const parameters = parameters.executeBuying(owner, token_amount, bytes, this.version)
    const destination = token_addr

    return this.basicTransfer(destination, parameters)
  }

  async createSelling(token_addr, price, token_amount) {
    const pack_data = { "prim": "Pair", "args": [ { "int": "0" }, { "int": price + '' } ] }
    const pack_type = { "prim": "pair", "args": [ { "prim": "nat" }, { "prim": "mutez" } ] }

    const bytes = await this.getBytes(pack_data, pack_type)

    const parameters = parameters.createSelling(token_amount, bytes, this.version)
    const destination = token_addr

    return this.basicTransfer(destination, parameters)
  }

  createBuying(token_addr, price, xtz_amount) {
    const parameters = parameters.createBuying(token_addr, price)
    const destination = getContract('main', this.version)

    return this.basicTransfer(destination, parameters, xtz_amount)
  }

  cancelOrder(token_addr, is_buy, price) {
    const parameters = parameters.cancelOrder(token_addr, is_buy, price) 
    const destination = getContract('main', this.version)

    return this.basicTransfer(destination, parameters)
  }
}
