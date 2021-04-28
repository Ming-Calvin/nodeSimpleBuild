var express = require('express');
var router = express.Router();
var models = require('../models');
// 模糊搜索
var Op = models.Sequelize.Op

// 1.第一个请求
// router.get('/', function (req, res, next) {
//     res.json({hello: "ITFun"});
// });


// 2.读取数据库
// router.get('/', async function (req, res, next) {
//     var articles = await models.Article.findAll();
//     res.json({ articles: articles });
// });


// 3.按照id排序
// router.get('/', async function (req, res, next) {
//     var articles = await models.Article.findAll({
//         order: [['id', 'DESC']],
//     });
//     res.json({ articles: articles });
// });


// 8.模糊搜索
// router.get('/', async function (req, res, next) {
//     // 搜索
//     var where = {}
//
//     // 模糊查询标题
//     var title = req.query.title;
//     if (title) {
//         where.title = {
//             [Op.like]: '%' + title + '%'
//         }
//     }
//
//     var articles = await models.Article.findAll({
//         order: [['id', 'DESC']],
//         where: where
//     });
//     res.json({ articles: articles });
// })

// 9.实现分页
router.get('/', async function (req, res, next) {
    // 搜索
    var where = {}
    // 当前页数 （currentPage）
    var currentPage = parseInt(req.query.currentPage) || 1;
    // 每页显示条数 （pageSize）
    var pageSize = parseInt(req.query.pageSize) || 2;

    // 模糊查询标题
    var title = req.query.title;
    if (title) {
        where.title = {
            [Op.like]: '%' + title + '%'
        }
    }

    var result = await models.Article.findAndCountAll({
        order: [['id', 'DESC']],
        where: where,
        offset: (currentPage - 1) * pageSize,
        limit: pageSize
    });

    res.json({
        articles: result.rows,
        pagination: {
            currentPage: currentPage,
            pageSize: pageSize,
            // 一共有多少条记录
            total: result.count
        }
    });
})

// 10.关联评论
router.get('/:id',async function (req, res, next){
    var article = await models.Article.findOne({
        where: { id: req.params.id },
        include: [models.Comment],
    })
    res.json({ article: article})
})



// 4.新增数据
router.post('/',async function (req, res, next) {
    // var article = await models.Article.create({
    //     title: '猫猫狗狗',
    //     content: '小动物们的快乐'
    // })

    // res.json({ '你发送的内容': req.body })

    var article = await models.Article.create(req.body)
    res.json({ article: article });
})


// 5.查询指定id
router.get('/:id',async function (req, res, next) {
    // res.json({ id: req.params.id });
    var article = await models.Article.findByPk(req.params.id);
    res.json({ article: article})
})


// 6.修改
router.put('/:id',async function (req, res, next) {
    var article = await models.Article.findByPk(req.params.id);
    article.update(req.body);
    res.json({ article: article})
})


// 7.删除
router.delete('/:id',async function (req, res, next) {
    var article = await models.Article.findByPk(req.params.id);
    article.destroy();
    res.json({ msg: '删除成功'})
})


module.exports = router;
