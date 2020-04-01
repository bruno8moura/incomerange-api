let config = (requestId) => {
  return {
    "appenders": {
      "app": {
        "type": "file",
        "layout": {
          "type": "pattern",
          "pattern": "%d %p %c %x{requestId} %m%n",
          "tokens": {
            "requestId": function (logEvent) {
              return requestId ? `[${requestId}]` : '';
            }
          }
        },
        "filename": "logs/app.log",
        "maxLogSize": 10485760,
        "numBackups": 3
      },
      "out": {
        "type": "stdout",
        "layout": {
          "type": "pattern",
          "pattern": "%d %p %c %x{requestId}%m%n",
          "tokens": {
            "requestId": function (logEvent) {
              return requestId ? `[${requestId}] ` : '';
            }
          }
        }
      },
      "ListIncomeRanges": {
        "type": "dateFile",
        "layout": {
          "type": "pattern",
          "pattern": "%d %p %c %x{requestId} %m%n",
          "tokens": {
            "requestId": function (logEvent) {
              return requestId ? `[${requestId}]` : '';
            }
          }
        },
        "filename": "logs/ListIncomeRanges.log",
        "pattern": "-yyyy-MM-dd"
      },
      "CreateANewIncomeRange": {
        "type": "dateFile",
        "layout": {
          "type": "pattern",
          "pattern": "%d %p %c %x{requestId} %m%n",
          "tokens": {
            "requestId": function (logEvent) {
              return requestId ? `[${requestId}]` : '';
            }
          }
        },
        "filename": "logs/CreateANewIncomeRange.log",
        "pattern": "-yyyy-MM-dd"
      },
      "DeleteAIncomeRange": {
        "type": "dateFile",
        "layout": {
          "type": "pattern",
          "pattern": "%d %p %c %x{requestId} %m%n",
          "tokens": {
            "requestId": function (logEvent) {
              return requestId ? `[${requestId}]` : '';
            }
          }
        },
        "filename": "logs/DeleteAIncomeRange.log",
        "pattern": "-yyyy-MM-dd"
      },
      "FindAIncomeRange": {
        "type": "dateFile",
        "layout": {
          "type": "pattern",
          "pattern": "%d %p %c %x{requestId} %m%n",
          "tokens": {
            "requestId": function (logEvent) {
              return requestId ? `[${requestId}]` : '';
            }
          }
        },
        "filename": "logs/FindAIncomeRange.log",
        "pattern": "-yyyy-MM-dd"
      },
      "PatchAIncomeRange": {
        "type": "dateFile",
        "layout": {
          "type": "pattern",
          "pattern": "%d %p %c %x{requestId} %m%n",
          "tokens": {
            "requestId": function (logEvent) {
              return requestId ? `[${requestId}]` : '';
            }
          }
        },
        "filename": "logs/PatchAIncomeRange.log",
        "pattern": "-yyyy-MM-dd"
      }
    },
    "categories": {
      "default": {
        "appenders": ["app", "out"],
        "level": "info"
      },
      "ListIncomeRanges": {
        "appenders": ["ListIncomeRanges"],
        "level": "debug"
      },
      "CreateANewIncomeRange": {
        "appenders": ["CreateANewIncomeRange"],
        "level": "debug"
      },
      "DeleteAIncomeRange": {
        "appenders": ["DeleteAIncomeRange"],
        "level": "debug"
      },
      "FindAIncomeRange": {
        "appenders": ["FindAIncomeRange"],
        "level": "debug"
      },
      "PatchAIncomeRange": {
        "appenders": ["PatchAIncomeRange"],
        "level": "debug"
      }
    }
  }
}

module.exports = config;