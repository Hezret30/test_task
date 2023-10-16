const { Router } =require('express')
const router = Router()

const guard = require('../middlewares/jwt')
const { Boss } = require('../../models/models')

const multer = require('multer')
const sharp = require('sharp')
const fs = require('fs')

const upload = multer({ dest: __dirname + './../static/bosses' })

router.post('/', guard, upload.single('image'), async (req, res) => {
    
    const boss_id = req.id
    
    try {
        
        const imageExtension = req.file.originalname.split('.').pop()
        const imageName = `${Date.now()}_boss.${imageExtension}`
        const imagePath = __dirname + './../static/bosses/' + imageName
        
        await sharp(req.file.path)
            .jpeg({ quality: 80 })
            .toFile(imagePath)

        fs.renameSync(req.file.path, imagePath)

        const img_url = `/images/${imageName}`
        
        await Boss.update({
            img_url: img_url
            },
            {where: {id: boss_id}}
        )

        res.status(201).json({ message: 'Image uploaded and compressed successfully' })
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

module.exports = router
