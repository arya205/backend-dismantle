import { DataTypes } from "sequelize";
import db from "../config/database.js"; 

const Ont = db.define(
  "tb_ont",
  {
    sn_ont: {
      type: DataTypes.STRING(100), 
      primaryKey: true, 
      allowNull: false, 
    },
    no_pa: {
      type: DataTypes.STRING(100),
      allowNull: true, 
    },
    id_pelanggan: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    nama_user: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    id_pd: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    status_pd: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    keterangan: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "tb_users", 
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    alamat: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    telp: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    status_dismantle:{
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    tanggal: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW, 
    },
  },
  {
    freezeTableName: true, 
    timestamps: false, 
  }
);

export default Ont;
