import * as mobilenet from '@tensorflow-models/mobilenet';
// import * as tf from '@tensorflow/tfjs';
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


  const classifyImage = async () => {
    const model = await mobilenet.load();
    const data:any = document.getElementById('reviewable')

    // Classify the image.
    if (data == null) console.log(data);
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
  // const classify2 = async () => {
  //   const model = await tf.loadLayersModel("./mobilenet/model.json");
  //   const data:any = document.getElementById('reviewable')
  //   const tensor = tf.browser.fromPixels(data).resizeNearestNeighbor([224,224]).toFloat();
  //   const meanImageNetRGB = tf.tensor1d([123.68,116.779,103.939])
  //   let processedTensor = tensor.sub(meanImageNetRGB).reverse(2).expandDims()
  //   //you need to define what model.predict returns
  //   const predictions = await (model.predict(processedTensor) as tf.Tensor).data();

  //   const fruitList = [
  //     'acerolas',
  //     'apples',
  //     'apricots',
  //     'avocados',
  //     'bananas',
  //     'blackberries',
  //     'blueberries',
  //     'cantaloupes',
  //     'cherries',
  //     'coconuts',
  //     'figs',
  //     'grapefruits',
  //     'grapes',
  //     'guava',
  //     'kiwifruit',
  //     'lemons',
  //     'limes',
  //     'mangos',
  //     'olives',
  //     'oranges',
  //     'passionfruit',
  //     'peaches',
  //     'pears',
  //     'pineapples',
  //     'plums',
  //     'pomegranates',
  //     'raspberries',
  //     'strawberries',
  //     'tomatoes',
  //     'watermelons'
  // ];

  //   // Map each prediction to its class name and probability
  //   const predictedClasses = Array.from(predictions).map((prob, index) => {
  //       return {
  //           className: fruitList[index],
  //           probability: prob
  //       };
  //   });

  //   // Sort by probability
  //   predictedClasses.sort((a, b) => b.probability - a.probability);

  //   // Optionally, take top 5 predictions

  //   // Output the results
  //   console.log(predictedClasses[0]);
  //   setPrediction(`Prediction: ${predictedClasses[0].className}, Probability: ${predictedClasses[0].probability}`)
  // }

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
    <div className='h-screen w-full flex justify-center items-center bg-[url(https://images.unsplash.com/photo-1617150119111-09bbb85178b0?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]'>
      <div className=' h-1/2 w-[300px] rounded-full outline outline-4 py-10 bg-gradient-to-br from-cyan-500 to-blue-500 flex flex-col gap-4 items-center justify-start'>
        <h1 className='text-3xl font-black text-white'>Munchy.</h1>
        <div onClick={()=> toast(<div className='font-black text-3xl text-center w-full'>Grrr...</div>)} className='h-32 w-32 p-2 bg-white outline flex flex-col justify-center items-center'>
          <div className='flex items-center'>
            3
            <TbMeat />
          </div>
          <img src='./spark.gif' className='h-20 w-20' />
        </div>
        {(img)?(
          <div className='hidden'>
            <img onLoad={classifyImage} id="reviewable" src={img} />
          </div>
        ):(<p></p>)}
        <input id="fileCamera" onChange={(e:any)=>preview(e.target.files[0])} className="hidden" accept='image/*' type='file' capture='environment' />
        <div className='flex flex-row gap-5'>
          <div className='text-center'>
            <label htmlFor="fileCamera" className='h-10 w-10 rounded-full flex justify-center items-center bg-white outline'>
            </label>
            <p className='text-white font-black'>feed</p>
          </div>
          <div className='text-center mt-2'>
            <label htmlFor="fileCamera" className='h-10 w-10 rounded-full flex justify-center items-center bg-white outline'>
            </label>
            <p className='text-white font-black'>feed</p>
          </div>
          <div className='text-center'>
            <label htmlFor="fileCamera" className='h-10 w-10 rounded-full flex justify-center items-center bg-white outline'>
            </label>
            <p className='text-white font-black'>feed</p>
          </div>
        </div>
        <Toaster position='bottom-center'/>
      </div>
    </div>
  )
}

export default App
