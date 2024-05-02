// import React from 'react';
// import { Navigate, Route } from 'react-router-dom';
// import { useAuth } from '../Context';

// const PrivateRoute = ({ element, path }) => {
//   const { user } = useAuth();

//   if (!user) {
//     // If user is not logged in, redirect to the login page
//     return <Navigate to="/login" />;
//   }

//   // If user is logged in, render the protected component
//   return <Route path={path} element={element} />;
// };

// export default PrivateRoute;
