"use client"

export default function Form() {
    return (
        <section className="py-16 flex-center flex-col">
            <h1 className="accent-font text-center mb-[40px]">Contact us</h1>
            <form className="flex gap-4 flex-col">
                <input className="input" placeholder="Name" />
                <input className="input" placeholder="Name" />
                <input className="input" placeholder="Name" />
                <select className="input">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                </select>
                <textarea className="input resize-none" placeholder="Name"/>
                <button className="button w-fit self-center">Send me</button>
            </form>
        </section>
    )
}