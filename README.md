# 简易Node后端搭建

## 1. Express

### 1.1 安装

#### 1.1.1 安装淘宝镜像

安装npm之前可先安装淘宝镜像，使用cnpm的来代替npm，使得下载速度提高很多。

```
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

#### 1.1.2 初始化项目

目录下运行命令来初始化项目，期间所有提示按enter键即可，这会生成`package.json`，用于描述项目文件的.

```
cnpm init
```

再输入命令，项目目录中又会多出一个叫`node_modules`文件夹，里面是node.js提供的模块

```
cnpm install
```

#### 1.1.3 安装express

```
cnpm install express --save
```

创建结果：

<img src="https://calvin-typora-image.oss-cn-hangzhou.aliyuncs.com/img/20210309183046.png" alt="image-20210309183045551" style="zoom: 50%;" />

#### 1.1.4 检验是否创建成功

```
express --version
```

若出现版本号，则为创建成功

### 1.2 Express脚手架的安装

#### 1.2.1 使用express-generator安装

1. 命令行进入项目目录，运行命令

   ```
   cnpm i express-generator
   ```

2. 创建了一个名为app的Express应用，并使用ejs模板引擎

   ```
   express --view=ejs app
   ```

3. 进入app，并安装依赖

   ```
   cd app
   ```

4. 初始化项目

   ```
   npm install
   ```

5. 在Windows下，使用以下命令启Express应用

   ```
   set DEBUG=app:* & npm start
   ```

#### 1.2.2 使用express命令快速创建项目目录

用法：express项目文件夹的名字 -e

```
express app -ecd appcnpm install
```

app文件夹下的文件结构：

- bin: 启动目录，包含启动文件www，默认监听端口是 3000 ，直接node www执行即可。
- node_modules：依赖的模块包
- public：存放静态资源
- routes：路由操作
- views：存放ejs模板引擎
- app.js：主文件
- package.json：项目描述文件

### 1.3 参考资料

[Express全系列教程之(一)：Express的安装 和第一个程序](https://blog.csdn.net/no10086/article/details/88958282?spm=1001.2014.3001.5501)

## 2. sequelize

### 2.1 安装

#### 2.1.1 安装sequelize

```
cnpm install sequelize -S
```

#### 2.1.2 为MySQL数据库安装驱动程序

```
cnpm install mysql2 -S
```

#### 2.1.3 安装

通过命令行创建sequelize目录

```
cnpm install sequelize-cli -g
```

#### 1.1.4 初始化项目

```
sequelize init
```

文件目录：

- config -- 数据库配置
- migrations -- 迁移文件
- models -- 模型文件
- seeders -- 种子文件

### 2.2 配置数据库环境

#### 2.2.1 环境参数

<img src="https://calvin-typora-image.oss-cn-hangzhou.aliyuncs.com/img/20210309185515.png" alt="image-20210309185514118" style="zoom: 33%;" />

#### 2.2.2 配置参数

```js
"development": {  "username": "root",  "password": "root",  "database": "document_development",  "host": "127.0.0.1",  "dialect": "mysql"},
```

### 2.3 创建数据库

```
sequelize db:create --charset 'utf8mb4'
```

创建成功：

<img src="https://calvin-typora-image.oss-cn-hangzhou.aliyuncs.com/img/20210310102721.png" alt="image-20210310102720851" style="zoom: 67%;" />

### 2.4 sequelize操作数据库：模型、迁移与种子

#### 2.4.1 创建模型与迁移

```
sequelize model:generate --name Article --attributes title:string,content:text
```

创建了名为Article的模型 ，表有两个字段：标题（string类型）；内容（text 类型）

#### 2.4.2 模型文件

使用 `Node.js` 操作数据库需要用到模型文件，无需改动。

<img src="https://calvin-typora-image.oss-cn-hangzhou.aliyuncs.com/img/20210423174110.png" alt="image-20210423174109300" style="zoom: 33%;" />

#### 2.4.3 迁移文件

迁移文件：migrations/xxx-create-article.js，里面保存的是 Articles 的字段。

（注意：sequelize 中默认规定，模型的名称是单数，而数据表是复数）

![image-20210310103047714](https://calvin-typora-image.oss-cn-hangzhou.aliyuncs.com/img/20210423174423.png)

**`up`部分代码 -- 建表：**

<img src="https://calvin-typora-image.oss-cn-hangzhou.aliyuncs.com/img/20210423174954.png" alt="image-20210423174953113" style="zoom:50%;" />

**`down`部分代码 -- 删除表：**

代码的 `down` 部分，是 `up` 的反向操作。

<img src="https://calvin-typora-image.oss-cn-hangzhou.aliyuncs.com/img/20210423175139.png" alt="image-20210423175138106" style="zoom:50%;" />

#### 2.4.4 运行迁移

```
$ sequelize db:migrate
```

运行命令，将字段迁移进数据库

<img src="https://calvin-typora-image.oss-cn-hangzhou.aliyuncs.com/img/20210423173708.png" alt="image-20210423173706555" style="zoom:50%;" />

#### 2.4.5 种子文件

**创建种子文件,填充测试数据：**

```
$ sequelize seed:generate --name article
```

<img src="https://calvin-typora-image.oss-cn-hangzhou.aliyuncs.com/img/20210310103517.png" alt="image-20210310103516290" style="zoom: 50%;" />

**修改种子文件数据**

<img src="https://calvin-typora-image.oss-cn-hangzhou.aliyuncs.com/img/20210423180253.png" alt="image-20210423180252412" style="zoom: 50%;" />

**运行种子文件**

- 运行所有种子文件：

```
$ sequelize db:seed:all
```

- 运行指定的种子文件

```
sequelize db:seed --seed xxx-article
```

#### 2.4.6 总结

日常开发项目数据库操作的步骤：

|  步骤  |                          命令                          |                  说明                  |
| :----: | :----------------------------------------------------: | :------------------------------------: |
| 第一步 | sequelize model:generate --name Article --attributes … |            建模型和迁移文件            |
| 第二步 |                        人工处理                        |       根据需求调整模型和迁移文件       |
| 第三步 |                  sequelize db:migrate                  |          运行迁移，生成数据表          |
| 第四步 |         sequelize seed:generate --name article         |              新建种子文件              |
| 第五步 |                        人工处理                        |    将种子文件修改为自己想填充的数据    |
| 第六步 |                 sequelize db:seed:all                  | 运行种子文件，将默认数据填充到数据表中 |

### 2.5 查询数据库

#### 2.5.1 路由

添加一个新的路由文件：在 routes 中，添加一个叫做 articles.js 的文件。基础的代码，和项目自带的其他路由文件一样，直接复制过来。

<img src="https://calvin-typora-image.oss-cn-hangzhou.aliyuncs.com/img/20210423181604.png" alt="image-20210423181603303" style="zoom:50%;" />

```js
var express = require('express');var router = express.Router();// ....module.exports = router;
```

#### 2.5.2 `get` 请求

```js
router.get('/', function (req, res, next) {    res.json({hello: "ITFun"});});
```

**代码解析：**

![image-20210310110022651](https://calvin-typora-image.oss-cn-hangzhou.aliyuncs.com/img/20210310110023.png)

#### 2.5.3 使用路由

`app.js` 中使用`articles.js` 路由，路由文件才会生效

```js
var articlesRouter = require('./routes/articles');// ...app.use('/articles', articlesRouter);
```

#### 2.5.4 读取数据库

```js
var models = require('../models');// .....router.get('/', function (req, res, next) {    models.Article.findAll().then(articles => {        res.json({articles: articles});    })});
```

结果：

<img src="https://calvin-typora-image.oss-cn-hangzhou.aliyuncs.com/img/20210423182339.png" alt="express 读取接口" style="zoom:50%;" />

#### 2.5.5 异步查询语法

```js
router.get('/', async function (req, res, next) {    var articles = await models.Article.findAll();    res.json({articles: articles});});
```

- `async` 是 `异步` 的意思，`async function` 表明当前这个 `function` 是异步的。
- `await`，表示等待一个异步方法执行完成。`await` 只能在 `async` 函数内部使用，用在普通函数里就会报错。

#### 2.5.6 排序

```js
var articles = await models.Article.findAll({    order: [['id', 'DESC']],});
```

<img src="https://calvin-typora-image.oss-cn-hangzhou.aliyuncs.com/img/20210424161706.png" alt="倒序" style="zoom: 50%;" />

### 2.6 添加数据

#### 2.6.1 新增定义死的数据

找到模型后，使用 `create` 方法，将数据插入进去

```js
router.post('/', async function (req, res, next) {    var article = await models.Article.create({        title: "猫猫狗狗",        content: "小动物们的快乐"    })    res.json({article: article});});
```

#### 2.6.2 使用`Promise` 语法

```js
models.Article.create({    title: "asdf",    content: "asdfsadfsdf"}).then(article => {    res.json({article: article});})
```

#### 2.6.3 使用`Postman`测试接口

请求方式改为 `POST`，地址栏填上接口的地址。最后点击 `Send`

<img src="https://calvin-typora-image.oss-cn-hangzhou.aliyuncs.com/img/20210424162310" alt="在这里插入图片描述" style="zoom: 80%;" />

<img src="https://calvin-typora-image.oss-cn-hangzhou.aliyuncs.com/img/20210424162525.png" alt="image-20210424162524415" style="zoom:50%;" />

#### 2.6.4 用户提交数据

```
router.post('/', async function (req, res, next) {    res.json({'你发送的内容是': req.body});});
```

注：`req.body`：用户使用 `post` 发送过来的内容

**测试接口**

打开 `Postman`，点击 `Body`，选择 `x-www-form-urlencoded`。`key` 要填对应数据库里的字段名称，`value` 里填插入数据库的数据。

<img src="https://calvin-typora-image.oss-cn-hangzhou.aliyuncs.com/img/20210424162648.png" alt="postman 测试 post提交数据" style="zoom: 50%;" />

#### 2.6.5 将用户的数据插入数据库

```js
router.post('/', async function (req, res, next) {    var article = await models.Article.create(req.body);    res.json({article: article});});
```

### 2.7 数据库的删改查

#### 2.7.1 `id`属性

将`id`作为查询依据：

- 每个数据都有`id`属性
- `id`属性自增，永远不会重复的

<img src="https://calvin-typora-image.oss-cn-hangzhou.aliyuncs.com/img/20210424163418.png" alt="image-20210424163417598" style="zoom:50%;" />

定义的路由的时候，就在 `/` 后面加上一个 `:id`。这样定义后，表示这里可以接受一个 `文章id` 参数。

```js
router.get('/:id', async function (req, res, next) {    res.json({id: req.params.id});});
```

使用 `req.params.id`方法，可以取到传入的id值

<img src="https://calvin-typora-image.oss-cn-hangzhou.aliyuncs.com/img/20210424163657.png" alt="获取id" style="zoom:50%;" />

#### 2.7.2 查询

接收到用户传递的`id`值后，在模型中调用`findByPk`。 就可以在` Articles `表中找到当前文章

```js
router.get('/:id', async function (req, res, next) {    var article = await models.Article.findByPk(req.params.id);    res.json({article: article});});
```

> 注意：`findByPk`，这里的 `Pk` 是 `Primary Key` 也就是`主键`的缩写。一般每个表都有个`主键`，如果没有特殊命名，一般来说就是 `id` 字段

<img src="https://calvin-typora-image.oss-cn-hangzhou.aliyuncs.com/img/20210424164129.png" alt="查询接口" style="zoom:50%;" />

#### 2.7.3 修改

```js
router.put('/:id', async function (req, res, next) {    var article = await models.Article.findByPk(req.params.id);    article.update(req.body);    res.json({article: article});});
```

<img src="https://calvin-typora-image.oss-cn-hangzhou.aliyuncs.com/img/20210424164203.png" alt="修改接口" style="zoom: 50%;" />

<img src="https://calvin-typora-image.oss-cn-hangzhou.aliyuncs.com/img/20210424164211.png" alt="修改接口" style="zoom:50%;" />

#### 2.7.4 删除

```js
router.delete('/:id', async function (req, res, next) {    var article = await models.Article.findByPk(req.params.id);    article.destroy();    res.json({msg: '删除成功'});});
```

使用的请求方式是 `delete`。也是查询到当前文章后，直接调用 `destroy` 方法删掉它，返回 `msg: '删除成功'` 。

<img src="https://calvin-typora-image.oss-cn-hangzhou.aliyuncs.com/img/20210424164356.png" alt="删除接口" style="zoom: 50%;" />

#### 2.7.5 总结

| 路由          | 请求方式 | 含义               |
| ------------- | -------- | ------------------ |
| /articles     | get      | 查询所有文章       |
| /articles/:id | get      | 查询指定 id 的文章 |
| /articles     | post     | 新增文章           |
| /articles/:id | put      | 编辑指定 id 的文章 |
| /articles/:id | delete   | 删除指定 id 的文章 |

### 2.8 模糊搜索

定义一个叫做 `where` 的空对象，里面保存需要查询的条件。

接收`title`参数，`where` 里添加一个 `like`（`SQL` 语句语法）。前后各放了一个 `%`，前面有百分号，表示关键词，前面可以有其他文字。后面有百分号，就表示关键词后面，可以跟着其他文字。模型调用`findAll`方法。

```js
router.get('/', async function (req, res, next) {   // 搜索    var where = {};    // 模糊查询标题    var title = req.query.title;    if (title) {        where.title = {            [Op.like]: '%' + title + '%'        }    }    var articles = await models.Article.findAll({        order: [['id', 'DESC']],        where: where    });    res.json({articles: articles});});
```

### 2.9 分页查询

#### 2.9.1 分页原理

| 当前页数（currentPage） | 从哪里开始（offset） | 每页显示多少条（pageSize） |
| :---------------------: | :------------------: | :------------------------: |
|            1            |          0           |             10             |
|            2            |          10          |             10             |
|            3            |          20          |             10             |

由表格可知：

 `pageSize` 参数是固定不动的，可以得出`offset`和`currentPage`的线性关系

```
offset = (currentPage - 1) * pageSizeoffset = (当前页数 - 1) * 每页条数
```

#### 2.9.2 分页实现

**当前页数（currentPage）**

如果用户传了这个参数，`currentPage`则为用户传递的值（注：用户传递的数据都是字符串，需要使用 `parseInt` 方法转换）；如果用户没传，则默认是 `第一页`。

```js
var currentPage = parseInt(req.query.currentPage) || 1;
```

或

```js
var currentPage = parseInt(req.query.currentPage);if (!currentPage) {    currentPage = 1;}
```

**每页显示多少条（pageSize）**

如果用户传了这个参数，`pageSize`则为用户传递的值；如果用户不传递参数过来，随便给它一个默认值。

```js
var pageSize = parseInt(req.query.pageSize) || 2;
```

**findAndCountAll、offset 与 limit**

```js
var result = await models.Article.findAndCountAll({    order:[['id', 'DESC']],    where: where,    offset: (currentPage - 1) * pageSize,    limit: pageSize});
```

- 将 `findAll` 改为 `findAndCountAll`，因为`findAndCountAll` 能返回总的记录数
- 接收值的 `articles` 改为 `result`，因为不仅仅有`文章列表`，还有`记录总数`
- 添加上 `offset` 和 `limit` 参数，`offset` 对应的值为公式得出的结果，`limit`的值为`pageSize`

**响应出分页的 `json`**

```js
return res.json(result);
```

<img src="https://calvin-typora-image.oss-cn-hangzhou.aliyuncs.com/img/20210425171239.png" alt="模糊查询" style="zoom: 50%;" />

- `count` 里，保存的就是记录总数了，咱们数据库一共就是只有 `4` 条记录
- `rows` 里，存的才是文章列表。

**返回分页数据**

```js
res.json({       articles: result.rows,       pagination: {           currentPage: currentPage,           pageSize: pageSize,           // 一共有多少条记录           total: result.count       }   });
```

### 2.10 表的关联

#### 2.10.1 评论模型

给文章添加上评论模块，使用关联模型，在查询文章的时候，自动查询出对应的评论。

添加评论模型代码：

```
$ sequelize model:generate --name Comment --attributes articleId:integer,content:text$ sequelize db:migrate
```

#### 2.10.2 种子文件

**创建建种子文件**

```
$ sequelize seed:generate --name comment 
```

**导入数据**

```js
'use strict';module.exports = {    up: (queryInterface, Sequelize) => {        return queryInterface.bulkInsert('Comments', [            {                articleId: 1,                content: "这是文章1的评论",                createdAt: new Date(),                updatedAt: new Date()            },            {                articleId: 1,                content: "这个还是文章1的评论啊",                createdAt: new Date(),                updatedAt: new Date()            },            {                articleId: 2,                content: "这是文章2的评论",                createdAt: new Date(),                updatedAt: new Date()            }        ], {});    },    down: (queryInterface, Sequelize) => {        return queryInterface.bulkDelete('Comments', null, {});    }};
```

**刷新数据库**

```
$  sequelize db:seed --seed xxxx-comment 
```

#### 2.10.3 关联

**打开 `models/article.js` 模型**

```js
Article.associate = function (models) {    models.Article.hasMany(models.Comment)};
```

> 一篇文章中**有很多**评论

**打开 `models/comment.js` 模型**

```js
Comment.associate = function(models) {  models.Comment.belongsTo(models.Article);};
```

> 每条评论都是**属于**一篇文章的

#### 2.10.4 查询

```js
router.get('/:id', async function (req, res, next) {    var article = await models.Article.findOne({        where: {id: req.params.id},        include: [models.Comment],    })    res.json({article: article});});
```

加上`include`属性，会自动将当前文章对应的评论查出来

#### 2.10.5 效果

<img src="https://calvin-typora-image.oss-cn-hangzhou.aliyuncs.com/img/20210425172651.png" alt="关联查询" style="zoom:50%;" />

## 3. 参考及项目地址

### 3.1 参考地址

[node用express写后端restful接口实战]([https://blog.csdn.net/u010132177/article/details/109145320?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522161934100516780261912162%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=161934100516780261912162&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduend~default-5-109145320.first_rank_v2_pc_rank_v29&utm_term=node%E7%94%A8express%E5%86%99%E5%90%8E%E7%AB%AFrestful%E6%8E%A5%E5%8F%A3%E5%AE%9E%E6%88%98&spm=1018.2226.3001.4187](https://blog.csdn.net/u010132177/article/details/109145320?ops_request_misc=%7B%22request%5Fid%22%3A%22161934100516780261912162%22%2C%22scm%22%3A%2220140713.130102334..%22%7D&request_id=161934100516780261912162&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduend~default-5-109145320.first_rank_v2_pc_rank_v29&utm_term=node用express写后端restful接口实战&spm=1018.2226.3001.4187))

### 3.2 项目地址