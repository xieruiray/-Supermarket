var express = require('express');
var router = express.Router();
// 引入数据库模块
const connection = require('./connect');
/**
 * 设置多个响应头 -- 写在所有路由之前 拦截所有请求
 */
router.all('*', (req, res, next) => {
  // 先设置响应头
  res.setHeader('Access-Control-Allow-Origin', 'http://192.168.20.50:8080');
  // 设置允许设置cookie
  res.setHeader('Access-Control-Allow-Credentials', true);
  // 给其他路由放行
  next();
})


// 接收添加账号请求的路由/adduser
router.post('/adduser', (req, res) => {
  // // 设置响应头
  res.header('Access-Control-Allow-Origin', '*');
  //接收参数
  let {
    username,
    password,
    usergroup
  } = req.body;
  console.log(username, password, usergroup)
  // //把这些数据存入数据库
  // //构造sql语句（使用？站位的写法 更安全 可以过滤不安全的数据）
  const sqlStr = 'insert into users(username,password,usergroup)values(?,?,?)';
  // //参数列表
  const sqlParams = [username, password, usergroup];
  // //执行sql语句
  connection.query(sqlStr, sqlParams, (err, data) => {

    if (err) {
      throw err;
    } else {
      console.log(data);
      // 如果受影响的数据行数 > 0 就是成功
      if (data.affectedRows > 0) {
        // 返回成功的信息（数据对象）给前端
        res.send({
          "rstCode": 1,
          "msg": "添加账号成功"
        })

      } else {
        // 否则就是失败 返回失败的信息（数据对象）给前端
        res.send({
          "rstCode": 0,
          "msg": "添加账号失败"
        })
      }
    }
  })
  // res.send('1')
})

//接收账号列表的请求

router.get('/userlist', (req, res) => {
  

  // 构造sql 查询所有用户账号数据 
  /* 
    order by 字段 修饰符（asc desc） 按照这个字段排序 默认是升序 asc是升序 desc是降序
  */
  const sqlStr = 'select * from users order by cdate desc'
  // // 执行sql语句
  connection.query(sqlStr, (err, data) => {
    if (err) {
      throw err // 如果有错 抛出错误
    } else {
      // 否则 把查询到的所有用户账号数据 响应（返回）给前端
      res.send(data)
    }
  })
})

//接收单条数据的请求/deluser
router.get('/deluser', (req, res) => {
  //接收id
  let {
    id
  } = req.query;
  //构造sql语句 根据接收到的id 删除这一条数据
  const sqlStr = `delete from users where id = ${id}`;
  //执行sql语句 (单条删除)
  connection.query(sqlStr, (err, data) => {
    if (err) {
      throw err;
      // 根据结果判断 如果受影响行数 > 0 就是删除成功
    } else if (data.affectedRows > 0) {
      // 返回删除成功的信息给前端
      res.send({
        "rstCode": 1,
        "msg": "删除成功"
      });
    } else {
      //删除失败 返回失败的信息（数据对象）给前端
      res.send({
        "rstCode": 0,
        "msg": "删除失败"
      });
    }
  })

})

// 接收修改用户请求 数据回显 / edituser
// 接收需要修改的数据id
router.get('/edituser', (req, res) => {


  let {
    id
  } = req.query;
  // 构造sql语句
  const sqlStr = `select * from users where id =${id}`;
  //执行sql语句
  connection.query(sqlStr, (err, data) => {
    if (err) {
      throw err;

    } else {
      res.send(data);
    }
  })
})
// 接收保存修改用户请求/saveedit

router.post('/saveedit',(req,res)=>{
  // res.send('1');
  // 接收新的数据 和一个原来的ID
  let {username,password,usergroup,editId} =req.body;
  //构造sql语句
  const sqlStr = `update users set username='${username}', password='${password}', usergroup='${usergroup}' where id=${editId}`;
 
  //执行sql语句
  connection.query(sqlStr,(err,data)=>{
    if(err){
      throw err;
       // 如果受影响行数 大于0 就是修改成功 返回给前端修改成功的信息
    }else if(data.affectedRows>0){
      res.send({"rstCode":1,"msg":"修改成功"});
      //修改失败 返回给前端修改失败信息
    }else{
      res.send({"rstCode":0,"msg":"修改失败"});
    }
  })
})
module.exports = router;