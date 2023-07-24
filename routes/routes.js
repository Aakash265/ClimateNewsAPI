import express from 'express';

import { news, specificNews } from '../controllers/controller.js';

const router = express.Router();

router.get('/', news);

router.get('/:newspaperId', specificNews);

export default router;