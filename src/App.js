import {Component} from 'react'
import './App.css'
import CreatePost from './components/CreatePost'
import PostsDisplay from './components/PostsDisplay'

class App extends Component {
  state = {
    posts: [],
    editingPost: null,
  }

  componentDidMount() {
    this.loadPosts()
  }

  loadPosts = () => {
    const savedPosts = localStorage.getItem('posts')
    if (savedPosts) {
      this.setState({posts: JSON.parse(savedPosts)})
    } else {
      this.fetchPosts()
    }
  }

  fetchPosts = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    const posts = await response.json()
    this.setState({posts})
    this.savePostsToLocalStorage(posts)
  }

  savePostsToLocalStorage = posts => {
    localStorage.setItem('posts', JSON.stringify(posts))
  }

  addPost = post => {
    const {posts} = this.state
    this.setState(
      prevState => ({posts: [...prevState.posts, post]}),
      () => {
        this.savePostsToLocalStorage({posts})
      },
    )
  }

  editPost = post => {
    this.setState({editingPost: post})
  }

  updatePost = updatedPost => {
    const {posts} = this.state
    this.setState(
      prevState => ({
        posts: prevState.posts.map(p =>
          p.id === updatedPost.id ? updatedPost : p,
        ),
        editingPost: null,
      }),
      () => {
        this.savePostsToLocalStorage({posts})
      },
    )
  }

  render() {
    const {posts, editingPost} = this.state
    return (
      <div className="app">
        <h1>WYLO Assignment</h1>
        <CreatePost
          addPost={this.addPost}
          editingPost={editingPost}
          updatePost={this.updatePost}
        />
        <PostsDisplay posts={posts} editPost={this.editPost} />
      </div>
    )
  }
}

export default App
