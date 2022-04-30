const { Thought, User } = require('../model');
// const {} = require('../utils/utility');

const thoughtController = {
    getThoughts(req, res) {
        Thought.find({})
            .then(thoughts => res.json(thoughts))
            .catch(err => res.json(err));
    },
    getSingleThought({ params }, res) {
        Thought.findOne({ _id: params.thoughtId})
            .then(thought => {
                if (!thought) {
                    res.status(404).json({ message: 'No thought found with this ID'})
                }
                res.json(thought);
            })
            .catch(err => res.json(err))
    },
    addThought({ params, body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                    );
            })
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'No User with that ID'})
                }
                res.json(thoughtData)
            })
            .catch(err => res.json(err));
    },
    updateThought({ params, body}, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId}, body, { new: true})
            .then(thought => {
                if (!thought) {
                    res.status(404).json({ message: 'No thought with that ID'})
                }
                res.json(thought);
            }) 
            .catch(err => res.json(err))
    },
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(thought => {
                if (!thought) {
                    res.status(404).json({ message: 'No thought with that ID'})
                }
                res.json(thought);
            })
            .catch(err => res.json(err));
    },
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId}, { $push: { reactions: body }}, { new: true })
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'No thought with that ID'})
                }
                res.json(thoughtData);
            })
            .catch(err => res.json(err));
    },
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, { $pull: { reactions: { reactionId: params.reactionId} } }, { new: true })
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'No Thought or Reaction with that ID'});
                }
                res.json(thoughtData);
            })
            .catch(err => res.json(err));
    }
};

module.exports = thoughtController