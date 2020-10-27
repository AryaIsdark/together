import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as selectors from 'store/postDetails/selectors'
import * as actions from 'store/postDetails/actions'
import { useTranslation } from 'react-i18next'
import Comments from 'components/modules/comments/comments'

interface Props {
    match: {
        params: {
            postId: string
        }
    };
    onClose?: () => void;
}

const PostDetails = ({ match }: Props) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { postId } = match.params;
    const data = useSelector(selectors.data);
    const hasError = useSelector(selectors.hasError);
    const isLoading = useSelector(selectors.isLoading);

    useEffect(() => {
        dispatch(actions.loadData(postId))
    }, [dispatch, postId])


    if (hasError) return <>{t('misc.error')}</>
    if (!data && !isLoading) return <>{t('misc.noData')}</>

    return (
        <>
            <p>{data.body}</p>
            <Comments entityType={'posts'} entityId={postId} />
        </>
    )
}

export default PostDetails