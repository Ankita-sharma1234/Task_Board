const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

// Cascade delete tasks
projectSchema.pre('deleteOne', { query: true }, function (next) {
  const projectId = this.getQuery()._id;
  mongoose.model('Task').deleteMany({ project: projectId }).exec();
  next();
});

module.exports = mongoose.model('Project', projectSchema);