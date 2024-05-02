import React, { lazy } from 'react';
import { useAuth } from '../Context/AuthContext';


const Rou = [
    {
        path: '/',
        exact: true,
        breadcrumb: 'Home',
        element: lazy(() => import('../Home')),
    },
    {
        path: '/cart',
        exact: true,
        breadcrumb: 'Shop' ,
        element: lazy(() => import('../Cart')),
    },
    {
        path: '/shop',
        exact: true,
        element: lazy(() => import('../Shop')),
    },
    {
        path: '/shopdetails',
        exact: true,
        element: lazy(() => import('../ShopDetails')),
    },
    {
        path: '/checkout',
        exact: true,
        element: lazy(() => import('../Checkout')),
    },
    {
        path: '/contact',
        exact: true,
        element: lazy(() => import('../Contact')),
    },
    {
        path: '/whishlist',
        exact: true,
        element: lazy(() => import('../Whislist')),
    },
    {
        path: '/routenotmatch',
        exact: true,
        element: lazy(() => import('../RoutNotmatch')),
    },
    {
        path: '/login',
        exact: true,
        element: lazy(() => import('../Login')),
    },
    {
        path: '/result',
        exact: true,
        element: lazy(() => import('../Result')),
    },
    {
        path: '/abc',
        exact: true,
        element: lazy(() => import('../Doenload_app')),
    },
    {
        path: '',
        exact: true,
        element: lazy(() => import('../Doenload_app')),
    },
    {
        path: '/demodata',
        exact: true,
        element: lazy(() => import('../demodata')),
    },
]

export default Rou