async function deleteUser(userId) {
  const user = await User.destroy({
    where: {
      id: userId,
    }
  });
}

  await deleteUser(user.id);
  user = await getUser(user.id);
  console.log(user.toJSON());
