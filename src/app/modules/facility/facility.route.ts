import { Router } from 'express';
import { addFacility, getFacilities, editFacility, removeFacility } from './facility.controller';

const router = Router();

router.post('/', addFacility);
router.get('/', getFacilities);
router.put('/:id', editFacility);
router.delete('/:id', removeFacility);

export default router;
