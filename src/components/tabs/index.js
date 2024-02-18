import React, {useState, useEffect} from 'react';
import {CiPizza} from 'react-icons/ci'
import {GiFruitBowl , GiNoodles,GiCheckMark} from 'react-icons/gi'
import {MdOutlineIcecream} from 'react-icons/md'
import { fetchTabsData } from '../../service';


const Tabs = ({loader, setLoader}) => {
    // pizza = 6623390762899b54537e69d97268983a"
    // noodels="afb208cf98de0427b313cba93c55aa80

    // desert="bc865476ffe2b8a03fbe9aee2f739740"

    // ice cream="91e46404198f2263732cf43fb51a89ed"
    const [activeLabel, setActiveLabel]= useState("Pizza");
    const [activeTabData, setActiveTabData]= useState("");

//   "https://api.edamam.com/api/recipes/v2/99f673fe102180db00908baa87abfa32?type=public&app_id=454f3400&app_key=f43d43151d581bf7feb31e1d974e0ab7"

    const [tabLabel, setTabLabel] =useState([
        {
            name: "Pizza",
            id:"99f673fe102180db00908baa87abfa32",
            icon:<CiPizza/>
        },

        {
            name: "Noodles",
            id:"afb208cf98de0427b313cba93c55aa80",
            icon:<GiNoodles/>
        },

        {
            name: "Desert",
            id:"bc865476ffe2b8a03fbe9aee2f739740",
            icon:<GiFruitBowl/>
        },

        {
            name: "Ice Cream",
            id:"91e46404198f2263732cf43fb51a89ed",
            icon:<MdOutlineIcecream/>
        },

    ])

    useEffect(()=>{
        getRecipeAsPerActiveLabel(tabLabel[0])
    }, []);

    const getRecipeAsPerActiveLabel=(item)=>{
        setLoader(true)
        fetchTabsData(item.id).then(response=>{
            console.log("recipe as per active lable", response);
            setActiveTabData(response.recipe);

            setLoader(false)
        })
    }


    const handleActiveLabel=(item)=>(e)=>{
        e.preventDefault();
        setActiveLabel(item.name);
        getRecipeAsPerActiveLabel(item);
    }

  return (
    <div className="container">
        <h1 className='recipeHeading'>What would you like to have!</h1>
        <div className="tabs">
                {tabLabel.map((item, index)=>(
                    <div className={activeLabel===item.name ? "tablist active" : "tablist"} key={index} onClick={handleActiveLabel(item)}>
                        {item.icon}
                    <span>{item.name}</span>
                </div>
                )) }
            
        </div>
        <div className='recipe_banner'>
                <div className="left-col">
                {activeTabData?.cuisineType?.map((item, index)=>(
                    <span className='badge' key={index}>{item.toUpperCase()}</span>
                ))}
                    
                    <h1>{activeTabData?.label}</h1>
                    <p><strong>Recipe by:</strong><small>{activeTabData?.source}</small></p>
                    <h3>Ingredients</h3>
                    <div className='ingredients'>
                        <ul>
                        {activeTabData?.ingredientLines?.map((item, index)=>(
                                <li key={index}><GiCheckMark size="18px" color="#6fcb9f" />&nbsp;<span>{item}</span></li>
                        ))}
                            
                        </ul>
                    </div>
                </div>
                <div className="right-col">
                    <div className="image-wrapper">
                    <img src={activeTabData?.image} alt={activeTabData?.label} />
                    </div>
                </div>
        </div>
    </div>
  )
}

export default Tabs