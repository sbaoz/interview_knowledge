import React, {useEffect, useState} from 'react';
import ScrollView from './scrollView';
import styles from './index.less';

function Item({ item }) {
    return (
        <div className={styles.item}>
            {item.name}
        </div>
    );
}

function fetchDate(page) {
    return new Promise(resolve => {
        setTimeout(function () {
            const data = {
                code: 0,
                list: [],
                page,
                pageCount: 3
            };
            if (page > 3) page = 3;
            const max = page * 10;
            const start = (page - 1) * 10 + 1;
            for (let i = start; i <= max; i++) {
                data.list.push({
                    id: 'item-' + i,
                    name: 'item-' + i
                });
            }
            return resolve(data);
        }, 300);
    });
}

const Index = (props) => {
    const [data, setData] = useState({
        list: [],
        page: 0,
        pageCount: 1
    });

    const getData = async () => {
        if (data.page === data.pageCount) {
            console.log('没有数据了');
            return;
        }
        const response = await fetchDate(data.page + 1);
        if (response.code === 0) {
            setData({
                ...response,
                list: response.page === 1 ? response.list : data.list.concat(response.list)
            });
        }
    }

    const handleScrollToLower = () => {
        console.log('scroll已经到底部')
        getData()
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <ScrollView
            className={styles.scrollView}
            data={data}
            component={Item}
            scrollToLower={handleScrollToLower}
            scroll={() => {}}
        />
    )
};

export default Index;
