const router = require('express').Router();
const CSA = require('../db').import('../models/csa');
const User = require('../db').import('../models/user');


const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validateSession = require('../middleware/validate-session');


router.post('/user/:userid/csa/:csaid', async(req, res) => {
    try {

        const user = await User.findOne({where: {id: req.params.userid}})

        const csa = await CSA.findOne({where: {id: req.params.csaid}})
        console.log(Object.keys(csa))
        const result = await user.addCsa(csa)

        res.status(200).json(result)


    } catch (e) {
        res.status(500).json({error: e})
    }
})


module.exports = router;