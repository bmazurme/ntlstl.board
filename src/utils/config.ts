const BASE_API = 'http://localhost:3001';
const WSS_API = 'ws://localhost:3002';
const ESC_CLOSE_ON = false;
const OVERLAY_CLOSE_ON = false;

const MODAL_CONFIG = {
  INITIAL: {
    opacity: 0,
    scale: 0.75,
  },
  ANIMATE: {
    opacity: 1,
    scale: 1,
    transition: {
      ease: 'easeOut',
      duration: 0.15,
    },
  },
  EXIT: {
    opacity: 0,
    scale: 0.75,
    transition: {
      ease: 'easeIn',
      duration: 0.15,
    },
  },
};

export {
  ESC_CLOSE_ON, OVERLAY_CLOSE_ON, MODAL_CONFIG, WSS_API, BASE_API,
};
