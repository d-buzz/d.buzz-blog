import { 
  AppFrame,
  Home,
  Trending,
  Latest,
  Content,
  Profile,
  AccountBlog,
  AccountReplies,
  AccountComments,
  Notification,
  Tags,
  Search,
  SearchPeople,
  SearchPosts,
} from 'components'
  
const routes =  [
  {
    component: AppFrame,
    routes: [
      {
        path: '/',
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
        path: '/notifications',
        exact: true,
        component: Notification,
      },
      {
        path: '/tags',
        component: Tags,
      },
      {
        path: '/search',
        component: Search,
        routes: [
          {
            path: '/search/people',
            exact: true,
            component: SearchPeople,
          },
          {
            path: '/search/posts',
            exact: true,
            component: SearchPosts,
          },
        ],
      },
      {
        path: '/ug/search',
        component: Search,
        routes: [
          {
            path: '/ug/search/people',
            exact: true,
            component: SearchPeople,
          },
          {
            path: '/ug/search/posts',
            exact: true,
            component: SearchPosts,
          },
        ],
      },
      {
        path: '/@:username',
        component: Profile,
        routes: [
          {
            path: '/@:username/',
            exact: true,
            component: AccountBlog,
          },
          {
            path: '/@:username/t/blog',
            exact: true,
            component: AccountBlog,
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