import React, {useEffect, useState} from 'react';
import {BsSearch} from 'react-icons/bs';
import { fetchData } from '../../service';
import ItemRecipe from './item_recipe';


const RecipeList = ({loader, setLoader, requestOpenModal, requestCloseModal}) => {
    const [searchedTerm, setSearchedTerm]= useState("");
    const [query, setQuery]= useState("pasta");

    const [data, setData]= useState("");

    useEffect(()=>{
        getData(query);
    }, [])

    const getData=(query)=>{
        setLoader(true);
        fetchData(query).then((response)=>{
            setData(response)
            setLoader(false)
            console.log(response);
        })
    }

    const handleSearchRecipe=(e)=>{
        const value= e.target.value;
        setSearchedTerm(value)
    }

    const handleSearch=(e)=>{
        e.preventDefault();
        getData(searchedTerm);
    }



    const handleShowRecipe=(item)=>{
        requestOpenModal({
            component:<ItemRecipe
             item={item} 
             requestCloseModal={requestCloseModal}
             />
        })
    }

  return (
    <div className='container'>
        <div className='heading-line'>
            <strong>Search Recipes</strong>
            <div className='input-wrapper' >
                <input type="text" placeholder='pasta' onChange={handleSearchRecipe} value={searchedTerm}/>
                <button onClick={handleSearch}><BsSearch /></button>
            </div> 
        </div>
        <div className='flexbox'>
        {data.hits?.length ?
        (data.hits.map((item, index)=>(
            <div className='flexItem' key={index} onClick={(e)=>handleShowRecipe(item?.recipe)}>
                <div className='img-wrapper'>
                    <img src={item.recipe.image} alt={item.recipe.label} />
                </div>
                <p>{item.recipe.label}</p>
            </div>
            ))
            ):(
                <span className="noItems">
                    No Items for this search
                </span>
            )


        }
        </div>
    </div>
  )
}

export default RecipeList