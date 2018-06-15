module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function loadWorkouts(res, mysql, context, complete){
        mysql.pool.query("SELECT * FROM workouts ORDER BY date_worked", function(error, results, fields){
            if(error){
                res.end();
            }
            context.exercises = results;
            complete();
        });
    }

    function updateWorkout(res, req, mysql){
        var sql= "UPDATE workouts SET date_worked = ?, name = ?, reps = ?, weight = ?, unit = ? WHERE workout_id = ?";
        var inserts = [];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.end();
            }
        })
    }

    function deleteWorkout(res, req, mysql){
        var sql= "DELETE FROM workouts WHERE workout_id = ?";
        var inserts = [];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.end();
            }
        })
    }
    router.get('/loadTable', function(req, res){
        var mysql = req.app.get('mysql');
        var payload = {};
        loadWorkouts(res, mysql, payload, complete);
        function complete(){
            res.send(JSON.stringify(payload));
        }
    })

    router.get('/', function(req, res){
        var mysql = req.app.get('mysql');
        var payload = {};
        loadWorkouts(res, mysql, payload, complete);
        function complete(){
            res.render('index');
        }
    })

    router.post('/update', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE workouts SET date_worked = ?, reps = ?, weight = ?, name = ?, unit = ? WHERE workout_id = ?";
        var inserts =[req.body.date_worked, req.body.reps, req.body.weight, req.body.name, req.body.unit, req.body.workout_id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log("An error occurred while attempting to update a record");
                res.end();
            } else {
                res.status(200);
                var payload = {};
                loadWorkouts(res, mysql, payload, complete);
                function complete(){
                    res.send(JSON.stringify(payload));
                }
            }
        })

    })

    router.post('/delete', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM workouts WHERE workout_id = ?";
        var inserts = [req.body.argument]
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log("An error occurred while attempting to delete a record");
                res.end();
            } else {
                res.status(200);
                var payload = {};
                loadWorkouts(res, mysql, payload, complete);
                function complete(){
                    res.send(JSON.stringify(payload));
                }
            }
        })
    })

    router.post('/add', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO workouts (date_worked, reps, weight, name, unit) VALUES(?,?,?,?,?)";
        var inserts = [req.body.date_worked, req.body.reps, req.body.weight, req.body.name, req.body.unit];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log("An error occurred while attempting to add a record");
                res.end();
            } else {
                res.status(200);
                var payload = {};
                loadWorkouts(res, mysql, payload, complete);
                function complete(){
                    res.send(JSON.stringify(payload));
                }
            }
        })
    })
    return router;
}();