import Advantage from "./about/advantage"
import { FaHandsHelping } from "react-icons/fa";
import { IoSpeedometerOutline } from "react-icons/io5";
import { MdHealthAndSafety } from "react-icons/md";

const benefits = [
    {
        icon: <FaHandsHelping />,
        title: "Юридическая поддержка",
        description: "Не будет необходимости в сборе, большого количества документов и знании иностранного языка."
    },
    {
        icon: <IoSpeedometerOutline />,
        title: "Подбор оснований для переезда",
        description: "Специалисты подберут иммиграционную программу, которая будет оптимально соответствовать вашему запросу."
    },
    {
        icon: <MdHealthAndSafety />,
        title: "Защиту личных данных",
        description: "Ваша личная информация, переданная для обработки сотрудникам компании, никогда не попадет к третьим лицам."
    }
]

export default function About() {
    return (<section className="relative bg-white py-16">
        <div id="content" className="container mx-auto">
            <div id="main-content" className="text-center">
                <h1 className="accent-font">Text</h1>
                {/* <p className="plain-font">Aditional text</p> */}
            </div>
            <div id="advantages" className="flex flex-wrap justify-center mt-[40px] gap-24">
                {benefits.map((el, idx) => {
                    return <Advantage title={el.title} icon={el.icon as any} description={el.description} key={idx} />
                })}
            </div>
        </div>
    </section>)
}