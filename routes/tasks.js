var express = require('express');
var router = express.Router();

var Task = require('../models/Task')

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {
  Task.find({}, function (err, tasks) {
    res.render('tasks/all', { tasks: tasks });
  });
});
router.get('/add', function (req, res, next) {
  res.render('tasks/add', { title: 'Add a task' });
});

router.post('/add', (req, res) => {
  var task = new Task()

  task.title = req.body.title,
    task.description = req.body.description

  task.save()
    .then(item => {
      return res.redirect('/tasks')
      //res.send("item saved to database");
    })
    .catch(err => {
      return res.redirect('/add')
      //res.status(400).send("unable to save to database");
    });
});

router.get('/delete/:id', (req, res) => {
  Task.findByIdAndRemove(req.params.id, function (err) {
    if (err) return next(err);
    return res.redirect('/tasks')
  })
});

router.get('/edit/:id', function (req, res, next) {
  Task.findById(req.params.id, function (err, task) {
    res.render('tasks/edit', { task: task });
  })
});

router.post('/edit/:id', function (req, res, next) {
  Task.findByIdAndUpdate(req.params.id, {
    $set:
    {
      title: req.body.title,
      description: req.body.description
    }
  }, function (err) {
    return res.redirect('/tasks')
  })

});

// router.post('edit/:id', function (req, res) {
//   Task.findByIdAndUpdate(req.params.id, { $set:{title:req.title,description:req.description} }, function (err, task) {
//     if (err) return next(err);
//     res.render('tasks/edit', { title: 'Edit task' });
//   });
// });


module.exports = router;
