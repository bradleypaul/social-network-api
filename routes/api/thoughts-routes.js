const router = require('express').Router();
const {
  getAll,
  getById,
  create,
  update,
  destroy,
  addReaction,
  removeReaction
} = require('../../controllers/thoughts-controller');

router.route('/')
  .get(getAll)
  .post(create);

router.route('/:id')
  .get(getById)
  .put(update)
  .delete(destroy);

router.route('/:thoughtId/reactions/:reactionId')
  .post(addReaction)
  .delete(removeReaction);

module.exports = router;