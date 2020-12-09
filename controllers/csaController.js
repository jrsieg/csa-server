const router = require('express').Router();
const CSA = require('../db').import('../models/csa');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validateSession = require('../middleware/validate-session');


// sign up POST
router.post("/signup", (req, res) => {
    CSA.create({
        farmName: req.body.farmName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 12)
        
    })
        .then(csa => {
            const token = jwt.sign({ id: csa.id }, process.env.JWT_SECRET, { expiresIn: "365d"})

            res.json({
                csa: csa,
                message: "CSA was created successfully",
                sessionToken: token
            })
        })
        .catch(err => res.status(500).send(err))
})

router.post('/signin', (req, res) => {
    CSA.findOne({
        where: { email: req.body.email }
    })
        .then(csa => {
            if (csa) {
                bcrypt.compare(req.body.password, csa.password, (err, matches) => {
                    if (matches) {
                        const token = jwt.sign({ id: csa.id }, process.env.JWT_SECRET, { expiresIn: "365d" });

                        res.json({
                            csa: csa,
                            message: "successfully authenticated",
                            sessionToken: token
                        })
                    } else{
                        res.status(502).json({ error: 'password mismatch' });
                    }
                })

            } else {
                res.status(500).json({error: 'CSA not found'})
            }

        })
        .catch(err => res.status(500).json({error: 'error with database'}))
});



// update CSA account --- still in progress 
router.put('/update', validateSession, (req, res) => {

    
    CSA.update(
        { email: req.body.email },{where: { email: req.csa.email }, returning: true}
    ) .then ((csa) => {
        res.status(200).json({
            Message: "CSA updated",
            CSA: csa
        })
    }

    )

    .catch(err => res.status(500).json({ error: err }))
    
})


//delete CSA account --- still in progress 

router.delete('/deleteCSA', (req, res) => {
    CSA.findOne({
        where: { email: req.body.email }
    })
        .then(csa => {
            if (csa) {
                bcrypt.compare(req.body.password, csa.password, (err, matches) => {
                    if (matches) {
                        const token = jwt.sign({ id: csa.id }, process.env.JWT_SECRET, { expiresIn: "365d" });

                        res.json({
                            csa: csa,
                            message: "successfully authenticated",
                            sessionToken: token
                        })
                    } else{
                        res.status(502).json({ error: 'password mismatch' });
                    }
                })

            } else {
                res.status(500).json({error: 'CSA not found'})
            }

        })
        .catch(err => res.status(500).json({error: 'error with database'}))
});

module.exports = router;