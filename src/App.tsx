import * as mobilenet from '@tensorflow-models/mobilenet';
import '@tensorflow/tfjs-backend-webgl';
import { TbMeat } from "react-icons/tb";
import { Toaster, toast } from 'sonner'
import { useState } from 'react';
import { foodItems } from './lib/foodLikes';

  export interface IModelPredictions {
    [index:number]:{
      className:string,
      probability:number,
    }
  }

function App() {
  const [img, setImg] = useState<string|undefined>()
  const [isOpen, setIsOpen] = useState<boolean>(false)


  const classifyImage = async () => {
    toast(<div className='font-black text-3xl text-center w-full'>** Munch Munch **</div>)
    const model = await mobilenet.load();
    const data:any = document.getElementById('reviewable')

    if (data == null) toast(<div className='font-black text-3xl text-center w-full'>Try Again...</div>);
    const predictions:IModelPredictions = await model.classify(data);
    console.log('Predictions: ');
    console.log(predictions)
    console.log(predictions[0].className, predictions[0].probability);
    const myFood = predictions[0].className

    if (foodItems.includes(myFood)){
      toast(<div className='font-black text-3xl text-center w-full'>Yum Yum!</div>)
    }else{
      toast(<div className='font-black text-3xl text-center w-full'>Yuck!</div>)
    }
  }

  const preview = (file:File) => {
    var fr = new FileReader()
    fr.readAsDataURL(file)
    fr.onload = function() {
      if(typeof this.result === "string"){
        setImg(this.result)
      }else{
        console.error('FileReader result is not a string')
        alert("Something went wrong, please try again!")
      }
    } 
  }

  return (
    <div className="h-screen w-full flex justify-center items-center bg-[url('/hologram.webp')] bg-cover">
      <div className={`fixed z-10 bg-white h-3/4 w-5/6 max-w-[500px] rounded-xl outline outline-3 duration-300 transition ease-in-out ${isOpen?"flex":"hidden"}`}> 
      <button onClick={()=>setIsOpen(false)}>X</button>
      </div>
      <div className=' h-[350px] w-[300px] rounded-full outline outline-4 py-10 bg-gradient-to-br from-cyan-500 to-blue-500 flex flex-col gap-4 items-center justify-start'>
        <h1 className='text-3xl font-black text-white'>Munchy</h1>
        {/* Monster Container */}
        <div onClick={()=> toast(<div className='font-black text-3xl text-center w-full'>Grrr...</div>)} className='h-32 w-32 p-2 bg-white outline flex flex-col justify-center items-center'>
          <div className='flex w-full flex-row items-center justify-between font-bold'>
            <div className='flex items-center'>
              Lv. 30
            </div>
            <div className='flex items-center'>
              3
              <TbMeat />
            </div>
          </div>
          <img src='./spark.gif' className='h-20 w-20' />
        </div>
        {/* Image Classification Model Called */}
        {(img)?(
          <div className='hidden'>
            <img onLoad={classifyImage} id="reviewable" src={img} />
          </div>
        ):(<p></p>)}
        <input id="fileCamera" onChange={(e:any)=>preview(e.target.files[0])} className="hidden" accept='image/*' type='file' capture='environment' />
        {/* Buttons */}
        <div className='flex flex-row gap-5'>
          <div className='text-center'>
            <label htmlFor="fileCamera" className='h-10 w-10 rounded-full flex justify-center items-center bg-white outline'>
            </label>
            <p className='text-white font-black'>feed</p>
          </div>
          <div className='text-center mt-2'>
            <button onClick={()=>setIsOpen(true)} className='h-10 w-10 rounded-full flex justify-center items-center bg-white outline'>
            </button>
            <p className='text-white font-black'>stats</p>
          </div>
          <div className='text-center'>
            <label htmlFor="fileCamera" className='h-10 w-10 rounded-full flex justify-center items-center bg-white outline'>
            </label>
            <p className='text-white font-black'>feed</p>
          </div>
        </div>
        {/* Toast Interactions */}
        <Toaster position='top-center'/>
      </div>
    </div>
  )
}

export default App
