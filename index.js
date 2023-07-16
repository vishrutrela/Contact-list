const express = require('express');
const path = require('path');
const port = 4000;
const db = require('./config/mongoose');
const Contact = require('./models/contact');


const app = express();
// app.use(express.static(path.join(__dirname)));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('Assets'))


// middleware
// app.use(function(req,res,next){
//     console.log('middleware1');
//     next();
// });
// app.use(function(req,res,next){
//     console.log('middleware2');
//     next();
// });
var contactList = [
    {
        name: 'vishrut rela',
        phone: '12345'
    },
    {
        name: 'abhishek',
        phone: '234567'
    },
    {
        name: 'rahul',
        phone: '123456'
    }
]

app.get('/', async function (req, res) {
    try {
        const contacts = await Contact.find({});
        return res.render('home', {
          title: 'Contact list',
          contact_list: contacts,
        });
      } catch (err) {
        console.log('error in fetching contacts from database:', err);
        return;
      }
      
})

app.post('/create-contact', async (req, res) => {
    // return res.redirect('/practice');
    // console.log(req.body);
    // console.log(req.body.name);
    // console.log(req.body.phone);

    // contactList.push({
    //     name: req.body.name,
    //     phone:req.body.phone
    // });
    
    try {
        const newContact = await Contact.create({
          name: req.body.name,
          phone: req.body.phone
        });
        
        console.log('*************', newContact);
        return res.redirect('back');
      }
     catch (err) {
        console.log('error in creating contact:', err);
        return;
      }

})
app.get('/profile', function (req, res) {
    return res.render('profile', {
        title: 'profile page'
    });
})
app.get('/practice', function (req, res) {
    return res.render('practice', {
        title: 'practice page',
    });
})

/***************************Deleting a contact*******************************/
app.get('/delete-contact', async function (req, res) {
  // console.log(req.query);
    let id = req.query.id;

    await Contact.findByIdAndDelete(id);
        try{
            return res.redirect('back');
        }catch(err){
            console.log('error in deleting the contact')
        }
        
        
        
        
 })
    


app.listen(port, function (err) {
    if (err) { console.log('Error is running the server', err); }
    console.log('YUP! Express server is running in port:', port);
});  