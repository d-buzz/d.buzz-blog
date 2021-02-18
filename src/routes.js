import { 
  AppFrame,
  Home,
  Trending,
  Latest,
  Content,
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
    ],
  },
]
 
export default routes