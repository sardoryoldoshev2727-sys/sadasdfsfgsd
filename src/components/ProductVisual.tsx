import React from 'react';
import { Flame, Leaf } from 'lucide-react';
import { HOT_IDS, getBottleShape, getFlavorColor, getFlavorName } from '../data/products';
import type { Product } from '../types';

interface ProductVisualProps {
  product: Product;
  size?: 'mini' | 'row' | 'grid' | 'large';
  showBadge?: boolean;
}

function getBadgeInfo(p: Product) {
  if (HOT_IDS.includes(p.id)) {
    return { cls: 'bg-[#800020] text-white', icon: 'fire' as const, label: "Ko'p olinadi" };
  }
  if (/bombacha/i.test(p.name)) {
    return { cls: 'bg-[#FDF0DC] text-[#9A5B05]', icon: null, label: 'Bolalar uchun' };
  }
  if (/Basil/i.test(p.name)) {
    return { cls: 'bg-[#EEF0DA] text-[#5B6316]', icon: null, label: "Rayhon urug'li" };
  }
  if (/Aloe/i.test(p.name)) {
    return { cls: 'bg-[#E3F2E6] text-[#2D6A4F]', icon: 'leaf' as const, label: "Aloe bo'lakchali" };
  }
  if (/gazli|ichimligi|Juice Drink|Nata/i.test(p.name)) {
    return null;
  }
  return { cls: 'bg-[#E3F2E6] text-[#2D6A4F]', icon: 'leaf' as const, label: '100% tabiiy' };
}

const BottleSvg: React.FC<{ product: Product; color: string; className?: string }> = ({
  product,
  color,
  className = '',
}) => {
  const shape = getBottleShape(product);
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      {shape === 'can' && (
        <>
          <rect x="18" y="9" width="28" height="48" rx="6" fill={color} />
          <rect x="20" y="5" width="24" height="5" rx="2" fill="#D5CECE" />
          <rect x="18" y="24" width="28" height="16" fill="#fff" opacity="0.92" />
          <rect x="22" y="13" width="3.5" height="39" rx="1.8" fill="#fff" opacity="0.22" />
        </>
      )}
      {shape === 'round' && (
        <>
          <rect x="27" y="5" width="10" height="7" rx="2" fill="#E09F2D" />
          <circle cx="32" cy="36" r="21" fill={color} />
          <rect x="14" y="31" width="36" height="11" rx="2.5" fill="#fff" opacity="0.92" />
          <circle cx="25" cy="25" r="3.8" fill="#fff" opacity="0.22" />
        </>
      )}
      {shape === 'pet' && (
        <>
          <rect x="26" y="3" width="12" height="7" rx="2.5" fill="#E09F2D" />
          <path
            d="M27 10h10l4 9c2 3 3 5 3 9v27a5 5 0 0 1-5 5H25a5 5 0 0 1-5-5V28c0-4 1-6 3-9z"
            fill={color}
          />
          <rect x="20" y="30" width="24" height="14" rx="2" fill="#fff" opacity="0.92" />
          <rect x="24" y="18" width="3.5" height="36" rx="1.8" fill="#fff" opacity="0.22" />
        </>
      )}
    </svg>
  );
};

export const ProductVisual: React.FC<ProductVisualProps> = ({
  product,
  size = 'row',
  showBadge = true,
}) => {
  const color = getFlavorColor(product);
  const label = `${getFlavorName(product)} · ${product.vol}`;
  const badge = showBadge ? getBadgeInfo(product) : null;

  if (size === 'mini') {
    return (
      <div className="relative flex-none w-11 h-12 bg-white rounded-lg border border-stone-200 dark:border-stone-700 flex items-center justify-center gap-0.5 p-1 overflow-hidden">
        {product.photo ? (
          <img src={product.photo} alt={product.name} className="max-w-[24px] h-full object-contain" />
        ) : (
          <BottleSvg product={product} color={color} className="w-6 h-10" />
        )}
        <div
          className="w-2.5 h-10 rounded-[2px] text-white flex items-center justify-center flex-none overflow-hidden"
          style={{ backgroundColor: color }}
        >
          <span className="vertical-flavor text-[5px] font-extrabold tracking-wider uppercase whitespace-nowrap leading-none">
            {label}
          </span>
        </div>
      </div>
    );
  }

  if (size === 'large') {
    return (
      <div className="relative h-56 rounded-2xl bg-white border border-stone-200 dark:border-stone-700 flex items-center justify-center gap-3.5 p-3.5 overflow-hidden">
        {badge && (
          <span
            className={`absolute left-3 top-3 z-10 inline-flex items-center gap-1 h-6 px-2.5 rounded-full text-xs font-bold ${badge.cls}`}
          >
            {badge.icon === 'fire' && <Flame className="w-3.5 h-3.5" />}
            {badge.icon === 'leaf' && <Leaf className="w-3.5 h-3.5" />}
            {badge.label}
          </span>
        )}
        {product.photo ? (
          <img
            src={product.photo}
            alt={product.name}
            className="max-h-full max-w-[65%] object-contain"
          />
        ) : (
          <BottleSvg product={product} color={color} className="h-[78%] w-auto" />
        )}
        <div
          className="w-8 h-40 rounded-md text-white flex items-center justify-center flex-none overflow-hidden shadow-xs"
          style={{ backgroundColor: color }}
        >
          <span className="vertical-flavor text-[10.5px] font-extrabold tracking-widest uppercase whitespace-nowrap leading-none">
            {label}
          </span>
        </div>
      </div>
    );
  }

  if (size === 'grid') {
    return (
      <div
        className={`relative w-full h-28 bg-white rounded-xl flex items-center justify-center gap-1.5 px-2 py-1.5 overflow-hidden ${
          product.out ? 'opacity-50' : ''
        }`}
      >
        {product.photo ? (
          <img
            src={product.photo}
            alt={product.name}
            decoding="async"
            className="max-w-[58px] h-full object-contain"
          />
        ) : (
          <BottleSvg product={product} color={color} className="w-12 h-22 flex-none" />
        )}
        <div
          className="w-5 h-22 rounded-[4px] text-white flex items-center justify-center flex-none overflow-hidden"
          style={{ backgroundColor: color }}
        >
          <span className="vertical-flavor text-[7.5px] font-extrabold tracking-wider uppercase whitespace-nowrap leading-none">
            {label}
          </span>
        </div>
      </div>
    );
  }

  // compact 'row'
  return (
    <div
      className={`relative flex-none w-[78px] h-[86px] bg-white rounded-xl border border-stone-200/90 dark:border-stone-700 flex items-center justify-center gap-1 p-1 overflow-hidden ${
        product.out ? 'opacity-55' : ''
      }`}
    >
      {badge && badge.icon && (
        <span
          className={`absolute left-1 top-1 z-10 w-4.5 h-4.5 rounded-full flex items-center justify-center ${badge.cls}`}
          title={badge.label}
        >
          {badge.icon === 'fire' ? <Flame className="w-2.5 h-2.5" /> : <Leaf className="w-2.5 h-2.5" />}
        </span>
      )}
      {product.photo ? (
        <img
          src={product.photo}
          alt={product.name}
          decoding="async"
          className="max-w-[46px] h-full object-contain"
        />
      ) : (
        <BottleSvg product={product} color={color} className="w-10 h-16 flex-none" />
      )}
      <div
        className="w-4.5 h-[72px] rounded-[4px] text-white flex items-center justify-center flex-none overflow-hidden"
        style={{ backgroundColor: color }}
      >
        <span className="vertical-flavor text-[7px] font-extrabold tracking-wider uppercase whitespace-nowrap leading-none">
          {label}
        </span>
      </div>
    </div>
  );
};
