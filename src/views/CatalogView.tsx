import React from 'react';
import { LayoutGrid, List, Search } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { useStore } from '../context/StoreContext';
import { HOT_IDS, PRODUCTS } from '../data/products';

export const CatalogView: React.FC = () => {
  const { cat, searchQuery, viewMode, setViewMode, inShelf } = useStore();

  const q = searchQuery.trim().toLowerCase();
  const filtered = PRODUCTS.filter((p) => {
    const matchCat =
      cat === 'Hammasi' || (cat === 'Javonim' ? inShelf(p.id) : p.cat === cat);
    const matchQuery = !q || `${p.name} ${p.vol}`.toLowerCase().includes(q);
    return matchCat && matchQuery;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-xs font-semibold text-stone-500 dark:text-stone-400 tabular-nums">
          {filtered.length} ta mahsulot
        </span>

        <div className="inline-flex items-center gap-0.5 bg-stone-200/80 dark:bg-stone-800 rounded-lg p-0.5">
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            className={`inline-flex items-center gap-1 h-7 px-2.5 rounded-md text-xs font-bold transition-all ${
              viewMode === 'grid'
                ? 'bg-white dark:bg-[#1E1A1B] text-[#800020] dark:text-[#F4728A] shadow-xs'
                : 'text-stone-500 dark:text-stone-400'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Katak</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('row')}
            className={`inline-flex items-center gap-1 h-7 px-2.5 rounded-md text-xs font-bold transition-all ${
              viewMode === 'row'
                ? 'bg-white dark:bg-[#1E1A1B] text-[#800020] dark:text-[#F4728A] shadow-xs'
                : 'text-stone-500 dark:text-stone-400'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>Keng</span>
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="py-12 px-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#FBECEF] dark:bg-[#361820] text-[#800020] dark:text-[#F4728A] flex items-center justify-center mx-auto mb-3">
            <Search className="w-7 h-7" />
          </div>
          <p className="text-sm font-medium text-stone-500 dark:text-stone-400">
            Topilmadi. Boshqacha yozib ko'ring: «anor», «0,5»
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {filtered.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              mode="grid"
              showHotBadge={HOT_IDS.includes(p.id)}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {filtered.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              mode="row"
              showHotBadge={HOT_IDS.includes(p.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
