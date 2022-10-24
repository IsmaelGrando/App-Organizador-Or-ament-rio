//criando a class despesa
class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) { //aqui entra os parametros, na ordem certa
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    } //objeto estanciado com base na let despesa

    validarDados() { //atraves do metodo for in vamos percorrer todos os elementos contidos dentro do atributo despesa a partir  da execucao do metodo validadr dados
        for(let i in this) {
            if (this[i] == undefined || this[i] == '' || this[i] == null) {//operdaor i recupera o atributo, e apartir de this[i] vamos recuperar o valor, serve para arrays e objetos
                return false //se pelo uma dessas condicaoes aparacer vai dizer que tem erro no cadadstrto, retornando false e exibindo a msg de alert
                }
            }   
            return true //se nem um das condicoes aparecer entao vai ser true e vai seguir o codigo
        }
}

class Bd {
    constructor() {
        let id = localStorage.getItem('id')
        
        if (id === null) {
            localStorage.setItem('id', 0) //se for null o valor vai ficar 0
        }
    }

    getProximoId() {//essa funcaoi vai ver se ja tem um id com o mesmo nome colocado no local storage
        let proximoId = localStorage.getItem('id') //recuperar o dado dentro do local storage, o id
        return parseInt(proximoId) + 1
    }


    gravar(d) { //agora a funcao vai ser do objeto Bd
        let id = this.getProximoId()
        
        localStorage.setItem(id, JSON.stringify(d)) //o primeiro parametro é a identificao do objeto que vamos armazenar e o segundo é o dado que nos queremos armazenar, esse dado precisa ser encaminhado via JSON, conerter o dado literal pra JSON antes dai
    
        localStorage.setItem('id', id)
    }

    recuperarTodosRegistros(){
        
        //array de despesas
        let despesas = Array()


        let id = localStorage.getItem('id') //só quando carregar a pag de consulta
    
        //dessa forma podemos recuperar todas as despesas em localStorage, usando uam estrutura de repetição
        for (let i = 1; i <= id; i++) {
            //recuperar a despesa aqui
            let despesa = JSON.parse(localStorage.getItem(i)) //esse i é o indice, enao ele vai se repetir indo pra cima, 1, 2, 3.....
            //crio uma let para recuperar a despesa, e exibila onde eu desejar, essa recuperacao vem como JSON, ai preciso converter para n aparecer na lista como string
            //com o JSON.parse() vou converter para objeto literal e atribuo ele a let despesa
                    // --> console.log(i, despesa) //esse the bug me mopstra o id e os dados dele
       
            //antes do push precisamos ver se existe indices pulados ou excluidos
            if (despesa === null) {
                continue //vai pular pra proxima interação do laço, n mostrando o null na lista
            }

            despesa.id = i //passamos a ter um novo atributo dentro da despesa, para assim podermos saber a key dele e poder ser feita a remoção
            despesas.push(despesa) //a cada interacao vou passar a despesa covertida acima para objeto literal para a minha array de despesas, podendo listalas
        }
        return despesas //chamada
    } 

    pesquisar (despesa) { //metodo
        
        let despesasFiltradas = Array()
        
        despesasFiltradas = this.recuperarTodosRegistros()

        console.log(despesa)
        console.log(despesasFiltradas)

        //filtros
        //ano
        if (despesa.ano != ''){
            console.log('Filtro de ano')
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
        }

         //mes
         if (despesa.mes != ''){
            console.log('Filtro de mes')
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
        }

        //dia
        if (despesa.dia != ''){
            console.log('Filtro de dia')
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
        }

        //tipo
        if (despesa.tipo != ''){
            console.log('Filtro de tipo')
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
        }

        //descricao
        if (despesa.descricao != ''){
            console.log('Filtro de descricao')
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
        }

        //valor
        if (despesa.valor != ''){
            console.log('Filtro de valor')
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
        }

        return despesasFiltradas

    }

    remover(id) { //metodo
        localStorage.removeItem(id)
    }
    
}

let bd = new Bd() //instacia da classe



function cadastrarDespesa() {

    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    //dessas duas maneiras posso recuperar o valor, a da primetira é melhor, pq pego somente a referencia e atribuo o valor, na segunda a referencia ja vem com o valor embutido, isso pode dar problema no futuro
    //console.log(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value)
    //console.log(mes)

    //criar let com os value pra poder usar de atributo pra class
    let despesa = new Despesa(
        ano.value, 
        mes.value, 
        dia.value, 
        tipo.value, 
        descricao.value, 
        valor.value
        )

        if(despesa.validarDados()) { //a validacao dos dados tem que ser antes da gravacao dos dados
            bd.gravar(despesa) //chamamos o obj e passsamos a funcao com a despesa como atributo, asssim ele vai gravar
            //dialogo de sucesso
            document.getElementById('modal_titulo').innerHTML = 'Registro inserido com sucesso!'
            document.getElementById('modal_titulo_div').className = 'modal-header text-success'
            document.getElementById('modal_conteudo').innerHTML = 'Despesa cadastrada com sucesso!'
            document.getElementById('modal_btn').innerHTML = 'Voltar'
            document.getElementById('modal_btn').className = 'btn btn-success'


            $('#modalRegistroDespesa').modal('show')
        
        //limpar campos após inserção com sucesso
        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''
        
        } else {
            //dialogo de erro
            document.getElementById('modal_titulo').innerHTML = 'Erro na inclusão do registro.'
            document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
            document.getElementById('modal_conteudo').innerHTML = 'Existem campos obrigatórios que não foram preenchidos'
            document.getElementById('modal_btn').innerHTML = 'Voltar e corrigir'
            document.getElementById('modal_btn').className = 'btn btn-danger'


            $('#modalRegistroDespesa').modal('show') //essas msg sao puchadas do index atraves de JQUERY
        }      
    }

//ess objeto literal precisa ser convertido para uma notacao JSON, para poder armazenar seu dado
//function gravar(d) { //o parametro dela é a despessa
    //localStorage.setItem('despesa', JSON.stringify(d))//o primeiro parametro é a identificao do objeto que vamos armazenar e o segundo é o dado que nos queremos armazenar, esse dado precisa ser encaminhado via JSON, conerter o dado literal pra JSON antes dai
//}//localStorage nos da acessoa alguns metodos, ex: setItem(permite passar dois prametros)

//o operador localStorage retorna pra gente um objeto de manipulacao do localStorage do browse

//JSON.stringify(d)) isso é nativo do JS, ele vai converter oq tiver dwentro dos paresentes(parametro) para a notacao JSON

//SEMPRE ATUALIAR A PAGINA DA WEB COM O CTRL + F5, DAI APAGA O CACHE E EVITA ERROS POR ACUMULO DE CACHE


//precisamos criar uma logica para criacao de registro unic opara cada regsitro feito, pq senao os valores vao se sbrepujar, n havendo acumulo, so atualizacao da info



//a funcao carregaListaDespesas() sempre será acionada no onload do body da pagina consulta

function carregaListaDespesas() {

    //receber o arry de despesas
    let despesas = Array()

    despesas = bd.recuperarTodosRegistros() //despesas passa a receber a array criada em recuperarTodosRegistros() e retornada de la

    //selecionando o elemento tbody da tabela
    let listaDespesas = document.getElementById('listaDespesas')

    /*
    <tr> <!--Linhas das tabelas-->

        0 = <td>23/10/2022</td> <!--Colunas das tabelas--> primeira coluna tem indice 0

        1 = <td>Alimentação</td>

        <td>Compras do mês</td>

        <td>233</td>

    </tr>
    */

    //percorrer o array despesas listando cada despesa de forma dinamica
    despesas.forEach(function(d) { //as colunas vao sendo criadas a partir do momento que o codigo vai lendo cada elemento contido dentro de despesas, asssim podemos recuperar esses valores e atribuir a cada uma das colunas 
        
        console.log(d)

        //criando a linha (<tr>)
        let linha = listaDespesas.insertRow() //metodo que possibilita a inserção de linhas, la no tbody, selecioando pelo seu id e atribuido a uma var ali em cima
        
        //após a linha precismos por as colunas (<td>), para cada linha
        linha.insertCell(0).innerHTML = `${d.dia }/${d.mes}/${d.ano}`   //esse inserCell presica de parametro pra saber quantas colunas criar, começando do 0
        
        //ajustar o tipo, o tipo ja é pre-definido nos opçoes, entao vamos ajeitar isso aqui
        switch(d.tipo) {
            case '1': d.tipo = 'Alimentação'
                break
            case '2': d.tipo = 'Educação'
                break
            case '3': d.tipo = 'Lazer'
                break  
            case '4': d.tipo = 'Saúde'
                break
            case '5': d.tipo = 'Transporte'
                break
        }
        
        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor

        //criar o botão de remoção de despesas
        let btn = document.createElement("button") //crio um botão em cada linha
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class="fas fa-times></i>'
        btn.id = 'id_despesa_' + d.id
        btn.onclick = function() { //remover a despesa
            
            let id = this.id.replace('id_despesa_', '')

            //alert (id)

            bd.remover(id)

            window.location.reload() //assim que removo a pag é atualizada e a despesa some da lista e do localStorage

        }
        linha.insertCell(4).append(btn)
    
        console.log(d)

    })

}

//criando filtro para despesas

function pesquisarDespesa() {
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value 

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor) //com base na classe Despesa criada la em cima, recuperando suas infos, dando como parametros

    let despesas = bd.pesquisar(despesa)


    //selecionando o elemento tbody da tabela
    let listaDespesas = document.getElementById('listaDespesas')
    listaDespesas.innerHTML = ''

    
    despesas.forEach(function(d) { 
        
        console.log(d)

        
        let linha = listaDespesas.insertRow() 
        
        
        linha.insertCell(0).innerHTML = `${d.dia }/${d.mes}/${d.ano}`  
        
        switch(d.tipo) {
            case '1': d.tipo = 'Alimentação'
                break
            case '2': d.tipo = 'Educação'
                break
            case '3': d.tipo = 'Lazer'
                break  
            case '4': d.tipo = 'Saúde'
                break
            case '5': d.tipo = 'Transporte'
                break
        }
        
        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor

    })
}