// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/db");

// const User = sequelize.define("User", {
//     id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//         allowNull: false
//     },
//     studentId: {
//     type: DataTypes.INTEGER,
//     allowNull: true,
//     defaultValue: null
//     },    
//     teacherId: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//         defaultValue: null
//     },
//     name: { type: DataTypes.STRING, allowNull: false },
//     email: {type: DataTypes.STRING,allowNull: false},
//     password: { type: DataTypes.STRING, allowNull: false },
//     role: { type: DataTypes.ENUM("admin","teacher", "student"), defaultValue: "student" }
// });

// const Category = sequelize.define("Category", {
//     id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//         allowNull: false
//     },
//     name: { type: DataTypes.STRING, allowNull: false }
// });

// const Teacher = sequelize.define("Teacher", {
//     id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true
//     },
//     teacherId: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//     },
//     groupId: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//     },
//     subject: {
//         type: DataTypes.STRING,
//         allowNull: false
//     }
// });

// const Rating = sequelize.define("Rating", {
//     id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
//     studentId: { type: DataTypes.INTEGER, allowNull: false },
//     teacherId: { type: DataTypes.INTEGER, allowNull: false },
//     groupId: { type: DataTypes.INTEGER, allowNull: false },
//     answers: { 
//         type: DataTypes.JSON, 
//         allowNull: false 
//     }, // store as JSON: { "1": 5, "2": 4 }
//     avgScore: { type: DataTypes.FLOAT, allowNull: false }
// });

// const Question = sequelize.define("Question", {
//     id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true
//     },
//     text: {
//         type: DataTypes.STRING,
//         allowNull: false
//     }
// });

// // Teacher.belongsTo(User, { foreignKey: "teacherId", as: "teacherUser" });
// // User.hasMany(Teacher, { foreignKey: "teacherId", as: "teacherAssignments" });

// // // ---- Teacher → Category ----
// // Teacher.belongsTo(Category, { foreignKey: "groupId", as: "groupInfo" });
// // Category.hasMany(Teacher, { foreignKey: "groupId", as: "teachers" });

// // ---- Rating → teacher (User) ----
// Rating.belongsTo(User, { foreignKey: "teacherId", as: "ratedTeacher" });
// User.hasMany(Rating, { foreignKey: "teacherId", as: "teacherRatings" });

// // ---- Rating → student (User) ----
// Rating.belongsTo(User, { foreignKey: "studentId", as: "student" });
// User.hasMany(Rating, { foreignKey: "studentId", as: "studentRatings" });

// // ---- Rating → Category ----
// Rating.belongsTo(Category, { foreignKey: "groupId", as: "group" });
// Category.hasMany(Rating, { foreignKey: "groupId", as: "groupRatings" });

// // Teacher info (the actual teacher)
// Teacher.belongsTo(User, { foreignKey: "teacherId", as: "teacherUser" });
// User.hasMany(Teacher, { foreignKey: "teacherId", as: "teacherAssignments" });

// // Optional: admin who created the assignment
// Teacher.belongsTo(User, { foreignKey: "createdBy", as: "creatorUser" });
// User.hasMany(Teacher, { foreignKey: "createdBy", as: "createdAssignments" });

// // Group association
// Teacher.belongsTo(Category, { foreignKey: "groupId", as: "groupInfo" });
// Category.hasMany(Teacher, { foreignKey: "groupId", as: "teachers" });








// module.exports = {
//     User,
//     Category,
//     Teacher,
//     Rating,
//     Question
// }

const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

// ------------------- User -------------------
const User = sequelize.define("User", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
  studentId: { type: DataTypes.INTEGER, allowNull: true, defaultValue: null },
teacherId: {
  type: DataTypes.INTEGER,
  allowNull: true,
  unique: true  // 🔑 required for foreign key
},
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM("admin", "teacher", "student"), defaultValue: "student" }
});

// ------------------- Category -------------------
const Category = sequelize.define("Category", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false }
});

// ------------------- Teacher -------------------
const Teacher = sequelize.define("Teacher", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  teacherId: { type: DataTypes.INTEGER, allowNull: false }, // manual ID
  groupId: { type: DataTypes.INTEGER, allowNull: false },
  subject: { type: DataTypes.STRING, allowNull: false }
});

// ------------------- Rating -------------------
const Rating = sequelize.define("Rating", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  studentId: { type: DataTypes.INTEGER, allowNull: false },
  teacherId: { type: DataTypes.INTEGER, allowNull: false },
  groupId: { type: DataTypes.INTEGER, allowNull: false },
  answers: { type: DataTypes.JSON, allowNull: false }, // { "1": 5, "2": 4 }
  avgScore: { type: DataTypes.FLOAT, allowNull: false }
});

// ------------------- Question -------------------
const Question = sequelize.define("Question", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  text: { type: DataTypes.STRING, allowNull: false }
});

// ------------------- Associations -------------------

// Teacher info → User (manual teacherId)
// Teacher info → User (manual teacherId)
Teacher.belongsTo(User, { foreignKey: "teacherId", as: "teacherUser" });
User.hasMany(Teacher, { foreignKey: "teacherId", as: "teacherAssignments" });

// Teacher belongs to Category (group)
Teacher.belongsTo(Category, { foreignKey: "groupId", as: "groupInfo" });
Category.hasMany(Teacher, { foreignKey: "groupId", as: "teachers" });

// Ratings
Rating.belongsTo(User, { foreignKey: "studentId", as: "student" });
User.hasMany(Rating, { foreignKey: "studentId", as: "studentRatings" });

Rating.belongsTo(User, { foreignKey: "teacherId", as: "ratedTeacher" });
User.hasMany(Rating, { foreignKey: "teacherId", as: "teacherRatings" });

Rating.belongsTo(Category, { foreignKey: "groupId", as: "group" });
Category.hasMany(Rating, { foreignKey: "groupId", as: "groupRatings" });

module.exports = { User, Category, Teacher, Rating, Question };
