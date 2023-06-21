const http = require('http');
const fs = require('fs');
const PORT = 3000;
const path = require('path');

const server = http.createServer();
server.on('request', async (req, res)=>{
    let filePath = path.join(__dirname, 'views', req.url === '/' ? 'index.html' : req.url);
    
    // 수정
    let contentType  = 'text/html;charset=utf-8';  
    let extname = path.extname( filePath );
    
    switch(extname){
        case '.css': contentType = 'text/css'; break;
        case '.jpg': contentType = 'image/jpg'; break;
        case '.png': contentType = 'image/png'; break;
        case '.gif': contentType = 'image/gif'; break;
        case '.js': contentType = 'text/javascript'; break;
        case '.json': contentType = 'application/json'; break;
        case '.mp3': contentType = 'audio/mp3'; break;
        case '.mp4': contentType = 'video/mp4'; break;
        case '.txt': contentType = "text/plan"
    }
    
    try{
       
        //브라우저 <->서버
        if( req.url.includes('name')&& req.method === 'POST'){
           let body ='';
           req.on('data',(chunk)=>{
            body = chunk.toString();
            // 안에서 처리 할 수 있음

           })
           req.on('end',()=>{
            const newUser = JSON.parse(body);
            console.log(newUser);
            const response =  fs.readFileSync(path.join(__dirname,'model','users.json'))
            const users = JSON.parse(response);

            //const find = users.find(data=>data.first_name === first_name);
            //1개찾기 {}
            console.log(find)
            const filter = users.filter(data=>data.first_name !== first_name);
            console.log(filter);
            //여러개 찾기 [{}] //!== 삭제한 데이터를 리턴 

           
           
            fs.writeFileSync(
                path.join(__dirname,'model','users.json'),
                JSON.stringify(filter,null,"   "),
                "utf-8",
                (err)=>{console.log(err)}
                )
                const content = {
                    success : 'ok',
                    message : '정상등록 되었습니다.',
                    name : newUser
                   }
                    res.end(JSON.stringify(content));
                    
                }
                res.end();
           })
        
           
    catch(err){
        console.log(err);
    }
    
    


server.listen(PORT, ()=>{
    console.log('listing PORT ', PORT );
})

/* 
다음주 : 
javascript : document.querySelector()
jQuey :      $()

node route 매우 불편 (99%)
express route
*/