import { Breadcrumb } from 'antd';

export const Breadcrumbs = () => {
    return (
        <Breadcrumb
        items={[
            { title: 'Home' },
            { title: 'List' },
            { title: 'App' },
        ]}
        style={{ margin: '16px 0' }}
        />
    )
};