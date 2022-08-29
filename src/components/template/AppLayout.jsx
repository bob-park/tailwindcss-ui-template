import React, { Fragment, useEffect } from 'react';

import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import { Disclosure, Menu, Transition } from '@headlessui/react';

import { userSelector, userActions } from 'store/modules/user';

import LoginPage from 'pages/user/LoginPage';

import routes from 'routes';

const { isLoggedOut } = userActions;

const user = {
  name: 'Bob Park',
  email: 'hwpark@malgn.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};
const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Admin', href: '/admin', isAdmin: true },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function BaseLayout() {
  const localtion = useLocation();
  const naviate = useNavigate();
  const dispatch = useDispatch();

  const { isLoggedIn, user: loginUser } = useSelector(userSelector.all);

  useEffect(() => {
    !isLoggedIn && naviate('/login');

    console.log(loginUser);
  }, [isLoggedIn]);

  const handleMenuItemClick = (e, href) => {
    e.preventDefault();
    naviate(href);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(isLoggedOut());
  };

  const userNavigation = [
    { name: 'Sign out', href: '#', onClick: handleLogout },
  ];

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-8 w-8"
                        src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=500"
                        alt="Workflow"
                      />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation
                          .filter(
                            (item) =>
                              !item.isAdmin || 'ROLE_ADMIN' === loginUser?.role,
                          )
                          .map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className={classNames(
                                item.href == localtion.pathname
                                  ? 'bg-gray-600 text-white'
                                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'px-3 py-2 rounded-md text-sm font-medium',
                              )}
                              aria-current={
                                item.href == localtion.pathname
                                  ? 'page'
                                  : undefined
                              }
                              onClick={(e) => handleMenuItemClick(e, item.href)}
                            >
                              {item.name}
                            </a>
                          ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      {/* Profile dropdown */}
                      <Menu as="div" className="ml-3 relative">
                        <div>
                          <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src={user.imageUrl}
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <a
                                    href={item.href}
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700',
                                    )}
                                    onClick={item.onClick}
                                  >
                                    {item.name}
                                  </a>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block px-3 py-2 rounded-md text-base font-medium',
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="pt-4 pb-3 border-t border-gray-700">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {user.name}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        {user.email}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 px-2 space-y-1">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <div className="pt-6 container">
          <Routes>
            {routes.map((route) => (
              <Route {...route} key={route.name} />
            ))}
          </Routes>
        </div>
      </div>
    </>
  );
}

export default function AppLayout() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<BaseLayout />} />
      </Routes>
    </BrowserRouter>
  );
}
