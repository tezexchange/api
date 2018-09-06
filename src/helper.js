import bs58check from 'bs58check' 

export function human_date(d, need_minutes) {
  const year = d.getFullYear()
  const month = (1 + d.getMonth() + '').padStart(2, '0')
  const day = (d.getDate() + '').padStart(2, '0')

  if (need_minutes) {
    const hours = (d.getHours() + '').padStart(2, '0')
    const minutes = (d.getMinutes() + '').padStart(2, '0')
    return `${year}-${month}-${day} ${hours}:${minutes}`
  } else {
    return `${year}-${month}-${day}`
  }
}

const prefix = {
  contract: [2,90,121],
  identity: [6, 161, 159],
  public_key: [13, 15, 37, 217],
  secret_key: [43, 246, 78, 7],
  edesk: [7,90,60,179,41],
  signature: [9, 245, 205, 134, 18],
  operation: [5, 116]
}

export function enc58(name, input) {
  const input_arr = input.match(/\w{2}/g).map(x => parseInt(x, 16))
  ;({
    identity: () => {
      input_arr.shift()
      input_arr.shift()
    },
    contract: () => {
      input_arr.pop()
      input_arr.shift()
    }
  })[name]()
  return bs58check.encode(new Buffer(prefix[name].concat(input_arr)))
}

export function makePlain(json) {
  const result = []

  const non_push_prims = new Set(['Pair'])
  const walk = (curr) => {
    if (curr.prim) {
      if (!non_push_prims.has(curr.prim)) {
        result.push(curr.prim)
      } 

      curr.args.forEach(walk)
    } else {
      for (const key in curr) {
        result.push(curr[key])
      }
    }
  }

  walk(json)
  return result
}

export function getDate(x) {
  return new Date(isNaN(x * 1000) ? x : x * 1000)
}