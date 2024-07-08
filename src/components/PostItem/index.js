import './index.css'

const PostItem = ({post, editPost}) => {
  const {title, body,} = post

  return (
    <div className="post-item">
      <h3>{title}</h3>
      <p>{body}</p>
      <button onClick={() => editPost(post)}>Edit</button>
    </div>
  )
}

export default PostItem
