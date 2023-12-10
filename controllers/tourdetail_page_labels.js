const { prisma } = require("../prisma/prisma-client");


/**
 * @route GET api/tourdetail_page_label/all
 * @desc Получение всех лейболов
 * @access Private
 */

const all = async (req, res) => {
  const lang = req.query.lang || '';

  try {
    const tourdetail_page_labels = await prisma.tourdetailpagelabel.findMany(lang && {
      where: {
        lang,
      },
    });

    res.status(200).json(tourdetail_page_labels);
  } catch {
    res.status(400).json({ message: "Failed to receive" });
  }
};


/**
 * 
 * @route POST api/tourdetail_page_label/add
 * @desc Добавление лейбола
 * @access Private
 */

const add = async (req, res) => {
  const data = req.body;

  if (
    !data.lang ||
    !data.tableHead ||
    !data.tableData ||
    !data.formPlaceholders ||
    !data.btn_text ||
    !data.onFormSuccess ||
    !data.onFormError
  ) {
    return res.status(400).json({ data: "All fields are required" });
  }

  const tourdetail_page_label = await prisma.tourdetailpagelabel.create({
    data: {
      ...data,
      authorId: req.user.id,
    },
  });

  res.status(201).json(tourdetail_page_label);
};


/**
 * 
 * @route POST api/tourdetail_page_label/remove/:id
 * @desc Удаление сотрудника
 * @access Private
 */

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    await prisma.tourdetailpagelabel.delete({
      where: {
        id,
      },
    });

    res.status(200).json("OK");
  } catch {
    return res.status(500).json({ message: "Failed to delete" });
  }
};


/**
 * 
 * @route PUT api/tourdetail_page_label/edit/:id
 * @desc Редактирование сотрудника
 * @access Private
 */

const edit = async (req, res) => {
  const data = req.body;
  const id = req.params.id;

  try {
    await prisma.tourdetailpagelabel.update({
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
 * @route GET api/tourdetail_page_label/:id
 * @desc Полчуние сотрудника
 * @access Private
 */

const tourdetail_page_label = async (req, res) => {
  const id = req.params.id;

  try {
    const tourdetail_page_label = await prisma.tourdetailpagelabel.findUnique({
      where: {
        id,
      },
    });

    res.status(200).json(tourdetail_page_label);
  } catch {
    res.status(400).json({ message: "Failed to receive" });
  }
};

module.exports = {
  add,
  remove,
  edit,
  all,
  tourdetail_page_label,
};