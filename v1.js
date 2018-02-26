const express = require('express');
const router = express.Router();
const data = {
    'hello': {'kr': "안녕하세요.", 'en': "Hello."},
    'bye': {'kr': "안녕히가세요.", 'en': "Bye."}
};


// param을 이용한 lang 찾기
router.get('/:greeting/:lang', (req, res)=>{ // / 뒤에 오는   것을 greeting이라는 param으로 받아준다.
    // ":greeting"을하면 req.params 시  { "greeting" : "greeting에 해당하는 url이 value로 들어감" }
    const greet = data[req.params['greeting']];
    const lang = req.params['lang'];

    console.log(req.params);

    res.send(greet[lang]);
} );




// query를 이용한 lang 찾기.
router.get('/:greeting', (req, res) => { // /v1 뒤에 올 url을 적는다. ( /v1/hello )
    res.send(data[req.params['greeting']][req.query['lang']]);
    console.log(req.params);
    console.log(req.query);
});

module.exports = router;
