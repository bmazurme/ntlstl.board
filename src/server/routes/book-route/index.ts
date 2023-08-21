import { Router } from 'express';

import { getBooks, addBook } from '../../controllers';
import { renameBook } from '../../controllers/books-controller';

import { UrlsApi } from '../../utils/routers';

const router = Router();

router.get(UrlsApi.BOOKS.ID, getBooks);
router.post(UrlsApi.BOOKS.INDEX, addBook);
router.patch(UrlsApi.BOOKS.INDEX, renameBook);

export default router;
