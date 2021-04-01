import { 
  AppFrame,
  Home,
  Trending,
  Latest,
  Content,
  Profile,
  AccountPosts,
  AccountReplies,
  AccountComments,
} from 'components'
  
const routes =  [
  {
    component: AppFrame,
    routes: [
      {
        path: "/",
        exact: true,
        component: Home,
      },
      {
        path: '/trending',
        exact: true,
        component: Trending,
      },
      {
        path: '/latest',
        exact: true,
        component: Latest,
      },
      {
        path: '/@:username/c/:permlink',
        exact: true,
        component: Content,
      },
      {
        path: '/@:username',
        component: Profile,
        routes: [
          {
            path: '/@:username/',
            exact: true,
            component: AccountPosts,
          },
          {
            path: '/@:username/t/buzz',
            exact: true,
            component: AccountPosts,
          },
          {
            path: '/@:username/t/replies',
            exact: true,
            component: AccountReplies,
          },
          {
            path: '/@:username/t/comments',
            exact: true,
            component: AccountComments,
          },
        ],
      },
    ],
  },
]
 
export default routes