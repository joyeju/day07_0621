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
        //delete : localhost:3000/first_name=kim 
        //delete : localhost:3000/name
        //브라우저 <-> 서버
        if( req.url.includes('name') && req.method === 'DELETE'){
            let body = '';
            req.on('data', (chunk)=>{
                body = chunk.toString();
                //안에서 처리할 수 있음
                
            })

            req.on('end', ()=>{
                const {first_name, last_name} = JSON.parse(body);
                //console.log(first_name, last_name);

                const response = fs.readFileSync(path.join(__dirname, 'model', 'users.json'))
                const users = JSON.parse(response);
                
                // const find =  users.find(data=>data.first_name === first_name);
                // 1개 찾기 {}
                // console.log(find)
                // const filter =  users.filter(data=>data.first_name !== first_name);
                // 여러개 데이터 찾기 [{}]  // !==  삭제한 데이터를 리턴

                const find =  users.find(data=>data.first_name === first_name  &&  data.last_name === last_name );
                const index =  users.indexOf(find); // 배열에 저장된 번호
                //console.log(index); // index = -1 error
                users.splice(index, 1 );
                // 배열에 저장된 데이터를 삭제
                // 삭제 또는 추가 users.splice(index, 1, 추가내용, 추가내용 ...);
                //console.log( users );

                fs.writeFileSync(
                    path.join(__dirname, 'model', 'users.json'),
                    // JSON.stringify(filter, null, "    "),  // filter 처리시
                    JSON.stringify(users, null, "    "),  // splice 처리시
                    "utf-8", 
                    (err)=>{
                        console.log(err)
                    }
                )
            })
            //chunk 사용시 newUser.first_name 주의
            const content = {
                success :'ok',
                message : '삭제 되었습니다.' 
            }
            res.end(JSON.stringify(content));
        }else if( req.url.includes('first') && req.method === 'DELETE'){
            //delete : localhost:3000/?first_name=kim 
            // localhost:3000/?first=jemicom&last=kim
            // localhost:3000/?first=korea&last=kim
            
            const url = require('url');
            const queryUrl = url.parse(req.url);
            const query = queryUrl.query;
            // console.log("query", query);  // query first=jemicom

            const reqQuery = require('querystring');
            //const params = reqQuery.parse(query);
            //console.log( params ); //{ first: 'jemicom', last: 'kim' }
            const { first, last } = reqQuery.parse(query);
            console.log( first, last );
            

            const response = fs.readFileSync( path.join(__dirname, 'model', 'users.json'));
            const users = JSON.parse(response);

            const filter = users.filter( data=>data.first_name !== first );
            console.log(filter)
            fs.writeFileSync(
                path.join(__dirname, 'model', 'users.json'),
                JSON.stringify(filter, null, "    "),  // filter 처리시 
                "utf-8", 
                err=>console.log(err)
            )
            
            const message = {
                success : 'ok',
                message : '삭제되었습니다.'
            }
            res.end(JSON.stringify(message));
        }
    }catch(err){
        console.log(err);
    }
    
    res.end();
})

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