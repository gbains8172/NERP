module.exports = (sequelize, DataTypes) => {
  const PostComment = sequelize.define('PostComment', {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  PostComment.associate = (models) => {
    PostComment.belongsTo(models.Post, {
      foreignKey: 'postId',
      onDelete: 'CASCADE',
    });
    PostComment.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return PostComment;
};
