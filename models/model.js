const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    studentId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null
    },    
    teacherId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null
    },
    name: { type: DataTypes.STRING, allowNull: false },
    email: {type: DataTypes.STRING,allowNull: false},
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM("admin","teacher", "student"), defaultValue: "student" }
});

const Category = sequelize.define("Category", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: { type: DataTypes.STRING, allowNull: false }
});

const Teacher = sequelize.define("Teacher", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    teacherId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    groupId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    subject: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const Rating = sequelize.define("Rating", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    studentId: { type: DataTypes.INTEGER, allowNull: false },
    teacherId: { type: DataTypes.INTEGER, allowNull: false },
    groupId: { type: DataTypes.INTEGER, allowNull: false },
    answers: { 
        type: DataTypes.JSON, 
        allowNull: false 
    }, // store as JSON: { "1": 5, "2": 4 }
    avgScore: { type: DataTypes.FLOAT, allowNull: false }
});

const Question = sequelize.define("Question", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Category.hasMany(Teacher, { foreignKey: "groupId" });
Teacher.belongsTo(Category, { foreignKey: "groupId" });

// Teacher belongs to user (teacher user)
User.hasMany(Teacher, { foreignKey: "teacherId" });
Teacher.belongsTo(User, { foreignKey: "teacherId" });

User.hasMany(Rating, { foreignKey: "studentId" });
Rating.belongsTo(User, { foreignKey: "studentId" });

// Teacher (user) -> many ratings
User.hasMany(Rating, { foreignKey: "teacherId" });

// Group -> many ratings
Category.hasMany(Rating, { foreignKey: "groupId" });
Rating.belongsTo(Category, { foreignKey: "groupId" });


module.exports = {
    User,
    Category,
    Teacher,
    Rating,
    Question
}