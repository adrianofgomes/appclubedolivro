const admin = require('firebase-admin');
const functions = require('firebase-functions');
admin.initializeApp();

exports.livros = functions.https.onRequest(async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    console.log("iniciando função livros");
    const db = admin.firestore();

    var dataAtual = new Date();
    const registro = { 'Timestamp': dataAtual.toISOString(), 'Versao': 1 };
    const ref = await db.collection('history').add(registro);

    //Se a coleção de livros estiver vazia, carregar livros a partir do json
    console.log('verificando se precisa carregar lista de livros...');
    if (db) {
        try {
            const livrosSnapshot = await db.collection('livros').get();
            const livros = [];
            livrosSnapshot.forEach((doc) => {
                const livroAtual = doc.data();
                livroAtual.id = doc.id;
                livros.push(livroAtual);
            });
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
        } catch (e) {
            next(e);
        }
    }
});

