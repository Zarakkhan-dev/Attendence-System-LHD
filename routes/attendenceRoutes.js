import express from 'express';
import { markAttendance } from '../Controller/attendenceController.js';

const router = express.Router();


router.post('/mark-attendence', markAttendance);

export default router;
