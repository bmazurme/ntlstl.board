import { Router } from 'express';

import { getBooks, addBook } from '../controllers';

const router = Router();

router.get('/books', getBooks);
router.post('/books', addBook);

export default router;
