import express from "express";
import {
  getAllOnts,
  getOntStatusDone,
  getOntByTeknisi,
  getOntBySn,
  createOnt,
  updateOnt,
  deleteOnt,
} from "../controller/OntController.js";

const router = express.Router(); 

router.get("/ont", getAllOnts);
router.get("/ont-done", getOntStatusDone);
router.get("/ont-teknisi/:teknisi", getOntByTeknisi);
router.get("/ont/:sn_ont", getOntBySn);
router.post("/ont", createOnt);
router.patch("/ont/:sn_ont", updateOnt);
router.delete("/ont/:sn_ont", deleteOnt);

export default router