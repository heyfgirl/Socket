
var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    users=[];//保存所有在线用户的昵称
app.use('/', express.static(__dirname + '/public'));
server.listen(5000);
    console.log('server started'+"       "+"port 5000");

//socket部分

    io.on('connection',function(socket){
        //昵称设置
        socket.on('login', function(nickname) {
            if (users.indexOf(nickname) > -1) {
                socket.emit('nickExisted');
            } else {
                socket.userIndex = users.length;
                socket.nickname = nickname;
                users.push(nickname);
                socket.emit('loginSuccess');
                io.sockets.emit('system', nickname, users.length, 'login');
            };
        });
        socket.on('foo',function(data){
            //控制台输出消息
            console.log(data);
        });
        //断开连接的事件
        socket.on('disconnect', function() {
            //将断开连接的用户从users中删除
            users.splice(socket.userIndex, 1);
            //通知除自己以外的所有人
            socket.broadcast.emit('system', socket.nickname, users.length, 'logout');
        });
        //接收新消息
        socket.on('postMsg', function(msg,color) {
            //将消息发送到除自己外的所有用户
            socket.broadcast.emit('newMsg', socket.nickname, msg,color);
        });
        //接收用户发来的图片
        socket.on('img', function(imgData) {
            //通过一个newImg事件分发到除自己外的每个用户
            socket.broadcast.emit('newImg', socket.nickname, imgData);
        });
    });

