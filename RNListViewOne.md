##React Native 学习之ListView（一）

####Demo展示

![](/Users/pengbailiang/Desktop/1.gif)

####实现步骤

对于原生Android来说，数据的列表展示也是用ListView，对于IOS来说，则是用cell来展示列表数据，而在RN中也是用ListView。虽然是不同的平台，但对于列表显示来说，都需要提供数据源，并且还需要创建这个列表控件的对象

#####准备数据源

ListView显示本地数据，由于数据较多，我们不可能把它写在代码中，所以我们会把它放在一个json文件，然后去读取数据，如下面的Wine.json：

	[
	  {
	    "image": "one",
	    "money": "39",
	    "name": "德国OETTINGER奥丁格大麦啤酒500ml*4罐/组"
	  },
	  {
	    "image": "two",
	    "money": "40",
	    "name": "德拉克（Durlacher） 黑啤酒 330ml*6听"
	  }
	  ...
	]
那如何去获取这些数据了？很简单，只需要在代码中引入这个js文件就可以了，如：

	var data = require('./Wine.json');
	
#####初始化ListView

    constructor(props) {
        super(props);
        //获取ListView数据源
        var data = this.props.data;
        //创建ListView对象
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
        	//将数据源与ListView对象进行绑定
            dataSource: ds.cloneWithRows(data)
        };
    }

我是将ListView组件进行了封装，所以需要获取从index.android.js文件中传递过来的数据源。一般的初始化工作都是在一个组件的构造方法来完成的，这是ES6的写法。`rowHasChanged: (r1, r2) => r1 !== r2`这句代码是用来控制item数据的更新，当且仅当任意两行数据不相等时才去更新数据源。这里是RN中的一个性能优化。

#####渲染ListView

	render() {
        return (
            <ListView
            	//数据源就是我们初始化的值
                dataSource={this.state.dataSource}
                //这是一个ListView中的一个回调方法
                renderRow={this.renderRow.bind(this)}
            />
        );
    }
	//我们重写了ListView的renderRow方法，所以我们可以拿到系统提供给我们的一些参数，如：rowData等
    renderRow(rowData, sectionID, rowID, highlightRow) {
        return (
            <TouchableOpacity activeOpacity={0.5}
                              style={{height: 90}}
                              onPress={this.show.bind(this, rowData.name)}>
                <View style={styles.container}>
                    <Image source={{uri: rowData.image}}
                           style={styles.image}
                           resizeMode="contain"
                    />
                    <View>
                        <Text style={styles.title}>{rowData.name}</Text>
                        <Text style={styles.subTitle}>¥{rowData.money}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
    
**注意**：上面的代码中有加载静态图片，我这里是用动态的方式来加载的，所以需要在android/app/src/main/res文件下新建一个drawable文件夹，将图片放在里面，并且名称需要与json文件里面的图片名称保持一致。

好了，ListView的初步使用就学习完了。[完整代码]()

