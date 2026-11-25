import React from 'react';
import { formatSom, getTier } from '../data/products';

interface AnorSeedsProps {
  sum: number;
}

export const AnorSeeds: React.FC<AnorSeedsProps> = ({ sum }) => {
  const { cur, next } = getTier(sum);
  const count = Math.min(20, Math.floor(sum / 100000));

  return (
    <div className="bg-white dark:bg-[#1E1A1B] border border-stone-200 dark:border-stone-800 rounded-2xl p-3.5 shadow-xs">
      <div className="flex items-center justify-between gap-2 text-[13px]">
        <span className="font-bold text-stone-900 dark:text-stone-100">
          {cur ? (
            <>
              Chegirma:{' '}
              <span className="text-[#16A34A] dark:text-[#4ADE80] font-extrabold tabular-nums">
                {cur}% ✓
              </span>
            </>
          ) : (
            "Chegirma hali yo'q"
          )}
        </span>
        <span className="text-xs font-semibold text-stone-500 dark:text-stone-400 tabular-nums">
          {count}/20 dona
        </span>
      </div>

      <div className="grid grid-cols-20 gap-[3px] my-2.5">
        {Array.from({ length: 20 }, (_, i) => {
          const isOn = i < count;
          const isMarker = i === 4 || i === 9 || i === 19;
          return (
            <span
              key={i}
              className={`aspect-square rounded-[50%_50%_50%_2px] -rotate-45 transition-colors ${
                isOn
                  ? 'bg-[#800020] dark:bg-[#C81E45]'
                  : 'bg-stone-200 dark:bg-stone-800'
              } ${
                isMarker
                  ? 'outline outline-[1.5px] outline-[#800020] dark:outline-[#E04F6D] outline-offset-[1px]'
                  : ''
              }`}
            />
          );
        })}
      </div>

      <div className="grid grid-cols-20 text-[10.5px] font-bold text-stone-500 dark:text-stone-400 tabular-nums">
        <span className="col-span-5 text-right">5%</span>
        <span className="col-span-5 text-right">7%</span>
        <span className="col-span-10 text-right">10%</span>
      </div>

      <div className="mt-1.5 text-xs text-stone-500 dark:text-stone-400">
        {next ? (
          <>
            Yana{' '}
            <strong className="text-stone-900 dark:text-stone-100 tabular-nums">
              {formatSom(next[0] - sum)}
            </strong>{' '}
            → {next[1]}% chegirma
          </>
        ) : (
          <span className="text-[#16A34A] dark:text-[#4ADE80] font-semibold">
            Eng katta 10% chegirma ochildi
          </span>
        )}
      </div>
    </div>
  );
};
