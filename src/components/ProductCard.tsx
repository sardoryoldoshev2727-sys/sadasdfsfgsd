import React from 'react';
import { Bell, Heart, Megaphone, Minus, Plus, ShoppingCart, Trash2, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { HOT_IDS, formatSom, getStockInfo, shortName } from '../data/products';
import type { Product, ShelfItem } from '../types';
import { ProductVisual } from './ProductVisual';

interface StepperProps {
  product: Product;
  compact?: boolean;
}

export const CartStepper: React.FC<StepperProps> = ({ product, compact = false }) => {
  const { cart, updateQty, showToast } = useStore();
  const qty = cart[product.id] || 0;

  if (product.out) {
    return (
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          showToast({
            icon: 'bell',
            title: 'Kelganda xabar beramiz',
            text: `${product.name} omborga kelishi bilan`,
            tone: 'warn',
          });
        }}
        className={`inline-flex items-center justify-center gap-1 rounded-full bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 font-semibold text-xs transition-transform active:scale-95 ${
          compact ? 'w-full h-9 px-2' : 'h-9 px-3.5'
        }`}
      >
        <Bell className="w-3.5 h-3.5" />
        <span>Kelganda</span>
      </button>
    );
  }

  if (qty === 0) {
    return (
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          updateQty(product.id, 1);
        }}
        className={`inline-flex items-center justify-center gap-1.5 rounded-full bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-[13px] shadow-sm shadow-emerald-600/20 transition-all active:scale-95 ${
          compact ? 'w-full h-9 px-2.5' : 'h-9 px-3.5 min-w-[104px]'
        }`}
      >
        <ShoppingCart className="w-4 h-4 stroke-[2.2]" />
        <span>Savatga</span>
      </button>
    );
  }

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`inline-flex items-center justify-between rounded-full bg-[#800020] dark:bg-[#9E1434] text-white px-1 shadow-sm shadow-[#800020]/25 ${
        compact ? 'w-full h-9' : 'h-9 min-w-[104px]'
      }`}
    >
      <button
        type="button"
        aria-label="Kamaytirish"
        onClick={() => updateQty(product.id, -1)}
        className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/15 active:bg-white/25 transition-colors"
      >
        <Minus className="w-4 h-4 stroke-[2.5]" />
      </button>
      <span className="min-w-[24px] text-center font-extrabold text-[13.5px] tabular-nums">
        {qty}
      </span>
      <button
        type="button"
        aria-label="Ko'paytirish"
        onClick={() => updateQty(product.id, 1)}
        className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/15 active:bg-white/25 transition-colors"
      >
        <Plus className="w-4 h-4 stroke-[2.5]" />
      </button>
    </div>
  );
};

interface ProductCardProps {
  product: Product;
  mode?: 'grid' | 'row' | 'cart';
  showHotBadge?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  mode = 'grid',
  showHotBadge = false,
}) => {
  const { cart, shelf, inShelf, toggleFavorite, setSheet, updateQty } = useStore();
  const qty = cart[product.id] || 0;
  const inCart = qty > 0;
  const fav = inShelf(product.id);
  const st = getStockInfo(product, shelf);
  const isHot = showHotBadge || HOT_IDS.includes(product.id);

  const stockColor =
    st.cls === 'crit'
      ? 'text-[#9E2A2B] dark:text-[#F87171]'
      : st.cls === 'warn'
        ? 'text-[#B45309] dark:text-[#FBBF24]'
        : 'text-[#15803D] dark:text-[#4ADE80]';
  const stockBarBg =
    st.cls === 'crit'
      ? 'bg-[#DC2626]'
      : st.cls === 'warn'
        ? 'bg-[#D97706]'
        : 'bg-[#16A34A]';

  if (mode === 'grid') {
    return (
      <div
        onClick={() => setSheet({ type: 'prod', id: product.id })}
        className={`group relative bg-white dark:bg-[#1E1A1B] rounded-2xl p-2.5 flex flex-col cursor-pointer transition-all border ${
          inCart
            ? 'border-[#800020]/60 dark:border-[#D92B4E]/60 ring-1 ring-[#800020]/15 shadow-sm'
            : 'border-stone-200/90 dark:border-stone-800 shadow-xs hover:border-stone-300 dark:hover:border-stone-700'
        }`}
      >
        {/* Top CCINEXT corner icons: Megaphone + Heart */}
        <div className="flex items-center justify-between mb-1">
          <span
            className={`inline-flex items-center gap-0.5 text-[10px] font-bold ${
              isHot ? 'text-[#800020] dark:text-[#F4728A]' : 'text-stone-300 dark:text-stone-600'
            }`}
            title={isHot ? 'Top mahsulot' : undefined}
          >
            <Megaphone className="w-3.5 h-3.5" />
          </span>
          <button
            type="button"
            aria-label={fav ? 'Javondan olish' : "Javonga qo'shish"}
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(product.id);
            }}
            className="w-7 h-7 -mr-1 -mt-1 flex items-center justify-center rounded-full hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
          >
            <Heart
              className={`w-4 h-4 ${
                fav
                  ? 'fill-[#800020] text-[#800020] dark:fill-[#F43F5E] dark:text-[#F43F5E]'
                  : 'text-stone-400 dark:text-stone-500'
              }`}
            />
          </button>
        </div>

        <ProductVisual product={product} size="grid" showBadge={false} />

        <div className="mt-1.5 text-center font-bold text-[12.5px] leading-tight text-stone-900 dark:text-stone-100 line-clamp-2 min-h-[32px]">
          {product.name} {product.vol}
        </div>

        <div className="mt-1 px-0.5">
          <div className="flex items-center justify-between text-[10px] font-semibold mb-0.5">
            <span className={stockColor}>{st.txt}</span>
            <span className="text-stone-400 dark:text-stone-500 tabular-nums">{product.blk} dona</span>
          </div>
          <div className="h-[3.5px] w-full rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
            <div className={`h-full rounded-full ${stockBarBg}`} style={{ width: `${st.pct}%` }} />
          </div>
        </div>

        <div
          className={`mt-2 mb-2 text-center font-extrabold text-[14.5px] tabular-nums tracking-tight ${
            product.out
              ? 'text-[#DC2626] dark:text-[#F87171] text-xs'
              : 'text-stone-900 dark:text-white'
          }`}
        >
          {product.out ? 'Omborda tugagan' : formatSom(product.box)}
        </div>

        <div className="mt-auto">
          <CartStepper product={product} compact />
        </div>
      </div>
    );
  }

  if (mode === 'cart') {
    return (
      <div
        onClick={() => setSheet({ type: 'prod', id: product.id })}
        className="bg-white dark:bg-[#1E1A1B] border border-[#800020]/35 dark:border-[#D92B4E]/40 rounded-2xl p-2.5 flex items-stretch gap-2.5 shadow-xs cursor-pointer"
      >
        <ProductVisual product={product} size="row" />
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="font-bold text-[13.5px] leading-tight text-stone-900 dark:text-stone-100 truncate">
                {product.name} {product.vol}
              </div>
              <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5 tabular-nums">
                1 quti = {product.blk} dona · {formatSom(product.box)}/quti
              </div>
            </div>
            <button
              type="button"
              aria-label="O'chirish"
              onClick={(e) => {
                e.stopPropagation();
                updateQty(product.id, -qty);
              }}
              className="w-8 h-8 -mr-1 -mt-1 rounded-lg flex items-center justify-center text-[#9E2A2B] dark:text-[#F87171] hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-end justify-between gap-2 mt-2">
            <div className="tabular-nums">
              <div className="font-extrabold text-[15px] text-stone-900 dark:text-white leading-tight">
                {formatSom(product.box * qty)}
              </div>
              <div className="text-[11px] font-medium text-stone-500 dark:text-stone-400">
                {qty} quti jami
              </div>
            </div>
            <CartStepper product={product} />
          </div>
        </div>
      </div>
    );
  }

  // compact 'row'
  return (
    <div
      onClick={() => setSheet({ type: 'prod', id: product.id })}
      className={`bg-white dark:bg-[#1E1A1B] rounded-2xl p-2.5 flex items-stretch gap-2.5 cursor-pointer transition-all border ${
        product.out ? 'opacity-65' : ''
      } ${
        inCart
          ? 'border-[#800020]/50 dark:border-[#D92B4E]/55 shadow-sm'
          : 'border-stone-200/90 dark:border-stone-800 shadow-xs'
      }`}
    >
      <ProductVisual product={product} size="row" />
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-1.5">
            <div className="font-bold text-[13.5px] leading-tight text-stone-900 dark:text-stone-100">
              {product.name} {product.vol}
              {product.out && (
                <span className="ml-1.5 inline-block text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-50 dark:bg-red-950/40 text-[#9E2A2B] dark:text-[#F87171]">
                  Tugagan
                </span>
              )}
            </div>
            <button
              type="button"
              aria-label={fav ? 'Javondan olish' : "Javonga qo'shish"}
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(product.id);
              }}
              className="w-7 h-7 -mr-1 -mt-1 flex items-center justify-center rounded-full hover:bg-rose-50 dark:hover:bg-rose-950/40 flex-none"
            >
              <Heart
                className={`w-4 h-4 ${
                  fav
                    ? 'fill-[#800020] text-[#800020] dark:fill-[#F43F5E] dark:text-[#F43F5E]'
                    : 'text-stone-400 dark:text-stone-500'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center flex-wrap gap-1 mt-0.5 text-[11px] text-stone-500 dark:text-stone-400 tabular-nums">
            {isHot && (
              <span className="inline-flex items-center gap-0.5 text-[#800020] dark:text-[#F4728A] font-bold">
                <Megaphone className="w-3 h-3" /> Top ·
              </span>
            )}
            <span>
              1 quti = {product.blk} dona · donasi {formatSom(product.one)}
            </span>
          </div>

          <div className="mt-1.5">
            <div className="flex items-center justify-between text-[10.5px] font-semibold mb-0.5">
              <span className={stockColor}>{st.txt}</span>
              {st.sub && <span className="text-stone-400 dark:text-stone-500">{st.sub}</span>}
            </div>
            <div className="h-[4px] w-full rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
              <div className={`h-full rounded-full ${stockBarBg}`} style={{ width: `${st.pct}%` }} />
            </div>
          </div>
        </div>

        <div className="flex items-end justify-between gap-2 mt-2">
          <div className="tabular-nums">
            <div className="font-extrabold text-[15px] text-stone-900 dark:text-white leading-tight">
              {formatSom(product.box)}
            </div>
            <div className="text-[10.5px] font-medium text-stone-500 dark:text-stone-400">
              quti narxi
            </div>
          </div>
          <CartStepper product={product} />
        </div>
      </div>
    </div>
  );
};

interface ShelfRowCardProps {
  item: ShelfItem;
  product: Product;
  editMode: boolean;
}

export const ShelfRowCard: React.FC<ShelfRowCardProps> = ({ item, product, editMode }) => {
  const { cart, shelf, setSheet, updateShelfUsual, removeShelfItem } = useStore();
  const [id, usual] = item;
  const inCart = (cart[id] || 0) > 0;
  const st = getStockInfo(product, shelf);

  const stockColor =
    st.cls === 'crit'
      ? 'text-[#9E2A2B] dark:text-[#F87171]'
      : st.cls === 'warn'
        ? 'text-[#B45309] dark:text-[#FBBF24]'
        : 'text-[#15803D] dark:text-[#4ADE80]';
  const stockBarBg =
    st.cls === 'crit'
      ? 'bg-[#DC2626]'
      : st.cls === 'warn'
        ? 'bg-[#D97706]'
        : 'bg-[#16A34A]';

  return (
    <div
      onClick={() => {
        if (!editMode) setSheet({ type: 'prod', id: product.id });
      }}
      className={`bg-white dark:bg-[#1E1A1B] rounded-2xl p-2.5 flex items-stretch gap-2.5 transition-all border ${
        editMode ? '' : 'cursor-pointer'
      } ${
        inCart
          ? 'border-[#800020]/50 dark:border-[#D92B4E]/55 shadow-sm'
          : 'border-stone-200/90 dark:border-stone-800 shadow-xs'
      }`}
    >
      <ProductVisual product={product} size="row" />
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div className="font-bold text-[13.5px] leading-tight text-stone-900 dark:text-stone-100">
              {shortName(product.name)} {product.vol}
            </div>
            <Heart className="w-4 h-4 fill-[#800020] text-[#800020] dark:fill-[#F43F5E] dark:text-[#F43F5E] flex-none" />
          </div>
          <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5 tabular-nums">
            1 quti = {product.blk} dona · donasi {formatSom(product.one)}
          </div>
          <div className="mt-1.5">
            <div className="flex items-center justify-between text-[10.5px] font-semibold mb-0.5">
              <span className={stockColor}>{st.txt}</span>
              <span className="text-stone-400 dark:text-stone-500">{st.sub}</span>
            </div>
            <div className="h-[4px] w-full rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
              <div className={`h-full rounded-full ${stockBarBg}`} style={{ width: `${st.pct}%` }} />
            </div>
          </div>
        </div>

        <div className="flex items-end justify-between gap-2 mt-2">
          <div className="tabular-nums">
            <div className="font-extrabold text-[15px] text-stone-900 dark:text-white leading-tight">
              {formatSom(product.box)}
            </div>
            <div className="text-[10.5px] font-medium text-stone-500 dark:text-stone-400">
              quti narxi
            </div>
          </div>

          {editMode ? (
            <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
              <div className="inline-flex items-center h-9 rounded-full border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 px-1">
                <button
                  type="button"
                  onClick={() => updateShelfUsual(id, -1)}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="min-w-[22px] text-center font-extrabold text-[13px] tabular-nums">
                  {usual}
                </span>
                <button
                  type="button"
                  onClick={() => updateShelfUsual(id, 1)}
                  className="w-7 h-7 rounded-full flex items-center justify-center bg-[#800020]/10 text-[#800020] dark:text-[#F4728A]"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              <button
                type="button"
                aria-label="Javondan olib tashlash"
                onClick={() => removeShelfItem(id)}
                className="w-9 h-9 rounded-xl bg-red-50 dark:bg-red-950/40 text-[#9E2A2B] dark:text-[#F87171] flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <CartStepper product={product} />
          )}
        </div>
      </div>
    </div>
  );
};
