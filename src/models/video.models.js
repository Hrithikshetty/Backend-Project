import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new mongoose.Schema({
    VideoFile: { 
        type: String, //cloudinary
        required: true 
    },
    Thumbnail: {
        type : String,
        required : true
    },
    title: {
        type : String,
        required : true
    },
    description: {
        type : String,
        default : true
    },
    duration: {
        type : String,
        required : true
    },
    views :{
        type : String,
        required : true
    },
    isPublished : {
        type : Boolean
    },
    videoOwner : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'User'
    }
}
,{timestamps:true})
videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model('Video',videoSchema)