import { Router } from 'express';
const router = Router();

import { getViviendasEnVenta, createViviendaEnVenta, getViviendaEnVenta, deleteViviendaEnVenta, updateViviendaEnVenta } from '../controllers/viviendaEnVenta.controller';

router.route('/')
    .get(getViviendasEnVenta)
    .post(createViviendaEnVenta);

router.route('/:idVenta')
    .get(getViviendaEnVenta)
    .delete(deleteViviendaEnVenta)
    .put(updateViviendaEnVenta);

export default router;
