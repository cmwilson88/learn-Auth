module.exports = function(app, passport) {

    // ===============================
    // HOME PAGE (with login links) ==
    // ===============================
    app.get('/', (req, res) => {
        res.render('index.ejs'); // load the index.ejs file
    })

    // ================================
    // LOGIN ==========================
    // ================================
    app.get('/login', (req, res) => {
        
        // render the page and pass in any flash data if it exists
        res.render('login.ejs', 
        {
            message: req.flash('loginMessage')
        })
    })

    // process the login form
    // app.post('/login', do all our passport stuff here);

    // ================================
    // SIGNUP =========================
    // ================================
    app.get('/signup', (req, res) => {
        
        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', 
        {
            message: req.flash('signupMessage')
        })
    })


    // ================================
    // PROFILE SECTION ================
    // ================================
    app.get('/profile', isLoggedIn, (req, res) => {
        res.render('profile.ejs', {
            user: req.user // get the user out of session pass to template
        })
    })

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in teh session, carry on
    if (req.isAuthenticated())
        return next()
    
    //  if they aren't redirect them to the home page
    res.redirect('/')
}