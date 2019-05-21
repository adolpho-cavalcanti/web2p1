const express = require('express');
const multer = require('multer');
const multerConfig = require('../config/multer');

const authMiddleware = require('../middlewares/auth');

const File = require('../models/File');
const Box = require('../models/Box');

const router = express.Router();

router.use(authMiddleware);

//Criar Arquivo
router.post('/file', async (req, res) => {
    try {
        const file = await File.create({ 
            title: req.file.originalname,
            path: req.file.key,
        });
  
        //req.io.sockets.in(box_id).emit("file", file);
  
         //cria um arquivo
        return res.json({file, user: req.userId});

    } catch(err) {
        console.log(err);
      return res.status(400).send({ error: "Erro ao criar o arquivo" });
    }
});

//Listar todas
router.get('/', async (req, res) => {
    try {
        const files = await File.find();
        
        return res.json({ files, user: req.userId });

    } catch(err) {
      return res.status(400).send({ error: "Erro ao carregar os arquivos" });
    }
});

//Listar por ID
router.get('/:fileId', async (req, res) => {
    try {
        const file = await File.findById(req.params.fileId).populate('files');
        
        return res.json({ file, user: req.userId });

    } catch(err) {
      return res.status(400).send({ error: "Erro ao carregar o arquivo" });
    }
});

module.exports = app => app.use('/', multer(multerConfig).single('file'), router);