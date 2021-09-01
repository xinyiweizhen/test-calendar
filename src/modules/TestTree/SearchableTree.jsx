import React from 'react';
import PropsType from 'prop-types';
import {SmartLinkTree, SmartLinkSearchInput} from '@smart-link/core';
import {makeAppStyles} from '@smart-link/context';

const SearchableTree = React.memo(props => {
    const {treeData = [], onExpand, placeholder, selectedKeys, defaultExpandedKeys, loading, ...restProps} = props;

    const [searchValue, setSearchValue] = React.useState('');
    const [autoExpandParent, setAutoExpandParent] = React.useState(true);
    const [expandedKeys, setExpandedKeys] = React.useState([]);

    const classes = useStyles();
    /**
     * 设置关键词高亮
     */
    const loop = React.useCallback(
        node => {
            return node.map(item => {
                const index = item.title.indexOf(searchValue);
                const beforeStr = item.title.substr(0, index);
                const afterStr = item.title.substr(index + searchValue.length);
                const title =
                    index > -1 ? (
                        <span>
                            {beforeStr}
                            <span style={{color: '#f50'}}>{searchValue}</span>
                            {afterStr}
                        </span>
                    ) : (
                        <span>{item.title}</span>
                    );
                if (item.children) {
                    return {
                        ...item,
                        children: loop(item.children),
                        title,
                    };
                }
                return {...item, title};
            });
        },
        [searchValue],
    );

    /**
     * 获取父级节点方法
     */
    const getParentKey = React.useCallback((key, tree) => {
        let parentKey;
        for (let i = 0; i < tree.length; i++) {
            const node = tree[i];
            if (node.children) {
                if (node.children.some(item => item.key === key)) {
                    parentKey = node.key;
                } else if (getParentKey(key, node.children)) {
                    parentKey = getParentKey(key, node.children);
                }
            }
        }
        return parentKey;
    }, []);

    /**
     * 全部节点列表
     */
    const nodeList = React.useMemo(() => {
        const L = [];
        (function generator(data) {
            if (!data) return [];
            data.map(item => {
                L.push({key: item.key, title: item.title});
                if (item.children) {
                    generator(item.children);
                }
            });
        })(treeData);

        return L;
    }, [treeData]);

    /**
     * 搜索框变化事件
     */
    const handleSearchChange = React.useCallback(event => {
        const {value} = event.target;
        const keys = nodeList
            .map(item => {
                if (item.title?.toString().includes(searchValue)) {
                    return getParentKey(item.key, treeData);
                }
                return null;
            })
            .filter((item, index, self) => item && self.indexOf(item) === index);
        setExpandedKeys(keys);
        setAutoExpandParent(true);
        setSearchValue(value);
    }, []);

    // eslint-disable-next-line no-shadow
    const handleExpand = expandedKeys => {
        setExpandedKeys(expandedKeys);
        setAutoExpandParent(false);
        if (onExpand) {
            onExpand(expandedKeys);
        }
    };

    return (
        <div>
            <SmartLinkSearchInput
                className={classes.search}
                placeholder={placeholder || 'Search'}
                onChange={handleSearchChange}
            />
            <SmartLinkTree
                {...restProps}
                selectedKeys={selectedKeys}
                expandedKeys={expandedKeys}
                autoExpandParent={autoExpandParent}
                treeData={loop(treeData)}
                onExpand={handleExpand}
            />
        </div>
    );
});

const useStyles = makeAppStyles(
    theme => ({
        search: {
            marginBottom: theme.spacing(1),
        },
    }),
    {name: 'searchable-tree'},
);

SearchableTree.propTypes = {
    placeholder: PropsType.string,
    onExpand: PropsType.func,
    treeData: PropsType.array,
    loading: PropsType.bool,
};

export default SearchableTree;
