import parameters from './parameters'
import { CONTRACTS, getContract } from './contracts.js'

export default class Api {
  constructor(tzclient, tezbridge, version) {
    this.client = tzclient || tezbridge
    this.client_name = tzclient ? 'tzclient' : 'tezbridge'
    this.version = version || CONTRACTS.selected
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
}