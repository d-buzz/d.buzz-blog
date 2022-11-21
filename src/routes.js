import React from 'react'

const AppFrame = React.lazy(() => import('./components/layouts/AppFrame'))
const Home = React.lazy(() => import('./components/pages/Home'))
const Trending = React.lazy(() => import('./components/pages/Trending'))
const Latest = React.lazy(() => import('./components/pages/Latest'))
const Content = React.lazy(() => import('./components/pages/Content'))
const Profile = React.lazy(() => import('./components/pages/Profile'))
const AccountBlog = React.lazy(() => import('./components/sections/AccountBlog'))
const AccountReplies = React.lazy(() => import('./components/sections/AccountReplies'))
const AccountComments = React.lazy(() => import('./components/sections/AccountComments'))
const Notification = React.lazy(() => import('./components/pages/Notification'))
const Tags = React.lazy(() => import('./components/pages/Tags'))
const Search = React.lazy(() => import('./components/pages/Search'))
const SearchPosts = React.lazy(() => import('./components/sections/SearchPosts'))
const SearchPeople = React.lazy(() => import('./components/sections/SearchPeople'))


  
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