export type BaleInfo = {
    body: string,
    commentCount: number,
    downVoteCount: number,
    id: number,
    parentLog: string,
    saveCount: number,
    title: string,
    upVoteCount: number,
    userName: string,
    userPFP: any,
}

export type ViewBaleCommentsProps = {
    baleInfo: BaleInfo,
    setDetailView: Function,
}

export type CommentType = {
    comment: string,
    id: number,
    parentBaleId: number,
    userName: string,
    userPFP: any,
}

export type ViewCommentsProps = {
    baleId: number,
    fetchResponse: CommentType[],
    setFetchResponse: Function,
    userPFP: any,
}

export type CreateCommentProps = {
    baleId: number,
    fetchResponse: CommentType[],
    setFetchResponse: Function,
}