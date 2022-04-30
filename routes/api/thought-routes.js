const router = require('express').Router();
const { getThoughts, getSingleThought, addThought, updateThought, deleteThought, addReaction, deleteReaction } = require('../../controller/thought-controller');

router.route('/')
    .get(getThoughts)

router.route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought)

router.route('/:userId')
    .post(addThought)

router.route('/:thoughtId/reactions')
    .post(addReaction)

router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

module.exports = router;