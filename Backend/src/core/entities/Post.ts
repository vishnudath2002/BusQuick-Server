  
export class PostComment {
  constructor(
    public commentId: string | null,
    public content: string | null,
    public timestamp: Date | null,
    public userId: string | null
  ) {}
}


export class Post {
    constructor(
      public id: string,
      public userType: string | null,
      public ownerId: string,
      public content: string,
      public likes: string[] | null,
      public comments: PostComment[],
      public createdAt: Date,
      public updated: Date | null,
      public description: string | null,
      public category: string | null
    ) {}
  }
