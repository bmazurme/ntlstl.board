import { Router } from 'express';

import { getBooks, addBook } from '../../controllers';
import { renameBook } from '../../controllers/books-controller';

// import { UrlsApi } from '../../utils/routers';

const router = Router();

router.get('/books/:id', getBooks);
router.post('/books', addBook);
router.patch('/books', renameBook);

export default router;
