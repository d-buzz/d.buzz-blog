import axios from 'axios'
import appConfig from 'config'
import { v4 as uuidv4 } from 'uuid'
import { 
  api,
  auth,
  broadcast,
  config,
  formatter,
} from '@hiveio/hive-js'

config.set('rebranded_api', true)
broadcast.updateOperations()

const visited = []

const scrapeUrl = `${appConfig.SCRAPE_API}/scrape`

export const keychainSignIn = (username) => {
  const challenge = { token: uuidv4() }
  const buffer = JSON.stringify(challenge, null, 0)

  return new Promise((resolve) => {
    window.hive_keychain.requestSignBuffer(
      username, 
      buffer,
      'Posting',
      response => {
        resolve(response)
      },
    )
  })
}

export const packLoginData = (username, password) => {
  return new Buffer(
    `${username}\t${password}`,
  ).toString('hex')
}

export const isWifValid = (password, pubWif) => {
  return auth.wifIsValid(password, pubWif)
}

export const getCommunityRole = async(observer) => {
  return new Promise((resolve, reject) => {
    const params = { "name": `${appConfig.TAG}`, observer }
    api.call('bridge.get_community', params, async(err, data) => {
      if (err) {
        reject(err)
      }else {
        resolve(data.context.subscribed)
      }
    })
  })
}

export const fetchMuteList = (user) => {
  return new Promise((resolve, reject) => {
    api.call('condenser_api.get_following', [user, null, 'ignore', 1000], async(err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

export const getBestRpcNode = () => {
  return new Promise((resolve) => {
    axios.get('https://beacon.peakd.com/api/best')
      .then(function (result) {
        console.log({result})
        resolve(result.data[0].endpoint)
      })
      .catch(function(error) {
        console.log({error})
        resolve('https://api.hive.blog')
      })
  })
}


//note: should be able to set a version for dbuzz blog also, since we are using the version of dbuzz.
export const checkVersion = () => {
  return new Promise((resolve) => {
    axios.get('https://blog.d.buzz/version.json')
      .then(function(result) {
        resolve(result.data)
      })
  })
}

const setRPCNode = () => {
  const node = localStorage.getItem('rpc')
  api.setOptions({ url: node })
}

export const fetchTrendingTags = () => {
  return new Promise((resolve, reject) => {
    // note: initialized due to needs to execute during first API call
    setRPCNode()
    api.getTrendingTagsAsync(null, 100)
      .then((result) => {
        resolve(result)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const fetchFollowCount = (username) => {
  return api.getFollowCountAsync(username)
    .then((result) => {
      return result
    })
    .catch((error) => {
      return error
    })
}

export const isFollowing = (follower, following) => {
  return new Promise((resolve, reject) => {
    const params = [follower, following]
    api.call('bridge.get_relationship_between_accounts', params, (err, data) => {
      if (err) {
        reject(err)
      }else {
        const { follows } = data
        resolve(follows)
      }
    })
  })
}

export const fetchProfile = (username, checkFollow = false) => {
  const user = JSON.parse(localStorage.getItem('user'))

  return new Promise((resolve, reject) => {
    api.getAccountsAsync(username)
      .then(async(result) => {
        result.forEach(async(item, index) => {
          const repscore = item.reputation
          let score = formatter.reputation(repscore)

          if(!score || score < 25) {
            score = 25
          }

          result[index].reputation = score

          if(checkFollow) {

            const follow_count = await fetchFollowCount(item.name)
            result[index].follow_count = follow_count

            let isFollowed = false

            if(user) {
              isFollowed = await isFollowing(user.username, item.name)
            }

            result[index].isFollowed = isFollowed
          }

          visited.push(result[index])

          if(index === result.length - 1) {
            resolve(result)
          }
        })

      }).catch((error) => {
        reject(error)
      })
  })
}

export const checkIfImage = (links) => {
  return new Promise(async(resolve, reject) => {

    const params = { links }

    const result = await axios.post(`${scrapeUrl}/generate`, params)

    resolve(result.data)
  })
}


export const callBridge = async(method, params, appendParams = true) => {
  return new Promise((resolve, reject) => {

    if(appendParams) {
      params = { 'tag': '', limit: 10, ...params}
    }

    api.call('bridge.' + method, params, async(err, data) => {
      if (err) {
        reject(err)
      }else {
        let lastResult = []

        if(data.length !== 0) {
          lastResult = [data[data.length-1]]
        }

        removeFootNote(data)
        data = [...data, ...lastResult] 

        resolve(data)
      }
    })
  })
}

export const getLinkMeta = (url) => {
  return new Promise(async(resolve, reject) => {

    axios.get(`${scrapeUrl}?url=${url}`)
      .then(function (result) {
        const data = result.data
        resolve(data)
      })
      .catch(function (error) {
        reject(error)
      })
  })
}

export const invokeMuteFilter = (items, mutelist, opacityUsers = []) => {
  return items.filter((item) => !mutelist.includes(item.author) || opacityUsers.includes(item.author))
}

export const removeFootNote = (data) => {
  return data.forEach((item) => {
    item.body = item.body.replace('<br /><br /> Posted via <a href="https://d.buzz" data-link="promote-link">D.Buzz</a>', '')
    item.body = item.body.replace('<br /><br /> Posted via <a href="https://next.d.buzz/" data-link="promote-link">D.Buzz</a>', '')
  })
}

export const generateMuteOperation = (follower, following) => {
  return new Promise((resolve) => {
    const json = JSON.stringify(["follow",{"follower":`${follower}`,"following":`${following}`,"what":["ignore"]}])

    const operation = [
      [
        'custom_json',
        {
          'required_auths': [],
          'required_posting_auths': [follower],
          'id': 'follow',
          json,
        },
      ],
    ]

    resolve(operation)
  })
}

export const broadcastKeychainOperation = (account, operations, key = 'Posting') => {
  return new Promise((resolve, reject) => {
    window.hive_keychain.requestBroadcast(
      account,
      operations,
      key,
      response => {
        if(!response.success) {
          reject(response.error.code)
        } else {
          resolve(response)
        }
      },
    )
  })
}

export const extractLoginData = (data) => {
  return new Buffer(data, 'hex').toString().split('\t')
}

export const broadcastOperation = (operations, keys) => {
  config.set('rebranded_api', true)
  broadcast.updateOperations()
  return new Promise((resolve, reject) => {
    broadcast.send(
      {
        extensions: [],
        operations,
      },
      keys,
      (error, result) => {
        console.log(error)
        if(error) {
          reject(error.code)
        } else {
          resolve({
            success: true,
            result,
          })
        }
      },
    )
  })
}