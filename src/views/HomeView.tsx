import React from 'react';
import {
  ChevronRight,
  Droplet,
  MessageCircle,
  Plus,
  Repeat,
  TrendingDown,
  Truck,
} from 'lucide-react';
import { AnorSeeds } from '../components/AnorSeeds';
import { ProductCard, ShelfRowCard } from '../components/ProductCard';
import { useStore } from '../context/StoreContext';
import { HOT_IDS, PRODUCTS } from '../data/products';

export const HomeView: React.FC = () => {
  const {
    shelf,
    editShelf,
    setEditShelf,
    setSheet,
    fillShelfToCart,
    monthTotal,
    unreadChat,
    goTab,
    openPage,
  } = useStore();

  const sortedShelf = [...shelf].sort((a, b) => a[2] - a[3] - (b[2] - b[3]));

  const scrollToShelf = () => {
    const el = document.getElementById('mening-javonim');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="space-y-4">
      {/* Horizontal quick-alert cards */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-3.5 px-3.5 py-0.5 snap-x">
        <button
          type="button"
          onClick={() => goTab('ord', 'track')}
          className="flex-none snap-start flex items-center gap-2.5 px-3 py-2 bg-white dark:bg-[#1E1A1B] border border-stone-200 dark:border-stone-800 rounded-xl shadow-xs max-w-[235px] text-left active:scale-[0.98] transition-transform"
        >
          <span className="w-8 h-8 rounded-lg bg-[#FBECEF] dark:bg-[#361820] text-[#800020] dark:text-[#F4728A] flex items-center justify-center flex-none">
            <Truck className="w-4 h-4" />
          </span>
          <div className="min-w-0">
            <strong className="block text-xs font-bold text-stone-900 dark:text-stone-100 truncate">
              #2481 yo'lda
            </strong>
            <span className="block text-[11px] text-stone-500 dark:text-stone-400 truncate">
              Bugun 14:00–17:00 · Akmal
            </span>
          </div>
        </button>

        {unreadChat > 0 && (
          <button
            type="button"
            onClick={() => {
              goTab('me');
              openPage('chat');
            }}
            className="flex-none snap-start flex items-center gap-2.5 px-3 py-2 bg-white dark:bg-[#1E1A1B] border border-stone-200 dark:border-stone-800 rounded-xl shadow-xs max-w-[235px] text-left active:scale-[0.98] transition-transform"
          >
            <span className="w-8 h-8 rounded-lg bg-[#ECF1FC] dark:bg-[#1B253A] text-[#2B59B5] dark:text-[#7DA3F2] flex items-center justify-center flex-none">
              <MessageCircle className="w-4 h-4" />
            </span>
            <div className="min-w-0">
              <strong className="block text-xs font-bold text-stone-900 dark:text-stone-100 truncate">
                Madina: {unreadChat} ta xabar
              </strong>
              <span className="block text-[11px] text-stone-500 dark:text-stone-400 truncate">
                «Buyurtmangiz yo'lda…»
              </span>
            </div>
          </button>
        )}

        <button
          type="button"
          onClick={scrollToShelf}
          className="flex-none snap-start flex items-center gap-2.5 px-3 py-2 bg-white dark:bg-[#1E1A1B] border border-stone-200 dark:border-stone-800 rounded-xl shadow-xs max-w-[235px] text-left active:scale-[0.98] transition-transform"
        >
          <span className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-950/40 text-[#9E2A2B] dark:text-[#F87171] flex items-center justify-center flex-none">
            <TrendingDown className="w-4 h-4" />
          </span>
          <div className="min-w-0">
            <strong className="block text-xs font-bold text-stone-900 dark:text-stone-100 truncate">
              2 mahsulot tugayapti
            </strong>
            <span className="block text-[11px] text-stone-500 dark:text-stone-400 truncate">
              Anor 1 L, Gazli anor 0,5 L
            </span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => goTab('cart')}
          className="flex-none snap-start flex items-center gap-2.5 px-3 py-2 bg-white dark:bg-[#1E1A1B] border border-stone-200 dark:border-stone-800 rounded-xl shadow-xs max-w-[235px] text-left active:scale-[0.98] transition-transform"
        >
          <span className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-[#15803D] dark:text-[#4ADE80] flex items-center justify-center flex-none">
            <Droplet className="w-4 h-4" />
          </span>
          <div className="min-w-0">
            <strong className="block text-xs font-bold text-stone-900 dark:text-stone-100 truncate">
              7% chegirmaga oz qoldi
            </strong>
            <span className="block text-[11px] text-stone-500 dark:text-stone-400 truncate">
              Yana 180 000 so'm
            </span>
          </div>
        </button>
      </div>

      {/* Mening javonim */}
      <section id="mening-javonim">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-[15.5px] font-extrabold text-stone-900 dark:text-white tracking-tight">
            Mening javonim
          </h2>
          <button
            type="button"
            onClick={() => setEditShelf((v) => !v)}
            className="text-[13px] font-bold text-[#800020] dark:text-[#F4728A]"
          >
            {editShelf ? 'Tayyor' : 'Tahrirlash'}
          </button>
        </div>

        {sortedShelf.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {sortedShelf.map((item) => {
              const prod = PRODUCTS[item[0]];
              if (!prod) return null;
              return (
                <ShelfRowCard
                  key={item[0]}
                  item={item}
                  product={prod}
                  editMode={editShelf}
                />
              );
            })}
          </div>
        ) : (
          <div className="bg-white dark:bg-[#1E1A1B] border border-stone-200 dark:border-stone-800 rounded-2xl p-6 text-center text-sm text-stone-500 dark:text-stone-400">
            Javon bo'sh — mahsulot qo'shing
          </div>
        )}

        {editShelf ? (
          <button
            type="button"
            onClick={() => setSheet({ type: 'pick' })}
            className="w-full mt-2.5 h-11 rounded-2xl border border-dashed border-[#800020]/50 dark:border-[#F4728A]/50 bg-white dark:bg-[#1E1A1B] text-[#800020] dark:text-[#F4728A] font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#FBECEF]/50 dark:hover:bg-[#361820]/40 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Javonga mahsulot qo'shish</span>
          </button>
        ) : (
          <div className="grid grid-cols-2 gap-2 mt-2.5">
            <button
              type="button"
              onClick={() => fillShelfToCart(true)}
              className="h-10 rounded-full bg-[#FBECEF] dark:bg-[#361820] border border-[#800020]/15 text-[#800020] dark:text-[#F4728A] font-bold text-[13px] flex items-center justify-center gap-1.5 active:scale-[0.98] transition-transform"
            >
              <TrendingDown className="w-4 h-4" />
              <span>Tugayotganlarni</span>
            </button>
            <button
              type="button"
              onClick={() => fillShelfToCart(false)}
              className="h-10 rounded-full bg-white dark:bg-[#1E1A1B] border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 font-bold text-[13px] flex items-center justify-center gap-1.5 active:scale-[0.98] transition-transform"
            >
              <Repeat className="w-4 h-4" />
              <span>Hammasini</span>
            </button>
          </div>
        )}
      </section>

      {/* Monthly discount tier */}
      <section>
        <h2 className="text-[15.5px] font-extrabold text-stone-900 dark:text-white tracking-tight mb-2">
          Bu oygi chegirma
        </h2>
        <AnorSeeds sum={monthTotal} />
      </section>

      {/* Top sellers in Termiz (CCINEXT compact 2-col grid on mobile, 3-4 col on desktop) */}
      <section>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-[15.5px] font-extrabold text-stone-900 dark:text-white tracking-tight">
            Termizda ko'p olinmoqda
          </h2>
          <button
            type="button"
            onClick={() => goTab('cat')}
            className="inline-flex items-center gap-0.5 text-[13px] font-bold text-[#800020] dark:text-[#F4728A]"
          >
            <span>Hammasi</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {HOT_IDS.map((id) => {
            const prod = PRODUCTS[id];
            return prod ? (
              <ProductCard key={id} product={prod} mode="grid" showHotBadge />
            ) : null;
          })}
        </div>
      </section>
    </div>
  );
};
