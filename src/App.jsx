import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade, Mousewheel } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

import bottle1 from './assets/bottle1.png';
import bottle2 from './assets/bottle2.png';
import bottle3 from './assets/bottle3.png';
import bottle4 from './assets/bottle4.png';

import fruit1 from './assets/fruit1.png';
import fruit2 from './assets/fruit2.png';
import fruit3 from './assets/fruit3.png';
import fruit4 from './assets/fruit4.png';

const juiceProducts = [
  {
    id: 1,
    title: 'Lemon',
    subtitle: '100% Natural Organic Juice',
    bgColor: '#5b9d62',
    bottleImg: bottle1,
    fruitImg: fruit1,
    desc: 'Pure Alphonso Mango & Passionfruit Blend',
    alcohol: '0.0%',
    volume: '750ml',
    vintage: '2024',
    pairings: ['Almond Cheese', 'Dark Chocolate Truffle', 'Fresh Tart']
  },
  {
    id: 2,
    title: 'Orange',
    subtitle: 'Cold Pressed Fruit Juice',
    bgColor: '#deee52',
    bottleImg: bottle2,
    fruitImg: fruit2,
    desc: 'Fresh Strawberry, Raspberry & Cranberry Mix',
    alcohol: '0.0%',
    volume: '750ml',
    vintage: '2024',
    pairings: ['Wild Berry', 'Forest Fruit', 'Mint Leaf']
  },
  {
    id: 3,
    title: 'Blue Berry',
    subtitle: 'Hydrating Detox Juice',
    bgColor: '#9764b2',
    bottleImg: bottle3,
    fruitImg: fruit3,
    desc: 'Tangy Lemon, Sweet Lime & Garden Mint',
    alcohol: '0.0%',
    volume: '750ml',
    vintage: '2024',
    pairings: ['Lime Slice', 'Green Mint', 'Cucumber']
  },
  {
    id: 4,
    title: 'Mango Surge',
    subtitle: 'Tropical Summer Drink',
    bgColor: '#FECA57',
    bottleImg: bottle4,
    fruitImg: fruit4,
    desc: 'Juicy Golden Pineapple & Sweet Orange Twist',
    alcohol: '0.0%',
    volume: '750ml',
    vintage: '2024',
    pairings: ['Pineapple Ring', 'Coconut Flakes', 'Honey']
  }
];

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [toast, setToast] = useState(null);

  const bottleRef = useRef(null);
  const backShadowRef = useRef(null);

  const currentProduct = juiceProducts[activeIndex];

  const handleSlideChange = (swiper) => {
    const isNext = swiper.activeIndex > swiper.previousIndex;
    setDirection(isNext ? 1 : -1);
    setActiveIndex(swiper.realIndex);

    // Main Bottle Center Pop Animation
    if (bottleRef.current) {
      gsap.fromTo(
        bottleRef.current,
        { scale: 0.85, opacity: 0.7 },
        { scale: 1, opacity: 1, duration: 0.6, ease: 'power2.out' }
      );
    }

    // Background Bottle Shadow Wave Effect
    if (backShadowRef.current) {
      gsap.fromTo(
        backShadowRef.current,
        { scale: 1, opacity: 0.6, filter: 'blur(10px)' },
        {
          scale: 1.4,
          opacity: 0,
          filter: 'blur(30px)',
          duration: 0.8,
          ease: 'power2.out'
        }
      );
    }
  };

  const showToastNotification = (text, type = 'success') => {
    setToast({ text, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const handleConfirmOrder = () => {
    setIsOrderPlaced(true);
    showToastNotification(`Added ${currentProduct.title} to Order!`, 'success');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsOrderPlaced(false);
  };

  const contentVariants = {
    initial: (dir) => ({
      opacity: 0,
      x: dir > 0 ? 250 : -250
    }),
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] }
    },
    exit: (dir) => ({
      opacity: 0,
      x: dir > 0 ? -250 : 250,
      transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] }
    })
  };

  return (
    <div
      style={{
        backgroundColor: currentProduct.bgColor,
        transition: 'background-color 0.8s ease-in-out',
        width: '100vw',
        height: '100vh',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Subtitle */}
      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={`sub-${currentProduct.id}`}
          custom={direction}
          variants={contentVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{
            position: 'absolute',
            top: '35px',
            zIndex: 20,
            color: '#ffffff',
            fontSize: '0.9rem',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            fontWeight: 600,
            pointerEvents: 'none'
          }}
        >
          {currentProduct.subtitle}
        </motion.div>
      </AnimatePresence>

      {/* Main Title Background Text */}
      <AnimatePresence custom={direction} mode="wait">
        <motion.h1
          key={`title-${currentProduct.id}`}
          custom={direction}
          variants={contentVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{
            position: 'absolute',
            fontSize: '9.5rem',
            fontWeight: 900,
            color: '#ffffff',
            zIndex: 2,
            letterSpacing: '-2px',
            userSelect: 'none',
            textAlign: 'center',
            textTransform: 'uppercase',
            pointerEvents: 'none'
          }}
        >
          {currentProduct.title}
        </motion.h1>
      </AnimatePresence>

      {/* Floating Fruits */}
      <AnimatePresence custom={direction} mode="wait">
        <div style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 3, pointerEvents: 'none' }}>
          {[
            { top: '20%', left: '20%', delay: 0.05 },
            { top: '25%', right: '20%', delay: 0.1 },
            { bottom: '20%', left: '22%', delay: 0.15 },
            { bottom: '22%', right: '22%', delay: 0.2 }
          ].map((pos, idx) => (
            <motion.img
              key={`${currentProduct.id}-fruit-${idx}`}
              src={currentProduct.fruitImg}
              custom={direction}
              initial={(dir) => ({ opacity: 0, x: dir > 0 ? 150 : -150, scale: 0.5 })}
              animate={{ opacity: 0.9, x: 0, scale: 1 }}
              exit={(dir) => ({ opacity: 0, x: dir > 0 ? -150 : 150, scale: 0.5 })}
              transition={{ duration: 0.6, delay: pos.delay }}
              style={{
                position: 'absolute',
                width: '75px',
                height: '75px',
                filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.15))',
                ...pos
              }}
            />
          ))}
        </div>
      </AnimatePresence>

      {/* Center Fixed Bottle Container */}
      <div
        style={{
          zIndex: 5,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none'
        }}
      >
        {/* Background Expanding Bottle Shadow */}
        <img
          key={`shadow-${currentProduct.id}`}
          ref={backShadowRef}
          src={currentProduct.bottleImg}
          alt="Bottle Shadow"
          style={{
            height: '460px',
            position: 'absolute',
            objectFit: 'contain',
            pointerEvents: 'none',
            zIndex: 4,
            filter: 'brightness(0) blur(15px)',
            opacity: 0.4
          }}
        />

        {/* Foreground Main Bottle */}
        <div ref={bottleRef} style={{ zIndex: 6, pointerEvents: 'none' }}>
          <img
            src={currentProduct.bottleImg}
            alt={currentProduct.title}
            style={{
              height: '460px',
              objectFit: 'contain',
              filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.25))'
            }}
          />
        </div>
      </div>

      {/* Order Button */}
      <button
        onClick={() => {
          setIsOrderPlaced(false);
          setIsModalOpen(true);
        }}
        style={{
          position: 'absolute',
          bottom: '40px',
          zIndex: 100,
          padding: '14px 32px',
          borderRadius: '30px',
          border: 'none',
          backgroundColor: '#ffffff',
          color: '#111111',
          fontWeight: 'bold',
          fontSize: '0.95rem',
          cursor: 'pointer',
          boxShadow: '0 8px 20px rgba(0,0,0,0.15)'
        }}
      >
        Order Fresh Juice
      </button>

      {/* Swiper Slider */}
      <Swiper
  modules={[Navigation, EffectFade, Mousewheel]}
  loop={true}
  rewind={false}
  navigation={true}
  mousewheel={{
    forceToAxis: true,
    releaseOnEdges: false,
    sensitivity: 1,
  }}
  speed={700}
  onSlideChange={handleSlideChange}
  className="infinity-swiper"
  style={{
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 10,
  }}
>
  {juiceProducts.map((slide) => (
    <SwiperSlide key={slide.id}>
      <div className="swiper-hit-area" />
    </SwiperSlide>
  ))}
</Swiper>

      {/* Order Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(15, 18, 30, 0.75)',
              backdropFilter: 'blur(10px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 30 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: '#1b1f33',
                color: '#ffffff',
                borderRadius: '24px',
                width: '540px',
                maxWidth: '90%',
                padding: '28px',
                position: 'relative',
                boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
                border: '1px solid rgba(255,255,255,0.08)'
              }}
            >
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                style={{
                  position: 'absolute',
                  top: '18px',
                  right: '18px',
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  border: 'none',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#A6ADC8',
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ✕
              </button>

              {/* Modal Content Grid */}
              <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                {/* Left Side Bottle Preview */}
                <div style={{ width: '140px', display: 'flex', justifyContent: 'center' }}>
                  <img
                    src={currentProduct.bottleImg}
                    alt={currentProduct.title}
                    style={{ height: '230px', objectFit: 'contain' }}
                  />
                </div>

                {/* Right Side Details */}
                <div style={{ flex: 1 }}>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '0 0 4px 0' }}>
                    {currentProduct.title}
                  </h2>
                  <p style={{ color: '#8c94b2', fontSize: '0.8rem', margin: '0 0 16px 0' }}>
                    {currentProduct.subtitle}
                  </p>

                  {/* Specifications Grid */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '8px',
                      marginBottom: '16px',
                      backgroundColor: 'rgba(255,255,255,0.04)',
                      padding: '12px',
                      borderRadius: '12px',
                      textAlign: 'center'
                    }}
                  >
                    <div>
                      <span style={{ fontSize: '0.65rem', color: '#8c94b2', display: 'block' }}>ALCOHOL</span>
                      <strong style={{ fontSize: '0.85rem' }}>{currentProduct.alcohol}</strong>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.65rem', color: '#8c94b2', display: 'block' }}>VOLUME</span>
                      <strong style={{ fontSize: '0.85rem' }}>{currentProduct.volume}</strong>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.65rem', color: '#8c94b2', display: 'block' }}>VINTAGE</span>
                      <strong style={{ fontSize: '0.85rem' }}>{currentProduct.vintage}</strong>
                    </div>
                  </div>

                  {/* Recommended Pairings Badges */}
                  <div style={{ marginBottom: '20px' }}>
                    <span style={{ fontSize: '0.7rem', color: '#8c94b2', display: 'block', marginBottom: '8px' }}>
                      RECOMMENDED PAIRINGS
                    </span>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {currentProduct.pairings.map((pair, idx) => (
                        <span
                          key={idx}
                          style={{
                            fontSize: '0.7rem',
                            backgroundColor: 'rgba(255, 255, 255, 0.08)',
                            padding: '4px 10px',
                            borderRadius: '12px',
                            color: '#d0d4e4'
                          }}
                        >
                          {pair}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Confirm Action / Order Placed Button */}
                  {isOrderPlaced ? (
                    <div
                      style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '12px',
                        backgroundColor: '#10AC84',
                        color: '#ffffff',
                        fontWeight: 'bold',
                        fontSize: '0.85rem',
                        textAlign: 'center',
                        boxShadow: '0 6px 15px rgba(16, 172, 132, 0.3)'
                      }}
                    >
                      ✓ ORDER CONFIRMED!
                    </div>
                  ) : (
                    <button
                      onClick={handleConfirmOrder}
                      style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '12px',
                        border: 'none',
                        background: 'linear-gradient(90deg, #ff7e5f, #feb47b)',
                        color: '#ffffff',
                        fontWeight: 'bold',
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        boxShadow: '0 6px 15px rgba(255, 126, 95, 0.3)'
                      }}
                    >
                      CONFIRM ORDER
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Side Notification Toast Message */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, x: 100, y: 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 100, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              bottom: '30px',
              right: '30px',
              backgroundColor: '#ffffff',
              color: '#111111',
              padding: '12px 20px',
              borderRadius: '8px',
              fontSize: '0.82rem',
              fontWeight: 600,
              boxShadow: '0 10px 25px rgba(0,0,0,0.25)',
              zIndex: 10000,
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: toast.type === 'success' ? '#10AC84' : '#EE5253',
                display: 'inline-block'
              }}
            />
            {toast.text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}