const router = require('express').Router()

const Person = require('../models/Person')

//Create - criando de dados 
router.post('/', async (req, res) => {

    //req.body
    const {name, salary, approved} = req.body
    
    if(!name){
        res.status(422).json({error: 'O nome é obrigatório!'})
        return
    }
    
    const person = {
        name,
        salary,
        approved
    }
        
    try {
    //criando dados
    await Person.create(person)
    res.status(201).json({message: 'Pessoa inserida nos istema com sucesso!'})
    } catch (error) {
    res.status(500).json({error: error})
    }
})

//Read - leitura de dados 
router.get('/', async (req, res) => {
    console.log(req)
    try{
        const people = await Person.find()
        res.status(200).json(people)

        if(!person){
            res.status(422).json({message: 'O usuário não foi encontrado!' })
            return
        }
    }catch (error) {
        res.status(500).json({error: error})
        }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id    

    try{
        const person = await Person.findOne({_id: id})
    }catch (error) {
    res.status(500).json({error: error})
    }
})

//update - atualizações de dados
router.patch('/id:', async (req, res) => {
    const id = req.params.id

    const {name, salary, approved} = req.body

    const person = {
        name,
        salary,
        approved
    }
        
    try {
    const updatedPerson = await Person.updateOne({_id: id}, person)
    if(updatedPerson.matchedCount === 0){
        res.status(422).json({message:'O usuário não foi encontrado!'})
        return
    }
    res.status(200).json(person)
    } catch (error) {
    res.status(500).json({error: error})
    }
})


// delete - deletar dados
router.delete('/:id', async (req, res) => {
    const id = req.params.id

    const person = await Person.findOne({_id: id })
    
    if(!person){
        res.status(422).json({message: 'O usuário não foi encontrado!'})
        return
    }

    try{
        await Person.deleteOne({_id: id})
        res.status(200).json({message: 'O usuário foi removido com sucesso!'})
    }catch (error) {
    res.status(500).json({error: error})
    }
})


module.exports = router