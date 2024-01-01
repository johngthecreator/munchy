import * as mobilenet from '@tensorflow-models/mobilenet';
import '@tensorflow/tfjs-backend-webgl';
import { Toaster, toast } from 'sonner';
import { useEffect, useState } from 'react';
import { foodItems } from './lib/foodLikes';
import Menu from './components/Menu';

  export interface IModelPredictions {
    [index:number]:{
      className:string,
      probability:number,
    }
  }

function App() {
  const [img, setImg] = useState<string|undefined>()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  useEffect(()=>{
    toast(<div className='font-black text-3xl text-center w-full'>Tap on Munchy</div>)

  },[])


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
    <Menu>
      <div className="h-full w-full flex flex-col justify-between items-center bg-[url('/trees.jpg')] overflow-hidden bg-repeat">
        <div className={`fixed bottom-36 z-10 bg-white flex-col h-auto w-5/6 max-w-[400px] border-black border-4 border-solid ${isOpen?"flex":"hidden"}`}> 
          <div className='flex flex-row items-center justify-start border-solid border-b-2 border-black'>
            <img src='./spark.png' className='h-28'/>
            <div className='border-solid border-black border-l-2 p-3'>
              <h2 className='font-black'>MUNCHY</h2>
              <p className=''>PURPLE LIZARD</p>
              <p className=''>LV. 20</p>
              <p className=''>FOOD 1/10</p>
            </div>
          </div>
          <div className='p-5'>
            Found mainly in North America, the elusive Munchy has grown accustom to a diet consisting of strawberries, oranges, bananas, pomegranates, pizza, bagels, cheeseburgers, and hotdogs...
          </div>
          <div className='grid grid-cols-2 items-center justify-items-center mb-5'>
            <label htmlFor="fileCamera" className='h-10 w-3/4 shadow-block flex font-black italic justify-center items-center outline'>
              FEED
            </label>
            <button 
            onClick={()=>setIsOpen(false)} 
            className='h-10 w-3/4 shadow-block flex font-black italic justify-center items-center outline'
            >
              EXIT
            </button>
          </div>
        </div>
          <img 
          src='./spark.gif' 
          className="absolute h-20 w-20 animate-moveAround duration-1000 ease-in-out" 
          onClick={()=>isOpen?setIsOpen(false):setIsOpen(true)}
          />
          {/* Image Classification Model Called */}
          {(img)?(
            <div className='hidden'>
              <img onLoad={classifyImage} id="reviewable" src={img} />
            </div>
          ):(<p></p>)}
          <input id="fileCamera" onChange={(e:any)=>preview(e.target.files[0])} className="hidden" accept='image/*' type='file' capture='environment' />
          <Toaster />
      </div>
    </Menu>
  )
}

export default App
