const router  = require('express').Router()

router.route('/').get(async(req,res)=>{
    const  {after} = req.query
    const redditres = await fetch('https://www.reddit.com/user/digitalmonkey87/m/inspiration.json?after='+after)
    const json =  await redditres.json()
    res.json(json)
})

router.route('/search').get(async(req,res)=>{
    const {query,after} = req.query
    const response = await fetch(`https://www.reddit.com/search.json?q=${query}&include_over_18=1&after=${after}`)
    const json = await response.json()
    res.json(json)
})
module.exports = router