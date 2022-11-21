// GET API in MYSQL
// This Will fetch the Data from Database 
const express = require('express');
const path = require('path');
const app = express();
const connect = require("./config");
const port = process.env.PORT || 8085;

// app.use(express.static(path.join(__dirname)));
const views = path.join(__dirname, "views");
app.set('view engine', "hbs");

app.set(express.json())
app.use(express.urlencoded({ extended: false }))



app.get('/', (req, res) => {
    res.render('index');
});


app.get('/result', (req, res) => {
    let query = req.query.query;
    console.log(query);
    connect.query(query, (err, result) => {
        if (err) {
            res.render('error', {
                Err: err
            });
            // res.send(err);
        } else {
            const My_data = JSON.parse(JSON.stringify(result));
            // console.log(obj)
            // res.render('result', {
            //     Data: My_data
            // });
            // res.send(result)
            let arr = JSON.parse(JSON.stringify(My_data));
            // for(const key in My_data){
            //     // arr[index] = console.log(My_data[index]);
            //     console.log(`${key}: ${My_data[key]}`)
            // }
            console.log(arr)
            if (arr.message === '') {
                console.log(arr)
                // console.log(arrFinal)
                if(arr.insertId !== 0){
                    res.render('success', {
                        arr,
                        insert : arr.insertId
                    });
                } else {
                    res.render('success', {
                        arr,
                        insert : arr.insertId
                    });
                }
            } else if(arr.changedRows === 1){
                res.render('success', {
                    arr,
                    update : arr.changedRows,
                });
            } else {
                console.log(arr.message)
                res.render('result', {
                    Head: arr[0],
                    Data: arr
                })
            }
        }
    })
})

app.listen(port, () => {
    console.log(`Server is runnig at http://localhost:${port}`);
});