

# ReactRouteDemo
手动实现React路由. 由于比较懒，代码目前只写了history api实现的路由，计划用React16.3中的新的Context api实现React-router

readme中在在下面简单介绍两种路由实现方式，下面代码网上搬的，

### 单页面应用路由的两种实现方式
 . hash方式。 使用location.hash和hashchange事件实现路由。 
 . history api。使用html5的history api实现，主要就是popState事件等。
 
### hash路由在hashchange事件中刷新（触发重新渲染）react页面
 
 ```javascript
  // 创建Router构造函数
        // currentHash为当前hash值，routes为路径对象
        function Router() {
            this.currentHash = '/';
            this.routes = {};
        }

        // 注册路径，每个路径对应一个回调函数。 
        Router.prototype.route = function (path, callback) {
            this.routes[path] = callback || function () {
                alert('未定义回调函数！');
            }
        }

        // 更新页面函数
        Router.prototype.refresh = function () {
            this.currentHash = location.hash.slice(1) || '/';
            this.routes[this.currentHash]();
        }

        // 初始化
        Router.prototype.init = function () {
            var self = this;
            window.addEventListener('load', function () {
                self.refresh();
            }, false);  

            window.addEventListener('hashchange', function () {
                self.refresh();
            });
        }
        
        /*挂载路由**/
        var wrap = document.querySelector('.router-wrap');

        window.Router = new Router();
        Router.route('/', function () {
            wrap.style.backgroundColor = '#fefefe';
        });

        Router.route('/black', function () {
            wrap.style.backgroundColor = 'black';
        });

        Router.route('/green', function () {
            wrap.style.backgroundColor = 'green';
        });

        Router.route('/red', function () {
            wrap.style.backgroundColor = 'red';
        });

        Router.init();

 ```
### history api

  在html5中的history api包括两个方法：history.pushState()和history.replaceState(),包含一个事件，history.onpopstate().
    1. 在history.pushState(data:any,tatle,url?):往历史记录堆栈顶部添加一条记录；data会在onpopState事件触发时作为参数传递过去，
  title为页面标题，当前浏览器会忽略此参数，url为页面地址，可选
    2. history.replaceState(data:any,title,url?)：更改当前历史记录，参数同上
    3. history.state:储存以上方法的data数据，不同浏览器读写权限不一样
    4.popstate事件：用户单击浏览器后退会前进按钮时触发该事件。在事件处理函数中读取触发事件的事件对象的state属性值，该属性值为popState
  方法时所使用的第一个参数，其中保存了向浏览器历史记录中添加记录同步保存的对象
  
  ```javascript
   <script>
        // 创建Router构造函数
        function Router() {
            this.currentRoute = '';
            this.routes = {};
            this.init();
        }

        // 注册路由函数
        Router.prototype.route = function (path, callback) {

            // 根据type类型，选择相应的history api。  
            this.routes[path] = function (type) {
                if (type == 1) {
                    history.pushState({path: path}, '', path);
                } else if (type == 2) {
                    history.replaceState({path: path}, '', path);
                }
                callback();
            }
        }

        // 更新页面
        Router.prototype.refresh = function (path, type) {
            this.routes[path](type);
        }

        // 初始化
        Router.prototype.init = function () {

            var self = this;

            // 重新加载函数，这里使用的主机是http://localhost:8088/
            window.addEventListener('load', function () {
                self.currentRoute = location.href.slice(location.href.indexOf('/', 8));
                console.log(self.currentRoute);
                self.refresh(self.currentRoute);
            });

            // 当用户点击前进后退按钮时触发函数
            window.addEventListener('popstate', function () {
                console.log('history.state.path:', history.state.path);
                self.currentRoute = history.state.path;
                self.refresh(self.currentRoute, 2);
            }, false);

            // 对所有的link标签进行绑定事件
            var historyLinks = document.querySelectorAll('.history-link');
            for (var i = 0, len = historyLinks.length; i < len; i++) {
                historyLinks[i].onclick = function(e) {
                    // 阻止默认
                    e.preventDefault();
                    self.currentRoute = e.target.getAttribute('href');
                    self.refresh(self.currentRoute, 1);
                }
            }
        }
    </script>

    <script>
        var wrap = document.querySelector('.router-wrap');

        // 实例化Router
        window.Router = new Router();


        // 注册路由，实现相应功能
            
        Router.route('/', function () {
            wrap.style.backgroundColor = '#efefef'
        });

        Router.route('/black', function () {
            wrap.style.backgroundColor = 'black';
        });

        Router.route('/green', function () {
            wrap.style.backgroundColor = 'green';
        });

        Router.route('/red', function () {
            wrap.style.backgroundColor = 'red';
        });
    </script>

  ```
