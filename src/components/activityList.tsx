import type { Activity } from '../types';
import { categories } from '../data/categories';
import { useMemo } from 'react';

type ActivityListProps = {
  activities: Activity[];
};
const ActivityList = ({ activities }: ActivityListProps) => {
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
      {activities.map((activity) => (
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
          <div></div>
        </div>
      ))}
    </>
  );
};

export default ActivityList;
