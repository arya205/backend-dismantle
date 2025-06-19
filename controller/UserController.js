import User from "../model/UserModel.js"; 
import bcrypt from "bcryptjs";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllTeknisi = async (req, res) => {
  try {
    const users = await User.findAll({
      where: { role: "teknisi" },
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan!" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      password: hashedPassword,
      role,
    });
    const { password: _, ...userWithoutPassword } = newUser.toJSON();
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { password, ...otherUpdates } = req.body;
  let updates = { ...otherUpdates };

  try {
    if (password) {
      updates.password = await bcrypt.hash(password, 10);
    }

    const [updatedRows] = await User.update(updates, {
      where: { id: req.params.id },
    });
    if (updatedRows === 0) {
      return res
        .status(404)
        .json({
          message: "Pengguna tidak ditemukan atau tidak ada perubahan!",
        });
    }
    const updatedUser = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deletedRows = await User.destroy({
      where: { id: req.params.id },
    });
    if (deletedRows === 0) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan!" });
    }
    res.status(200).json({ message: "Pengguna berhasil dihapus!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username: username } });
    if (!user) {
      return res.status(401).json({ message: "Username atau password salah." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Username atau password salah." });
    }

    const { password: _, ...userWithoutPassword } = user.toJSON();
    res
      .status(200)
      .json({ message: "Login berhasil!", user: userWithoutPassword });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
