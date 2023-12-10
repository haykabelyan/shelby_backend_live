const { prisma } = require("../prisma/prisma-client");


/**
 * @route GET api/maintour/all
 * @desc Получение всех туров
 * @access Private
 */

const all = async (req, res) => {
    const lang = req.query.lang || '';

    try {
        const tours = await prisma.maintour.findMany(lang && {
            where: {
                lang,
            },
        });

        res.status(200).json(tours);
    } catch {
        res.status(400).json({ message: "Failed to receive" });
    }
};


/**
 * 
 * @route POST api/maintour/add
 * @desc Добавление тура
 * @access Private
 */

const add = async (req, res) => {
    const data = req.body;

    if (!data.lang || !data.title || !data.descr || !data.image || !data.btn_text) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const tour = await prisma.maintour.create({
        data: {
            ...data,
            authorId: req.user.id,
        },
    });

    res.status(201).json(tour);
};


/**
 * 
 * @route POST api/maintour/remove/:id
 * @desc Удаление тура
 * @access Private
 */

const remove = async (req, res) => {
    const id = req.params.id;

    try {
        await prisma.maintour.delete({
            where: {
                id,
            },
        });

        res.status(200).json("OK");
    } catch {
        res.status(500).json({ message: "Failed to delete" });
    }
};


/**
 * 
 * @route PUT api/maintour/edit/:id
 * @desc Редактирование сотрудника
 * @access Private
 */

const edit = async (req, res) => {
    const data = req.body;
    const id = req.params.id;

    try {
        await prisma.maintour.update({
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
 * @route GET api/maintour/:id
 * @desc Полчуние сотрудника
 * @access Private
 */

const maintour = async (req, res) => {
    const id = req.params.id;

    try {
        const tour = await prisma.maintour.findUnique({
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
    maintour,
};