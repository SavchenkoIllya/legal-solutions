export default function Cards() {
    return (
        <section className="my-16">
            <div id="wrapper" className="flex-center container mx-auto">
                <div id="content">
                    <div id="tabs" className="flex flex-center gap-12">
                        <button data-active className="tab">Private</button>
                        <button className="tab">Business</button>
                    </div>
                    <div id="cards" className="my-[40px] flex flex-center flex-wrap gap-12">
                        <div id="card" className="card">
                            <div id="card-content" className="flex flex-col">
                                <h1 className="accent-font transition-all duration-500 hover:text-red">Card name</h1>
                                <a className="text-button">link1</a>
                                <a>link2</a>
                                <a>link3</a>
                                <button className="text-start">More</button>
                            </div>
                        </div>
                        <div id="card" className="card">
                            <div id="card-content" className="flex flex-col">
                                <h1 className="accent-font transition-all duration-500 hover:text-red">Card name</h1>
                                <a className="text-button">link1</a>
                                <a>link2</a>
                                <a>link3</a>
                                <button className="text-start">More</button>
                            </div>
                        </div>
                        <div id="card" className="card">
                            <div id="card-content" className="flex flex-col">
                                <h1 className="accent-font transition-all duration-500 hover:text-red">Card name</h1>
                                <a className="text-button">link1</a>
                                <a>link2</a>
                                <a>link3</a>
                                <button className="text-start">More</button>
                            </div>
                        </div>
                        <div id="card" className="card">
                            <div id="card-content" className="flex flex-col">
                                <h1 className="accent-font transition-all duration-500 hover:text-red">Card name</h1>
                                <a className="text-button">link1</a>
                                <a>link2</a>
                                <a>link3</a>
                                <button className="text-start">More</button>
                            </div>
                        </div>
                        <div id="card" className="card">
                            <div id="card-content" className="flex flex-col">
                                <h1 className="accent-font transition-all duration-500 hover:text-red">Card name</h1>
                                <a className="text-button">link1</a>
                                <a>link2</a>
                                <a>link3</a>
                                <button className="text-start">More</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}