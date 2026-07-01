'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useTransform, useMotionValue } from 'motion/react';
import Image from 'next/image';
import LanguageToggle from '@/components/LanguageToggle';
import { useLanguage } from '@/components/LanguageProvider';

const UNIQUE_ITEMS = [
  { id: 0, thumbnail: '/thumbnails/ADRIA_-_CREMA_CLUB_-_VIDEODROP.jpg', videoUrl: '/videos/ADRIA_-_CREMA_CLUB_-_1080x1920_-_videodropphotograpy.mp4', title: 'ADRIA — CREMA CLUB', category: 'VIDEODROP', isVertical: true },
  { id: 1, thumbnail: '/thumbnails/FEZZO_E_GABBS_-_NATURAL_-_FULLSET.jpg', videoUrl: '/videos/FEZZO_E_GABBS_-_NATURAL_-1920x1080-fullset.mp4', title: 'FEZZO E GABBS — NATURAL', category: 'FULLSET', isVertical: false },
  { id: 2, thumbnail: '/thumbnails/FEZZO_E_RICCK_-_BOOM_-_VIDEORELEASE.jpg', videoUrl: '/videos/FEZZO_E_RICCK_-_BOOM_-1080x1920-videorelease.mp4', title: 'FEZZO E RICCK — BOOM', category: 'VIDEORELEASE', isVertical: true },
  { id: 3, thumbnail: '/thumbnails/FEZZO_GABBS_-_NATURAL_-_FULLSET_2.jpg', videoUrl: '/videos/FEZZO_GABBS_-_NATURAL-1920x1080-fullset.mp4', title: 'FEZZO GABBS — NATURAL II', category: 'FULLSET', isVertical: false },
  { id: 4, thumbnail: '/thumbnails/GROOVE_DE_LIGHT_-_EL_FORTIN_-_VIDEODROP.jpg', videoUrl: '/videos/GROOVE_DE_LIGHT_-_EL_FORTIN-1920x1080-videodropphotography.mp4', title: 'GROOVE DE LIGHT — EL FORTIN', category: 'VIDEODROP', isVertical: false },
  { id: 5, thumbnail: '/thumbnails/MOHRR_-_FANTASMAS_DO_PASSADO_-_VIDEOCLIP.jpg', videoUrl: '/videos/MOHRR_-_FANTASMAS_DO_PASSADO-1920x1080-videorelease.mp4', title: 'MOHRR — FANTASMAS DO PASSADO', category: 'VIDEOCLIP', isVertical: false },
  { id: 6, thumbnail: '/thumbnails/NERPHEU_-_DIXTRAVA_-_MULTICAM_VIDEODROP.jpg', videoUrl: '/videos/NERPHEU_-_DIXTRAVA_-1920x1080-multicamvideodrop.mp4', title: 'NERPHEU — DIXTRAVA', category: 'MULTICAM', isVertical: false },
  { id: 7, thumbnail: '/thumbnails/PEDROZ_-_CAVAN77_-_VIDEODROP.jpg', videoUrl: '/videos/PEDROZ_-_CAVAN77_-_1080x1920_-_videodropphotograpy.mp4', title: 'PEDROZ — CAVAN77', category: 'VIDEODROP', isVertical: true },
  { id: 8, thumbnail: '/thumbnails/RICCK_-_EL_FORTIN_-_MULTICAM_VIDEODROP.jpg', videoUrl: '/videos/RICCK_-_EL_FORTIN_-1080x1920-multicamvideodrop.mp4', title: 'RICCK — EL FORTIN', category: 'MULTICAM', isVertical: true },
  { id: 9, thumbnail: '/thumbnails/RICCK_-_THE_COLONIA_-_MULTICAM_VIDEODROP.jpg', videoUrl: '/videos/RICCK_-_THE_COLONIA_-_1080x1920_-_multicamvideodrop.mp4', title: 'RICCK — THE COLONIA', category: 'MULTICAM', isVertical: true },
  { id: 10, thumbnail: '/thumbnails/STIZI_-_EP_-_VIDEORELEASE.jpg', videoUrl: '/videos/STIZI_-_EP_-_1920x1080_-_videorelease.mp4', title: 'STIZI — EP', category: 'VIDEORELEASE', isVertical: false },
  { id: 11, thumbnail: '/thumbnails/STIZI_-_FIELD_-_VIDEODROP.jpg', videoUrl: '/videos/STIZI_-_FIELD_-1920x1080-videodropphotography.mp4', title: 'STIZI — FIELD', category: 'VIDEODROP', isVertical: false },
  { id: 12, thumbnail: '/thumbnails/STIZI_-_HOJE_TU_TOMA_-_VIDEORELEASE.jpg', videoUrl: '/videos/STIZI_-_HOJE_TU_TOMA_-1080x1920-videorelease.mp4', title: 'STIZI — HOJE TU TOMA', category: 'VIDEORELEASE', isVertical: true },
  { id: 13, thumbnail: '/thumbnails/THE_CONTRABAND_-_EL_FORTIN_-_MULTICAM_VIDEODROP.jpg', videoUrl: '/videos/THE_CONTRABAND_-_EL_FORTIN_-_1920x1080_-_multicamvideodrop.mp4', title: 'THE CONTRABAND — EL FORTIN', category: 'MULTICAM', isVertical: false },
  { id: 14, thumbnail: '/thumbnails/ZAARK_E_INNDRIVE_-_TAKE_OUR_FLIGHT_-_VIDEORELEASE.jpg', videoUrl: '/videos/ZAARK_E_INNDRIVE_-_TAKE_OUR_FLIGHT-1080x1920-videorelease.mp4', title: 'ZAARK E INNDRIVE — TAKE OUR FLIGHT', category: 'VIDEORELEASE', isVertical: true },
  { id: 15, thumbnail: '/thumbnails/ZAARK_E_RICK_-_SKAL_-_VIDEORELEASE.jpg', videoUrl: '/videos/ZAARK_E_RICK_-_SKAL_-_1080x1920_-_videorelease.mp4', title: 'ZAARK E RICK — SKAL', category: 'VIDEORELEASE', isVertical: true },
];

const UNIQUE_COUNT = UNIQUE_ITEMS.length;
const GAP = 4;
const COLS = 14;
const ROWS = 12;

const mod = (val: number, m: number) => ((val % m) + m) % m;

function useGridConfig() {
  const [config, setConfig] = useState({ cellW: 350, cellH: 500 });

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      if (w < 640) {
        const cellW = Math.floor(w / 2.35);
        const cellH = Math.floor(h / 2.6);
        setConfig({ cellW, cellH });
      } else {
        setConfig({ cellW: 350, cellH: 500 });
      }
    };

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const fullW = config.cellW + GAP;
  const fullH = config.cellH + GAP;
  const totalW = COLS * fullW;
  const totalH = ROWS * fullH;

  return { ...config, fullW, fullH, totalW, totalH };
}

const PORTFOLIO_ITEMS = Array.from({ length: COLS * ROWS }).map((_, i) => ({
  ...UNIQUE_ITEMS[i % UNIQUE_COUNT],
  uniqueId: i,
  col: i % COLS,
  row: Math.floor(i / COLS),
}));

interface GridConfig {
  cellW: number;
  cellH: number;
  fullW: number;
  fullH: number;
  totalW: number;
  totalH: number;
}

function InfiniteItem({ item, dragX, dragY, onSelect, isDragging, grid }: {
  item: typeof PORTFOLIO_ITEMS[0];
  dragX: any;
  dragY: any;
  onSelect: (item: typeof UNIQUE_ITEMS[0]) => void;
  isDragging: React.RefObject<boolean>;
  grid: GridConfig;
}) {
  const baseX = item.col * grid.fullW;
  const baseY = item.row * grid.fullH;

  const x = useTransform(dragX, (v: number) => mod(baseX + v + grid.fullW, grid.totalW) - grid.fullW - v);
  const y = useTransform(dragY, (v: number) => mod(baseY + v + grid.fullH, grid.totalH) - grid.fullH - v);

  return (
    <motion.div
      className="absolute top-0 left-0 group overflow-hidden bg-black/20 grayscale hover:grayscale-0 transition-all duration-700 ease-in-out border border-white/5 cursor-pointer will-change-transform"
      style={{ x, y, width: `${grid.cellW}px`, height: `${grid.cellH}px` }}
      whileHover={{ scale: 0.98 }}
      onPointerUp={() => {
        if (!isDragging.current) {
          onSelect(item);
        }
      }}
    >
      <Image
        src={item.thumbnail}
        alt={item.title}
        fill
        className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out pointer-events-none"
        unoptimized
        priority={item.uniqueId < 6}
      />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />

      {/* Strong gradient for text readability */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
          <p className="font-sans font-bold text-[9px] sm:text-[11px] text-white/70 mb-1.5 tracking-widest drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">{item.category}</p>
          <h3 className="font-heading font-bold text-xl sm:text-2xl tracking-tighter uppercase text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">{item.title}</h3>
        </div>
      </div>
    </motion.div>
  );
}

export default function Page() {
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);
  const isDragging = useRef(false);
  const [activeItem, setActiveItem] = useState<typeof UNIQUE_ITEMS[0] | null>(null);
  const { t } = useLanguage();
  const grid = useGridConfig();

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#111] text-white" style={{ isolation: 'isolate' }}>
      {/* Film Grain */}
      <div className="absolute inset-0 z-40 film-grain mix-blend-overlay pointer-events-none"></div>

      {/* Top Header Overlay - absolute so mix-blend-difference works with grid */}
      <header className="absolute top-0 left-0 w-full z-30 p-6 sm:p-10 flex justify-between items-center pointer-events-none">
        <h1 className="font-heading uppercase tracking-tighter text-white mix-blend-difference transition-all duration-500 text-3xl sm:text-6xl md:text-7xl pointer-events-auto">
          {t('title')}
        </h1>
        <div className="pointer-events-auto">
          <LanguageToggle />
        </div>
      </header>

      {/* Bottom Footer Overlay - absolute so mix-blend-difference works */}
      <footer className="absolute bottom-0 left-0 w-full z-30 p-4 sm:p-8 flex flex-col items-center justify-end pointer-events-none pb-8">
        <div className="flex flex-col items-center text-center gap-4 max-w-4xl w-full pointer-events-auto">
          {/* Socials */}
          <div className="flex items-center gap-6 text-white mix-blend-difference">
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="https://www.behance.net/" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/></svg>
            </a>
            <a href="https://api.whatsapp.com/send/?phone=5547996938902&text=Ol%C3%A1%2C+vim+pelo+site%3F&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity duration-300">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
            </a>
          </div>

          {/* Description */}
          <p className="font-sans font-medium text-[10px] sm:text-xs tracking-wide uppercase text-white mix-blend-difference">
            {t('description')}
          </p>

          {/* Expertises - NOT translated */}
          <p className="font-sans font-semibold text-[9px] sm:text-[10px] tracking-widest text-white/50 uppercase mt-2 mix-blend-difference">
            FILMMAKING | VIDEOCLIPS | AFTERMOVIES | VIDEODROPS | FULLSET | PHOTOGRAPHY | MULTICAM
          </p>
        </div>
      </footer>

      {/* Infinite Draggable Grid */}
      <div className="absolute inset-0 z-10 w-screen h-screen">
        <motion.div
          drag
          style={{ x: dragX, y: dragY }}
          dragElastic={0}
          dragMomentum={true}
          onDragStart={() => { isDragging.current = true; }}
          onDragEnd={() => {
            setTimeout(() => { isDragging.current = false; }, 100);
          }}
          className="w-full h-full cursor-grab active:cursor-grabbing relative"
        >
          {PORTFOLIO_ITEMS.map((item) => (
            <InfiniteItem
              key={item.uniqueId}
              item={item}
              dragX={dragX}
              dragY={dragY}
              onSelect={setActiveItem}
              isDragging={isDragging}
              grid={grid}
            />
          ))}
        </motion.div>
      </div>

      {/* Video Modal */}
      {activeItem && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-12 cursor-pointer"
          onClick={() => setActiveItem(null)}
        >
          <button
            onClick={(e) => { e.stopPropagation(); setActiveItem(null); }}
            className="absolute top-6 right-6 text-white/50 hover:text-white font-sans text-sm tracking-widest uppercase transition-colors cursor-pointer z-10"
          >
            {t('close')}
          </button>

          <div className="flex flex-col items-center gap-4 w-full max-w-6xl">
            <div
              className={`relative w-full bg-black rounded-lg overflow-hidden shadow-2xl ring-1 ring-white/10 cursor-default ${
                activeItem.isVertical
                  ? 'aspect-[9/16] max-h-[75vh] w-auto mx-auto'
                  : 'aspect-video'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <video
                src={activeItem.videoUrl}
                autoPlay
                controls
                className="w-full h-full object-contain"
              />
            </div>
            
            {/* Mobile Only CTA */}
            <a 
              href={`https://api.whatsapp.com/send/?phone=5547996938902&text=Ol%C3%A1%2C+vim+pelo+site%2C+assisti+ao+projeto+${encodeURIComponent(activeItem.title)}+e+gostaria+de+mais+informa%C3%A7%C3%B5es!&type=phone_number&app_absent=0`}
              target="_blank" 
              rel="noopener noreferrer"
              className="sm:hidden flex items-center justify-center gap-2 text-white/80 hover:text-white font-sans text-xs tracking-widest font-semibold uppercase transition-colors px-6 py-3 bg-white/5 rounded-full ring-1 ring-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              {t('whatsappCta')}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
            </a>
          </div>
        </div>
      )}
    </main>
  );
}
