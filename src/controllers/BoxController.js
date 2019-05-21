const express = require('express');

const authMiddleware = require('../middlewares/auth');

const Box = require('../models/Box');
const File = require('../models/File');

const router = express.Router();

router.use(authMiddleware);
//Listar todas
router.get('/', async (req, res) => {
    try {
        const boxes = await Box.find().populate({
          path: 'files',
          options: { sort: { createdAt: -1 } }
        });
        
        return res.json({ boxes, user: req.userId });

    } catch(err) {
      return res.status(400).send({ error: "Erro ao carregar as pastas" });
    }
});

//Listar por ID
router.get('/:boxId', async (req, res) => {
    try {
        const box = await Box.findById(req.params.boxId).populate('files');
        
        return res.json({ box, user: req.userId });

    } catch(err) {
      return res.status(400).send({ error: "Erro ao carregar a pasta" });
    }
});

//Criar pasta
router.post('/', async (req, res) => {
    try {
      const { title, files } = req.body;
      
      const box = await Box.create({ title: req.body.title });

        await Promise.all(files.map(async file => {
        const boxFile = new File({ ...file, box: box._id});
        await boxFile.save();
        box.files.push(boxFile);
      }));

      return res.json({ box, user: req.userId });

    } catch(err) {
      return res.status(400).send({ error: "Erro ao criar a pasta" });
    }
    

});

//Atualizar pasta
router.put('/:boxId', async (req, res) => {
    res.send({ user: req.userId });
});

//Deletar pasta
router.delete('/:boxId', async (req, res) => {
    try {
        await Box.findByIdAndDelete(req.params.boxId);
        
        return res.send();

    } catch(err) {
      return res.status(400).send({ error: "Erro ao excluir a pasta" });
    }
});

module.exports = app => app.use('/boxes', router);