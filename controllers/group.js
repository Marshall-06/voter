const Category = require("../models/model").Category;


exports.getAllCategories = async (req, res) => {
  try {
    const group = await Category.findAll();
    res.json(group)
  } catch (error) {
    res.status(500).json({error: err.message})
  }
};

exports.getSingleCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      // include: [
      //   {
      //     association: "Teacher", 
      //     attributes: ["id", "name"],
      //   },
      // ],
    });

    if (!category) return res.status(404).json({ error: "Category not found" });

    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.addCategory = async (req, res) => {
 try {
    const { name } = req.body;

    if (!name || name.trim() === "")
      return res.status(400).json({ message: "Category name is required" });

    const category = await Category.create({ name });

    res.json({
      message: "Category created successfully",
      data: category
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Category name is required" });
    }

    category.name = name;
    await category.save();
    res.json({ message: "Category updated successfully", category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    await category.destroy();
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
