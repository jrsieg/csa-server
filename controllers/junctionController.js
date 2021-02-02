const router = require('express').Router();
const CSA = require('../db').import('../models/csa');
const User = require('../db').import('../models/user');


const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validateSession = require('../middleware/validate-session');


router.post('/csa/:csaid', validateSession, async(req, res) => {
    try {

        const user = await User.findOne({where: {id: req.user.id}})

        const csa = await CSA.findOne({where: {id: req.params.csaid}})
        console.log(Object.keys(csa))
        const result = await user.addCsa(csa)

        res.status(200).json(result)


    } catch (e) {
        res.status(500).json({error: e})
    }
})

router.get('/yourcsas', validateSession, (req, res) => {

    User.findOne({
        where: {id: req.user.id},
        include: CSA
    })
        .then(csa => res.status(200).json(csa))
        .catch(err => res.status(500).json({ error: err}))
})



router.get('/yourusers/:csaid', validateSession, (req, res) => {

    CSA.findOne({
        where: {id: req.params.csaid},
        include: User
    })
        .then(user => res.status(200).json(user))
        .catch(err => res.status(500).json({ error: err}))
    // res.json('working')
})


module.exports = router;