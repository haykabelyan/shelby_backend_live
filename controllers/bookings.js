const { prisma } = require("../prisma/prisma-client");


/**
 * @route GET api/bookings/all
 * @desc Получение всех городов
 * @access Private
 */

const all = async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany();

    res.status(200).json(bookings);
  } catch {
    res.status(400).json({ message: "Failed to receive" });
  }
};


/**
 * 
 * @route POST api/bookings/add
 * @desc Добавление города
 * @access Private
 */

const add = async (req, res) => {
  const data = req.body;

  if (
    !data.email ||
    !data.phone ||
    !data.name ||
    !data.city ||
    !data.hotel ||
    !data.transport_depart ||
    !data.transport_arrive ||
    !data.selectedCity ||
    !data.checkin ||
    !data.checkout ||
    !data.rooms ||
    !data.adults ||
    !data.children ||
    !data.childageArr ||
    !data.isValid
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const booking = await prisma.booking.create({
    data: {
      ...data,
    },
  });

  res.status(201).json(booking);
};


/**
 * 
 * @route POST api/bookings/remove
 * @desc Удаление сотрудника
 * @access Private
 */

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    await prisma.booking.delete({
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
 * @route PUT api/bookings/edit
 * @desc Редактирование сотрудника
 * @access Private
 */

const edit = async (req, res) => {
  const data = req.body;
  const id = req.params.id;

  const dataWithoutId = { ...data };
  delete dataWithoutId.id;

  try {
    await prisma.booking.update({
      where: {
        id,
      },
      data: dataWithoutId,
    });

    res.status(200).json("OK");
  } catch {
    res.status(500).json("Failed to edit");
  }
};


/**
 * 
 * @route GET api/bookings/:id
 * @desc Полчуние сотрудника
 * @access Private
 */

const booking = async (req, res) => {
  const id = req.params.id;

  try {
    const booking = await prisma.booking.findUnique({
      where: {
        id,
      },
    });

    res.status(200).json(booking);
  } catch {
    res.status(400).json({ message: "Failed to receive" });
  }
};

module.exports = {
  add,
  remove,
  edit,
  all,
  booking,
};