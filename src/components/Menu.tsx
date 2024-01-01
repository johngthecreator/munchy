type Props = {
    children: JSX.Element,
  };

export default function Menu({ children}: Props){
    return(
        <div className="w-full h-screen px-5 pb-5 bg-black">
            <div className="bg-black flex justify-center items-center z-10 sticky top-0 h-[10%]">
                <p className="text-4xl text-white italic font-black">MUNCHY <span className="font-hand not-italic">
                    <span className="text-pink-500">C</span>
                    <span className="text-purple-500">O</span>
                    <span className="text-green-300">L</span>
                    <span className="text-yellow-300">O</span>
                    <span className="text-blue-400">R</span>
                </span></p>
            </div>
            <div className="h-[90%]">
                {children}
            </div>
        </div>
    )
}