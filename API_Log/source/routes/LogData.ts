// /** source/routes/posts.ts */
import express from 'express';
import controller from '../controllers/LogData';
const router = express.Router();

// router.get('/Log', controller.getLogData);
// // router.get('/posts/:id', controller.getPost);
// // router.put('/posts/:id', controller.updatePost);
// // router.delete('/posts/:id', controller.deletePost);
router.post('/log', controller.postLogData);
router.post('/logEn', controller.postLogEncripData);

export = router;

