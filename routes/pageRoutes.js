const router = require('express').Router();
const { main, profile } = require('../navs')
const { checkAuth } = require('../middlewares/middlewares');
const Story = require('../models/storyModel');
const _ = require('lodash')
let session;

router.get('/register',checkAuth, (req, res) => {
    res.render('pages/register', {
        myRoutes: main
    })
});

router.get('/login',checkAuth, (req, res) => {
    res.render('pages/login', {
        myRoutes: main
    })
});

router.get('/stories', (req, res) => {
    let limit = 5;
    let search_query= req.query.search_query

    let search = search_query ? {nickname: search_query } : {}

    Story.find(search)
        .limit(limit)
        .exec()
        .then(stories => {
            session = req.session
            session.stories = stories

            res.render('pages/stories', {
                myRoutes: session.email && session.isAuth ? profile : main,
                stories: session.stories && session.isAuth ? session.stories : stories,
                page: 1,
                prev: false,
                next: true
            })
        })
        .catch((err) => {
            console.log(err);
        });
});

router.get('/stories/:page', (req, res) => {
    const { search_query } = req.query
    let limit = 5;
    let page = parseInt(req.params.page) <= 0 ? 1 : parseInt(req.params.page);

    Story
        .countDocuments()
        .exec()
        .then(size => {
            console.log(size)
            let search = search_query ? { nickname: search_query} : {}
            let start = (page - 1) * limit;
            let end = page * limit;
            let prev = false;
            let next = false;



            Story.find(search)
                .limit(limit)
                .skip(start)
                .exec()
                .then(stories => {
                    console.log("page", page)
                    session = req.session
                    session.stories = stories

                    console.log("end", end)
                    console.log("limit", limit)
                    console.log("size", size)
                    console.log("start", start);

                    if(start > 0){
                        prev = true
                    }

                    if(end < size){
                        next = true
                    }

                    if(stories.length < 1){
                       res.redirect('/mystory/stories');
                       return
                    }

                    res.render('pages/stories', {
                        myRoutes: session.email && session.isAuth ? profile : main,
                        stories: session.stories && session.isAuth ? session.stories : stories,
                        page: page,
                        prev: prev,
                        next: next
                    })
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err)
        })
});

router.get('/account', (req, res) => {
    session = req.session
    if(!session.email && !session.isAuth) return res.redirect('/mystory/login')
    res.render('pages/account', {
        myRoutes: profile,
        email: session.email
    })
});

router.get('/story', (req, res) => {
    session = req.session
    let fetch = !session.email ? {} :  { senderEmail: session.email }
    
    Story.find(fetch, (err, stories) => {
        console.log(stories)
        console.log(session.isAuth)
        session.stories = stories

        res.render('pages/story', {
            myRoutes: !session.email ? main : profile,
            stories: err ? [] : stories,
            isAuth: session.isAuth,
            titleStories: session.isAuth && session.email ? 'Created Stories' : 'Past Stories',
            email: session.email && session.isAuth ? session.email : "random"+Math.round(Math.random()*9999)+"@yahoo.com",
            nickname: session.isAuth && stories.length > 0 ? stories[0].nickname : ""
        })
    });
});

router.get('/logout', (req, res) => {
    session = req.session
    session.destroy();
    res.redirect('/mystory/login')
});



module.exports = router
