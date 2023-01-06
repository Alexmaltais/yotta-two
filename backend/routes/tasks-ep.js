const express = require('express');

const TaskEp = require('../models/task-ep');
const JiraEp = require('../models/jira-ep');

const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.get('', checkAuth, (req, res, next) => {
  if (req.query.axeAnalyse.toString() == "employe-0") {
    JiraEp.aggregate([
      {
        $match: {
        'resolue': {
        $gte: new Date(req.query.dateFrom),
        $lte: new Date(req.query.dateTo)
        }}
      },
      {
        $group: {
          _id: {employe: "$attribution"},
          // _id: {employe: "$attribution", année: {$year: "$resolue"}, mois: {$month: "$resolue"}},
          // _id: {employe: "$attribution", operation: "$operation"},
          nombre: {$sum: 1}
        }
      }])
    .then(tasksEp => {
      res.status(200).json({
      tasksEp: tasksEp
      });
    });
  }
  if (req.query.axeAnalyse.toString() == "employelangue-1") {
    JiraEp.aggregate([
      {
        $match: {
        'resolue': {
        $gte: new Date(req.query.dateFrom),
        $lte: new Date(req.query.dateTo)
        }}
      },
      {
        $group: {
          _id: {employe: "$attribution", langue: "$langue"},
          nombre: {$sum: 1}
        }
      }])
    .then(tasksEp => {
      res.status(200).json({
      tasksEp: tasksEp
      });
    });
  }
  if (req.query.axeAnalyse.toString() == "operation-2") {
    JiraEp.aggregate([
      {
        $match: {
        'resolue': {
        $gte: new Date(req.query.dateFrom),
        $lte: new Date(req.query.dateTo)
        }}
      },
      {
        $group: {
           _id: {operation: "$operation"},
          nombre: {$sum: 1}
        }
      }])
    .then(tasksEp => {
      res.status(200).json({
      tasksEp: tasksEp
      });
    });
  }
  if (req.query.axeAnalyse.toString() == "tempsoperation-3") {
    JiraEp.aggregate([
      {
        $addFields: {
          'tempsTraitement': {$subtract: ['$resolue', '$prise']}
        }
      },
      {
        $match: {
          $and: [
            {
              'resolue': {
                $gte: new Date(req.query.dateFrom),
                $lte: new Date(req.query.dateTo)
              },
            },
            {
              'tempsTraitement': {$gt: 30000, $lt: 3600000}
            }
          ]
        }
      },
      {
        $group: {
           _id: {operation: "$operation"},
          moyTempsTraitement: {$avg: "$tempsTraitement"},
          nombre: {$sum: 1}
        }
      }])
    .then(tasksEp => {
      res.status(200).json({
      tasksEp: tasksEp
      });
    });
  }
  if (req.query.axeAnalyse.toString() == "parmois-4") {
    JiraEp.aggregate([
      {
        $match: {
        'resolue': {
        $gte: new Date(req.query.dateFrom),
        $lte: new Date(req.query.dateTo)
        }}
      },
      {
        $group: {
          _id: {annee: { $year: "$resolue" }, mois: { $month: "$resolue" }},
          nombre: {$sum: 1}
        }
      }])
    .then(tasksEp => {
      res.status(200).json({
      tasksEp: tasksEp
      });
    });
  }
});

//  router.get('', checkAuth, (req, res, next) => {
//   TaskEp.find().then(tasksEp => {
//     res.status(200).json({
//       tasksEp: tasksEp
//     });
//   });
// });


module.exports = router
