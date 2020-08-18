const express    = require('express');
const mysql      = require('mysql');
const dbconfig   = require('./config/database.js');
const connection = mysql.createConnection(dbconfig);

var bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))

app.set('port', process.env.PORT || 8000);

app.get('/', (req, res) => {
    var ip = req.headers['x-forwarded-for'] ||
                req.connection.remoteAddress ||
                req.socket.remoteAddress ||
            (req.connection.socket ? req.connection.socket.remoteAddress : null);
    console.log(ip);
    res.send('Hello, New World! : ' + ip + "," + new Date());
});

app.get('/health', (req, res) => {
    res.status(200).send();
});



app.get('/members', (req, res) => {
    connection.query('SELECT * from members', (error, rows) => {
    if (error) throw error;
    console.log('User info is: ', rows);
    res.send(rows);
  });
});
app.get('/travelclub', (req, res) => {
    connection.query('SELECT * from travelclub', (error, rows) => {
    if (error) throw error;
    console.log('User info is: ', rows);
    res.send(rows);
  });
});
app.get('/membership', (req, res) => {
    connection.query('SELECT * from membership', (error, rows) => {
    if (error) throw error;
    console.log('User info is: ', rows);
    res.send(rows);
  });
});
app.get('/clubpost', (req, res) => {
    connection.query('SELECT * from clubpost', (error, rows) => {
    if (error) throw error;
    console.log('User info is: ', rows);
    res.send(rows);
  });
});


app.post('/insert_member', function (req, res) {
        var email = req.body.email
        var name = req.body.name
        var age = req.body.age
        var phoneNumber = req.body.phoneNumber
        var birthDay = req.body.birthDay
        var address = req.body.address
   connection.query("INSERT INTO members (email, name, age, phoneNumber, birthDay, address) VALUES ('"+email+"', '"+name+"', '"+age+"', '"+phoneNumber+"', '"+birthDay+"', '"+address+"')" ,
        function (error, result, fields) {

        if (error) {
                res.send('error : ' + error)
        }
        else {
                res.send('success create user name: '+ name)
        }
      })
    }
)


app.post('/insert_travelclub', function (req, res) {
   var clubName = req.body.clubName
   var masterEmail = req.body.masterEmail
   var intro = req.body.intro
   let today = new Date();   

   let year = today.getFullYear(); 
   let month = today.getMonth() + 1;  
   let date = today.getDate()+1; 
   var foundationDay =( year + '-' + month + '-' + date)
   connection.query("INSERT INTO travelclub (clubName, masterEmail, intro, foundationDay) VALUES ('"+clubName+"', '"+masterEmail+"', '"+intro+"', '"+foundationDay+"')" ,
   function (error, result, fields)  {
   if (error) {
      res.send('error : ' + error)
    }
   else {
      res.send('success create club name: '+ clubName)
    }
    })
})

app.post('/insert_Membership', function (req, res) {
   var email = req.body.email
   var clubName = req.body.clubName
   connection.query("INSERT INTO membership (email , clubName) VALUES ('"+email+"', '"+clubName+"')" ,
   function (error, result, fields) 
  { if (error) {
      res.send('error : ' + error)
    }
   else {
      res.send('success create club name: '+ clubName)
    }
    })
}
)
app.post('/insert_Membership_2', function (req, res) {
   var email = req.body.email
   var clubName = req.body.clubName
   connection.query("INSERT INTO membership (email , clubName) VALUES ('"+email+"', '"+clubName+"')" ,
   function (error, result, fields) 
  { if (error) {
      res.send('error : ' + error)
    }
   else {
      res.send('success create club name: '+ clubName)
    }
    })
})
app.post('/insert_post', function (req, res) {
   var postName = req.body.postName
   var email = req.body.email
   var clubName = req.body.clubName
   var information = req.body.information
   connection.query("INSERT INTO clubpost (postName, email, clubName, information) VALUES ('"+ postName +"', '"+ email +"', '"+ clubName +"', '"+ information +"')" ,
   function (error, result, fields) 
  { if (error) {
      res.send('error : ' + error)
    }
   else {
      res.send('success create club name: '+ clubName)
    }
    })
})


app.post('/update_member', function (req, res) {
        var email = req.body.email
        var name = req.body.name
        var age = req.body.age
        var phoneNumber = req.body.phoneNumber
        var birthDay = req.body.birthDay
        var address = req.body.address
        var sql = 'UPDATE members SET name=?,age=?,phoneNumber=?,birthDay=?,address=? WHERE email = ?';
   connection.query(sql,[name,age,phoneNumber,birthDay,address,email],
        function (error, result, fields) {

        if (error) {
                res.send('error : ' + error)
        }
        else {
                res.send('success update user: '+ name)
        }
      })
    }
)

app.post('/update_TravelClub', function (req, res) {
        var clubName = req.body.clubName 
        var intro = req.body.intro
        var sql = 'UPDATE travelclub SET intro=? WHERE clubName = ?';
   connection.query(sql,[intro,clubName],
        function (error, result, fields) {

        if (error) {
                res.send('error : ' + error)
        }
        else {
                res.send('success update club: '+ clubName)
        }
      })
    }
)

app.post('/update_post', function (req, res) {
        var postName = req.body.postName 
        var information = req.body.information
        var sql = 'UPDATE clubpost SET information=? WHERE postName = ?';
   connection.query(sql,[information,postName],
        function (error, result, fields) {

        if (error) {
                res.send('error : ' + error)
        }
        else {
                res.send('success update post: '+ postName)
        }
      })
    }
)

app.post('/delete_member', function (req, res) {
        var email = req.body.email
        var sql = 'DELETE FROM members WHERE email = ?';
        connection.query(sql,[email],

        function (error, result, fields) {

        if (error) {
                res.send('error : ' + error)
        }
        else {
                res.send('success deleted!!:')
        }
      })
    }
)

app.post('/delete_TravelClub', function (req, res) {
        var clubName = req.body.clubName
        var sql = 'DELETE FROM travelclub WHERE clubName = ?';
        connection.query(sql,[clubName],

        function (error, result, fields) {

        if (error) {
                res.send('error : ' + error)
        }
        else {
                res.send('success deleted!!: ')
        }
      })
    }
)


app.post('/delete_Membership', function (req, res) {
        var email = req.body.email
        var clubName = req.body.clubName
        var sql = 'DELETE FROM membership WHERE email = ? AND clubName=?';
        connection.query(sql,[email,clubName],

        function (error, result, fields) {

        if (error) {
                res.send('error : ' + error)
        }
        else {
                res.send('success deleted!!: ')
        }
      })
    }
)




app.post('/delete_post', function (req, res) {
       var postName = req.body.postName
var email = req.body.email

 
        var sql = 'DELETE FROM clubpost WHERE postName = ? AND email = ?';
        connection.query(sql,[postName,email],

        function (error, result, fields) {

        if (error) {
                res.send('error : ' + error)
        }
        else {
                res.send('success deleted!!: ')
        }
      })
    }
)



app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
})
