import { Router } from 'express';
import { addFacility, getFacilities, editFacility, removeFacility } from './facility.controller';
import { adminMiddleware, authMiddleware } from '../../middlewares/authenticate';

const router = Router();

router.post('/',authMiddleware, adminMiddleware, addFacility);
router.get('/', getFacilities);
router.put('/:id', authMiddleware, adminMiddleware,editFacility);
router.delete('/:id',authMiddleware, adminMiddleware, removeFacility);

export default router;
