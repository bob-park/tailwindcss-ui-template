import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { userActions, userSelector } from 'store/modules/user';

import LoginForm from 'components/user/LoginForm';

const { isLoggedIn } = userActions;

const dummyUsers = [
  {
    userId: 'admin',
    password: '12345',
    role: 'ROLE_ADMIN',
  },
  {
    userId: 'user',
    password: '12345',
    role: 'ROLE_USER',
  },
];

function LoginPage() {
  const [failMessage, setFailMessage] = useState('');

  const dispatch = useDispatch();

  const naviate = useNavigate();

  const onLogin = (userId, password) => {
    const index = dummyUsers.findIndex((item) => item.userId === userId);

    if (index < 0) {
      setFailMessage('사용자 아이디가 존재하지 않습니다.');
      return;
    }

    if (dummyUsers[index].password != password) {
      setFailMessage('패스워드가 올바르지 않습니다.');
      return;
    }

    dispatch(isLoggedIn(dummyUsers[index]));

    naviate('/');
  };

  return (
    <div className="flex flex-col">
      <div className="h-screen">
        <LoginForm failMessage={failMessage} onLogin={onLogin} />
      </div>
    </div>
  );
}

export default LoginPage;
