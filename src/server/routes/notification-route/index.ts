import { Router } from 'express';

// import { getMockData } from '../controllers';

const router = Router();

router.get('/notification', () => console.log('notification get'));
router.get('/notification', () => console.log('notification post'));

export default router;
