import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type:String,
        require:true,
    },
    note: {
        type:String,
        require:true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

let taskModel;
if(mongoose.models.Notes) {
    taskModel = mongoose.model('Notes')
} else {
    taskModel = mongoose.model('Notes', taskSchema)
}

export default taskModel