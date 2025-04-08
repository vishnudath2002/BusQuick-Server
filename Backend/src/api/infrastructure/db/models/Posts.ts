import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface IPost extends Document {
  UserType: string | null;
  _id: ObjectId;
  OwnerId: ObjectId;
  Content: string;
  Likes: ObjectId[] | null;
  Comments: {
    CommentId: ObjectId | null;
    Content: string | null;
    Timestamp: Date | null;
    UserId: ObjectId | null;
  }[];
  CreatedAt: Date;
  Updated: Date | null;
  Description: string | null;
  Category: string | null;
}

const PostSchema: Schema = new Schema({
  UserType: { type: String },
  OwnerId: { type: Schema.Types.ObjectId, required: true ,ref:'User'},
  Content: { type: String, required: true },
  Likes: [{ type: Schema.Types.ObjectId }],
  Comments: [
    {
      CommentId: { type: Schema.Types.ObjectId },
      Content: { type: String },
      Timestamp: { type: Date },
      UserId: { type: Schema.Types.ObjectId ,ref:'User'},
    },
  ],
  CreatedAt: { type: Date, required: true },
  Updated: { type: Date },
  Description: { type: String },
  Category: { type: String },
});

const Post = mongoose.model<IPost>('Post', PostSchema);
export default Post;
