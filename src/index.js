import parameters from './parameters'
import { CONTRACTS, getTokens, getContract } from './contracts'
import { enc58, makePlain, getDate } from './helper'

export default class Api {
  constructor(tzclient, tezbridge, version) {
    this.client = tzclient || tezbridge
    this.client_name = tzclient ? 'tzclient' : tezbridge ? 'tezbridge' : undefined
    this.version = version || CONTRACTS.selected

    this.contracts = JSON.parse(JSON.stringify(CONTRACTS.versions[this.version]).replace(/CONTRACT\./g, ''))
    this.tokens = JSON.parse(JSON.stringify(getTokens()))
  }

  async getRewardInfo(pkh) {
    const pack_data = { "string": pkh }
    const pack_type = { "prim": "address" }

    const bytes = await this.getBytes(pack_data, pack_type)
    const hash = await this.getHash(bytes)
    
    const key = [[0,2], [2,4], [4,6], [6,8], [8,10], [10,undefined]].map(x => hash.slice(x[0], x[1])).join('/')
    const lock_state = await this.getBigMapValueByKey(key, 'reward')

    const contract_storage_url = `/context/contracts/${getContract('reward', this.version)}/storage`
    const storage = await this.getHeadCustom(contract_storage_url)

    const lock_state_plain = makePlain(lock_state)
    return {
      lockState: {
        locked_amount: lock_state_plain[0],
        last_withdraw_date: getDate(lock_state_plain[1])
      },
      rewards: storage.args[1].args[0].map(x => {
        const plain = makePlain(x)
        return {
          xtz_amount: plain[0],
          date: getDate(plain[1])
        }
      })
    }
  }

  async getOrders() {
    const { big_map, storage } = await this.getStorage('main')
    const order_lst = Object.values(big_map).map(x => {
      const result = makePlain(x)
      return {
        token: enc58('contract', result[0]),
        owner: enc58('identity', result[1]),
        is_buy: result[2].toLowerCase() === 'true' ? true : false,
        price: result[3],
        tez_amount: result[4],
        token_amount: result[5]
      }
    })

    return order_lst
  }

  getHeadCustom(path) {
    return ({
      tzclient() {
        return this.client.head_custom(path)
      },

      tezbridge() {
        return this.client({
          method: 'head_custom', 
          path
        })
      }
    })[this.client_name].call(this)
  }

  getBigMapValueByKey(key, contract_name) {
    return ({
      tzclient() {
        return this.client.big_map_with_key(key, getContract(contract_name, this.version))
      },

      tezbridge() {
        return this.client({
          method: 'big_map_with_key', 
          key, 
          contract: getContract(contract_name, this.version)
        })
      }
    })[this.client_name].call(this)
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
    })[this.client_name].call(this)
  }

  getHash(bytes) {
    return ({
      tzclient() {
        return this.client.hash_data(bytes)
      },

      tezbridge() {
        return this.client({
          method: 'hash_data',
          packed: bytes
        })
      }
    })[this.client_name].call(this)
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
    })[this.client_name].call(this)
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
    })[this.client_name].call(this)
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
