import React,{Component} from "react";
import './styles.css'
import api from "../../services/api";
class New extends Component {
    state ={
        image:null,
        author:'',
        place:'',
        description:'',
        hashtags:''
    }
    handleSubimit= async e=>{
        e.preventDefault()
        console.log(this.state)
        //criando uma nova instancia de um objeto parecido com html
        //pesquisar mais afundo sobre essa class
        const data = new FormData();
        //adicionando todos os dados 
        //utilizado isto para ser compativel com multpart format
        data.append('image',this.state.image)
        data.append('author',this.state.author)
        data.append('place',this.state.place)
        data.append('description',this.state.description)
        data.append('hashtags',this.state.hashtags)
        //enviando os dados usando axios
        await api.post('/post',data)
        //igual ao hook history 
        //adicionando essa pagina ao history do cliente para que ele possa voltar nas paginas
        //e depois redireciona para a rota '/'
        //porem nao esta funcionado aaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        //this.props.history.push('/')
    }
    handleChangeImage=e=>{
        //peagndo apenas o nome da imagem para guardar no banco de dados
        this.setState({image:e.target.files[0]})
    }
    //se escreve esta funcao assim para poder acessar o this
    handleChange = e =>{
        //usando index [] passando o nome do input para setar na variavel certa
        this.setState({[e.target.name]:e.target.value})
    }
    render(){
        return (
            <form id="new-post" onSubmit={this.handleSubimit}>
                {/* file para colocar arquivos como fotos nesse caso*/}
                <input type="file" 
                onChange={this.handleChangeImage}
                />
                <input type="text" 
                name="author"
                placeholder="autor do post"
                onChange={this.handleChange}
                value={this.state.author}
                />

                <input type="text" 
                name="place"
                placeholder="local do post"
                onChange={this.handleChange}
                value={this.state.place}
                />

                <input type="text"
                name="description" 
                placeholder="descricao do post"
                onChange={this.handleChange}
                value={this.state.description}
                />

                <input type="text" 
                name="hashtags"
                placeholder="hashtags do post"
                onChange={this.handleChange}
                value={this.state.hashtags}
                />
                <button type="submit">Enviar</button>
            </form>
        )
    }
}

export default New