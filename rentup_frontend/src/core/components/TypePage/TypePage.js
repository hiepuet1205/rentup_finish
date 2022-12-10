import Page from "../common/Page"
import Back from "../common/Back/Back"
import img from "../../../assets/img/backgroundService.jpg"
import Type from "../HomePage/type/Type"

const TypePage = () => {
    return (
        <Page>
            <section>
                <Back name='Services' title='Services -All Services' cover={img} />
                <Type/>
            </section>
        </Page>
    )
}

export default TypePage