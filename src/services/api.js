import {api, auth, broadcast, formatter} from '@hiveio/hive-js'
// import {hash} from '@hiveio/hive-js/lib/auth/ecc'
import {Promise, 
  // reject
} from 'bluebird'
import {v4 as uuidv4} from 'uuid'
import appConfig from 'config'
// import config from 'config'
import axios from 'axios'
// import getSlug from 'speakingurl'
import moment from 'moment'
// import {ChainTypes, makeBitMaskFilter} from '@hiveio/hive-js/lib/auth/serializer'
import 'react-app-polyfill/stable'
import {calculateOverhead, stripHtml} from 'services/helper'
// import {hacManualTransaction, hacUserAuth, hacVote} from "@mintrawa/hive-auth-client"

const searchUrl = `${appConfig.SEARCH_API}/search`
const scrapeUrl = `${appConfig.SCRAPE_API}/scrape`
const imageUrl = `${appConfig.IMAGE_API}`
// const videoUrl = `${appConfig.VIDEO_API}`
// const censorUrl = `${appConfig.CENSOR_API}`
// const priceChartURL = `${appConfig.PRICE_API}`

// const APP_META = {
//   name: config.APP_NAME,
//   description: config.APP_DESCRIPTION,
//   icon: config.APP_ICON,
// }


const visited = []

// const defaultNode = process.env.REACT_APP_DEFAULT_RPC_NODEpa


export const uploadImage = async (data, progress) => {
  console.log('progress',progress)
  console.log('data',data)
  const formData = new FormData()
  formData.append('file', data)
  console.log('data',data)
  console.log('imageUrl',imageUrl)
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: 'POST',
        url: imageUrl,
        headers: {'Content-Type': 'multipart/form-data'},
        data: formData,
        validateStatus: () => true,
        onUploadProgress: (progressEvent) => {
          const {loaded, total} = progressEvent
          const percent = Math.floor((loaded * 100) / total)
          progress(percent)
        },
      })

      resolve(response.data)
    } catch (error) {
      reject(error)
    }
  })

}
// export const calculateOverhead = (content) => {
//   let urls = getUrls(content) || []
  
//   const markdown = content?.match(/#+\s|[*]|\s+&nbsp;+\s|\s+$/gm) || []

//   let overhead = 0

//   // let overheadItems = []

//   if(markdown.length>0) {
//     markdown.forEach((item) => {
//       // overheadItems.push(item)
//       overhead += item.length
//     })
//   }
  
//   if((urls.length) > 3) {
//     urls = urls.slice(0, 2)
//   }
  
//   if(urls && urls.length <= 3){
//     urls.forEach((item) => {
//       // overheadItems.push(item)
//       overhead += item.length
//     })
//   }

//   // console.log(overheadItems)

//   return overhead
// }
export const invokeFilter = (item) => {
  const body = stripHtml(item.body)
  const overhead = calculateOverhead(body)

  const length = body.length - overhead
  return (length >= 280)
}

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
    const params = [null, 100]
    api.call('condenser_api.get_trending_tags', params, (err, data) => {
      if(err) {
        reject(err)
      } else {
        resolve(data)
      }
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
    const params = [username]
    api.call('condenser_api.get_accounts', params, async(err, data) => {
      if (err) {
        reject(err)
        console.log(err)
      } else {
        console.log(data)
        data.forEach(async(item, index) => {
          const repscore = item.reputation
          let score = formatter.reputation(repscore)
    
          if (!score || score < 25) {
            score = 25
          }
    
          data[index].reputation = score
    
          if (checkFollow) {
    
            const follow_count = await fetchFollowCount(item.name)
            data[index].follow_count = follow_count
    
            let isFollowed = false
    
            if (user) {
              isFollowed = await isFollowing(user.username, item.name)
            }
    
            data[index].isFollowed = isFollowed
          }
    
          visited.push(data[index])
    
          if (index === data.length - 1) {
            resolve(data)
          }
        })
      }
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


export const callBridge = async(method, params, appendParams = true, tags = '') => {
  return new Promise((resolve, reject) => {

    if (appendParams) {
      params = { 'tag': tags, limit: 10, ...params}
    }

    api.call('bridge.' + method, params, async(err, data) => {
      if (err) {
        reject(err)
      }else {
        let lastResult = []

        if (data.length !== 0) {
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
    item.body = item.body.replace('<br /><br /> Posted via <a href="https://blog.d.buzz" data-link="promote-link">Blog | D.Buzz</a>', '')
    item.body = item.body.replace('<br /><br /> Posted via <a href="https://nextblog.d.buzz/" data-link="promote-link">Blog | D.Buzz</a>', '')
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
        if (!response.success) {
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
  
  return new Promise((resolve, reject) => {
    broadcast.send(
      {
        extensions: [],
        operations,
      },
      keys,
      (error, result) => {
        if (error) {
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

export const fetchContent = (author, permlink) => {
  return new Promise((resolve, reject) => {
    const params = [author, permlink]
    api.call('condenser_api.get_content', params, async(err, data) => {
      if(err) {
        reject(err)
      } else {
        data.body = data.body.replace('<br /><br /> Posted via <a href="https://d.buzz" data-link="promote-link">D.Buzz</a>', '')
        data.body = data.body.replace('<br /><br /> Posted via <a href="https://blog.d.buzz" data-link="promote-link">Blog | D.Buzz</a>', '')
        const profile = await fetchProfile([data.author])
        data.profile = profile[0]
        resolve(data)
      }
    })
  })
}

export const fetchDiscussions = (author, permlink) => {
  return new Promise((resolve, reject) => {
    const params = {"author":`${author}`, "permlink": `${permlink}`,
    }
    api.call('bridge.get_discussion', params, async(err, data) => {
      if(err) {
        reject(err)
        console.log(err)
      } else {
        const authors = []
        let profile = []

        console.log(data)

        const arr = Object.values(data)
        const uniqueAuthors = [ ...new Set(arr.map(item => item.author)) ]

        uniqueAuthors.forEach((item) => {
          if(!authors.includes(item)) {
            const profileVisited = visited.filter((prof) => prof.name === item)
            if(!authors.includes(item) && profileVisited.length === 0) {
              authors.push(item)
            } else if(profileVisited.length !== 0) {
              profile.push(profileVisited[0])
            }
          }
        })

        console.log(authors)

        if(authors.length !== 0) {
          const info = await fetchProfile(authors)
          profile = [ ...profile, ...info]
          console.log(info)
        }

        const parent = data[`${author}/${permlink}`]

        const getChildren = (reply) => {
          const { replies } = reply
          const children = []

          replies.forEach(async(item) => {
            let content = data[item]

            if(!content) {
              content = item
            }

            content.body = content.body.replace('<br /><br /> Posted via <a href="https://d.buzz" data-link="promote-link">D.Buzz</a>', '')
            content.body = content.body.replace('<br /><br /> Posted via <a href="https://next.d.buzz/" data-link="promote-link">D.Buzz</a>', '')
            content.body = content.body.replace('<br /><br /> Posted via <a href="https://blog.d.buzz" data-link="promote-link">Blog | D.Buzz</a>', '')
            content.body = content.body.replace('<br /><br /> Posted via <a href="https://nextblog.d.buzz/" data-link="promote-link">Blog | D.Buzz</a>', '')

            if(content.replies.length !== 0) {
              const child = getChildren(content)
              content.replies = child
            }

            const info = profile.filter((prof) => prof.name === content.author)
            visited.push(info[0])
            content.profile = info[0]
            children.push(content)
          })

          return children
        }

        const children = getChildren(parent)
        parent.replies = children

        let replies = parent.replies
        replies = replies.reverse()
        resolve(replies)
      }
    })
  })
}

export const uploadIpfsImage = async(data) => {
  const formData = new FormData()
  formData.append('image', data)

  return new Promise(async(resolve, reject) => {
    axios({
      method: 'POST',
      url: `${imageUrl}/upload`,
      key: 'image',
      headers: {'Content-Type': 'multipart/form-data' },
      data: formData,
    }).then(async(result) => {
      const data = result.data
      resolve(data)

    }).catch((error) => {
      reject(error)
    })
  })
}

export const generatePostOperations = (account, title, body, tags, payout, perm) => {
  const json_metadata = createMeta(tags)

  const permlink = perm === null ? createPermlink(title) : perm

  const operations = []

  return new Promise((resolve) => {
    const op_comment = [
      'comment',
      {
        'author': account,
        'title': stripHtml(title),
        'body': `${body.trim()}`,
        'parent_author': '',
        // 'parent_permlink': `${appConfig.TAG}`,
        'parent_permlink': `blog`,
        permlink,
        json_metadata,
      },
    ]

    operations.push(op_comment)

    const max_accepted_payout = `${payout.toFixed(3)} HBD`
    const extensions = []


    if (payout === 0) {
      extensions.push([
        0,
        {
          beneficiaries:
            [
              {account: 'null', weight: 10000},
            ],
        },
      ])
    }


    const op_comment_options = [
      'comment_options',
      {
        'author': account,
        permlink,
        max_accepted_payout,
        'percent_hbd': 10000,
        'allow_votes': true,
        'allow_curation_rewards': true,
        extensions,
      },
    ]

    operations.push(op_comment_options)

    resolve(operations)
  })

}

export const createMeta = (tags = []) => {

  const uniqueTags = [ ...new Set(tags.map(item => item)) ]
  // const uniqueTags = [ ...tags ]

  const meta = {
    app: `blogDBuzz/v3.0.0`,
    tags: uniqueTags,
    shortForm: true,
  }

  return JSON.stringify(meta)
}

export const createPermlink = () => {
  const permlink = new Array(21).join().replace(/(.|$)/g, function(){return ((Math.random()*36)|0).toString(36)})
  return permlink
}

export const fetchGlobalProperties = () => {
  return new Promise((resolve, reject) => {
    const params = []
    api.call('condenser_api.get_dynamic_global_properties', params, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

export const fetchSingleProfile = (account) => {
  const user = localStorage.getItem('active')

  return new Promise((resolve, reject) => {
    const params = {"account": `${account}`}
    api.call('bridge.get_profile', params, async(err, data) => {
      if (err) {
        reject(err)
      } else {
        let isFollowed = false

        if(user && `${user}`.trim() !== '') {
          // const { username } = readSession(user)
          if(user !== data.name) {
            isFollowed = await isFollowing(user, data.name)
          }
        }

        data.isFollowed = isFollowed
        resolve(data)
        console.log(data)
      }
    })
  })
}

export const fetchAccounts = (username) => {
  return new Promise((resolve, reject) => {
    const params = [[username]]
    api.call('condenser_api.get_accounts', params, (err, data) => {
      if(err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

export const fetchAccountBlog = (account, start_permlink = null, start_author = null, sort = 'blog') => {
  return new Promise((resolve, reject) => {
    const params = {
      sort,
      account,
      observer: account,
      start_author: start_author,
      start_permlink,
      limit: 100,
    }

    api.call('bridge.get_account_posts', params, async(err, data) => {
      if(err) {
        reject(err)
      }else {
        removeFootNote(data)

        let lastResult = []

        if(data.length !== 0) {
          lastResult = [data[data.length-1]]
        }

        data = [...data, ...lastResult]

        if(data.length === 0) {
          data = []
        }
        resolve(data)
      }
    })
  })
}

export const generateFollowOperation = (follower, following) => {
  return new Promise((resolve) => {
    const json = JSON.stringify(["follow",{"follower":`${follower}`,"following":`${following}`,"what":["blog"]}])

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

export const generateUnfollowOperation = (follower, following) => {
  return new Promise((resolve) => {
    const json = JSON.stringify(["follow",{"follower":`${follower}`,"following":`${following}`,"what":[]}])

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

export const generateUpdateOperation = (parent_author, parent_permlink, author, permlink, title, body, json_metadata) => {

  return new Promise((resolve) => {
    const op_comment = [[
      'comment',
      {
        parent_author,
        parent_permlink,
        author,
        permlink,
        title,
        body,
        json_metadata,
      },
    ]]

    resolve(op_comment)
  })
}

export const keychainUpvote = (username, permlink, author, weight) => {
  return new Promise((resolve, reject) => {
    window.hive_keychain.requestVote(
      username,
      permlink,
      author,
      weight,
      response => {
        if(response.success) {
          resolve(response)
        } else {
          reject(response.error.code)
        }
      },
    )
  })
}

export const broadcastVote = (wif, voter, author, permlink, weight) => {
  return new Promise((resolve, reject) => {
    broadcast.voteAsync(wif, voter, author, permlink, weight)
      .then((result) => {
        resolve(result)
      }).catch((error) => {
        reject(error.code)
      })
  })
}

export const generateReplyOperation = (account, body, parent_author, parent_permlink) => {

  const json_metadata = createMeta()
  let permlink = createPermlink(body.substring(0, 100))
  permlink = `re-${permlink}`
  return new Promise((resolve) => {

    const op_comment = [[
      'comment',
      {
        'author': account,
        'title': '',
        'body': `${body.trim()}`,
        parent_author,
        parent_permlink,
        permlink,
        json_metadata,
      },
    ]]

    resolve(op_comment)
  })
}

export const generateClearNotificationOperation = (username, lastNotification) => {
  return new Promise((resolve) => {

    let date = moment().utc().format()
    date = `${date}`.replace('Z', '')

    const json = JSON.stringify(["setLastRead",{ date }])

    const operation = [
      [
        'custom_json',
        {
          'required_auths': [],
          'required_posting_auths': [username],
          'id': 'notify',
          json,
        },
      ],
    ]

    resolve(operation)
  })
}

export const getAccountNotifications = async(account) => {
  return new Promise((resolve, reject) => {
    const params = { account, limit:100 }
    api.call('bridge.account_notifications', params, (err, data) => {
      if(err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

export const getUnreadNotificationsCount = async(account) => {
  return new Promise((resolve, reject) => {
    const params = { account }
    api.call('bridge.unread_notifications', params, (err, data) => {
      if(err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

export const searchPostTags = (tag) => {
  return new Promise(async(resolve, reject) => {
    const body = { tag }

    axios({
      method: 'POST',
      url: `${searchUrl}/tags`,
      data: body,
    }).then(async(result) => {
      const data = result.data

      data.results = data.results.filter(item => invokeFilter(item))
      removeFootNote(data.results)

      resolve(data)
    }).catch((error) => {
      reject(error)
    })
  })
}

export const searchPostAuthor = (author) => {
  return new Promise(async(resolve, reject) => {
    const body = { author }

    axios({
      method: 'POST',
      url: `${searchUrl}/author`,
      data: body,
    }).then(async(result) => {
      const data = result.data

      if(data.results.length !== 0) {
        const getProfiledata = mapFetchProfile(data.results, false)
        await Promise.all([getProfiledata])
        data.results = data.results.filter((item) => item.body.length >= 280)
      }

      resolve(data)
    }).catch((error) => {
      reject(error)
    })

  })
}

export const mapFetchProfile = (data, checkFollow = false) => {
  return new Promise(async(resolve, reject) => {
    try {
      let count = 0
      const uniqueAuthors = [ ...new Set(data.map(item => item.author)) ]
      let profiles = []

      uniqueAuthors.forEach((item, index) => {
        const profileVisited = visited.filter((profile) => profile.name === item)
        if(profileVisited.length !== 0) {
          profiles.push(profileVisited[0])
          uniqueAuthors.splice(index, 1)
        }
      })

      let profilesFetch = []

      if(uniqueAuthors.length !== 0) {
        profilesFetch = await fetchProfile(uniqueAuthors, checkFollow)
      }

      profiles = [...profiles, ...profilesFetch]

      data.forEach(async(item, index) => {
        const info = profiles.filter((profile) => profile.name === item.author)
        data[index].profile = info[0]

        if(count === (data.length - 1)) {
          resolve(true)
        }

        count += 1
      })
    } catch(error) {
      reject(error)
    }
  })
}

export const searchPostGeneral = (query) => {
  return new Promise(async(resolve, reject) => {
    const body = { query }

    axios({
      method: 'POST',
      url: `${searchUrl}/query`,
      data: body,
    }).then(async(result) => {
      const data = result.data

      if(data.results.length !== 0) {
        const getProfiledata = mapFetchProfile(data.results, false)
        await Promise.all([getProfiledata])
        data.results = data.results.filter((item) => item.body.length >= 280)
      }

      resolve(data)
    }).catch((error) => {
      reject(error)
    })

  })
}

export const searchPeople = (username) => {
  return new Promise((resolve, reject) => {
    const params = { account_lower_bound: username, limit: 30 }

    api.call('reputation_api.get_account_reputations', params, async(err, data) => {
      if (err) {
        reject(err)
      }else {

        if(data.reputations.length !== 0) {
          data.reputations.forEach((item, index) => {
            let score = item.reputation ? formatter.reputation(item.reputation) : 25
            if(!score || score < 25) {
              score = 25
            }
            data.reputations[index].repscore = score
            data.reputations[index].author = item.account
          })

          const getProfiledata = mapFetchProfile(data.reputations)
          await Promise.all([getProfiledata])
        }

        resolve(data)
      }
    })

  })
}

export const getMutePattern = () => {
  return new Promise((resolve) => {
    axios.get('https://endpoint.d.buzz/pattern.json')
      .then(function (result) {
        resolve(result.data)
      })
  })
}
