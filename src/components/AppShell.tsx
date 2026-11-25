import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowUp,
  Bell,
  Check,
  ClipboardList,
  Droplet,
  Globe,
  Heart,
  Home,
  Info,
  LayoutGrid,
  Lock,
  MessageCircle,
  Phone,
  Repeat,
  Search,
  ShoppingCart,
  Trash2,
  User,
  X,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { LOGO } from '../data/assets';
import { CATEGORIES, PRODUCTS, QUICK_HOME_CATEGORIES, formatSom, getTier } from '../data/products';
import type { TabId, ToastItem } from '../types';
import { CartView } from '../views/CartView';
import { CatalogView } from '../views/CatalogView';
import { HomeView } from '../views/HomeView';
import { OrdersView, SuccessView, TrackView } from '../views/OrdersAndTrackView';
import {
  AboutView,
  ChatView,
  FinanceView,
  NotifView,
  ProfileView,
  ShopView,
} from '../views/ProfileAndSubViews';
import { SheetsAndModals } from './SheetsAndModals';

function ToastIcon({ icon }: { icon: ToastItem['icon'] }) {
  switch (icon) {
    case 'cart':
      return <ShoppingCart className="w-4 h-4" />;
    case 'bell':
      return <Bell className="w-4 h-4" />;
    case 'chat':
      return <MessageCircle className="w-4 h-4" />;
    case 'heart':
      return <Heart className="w-4 h-4" />;
    case 'lock':
      return <Lock className="w-4 h-4" />;
    case 'phone':
      return <Phone className="w-4 h-4" />;
    case 'globe':
      return <Globe className="w-4 h-4" />;
    case 'info':
      return <Info className="w-4 h-4" />;
    case 'repeat':
      return <Repeat className="w-4 h-4" />;
    default:
      return <Check className="w-4 h-4" />;
  }
}

const NAV_ITEMS: { id: TabId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'home', label: 'Bosh', icon: Home },
  { id: 'cat', label: 'Katalog', icon: LayoutGrid },
  { id: 'cart', label: 'Savat', icon: ShoppingCart },
  { id: 'ord', label: 'Buyurtmalar', icon: ClipboardList },
  { id: 'me', label: 'Profil', icon: User },
];

export const AppShell: React.FC = () => {
  const {
    tab,
    page,
    cat,
    searchQuery,
    monthTotal,
    cartCount,
    cartSubtotal,
    unreadChat,
    unreadNotifCount,
    toast,
    bumpKey,
    goTab,
    openPage,
    setCat,
    setSearchQuery,
    setSheet,
    dismissToast,
  } = useStore();

  const scrollRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [showToTop, setShowToTop] = useState(false);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
    setShowToTop(false);
  }, [tab, page]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    setShowToTop(scrollRef.current.scrollTop > 180);
  };

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showSearchStrip = !page && (tab === 'home' || tab === 'cat');
  const activeCategories = tab === 'home' ? QUICK_HOME_CATEGORIES : CATEGORIES;

  const { cur: liveDiscountPct } = getTier(monthTotal + cartSubtotal);
  const discountedTotal = cartSubtotal * (1 - liveDiscountPct / 100);
  const showDock =
    (!page && (tab === 'home' || tab === 'cat')) || (!page && tab === 'cart' && cartCount > 0);

  const renderTopBar = () => {
    if (page === 'notif') {
      return (
        <>
          <button
            type="button"
            aria-label="Orqaga"
            onClick={() => openPage(null)}
            className="w-10 h-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center flex-none active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="flex-1 text-base font-extrabold tracking-tight truncate">Xabarlar</h1>
        </>
      );
    }
    if (page === 'track') {
      return (
        <>
          <button
            type="button"
            aria-label="Orqaga"
            onClick={() => openPage(null)}
            className="w-10 h-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center flex-none active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-base font-extrabold leading-tight truncate">Buyurtma #2481</h1>
            <small className="block text-[11.5px] text-white/85 tabular-nums">
              12 quti · {formatSom(1468000)}
            </small>
          </div>
        </>
      );
    }
    if (page === 'success') {
      return <h1 className="flex-1 text-base font-extrabold tracking-tight">Rahmat!</h1>;
    }
    if (page === 'chat') {
      return (
        <>
          <button
            type="button"
            aria-label="Orqaga"
            onClick={() => openPage(null)}
            className="w-10 h-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center flex-none active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="w-9 h-9 rounded-xl bg-white/20 font-extrabold text-sm flex items-center justify-center flex-none">
            M
          </span>
          <div className="flex-1 min-w-0">
            <h1 className="text-base font-extrabold leading-tight truncate">Madina</h1>
            <small className="block text-[11.5px] text-white/85">Operator · onlayn</small>
          </div>
        </>
      );
    }
    if (page === 'shop' || page === 'fin' || page === 'about') {
      const titles = {
        shop: "Do'kon ma'lumotlari",
        fin: 'Hisob-kitob',
        about: 'Biz haqimizda',
      };
      return (
        <>
          <button
            type="button"
            aria-label="Orqaga"
            onClick={() => openPage(null)}
            className="w-10 h-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center flex-none active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="flex-1 text-base font-extrabold tracking-tight truncate">
            {titles[page]}
          </h1>
        </>
      );
    }

    if (tab === 'cat') {
      return (
        <>
          <button
            type="button"
            aria-label="Bosh sahifaga"
            onClick={() => goTab('home')}
            className="w-10 h-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center flex-none active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-base font-extrabold leading-tight truncate">LAL ANAAR · Katalog</h1>
            <small className="block text-[11.5px] text-white/85">
              {PRODUCTS.length} ta mahsulot · narxlar qutida
            </small>
          </div>
          <button
            type="button"
            aria-label="Savat"
            onClick={() => goTab('cart')}
            className="relative w-10 h-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center flex-none active:scale-95"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-white text-[#800020] text-[10.5px] font-extrabold flex items-center justify-center shadow-xs tabular-nums">
                {cartCount}
              </span>
            )}
          </button>
        </>
      );
    }

    if (tab === 'cart') {
      return (
        <>
          <button
            type="button"
            aria-label="Katalogga"
            onClick={() => goTab('cat')}
            className="w-10 h-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center flex-none active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-base font-extrabold leading-tight truncate">Mening savatim</h1>
            {cartCount > 0 && (
              <small className="block text-[11.5px] text-white/85 tabular-nums">
                {cartCount} quti mahsulot
              </small>
            )}
          </div>
          {cartCount > 0 && (
            <button
              type="button"
              aria-label="Tozalash"
              onClick={() => setSheet({ type: 'confirmClear' })}
              className="w-10 h-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center flex-none active:scale-95"
            >
              <Trash2 className="w-4.5 h-4.5" />
            </button>
          )}
        </>
      );
    }

    if (tab === 'ord') {
      return (
        <>
          <h1 className="flex-1 text-base font-extrabold tracking-tight">Buyurtmalarim</h1>
          <button
            type="button"
            aria-label="Savat"
            onClick={() => goTab('cart')}
            className="relative w-10 h-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center flex-none active:scale-95"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-white text-[#800020] text-[10.5px] font-extrabold flex items-center justify-center shadow-xs tabular-nums">
                {cartCount}
              </span>
            )}
          </button>
        </>
      );
    }

    if (tab === 'me') {
      return (
        <>
          <h1 className="flex-1 text-base font-extrabold tracking-tight">Profil</h1>
          <button
            type="button"
            aria-label="Xabarlar"
            onClick={() => openPage('notif')}
            className="relative w-10 h-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center flex-none active:scale-95"
          >
            <Bell className="w-5 h-5" />
            {unreadNotifCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-white text-[#800020] text-[10.5px] font-extrabold flex items-center justify-center shadow-xs tabular-nums">
                {unreadNotifCount}
              </span>
            )}
          </button>
        </>
      );
    }

    // Default: Home top bar
    return (
      <>
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <img
            src={LOGO}
            alt="Lal Anaar"
            className="w-9 h-9 rounded-xl bg-white object-contain p-0.5 shadow-xs flex-none"
          />
          <div className="min-w-0">
            <h1 className="text-[16px] font-extrabold leading-tight tracking-wide truncate">
              LAL ANAAR
            </h1>
            <small className="block text-[11.5px] text-white/85 truncate">
              Dilnoza · «Baraka» do'koni
            </small>
          </div>
        </div>
        <button
          type="button"
          aria-label="Xabarlar"
          onClick={() => openPage('notif')}
          className="relative w-10 h-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center flex-none active:scale-95"
        >
          <Bell className="w-5 h-5" />
          {unreadNotifCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-white text-[#800020] text-[10.5px] font-extrabold flex items-center justify-center shadow-xs tabular-nums">
              {unreadNotifCount}
            </span>
          )}
        </button>
        <button
          type="button"
          aria-label="Savat"
          onClick={() => goTab('cart')}
          className="relative w-10 h-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center flex-none active:scale-95"
        >
          <ShoppingCart className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-white text-[#800020] text-[10.5px] font-extrabold flex items-center justify-center shadow-xs tabular-nums">
              {cartCount}
            </span>
          )}
        </button>
      </>
    );
  };

  const renderPageContent = () => {
    if (page === 'notif') return <NotifView />;
    if (page === 'track') return <TrackView />;
    if (page === 'success') return <SuccessView />;
    if (page === 'chat') return <ChatView />;
    if (page === 'shop') return <ShopView />;
    if (page === 'fin') return <FinanceView />;
    if (page === 'about') return <AboutView />;

    switch (tab) {
      case 'cat':
        return <CatalogView />;
      case 'cart':
        return <CartView />;
      case 'ord':
        return <OrdersView />;
      case 'me':
        return <ProfileView />;
      default:
        return <HomeView />;
    }
  };

  const toastToneClass =
    toast?.tone === 'warn'
      ? 'bg-[#C48414]'
      : toast?.tone === 'red'
        ? 'bg-[#800020]'
        : toast?.tone === 'blue'
          ? 'bg-[#2B59B5]'
          : 'bg-[#16A34A]';

  return (
    <div className="min-h-[100dvh] bg-[#EAE6E6] dark:bg-[#090809] md:p-4 flex justify-center">
      <div className="relative w-full max-w-6xl h-[100dvh] md:h-[calc(100dvh-2rem)] bg-[#F4F2F2] dark:bg-[#121011] md:rounded-3xl md:border md:border-stone-300/80 dark:md:border-stone-800 md:shadow-2xl flex overflow-hidden">
        {/* Desktop Sidebar Navigation */}
        <aside className="hidden md:flex flex-col w-60 flex-none bg-white dark:bg-[#191516] border-r border-stone-200 dark:border-stone-800 p-3.5 justify-between">
          <div>
            <div className="flex items-center gap-2.5 px-2 pb-4 mb-3 border-b border-stone-100 dark:border-stone-800">
              <img
                src={LOGO}
                alt="Lal Anaar"
                className="w-10 h-10 rounded-xl bg-white border border-stone-200 p-0.5 object-contain"
              />
              <div className="min-w-0">
                <div className="font-display font-extrabold text-base text-[#800020] dark:text-[#F4728A] leading-tight">
                  LAL ANAAR
                </div>
                <div className="text-[11.5px] text-stone-500 dark:text-stone-400 truncate">
                  «Baraka» do'koni
                </div>
              </div>
            </div>

            <nav className="space-y-1">
              {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
                const active = tab === id && !page;
                const badge = id === 'cart' ? cartCount : id === 'me' ? unreadChat : 0;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => goTab(id)}
                    className={`w-full flex items-center gap-3 px-3 h-11 rounded-xl text-sm font-semibold transition-colors ${
                      active
                        ? 'bg-[#FBECEF] dark:bg-[#361820] text-[#800020] dark:text-[#F4728A] font-bold'
                        : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800/70'
                    }`}
                  >
                    <Icon className="w-4.5 h-4.5 flex-none" />
                    <span className="flex-1 text-left">{label}</span>
                    {badge > 0 && (
                      <span className="min-w-[20px] h-5 px-1.5 rounded-full bg-[#800020] text-white text-[11px] font-bold flex items-center justify-center tabular-nums">
                        {badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="rounded-2xl p-3 bg-gradient-to-br from-[#8B0000] to-[#5E0017] text-white">
            <div className="flex items-center gap-1.5 text-xs font-bold opacity-90">
              <Droplet className="w-3.5 h-3.5" />
              <span>Anor darajasi: Kumush</span>
            </div>
            <div className="text-lg font-extrabold mt-1 tabular-nums">{formatSom(monthTotal)}</div>
            <div className="text-[11px] opacity-80">bu oygi umumiy xarid</div>
          </div>
        </aside>

        {/* Main Column */}
        <div className="relative flex-1 min-w-0 flex flex-col overflow-hidden">
          {/* Top Burgundy Header (compact 52px) */}
          <header className="h-[54px] px-3.5 bg-gradient-to-b from-[#8B0000] to-[#6E001A] dark:from-[#960A28] dark:to-[#6E001A] text-white flex items-center gap-2.5 flex-none z-20 shadow-sm">
            {renderTopBar()}
          </header>

          {/* Compact Search & Filter Subheader on Catalog (sticky) */}
          {showSearchStrip && tab === 'cat' && (
            <div className="bg-white dark:bg-[#1A1617] border-b border-stone-200 dark:border-stone-800 px-3.5 py-2 flex-none z-10">
              <div className="flex items-center gap-2 h-9 px-3 rounded-full bg-[#F5F3F3] dark:bg-[#121011] border border-stone-200 dark:border-stone-700 focus-within:border-[#800020]">
                <Search className="w-4 h-4 text-[#800020] dark:text-[#F4728A] flex-none" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Mahsulot qidirish: «anor», «0,5», «olxo'ri»…"
                  className="flex-1 bg-transparent text-[13.5px] text-stone-900 dark:text-stone-100 placeholder:text-stone-400 outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    aria-label="Tozalash"
                    onClick={() => setSearchQuery('')}
                    className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="flex gap-1.5 overflow-x-auto no-scrollbar mt-2 -mx-3.5 px-3.5">
                {activeCategories.map((c) => {
                  const active = c === cat;
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCat(c)}
                      className={`flex-none h-7 px-3 rounded-full text-xs font-semibold whitespace-nowrap border transition-colors ${
                        active
                          ? 'bg-[#800020] text-white border-[#800020]'
                          : 'bg-white dark:bg-[#1E1A1B] text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700'
                      }`}
                    >
                      {c === 'Javonim' ? '♥ ' : ''}
                      {c}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Scrollable Content */}
          <main
            ref={scrollRef}
            onScroll={handleScroll}
            className={`flex-1 overflow-y-auto no-scrollbar px-3.5 pt-3 ${
              showDock ? 'pb-36 md:pb-24' : 'pb-24 md:pb-8'
            }`}
          >
            {/* On Home tab, keep search + quick category chips inline at top of scroll so mobile sticky chrome stays <15% */}
            {showSearchStrip && tab === 'home' && (
              <div className="mb-3 space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    goTab('cat');
                    window.setTimeout(() => searchInputRef.current?.focus(), 60);
                  }}
                  className="w-full flex items-center gap-2 h-10 px-3.5 rounded-full bg-white dark:bg-[#1E1A1B] border border-stone-200 dark:border-stone-700 text-stone-400 text-[13.5px] shadow-xs text-left"
                >
                  <Search className="w-4 h-4 text-[#800020] dark:text-[#F4728A] flex-none" />
                  <span className="truncate">Mahsulot qidirish (anor, 1 L, gazli…)</span>
                </button>
                <div className="flex gap-1.5 overflow-x-auto no-scrollbar -mx-3.5 px-3.5">
                  {activeCategories.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => {
                        setCat(c);
                        goTab('cat');
                      }}
                      className="flex-none h-7.5 px-3 rounded-full bg-white dark:bg-[#1E1A1B] border border-stone-200 dark:border-stone-700 text-xs font-semibold text-stone-700 dark:text-stone-200 whitespace-nowrap hover:border-[#800020]"
                    >
                      {c === 'Javonim' ? '♥ ' : ''}
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {renderPageContent()}
          </main>

          {/* Floating Scroll-to-Top Button (CCINEXT style) */}
          <button
            type="button"
            aria-label="Tepaga"
            onClick={scrollToTop}
            className={`absolute right-3.5 ${
              showDock ? 'bottom-32 md:bottom-20' : 'bottom-20 md:bottom-6'
            } w-10 h-10 rounded-full bg-[#800020] text-white shadow-lg flex items-center justify-center z-20 transition-all ${
              showToTop
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 translate-y-2 pointer-events-none'
            }`}
          >
            <ArrowUp className="w-4.5 h-4.5" />
          </button>

          {/* Sticky Bottom Payment Dock (CCINEXT style with vibrant green CTA) */}
          {showDock && (
            <div className="absolute left-0 right-0 bottom-[60px] md:bottom-0 bg-white/95 dark:bg-[#1B1718]/95 backdrop-blur-md border-t border-stone-200 dark:border-stone-800 px-3.5 py-2 flex items-center justify-between gap-3 z-20 shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
              <div className="min-w-0">
                <small className="block text-[11px] font-medium text-stone-500 dark:text-stone-400">
                  {tab === 'cart'
                    ? "To'lovga jami"
                    : `Umumiy to'lov summasi${cartCount ? ` · ${cartCount} quti` : ''}`}
                </small>
                <strong className="block text-[16px] font-extrabold text-stone-900 dark:text-white tabular-nums leading-tight">
                  {cartCount > 0 ? formatSom(discountedTotal) : "0 so'm"}
                </strong>
              </div>

              {tab === 'cart' ? (
                <button
                  type="button"
                  onClick={() => setSheet({ type: 'pin' })}
                  className="h-10 px-4.5 rounded-full bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-[13.5px] inline-flex items-center gap-1.5 shadow-md shadow-emerald-600/25 whitespace-nowrap active:scale-95 transition-all"
                >
                  <Lock className="w-4 h-4" />
                  <span>Buyurtma berish ›</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => goTab(cartCount > 0 ? 'cart' : 'cat')}
                  className="h-10 px-4.5 rounded-full bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-[13.5px] inline-flex items-center gap-1.5 shadow-md shadow-emerald-600/25 whitespace-nowrap active:scale-95 transition-all"
                >
                  <span>Savatga o'tish</span>
                  <ShoppingCart className="w-4 h-4" />
                </button>
              )}
            </div>
          )}

          {/* Mobile 5-Tab Bottom Navigation */}
          <nav className="md:hidden absolute left-0 right-0 bottom-0 h-[60px] bg-white dark:bg-[#1A1617] border-t border-stone-200 dark:border-stone-800 grid grid-cols-5 z-30 pb-[env(safe-area-inset-bottom)]">
            {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
              const active = tab === id;
              const badge = id === 'cart' ? cartCount : id === 'me' ? unreadChat : 0;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => goTab(id)}
                  className={`relative flex flex-col items-center justify-center gap-0.5 text-[10.5px] transition-colors ${
                    active
                      ? 'text-[#800020] dark:text-[#F4728A] font-bold'
                      : 'text-stone-500 dark:text-stone-400 font-medium'
                  }`}
                >
                  {active && (
                    <span className="absolute top-0 w-7 h-[2.5px] rounded-b bg-[#800020] dark:bg-[#F4728A]" />
                  )}
                  <Icon className="w-5 h-5" />
                  <span className="tracking-tight">{label}</span>
                  {badge > 0 && (
                    <span
                      key={id === 'cart' ? bumpKey : undefined}
                      className={`absolute top-1 left-[calc(50%+6px)] min-w-[17px] h-[17px] px-1 rounded-full bg-[#800020] text-white text-[10px] font-bold flex items-center justify-center border-2 border-white dark:border-[#1A1617] tabular-nums ${
                        id === 'cart' && bumpKey > 0 ? 'animate-bump' : ''
                      }`}
                    >
                      {badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Toast Notification */}
          {toast && (
            <button
              type="button"
              onClick={() => {
                dismissToast();
                if (toast.actionTab) {
                  goTab(toast.actionTab, toast.actionPage || null);
                } else if (toast.actionPage) {
                  openPage(toast.actionPage);
                }
              }}
              className={`absolute left-3 right-3 top-14 z-40 flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-white shadow-xl text-left transition-all ${toastToneClass}`}
            >
              <span className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center flex-none">
                <ToastIcon icon={toast.icon} />
              </span>
              <div className="flex-1 min-w-0">
                <strong className="block text-[13px] font-bold leading-tight truncate">
                  {toast.title}
                </strong>
                <span className="block text-[11.5px] opacity-90 truncate">{toast.text}</span>
              </div>
            </button>
          )}
        </div>
      </div>

      {/* Bottom Sheets & Confirmation Modals */}
      <SheetsAndModals />
    </div>
  );
};
