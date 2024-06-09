export default function Advantage() {
    return (
        <div id="advantage" className="flex flex-col px-4">
            <div id="icon-text" className="flex gap-4 justify-center">
                <svg className="fill-red h-[50px]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title /><path d="M21,7V17H19V13.62l-6.55,3.27A1,1,0,0,1,12,17a1,1,0,0,1-.53-.15A1,1,0,0,1,11,16V13.62L4.45,16.89A1,1,0,0,1,4,17a1,1,0,0,1-.53-.15A1,1,0,0,1,3,16V8a1,1,0,0,1,1.45-.89L11,10.38V8a1,1,0,0,1,1.45-.89L19,10.38V7Z" /></svg>
                <h2 className="accent-font text-red">Fast</h2>
            </div>
            <p className="plain-font md:max-w-[250px] text-justify">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis laboriosam dolores labore illum veniam voluptate iure, perspiciatis impedit excepturi ducimus quae, numquam maxime provident inventore, adipisci similique possimus ea nemo?</p>
        </div>
    )
}