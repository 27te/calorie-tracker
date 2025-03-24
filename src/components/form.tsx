import type { Category, Activity } from '../types';
import { categories } from '../data/categories';
import { ChangeEvent, Dispatch, FormEvent, useState } from 'react';
import { ActivityActions } from '../reducers/activity.reducer';

type FormProps = {
  dispatch: Dispatch<ActivityActions>;
};
const Initial_Values: Activity = {
  id: crypto.randomUUID(),
  category: 1,
  name: '',
  calories: 0,
};

const Form = ({ dispatch }: FormProps) => {
  const [activity, setActivity] = useState<Activity>(Initial_Values);

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>,
  ) => {
    const isNumberField = ['category', 'calories'].includes(e.target.id);
    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value,
    });
  };

  const isValidActivity = () => {
    const { name, calories } = activity;
    return name.trim() !== '' && calories > 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({
      type: 'save-activity',
      payload: { newActivity: activity },
    });
    setActivity({ ...Initial_Values, id: crypto.randomUUID() });
  };

  return (
    <form
      className='space-y-3 bg-white rounded-lg p-10 shadow'
      onSubmit={handleSubmit}
    >
      <div className='grid grid-cols-1 gap-3'>
        <label htmlFor='category'>Categorías:</label>
        <select
          id='category'
          className='border border-slate-300 p-2 rounded-lg w-full bg-white'
          value={activity.category}
          onChange={handleChange}
        >
          {categories.map((item: Category) => (
            <option value={item.id} key={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className='grid grid-cols-1 gap-3'>
        <label htmlFor='name'>Actividad:</label>
        <input
          type='text'
          id='name'
          value={activity.name}
          onChange={handleChange}
          className='border border-slate-300 p-2 rounded-lg w-full bg-white'
          placeholder='Ej. Hamburguesa, Ensalada de frutas, Yogurt'
        />
      </div>
      <div className='grid grid-cols-1 gap-3'>
        <label htmlFor='calories'>Calorias:</label>
        <input
          type='text'
          id='calories'
          value={activity.calories}
          onChange={handleChange}
          className='border border-slate-300 p-2 rounded-lg w-full bg-white'
          placeholder='Ej. 300 o 500'
        />
      </div>
      <input
        type='submit'
        value={`Guardar ${activity.category === 1 ? 'Comida' : 'Ejercicio'}`}
        className='bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-50'
        disabled={!isValidActivity()}
      />
    </form>
  );
};

export default Form;
