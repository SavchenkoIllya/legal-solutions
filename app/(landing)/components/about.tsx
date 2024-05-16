import Advantage from "./about/advantage"

export default function About() {
    return (<section className="relative bg-white py-16">
        <div id="content" className="container mx-auto">
            <div id="main-content" className="text-center">
                <h1 className="accent-font">Text</h1>
                <p className="plain-font">Aditional text</p>
            </div>
            <div id="advantages" className="flex flex-wrap justify-center mt-[40px] gap-24">

                {[1, 2, 3].map((el, idx) => {
                    return <Advantage key={el} />
                })}
            </div>
        </div>
    </section>)
}