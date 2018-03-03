const ObjectID = require('mongodb').ObjectID,
    isEmpty  = require('is-empty'),
    IsEmail = require('isemail');

//lista os usuarios
module.exports.listar = (req, res) => {
  req.db.collection('usuarios').find().toArray(function(err, result) {
    if (err) {
      return console.log(err)
    };

    res.send(result);
  });
};

//cria usuario
module.exports.criar = (req, res) => {
  let mDados = req.body;
  let mResult;
  console.log(mDados);
  req.db.collection('usuarios').findOne({email: mDados.email}, function(err, result) {
    if(result != null){
      if(mDados.email == result.email){
        mResult = {messange_info : "E-mail já encontra-se em uso, por gentileza insira outro e-mail", user_info : " ", success: false};
        return res.send(mResult);
      }
    }else{
      req.db.collection('usuarios').save(mDados, function(err, result) {
        if (err) {
          mResult = {messange_info : "Ocorreu um problema com os nosso servidores, por gentileza tente novamente mais tarde", user_info : " ", success: false};
          return res.send(mResult);
        }
          mResult = {messange_info : "Usuário cadastrado com sucesso, já pode fazer login!", user_info : " ", success: true};
          return res.send(mResult);
      });
    }
  })
}

//recuperar
module.exports.recuperar = (req, res) => {
  let dados = req.body;
    req.db.collection('usuarios').findOne(dados, function(err, result) {
      if (err) {
        return res.sendStatus(503);
      }
      res.send(result);
    });
}


// Login
module.exports.login = (req, res) => {
    let mDados = req.body;
    let mEmail = req.body.email;
    let mPassword = req.body.password;
    let mResult;

    req.db.collection('usuarios').findOne({email : mEmail}, function(err, result) {

      if(err){
        mResult = {user_info : "Ocorreu um problema com os nosso servidores, por gentileza tente novamente mais tarde", success: false};
        return res.send(mResult);
      }

      if(result != null){
          if(mEmail != result.email) {
            mResult = {messange_info: "Senha ou e-mail incorreto", user_info : " ", success: false};
            return res.send(mResult);
          }else if(mPassword != result.password){
            mResult = {messange_info : "Senha ou e-mail incorreto", user_info : " ", success: false};
            return res.send(mResult);
          }else{
            mResult = {messange_info : "Usuário logado", user_info : " ", success: true};
            return res.send(mResult);
          }
      }else{
        mResult = {messange_info : "Usuário não encontrado", user_info : " ", success: false};
        return res.send(mResult);
      }
    })
}

// recuperar usuario

module.exports.recuperar = (req, res) => {
  let id = req.params.id;

  req.db.collection('usuarios').findOne({_id: ObjectID(id)}, function(err, result) {
    if (err) {
      return res.sendStatus(503);
    }

    if (!result) {
      return res.send(404);
    }
    //
    // req.db.collection('grupos').find({_id: { $in: result.grupos}}).toArray(function(errGrupos, resultGrupos) {
    //   if (errGrupos) {
    //     return res.sendStatus(503);
    //   }
    //   res.send({"Usuario": result, "Grupos": resultGrupos});
    // })
  });
};
