import Form from './components/form';
import { useEffect, useReducer } from 'react';
import { activityReducer, initialState } from './reducers/activity.reducer';
import ActivityList from './components/activityList';

function App() {
  const [state, dispatch] = useReducer(activityReducer, initialState);

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities));
  }, [state.activities]);

  return (
    <>
      <header className='bg-lime-600 py-3'>
        <div className='max-w-4xl mx-auto flex justify-between items-center'>
          <h1 className='text-center text-lg font-bold text-white uppercase'>
            Contador de Calorías
          </h1>
          <button
            className='bg-zinc-700 px-2 py-1 rounded-sm cursor-pointer text-white disabled:opacity-50 disabled:cursor-none'
            disabled={!state.activities.length}
            onClick={() => dispatch({ type: 'restart-app' })}
          >
            Reiniciar App
          </button>
        </div>
      </header>
      <section className='bg-lime-500 py-20 px-5'>
        <div className='max-w-4xl mx-auto'>
          <Form dispatch={dispatch} state={state} />
        </div>
      </section>
      <section className='p-10 mx-auto max-w-4xl'>
        <ActivityList activities={state.activities} dispatch={dispatch} />
      </section>
    </>
  );
}

export default App;
