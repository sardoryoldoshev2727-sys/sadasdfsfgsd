import React from 'react';
import { Pencil, Repeat, ShoppingCart, Trash2 } from 'lucide-react';
import { AnorSeeds } from '../components/AnorSeeds';
import { ProductCard } from '../components/ProductCard';
import { useStore } from '../context/StoreContext';
import { DAYS, PRODUCTS, SLOTS, formatSom, getTier } from '../data/products';

export const CartView: React.FC = () => {
  const {
    cart,
    cartCount,
    cartSubtotal,
    monthTotal,
    day,
    slot,
    note,
    setDay,
    setSlot,
    setNote,
    setSheet,
    fillShelfToCart,
    goTab,
  } = useStore();

  const ids = Object.keys(cart).map(Number);

  if (ids.length === 0) {
    return (
      <div className="py-14 px-4 text-center max-w-sm mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-[#FBECEF] dark:bg-[#361820] text-[#800020] dark:text-[#F4728A] flex items-center justify-center mx-auto mb-3.5">
          <ShoppingCart className="w-8 h-8" />
        </div>
        <h2 className="text-lg font-extrabold text-stone-900 dark:text-white">Savat bo'sh</h2>
        <p className="text-sm text-stone-500 dark:text-stone-400 mt-1 mb-5">
          Javoningizdan bir bosishda to'ldiring
        </p>
        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          <button
            type="button"
            onClick={() => {
              fillShelfToCart(false);
              goTab('cart');
            }}
            className="h-11 px-5 rounded-full bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-sm inline-flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all"
          >
            <Repeat className="w-4 h-4" />
            <span>Odatdagi buyurtma</span>
          </button>
          <button
            type="button"
            onClick={() => goTab('cat')}
            className="h-11 px-5 rounded-full bg-white dark:bg-[#1E1A1B] border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 font-bold text-sm inline-flex items-center justify-center"
          >
            Katalogga o'tish
          </button>
        </div>
      </div>
    );
  }

  const { cur } = getTier(monthTotal + cartSubtotal);
  const discount = (cartSubtotal * cur) / 100;
  const total = cartSubtotal - discount;

  return (
    <div className="space-y-4">
      <AnorSeeds sum={monthTotal + cartSubtotal} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {ids.map((id) => {
          const p = PRODUCTS[id];
          return p ? <ProductCard key={id} product={p} mode="cart" /> : null;
        })}
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setSheet({ type: 'confirmClear' })}
          className="flex-1 h-10 rounded-full bg-white dark:bg-[#1E1A1B] border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-200 font-bold text-[13px] inline-flex items-center justify-center gap-1.5"
        >
          <Trash2 className="w-4 h-4 text-[#9E2A2B] dark:text-[#F87171]" />
          <span>Tozalash</span>
        </button>
        <button
          type="button"
          onClick={() => goTab('cat')}
          className="flex-[1.4] h-10 rounded-full bg-stone-800 dark:bg-stone-700 text-white font-bold text-[13px] inline-flex items-center justify-center gap-1.5"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Xaridni davom ettirish</span>
        </button>
      </div>

      {/* Delivery schedule */}
      <section>
        <h2 className="text-[15.5px] font-extrabold text-stone-900 dark:text-white mb-2">
          Qachon yetkazamiz?
        </h2>

        <div className="grid grid-cols-3 bg-stone-200/80 dark:bg-stone-800 rounded-xl p-1 gap-1">
          {DAYS.map((d, i) => (
            <button
              key={d}
              type="button"
              onClick={() => setDay(i)}
              className={`h-9 rounded-lg text-[13px] transition-all ${
                i === day
                  ? 'bg-white dark:bg-[#1E1A1B] text-[#800020] dark:text-[#F4728A] font-bold shadow-xs'
                  : 'text-stone-500 dark:text-stone-400 font-semibold'
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 bg-stone-200/80 dark:bg-stone-800 rounded-xl p-1 gap-1 mt-2">
          {SLOTS.map((s, i) => (
            <button
              key={s}
              type="button"
              onClick={() => setSlot(i)}
              className={`h-9 rounded-lg text-[13px] transition-all ${
                i === slot
                  ? 'bg-white dark:bg-[#1E1A1B] text-[#800020] dark:text-[#F4728A] font-bold shadow-xs'
                  : 'text-stone-500 dark:text-stone-400 font-semibold'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2.5 h-11 bg-white dark:bg-[#1E1A1B] border border-stone-200 dark:border-stone-700 rounded-xl px-3 mt-2.5 focus-within:border-[#800020]">
          <Pencil className="w-4 h-4 text-stone-400 flex-none" />
          <input
            type="text"
            placeholder="Izoh: «orqa eshikdan»"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="flex-1 bg-transparent text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 outline-none"
          />
        </div>
      </section>

      {/* Summary breakdown */}
      <section>
        <h2 className="text-[15.5px] font-extrabold text-stone-900 dark:text-white mb-2">
          Buyurtma yakuni
        </h2>
        <div className="bg-white dark:bg-[#1E1A1B] border border-stone-200 dark:border-stone-800 rounded-2xl p-3.5 shadow-xs space-y-1.5 text-sm">
          <div className="flex justify-between text-stone-600 dark:text-stone-300">
            <span>Mahsulotlar · {cartCount} quti</span>
            <span className="font-semibold tabular-nums">{formatSom(cartSubtotal)}</span>
          </div>
          <div className="flex justify-between text-stone-600 dark:text-stone-300">
            <span>Chegirma {cur}%</span>
            <span className="font-bold text-[#16A34A] dark:text-[#4ADE80] tabular-nums">
              −{formatSom(discount)}
            </span>
          </div>
          <div className="flex justify-between text-stone-600 dark:text-stone-300">
            <span>Yetkazish</span>
            <span className="font-bold text-[#16A34A] dark:text-[#4ADE80]">Bepul</span>
          </div>
          <div className="flex justify-between text-stone-600 dark:text-stone-300">
            <span>To'lov</span>
            <span>naqd / o'tkazma</span>
          </div>
          <div className="flex justify-between pt-2.5 mt-1 border-t border-dashed border-stone-200 dark:border-stone-700 text-base font-extrabold text-stone-900 dark:text-white">
            <span>To'lovga jami</span>
            <span className="tabular-nums">{formatSom(total)}</span>
          </div>
        </div>
      </section>
    </div>
  );
};
