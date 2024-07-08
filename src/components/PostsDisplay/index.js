import PostItem from '../PostItem'
import './index.css'

const PostsDisplay = ({posts, editPost}) => (
  <div className="posts-display">
    {posts.map(post => (
      <PostItem key={post.id} post={post} editPost={editPost} />
    ))}
  </div>
)

export default PostsDisplay
