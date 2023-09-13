const { Sequelize } = require("sequelize");
const Player = require("../models/player");

exports.createData = async (req, res, next) => {
  const {
    dob,
    photoUrl,
    birthPlace,
    career,
    matches,
    score,
    fifties,
    centuries,
    wickets,
    average,
    name,
  } = req.body;
  try {
    const result = await Player.create({
      name: name,
      dob: dob,
      photoUrl: photoUrl,
      birthPlace: birthPlace,
      fifties: fifties,
      wickets: wickets,
      average: average,
      matches: matches,
      score: score,
      career: career,
      centuries: centuries,
    });
    if (result) {
      res.status(201).json({
        success: true,
        message: "Data Inserted Successfully!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

exports.editById = async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Please provide an Id to Update!",
    });
  }
  const {
    name,
    dob,
    photoUrl,
    birthPlace,
    career,
    matches,
    score,
    fifties,
    centuries,
    wickets,
    average,
  } = req.body;

  try {
    const data = await Player.findByPk(id);
    data.dob = dob;
    data.average = average;
    data.centuries = centuries;
    data.name = name;
    data.wickets = wickets;
    data.score = score;
    data.fifties = fifties;
    data.photoUrl = photoUrl;
    data.matches = matches;
    data.career = career;
    data.birthPlace = birthPlace;
    await data.save();
    res.status(200).json({
      success: true,
      message: "Player updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

exports.findByName = async (req, res, next) => {
  const { name } = req.body;
  try {
    const result = await Player.findOne({
      where: {
        name: {
          [Sequelize.Op.like]: `%${name}%`,
        },
      },
    });
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Player not Found!",
      });
    }
    res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

exports.findByid = async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Please provide an Id to Search!",
    });
  }
  try {
    const data = await Player.findByPk(id);
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};
