import { 
  AppFrame,
  Home,
  Trending,
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
    ],
  },
]
 
export default routes