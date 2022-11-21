import React, { useContext, useEffect } from 'react';
import Form from './components/Form';
import List from './components/List';
import { Context } from './context/Context';

const App = () => {

  const {loading, fetchTodos, todos} = useContext(Context)

  useEffect(() => {
      fetchTodos()
    }, [])

  return (
    <>
      <Form />
      {loading
          ? <p>Loading..</p>
          : <List todos={todos} />
      }
    </>
  );
};

export default App;