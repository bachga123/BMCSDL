const oracledb = require("oracledb");

if (process.platform === "win32") {
  try {
    oracledb.initOracleClient({ libDir: "C:\\oracle\\instantclient_21_3" }); // note the double backslashes
  } catch (err) {
    console.error("Whoops!");
    console.error(err);
    process.exit(1);
  }
}

// checkConnection asycn function
async function checkConnection() {
  try {
    connection = await oracledb.getConnection({
      user: `${process.env.DB_USERNAME}`,
      password: `${process.env.DB_PASSWORD}`,
      connectString: `${process.env.DB_CONNECTIONSTRING}`,
    });
    console.log("connected to database");
  } catch (err) {
    console.error(err.message);
  } finally {
    if (connection) {
      try {
        // Always close connections
        await connection.close();
        console.log("close connection success");
      } catch (err) {
        console.error(err.message);
      }
    }
  }
}

async function openConnection() {
  try {
    connection = await oracledb.getConnection({
      user: `${process.env.DB_USERNAME}`,
      password: `${process.env.DB_PASSWORD}`,
      connectString: `${process.env.DB_CONNECTIONSTRING}`,
    });
    console.log("connected to database");
  } catch (err) {
    console.error(err.message);
  }
}
async function closeConnection(connection) {
  try {
    await connection.close();
    console.log("Closed connection");
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = { checkConnection, openConnection, closeConnection };
