

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
})
taskSchema.methods.task = function () {
    return {
        title: this.title,
        description: this.description,
    }
};
module.exports = mongoose.model('Task', taskSchema);


