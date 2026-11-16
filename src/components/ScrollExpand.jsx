import { useCallback, useEffect, useRef } from 'react';
import './ScrollExpand.css';

const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);

const smoothstep = (edge0, edge1, x) => {
  const t = clamp((x - edge0) / (edge1 - edge0 || 1e-6), 0, 1);
  return t * t * (3 - 2 * t);
};

const parseEntryPoint = (ep, innerH) => {
  if (typeof ep === 'number') {
    return ep <= 1 ? innerH * ep : ep;
  }
  if (typeof ep === 'string') {
    if (ep === 'lowest' || ep === 'bottom') return innerH;
    if (ep === 'top') return 0;
    if (ep.endsWith('%')) {
      const pct = parseFloat(ep);
      return innerH * (pct / 100);
    }
    const val = parseFloat(ep);
    if (!isNaN(val)) {
      return val <= 1 ? innerH * val : val;
    }
  }
  return innerH;
};

const ScrollExpand = ({
  src = '',
  mediaType = 'image',
  poster = '',
  alt = '',
  title = '',
  entryTitle = '',
  titleTag = '',
  scrollHint = '',
  startWidth = 48,
  startHeight = 56,
  startRadius = 26,
  endRadius = 0,
  mediaZoom = 1.25,
  scrollDistance = 1.0,
  holdDistance = 0.25,
  smoothing = 0.02,
  overlayScrim = 0.58,
  bgFadeStart = 0.0,
  bgFadeEnd = 0.28,
  useWindowScroll = false,
  enabled = true,
  entryPoint = 'lowest',
  onProgress,
  onError,
  children,
  className = '',
  style,
  ...rest
}) => {
  const rootRef = useRef(null);
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const frameRef = useRef(null);
  const mediaRef = useRef(null);
  const titleRef = useRef(null);
  const entryTitleRef = useRef(null);
  const nextTitleRef = useRef(null);
  const overlayRef = useRef(null);
  const scrimRef = useRef(null);
  const hintRef = useRef(null);

  const propsRef = useRef({});
  propsRef.current = {
    startWidth,
    startHeight,
    startRadius,
    endRadius,
    mediaZoom,
    scrollDistance,
    holdDistance,
    smoothing,
    overlayScrim,
    bgFadeStart,
    bgFadeEnd,
    useWindowScroll,
    enabled,
    entryPoint,
    entryTitle,
    titleTag,
    onProgress,
  };

  const applyProgress = useCallback((p) => {
    const frame = frameRef.current;
    const media = mediaRef.current;
    if (!frame || !media) return;
    const c = propsRef.current;

    // Gradual transition from light to dark theme:
    const fadeStart = typeof c.bgFadeStart === 'number' ? c.bgFadeStart : 0.0;
    const fadeEnd = typeof c.bgFadeEnd === 'number' ? c.bgFadeEnd : 0.28;
    const bgFade = smoothstep(fadeStart, fadeEnd, p);
    if (stageRef.current) {
      stageRef.current.style.backgroundColor = `rgba(10, 10, 11, ${bgFade})`;
    }
    if (trackRef.current) {
      trackRef.current.style.backgroundColor = `rgba(10, 10, 11, ${bgFade})`;
    }

    // Scroll expand effect executes slower, expanding gradually across a wider scroll range (p: 0.22 -> 1.0)
    // Finishes well after the background has completely darkened
    const e = smoothstep(0.22, 1.0, p);

    // Responsive dimensions for mobile devices
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const baseW = isMobile ? Math.max(c.startWidth, 80) : c.startWidth;
    const baseH = isMobile ? Math.max(c.startHeight, 52) : c.startHeight;
    const baseR = isMobile ? Math.min(c.startRadius, 18) : c.startRadius;

    const w = baseW + (100 - baseW) * e;
    const h = baseH + (100 - baseH) * e;
    const ix = Math.max(0, (100 - w) / 2);

    // Position entry of card directly below last 3 products (minimal top offset)
    const startTop = isMobile ? 3 : 5;
    const topInset = Math.max(0, startTop * (1 - e));
    const bottomInset = Math.max(0, 100 - h - startTop * (1 - e));
    const leftInset = Math.max(0, ix);
    const rightInset = Math.max(0, ix);
    const r = baseR + (c.endRadius - baseR) * e;
    frame.style.clipPath = `inset(${topInset}% ${rightInset}% ${bottomInset}% ${leftInset}% round ${r}px)`;

    media.style.transform = `scale(${c.mediaZoom + (1 - c.mediaZoom) * e})`;

    if (scrimRef.current) {
      scrimRef.current.style.opacity = `${c.overlayScrim * e}`;
    }

    // Dynamic vertical alignment of title so it tracks the vertical center of the card
    const currentCardH = 100 - topInset - bottomInset;
    const cardCenterY = topInset + currentCardH / 2;
    const titleOffsetY = cardCenterY - 50;

    const hasEntry = Boolean(c.entryTitle);

    if (entryTitleRef.current && nextTitleRef.current) {
      // Transition from entry title ("Kén") to main chapter title ("Lời Hứa Từ Sự Nâng Niu")
      const entryOut = smoothstep(0.18, 0.42, p);
      entryTitleRef.current.style.opacity = `${1 - entryOut}`;
      entryTitleRef.current.style.transform = `translate3d(0, -${22 * entryOut}px, 0)`;

      const nextIn = smoothstep(0.30, 0.54, p);
      nextTitleRef.current.style.opacity = `${nextIn}`;
      nextTitleRef.current.style.transform = `translate3d(0, ${22 * (1 - nextIn)}px, 0)`;
    } else if (nextTitleRef.current) {
      nextTitleRef.current.style.opacity = '1';
      nextTitleRef.current.style.transform = 'translate3d(0, 0, 0)';
    }

    if (titleRef.current) {
      const outStart = hasEntry ? 0.70 : 0.42;
      const outEnd = hasEntry ? 0.92 : 0.88;
      const out = smoothstep(outStart, outEnd, p);
      titleRef.current.style.opacity = `${1 - out}`;
      titleRef.current.style.transform = `translate3d(0, calc(${titleOffsetY}vh - ${28 * out}px), 0) scale(${1 + 0.04 * out})`;
    }

    if (hintRef.current) {
      const gone = smoothstep(0, 0.15, p);
      hintRef.current.style.opacity = `${1 - gone}`;
      hintRef.current.style.transform = `translate3d(0, ${8 * gone}px, 0)`;
    }

    if (overlayRef.current) {
      const inn = smoothstep(hasEntry ? 0.76 : 0.70, 1.0, p);
      overlayRef.current.style.opacity = `${inn}`;
      overlayRef.current.style.transform = `translate3d(0, ${18 * (1 - inn)}px, 0)`;
      overlayRef.current.style.pointerEvents = inn > 0.4 ? 'auto' : 'none';
    }

    if (typeof c.onProgress === 'function') {
      c.onProgress(p);
    }
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!root || !track || !stage) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let raf = 0;
    let current = 0;
    let target = 0;
    let stageH = 0;
    let running = false;

    const measure = () => {
      const c = propsRef.current;
      stageH = c.useWindowScroll ? window.innerHeight : root.clientHeight;
      if (stageH <= 0) return;
      stage.style.height = `${stageH}px`;
      const isTop = c.entryPoint === 'top';
      const extraHeight = isTop ? 0 : 0.35;
      track.style.height = `${stageH * (1 + Math.max(0, c.scrollDistance) + Math.max(0, c.holdDistance) + extraHeight)}px`;

      const w = root.clientWidth || stageH;
      stage.style.setProperty('--se-title-size', `${clamp(w * 0.075, 20, 84)}px`);
    };

    const readProgress = () => {
      const c = propsRef.current;
      if (!c.enabled) return 1;
      if (c.useWindowScroll) {
        if (!trackRef.current) return 0;
        const top = trackRef.current.getBoundingClientRect().top;

        if (c.entryPoint !== 'top') {
          const startOffset = parseEntryPoint(c.entryPoint, window.innerHeight);
          const scrolled = startOffset - top;
          const span = stageH * Math.max(0.01, c.scrollDistance);
          return clamp(scrolled / span, 0, 1);
        }

        const span = stageH * Math.max(0.01, c.scrollDistance);
        return clamp(-top / span, 0, 1);
      }
      const span = stageH * Math.max(0.01, c.scrollDistance);
      return clamp(root.scrollTop / span, 0, 1);
    };

    const tick = () => {
      const c = propsRef.current;
      const k = c.smoothing <= 0 ? 1 : 1 - Math.exp(-1 / (60 * c.smoothing));
      current += (target - current) * k;
      if (Math.abs(target - current) < 0.0004) {
        current = target;
        running = false;
      }
      applyProgress(current);
      raf = running ? requestAnimationFrame(tick) : 0;
    };

    const kick = () => {
      if (running) return;
      running = true;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      target = readProgress();
      if (propsRef.current.smoothing <= 0 || reduceMotion) {
        current = target;
        applyProgress(current);
        return;
      }
      kick();
    };

    const onResize = () => {
      measure();
      target = readProgress();
      current = target;
      applyProgress(current);
    };

    measure();
    target = readProgress();
    current = target;
    applyProgress(current);

    const scroller = useWindowScroll ? window : root;
    scroller.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(root);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      scroller.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      ro.disconnect();
    };
  }, [applyProgress, useWindowScroll]);

  const media =
    mediaType === 'video' ? (
      <video
        ref={mediaRef}
        className="scroll-expand__media"
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
      />
    ) : (
      <img
        ref={mediaRef}
        className="scroll-expand__media"
        src={src}
        alt={alt}
        draggable={false}
        onError={onError}
      />
    );

  return (
    <div
      ref={rootRef}
      className={`scroll-expand ${useWindowScroll ? '' : 'scroll-expand--scroller'} ${className}`.trim()}
      style={style}
      {...rest}
    >
      <div ref={trackRef} className="scroll-expand__track">
        <div ref={stageRef} className="scroll-expand__stage">
          <div ref={frameRef} className="scroll-expand__frame">
            {media}
            <div ref={scrimRef} className="scroll-expand__scrim" />
            {children ? (
              <div ref={overlayRef} className="scroll-expand__overlay">
                {children}
              </div>
            ) : null}
          </div>
          {titleTag || entryTitle || title ? (
            <div ref={titleRef} className="scroll-expand__title">
              {titleTag ? (
                <span className="scroll-expand__title-tag">{titleTag}</span>
              ) : null}
              {entryTitle || title ? (
                <div className="scroll-expand__title-text-wrap">
                  {entryTitle ? (
                    <div ref={entryTitleRef} className="scroll-expand__title-entry">
                      {typeof entryTitle === 'string' ? (
                        <span className="scroll-expand__title-main">{entryTitle}</span>
                      ) : (
                        entryTitle
                      )}
                    </div>
                  ) : null}
                  {title ? (
                    <div ref={nextTitleRef} className="scroll-expand__title-next">
                      {typeof title === 'string' ? (
                        <span className="scroll-expand__title-main">{title}</span>
                      ) : (
                        title
                      )}
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          ) : null}
          {scrollHint ? (
            <div ref={hintRef} className="scroll-expand__hint">
              {scrollHint}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ScrollExpand;
