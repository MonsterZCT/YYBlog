# 从零开始搭建一个简易的博客系统

## Git

> 按照Git，注册Github
>
> Github 创建YYBlog仓库
>
> 
>
> 配置github
>
> https://www.runoob.com/w3cnote/git-guide.html
>
> 
>
> 首先在本地创建ssh key；
>
> $ ssh-keygen -t rsa -C "your_email@youremail.com"
>
> 
>
> 后面的your_email@youremail.com改为你在github上注册的邮箱，之后会要求确认路径和输入密码，我们这使用默认的一路回车就行。成功的话会在~/下生成.ssh文件夹，进去，打开id_rsa.pub，复制里面的key。
>
> 回到github上，进入 Account Settings（账户配置），左边选择SSH Keys，Add SSH Key,title随便填，粘贴在你电脑上生成的key。
>
> 
>
> 为了验证是否成功，在git bash下输入：
>
> $ ssh -T git@github.com
>
> 
>
> 如果是第一次的会提示是否continue，输入yes就会看到：You've successfully authenticated, but GitHub does not provide shell access 。这就表示已成功连上github。
>
> 接下来我们要做的就是把本地仓库传到github上去，在此之前还需要设置username和email，因为github每次commit都会记录他们。
>
> $ git config --global user.name "your name"
> $ git config --global user.email "your_email@youremail.com"
>
>  
>
> 进入要上传的仓库，右键git bash，添加远程地址：
>
> $ git remote add origin git@github.com:yourName/yourRepo.git



## 服务器

> cd YYBlog
>
> mkdir server
>
> 用VsCode打开server
>
> 
>
> npx express-generator
>
> cnpm install

> 打开>bin>www 
>
> 修改端口为 9000
>
>  
>
> 打开package.json
>
> 增加scripts脚本
>
> "supervisor":"supervisor ./bin/www"（需提前按照supervisor）

### tool工具库

> mkdir tool
>
> 新建AES.js
>
> 引入crypto模块，创建AES加密工具类，
>
> 包括加密方法 encryption，解密方法decryption

> cd tool
>
> cnpm install jsonwebtoken
>
> https://www.npmjs.com/package/jsonwebtoken
>
> 封装token方法

### 修改app.js

#### CORS解决跨域

> cnpm install cors
>
> var cors = require('cors');
>
> app.use(cors('http://localhost:8888/'));

#### 静态资源（可不修改）

> app.use(express.static(path.join(__dirname, 'public')));

### 数据库操作封装

> cnpm install mysql
>
> mkdir operate
>
> 新建dbConfig.js
>
> 引入mysql模块，封装数据库连接sqlConnect（）方法；
>
> 创建articleOperate.js,userOperate.js，里面封装对user、article数据库表的相关操作方法

### 路由

> 新建article.js,sign.js
>
> cnpm install formidable
>
> 利用formidable模块操作接收文件











## 前端

> cd YYBlog
>
> vue create blog
>
> 选择babel，router，veux
>
> 