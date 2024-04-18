const { Router } = require("express")
const Curso = require("../models/Curso")
const Professor = require("../models/Professor")
const { Op } = require("sequelize")
const routes = new Router()

//PROFESSORES

routes.post("/professor", async (req, res) => {
    try {
        const { nome, salario_hora, carga_horaria } = req.body;

        if (!nome) {
            return res.status(400).json({ mensagem: "O nome é obrigatório." });
        }

        const novoProfessor = await Professor.create({ nome, salario_hora, carga_horaria });
        res.status(201).json(novoProfessor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Não foi possível cadastrar o professor." });
    }
});

routes.get('/professor', async (req, res) => {
    const { nome } = req.query;

    let professores;

    if (nome) {
        
        professores = await Professor.findAll({ where: { nome } });

    } else {
        
        professores = await Professor.findAll();
    }
    
    res.json(professores);
});


routes.put('/professor/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, salario_hora, carga_horaria } = req.body;

        const professor = await Professor.findByPk(id);
        if (!professor) {
            return res.status(404).json({ mensagem: "Professor não encontrado." });
        }

        await professor.update({ nome, salario_hora, carga_horaria });

        res.status(200).json({ mensagem: "Professor atualizado com sucesso." });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Não foi possível atualizar o professor." });
    }
});

routes.delete('/professor/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const professor = await Professor.findByPk(id);

        if (!professor) {
            return res.status(404).json({ mensagem: "Professor não encontrado." });
        }

        await professor.destroy({
            where: {
                id:id
            }
        });
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Não foi possível excluir o professor." });
    }
});

// CURSOS


routes.post('/cursos', async (req, res) => {

    try {
        const nome = req.body.nome
        const duracao_horas = req.body.duracao_horas

        if (!nome) {
            return res.status(400).json({ mensagem: 'O nome do curso é obrigatório.' })
        }
        if (!(duracao_horas >= 40 && duracao_horas <= 200)) {
            return res.status(400).json({ mensagem: 'A duração do curso deve ser entre 40 e 200 horas.' })
        }

        const curso = await Curso.create({
            nome: nome,
            duracao_horas: duracao_horas
        })

        res.status(201).json(curso)

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Não foi possível cadastrar o curso' })
    }

})

routes.get('/cursos', async (req, res) => {
    const { nome } = req.query;

    let cursos;

    if (nome) {
        
        cursos = await Curso.findAll({ where: { nome } });

    } else {
        
        cursos = await Curso.findAll();
    }
    
    res.json(cursos);
});

routes.put('/cursos/:id', async (req, res) => {
    const id = req.params.id
    const curso = await Curso.findByPk(id)

    if (!curso) {
        return res.status(404).json({mensagem: 'Curso não encontrado'})
    }
    curso.update(req.body)

    await curso.save()

    res.json(curso)
})

routes.delete('/cursos/:id', async (req, res) => {

    const { id } = req.params

    const cursos = await Curso.findByPk(id)

    if (!cursos) {
        return res.status(404).json({ error: 'Não encontrado'})
    }

    await cursos.destroy({
        where: {
            id:id
        }
    })

    return res.status(204).json({})

})

module.exports = routes