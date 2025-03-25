import type { Activity } from '../types';
import { categories } from '../data/categories';
import { Dispatch, useMemo } from 'react';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { ActivityActions } from '../reducers/activity.reducer';

type ActivityListProps = {
  activities: Activity[];
  dispatch: Dispatch<ActivityActions>;
};
const ActivityList = ({ activities, dispatch }: ActivityListProps) => {
  const categoryName = useMemo(
    () => (category: Activity['category']) =>
      categories.map((cat) => (cat.id === category ? cat.name : '')),
    [activities],
  );
  return (
    <>
      <h1 className='text-4xl font-bold text-slate-600 text-center'>
        Comida y Actividades
      </h1>
      {activities.length == 0 ? (
        <p className='text-2xl text-gray-600 text-center mt-10'>
          No hay registros...
        </p>
      ) : (
        activities.map((activity) => (
          <div
            key={activity.id}
            className='px-5 bg-white py-10 mt-5 flex justify-between rounded-md overflow-hidden shadow-sm'
          >
            <div className='space-y-2 relative'>
              <p
                className={`absolute -top-10 -left-5 px-10 py-2 text-white uppercase font-bold rounded-br-md ${
                  activity.category === 1 ? 'bg-lime-500' : 'bg-orange-500'
                }`}
              >
                {categoryName(+activity.category)}
              </p>
              <p className='text-2xl font-bold pt-5'>{activity.name}</p>
              <p className='font-bold text-4xl text-lime-500'>
                {activity.calories}
                {''}
                <span>Calorías</span>
              </p>
            </div>
            <div className='flex gap-5 items-center'>
              <button
                className='cursor-pointer'
                onClick={() =>
                  dispatch({
                    type: 'set-activity',
                    payload: { id: activity.id },
                  })
                }
              >
                <PencilSquareIcon className='size-8 text-gray-800' />
              </button>
              <button
                className='cursor-pointer'
                onClick={() =>
                  dispatch({
                    type: 'delete-activity',
                    payload: { id: activity.id },
                  })
                }
              >
                <TrashIcon className='size-8 text-red-400' />
              </button>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default ActivityList;
