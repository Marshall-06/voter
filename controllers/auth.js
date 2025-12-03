const User = require("../models/model").User;
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");

// ✅ Admin login (rootman)
exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await User.findOne({ where: { email } });
    if (!admin) {
      return res.status(400).json({ error: "Ulanyjynyň nomeri ýa-da açar sözi nädogry" });
    }

    const passwordIsValid = bcrypt.compareSync(password, admin.password);
    if (!passwordIsValid) {
      return res.status(400).json({ error: "Ulanyjynyň nomeri ýa-da açar sözi nädogry" });
    }

    const token = sign(
      { id: admin.id, role: admin.role },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "24h" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Server error", message: err.message });
  }
};

// ✅ User registration
exports.register = async (req, res) => {
  const { name, phone_num, password, email, role } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Sizin nomeriniz bilen on hasap acylypdyr" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      phone_num,
      password: hashedPassword,
      role,
    });

    const token = sign(
      { id: newUser.id, role: newUser.role },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "24h" }
    );

    res.status(201).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", message: err.message });
  }
};

// ✅ User login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res
        .status(400)
        .json({ error: "Ulanyjynyň nomeri ýa-da açar sözi nädogry" });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res
        .status(400)
        .json({ error: "Ulanyjynyň nomeri ýa-da açar sözi nädogry" });
    }

    const token = sign(
      {
        id: user.id,
        role: user.role,
        username: user.username,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "24h" }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", message: err.message });
  }
};

exports.refreshToken = async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(401).json({ message: 'Refresh token required' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_KEY);
    const user = await User.findByPk(decoded.id);
    if (!user) return res.status(403).json({ message: 'User not found' });
    if (user.refresh_token !== token)
      return res.status(403).json({ message: 'Invalid or expired refresh token' });

    const newAccessToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRES || '24h' }
    );

    res.json({ accessToken: newAccessToken });
  } catch (error) {
    console.error("Refresh error:", error);
    res.status(403).json({ message: 'Invalid or expired refresh token' });
  }
};





exports.logout = async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ message: 'Token required' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_KEY);
    const user = await User.findByPk(decoded.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.refresh_token = null;
    await user.save();

    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Invalid token' });
  }
};