const { prisma } = require("../prisma/prisma-client");


/**
 * @route GET api/booking_page_label/all
 * @desc Получение всех сотрудников
 * @access Private
 */

const all = async (req, res) => {
    const lang = req.query.lang || '';

    try {
        const bookingpagelabels = await prisma.bookingpagelabel.findMany(lang && {
            where: {
                lang,
            },
        });

        res.status(200).json(bookingpagelabels);
    } catch {
        res.status(400).json({ message: "Failed to receive" });
    }
};


/**
 * 
 * @route POST api/booking_page_label/add
 * @desc Добавление сотрудника
 * @access Private
 */

const add = async (req, res) => {
    const data = req.body;

    if (
        !data.lang ||
        !data.adults ||
        !data.children ||
        !data.rooms ||
        !data.inputPlaceholder ||
        !data.checkIn ||
        !data.checkOut ||
        !data.btn_text ||
        !data.childrenAge ||
        !data.table_headings ||
        !data.childAgeText ||
        !data.requiredFieldsMsg ||
        !data.specifyChildAgeMsg
    ) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const bookingpagelabel = await prisma.bookingpagelabel.create({
        data: {
            ...data,
            authorId: req.user.id,
        },
    });

    res.status(201).json(bookingpagelabel);
};


/**
 * 
 * @route POST api/booking_page_label/remove/:id
 * @desc Удаление сотрудника
 * @access Private
 */

const remove = async (req, res) => {
    const id = req.params.id;

    try {
        await prisma.bookingpagelabel.delete({
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
 * @route GET api/booking_page_label/edit/:id
 * @desc Полчуние сотрудника
 * @access Private
 */

const edit = async (req, res) => {
    const data = req.body;
    const id = req.params.id;

    try {
        await prisma.bookingpagelabel.update({
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
 * @route GET api/booking_page_label/:id
 * @desc Полчуние сотрудника
 * @access Private
 */

const booking_page_label = async (req, res) => {
    const id = req.params.id;

    try {
        const bookingpagelabel = await prisma.bookingpagelabel.findUnique({
            where: {
                id,
            },
        });

        res.status(200).json(bookingpagelabel);
    } catch {
        res.status(400).json({ message: "Failed to receive" });
    }
};

module.exports = {
    all,
    add,
    remove,
    edit,
    booking_page_label,
};
