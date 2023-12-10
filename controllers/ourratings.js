const { prisma } = require("../prisma/prisma-client");


/**
 * @route GET api/ourrating/all
 * @desc Получение всех рейтингов
 * @access Private
 */

const all = async (req, res) => {
    const lang = req.query.lang || '';

    try {
        const ourratings = await prisma.ourrating.findMany(lang && {
            where: {
                lang,
            },
        });

        res.status(200).json(ourratings);
    } catch {
        res.status(400).json({ message: "Failed to receive" });
    }
};


/**
 * 
 * @route POST api/ourrating/add
 * @desc Добавление сотрудника
 * @access Private
 */

const add = async (req, res) => {
    const data = req.body;

    if (!data.lang || !data.rating || !data.title || !data.descr) {
        return res.status(400).json({ data: "All fields are required" });
    }

    const ourrating = await prisma.ourrating.create({
        data: {
            ...data,
            authorId: req.user.id,
        },
    });

    res.status(201).json(ourrating);
};


/**
 * 
 * @route POST api/ourrating/remove/:id
 * @desc Удаление сотрудника
 * @access Private
 */

const remove = async (req, res) => {
    const id = req.params.id;

    try {
        await prisma.ourrating.delete({
            where: {
                id,
            },
        });

        res.status(200).json("OK");
    } catch (err) {
        return res.status(500).json({ message: "Failed to delete" });
    }
};


/**
 * 
 * @route PUT api/ourrating/edit/:id
 * @desc Редактирование сотрудника
 * @access Private
 */

const edit = async (req, res) => {
    const data = req.body;
    const id = req.params.id;

    try {
        await prisma.ourrating.update({
            where: {
                id,
            },
            data,
        });

        res.status(200).json("OK");
    } catch {
        res.status(500).json({ message: "Failed to edit" });
    }
};


/**
 * 
 * @route GET api/ourrating/:id
 * @desc Полчуние сотрудника
 * @access Private
 */

const ourrating = async (req, res) => {
    const id = req.params.id;

    try {
        const tour = await prisma.ourrating.findUnique({
            where: {
                id,
            },
        });

        res.status(200).json(tour);
    } catch {
        res.status(400).json({ message: "Failed to receive" });
    }
};

module.exports = {
    add,
    remove,
    edit,
    all,
    ourrating,
};