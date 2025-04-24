import { Router } from 'express';
import {
  createCertificate,
  getCertificates,
  downloadCertificate,
} from '../controllers/certificateController.js';

const router = Router();

router.post('/', createCertificate);
router.get('/', getCertificates);
router.get('/:id/download', downloadCertificate);

export default router;
