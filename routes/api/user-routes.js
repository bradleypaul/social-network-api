const router = require('express').Router();
const {
  getAll,
  getById,
  create,
  update,
  destroy,
  addFriend,
  removeFriend
} = require('../../controllers/user-controller');

router.route('/')
  .get(getAll)
  .post(create);

router.route('/:id')
  .get(getById)
  .put(update)
  .delete(destroy);

router.route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(removeFriend);
module.exports = router;