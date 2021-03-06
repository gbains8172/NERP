module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true,
    },
    bio: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true,
    },
    image: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
  }, {
    tableName: 'users'
  });

  // associate user with message 1 to Many
  User.associate = models => {
    // on delete user delete all messages that belong to user with CASCADE
    User.hasMany(models.Message, { onDelete: 'CASCADE' });
    User.hasMany(models.PostComment, { onDelete: 'CASCADE' });
    User.hasMany(models.Post, { onDelete: 'CASCADE' });
  };

  User.findByLogin = async login => {
    let user = await User.findOne({
      where: { username: login },
    });

    if (!user) {
      user = await User.findOne({
        where: { email: login },
      });
    }

    return user;
  };

  return User;
};
