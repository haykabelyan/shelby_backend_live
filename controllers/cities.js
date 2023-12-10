const { prisma } = require("../prisma/prisma-client");


/**
 * @route GET api/city/all
 * @desc Получение всех городов
 * @access Private
 */

const all = async (req, res) => {
  const lang = req.query.lang || '';

  try {
    const cities = await prisma.city.findMany(lang && {
      where: {
        lang,
      },
    });

    res.status(200).json(cities);
  } catch {
    res.status(400).json({ message: "Failed to receive" });
  }
};


/**
 * 
 * @route POST api/city/add
 * @desc Добавление города
 * @access Private
 */

const add = async (req, res) => {
  const data = req.body;

  if (!data.lang || !data.name) {
    return res.status(400).json({ data: "All fields are required" });
  }

  const city = await prisma.city.create({
    data: {
      ...data,
      authorId: req.user.id,
    },
  });

  res.status(201).json(city);
};


/**
 * 
 * @route POST api/city/remove/:id
 * @desc Удаление сотрудника
 * @access Private
 */

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    await prisma.city.delete({
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
 * @route PUT api/city/edit/:id
 * @desc Редактирование сотрудника
 * @access Private
 */

const edit = async (req, res) => {
  const data = req.body;
  const id = req.params.id;

  try {
    await prisma.city.update({
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
 * @route GET api/city/:id
 * @desc Полчуние сотрудника
 * @access Private
 */

const city = async (req, res) => {
  const id = req.params.id;

  try {
    const city = await prisma.city.findUnique({
      where: {
        id,
      },
    });

    res.status(200).json(city);
  } catch {
    res.status(400).json({ message: "Failed to receive" });
  }
};

module.exports = {
  add,
  remove,
  edit,
  all,
  city,
};