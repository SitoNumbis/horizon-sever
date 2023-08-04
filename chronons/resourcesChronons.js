// @ts-check

const cron = require("node-cron");

const { keys } = require("../utils/secure");
const { UserStatusEnum } = require("../models/User");

const { update } = require("sito-node-mysql");

const usersOnline = {};

const resourcesChronons = () => {
  cron.schedule("* * * * * *", async () => {
    const length = Object.keys(usersOnline).length;
    if (length) {
    }
  });
};

const playerCounter = () => {
  cron.schedule("* * * * *", async () => {
    try {
      const now = new Date();
      // checking of inactive users
      const toDelete = [];
      const namesToDelete = [];
      for (const item of Object.values(usersOnline))
        if (keys[item.id].time < now.getTime()) {
          toDelete.push(item.id);
          namesToDelete.push(usersOnline[item.id].User);
        }
      toDelete.forEach((item) => {
        updateUser({
          ...usersOnline[item].toBd(),
          state: UserStatusEnum.Offline,
          lastOnline: new Date().getTime(),
        });
        delete keys[item];
        delete usersOnline[item];
      });
      if (namesToDelete.length)
        console.info(
          `${namesToDelete
            .toString()
            // @ts-ignore
            .replaceAll(",", ", ")} have been logged due inactivity`
        );
      const users = Object.values(usersOnline);
      if (users.length) {
        console.info(`${users.length} players online`);
      } else console.info("Zzz No users online Zzz");
    } catch (err) {
      console.log(err);
    }
  });
};

module.exports = { resourcesChronons, playerCounter, usersOnline };
