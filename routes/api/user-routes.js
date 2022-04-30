const router = require('express').Router();
const { User } = require('../../model');
const { getUsers, addUsers, getUserById, updateUser, deleteUser, addFriend, deleteFriend } = require('../../controller/user-controller');

router
    .route('/')
    .get(getUsers)
    .post(addUsers);

router
    .route('/:userId')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend)

module.exports = router;