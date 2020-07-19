const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const models = require('../db/models')
app.use(express.json())
app.use(express.urlencoded())
app.use(bodyParser.urlencoded({extended: true}))


// 查询任务列表
app.get('/list/:status/:page', async (req, res, next) => {
    // next(new Error('自定义异常'))
    res.json({
        list: []
    })
})
// 创建todo列表
app.post('/create', async(req,res, next) => {
    try {
        let {name, deadline, content} = req.body
        let todo = await models.Todo.create({
            name,
            deadline,
            content
        })
        res.json({
            todo: todo,
            message: 'create success'
        })
    } catch (error) {
        next(error)
    }
    
})

// 编辑任务
app.post('/update', async(req,res, next) => {
    try {
        let {name, deadline, content, id} = req.body
        let todo = await models.Todo.findOne({
            where: {
                id
            }
        })
        if (todo) {
            // 更新任务
            todo = await todo.update({
                name,
                deadline,
                content
            })
        }
        res.json({
            todo,
            message: 'update sucess'
        }) 
    } catch (error) {
        next(error)
    } 
})

// 删除任务或改变状态
app.post('/update_status', async (req, res, next) => {
    try {
        let { id, status } = req.body
        let todo = await models.Todo.findOne({
            where: {
                id
            }
        })
        if (todo) {
            todo = await todo.update({
                status
            })
        }
        res.json({
            todo
        })
    } catch (error) {
      next(error)  
    }
})

// 错误处理
app.use((err, req, res, next) => {
    if(err) {
        res.status(500).json({
            message: err.message
        })
    }
})



app.listen(3000, () => {
    console.log('服务器监听在3000端口')
})