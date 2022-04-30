const { User } = require('../model');

const userController = {
    getUsers(req, res) {
        User.find({})
            .then(userData => res.json(userData))
            .catch(err => res.status(500).json(err));
    },
    addUsers({ body }, res) {
        User.create(body)
            .then(response => res.json(response))
            .catch(err => res.json(err));
    },
    getUserById({ params }, res) {
        User.findOne({ _id: params.userId })
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'No user found with that ID'});
                }
                res.json(userData);
            })
            .catch(err => res.json(err));
    },
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.userId }, body, { new: true })
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'No user found with that ID'});
                }
                res.json(userData);
            })
            .catch(err => res.json(err));
    },
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.userId })
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'No user found with that ID'});
                }
                res.json(userData);
            })
            .catch(err => res.json(err));
    },
    addFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.userId }, { $push: { friends: params.friendId }}, { new: true })
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'No user found with that ID'})
                }
                res.json(userData);
            })
            .catch(err => res.json(err));
    },
    deleteFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.userId }, { $pull: { friends: params.friendId } }, { new: true })
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'No user found with that ID'});
                }
                res.json(userData);
            })
            .catch(err => res.json(err));
    }
};

module.exports = userController;