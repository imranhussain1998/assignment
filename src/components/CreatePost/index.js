import {Component} from 'react' 
import './index.css'

class CreatePost extends Component {
  state = {
    title: '',
    body: '',
    id: null,
  }

  componentDidUpdate(prevProps) {
    const {editingPost} = this.props
    if (editingPost && prevProps.editingPost !== editingPost) {
      this.setState({
        title: editingPost.title,
        body: editingPost.body,
        id: editingPost.id,
      })
    }
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit = event => {
    event.preventDefault()
    const {title, body, id} = this.state
    const {addPost, updatePost} = this.props

    if (!title || !body) {
      alert('Please fill in all fields')
      return
    }

    if (id) {
      updatePost({title, body, id})
    } else {
      const newPost = {
        id: Date.now(),
        title,
        body,
      }
      addPost(newPost)
    }

    this.setState({title: '', body: '', id: null})
  }

  handleSave = () => {
    const {title, body, id} = this.state
    const {addPost, updatePost} = this.props

    if (!title || !body) {
      alert('Please fill in all fields')
      return
    }

    if (id) {
      updatePost({title, body, id})
    } else {
      const newPost = {
        id: Date.now(),
        title,
        body,
      }
      addPost(newPost)
    }

    this.setState({title: '', body: '', id: null})
  }

  render() {
    const {title, body, id} = this.state
    return (
      <form onSubmit={this.handleSubmit} className="create-post-form">
        <input
          type="text"
          name="title"
          value={title}
          onChange={this.handleChange}
          placeholder="Title"
        />
        <textarea
          name="body"
          value={body}
          onChange={this.handleChange}
          placeholder="Body"
        />
        <button type="submit">
          {id ? 'Update Post' : 'Create Post'}
        </button>
        <button type="button" onClick={this.handleSave}>
          Save
        </button>
      </form>
    )
  }
}

export default CreatePost
