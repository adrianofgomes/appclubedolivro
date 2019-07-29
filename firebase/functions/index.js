const admin = require('firebase-admin');
const functions = require('firebase-functions');
admin.initializeApp();

function pathParamParser(str){
    var params = []
    if(str && str.indexOf("/") == 0){
        str = str.substring(1);
        params = str.split("/") ;
    }
    return params;
}

exports.livros = functions.https.onRequest(async (req, res) => {
    versao = "0.22";

    res.set('Access-Control-Allow-Origin', '*');

    console.log("iniciando função livros v"+ versao);
    console.log("req.path: " + req.path);
    var params = pathParamParser(req.path)

    const db = admin.firestore();

    var dataAtual = new Date();
    const registro = { 'Timestamp': dataAtual.toISOString(), 'Versao': versao };
    const ref = await db.collection('history').add(registro);

    //Se a coleção de livros estiver vazia, carregar livros a partir do json
    if (db) {
        try {
            //se nao foi passado nenhum parâmetro é para retornar a lista completa de livros
            if(params[0] == undefined || params[0] == ""){
                console.log("retornando lista completa de livros");
                const livrosSnapshot = await db.collection('livros').get();
                const livros = [];
                livrosSnapshot.forEach((doc) => {
                    const livroAtual = doc.data();
                    livroAtual.id = doc.id;
                    livros.push(livroAtual);
                });
                console.log('verificando se precisa carregar lista de livros...');
                if (livros.length > 0) {
                    console.log('base possui livros cadastrados. retornando lista de livros.');
                    res.json(livros);
                } else {
                    console.log('base de livros vazia. carregando...');
                    console.log("carregando livros.json");
                    var cargaLivros = {};
                    try {
                        cargaLivros = require('./livro/livro.json');
                        console.log("livros.json carregado " + cargaLivros);
                    } catch (e) {
                        console.log("erro na carga do arquivo livros.json" + e);
                        next(e);
                    }

                    cargaLivros.forEach(async function (livro) {
                        const livroRef = await db.collection('livros').add(livro);
                        console.log("Carregado livro: ", livroRef.id + " - " + livroRef.nome);
                    });
                    res.json({
                        'status': 'Carga de livros realizada!',
                        'data': Date.now()
                    });
                }
            } else {
                console.log("retornando livro id="+params[0]);
                //Se foi passado parâmetro na URL, procurar o livro q possua ID igual ao parâmetro informado e retorná-lo
                var livroRef = db.collection('livros').doc(params[0]);
                var livro = await livroRef.get();
                if (!livro.exists) {
                    console.log('No such document!');
                } else {
                    livroRetornado = livro.data();
                    livroRetornado.id = params[0];
                    console.log('Document data:', livroRetornado);
                    res.json(livroRetornado);
                }
            }
        } catch (e) {
            next(e);
        }
    } else {
        res.json({
            'status': 'Erro de conexão com banco de dados!',
            'data': Date.now()
        });
    }
});

