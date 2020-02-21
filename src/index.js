import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router';

import './index.css';

import Users from './Containers/Users/users';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
        <Route path='/' component={Users} />
    </BrowserRouter>
  ,
  document.getElementById('root')
);