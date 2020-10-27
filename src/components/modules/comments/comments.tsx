import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as selectors from 'store/comments/selectors'
import * as actions from 'store/comments/actions'
import { useTranslation } from 'react-i18next'
import { List, Comment as CommentItem, Tooltip } from 'antd'
import { Comment } from 'types/comment'
import moment from 'moment'

interface Props {
    entityType: string,
    entityId: string,
}

const Comments = ({entityType, entityId }: Props) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const data = useSelector(selectors.data);
    const hasError = useSelector(selectors.hasError);
    const isLoading = useSelector(selectors.isLoading);

    useEffect(() => {
        dispatch(actions.loadData(entityType, entityId))
    }, [dispatch, entityType,entityId])

    if (hasError) return <>{t('misc.error')}</>
    if (!data.length && !isLoading) return <>{t('misc.noData')}</>

    return (
        <List
            className={'comment-list'}
            header={`${data.length} replies`}
            dataSource={data}
            renderItem={(comment: Comment) => (
                <li>
                    <CommentItem
                        datetime={
                            <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                                <span>{moment().fromNow()}</span>
                            </Tooltip>
                        }
                        author={comment.email}
                        content={comment.body} />
                </li>)
            }
        >
        </List>
    )

}

export default Comments