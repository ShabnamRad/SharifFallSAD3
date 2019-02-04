import uuid from 'uuid';

export const addComment = (
    {
        user = '',
        comment = '',
    } = {}
) => ({
    type: 'ADD_COMMENT',
    rating: {
        id: uuid(),
        user,
        comment: comment
    }
});
