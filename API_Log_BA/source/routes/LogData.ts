import express from 'express';
import controller from '../controllers/LogData';
const router = express.Router();


router.post('/decrypt', controller.DecryptLogData);
router.post('/encrypt', controller.encryptLogData);

export = router;

