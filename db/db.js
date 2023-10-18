module.exports = function () {
  var mysql = require("mysql");

  const pool = mysql.createPool({
    connectionLimit: process.env.connectionLimit,
    host: "localhost",
    user: "root",
    password: "",
    database: "finance",
    debug: false,
    multipleStatements: true,
    charset: "utf8mb4",
  });

  this.executeWithParams = (requestQuery, params) => {
    var output = {};
    return new Promise(function (resolve) {
      try {
        pool.getConnection(function (err, connection) {
          connection.query(
            requestQuery,
            params,
            function (error, results, fields) {
              if (error) {
                output.error = "true";
                output.message = error;
                resolve(output);
                connection.destroy();
              } else {
                output.error = "false";
                output.message = error;
                output.result = results;
                resolve(output);
                connection.destroy();
              }
            }
          );
        });
      } catch (err) {
        err.error = "true";
        err.message = "OOPS Database Exception";
        resolve(err);
      }
    });
  };

  this.executeWithoutParams = (requestQuery) => {
    var output = {};
    return new Promise(function (resolve) {
      var output = {};
      try {
        pool.getConnection(function (err, connection) {
          connection.query(requestQuery, function (error, results, fields) {
            if (error) {
              output.error = "true";
              output.message = error;
              resolve(output);
              connection.destroy();
            } else {
              output.error = "false";
              output.message = error;
              output.result = results;
              resolve(output);
              connection.destroy();
            }
          });
        });
      } catch (err) {
        err.error = "true";
        err.message = "OOPS Database Exception";
        resolve(err);
      }
    });
  };
};
