import React from 'react';
import { Check, MessageCircle, Phone, Repeat, Truck } from 'lucide-react';
import { AnorSeeds } from '../components/AnorSeeds';
import { ProductVisual } from '../components/ProductVisual';
import { useStore } from '../context/StoreContext';
import { DAYS, PRODUCTS, SLOTS, formatSom } from '../data/products';
import type { OrderStatus } from '../types';

function statusBadge(status: OrderStatus) {
  switch (status) {
    case "Yo'lda":
      return 'bg-[#FBECEF] dark:bg-[#361820] text-[#800020] dark:text-[#F4728A]';
    case 'Yetkazildi':
      return 'bg-emerald-50 dark:bg-emerald-950/40 text-[#15803D] dark:text-[#4ADE80]';
    case 'Qabul qilindi':
      return 'bg-amber-50 dark:bg-amber-950/40 text-[#B45309] dark:text-[#FBBF24]';
    default:
      return 'bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400';
  }
}

export const OrdersView: React.FC = () => {
  const {
    orders,
    orderSeg,
    setOrderSeg,
    autoOrder,
    toggleAutoOrder,
    openPage,
    repeatOrderToCart,
  } = useStore();

  const filtered = orders.filter((o) => {
    if (orderSeg === 0) return !['Yetkazildi', 'Bekor qilindi'].includes(o[2]);
    if (orderSeg === 1) return o[2] === 'Yetkazildi';
    return o[2] === 'Bekor qilindi';
  });

  return (
    <div className="space-y-3">
      {/* Weekly Auto-order toggle card */}
      <div className="bg-white dark:bg-[#1E1A1B] border border-stone-200 dark:border-stone-800 rounded-2xl p-3.5 shadow-xs flex items-center gap-3">
        <span className="w-9 h-9 rounded-xl bg-[#FBECEF] dark:bg-[#361820] text-[#800020] dark:text-[#F4728A] flex items-center justify-center flex-none">
          <Repeat className="w-4 h-4" />
        </span>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-sm text-stone-900 dark:text-white">Avto-buyurtma</div>
          <div className="text-xs text-stone-500 dark:text-stone-400">
            {autoOrder
              ? 'Har dushanba tayyorlanadi — siz tasdiqlaysiz'
              : 'Har hafta bir xil olsangiz, yoqing'}
          </div>
        </div>
        <button
          type="button"
          aria-label="Avto-buyurtma"
          onClick={toggleAutoOrder}
          className={`w-12 h-7 rounded-full relative transition-colors flex-none ${
            autoOrder ? 'bg-[#800020] dark:bg-[#C81E45]' : 'bg-stone-300 dark:bg-stone-700'
          }`}
        >
          <span
            className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-xs transition-all ${
              autoOrder ? 'left-[22px]' : 'left-0.5'
            }`}
          />
        </button>
      </div>

      {/* Segment switch */}
      <div className="grid grid-cols-3 bg-stone-200/80 dark:bg-stone-800 rounded-xl p-1 gap-1">
        {['Faol', 'Yetkazildi', 'Bekor'].map((label, i) => (
          <button
            key={label}
            type="button"
            onClick={() => setOrderSeg(i)}
            className={`h-9 rounded-lg text-[13px] transition-all ${
              i === orderSeg
                ? 'bg-white dark:bg-[#1E1A1B] text-[#800020] dark:text-[#F4728A] font-bold shadow-xs'
                : 'text-stone-500 dark:text-stone-400 font-semibold'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="py-12 text-center text-sm text-stone-500 dark:text-stone-400">
          Bu yerda hozircha buyurtma yo'q
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {filtered.map((o) => (
            <div
              key={o[0]}
              className="bg-white dark:bg-[#1E1A1B] border border-stone-200 dark:border-stone-800 rounded-2xl p-3.5 shadow-xs"
            >
              <div className="flex items-center justify-between mb-2">
                <button
                  type="button"
                  onClick={() => {
                    if (orderSeg === 0) openPage('track');
                  }}
                  className="text-[13px] font-bold text-[#800020] dark:text-[#F4728A]"
                >
                  Tafsilotlar ›
                </button>
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[11.5px] font-bold ${statusBadge(
                    o[2],
                  )}`}
                >
                  {o[2]}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 mb-2.5">
                <div>
                  <div className="text-[11px] text-stone-500 dark:text-stone-400">
                    Buyurtma #{o[0]}
                  </div>
                  <div className="font-bold text-sm text-stone-900 dark:text-white">{o[1]}</div>
                </div>
                <div className="text-right tabular-nums">
                  <div className="text-[11px] text-stone-500 dark:text-stone-400">
                    Jami mahsulot
                  </div>
                  <div className="font-bold text-sm text-stone-900 dark:text-white">
                    {o[4]} quti · {formatSom(o[3])}
                  </div>
                </div>
              </div>

              <div className="flex gap-1.5 overflow-x-auto no-scrollbar mb-3">
                {o[5].map((pid) => {
                  const prod = PRODUCTS[pid];
                  return prod ? (
                    <ProductVisual key={pid} product={prod} size="mini" showBadge={false} />
                  ) : null;
                })}
              </div>

              {orderSeg === 0 ? (
                <button
                  type="button"
                  onClick={() => openPage('track')}
                  className="w-full h-9 rounded-full border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-800 dark:text-stone-200 font-bold text-[13px] inline-flex items-center justify-center gap-1.5"
                >
                  <Truck className="w-4 h-4 text-[#800020] dark:text-[#F4728A]" />
                  <span>Buyurtmani kuzatish</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => repeatOrderToCart(o[5])}
                  className="w-full h-9 rounded-full bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-[13px] inline-flex items-center justify-center gap-1.5"
                >
                  <Repeat className="w-3.5 h-3.5" />
                  <span>Takrorlash · Savatga qo'shish</span>
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const TrackView: React.FC = () => {
  const { goTab, openPage, showToast } = useStore();

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-[#1E1A1B] border border-stone-200 dark:border-stone-800 rounded-2xl p-4 shadow-xs">
        <div className="text-xs text-stone-500 dark:text-stone-400">Yetib keladi</div>
        <div className="text-xl font-extrabold text-stone-900 dark:text-white mt-0.5">
          Bugun 14:00–17:00
        </div>

        <div className="grid grid-cols-4 gap-1.5 my-3">
          <span className="h-1.5 rounded-full bg-[#800020] dark:bg-[#D92B4E]" />
          <span className="h-1.5 rounded-full bg-[#800020] dark:bg-[#D92B4E]" />
          <span className="h-1.5 rounded-full step-active-bar" />
          <span className="h-1.5 rounded-full bg-stone-200 dark:bg-stone-800" />
        </div>

        <div className="grid grid-cols-4 text-[11.5px] text-stone-500 dark:text-stone-400">
          <span>Qabul</span>
          <span>Yig'ildi</span>
          <strong className="text-[#800020] dark:text-[#F4728A]">Yo'lda</strong>
          <span>Yetkazildi</span>
        </div>
      </div>

      <section>
        <h2 className="text-[15.5px] font-extrabold text-stone-900 dark:text-white mb-2">
          Holat
        </h2>
        <div className="bg-white dark:bg-[#1E1A1B] border border-stone-200 dark:border-stone-800 rounded-2xl p-4 shadow-xs space-y-4">
          {[
            { title: 'Qabul qilindi', sub: '09:12 · operator Madina', state: 'done' },
            { title: "Omborda yig'ildi", sub: '11:40', state: 'done' },
            { title: "Yo'lda", sub: '13:05 · siz navbatda 3-chisiz', state: 'now' },
            { title: 'Yetkazildi', sub: 'Haydovchiga qabul kodini aytasiz', state: 'next' },
          ].map((step, i, arr) => (
            <div key={step.title} className="relative pl-7">
              <span
                className={`absolute left-0 top-1 w-4 h-4 rounded-full border-2 ${
                  step.state === 'done'
                    ? 'bg-[#800020] border-[#800020] dark:bg-[#D92B4E] dark:border-[#D92B4E]'
                    : step.state === 'now'
                      ? 'bg-white dark:bg-[#1E1A1B] border-[5px] border-[#800020] dark:border-[#D92B4E]'
                      : 'bg-white dark:bg-[#1E1A1B] border-stone-300 dark:border-stone-600'
                }`}
              />
              {i < arr.length - 1 && (
                <span
                  className={`absolute left-[7px] top-5 -bottom-4 w-[2px] ${
                    step.state === 'done'
                      ? 'bg-[#800020] dark:bg-[#D92B4E]'
                      : 'bg-stone-200 dark:bg-stone-700'
                  }`}
                />
              )}
              <strong className="block text-sm font-bold text-stone-900 dark:text-white">
                {step.title}
              </strong>
              <span className="text-xs text-stone-500 dark:text-stone-400">{step.sub}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Driver card */}
      <div className="rounded-2xl p-3.5 bg-gradient-to-br from-[#8B0000] to-[#630019] text-white flex items-center gap-3 shadow-sm">
        <span className="w-11 h-11 rounded-full bg-white/20 font-extrabold flex items-center justify-center flex-none">
          A
        </span>
        <div className="flex-1 min-w-0">
          <strong className="block font-bold">Akmal</strong>
          <small className="block text-xs opacity-85">Haydovchi · Isuzu 01 A 123 BC</small>
        </div>
        <button
          type="button"
          aria-label="Qo'ng'iroq qilish"
          onClick={() =>
            showToast({
              icon: 'phone',
              title: "Qo'ng'iroq",
              text: '+998 90 *** ** 45 ga ulanmoqda…',
              tone: 'ok',
            })
          }
          className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center flex-none"
        >
          <Phone className="w-4 h-4" />
        </button>
        <button
          type="button"
          aria-label="Chatga o'tish"
          onClick={() => {
            goTab('me');
            openPage('chat');
          }}
          className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center flex-none"
        >
          <MessageCircle className="w-4 h-4" />
        </button>
      </div>

      <div className="bg-white dark:bg-[#1E1A1B] border border-stone-200 dark:border-stone-800 rounded-2xl p-4 text-center shadow-xs">
        <div className="text-xs text-stone-500 dark:text-stone-400">
          Qabul kodi — haydovchiga ayting
        </div>
        <div className="text-3xl font-extrabold tracking-[0.28em] text-[#800020] dark:text-[#F4728A] mt-1 tabular-nums">
          4 8 1 7
        </div>
      </div>

      <div className="flex gap-2.5">
        <button
          type="button"
          onClick={() =>
            showToast({
              icon: 'check',
              title: 'Rahmat!',
              text: 'Qabul qilganingiz yozildi',
              tone: 'ok',
            })
          }
          className="flex-1 h-11 rounded-full bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-sm"
        >
          Hammasi joyida
        </button>
        <button
          type="button"
          onClick={() =>
            showToast({
              icon: 'info',
              title: 'Kamchilik',
              text: "Qaysi mahsulot — tanlaysiz va rasm qo'shasiz",
              tone: 'warn',
            })
          }
          className="flex-1 h-11 rounded-full bg-white dark:bg-[#1E1A1B] border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 font-bold text-sm"
        >
          Kamchilik bor
        </button>
      </div>
    </div>
  );
};

export const SuccessView: React.FC = () => {
  const { lastOrderId, day, slot, monthTotal, openPage, goTab } = useStore();

  return (
    <div className="max-w-md mx-auto pt-4 space-y-5 text-center">
      <div className="w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-[#16A34A] dark:text-[#4ADE80] flex items-center justify-center mx-auto">
        <Check className="w-10 h-10 stroke-[2.6]" />
      </div>

      <div>
        <h2 className="text-xl font-extrabold text-stone-900 dark:text-white">
          Buyurtma qabul qilindi
        </h2>
        <p className="text-sm text-stone-500 dark:text-stone-400 mt-1.5 leading-relaxed">
          #{lastOrderId} · {DAYS[day]}, {SLOTS[slot].toLowerCase()}
          <br />
          Operator tasdiqlashi bilan xabar keladi
        </p>
      </div>

      <div className="text-left">
        <AnorSeeds sum={monthTotal} />
      </div>

      <div className="space-y-2">
        <button
          type="button"
          onClick={() => openPage('track')}
          className="w-full h-12 rounded-full bg-[#800020] hover:bg-[#630019] text-white font-bold text-sm inline-flex items-center justify-center gap-2"
        >
          <Truck className="w-4 h-4" />
          <span>Buyurtmani kuzatish</span>
        </button>
        <button
          type="button"
          onClick={() => goTab('home')}
          className="w-full h-12 rounded-full bg-white dark:bg-[#1E1A1B] border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 font-bold text-sm"
        >
          Bosh sahifa
        </button>
      </div>
    </div>
  );
};
