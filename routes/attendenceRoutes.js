import express from 'express';
import { checkInAttendance, checkOutAttendance, deleteAttendanceById, getAllAttendance, getAttendanceById, updateAttendanceById } from '../Controller/attendenceController.js';

const router = express.Router();


router.post("/check-in" ,checkInAttendance)
router.post("/check-out" ,checkOutAttendance)

router.route("/").get(getAllAttendance);

router.route("/:id").put(updateAttendanceById).delete(deleteAttendanceById).get(getAttendanceById)
export default router;
