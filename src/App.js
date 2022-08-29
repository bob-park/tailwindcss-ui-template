import React from 'react';

import { Provider } from 'react-redux';
import rootStore from 'store';

import AppLayout from 'components/template/AppLayout';

function App() {
  return (
    <Provider store={rootStore}>
      <AppLayout />
    </Provider>
  );
}

export default App;
