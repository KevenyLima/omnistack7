import React,{Component} from "react";
import './styles.css'
import more from '../../assets/more.svg'
import like from '../../assets/like.svg'
import comment from '../../assets/comment.svg'
import send from '../../assets/send.svg'
import api from '../../services/api'
import io from 'socket.io-client'
class Feed extends Component {
    // mesma coisa de um hook usestate
    state ={
        feed:[],
    }
    //antes do react carregar ele executa essa funcao
    async componentDidMount(){
        this.registerToSocket();
        const response = await api.get('/post')
        console.log(response)
        //setando o estado de feed para os dados que vem da api
        this.setState({feed:response.data})


    }
    registerToSocket = ()=>{
        const socket = io('http://localhost:5000')
        socket.on('post',newPost=>{
            this.setState({feed:[newPost,...this.state.feed]})
        })
        socket.on('like',(likePost)=>{
            this.setState({
                'feed':this.state.feed.map((post)=>post._id === likePost._id ? likePost : post)
            })
        })
    }
    handleLike = (id)=>{
        api.post(`/post/${id}/like`)
    }   
    render(){
        return (
            <section id="post-list">
                {/* acessando os dados que vem da api  */}
                {this.state.feed.map((post)=>(
                                    <article key={post._id}>
                                    <header>
                                        <div className="user-info">
                                            <span>{post.author}</span>
                                            <span className="place">{post.place}</span>
                                        </div>
                                        <img src={more} alt="mais" />
                                    </header>
                                    <img src={`http://localhost:5000/files/${post.image}`} alt="image" />
                                    <footer>
                                        <div className="actions">
                                            {/* aqui esta usando uma arrow function que tem a funcao handleLike dentro 
                                                para evitar que a funcao seja executada quando o componente e carregado
                                                por conta de esta passando parametros dentro da funcao handleLike
                                                */}
                                            <button type="button" onClick={()=>this.handleLike(post._id)}><img src={like} alt="like" /></button>
                                            <img src={comment} alt="comment" />
                                            <img src={send} alt="send" />
                                        </div>
                                        <strong>{post.likes} curtidas</strong>
                                        <p>
                                           {post.description}
                                        </p>
                                        <span>{post.hashtags}</span>
                                    </footer>
                                </article>
                ))}
            </section>
        )
    }
}

export default Feed