// @ts-check

const { getValue, getTable } = require("../db/template");

const { error, log, info, good } = require("../utils/chalk");

/**
 *
 * @param {string} nation
 * @param {boolean} forList
 */
const getNations = async (nation, forList) => {
  try {
    if (nation) {
      log(info(`fetching information of nation ${nation}`));
      const nationData = await getValue("nation", nation);
      return nationData;
    } else {
      log(info("fetching information of nations"));
      const nations = await getTable("nation");
      if (nations)
        return forList
          ? nations.map((item) => ({ id: item.id, name: item.name }))
          : nations;
    }
  } catch (err) {
    log(error(err));
  }
};

/**
 *
 * @param {string} nation
 * @param {boolean} forList
 */
const getBuildingsFromNation = async (nation, forList) => {
  try {
    log(info(`fetching buildings of nation ${nation}`));
    const nationData = await getValue("nation", nation);
    if (nationData) {
      const parsedBuildings = [];
      for (const item of nationData.buildings) {
        const building = await getValue("building", item);
        if (forList)
          parsedBuildings.push({
            id: building.id,
            name: building.name,
          });
        else parsedBuildings.push(building);
      }
      log(good("fetching buildings successfully"));
      return parsedBuildings;
    }
    return undefined;
  } catch (err) {
    log(error(err));
  }
};

/**
 * @param {string} nation
 * @param {boolean} forList
 */
const getShipsFromNation = async (nation, forList) => {
  try {
    log(info(`fetching ships of nation ${nation}`));
    const nationData = await getValue("nation", nation);
    if (nationData) {
      const parsedShips = [];
      for (const item of nationData.ships) {
        const ship = await getValue("ship", item);
        if (forList)
          parsedShips.push({
            id: ship.id,
            name: ship.name,
          });
        else parsedShips.push(ship);
      }
      log(good("fetching ships successfully"));
      return parsedShips;
    }
    return undefined;
  } catch (err) {
    log(error(err));
  }
};

/**
 * @param {string} nation
 * @param {boolean} forList
 */
const getTechnologiesFromNation = async (nation, forList) => {
  try {
    log(info(`fetching technologies of nation ${nation}`));
    const nationData = await getValue("nation", nation);
    if (nationData) {
      const parsedTechnologies = [];
      for (const item of nationData.technologies) {
        const technology = await getValue("technology", item);
        if (forList)
          parsedTechnologies.push({
            id: technology.id,
            name: technology.name,
          });
        else parsedTechnologies.push(technology);
      }
      log(good("fetching technologies successfully"));
      return parsedTechnologies;
    }
    return undefined;
  } catch (err) {
    log(error(err));
  }
};

/**
 * @param {string} nation
 * @param {boolean} forList
 */
const getHerosFromNation = async (nation, forList) => {
  try {
    log(info(`fetching heros of nation ${nation}`));
    const nationData = await getValue("nation", nation);
    if (nationData) {
      const parsedHeros = [];
      for (const item of nationData.heros) {
        const hero = await getValue("hero", item);
        if (forList)
          parsedHeros.push({
            id: hero.id,
            name: hero.name,
          });
        else parsedHeros.push(hero);
      }
      log(good("fetching heros successfully"));
      return parsedHeros;
    }
    return undefined;
  } catch (err) {
    log(error(err));
  }
};

module.exports = {
  getNations,
  getBuildingsFromNation,
  getShipsFromNation,
  getTechnologiesFromNation,
  getHerosFromNation,
};
