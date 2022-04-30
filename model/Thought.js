const { Schema, model, Types } = require('mongoose');
const { formatDateTime } = require('../utils/utility');

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => formatDateTime(createdAtVal)
    }
}, {
    toJSON: {
        getters: true
    }
});

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        maxlength: 280,
        minlength: 1
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => formatDateTime(createdAtVal)
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
}, {
    toJSON: {
        getters: true
    }
});

thoughtSchema.virtual('reactionCount', function() {
    return this.reactions.length
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
