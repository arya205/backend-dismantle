import Ont from "../model/OntModel.js"; 

export const getAllOnts = async (req, res) => {
  try {
    const onts = await Ont.findAll();
    res.status(200).json(onts); 
  } catch (error) {
    
    res.status(500).json({ message: error.message }); 
  }
};

export const getOntBySn = async (req, res) => {
  try {
    const ont = await Ont.findByPk(req.params.sn_ont); 
    if (!ont) {
      return res.status(404).json({ message: "Data ONT tidak ditemukan!" }); 
    }
    res.status(200).json(ont);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOntByTeknisi = async (req, res) => {
  try {
    const ont = await Ont.findAll({
      where : { id_user: req.params.teknisi },
    }); 
    if (!ont) {
      return res.status(404).json({ message: "Data ONT tidak ditemukan!" }); 
    }
    res.status(200).json(ont);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOntStatusDone = async (req, res) => {
  try {
    const onts = await Ont.findAll({
      where: { status_dismantle: "selesai" }, 
    });
    res.status(200).json(onts); 
  } catch (error) {
    
    res.status(500).json({ message: error.message }); 
  }
};

export const createOnt = async (req, res) => {
  try {
    const newOnt = await Ont.create(req.body);
    res.status(201).json(newOnt); 
  } catch (error) {
    
    res.status(400).json({ message: error.message }); 
  }
};


export const updateOnt = async (req, res) => {
  try {
    const [updatedRows] = await Ont.update(req.body, {
      where: { sn_ont: req.params.sn_ont }, 
    });
    if (updatedRows === 0) {
      return res
        .status(404)
        .json({
          message: "Data ONT tidak ditemukan atau tidak ada perubahan!",
        });
    }
    
    const updatedOnt = await Ont.findByPk(req.params.sn_ont);
    res.status(200).json(updatedOnt); 
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const deleteOnt = async (req, res) => {
  try {
    const deletedRows = await Ont.destroy({
      where: { sn_ont: req.params.sn_ont },
    });
    if (deletedRows === 0) {
      return res.status(404).json({ message: "Data ONT tidak ditemukan!" });
    }
    res.status(200).json({ message: "Data ONT berhasil dihapus!" }); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
