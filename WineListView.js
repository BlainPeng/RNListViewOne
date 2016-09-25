import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableOpacity,
    Image,
    Alert
} from 'react-native';

var Dimensions = require('Dimensions');
var {width} = Dimensions.get('window');


class ListViewDemoOne extends Component {


    constructor(props) {
        super(props);
        //获取ListView数据源
        var data = this.props.data;
        //创建ListView对象
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(data)
        };
    }

    render() {

        return (

            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)}
            />

        );

    }

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

    show(text) {
        Alert.alert('注意', text);
    }


}

const styles = StyleSheet.create({

    container: {
        height: 90,
        flexDirection: 'row',
        margin: 10,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#ffffff',

        alignItems: 'center'
    },
    image: {
        width: 50,
        height: 50,
        marginLeft: 10,
        marginRight: 10

    },
    title: {
        color: 'black',
        width: width * 0.75,
        fontSize: 15
    },
    subTitle: {
        color: 'red',
        marginTop: 5
    }
});


module.exports = ListViewDemoOne;