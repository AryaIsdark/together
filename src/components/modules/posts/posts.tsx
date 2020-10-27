import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as selectors from 'store/posts/selectors'
import * as actions from 'store/posts/actions'
import { useTranslation } from 'react-i18next'
import { Card } from 'antd'
import { Post } from 'types/post'
import { Link } from 'react-router-dom';

interface Props {
    match: {
        url: string;
        params: any
    };
}


const Posts = ({ match }: Props) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const data = useSelector(selectors.data);
    const hasError = useSelector(selectors.hasError);
    const isLoading = useSelector(selectors.isLoading);

    useEffect(() => {
        dispatch(actions.loadData())
    }, [dispatch])

    if (hasError) return <>{t('misc.error')}</>
    if (!data.length && !isLoading) return <>{t('misc.noData')}</>

    return (
        <>
            <div className={'d-flex '}>
                {
                    data.map((post: Post) =>
                        <Card
                            className={'item'}
                            bordered={false}
                            loading={isLoading}
                            title={post.title}
                            extra={<Link to={`/posts/${post.id}`} >{t('misc.more')}</Link>}
                            style={{ width: 350 }}>
                            <p>{post.body}</p>
                        </Card>
                    )
                }
            </div>
        </>
    )
}

export default Posts