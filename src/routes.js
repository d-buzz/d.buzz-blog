import { 
  AppFrame,
  Home,
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
    ],
  },
]
 
export default routes