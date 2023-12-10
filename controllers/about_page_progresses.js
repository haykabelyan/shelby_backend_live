const { prisma } = require("../prisma/prisma-client");


/**
 * @route GET api/about_page_progress/all
 * @desc Получение всех сотрудников
 * @access Private
 */

const all = async (req, res) => {
    const lang = req.query.lang || '';

    try {
        const aboutpageprogress = await prisma.aboutpageprogress.findMany(lang && {
            where: {
                lang,
            },
        });

        res.status(200).json(aboutpageprogress);
    } catch {
        res.status(400).json({ message: "Failed to receive" });
    }
};


/**
 * 
 * @route POST api/about_page_progresses/add
 * @desc Добавление сотрудника
 * @access Private
 */

const add = async (req, res) => {
    const data = req.body;

    if (!data.lang || !data.title || !data.percent) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const aboutpageprogress = await prisma.aboutpageprogress.create({
        data: {
            ...data,
            authorId: req.user.id,
        },
    });

    res.status(201).json(aboutpageprogress);
};


/**
 * 
 * @route POST api/about_page_progresses/remove
 * @desc Удаление сотрудника
 * @access Private
 */

const remove = async (req, res) => {
    const id = req.params.id;

    try {
        await prisma.aboutpageprogress.delete({
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
 * @route PUT api/about_page_progresses/edit
 * @desc Редактирование сотрудника
 * @access Private
 */

const edit = async (req, res) => {
    const data = req.body;
    const id = req.params.id;

    try {
        await prisma.aboutpageprogress.update({
            where: {
                id,
            },
            data,
        });

        res.status(200).json("OK");
    } catch {
        res.status(500).json("Failed to edit");
    }
};


/**
 * 
 * @route GET api/about_page_progresses/:id
 * @desc Полчуние сотрудника
 * @access Private
 */

const about_page_progress = async (req, res) => {
    const id = req.params.id;

    try {
        const aboutpageprogress = await prisma.aboutpageprogress.findUnique({
            where: {
                id,
            },
        });

        res.status(200).json(aboutpageprogress);
    } catch {
        res.status(400).json({ message: "Failed to receive" });
    }
};

module.exports = {
    all,
    add,
    remove,
    edit,
    about_page_progress,
};