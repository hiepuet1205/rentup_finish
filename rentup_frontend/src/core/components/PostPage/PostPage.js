import Page from "../common/Page"
import Back from "../common/Back/Back"
import img from "../../../assets/img/backgroundPost.jpg"
import Recent from "../HomePage/Recent/Recent"

const PostPage = () => {
    return (
        <Page>
            <section>
                <Back name='Blog' title='Blog Grid - Our Blogs' cover={img} />
                <Recent/>
            </section>
        </Page>
    )
}

export default PostPage